const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true }, // Código único y obligatorio
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    medida: { type: String, default: '' },
    provider: { type: String, default: '' },
    price_siva: { type: Number, default: 0 },
    price_usd: { type: Number, default: 0 },
    price_final: { type: Number, default: 0 },
    create_at: { type: Date, default: Date.now },
  });
  
  const Product = mongoose.model('Product', productSchema);
  
  
module.exports = mongoose.model('Product', productSchema);
