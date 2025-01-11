import React from 'react';
import { Sidebar } from '../Sidebar.jsx';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="d-flex" id="wrapper">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Contenido principal */}
      <div id="page-content-wrapper" className="flex-fill">
        <Outlet />
      </div>
    </div>
  );
};
