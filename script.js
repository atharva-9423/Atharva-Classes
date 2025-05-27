
// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
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



// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        standard: document.getElementById('standard').value,
        message: document.getElementById('message').value
    };
    
    // Validate form
    if (validateForm(formData)) {
        // Show success message
        showNotification('Thank you for your inquiry! We will contact you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', formData);
    }
});

// Form validation
function validateForm(data) {
    if (!data.name.trim()) {
        showNotification('Please enter the student name.', 'error');
        return false;
    }
    
    if (!data.email.trim() || !isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (!data.phone.trim() || !isValidPhone(data.phone)) {
        showNotification('Please enter a valid phone number.', 'error');
        return false;
    }
    
    if (!data.standard) {
        showNotification('Please select a standard.', 'error');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation (Indian format)
function isValidPhone(phone) {
    const phoneRegex = /^[+]?[0-9]{10,13}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.course-card, .feature-card, .feature-item, .about-text, .about-features');
    animateElements.forEach(el => observer.observe(el));
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Counter animation for stats
function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (element.textContent.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (element.textContent.includes('+')) {
            element.textContent = Math.floor(current) + '+';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-item h4');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/[^\d]/g, ''));
                animateCounter(stat, number);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 120,
        delay: 100
    });
});

// Back to Top Button functionality
const backToTopBtn = document.getElementById('backToTop');

// Show/hide back to top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

// Smooth scroll to top when button is clicked
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-placeholder');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            if (text.charAt(i) === '<') {
                // Skip HTML tags
                let tagEnd = text.indexOf('>', i);
                if (tagEnd !== -1) {
                    element.innerHTML += text.slice(i, tagEnd + 1);
                    i = tagEnd + 1;
                }
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Testimonials Carousel
class TestimonialsCarousel {
    constructor() {
        this.track = document.getElementById('testimonialTrack');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentSlide = 0;
        this.totalSlides = document.querySelectorAll('.testimonial-card').length;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        if (!this.track) return;
        
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Start auto-play
        this.startAutoPlay();
        
        // Pause auto-play on hover
        const carousel = document.querySelector('.testimonials-carousel');
        carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Touch/swipe support for mobile
        this.addTouchSupport();
    }
    
    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateCarousel();
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }
    
    updateCarousel() {
        // Move track
        const translateX = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
        
        // Update buttons (keep enabled for infinite carousel)
        this.prevBtn.disabled = false;
        this.nextBtn.disabled = false;
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        let isDragging = false;
        let isHorizontalSwipe = false;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
            isHorizontalSwipe = false;
            this.stopAutoPlay();
        }, { passive: true });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = Math.abs(startX - currentX);
            const diffY = Math.abs(startY - currentY);
            
            // Determine if this is a horizontal swipe
            if (diffX > diffY && diffX > 10) {
                isHorizontalSwipe = true;
                e.preventDefault(); // Only prevent default for horizontal swipes
            } else if (diffY > diffX && diffY > 10) {
                // This is a vertical scroll, allow it
                isHorizontalSwipe = false;
                isDragging = false;
                this.startAutoPlay();
                return;
            }
        }, { passive: false });
        
        this.track.addEventListener('touchend', (e) => {
            if (!isDragging || !isHorizontalSwipe) {
                this.startAutoPlay();
                return;
            }
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            // Only trigger slide change for significant horizontal swipes
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            
            isDragging = false;
            isHorizontalSwipe = false;
            this.startAutoPlay();
        }, { passive: true });
    }
}



// Gallery and Lightbox functionality
class GalleryLightbox {
    constructor() {
        this.modal = document.getElementById('lightboxModal');
        this.closeBtn = document.querySelector('.lightbox-close');
        this.prevBtn = document.querySelector('.lightbox-prev');
        this.nextBtn = document.querySelector('.lightbox-next');
        this.lightboxTitle = document.getElementById('lightboxTitle');
        this.lightboxDescription = document.getElementById('lightboxDescription');
        this.currentImageIndex = 0;
        
        this.galleryData = {
            'classroom-1': {
                title: 'Interactive Learning Session',
                description: 'Our experienced teachers use modern teaching methods to make Mathematics easy and engaging for students.',
                icon: 'fas fa-chalkboard-teacher'
            },
            'classroom-2': {
                title: 'Personal Attention',
                description: 'Small batch sizes ensure every student gets individual attention during Science practical sessions.',
                icon: 'fas fa-users'
            },
            'learning-1': {
                title: 'Focused Learning',
                description: 'Students actively participating in group discussions and collaborative learning activities.',
                icon: 'fas fa-book-reader'
            },
            'success-1': {
                title: 'Board Exam Toppers',
                description: 'Our Class 10th students achieving outstanding results in board examinations with 95%+ scores.',
                icon: 'fas fa-graduation-cap'
            }
        };
        
        this.imageKeys = Object.keys(this.galleryData);
        this.init();
    }
    
    init() {
        // Add click listeners to gallery view buttons
        document.querySelectorAll('.gallery-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const imageKey = btn.getAttribute('data-image');
                this.openLightbox(imageKey);
            });
        });
        
        // Add click listeners to gallery cards
        document.querySelectorAll('.gallery-card').forEach(card => {
            card.addEventListener('click', () => {
                const btn = card.querySelector('.gallery-view-btn');
                const imageKey = btn.getAttribute('data-image');
                this.openLightbox(imageKey);
            });
        });
        
        // Close button
        this.closeBtn.addEventListener('click', () => this.closeLightbox());
        
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.previousImage());
        this.nextBtn.addEventListener('click', () => this.nextImage());
        
        // Close on overlay click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal.classList.contains('active')) {
                switch(e.key) {
                    case 'Escape':
                        this.closeLightbox();
                        break;
                    case 'ArrowLeft':
                        this.previousImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });
    }
    
    openLightbox(imageKey) {
        const data = this.galleryData[imageKey];
        this.currentImageIndex = this.imageKeys.indexOf(imageKey);
        
        this.updateLightboxContent(data);
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeLightbox() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    previousImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.imageKeys.length) % this.imageKeys.length;
        const imageKey = this.imageKeys[this.currentImageIndex];
        const data = this.galleryData[imageKey];
        this.updateLightboxContent(data);
    }
    
    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.imageKeys.length;
        const imageKey = this.imageKeys[this.currentImageIndex];
        const data = this.galleryData[imageKey];
        this.updateLightboxContent(data);
    }
    
    updateLightboxContent(data) {
        this.lightboxTitle.textContent = data.title;
        this.lightboxDescription.textContent = data.description;
        
        // Update the icon
        const iconElement = document.querySelector('.lightbox-placeholder i');
        iconElement.className = data.icon;
    }
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }
    
    // Initialize testimonials carousel
    new TestimonialsCarousel();
    
    // Initialize gallery lightbox
    new GalleryLightbox();
});
