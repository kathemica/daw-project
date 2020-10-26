const express = require('express');
const router = express.Router();

//Rutas
//Defaul: I'm allive
router.get('/devices', function(req, res, next) {
    res.json('testing devices...');
});
