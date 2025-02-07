const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  code: { type: String, unique: false, required: true }, // Clave única
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  medida: { type: String },
  provider: { type: String },
  price_siva: { type: Number },
  price_usd: { type: Number },
  price_final: { type: Number },
  create_at: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },

});


  
  const Product = mongoose.model('Product', productSchema);
  
  
module.exports = mongoose.model('Product', productSchema);
