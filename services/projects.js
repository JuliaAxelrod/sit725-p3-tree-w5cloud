const dbo = require("../db/conn");

let projectCollection;

setTimeout(() => {
    projectCollection = dbo.getDB().collection("projects");
}, 2000);


const getAllProjects = (res) => {
    projectCollection.find().toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    });
}


const getProjectByID = (id, res) => {
    console.log(id);
    projectCollection.find({ projectID: id }).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    });
}

const insertProject = (project, res, io) => {
    projectCollection.insertOne(project, (err, result) => {
        if (err) throw err;

        //to brodcast a message to all the active clients with the deatils of the new project
        io.emit("project:update", project);
        res.send({ result: 204 });
    });
}


const deleteProject = (id, res) => {
    projectCollection.deleteOne({ projectID: id }, (err, result) => {
        if (err) throw err;
        res.send({ result: 204 });
    });
}


module.exports = {
    getAllProjects,
    getProjectByID,
    insertProject,
    deleteProject
}


