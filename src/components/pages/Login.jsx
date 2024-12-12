import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

export const Login = () => {

  /**ASIGNAMOS LAS CREDENCIALES  */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('mongodb://localhost:27017/agronat',{email,password})
    .then(result => console.log(result))
    .catch(err => console.log(err))

    //Aquí puedes manejar la lógica de inicio de sesión
    console.log('Iniciando sesión con:', email, password);
  };

  return (
    <div className="container m-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2 className="text-center">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100">Iniciar Sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
};
