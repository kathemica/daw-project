/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 // * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main backend file
 * Modified by: Ing. Katherine Aguirre
=============================================================================*/

//=======[ Settings, Imports & Data ]==========================================
require('dotenv').config();

const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser');

const mysqlConnObj = require('./database/mysql.connection');
const routes = require('./routes');

const app = express();
const PORT =  process.env.SERVER_PORT || 3000;

//middleware para poder rellenar el req.body
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// app.use(function (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.end(JSON.stringify(req.body, null, 2))
// });

//=======[ Main module code ]=================================================
//routing
require('./routes')(app);
// app.get('/test/', function(req, res, next) {
//     console.log('puta madre');
//     // res.json('I\'m allive!!!!');
//     res.status(400).send('puta madre get');
// });


//para organizar los recursos
// app.get('/usuarios', function(req, res, next) {
//     User.findAll().then( users => {
//         res.json(users);
//     })
// });
//
// app.post('/usuarios/', function(req, res) {
//     User.create({
//         name: "test",
//         birthday: new Date(2019, 5, 19)
//     }).then(user =>{
//         res.json(user);
//     });
// });
//
// app.get('/dispositivos', function(req, res, next) {
//     res.json(datos);
// });
//
// app.get('/dispositivos/:id', function(req, res, next) {
//     console.log('Getting...')
//     console.log(req.params.id);
//     // console.log(datos);
//
//     let datosFIltrados = datos.filter((item) => item.id === req.params.id);
//     console.log(datosFIltrados);
//
//     res.json(datosFIltrados)
// });
//
// app.post('/dispositivos/', function(req, res) {
//     let datosFIltrados = datos.filter(item => item.id === require.body.id);
//
//     if (datosFIltrados.length > 0) {
//         datosFIltrados[0].state = req.body.state;
//     }
//
//     res.json(datosFIltrados);
// });



app.listen(PORT, function(req, res) {
    console.log(chalk.greenBright(`NodeJS API running correctly on port: ${PORT}`));

    try {
        //force; true es DROP tables
        mysqlConnObj.sync({
            force: false
            }).then(() => {
                console.log(chalk.bgGreen(`Connection success`));
            }).catch( error => {
                console.log(chalk.bgRed('Error: '), error);
            })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
/*
//=======[ End of file ]=======================================================
// const express = require("express");
// const bodyParser = require('body-parser');
// const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
let usuario = {
    nombre:'',
    apellido: ''
};
let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};
// app.get('/', function(req, res) {
//     respuesta = {
//         error: true,
//         codigo: 200,
//         mensaje: 'Punto de inicio'
//     };
//     res.send(respuesta);
// });
app.get('/usuario', function (req, res) {
    respuesta = {
        error: false,
        codigo: 202,
        mensaje: ''
    };
    if(usuario.nombre === '' || usuario.apellido === '') {
        respuesta = {
            error: true,
            codigo: 501,
            mensaje: 'El usuario no ha sido creado..'
        };
    } else {
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'respuesta del usuario',
            respuesta: usuario
        };
    }
    res.send(respuesta);
});
// app.post('/usuario', function (req, res) {
//     if(!req.body.nombre || !req.body.apellido) {
//         respuesta = {
//             error: true,
//             codigo: 502,
//             mensaje: 'El campo nombre y apellido son requeridos'
//         };
//     } else {
//         if(usuario.nombre !== '' || usuario.apellido !== '') {
//             respuesta = {
//                 error: true,
//                 codigo: 503,
//                 mensaje: 'El usuario ya fue creado previamente'
//             };
//         } else {
//             usuario = {
//                 nombre: req.body.nombre,
//                 apellido: req.body.apellido
//             };
//             respuesta = {
//                 error: false,
//                 codigo: 200,
//                 mensaje: 'Usuario creado',
//                 respuesta: usuario
//             };
//         }
//     }
//
//     res.send(respuesta);
// });
// app.put('/usuario', function (req, res) {
//     if(!req.body.nombre || !req.body.apellido) {
//         respuesta = {
//             error: true,
//             codigo: 502,
//             mensaje: 'El campo nombre y apellido son requeridos'
//         };
//     } else {
//         if(usuario.nombre === '' || usuario.apellido === '') {
//             respuesta = {
//                 error: true,
//                 codigo: 501,
//                 mensaje: 'El usuario no ha sido creado'
//             };
//         } else {
//             usuario = {
//                 nombre: req.body.nombre,
//                 apellido: req.body.apellido
//             };
//             respuesta = {
//                 error: false,
//                 codigo: 200,
//                 mensaje: 'Usuario actualizado',
//                 respuesta: usuario
//             };
//         }
//     }
//
//     res.send(respuesta);
// });
// app.delete('/usuario', function (req, res) {
//     if(usuario.nombre === '' || usuario.apellido === '') {
//         respuesta = {
//             error: true,
//             codigo: 501,
//             mensaje: 'El usuario no ha sido creado'
//         };
//     } else {
//         respuesta = {
//             error: false,
//             codigo: 200,
//             mensaje: 'Usuario eliminado'
//         };
//         usuario = {
//             nombre: '',
//             apellido: ''
//         };
//     }
//     res.send(respuesta);
// });
app.use(function(req, res, next) {
    respuesta = {
        error: true,
        codigo: 404,
        mensaje: 'URL no encontrada'
    };
    res.status(404).send(respuesta);
});
app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});
*/
