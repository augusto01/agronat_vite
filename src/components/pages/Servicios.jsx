import React from 'react'
import fumigacion from '../../assets/fumigacion.png';
import piscina from '../../assets/piscina.png';
import productos from '../../assets/producto-organico.png';

export const Servicios = () => {
  return (
    <div>
        <div className='row mt-4'>
      <div className='col-md-4'>
      <div className='card mb-4' style={{ backgroundColor: '#2c2c2c', color: '#fff', objectFit: 'cover'}}>
          <img src={fumigacion} className='card-img-top' alt='Control de Plagas' style={{ height: '120px', width: '120px', objectFit: 'cover', padding:"10px" }} />
          <div className='card-body'>
            <h5 className='card-title' style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Fumigación</h5>
            <p className='card-text' style={{ fontFamily: 'Arial, sans-serif' }}>
            Realizamos fumigaciones seguras y efectivas para el control de plagas en interiores y exteriores.
            </p>
          </div>
        </div>
      </div>
      <div className='col-md-4'>
      <div className='card mb-4' style={{ backgroundColor: '#2c2c2c', color: '#fff', objectFit: 'cover'}}>
          <img src={piscina} className='card-img-top' alt='Control de Plagas' style={{ height: '120px', width: '120px', objectFit: 'cover',padding:"10px" }} />
          <div className='card-body'>
            <h5 className='card-title' style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Control de Plagas</h5>
            <p className='card-text' style={{ fontFamily: 'Arial, sans-serif' }}>
            Ofrecemos servicios de limpieza y mantenimiento para mantener tu piscina en perfectas condiciones.
            </p>
          </div>
        </div>
      </div>  
      <div className='col-md-4'>
        <div className='card mb-4' style={{ backgroundColor: '#2c2c2c', color: '#fff', objectFit: 'cover'}}>
          <img src={productos} className='card-img-top' alt='Control de Plagas' style={{ height: '120px', width: '120px', objectFit: 'cover',padding:"10px" }} />
          <div className='card-body'>
            <h5 className='card-title' style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Control de Plagas</h5>
            <p className='card-text' style={{ fontFamily: 'Arial, sans-serif' }}>
              Implementamos estrategias efectivas para el control de plagas en tu hogar o negocio.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
