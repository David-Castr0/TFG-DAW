import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

class PlatosService {
  async obtenerCategorias() {
    try {
      const response = await axios.get(`${API_URL}/categorias/ordenadas`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async obtenerPlatosDisponibles() {
    try {
      const response = await axios.get(`${API_URL}/platos/disponibles`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async obtenerTodosLosPlatos() {
    try {
      const response = await axios.get(`${API_URL}/platos`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async obtenerPlatosPorCategoria(idCategoria) {
    try {
      const response = await axios.get(`${API_URL}/platos/categoria/${idCategoria}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async cambiarDisponibilidad(idPlato, disponible) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/platos/${idPlato}/disponibilidad`,
        disponible,
        { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new PlatosService();