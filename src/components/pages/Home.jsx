import React from 'react';
import { AttachMoney, Inventory, Group } from '@mui/icons-material'; // Iconos de MUI
import '../../styles/Home.css'; // Archivo CSS para estilos

export const Home = () => {
  return (
    <div className="home-container">
      <h1 className="welcome-message">¡Bienvenido, Usuario!</h1>

      <div className="info-section">
        <h2>Datos Importantes</h2>
        <div className="cards-container">
          {/* Tarjeta Ventas */}
          <div className="card ventas">
            <div className="card-content">
              <p className="card-value">$0</p>
              <p className="card-label">Ganancias del día</p>
            </div>
            <AttachMoney className="background-icon" />
          </div>
          {/* Tarjeta Ingresos */}
          <div className="card ingresos">
            <div className="card-content">
              <p className="card-value">$66,0128</p>
              <p className="card-label">Ganancias del mes</p>
            </div>
            <AttachMoney className="background-icon" />
          </div>
          {/* Tarjeta Inventario */}
          <div className="card inventario">
            <div className="card-content">
              <p className="card-value">150</p>
              <p className="card-label">Artículos en Inventario</p>
            </div>
            <Inventory className="background-icon" />
          </div>
          {/* Tarjeta Proveedores */}
          <div className="card proveedores">
            <div className="card-content">
              <p className="card-value">5</p>
              <p className="card-label">Proveedores Activos</p>
            </div>
            <Group className="background-icon" />
          </div>
        </div>
      </div>

      <div className="additional-info">
        <h2>Información Adicional</h2>
        <ul>
          <li>Última Venta: Artículo X - $200</li>
          <li>Próxima Entrega: Proveedor Y - 10/01/2025</li>
          <li>Recomendaciones: Artículo Z</li>
        </ul>
      </div>
    </div>
  );
};
