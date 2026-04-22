import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

class PlatosService {
  // Obtener todas las categorías ordenadas
  async obtenerCategorias() {
    try {
      const response = await axios.get(`${API_URL}/categorias/ordenadas`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Obtener platos disponibles
  async obtenerPlatosDisponibles() {
    try {
      const response = await axios.get(`${API_URL}/platos/disponibles`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Obtener platos por categoría
  async obtenerPlatosPorCategoria(idCategoria) {
    try {
      const response = await axios.get(`${API_URL}/platos/categoria/${idCategoria}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new PlatosService();