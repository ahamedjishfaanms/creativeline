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