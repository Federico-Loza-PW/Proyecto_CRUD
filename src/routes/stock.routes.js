const express = require('express');
const router = express.Router();
const db = require('../../db');

// GET /api/stock
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        m.Nombre AS marca,
        mo.modelo,
        mo.modelo_imagen,
        p.producto,
        p.imagen_producto,
        s.precio,
        s.stock
      FROM stock_modelo_producto s
      JOIN modelo mo ON s.id_modelo = mo.id_modelo
      JOIN marca m ON mo.id_marca = m.id_nombre
      JOIN productos p ON s.id_producto = p.id_producto
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error al consultar el stock:', error);
    res.status(500).json({ error: 'Error al obtener los datos del stock' });
  }
});

module.exports = router;