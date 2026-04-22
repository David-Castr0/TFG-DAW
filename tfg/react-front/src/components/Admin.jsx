import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReservasService from '../services/reservasService';
import localizacionesService from '../services/localizacionesService';
import authService from '../services/authService';
import './Admin.css';

function Admin() {
  const navigate = useNavigate();
  const reservasService = new ReservasService();
  
  // Estados
  const [todasLasReservas, setTodasLasReservas] = useState([]);
  const [reservasFiltradas, setReservasFiltradas] = useState([]);
  const [localizaciones, setLocalizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Estados de filtros
  const [filtros, setFiltros] = useState({
    fecha: '',
    localizacion: '',
    estado: ''
  });
  
  // Estados de estadísticas
  const [stats, setStats] = useState({
    hoy: 0,
    semana: 0,
    pendientes: 0,
    confirmadas: 0
  });
  
  // Estados del modal
  const [showModal, setShowModal] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState('');

  // Verificar autenticación al cargar
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user.token || user.rol !== 'ADMIN') {
      alert('Acceso denegado. Debes iniciar sesión como administrador.');
      navigate('/login');
      return;
    }
    
    cargarDatos();
  }, [navigate]);

  const cargarDatos = async () => {
    setLoading(true);
    setError('');
    
    try {
      const [reservasData, localizacionesData] = await Promise.all([
        fetch('http://localhost:8080/api/reservas').then(res => res.json()),
        localizacionesService.obtenerLocalizacionesActivas()
      ]);
      
      // Ordenar por fecha y hora (más recientes primero)
      const reservasOrdenadas = reservasData.sort((a, b) => {
        const fechaA = new Date(a.fechaReserva + 'T' + a.horaReserva);
        const fechaB = new Date(b.fechaReserva + 'T' + b.horaReserva);
        return fechaB - fechaA;
      });
      
      setTodasLasReservas(reservasOrdenadas);
      setReservasFiltradas(reservasOrdenadas);
      setLocalizaciones(localizacionesData);
      calcularEstadisticas(reservasOrdenadas);
    } catch (err) {
      console.error('Error:', err);
      setError('Error al cargar los datos. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const calcularEstadisticas = (reservas) => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const inicioSemana = new Date(hoy);
    inicioSemana.setDate(hoy.getDate() - hoy.getDay());
    
    const finSemana = new Date(inicioSemana);
    finSemana.setDate(inicioSemana.getDate() + 6);
    finSemana.setHours(23, 59, 59, 999);
    
    const reservasHoy = reservas.filter(r => {
      const fechaReserva = new Date(r.fechaReserva);
      fechaReserva.setHours(0, 0, 0, 0);
      return fechaReserva.getTime() === hoy.getTime();
    });
    
    const reservasSemana = reservas.filter(r => {
      const fechaReserva = new Date(r.fechaReserva);
      return fechaReserva >= inicioSemana && fechaReserva <= finSemana;
    });
    
    const pendientes = reservas.filter(r => r.estado === 'pendiente');
    const confirmadas = reservas.filter(r => r.estado === 'confirmada');
    
    setStats({
      hoy: reservasHoy.length,
      semana: reservasSemana.length,
      pendientes: pendientes.length,
      confirmadas: confirmadas.length
    });
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const aplicarFiltros = () => {
    let filtradas = [...todasLasReservas];
    
    if (filtros.fecha) {
      filtradas = filtradas.filter(r => r.fechaReserva === filtros.fecha);
    }
    
    if (filtros.localizacion) {
      filtradas = filtradas.filter(r => r.localizacion.idLocalizacion === parseInt(filtros.localizacion));
    }
    
    if (filtros.estado) {
      filtradas = filtradas.filter(r => r.estado === filtros.estado);
    }
    
    setReservasFiltradas(filtradas);
  };

  const limpiarFiltros = () => {
    setFiltros({ fecha: '', localizacion: '', estado: '' });
    setReservasFiltradas(todasLasReservas);
  };

  const abrirModal = (reserva) => {
    setReservaSeleccionada(reserva);
    setNuevoEstado(reserva.estado);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setReservaSeleccionada(null);
    setNuevoEstado('');
  };

  const guardarEstado = async () => {
    if (!reservaSeleccionada) return;
    
    try {
      await reservasService.cancelarReserva(reservaSeleccionada.idReserva); // Reutilizamos este método
      
      // Si no es cancelar, necesitamos otro endpoint
      await fetch(`http://localhost:8080/api/reservas/${reservaSeleccionada.idReserva}/estado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoEstado)
      });
      
      alert('Estado cambiado correctamente');
      cerrarModal();
      cargarDatos();
    } catch (err) {
      console.error('Error:', err);
      alert('Error al cambiar el estado. Por favor, inténtalo de nuevo.');
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES');
  };

  const formatearHora = (hora) => {
    return hora.substring(0, 5);
  };

  const getClaseEstado = (estado) => {
    return `estado-${estado}`;
  };

  const getTextoEstado = (estado) => {
    return estado.charAt(0).toUpperCase() + estado.slice(1);
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading">
          <p>Cargando panel de administración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {/* Hero */}
      <section className="hero-admin">
        <div className="hero-content">
          <h2>Panel de Administrador</h2>
          <p>Gestión de reservas del sistema</p>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-info">
                <h3>Reservas Hoy</h3>
                <p className="stat-number">{stats.hoy}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-info">
                <h3>Esta Semana</h3>
                <p className="stat-number">{stats.semana}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-info">
                <h3>Pendientes</h3>
                <p className="stat-number">{stats.pendientes}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-info">
                <h3>Confirmadas</h3>
                <p className="stat-number">{stats.confirmadas}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="filters-section">
        <div className="container">
          <div className="filters-container">
            <h3>Filtrar Reservas</h3>
            <div className="filters-grid">
              <div className="filter-group">
                <label htmlFor="fecha">Fecha</label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={filtros.fecha}
                  onChange={handleFiltroChange}
                />
              </div>
              <div className="filter-group">
                <label htmlFor="localizacion">Localización</label>
                <select
                  id="localizacion"
                  name="localizacion"
                  value={filtros.localizacion}
                  onChange={handleFiltroChange}
                >
                  <option value="">Todas</option>
                  {localizaciones.map(loc => (
                    <option key={loc.idLocalizacion} value={loc.idLocalizacion}>
                      {loc.nombre} - {loc.ciudad}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label htmlFor="estado">Estado</label>
                <select
                  id="estado"
                  name="estado"
                  value={filtros.estado}
                  onChange={handleFiltroChange}
                >
                  <option value="">Todos</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="confirmada">Confirmada</option>
                  <option value="cancelada">Cancelada</option>
                  <option value="completada">Completada</option>
                </select>
              </div>
              <div className="filter-group">
                <button onClick={aplicarFiltros} className="btn-filter">
                  Aplicar Filtros
                </button>
                <button onClick={limpiarFiltros} className="btn-clear">
                  Limpiar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabla de Reservas */}
      <section className="reservations-section">
        <div className="container">
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          {reservasFiltradas.length > 0 ? (
            <div className="reservas-container">
              <div className="reservas-header">
                <h3>Todas las Reservas ({reservasFiltradas.length})</h3>
                <button onClick={cargarDatos} className="btn-refresh">
                   Actualizar
                </button>
              </div>
              <div className="table-container">
                <table className="reservas-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Fecha</th>
                      <th>Hora</th>
                      <th>Cliente</th>
                      <th>Teléfono</th>
                      <th>Localización</th>
                      <th>Mesa</th>
                      <th>Personas</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservasFiltradas.map(reserva => (
                      <tr key={reserva.idReserva}>
                        <td>{reserva.idReserva}</td>
                        <td>{formatearFecha(reserva.fechaReserva)}</td>
                        <td>{formatearHora(reserva.horaReserva)}</td>
                        <td>{reserva.nombreCliente}</td>
                        <td>{reserva.telefonoCliente}</td>
                        <td>{reserva.localizacion.nombre}</td>
                        <td>{reserva.mesa.numeroMesa}</td>
                        <td>{reserva.numPersonas}</td>
                        <td>
                          <span className={`estado-badge ${getClaseEstado(reserva.estado)}`}>
                            {getTextoEstado(reserva.estado)}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => abrirModal(reserva)}
                            className="btn-cambiar-estado"
                          >
                            Cambiar Estado
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="no-reservas">
              <h3>No hay reservas</h3>
              <p>No se encontraron reservas con los filtros aplicados.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {showModal && reservaSeleccionada && (
        <div className="modal" onClick={(e) => e.target.className === 'modal' && cerrarModal()}>
          <div className="modal-content">
            <span className="close" onClick={cerrarModal}>&times;</span>
            <h3>Cambiar Estado de Reserva</h3>
            <div className="modal-body">
              <p>
                <strong>Reserva #{reservaSeleccionada.idReserva}</strong><br />
                Cliente: {reservaSeleccionada.nombreCliente}<br />
                Fecha: {formatearFecha(reservaSeleccionada.fechaReserva)} - {formatearHora(reservaSeleccionada.horaReserva)}<br />
                Localización: {reservaSeleccionada.localizacion.nombre}<br />
                Estado actual: <span className={`estado-badge ${getClaseEstado(reservaSeleccionada.estado)}`}>
                  {getTextoEstado(reservaSeleccionada.estado)}
                </span>
              </p>
              <div className="form-group">
                <label htmlFor="nuevoEstado">Nuevo Estado:</label>
                <select
                  id="nuevoEstado"
                  value={nuevoEstado}
                  onChange={(e) => setNuevoEstado(e.target.value)}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="confirmada">Confirmada</option>
                  <option value="cancelada">Cancelada</option>
                  <option value="completada">Completada</option>
                </select>
              </div>
              <div className="modal-actions">
                <button onClick={guardarEstado} className="btn-primary">
                  Guardar
                </button>
                <button onClick={cerrarModal} className="btn-secondary">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;