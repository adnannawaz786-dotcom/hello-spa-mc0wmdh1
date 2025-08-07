// Enhanced interactivity for Hello SPA
document.addEventListener('DOMContentLoaded', function() {
    const helloText = document.querySelector('.hello-text');
    const container = document.querySelector('.container');
    
    // Add dynamic greeting based on time of day
    function updateGreeting() {
        const now = new Date();
        const hour = now.getHours();
        let greeting = 'Hello';
        
        if (hour < 12) {
            greeting = 'Good Morning';
        } else if (hour < 17) {
            greeting = 'Good Afternoon';
        } else {
            greeting = 'Good Evening';
        }
        
        if (helloText) {
            helloText.textContent = greeting;
        }
    }
    
    // Add click interaction with ripple effect
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }
    
    // Add floating animation particles
    function createFloatingParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    // Add CSS for particles and ripple effect
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .particles {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
            }
            
            .particle {
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                animation: float linear infinite;
            }
            
            @keyframes float {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-10px) rotate(360deg);
                    opacity: 0;
                }
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 600ms linear;
                background-color: rgba(255, 255, 255, 0.6);
                pointer-events: none;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .hello-text {
                transition: transform 0.3s ease, color 0.3s ease;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            
            .hello-text:hover {
                transform: scale(1.05);
                color: #ffffff;
            }
            
            .hello-text:active {
                transform: scale(0.98);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add keyboard navigation
    function handleKeyboard(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            if (document.activeElement === helloText) {
                event.preventDefault();
                helloText.click();
            }
        }
        
        if (event.key === 'r' || event.key === 'R') {
            updateGreeting();
        }
    }
    
    // Theme toggle functionality
    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    }
    
    // Load saved theme
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
    
    // Initialize all features
    function init() {
        try {
            updateGreeting();
            addDynamicStyles();
            createFloatingParticles();
            loadTheme();
            
            // Add event listeners
            if (helloText) {
                helloText.addEventListener('click', createRipple);
                helloText.setAttribute('tabindex', '0');
                helloText.setAttribute('role', 'button');
                helloText.setAttribute('aria-label', 'Interactive greeting text');
            }
            
            document.addEventListener('keydown', handleKeyboard);
            
            // Update greeting every hour
            setInterval(updateGreeting, 3600000);
            
            // Add double-click to toggle theme
            if (container) {
                container.addEventListener('dblclick', toggleTheme);
            }
            
            console.log('Hello SPA initialized successfully');
        } catch (error) {
            console.error('Error initializing Hello SPA:', error);
        }
    }
    
    // Initialize the application
    init();
});

// Service worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Handle visibility change to pause/resume animations
document.addEventListener('visibilitychange', function() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        if (document.hidden) {
            particle.style.animationPlayState = 'paused';
        } else {
            particle.style.animationPlayState = 'running';
        }
    });
});