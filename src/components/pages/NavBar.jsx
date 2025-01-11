import React from 'react';
import '../../styles/NavBar.css';
import logo_agronat from '../../assets/agronat-logo.png';
import { useAuth } from '../../context/AuthProvider.jsx';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        // Eliminar los datos del usuario del localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('nombre');
        localStorage.removeItem('apellido');
        localStorage.removeItem('email');
        localStorage.removeItem('domicilio');

        // Redirigir al usuario a la página de login
        navigate('/login');

        // Actualizamos estado a falso
        logout();
    };

    return (
        <div>
            {/* Navbar fijo en la parte superior */}
            <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top shadow">
                  <NavLink to="/welcome" className="bg-dark text-center">
                        <img src={logo_agronat} alt="Logo Agronat" className="logo" />
                      </NavLink>
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars"></i>
                </button>

                <ul className="navbar-nav ms-auto">
                    <li className="nav-item mx-3">
                        <button className="btn btn-danger" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-200"></i>
                            Cerrar Sesión
                        </button>
                    </li>
                    <li className="nav-item dropdown no-arrow mx-3">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="userDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <span className="d-none d-lg-inline text-gray-200 small me-2">
                                {localStorage.getItem('nombre')}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
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
                        </a>
                    </li>
                </ul>
            </nav>

           
        </div>
    );
};
