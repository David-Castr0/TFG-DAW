import React, { useState, useEffect } from 'react';
import localizacionesService from '../services/localizacionesService';
import './Localizaciones.css';

function Localizaciones() {
  const [localizaciones, setLocalizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    // De "12:00:00" a "12:00"
    return `${horaApertura.substring(0, 5)} - ${horarioCierre.substring(0, 5)}`;
  };

  const crearGoogleMapsUrl = (direccion, ciudad) => {
    const direccionCompleta = `${direccion}, ${ciudad}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccionCompleta)}`;
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
            <div className="loading">
              <p>Cargando localizaciones...</p>
            </div>
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
            <div className="error-message">
              <p>{error}</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="localizaciones-page">
      {/* Hero Section */}
      <section className="hero-localizaciones">
        <div className="hero-overlay">
          <div className="hero-content">
            <h2>Nuestros Restaurantes</h2>
            <p>Encuentra el Sushimi más cercano a ti</p>
          </div>
        </div>
      </section>

      {/* Sección de Localizaciones */}
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
                  {/* Header */}
                  <div className="location-header">
                    <h3 className="location-name">{localizacion.nombre}</h3>
                    <p className="location-city">{localizacion.ciudad}</p>
                  </div>

                  {/* Body */}
                  <div className="location-body">
                    <div className="location-info">
                      {/* Ubicación */}
                      <div className="info-row">
                        <span className="info-icon">Ubicación</span>
                        <div className="info-content">
                          <p>{localizacion.direccion}</p>
                          <a 
                            href={crearGoogleMapsUrl(localizacion.direccion, localizacion.ciudad)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="maps-btn"
                          >
                            Ver en Google Maps
                          </a>
                        </div>
                      </div>

                      {/* Teléfono */}
                      <div className="info-row">
                        <span className="info-icon">Teléfono</span>
                        <div className="info-content">
                          <p>{localizacion.telefono || 'No disponible'}</p>
                        </div>
                      </div>

                      {/* Horario */}
                      <div className="info-row">
                        <span className="info-icon">Horario</span>
                        <div className="info-content">
                          <p>{formatearHorario(localizacion.horarioApertura, localizacion.horarioCierre)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="location-footer">
                    <div className="location-status">
                      <span className="status-indicator"></span>
                      <span className="status-text">Abierto ahora</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Localizaciones;