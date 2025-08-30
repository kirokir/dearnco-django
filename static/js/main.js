document.addEventListener("DOMContentLoaded", function() {
    // --- THEME SWITCHER LOGIC ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;

    // Function to apply the theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    };

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    // Check for OS preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Determine initial theme
    let currentTheme = 'light'; // Default
    if (body.classList.contains('dark-mode')) { // Check if Django rendered dark-mode class
        currentTheme = 'dark';
    }

    if (savedTheme) {
        currentTheme = savedTheme;
    }
    
    applyTheme(currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // --- HAMBURGER MENU LOGIC ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNav = document.getElementById('mobile-nav');

    if (hamburgerBtn && mobileNav) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('open');
            mobileNav.classList.toggle('open');
            body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
        });
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('open');
                mobileNav.classList.remove('open');
                body.style.overflow = '';
            });
        });
    }

    // --- STICKY HEADER LOGIC ---
    const header = document.getElementById('sticky-header');
    const heroSection = document.querySelector('.hero-brutalist');
    if (header && heroSection) {
        const heroHeight = heroSection.offsetHeight;
        window.addEventListener('scroll', () => {
            if (window.scrollY > heroHeight) {
                header.classList.add('visible');
            } else {
                header.classList.remove('visible');
            }
        });
    }

    // --- FLOATING HERO LOGO ---
    const floatingLogo = document.querySelector('.hero-floating-logo');
    if (floatingLogo) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { 
                floatingLogo.classList.add('hide');
            } else {
                floatingLogo.classList.remove('hide');
            }
        });
    }

    // --- FADE-IN ANIMATIONS ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.project-card, .stat-item').forEach((el) => observer.observe(el));

    // --- STATS COUNTER ANIMATION ---
    const statsBar = document.getElementById('stats-bar');
    if (statsBar) {
        const statsObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(num => {
                        const target = +num.getAttribute('data-target');
                        if (parseInt(num.innerText.replace(/,/g, '')) !== target) {
                            let current = 0;
                            const duration = 2000;
                            const increment = target / (duration / 16);
                            const updateCount = () => {
                                current += increment;
                                if (current < target) {
                                    num.innerText = Math.ceil(current).toLocaleString();
                                    requestAnimationFrame(updateCount);
                                } else {
                                    num.innerText = target.toLocaleString();
                                }
                            };
                            requestAnimationFrame(updateCount);
                        }
                    });
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(statsBar);
    }
});