import axios from 'axios';

const API_URL = 'http://localhost:8051/api/auth';

class AuthService {
  // Login
  async login(username, password) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password
      });
      
      if (response.data.token) {
        // Guardar token y datos del usuario en localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('nombre', response.data.nombre);
        localStorage.setItem('rol', response.data.rol);
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data?.mensaje || 'Error en el login';
    }
  }

  // Register
  async register(userData) {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      
      if (response.data.token) {
        // Guardar automáticamente después del registro
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('nombre', response.data.nombre);
        localStorage.setItem('rol', response.data.rol);
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data?.mensaje || 'Error en el registro';
    }
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('nombre');
    localStorage.removeItem('rol');
  }

  // Obtener usuario actual
  getCurrentUser() {
    return {
      token: localStorage.getItem('token'),
      username: localStorage.getItem('username'),
      nombre: localStorage.getItem('nombre'),
      rol: localStorage.getItem('rol')
    };
  }

  // Verificar si está autenticado
  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  // Verificar si es admin
  isAdmin() {
    return localStorage.getItem('rol') === 'ADMIN';
  }
}

export default new AuthService();