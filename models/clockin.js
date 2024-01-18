'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClockIn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ClockIn.init({
    jam: DataTypes.TIME,
    tanggal: DataTypes.DATE,
    keterangan: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ClockIn',
  });
  return ClockIn;
};