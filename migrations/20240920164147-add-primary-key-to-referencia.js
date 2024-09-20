'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Remover a coluna 'id', se existir
    await queryInterface.removeColumn('referencias', 'id');

    // Alterar a coluna 'referencia' para não permitir nulos
    await queryInterface.changeColumn('referencias', 'referencia', {
      type: Sequelize.STRING,
      allowNull: false
    });

    // Adicionar a constraint de chave primária na coluna 'referencia'
    await queryInterface.addConstraint('referencias', {
      fields: ['referencia'],
      type: 'primary key',
      name: 'referencias_pkey' // Nome da constraint
    });
  },

  async down(queryInterface, Sequelize) {
    // Remover a constraint de chave primária
    await queryInterface.removeConstraint('referencias', 'referencias_pkey');

    // Alterar a coluna 'referencia' para remover a chave primária
    await queryInterface.changeColumn('referencias', 'referencia', {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: false
    });

    // Recriar a coluna 'id', se necessário
    await queryInterface.addColumn('referencias', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    });
  }
};
