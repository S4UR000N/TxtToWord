require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const logger = require('../service/logger.service');

class BaseRepository {
    client = new MongoClient(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`,  {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        }
    );
    db = null;
    col = null;

    openConnection(col) {
        this.client.connect()
        .then(_ => {
            this.db = this.client.db(process.env.DB_NAME);
            this.col = this.db.collection(col);
            logger.info("db connection success");

        })
        .catch(e => {             
            logger.error("db connection failure\n" + e);
        });
    }

    constructor(col) {
        this.openConnection(col);
    }
}

module.exports = BaseRepository;