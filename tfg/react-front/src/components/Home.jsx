import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar especialidades al montar el componente
  useEffect(() => {
    cargarEspecialidades();
    animarNumeros();
  }, []);

  const cargarEspecialidades = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/platos');
      const platos = response.data;
      
      // Seleccionar 6 especialidades (2 de cada categoría principal)
      const disponibles = platos.filter(p => p.disponible);
      const sushi = disponibles.filter(p => p.categoria.nombre === 'Sushi').slice(0, 2);
      const especiales = disponibles.filter(p => p.categoria.nombre === 'Especiales').slice(0, 2);
      const sashimi = disponibles.filter(p => p.categoria.nombre === 'Sashimi').slice(0, 1);
      const makis = disponibles.filter(p => p.categoria.nombre === 'Makis').slice(0, 1);
      
      setEspecialidades([...sushi, ...especiales, ...sashimi, ...makis].slice(0, 6));
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar especialidades:', error);
      setLoading(false);
    }
  };

  const animarNumeros = () => {
    // Animación de números (se puede mejorar con useRef)
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      const increment = target / 100;
      let current = 0;
      
      const updateCount = () => {
        if (current < target) {
          current += increment;
          stat.textContent = Math.ceil(current);
          setTimeout(updateCount, 20);
        } else {
          stat.textContent = target;
        }
      };
      
      updateCount();
    });
  };

  const scrollToAbout = () => {
    document.querySelector('.about')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Experiencia Japonesa Auténtica</h1>
          <p className="hero-subtitle">Descubre el verdadero sabor de Japón en cada bocado</p>
          <div className="hero-buttons">
            <a href="/menu" className="btn-primary">Ver Menú</a>
            <a href="/reservas" className="btn-secondary">Reservar Mesa</a>
          </div>
        </div>
        <div className="scroll-indicator" onClick={scrollToAbout}>
          <span>Descubre más</span>
          <div className="arrow-down"></div>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section className="about">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Nuestra Historia</span>
            <h2 className="section-title">Tradición y Calidad desde 2025</h2>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p className="lead">
                En Sushimi, combinamos la auténtica tradición culinaria japonesa con ingredientes frescos de la más alta calidad.
              </p>
              <p>
                Nuestros chefs, formados en las mejores escuelas de Tokio, preparan cada plato con dedicación y respeto por las técnicas milenarias. 
                Desde el sushi más delicado hasta los robustos ramen, cada bocado es una experiencia única.
              </p>
              <p>
                Con 9 localizaciones en toda España, llevamos la esencia de Japón a tu ciudad, manteniendo siempre los más altos estándares de frescura, sabor y presentación.
              </p>
              <div className="stats">
                <div className="stat-item">
                  <span className="stat-number" data-target="9">0</span>
                  <span className="stat-label">Restaurantes</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number" data-target="50">0</span>+
                  <span className="stat-label">Platos Únicos</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number" data-target="100">0</span>%
                  <span className="stat-label">Ingredientes Frescos</span>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=800&fit=crop" alt="Chef preparando sushi" />
            </div>
          </div>
        </div>
      </section>

      {/* Especialidades */}
      <section className="specialties">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Lo Mejor de Nuestra Carta</span>
            <h2 className="section-title">Especialidades de la Casa</h2>
          </div>
          <div className="specialties-grid">
            {loading ? (
              <div className="loading">Cargando especialidades...</div>
            ) : (
              especialidades.map(plato => (
                <div key={plato.idPlato} className="specialty-card">
                  <div className="specialty-image">
                    <img 
                      src={plato.imagenUrl || 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400'} 
                      alt={plato.nombre}
                      onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400'}
                    />
                  </div>
                  <div className="specialty-info">
                    <h3 className="specialty-name">{plato.nombre}</h3>
                    <p className="specialty-description">{plato.descripcion || 'Delicioso plato de nuestra carta'}</p>
                    <p className="specialty-price">{plato.precio.toFixed(2)}€</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="section-footer">
            <a href="/menu" className="btn-primary">Ver Menú Completo</a>
          </div>
        </div>
      </section>

      {/* Galería */}
      <section className="gallery">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Nuestro Ambiente</span>
            <h2 className="section-title">Galería</h2>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=400&fit=crop" alt="Sushi variado" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=400&h=400&fit=crop" alt="Nigiri de atún" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=400&h=400&fit=crop" alt="Ramen humeante" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&h=400&fit=crop" alt="Interior del restaurante" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&h=400&fit=crop" alt="Preparación de sushi" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=400&h=400&fit=crop" alt="Mochi tradicional" />
            </div>
          </div>
        </div>
      </section>

      {/* Por Qué Elegirnos */}
      <section className="why-us">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Nuestros Valores</span>
            <h2 className="section-title">¿Por Qué Elegirnos?</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <img src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200&h=200&fit=crop" alt="Pescado fresco" />
              </div>
              <h3>Frescura Garantizada</h3>
              <p>Ingredientes seleccionados diariamente. Pescado fresco del mercado cada mañana.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop" alt="Chef experto" />
              </div>
              <h3>Chefs Expertos</h3>
              <p>Maestros formados en Japón con más de 15 años de experiencia en alta cocina.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop" alt="Ambiente auténtico" />
              </div>
              <h3>Ambiente Auténtico</h3>
              <p>Decoración tradicional japonesa que te transportará directamente a Tokio.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop" alt="Servicio excelente" />
              </div>
              <h3>Servicio Excelente</h3>
              <p>Atención personalizada y profesional. Tu satisfacción es nuestra prioridad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>¿Listo para una Experiencia Única?</h2>
            <p>Reserva tu mesa ahora y descubre por qué somos el restaurante japonés favorito</p>
            <a href="/reservas" className="btn-cta">Reservar Ahora</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;