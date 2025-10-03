document.addEventListener('DOMContentLoaded', () => {

    let deferredPrompt;
    const installButton = document.getElementById('pwa-install-button');
    const dismissButton = document.getElementById('pwa-dismiss-button');
    const installPromptContainer = document.getElementById('pwa-install-prompt');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        if (installPromptContainer) {
            installPromptContainer.style.display = 'block';
        }
    });

    if (installButton) {
        installButton.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                await deferredPrompt.userChoice;
                deferredPrompt = null;
                installPromptContainer.style.display = 'none';
            }
        });
    }

    if (dismissButton) {
        dismissButton.addEventListener('click', () => {
            installPromptContainer.style.display = 'none';
        });
    }

    const darkModeToggle = document.getElementById('darkModeToggle');
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.textContent = '☀️';
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                darkModeToggle.textContent = '☀️';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                darkModeToggle.textContent = '🌙';
            }
        });
    }
    
    const stickyHeader = document.getElementById('sticky-header');
    const bottomNav = document.getElementById('bottom-nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            if (stickyHeader) stickyHeader.classList.add('visible');
        } else {
            if (stickyHeader) stickyHeader.classList.remove('visible');
        }

        if (bottomNav) {
            if (window.scrollY > lastScrollY) {
                bottomNav.classList.add('hidden');
            } else {
                bottomNav.classList.remove('hidden');
            }
        }
        lastScrollY = window.scrollY;
    });

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                let current = 0;
                const increment = target / 200;
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.innerText = Math.ceil(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target.toLocaleString();
                    }
                };
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(counter => statsObserver.observe(counter));

    const drawConnectorLines = () => {
        const container = document.getElementById('primary-projects-container');
        const svg = document.getElementById('connector-svg');
        if (!container || !svg) return;

        const projects = Array.from(container.querySelectorAll('.project-card.primary'));
        svg.innerHTML = '';

        for (let i = 0; i < projects.length - 1; i++) {
            const p1 = projects[i];
            const p2 = projects[i + 1];
            const rect1 = p1.getBoundingClientRect();
            const rect2 = p2.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const x1 = rect1.left + rect1.width / 2 - containerRect.left;
            const y1 = rect1.bottom - containerRect.top;
            const x2 = rect2.left + rect2.width / 2 - containerRect.left;
            const y2 = rect2.top - containerRect.top;
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', `M${x1},${y1} C${x1},${y1 + 60} ${x2},${y2 - 60} ${x2},${y2}`);
            svg.appendChild(path);
        }
    };
    
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(drawConnectorLines, 100);
    });
    drawConnectorLines();

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                if (entry.target.classList.contains('primary')) {
                    const order = parseInt(entry.target.dataset.order, 10);
                    const path = document.querySelector(`#connector-svg path:nth-of-type(${order + 1})`);
                    if(path) {
                        path.style.transition = 'stroke-dashoffset 2s ease-out';
                        path.style.strokeDashoffset = '0';
                    }
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => animationObserver.observe(el));
    
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        window.onscroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        };
        scrollToTopBtn.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
    }

    const holes = document.querySelectorAll('.hole');
    let lastHole, timeUp = false;

    function randomTime(min, max) { return Math.round(Math.random() * (max - min) + min); }
    function randomHole(holes) {
        const idx = Math.floor(Math.random() * holes.length);
        const hole = holes[idx];
        if (hole === lastHole) return randomHole(holes);
        lastHole = hole;
        return hole;
    }

    function peep() {
        const time = randomTime(200, 1000);
        const hole = randomHole(holes);
        hole.classList.add('up');
        setTimeout(() => {
            hole.classList.remove('up');
            if (!timeUp) peep();
        }, time);
    }
    
    const gameFooter = document.getElementById('game-footer');
    const gameObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !timeUp) {
                timeUp = false;
                peep();
                setTimeout(() => timeUp = true, 30000);
            }
        });
    }, {threshold: 0.1});
    if(gameFooter) gameObserver.observe(gameFooter);

    if (document.querySelector('.featured-posts-slider')) {
        new Swiper('.featured-posts-slider', {
            loop: true, slidesPerView: 1, spaceBetween: 30,
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
        });
    }

    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeChatbot = document.getElementById('close-chatbot');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    let chatbotQAs = [];
    try { chatbotQAs = JSON.parse(document.getElementById('chatbot-data').textContent); } catch (e) {}

    if (chatbotToggle) chatbotToggle.addEventListener('click', () => chatbotWindow.style.display = 'flex');
    if (closeChatbot) closeChatbot.addEventListener('click', () => chatbotWindow.style.display = 'none');

    const addMessage = (text, sender) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', `${sender}-message`);
        messageElement.textContent = text;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    };

    const handleChat = () => {
        const userInput = chatbotInput.value.trim().toLowerCase();
        if (!userInput) return;
        addMessage(chatbotInput.value, 'user');
        chatbotInput.value = '';
        setTimeout(() => {
            const typingIndicator = document.createElement('div');
            typingIndicator.classList.add('chat-message', 'bot-message', 'typing');
            typingIndicator.innerHTML = '<span></span><span></span><span></span>';
            chatbotMessages.appendChild(typingIndicator);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            setTimeout(() => {
                chatbotMessages.removeChild(typingIndicator);
                let response = "I'm sorry, I don't have information about that. Please try another question.";
                const match = chatbotQAs.find(qa => userInput.includes(qa.keyword.toLowerCase()));
                if (match) response = match.answer;
                addMessage(response, 'bot');
            }, 1200);
        }, 300);
    };

    if (chatbotSend) chatbotSend.addEventListener('click', handleChat);
    if (chatbotInput) chatbotInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') handleChat(); });

    const filterContainer = document.querySelector('.tag-filters');
    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            if (e.target.matches('.tag-filter')) {
                filterContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                const tag = e.target.dataset.tag;
                const posts = document.querySelectorAll('.blog-grid .blog-card-wrapper');
                posts.forEach(post => {
                    const postTags = post.dataset.tags;
                    if (tag === 'all' || (postTags && postTags.includes(tag))) {
                        post.style.display = 'block';
                    } else {
                        post.style.display = 'none';
                    }
                });
            }
        });
    }
});