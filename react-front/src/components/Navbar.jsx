import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Navbar({ carrito, setCarrito }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser.token) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
  }, [location]);

  // Cerrar menú al cambiar de página
  useEffect(() => {
    setMenuAbierto(false);
  }, [location]);

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      authService.logout();
      setUser(null);
      setCarrito([]);
      setCarritoAbierto(false);
      setMenuAbierto(false);
      navigate('/');
    }
  };

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const eliminarDelCarrito = (idPlato) => {
    setCarrito(prev => prev.filter(item => item.idPlato !== idPlato));
  };

  const aumentarCantidad = (idPlato) => {
    setCarrito(prev =>
      prev.map(item => item.idPlato === idPlato ? { ...item, cantidad: item.cantidad + 1 } : item)
    );
  };

  const reducirCantidad = (idPlato) => {
    setCarrito(prev =>
      prev
        .map(item => item.idPlato === idPlato ? { ...item, cantidad: item.cantidad - 1 } : item)
        .filter(item => item.cantidad > 0)
    );
  };

  const irACheckout = () => {
    setCarritoAbierto(false);
    navigate('/checkout');
  };

  return (
    <>
      <header className="header">
        <div className="container">
          {/* Botón hamburguesa */}
          <button className="btn-hamburguesa" onClick={() => setMenuAbierto(true)}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          <Link to="/" className="logo">
            <h1>SUSHIMI</h1>
            <p className="tagline">Tradición Japonesa</p>
          </Link>

          <nav className="nav">
            {!user ? (
              <>
                <Link to="/login" className="btn-nav-login">Iniciar Sesión</Link>
                <Link to="/register" className="btn-nav-register">Registrarse</Link>
              </>
            ) : (
              <>
                <span className="user-greeting">
                  Hola, <strong>{user.nombre || user.username}</strong>
                </span>
                <button className="btn-carrito" onClick={() => setCarritoAbierto(true)}>
                  🛒
                  {totalItems > 0 && <span className="carrito-badge">{totalItems}</span>}
                </button>
                <button onClick={handleLogout} className="btn-nav-logout">Cerrar Sesión</button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Overlay menú lateral */}
      {menuAbierto && (
        <div className="menu-overlay" onClick={() => setMenuAbierto(false)} />
      )}

      {/* Panel menú lateral izquierdo */}
      <div className={`menu-panel ${menuAbierto ? 'menu-panel-abierto' : ''}`}>
        <div className="menu-panel-header">
          <div className="menu-logo">SUSHIMI</div>
          <button className="menu-cerrar" onClick={() => setMenuAbierto(false)}>✕</button>
        </div>

        <nav className="menu-panel-nav">
          <Link to="/" className={location.pathname === '/' ? 'menu-link active' : 'menu-link'}>
            <span className="menu-link-icono">🏠</span> Inicio
          </Link>
          <Link to="/menu" className={location.pathname === '/menu' ? 'menu-link active' : 'menu-link'}>
            <span className="menu-link-icono">🍣</span> Menú
          </Link>
          <Link to="/localizaciones" className={location.pathname === '/localizaciones' ? 'menu-link active' : 'menu-link'}>
            <span className="menu-link-icono">📍</span> Localizaciones
          </Link>
          <Link to="/reservas" className={location.pathname === '/reservas' ? 'menu-link active' : 'menu-link'}>
            <span className="menu-link-icono">📅</span> Reservar
          </Link>
          <Link to="/mis-reservas" className={location.pathname === '/mis-reservas' ? 'menu-link active' : 'menu-link'}>
            <span className="menu-link-icono">📋</span> Mis Reservas
          </Link>

          {user && (
            <Link to="/mis-pedidos" className={location.pathname === '/mis-pedidos' ? 'menu-link active' : 'menu-link'}>
              <span className="menu-link-icono">🛵</span> Mis Pedidos
            </Link>
          )}

          {user && user.rol === 'ADMIN' && (
            <Link to="/admin" className={location.pathname === '/admin' ? 'menu-link active' : 'menu-link'}>
              <span className="menu-link-icono">⚙️</span> Admin
            </Link>
          )}
        </nav>

        <div className="menu-panel-footer">
          {!user ? (
            <>
              <Link to="/login" className="btn-menu-login">Iniciar Sesión</Link>
              <Link to="/register" className="btn-menu-register">Registrarse</Link>
            </>
          ) : (
            <>
              <div className="menu-user-info">
                <p className="menu-user-nombre">{user.nombre || user.username}</p>
                <p className="menu-user-email">{user.email}</p>
              </div>
              <button onClick={handleLogout} className="btn-menu-logout">Cerrar Sesión</button>
            </>
          )}
        </div>
      </div>

      {/* Carrito overlay */}
      {carritoAbierto && (
        <div className="carrito-overlay" onClick={() => setCarritoAbierto(false)} />
      )}

      {/* Panel carrito */}
      <div className={`carrito-panel ${carritoAbierto ? 'carrito-panel-abierto' : ''}`}>
        <div className="carrito-panel-header">
          <h3 className="carrito-titulo">Tu pedido</h3>
          <button className="carrito-cerrar" onClick={() => setCarritoAbierto(false)}>✕</button>
        </div>
        {carrito.length === 0 ? (
          <p className="carrito-vacio">No hay platos en la cesta.</p>
        ) : (
          <>
            <ul className="carrito-lista">
              {carrito.map(item => (
                <li key={item.idPlato} className="carrito-item">
                  <div className="carrito-item-info">
                    <span className="carrito-item-nombre">{item.nombre}</span>
                    <span className="carrito-item-precio-unit">{item.precio.toFixed(2)}€ / ud</span>
                  </div>
                  <div className="carrito-item-derecha">
                    <div className="carrito-cantidad-control">
                      <button className="btn-cantidad" onClick={() => reducirCantidad(item.idPlato)}>−</button>
                      <span className="carrito-cantidad-num">{item.cantidad}</span>
                      <button className="btn-cantidad" onClick={() => aumentarCantidad(item.idPlato)}>+</button>
                    </div>
                    <span className="carrito-item-precio">{(item.precio * item.cantidad).toFixed(2)}€</span>
                    <button className="carrito-item-eliminar" onClick={() => eliminarDelCarrito(item.idPlato)}>🗑</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="carrito-footer">
              <div className="carrito-total">
                <span>Total:</span>
                <span>{totalPrecio.toFixed(2)}€</span>
              </div>
              <button className="btn-finalizar-pedido" onClick={irACheckout}>Finalizar Pedido</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;