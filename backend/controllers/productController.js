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
        // Buscar el último producto por orden descendente del ID
        const lastProduct = await Product.findOne().sort({ _id: -1 });
        const lastCode = lastProduct?.code ? parseInt(lastProduct.code, 10) : 0; // Asegurar conversión válida
        const nextCode = (lastCode + 1).toString().padStart(8, '0'); // Incrementar y formatear
        return nextCode;
      } catch (error) {
        console.error('Error generando código del producto:', error);
        return null; // Retornar null en caso de error
      }
    };
    


    exports.createProduct = async (req, res) => {
      try {
        const { name, category, quantity, medida, provider, price_siva, price_usd, price_final } = req.body;
    
        // Validar campos obligatorios
        if (!name || !category || quantity === undefined) {
          return res.status(400).json({
            message: 'Los campos "name", "category" y "quantity" son obligatorios.',
          });
        }
    
        // Generar código único
        const productCode = await generateProductCode();
        if (!productCode) {
          return res.status(500).json({
            message: 'No se pudo generar el código del producto.',
          });
        }
    
        // Crear el producto
        const newProduct = new Product({
          code: productCode,
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
    
    
      
    
    

