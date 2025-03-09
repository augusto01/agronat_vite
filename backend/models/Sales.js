// models/Sale.js

const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  cliente: { type: String, required: true }, // Nombre del cliente
  comprobante: { type: String, required: true }, // Tipo de comprobante (Boleta/Factura)
  productos: [
    {
      productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Referencia al producto
      cantidad: { type: Number, required: true }, // Cantidad vendida
      precioUnitario: { type: Number, required: true }, // Precio unitario al momento de la venta
      subtotal: { type: Number, required: true }, // Subtotal (cantidad * precioUnitario)
    },
  ],
  total: { type: Number, required: true }, // Total de la venta
  medioPago: { type: String, required: true }, // Medio de pago (Efectivo, Tarjeta, etc.)
  fecha: { type: Date, default: Date.now }, // Fecha de la venta
});

module.exports = mongoose.model('Sale', saleSchema);