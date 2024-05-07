import pino from 'pino';

class Logger {
    static logger = pino({}, pino.destination("./data.log"));
}

export default Logger.logger;
