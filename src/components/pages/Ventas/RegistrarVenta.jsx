import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const RegistrarVenta = () => {
  const [productosRegistrados, setProductosRegistrados] = useState([
    { id: 1, nombre: 'Zapatos de Seguridad Oslo T41', precio: 200 },
    { id: 2, nombre: 'Casco de Seguridad', precio: 50 },
    { id: 3, nombre: 'Guantes de Seguridad', precio: 30 },
  ]);
  const [productosVenta, setProductosVenta] = useState([]);
  const [pago, setPago] = useState('');
  const [total, setTotal] = useState(0);
  const [cliente, setCliente] = useState('Consumidor Final');
  const [comprobante, setComprobante] = useState('Boleta');

  const agregarProducto = (producto) => {
    const productoExistente = productosVenta.find((p) => p.id === producto.id);
    if (productoExistente) {
      // Si el producto ya está en el carrito, se incrementa la cantidad
      const actualizados = productosVenta.map((p) =>
        p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
      );
      setProductosVenta(actualizados);
    } else {
      // Si el producto no está en el carrito, se agrega como nuevo con cantidad 1
      const nuevoProducto = { ...producto, cantidad: 1 };
      setProductosVenta([...productosVenta, nuevoProducto]);
    }
    calcularTotal([...productosVenta, { ...producto, cantidad: 1 }]);
  };

  const eliminarVenta = () => {
    setProductosVenta([]);
    setTotal(0);
    setPago('');
  };

  const calcularTotal = (productos) => {
    const nuevoTotal = productos.reduce(
      (sum, producto) => sum + producto.precio * producto.cantidad,
      0
    );
    setTotal(nuevoTotal);
  };

  const calcularCambio = () => {
    return Math.max(0, pago - total).toFixed(2);
  };

  const handleCantidadChange = (id, cantidad) => {
    if (cantidad <= 0) return; // Para evitar cantidades negativas o cero
    const nuevosProductos = productosVenta.map((p) =>
      p.id === id ? { ...p, cantidad: parseInt(cantidad, 10) } : p
    );
    setProductosVenta(nuevosProductos);
    calcularTotal(nuevosProductos);
  };

  const columnasProductos = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'precio', headerName: 'Precio', width: 120 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => agregarProducto(params.row)}
        >
          <AddShoppingCartIcon />
        </Button>
      ),
    },
  ];

  const columnasVenta = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    {
      field: 'cantidad',
      headerName: 'Cantidad',
      width: 120,
      renderCell: (params) => (
        <TextField
          type="number"
          value={params.row.cantidad}
          onChange={(e) => handleCantidadChange(params.row.id, e.target.value)}
          sx={{ width: '80px' }}
        />
      ),
    },
    { field: 'precio', headerName: 'Precio Unit.', width: 120 },
    {
      field: 'subtotal',
      headerName: 'Subtotal',
      width: 120,
      valueGetter: (params) => {
        const row = params.row || {}; // Asegurarse de que row no sea undefined
        const cantidad = row.cantidad || 0;
        const precio = row.precio || 0;
        return (cantidad * precio).toFixed(2);
      },
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 100px)',
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 3,
          mb: 3,
        }}
      >
        {/* Lado izquierdo: DataGrid de Productos y Detalle de la Venta */}
        <Box sx={{ flex: 1, backgroundColor: '#fff', borderRadius: '8px', padding: '10px' }}>
          <TextField
            label="Buscar productos"
            variant="outlined"
            fullWidth
            sx={{ mb: 2, borderRadius: '5px' }}
          />
          <DataGrid
            rows={productosRegistrados}
            columns={columnasProductos}
            pageSize={5}
            autoHeight
          />
          {/* Detalle de la venta */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
              Detalle de la Venta
            </Typography>
            <DataGrid
              rows={productosVenta}
              columns={columnasVenta}
              pageSize={5}
              autoHeight
            />
          </Box>
        </Box>

        {/* Lado derecho: Cliente, Comprobante, Total y Cambio */}
        <Box
          sx={{
            width: '300px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '10px',
          }}
        >
          {/* Cliente y Comprobante */}
          <Box sx={{ mb: 3 }}>
            <TextField
              label="Cliente"
              variant="outlined"
              defaultValue={cliente}
              fullWidth
              sx={{
                mb: 2,
                borderRadius: '5px',
                '& .MuiInputBase-root': {
                  height: '40px',
                },
              }}
              onChange={(e) => setCliente(e.target.value)}
            />
            <TextField
              label="Comprobante"
              variant="outlined"
              select
              SelectProps={{
                native: true,
              }}
              fullWidth
              value={comprobante}
              onChange={(e) => setComprobante(e.target.value)}
              sx={{
                '& .MuiInputBase-root': {
                  height: '40px',
                },
              }}
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
              sx={{
                my: 2,
                borderRadius: '5px',
                '& .MuiInputBase-root': {
                  height: '40px',
                },
              }}
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
              Cambio: S/ {calcularCambio()}
            </Typography>
          </Box>

          {/* Botones */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
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
