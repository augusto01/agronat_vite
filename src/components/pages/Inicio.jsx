import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Servicios } from './Servicios';
import { Ubicacion } from './Ubicacion';

export const Inicio = () => {
  return (
    <div className='container jumbo mt-5'>
      <h1 className='text-center'></h1>
      <p className='lead text-center'>
        Agronat es tu aliado en el cuidado y mantenimiento de espacios agrícolas y recreativos. Nos especializamos en fumigación profesional para proteger tus cultivos de plagas, limpieza de piscinas para mantener el agua cristalina y segura, y ofrecemos una amplia gama de productos agrícolas de alta calidad diseñados para mejorar la productividad y salud de tus cultivos. 
      </p>

      <div class="text-center">
        <button type="button" class="btn btn-success">¡Contáctanos!</button>
      </div>




      
      <Servicios/>
      <Ubicacion/>
      
    </div>
  );
};
