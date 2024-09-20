'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Adicionar a constraint de chave estrangeira
    await queryInterface.addConstraint('produtos', {
      fields: ['ref'], // Campo na tabela 'produtos' que será a chave estrangeira
      type: 'foreign key',
      name: 'fk_produtos_ref_referencias', // Nome da constraint (opcional, mas recomendado)
      references: {
        table: 'referencias', // Nome da tabela de referência
        field: 'referencia' // Campo de referência na tabela 'referencias'
      },
      onDelete: 'SET NULL', // Ação ao deletar o registro na tabela referenciada
      onUpdate: 'CASCADE' // Ação ao atualizar o valor na tabela referenciada
    });
  },

  async down(queryInterface, Sequelize) {
    // Remover a constraint de chave estrangeira
    await queryInterface.removeConstraint('produtos', 'fk_produtos_ref_referencias');
  }
};
