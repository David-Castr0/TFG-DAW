import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReservasService from '../services/reservasService';
import authService from '../services/authService';
import './MisReservas.css';

function MisReservas() {
  const reservasService = new ReservasService();
  const [emailBusqueda, setEmailBusqueda] = useState('');
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  useEffect(() => {
    // Verificar si hay usuario logueado
    const user = authService.getCurrentUser();
    if (user.token) {
      setUsuarioLogueado(user);
      // Si está logueado, cargar sus reservas automáticamente por email
      cargarReservasPorEmail(user.email || '');
    }
  }, []);

  const cargarReservasPorEmail = async (email) => {
    if (!email) return;

    setLoading(true);
    setError('');
    setMostrarResultados(false);

    try {
      const data = await reservasService.obtenerReservasPorEmail(email);
      setReservas(data);
      setMostrarResultados(true);
    } catch (err) {
      console.error('Error:', err);
      setError('Error al buscar reservas. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitBusqueda = async (e) => {
    e.preventDefault();
    await cargarReservasPorEmail(emailBusqueda);
  };

  const handleCancelarReserva = async (idReserva) => {
    if (!window.confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      return;
    }

    try {
      await reservasService.cancelarReserva(idReserva);
      alert('Reserva cancelada correctamente');
      
      // Recargar reservas
      if (usuarioLogueado) {
        cargarReservasPorEmail(usuarioLogueado.email || '');
      } else {
        cargarReservasPorEmail(emailBusqueda);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error al cancelar la reserva. Por favor, inténtalo de nuevo.');
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES');
  };

  const formatearHora = (hora) => {
    return hora.substring(0, 5);
  };

  const getClaseEstado = (estado) => {
    return estado === 'CONFIRMADA' ? 'estado-confirmada' : 'estado-pendiente';
  };

  const getTextoEstado = (estado) => {
    return estado.charAt(0) + estado.slice(1).toLowerCase();
  };

  return (
    <div className="mis-reservas-page">
      {/* Hero Section */}
      <section className="hero-mis-reservas">
        <div className="hero-content">
          <h2>Mis Reservas</h2>
          <p>Consulta y gestiona tus reservas</p>
        </div>
      </section>

      {/* Sección de Consulta */}
      <section className="reservations-section">
        <div className="container">
          {/* Formulario de búsqueda - Solo si NO está logueado */}
          {!usuarioLogueado && (
            <div className="search-container">
              <form onSubmit={handleSubmitBusqueda} className="search-form">
                <h3 className="form-title">Consultar Reservas</h3>
                <div className="form-group">
                  <label htmlFor="emailBusqueda">Introduce tu email</label>
                  <input
                    type="email"
                    id="emailBusqueda"
                    value={emailBusqueda}
                    onChange={(e) => setEmailBusqueda(e.target.value)}
                    required
                    placeholder="tu@email.com"
                  />
                </div>
                <button type="submit" className="search-btn">
                  Buscar mis reservas
                </button>
              </form>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="loading">
              <p>Buscando reservas...</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          {/* Resultados */}
          {mostrarResultados && !loading && !error && (
            <>
              {reservas.length > 0 ? (
                <div className="results-container">
                  <h3 className="results-title">
                    Próximas Reservas (<span>{reservas.length}</span>)
                  </h3>
                  <div className="reservas-list">
                    {reservas.map(reserva => (
                      <div key={reserva.idReserva} className="reserva-card">
                        <div className="reserva-info">
                          <div className="reserva-header">
                            <span className="reserva-icon">🍣</span>
                            <h4 className="reserva-localizacion">
                              {reserva.localizacion.nombre || 'Restaurante'}
                            </h4>
                          </div>
                          <div className="reserva-detalle">
                            <span className="detalle-icon">📅</span>
                            <span>{formatearFecha(reserva.fechaReserva)}</span>
                          </div>
                          <div className="reserva-detalle">
                            <span className="detalle-icon">🕐</span>
                            <span>{formatearHora(reserva.horaReserva)}</span>
                          </div>
                          <div className="reserva-detalle">
                            <span className="detalle-icon">👥</span>
                            <span>
                              {reserva.numPersonas} {reserva.numPersonas === 1 ? 'persona' : 'personas'}
                            </span>
                          </div>
                          <div className="reserva-detalle">
                            <span className="detalle-icon">👤</span>
                            <span>{reserva.nombreCliente}</span>
                          </div>
                          <div className="reserva-detalle">
                            <span className="detalle-icon">📞</span>
                            <span>{reserva.telefonoCliente}</span>
                          </div>
                          <div>
                            <span className={`reserva-estado ${getClaseEstado(reserva.estado)}`}>
                              {getTextoEstado(reserva.estado)}
                            </span>
                          </div>
                        </div>

                        {/* Botón cancelar - Solo si está logueado */}
                        {usuarioLogueado && (
                          <div className="reserva-actions">
                            <button
                              className="btn-cancel"
                              onClick={() => handleCancelarReserva(reserva.idReserva)}
                            >
                              Cancelar Reserva
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="no-reservas">
                  <div className="no-reservas-icon">📅</div>
                  <h3>No tienes reservas futuras</h3>
                  <p>No se encontraron reservas para este email.</p>
                  <Link to="/reservas" className="btn-primary">
                    Hacer una reserva
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default MisReservas;