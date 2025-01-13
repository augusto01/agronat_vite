import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { Inicio } from "../components/pages/inicio";
import { Articulo } from "../components/pages/Articulo";
import { Articulos } from "../components/pages/articulos";
import { Header } from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import { Footer } from "../components/layout/Footer";
import { Crear } from "../components/pages/Crear";
import { Contacto } from "../components/pages/Contacto";
import { Login } from "../components/pages/Login";
import { Servicios } from "../components/pages/Servicios";
import { Ubicacion } from "../components/pages/Ubicacion";
import { useAuth } from "../context/AuthProvider.jsx";
import VerUsuarios from '../components/pages/Usuarios/VerUsuarios.jsx';
import { Layout } from "../components/pages/Layout/Layout.jsx";
import { Ventas } from "../components/pages/Ventas/Ventas.jsx";
import { Productos } from "../components/pages/Productos/Productos.jsx";
import { Proveedores } from "../components/pages/Proveedores/Proveedores.jsx";
import { Presupuestos } from "../components/pages/Presupuestos/Presupuestos.jsx";
import { Trabajos } from "../components/pages/Trabajo/Trabajos.jsx";
import { Home } from "../components/pages/Home.jsx";

export const Rutas = () => {
  const { isLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      {/** Mostrar Header y Nav solo si no está autenticado */}
      {!isLoggedIn && <Header />}
      {!isLoggedIn && <Nav />}
      
      {/** CONTENIDO CENTRAL */}
      <section id="content" className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/articulos" element={<Articulos />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/ubicacion" element={<Ubicacion />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/welcome" /> : <Login />} />

          {/** RUTAS PROTEGIDAS (solo para usuarios logueados) */}
          {isLoggedIn ? (
            <Route path="/" element={<Layout />}>
              <Route path="/welcome" element={<Home/>} />
              <Route path="/crear-articulos" element={<Crear />} />
              <Route path="/articulo/:id" element={<Articulo />} />
              <Route path="/usuarios" element={<VerUsuarios />} />
              <Route path="/ventas" element={<Ventas />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/presupuestos" element={<Presupuestos />} />
              <Route path="/proveedores" element={<Proveedores />} />
              <Route path="/trabajos" element={<Trabajos />} />
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/inicio" />} />
          )}
        </Routes>
      </section>
      <Footer />
    </BrowserRouter>
  );
};
