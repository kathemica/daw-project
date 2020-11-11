// const { Device } = require('../database/mysql.connection');
// const device = require('../models/Device');
const  json = require ("sequelize");
const chalk = require('chalk');
const _isNull = require('lodash/isNull');
const models = require('../models');
const Device = models.Device;
const Op = models.Sequelize.Op;


//metodos
// Crear un nuevo registro

exports.create = async (req, res) => {
    try {
        // Validate request
        if (!req.body.name) {
            res.status(400).send({
                status:"bad",
                message: "Name can not be empty!"
            });
            return;
        }
        let data = await Device.findOne(
            {   where:{
                    name:req.body.name
                }
            }).catch(e => {
                console.log("ERROR: ", e);
                return null;
            })

        if (_isNull(data)){
            // Create a device
            const newDevice = {
                name: req.body.name,
                descripcion: req.body.descripcion? req.body.descripcion: '',
                state: req.body.state? Number.parseInt(req.body.state) : 0,
                type: req.body.type? Number.parseInt(req.body.type) : 0,
                dimerized: req.body.dimerized? Number.parseInt(req.body.dimerized) : 0,
                dimer_value: req.body.dimer_value? Number.parseInt(req.body.dimer_value) : 0.0,
            };

            return await Device.create(newDevice
                ).then(data => {
                    res.status(200).json({
                        status:"ok",
                        data: data
                    });
                }).catch(err => {
                    res.status(500).send({
                        status:"bad",
                        data: err.message || "Some error occurred while creating the Device."

                    });
            });
        }else{
           return res.status(409).json({
                status:"bad",
                data: 'Ya existe un dispositivo activo con esos datos'
            });
        }
    }catch (e) {
        return res.status(500).json({
            status:"bad",
            data: 'Internal Server Error'
        });
    }
};

//encontrar todos los dispositivos
exports.findALl = async  (req, res) => {
    return await Device.findAll({ attributes: ['id', 'name', 'descripcion', 'state', 'type', 'dimerized', 'dimer_value']})
        .then(data => {
            res.status(200).json({
                status: "ok",
                data: data
            });
        }).catch(err => {
            res.status(500).send({
                status: "bad",
                data: err.message || "Some error occurred while retrieving devices."
            });
        });
};

// Encontrar un registro en particular
exports.get = async (req, res) => {
    try{
        let id = req.params.id;

        let data = await Device.findOne(
            {   where:{
                    id:id
                }
            });

        if (!_isNull(data)){
            return res.status(200).json({
                        status:"ok",
                        data: data
                    });
        }else{
            return res.status(404).send({
                status:"not found",
                data: "Error retrieving register with id=" + id + ', could be disabled, deleted or it doesn\'t exists in DB'
            });
        }
    }catch(error){
        res.status(500).json({
            status: "bad",
            data: "Error retrieving register with id=" + id,
        })
    }
};

// Update a device by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;

    try{
        let data = await Device.update(req.body,{
            where:{
                id:id
            }
        });

        if (!_isNull(data)){
            data = await Device.findOne({ attributes: ['id', 'name', 'descripcion', 'state', 'type', 'dimerized', 'dimer_value']},
                {   where:{
                        id:id
                    }
                });
            return res.status(200).json({
                status:"ok",
                data: data
            })
        }else {
            return res.status(202).json({
                status: "bad",
                data: "Error retrieving register with id=" + id + ', could be disabled, deleted or it doesn\'t exists in DB'
            })
        }
    }catch(error){
            res.status(500).json({
                status:  'bad',
                data: "Error updating register with id=" + id
            })
    }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    return await Device.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    status: 'ok',
                    data:  "Device was deleted successfully!"
                });
            } else {
                res.status(202).send({
                    status: `bad`,
                    data: `Cannot delete Device with id=${id}. Maybe Device was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                status: 'bad',
                data: "Could not delete Device with id=" + id
            });
        });
};