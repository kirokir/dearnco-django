/* ══════════════════════════════════════════════════════════════
   KINBO GAMEVERSE — Main Application Logic & Router
   ══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    // ── Elements ──────────────────────────────────────────────────
    const appContainer = document.getElementById('app');
    const homeScreen = document.getElementById('home-screen');
    const gameScreen = document.getElementById('game-screen');
    const gameGrid = document.getElementById('game-grid');
    const categoryFilter = document.getElementById('category-filter');
    const searchInput = document.getElementById('search-input');
    
    // Game Screen Elements
    const gameCanvas = document.getElementById('game-canvas');
    const gameTitleBar = document.getElementById('game-title-bar');
    const hsValue = document.getElementById('hs-value');
    const backBtn = document.getElementById('back-btn');
    const touchControls = document.getElementById('touch-controls');
    
    // Game Over Elements
    const gameOverOverlay = document.getElementById('game-over-overlay');
    const finalScore = document.getElementById('final-score');
    const finalHighscore = document.getElementById('final-highscore');
    const newRecord = document.getElementById('new-record');
    const playAgainBtn = document.getElementById('play-again-btn');
    const homeBtn = document.getElementById('home-btn');

    // ── Global State ──────────────────────────────────────────────
    let engine = new GameEngine(gameCanvas);
    let currentGameData = null;
    let activeCategory = 'all';

    // ── Background Canvas Effect ──────────────────────────────────
    const bgCanvas = document.getElementById('bg-canvas');
    const bgCtx = bgCanvas.getContext('2d');
    let bgParticles = [];
    
    function resizeBg() {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
    }
    
    function initBg() {
        resizeBg();
        window.addEventListener('resize', resizeBg);
        bgParticles = [];
        for(let i = 0; i < 40; i++) {
            bgParticles.push({
                x: Math.random() * bgCanvas.width,
                y: Math.random() * bgCanvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                alpha: Math.random() * 0.5 + 0.1
            });
        }
        requestAnimationFrame(renderBg);
    }
    
    function renderBg() {
        bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        bgParticles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            if(p.x < 0) p.x = bgCanvas.width;
            if(p.x > bgCanvas.width) p.x = 0;
            if(p.y < 0) p.y = bgCanvas.height;
            if(p.y > bgCanvas.height) p.y = 0;
            
            bgCtx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
            bgCtx.beginPath();
            bgCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            bgCtx.fill();
        });
        requestAnimationFrame(renderBg);
    }
    
    initBg();

    // ── Home Screen Initialization ────────────────────────────────
    
    function initHome() {
        // Build category filters
        CATEGORIES.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'filter-pill';
            btn.textContent = cat;
            btn.dataset.category = cat;
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeCategory = cat;
                filterGames();
            });
            categoryFilter.appendChild(btn);
        });

        // Search listener
        searchInput.addEventListener('input', filterGames);
        
        // Initial render
        renderGameGrid(GAME_DATA);
    }
    
    function filterGames() {
        const query = searchInput.value.toLowerCase();
        const filtered = GAME_DATA.filter(g => {
            const matchCat = activeCategory === 'all' || g.category === activeCategory;
            const matchSearch = g.title.toLowerCase().includes(query) || 
                                g.genre.toLowerCase().includes(query) || 
                                g.desc.toLowerCase().includes(query);
            return matchCat && matchSearch;
        });
        renderGameGrid(filtered);
    }

    function renderGameGrid(games) {
        gameGrid.innerHTML = '';
        if (games.length === 0) {
            gameGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--c-mid); padding: 40px;">No games found. Try a different search!</div>';
            return;
        }
        
        games.forEach(g => {
            const hs = engine.storage.getHighScore(g.storageKey);
            
            const tile = document.createElement('div');
            tile.className = 'game-tile';
            // Set dynamic color property for the background
            tile.style.setProperty('--tile-color', g.color);
            
            // Add a subtle gradient background based on the game's color
            tile.innerHTML = `
                <div class="tile-sphere" style="background: radial-gradient(circle at 30% 30%, ${g.color} 0%, rgba(26,26,62,0.8) 80%); border: 2px solid ${g.color}44;"></div>
                <div class="tile-emoji">${g.emoji}</div>
                <div class="tile-title">${g.title}</div>
                <div class="tile-badge" style="background: ${g.color}">${g.genre}</div>
                ${hs > 0 ? `<div class="tile-highscore">🏆 ${hs}</div>` : ''}
                <div class="tile-tooltip">
                    <div class="tt-title">${g.title}</div>
                    <div class="tt-genre" style="color: ${g.color}">${g.genre}</div>
                    <div class="tt-desc">${g.desc}</div>
                    <div class="tt-diff" style="background: ${g.difficulty==='Easy'?'#27AE60':g.difficulty==='Medium'?'#F1C40F':'#E74C3C'}33; color: ${g.difficulty==='Easy'?'#27AE60':g.difficulty==='Medium'?'#F1C40F':'#E74C3C'}">
                        ${g.difficulty}
                    </div>
                </div>
            `;
            
            tile.addEventListener('click', () => {
                window.location.hash = `#game/${g.id}`;
            });
            
            gameGrid.appendChild(tile);
        });
    }

    // ── Routing & Navigation ──────────────────────────────────────
    
    function handleHashChange() {
        const hash = window.location.hash;
        
        if (hash.startsWith('#game/')) {
            const id = parseInt(hash.replace('#game/', ''));
            const data = GAME_DATA.find(g => g.id === id);
            if (data) {
                startGame(data);
            } else {
                window.location.hash = '#home';
            }
        } else {
            // Home
            stopGame();
            homeScreen.classList.remove('hidden', 'fade-out');
            gameScreen.classList.remove('visible');
            gameScreen.classList.add('hidden');
            gameOverOverlay.classList.add('hidden');
            // Refresh grid to update high scores
            filterGames();
        }
    }
    
    window.addEventListener('hashchange', handleHashChange);

    // ── Game Management ───────────────────────────────────────────
    
    function startGame(data) {
        currentGameData = data;
        
        // UI transitions
        homeScreen.classList.add('fade-out');
        setTimeout(() => homeScreen.classList.add('hidden'), 400); // Wait for transition
        gameScreen.classList.remove('hidden');
        // Force reflow
        void gameScreen.offsetWidth;
        gameScreen.classList.add('visible');
        gameOverOverlay.classList.add('hidden');
        
        // Update header
        gameTitleBar.textContent = data.title;
        gameTitleBar.style.color = data.color;
        hsValue.textContent = engine.storage.getHighScore(data.storageKey);
        
        // Show touch controls on mobile
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            touchControls.classList.remove('hidden');
        }
        
        // Init Game Class
        const GameClass = GameRegistry[data.id] || GameRegistry[26]; // Use ComingSoon (id 26 logic in games.js if not implemented)
        const gameInstance = new GameClass();
        if (gameInstance.setGameData) gameInstance.setGameData(data); // for placeholder
        
        // Set game over callback
        engine.onGameOver = (score) => showGameOver(score, data);
        
        // Start engine
        engine.start(gameInstance);
        
        // Optional: Dispatch a resize event to ensure canvas sizes correctly
        window.dispatchEvent(new Event('resize'));
    }
    
    function stopGame() {
        engine.stop();
        currentGameData = null;
    }
    
    function showGameOver(score, data) {
        const isNewRecord = engine.storage.saveHighScore(data.storageKey, Math.floor(score));
        const currentHS = engine.storage.getHighScore(data.storageKey);
        
        finalScore.textContent = Math.floor(score);
        finalHighscore.textContent = currentHS;
        
        if (isNewRecord) {
            newRecord.classList.remove('hidden');
        } else {
            newRecord.classList.add('hidden');
        }
        
        gameOverOverlay.classList.remove('hidden');
    }

    // ── Event Listeners ───────────────────────────────────────────
    
    backBtn.addEventListener('click', () => {
        window.location.hash = '#home';
    });
    
    homeBtn.addEventListener('click', () => {
        window.location.hash = '#home';
    });
    
    playAgainBtn.addEventListener('click', () => {
        if (currentGameData) {
            engine.stop();
            gameOverOverlay.classList.add('hidden');
            startGame(currentGameData);
        }
    });

    // Touch controls routing to input manager
    const tl = document.getElementById('touch-left');
    const tr = document.getElementById('touch-right');
    const ta = document.getElementById('touch-action');
    
    const bindTouch = (el, key) => {
        el.addEventListener('touchstart', (e) => { e.preventDefault(); engine.input.keys[key] = true; });
        el.addEventListener('touchend', (e) => { e.preventDefault(); engine.input.keys[key] = false; });
    };
    
    bindTouch(tl, 'ArrowLeft');
    bindTouch(tr, 'ArrowRight');
    bindTouch(ta, ' ');

    window.addEventListener('resize', () => {
        if (engine.running) engine.resize();
    });
    
    // Prevent default context menu on canvas
    gameCanvas.addEventListener('contextmenu', e => e.preventDefault());

    // ── Start App ─────────────────────────────────────────────────
    
    document.querySelector('.filter-pill[data-category="all"]').addEventListener('click', function() {
        document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        activeCategory = 'all';
        filterGames();
    });

    initHome();
    
    // Check initial hash
    if (window.location.hash) {
        handleHashChange();
    } else {
        window.location.hash = '#home';
    }
});
