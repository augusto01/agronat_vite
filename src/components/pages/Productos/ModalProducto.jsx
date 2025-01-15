import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; // Ícono de lápiz
import CloseIcon from "@mui/icons-material/Close"; // Ícono de la "X"
import axios from "axios";

const ModalProducto = ({
  openModal,
  handleCloseModal,
  selectedProduct,
  handleSaveChanges,
  handleDelete,
  handleChange,
}) => {
  const [productData, setProductData] = useState(selectedProduct);

  useEffect(() => {
    setProductData(selectedProduct); // Actualiza el producto cuando el modal se abre
  }, [selectedProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validación para que solo acepte números en campos como "Stock" y precios
    if (
      (name === "quantity" || name.includes("price")) &&
      !/^\d*\.?\d*$/.test(value)
    ) {
      return; // No se permite letras o caracteres no numéricos
    }

    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
      <Grid item xs={12} sm={6} key={index}>
        <TextField
          fullWidth
          label={field.label}
          name={field.name}
          value={field.value || ""}
          onChange={handleInputChange}
          variant="outlined"
        />
      </Grid>
    ));
  };

  return (
    <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
      {/* Título del modal con ambos íconos: lápiz y "X" */}
      <DialogTitle style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          Editar Producto
        </div>
        <div>
          <IconButton
            edge="end"
            onClick={handleCloseModal}
            style={{ color: "gray" }}
          >
            <CloseIcon />
          </IconButton>
          <IconButton
            edge="end"
            style={{ color: "gray" }}
          >
          </IconButton>
        </div>
      </DialogTitle>

      {/* Contenido del modal */}
      <DialogContent>
        {productData ? (
          <Grid container spacing={3} style={{ padding: "20px" }}>
            {/* Renderización de inputs */}
            {renderInputs()}
          </Grid>
        ) : (
          <Typography variant="body1">Cargando...</Typography>
        )}
      </DialogContent>

      {/* Botones de acciones */}
      <DialogActions>
        <Button
          onClick={() => handleDelete(productData.id)}
          color="error"
          variant="contained"
        >
          Eliminar Producto
        </Button>
        <Button
          onClick={() => handleSaveChanges(productData)}
          color="primary"
          variant="contained"
        >
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalProducto;
