import React from 'react';

function Home() {
  return (
    <div className="home">
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
      </section>
      
      <section className="about">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Nuestra Historia</span>
            <h2 className="section-title">Tradición y Calidad desde 2025</h2>
          </div>
          <div className="about-content">
            <p>En Sushimi, combinamos la auténtica tradición culinaria japonesa con ingredientes frescos de la más alta calidad.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;