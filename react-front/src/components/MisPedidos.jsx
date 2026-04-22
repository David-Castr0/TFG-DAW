import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './MisPedidos.css';

function MisPedidos() {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pedidoAbierto, setPedidoAbierto] = useState(null);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    try {
      const token = localStorage.getItem('token');
      const [pedidosData] = await Promise.all([
        fetch('http://localhost:8080/api/pedidos/mis-pedidos', {
          headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => res.json())
      ]);

      // Cargar detalles de cada pedido
      const pedidosConDetalles = await Promise.all(
        pedidosData
          .filter(p => p.tipoPedido === 'domicilio')
          .map(async (pedido) => {
            const detalles = await fetch(`http://localhost:8080/api/detalle-pedidos/pedido/${pedido.idPedido}`, {
              headers: { 'Authorization': `Bearer ${token}` }
            }).then(res => res.json());
            return { ...pedido, detalles };
          })
      );

      setPedidos(pedidosConDetalles);
    } catch (err) {
      console.error('Error al cargar pedidos:', err);
    } finally {
      setLoading(false);
    }
  };

  const getEstadoInfo = (estado) => {
    const estados = {
      recibido:       { texto: 'Recibido',        clase: 'estado-recibido',       icono: '📋', paso: 0 },
      en_preparacion: { texto: 'En preparación',  clase: 'estado-preparacion',    icono: '🍳', paso: 1 },
      en_camino:      { texto: 'En camino',        clase: 'estado-camino',         icono: '🛵', paso: 2 },
      entregado:      { texto: 'Entregado',        clase: 'estado-entregado',      icono: '📦', paso: 3 },
      finalizado:     { texto: 'Finalizado',       clase: 'estado-finalizado',     icono: '✅', paso: 3 },
    };
    return estados[estado] || { texto: estado, clase: '', icono: '❓', paso: 0 };
  };

  const formatearFechaHora = (fechaHora) => {
    if (!fechaHora) return '-';
    const d = new Date(fechaHora);
    return `${d.toLocaleDateString('es-ES')} ${d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
  };

  if (loading) {
    return (
      <div className="mis-pedidos-page">
        <div className="container"><p className="loading-text">Cargando tus pedidos...</p></div>
      </div>
    );
  }

  return (
    <div className="mis-pedidos-page">
      <section className="mis-pedidos-header">
        <div className="container">
          <h1>Mis Pedidos</h1>
          <p>Historial y seguimiento de tus pedidos a domicilio</p>
        </div>
      </section>

      <div className="container">
        {pedidos.length === 0 ? (
          <div className="no-pedidos">
            <h3>Aún no tienes pedidos</h3>
            <p>Cuando hagas tu primer pedido aparecerá aquí.</p>
            <button className="btn-ir-menu" onClick={() => navigate('/menu')}>Ir al menú</button>
          </div>
        ) : (
          <div className="pedidos-lista">
            {pedidos.map(pedido => {
              const estadoInfo = getEstadoInfo(pedido.estado);
              const total = pedido.detalles?.reduce((acc, d) => acc + d.plato.precio * d.cantidad, 0) || 0;
              const abierto = pedidoAbierto === pedido.idPedido;

              return (
                <div key={pedido.idPedido} className={`pedido-card ${abierto ? 'abierto' : ''}`}>
                  <div className="pedido-card-header" onClick={() => setPedidoAbierto(abierto ? null : pedido.idPedido)}>
                    <div className="pedido-card-left">
                      <span className="pedido-numero">Pedido #{pedido.idPedido}</span>
                      <span className="pedido-fecha">{formatearFechaHora(pedido.fechaHoraInicio)}</span>
                    </div>
                    <div className="pedido-card-right">
                      <span className="pedido-total-mini">{total.toFixed(2)}€</span>
                      <span className={`estado-badge-pedido ${estadoInfo.clase}`}>
                        {estadoInfo.icono} {estadoInfo.texto}
                      </span>
                      <span className="pedido-toggle">{abierto ? '▲' : '▼'}</span>
                    </div>
                  </div>

                  {abierto && (
                    <div className="pedido-card-body">

                      {/* Barra de progreso del estado */}
                      {pedido.estado !== 'finalizado' && (
                        <div className="pedido-progreso">
                          {['recibido', 'en_preparacion', 'en_camino', 'entregado'].map((e, i) => {
                            const info = getEstadoInfo(e);
                            const activo = estadoInfo.paso >= i;
                            return (
                              <React.Fragment key={e}>
                                <div className={`progreso-estado ${activo ? 'activo' : ''}`}>
                                  <div className="progreso-estado-icono">{info.icono}</div>
                                  <span>{info.texto}</span>
                                </div>
                                {i < 3 && <div className={`progreso-estado-linea ${estadoInfo.paso > i ? 'activo' : ''}`} />}
                              </React.Fragment>
                            );
                          })}
                        </div>
                      )}

                      {/* Datos de entrega */}
                      <div className="pedido-datos-entrega">
                        <p><strong>Dirección:</strong> {pedido.direccionEntrega}</p>
                        <p><strong>Pago:</strong> {pedido.metodoPago === 'efectivo' ? '💵 Efectivo' : '💳 Tarjeta'}</p>
                        {pedido.notasPedido && <p><strong>Notas:</strong> {pedido.notasPedido}</p>}
                      </div>

                      {/* Platos */}
                      <div className="pedido-platos">
                        {pedido.detalles?.map(detalle => (
                          <div key={detalle.idDetalle} className="pedido-plato-item">
                            <span className="pedido-plato-nombre">{detalle.plato.nombre}</span>
                            <span className="pedido-plato-cantidad">x{detalle.cantidad}</span>
                            <span className="pedido-plato-precio">{(detalle.plato.precio * detalle.cantidad).toFixed(2)}€</span>
                          </div>
                        ))}
                        <div className="pedido-platos-total">
                          <span>Total</span>
                          <span>{total.toFixed(2)}€</span>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MisPedidos;