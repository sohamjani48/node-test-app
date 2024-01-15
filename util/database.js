const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "Srj@13579", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
