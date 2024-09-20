'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    /**
     * Método para definir associações.
     * Este método não faz parte do ciclo de vida do Sequelize.
     * O arquivo `models/index` chamará este método automaticamente.
     */
    static associate(models) {
      // Definir associações, se necessário
    }
  }

  Produto.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false, // Campo obrigatório
      validate: {
        notEmpty: true // O campo não pode ser vazio
      }
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false, // Campo obrigatório
      validate: {
        isInt: true, // Valida se é um número inteiro
        min: 0 // Não pode ser negativo
      }
    },
    preco: {
      type: DataTypes.DECIMAL,
      allowNull: false, // Campo obrigatório
      validate: {
        isDecimal: true, // Valida se é um número decimal
        min: 0.0 // Não pode ser negativo
      }
    },
    ref: { // Novo campo ref
      type: DataTypes.STRING,
      allowNull: true // Se necessário, troque para false se o campo não puder ser nulo
    },
    responsavel: { // Novo campo responsavel
      type: DataTypes.STRING,
      allowNull: true // Se necessário, troque para false se o campo não puder ser nulo
    }
  }, {
    sequelize,
    modelName: 'Produto',
    tableName: 'Produtos', // Nome da tabela no banco de dados
    timestamps: true // Adiciona campos createdAt e updatedAt automaticamente
  });

  return Produto;
};
