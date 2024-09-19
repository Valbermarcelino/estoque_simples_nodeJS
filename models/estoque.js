'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Estoque extends Model {
    /**
     * Define associações, se necessário.
     */
    static associate(models) {
      // Definir associações aqui, se necessário
    }
  }

  Estoque.init({
    referencia: {
      type: DataTypes.STRING,
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
    modelName: 'Estoque',
    tableName: 'estoques', // Nome da tabela no banco de dados
    timestamps: true // Adiciona campos createdAt e updatedAt automaticamente
  });

  return Estoque;
};
