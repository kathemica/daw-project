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

const app = express();
const PORT =  process.env.SERVER_PORT || 3000;

//middleware para poder rellenar el req.body
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());
// app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
require('./routes/')(app);
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]=================================================

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
