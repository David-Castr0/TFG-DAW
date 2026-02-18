import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Verificar si hay usuario logueado al cargar el componente
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser.token) {
      setUser(currentUser);
    }
  }, [location]); // Se actualiza cada vez que cambia la ruta

  // Función para cerrar sesión
  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      authService.logout();
      setUser(null);
      navigate('/');
    }
  };

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

          {/* Mostrar Admin solo si es ADMIN */}
          {user && user.rol === 'ADMIN' && (
            <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
              Admin
            </Link>
          )}

          {/* Si NO está logueado, mostrar botones de Login/Register */}
          {!user ? (
            <>
              <Link to="/login" className="btn-nav-login">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="btn-nav-register">
                Registrarse
              </Link>
            </>
          ) : (
            /* Si está logueado, mostrar nombre y botón logout */
            <>
              <span className="user-greeting">
                Hola, <strong>{user.nombre || user.username}</strong>
              </span>
              <button onClick={handleLogout} className="btn-nav-logout">
                Cerrar Sesión
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;