let express = require("express");
let app = express();

//var app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);



var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));


app.get("/test", function(request, response) {
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


app.get("/projects", function(request, response) {
    response.json(projects);
});



http.listen(port, () => {
    console.log("Listening on port ", port);
});

//this is only needed for Cloud foundry 
require("cf-deployment-tracker-client").track();