import { SupportedLogLevels } from '../Logger';
import { LogLevels } from '../LoggerFactory';

type Config = {
  logLevel: LogLevels;
  skipTimestamps?: boolean;
}

const LogLevelPriorities = {
  [SupportedLogLevels.Silent]: 0,
  [SupportedLogLevels.System]: 1,
  [SupportedLogLevels.Error]: 2,
  [SupportedLogLevels.Warn]: 3,
  [SupportedLogLevels.Info]: 4,
  [SupportedLogLevels.Debug]: 5,
};

interface LogMessage {
  args: Array<any>,
  level: SupportedLogLevels,
  prefix?: string,
  date: Date,
}

interface LoggerAdapter {
  logLevel: number;
  log(message: LogMessage): void,
}

export {
  LoggerAdapter,
  LogMessage,
  Config as LoggerAdapterConfig,
  LogLevelPriorities,
};
