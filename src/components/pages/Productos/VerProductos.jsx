import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Typography, Container } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';
import ModalProducto from './ModalProducto.jsx';
import '../../../styles/VerProductos.css'; // Asegúrate de que el archivo CSS esté correctamente importado

// Componente para el ícono que gira
const RotatingIcon = styled(SettingsIcon)(({ theme, rotate }) => ({
  transition: 'transform 0.5s ease',
  transform: rotate ? 'rotate(360deg)' : 'rotate(0deg)',
  color: '#ffffff', // Color del ícono de la tuerca
}));

const VerProductos = () => {
  const [rotateId, setRotateId] = useState(null); // Estado para rastrear qué ícono está girando
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
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

  const handleEdit = (product) => {
    setSelectedProduct(product); // Guarda el producto seleccionado
    setOpenModal(true); // Abre el modal
  };

  const handleButtonClick = (row) => {
    setRotateId(row.id); // Establece el ID del botón girando
    setTimeout(() => setRotateId(null), 500); // Restablece después de la animación
    handleEdit(row); // Abre el modal
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null); // Limpia el producto seleccionado
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'ARTÍCULO', width: 200 },
    { field: 'category', headerName: 'CATEGORÍA', width: 90 },
    { field: 'quantity', headerName: 'STOCK', width: 90 },
    { field: 'medida', headerName: 'MEDIDA', width: 80 },
    { field: 'provider', headerName: 'PROVEEDOR', width: 150 },
    { field: 'price_siva', headerName: 'SIN IVA', width: 90 },
    { field: 'price_usd', headerName: 'USD', width: 90 },
    { field: 'price_final', headerName: 'FINAL', width: 90 },
    {
      field: 'create_at',
      headerName: 'ACTUALIZACIÓN',
      width: 90,
      renderCell: (params) => {
        if (!params.value) return '';
        const date = new Date(params.value);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      },
    },
    {
      field: 'actions',
      headerName: 'ACCIONES',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButtonClick(params.row)} // Llama a la función con animación
          className="action-button" // Añadido para personalizar estilos
        >
          <RotatingIcon rotate={rotateId === params.row.id ? 1 : 0} />
        </Button>
      ),
    },
  ];

  const rows = (products || []).map((product, index) => ({
    id: product.code || index,
    name: product.name || '',
    category: product.category || '',
    quantity: product.quantity || 0,
    medida: product.medida || '',
    provider: product.provider || '',
    price_siva: product.price_siva ? `$${product.price_siva.toFixed(2)}` : '$0.00',
    price_usd: product.price_usd ? `USD ${product.price_usd.toFixed(2)}` : 'USD 0.00',
    price_final: product.price_final ? `$${product.price_final.toFixed(2)}` : '$0.00',
    create_at: product.create_at || '',
  }));

  // Función para asignar clases alternadas a las filas
  const getRowClassName = (params) => {
    return params.index % 2 === 0 ? 'even-row' : 'odd-row';
  };

  return (
    <Container className="main-container">
      <Typography variant="h4" gutterBottom>
        Productos Registrados ({products.length})
      </Typography>
      <div className="data-grid-container">
        <div style={{ height: 400, width: '100%' }}>
          {loading ? (
            <Typography variant="h6" color="primary" className="loading">
              Cargando productos...
            </Typography>
          ) : (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              getRowClassName={getRowClassName} // Aplicamos la función para los colores alternados
              className="data-grid"
            />
          )}
        </div>
      </div>

      {selectedProduct && (
        <ModalProducto
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          selectedProduct={selectedProduct}
        />
      )}
    </Container>
  );
};

export default VerProductos;
