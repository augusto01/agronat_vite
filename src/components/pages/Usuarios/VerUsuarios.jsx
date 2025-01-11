import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography, TextField, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import ModalUsuario from './ModalUsuario';

const VerUsuarios = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Obtener los usuarios desde la API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/listar_usuarios');
        if (Array.isArray(response.data.usuarios)) {
          setUsers(response.data.usuarios);
        } else {
          console.error("La propiedad 'usuarios' no es un arreglo o no existe:", response.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.rol.toLowerCase().includes(search.toLowerCase()) ||
      user.cel.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (user) => {
    setSelectedUser(user); // Guarda el usuario seleccionado
    setOpenModal(true); // Abre el modal
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null); // Limpia el usuario seleccionado
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Nombre', width: 100 },
    { field: 'lastname', headerName: 'Apellido', width: 100 },
    { field: 'email', headerName: 'Correo', width: 200 },
    {
      field: 'create_at',
      headerName: 'Fecha de Creación',
      width: 150,
      renderCell: (params) => {
        const date = new Date(params.value);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return formattedDate;
      },
    },
    { field: 'cel', headerName: 'Celular', width: 150 },
    { field: 'rol', headerName: 'Rol', width: 150 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="success"
          startIcon={<VisibilityIcon />}
          onClick={() => handleEdit(params.row)} // Abre el modal con los detalles del usuario
        >
          Detalle
        </Button>
      ),
    },
  ];

  const rows = filteredUsers.map((user, index) => ({
    id: user._id || index,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    create_at: user.create_at,
    cel: user.cel,
    rol: user.rol,
  }));

  return (
    <Container>
      <Typography variant="h4" gutterBottom className="title">
        Usuarios Registrados ({filteredUsers.length})
      </Typography>
      <TextField
        label="Buscar usuario"
        variant="outlined"
        value={search}
        onChange={handleSearchChange}
        fullWidth
        className="search-input"
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        style={{ margin: '20px 0' }}
      >
        Agregar Usuario
      </Button>

      {/* Modal para ver detalle del usuario */}
      {selectedUser && (
        <ModalUsuario
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          selectedUser={selectedUser}
          handleEdit={(updatedUser) => console.log(updatedUser)} // Lógica de guardar cambios
          handleDelete={(userId) => console.log(userId)} // Lógica de eliminar usuario
          handleChange={(field, value) => {
            setSelectedUser((prev) => ({ ...prev, [field]: value }));
          }}
        />
      )}

      <div style={{ height: 380, width: '100%' }} className="data-grid">
        {loading ? (
          <Typography variant="h6" color="primary">
            Cargando usuarios...
          </Typography>
        ) : (
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        )}
      </div>
    </Container>
  );
};

export default VerUsuarios;
