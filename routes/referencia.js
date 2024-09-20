const express = require('express');
const router = express.Router();
const { Referencia } = require('../models');

// CREATE - Adicionar um novo item de referencia
router.post('/', async (req, res) => {
  try {
    const { referencia, descricao } = req.body;
    const novoReferencia = await Referencia.create({ referencia, descricao });
    res.status(201).json(novoReferencia);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar item de referencia' });
  }
});

// READ - Obter todos os itens de referencia
router.get('/', async (req, res) => {
  try {
    const referencias = await Referencia.findAll();
    res.status(200).json(referencias);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter itens de referencia' });
  }
});

// READ - Obter um item de referencia pelo ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const referencia = await Referencia.findByPk(id);
    if (referencia) {
      res.status(200).json(referencia);
    } else {
      res.status(404).json({ error: 'Item de referencia não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter item de referencia' });
  }
});

// UPDATE - Atualizar um item de referencia pelo ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { referencia, descricao } = req.body;
    const [updated] = await Referencia.update({ referencia, descricao }, {
      where: { id }
    });
    if (updated) {
      const updatedReferencia = await Referencia.findByPk(id);
      res.status(200).json(updatedReferencia);
    } else {
      res.status(404).json({ error: 'Item de referencia não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar item de referencia' });
  }
});

// DELETE - Deletar um item de referencia pelo ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Referencia.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(204).json(); // Sem conteúdo
    } else {
      res.status(404).json({ error: 'Item de referencia não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar item de referencia' });
  }
});

module.exports = router;
