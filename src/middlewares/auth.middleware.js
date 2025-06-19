const jwt = require('jsonwebtoken');
const pool = require('../../db'); 

// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token requerido' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido o expirado' });

    req.user = user;
    next();
  });
};

// Middleware para verificar permisos por usuario
const authorizePermission = (permissionName) => {
  return async (req, res, next) => {
    const userId = req.user.id;

    try {
      const [result] = await pool.query(
        `SELECT p.action 
         FROM permisos p
         JOIN roles_permisos rp ON rp.permiso_id = p.id
         JOIN user_roles ur ON ur.role_id = rp.role_id
         WHERE ur.user_id = ? AND p.action = ?`,
        [userId, permissionName]
      );

      if (result.length === 0) {
        return res.status(403).json({ error: 'Permiso denegado' });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al verificar permisos' });
    }
  };
};

module.exports = {
  authenticateToken,
  authorizePermission,
};