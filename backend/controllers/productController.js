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

//=================== REGISTRAR PRODUCTO =========================//

    // Función para generar el código del producto
    const generateProductCode = async () => {
        try {
          const lastProduct = await Product.findOne().sort({ id: -1 }); // Ordenar por el campo `code`
          const lastCode = lastProduct ? parseInt(lastProduct.id, 10) : 0;
          if (isNaN(lastCode)) {
            throw new Error('El último código no es un número válido.');
          }
          const nextCode = (lastCode + 1).toString().padStart(8, '0');
          return nextCode;
        } catch (error) {
          console.error('Error generando código del producto:', error);
          throw new Error('No se pudo generar el código del producto');
        }
      };
      
      
      
      exports.createProduct = async (req, res) => {
        try {
          const { name, category, quantity, medida, provider, price_siva, price_usd, price_final } = req.body;
      
          if (!name || !category || quantity === undefined) {
            return res.status(400).json({
              message: 'Los campos "name", "category" y "quantity" son obligatorios.',
            });
          }
      
          // Generar código único
          const productCode = await generateProductCode();
      
          // Crear el producto
          const newProduct = new Product({
            id: productCode,
            name,
            category,
            quantity,
            medida: medida || '',
            provider: provider || '',
            price_siva: price_siva || 0,
            price_usd: price_usd || 0,
            price_final: price_final || 0,
            create_at: new Date(),
          });
      
          // Guardar en la base de datos
          await newProduct.save();
      
          res.status(201).json({
            message: 'Producto creado exitosamente',
            product: newProduct,
          });
        } catch (error) {
          console.error('Error al crear producto:', error);
          res.status(500).json({
            message: 'Ocurrió un error al crear el producto.',
            error: error.message,
          });
        }
      };
      
      
    
    

