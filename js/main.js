document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Hamburger menu toggle
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const navMenu = document.getElementById('nav-menu');
    
    hamburgerIcon.addEventListener('click', function() {
        this.classList.toggle('open');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerIcon.classList.remove('open');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // RSVP form handling
    const rsvpForm = document.getElementById('rsvp-form');
    const thankYouMessage = document.getElementById('thank-you-message');
    
    // Form submission
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Hide the form and show the thank you message
            rsvpForm.style.opacity = '0';
            rsvpForm.style.transform = 'translateY(20px)';
            
            setTimeout(function() {
                rsvpForm.style.display = 'none';
                thankYouMessage.style.visibility = 'visible';
                thankYouMessage.style.opacity = '1';
            }, 500);
            
            // Here you would normally send the form data to a server
            // For this example, we're just showing the thank you message
        });
    }
    
    // Reveal animations on scroll
    const sections = document.querySelectorAll('section');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < windowHeight - revealPoint) {
                section.classList.add('visible');
            }
        });
    }
    
    // Check on load
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
    
    // Add placeholder image for hero background if needed
    const hero = document.querySelector('.hero');
    if (hero) {
        const img = new Image();
        img.onload = function() {
            // Image loaded successfully
        };
        img.onerror = function() {
            // If image fails to load, use a fallback color
            hero.style.backgroundImage = 'none';
            hero.style.backgroundColor = '#e8b4b8';
        };
        img.src = getComputedStyle(hero).backgroundImage.replace(/url$$(['"])?(.*?)\1$$/gi, '$2');
    }
});