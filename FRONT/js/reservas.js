// ========================================
// 1. CONFIGURACIÓN INICIAL
// ========================================

// URL base de la API
const API_URL = 'http://localhost:8080/api';

// Guardamos referencias a los elementos del formulario
const form = document.getElementById('reservationForm');
const localizacionSelect = document.getElementById('localizacion');
const mesaSelect = document.getElementById('mesa');
const confirmationMessage = document.getElementById('confirmationMessage');
const confirmationDetails = document.getElementById('confirmationDetails');

// Variables para guardar los datos
let localizaciones = [];
let mesas = [];


// ========================================
// 2. CARGAR LOCALIZACIONES AL INICIAR
// ========================================

async function cargarLocalizaciones() {
    try {
        const response = await fetch(`${API_URL}/localizaciones/activas`);
        
        if (!response.ok) {
            throw new Error('Error al cargar localizaciones');
        }
        
        localizaciones = await response.json();
        
        // Llenar el select de localizaciones
        localizaciones.forEach(loc => {
            const option = document.createElement('option');
            option.value = loc.idLocalizacion;
            option.textContent = `${loc.nombre} - ${loc.ciudad}`;
            localizacionSelect.appendChild(option);
        });
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar las localizaciones. Por favor, recarga la página.');
    }
}


// ========================================
// 3. CARGAR MESAS CUANDO SE SELECCIONA LOCALIZACIÓN
// ========================================

localizacionSelect.addEventListener('change', async function() {
    const idLocalizacion = this.value;
    
    // Limpiar y deshabilitar el select de mesas
    mesaSelect.innerHTML = '<option value="">Cargando mesas...</option>';
    mesaSelect.disabled = true;
    
    if (!idLocalizacion) {
        mesaSelect.innerHTML = '<option value="">Primero selecciona un restaurante</option>';
        return;
    }
    
    try {
        // Obtener mesas libres de la localización seleccionada
        const response = await fetch(`${API_URL}/mesas/localizacion/${idLocalizacion}/libres`);
        
        if (!response.ok) {
            throw new Error('Error al cargar mesas');
        }
        
        mesas = await response.json();
        
        // Limpiar el select
        mesaSelect.innerHTML = '<option value="">Selecciona una mesa</option>';
        
        // Llenar el select con las mesas disponibles
        if (mesas.length === 0) {
            mesaSelect.innerHTML = '<option value="">No hay mesas disponibles</option>';
        } else {
            mesas.forEach(mesa => {
                const option = document.createElement('option');
                option.value = mesa.idMesa;
                option.textContent = `Mesa ${mesa.numeroMesa} - Capacidad: ${mesa.capacidad} personas`;
                mesaSelect.appendChild(option);
            });
            mesaSelect.disabled = false;
        }
        
    } catch (error) {
        console.error('Error:', error);
        mesaSelect.innerHTML = '<option value="">Error al cargar mesas</option>';
    }
});


// ========================================
// 4. ENVIAR FORMULARIO DE RESERVA
// ========================================

form.addEventListener('submit', async function(e) {
    e.preventDefault(); // Evita que el formulario se envíe de forma tradicional
    
    // Recoger los datos del formulario
    const formData = {
        mesa: {
            idMesa: parseInt(document.getElementById('mesa').value)
        },
        localizacion: {
            idLocalizacion: parseInt(document.getElementById('localizacion').value)
        },
        nombreCliente: document.getElementById('nombreCliente').value + ' ' + document.getElementById('apellidosCliente').value,
        telefonoCliente: document.getElementById('telefonoCliente').value,
        emailCliente: document.getElementById('emailCliente').value,
        fechaReserva: document.getElementById('fechaReserva').value,
        horaReserva: document.getElementById('horaReserva').value + ':00', // Añadir segundos
        numPersonas: parseInt(document.getElementById('numPersonas').value),
        notas: document.getElementById('notas').value || null,
        estado: 'pendiente'
    };
    
    try {
        // Enviar la reserva a la API
        const response = await fetch(`${API_URL}/reservas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error('Error al crear la reserva');
        }
        
        const reserva = await response.json();
        
        // Mostrar mensaje de confirmación
        mostrarConfirmacion(reserva);
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error al crear la reserva. Por favor, inténtalo de nuevo.');
    }
});


// ========================================
// 5. MOSTRAR MENSAJE DE CONFIRMACIÓN
// ========================================

function mostrarConfirmacion(reserva) {
    // Ocultar el formulario
    form.style.display = 'none';
    
    // Obtener el nombre de la localización
    const localizacion = localizaciones.find(loc => loc.idLocalizacion === reserva.localizacion.idLocalizacion);
    const nombreLocalizacion = localizacion ? localizacion.nombre : 'Restaurante';
    
    // Formatear fecha y hora
    const fecha = new Date(reserva.fechaReserva).toLocaleDateString('es-ES');
    const hora = reserva.horaReserva.substring(0, 5);
    
    // Mostrar los detalles de la reserva
    confirmationDetails.innerHTML = `
        <strong>Restaurante:</strong> ${nombreLocalizacion}<br>
        <strong>Fecha:</strong> ${fecha}<br>
        <strong>Hora:</strong> ${hora}<br>
        <strong>Personas:</strong> ${reserva.numPersonas}<br>
        <strong>Nombre:</strong> ${reserva.nombreCliente}
    `;
    
    // Mostrar el mensaje de confirmación
    confirmationMessage.style.display = 'block';
}


// ========================================
// 6. ESTABLECER FECHA MÍNIMA (HOY)
// ========================================

function establecerFechaMinima() {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    const fechaMinima = `${año}-${mes}-${dia}`;
    
    document.getElementById('fechaReserva').setAttribute('min', fechaMinima);
}


// ========================================
// 7. INICIALIZACIÓN
// ========================================

async function init() {
    await cargarLocalizaciones();
    establecerFechaMinima();
}

// Ejecutar cuando la página cargue
document.addEventListener('DOMContentLoaded', init);

console.log('Reservas.js cargado correctamente');