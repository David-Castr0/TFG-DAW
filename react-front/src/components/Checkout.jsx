import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './Checkout.css';

function Checkout({ carrito, setCarrito }) {
  const navigate = useNavigate();
  const [paso, setPaso] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pedidoConfirmado, setPedidoConfirmado] = useState(null);

  const user = authService.getCurrentUser();

const [formData, setFormData] = useState({
  nombreCliente: user?.nombre || '',
  telefonoCliente: user?.telefono || '',
  direccionEntrega: '',
  notas: '',
  metodoPago: ''
});

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
    }
    if (carrito.length === 0 && !pedidoConfirmado) {
      navigate('/menu');
    }
  }, []);

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const siguientePaso = () => {
    if (paso === 1) {
      if (!formData.nombreCliente || !formData.telefonoCliente || !formData.direccionEntrega) {
        alert('Por favor rellena todos los campos obligatorios.');
        return;
      }
    }
    setPaso(prev => prev + 1);
  };

  const anteriorPaso = () => setPaso(prev => prev - 1);

  const confirmarPedido = async () => {
    if (!formData.metodoPago) {
      alert('Por favor selecciona un método de pago.');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const body = {
        nombreCliente: formData.nombreCliente,
        telefonoCliente: formData.telefonoCliente,
        direccionEntrega: formData.direccionEntrega,
        notas: formData.notas,
        metodoPago: formData.metodoPago,
        items: carrito.map(item => ({ idPlato: item.idPlato, cantidad: item.cantidad }))
      };

      const response = await fetch('http://localhost:8080/api/pedidos/domicilio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const pedido = await response.json();
        setPedidoConfirmado(pedido);
        setCarrito([]);
        setPaso(4);
      } else {
        alert('Error al procesar el pedido. Inténtalo de nuevo.');
      }
    } catch (err) {
      alert('Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">

        {paso < 4 && (
          <div className="checkout-progreso">
            <div className={`progreso-paso ${paso >= 1 ? 'activo' : ''}`}>
              <div className="progreso-numero">1</div>
              <span>Tus datos</span>
            </div>
            <div className="progreso-linea" />
            <div className={`progreso-paso ${paso >= 2 ? 'activo' : ''}`}>
              <div className="progreso-numero">2</div>
              <span>Tu pedido</span>
            </div>
            <div className="progreso-linea" />
            <div className={`progreso-paso ${paso >= 3 ? 'activo' : ''}`}>
              <div className="progreso-numero">3</div>
              <span>Pago</span>
            </div>
          </div>
        )}

        {/* PASO 1 */}
        {paso === 1 && (
          <div className="checkout-card">
            <h2>¿Dónde entregamos tu pedido?</h2>
            <p className="checkout-subtitulo">Rellena tus datos para la entrega a domicilio</p>
            <div className="checkout-form">
              <div className="checkout-field">
                <label>Nombre completo *</label>
                <input type="text" name="nombreCliente" value={formData.nombreCliente} onChange={handleChange} placeholder="Tu nombre" />
              </div>
              <div className="checkout-field">
                <label>Teléfono *</label>
                <input type="tel" name="telefonoCliente" value={formData.telefonoCliente} onChange={handleChange} placeholder="600 000 000" />
              </div>
              <div className="checkout-field">
                <label>Dirección de entrega *</label>
                <input type="text" name="direccionEntrega" value={formData.direccionEntrega} onChange={handleChange} placeholder="Calle, número, piso..." />
              </div>
              <div className="checkout-field">
                <label>Notas para el repartidor</label>
                <textarea name="notas" value={formData.notas} onChange={handleChange} placeholder="Ej: Timbre roto, llamar por teléfono..." rows="3" />
              </div>
            </div>
            <div className="checkout-acciones">
              <button className="btn-checkout-secondary" onClick={() => navigate('/menu')}>← Volver al menú</button>
              <button className="btn-checkout-primary" onClick={siguientePaso}>Siguiente →</button>
            </div>
          </div>
        )}

        {/* PASO 2 */}
        {paso === 2 && (
          <div className="checkout-card">
            <h2>Resumen de tu pedido</h2>
            <p className="checkout-subtitulo">Confirma que todo está correcto</p>
            <div className="checkout-resumen-datos">
              <p><strong>Entregar a:</strong> {formData.nombreCliente}</p>
              <p><strong>Teléfono:</strong> {formData.telefonoCliente}</p>
              <p><strong>Dirección:</strong> {formData.direccionEntrega}</p>
              {formData.notas && <p><strong>Notas:</strong> {formData.notas}</p>}
            </div>
            <div className="checkout-lista-platos">
              {carrito.map(item => (
                <div key={item.idPlato} className="checkout-plato-item">
                  <span className="checkout-plato-nombre">{item.nombre}</span>
                  <span className="checkout-plato-cantidad">x{item.cantidad}</span>
                  <span className="checkout-plato-precio">{(item.precio * item.cantidad).toFixed(2)}€</span>
                </div>
              ))}
            </div>
            <div className="checkout-total">
              <span>Total</span>
              <span>{total.toFixed(2)}€</span>
            </div>
            <div className="checkout-acciones">
              <button className="btn-checkout-secondary" onClick={anteriorPaso}>← Atrás</button>
              <button className="btn-checkout-primary" onClick={siguientePaso}>Ir al pago →</button>
            </div>
          </div>
        )}

        {/* PASO 3 */}
        {paso === 3 && (
          <div className="checkout-card">
            <h2>¿Cómo vas a pagar?</h2>
            <p className="checkout-subtitulo">Selecciona tu método de pago</p>
            <div className="checkout-metodos-pago">
              <div
                className={`metodo-pago-card ${formData.metodoPago === 'efectivo' ? 'seleccionado' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, metodoPago: 'efectivo' }))}
              >
                <span className="metodo-icono">💵</span>
                <div>
                  <p className="metodo-nombre">Efectivo</p>
                  <p className="metodo-descripcion">Paga al repartidor cuando llegue</p>
                </div>
              </div>
              <div className="metodo-pago-card metodo-deshabilitado">
                <span className="metodo-icono">💳</span>
                <div>
                  <p className="metodo-nombre">Tarjeta</p>
                  <p className="metodo-descripcion metodo-fuera-servicio">Temporalmente fuera de servicio</p>
                </div>
              </div>
            </div>
            <div className="checkout-total">
              <span>Total a pagar</span>
              <span>{total.toFixed(2)}€</span>
            </div>
            <div className="checkout-acciones">
              <button className="btn-checkout-secondary" onClick={anteriorPaso}>← Atrás</button>
              <button className="btn-checkout-primary" onClick={confirmarPedido} disabled={loading || !formData.metodoPago}>
                {loading ? 'Procesando...' : 'Confirmar pedido'}
              </button>
            </div>
          </div>
        )}

        {/* PASO 4 — Confirmación */}
        {paso === 4 && pedidoConfirmado && (
          <div className="checkout-card checkout-confirmacion">
            <div className="confirmacion-icono">✅</div>
            <h2>¡Pedido confirmado!</h2>
            <p className="checkout-subtitulo">Tu pedido #{pedidoConfirmado.idPedido} ha sido recibido correctamente.</p>
            <div className="checkout-resumen-datos">
              <p><strong>Entregar a:</strong> {pedidoConfirmado.nombreCliente}</p>
              <p><strong>Dirección:</strong> {pedidoConfirmado.direccionEntrega}</p>
              <p><strong>Pago:</strong> {pedidoConfirmado.metodoPago === 'efectivo' ? '💵 Efectivo al repartidor' : '💳 Tarjeta'}</p>
            </div>
            <div className="confirmacion-estados">
              <p className="confirmacion-estado-titulo">Estado de tu pedido:</p>
              <div className="confirmacion-pasos">
                <div className="confirmacion-paso activo">✅ Recibido</div>
                <div className="confirmacion-paso">🍳 En preparación</div>
                <div className="confirmacion-paso">🛵 En camino</div>
                <div className="confirmacion-paso">📦 Entregado</div>
              </div>
            </div>
            <p className="confirmacion-mensaje">Puedes seguir el estado de tu pedido en <strong>Mis Pedidos</strong>. ¡Gracias por elegir Sushimi! 🍣</p>
            <div className="checkout-acciones" style={{ justifyContent: 'center', gap: '1rem' }}>
              <button className="btn-checkout-secondary" onClick={() => navigate('/mis-pedidos')}>Ver mis pedidos</button>
              <button className="btn-checkout-primary" onClick={() => navigate('/')}>Volver al inicio</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;