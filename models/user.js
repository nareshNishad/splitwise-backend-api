const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
    },
  },
  {
    // https://sequelize.org/master/manual/model-basics.html#model-definition
    timestamps: true,
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
