require('dotenv').config();
const { MongoClient, ServerApiVersion } = require("mongodb");

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
        try {
            this.client.connect().then(_ => {
                this.db = this.client.db(process.env.DB_NAME);
                this.col = this.db.collection(col);
            });            
            console.log("db connection success");
        }
        catch(e) {
            console.log(e);
            console.log("db connection failure");
        }
    }

    constructor(col) {
        this.openConnection();
    }
}

module.exports = BaseRepository;