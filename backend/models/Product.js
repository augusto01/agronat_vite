const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String, // Puede ser un código personalizado o un identificador único.
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    medida: {
      type: String, // Puede ser 'kg', 'lt', 'pieza', etc.
      required: true,
      trim: true,
    },
    provider: {
      type: String, // Nombre del proveedor.
      required: true,
      trim: true,
    },
    price_siva: {
      type: Number, // Precio sin IVA.
      required: true,
      min: 0,
    },
    price_usd: {
      type: Number, // Precio en dólares (opcional si aplica solo en una región).
      required: false,
      min: 0,
    },
    price_final: {
      type: Number, // Precio final con IVA incluido.
      required: true,
      min: 0,
    },
    create_at: {
      type: Date,
      default: Date.now, // Fecha de última actualización.
    },
  },
  {
    timestamps: true, // Agrega automáticamente campos createdAt y updatedAt.
  },{ collection: 'products' }
);

module.exports = mongoose.model('Product', productSchema);
