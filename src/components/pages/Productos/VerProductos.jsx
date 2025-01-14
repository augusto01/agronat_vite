import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography, TextField, Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import ModalAgregarProducto from './ModalAgregarProducto.jsx';
import ModalProducto from './ModalProducto.jsx';
import '../../../styles/VerProductos.css'; // Archivo CSS para estilos personalizados

const RotatingIcon = styled(SettingsIcon)(({ rotate }) => ({
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
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/product/listar_productos'
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

    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()) ||
      product.quantity.toString().includes(search)
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

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/product/register',
        newProduct
      );
      setProducts((prev) => [...prev, response.data.producto]);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  const columns = [
    { field: 'id', headerName: 'CODIGO', width: 100 },
    { field: 'name', headerName: 'ARTICULO', width: 100 },
    { field: 'category', headerName: 'CATEGORIA', width: 100 },
    { field: 'quantity', headerName: 'CANTIDAD', width: 100 },
    { field: 'medida', headerName: 'MEDIDA', width: 100 },
    { field: 'provider', headerName: 'PROVEEDOR', width: 150 },
    { field: 'price_siva', headerName: 'PRECIO S/IVA', width: 120 },
    { field: 'price_usd', headerName: 'PRECIO USD', width: 120 },
    { field: 'price_final', headerName: 'PRECIO FINAL', width: 120 },
    {
      field: 'create_at',
      headerName: 'ULTIMA ACTUALIZACION',
      width: 150,
      renderCell: (params) => {
        const date = new Date(params.value);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return formattedDate;
      },
    },
    {
      field: 'actions',
      headerName: 'GESTIONAR',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButtonClick(params.row)}
        >
          <RotatingIcon rotate={rotateId === params.row.id ? 1 : 0} />
        </Button>
      ),
    },
  ];

  const rows = (filteredProducts || []).map((product, index) => ({
    id: product._id || index,
    name: product.name || '', // Asegúrate de que exista un valor por defecto
    category: product.category || '',
    quantity: product.quantity || 0,
    medida: product.medida || '',
    provider: product.provider || '',
    price_siva: product.price_siva || 0,
    price_usd: product.price_usd || 0,
    price_final: product.price_final || 0,
    create_at: product.create_at || '',
  }));
  
  const getRowClassName = (params) => {
    const stock = params.row.quantity;
    if (stock > 100) return 'stock-alto'; // Verde
    if (stock > 50) return 'stock-medio'; // Amarillo
    return 'stock-bajo'; // Rojo
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom className="title">
        Productos Registrados ({filteredProducts.length})
      </Typography>
      <TextField
        label="Buscar producto"
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
        onClick={() => setOpenAddModal(true)}
      >
        Agregar Producto
      </Button>

      <ModalAgregarProducto
        openModal={openAddModal}
        handleCloseModal={() => setOpenAddModal(false)}
        handleAddProduct={handleAddProduct}
      />

      {selectedProduct && (
        <ModalProducto
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          selectedProduct={selectedProduct}
        />
      )}

      <div style={{ height: 380, width: '100%' }} className="data-grid">
        {loading ? (
          <Typography variant="h6" color="primary">
            Cargando productos...
          </Typography>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            getRowClassName={getRowClassName}
          />
        )}
      </div>
    </Container>
  );
};

export default VerProductos;
