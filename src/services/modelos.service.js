const db = require('../../db');

exports.getAllModelos = async () => {
  const [rows] = await db.query('SELECT * FROM modelo');
  return rows;
};

exports.getModeloById = async (id) => {
  const [rows] = await db.query('SELECT * FROM modelo WHERE id_modelo = ?', [id]);
  return rows[0];
};

exports.createModelo = async ({ id_marca, modelo, imagen_modelo }) => {
  const [result] = await db.query(
    'INSERT INTO modelo (id_marca, modelo, imagen_modelo) VALUES (?, ?, ?)',
    [id_marca, modelo, imagen_modelo]
  );
  return {
    id: result.insertId,
    id_marca,
    modelo,
    imagen_modelo,
  };
};

exports.updateModelo = async (id, { id_marca, modelo, imagen_modelo }) => {
  const [result] = await db.query(
    'UPDATE modelo SET id_marca = ?, modelo = ?, imagen_modelo = ? WHERE id_modelo = ?',
    [id_marca, modelo, imagen_modelo, id]
  );
  return result.affectedRows > 0;
};

exports.deleteModelo = async (id) => {
  const [result] = await db.query('DELETE FROM modelo WHERE id_modelo = ?', [id]);
  return result.affectedRows > 0;
};