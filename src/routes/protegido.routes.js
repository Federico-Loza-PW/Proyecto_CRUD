const express = require('express');
const router = express.Router();
const {
  authenticateToken,
  authorizePermission,
} = require('../middlewares/auth.middleware');

// Ruta para usuarios y admins
router.get(
  '/productos',
  authenticateToken,
  authorizePermission('product:view'),
  (req, res) => {
    res.json({ mensaje: 'Solo usuarios logueados con permiso de ver productos' });
  }
);

// Ruta solo para admins
router.post(
  '/productos',
  authenticateToken,
  authorizePermission('product:edit'),
  (req, res) => {
    res.json({ mensaje: 'Producto creado (solo admins)' });
  }
);

module.exports = router;