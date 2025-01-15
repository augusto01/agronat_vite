import React, { useState, useEffect } from "react";
import { Modal, TextField, Button, Typography, Grid } from "@mui/material";
import axios from "axios";
import { format } from "date-fns"; // Asegúrate de que esta librería esté instalada

const ModalProducto = ({ openModal, handleCloseModal, selectedProduct }) => {
  const [productData, setProductData] = useState(selectedProduct);

  useEffect(() => {
    setProductData(selectedProduct); // Actualiza el producto cuando el modal se abre
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar que los precios solo acepten números y decimales
    if (name.includes("price") && !/^\d*\.?\d*$/.test(value)) {
      return; // Si el valor no es un número o decimal, no hace nada
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
        create_at: new Date(), // Fecha actual de la última actualización
      };
      await axios.put(
        `http://localhost:5000/api/product/actualizar_producto/${productData.id}`,
        updatedProduct
      );
      handleCloseModal(); // Cierra el modal
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/product/eliminar_producto/${productData.id}`
      );
      handleCloseModal(); // Cierra el modal después de eliminar
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const renderInputs = () => {
    const fields = [
      { label: "Nombre", name: "name", value: productData.name },
      { label: "Categoría", name: "category", value: productData.category },
      { label: "Stock", name: "quantity", value: productData.quantity },
      { label: "Medida", name: "medida", value: productData.medida },
      { label: "Proveedor", name: "provider", value: productData.provider },
      { label: "Precio sin IVA", name: "price_siva", value: productData.price_siva },
      { label: "Precio USD", name: "price_usd", value: productData.price_usd },
      { label: "Precio Final", name: "price_final", value: productData.price_final },
    ];

    return fields.map((field, index) => (
      <Grid item xs={12} sm={4} key={index}>
        <TextField
          fullWidth
          label={field.label}
          name={field.name}
          value={field.value || ""}
          onChange={handleChange}
          variant="outlined"
          InputLabelProps={{
            style: { color: "#616161" }, // Cambia el color de las etiquetas
          }}
        />
      </Grid>
    ));
  };

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <div className="modal-content">
        <Typography variant="h6" gutterBottom color="primary">
          Detalles del Producto
        </Typography>
        <Grid container spacing={3}>
          {renderInputs()}
        </Grid>
        <div className="modal-actions">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
            style={{
              marginTop: "16px",
              marginRight: "8px",
              backgroundColor: "#4caf50", // Color verde para guardar
              color: "#fff",
            }}
          >
            Guardar Cambios
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDelete}
            style={{
              marginTop: "16px",
              backgroundColor: "#f44336", // Color rojo para eliminar
              color: "#fff",
            }}
          >
            Eliminar Producto
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalProducto;
