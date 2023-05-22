const { MongoClient, ServerApiVersion } = require("mongodb");

const connectionString = "mongodb+srv://rboisseau:xya2UYrvkpJEo6SY@penalitybox.9gz0vcq.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

var dbConnection;

module.exports = {
    client, connectionString: async (callback) => {
        try {
            var db = await client.connect();

            dbConnection = db.db("penalitybox");

            console.log("Successfully connected to MongoDB.");
            return dbConnection;
        } catch (e) {
            console.error(e);
            return e;
        }
    },

    getDb: function () {
        return dbConnection;
    }
}