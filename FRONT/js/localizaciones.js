// ========================================
// 1. CONFIGURACIÓN INICIAL
// ========================================

// URL base de la API (donde está nuestro backend)
const API_URL = 'http://localhost:8080/api';

// Variables globales para guardar las localizaciones
let localizaciones = [];

// Guardamos referencias a los elementos HTML que vamos a usar
const locationsGrid = document.getElementById('locationsGrid');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');


// ========================================
// 2. FUNCIÓN PARA CARGAR LOCALIZACIONES
// ========================================

// Esta función es "async" porque va a esperar datos de la API
async function cargarLocalizaciones() {
    try {
        // Hacemos una petición GET a la API para obtener localizaciones activas
        const response = await fetch(`${API_URL}/localizaciones/activas`);
        
        // Verificamos si la petición fue exitosa (código 200)
        if (!response.ok) {
            throw new Error('Error al cargar localizaciones');
        }
        
        // Convertimos la respuesta a JSON (formato JavaScript)
        localizaciones = await response.json();
        
        // Mostramos las localizaciones en la página
        mostrarLocalizaciones(localizaciones);
        
        // Ocultamos el mensaje de "Cargando..."
        ocultarLoading();
        
    } catch (error) {
        // Si hay algún error, lo mostramos en la consola
        console.error('Error:', error);
        // Y mostramos un mensaje de error al usuario
        mostrarError();
    }
}


// ========================================
// 3. FUNCIÓN PARA MOSTRAR LOCALIZACIONES
// ========================================

function mostrarLocalizaciones(localizacionesArray) {
    // Limpiamos el contenido anterior del grid
    locationsGrid.innerHTML = '';
    
    // Verificamos si hay localizaciones para mostrar
    if (localizacionesArray.length === 0) {
        locationsGrid.innerHTML = '<p style="text-align: center; color: var(--plata); grid-column: 1/-1;">No hay localizaciones disponibles.</p>';
        return;
    }
    
    // Por cada localización, creamos una tarjeta
    localizacionesArray.forEach(localizacion => {
        const card = crearTarjetaLocalizacion(localizacion);
        locationsGrid.appendChild(card);
    });
}


// ========================================
// 4. FUNCIÓN PARA CREAR TARJETA DESPLEGABLE
// ========================================

function crearTarjetaLocalizacion(localizacion) {
    // Creamos un div para la tarjeta
    const card = document.createElement('div');
    card.className = 'location-card';
    
    // Formateamos los horarios (de "12:00:00" a "12:00")
    const horarioApertura = localizacion.horarioApertura.substring(0, 5);
    const horarioCierre = localizacion.horarioCierre.substring(0, 5);
    
    // Creamos la URL de Google Maps con la dirección
    const direccionCompleta = `${localizacion.direccion}, ${localizacion.ciudad}`;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccionCompleta)}`;
    
    // Construimos el HTML de la tarjeta
    card.innerHTML = `
        <div class="location-header">
            <h3 class="location-name">${localizacion.nombre}</h3>
            <p class="location-city">${localizacion.ciudad}</p>
        </div>
        <div class="location-body">
            <div class="location-info">
                <div class="info-row">
                    <span class="info-icon">📍</span>
                    <div class="info-content">
                        <h4>Ubicación</h4>
                        <a href="${googleMapsUrl}" target="_blank" class="maps-btn">
                            Ver en Google Maps
                        </a>
                    </div>
                </div>
                <div class="info-row">
                    <span class="info-icon">📞</span>
                    <div class="info-content">
                        <h4>Teléfono</h4>
                        <p>${localizacion.telefono}</p>
                    </div>
                </div>
                <div class="info-row">
                    <span class="info-icon">🕐</span>
                    <div class="info-content">
                        <h4>Horario</h4>
                        <p>${horarioApertura} - ${horarioCierre}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="location-footer">
            <div class="location-status">
                <span class="status-indicator"></span>
                <span class="status-text">Abierto ahora</span>
            </div>
        </div>
    `;
    
    // Devolvemos la tarjeta creada
    return card;
}


// ========================================
// 5. FUNCIONES AUXILIARES
// ========================================

// Oculta el mensaje de "Cargando..."
function ocultarLoading() {
    loading.style.display = 'none';
}

// Muestra el mensaje de error
function mostrarError() {
    loading.style.display = 'none';
    errorMessage.style.display = 'block';
}


// ========================================
// 6. INICIALIZACIÓN
// ========================================

// Esta función se ejecuta cuando la página está completamente cargada
async function init() {
    await cargarLocalizaciones();
}

// Esperamos a que el DOM esté listo y ejecutamos init()
document.addEventListener('DOMContentLoaded', init);

// Mensaje en consola para confirmar que el JS se cargó
console.log('Localizaciones.js cargado correctamente');