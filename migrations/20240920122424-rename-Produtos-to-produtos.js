'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('Produtos', 'produtos'); // Renomeia a tabela
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('produtos', 'Produtos'); // Reverte a alteração
  }
};
