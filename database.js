// database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite', // ou 'mysql', 'postgres', etc.
  storage: './database.sqlite', // spécifiez le chemin pour SQLite
});

module.exports = sequelize;