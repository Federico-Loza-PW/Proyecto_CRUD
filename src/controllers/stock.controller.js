const stockService = require('../services/stock.service');

exports.getAllStock = async (req, res) => {
  try {
    const stock = await stockService.getAllStock();
    res.json(stock);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener stock' });
  }
};

exports.getStockById = async (req, res) => {
  try {
    const stock = await stockService.getStockById(req.params.id);
    if (!stock) return res.status(404).json({ mensaje: 'Stock no encontrado' });
    res.json(stock);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener stock' });
  }
};

exports.createStock = async (req, res) => {
  try {
    const nuevo = await stockService.createStock(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear stock' });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const actualizado = await stockService.updateStock(req.params.id, req.body);
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar stock' });
  }
};

exports.deleteStock = async (req, res) => {
  try {
    await stockService.deleteStock(req.params.id);
    res.json({ mensaje: 'Stock eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar stock' });
  }
};