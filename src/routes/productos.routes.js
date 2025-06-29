const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productos.controller');
const { authenticateToken, authorizePermission } = require('../middlewares/auth.middleware');

router.get('/', authenticateToken, authorizePermission('product:view'), productoController.getAllProductos);
router.get('/:id', authenticateToken, authorizePermission('product:view'), productoController.getProductoById);
router.post('/', authenticateToken, authorizePermission('product:edit'), productoController.createProducto);
router.put('/:id', authenticateToken, authorizePermission('product:edit'), productoController.updateProducto);
router.delete('/:id', authenticateToken, authorizePermission('product:edit'), productoController.deleteProducto);

module.exports = router;