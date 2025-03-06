import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import CustomSnackbar from '../Alert/CustomSnackbar.jsx';

const ModalProducto = ({ openModal, handleCloseModal, selectedProduct, fetchProducts }) => {
  const [productData, setProductData] = useState({
    name: '',
    description: '', // Campo de descripción
    category: '',
    quantity: 1,
    medida: '',
    provider: '',
    price_siva: 0,
    price_usd: 0,
    por_marginal: 0, // Porcentaje marginal
    por_descuento: 0,
    price_final: 0,
    create_at: new Date().toISOString(),
  });

  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [categories, setCategories] = useState(['Electronics', 'Furniture', 'Clothing']);
  const [providers, setProviders] = useState(['GelTek', 'Proveedor 2', 'Proveedor 3']);
  const [measures, setMeasures] = useState(['kg', 'm', 'L']);

  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSnackbarClose = () => {
    setSnackbarConfig((prevState) => ({ ...prevState, open: false }));
  };

  // Cálculo del precio final con descuento y margen
  useEffect(() => {
    let finalPrice = productData.price_siva;
  
    if (productData.por_marginal > 0) {
      finalPrice = productData.price_siva * (1 + productData.por_marginal / 100);
    }
  
    if (productData.por_descuento > 0) {
      finalPrice = finalPrice * (1 - productData.por_descuento / 100);
    }
  
    setProductData((prev) => ({
      ...prev,
      price_final: finalPrice,
    }));
  }, [productData.price_siva, productData.por_marginal, productData.por_descuento]);

  // Maneja la sumisión del formulario (editar producto)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = { 
      ...productData, 
    };

    try {
      await axios.put(`http://localhost:5000/api/product/actualizar_producto/${productData.id}`, updatedProduct);
      
      setSnackbarConfig({
        open: true,
        message: 'Producto editado correctamente',
        severity: 'success',
      });

      setTimeout(() => {
        handleCloseModal(); // Cierra el modal después de un breve tiempo
      }, 1000);

      if (fetchProducts && typeof fetchProducts === 'function') {
        fetchProducts(); // Actualiza los productos después de la edición
      }
    } catch (error) {
      console.error('Error al editar el producto:', error);
      setSnackbarConfig({
        open: true,
        message: 'Error al editar el producto',
        severity: 'error',
      });
    }
  };

  // Maneja la eliminación del producto
  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/product/desactivar_producto/${productData.id}`);
      
      setSnackbarConfig({
        open: true,
        message: 'Producto eliminado correctamente',
        severity: 'success',
      });
      
      setTimeout(() => {
        handleCloseModal(); // Cierra el modal después de un breve tiempo
      }, 1000);

      if (fetchProducts && typeof fetchProducts === 'function') {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      setSnackbarConfig({
        open: true,
        message: 'Error al eliminar el producto',
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
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EditIcon /> Editar Producto
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Primera columna */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre del producto"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  required
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Descripción"
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Categoría</InputLabel>
                  <Select
                    label="Categoría"
                    name="category"
                    value={productData.category}
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
                  value={productData.quantity}
                  onChange={handleChange}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Medida</InputLabel>
                  <Select
                    label="Medida"
                    name="medida"
                    value={productData.medida}
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
                    value={productData.provider}
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
                  value={productData.price_siva}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Precio USD"
                  name="price_usd"
                  type="number"
                  value={productData.price_usd}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Porcentaje Marginal (%)"
                  name="por_marginal"
                  type="number"
                  value={productData.por_marginal}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Descuento (%)"
                  name="por_descuento"
                  type="number"
                  value={productData.por_descuento}
                  onChange={handleChange}
                  margin="normal"
                />

                {/* Mostrar el Precio Final */}
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
                    Precio de venta: ${Number(productData.price_final).toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Guardar Cambios
            </Button>
            <Button type="button" variant="contained" color="error" fullWidth sx={{ mt: 2 }} onClick={handleDelete}>
              Eliminar Producto
            </Button>
          </form>
        </Box>
      </Modal>

      <CustomSnackbar snackbarConfig={snackbarConfig} handleSnackbarClose={handleSnackbarClose} />
    </>
  );
};

export default ModalProducto;
