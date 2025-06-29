const db = require('../../db');

exports.getAllMarcas = async () => {
  const [rows] = await db.query('SELECT * FROM marca');
  return rows;
};

exports.getMarcaById = async (id) => {
  const [rows] = await db.query('SELECT * FROM marca WHERE id_nombre = ?', [id]);
  return rows[0];
};

exports.createMarca = async (Nombre, imagen_marca) => {
  const [result] = await db.query('INSERT INTO marca (Nombre, imagen_marca) VALUES (?, ?)', [Nombre, imagen_marca]);
  return { id: result.insertId, Nombre, imagen_marca };
};

exports.updateMarca = async (id, Nombre, imagen_marca) => {
  await db.query('UPDATE marca SET Nombre = ?, imagen_marca = ? WHERE id_nombre = ?', [Nombre, imagen_marca, id]);
  return { id, Nombre, imagen_marca };
};

exports.deleteMarca = async (id) => {
  await db.query('DELETE FROM marca WHERE id_nombre = ?', [id]);
};