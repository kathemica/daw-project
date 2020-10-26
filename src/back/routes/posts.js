const express = require('express');
const router = express.Router();
const Post = require('../config/models/Post');

//Create
router.post('/', (req, res) => {
    Post.create({
        title: req.query.title,
        body: req.body.body
    }).then(post => {
        res.status(200).json(post);
    }).catch(error => {
        res.status(400).send(error);
    });
});

//Read all
router.get('/', (req, res) => {
    Post.findAll(
    ).then(post => {
        res.status(200).json(post);
    }).catch(error => {
        res.status(400).send(error);
    });
});

//Read by id
router.get('/:id', (req, res) => {
    Post.findByPk(
        req.params.id
    ).then(post => {
        res.status(200).json(post);
    }).catch(error => {
        res.status(400).send(error);
    });
});

//Update
router.patch('/:id', (req, res) => {
    Post.update({
        title: req.body.title,
        body: req.body.body
    }, {
        where: {
            id: req.params.id
        }
    }).then(post => {
        res.status(200).json(post);
    }).catch(error => {
        res.status(400).send(error);
    });
});

//Delete
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(post => {
        res.status(200).json(post);
    }).catch(error => {
        res.status(400).send(error);
    });
});

module.exports = router;