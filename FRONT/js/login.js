// ========================================
// 1. CONFIGURACIÓN INICIAL
// ========================================

const API_URL = 'http://localhost:8080/api';

// Referencias a elementos del DOM
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');


// ========================================
// 2. VERIFICAR SI YA ESTÁ LOGUEADO
// ========================================

// Al cargar la página, verificar si ya hay un token guardado
window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');
    
    if (token && rol) {
        // Si ya está logueado, redirigir según el rol
        redirigirSegunRol(rol);
    }
});


// ========================================
// 3. MANEJAR EL LOGIN
// ========================================

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitar recargar la página
    
    // Ocultar mensajes de error previos
    errorMessage.style.display = 'none';
    
    // Obtener datos del formulario
    const loginData = {
        username: usernameInput.value.trim(),
        password: passwordInput.value
    };
    
    try {
        // Hacer petición POST al endpoint de login
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });
        
        // Si la respuesta no es exitosa
        if (!response.ok) {
            const errorText = await response.text();
            mostrarError(errorText || 'Usuario o contraseña incorrectos');
            return;
        }
        
        // Obtener los datos de la respuesta
        const data = await response.json();
        
        // Guardar el token y la información del usuario en localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('nombre', data.nombre);
        localStorage.setItem('rol', data.rol);
        
        // Redirigir según el rol
        redirigirSegunRol(data.rol);
        
    } catch (error) {
        console.error('Error:', error);
        mostrarError('Error al conectar con el servidor. Intenta de nuevo.');
    }
});


// ========================================
// 4. REDIRIGIR SEGÚN EL ROL
// ========================================

function redirigirSegunRol(rol) {
    if (rol === 'ADMIN') {
        // Si es administrador, ir al panel de admin
        window.location.href = 'admin.html';
    } else {
        // Si es cliente, ir a la página principal
        window.location.href = 'index.html';
    }
}


// ========================================
// 5. MOSTRAR MENSAJE DE ERROR
// ========================================

function mostrarError(mensaje) {
    errorMessage.textContent = mensaje;
    errorMessage.style.display = 'block';
}


// ========================================
// 6. MENSAJE DE CONSOLA
// ========================================

console.log('Login.js cargado correctamente');