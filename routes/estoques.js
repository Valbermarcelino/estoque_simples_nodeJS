const express = require('express');
const router = express.Router();
const { Estoque } = require('../models');

// CREATE - Adicionar um novo item de estoque
router.post('/', async (req, res) => {
  try {
    const { referencia, descricao } = req.body;
    const novoEstoque = await Estoque.create({ referencia, descricao });
    res.status(201).json(novoEstoque);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar item de estoque' });
  }
});

// READ - Obter todos os itens de estoque
router.get('/', async (req, res) => {
  try {
    const estoques = await Estoque.findAll();
    res.status(200).json(estoques);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter itens de estoque' });
  }
});

// READ - Obter um item de estoque pelo ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const estoque = await Estoque.findByPk(id);
    if (estoque) {
      res.status(200).json(estoque);
    } else {
      res.status(404).json({ error: 'Item de estoque não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter item de estoque' });
  }
});

// UPDATE - Atualizar um item de estoque pelo ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { referencia, descricao } = req.body;
    const [updated] = await Estoque.update({ referencia, descricao }, {
      where: { id }
    });
    if (updated) {
      const updatedEstoque = await Estoque.findByPk(id);
      res.status(200).json(updatedEstoque);
    } else {
      res.status(404).json({ error: 'Item de estoque não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar item de estoque' });
  }
});

// DELETE - Deletar um item de estoque pelo ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Estoque.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(204).json(); // Sem conteúdo
    } else {
      res.status(404).json({ error: 'Item de estoque não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar item de estoque' });
  }
});

module.exports = router;
