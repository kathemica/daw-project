const devices = require('../controllers/devices.controller');

module.exports = (app) => {
    const router = require('express').Router();

    //devices
    router.get('/devices', devices.findALl);
    router.get('/devices/:id', devices.get);
    router.post('/devices', devices.create);
    router.put('/devices/:id', devices.update);
    router.delete('/devices/:id', devices.delete);

    app.use('/api', router);
}