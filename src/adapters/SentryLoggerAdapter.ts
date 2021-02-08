import * as Sentry from '@sentry/node';
import { isPlainObject, partition } from 'lodash';
import { LoggerAdapter, LoggerAdapterInterface, LogMessage, LoggerAdapterConfig } from './LoggerAdapter';

type Config = LoggerAdapterConfig & {
  dsn: string;
  tracesSampleRate: number;
  environment: string;
  debug?: boolean;
}

type Settings = {
  name: 'sentry',
  config: Config,
}

class SentryLoggerAdapter extends LoggerAdapter implements LoggerAdapterInterface {
  constructor(props: Config) {
    super(props);
    Sentry.init({
      dsn: props.dsn,
      tracesSampleRate: props.tracesSampleRate,
      environment: props.environment,
      debug: props.debug,
    });
  }

  public log(message: LogMessage): void {
    let formattedArgs = [];
    const [ errors, messagesAndObjects ] = partition(message.args, (anArg) => anArg instanceof Error);

    Sentry.setTag('prefix', message.prefix);
    Sentry.setTag('logLevel', message.level);

    if (messagesAndObjects.length > 0) {
      if (!this.skipTimestamps) {
        formattedArgs.push(this.formatDate(message.date));
      }

      formattedArgs = [
        ...formattedArgs,
        ...messagesAndObjects.map((anArg) => (isPlainObject(anArg) || Array.isArray(anArg) ? JSON.stringify(anArg) : anArg)),
      ];
      Sentry.captureMessage(formattedArgs.join(' '));
    }

    if (errors.length > 0) {
      for (const anError of errors) {
        Sentry.captureException(anError);
      }
    }
  }
}

export default SentryLoggerAdapter;
export {
  Config as SentryConfig,
  Settings as SentrySettings,
};
