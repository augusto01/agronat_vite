import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import {
  AddCircleOutline as AddCircleOutlineIcon,
  Description as DescriptionIcon,
  Category as CategoryIcon,
  Numbers as NumbersIcon,
  Straighten as StraightenIcon,
  LocalShipping as LocalShippingIcon,
  AttachMoney as AttachMoneyIcon,
  Percent as PercentIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import axios from 'axios';
import CustomSnackbar from '../Alert/CustomSnackbar.jsx';

const ModalAgregarProducto = ({ openModal, handleCloseModal, fetchProducts }) => {
  // Estados para manejar los campos del formulario
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '', // Campo de descripción
    category: '',
    quantity: 1,
    medida: '',
    provider: '',
    price_siva: 1,
    price_usd: 1,
    por_marginal: 0, // Porcentaje marginal
    por_descuento: 0,
    price_final: 0,
    create_at: new Date().toISOString(),
  });

  // Estados para manejar las categorías, proveedores y medidas
  const [categories, setCategories] = useState(['Electronics', 'Furniture', 'Clothing']);
  const [providers, setProviders] = useState(['GelTek', 'Proveedor 2', 'Proveedor 3']);
  const [measures, setMeasures] = useState(['kg', 'm', 'L']);

  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Maneja el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Maneja el cierre del Snackbar
  const handleSnackbarClose = () => {
    setSnackbarConfig((prevState) => ({ ...prevState, open: false }));
  };

  // Calcula el descuento y el precio marginal del producto a insertar
  useEffect(() => {
    let finalPrice = newProduct.price_siva;

    if (newProduct.por_marginal > 0) {
      // Aplica el porcentaje marginal primero
      finalPrice = newProduct.price_siva * (1 + newProduct.por_marginal / 100);
    }

    if (newProduct.por_descuento > 0) {
      // Aplica el descuento sobre el precio con margen
      finalPrice = finalPrice * (1 - newProduct.por_descuento / 100);
    }

    setNewProduct((prev) => ({
      ...prev,
      price_final: finalPrice,
    }));
  }, [newProduct.price_siva, newProduct.por_marginal, newProduct.por_descuento]);

  // Maneja la sumisión del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que el campo descripción no esté vacío
    if (!newProduct.description.trim()) {
      setSnackbarConfig({
        open: true,
        message: 'El campo descripción es requerido',
        severity: 'error',
      });
      return;
    }

    // Si el campo proveedor está vacío, se asigna "Proveedor" por defecto
    const provider = newProduct.provider.trim() || 'Proveedor';

    // Si el campo medida está vacío, se asigna "Unidades" por defecto
    const medida = newProduct.medida.trim() || 'Unidades';

    // Si el campo price_siva está vacío, se asigna 1 por defecto
    const price_siva = newProduct.price_siva || 1;

    // Si el campo por_marginal está vacío, se asigna 0 por defecto
    const por_marginal = newProduct.por_marginal || 0;

    // Si el campo por_descuento está vacío, se asigna 0 por defecto
    const por_descuento = newProduct.por_descuento || 0;

    const productToSubmit = {
      ...newProduct,
      provider, // Asignar el proveedor por defecto si está vacío
      medida,   // Asignar la medida por defecto si está vacía
      price_siva, // Asignar el precio IVA por defecto si está vacío
      por_marginal, // Asignar el margen por defecto si está vacío
      por_descuento, // Asignar el descuento por defecto si está vacío
    };

    try {
      const response = await axios.post('http://localhost:5000/api/product/register', productToSubmit);
      console.log('Producto agregado correctamente:', response.data);

      setSnackbarConfig({
        open: true,
        message: 'Producto agregado correctamente',
        severity: 'success',
      });

      // Llamamos a fetchProducts para actualizar el DataGrid
      if (fetchProducts && typeof fetchProducts === 'function') {
        fetchProducts();
      }

      // Resetear el formulario
      setNewProduct({
        name: '',
        description: '', // Reseteamos el campo de descripción
        category: '',
        quantity: 0,
        medida: '',
        provider: '',
        price_siva: 1,
        price_usd: 1,
        por_marginal: 0,
        por_descuento: 0,
        price_final: 0,
        create_at: new Date().toISOString(),
      });

      handleCloseModal(); // Cierra el modal
    } catch (error) {
      console.error('Error al agregar producto:', error);

      setSnackbarConfig({
        open: true,
        message: 'Error al agregar el producto',
        severity: 'error',
      });
    }
  };

  return (
    <>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            maxHeight: '80vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}
          >
            <AddCircleOutlineIcon /> Nuevo Producto
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Primera columna */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre del producto"
                  name="name"
                  value={newProduct.name}
                  onChange={handleChange}
                  required
                  margin="normal"
                  InputProps={{
                    startAdornment: <DescriptionIcon sx={{ mr: 1, color: 'action.active' }} />,
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Descripción"
                  name="description"
                  value={newProduct.description}
                  onChange={handleChange}
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: <DescriptionIcon sx={{ mr: 1, color: 'action.active' }} />,
                  }}
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
                  <InputLabel>Categoría</InputLabel>
                  <Select
                    label="Categoría"
                    name="category"
                    value={newProduct.category}
                    onChange={handleChange}
                    required
                    startAdornment={<CategoryIcon sx={{ mr: 1, color: 'action.active' }} />}
                  >
                    {categories.map((category, index) => (
                      <MenuItem key={index} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Cantidad"
                  name="quantity"
                  type="number"
                  value={newProduct.quantity}
                  onChange={handleChange}
                  margin="normal"
                  InputProps={{
                    startAdornment: <NumbersIcon sx={{ mr: 1, color: 'action.active' }} />,
                  }}
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
                  <InputLabel>Medida</InputLabel>
                  <Select
                    label="Medida"
                    name="medida"
                    value={newProduct.medida}
                    onChange={handleChange}
                    startAdornment={<StraightenIcon sx={{ mr: 1, color: 'action.active' }} />}
                  >
                    {measures.map((measure, index) => (
                      <MenuItem key={index} value={measure}>
                        {measure}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Segunda columna */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
                  <InputLabel>Proveedor</InputLabel>
                  <Select
                    label="Proveedor"
                    name="provider"
                    value={newProduct.provider}
                    onChange={handleChange}
                    startAdornment={<LocalShippingIcon sx={{ mr: 1, color: 'action.active' }} />}
                  >
                    {providers.map((provider, index) => (
                      <MenuItem key={index} value={provider}>
                        {provider}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Precio IVA"
                  name="price_siva"
                  type="number"
                  value={newProduct.price_siva}
                  onChange={handleChange}
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: <AttachMoneyIcon sx={{ mr: 1, color: 'action.active' }} />,
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Precio USD"
                  name="price_usd"
                  type="number"
                  value={newProduct.price_usd}
                  onChange={handleChange}
                  margin="normal"
                  InputProps={{
                    startAdornment: <AttachMoneyIcon sx={{ mr: 1, color: 'action.active' }} />,
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Margen (%)"
                  name="por_marginal"
                  type="number"
                  value={newProduct.por_marginal}
                  onChange={handleChange}
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: <PercentIcon sx={{ mr: 1, color: 'action.active' }} />,
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Descuento (%)"
                  name="por_descuento"
                  type="number"
                  value={newProduct.por_descuento}
                  onChange={handleChange}
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: <PercentIcon sx={{ mr: 1, color: 'action.active' }} />,
                  }}
                  sx={{ mb: 2 }}
                />

                {/* Mostrar el Precio Final con fondo verde */}
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    bgcolor: 'primary.main',
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="h6">
                    Precio de venta: ${Number(newProduct.price_final).toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, py: 1.5 }}
              startIcon={<CheckCircleIcon />}
            >
              Agregar Producto
            </Button>
          </form>
        </Box>
      </Modal>

      {/* Alerta */}
      <CustomSnackbar
        snackbarConfig={snackbarConfig}
        handleSnackbarClose={handleSnackbarClose}
      />
    </>
  );
};

export default ModalAgregarProducto;