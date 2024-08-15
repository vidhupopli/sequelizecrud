'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    static associate(models) {
    }
  }
  Tasks.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    location: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Tasks',
  });
  return Tasks;
};