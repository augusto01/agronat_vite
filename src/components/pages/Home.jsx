import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Dashboard.css';
import { useAuth } from '../../context/AuthProvider.jsx';
import { NavLink } from 'react-router-dom';
import logo_agronat from '../../assets/agronat-logo.png';
import { Sidebar } from './Sidebar'; // Importa el componente Sidebar

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

    // ACTUALIZAMOS ESTADO A FALSO
    logout();
  };

  return (
    <div id="wrapper">
      {/* Sidebar */}
      <Sidebar />
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
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                    {localStorage.getItem('nombre')}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="currentColor"
                    className="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                  <button className="btn btn-danger btn-lg" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                </a>

                {/* Dropdown - User Information */}
                <div
                  className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="userDropdown"
                >
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
