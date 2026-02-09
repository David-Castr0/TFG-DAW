// ========================================
// PROTECCIÓN: VERIFICAR AUTENTICACIÓN
// ========================================

// Verificar autenticación antes de cargar la página
(function verificarAutenticacion() {
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');
    
    // Si no hay token o no es ADMIN, redirigir a login
    if (!token || rol !== 'ADMIN') {
        alert('Acceso denegado. Debes iniciar sesión como administrador.');
        window.location.href = 'login.html';
        return;
    }
    
    console.log('✓ Acceso autorizado como ADMIN');
})();



// ========================================
// 1. CONFIGURACIÓN INICIAL
// ========================================

// URL base de la API
const API_URL = 'http://localhost:8080/api';

// Referencias a elementos del DOM
const statsElements = {
    hoy: document.getElementById('reservasHoy'),
    semana: document.getElementById('reservasSemana'),
    pendientes: document.getElementById('reservasPendientes'),
    confirmadas: document.getElementById('reservasConfirmadas')
};

const filtroFecha = document.getElementById('filtroFecha');
const filtroLocalizacion = document.getElementById('filtroLocalizacion');
const filtroEstado = document.getElementById('filtroEstado');
const btnAplicarFiltros = document.getElementById('btnAplicarFiltros');
const btnLimpiarFiltros = document.getElementById('btnLimpiarFiltros');
const btnRefresh = document.getElementById('btnRefresh');

const loading = document.getElementById('loading');
const reservasContainer = document.getElementById('reservasContainer');
const reservasTableBody = document.getElementById('reservasTableBody');
const totalReservas = document.getElementById('totalReservas');
const noReservas = document.getElementById('noReservas');
const errorMessage = document.getElementById('errorMessage');

const modal = document.getElementById('modalEstado');
const closeModal = document.querySelector('.close');
const btnGuardarEstado = document.getElementById('btnGuardarEstado');
const btnCancelarModal = document.getElementById('btnCancelarModal');
const nuevoEstadoSelect = document.getElementById('nuevoEstado');
const modalReservaInfo = document.getElementById('modalReservaInfo');

// Variables globales
let todasLasReservas = [];
let reservasFiltradas = [];
let reservaSeleccionada = null;


// ========================================
// 2. CARGAR DATOS INICIALES
// ========================================

async function init() {
    await cargarLocalizaciones();
    await cargarReservas();
}

// Cargar localizaciones para el filtro
async function cargarLocalizaciones() {
    try {
        const response = await fetch(`${API_URL}/localizaciones/activas`);
        if (!response.ok) throw new Error('Error al cargar localizaciones');
        
        const localizaciones = await response.json();
        
        localizaciones.forEach(loc => {
            const option = document.createElement('option');
            option.value = loc.idLocalizacion;
            option.textContent = `${loc.nombre} - ${loc.ciudad}`;
            filtroLocalizacion.appendChild(option);
        });
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Cargar todas las reservas
async function cargarReservas() {
    ocultarTodo();
    loading.style.display = 'block';
    
    try {
        const response = await fetch(`${API_URL}/reservas`);
        if (!response.ok) throw new Error('Error al cargar reservas');
        
        todasLasReservas = await response.json();
        reservasFiltradas = [...todasLasReservas];
        
        // Ordenar por fecha y hora (más recientes primero)
        reservasFiltradas.sort((a, b) => {
            const fechaA = new Date(a.fechaReserva + 'T' + a.horaReserva);
            const fechaB = new Date(b.fechaReserva + 'T' + b.horaReserva);
            return fechaB - fechaA;
        });
        
        calcularEstadisticas();
        mostrarReservas();
        
        loading.style.display = 'none';
        
    } catch (error) {
        console.error('Error:', error);
        loading.style.display = 'none';
        errorMessage.style.display = 'block';
    }
}


// ========================================
// 3. CALCULAR ESTADÍSTICAS
// ========================================

function calcularEstadisticas() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const inicioSemana = new Date(hoy);
    inicioSemana.setDate(hoy.getDate() - hoy.getDay());
    
    const finSemana = new Date(inicioSemana);
    finSemana.setDate(inicioSemana.getDate() + 6);
    finSemana.setHours(23, 59, 59, 999);
    
    // Reservas de hoy
    const reservasHoy = todasLasReservas.filter(r => {
        const fechaReserva = new Date(r.fechaReserva);
        fechaReserva.setHours(0, 0, 0, 0);
        return fechaReserva.getTime() === hoy.getTime();
    });
    
    // Reservas de esta semana
    const reservasSemana = todasLasReservas.filter(r => {
        const fechaReserva = new Date(r.fechaReserva);
        return fechaReserva >= inicioSemana && fechaReserva <= finSemana;
    });
    
    // Reservas pendientes
    const pendientes = todasLasReservas.filter(r => r.estado === 'pendiente');
    
    // Reservas confirmadas
    const confirmadas = todasLasReservas.filter(r => r.estado === 'confirmada');
    
    // Actualizar estadísticas en la UI
    statsElements.hoy.textContent = reservasHoy.length;
    statsElements.semana.textContent = reservasSemana.length;
    statsElements.pendientes.textContent = pendientes.length;
    statsElements.confirmadas.textContent = confirmadas.length;
}


// ========================================
// 4. MOSTRAR RESERVAS EN TABLA
// ========================================

function mostrarReservas() {
    reservasTableBody.innerHTML = '';
    totalReservas.textContent = reservasFiltradas.length;
    
    if (reservasFiltradas.length === 0) {
        reservasContainer.style.display = 'none';
        noReservas.style.display = 'block';
        return;
    }
    
    reservasContainer.style.display = 'block';
    noReservas.style.display = 'none';
    
    reservasFiltradas.forEach(reserva => {
        const row = crearFilaReserva(reserva);
        reservasTableBody.appendChild(row);
    });
}

function crearFilaReserva(reserva) {
    const row = document.createElement('tr');
    
    // Formatear fecha y hora
    const fecha = new Date(reserva.fechaReserva).toLocaleDateString('es-ES');
    const hora = reserva.horaReserva.substring(0, 5);
    
    // Clase de estado
    const claseEstado = `estado-${reserva.estado}`;
    const textoEstado = reserva.estado.charAt(0).toUpperCase() + reserva.estado.slice(1);
    
    row.innerHTML = `
        <td>${reserva.idReserva}</td>
        <td>${fecha}</td>
        <td>${hora}</td>
        <td>${reserva.nombreCliente}</td>
        <td>${reserva.telefonoCliente}</td>
        <td>${reserva.localizacion.nombre}</td>
        <td>${reserva.mesa.numeroMesa}</td>
        <td>${reserva.numPersonas}</td>
        <td><span class="estado-badge ${claseEstado}">${textoEstado}</span></td>
        <td>
            <button class="btn-cambiar-estado" onclick="abrirModal(${reserva.idReserva})">
                Cambiar Estado
            </button>
        </td>
    `;
    
    return row;
}


// ========================================
// 5. FILTRAR RESERVAS
// ========================================

function aplicarFiltros() {
    const fecha = filtroFecha.value;
    const localizacion = filtroLocalizacion.value;
    const estado = filtroEstado.value;
    
    reservasFiltradas = todasLasReservas.filter(reserva => {
        // Filtro por fecha
        if (fecha && reserva.fechaReserva !== fecha) {
            return false;
        }
        
        // Filtro por localización
        if (localizacion && reserva.localizacion.idLocalizacion != localizacion) {
            return false;
        }
        
        // Filtro por estado
        if (estado && reserva.estado !== estado) {
            return false;
        }
        
        return true;
    });
    
    mostrarReservas();
}

function limpiarFiltros() {
    filtroFecha.value = '';
    filtroLocalizacion.value = '';
    filtroEstado.value = '';
    reservasFiltradas = [...todasLasReservas];
    mostrarReservas();
}


// ========================================
// 6. MODAL CAMBIAR ESTADO
// ========================================

function abrirModal(idReserva) {
    reservaSeleccionada = todasLasReservas.find(r => r.idReserva === idReserva);
    
    if (!reservaSeleccionada) return;
    
    const fecha = new Date(reservaSeleccionada.fechaReserva).toLocaleDateString('es-ES');
    const hora = reservaSeleccionada.horaReserva.substring(0, 5);
    
    modalReservaInfo.innerHTML = `
        <strong>Reserva #${reservaSeleccionada.idReserva}</strong><br>
        Cliente: ${reservaSeleccionada.nombreCliente}<br>
        Fecha: ${fecha} - ${hora}<br>
        Localización: ${reservaSeleccionada.localizacion.nombre}<br>
        Estado actual: <span class="estado-badge estado-${reservaSeleccionada.estado}">${reservaSeleccionada.estado}</span>
    `;
    
    nuevoEstadoSelect.value = reservaSeleccionada.estado;
    modal.style.display = 'flex';
}

function cerrarModal() {
    modal.style.display = 'none';
    reservaSeleccionada = null;
}

async function guardarEstado() {
    if (!reservaSeleccionada) return;
    
    const nuevoEstado = nuevoEstadoSelect.value;
    
    try {
        const response = await fetch(`${API_URL}/reservas/${reservaSeleccionada.idReserva}/estado`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoEstado)
        });
        
        if (!response.ok) throw new Error('Error al cambiar estado');
        
        alert('Estado cambiado correctamente');
        cerrarModal();
        await cargarReservas();
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cambiar el estado. Por favor, inténtalo de nuevo.');
    }
}


// ========================================
// 7. FUNCIONES AUXILIARES
// ========================================

function ocultarTodo() {
    loading.style.display = 'none';
    reservasContainer.style.display = 'none';
    noReservas.style.display = 'none';
    errorMessage.style.display = 'none';
}


// ========================================
// 8. EVENT LISTENERS
// ========================================

btnAplicarFiltros.addEventListener('click', aplicarFiltros);
btnLimpiarFiltros.addEventListener('click', limpiarFiltros);
btnRefresh.addEventListener('click', cargarReservas);

closeModal.addEventListener('click', cerrarModal);
btnCancelarModal.addEventListener('click', cerrarModal);
btnGuardarEstado.addEventListener('click', guardarEstado);

// Cerrar modal al hacer clic fuera
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        cerrarModal();
    }
});


// ========================================
// 9. INICIALIZACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', init);

console.log('Admin.js cargado correctamente');

// ========================================
// CERRAR SESIÓN
// ========================================

document.getElementById('btnLogout').addEventListener('click', () => {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        // Limpiar localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('nombre');
        localStorage.removeItem('rol');
        
        // Redirigir a login
        window.location.href = 'login.html';
    }
});