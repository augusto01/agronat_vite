import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Login.css';
import { useAuth } from '../../context/AuthProvider.jsx';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

const storeUserData = (userData) => {
  localStorage.setItem('token', userData.token);
  localStorage.setItem('nombre', userData.nombre);
  localStorage.setItem('apellido', userData.apellido);
  localStorage.setItem('username', userData.username);
  localStorage.setItem('email', userData.email);
  localStorage.setItem('domicilio', JSON.stringify(userData.domicilio));
};

export const Login = () => {
  const { isLoggedIn, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', { email, password });
      storeUserData(response.data);
      navigate('/welcome');
      login();
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
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

          <div className="modal-input" style={{ marginBottom: '16px' }}> {/* Agregado margen aquí */}
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              variant="standard"
              InputProps={{
                disableUnderline: false,
              }}
            />
          </div>

          <div className="modal-input" style={{ marginBottom: '16px' }}> {/* Agregado margen aquí */}
            <TextField
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              variant="standard"
              InputProps={{
                disableUnderline: false,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="container-login-form-btn">
            <div className="wrap-login-form-btn">
              <div className="login-form-bgbtn"></div>
              <button type="submit" className="login-form-btn" disabled={loading}>
                {loading ? 'Cargando...' : 'INICIAR SESIÓN'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
