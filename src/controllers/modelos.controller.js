const modeloService = require('../services/modelos.service');

exports.getAllModelos = async (req, res) => {
  try {
    const modelos = await modeloService.getAllModelos();
    res.json(modelos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener modelos' });
  }
};

exports.getModeloById = async (req, res) => {
  try {
    const modelo = await modeloService.getModeloById(req.params.id);
    if (!modelo) return res.status(404).json({ mensaje: 'Modelo no encontrado' });
    res.json(modelo);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener modelo' });
  }
};

exports.createModelo = async (req, res) => {
  try {
    const nuevo = await modeloService.createModelo(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear modelo' });
  }
};

exports.updateModelo = async (req, res) => {
  try {
    const actualizado = await modeloService.updateModelo(req.params.id, req.body);
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar modelo' });
  }
};

exports.deleteModelo = async (req, res) => {
  try {
    await modeloService.deleteModelo(req.params.id);
    res.json({ mensaje: 'Modelo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar modelo' });
  }
};
