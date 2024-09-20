'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('estoques', 'referencias'); // Renomeia a tabela
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('referencias', 'estoques'); // Reverte a alteração
  }
};
