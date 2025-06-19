const express = require('express');
const router = express.Router();
const db = require('../../db'); 


router.get('/marcas/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const [marca] = await db.query(
      `SELECT id_nombre AS id_marca, Nombre AS marca, imagen_marca FROM marca WHERE id_nombre = ?`,
      [id]
    );

    if (marca.length === 0) {
      return res.status(404).json({ error: 'Marca no encontrada' });
    }

    const [modelos] = await db.query(
      `SELECT id_modelo, modelo, modelo_imagen FROM modelo WHERE id_marca = ?`,
      [id]
    );

    res.json({
      ...marca[0],
      modelos
    });
  } catch (err) {
    console.error('Error al obtener la marca:', err);
    res.status(500).json({ error: 'Error al obtener la marca individual' });
  }
});

router.get('/marcas', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT id_nombre AS id_marca, Nombre AS marca, imagen_marca
      FROM marca
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener marcas:', err);
    res.status(500).json({ error: 'Error al obtener las marcas' });
  }
});


router.get('/modelos/:idMarca', async (req, res) => {
  const idMarca = req.params.idMarca;

  try {
    const [rows] = await db.query(`
      SELECT id_modelo, modelo, modelo_imagen
      FROM modelo
      WHERE id_marca = ?
    `, [idMarca]);
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener modelos:', err);
    res.status(500).json({ error: 'Error al obtener los modelos' });
  }
});

router.get('/productos/:idModelo', async (req, res) => {
  const idModelo = req.params.idModelo;

  try {
    const [rows] = await db.query(`
      SELECT 
        p.id_producto,
        p.producto,
        p.imagen_producto,
        s.precio,
        s.stock
      FROM stock_modelo_producto s
      JOIN productos p ON s.id_producto = p.id_producto
      WHERE s.id_modelo = ?
    `, [idModelo]);
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener productos:', err);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

router.get('/modelos', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        mo.id_modelo,
        mo.modelo,
        mo.modelo_imagen,
        m.Nombre AS marca,
        m.imagen_marca
      FROM modelo mo
      JOIN marca m ON mo.id_marca = m.id_nombre
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener todos los modelos:', err);
    res.status(500).json({ error: 'Error al obtener los modelos' });
  }
});

router.get('/productos', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.id_producto,
        p.producto,
        p.imagen_producto,
        mo.modelo,
        mo.modelo_imagen,
        m.Nombre AS marca,
        s.precio,
        s.stock
      FROM stock_modelo_producto s
      JOIN productos p ON s.id_producto = p.id_producto
      JOIN modelo mo ON s.id_modelo = mo.id_modelo
      JOIN marca m ON mo.id_marca = m.id_nombre
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener todos los productos:', err);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

module.exports = router;
