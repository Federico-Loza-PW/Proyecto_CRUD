const express = require('express');
const router = express.Router();
const modeloController = require('../controllers/modelos.controller');
const { authenticateToken, authorizePermission } = require('../middlewares/auth.middleware');


router.get('/', authenticateToken, authorizePermission('modelo:view'), modeloController.getAllModelos);
router.get('/:id', authenticateToken, authorizePermission('modelo:view'), modeloController.getModeloById);
router.post('/', authenticateToken, authorizePermission('modelo:edit'), modeloController.createModelo);
router.put('/:id', authenticateToken, authorizePermission('modelo:edit'), modeloController.updateModelo);
router.delete('/:id', authenticateToken, authorizePermission('modelo:edit'), modeloController.deleteModelo);
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM modelo');
  res.json(rows);
}); 
module.exports = router;
