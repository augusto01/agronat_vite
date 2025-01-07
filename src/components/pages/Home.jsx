// Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Dashboard.css'; // Importa los estilos del dashboard
import {useAuth} from '../../context/AuthProvider.jsx'

export const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const handleLogout = () => {
      
    
    // Eliminar los datos del usuario del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('apellido');
    localStorage.removeItem('email');
    localStorage.removeItem('domicilio');

    // Redirigir al usuario a la página de login
    navigate('/login');

    //ACTUALIZAMOS ESTADO A FALSO
    logout();

    
  };

  return (
    <div id="wrapper">
      {/* Sidebar */}
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        {/* Sidebar - Brand */}
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
        </a>

        {/* Divider */}
        <hr className="sidebar-divider my-0" />

        {/* Nav Item - Dashboard */}
        <li className="nav-item active">
          <a className="nav-link" href="#">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </li>

        {/* Divider */}
        <hr className="sidebar-divider" />

        {/* Heading */}
        <div className="sidebar-heading">OPCIONES</div>

        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
            <i className="fas fa-fw fa-cog"></i>
            <span>Usuarios</span>
          </a>
          <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
            <i className="fas fa-fw fa-cog"></i>
            <span>Ventas</span>
          </a>
          <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
            <i className="fas fa-fw fa-cog"></i>
            <span>Productos</span>
          </a>
          <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
            <i className="fas fa-fw fa-cog"></i>
            <span>Proveedores</span>
          </a>
          <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Custom Components:</h6>
              <a className="collapse-item" href="#">Buttons</a>
              <a className="collapse-item" href="#">Cards</a>
            </div>
          </div>
          </li>

        {/* Divider */}
        <hr className="sidebar-divider d-none d-md-block" />

        {/* Sidebar Toggler (Sidebar) */}
        <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0" id="sidebarToggle"></button>
        </div>
      </ul>
      {/* End of Sidebar */}

      {/* Content Wrapper */}
      <div id="content-wrapper" className="d-flex flex-column">
        {/* Main Content */}
        <div id="content">
          {/* Topbar */}
          
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            {/* Sidebar Toggle (Topbar) */}
            
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
              <i className="fa fa-bars"></i>
            </button>
            

            {/* Topbar Navbar */}
            <ul className="navbar-nav ml-auto">
              {/* Nav Item - User Information */}
              <li className="nav-item dropdown no-arrow">
                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">{localStorage.getItem('nombre')}</span>
                  <img className="img-profile rounded-circle" src="img/user.png" alt="User Avatar" />
                  <button className="btn btn-danger btn-lg" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
                </a>
                
                
                {/* Dropdown - User Information */}
                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                    Profile
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                    Settings
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                    Activity Log
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Cerrar Sesión
                  </a>
                </div>
              </li>
            </ul>
            
          </nav>
          {/* End of Topbar */}

          {/* Page Content */}
          <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">Bienvenido, {localStorage.getItem('nombre')}!</h1>
            <p>Esta es la página de inicio, luego de un inicio de sesión correcto.</p>
          </div>
        </div>
        {/* End of Main Content */}
      </div>
      {/* End of Content Wrapper */}
    </div>
  );
};
