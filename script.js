// Streamlined Website Functionality
class VacationWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupBookingModal();
        this.setupScrollEffects();
        this.setupFloatingCards();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('team-member')) {
                        // Stagger team member animations
                        const teamMembers = document.querySelectorAll('.team-member');
                        teamMembers.forEach((member, index) => {
                            setTimeout(() => {
                                member.classList.add('animate');
                            }, index * 150);
                        });
                    } else if (entry.target.classList.contains('value')) {
                        // Animate mission values
                        const values = document.querySelectorAll('.value');
                        values.forEach((value, index) => {
                            setTimeout(() => {
                                value.style.opacity = '1';
                                value.style.transform = 'translateY(0)';
                            }, index * 200);
                        });
                    }
                }
            });
        }, observerOptions);

        // Observe team members
        document.querySelectorAll('.team-member').forEach(member => {
            observer.observe(member);
        });

        // Observe mission values
        document.querySelectorAll('.value').forEach(value => {
            value.style.opacity = '0';
            value.style.transform = 'translateY(30px)';
            value.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(value);
        });
    }

    setupBookingModal() {
        const bookBtn = document.getElementById('bookNowBtn');
        const modal = document.getElementById('bookModal');
        const closeBtn = document.querySelector('.modal-close');
        const overlay = document.querySelector('.modal-overlay');

        // Open modal
        bookBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });

        // Close modal
        const closeModal = () => {
            modal.classList.remove('active');
        };

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    setupScrollEffects() {
        const header = document.querySelector('header');

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Only change header background opacity based on scroll
            const opacity = Math.min(scrollTop / 100, 1);
            header.style.background = `rgba(0, 20, 40, ${0.95 + opacity * 0.05})`;
        });
    }

    setupFloatingCards() {
        const cards = document.querySelectorAll('.floating-card');
        
        cards.forEach((card, index) => {
            // Add click interaction
            card.addEventListener('click', () => {
                this.createRippleEffect(card);
                
                // Smooth scroll to mission section
                setTimeout(() => {
                    document.getElementById('mission').scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 300);
            });

            // Add mouse move effect (subtle)
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = rect.width / 2 - size / 2;
        const y = rect.height / 2 - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    // Smooth scrolling for any internal links (if added later)
    setupSmoothScrolling() {
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
    }
}

    // Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.vacationWebsite = new VacationWebsite();
    
    // Add ripple animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .floating-card {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});