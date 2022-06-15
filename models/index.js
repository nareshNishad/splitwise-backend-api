const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const dbConfig = require("../config/sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const basename = path.basename(__filename);

const db = {};

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    //const model = sequelize.import(path.join(__dirname, file));
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

console.log(db);
db.sequelize = sequelize;
db.Sequelize = Sequelize;
//db.user = require("./user.js")(sequelize, Sequelize);

// relationships for models

//= ==============================
// Define all relationships here below
//= ==============================
db.Expense.hasMany(db.Relation, { as: "relation_id" });
db.Relation.belongsTo(db.Expense, {
  foreignKey: "expense_id",
  as: "expense",
});

db.Expense.hasMany(db.Settle, { as: "settle_id" });
db.Settle.belongsTo(db.Expense, {
  foreignKey: "expense_id",
  as: "expense",
});

module.exports = db;
