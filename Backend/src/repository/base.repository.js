import {} from 'dotenv/config'
import logger from '../service/logger.service.js';
import mongoose from 'mongoose';

class BaseRepository {
    static hasConnected = false;

    constructor() {
        if (!BaseRepository.hasConnected) {
            mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
            .then(_ => {
                BaseRepository.hasConnected = true;
            })
            .catch(err => {
                logger.error('db connection failed\n' + err);
            });
        }
    }
}

export default BaseRepository;