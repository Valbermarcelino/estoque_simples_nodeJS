'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    static associate(models) {
      // Definir associações aqui, se necessário
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
    ref: { // Campo ref do produto
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
    timestamps: true,
    hooks: {
      // Hook beforeCreate para adicionar uma referência, se necessário
      async beforeCreate(produto, options) {
        const { Referencia } = sequelize.models; // Certifique-se de que o modelo `Referencia` foi carregado

        if (produto.ref) {
          // Verifica se a referência já existe
          const referenciaExistente = await Referencia.findOne({
            where: { referencia: produto.ref }
          });

          // Se a referência não existir, cria uma nova
          if (!referenciaExistente) {
            await Referencia.create({
              referencia: produto.ref,
              descricao: produto.nome // Usa o nome do produto como descrição
            });
          }
        }
      }
    }
  });

  return Produto;
};
