const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/listar_productos', productController.listProducts);
router.put('/actualizar_producto/:code', productController.editProduct);
router.post('/register', productController.createProduct);

module.exports = router;
