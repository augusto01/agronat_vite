import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Servicios } from './Servicios';
import { Ubicacion } from './Ubicacion';

export const Inicio = () => {
  return (
    <div className='container jumbo mt-5'>
      <h1 className='text-center'>Bienvenido a Agronat</h1>
      <p className='lead text-center'>
        Servicios de fumigación, limpieza de piscinas y más, en la comodidad de tu hogar.
      </p>

      
      <Servicios/>
      <Ubicacion/>
      
    </div>
  );
};
