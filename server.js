let express = require("express");
let dbo = require("./db/conn");
let app = express();

//var app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);



var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(express.json());



app.get("/test", function (request, response) {
    var user_name = request.query.user_name;
    response.end("Hello " + user_name + "!");
});


//socket test
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10));
    }, 1000);

});


const projects = [];

for (let id = 1; id < 21; id++) {
    projects.push({
        projectID: id,
        title: 'project ' + id,
        info: `This is the info for project number ${id}`,
        img: null,
    });
}


app.get("/projects", function (request, response) {
    dbo.getDb().collection("projects").find({}).toArray(function (err, res) {
        if (err)
            throw err
        response.send(res);
    });
});

app.get("/project/test", function (request, response) {
    dbo.getDb().collection("projects").find({title:"test 2"}).toArray(function (err, res) {
        if (err)
            throw err
        response.send(res);
    });
});

app.post("/projects", function (request, response) {
    //add some validation logic
    const project = request.body;
    console.log(JSON.stringify(project));
    if (project) {
        dbo.getDb().collection("projects").insertOne(project);
    } else {
        response.sendStatus(500);
    }
    response.sendStatus(204);
});



dbo.connectToDatabase(function (err) {
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