const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConfig').sequelize

const Earning = sequelize.define('Earning', {
  earningId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  transactionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  profitPercentage: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Earning;
