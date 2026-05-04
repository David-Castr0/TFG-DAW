import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReservasService from '../services/reservasService';
import localizacionesService from '../services/localizacionesService';
import platosService from '../services/platosService';
import authService from '../services/authService';
import './Admin.css';

function Admin() {
  const navigate = useNavigate();
  const reservasService = new ReservasService();

  const [pestanaActiva, setPestanaActiva] = useState('reservas');

  // Estados reservas
  const [todasLasReservas, setTodasLasReservas] = useState([]);
  const [reservasFiltradas, setReservasFiltradas] = useState([]);
  const [localizaciones, setLocalizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtros, setFiltros] = useState({ fecha: '', localizacion: '', estado: '' });
  const [stats, setStats] = useState({ hoy: 0, semana: 0, pendientes: 0, confirmadas: 0 });
  const [showModal, setShowModal] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState('');

  // Estados platos y localizaciones
  const [todosLosPlatos, setTodosLosPlatos] = useState([]);
  const [todasLasLocalizaciones, setTodasLasLocalizaciones] = useState([]);
  const [categorias, setCategorias] = useState([]);

  // Estados pedidos domicilio
  const [pedidosDomicilio, setPedidosDomicilio] = useState([]);
  const [pedidoDetalle, setPedidoDetalle] = useState(null);
  const [showModalPedido, setShowModalPedido] = useState(false);

  // Modal crear plato
  const [showModalPlato, setShowModalPlato] = useState(false);
  const [nuevoPlato, setNuevoPlato] = useState({
    nombre: '', descripcion: '', precio: '', imagenUrl: '', categoria: { idCategoria: '' }
  });
  const [imagenFile, setImagenFile] = useState(null);
  const [imagenPreview, setImagenPreview] = useState('');

  // Modal editar plato
  const [showModalEditarPlato, setShowModalEditarPlato] = useState(false);
  const [platoEditando, setPlatoEditando] = useState(null);

  // Modal crear localizacion
  const [showModalLocalizacion, setShowModalLocalizacion] = useState(false);
  const [nuevaLocalizacion, setNuevaLocalizacion] = useState({
    nombre: '', direccion: '', telefono: '', ciudad: '', horarioApertura: '', horarioCierre: ''
  });

  // Modal editar localizacion
  const [showModalEditarLocalizacion, setShowModalEditarLocalizacion] = useState(false);
  const [localizacionEditando, setLocalizacionEditando] = useState(null);

  // Popup de acciones (rueda de configuración)
  const [popupAcciones, setPopupAcciones] = useState(null);
  const [popupTipo, setPopupTipo] = useState(null);

  // Cierra el popup al hacer click fuera
  useEffect(() => {
    const handleClickFuera = () => setPopupAcciones(null);
    document.addEventListener('click', handleClickFuera);
    return () => document.removeEventListener('click', handleClickFuera);
  }, []);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user.token || user.rol !== 'ADMIN') {
      alert('Acceso denegado. Debes iniciar sesión como administrador.');
      navigate('/login');
      return;
    }
    cargarDatos();
  }, [navigate]);

  useEffect(() => {
    if (imagenFile) {
      const url = URL.createObjectURL(imagenFile);
      setImagenPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imagenFile]);

  const cargarDatos = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const [reservasData, localizacionesData, platosData, todasLocData, categoriasData, pedidosData] = await Promise.all([
        fetch('http://localhost:8080/api/reservas').then(res => res.json()),
        localizacionesService.obtenerLocalizacionesActivas(),
        platosService.obtenerTodosLosPlatos(),
        localizacionesService.obtenerTodasLasLocalizaciones(),
        platosService.obtenerCategorias(),
        fetch('http://localhost:8080/api/pedidos', { headers: { 'Authorization': `Bearer ${token}` } }).then(res => res.json())
      ]);

      const reservasOrdenadas = reservasData.sort((a, b) => {
        const fechaA = new Date(a.fechaReserva + 'T' + a.horaReserva);
        const fechaB = new Date(b.fechaReserva + 'T' + b.horaReserva);
        return fechaB - fechaA;
      });

      const pedidosDomicilioFiltrados = pedidosData
        .filter(p => p.tipoPedido === 'domicilio')
        .sort((a, b) => new Date(b.fechaHoraInicio) - new Date(a.fechaHoraInicio));

      setTodasLasReservas(reservasOrdenadas);
      setReservasFiltradas(reservasOrdenadas);
      setLocalizaciones(localizacionesData);
      setTodosLosPlatos(platosData);
      setTodasLasLocalizaciones(todasLocData);
      setCategorias(categoriasData);
      setPedidosDomicilio(pedidosDomicilioFiltrados);
      calcularEstadisticas(reservasOrdenadas);
    } catch (err) {
      console.error('Error:', err);
      setError('Error al cargar los datos.');
    } finally {
      setLoading(false);
    }
  };

  const verDetallePedido = async (pedido) => {
    try {
      const token = localStorage.getItem('token');
      const detalles = await fetch(`http://localhost:8080/api/detalle-pedidos/pedido/${pedido.idPedido}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => res.json());
      setPedidoDetalle({ ...pedido, detalles });
      setShowModalPedido(true);
    } catch (err) {
      alert('Error al cargar el detalle del pedido.');
    }
  };

  const cambiarEstadoPedido = async (idPedido, nuevoEstado) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:8080/api/pedidos/${idPedido}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ estado: nuevoEstado, idPedido })
      });
      setPedidosDomicilio(prev =>
        prev.map(p => p.idPedido === idPedido ? { ...p, estado: nuevoEstado } : p)
      );
      if (pedidoDetalle?.idPedido === idPedido) {
        setPedidoDetalle(prev => ({ ...prev, estado: nuevoEstado }));
      }
    } catch (err) {
      alert('Error al cambiar el estado del pedido.');
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

    setStats({
      hoy: reservas.filter(r => { const f = new Date(r.fechaReserva); f.setHours(0,0,0,0); return f.getTime() === hoy.getTime(); }).length,
      semana: reservas.filter(r => { const f = new Date(r.fechaReserva); return f >= inicioSemana && f <= finSemana; }).length,
      pendientes: reservas.filter(r => r.estado === 'pendiente').length,
      confirmadas: reservas.filter(r => r.estado === 'confirmada').length
    });
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const aplicarFiltros = () => {
    let filtradas = [...todasLasReservas];
    if (filtros.fecha) filtradas = filtradas.filter(r => r.fechaReserva === filtros.fecha);
    if (filtros.localizacion) filtradas = filtradas.filter(r => r.localizacion.idLocalizacion === parseInt(filtros.localizacion));
    if (filtros.estado) filtradas = filtradas.filter(r => r.estado === filtros.estado);
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
      await fetch(`http://localhost:8080/api/reservas/${reservaSeleccionada.idReserva}/estado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoEstado)
      });
      alert('Estado cambiado correctamente');
      cerrarModal();
      cargarDatos();
    } catch (err) {
      alert('Error al cambiar el estado.');
    }
  };

  const toggleDisponibilidadPlato = async (plato) => {
    try {
      await platosService.cambiarDisponibilidad(plato.idPlato, !plato.disponible);
      setTodosLosPlatos(prev =>
        prev.map(p => p.idPlato === plato.idPlato ? { ...p, disponible: !p.disponible } : p)
      );
    } catch (err) {
      alert('Error al cambiar la disponibilidad del plato.');
    }
  };

  const toggleActivoLocalizacion = async (loc) => {
    try {
      await localizacionesService.cambiarActivo(loc.idLocalizacion, !loc.activo);
      setTodasLasLocalizaciones(prev =>
        prev.map(l => l.idLocalizacion === loc.idLocalizacion ? { ...l, activo: !l.activo } : l)
      );
    } catch (err) {
      alert('Error al cambiar el estado de la localización.');
    }
  };

  const handleNuevoPlatoChange = (e) => {
    const { name, value } = e.target;
    if (name === 'categoria') {
      setNuevoPlato(prev => ({ ...prev, categoria: { idCategoria: parseInt(value) } }));
    } else {
      setNuevoPlato(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditarPlatoChange = (e) => {
    const { name, value } = e.target;
    if (name === 'categoria') {
      setPlatoEditando(prev => ({ ...prev, categoria: { ...prev.categoria, idCategoria: parseInt(value) } }));
    } else {
      setPlatoEditando(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditarLocalizacionChange = (e) => {
    const { name, value } = e.target;
    setLocalizacionEditando(prev => ({ ...prev, [name]: value }));
  };

  const abrirEditarPlato = (plato) => {
    setPlatoEditando({ ...plato });
    setShowModalEditarPlato(true);
  };

  const abrirEditarLocalizacion = (loc) => {
    setLocalizacionEditando({ ...loc });
    setShowModalEditarLocalizacion(true);
  };

  const guardarEdicionPlato = async () => {
    if (!platoEditando.nombre || !platoEditando.precio || !platoEditando.categoria.idCategoria) {
      alert('Por favor rellena al menos el nombre, precio y categoría.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/platos/${platoEditando.idPlato}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(platoEditando)
      });
      if (response.ok) {
        alert('Plato actualizado correctamente.');
        setShowModalEditarPlato(false);
        setPlatoEditando(null);
        cargarDatos();
      } else {
        alert('Error al actualizar el plato.');
      }
    } catch (err) {
      alert('Error al actualizar el plato.');
    }
  };

  const guardarEdicionLocalizacion = async () => {
    if (!localizacionEditando.nombre || !localizacionEditando.direccion || !localizacionEditando.ciudad) {
      alert('Por favor rellena al menos el nombre, dirección y ciudad.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/localizaciones/${localizacionEditando.idLocalizacion}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(localizacionEditando)
      });
      if (response.ok) {
        alert('Localización actualizada correctamente.');
        setShowModalEditarLocalizacion(false);
        setLocalizacionEditando(null);
        cargarDatos();
      } else {
        alert('Error al actualizar la localización.');
      }
    } catch (err) {
      alert('Error al actualizar la localización.');
    }
  };

  const crearPlato = async () => {
    if (!nuevoPlato.nombre || !nuevoPlato.precio || !nuevoPlato.categoria.idCategoria) {
      alert('Por favor rellena al menos el nombre, precio y categoría.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      let imagenUrl = nuevoPlato.imagenUrl;

      if (imagenFile) {
        const formData = new FormData();
        formData.append('file', imagenFile);
        const uploadResponse = await fetch('http://localhost:8080/api/upload/imagen', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData
        });
        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          imagenUrl = uploadData.url;
        } else {
          alert('Error al subir la imagen.');
          return;
        }
      }

      const platoAEnviar = {
        ...nuevoPlato,
        precio: parseFloat(nuevoPlato.precio),
        disponible: true,
        imagenUrl
      };

      const response = await fetch('http://localhost:8080/api/platos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(platoAEnviar)
      });

      if (response.ok) {
        alert('Plato creado correctamente.');
        setShowModalPlato(false);
        setNuevoPlato({ nombre: '', descripcion: '', precio: '', imagenUrl: '', categoria: { idCategoria: '' } });
        setImagenFile(null);
        setImagenPreview('');
        cargarDatos();
      } else {
        alert('Error al crear el plato.');
      }
    } catch (err) {
      alert('Error al crear el plato.');
    }
  };

  const eliminarPlato = async (idPlato) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este plato?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/platos/${idPlato}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setTodosLosPlatos(prev => prev.filter(p => p.idPlato !== idPlato));
      } else {
        alert('Error al eliminar el plato.');
      }
    } catch (err) {
      alert('Error al eliminar el plato.');
    }
  };

  const handleNuevaLocalizacionChange = (e) => {
    const { name, value } = e.target;
    setNuevaLocalizacion(prev => ({ ...prev, [name]: value }));
  };

  const crearLocalizacion = async () => {
    if (!nuevaLocalizacion.nombre || !nuevaLocalizacion.direccion || !nuevaLocalizacion.ciudad) {
      alert('Por favor rellena al menos el nombre, dirección y ciudad.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const locAEnviar = { ...nuevaLocalizacion, activo: true };
      const response = await fetch('http://localhost:8080/api/localizaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(locAEnviar)
      });
      if (response.ok) {
        alert('Localización creada correctamente.');
        setShowModalLocalizacion(false);
        setNuevaLocalizacion({ nombre: '', direccion: '', telefono: '', ciudad: '', horarioApertura: '', horarioCierre: '' });
        cargarDatos();
      } else {
        alert('Error al crear la localización.');
      }
    } catch (err) {
      alert('Error al crear la localización.');
    }
  };

  const eliminarLocalizacion = async (idLocalizacion) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta localización?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/localizaciones/${idLocalizacion}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setTodasLasLocalizaciones(prev => prev.filter(l => l.idLocalizacion !== idLocalizacion));
      } else {
        alert('Error al eliminar la localización.');
      }
    } catch (err) {
      alert('Error al eliminar la localización.');
    }
  };

  const formatearFecha = (fecha) => new Date(fecha).toLocaleDateString('es-ES');
  const formatearHora = (hora) => hora.substring(0, 5);
  const formatearFechaHora = (fechaHora) => {
    if (!fechaHora) return '-';
    const d = new Date(fechaHora);
    return `${d.toLocaleDateString('es-ES')} ${d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
  };
  const getClaseEstado = (estado) => `estado-${estado}`;
  const getTextoEstado = (estado) => estado.charAt(0).toUpperCase() + estado.slice(1);

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading"><p>Cargando panel de administración...</p></div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <section className="hero-admin">
        <div className="hero-content">
          <h2>Panel de Administrador</h2>
          <p>Gestión del sistema</p>
        </div>
      </section>

      {/* Pestañas */}
      <div className="admin-tabs">
        <button className={`admin-tab ${pestanaActiva === 'reservas' ? 'active' : ''}`} onClick={() => setPestanaActiva('reservas')}>Reservas</button>
        <button className={`admin-tab ${pestanaActiva === 'pedidos' ? 'active' : ''}`} onClick={() => setPestanaActiva('pedidos')}>
          Pedidos a Domicilio
          {pedidosDomicilio.filter(p => p.estado === 'recibido' || p.estado === 'en_preparacion' || p.estado === 'en_camino').length > 0 && (
            <span className="tab-badge">{pedidosDomicilio.filter(p => p.estado === 'recibido' || p.estado === 'en_preparacion' || p.estado === 'en_camino').length}</span>
          )}
        </button>
        <button className={`admin-tab ${pestanaActiva === 'platos' ? 'active' : ''}`} onClick={() => setPestanaActiva('platos')}>Platos</button>
        <button className={`admin-tab ${pestanaActiva === 'localizaciones' ? 'active' : ''}`} onClick={() => setPestanaActiva('localizaciones')}>Localizaciones</button>
      </div>

      {/* ===== PESTAÑA RESERVAS ===== */}
      {pestanaActiva === 'reservas' && (
        <>
          <section className="stats-section">
            <div className="container">
              <div className="stats-grid">
                <div className="stat-card"><div className="stat-info"><h3>Reservas Hoy</h3><p className="stat-number">{stats.hoy}</p></div></div>
                <div className="stat-card"><div className="stat-info"><h3>Esta Semana</h3><p className="stat-number">{stats.semana}</p></div></div>
                <div className="stat-card"><div className="stat-info"><h3>Pendientes</h3><p className="stat-number">{stats.pendientes}</p></div></div>
                <div className="stat-card"><div className="stat-info"><h3>Confirmadas</h3><p className="stat-number">{stats.confirmadas}</p></div></div>
              </div>
            </div>
          </section>

          <section className="filters-section">
            <div className="container">
              <div className="filters-container">
                <h3>Filtrar Reservas</h3>
                <div className="filters-grid">
                  <div className="filter-group">
                    <label htmlFor="fecha">Fecha</label>
                    <input type="date" id="fecha" name="fecha" value={filtros.fecha} onChange={handleFiltroChange} />
                  </div>
                  <div className="filter-group">
                    <label htmlFor="localizacion">Localización</label>
                    <select id="localizacion" name="localizacion" value={filtros.localizacion} onChange={handleFiltroChange}>
                      <option value="">Todas</option>
                      {localizaciones.map(loc => (
                        <option key={loc.idLocalizacion} value={loc.idLocalizacion}>{loc.nombre} - {loc.ciudad}</option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-group">
                    <label htmlFor="estado">Estado</label>
                    <select id="estado" name="estado" value={filtros.estado} onChange={handleFiltroChange}>
                      <option value="">Todos</option>
                      <option value="pendiente">Pendiente</option>
                      <option value="confirmada">Confirmada</option>
                      <option value="cancelada">Cancelada</option>
                      <option value="completada">Completada</option>
                    </select>
                  </div>
                  <div className="filter-group">
                    <button onClick={aplicarFiltros} className="btn-filter">Aplicar Filtros</button>
                    <button onClick={limpiarFiltros} className="btn-clear">Limpiar</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="reservations-section">
            <div className="container">
              {error && <div className="error-message"><p>{error}</p></div>}
              {reservasFiltradas.length > 0 ? (
                <div className="reservas-container">
                  <div className="reservas-header">
                    <h3>Todas las Reservas ({reservasFiltradas.length})</h3>
                    <button onClick={cargarDatos} className="btn-refresh">Actualizar</button>
                  </div>
                  <div className="table-container">
                    <table className="reservas-table">
                      <thead>
                        <tr>
                          <th>ID</th><th>Fecha</th><th>Hora</th><th>Cliente</th>
                          <th>Teléfono</th><th>Localización</th><th>Mesa</th>
                          <th>Personas</th><th>Estado</th><th>Acciones</th>
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
                            <td className="acciones-cell">
                            <button
                              className="btn-acciones"
                              onClick={(e) => {
                              e.stopPropagation();
                              setPopupAcciones(reserva.idReserva);
                              setPopupTipo('reserva');
                              }}
                            >
                          ⚙️
                          </button>
  {popupAcciones === reserva.idReserva && popupTipo === 'reserva' && (
    <div className="acciones-popup">
      <button 
        className="popup-opcion popup-editar" 
        onClick={() => { 
          abrirModal(reserva); 
          setPopupAcciones(null); 
        }}
      >
        ✏️ Cambiar Estado
      </button>
    </div>
  )}
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
        </>
      )}

      {/* ===== PESTAÑA PEDIDOS DOMICILIO ===== */}
      {pestanaActiva === 'pedidos' && (
        <section className="gestion-section">
          <div className="container">
            <div className="gestion-header">
              <h3>Pedidos a Domicilio ({pedidosDomicilio.length})</h3>
              <button onClick={cargarDatos} className="btn-refresh">Actualizar</button>
            </div>
            {pedidosDomicilio.length === 0 ? (
              <div className="no-reservas"><h3>No hay pedidos a domicilio</h3></div>
            ) : (
              <div className="table-container">
                <table className="reservas-table">
                  <thead>
                    <tr>
                      <th>ID</th><th>Fecha y hora</th><th>Cliente</th><th>Teléfono</th>
                      <th>Dirección</th><th>Pago</th><th>Estado</th><th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedidosDomicilio.map(pedido => (
                      <tr key={pedido.idPedido}>
                        <td>#{pedido.idPedido}</td>
                        <td>{formatearFechaHora(pedido.fechaHoraInicio)}</td>
                        <td>{pedido.nombreCliente}</td>
                        <td>{pedido.telefonoCliente}</td>
                        <td>{pedido.direccionEntrega}</td>
                        <td>
                          <span className="metodo-pago-badge">
                            {pedido.metodoPago === 'efectivo' ? '💵 Efectivo' : '💳 Tarjeta'}
                          </span>
                        </td>
                        <td>
                          <span className={`estado-badge estado-${pedido.estado}`}>
                            {pedido.estado === 'recibido' ? 'Recibido' :
                             pedido.estado === 'en_preparacion' ? 'En preparación' :
                             pedido.estado === 'en_camino' ? 'En camino' :
                             pedido.estado === 'entregado' ? 'Entregado' : 'Finalizado'}
                          </span>
                        </td>
                        <td className="acciones-cell">
  <button
    className="btn-acciones"
    onClick={(e) => {
      e.stopPropagation();
      setPopupAcciones(pedido.idPedido);
      setPopupTipo('pedido');
    }}
  >
  ⚙️
  </button>
  {popupAcciones === pedido.idPedido && popupTipo === 'pedido' && (
    <div className="acciones-popup">
      <button 
        className="popup-opcion popup-editar" 
        onClick={() => { 
          verDetallePedido(pedido); 
          setPopupAcciones(null); 
        }}
      >
        👁️ Ver detalle
      </button>
    </div>
  )}
</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== PESTAÑA PLATOS ===== */}
      {pestanaActiva === 'platos' && (
        <section className="gestion-section">
          <div className="container">
            <div className="gestion-header">
              <h3>Gestión de Platos ({todosLosPlatos.length})</h3>
              <div className="gestion-header-acciones">
                <button onClick={cargarDatos} className="btn-refresh">Actualizar</button>
                <button onClick={() => setShowModalPlato(true)} className="btn-crear">+ Nuevo Plato</button>
              </div>
            </div>
            <div className="table-container">
              <table className="reservas-table">
                <thead>
                  <tr>
                    <th>ID</th><th>Imagen</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Estado</th><th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {todosLosPlatos.map(plato => (
                    <tr key={plato.idPlato}>
                      <td>{plato.idPlato}</td>
                      <td>
                        <img
                          src={plato.imagenUrl || 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=60'}
                          alt={plato.nombre}
                          className="tabla-imagen"
                          onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=60'}
                        />
                      </td>
                      <td>{plato.nombre}</td>
                      <td>{plato.categoria?.nombre || '-'}</td>
                      <td>{plato.precio?.toFixed(2)}€</td>
                      <td>
                        <span className={`estado-badge ${plato.disponible ? 'estado-confirmada' : 'estado-cancelada'}`}>
                          {plato.disponible ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="acciones-cell">
                        <button
                          className="btn-acciones"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPopupAcciones(plato.idPlato);
                            setPopupTipo('plato');
                          }}
                        >
                          ⚙️
                        </button>
                        {popupAcciones === plato.idPlato && popupTipo === 'plato' && (
                          <div className="acciones-popup">
                            <button className="popup-opcion popup-editar" onClick={() => { abrirEditarPlato(plato); setPopupAcciones(null); }}>
                              ✏️ Editar
                            </button>
                            <button
                              className={`popup-opcion ${plato.disponible ? 'popup-desactivar' : 'popup-activar'}`}
                              onClick={() => { toggleDisponibilidadPlato(plato); setPopupAcciones(null); }}
                            >
                              {plato.disponible ? '🔴 Desactivar' : '🟢 Activar'}
                            </button>
                            <button className="popup-opcion popup-eliminar" onClick={() => { eliminarPlato(plato.idPlato); setPopupAcciones(null); }}>
                              🗑️ Eliminar
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ===== PESTAÑA LOCALIZACIONES ===== */}
      {pestanaActiva === 'localizaciones' && (
        <section className="gestion-section">
          <div className="container">
            <div className="gestion-header">
              <h3>Gestión de Localizaciones ({todasLasLocalizaciones.length})</h3>
              <div className="gestion-header-acciones">
                <button onClick={cargarDatos} className="btn-refresh">Actualizar</button>
                <button onClick={() => setShowModalLocalizacion(true)} className="btn-crear">+ Nueva Localización</button>
              </div>
            </div>
            <div className="table-container">
              <table className="reservas-table">
                <thead>
                  <tr>
                    <th>ID</th><th>Nombre</th><th>Ciudad</th><th>Dirección</th><th>Teléfono</th><th>Estado</th><th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {todasLasLocalizaciones.map(loc => (
                    <tr key={loc.idLocalizacion}>
                      <td>{loc.idLocalizacion}</td>
                      <td>{loc.nombre}</td>
                      <td>{loc.ciudad}</td>
                      <td>{loc.direccion}</td>
                      <td>{loc.telefono}</td>
                      <td>
                        <span className={`estado-badge ${loc.activo ? 'estado-confirmada' : 'estado-cancelada'}`}>
                          {loc.activo ? 'Activa' : 'Inactiva'}
                        </span>
                      </td>
                      <td className="acciones-cell">
                        <button
                          className="btn-acciones"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPopupAcciones(loc.idLocalizacion);
                            setPopupTipo('localizacion');
                          }}
                        >
                          ⚙️
                        </button>
                        {popupAcciones === loc.idLocalizacion && popupTipo === 'localizacion' && (
                          <div className="acciones-popup">
                            <button className="popup-opcion popup-editar" onClick={() => { abrirEditarLocalizacion(loc); setPopupAcciones(null); }}>
                              ✏️ Editar
                            </button>
                            <button
                              className={`popup-opcion ${loc.activo ? 'popup-desactivar' : 'popup-activar'}`}
                              onClick={() => { toggleActivoLocalizacion(loc); setPopupAcciones(null); }}
                            >
                              {loc.activo ? '🔴 Desactivar' : '🟢 Activar'}
                            </button>
                            <button className="popup-opcion popup-eliminar" onClick={() => { eliminarLocalizacion(loc.idLocalizacion); setPopupAcciones(null); }}>
                              🗑️ Eliminar
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ===== MODAL CAMBIAR ESTADO RESERVA ===== */}
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
                <select id="nuevoEstado" value={nuevoEstado} onChange={(e) => setNuevoEstado(e.target.value)}>
                  <option value="pendiente">Pendiente</option>
                  <option value="confirmada">Confirmada</option>
                  <option value="cancelada">Cancelada</option>
                  <option value="completada">Completada</option>
                </select>
              </div>
              <div className="modal-actions">
                <button onClick={guardarEstado} className="btn-primary">Guardar</button>
                
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL DETALLE PEDIDO ===== */}
      {showModalPedido && pedidoDetalle && (
        <div className="modal" onClick={(e) => e.target.className === 'modal' && setShowModalPedido(false)}>
          <div className="modal-content">
            <span className="close" onClick={() => setShowModalPedido(false)}>&times;</span>
            <h3>Pedido #{pedidoDetalle.idPedido}</h3>
            <div className="modal-body">
              <div className="pedido-detalle-info">
                <p><strong>Cliente:</strong> {pedidoDetalle.nombreCliente}</p>
                <p><strong>Teléfono:</strong> {pedidoDetalle.telefonoCliente}</p>
                <p><strong>Dirección:</strong> {pedidoDetalle.direccionEntrega}</p>
                {pedidoDetalle.notasPedido && <p><strong>Notas:</strong> {pedidoDetalle.notasPedido}</p>}
                <p><strong>Pago:</strong> {pedidoDetalle.metodoPago === 'efectivo' ? '💵 Efectivo' : '💳 Tarjeta'}</p>
                <p><strong>Fecha:</strong> {formatearFechaHora(pedidoDetalle.fechaHoraInicio)}</p>
                <p><strong>Estado:</strong>
                  <span className={`estado-badge estado-${pedidoDetalle.estado}`} style={{ marginLeft: '0.5rem' }}>
                    {pedidoDetalle.estado === 'recibido' ? 'Recibido' :
                     pedidoDetalle.estado === 'en_preparacion' ? 'En preparación' :
                     pedidoDetalle.estado === 'en_camino' ? 'En camino' :
                     pedidoDetalle.estado === 'entregado' ? 'Entregado' : 'Finalizado'}
                  </span>
                </p>
              </div>
              <h4 style={{ color: 'var(--blanco)', margin: '1.5rem 0 0.8rem', letterSpacing: '1px' }}>Platos pedidos</h4>
              <div className="pedido-detalle-platos">
                {pedidoDetalle.detalles?.map(detalle => (
                  <div key={detalle.idDetalle} className="pedido-detalle-item">
                    <span className="pedido-detalle-nombre">{detalle.plato.nombre}</span>
                    <span className="pedido-detalle-cantidad">x{detalle.cantidad}</span>
                    <span className="pedido-detalle-precio">{(detalle.plato.precio * detalle.cantidad).toFixed(2)}€</span>
                  </div>
                ))}
                <div className="pedido-detalle-total">
                  <span>Total</span>
                  <span>{pedidoDetalle.detalles?.reduce((acc, d) => acc + d.plato.precio * d.cantidad, 0).toFixed(2)}€</span>
                </div>
              </div>
              <div className="modal-actions">
                {pedidoDetalle.estado !== 'entregado' && pedidoDetalle.estado !== 'finalizado' && (
                  <button className="btn-primary" onClick={() => {
                    const siguienteEstado =
                      pedidoDetalle.estado === 'recibido' ? 'en_preparacion' :
                      pedidoDetalle.estado === 'en_preparacion' ? 'en_camino' :
                      pedidoDetalle.estado === 'en_camino' ? 'entregado' : 'finalizado';
                    cambiarEstadoPedido(pedidoDetalle.idPedido, siguienteEstado);
                    setShowModalPedido(false);
                  }}>
                    {pedidoDetalle.estado === 'recibido' ? 'Marcar en preparación' :
                     pedidoDetalle.estado === 'en_preparacion' ? 'Marcar en camino' :
                     pedidoDetalle.estado === 'en_camino' ? 'Marcar como entregado' : 'Finalizar'}
                  </button>
                )}
                <button className="btn-secondary" onClick={() => setShowModalPedido(false)}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL CREAR PLATO ===== */}
      {showModalPlato && (
        <div className="modal" onClick={(e) => e.target.className === 'modal' && setShowModalPlato(false)}>
          <div className="modal-content">
            <span className="close" onClick={() => setShowModalPlato(false)}>&times;</span>
            <h3>Nuevo Plato</h3>
            <div className="modal-body">
              <div className="form-group">
                <label>Nombre *</label>
                <input type="text" name="nombre" value={nuevoPlato.nombre} onChange={handleNuevoPlatoChange} placeholder="Nombre del plato" />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea name="descripcion" value={nuevoPlato.descripcion} onChange={handleNuevoPlatoChange} placeholder="Descripción del plato" rows="3" />
              </div>
              <div className="form-group">
                <label>Precio (€) *</label>
                <input type="number" name="precio" value={nuevoPlato.precio} onChange={handleNuevoPlatoChange} placeholder="0.00" step="0.01" min="0" />
              </div>
              <div className="form-group">
                <label>Categoría *</label>
                <select name="categoria" value={nuevoPlato.categoria.idCategoria} onChange={handleNuevoPlatoChange}>
                  <option value="">Selecciona una categoría</option>
                  {categorias.map(cat => (
                    <option key={cat.idCategoria} value={cat.idCategoria}>{cat.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Imagen del plato</label>
                <input type="file" accept="image/*" onChange={(e) => setImagenFile(e.target.files[0])} className="input-file" />
                {(imagenPreview || nuevoPlato.imagenUrl) && (
                  <img src={imagenPreview || nuevoPlato.imagenUrl} alt="Preview" className="imagen-preview" onError={(e) => e.target.style.display = 'none'} />
                )}
              </div>
              <div className="modal-actions">
                <button onClick={crearPlato} className="btn-primary">Crear Plato</button>
                
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL EDITAR PLATO ===== */}
      {showModalEditarPlato && platoEditando && (
        <div className="modal" onClick={(e) => e.target.className === 'modal' && setShowModalEditarPlato(false)}>
          <div className="modal-content">
            <span className="close" onClick={() => setShowModalEditarPlato(false)}>&times;</span>
            <h3>Editar Plato</h3>
            <div className="modal-body">
              <div className="form-group">
                <label>Nombre *</label>
                <input type="text" name="nombre" value={platoEditando.nombre} onChange={handleEditarPlatoChange} placeholder="Nombre del plato" />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea name="descripcion" value={platoEditando.descripcion || ''} onChange={handleEditarPlatoChange} placeholder="Descripción del plato" rows="3" />
              </div>
              <div className="form-group">
                <label>Precio (€) *</label>
                <input type="number" name="precio" value={platoEditando.precio} onChange={handleEditarPlatoChange} placeholder="0.00" step="0.01" min="0" />
              </div>
              <div className="form-group">
                <label>Categoría *</label>
                <select name="categoria" value={platoEditando.categoria.idCategoria} onChange={handleEditarPlatoChange}>
                  <option value="">Selecciona una categoría</option>
                  {categorias.map(cat => (
                    <option key={cat.idCategoria} value={cat.idCategoria}>{cat.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="modal-actions">
                <button onClick={guardarEdicionPlato} className="btn-primary">Guardar cambios</button>
                
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL EDITAR LOCALIZACION ===== */}
      {showModalEditarLocalizacion && localizacionEditando && (
        <div className="modal" onClick={(e) => e.target.className === 'modal' && setShowModalEditarLocalizacion(false)}>
          <div className="modal-content">
            <span className="close" onClick={() => setShowModalEditarLocalizacion(false)}>&times;</span>
            <h3>Editar Localización</h3>
            <div className="modal-body">
              <div className="form-group">
                <label>Nombre *</label>
                <input type="text" name="nombre" value={localizacionEditando.nombre} onChange={handleEditarLocalizacionChange} placeholder="Nombre del restaurante" />
              </div>
              <div className="form-group">
                <label>Ciudad *</label>
                <input type="text" name="ciudad" value={localizacionEditando.ciudad} onChange={handleEditarLocalizacionChange} placeholder="Ciudad" />
              </div>
              <div className="form-group">
                <label>Dirección *</label>
                <input type="text" name="direccion" value={localizacionEditando.direccion} onChange={handleEditarLocalizacionChange} placeholder="Calle y número" />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input type="text" name="telefono" value={localizacionEditando.telefono || ''} onChange={handleEditarLocalizacionChange} placeholder="600 000 000" />
              </div>
              <div className="form-group">
                <label>Horario apertura</label>
                <input type="time" name="horarioApertura" value={localizacionEditando.horarioApertura || ''} onChange={handleEditarLocalizacionChange} />
              </div>
              <div className="form-group">
                <label>Horario cierre</label>
                <input type="time" name="horarioCierre" value={localizacionEditando.horarioCierre || ''} onChange={handleEditarLocalizacionChange} />
              </div>
              <div className="modal-actions">
                <button onClick={guardarEdicionLocalizacion} className="btn-primary">Guardar cambios</button>
  
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL CREAR LOCALIZACION ===== */}
      {showModalLocalizacion && (
        <div className="modal" onClick={(e) => e.target.className === 'modal' && setShowModalLocalizacion(false)}>
          <div className="modal-content">
            <span className="close" onClick={() => setShowModalLocalizacion(false)}>&times;</span>
            <h3>Nueva Localización</h3>
            <div className="modal-body">
              <div className="form-group">
                <label>Nombre *</label>
                <input type="text" name="nombre" value={nuevaLocalizacion.nombre} onChange={handleNuevaLocalizacionChange} placeholder="Nombre del restaurante" />
              </div>
              <div className="form-group">
                <label>Ciudad *</label>
                <input type="text" name="ciudad" value={nuevaLocalizacion.ciudad} onChange={handleNuevaLocalizacionChange} placeholder="Ciudad" />
              </div>
              <div className="form-group">
                <label>Dirección *</label>
                <input type="text" name="direccion" value={nuevaLocalizacion.direccion} onChange={handleNuevaLocalizacionChange} placeholder="Calle y número" />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input type="text" name="telefono" value={nuevaLocalizacion.telefono} onChange={handleNuevaLocalizacionChange} placeholder="600 000 000" />
              </div>
              <div className="form-group">
                <label>Horario apertura</label>
                <input type="time" name="horarioApertura" value={nuevaLocalizacion.horarioApertura} onChange={handleNuevaLocalizacionChange} />
              </div>
              <div className="form-group">
                <label>Horario cierre</label>
                <input type="time" name="horarioCierre" value={nuevaLocalizacion.horarioCierre} onChange={handleNuevaLocalizacionChange} />
              </div>
              <div className="modal-actions">
                <button onClick={crearLocalizacion} className="btn-primary">Crear</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
