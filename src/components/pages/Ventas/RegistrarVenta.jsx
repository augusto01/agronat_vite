import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Autocomplete } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const RegistrarVenta = () => {
  const [productosRegistrados, setProductosRegistrados] = useState([]);
  const [productosVenta, setProductosVenta] = useState([]);
  const [pago, setPago] = useState('');
  const [total, setTotal] = useState(0);
  const [cliente, setCliente] = useState('Consumidor Final');
  const [comprobante, setComprobante] = useState('Boleta');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Llamada a la API para obtener los productos
  const fetchProductosRegistrados = async (query = '') => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/sales/productos_disponibles', {
        params: { searchQuery: query },
      });
      setProductosRegistrados(response.data.productos);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
    setLoading(false);
  };

  // Efecto para realizar la búsqueda de productos
  useEffect(() => {
    fetchProductosRegistrados(searchQuery);
  }, [searchQuery]);

  // Función para agregar productos al carrito
  const agregarProducto = (producto) => {
    const productoExistente = productosVenta.find((p) => p._id === producto._id);
    if (productoExistente) {
      const nuevosProductos = productosVenta.map((p) =>
        p._id === producto._id ? { ...p, cantidad: p.cantidad + 1 } : p
      );
      setProductosVenta(nuevosProductos);
    } else {
      const nuevoProducto = { ...producto, cantidad: 1 };
      setProductosVenta([...productosVenta, nuevoProducto]);
    }
    calcularTotal([...productosVenta, { ...producto, cantidad: 1 }]);
  };

  // Función para eliminar todos los productos del carrito
  const eliminarVenta = () => {
    setProductosVenta([]);
    setTotal(0);
    setPago('');
  };

  // Función para calcular el total
  const calcularTotal = (productos) => {
    const nuevoTotal = productos.reduce(
      (sum, producto) => sum + (producto.price_final || 0) * (producto.cantidad || 0),
      0
    );
    setTotal(nuevoTotal);
  };

  const columnasVenta = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Nombre', flex: 1 },
    { field: 'category', headerName: 'Categoría', width: 150 },
    { field: 'price_final', headerName: 'Precio Unit.', width: 120 },
    {
      field: 'action',
      headerName: 'Acción',
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="Danger"
          onClick={() => agregarProducto(params.row)}
        >
          Eliminar
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 100px)', overflow: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3, mb: 3 }}>
        <Box sx={{ flex: 1, backgroundColor: '#fff', borderRadius: '8px', padding: '10px' }}>
          {/* Campo de búsqueda con Autocomplete */}
          <Autocomplete
            id="productos-buscar"
            options={productosRegistrados}
            getOptionLabel={(option) => `${option.name} - ${option.category} - S/ ${option.price_final}`}
            onInputChange={(e, newValue) => setSearchQuery(newValue)} // Actualizar la búsqueda
            onChange={(event, newValue) => {
              if (newValue) {
                agregarProducto(newValue); // Agregar producto al seleccionar
                setSearchQuery(''); // Limpiar el campo de búsqueda
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buscar productos"
                variant="outlined"
                fullWidth
                sx={{ mb: 2, borderRadius: '5px' }}
              />
            )}
            loading={loading}
          />

          {/* Detalle de la venta */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Detalle de la Venta</Typography>
            <DataGrid
              rows={productosVenta}
              columns={columnasVenta}
              pageSize={5}
              getRowId={(row) => row._id} // Usando _id como identificador único
            />
          </Box>
        </Box>

        {/* Lado derecho: Cliente, Comprobante, Total y Cambio */}
        <Box sx={{ width: '300px', backgroundColor: '#fff', borderRadius: '8px', padding: '10px' }}>
          <Box sx={{ mb: 3 }}>
            <TextField
              label="Cliente"
              variant="outlined"
              defaultValue={cliente}
              fullWidth
              sx={{ mb: 2, borderRadius: '5px' }}
              onChange={(e) => setCliente(e.target.value)}
            />
            <TextField
              label="Comprobante"
              variant="outlined"
              select
              SelectProps={{ native: true }}
              fullWidth
              value={comprobante}
              onChange={(e) => setComprobante(e.target.value)}
              sx={{ '& .MuiInputBase-root': { height: '40px' } }}
            >
              <option value="Boleta">Boleta</option>
              <option value="Factura">Factura</option>
            </TextField>
          </Box>

          {/* Total y Pago */}
          <Box sx={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '8px', mb: 2 }}>
            <Typography variant="h6" align="right" sx={{ fontWeight: 'bold', color: '#333' }}>
              Total: S/ {total.toFixed(2)}
            </Typography>
            <TextField
              label="Pago"
              type="number"
              variant="outlined"
              fullWidth
              sx={{ my: 2, borderRadius: '5px' }}
              value={pago}
              onChange={(e) => setPago(Number(e.target.value))}
            />
            <Typography
              variant="h6"
              align="right"
              sx={{
                fontWeight: 'bold',
                color: pago >= total ? 'green' : 'red',
                backgroundColor: pago >= total ? '#e8f5e9' : '#ffebee',
                padding: '8px',
                borderRadius: '4px',
              }}
            >
              Cambio: S/ {Math.max(0, pago - total).toFixed(2)}
            </Typography>
          </Box>

          {/* Botones */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={eliminarVenta}
              sx={{ flex: 1, height: '50px', fontWeight: 'bold' }}
            >
              CANCELAR VENTA
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ flex: 1, height: '50px', fontWeight: 'bold' }}
            >
              GENERAR VENTA
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RegistrarVenta;
