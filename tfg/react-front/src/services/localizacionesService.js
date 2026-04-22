import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

class LocalizacionesService {
  // Obtener todas las localizaciones activas
  async obtenerLocalizacionesActivas() {
    try {
      const response = await axios.get(`${API_URL}/localizaciones/activas`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Obtener todas las localizaciones
  async obtenerTodasLasLocalizaciones() {
    try {
      const response = await axios.get(`${API_URL}/localizaciones`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Obtener localización por ID
  async obtenerLocalizacionPorId(id) {
    try {
      const response = await axios.get(`${API_URL}/localizaciones/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new LocalizacionesService();