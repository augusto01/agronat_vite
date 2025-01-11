import React from 'react';
import { Sidebar } from '../Sidebar.jsx';
import { NavBar } from '../NavBar.jsx';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/Layout.css';  // Asegúrate de importar el archivo CSS

export const Layout = () => {
  return (
    <div className="d-flex" id="wrapper" style={{ height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar style={{ height: '100%' }} />

      {/* Contenido principal */}
      <div id="page-content-wrapper" className="flex-fill">
        {/* Navbar */}
        <NavBar />

        {/* Aplicamos la clase content-wrapper para asegurarnos que el contenido se vea debajo del navbar */}
        <div className="container-fluid content-wrapper">
          {/* Asegúrate de que el contenido se muestra debajo del Navbar */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};
