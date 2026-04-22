import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

class LocalizacionesService {
  async obtenerLocalizacionesActivas() {
    try {
      const response = await axios.get(`${API_URL}/localizaciones/activas`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async obtenerTodasLasLocalizaciones() {
    try {
      const response = await axios.get(`${API_URL}/localizaciones`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async obtenerLocalizacionPorId(id) {
    try {
      const response = await axios.get(`${API_URL}/localizaciones/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async cambiarActivo(idLocalizacion, activo) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/localizaciones/${idLocalizacion}/activo`,
        activo,
        { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new LocalizacionesService();