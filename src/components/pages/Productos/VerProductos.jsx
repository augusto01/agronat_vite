import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography, TextField, Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import ModalAgregarProducto from './ModalAgregarProducto.jsx';
import ModalProducto from './ModalProducto.jsx';

const RotatingIcon = styled(SettingsIcon)(({ rotate }) => ({
  transition: 'transform 0.5s ease',
  transform: rotate ? 'rotate(360deg)' : 'rotate(0deg)',
}));

const VerProductos = () => {
  const [rotateId, setRotateId] = useState(null); // Estado para rastrear qué ícono está girando
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
      product.price.toString().includes(search) ||
      product.quantity.toString().includes(search)
  );

  const handleEdit = (product) => {
    setSelectedProduct(product); // Guarda el producto seleccionado
    setOpenModal(true); // Abre el modal
  };

  const handleButtonClick = (row) => {
    setRotateId(row.id); // Identifica qué botón está girando
    setTimeout(() => setRotateId(null), 100); // Restablece después de la animación
    handleEdit(row); // Llama a la función para abrir el modal
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/product/register',
        newProduct
      );
      setProducts((prev) => [...prev, response.data.producto]); // Agrega el producto nuevo a la lista
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null); // Limpia el producto seleccionado
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'category', headerName: 'Categoría', width: 150 },
    { field: 'price', headerName: 'Precio', width: 100 },
    { field: 'quantity', headerName: 'Cantidad', width: 100 },
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
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 80,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButtonClick(params.row)} // Llama a la función con animación
        >
          <RotatingIcon rotate={rotateId === params.row.id ? 1 : 0} />
        </Button>
      ),
    },
  ];

  const rows = filteredProducts.map((product, index) => ({
    id: product._id || index,
    name: product.name,
    category: product.category,
    price: product.price,
    quantity: product.quantity,
    create_at: product.create_at,
  }));

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
        onClick={() => setOpenAddModal(true)} // Cambia el estado a true para abrir el modal
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
          handleEdit={(updatedProduct) => console.log(updatedProduct)}
          handleDelete={(productId) => console.log(productId)}
          handleChange={(field, value) => {
            setSelectedProduct((prev) => ({ ...prev, [field]: value }));
          }}
        />
      )}

      <div style={{ height: 380, width: '100%' }} className="data-grid">
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
