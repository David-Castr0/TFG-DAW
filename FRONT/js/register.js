// ========================================
// 1. CONFIGURACIÓN INICIAL
// ========================================

const API_URL = 'http://localhost:8080/api';

// Referencias a elementos del DOM
const registerForm = document.getElementById('registerForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const nombreInput = document.getElementById('nombre');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');


// ========================================
// 2. VERIFICAR SI YA ESTÁ LOGUEADO
// ========================================

// Al cargar la página, verificar si ya hay un token guardado
window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');
    
    if (token && rol) {
        // Si ya está logueado, redirigir según el rol
        if (rol === 'ADMIN') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'index.html';
        }
    }
});


// ========================================
// 3. VALIDACIÓN DE CONTRASEÑAS
// ========================================

function validarFormulario() {
    // Ocultar mensajes previos
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
    
    // Verificar que las contraseñas coincidan
    if (passwordInput.value !== confirmPasswordInput.value) {
        mostrarError('Las contraseñas no coinciden');
        return false;
    }
    
    // Verificar longitud mínima de la contraseña
    if (passwordInput.value.length < 6) {
        mostrarError('La contraseña debe tener al menos 6 caracteres');
        return false;
    }
    
    // Verificar longitud mínima del username
    if (usernameInput.value.length < 3) {
        mostrarError('El nombre de usuario debe tener al menos 3 caracteres');
        return false;
    }
    
    return true;
}


// ========================================
// 4. MANEJAR EL REGISTRO
// ========================================

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitar recargar la página
    
    // Validar formulario
    if (!validarFormulario()) {
        return;
    }
    
    // Deshabilitar el botón mientras se procesa
    const submitButton = registerForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Creando cuenta...';
    
    // Obtener datos del formulario
    const registerData = {
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        nombre: nombreInput.value.trim(),
        password: passwordInput.value,
        rol: 'CLIENTE' // Por defecto todos se registran como CLIENTE
    };
    
    try {
        // Hacer petición POST al endpoint de registro
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });
        
        // Si la respuesta no es exitosa
        if (!response.ok) {
            const errorText = await response.text();
            mostrarError(errorText || 'Error al crear la cuenta');
            submitButton.disabled = false;
            submitButton.textContent = 'Crear Cuenta';
            return;
        }
        
        // Obtener los datos de la respuesta
        const data = await response.json();
        
        // Guardar el token y la información del usuario en localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('nombre', data.nombre);
        localStorage.setItem('rol', data.rol);
        
        // Mostrar mensaje de éxito
        mostrarExito('¡Cuenta creada correctamente! Redirigiendo...');
        
        // Esperar 2 segundos y redirigir
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        
    } catch (error) {
        console.error('Error:', error);
        mostrarError('Error al conectar con el servidor. Intenta de nuevo.');
        submitButton.disabled = false;
        submitButton.textContent = 'Crear Cuenta';
    }
});


// ========================================
// 5. MOSTRAR MENSAJES
// ========================================

function mostrarError(mensaje) {
    errorMessage.textContent = mensaje;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    
    // Scroll al mensaje
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function mostrarExito(mensaje) {
    successMessage.textContent = mensaje;
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    
    // Scroll al mensaje
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}


// ========================================
// 6. MENSAJE DE CONSOLA
// ========================================

console.log('Register.js cargado correctamente');