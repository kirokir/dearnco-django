document.addEventListener("DOMContentLoaded", function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const body = document.body;

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

    const header = document.getElementById('sticky-header');
    const heroSection = document.querySelector('.hero-brutalist');
    if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        window.addEventListener('scroll', () => {
            if (window.scrollY > heroHeight) {
                header.classList.add('visible');
            } else {
                header.classList.remove('visible');
            }
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); } });
    }, { threshold: 0.15 });
    document.querySelectorAll('.project-card, .stat-item').forEach((el) => observer.observe(el));
    
    const statsBar = document.getElementById('stats-bar');
    if (statsBar) {
        const statsObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(num => {
                        const target = +num.getAttribute('data-target');
                        if (parseInt(num.innerText.replace(/,/g, '')) !== target) {
                            let current = 0; const duration = 2000; const increment = target / (duration / 16);
                            const updateCount = () => { current += increment; if (current < target) { num.innerText = Math.ceil(current).toLocaleString(); requestAnimationFrame(updateCount); } else { num.innerText = target.toLocaleString(); } };
                            requestAnimationFrame(updateCount);
                        }
                    });
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(statsBar);
    }

    const svg = document.getElementById('connector-svg');
    const cards = document.querySelectorAll('.project-card');
    function drawConnectingLines() {
        if (!svg || cards.length < 2) return;
        svg.innerHTML = '';
        const svgRect = svg.getBoundingClientRect();
        for (let i = 0; i < cards.length - 1; i++) {
            const c1 = cards[i], c2 = cards[i + 1], r1 = c1.getBoundingClientRect(), r2 = c2.getBoundingClientRect();
            if (r1.width === 0 || r2.width === 0) continue;
            const isC1Even = (i + 1) % 2 === 0;
            let p1x, p2x;
            if (window.innerWidth > 768) {
                p1x = isC1Even ? r1.left - svgRect.left : r1.right - svgRect.left;
                p2x = !isC1Even ? r2.left - svgRect.left : r2.right - svgRect.left;
            } else {
                p1x = r1.left + r1.width / 2 - svgRect.left;
                p2x = r2.left + r2.width / 2 - svgRect.left;
            }
            const p1y = r1.bottom - svgRect.top;
            const p2y = r2.top - svgRect.top;
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path'); 
            const cf = 100;
            const d = `M ${p1x} ${p1y} C ${p1x} ${p1y + cf}, ${p2x} ${p2y - cf}, ${p2x} ${p2y}`;
            path.setAttribute('d', d); 
            path.setAttribute('stroke', '#CCCCCC'); 
            path.setAttribute('stroke-width', '2'); 
            path.setAttribute('stroke-dasharray', '5 10'); 
            path.setAttribute('fill', 'none');
            svg.appendChild(path);
        }
    }
    setTimeout(drawConnectingLines, 100);
    window.addEventListener('resize', drawConnectingLines);

    const moles = document.querySelectorAll('.mole');
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
            if(e.currentTarget.classList.contains('up')){
                const whatsAppUrl = e.currentTarget.closest('.mole-game-footer').dataset.whatsappUrl;
                if (whatsAppUrl) {
                    window.open(whatsAppUrl, "_blank");
                }
            }
        }));
        peep();
    }
});