const devices = require('../controllers/devices.controller');
const router = require('express').Router();

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send ({
        message: 'I AM GROOT',
    }));

    //devices
    app.get('/api/devices', devices.findALl);
    app.get('/api/devices/:id', devices.findOne);
    app.post('/api/devices', devices.create);
}