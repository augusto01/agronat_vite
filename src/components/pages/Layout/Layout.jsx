import React from 'react';
import { Sidebar } from '../Sidebar.jsx';
import { NavBar } from '../NavBar.jsx';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Layout = () => {
  return (
    <div className="d-flex" id="wrapper" style={{ height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar style={{ height: '100vh' }} />

      {/* Contenido principal */}
      <div id="page-content-wrapper" className="flex-fill">
        {/* Navbar */}
        <NavBar />

        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
