import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography, TextField, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material'; // Importamos los íconos
import { GridActionsCellItem } from '@mui/x-data-grid'; // Importamos el componente para las acciones
import '../../../styles/Usuarios.css';

const VerUsuarios = () => {
  const [search, setSearch] = useState('');
  const [users] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'Admin' },
    { id: 2, name: 'Ana Gómez', email: 'ana@example.com', role: 'User' },
    { id: 3, name: 'Carlos López', email: 'carlos@example.com', role: 'User' },
    { id: 4, name: 'Lucía Díaz', email: 'lucia@example.com', role: 'Admin' },
    { id: 5, name: 'Pedro García', email: 'pedro@example.com', role: 'User' },
  ]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'email', headerName: 'Correo', width: 300 },
    { field: 'role', headerName: 'Rol', width: 150 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <GridActionsCellItem
              icon={<Edit />}
              label="Editar"
              onClick={() => handleEdit(params.row)}
              color="primary"
              sx={{ marginRight: 1 }}
            />
            <GridActionsCellItem
              icon={<Delete />}
              label="Eliminar"
              onClick={() => handleDelete(params.row.id)}
              color="secondary"
            />
          </>
        );
      },
    },
  ];

  const rows = filteredUsers.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }));

  // Funciones para manejar las acciones de editar y eliminar
  const handleEdit = (user) => {
    console.log('Editar usuario:', user);
    // Lógica para editar el usuario
  };

  const handleDelete = (userId) => {
    console.log('Eliminar usuario con ID:', userId);
    // Lógica para eliminar el usuario
  };

  // Agregamos un método para asignar clases a las filas según el índice
  const getRowClassName = (params) => {
    return params.index % 2 === 0 ? 'even-row' : 'odd-row';
  };

  return (
    <Container>
      <div className="header-container">
        <Typography variant="h4" gutterBottom className="title">
          Usuarios Registrados ({filteredUsers.length})
        </Typography>
        <Button variant="contained" color="primary" className="add-user-button">
          Agregar Usuario
        </Button>
      </div>
      <TextField
        label="Buscar usuario"
        variant="outlined"
        value={search}
        onChange={handleSearchChange}
        fullWidth
        className="search-input"
      />
      <div style={{ height: 400, width: '100%' }} className="data-grid">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          getRowClassName={getRowClassName} // Asignamos la función para las clases
        />
      </div>
    </Container>
  );
};

export default VerUsuarios;
