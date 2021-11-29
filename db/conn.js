const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://ahas36:zkGbMtZ1eOEXaBmQ@cluster0.z1wct.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let dbConnection;

module.exports = {
    connectToDatabase: function (calback) {
        client.connect(function (err, db) {
            if (err || !db) {
                return calback(err);
            }

            dbConnection = db.db("pitch-project");
            console.log("Connect to monogo atlas");

            return calback();
        });
    },

    getDb: function () {
        return dbConnection;
    }
}

