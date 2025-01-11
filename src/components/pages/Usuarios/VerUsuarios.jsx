import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField as MuiTextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import '../../../styles/Usuarios.css';

const VerUsuarios = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]); // Establecer el estado para los usuarios
  const [loading, setLoading] = useState(true); // Controlar el estado de carga
  const [open, setOpen] = useState(false); // Estado para manejar la apertura del modal
  const [newUser, setNewUser] = useState({
    name: '',
    lastname: '',
    email: '',
    rol: '',
  }); // Estado para almacenar los datos del nuevo usuario

  // Obtener los usuarios desde la API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/listar_usuarios');
        
        if (Array.isArray(response.data.usuarios)) {
          setUsers(response.data.usuarios); // Asignamos la propiedad 'usuarios' al estado
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
  }, []); // El array vacío asegura que solo se ejecute una vez al montar el componente

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Filtrar los usuarios según la búsqueda
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.rol.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Nombre', width: 100 },
    { field: 'lastname', headerName: 'Apellido', width: 100 },
    { field: 'email', headerName: 'Correo', width: 200 },
    { 
      field: 'create_at', 
      headerName: 'Fecha de Creación', 
      width: 100,
      renderCell: (params) => {
        const date = new Date(params.value);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return formattedDate;
      }
    },
    { field: 'rol', headerName: 'Rol', width: 150 },
    { 
      field: 'actions', 
      headerName: 'Acciones', 
      width: 240, 
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => handleEdit(params.row.id)}
            style={{ marginRight: 10 }}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.row.id)}
          >
            Eliminar
          </Button>
        </div>
      )
    },
  ];

  const rows = filteredUsers.map((user, index) => ({
    id: user._id || index,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    create_at: user.create_at,
    rol: user.rol,
  }));

  // Función para manejar la edición de un usuario
  const handleEdit = (id) => {
    console.log('Editar usuario con ID:', id);
    // Aquí puedes agregar la lógica para editar al usuario
  };

  // Función para manejar la eliminación de un usuario
  const handleDelete = (id) => {
    console.log('Eliminar usuario con ID:', id);
    // Aquí puedes agregar la lógica para eliminar al usuario
  };

  // Función para manejar la apertura del modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Función para manejar el cierre del modal
  const handleClose = () => {
    setOpen(false);
  };

  // Función para manejar el cambio de los campos del nuevo usuario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para manejar la creación del nuevo usuario
  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/agregar_usuario', newUser);
      console.log('Usuario agregado:', response.data);
      // Recargar los usuarios después de agregar uno nuevo
      setUsers([...users, response.data.usuario]);
      setOpen(false); // Cerrar el modal
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  };

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
        onClick={handleClickOpen}
        style={{ margin: '20px 0' }}
      >
        Agregar Usuario
      </Button>

      {/* Modal para agregar nuevo usuario */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
        <DialogContent>
          <MuiTextField
            label="Nombre"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <MuiTextField
            label="Apellido"
            name="lastname"
            value={newUser.lastname}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <MuiTextField
            label="Correo"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <MuiTextField
            label="Rol"
            name="rol"
            value={newUser.rol}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ height: 380, width: '100%' }} className="data-grid">
        {loading ? (
          <Typography variant="h6" color="primary">Cargando usuarios...</Typography>
        ) : (
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        )}
      </div>
    </Container>
  );
};

export default VerUsuarios;
