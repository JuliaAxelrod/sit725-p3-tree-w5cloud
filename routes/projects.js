let express = require("express");
let router = express.Router();

let controller = require("../controller/projectController");

//get all the projects
router.get('/', (req, res) => {
    controller.getProjects(res);
});


//to get a project with id
router.get('/:id', (req, res) => {
    //call a method from the controller
    // res.send(data);
    res.send("this is worked");
});



//insert a new project
router.post('/', (req, res) => {
    controller.insertProject(req.body, res);

})


//remove a given project
router.delete('/:id', (req, res) => {
    controller.deleteProject(req.params.id, res);
})


//update the project
router.put('/', (req, res) => {
    //call a method from the controller to insert data to the db
    res.sendStatus(204);
})

module.exports = router;