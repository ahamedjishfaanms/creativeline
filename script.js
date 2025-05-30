// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileOverlay = document.querySelector('.mobile-overlay');
const mobileClose = document.querySelector('.mobile-close');
const body = document.body;

// Toggle mobile menu
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    body.classList.toggle('no-scroll');
}

// Hamburger click
hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMobileMenu();
});

// Close button click
mobileClose.addEventListener('click', function() {
    toggleMobileMenu();
});

// Overlay click
mobileOverlay.addEventListener('click', function() {
    toggleMobileMenu();
});

// Desktop dropdown functionality
const desktopDropdownParents = document.querySelectorAll('.nav-links .has-dropdown');

desktopDropdownParents.forEach(parent => {
    parent.addEventListener('mouseenter', function() {
        const dropdown = this.querySelector('.dropdown-menu');
        dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
        dropdown.classList.add('active');
        this.querySelector('.dropdown-icon').className = 'fas fa-chevron-up dropdown-icon';
    });
    
    parent.addEventListener('mouseleave', function() {
        const dropdown = this.querySelector('.dropdown-menu');
        dropdown.style.maxHeight = '0';
        dropdown.classList.remove('active');
        this.querySelector('.dropdown-icon').className = 'fas fa-chevron-down dropdown-icon';
    });
});

// Mobile dropdown functionality
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const parent = this.closest('.has-dropdown');
        const dropdown = parent.querySelector('.dropdown-menu');
        
        // Close all other dropdowns first
        document.querySelectorAll('.mobile-menu .dropdown-menu').forEach(menu => {
            if (menu !== dropdown) {
                menu.classList.remove('active');
                menu.style.maxHeight = '0';
                menu.closest('.has-dropdown').querySelector('.dropdown-toggle i').className = 'fas fa-chevron-down';
            }
        });
        
        // Toggle current dropdown
        if (dropdown.classList.contains('active')) {
            dropdown.classList.remove('active');
            dropdown.style.maxHeight = '0';
            this.querySelector('i').className = 'fas fa-chevron-down';
        } else {
            dropdown.classList.add('active');
            dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
            this.querySelector('i').className = 'fas fa-chevron-up';
        }
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.has-dropdown')) {
        document.querySelectorAll('.mobile-menu .dropdown-menu').forEach(menu => {
            menu.classList.remove('active');
            menu.style.maxHeight = '0';
            menu.closest('.has-dropdown').querySelector('.dropdown-toggle i').className = 'fas fa-chevron-down';
        });
    }
});

// Close mobile menu when clicking a link (except dropdown toggles)
const mobileLinks = document.querySelectorAll('.mobile-menu-content a:not(.dropdown-toggle)');
mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
        toggleMobileMenu();
    });
});

// Close mobile menu when window is resized to desktop size
window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        body.classList.remove('no-scroll');
        
        // Reset all mobile dropdowns
        document.querySelectorAll('.mobile-menu .dropdown-menu').forEach(menu => {
            menu.classList.remove('active');
            menu.style.maxHeight = '0';
            menu.closest('.has-dropdown').querySelector('.dropdown-toggle i').className = 'fas fa-chevron-down';
        });
    }
});
// About Us Counter Animation
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the faster
    
    statNumbers.forEach(statNumber => {
        const target = +statNumber.getAttribute('data-count');
        const count = +statNumber.innerText;
        const increment = target / speed;
        
        if (count < target) {
            statNumber.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            statNumber.innerText = target;
        }
    });
}

// Intersection Observer to trigger animations when section comes into view
const aboutSection = document.querySelector('.about-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

if (aboutSection) {
    observer.observe(aboutSection);
}

// Enquiry Form Functionality
function initEnquiryForm() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.ticket-form');
    const enquireBtn = document.querySelector('.enquire-btn');
    
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            forms.forEach(form => {
                form.classList.remove('active');
                if (form.classList.contains(`${tabId}-form`)) {
                    form.classList.add('active');
                }
            });
        });
    });
    
    // Swap flight from/to
    const swapBtn = document.querySelector('.swap-btn');
    swapBtn.addEventListener('click', function() {
        const fromInput = document.getElementById('flight-from');
        const toInput = document.getElementById('flight-to');
        const temp = fromInput.value;
        fromInput.value = toInput.value;
        toInput.value = temp;
    });
    
    // Enquire button functionality
    enquireBtn.addEventListener('click', function() {
        const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-tab');
        let message = "Hi Creative Line Travels, I'm interested in:\n\n";
        
        switch(activeTab) {
            case 'flight':
                const from = document.getElementById('flight-from').value;
                const to = document.getElementById('flight-to').value;
                const departure = document.getElementById('departure-date').value;
                const returnDate = document.getElementById('return-date').value;
                const passengers = document.getElementById('passengers').value;
                const flightClass = document.getElementById('flight-class').value;
                
                message += `*Flight Enquiry*\n`;
                message += `From: ${from}\n`;
                message += `To: ${to}\n`;
                message += `Departure: ${departure}\n`;
                if (returnDate) message += `Return: ${returnDate}\n`;
                message += `Passengers: ${passengers}\n`;
                message += `Class: ${flightClass}`;
                break;
                
            case 'hotel':
                const destination = document.getElementById('hotel-destination').value;
                const checkIn = document.getElementById('check-in').value;
                const checkOut = document.getElementById('check-out').value;
                const rooms = document.getElementById('rooms').value;
                const hotelType = document.getElementById('hotel-type').value;
                
                message += `*Hotel Enquiry*\n`;
                message += `Destination: ${destination}\n`;
                message += `Check-in: ${checkIn}\n`;
                message += `Check-out: ${checkOut}\n`;
                message += `Rooms: ${rooms}\n`;
                message += `Hotel Type: ${hotelType}`;
                break;
                
            case 'tour':
                const tourDestination = document.getElementById('tour-destination').value;
                const tourType = document.getElementById('tour-type').value;
                const tourDates = document.getElementById('tour-dates').value;
                const tourPax = document.getElementById('tour-pax').value;
                const tourBudget = document.getElementById('tour-budget').value;
                
                message += `*Tour Package Enquiry*\n`;
                message += `Destination: ${tourDestination}\n`;
                message += `Tour Type: ${tourType}\n`;
                message += `Travel Dates: ${tourDates}\n`;
                message += `Number of People: ${tourPax}\n`;
                message += `Budget: ${tourBudget}`;
                break;
                
            case 'govt':
                const serviceType = document.getElementById('service-type').value;
                const serviceDetails = document.getElementById('service-details').value;
                const urgency = document.getElementById('urgency').value;
                
                message += `*Government Service Enquiry*\n`;
                message += `Service Type: ${serviceType}\n`;
                message += `Details: ${serviceDetails}\n`;
                message += `Urgency: ${urgency}`;
                break;
        }
        
        // Encode message for WhatsApp URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/971557504798?text=${encodedMessage}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initEnquiryForm();
});

// Improved Destination Cards Animation with Intersection Observer
function initDestinationCards() {
    const destinationCards = document.querySelectorAll('.destination-card');
    
    if (!destinationCards.length) return;
    
    // Set up Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay based on card position for staggered animation
                const index = Array.from(destinationCards).indexOf(entry.target);
                const delay = index * 100; // 100ms between each card
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }, delay);
            }
        });
    }, observerOptions);
    
    // Observe each card
    destinationCards.forEach(card => {
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
    
    // Add hover effects
    destinationCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Smooth hover effect handled by CSS
        });
        
        card.addEventListener('mouseleave', () => {
            // Smooth hover effect handled by CSS
        });
    });
}

// Infinite Carousel Animation
function initCustomerCarousel() {
    const customerTrack = document.querySelector('.customer-track');
    
    if (!customerTrack) return;
    
    // Clone the first few items and append to end for infinite effect
    const customerItems = customerTrack.querySelectorAll('.customer-item');
    const firstFewItems = Array.from(customerItems).slice(0, 4);
    
    firstFewItems.forEach(item => {
        const clone = item.cloneNode(true);
        customerTrack.appendChild(clone);
    });
    
    // Pause animation on hover
    customerTrack.addEventListener('mouseenter', () => {
        customerTrack.style.animationPlayState = 'paused';
    });
    
    customerTrack.addEventListener('mouseleave', () => {
        customerTrack.style.animationPlayState = 'running';
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCustomerCarousel();
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initDestinationCards();
    
    // If you need to re-run when new content is loaded (like with AJAX):
    // document.addEventListener('contentLoaded', initDestinationCards);
});


// If you're using modules or need to call this from another script:
// export { initDestinationCards };
