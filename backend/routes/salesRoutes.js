const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');


//productos
router.get('/productos_disponibles', salesController.searchProducts);


//ventas
router.post('/registrar_venta', salesController.registrarVenta);
router.get('/ventas', salesController.obtenerVentas);
router.get('/ventas/por-fecha', salesController.obtenerVentasPorFecha);




module.exports = router;



