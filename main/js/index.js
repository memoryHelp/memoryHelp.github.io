// DOM Elements
let navbar = null;
const heroCards = document.querySelectorAll('.card');
const featureCards = document.querySelectorAll('.feature-card');
const techniqueCards = document.querySelectorAll('.technique-card');
const buttons = document.querySelectorAll('.btn');

// Function to initialize navbar scroll effect
function initializeNavbarScrollEffect() {
    navbar = document.querySelector('.navbar');
    if (navbar) {
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
}

// Try to initialize navbar scroll effect immediately
initializeNavbarScrollEffect();

// Also try again after a short delay to catch dynamically loaded navbar
setTimeout(() => {
    if (!navbar) {
        initializeNavbarScrollEffect();
    }
}, 100);

// Listen for navbar loaded event
window.addEventListener('navbarLoaded', () => {
    if (!navbar) {
        initializeNavbarScrollEffect();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Memory card animation on hover
heroCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.05) rotateZ(5deg)';
        card.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1) rotateZ(0deg)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    });
});

// Feature cards intersection observer for animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize feature cards animation
featureCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Initialize technique cards animation
techniqueCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    observer.observe(card);
});

// Button click effects
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Handle button actions
        const buttonText = this.textContent.trim();
        switch(buttonText) {
            case 'Get Started':
                window.location.href = 'elements.html';
                break;
            case 'Learn More':
                window.location.href = 'periodic-table.html';
                break;
            case 'Try Now':
                console.log('Try Now clicked');
                break;
            case 'Start Your Journey Today':
                window.location.href = 'elements.html';
                break;
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroHeight = hero.offsetHeight;
    
    if (scrolled < heroHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Memory cards rotation effect
let cardRotation = 0;
setInterval(() => {
    heroCards.forEach((card, index) => {
        const baseRotation = cardRotation + (index * 90);
        card.style.transform = `rotateY(${baseRotation}deg) translateZ(20px)`;
    });
    cardRotation += 2;
}, 100);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Handle keyboard shortcuts if needed
});