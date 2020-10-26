const express = require('express');
const router = express.Router();
const User = require('../config/models/User');
const _ = require('lodash');

//create /api/users
router.post('/', (req, res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    }).then(post => {
        res.status(200).json(post);
    }).catch(error => {
        res.status(400).send(error);
    });
});



module.exports = router;