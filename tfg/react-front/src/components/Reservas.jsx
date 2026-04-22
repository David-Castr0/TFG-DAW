import React, { useState, useEffect } from 'react';
import localizacionesService from '../services/localizacionesService';
import ReservasService from '../services/reservasService';
import './Reservas.css';


function Reservas() {
  const reservasService = new ReservasService(); 
  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    idLocalizacion: '',
    idMesa: '',
    fechaReserva: '',
    horaReserva: '',
    numPersonas: '',
    notas: ''
  });

  // Estados de datos
  const [localizaciones, setLocalizaciones] = useState([]);
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mesasDisabled, setMesasDisabled] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [reservaConfirmada, setReservaConfirmada] = useState(null);

  // Cargar localizaciones al montar el componente
  useEffect(() => {
    cargarLocalizaciones();
    establecerFechaMinima();
  }, []);

  const cargarLocalizaciones = async () => {
    try {
      const data = await localizacionesService.obtenerLocalizacionesActivas();
      setLocalizaciones(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar las localizaciones. Por favor, recarga la página.');
    }
  };

  const establecerFechaMinima = () => {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    const fechaMinima = `${año}-${mes}-${dia}`;
    
    setFormData(prev => ({ ...prev, fechaReserva: fechaMinima }));
  };

  const handleLocalizacionChange = async (e) => {
    const idLocalizacion = e.target.value;
    
    setFormData(prev => ({ ...prev, idLocalizacion, idMesa: '' }));
    setMesas([]);
    setMesasDisabled(true);

    if (!idLocalizacion) return;

    try {
      const mesasData = await reservasService.obtenerMesasLibresPorLocalizacion(idLocalizacion);
      setMesas(mesasData);
      setMesasDisabled(mesasData.length === 0);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar las mesas.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const reservaData = {
      mesa: {
        idMesa: parseInt(formData.idMesa)
      },
      localizacion: {
        idLocalizacion: parseInt(formData.idLocalizacion)
      },
      nombreCliente: `${formData.nombre} ${formData.apellidos}`,
      telefonoCliente: formData.telefono,
      emailCliente: formData.email,
      fechaReserva: formData.fechaReserva,
      horaReserva: formData.horaReserva + ':00',
      numPersonas: parseInt(formData.numPersonas),
      notas: formData.notas || null,
      estado: 'pendiente'
    };

    try {
      const reserva = await reservasService.crearReserva(reservaData);
      setReservaConfirmada(reserva);
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear la reserva. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleNuevaReserva = () => {
    setShowConfirmation(false);
    setReservaConfirmada(null);
    setFormData({
      nombre: '',
      apellidos: '',
      telefono: '',
      email: '',
      idLocalizacion: '',
      idMesa: '',
      fechaReserva: '',
      horaReserva: '',
      numPersonas: '',
      notas: ''
    });
    establecerFechaMinima();
  };

  const getNombreLocalizacion = (idLocalizacion) => {
    const loc = localizaciones.find(l => l.idLocalizacion === parseInt(idLocalizacion));
    return loc ? loc.nombre : 'Restaurante';
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES');
  };

  return (
    <div className="reservas-page">
      <section className="hero-reservas">
          <div className="hero-content">
            <h2>Reserva tu Mesa</h2>
            <p>Asegura tu experiencia gastronómica japonesa</p>
          </div>
      </section>

      {/* Formulario o Confirmación */}
      <section className="reservation-section">
        <div className="container">
          <div className="reservation-form-container">
            {!showConfirmation ? (
              <form onSubmit={handleSubmit} className="reservation-form">
                <h3 className="form-title">Datos de la Reserva</h3>

                {/* Información Personal */}
                <div className="form-section">
                  <h4 className="section-title">Información Personal</h4>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="nombre">Nombre *</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        placeholder="Juan"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="apellidos">Apellidos *</label>
                      <input
                        type="text"
                        id="apellidos"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleInputChange}
                        placeholder="García López"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="telefono">Teléfono *</label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        pattern="[0-9]{9}"
                        title="Introduce un teléfono válido de 9 dígitos"
                        placeholder="612345678"
                        maxLength="9"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Detalles de la Reserva */}
                <div className="form-section">
                  <h4 className="section-title">Detalles de la Reserva</h4>

                  <div className="form-group">
                    <label htmlFor="idLocalizacion">Restaurante *</label>
                    <select
                      id="idLocalizacion"
                      name="idLocalizacion"
                      value={formData.idLocalizacion}
                      onChange={handleLocalizacionChange}
                      required
                    >
                      <option value="">Selecciona un restaurante</option>
                      {localizaciones.map(loc => (
                        <option key={loc.idLocalizacion} value={loc.idLocalizacion}>
                          {loc.nombre} - {loc.ciudad}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="idMesa">Mesa *</label>
                    <select
                      id="idMesa"
                      name="idMesa"
                      value={formData.idMesa}
                      onChange={handleInputChange}
                      disabled={mesasDisabled}
                      required
                    >
                      <option value="">
                        {!formData.idLocalizacion 
                          ? 'Primero selecciona un restaurante'
                          : mesas.length === 0
                          ? 'No hay mesas disponibles'
                          : 'Selecciona una mesa'
                        }
                      </option>
                      {mesas.map(mesa => (
                        <option key={mesa.idMesa} value={mesa.idMesa}>
                          Mesa {mesa.numeroMesa} - Capacidad: {mesa.capacidad} personas
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="fechaReserva">Fecha *</label>
                      <input
                        type="date"
                        id="fechaReserva"
                        name="fechaReserva"
                        value={formData.fechaReserva}
                        onChange={handleInputChange}
                        min={formData.fechaReserva}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="horaReserva">Hora *</label>
                      <input
                        type="time"
                        id="horaReserva"
                        name="horaReserva"
                        value={formData.horaReserva}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="numPersonas">Número de Personas *</label>
                    <input
                      type="number"
                      id="numPersonas"
                      name="numPersonas"
                      value={formData.numPersonas}
                      onChange={handleInputChange}
                      min="1"
                      max="20"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="notas">Notas Especiales (opcional)</label>
                    <textarea
                      id="notas"
                      name="notas"
                      value={formData.notas}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Alergias, peticiones especiales, etc."
                    />
                  </div>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Confirmando...' : 'Confirmar Reserva'}
                </button>
              </form>
            ) : (
              /* Mensaje de Confirmación */
              <div className="confirmation-message">
                <div className="confirmation-icon">✓</div>
                <h3>¡Reserva Confirmada!</h3>
                <p>Hemos recibido tu reserva correctamente.</p>
                <div className="confirmation-details">
                  <strong>Restaurante:</strong> {getNombreLocalizacion(reservaConfirmada.localizacion.idLocalizacion)}<br />
                  <strong>Fecha:</strong> {formatearFecha(reservaConfirmada.fechaReserva)}<br />
                  <strong>Hora:</strong> {reservaConfirmada.horaReserva.substring(0, 5)}<br />
                  <strong>Personas:</strong> {reservaConfirmada.numPersonas}<br />
                  <strong>Nombre:</strong> {reservaConfirmada.nombreCliente}
                </div>
                <button className="btn-secondary" onClick={handleNuevaReserva}>
                  Hacer otra reserva
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Reservas;