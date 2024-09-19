'use strict';
module.exports = (sequelize, DataTypes) => {
  const Estoque = sequelize.define('Estoque', {
    referencia: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {});
  Estoque.associate = function(models) {
    // Associações podem ser definidas aqui
  };
  return Estoque;
};
