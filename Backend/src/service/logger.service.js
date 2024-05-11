import pino from 'pino';

class Logger {
    static get logger() {
        if (process.env.USE_CONTAINER) {
            return pino({}, pino.destination("./data/log/data.log"));
        }
        else {
            return pino({}, pino.destination("./data.log"));
        }
    }
}

export default Logger.logger;
