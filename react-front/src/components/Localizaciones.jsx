import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import localizacionesService from '../services/localizacionesService';
import './Localizaciones.css';

function Localizaciones() {
  const [localizaciones, setLocalizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mapaAmpliado, setMapaAmpliado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    cargarLocalizaciones();
  }, []);

  const cargarLocalizaciones = async () => {
    try {
      setLoading(true);
      const data = await localizacionesService.obtenerLocalizacionesActivas();
      setLocalizaciones(data);
      setLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setError('Error al cargar las localizaciones. Por favor, intenta de nuevo.');
      setLoading(false);
    }
  };

  const formatearHorario = (horaApertura, horarioCierre) => {
    if (!horaApertura || !horarioCierre) return 'Horario no disponible';
    return `${horaApertura.substring(0, 5)} - ${horarioCierre.substring(0, 5)}`;
  };

  const crearGoogleMapsEmbed = (direccion, ciudad) => {
    const direccionCompleta = `${direccion}, ${ciudad}`;
    return `https://www.google.com/maps?q=${encodeURIComponent(direccionCompleta)}&output=embed`;
  };

  if (loading) {
    return (
      <div className="localizaciones-page">
        <section className="hero-localizaciones">
          <div className="hero-overlay">
            <div className="hero-content">
              <h2>Nuestros Restaurantes</h2>
              <p>Encuentra el Sushimi más cercano a ti</p>
            </div>
          </div>
        </section>
        <section className="locations-section">
          <div className="container">
            <div className="loading"><p>Cargando localizaciones...</p></div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="localizaciones-page">
        <section className="hero-localizaciones">
          <div className="hero-overlay">
            <div className="hero-content">
              <h2>Nuestros Restaurantes</h2>
              <p>Encuentra el Sushimi más cercano a ti</p>
            </div>
          </div>
        </section>
        <section className="locations-section">
          <div className="container">
            <div className="error-message"><p>{error}</p></div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="localizaciones-page">
      <section className="hero-localizaciones">
        <div className="hero-overlay">
          <div className="hero-content">
            <h2>Nuestros Restaurantes</h2>
            <p>Encuentra el Sushimi más cercano a ti</p>
          </div>
        </div>
      </section>

      <section className="locations-section">
        <div className="container">
          {localizaciones.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--plata)' }}>
              No hay localizaciones disponibles.
            </p>
          ) : (
            <div className="locations-grid">
              {localizaciones.map(localizacion => (
                <div key={localizacion.idLocalizacion} className="location-card">
                  <div className="location-header">
                    <h3 className="location-name">{localizacion.nombre}</h3>
                    <p className="location-city">{localizacion.ciudad}</p>
                  </div>

                  <div className="location-body">
                    <div className="location-info">
                      <div className="info-row">
                        <span className="info-icon">Ubicación</span>
                        <div className="info-content">
                          <p>{localizacion.direccion}</p>
                        </div>
                      </div>

                      <div className="info-row">
                        <span className="info-icon">Teléfono</span>
                        <div className="info-content">
                          <p>{localizacion.telefono || 'No disponible'}</p>
                        </div>
                      </div>

                      <div className="info-row">
                        <span className="info-icon">Horario</span>
                        <div className="info-content">
                          <p>{formatearHorario(localizacion.horarioApertura, localizacion.horarioCierre)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="location-map" onClick={() => setMapaAmpliado(localizacion)}>
                      <iframe
                        title={`Mapa ${localizacion.nombre}`}
                        src={crearGoogleMapsEmbed(localizacion.direccion, localizacion.ciudad)}
                        width="100%"
                        height="200"
                        style={{ border: 0, borderRadius: '2px', pointerEvents: 'none' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                      <div className="map-overlay-hint">🔍 Click para ampliar</div>
                    </div>
                  </div>

                  <div className="location-footer">
                    <div className="location-status">
                      <span className="status-indicator"></span>
                      <span className="status-text">Abierto ahora</span>
                    </div>
                    <button
                      className="btn-reservar-loc"
                      onClick={() => navigate(`/reservas/${localizacion.idLocalizacion}`)}
                    >
                      Reservar mesa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {mapaAmpliado && (
        <div className="mapa-modal-overlay" onClick={() => setMapaAmpliado(null)}>
          <div className="mapa-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mapa-modal-header">
              <h3>{mapaAmpliado.nombre} — {mapaAmpliado.ciudad}</h3>
              <button className="mapa-modal-cerrar" onClick={() => setMapaAmpliado(null)}>✕</button>
            </div>
            <iframe
              title={`Mapa grande ${mapaAmpliado.nombre}`}
              src={crearGoogleMapsEmbed(mapaAmpliado.direccion, mapaAmpliado.ciudad)}
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Localizaciones;