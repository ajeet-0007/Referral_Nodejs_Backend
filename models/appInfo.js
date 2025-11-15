const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConfig').sequelize

const AppInfo = sequelize.define('AppInfo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  appId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  appUrl: {
    type: DataTypes.STRING(2048),
    allowNull: false,
  },
  appImageUrl: {
    type: DataTypes.STRING(2048),
    allowNull: false,
  }
}, {
  timestamps: false
});

module.exports = AppInfo;