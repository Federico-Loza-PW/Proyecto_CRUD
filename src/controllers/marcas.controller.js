const marcaService = require('../services/marcas.service');

exports.getAllMarcas = async (req, res) => {
  try {
    const marcas = await marcaService.getAllMarcas();
    res.json(marcas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener marcas' });
  }
};

exports.getMarcaById = async (req, res) => {
  try {
    const marca = await marcaService.getMarcaById(req.params.id);
    if (!marca) return res.status(404).json({ mensaje: 'Marca no encontrada' });
    res.json(marca);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener marca' });
  }
};

exports.createMarca = async (req, res) => {
  try {
    const { Nombre, imagen_marca } = req.body;
    const nuevaMarca = await marcaService.createMarca(Nombre, imagen_marca);
    res.status(201).json(nuevaMarca);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear marca' });
  }
};

exports.updateMarca = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, imagen_marca } = req.body;
    const resultado = await marcaService.updateMarca(id, Nombre, imagen_marca);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar marca' });
  }
};

exports.deleteMarca = async (req, res) => {
  try {
    const { id } = req.params;
    await marcaService.deleteMarca(id);
    res.json({ mensaje: 'Marca eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar marca' });
  }
};