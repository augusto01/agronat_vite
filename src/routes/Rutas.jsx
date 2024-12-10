import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { Inicio } from "../components/pages/inicio";
import { Articulo } from "../components/pages/Articulo";
import { Articulos } from "../components/pages/articulos";
import { Header } from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import { SideBar } from "../components/layout/SideBar";
import { Footer } from "../components/layout/Footer";
import { Crear } from "../components/pages/Crear";
import { Contacto } from "../components/pages/Contacto";

export const Rutas = () => {
  return (
    <BrowserRouter>
      {/**LAYOUT */}
      <Header/>
      <Nav/>
        {/**CONTENIDO CENTRAL */}
        <section id="content" className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/inicio" />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/articulos" element={<Articulos />} />
            <Route path="/crear-articulos" element={<Crear />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/articulo/:id" element={<Articulo />} /> 
          </Routes>
        </section>
      <Footer/>
      <SideBar/>   
    </BrowserRouter>
  );
}
