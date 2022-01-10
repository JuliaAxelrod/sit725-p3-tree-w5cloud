let express = require("express");
let app = express();

//var app = require('express')();
let http = require('http').createServer(app);
//create a socket io server
let io = require('socket.io')(http);

let dbo = require('./db/conn');

const projectRouter = require('./routes/projects');
const studentRouter = require('./routes/students');

var port = process.env.PORT || 8080;


app.use(express.static(__dirname + '/public'));
app.use(express.json({ limit: '50mb' }));

app.use((req,res,next)=> {
    req.io  = io;
    return next();
});

app.use('/api/projects', projectRouter);
app.use('/api/students', studentRouter);

app.get("/add/:n1/:n2", function (request, response) {
    const a = parseInt(request.params.n1);
    const b = parseInt(request.params.n2);
    const result = a + b || null;
    console.log(result);
    if (result == null) {
        response.status(400).json({error:'bad input, the input should be two numbers'});
    } else {
        response.json({ result: result });
    }

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


const onConnection = (socket) => { 
    socket.on("chat:msg", (msg) => {
        socket.broadcast.emit("chat:brodcast",msg);
        console.log(msg);
    })
    console.log("a new user is connected");
}


io.on("connection", onConnection);


//this is only needed for Cloud foundry 
require("cf-deployment-tracker-client").track();