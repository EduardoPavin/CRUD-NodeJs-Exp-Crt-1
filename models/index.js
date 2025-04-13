// models/index.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ExpCriativaCRUD', 'root', '12345678', {
  host: 'localhost',
  port: 3306,   // se necessário
  dialect: 'mysql',
});

module.exports = sequelize;
