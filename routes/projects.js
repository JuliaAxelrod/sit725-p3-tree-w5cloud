const express = require("express");
const router = express.Router();

const projectService = require("../services/projects");


router.get('/', (req, res) => {
    projectService.getAllProjects(res);
});


router.get('/:id', (req, res) => {
    projectService.getProjectByID(req.params.id, res);
});


router.post('/', (req, res) => {
    projectService.insertProject(req.body, res);
});

router.put('/:id', (req, res) => {
    //req.body
    res.send("Hello from project update " + req.params.id + " reousces API ");
});

router.delete('/:id', (req, res) => {
    projectService.deleteProject(req.params.id, res);
});

module.exports = router;
