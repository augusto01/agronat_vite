import React from 'react';
import { CheckCircle, AttachMoney, Inventory, Group } from '@mui/icons-material'; // Iconos de MUI
import '../../styles/Home.css'; // Asegúrate de crear este archivo CSS

export const Home = () => {
  return (
    <div className="home-container">
      <h1 className="welcome-message">¡Bienvenido, Usuario!</h1>

      <div className="info-section">
        <h2>Datos Importantes</h2>
        <div className="cards-container">
          <div className="card">
            <CheckCircle className="icon" />
            <h3>Ventas Realizadas</h3>
            <p>25 Ventas</p>
          </div>
          <div className="card">
            <AttachMoney className="icon" />
            <h3>Ventas Totales</h3>
            <p>$10,000</p>
          </div>
          <div className="card">
            <Inventory className="icon" />
            <h3>Artículos en Inventario</h3>
            <p>150 Artículos</p>
          </div>
          <div className="card">
            <Group className="icon" />
            <h3>Proveedores Activos</h3>
            <p>5 Proveedores</p>
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
