import fs from 'fs';
import pino from 'pino';

class Logger {
    static get logger() {
        if (process.env.LOG_PATH) {
            console.log("MUST CRETE PATH");
            this.preparePath(process.env.LOG_PATH);
            fs.createWriteStream(process.env.LOG_PATH).end();
            return pino({}, pino.destination(process.env.LOG_PATH));
        }
        else {
            fs.createWriteStream('./data.log').end();
            return pino({}, pino.destination("./data.log"));
        }
    }

    static preparePath(filePath) {
        const dirpath = filePath.split('/').slice(0, -1).join('/');
        if (!fs.existsSync(dirpath)) {
            fs.mkdirSync(dirpath, { recursive: true });
        }
      }
}

export default Logger.logger;
