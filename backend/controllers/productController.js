const Product = require('../models/Product');



//=================== GENERAR CODIGO =========================//
const generateProductCode = async () => {
  try {
    const lastProduct = await Product.findOne().sort({ _id: -1 });
    const lastCode = lastProduct?.code ? parseInt(lastProduct.code, 10) : 0;
    const nextCode = (lastCode + 1).toString().padStart(8, '0');
    return nextCode;
  } catch (error) {
    console.error('Error generando código del producto:', error);
    return null;
  }
};

//====================== REGISTRAR PRODUCTO ==========================//
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

//=================== EDITAR PRODUCTO ==================//
exports.editProduct = async (req, res) => {
  try {
    const { code } = req.params; // El 'code' que se recibe en la URL
    const { name, category, quantity, medida, provider, price_siva, price_usd, price_final } = req.body;

    // Buscar el producto por el código único
    const product = await Product.findOne({ code });
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Actualizar los campos del producto
    product.name = name;
    product.category = category;
    product.quantity = quantity;
    product.medida = medida;
    product.provider = provider;
    product.price_siva = price_siva;
    product.price_usd = price_usd;
    product.price_final = price_final;

    // Guardar el producto actualizado
    await product.save();

    res.status(200).json({
      message: 'Producto actualizado correctamente',
      product,
    });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({
      message: 'Error al actualizar el producto',
      error: error.message,
    });
  }
};

//==================== DESACTIVAR PRODUCTO (BAJA LOGICA) =====================//
exports.deactivateProduct = async (req, res) => {
  try {
    const { code } = req.params; // Cambiar 'id' a 'code'

    // Buscar y actualizar el producto usando el 'code'
    const product = await Product.findOneAndUpdate({ code }, { active: false }, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto desactivado correctamente', product });
  } catch (error) {
    console.error('Error al desactivar el producto:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

//=================== LISTAR PRODUCTOS (ACTIVOS) ============//
exports.getActiveProducts = async (req, res) => {
  try {
    const products = await Product.find({ active: true });
    res.status(200).json({ productos: products });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

//=================== LISTAR PRODUCTOS (ACTIVOS E INACTIVOS) =========================//
exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ productos: products });
  } catch (error) {
    res.status(500).json({ message: 'Error al listar productos', error });
  }
};
