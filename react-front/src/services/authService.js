import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

class AuthService {
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('nombre', response.data.nombre);
        localStorage.setItem('rol', response.data.rol);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('telefono', response.data.telefono || '');
      }
      return response.data;
    } catch (error) {
      throw error.response?.data?.mensaje || 'Error en el login';
    }
  }

  async register(userData) {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('nombre', response.data.nombre);
        localStorage.setItem('rol', response.data.rol);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('telefono', response.data.telefono || '');
      }
      return response.data;
    } catch (error) {
      throw error.response?.data?.mensaje || 'Error en el registro';
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('nombre');
    localStorage.removeItem('rol');
    localStorage.removeItem('email');
    localStorage.removeItem('telefono');
  }

  getCurrentUser() {
    return {
      token: localStorage.getItem('token'),
      username: localStorage.getItem('username'),
      nombre: localStorage.getItem('nombre'),
      rol: localStorage.getItem('rol'),
      email: localStorage.getItem('email'),
      telefono: localStorage.getItem('telefono')
    };
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  isAdmin() {
    return localStorage.getItem('rol') === 'ADMIN';
  }
}

export default new AuthService();