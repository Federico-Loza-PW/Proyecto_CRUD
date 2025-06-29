const express = require('express');
const router = express.Router();
const marcaController = require('../controllers/marcas.controller');
const { authenticateToken, authorizePermission } = require('../middlewares/auth.middleware');

router.get('/', authenticateToken, authorizePermission('marca:view'), marcaController.getAllMarcas);
router.get('/:id', authenticateToken, authorizePermission('marca:view'), marcaController.getMarcaById);
router.post('/', authenticateToken, authorizePermission('marca:edit'), marcaController.createMarca);
router.put('/:id', authenticateToken, authorizePermission('marca:edit'), marcaController.updateMarca);
router.delete('/:id', authenticateToken, authorizePermission('marca:edit'), marcaController.deleteMarca);

module.exports = router;