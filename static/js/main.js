document.addEventListener("DOMContentLoaded", function() {
    // --- CACHE DOM ELEMENTS ---
    const body = document.body;
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const header = document.getElementById('sticky-header');
    const heroSection = document.querySelector('.hero-brutalist');
    const floatingLogo = document.querySelector('.hero-floating-logo');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const moleGameFooter = document.querySelector('.mole-game-footer');
    const bottomNav = document.getElementById('bottom-nav');
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
    
    // --- NAVIGATION LOGIC (STICKY HEADER, FLOATING LOGO, BOTTOM NAV) ---
    if (heroSection) {
        // We are on the homepage
        const heroHeight = heroSection.offsetHeight;
        const navAppearPoint = heroHeight / 2; // Point at which nav appears

        window.addEventListener('scroll', () => {
            if(header) {
                header.classList.toggle('visible', window.scrollY > heroHeight);
            }
            if (floatingLogo) {
                floatingLogo.classList.toggle('hide', window.scrollY > 50);
            }
            if (bottomNav) {
                // Show bottom nav only after scrolling past the halfway point of the hero
                bottomNav.classList.toggle('hidden-nav', window.scrollY < navAppearPoint);
            }
        });
    } else if (bottomNav) {
        // If not on the homepage, always show the bottom nav
        bottomNav.classList.remove('hidden-nav');
    }

    // --- ANIMATION OBSERVER SYSTEM ---
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.id === 'stats-bar') {
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
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.project-card, .stat-item, #stats-bar').forEach(el => {
        animationObserver.observe(el);
    });
    
    // --- PROJECT CONNECTOR LINE LOGIC ---
    const svg = document.getElementById('connector-svg');
    const projectCards = document.querySelectorAll('.project-card');
    function drawConnectingLines() {
        if (!svg || projectCards.length < 2) return;
        
        svg.innerHTML = '';
        const containerRect = document.querySelector('.projects-section-container').getBoundingClientRect();
        let visibleCards = Array.from(projectCards).filter(card => card.offsetParent !== null);

        for (let i = 0; i < visibleCards.length - 1; i++) {
            const c1 = visibleCards[i];
            const c2 = visibleCards[i + 1];
            if (c1.closest('.projects-section') !== c2.closest('.projects-section')) continue;

            const r1 = c1.getBoundingClientRect();
            const r2 = c2.getBoundingClientRect();
            const isC1Even = Array.from(c1.parentNode.children).indexOf(c1) % 2 !== 0;
            let p1x, p2x, p1y, p2y;

            if (window.innerWidth > 768) {
                p1x = (isC1Even ? r1.right : r1.left) - containerRect.left;
                p2x = (!isC1Even ? r2.right : r2.left) - containerRect.left;
                p1y = r1.top + r1.height / 2 - containerRect.top;
                p2y = r2.top + r2.height / 2 - containerRect.top;
            } else {
                p1x = r1.left + r1.width / 2 - containerRect.left;
                p2x = r2.left + r2.width / 2 - containerRect.left;
                p1y = r1.bottom - containerRect.top;
                p2y = r2.top - containerRect.top;
            }

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const controlPointOffset = 100;
            let d;
            if (window.innerWidth > 768) {
                d = `M ${p1x} ${p1y} C ${p1x + (isC1Even ? controlPointOffset : -controlPointOffset)} ${p1y}, ${p2x + (!isC1Even ? controlPointOffset : -controlPointOffset)} ${p2y}, ${p2x} ${p2y}`;
            } else {
                 d = `M ${p1x} ${p1y} C ${p1x} ${p1y + controlPointOffset}, ${p2x} ${p2y - controlPointOffset}, ${p2x} ${p2y}`;
            }
            
            path.setAttribute('d', d);
            path.setAttribute('stroke', '#CCCCCC');
            path.setAttribute('stroke-width', '2');
            path.setAttribute('stroke-dasharray', '5 10');
            path.setAttribute('fill', 'none');
            svg.appendChild(path);
        }
    }
    setTimeout(drawConnectingLines, 200);
    window.addEventListener('resize', drawConnectingLines);
    
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
});