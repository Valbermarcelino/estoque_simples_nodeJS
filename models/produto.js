'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    static associate(models) {
      // Associação com Referencia
      Produto.belongsTo(models.Referencia, {
        foreignKey: 'ref', // Campo em 'produtos' que é a chave estrangeira
        targetKey: 'referencia', // Campo em 'referencias' que será referenciado
        as: 'referenciaProduto' // Alias da associação (opcional)
      });
    }
  }

  Produto.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true // O campo não pode ser vazio
      }
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0 // Não pode ser negativo
      }
    },
    preco: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0.0 // Não pode ser negativo
      }
    },
    ref: { // Campo que será a chave estrangeira
      type: DataTypes.STRING,
      allowNull: true
    },
    responsavel: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Produto',
    tableName: 'produtos',
    timestamps: true
  });

  return Produto;
};
