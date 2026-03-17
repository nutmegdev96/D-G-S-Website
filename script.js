/**
 * script.js - Dolci Sardi Gioiello
 * Interattività e funzionalità per il sito della pasticceria sarda
 */

// =============================================
// ATTENDI CARICAMENTO COMPLETO DEL DOM
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initScrollAnimations();
    initMobileMenu();
    initImageZoom();
    initContactButtons();
    initParallaxEffect();
    initCardHoverEffects();
    initBackToTop();
    initLazyLoading();
});

// =============================================
// 1. SMOOTH SCROLL PER I LINK INTERNI
// =============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            // Ignora se è un link vuoto o solo "#"
            if (link.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
                
                // Aggiorna URL senza ricaricare
                history.pushState(null, null, targetId);
            }
        });
    });
}

// =============================================
// 2. ANIMAZIONI ALLO SCROLL
// =============================================
function initScrollAnimations() {
    // Seleziona elementi da animare
    const animatedElements = document.querySelectorAll(
        '.card-item, .title, .desc, .text-2, .group-4, .photo, .i-nostri-DOLCI'
    );
    
    // Configurazione Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Opzionale: smetti di osservare dopo l'animazione
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Osserva ogni elemento
    animatedElements.forEach(element => {
        element.classList.add('fade-out');
        observer.observe(element);
    });
    
    // Aggiungi stili per le animazioni
    addAnimationStyles();
}

function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .fade-out {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .card-item {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-item:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.15);
        }
        
        .photo {
            transition: transform 0.3s ease;
        }
        
        .photo:hover {
            transform: scale(1.02);
        }
    `;
    document.head.appendChild(style);
}

// =============================================
// 3. MENU MOBILE (HAMBURGER)
// =============================================
function initMobileMenu() {
    // Crea il menu mobile se non esiste
    if (!document.querySelector('.mobile-menu')) {
        createMobileMenu();
    }
    
    // Gestisci resize per mostrare/nascondere menu mobile
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        }, 250);
    });
}

function createMobileMenu() {
    // Crea hamburger button
    const header = document.querySelector('header') || document.querySelector('.first-lines');
    if (!header) return;
    
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger-menu';
    hamburger.setAttribute('aria-label', 'Menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Crea menu mobile
    const mobileMenu = document.createElement('nav');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.setAttribute('aria-hidden', 'true');
    
    // Aggiungi link al menu
    const menuItems = [
        { text: 'Home', href: '#home' },
        { text: 'I Nostri Dolci', href: '#dolci' },
        { text: 'La Storia', href: '#storia' },
        { text: 'Contatti', href: '#contatti' }
    ];
    
    const ul = document.createElement('ul');
    menuItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = item.text;
        a.href = item.href;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileMenu();
            const target = document.querySelector(item.href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
        li.appendChild(a);
        ul.appendChild(li);
    });
    
    mobileMenu.appendChild(ul);
    
    // Aggiungi al DOM
    header.appendChild(hamburger);
    header.appendChild(mobileMenu);
    
    // Event listener per hamburger
    hamburger.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('open');
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Aggiungi stili menu mobile
    addMobileMenuStyles();
}

function openMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger-menu');
    if (menu && hamburger) {
        menu.classList.add('open');
        menu.setAttribute('aria-hidden', 'false');
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger-menu');
    if (menu && hamburger) {
        menu.classList.remove('open');
        menu.setAttribute('aria-hidden', 'true');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}

function addMobileMenuStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .hamburger-menu {
            display: none;
            flex-direction: column;
            justify-content: space-around;
            width: 40px;
            height: 40px;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 10px;
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        }
        
        .hamburger-menu span {
            width: 100%;
            height: 3px;
            background: #8B4513;
            border-radius: 3px;
            transition: all 0.3s ease;
        }
        
        .hamburger-menu.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger-menu.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger-menu.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }
        
        .mobile-menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            max-width: 400px;
            height: 100vh;
            background: white;
            box-shadow: -2px 0 10px rgba(0,0,0,0.1);
            z-index: 999;
            transition: right 0.3s ease;
            padding: 80px 40px;
        }
        
        .mobile-menu.open {
            right: 0;
        }
        
        .mobile-menu ul {
            list-style: none;
            padding: 0;
        }
        
        .mobile-menu li {
            margin-bottom: 30px;
        }
        
        .mobile-menu a {
            color: #333;
            text-decoration: none;
            font-size: 24px;
            font-family: 'Playfair Display', serif;
            transition: color 0.3s;
        }
        
        .mobile-menu a:hover {
            color: #8B4513;
        }
        
        @media (max-width: 768px) {
            .hamburger-menu {
                display: flex;
            }
        }
    `;
    document.head.appendChild(style);
}

// =============================================
// 4. ZOOM IMMAGINI AL CLICK (GALLERY)
// =============================================
function initImageZoom() {
    const images = document.querySelectorAll('.img-2, .image, .image-3, .image-5, .image-6, .photo');
    
    images.forEach(img => {
        img.addEventListener('click', (e) => {
            createImageModal(e.target.src, e.target.alt);
        });
        
        // Aggiungi indicatore visivo che l'immagine è cliccabile
        img.style.cursor = 'pointer';
    });
}

function createImageModal(src, alt) {
    // Rimuovi modale esistente
    const existingModal = document.querySelector('.image-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Crea modale
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'Ingrandimento immagine');
    
    // Crea contenuto modale
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" aria-label="Chiudi">&times;</button>
            <img src="${src}" alt="${alt || 'Immagine ingrandita'}">
            <p class="modal-caption">${alt || ''}</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Anima entrata
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Eventi chiusura
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => closeModal(modal));
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Chiudi con ESC
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

function closeModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.remove();
    }, 300);
}

// =============================================
// 5. GESTIONE CONTATTI (TELEFONO E EMAIL)
// =============================================
function initContactButtons() {
    // Rendi cliccabili i numeri di telefono
    const phoneNumbers = document.querySelectorAll('.text-wrapper-6');
    phoneNumbers.forEach(phone => {
        phone.addEventListener('click', () => {
            const number = phone.textContent.replace(/\s/g, '');
            if (confirm(`Vuoi chiamare il numero ${phone.textContent}?`)) {
                window.location.href = `tel:${number}`;
            }
        });
        phone.style.cursor = 'pointer';
    });
    
    // Gestione email
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(email => {
        email.addEventListener('click', (e) => {
            e.preventDefault();
            const emailAddr = email.getAttribute('href').replace('mailto:', '');
            if (confirm(`Vuoi inviare una email a ${emailAddr}?`)) {
                window.location.href = `mailto:${emailAddr}`;
            }
        });
    });
}

// =============================================
// 6. EFFETTO PARALLAX SEMPLICE
// =============================================
function initParallaxEffect() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                
                // Effetto parallax per l'immagine hero
                const heroImage = document.querySelector('.photo');
                if (heroImage) {
                    const speed = 0.5;
                    heroImage.style.transform = `translateY(${scrolled * speed}px)`;
                }
                
                // Effetto per le linee decorative
                const lines = document.querySelector('.lines');
                if (lines) {
                    lines.style.transform = `translateY(${scrolled * 0.2}px)`;
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// =============================================
// 7. EFFETTI HOVER PER LE CARD
// =============================================
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.card-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const img = card.querySelector('img:not(.shadow-line-2)');
            if (img) {
                img.style.transform = 'scale(1.05)';
                img.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', (e) => {
            const img = card.querySelector('img:not(.shadow-line-2)');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
}

// =============================================
// 8. BOTTONI TORNA SU
// =============================================
function initBackToTop() {
    // Crea bottone
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Torna su');
    backToTop.innerHTML = '↑';
    backToTop.style.display = 'none';
    
    document.body.appendChild(backToTop);
    
    // Mostra/nascondi bottone
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    // Click handler
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Aggiungi stili
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 40px;
            right: 40px;
            width: 50px;
            height: 50px;
            background: #8B4513;
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            z-index: 99;
        }
        
        .back-to-top:hover {
            background: #A0522D;
            transform: translateY(-5px);
            box-shadow: 0 6px 15px rgba(0,0,0,0.3);
        }
        
        @media (max-width: 768px) {
            .back-to-top {
                bottom: 20px;
                right: 20px;
                width: 40px;
                height: 40px;
                font-size: 20px;
            }
        }
    `;
    document.head.appendChild(style);
}

// =============================================
// 9. CARICAMENTO LAZY PER LE IMMAGINI
// =============================================
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.classList.add('loaded');
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        // Prepara immagini per lazy loading
        const images = document.querySelectorAll('img[src]');
        images.forEach(img => {
            const src = img.src;
            img.setAttribute('data-src', src);
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            imageObserver.observe(img);
        });
        
        // Aggiungi stile per immagini caricate
        const style = document.createElement('style');
        style.textContent = `
            img.loaded {
                opacity: 1 !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// =============================================
// 10. UTILITY: DETECT TOUCH DEVICE
// =============================================
function isTouchDevice() {
    return ('ontouchstart' in window) || 
           (navigator.maxTouchPoints > 0) || 
           (navigator.msMaxTouchPoints > 0);
}

// Aggiungi classe al body se è dispositivo touch
if (isTouchDevice()) {
    document.body.classList.add('touch-device');
}

// =============================================
// 11. GESTIONE PERFORMANCE E ERRORI
// =============================================
window.addEventListener('error', (e) => {
    console.error('Errore caricamento risorsa:', e.target.src || e.message);
});

// Registra Service Worker per PWA (opzionale)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Puoi abilitare questo per funzionalità offline
        // navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed:', err));
    });
}

// Esporta funzioni per uso globale (opzionale)
window.dolciSardi = {
    smoothScroll: initSmoothScroll,
    openModal: createImageModal,
    closeModal: closeModal
};
