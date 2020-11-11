
require('dotenv').config();
const env = process.env.NODE_ENV || 'development' ;
const dbConfig = require('../config/mysql.js')(env);
const Sequelize = require('sequelize');
const path = require('path');

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Device = require("./Device.model")(sequelize, Sequelize);

module.exports = db;

