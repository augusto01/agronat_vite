import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Autocomplete, FormControlLabel, Checkbox } from '@mui/material';
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
  const [abonado, setAbonado] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    fetchProductosRegistrados(searchQuery);
  }, [searchQuery]);

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

  const agregarProducto = (producto) => {
    if (!producto) return;
    
    // Verificar si el producto ya está en la lista
    const existe = productosVenta.find((p) => p._id === producto._id);
    
    if (existe) {
      // Si ya existe, aumentar su cantidad
      const nuevaLista = productosVenta.map((p) =>
        p._id === producto._id ? { ...p, cantidad: p.cantidad + 1 } : p
      );
      setProductosVenta(nuevaLista);
      calcularTotal(nuevaLista);
    } else {
      // Si no existe, agregarlo con cantidad 1
      const nuevoProducto = { ...producto, cantidad: 1 };
      const nuevaLista = [...productosVenta, nuevoProducto];
      setProductosVenta(nuevaLista);
      calcularTotal(nuevaLista);
    }
  };
  

  const agregarConCantidad = () => {
    if (productoSeleccionado) {
      const nuevoProducto = { ...productoSeleccionado, cantidad };
      setProductosVenta((prev) => [...prev, nuevoProducto]);
      calcularTotal([...productosVenta, nuevoProducto]);
      setProductoSeleccionado(null);
    }
  };

  const eliminarVenta = () => {
    setProductosVenta([]);
    setTotal(0);
    setPago('');
  };

  const calcularTotal = (productos) => {
    const nuevoTotal = productos.reduce((sum, producto) => sum + (producto.price_final || 0) * (producto.cantidad || 0), 0);
    setTotal(nuevoTotal);
  };

  const aumentarCantidad = (id) => {
    const nuevaLista = productosVenta.map((p) =>
      p._id === id ? { ...p, cantidad: p.cantidad + 1 } : p
    );
    setProductosVenta(nuevaLista);
    calcularTotal(nuevaLista);
  };
  
  const disminuirCantidad = (id) => {
    const nuevaLista = productosVenta.map((p) =>
      p._id === id && p.cantidad > 1 ? { ...p, cantidad: p.cantidad - 1 } : p
    );
    setProductosVenta(nuevaLista);
    calcularTotal(nuevaLista);
  };

  const columnasVenta = [
    { field: 'id', headerName: 'ID', width: 100, valueGetter: (params) => params.row?._id || 'N/A' },
    { field: 'name', headerName: 'Nombre', flex: 1 },
    { field: 'description', headerName: 'Descripcion.', width: 150 },
    { field: 'category', headerName: 'Categoría', width: 150 },
    {
  field: 'cantidad',
  headerName: 'Cantidad',
  width: 150,
  renderCell: (params) => (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: 1, 
        height: '100%', // Asegura que ocupe toda la celda y se centre verticalmente
        width: '100%'
      }}
    >
      <Button 
        variant="contained"
        size="small" 
        sx={{ 
          minWidth: 30, 
          padding: '2px 6px', 
          bgcolor: '#e0e0e0', 
          color: 'black', 
          '&:hover': { bgcolor: '#bdbdbd' }
        }}
        onClick={() => disminuirCantidad(params.row._id)}
      >-</Button>
      
      <Typography sx={{ minWidth: 20, textAlign: 'center' }}>
        {params.row.cantidad}
      </Typography>
      
      <Button 
        variant="contained"
        size="small" 
        sx={{ 
          minWidth: 30, 
          padding: '2px 6px', 
          bgcolor: '#e0e0e0', 
          color: 'black', 
          '&:hover': { bgcolor: '#bdbdbd' }
        }}
        onClick={() => aumentarCantidad(params.row._id)}
      >+</Button>
    </Box>
  ),
},
    { field: 'price_final', headerName: 'Precio Unit.', width: 150 },
    
    {
      field: 'subtotal',
      headerName: 'Subtotal',
      width: 120
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 100px)', overflow: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3, mb: 3 }}>
        <Box sx={{ flex: 1, backgroundColor: '#fff', borderRadius: '8px', padding: '10px' }}>
        <Autocomplete
          id="productos-buscar"
          options={productosRegistrados}
          getOptionLabel={(option) => `${option.name} - ${option.category} - S/ ${option.price_final}`}
          onInputChange={(e, newValue) => setSearchQuery(newValue)}
          onChange={(event, newValue) => newValue && agregarProducto(newValue)}
          openOnFocus
          renderInput={(params) => <TextField {...params} label="Buscar productos" variant="outlined" fullWidth sx={{ mb: 2 }} />}
          loading={loading}
        />


          <DataGrid 
            rows={productosVenta.map((p, index) => ({ ...p, id: p._id || index }))} 
            columns={columnasVenta} 
            pageSize={5} 
          />
        </Box>

        <Box sx={{ width: '300px', backgroundColor: '#fff', borderRadius: '8px', padding: '10px' }}>
          

          <TextField label="Cliente" variant="outlined" fullWidth value={cliente} onChange={(e) => setCliente(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="Comprobante" variant="outlined" select SelectProps={{ native: true }} fullWidth value={comprobante} onChange={(e) => setComprobante(e.target.value)}>
            <option value="Boleta">Boleta</option>
            <option value="Factura">Factura</option>
          </TextField>

          <Box sx={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '8px', mb: 2 }}>
            <Typography variant="h6" align="right">Total: S/ {total.toFixed(2)}</Typography>
            <TextField label="Pago" type="number" variant="outlined" fullWidth value={pago} onChange={(e) => setPago(Number(e.target.value))} sx={{ my: 2 }} />
            <Typography variant="h6" align="right" sx={{ color: pago >= total ? 'green' : 'red' }}>Cambio: S/ {Math.max(0, pago - total).toFixed(2)}</Typography>
          </Box>

          <FormControlLabel control={<Checkbox checked={abonado} onChange={(e) => setAbonado(e.target.checked)} color="primary" />} label="Abonado" />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Button variant="contained" color="error" onClick={eliminarVenta} sx={{ flex: 1 }}>CANCELAR VENTA</Button>
            <Button variant="contained" color="success" sx={{ flex: 1 }}>GENERAR VENTA</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RegistrarVenta;
