// ========================================
// 1. CONFIGURACIÓN INICIAL
// ========================================

const API_URL = 'http://localhost:8080/api';

// Referencias a elementos del DOM
const specialtiesGrid = document.getElementById('specialtiesGrid');
const header = document.querySelector('.header');
const scrollIndicator = document.querySelector('.scroll-indicator');


// ========================================
// 2. CARGAR ESPECIALIDADES DESDE LA API
// ========================================

async function cargarEspecialidades() {
    try {
        const response = await fetch(`${API_URL}/platos`);
        
        if (!response.ok) {
            throw new Error('Error al cargar platos');
        }
        
        const platos = await response.json();
        
        // Filtrar solo platos disponibles y seleccionar 6 (los primeros de cada categoría importante)
        const especialidades = seleccionarEspecialidades(platos);
        
        mostrarEspecialidades(especialidades);
        
    } catch (error) {
        console.error('Error:', error);
        specialtiesGrid.innerHTML = `
            <div class="error-message">
                <p>No se pudieron cargar las especialidades.</p>
                <p>Por favor, intenta de nuevo más tarde.</p>
            </div>
        `;
    }
}

function seleccionarEspecialidades(platos) {
    // Filtrar solo platos disponibles
    const disponibles = platos.filter(plato => plato.disponible);
    
    // Seleccionar las especialidades (puedes personalizar esta lógica)
    // Aquí tomamos 2 de Sushi, 2 de Especiales, 1 de Sashimi, 1 de Makis
    const sushi = disponibles.filter(p => p.categoria.nombre === 'Sushi').slice(0, 2);
    const especiales = disponibles.filter(p => p.categoria.nombre === 'Especiales').slice(0, 2);
    const sashimi = disponibles.filter(p => p.categoria.nombre === 'Sashimi').slice(0, 1);
    const makis = disponibles.filter(p => p.categoria.nombre === 'Makis').slice(0, 1);
    
    // Combinar y devolver (máximo 6)
    return [...sushi, ...especiales, ...sashimi, ...makis].slice(0, 6);
}

function mostrarEspecialidades(especialidades) {
    if (especialidades.length === 0) {
        specialtiesGrid.innerHTML = '<p class="loading">No hay especialidades disponibles.</p>';
        return;
    }
    
    specialtiesGrid.innerHTML = '';
    
    especialidades.forEach(plato => {
        const card = document.createElement('div');
        card.className = 'specialty-card';
        
        // Usar imagen del plato o imagen por defecto
        const imagenUrl = plato.imagenUrl || 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400';
        
        card.innerHTML = `
            <div class="specialty-image">
                <img src="${imagenUrl}" alt="${plato.nombre}" onerror="this.src='https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400'">
            </div>
            <div class="specialty-info">
                <h3 class="specialty-name">${plato.nombre}</h3>
                <p class="specialty-description">${plato.descripcion || 'Delicioso plato de nuestra carta'}</p>
                <p class="specialty-price">${plato.precio.toFixed(2)}€</p>
            </div>
        `;
        
        specialtiesGrid.appendChild(card);
    });
}


// ========================================
// 3. SCROLL SUAVE AL HACER CLIC EN FLECHA
// ========================================

if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('.about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}


// ========================================
// 4. HEADER DINÁMICO AL HACER SCROLL
// ========================================

let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Cambiar opacidad del header según scroll
    if (currentScroll > 100) {
        header.style.backgroundColor = 'rgba(26, 26, 26, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.8)';
    } else {
        header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    }
    
    lastScroll = currentScroll;
});


// ========================================
// 5. ANIMACIONES AL HACER SCROLL
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animaciones a todas las secciones
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // El hero siempre visible
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }
});


// ========================================
// 6. ANIMACIÓN DE NÚMEROS EN ESTADÍSTICAS
// ========================================

function animarNumeros() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            if (element.textContent.includes('+')) {
                element.textContent = Math.floor(progress * (end - start) + start) + '+';
            } else if (element.textContent.includes('%')) {
                element.textContent = Math.floor(progress * (end - start) + start) + '%';
            } else {
                element.textContent = Math.floor(progress * (end - start) + start);
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    let finalValue = parseInt(text.replace(/\D/g, ''));
                    
                    if (text.includes('+')) {
                        animateValue(stat, 0, finalValue, 2000);
                    } else if (text.includes('%')) {
                        animateValue(stat, 0, finalValue, 2000);
                    } else {
                        animateValue(stat, 0, finalValue, 2000);
                    }
                });
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}


// ========================================
// 7. EFECTO PARALLAX EN EL HERO
// ========================================

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        hero.style.backgroundPositionY = `${scrolled * parallaxSpeed}px`;
    }
});


// ========================================
// 8. INICIALIZACIÓN
// ========================================

async function init() {
    await cargarEspecialidades();
    animarNumeros();
}

// Ejecutar al cargar la página
window.addEventListener('DOMContentLoaded', init);


// ========================================
// 9. MENSAJE DE CONSOLA
// ========================================

console.log('Index.js cargado correctamente');
console.log('Sushimi - Experiencia japonesa auténtica');