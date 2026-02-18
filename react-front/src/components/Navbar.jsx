import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h1>SUSHIMI</h1>
          <p className="tagline">Tradición Japonesa</p>
        </Link>
        <nav className="nav">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Inicio
          </Link>
          <Link to="/menu" className={location.pathname === '/menu' ? 'active' : ''}>
            Menú
          </Link>
          <Link to="/localizaciones" className={location.pathname === '/localizaciones' ? 'active' : ''}>
            Localizaciones
          </Link>
          <Link to="/reservas" className={location.pathname === '/reservas' ? 'active' : ''}>
            Reservar
          </Link>
          <Link to="/mis-reservas" className={location.pathname === '/mis-reservas' ? 'active' : ''}>
            Mis Reservas
          </Link>
          <Link to="/login" className="btn-nav-login">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="btn-nav-register">
            Registrarse
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;