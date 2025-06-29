const db = require('../../db');

exports.getAllStock = async () => {
  const [rows] = await db.query('SELECT * FROM stock_modelo_producto');
  return rows;
};

exports.getStockById = async (id) => {
  const [rows] = await db.query('SELECT * FROM stock_modelo_producto WHERE id = ?', [id]);
  return rows[0];
};

exports.createStock = async (data) => {
  const { id_modelo, id_producto, precio, stock } = data;
  const [result] = await db.query(
    'INSERT INTO stock_modelo_producto (id_modelo, id_producto, precio, stock) VALUES (?, ?, ?, ?)',
    [id_modelo, id_producto, precio, stock]
  );
  return { id: result.insertId, ...data };
};

exports.updateStock = async (id, data) => {
  const { id_modelo, id_producto, precio, stock } = data;
  await db.query(
    'UPDATE stock_modelo_producto SET id_modelo = ?, id_producto = ?, precio = ?, stock = ? WHERE id = ?',
    [id_modelo, id_producto, precio, stock, id]
  );
  return { id, ...data };
};

exports.deleteStock = async (id) => {
  await db.query('DELETE FROM stock_modelo_producto WHERE id = ?', [id]);
};
