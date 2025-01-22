import React, { useState, useEffect } from "react";
import { Modal, TextField, Button, Typography, Grid, Box } from "@mui/material";
import axios from "axios";
import CustomSnackbar from "../Alert/CustomSnackbar.jsx"; // Importar el componente reutilizable

const ModalProducto = ({ openModal, handleCloseModal, selectedProduct, fetchProducts }) => {
  const [productData, setProductData] = useState({});
  const [snackbarConfig, setSnackbarConfig] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    } else {
      setProductData({});
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("price") && !/^\d*\.?\d*$/.test(value)) {
      return;
    }

    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const updatedProduct = {
        ...productData,
        create_at: new Date(),
      };

      // Verificar si es agregar o actualizar según la existencia de `id`
      if (productData.id) {
        await axios.put(
          `http://localhost:5000/api/product/actualizar_producto/${productData.id}`,
          updatedProduct
        );
        setSnackbarConfig({
          open: true,
          message: "Producto actualizado exitosamente",
          severity: "success",
        });
      } else {
        await axios.post(`http://localhost:5000/api/product/agregar_producto`, updatedProduct);
        setSnackbarConfig({
          open: true,
          message: "Producto agregado exitosamente",
          severity: "success",
        });
      }

      if (fetchProducts && typeof fetchProducts === "function") {
        fetchProducts();
      }

      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      setSnackbarConfig({
        open: true,
        message: "Error al guardar el producto",
        severity: "error",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/product/eliminar_producto/${productData.id}`
      );

      setSnackbarConfig({
        open: true,
        message: "Producto eliminado exitosamente",
        severity: "success",
      });

      if (fetchProducts && typeof fetchProducts === "function") {
        fetchProducts();
      }

      handleCloseModal();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      setSnackbarConfig({
        open: true,
        message: "Error al eliminar el producto",
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarConfig((prevState) => ({ ...prevState, open: false }));
  };

  const renderInputs = () => {
    const fields = [
      { label: "Nombre", name: "name", value: productData.name || "" },
      { label: "Categoría", name: "category", value: productData.category || "" },
      { label: "Stock", name: "quantity", value: productData.quantity || "" },
      { label: "Medida", name: "medida", value: productData.medida || "" },
      { label: "Proveedor", name: "provider", value: productData.provider || "" },
      { label: "Precio sin IVA", name: "price_siva", value: productData.price_siva || "" },
      { label: "Precio USD", name: "price_usd", value: productData.price_usd || "" },
      { label: "Precio Final", name: "price_final", value: productData.price_final || "" },
    ];

    return fields.map((field, index) => (
      <Grid item xs={12} sm={6} key={index}>
        <TextField
          fullWidth
          label={field.label}
          name={field.name}
          value={field.value}
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>
    ));
  };

  return (
    <>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom color="primary">
            {productData.id ? "Editar Producto" : "Agregar Producto"}
          </Typography>
          <Grid container spacing={2}>
            {renderInputs()}
          </Grid>
          <Box sx={{ mt: 3, textAlign: "right" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveChanges}
              sx={{ mr: 2 }}
            >
              {productData.id ? "Guardar Cambios" : "Agregar Producto"}
            </Button>
            {productData.id && (
              <Button variant="contained" color="error" onClick={handleDelete}>
                Eliminar Producto
              </Button>
            )}
          </Box>
        </Box>
      </Modal>

      <CustomSnackbar snackbarConfig={snackbarConfig} handleSnackbarClose={handleSnackbarClose} />
    </>
  );
};

export default ModalProducto;
