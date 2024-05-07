require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const logger = require('../service/logger.service');

class BaseRepository {
    logger = logger;
    client = new MongoClient(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`,  {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        }
    );
    db;
    col;
    con;

    async openConnection(col) {
        try {
            await this.client.connect()
            this.db = this.client.db(process.env.DB_NAME);
            this.col = this.db.collection(col);
            console.log(col);
            this.logger.info("db connection success");
        }
        catch (e) {
            this.logger.error("db connection failure\n" + e);
        }
    }

    constructor(col) {
        this.con = this.openConnection(col);
    }
}

module.exports = BaseRepository;