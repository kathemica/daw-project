// const { Device } = require('../database/mysql.connection');
// const device = require('../models/Device');
const models = require('../models');
const Device = models.Device;
const Op = models.Sequelize.Op;

//metodos
//encontrar todos los dispositivos
exports.findALl = (req, res) => {
    Device.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving devices."
            });
        });
};

// Encontrar un registro en particular
exports.findOne = (req, res) => {
    const id = req.params.id;

    Device.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving register with id=" + id
            });
        });
};

// Crear un nuevo registro
exports.create = (req, res) => {
    console.log(req.body);

    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a device
    const device = {
        name: req.body.name,
        descripcion: req.body.descripcion? req.body.descripcion: '',
        state: req.body.state? req.body.state.parseInt: 0,
        type: req.body.type? req.body.type.parseInt: 0
    };

    // Save device in the database
    Device.create(device)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};


// const device = models.D
// const getAllDevices = async (req, res) => {
//     try {
//         const devices = await Device.findAll({
//             include: [{
//                     model: Project
//                 }
//             ]
//         });
//         return res.status(200).json({ devices });
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// };



// Retrieve all Tutorials from the database.
// models.Sequelize.findAll = (req, res) => {
//     // const title = req.query.title;
//     // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
//     Tutorial.findAll()
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving tutorials."
//             });
//         });
//
// };

/*




// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
*/

//
// module.exports = {
//     getAllDevices,
//     createDevice
// }