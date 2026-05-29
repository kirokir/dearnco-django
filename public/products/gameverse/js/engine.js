/* ══════════════════════════════════════════════════════════════
   KINBO GAMEVERSE — Shared Game Engine
   ══════════════════════════════════════════════════════════════ */

class GameEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.running = false;
    this.lastTime = 0;
    this.rafId = null;
    this.game = null;

    // Sub-systems
    this.input = new InputManager(canvas);
    this.particles = new ParticleSystem();
    this.audio = new AudioManager();
    this.hud = new HUDRenderer();
    this.storage = new StorageManager();

    // Callbacks
    this.onGameOver = null;
  }

  resize() {
    const parent = this.canvas.parentElement;
    const maxW = Math.min(window.innerWidth, 900);
    const maxH = window.innerHeight - 50;
    const ratio = 16 / 10;
    let w = maxW;
    let h = w / ratio;
    if (h > maxH) { h = maxH; w = h * ratio; }
    this.canvas.width = Math.floor(w);
    this.canvas.height = Math.floor(h);
    this.canvas.style.width = this.canvas.width + 'px';
    this.canvas.style.height = this.canvas.height + 'px';
  }

  start(game) {
    this.game = game;
    this.resize();
    this.game.init(this.canvas, this.ctx, this);
    this.running = true;
    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  loop(now) {
    if (!this.running) return;
    const dt = Math.min((now - this.lastTime) / 1000, 0.05);
    this.lastTime = now;

    this.input.update();
    this.game.update(dt);
    this.particles.update(dt);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.game.render(this.ctx);
    this.particles.render(this.ctx);

    this.rafId = requestAnimationFrame(t => this.loop(t));
  }

  stop() {
    this.running = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.game && this.game.destroy) this.game.destroy();
    this.game = null;
    this.input.reset();
    this.particles.clear();
  }

  triggerGameOver(score) {
    if (this.onGameOver) this.onGameOver(score);
  }
}

/* ── Input Manager ──────────────────────────────────────────── */
class InputManager {
  constructor(canvas) {
    this.keys = {};
    this.prevKeys = {};
    this.mouse = { x: 0, y: 0, down: false, clicked: false };
    this._mouseClicked = false;
    this.canvas = canvas;

    this._onKey = (e) => {
      this.keys[e.key] = e.type === 'keydown';
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault();
    };
    this._onMouse = (e) => {
      const r = canvas.getBoundingClientRect();
      this.mouse.x = (e.clientX - r.left) * (canvas.width / r.width);
      this.mouse.y = (e.clientY - r.top) * (canvas.height / r.height);
      if (e.type === 'mousedown') { this.mouse.down = true; this._mouseClicked = true; }
      if (e.type === 'mouseup') this.mouse.down = false;
    };
    this._onTouch = (e) => {
      e.preventDefault();
      const r = canvas.getBoundingClientRect();
      const t = e.touches[0] || e.changedTouches[0];
      if (t) {
        this.mouse.x = (t.clientX - r.left) * (canvas.width / r.width);
        this.mouse.y = (t.clientY - r.top) * (canvas.height / r.height);
      }
      if (e.type === 'touchstart') { this.mouse.down = true; this._mouseClicked = true; }
      if (e.type === 'touchend') this.mouse.down = false;
    };

    window.addEventListener('keydown', this._onKey);
    window.addEventListener('keyup', this._onKey);
    canvas.addEventListener('mousedown', this._onMouse);
    canvas.addEventListener('mousemove', this._onMouse);
    canvas.addEventListener('mouseup', this._onMouse);
    canvas.addEventListener('touchstart', this._onTouch, { passive: false });
    canvas.addEventListener('touchmove', this._onTouch, { passive: false });
    canvas.addEventListener('touchend', this._onTouch, { passive: false });
  }

  update() {
    this.mouse.clicked = this._mouseClicked;
    this._mouseClicked = false;
    this.prevKeys = { ...this.keys };
  }

  isDown(key) { return !!this.keys[key]; }
  isPressed(key) { return !!this.keys[key] && !this.prevKeys[key]; }

  reset() {
    this.keys = {};
    this.prevKeys = {};
    this.mouse = { x: 0, y: 0, down: false, clicked: false };
  }

  destroy() {
    window.removeEventListener('keydown', this._onKey);
    window.removeEventListener('keyup', this._onKey);
  }
}

/* ── Particle System ────────────────────────────────────────── */
class ParticleSystem {
  constructor() { this.particles = []; }

  emit(x, y, count, color, opts = {}) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (opts.speed || 120) * (0.5 + Math.random());
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: opts.life || (0.4 + Math.random() * 0.6),
        maxLife: opts.life || 1,
        size: opts.size || (2 + Math.random() * 3),
        color: color
      });
    }
  }

  update(dt) {
    for (let p of this.particles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 80 * dt; // gravity
      p.life -= dt;
    }
    this.particles = this.particles.filter(p => p.life > 0);
  }

  render(ctx) {
    for (let p of this.particles) {
      const alpha = Math.max(0, p.life / p.maxLife);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  clear() { this.particles = []; }
}

/* ── Audio Manager (Web Audio Synth) ────────────────────────── */
class AudioManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  _ensureCtx() {
    if (!this.ctx) {
      try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) { this.enabled = false; }
    }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  play(type) {
    if (!this.enabled) return;
    this._ensureCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      switch (type) {
        case 'shoot':
          osc.type = 'square'; osc.frequency.setValueAtTime(800, now);
          osc.frequency.exponentialRampToValueAtTime(200, now + 0.1);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
          osc.start(now); osc.stop(now + 0.1); break;
        case 'explosion':
          osc.type = 'sawtooth'; osc.frequency.setValueAtTime(150, now);
          osc.frequency.exponentialRampToValueAtTime(30, now + 0.3);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          osc.start(now); osc.stop(now + 0.3); break;
        case 'hit':
          osc.type = 'sine'; osc.frequency.setValueAtTime(200, now);
          osc.frequency.exponentialRampToValueAtTime(80, now + 0.2);
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
          osc.start(now); osc.stop(now + 0.2); break;
        case 'collect':
          osc.type = 'sine'; osc.frequency.setValueAtTime(600, now);
          osc.frequency.exponentialRampToValueAtTime(1200, now + 0.15);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
          osc.start(now); osc.stop(now + 0.15); break;
        case 'success':
          osc.type = 'sine'; osc.frequency.setValueAtTime(523, now);
          osc.frequency.setValueAtTime(659, now + 0.1);
          osc.frequency.setValueAtTime(784, now + 0.2);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
          osc.start(now); osc.stop(now + 0.4); break;
        case 'fail':
          osc.type = 'sawtooth'; osc.frequency.setValueAtTime(300, now);
          osc.frequency.exponentialRampToValueAtTime(100, now + 0.3);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          osc.start(now); osc.stop(now + 0.3); break;
        case 'click':
          osc.type = 'sine'; osc.frequency.setValueAtTime(1000, now);
          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          osc.start(now); osc.stop(now + 0.05); break;
        case 'powerup':
          osc.type = 'sine'; osc.frequency.setValueAtTime(400, now);
          osc.frequency.exponentialRampToValueAtTime(1600, now + 0.3);
          gain.gain.setValueAtTime(0.07, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          osc.start(now); osc.stop(now + 0.35); break;
        case 'jump':
          osc.type = 'square'; osc.frequency.setValueAtTime(250, now);
          osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
          osc.start(now); osc.stop(now + 0.12); break;
        case 'beat':
          osc.type = 'triangle'; osc.frequency.setValueAtTime(440, now);
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
          osc.start(now); osc.stop(now + 0.1); break;
        case 'miss':
          osc.type = 'sine'; osc.frequency.setValueAtTime(150, now);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
          osc.start(now); osc.stop(now + 0.15); break;
        default:
          osc.type = 'sine'; osc.frequency.setValueAtTime(440, now);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
          osc.start(now); osc.stop(now + 0.1);
      }
    } catch (e) { /* silently ignore audio errors */ }
  }
}

/* ── HUD Renderer ───────────────────────────────────────────── */
class HUDRenderer {
  drawText(ctx, text, x, y, size, color, align = 'left') {
    ctx.save();
    ctx.font = `bold ${size}px 'Orbitron', 'Inter', sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = 'top';
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  drawScore(ctx, score, canvasW) {
    this.drawText(ctx, `SCORE: ${score}`, canvasW - 16, 12, 14, '#FFFFFF', 'right');
  }

  drawLives(ctx, lives, symbol = '❤️') {
    ctx.save();
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    let str = '';
    for (let i = 0; i < lives; i++) str += symbol + ' ';
    ctx.fillText(str, 12, 10);
    ctx.restore();
  }

  drawBar(ctx, x, y, w, h, value, max, color, bgColor = 'rgba(255,255,255,0.1)') {
    ctx.fillStyle = bgColor;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w * Math.max(0, Math.min(1, value / max)), h);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.strokeRect(x, y, w, h);
  }

  drawLevel(ctx, level, canvasW) {
    this.drawText(ctx, `LVL ${level}`, canvasW / 2, 12, 12, '#00D4FF', 'center');
  }
}

/* ── Storage Manager ────────────────────────────────────────── */
class StorageManager {
  saveHighScore(key, score) {
    try {
      const prev = this.getHighScore(key);
      if (score > prev) {
        localStorage.setItem(`gv_hs_${key}`, String(score));
        return true; // new record
      }
      return false;
    } catch (e) { return false; }
  }

  getHighScore(key) {
    try {
      return parseInt(localStorage.getItem(`gv_hs_${key}`)) || 0;
    } catch (e) { return 0; }
  }

  save(key, data) {
    try { localStorage.setItem(`gv_${key}`, JSON.stringify(data)); } catch(e) {}
  }

  load(key) {
    try { return JSON.parse(localStorage.getItem(`gv_${key}`)); } catch(e) { return null; }
  }
}

/* ── Collision Helpers ──────────────────────────────────────── */
const Collision = {
  aabb(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  },
  circle(a, b) {
    const dx = a.x - b.x, dy = a.y - b.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist < (a.r || a.w/2) + (b.r || b.w/2);
  },
  pointInRect(px, py, r) {
    return px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h;
  },
  pointInCircle(px, py, cx, cy, r) {
    const dx = px - cx, dy = py - cy;
    return dx * dx + dy * dy <= r * r;
  }
};

/* ── Utility Helpers ────────────────────────────────────────── */
const Utils = {
  rand(min, max) { return Math.random() * (max - min) + min; },
  randInt(min, max) { return Math.floor(Utils.rand(min, max + 1)); },
  choice(arr) { return arr[Math.floor(Math.random() * arr.length)]; },
  clamp(v, min, max) { return Math.max(min, Math.min(max, v)); },
  lerp(a, b, t) { return a + (b - a) * t; },
  dist(x1, y1, x2, y2) { return Math.sqrt((x2-x1)**2 + (y2-y1)**2); },
  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
};
