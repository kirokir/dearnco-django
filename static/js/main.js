document.addEventListener("DOMContentLoaded", function() {
    // --- NEW: TOP NAV BAR VISIBILITY ---
    const topNavBar = document.getElementById('top-nav-bar');
    if (topNavBar && topNavBar.classList.contains('hidden-nav')) {
        let heroSection = document.querySelector('.hero-brutalist');
        if (heroSection) {
            const heroHeight = heroSection.offsetHeight;
            window.addEventListener('scroll', () => {
                if (window.scrollY > heroHeight) {
                    topNavBar.classList.remove('hidden-nav');
                } else {
                    topNavBar.classList.add('hidden-nav');
                }
            });
        }
    } else if (topNavBar) {
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                topNavBar.style.top = '-100px';
            } else {
                topNavBar.style.top = '20px';
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    // --- NEW: BLOG CAROUSEL ---
    const featuredSlider = document.querySelector('.featured-posts-slider');
    if (featuredSlider) {
        const swiper = new Swiper('.featured-posts-slider', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    // --- HAMBURGER MENU LOGIC ---
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

    // --- FLOATING WIDGETS ---
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});