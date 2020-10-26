const { Router } = require('express');
// const controllers = require('../controllers');
const router = Router();


//Rutas
//Defaul: I'm allive
router.get('/', function(req, res, next) {
    res.json('I\'m allive!!!!');
});


module.exports = router;