const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://ahas36:4rUoDgJnm9bdNg3Z@cluster0.z1wct.mongodb.net/pitch-project?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let dbConnection;

module.exports = {
    connect: (callback) => {
        client.connect((err, db) => {
            if (err || !db)
                return callback(err);

            dbConnection = db.db("pitch-project");

            console.log("Connected to MongoDB Atlas");

            callback();
        });
    },
    getDB : () => {
        return dbConnection;
    },
    disconnect : () => {
        client.close();
    }
}

