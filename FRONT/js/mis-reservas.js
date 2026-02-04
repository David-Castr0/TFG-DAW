// ========================================
// 1. CONFIGURACIÓN INICIAL
// ========================================

// URL base de la API
const API_URL = 'http://localhost:8080/api';

// Referencias a elementos del DOM
const searchForm = document.getElementById('searchForm');
const emailInput = document.getElementById('emailBusqueda');
const loading = document.getElementById('loading');
const resultsContainer = document.getElementById('resultsContainer');
const reservasList = document.getElementById('reservasList');
const reservasCount = document.getElementById('reservasCount');
const noReservas = document.getElementById('noReservas');
const errorMessage = document.getElementById('errorMessage');


// ========================================
// 2. BUSCAR RESERVAS POR EMAIL
// ========================================

searchForm.addEventListener('submit', async function(e) {
    e.preventDefault(); // Evita recargar la página
    
    const email = emailInput.value.trim();
    
    // Ocultar todos los mensajes
    ocultarTodo();
    
    // Mostrar loading
    loading.style.display = 'block';
    
    try {
        // Obtener todas las reservas
        const response = await fetch(`${API_URL}/reservas`);
        
        if (!response.ok) {
            throw new Error('Error al obtener reservas');
        }
        
        const todasLasReservas = await response.json();
        
        // Filtrar por email y solo reservas futuras
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // Eliminar horas para comparar solo fechas
        
        const reservasDelCliente = todasLasReservas.filter(reserva => {
            // Verificar que el email coincida
            const emailCoincide = reserva.emailCliente.toLowerCase() === email.toLowerCase();
            
            // Verificar que la fecha sea futura
            const fechaReserva = new Date(reserva.fechaReserva);
            const esFutura = fechaReserva >= hoy;
            
            // Verificar que no esté cancelada
            const noEstaCancelada = reserva.estado !== 'cancelada';
            
            return emailCoincide && esFutura && noEstaCancelada;
        });
        
        // Ordenar por fecha (más próximas primero)
        reservasDelCliente.sort((a, b) => {
            const fechaA = new Date(a.fechaReserva + 'T' + a.horaReserva);
            const fechaB = new Date(b.fechaReserva + 'T' + b.horaReserva);
            return fechaA - fechaB;
        });
        
        // Ocultar loading
        loading.style.display = 'none';
        
        // Mostrar resultados o mensaje de "no hay reservas"
        if (reservasDelCliente.length > 0) {
            mostrarReservas(reservasDelCliente);
        } else {
            noReservas.style.display = 'block';
        }
        
    } catch (error) {
        console.error('Error:', error);
        loading.style.display = 'none';
        errorMessage.style.display = 'block';
    }
});


// ========================================
// 3. MOSTRAR RESERVAS
// ========================================

function mostrarReservas(reservas) {
    // Limpiar lista anterior
    reservasList.innerHTML = '';
    
    // Actualizar contador
    reservasCount.textContent = reservas.length;
    
    // Crear una tarjeta por cada reserva
    reservas.forEach(reserva => {
        const card = crearTarjetaReserva(reserva);
        reservasList.appendChild(card);
    });
    
    // Mostrar el contenedor de resultados
    resultsContainer.style.display = 'block';
}


// ========================================
// 4. CREAR TARJETA DE RESERVA
// ========================================

function crearTarjetaReserva(reserva) {
    const card = document.createElement('div');
    card.className = 'reserva-card';
    
    // Formatear fecha (de "2026-01-15" a "15/01/2026")
    const fecha = new Date(reserva.fechaReserva).toLocaleDateString('es-ES');
    
    // Formatear hora (de "20:00:00" a "20:00")
    const hora = reserva.horaReserva.substring(0, 5);
    
    // Obtener el nombre de la localización
    const nombreLocalizacion = reserva.localizacion.nombre || 'Restaurante';
    
    // Determinar clase de estado
    const claseEstado = reserva.estado === 'confirmada' ? 'estado-confirmada' : 'estado-pendiente';
    const textoEstado = reserva.estado.charAt(0).toUpperCase() + reserva.estado.slice(1);
    
    // Construir HTML de la tarjeta
    card.innerHTML = `
        <div class="reserva-info">
            <div class="reserva-header">
                <span class="reserva-icon">🍣</span>
                <h4 class="reserva-localizacion">${nombreLocalizacion}</h4>
            </div>
            <div class="reserva-detalle">
                <span class="detalle-icon">📅</span>
                <span>${fecha}</span>
            </div>
            <div class="reserva-detalle">
                <span class="detalle-icon">🕐</span>
                <span>${hora}</span>
            </div>
            <div class="reserva-detalle">
                <span class="detalle-icon">👥</span>
                <span>${reserva.numPersonas} ${reserva.numPersonas === 1 ? 'persona' : 'personas'}</span>
            </div>
            <div class="reserva-detalle">
                <span class="detalle-icon">👤</span>
                <span>${reserva.nombreCliente}</span>
            </div>
            <div class="reserva-detalle">
                <span class="detalle-icon">📞</span>
                <span>${reserva.telefonoCliente}</span>
            </div>
            <div>
                <span class="reserva-estado ${claseEstado}">${textoEstado}</span>
            </div>
        </div>
        <div class="reserva-actions">
            <button class="btn-cancel" onclick="cancelarReserva(${reserva.idReserva})">
                Cancelar Reserva
            </button>
        </div>
    `;
    
    return card;
}


// ========================================
// 5. CANCELAR RESERVA
// ========================================

async function cancelarReserva(idReserva) {
    // Confirmar con el usuario
    const confirmar = confirm('¿Estás seguro de que deseas cancelar esta reserva?');
    
    if (!confirmar) {
        return; // Si el usuario cancela, no hacer nada
    }
    
    try {
        // Cambiar el estado de la reserva a "cancelada"
        const response = await fetch(`${API_URL}/reservas/${idReserva}/estado`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify('cancelada')
        });
        
        if (!response.ok) {
            throw new Error('Error al cancelar la reserva');
        }
        
        // Mostrar mensaje de éxito
        alert('Reserva cancelada correctamente');
        
        // Recargar las reservas (volver a buscar)
        searchForm.dispatchEvent(new Event('submit'));
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cancelar la reserva. Por favor, inténtalo de nuevo.');
    }
}


// ========================================
// 6. FUNCIONES AUXILIARES
// ========================================

function ocultarTodo() {
    loading.style.display = 'none';
    resultsContainer.style.display = 'none';
    noReservas.style.display = 'none';
    errorMessage.style.display = 'none';
}


// ========================================
// 7. MENSAJE DE CONFIRMACIÓN
// ========================================

console.log('Mis-reservas.js cargado correctamente');