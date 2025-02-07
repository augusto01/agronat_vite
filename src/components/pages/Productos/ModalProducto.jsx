import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import CustomSnackbar from '../Alert/CustomSnackbar.jsx';

const ModalProducto = ({ openModal, handleCloseModal, selectedProduct, fetchProducts }) => {
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    quantity: 0,
    medida: '',
    provider: '',
    price_siva: 0,
    price_usd: 0,
    price_final: 0,
    create_at: new Date().toISOString(),
  });

  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

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


  //======================== EDITAR PRODUCTO =========================//
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/product/actualizar_producto/${productData.id}`, productData);
      
      setSnackbarConfig({
        open: true,
        message: 'Producto editado correctamente',
        severity: 'success',
      });
      
      setTimeout(() => {
        handleCloseModal(); // Cierra el modal después de un breve tiempo
      }, 1000);

      if (fetchProducts && typeof fetchProducts === 'function') {
        fetchProducts();
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

//=========================== ELIMINAR PRODUCTO ==================================//
const handleDelete= async (e) => {
  e.preventDefault();

  try {

    //AQUI VA ELIMINAR EL PRODUCTO //MODIFICAR LA RUTA 
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
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Nombre del producto" name="name" value={productData.name} onChange={handleChange} required margin="normal" />
                <TextField fullWidth label="Categoría" name="category" value={productData.category} onChange={handleChange} required margin="normal" />
                <TextField fullWidth label="Cantidad" name="quantity" type="number" value={productData.quantity} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Medida" name="medida" value={productData.medida} onChange={handleChange} margin="normal" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Proveedor" name="provider" value={productData.provider} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Precio sin IVA" name="price_siva" type="number" value={productData.price_siva} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Precio en USD" name="price_usd" type="number" value={productData.price_usd} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Precio final con IVA" name="price_final" type="number" value={productData.price_final} onChange={handleChange} margin="normal" />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Guardar Cambios
            </Button>
            <Button type="submit" variant="contained" color="error" fullWidth sx={{ mt: 2 }}   onClick={handleDelete}>
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
