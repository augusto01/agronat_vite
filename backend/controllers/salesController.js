const Product = require("../models/Product.js"); //Importar el modelo de Producto
const Sale = require('../models/Sales.js'); // Importar el modelo de Venta


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
  
  // controllers/salesController.js


// Función para registrar una venta y actualizar el stock
// controllers/salesController.js


exports.registrarVenta = async (req, res) => {
  const { cliente, comprobante, productos, medioPago, total } = req.body;

  try {
    // Validar que los productos estén en el cuerpo de la solicitud
    if (!productos || productos.length === 0) {
      return res.status(400).json({ message: 'No hay productos en la venta.' });
    }

    // Crear un array para almacenar los productos de la venta
    const productosVenta = [];

    // Actualizar el stock de cada producto y preparar los datos para la venta
    for (const producto of productos) {
      const productoEnDB = await Product.findById(producto._id);

      if (!productoEnDB) {
        return res.status(404).json({ message: `Producto con ID ${producto._id} no encontrado.` });
      }

      if (productoEnDB.quantity < producto.cantidad) {
        return res.status(400).json({ message: `No hay suficiente stock para el producto ${productoEnDB.name}.` });
      }

      // Restar la cantidad vendida del stock
      productoEnDB.quantity -= producto.cantidad;
      await productoEnDB.save();

      // Agregar el producto a la lista de productos de la venta
      productosVenta.push({
        productoId: producto._id,
        cantidad: producto.cantidad,
        precioUnitario: producto.price_final,
        subtotal: producto.cantidad * producto.price_final,
      });
    }

    // Crear una nueva venta en la base de datos
    const nuevaVenta = new Sale({
      cliente,
      comprobante,
      productos: productosVenta,
      total,
      medioPago,
    });

    await nuevaVenta.save(); // Guardar la venta en la base de datos

    res.status(200).json({ message: 'Venta registrada y stock actualizado correctamente.', venta: nuevaVenta });
  } catch (error) {
    console.error('Error al registrar la venta:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

//obtener ventas 
exports.obtenerVentas = async (req, res) => {
  try {
    const ventas = await Sale.find().populate('productos.productoId'); // Obtener todas las ventas con detalles de productos
    res.status(200).json(ventas);
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};


//ventas por fecha
exports.obtenerVentasPorFecha = async (req, res) => {
  const { fechaInicio, fechaFin } = req.query;

  try {
    const ventas = await Sale.find({
      fecha: { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) },
    }).populate('productos.productoId');

    res.status(200).json(ventas);
  } catch (error) {
    console.error('Error al obtener las ventas por fecha:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};