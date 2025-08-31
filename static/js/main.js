document.addEventListener("DOMContentLoaded", function() {
    // --- CACHE DOM ELEMENTS ---
    const body = document.body;
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const header = document.getElementById('sticky-header');
    const heroSection = document.querySelector('.hero-brutalist');
    const floatingLogo = document.querySelector('.hero-floating-logo');
    const statsBar = document.getElementById('stats-bar');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const moleGameFooter = document.querySelector('.mole-game-footer');
    let deferredPrompt;
    const installPrompt = document.getElementById('pwa-install-prompt');
    const installButton = document.getElementById('pwa-install-button');
    const closePwaButton = document.getElementById('pwa-close-button');

    // --- PWA INSTALL PROMPT ---
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        setTimeout(() => {
            if (installPrompt) installPrompt.classList.add('visible');
        }, 5000);
    });
    if (installButton) {
        installButton.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                await deferredPrompt.userChoice;
                deferredPrompt = null;
                installPrompt.classList.remove('visible');
            }
        });
    }
    if (closePwaButton) {
        closePwaButton.addEventListener('click', () => {
            installPrompt.classList.remove('visible');
        });
    }

    // --- THEME SWITCHER LOGIC ---
    const applyTheme = (theme) => {
        if (theme === 'dark') { body.classList.add('dark-mode'); } 
        else { body.classList.remove('dark-mode'); }
    };
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    let initialTheme = body.classList.contains('dark-mode-default') ? 'dark' : 'light';
    if (savedTheme) { initialTheme = savedTheme; } 
    else if (prefersDark) { initialTheme = 'dark'; }
    applyTheme(initialTheme);
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
    
    // --- STICKY HEADER & FLOATING LOGO LOGIC ---
    if (header && heroSection) {
        const heroHeight = heroSection.offsetHeight;
        window.addEventListener('scroll', () => {
            header.classList.toggle('visible', window.scrollY > heroHeight);
            if (floatingLogo) {
                floatingLogo.classList.toggle('hide', window.scrollY > 50);
            }
        });
    }

    // --- FADE-IN ANIMATIONS (IMPROVED) ---
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target); // Stop observing after it's visible
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.project-card, .stat-item').forEach(el => observer.observe(el));

    // --- STATS COUNTER ---
    if (statsBar) {
        new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(num => {
                        const target = +num.getAttribute('data-target');
                        if (parseInt(num.innerText.replace(/,/g, '')) === target) return;
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
                    });
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 }).observe(statsBar);
    }
    
    // --- FLOATING WIDGETS ---
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            scrollToTopBtn.classList.toggle('visible', window.pageYOffset > 300);
        });
        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // --- MOLE GAME ---
    if (moleGameFooter) {
        const moles = moleGameFooter.querySelectorAll('.mole');
        const whatsAppUrl = moleGameFooter.dataset.whatsappUrl;
        if (moles.length > 0) {
            let lastMole, timeUp = false;
            const randomTime = (min, max) => Math.round(Math.random() * (max - min) + min);
            const randomMole = (moles) => {
                const idx = Math.floor(Math.random() * moles.length);
                const mole = moles[idx];
                return mole === lastMole ? randomMole(moles) : (lastMole = mole, mole);
            };
            const peep = () => {
                const time = randomTime(500, 1200);
                const mole = randomMole(moles);
                mole.classList.add('up');
                setTimeout(() => {
                    mole.classList.remove('up');
                    if (!timeUp) peep();
                }, time);
            };
            moles.forEach(mole => mole.addEventListener('click', e => {
                if (e.currentTarget.classList.contains('up') && whatsAppUrl) {
                    window.open(whatsAppUrl, "_blank");
                }
            }));
            peep();
        }
    }
    
    // Mobile bottom nav is CSS only, no JS needed
});