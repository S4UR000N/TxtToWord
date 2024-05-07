import {} from 'dotenv/config'
import { MongoClient, ServerApiVersion } from 'mongodb';
//import logger from '../service/logger.service.js';
import mongoose from 'mongoose';

class BaseRepository {
    
    static async connectToDb() {
        try {
            await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
            console.log('Successfully connected to db');
        } catch (error) {
            console.error(error);
        }
    }

    constructor(col, schema) {
        this.collection = mongoose.model(col, schema);
    }
}

export default BaseRepository;