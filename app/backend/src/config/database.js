/**
 * Creates a connection to MongoDB
 */

const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://ahtruong:AgxiWOltO0fjEDC4@cs4241.u75fs.mongodb.net/";

let client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

client.connect()
    .then((connectedClient) => {
        client = connectedClient;
        console.log("Successfully connected to MongoDB!");
    })
    .catch((error) => {
        console.error(error);
    });

module.exports = client;
