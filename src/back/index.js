/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main backend file
=============================================================================*/

//=======[ Settings, Imports & Data ]==========================================

var PORT = 3000;

var express = require('express');
var app = express();
var mysql = require('./mysql-connector');
var datos = require('./data.json');
var _ = require('lodash');
const { isInteger } = require('lodash');

// to parse application/json
app.use(express.json());
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================

app.get('/dispositivos', function(req, res, next) {
    // let id= req.params.id;
    // console.log(id),

    // response = "{ 'key1':'value1' }"

    res.json(datos);
    // res.send(JSON.stringify(response)).status(200);
});

app.get('/dispositivos/:id', function(req, res, next) {
    console.log('Getting...')
    console.log(req.params.id);
    // console.log(datos);

    let datosFIltrados = datos.filter((item) => item.id === req.params.id);
    console.log(datosFIltrados);

    res.json(datosFIltrados)
});


app.post('/dispositivos/', function(req, res) {
    let datosFIltrados = datos.filter(item => item.id === require.body.id);

    if (datosFIltrados.length > 0) {
        datosFIltrados[0].state = req.body.state;
    }

    res.json(datosFIltrados);
})




app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================