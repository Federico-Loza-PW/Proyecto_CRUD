const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../../db'); 


router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: 'Error en el e-mail o contraseña' });

  try {
    
    const [existingUser] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) return res.status(400).json({ error: 'Error en el e-mail o contraseña' });

    
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const [result] = await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

    
    const [role] = await pool.query('SELECT id FROM roles WHERE name = ?', ['user']);
    await pool.query('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)', [result.insertId, role[0].id]);

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: 'Error en el e-mail o contraseña' });

  try {
    // Buscar usuario
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) return res.status(404).json({ error: 'Error en el e-mail o contraseña' });

    const user = users[0];

    // Comparar contraseñas
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Error en el e-mail o contraseña' });

    // Crear token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});






module.exports = router;