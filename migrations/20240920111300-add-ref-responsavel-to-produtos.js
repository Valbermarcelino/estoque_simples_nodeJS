'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Adicionar a coluna 'ref'
    await queryInterface.addColumn('Produtos', 'ref', {
      type: Sequelize.STRING,
      allowNull: true // Mude para false se o campo for obrigatório
    });

    // Adicionar a coluna 'responsavel'
    await queryInterface.addColumn('Produtos', 'responsavel', {
      type: Sequelize.STRING,
      allowNull: true // Mude para false se o campo for obrigatório
    });
  },

  async down(queryInterface, Sequelize) {
    // Remover a coluna 'ref'
    await queryInterface.removeColumn('Produtos', 'ref');

    // Remover a coluna 'responsavel'
    await queryInterface.removeColumn('Produtos', 'responsavel');
  }
};
