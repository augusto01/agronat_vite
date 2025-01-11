import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, Grid } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ModalAgregarUsuario = ({ openModal, handleCloseModal, handleAddUser }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    domicilio: {
      calle: '',
      numero: '',
      ciudad: '',
      provincia: '',
      codigo_postal: '',
    },
    cel: '',
    nickname: '',
    rol: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    if (keys.length > 1) {
      setNewUser((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setNewUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    handleAddUser(newUser);
    handleCloseModal(); // Cierra el modal después de agregar el usuario
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
          <AddCircleOutlineIcon /> Agregar Nuevo Usuario
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Primera columna */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                name="name"
                value={newUser.name}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Apellido"
                name="lastname"
                value={newUser.lastname}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Correo"
                name="email"
                value={newUser.email}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Celular"
                name="cel"
                value={newUser.cel}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Apodo"
                name="nickname"
                value={newUser.nickname}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Rol"
                name="rol"
                value={newUser.rol}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            {/* Segunda columna */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contraseña"
                name="password"
                type="password"
                value={newUser.password}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Confirmar Contraseña"
                name="confirmPassword"
                type="password"
                value={newUser.confirmPassword}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Calle"
                name="domicilio.calle"
                value={newUser.domicilio.calle}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Número"
                name="domicilio.numero"
                value={newUser.domicilio.numero}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Ciudad"
                name="domicilio.ciudad"
                value={newUser.domicilio.ciudad}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Provincia"
                name="domicilio.provincia"
                value={newUser.domicilio.provincia}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Código Postal"
                name="domicilio.codigo_postal"
                value={newUser.domicilio.codigo_postal}
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
            Agregar Usuario
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalAgregarUsuario;
