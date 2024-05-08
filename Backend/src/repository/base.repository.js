import {} from 'dotenv/config'
import logger from '../service/logger.service.js';
import mongoose from 'mongoose';

class BaseRepository {
    static hasConnected = false;

    constructor(col, schema) {
        if (!BaseRepository.hasConnected) {
            mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
            .then(_ => {
                BaseRepository.hasConnected = true;
            })
            .catch(err => {
                logger.error('db connection failed\n' + err);
            });
        }

        this.collection = mongoose.connection.models[col] ? mongoose.model(col) : mongoose.model(col, new mongoose.Schema(schema));
    }
}

export default BaseRepository;