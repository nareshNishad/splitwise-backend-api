// const Sequelize = require("sequelize");

// const sequelize = new Sequelize(
//   "splitwisedb",
//   "root",
//   "",
//   {
//     host: "localhost",
//     port: 3306,
//     dialect: "mysql",
//   }
// );

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });

module.exports = {
  HOST: "localhost",
  PORT: 5432,
  USER: "postgres",
  PASSWORD: "password",
  DB: "setu",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
