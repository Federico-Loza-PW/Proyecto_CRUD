const db = require('../../db');

exports.getAllProductos = async () => {
  const [rows] = await db.query('SELECT * FROM productos');
  return rows;
};

exports.getProductoById = async (id) => {
  const [rows] = await db.query('SELECT * FROM productos WHERE id_producto = ?', [id]);
  return rows[0];
};

exports.createProducto = async (data) => {
  const conn = await pool.getConnection();
  const { id_modelo, producto, imagen_producto } = data;

  const imagenFinal = imagen_producto || '/productos/default.png';

  const [result] = await conn.query(
    `INSERT INTO productos (id_modelo, producto, imagen_producto) VALUES (?, ?, ?)`,
    [id_modelo, producto, imagenFinal]
  );
  conn.release();
  return result;
};
exports.updateProducto = async (id, { id_modelo, producto, imagen_producto }) => {
  const [result] = await db.query(
    'UPDATE productos SET id_modelo = ?, producto = ?, imagen_producto = ? WHERE id_producto = ?',
    [id_modelo, producto, imagen_producto, id]
  );
  return result.affectedRows > 0;
};

exports.deleteProducto = async (id) => {
  const [result] = await db.query('DELETE FROM productos WHERE id_producto = ?', [id]);
  return result.affectedRows > 0;
  };