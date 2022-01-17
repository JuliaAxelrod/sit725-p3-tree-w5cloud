const { MongoClient } = require('mongodb');

// const uri = "mongodb+srv://d:4rUoDgJnm9bdNg3Z@cluster0.z1wct.mongodb.net/pitch-project?retryWrites=true&w=majority";

const uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mongo-database:27017`;

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

