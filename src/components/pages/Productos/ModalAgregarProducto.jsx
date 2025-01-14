import React, { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios'; // Para peticiones HTTP

const ModalAgregarProducto = ({ openModal, handleCloseModal }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    quantity: 0,
    medida: '',
    provider: '',
    price_siva: 0,
    price_usd: 0,
    price_final: 0,
    create_at: new Date().toISOString(), // Fecha actual en formato ISO
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/product/register',
        newProduct
      );
      console.log('Producto agregado correctamente:', response.data);
      handleCloseModal(); // Cierra el modal al finalizar
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  return (
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
                label="Categoría"
                name="category"
                value={newProduct.category}
                onChange={handleChange}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Cantidad"
                name="quantity"
                type="number"
                value={newProduct.quantity}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Medida"
                name="medida"
                value={newProduct.medida}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            {/* Segunda columna */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Proveedor"
                name="provider"
                value={newProduct.provider}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Precio sin IVA"
                name="price_siva"
                type="number"
                value={newProduct.price_siva}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Precio en USD"
                name="price_usd"
                type="number"
                value={newProduct.price_usd}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Precio final con IVA"
                name="price_final"
                type="number"
                value={newProduct.price_final}
                onChange={handleChange}
                margin="normal"
              />
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
  );
};

export default ModalAgregarProducto;
