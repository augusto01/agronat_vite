const Product = require("../models/Product.js");

exports.searchProducts = async (req, res) => {
    try {
      const { searchQuery } = req.query; // Obtener el parámetro de búsqueda
  
      if (!searchQuery) {
        return res.status(400).json({ message: 'Se requiere un término de búsqueda' });
      }
  
      // Realizar la búsqueda utilizando una expresión regular en nombre o descripción
      const products = await Product.find({
        active: true,
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { description: { $regex: searchQuery, $options: 'i' } },
        ],
      });
  
      return res.status(200).json({ productos: products });
    } catch (error) {
      console.error('Error al buscar productos:', error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  };
  