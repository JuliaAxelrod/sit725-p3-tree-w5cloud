let express = require("express");
let app = express();

//var app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
let dbo = require('./db/conn');
let projectRoute = require("./routes/projects");
let studentRoute = require("./routes/students");

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(express.json({limit: '50mb'}));

app.use('/api/projects',projectRoute);
app.use('/api/students',studentRoute);


dbo.connect((err) => {
    if (err) {
        console.error(err);
        process.exit();
    }

    http.listen(port, () => {
        console.log("Listening on port ", port);
    });
});


//this is only needed for Cloud foundry 
require("cf-deployment-tracker-client").track();