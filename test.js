const { Produto } = require('./models');

async function createProduto() {
  try {
    await Produto.create({
      nome: 'Produto de Teste',
      quantidade: 100,
      preco: 19.99,
      ref: 'REF123' // Se esta referência não existir, será criada na tabela referencias
    });
    console.log('Produto criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar o produto:', error);
  }
}

createProduto();
