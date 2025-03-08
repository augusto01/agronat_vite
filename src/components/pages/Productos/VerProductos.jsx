import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Container, Typography, TextField, Button, Grid, Box, MenuItem, Select, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings'; // Ícono de tuerca
import StraightenIcon from '@mui/icons-material/Straighten'; // Ícono de medida
import FactoryIcon from '@mui/icons-material/Factory'; // Ícono de proveedor
import '../../../styles/VerProductos.css';
import ModalAgregarProducto from './ModalAgregarProducto.jsx'; // Modal para agregar producto
import ModalProducto from './ModalProducto.jsx'; // Modal para editar producto

const VerProductos = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rotatingProductId, setRotatingProductId] = useState(null); // Estado para la animación de la tuerca

  // Estados para filtrado
  const [filterCategory, setFilterCategory] = useState('');
  const [filterProvider, setFilterProvider] = useState('');

  // Estados para agregar medidas y proveedores
  const [newMeasure, setNewMeasure] = useState('');
  const [newProvider, setNewProvider] = useState('');
  const [openMeasureModal, setOpenMeasureModal] = useState(false);
  const [openProviderModal, setOpenProviderModal] = useState(false);

  // Obtener los productos desde la API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/product/productos_activos'
      );
      if (Array.isArray(response.data.productos)) {
        setProducts(response.data.productos);
      } else {
        console.error(
          "La propiedad 'productos' no es un arreglo o no existe:",
          response.data
        );
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtrado de productos
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.code.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = filterCategory ? product.category === filterCategory : true;
    const matchesProvider = filterProvider ? product.provider === filterProvider : true;

    return matchesSearch && matchesCategory && matchesProvider;
  });

  // Función para agregar una nueva medida
  const handleAddMeasure = async () => {
    if (!newMeasure) return;
    try {
      await axios.post('http://localhost:5000/api/product/medidas', { medida: newMeasure });
      setNewMeasure('');
      setOpenMeasureModal(false); // Cerrar el modal
      fetchProducts(); // Recargar productos para reflejar la nueva medida
    } catch (error) {
      console.error('Error adding measure:', error);
    }
  };

  // Función para agregar un nuevo proveedor
  const handleAddProvider = async () => {
    if (!newProvider) return;
    try {
      await axios.post('http://localhost:5000/api/product/proveedores', { proveedor: newProvider });
      setNewProvider('');
      setOpenProviderModal(false); // Cerrar el modal
      fetchProducts(); // Recargar productos para reflejar el nuevo proveedor
    } catch (error) {
      console.error('Error adding provider:', error);
    }
  };

  // Función para manejar la animación de la tuerca
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setRotatingProductId(product.id); // Activar la animación solo para este producto
    setTimeout(() => setRotatingProductId(null), 500); // Desactivar la animación después de 500ms
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  // Columnas del DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 85 },
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'category', headerName: 'Categoría', width: 120 },
    { field: 'quantity', headerName: 'Cantidad', width: 100 },
    { field: 'description', headerName: 'Descripción', width: 200 },
    { field: 'medida', headerName: 'Medida', width: 100 },
    { field: 'provider', headerName: 'Proveedor', width: 150 },
    {
      field: 'price_siva',
      headerName: 'PRECIO IVA',
      width: 120,
      renderCell: (params) => `$${params.value.toFixed(2)}`,
    },
    {
      field: 'price_usd',
      headerName: 'USD',
      width: 100,
      renderCell: (params) => `USD ${params.value.toFixed(2)}`,
    },
    {
      field: 'price_final',
      headerName: 'Precio Final',
      width: 120,
      renderCell: (params) => `$${params.value.toFixed(2)}`,
    },
    {
      field: 'create_at',
      headerName: 'Ultima actualizacion',
      width: 100,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEdit(params.row)}
          
        >
          <SettingsIcon
            style={{
              animation: rotatingProductId === params.row.id ? 'rotate 0.5s linear' : 'none', // Animación solo para este producto
            }}
          />
        </Button>
      ),
    },
  ];

  // Filas del DataGrid
  const rows = filteredProducts.map((product, index) => ({
    id: product.code || index,
    name: product.name,
    category: product.category,
    description: product.description,
    quantity: product.quantity,
    medida: product.medida,
    provider: product.provider,
    price_siva: product.price_siva,
    price_usd: product.price_usd,
    price_final: product.price_final,
    create_at: product.create_at,
  }));

  return (
    <Container maxWidth={false} style={{ padding: 0 }}>
      <style>
        {`
          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <Typography variant="h4" gutterBottom className="title" style={{ padding: '20px' }}>
        Productos Registrados ({filteredProducts.length})
      </Typography>

      {/* Filtros */}
      <Grid container spacing={2} style={{ padding: '20px', paddingBottom: '10px' }}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Buscar producto"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Categoría</InputLabel>
            <Select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              label="Categoría"
            >
              <MenuItem value="">Todas</MenuItem>
              {[...new Set(products.map((p) => p.category))].map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Proveedor</InputLabel>
            <Select
              value={filterProvider}
              onChange={(e) => setFilterProvider(e.target.value)}
              label="Proveedor"
            >
              <MenuItem value="">Todos</MenuItem>
              {[...new Set(products.map((p) => p.provider))].map((provider) => (
                <MenuItem key={provider} value={provider}>
                  {provider}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* DataGrid y botones de acción */}
      <Grid container spacing={0} style={{ padding: '20px', paddingTop: '10px' }}>
        <Grid item xs={11} style={{ paddingRight: '10px' }}>
          <div style={{ height: 'calc(100vh - 300px)', width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              components={{ Toolbar: GridToolbar }} // Barra de herramientas con filtros
              sx={{
                backgroundColor: '#424242', // Fondo oscuro
                color: '#fff', // Texto blanco
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#616161',
                  color: 'black', // Encabezados más oscuros
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid #757575', // Líneas divisorias
                },
              }}
            />
          </div>
        </Grid>
        <Grid item xs={1} style={{ paddingLeft: '10px' }}>
          <Box display="flex" flexDirection="column" gap={2} alignItems="flex-end">
            {/* Botón de Agregar Producto */}
            <Tooltip title="Agregar producto" arrow>
              <Button
                variant="contained"
                style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={() => setOpenAddModal(true)}
              >
                <AddIcon style={{ color: 'white' }} />
              </Button>
            </Tooltip>

            {/* Botón de Agregar Medida */}
            <Tooltip title="Agregar medida" arrow>
              <Button
                variant="contained"
                style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={() => setOpenMeasureModal(true)}
              >
                <StraightenIcon style={{ color: 'white' }} />
              </Button>
            </Tooltip>

            {/* Botón de Agregar Proveedor */}
            <Tooltip title="Agregar proveedor" arrow>
              <Button
                variant="contained"
                style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={() => setOpenProviderModal(true)}
              >
                <FactoryIcon style={{ color: 'white' }} />
              </Button>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>

      {/* Modal para agregar medida */}
      <Dialog open={openMeasureModal} onClose={() => setOpenMeasureModal(false)}>
        <DialogTitle>Agregar Medida</DialogTitle>
        <DialogContent>
          <TextField
            label="Nueva Medida"
            variant="outlined"
            value={newMeasure}
            onChange={(e) => setNewMeasure(e.target.value)}
            fullWidth
            style={{ marginTop: '10px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMeasureModal(false)}>Cancelar</Button>
          <Button onClick={handleAddMeasure} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal para agregar proveedor */}
      <Dialog open={openProviderModal} onClose={() => setOpenProviderModal(false)}>
        <DialogTitle>Agregar Proveedor</DialogTitle>
        <DialogContent>
          <TextField
            label="Nuevo Proveedor"
            variant="outlined"
            value={newProvider}
            onChange={(e) => setNewProvider(e.target.value)}
            fullWidth
            style={{ marginTop: '10px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProviderModal(false)}>Cancelar</Button>
          <Button onClick={handleAddProvider} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modales */}
      <ModalAgregarProducto
        openModal={openAddModal}
        handleCloseModal={() => setOpenAddModal(false)}
        fetchProducts={fetchProducts}
      />

      {selectedProduct && (
        <ModalProducto
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          selectedProduct={selectedProduct}
          handleEdit={(updatedProduct) => console.log(updatedProduct)}
          handleDelete={(productId) => console.log(productId)}
          handleChange={(field, value) => {
            setSelectedProduct((prev) => ({ ...prev, [field]: value }));
          }}
        />
      )}
    </Container>
  );
};

export default VerProductos;