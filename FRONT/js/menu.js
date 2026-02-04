// URL base de la API
const API_URL = 'http://localhost:8080/api';


let categorias = [];
let platos = [];
let categoriaActual = 'all';


const categoriesFilters = document.getElementById('categoriesFilters');
const menuGrid = document.getElementById('menuGrid');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');


async function cargarCategorias() {
    try {
        const response = await fetch(`${API_URL}/categorias/ordenadas`);
        
        if (!response.ok) {
            throw new Error('Error al cargar categorías');
        }
        
        categorias = await response.json();
        mostrarFiltrosCategorias();
        
    } catch (error) {
        console.error('Error:', error);
        mostrarError();
    }
}

// Función para cargar platos desde la API
async function cargarPlatos() {
    try {
        const response = await fetch(`${API_URL}/platos/disponibles`);
        
        if (!response.ok) {
            throw new Error('Error al cargar platos');
        }
        
        platos = await response.json();
        console.log('Platos cargados:', platos); // DEBUG
        mostrarPlatos(platos);
        ocultarLoading();
        
    } catch (error) {
        console.error('Error:', error);
        mostrarError();
    }
}

function mostrarFiltrosCategorias() {
    categorias.forEach(categoria => {
        const button = document.createElement('button');
        button.className = 'category-btn';
        button.dataset.category = categoria.idCategoria;
        button.textContent = categoria.nombre;
        button.addEventListener('click', () => filtrarPorCategoria(categoria.idCategoria));
        categoriesFilters.appendChild(button);
    });
}

function filtrarPorCategoria(idCategoria) {
    categoriaActual = idCategoria;
    
    const botones = document.querySelectorAll('.category-btn');
    botones.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category == idCategoria) {
            btn.classList.add('active');
        }
    });
    
    if (idCategoria === 'all') {
        mostrarPlatos(platos);
    } else {
        const platosFiltrados = platos.filter(plato => plato.categoria.idCategoria == idCategoria);
        mostrarPlatos(platosFiltrados);
    }
}

function mostrarPlatos(platosArray) {
    menuGrid.innerHTML = '';
    
    if (platosArray.length === 0) {
        menuGrid.innerHTML = '<p style="text-align: center; color: var(--plata); grid-column: 1/-1;">No hay platos disponibles en esta categoría.</p>';
        return;
    }
    
    platosArray.forEach(plato => {
        const dishCard = crearTarjetaPlato(plato);
        menuGrid.appendChild(dishCard);
    });
}

function crearTarjetaPlato(plato) {
    const card = document.createElement('div');
    card.className = 'dish-card';
    
    const imagenUrl = plato.imagenUrl;
    console.log('Plato:', plato.nombre, '- URL:', imagenUrl); // DEBUG
    
    const emojis = {
        1: '🥟', 2: '🍣', 3: '🐟', 4: '🍱', 
        5: '🍜', 6: '🍢', 7: '🥘', 8: '🍰', 9: '🍶'
    };
    const emoji = emojis[plato.categoria.idCategoria] || '🍽️';
    
    // Construir HTML de la imagen
    let imagenHTML = '';
    if (imagenUrl && imagenUrl.trim() !== '') {
        imagenHTML = `<div class="dish-image" style="background-image: url('${imagenUrl}'); background-size: cover; background-position: center;"></div>`;
    } else {
        imagenHTML = `<div class="dish-image">${emoji}</div>`;
    }
    
    card.innerHTML = `
        ${imagenHTML}
        <div class="dish-content">
            <div class="dish-category">${plato.categoria.nombre}</div>
            <h3 class="dish-name">${plato.nombre}</h3>
            <p class="dish-description">${plato.descripcion || 'Delicioso plato tradicional japonés'}</p>
            <div class="dish-footer">
                <span class="dish-price">${plato.precio.toFixed(2)}€</span>
                <span class="dish-available">Disponible</span>
            </div>
        </div>
    `;
    
    return card;
}


function ocultarLoading() {
    loading.style.display = 'none';
}


function mostrarError() {
    loading.style.display = 'none';
    errorMessage.style.display = 'block';
}


document.querySelector('[data-category="all"]').addEventListener('click', () => {
    filtrarPorCategoria('all');
});


async function init() {
    await cargarCategorias();
    await cargarPlatos();
}


document.addEventListener('DOMContentLoaded', init);

console.log('Menu.js cargado correctamente');   