document.addEventListener("DOMContentLoaded", function() {
    // --- CACHE DOM ELEMENTS ---
    const body = document.body;
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const header = document.getElementById('sticky-header');
    const heroSection = document.querySelector('.hero-brutalist');
    const floatingLogo = document.querySelector('.hero-floating-logo');
    const statsBar = document.getElementById('stats-bar');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const chatPopupBtn = document.getElementById('chat-popup');
    const chatWidget = document.getElementById('chat-widget');
    const closeChatWidgetBtn = document.getElementById('close-chat-widget');
    const chatInput = document.getElementById('chat-input');
    const answerArea = document.getElementById('chat-answer-area');
    const bubblesContainer = document.querySelector('.faq-bubbles');
    const autocompleteList = document.getElementById('autocomplete-list');
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
                const { outcome } = await deferredPrompt.userChoice;
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

    // --- HAMBURGER MENU LOGIC ---
    if (hamburgerBtn && mobileNav) {
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = hamburgerBtn.classList.toggle('open');
            mobileNav.classList.toggle('open');
            body.style.overflow = isOpen ? 'hidden' : '';
        });
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('open');
                mobileNav.classList.remove('open');
                body.style.overflow = '';
            });
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

    // --- FADE-IN ANIMATIONS ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
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
    
    // --- CHATBOT LOGIC ---
    if (chatPopupBtn && chatWidget && closeChatWidgetBtn) {
        let qaData = [];
        document.querySelectorAll('.faq-bubble').forEach(bubble => {
            qaData.push({
                keyword: bubble.textContent,
                question: bubble.dataset.question,
                answer: bubble.dataset.answer,
            });
        });

        chatPopupBtn.addEventListener('click', () => chatWidget.classList.toggle('visible'));
        closeChatWidgetBtn.addEventListener('click', () => chatWidget.classList.remove('visible'));
        
        bubblesContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('faq-bubble')) {
                answerArea.innerHTML = `<p class="bot-answer">${e.target.dataset.answer}</p>`;
                chatInput.value = '';
                autocompleteList.innerHTML = '';
            }
        });

        chatInput.addEventListener('input', () => {
            const query = chatInput.value.toLowerCase();
            autocompleteList.innerHTML = '';
            if (query.length > 1) {
                const matches = qaData.filter(item => item.question.toLowerCase().includes(query));
                matches.forEach(match => {
                    const item = document.createElement('div');
                    item.classList.add('autocomplete-item');
                    item.textContent = match.question;
                    item.addEventListener('click', () => {
                        chatInput.value = match.question;
                        answerArea.innerHTML = `<p class="bot-answer">${match.answer}</p>`;
                        autocompleteList.innerHTML = '';
                    });
                    autocompleteList.appendChild(item);
                });
            }
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