const Product = require('../models/Product');

// Listar productos
exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ productos: products });
  } catch (error) {
    res.status(500).json({ message: 'Error al listar productos', error });
  }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ producto: newProduct });
  } catch (error) {
    res.status(400).json({ message: 'Error al crear producto', error });
  }
};
