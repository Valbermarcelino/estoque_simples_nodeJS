const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors'); // Importar o middleware cors

const { Produto } = require('./models');

const referenciasRouter = require('./routes/referencia'); // Importar as rotas de estoques

const app = express();
const port = 3000;

// Configurar o middleware cors
app.use(cors());

app.use(bodyParser.json());

// Rotas de CRUD
app.get('/produtos', async (req, res) => {
  const produtos = await Produto.findAll();
  res.json(produtos);
});

app.post('/produtos', async (req, res) => {
  const { nome, quantidade, preco, ref, responsavel } = req.body;
  const novoProduto = await Produto.create({ nome, quantidade, preco, ref, responsavel});
  res.json(novoProduto);
});

app.put('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, quantidade, preco, ref, responsavel } = req.body;
  await Produto.update({ nome, quantidade, preco, ref, responsavel }, { where: { id } });
  res.json({ message: 'Produto atualizado com sucesso' });
});

app.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  await Produto.destroy({ where: { id } });
  res.json({ message: 'Produto excluído com sucesso' });
});


app.use('/referencias', referenciasRouter);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
