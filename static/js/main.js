document.addEventListener("DOMContentLoaded", function() {
    // --- THEME SWITCHER LOGIC ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    };

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';

    if (savedTheme) {
        currentTheme = savedTheme;
    } else if (prefersDark) {
        currentTheme = 'dark';
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
    
    // --- WHACK-A-MOLE GAME ---
    const moleGameFooter = document.querySelector('.mole-game-footer');
    if (moleGameFooter) {
        const moles = moleGameFooter.querySelectorAll('.mole');
        const whatsAppUrl = moleGameFooter.dataset.whatsappUrl;

        if (moles.length > 0) {
            let lastMole, timeUp = false;
            function randomTime(min, max) { return Math.round(Math.random() * (max - min) + min); }
            function randomMole(moles) {
                const idx = Math.floor(Math.random() * moles.length);
                const mole = moles[idx];
                if (mole === lastMole) return randomMole(moles);
                lastMole = mole;
                return mole;
            }
            function peep() {
                const time = randomTime(500, 1200);
                const mole = randomMole(moles);
                mole.classList.add('up');
                setTimeout(() => {
                    mole.classList.remove('up');
                    if (!timeUp) peep();
                }, time);
            }
            moles.forEach(mole => mole.addEventListener('click', e => {
                if (e.currentTarget.classList.contains('up') && whatsAppUrl) {
                    window.open(whatsAppUrl, "_blank");
                }
            }));
            peep();
        }
    }
});