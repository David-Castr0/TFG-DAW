import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Sushimi</h3>
            <p>Experiencia japonesa auténtica desde 2025</p>
            <div className="social-links">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">Twitter</a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Enlaces Rápidos</h3>
            <ul className="footer-links">
              <li><a href="/menu">Menú</a></li>
              <li><a href="/localizaciones">Localizaciones</a></li>
              <li><a href="/reservas">Reservar</a></li>
              <li><a href="/mis-reservas">Mis Reservas</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Horarios</h3>
            <p>Lunes a Domingo</p>
            <p><strong>12:00 - 23:30</strong></p>
          </div>
          <div className="footer-section">
            <h3>Contacto</h3>
            <p>Email: info@sushimi.com</p>
            <p>Tel: +34 912 345 678</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Sushimi. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;