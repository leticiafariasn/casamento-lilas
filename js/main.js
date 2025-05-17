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
    const attendingYes = document.getElementById('attending-yes');
    const attendingNo = document.getElementById('attending-no');
    const guestsGroup = document.getElementById('guests-group');
    
    // Show/hide guests dropdown based on attendance
    if (attendingYes && attendingNo && guestsGroup) {
        attendingYes.addEventListener('change', function() {
            guestsGroup.style.display = 'block';
        });
        
        attendingNo.addEventListener('change', function() {
            guestsGroup.style.display = 'none';
        });
    }
    
    // Form submission
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would normally send the form data to a server
            // For this example, we'll just show an alert
            alert('Obrigado por confirmar sua presença! Estamos ansiosos para celebrar com você.');
            rsvpForm.reset();
        });
    }
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.timeline-item');
    const sections = document.querySelectorAll('section');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
        
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
    
    // Add placeholder image for venue if needed
    const venueImage = document.getElementById('venue-image');
    if (venueImage && venueImage.getAttribute('src') === 'images/venue.jpg') {
        venueImage.onerror = function() {
            this.src = 'https://via.placeholder.com/600x400?text=Local+da+Cerimonia';
        };
    }
});