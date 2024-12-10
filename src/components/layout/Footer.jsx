import React from 'react'
import logo_agronat from '../../assets/agronat-logo.png';


export const Footer = () => {
  return (
    <footer className="footer bg-dark text-white">
      <div className="container py-5">
        <div className="row align-items-center">
        <img src={logo_agronat} alt="Logo" className="footer-logo me-2" />
          <div className="col-md-4 mb-4 mb-md-0">
            <h5>Síguenos en:</h5>
            <ul className="list-unstyled d-flex justify-content-center">
              <li className="me-3">
                <a href="#" className="text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li className="me-3">
                <a href="#" className="text-white">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li className="me-3">
                <a href="#" className="text-white">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-white">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contacto</h5>
            <ul className="list-unstyled">
              <li>Teléfono: 123-456-7890</li>
              <li>Correo: info@example.com</li>
              <li>Dirección: Calle Falsa 123, Ciudad</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-black py-3">
        <div className="container">
          <p className="mb-0 text-center">&copy; 2024 Agronat. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
