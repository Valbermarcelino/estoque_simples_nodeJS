const express = require('express');
const bodyParser = require('body-parser');
const { Produto } = require('./models');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Rotas de CRUD
app.get('/produtos', async (req, res) => {
  const produtos = await Produto.findAll();
  res.json(produtos);
});

app.post('/produtos', async (req, res) => {
  const { nome, quantidade, preco } = req.body;
  const novoProduto = await Produto.create({ nome, quantidade, preco });
  res.json(novoProduto);
});

app.put('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, quantidade, preco } = req.body;
  await Produto.update({ nome, quantidade, preco }, { where: { id } });
  res.json({ message: 'Produto atualizado com sucesso' });
});

app.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  await Produto.destroy({ where: { id } });
  res.json({ message: 'Produto excluído com sucesso' });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
