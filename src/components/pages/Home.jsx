import React from 'react';

export const Home = () => {
  const nombre = localStorage.getItem('nombre');
  const apellido = localStorage.getItem('apellido');
  const username = localStorage.getItem('username')

  return (
    <div className="welcome-container">
      <h1>Bienvenido, {nombre} {apellido} {username} !</h1>
      
    </div>

    
  );
};
