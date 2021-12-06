let express = require("express");
let app = express();

//var app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
let dbo = require('./db/conn');

const projectRouter = require('./routes/projects');
const studentRouter = require('./routes/students');

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(express.json({ limit: '50mb' }));

app.use('/api/projects', projectRouter);
app.use('/api/students', studentRouter);

app.get("/test", function (request, response) {
    var user_name = request.query.user_name;
    response.end("Hello " + user_name + "!");
});

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