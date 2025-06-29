const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stock.controller');
const { authenticateToken, authorizePermission } = require('../middlewares/auth.middleware');

router.get('/', authenticateToken, authorizePermission('product:view'), stockController.getAllStock);
router.get('/:id', authenticateToken, authorizePermission('product:view'), stockController.getStockById);
router.post('/', authenticateToken, authorizePermission('product:edit'), stockController.createStock);
router.put('/:id', authenticateToken, authorizePermission('product:edit'), stockController.updateStock);
router.delete('/:id', authenticateToken, authorizePermission('product:edit'), stockController.deleteStock);

module.exports = router;

