import React from 'react';
import { NavLink } from 'react-router-dom';

export const Nav = () => {
  return (
  <nav className="nav bg-success p-2 text-white d-flex justify-content-around">
    <NavLink to="/inicio" className="text-white text-decoration-none flex-grow-1 text-center">
      Inicio
    </NavLink>
    <NavLink to="/articulos" className="text-white text-decoration-none flex-grow-1 text-center">
      Artículos
    </NavLink>
    <NavLink to="/crear-articulos" className="text-white text-decoration-none flex-grow-1 text-center">
      Crear Artículos
    </NavLink>
    <NavLink to="/contacto" className="text-white text-decoration-none flex-grow-1 text-center">
      Contacto
    </NavLink>
  </nav>

  );
};
