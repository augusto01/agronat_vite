import React from 'react'

export const Ubicacion = () => {
    return (
      <div>
        <section id='ubicacion'>
          <div className='container-ubicacion'>
            <h1 className='title-ubicacion'>¿Dónde encontrarnos?</h1>
            <div className='container-info'>
              <a
                href="https://www.google.com/maps/place/Domingo+Faustino+Sarmiento+1060,+W3420+Saladas,+Corrientes"
                target="_blank"
                rel="noopener noreferrer"
                className='img-thumbail'
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3514.4194472133836!2d-58.63095073183868!3d-28.25529563584403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x944fcf437c55af6d%3A0x30952b9bbd4b4da!2sDomingo%20Faustino%20Sarmiento%201060%2C%20W3420%20Saladas%2C%20Corrientes!5e0!3m2!1ses-419!2sar!4v1724145527815!5m2!1ses-419!2sar&zoom=15&disableDefaultUI=true&mapTypeControl=false&scrollwheel=false&draggable=false"
                  width="600"
                  height="450"
                  style={{ border: 0, pointerEvents: 'none' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </a>
              <p className='item-info'>
                <i className="bi bi-geo-alt-fill">
                  <span>Sarmiento 1093 - Saladas, Corrientes</span>
                </i>
                <br />
                <i className="bi bi-whatsapp">
                  <a href="https://wa.me/543795172153" target="_blank" rel="noopener noreferrer">
                    <span>+543795172153</span>
                  </a>
                </i>
                <br />
                <i className="bi bi-envelope">
                  <a href="mailto:agronat19@gmail.com?subject=Consulta%20desde%20el%20sitio%20web">
                    <span>agronat19@gmail.com</span>
                  </a>
                </i>
                <br />
                <i className="bi bi-instagram">
                  <a href="https://www.instagram.com/agronat19/" target="_blank" rel="noopener noreferrer">
                    <span>@agronat19</span>
                  </a>
                </i>
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  }
