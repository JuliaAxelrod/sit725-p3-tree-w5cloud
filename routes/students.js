const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    res.send("Hello from student get all reousces API");
});


router.get('/:id', (req, res) => {
    res.send("Hello from student " + req.params.id + " reousces API ");
});


router.post('/', (req, res) => {
    //req.body
    res.sendStatus(204);
});

router.put('/:id', (req, res) => {
    //req.body
    res.send("Hello from student update " + req.params.id + " reousces API ");
});

router.delete('/:id', (req, res) => {
    //req.body
    res.send("Hello from student delete " + req.params.id + " reousces API ");
});

module.exports = router;
