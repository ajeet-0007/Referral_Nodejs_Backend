const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConfig').sequelize

const Transaction = sequelize.define('Transaction', {
  transactionId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  eligibleForProfit: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Transaction;
