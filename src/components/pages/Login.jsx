import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Login.css';
import axios from 'axios';

export const Login = () => {
  /** ASIGNAMOS LAS CREDENCIALES  */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Estado para manejar la carga

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Por favor, completa todos los campos.');
      return; // No enviar el formulario si los campos están vacíos
    }
    
    setLoading(true); // Activar el estado de carga
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('token', response.data.token);
      alert('Login successful');
    } catch (error) {
      alert('Login failed: ' + error.message);
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  return (
    <div className="container-login">
      <div className="wrap-login">
        <form className="login-form validate-form" onSubmit={handleSubmit}>
          <span className="login-form-title">INGRESAR</span>
          
          <div className="wrap-input100" data-validate="Usuario incorrecto">
            <input 
              className="input100" 
              type="email" 
              id="usuario" 
              name="usuario" 
              placeholder="Usuario" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required // Añadir required
            />
            <span className="focus-efecto"></span>
          </div>
          
          <div className="wrap-input100" data-validate="Password incorrecto">
            <input 
              className="input100" 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required // Añadir required
            />
            <span className="focus-efecto"></span>
          </div>
          
          <div className="container-login-form-btn">
            <div className="wrap-login-form-btn">
              <div className="login-form-bgbtn"></div>
              <button type="submit" className="login-form-btn" disabled={loading}>
                {loading ? 'Cargando...' : 'INICIAR SESIóN'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
