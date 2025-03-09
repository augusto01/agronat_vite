import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  Paper,
  Snackbar,
} from '@mui/material';
import axios from 'axios';
import logo from '../../../assets/agronat-logo.png'; // Importar el logo

const RegistrarVenta = () => {
  const [productosRegistrados, setProductosRegistrados] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [abonado, setAbonado] = useState(true);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pago, setPago] = useState('');
  const [cliente, setCliente] = useState('Consumidor Final');
  const [comprobante, setComprobante] = useState('Boleta');
  const [medioPago, setMedioPago] = useState('Efectivo');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false); // Estado para el mensaje de error
  const [ventanaImpresion, setVentanaImpresion] = useState(null);

  // Obtener productos disponibles
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

  // Agregar producto al carrito
  const agregarProducto = (producto) => {
    if (!producto) return;

    const productoExistente = carrito.find((p) => p._id === producto._id);

    if (productoExistente) {
      const nuevoCarrito = carrito.map((p) =>
        p._id === producto._id ? { ...p, cantidad: p.cantidad + 1 } : p
      );
      setCarrito(nuevoCarrito);
    } else {
      const nuevoProducto = { ...producto, cantidad: 1 };
      setCarrito([...carrito, nuevoProducto]);
    }

    // Limpiar el input del buscador
    setSearchQuery('');

    calcularTotal();
  };

  // Aumentar cantidad de un producto en el carrito
  const aumentarCantidad = (id) => {
    const nuevoCarrito = carrito.map((p) =>
      p._id === id ? { ...p, cantidad: p.cantidad + 1 } : p
    );
    setCarrito(nuevoCarrito);
    calcularTotal();
  };

  // Disminuir cantidad de un producto en el carrito
  const disminuirCantidad = (id) => {
    const nuevoCarrito = carrito
      .map((p) =>
        p._id === id && p.cantidad > 1 ? { ...p, cantidad: p.cantidad - 1 } : p
      )
      .filter((p) => p.cantidad > 0);
    setCarrito(nuevoCarrito);
    calcularTotal();
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  
    // Eliminar el iframe si el usuario elige "No"
    if (ventanaImpresion) {
      document.body.removeChild(ventanaImpresion);
      setVentanaImpresion(null); // Limpiar el estado
    }
  };

  const handlePrintReceipt = () => {
    if (ventanaImpresion) {
      ventanaImpresion.contentWindow.print(); // Imprimir el contenido del iframe
      document.body.removeChild(ventanaImpresion); // Eliminar el iframe después de imprimir
      setVentanaImpresion(null); // Limpiar el estado
    }
    setOpenSnackbar(false); // Cerrar el Snackbar
  };

  // Calcular el total de la venta
  const calcularTotal = () => {
    const totalCalculado = carrito.reduce((acc, producto) => acc + producto.cantidad * producto.price_final, 0);
    setTotal(totalCalculado);
  };

  // Calcular el cambio
  const calcularCambio = () => {
    return Math.max(0, (pago || 0) - total).toFixed(2);
  };

  // Eliminar toda la venta
  const limpiar_carrito = () => {
    setCarrito([]);
    setTotal(0);
    setPago('');
  };

  // Función para imprimir la factura/comprobante
  // RegistrarVenta.js

  const imprimirFactura = async () => {
    // Validar si el carrito está vacío
    if (carrito.length === 0) {
      setOpenErrorSnackbar(true); // Mostrar mensaje de error
      return; // Detener la ejecución
    }
  
    const venta = {
      cliente,
      comprobante,
      productos: carrito,
      total: carrito.reduce((acc, producto) => acc + producto.cantidad * producto.price_final, 0),
      medioPago,
    };

   
  
    try {
      // Llamar al backend para registrar la venta y actualizar el stock
      const response = await axios.post('http://localhost:5000/api/sales/registrar_venta', venta);
  
      if (response.status === 200) {
        // Cargar el archivo factura.html desde la carpeta public
        const responseFactura = await fetch('/factura.html');
        let facturaHTML = await responseFactura.text();
  
        // Reemplazar las variables dinámicas en el HTML
        facturaHTML = facturaHTML
          .replace('{{comprobante}}', venta.comprobante === 'Boleta' ? 'BOLETA DE VENTA' : 'FACTURA')
          .replace('{{numeroComprobante}}', venta.comprobante === 'Boleta' ? '000000001' : '00000000001')
          .replace('{{fecha}}', new Date().toLocaleDateString())
          .replace('{{cliente}}', venta.cliente)
          .replace('{{logo}}', logo)
          .replace('{{medioPago}}', venta.medioPago)
          .replace(
            '{{productos}}',
            venta.productos
              .map(
                (producto) => `
              <tr>
                <td>${producto.name}</td>
                <td>${producto.cantidad}</td>
                <td>$ ${producto.price_final.toFixed(2)}</td>
                <td>$ ${(producto.cantidad * producto.price_final).toFixed(2)}</td>
              </tr>
            `
              )
              .join('')
          )
          .replace('{{total}}', `$ ${venta.total.toFixed(2)}`);
  
        // Crear un elemento iframe para mostrar la factura
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        iframe.contentDocument.write(facturaHTML);
        iframe.contentDocument.close();
  
        // Mostrar Snackbar de éxito
        setOpenSnackbar(true);
  
        // Limpiar el carrito
        limpiar_carrito();
  
        // Guardar el iframe en el estado para usarlo en handlePrintReceipt
        setVentanaImpresion(iframe);
      }
    } catch (error) {
      console.error('Error al registrar la venta:', error);
      setOpenErrorSnackbar(true); // Mostrar mensaje de error
    }

    
  };

  return (
    <Box sx={{ display: 'flex', gap: 3, padding: 3 }}>
      {/* Sección izquierda: Buscador y carrito */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Buscador de productos */}
        <Autocomplete
          options={productosRegistrados}
          getOptionLabel={(option) => `${option.name} - ${option.category} - ${option.description} - $ ${option.price_final}`}
          onInputChange={(e, newValue) => setSearchQuery(newValue)}
          onChange={(event, newValue) => newValue && agregarProducto(newValue)}
          value={null} // Limpiar el valor seleccionado
          renderInput={(params) => (
            <TextField {...params} label="🔍 Buscar productos" variant="outlined" fullWidth />
          )}
          loading={loading}
        />

        {/* Carrito de compras */}
        <Paper sx={{ padding: 2, borderRadius: '8px', boxShadow: 1 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            🛒 Carrito de Compras
          </Typography>
          {/* Cabeceras de la tabla */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 1,
              borderBottom: '1px solid #e0e0e0',
              fontWeight: 'bold',
              fontSize: '0.875rem',
            }}
          >
            <Typography sx={{ flex: 2 }}>Producto</Typography>
            <Typography sx={{ flex: 1 }}>Categoría</Typography>
            <Typography sx={{ flex: 1, textAlign: 'center' }}>Cantidad</Typography>
            <Typography sx={{ flex: 1, textAlign: 'right' }}>Precio Unit.</Typography>
            <Typography sx={{ flex: 1, textAlign: 'right' }}>Subtotal</Typography>
          </Box>
          {/* Productos en el carrito */}
          {carrito.map((producto) => (
            <Box key={producto._id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1, borderBottom: '1px solid #e0e0e0', fontSize: '0.875rem' }}>
              <Typography sx={{ flex: 2 }}>{producto.name}</Typography>
              <Typography sx={{ flex: 1 }}>{producto.category}</Typography>
              <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ minWidth: '24px', padding: '4px' }}
                  onClick={() => disminuirCantidad(producto._id)}
                >
                  ➖
                </Button>
                <Typography>{producto.cantidad}</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ minWidth: '24px', padding: '4px' }}
                  onClick={() => aumentarCantidad(producto._id)}
                >
                  ➕
                </Button>
              </Box>
              <Typography sx={{ flex: 1, textAlign: 'right' }}>
                $ {producto.price_final.toFixed(2)}
              </Typography>
              <Typography sx={{ flex: 1, textAlign: 'right', fontWeight: 'bold' }}>
                $ {(producto.cantidad * producto.price_final).toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Paper>
      </Box>

      {/* Sección derecha: Detalles de la venta, total y botones */}
      <Box sx={{ width: '300px', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Paper sx={{ padding: 2, borderRadius: '8px', boxShadow: 1 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            📝 Detalles de la Venta
          </Typography>
          <TextField
            label="👤 Cliente"
            variant="outlined"
            fullWidth
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="📄 Comprobante"
            variant="outlined"
            select
            SelectProps={{ native: true }}
            fullWidth
            value={comprobante}
            onChange={(e) => setComprobante(e.target.value)}
            sx={{ mb: 2 }}
          >
            <option value="Boleta">Boleta</option>
            <option value="Factura">Factura</option>
          </TextField>
          <TextField
            label="Medios de Pago"
            variant="outlined"
            select
            SelectProps={{ native: true }}
            fullWidth
            value={medioPago}
            onChange={(e) => setMedioPago(e.target.value)}
            sx={{ mb: 2 }}
          >
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
            <option value="Tarjeta de Débito">Tarjeta de Débito</option>
            <option value="Transferencia Bancaria">Transferencia Bancaria</option>
          </TextField>
          <FormControlLabel
            control={<Checkbox checked={abonado} onChange={(e) => setAbonado(e.target.checked)} />}
            label="💳 Abonado"
          />
        </Paper>

        {/* Total y cambio */}
        <Paper sx={{ padding: 2, borderRadius: '8px', boxShadow: 1 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            💰 Total y Cambio
          </Typography>
          <Typography variant="body1" align="right">
            Total: $ {total.toFixed(2)}
          </Typography>
          <TextField
            label="💵 Pago"
            type="number"
            variant="outlined"
            fullWidth
            value={pago}
            onChange={(e) => setPago(e.target.value === '' ? '' : Number(e.target.value))}
            sx={{ my: 2 }}
          />
          <Typography variant="body1" align="right" sx={{ color: pago >= total ? 'green' : 'red' }}>
            Cambio: $ {calcularCambio()}
          </Typography>
        </Paper>

        {/* Botones de acción */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={limpiar_carrito}
            sx={{ flex: 1, gap: 1, fontWeight: 'bold' }}
          >
            ❌ Cancelar Venta
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={imprimirFactura}
            sx={{ flex: 1, gap: 1, fontWeight: 'bold' }}
          >
            🖨️ Generar {comprobante}
          </Button>
        </Box>
      </Box>

      {/* Notificación de éxito */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Venta generada con éxito. Desea imprimir el comprobante?"
        action={
          <>
            <Button color="success" size="small" onClick={handlePrintReceipt}>
              Sí
            </Button>
            <Button color="red" size="small" onClick={handleCloseSnackbar}>
              No
            </Button>
          </>
        }
      />

      {/* Notificación de error */}
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="⚠️ Error: No hay productos en el carrito."
      />
    </Box>
  );
};

export default RegistrarVenta;