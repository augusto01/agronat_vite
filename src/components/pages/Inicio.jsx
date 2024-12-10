import React from 'react'
import { Articulo } from './Articulo'
import { Link } from 'react-router-dom'

export const Inicio = () => {
  return (
    <div className='jumbo '>
        <h1>Bienvenido al blog con React</h1>
        <p>Blog desarrollado con el stack MERN(MONGO, EXPRESS, REACT Y NODEJS)</p>
        
        <Link to={'/articulos'} className='button'>Ver los Articulos</Link>
    </div>    
  )
}
