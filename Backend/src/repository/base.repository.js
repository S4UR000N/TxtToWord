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

    async openConnection() {
        try {
            console.log(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`);
            // Connect the client to the server (optional starting in v4.7)
            await this.client.connect();

            // Send a ping to confirm a successful connection
            await this.client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        }
        catch(e) {
            console.log("db connection failure");
        }
        finally {
            // Ensures that the client will close when you finish/error
            await this.client.close();
        }
    }
}

module.exports = BaseRepository;