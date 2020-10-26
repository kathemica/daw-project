require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/mysql')(process.env.NODE_ENV);

const mysqlConnObj  = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        host: config.host,
        port: config.port,
        dialect: config.dialect,
        operatorsAliases: false
    }
);

//vincular con los modelos
mysqlConnObj.Device = require('../models/Device.model')(mysqlConnObj, DataTypes);

module.exports = mysqlConnObj;
