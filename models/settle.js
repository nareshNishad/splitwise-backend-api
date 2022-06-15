const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Settle = sequelize.define(
    "Settle",
    {
      settle_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      payer: {
        type: DataTypes.INTEGER,
      },
      paidTo: {
        type: DataTypes.STRING,
        allowNull: true,
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

  return Settle;
};
