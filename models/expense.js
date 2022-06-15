const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define(
    "Expense",
    {
      expense_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      owner: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      members: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },
    },
    {
      // https://sequelize.org/master/manual/model-basics.html#model-definition
      timestamps: true,
    }
  );

  return Expense;
};
