import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import '../../../styles/VerProductos.css';
import ModalAgregarProducto from './ModalAgregarProducto.jsx'; // Modal para agregar producto
import ModalProducto from './ModalProducto.jsx'; // Modal para editar producto

const RotatingIcon = styled(SettingsIcon)(({ theme, rotate }) => ({
  transition: 'transform 0.5s ease',
  transform: rotate ? 'rotate(360deg)' : 'rotate(0deg)',
}));

const VerProductos = () => {
  const [rotateId, setRotateId] = useState(null);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.code.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()) ||
      product.provider.toLowerCase().includes(search.toLowerCase()) ||
      product.medida.toLowerCase().includes(search.toLowerCase()) ||
      product.price_siva.toString().includes(search.toLowerCase()) ||
      product.price_usd.toString().includes(search.toLowerCase()) ||
      product.price_final.toString().includes(search.toLowerCase())
  );

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleButtonClick = (row) => {
    setRotateId(row.id);
    setTimeout(() => setRotateId(null), 100);
    handleEdit(row);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 85 },
    { field: 'name', headerName: 'Nombre', width: 100 },
    { field: 'category', headerName: 'Categoría', width: 100 },
    { field: 'quantity', headerName: 'Cantidad', width: 100 },
    { field: 'description', headerName: 'Descripcion', width: 100 },
    { field: 'medida', headerName: 'Medida', width: 100 },
    { field: 'provider', headerName: 'Proveedor', width: 150 },
    {
      field: 'price_siva',
      headerName: 'PRECIO IVA',
      width: 100,
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
      width: 100,
      renderCell: (params) => `$${params.value.toFixed(2)}`,
    },
    {
      field: 'por_marginal',
      headerName: '% marginal',
      width: 100,
      renderCell: (params) => `$${params.value.toFixed(2)}`,
    },
    {
      field: 'por_descuento',
      headerName: '% descuento',
      width: 100,
      renderCell: (params) => `$${params.value.toFixed(2)}`,
    },
    {
      field: 'create_at',
      headerName: 'Fecha de Creación',
      width: 100,
      renderCell: (params) => {
        const date = new Date(params.value);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return formattedDate;
      },
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="white"
          onClick={() => handleButtonClick(params.row)}
        >
          <RotatingIcon rotate={rotateId === params.row.id ? 1 : 0} />
        </Button>
      ),
    },
  ];


  //DATAGRID PARA MOSTRAR LOS PRODUCTOS 
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
    por_descuento: product.por_descuento,
    por_marginal: product.por_marginal,
    price_final: product.price_final,
    create_at: product.create_at,
  }));

  return (
    <Container>
      <Typography variant="h4" gutterBottom className="title">
        Productos Registrados ({filteredProducts.length})
      </Typography>

      <Grid container spacing={2} alignItems="center" style={{ marginBottom: '20px' }}>
        <Grid item xs={12}>
          <TextField
            label="Buscar producto"
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddModal(true)} // Abre el modal de agregar producto
          >
            Agregar Producto
          </Button>
        </Grid>
      </Grid>

      <ModalAgregarProducto
        openModal={openAddModal}
        handleCloseModal={() => setOpenAddModal(false)}
        fetchProducts={fetchProducts} // Pasa la función fetchProducts
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

      <div style={{ height: '100%', width: '100%' }} className="data-grid">
        {loading ? (
          <Typography variant="h6" color="primary">
            Cargando productos...
          </Typography>
        ) : (
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        )}
      </div>
    </Container>
  );
};

export default VerProductos;
