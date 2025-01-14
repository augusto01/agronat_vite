import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';
import ModalAgregarProducto from './ModalAgregarProducto.jsx';
import ModalProducto from './ModalProducto.jsx';
import '../../../styles/VerProductos.css'; // Archivo CSS para estilos personalizados

const RotatingIcon = styled(SettingsIcon)(({ rotate }) => ({
  transition: 'transform 0.5s ease',
  transform: rotate ? 'rotate(360deg)' : 'rotate(0deg)',
}));

const VerProductos = () => {
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
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'ARTICULO', width: 200 },
    { field: 'category', headerName: 'CATEGORIA', width: 100 },
    { field: 'quantity', headerName: 'STOCK', width: 100 },
    { field: 'medida', headerName: 'MEDIDA', width: 60 },
    { field: 'provider', headerName: 'PROVEEDOR', width: 150 },
    { field: 'price_siva', headerName: 'SIN IVA', width: 90 },
    { field: 'price_usd', headerName: ' USD', width: 90 },
    { field: 'price_final', headerName: ' FINAL', width: 90 },
    {
      field: 'create_at',
      headerName: 'ACTUALIZACION',
      width: 100,
      renderCell: (params) => {
        const date = new Date(params.value);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return formattedDate;
      },
    },
    {
      field: 'actions',
      headerName: 'ACCION',
      width: 90,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEdit(params.row)}
        >
          <RotatingIcon />
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

  const getRowClassName = (params) => {
    const stock = params.row.quantity;
    if (stock > 100) return 'stock-alto'; // Verde
    if (stock > 50) return 'stock-medio'; // Amarillo
    return 'stock-bajo'; // Rojo
  };

  return (
    <div className="main-container">
      {loading ? (
        <div className="loading">Cargando productos...</div>
      ) : (
        <>
          <ModalProducto
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            selectedProduct={selectedProduct}
          />
          <div className="data-grid-container">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              getRowClassName={(params) => `row-${getRowClassName(params)}`}
              className="data-grid"
              disableSelectionOnClick
            />
          </div>
        </>
      )}
    </div>
  );
};

export default VerProductos;
