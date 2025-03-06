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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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
    por_descuento:0,
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

   //CALCULA EL DESCUENTO Y EL PRECIO MARGINAL DEL PRODUCTO A INSERTAR

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

    const productToSubmit = { 
      ...newProduct, 
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

      setNewProduct({
        name: '',
        description: '', // Reseteamos el campo de descripción
        category: '',
        quantity: 0,
        medida: '',
        provider: '',
        price_siva: 0,
        price_usd: 0,
        por_marginal: 0,
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
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <AddCircleOutlineIcon /> Nuevo Producto
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
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
                />
                <TextField
                  fullWidth
                  label="Descripción"
                  name="description"
                  value={newProduct.description}
                  onChange={handleChange}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Categoría</InputLabel>
                  <Select
                    label="Categoría"
                    name="category"
                    value={newProduct.category}
                    onChange={handleChange}
                    required
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
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Medida</InputLabel>
                  <Select
                    label="Medida"
                    name="medida"
                    value={newProduct.medida}
                    onChange={handleChange}
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
                <FormControl fullWidth margin="normal">
                  <InputLabel>Proveedor</InputLabel>
                  <Select
                    label="Proveedor"
                    name="provider"
                    value={newProduct.provider}
                    onChange={handleChange}
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
                />
                <TextField
                  fullWidth
                  label="Precio USD"
                  name="price_usd"
                  type="number"
                  value={newProduct.price_usd}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Porcentaje Marginal (%)"
                  name="por_marginal"
                  type="number"
                  value={newProduct.por_marginal}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Descuento (%)"
                  name="por_descuento"
                  type="number"
                  value={newProduct.por_descuento}
                  onChange={handleChange}
                  margin="normal"
                />

                {/* Mostrar el Precio Final con fondo verde */}
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    bgcolor: 'green',
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6">
                    {/* Verificar si price_final es un número válido */}
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
              sx={{ mt: 2 }}
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
