'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Referencia extends Model {
    static associate(models) {
      // Definir associações aqui, se necessário
    }
  }

  Referencia.init({
    referencia: {
      type: DataTypes.STRING,
      primaryKey: true, // Define 'referencia' como chave primária
      allowNull: false, // O campo não pode ser nulo
      validate: {
        notEmpty: true // O campo não pode ser vazio
      }
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false, // O campo não pode ser nulo
      validate: {
        notEmpty: true // O campo não pode ser vazio
      }
    }
  }, {
    sequelize,
    modelName: 'Referencia',
    tableName: 'referencias',
    timestamps: true // Adiciona campos createdAt e updatedAt automaticamente
  });

  return Referencia;
};
