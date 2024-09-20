'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Referencia extends Model {
    static associate(models) {
      // Definir associações, se necessário
    }
  }

  Referencia.init({
    referencia: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Referencia',
    tableName: 'referencias',
    timestamps: true
  });

  return Referencia;
};
