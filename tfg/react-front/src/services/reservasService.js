import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

class ReservasService {
  // Crear nueva reserva
  async crearReserva(reservaData) {
    try {
      const response = await axios.post(`${API_URL}/reservas`, reservaData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Obtener mesas libres por localización
  async obtenerMesasLibresPorLocalizacion(idLocalizacion) {
    try {
      const response = await axios.get(`${API_URL}/mesas/localizacion/${idLocalizacion}/libres`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Obtener todas las reservas (para mis-reservas)
  async obtenerReservasPorUsuario(idUsuario) {
    try {
      const response = await axios.get(`${API_URL}/reservas/usuario/${idUsuario}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Obtener reservas por email
  async obtenerReservasPorEmail(email) {
    try {
      const response = await axios.get(`${API_URL}/reservas`);
      const todasLasReservas = response.data;
      
      // Filtrar por email y solo futuras
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      
      const reservasDelCliente = todasLasReservas.filter(reserva => {
        const emailCoincide = reserva.emailCliente.toLowerCase() === email.toLowerCase();
        const fechaReserva = new Date(reserva.fechaReserva);
        const esFutura = fechaReserva >= hoy;
        const noEstaCancelada = reserva.estado !== 'cancelada';
        
        return emailCoincide && esFutura && noEstaCancelada;
      });
      
      // Ordenar por fecha
      return reservasDelCliente.sort((a, b) => {
        const fechaA = new Date(a.fechaReserva + 'T' + a.horaReserva);
        const fechaB = new Date(b.fechaReserva + 'T' + b.horaReserva);
        return fechaA - fechaB;
      });
    } catch (error) {
      throw error;
    }
  }

  // Cancelar reserva
  async cancelarReserva(idReserva) {
    try {
      const response = await axios.put(`${API_URL}/reservas/${idReserva}/estado`, 'cancelada', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
export default ReservasService;