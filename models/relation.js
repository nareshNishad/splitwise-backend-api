const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Relation = sequelize.define(
    "Relation",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lender: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      // https://sequelize.org/master/manual/model-basics.html#model-definition
      timestamps: true,
    }
  );
  return Relation;
};
