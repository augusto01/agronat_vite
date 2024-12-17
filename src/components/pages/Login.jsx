import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Función para almacenar los datos del usuario en el localStorage
const storeUserData = (userData) => {
  localStorage.setItem('token', userData.token);
  localStorage.setItem('nombre', userData.nombre);
  localStorage.setItem('apellido', userData.apellido);
  localStorage.setItem('username', userData.username);
  localStorage.setItem('email', userData.email);
  localStorage.setItem('domicilio', JSON.stringify(userData.domicilio));
};

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      storeUserData(response.data);
      navigate('/welcome');
    } catch (error) {
      alert('Login failed: ' + error.message);
    } finally {
      setLoading(false);
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
              required
            />
            <span className="focus-efecto"></span>
          </div>

          <div className="wrap-input100" data-validate="Password incorrecto">
            <input
              className="input100"
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
