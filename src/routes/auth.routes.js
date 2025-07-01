
const express = require('express');
const router = express.Router();
const db = require('../../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const [results] = await db.query(
      `SELECT u.id, u.email, u.password, r.name AS role
       FROM users u
       LEFT JOIN user_roles ur ON u.id = ur.user_id
       LEFT JOIN roles r ON ur.role_id = r.id
       WHERE u.email = ?
       LIMIT 1`,
      [email]
    );

    const user = results[0];

    if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role || ''
      }
    });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
