import React, { useState, useEffect } from 'react';
import platosService from '../services/platosService';
import './Menu.css';

function Menu() {
  const [categorias, setCategorias] = useState([]);
  const [platos, setPlatos] = useState([]);
  const [platosFiltrados, setPlatosFiltrados] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [categoriasData, platosData] = await Promise.all([
        platosService.obtenerCategorias(),
        platosService.obtenerPlatosDisponibles()
      ]);
      
      setCategorias(categoriasData);
      setPlatos(platosData);
      setPlatosFiltrados(platosData);
      setLoading(false);
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError('Error al cargar el menú. Por favor, intenta de nuevo más tarde.');
      setLoading(false);
    }
  };

  const filtrarPorCategoria = (idCategoria) => {
    if (idCategoria === null) {
      setPlatosFiltrados(platos);
      setCategoriaSeleccionada(null);
    } else {
      const filtrados = platos.filter(plato => plato.categoria.idCategoria === idCategoria);
      setPlatosFiltrados(filtrados);
      setCategoriaSeleccionada(idCategoria);
    }
  };

  if (loading) {
    return (
      <div className="menu-page">
        <div className="container">
          <div className="loading-container">
            <p className="loading-text">Cargando menú...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-page">
        <div className="container">
          <div className="error-container">
            <p className="error-text">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-page">
      {/* Header del Menú */}
      <section className="menu-header">
        <div className="container">
          <h1 className="menu-title">Nuestro Menú</h1>
          <p className="menu-subtitle">Descubre nuestra selección de auténtica cocina japonesa</p>
        </div>
      </section>

      {/* Filtros de Categorías */}
      <section className="menu-filters">
        <div className="container">
          <div className="categories-filter">
            <button
              className={`filter-btn ${categoriaSeleccionada === null ? 'active' : ''}`}
              onClick={() => filtrarPorCategoria(null)}
            >
              Todos
            </button>
            {categorias.map(categoria => (
              <button
                key={categoria.idCategoria}
                className={`filter-btn ${categoriaSeleccionada === categoria.idCategoria ? 'active' : ''}`}
                onClick={() => filtrarPorCategoria(categoria.idCategoria)}
              >
                {categoria.nombre}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Platos */}
      <section className="menu-content">
        <div className="container">
          {platosFiltrados.length === 0 ? (
            <div className="no-platos">
              <p>No hay platos disponibles en esta categoría.</p>
            </div>
          ) : (
            <div className="platos-grid">
              {platosFiltrados.map(plato => (
                <div key={plato.idPlato} className="plato-card">
                  <div className="plato-image">
                    <img 
                      src={plato.imagenUrl || 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400'} 
                      alt={plato.nombre}
                      onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400'}
                    />
                    <div className="plato-categoria-badge">
                      {plato.categoria.nombre}
                    </div>
                  </div>
                  <div className="plato-info">
                    <h3 className="plato-nombre">{plato.nombre}</h3>
                    <p className="plato-descripcion">{plato.descripcion || 'Delicioso plato de nuestra carta'}</p>
                    <div className="plato-footer">
                      <span className="plato-precio">{plato.precio.toFixed(2)}€</span>
                      <button className="btn-add-cart">Añadir</button>
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

export default Menu;