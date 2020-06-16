'use strict';

const ConsoleLogger = require('./ConsoleLogger');

class LoggerFactory {
  constructor({ logLevel }) {
    this._logLevel = logLevel;
  }

  create(args) {
    return new ConsoleLogger({
      ...args,
      logLevel: this._logLevel,
    });
  }
}

module.exports = LoggerFactory;