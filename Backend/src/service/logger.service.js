const pino = require('pino');

class Logger {
    static logger = pino({}, pino.destination("./data.log"));
}

module.exports = Logger.logger;
