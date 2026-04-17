/* =====================================================
   PORTFOLIO MIGUEL - JAVASCRIPT INTERACTIVO
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeSmoothScroll();
    initializeNavigation();
    initializeSkillBars();
    initializeAnimations();
});

/* ===== NAVEGACIÓN SUAVE (SMOOTH SCROLL) ===== */

function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    // Ajustar scroll para que no quede oculto bajo la navbar
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Actualizar enlace activo
                    updateActiveLink(href);
                }
            }
        });
    });
}

/* ===== ACTUALIZAR ENLACE ACTIVO EN NAVEGACIÓN ===== */

function updateActiveLink(href) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === href) {
            link.classList.add('active');
        }
    });
}

/* ===== ACTUALIZACIÓN AUTOMÁTICA DE NAVEGACIÓN AL HACER SCROLL ===== */

function initializeNavigation() {
    window.addEventListener('scroll', function() {
        updateNavigationOnScroll();
    });
}

function updateNavigationOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navHeight = document.querySelector('.navbar').offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 50;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = '#' + section.getAttribute('id');
        }
    });
    
    if (currentSection) {
        updateActiveLink(currentSection);
    }
}

/* ===== ANIMACIÓN DE BARRAS DE HABILIDADES ===== */

function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBar(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => observer.observe(bar));
}

function animateSkillBar(bar) {
    const width = bar.style.width;
    bar.style.width = '0';
    
    // Trigger reflow para forzar la transición
    void bar.offsetWidth;
    
    bar.style.width = width;
    bar.style.transition = 'width 0.8s ease-in-out';
}

/* ===== ANIMACIONES AL HACER SCROLL (FADE-IN) ===== */

function initializeAnimations() {
    const cards = document.querySelectorAll('.about-card, .contact-card, .education-block, .skills-block, .timeline-item');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                    
                    // Trigger animation
                    void entry.target.offsetWidth;
                    
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => observer.observe(card));
}

/* ===== FUNCIÓN AUXILIAR: SCROLL A SECCIÓN ===== */

function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = section.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

/* ===== BANNER HERO - CAMBIAR FONDO ===== */

/* ===== FUNCIÓN AUXILIAR: SCROLL A SECCIÓN ===== */

function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = section.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

/* ===== FUNCIÓN AUXILIAR: COPIAR AL PORTAPAPELES (PARA FUTURO) ===== */

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copiado al portapapeles');
        }).catch(() => {
            console.error('Error al copiar');
        });
    }
}

/* ===== DETECTAR CLICKS EN LINKS DE CONTACTO ===== */

document.addEventListener('click', function(e) {
    // Rastrear clicks en email o teléfono para futuro análisis
    if (e.target.tagName === 'A') {
        const href = e.target.getAttribute('href');
        if (href && (href.startsWith('mailto:') || href.startsWith('tel:'))) {
            // Aquí se puede agregar tracking de analytics
            console.log('Click en contacto:', href);
        }
    }
});

/* ===== PREVENCIÓN DE RECHAZOS DE NAVEGADOR (OPCIONAL) ===== */

// Si en el futuro se agrega un formulario de contacto
function handleFormSubmit(formElement) {
    if (formElement) {
        formElement.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Formulario enviado');
            // Aquí se puede agregar lógica de validación y envío
        });
    }
}

/* ===== UTILIDAD: LOG DE VERSIÓN Y ESTADO ===== */

console.log('Portfolio Miguel Fernández - Versión 1.0 Cargada ✓');
