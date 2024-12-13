import { useState } from 'react'
import { Inicio } from './components/pages/inicio'
import { Route } from 'react-router-dom'
import { Rutas } from './routes/rutas'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'; 

function App() {
  
  return (
    <div className='layout'>

      <Rutas></Rutas>
      

    </div>
  )
}

export default App
