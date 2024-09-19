'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('estoques', [
      {
        referencia: 'REF001',
        descricao: 'Descrição do produto 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        referencia: 'REF002',
        descricao: 'Descrição do produto 2',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('estoques', null, {});
  }
};
