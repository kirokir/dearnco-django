/* ══════════════════════════════════════════════════════════════
   KINBO GAMEVERSE — Game Implementations (1-25)
   ══════════════════════════════════════════════════════════════ */

const GameRegistry = {};

/* ═══════════════════════════════════════════════════════════════
   GAME 1: NeonBlitz — Arcade Shooter
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[1] = class NeonBlitz {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.player = { x: this.w / 2 - 18, y: this.h - 60, w: 36, h: 28 };
    this.bullets = []; this.enemies = []; this.powerups = [];
    this.score = 0; this.lives = 3; this.wave = 1; this.chain = 0;
    this.multiplier = 1; this.gameOver = false; this.shootCD = 0;
    this.waveDelay = 0; this.bgOffset = 0;
    this.spawnWave();
  }
  spawnWave() {
    const count = this.wave * 3 + 4;
    for (let i = 0; i < count; i++) {
      this.enemies.push({
        x: Utils.rand(20, this.w - 50), y: -30 - Utils.rand(0, 300),
        w: 24, h: 24, speed: 50 + this.wave * 8, hp: this.wave > 10 ? 2 : 1,
        type: Utils.randInt(0, Math.min(2, Math.floor(this.wave / 5)))
      });
    }
    if (this.wave % 5 === 0 && Math.random() > 0.3) {
      this.powerups.push({ x: Utils.rand(50, this.w - 80), y: -50, w: 20, h: 20, speed: 60, type: Utils.randInt(0, 2) });
    }
  }
  update(dt) {
    if (this.gameOver) return;
    const inp = this.engine.input;
    const spd = 320;
    if (inp.isDown('ArrowLeft') || inp.isDown('a')) this.player.x -= spd * dt;
    if (inp.isDown('ArrowRight') || inp.isDown('d')) this.player.x += spd * dt;
    if (inp.isDown('ArrowUp') || inp.isDown('w')) this.player.y -= spd * 0.6 * dt;
    if (inp.isDown('ArrowDown') || inp.isDown('s')) this.player.y += spd * 0.6 * dt;
    this.player.x = Utils.clamp(this.player.x, 0, this.w - this.player.w);
    this.player.y = Utils.clamp(this.player.y, this.h * 0.4, this.h - this.player.h - 4);

    this.shootCD -= dt;
    if ((inp.isDown(' ') || inp.mouse.down) && this.shootCD <= 0) {
      this.bullets.push({ x: this.player.x + this.player.w / 2 - 2, y: this.player.y - 6, w: 4, h: 10 });
      this.shootCD = 0.13; this.engine.audio.play('shoot');
    }

    for (let b of this.bullets) b.y -= 520 * dt;
    this.bullets = this.bullets.filter(b => b.y > -12);

    for (let e of this.enemies) {
      e.y += e.speed * dt;
      if (e.type === 1) e.x += Math.sin(e.y * 0.03) * 60 * dt;
    }

    for (let p of this.powerups) p.y += p.speed * dt;
    this.powerups = this.powerups.filter(p => p.y < this.h + 20);

    // Bullet vs enemy
    for (let b of this.bullets) {
      for (let e of this.enemies) {
        if (e.hp > 0 && Collision.aabb(b, e)) {
          e.hp--; b.y = -999;
          if (e.hp <= 0) {
            this.chain++;
            this.multiplier = this.chain >= 10 ? 3 : this.chain >= 5 ? 2 : 1;
            this.score += 100 * this.multiplier;
            this.engine.particles.emit(e.x + 12, e.y + 12, 12, '#00D4FF');
            this.engine.audio.play('explosion');
          }
        }
      }
    }
    this.enemies = this.enemies.filter(e => e.hp > 0 && e.y < this.h + 30);

    // Powerup collect
    for (let p of this.powerups) {
      if (Collision.aabb(this.player, p)) {
        p.y = 9999;
        if (p.type === 0) this.lives = Math.min(this.lives + 1, 5);
        else this.score += 500;
        this.engine.audio.play('powerup');
      }
    }

    // Enemy hits player
    for (let e of this.enemies) {
      if (e.hp > 0 && Collision.aabb(this.player, e)) {
        this.lives--; e.hp = 0; this.chain = 0; this.multiplier = 1;
        this.engine.particles.emit(this.player.x + 18, this.player.y + 14, 20, '#E74C3C');
        this.engine.audio.play('hit');
        if (this.lives <= 0) { this.gameOver = true; this.engine.triggerGameOver(this.score); }
      }
    }

    // Next wave
    if (this.enemies.length === 0 && !this.gameOver) {
      this.waveDelay += dt;
      if (this.waveDelay > 1.2) {
        this.wave++; this.score += 1000 * this.wave;
        this.waveDelay = 0; this.spawnWave();
      }
    }
    this.bgOffset = (this.bgOffset + 40 * dt) % 40;
  }
  render(ctx) {
    // Background
    ctx.fillStyle = '#080820'; ctx.fillRect(0, 0, this.w, this.h);
    ctx.strokeStyle = 'rgba(0,212,255,0.07)';
    for (let x = 0; x < this.w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, this.h); ctx.stroke(); }
    for (let y = this.bgOffset; y < this.h; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(this.w, y); ctx.stroke(); }

    // Player ship
    ctx.fillStyle = '#00D4FF';
    ctx.beginPath();
    ctx.moveTo(this.player.x + this.player.w / 2, this.player.y);
    ctx.lineTo(this.player.x, this.player.y + this.player.h);
    ctx.lineTo(this.player.x + this.player.w, this.player.y + this.player.h);
    ctx.closePath(); ctx.fill();
    ctx.shadowColor = '#00D4FF'; ctx.shadowBlur = 10;
    ctx.fill(); ctx.shadowBlur = 0;

    // Bullets
    ctx.fillStyle = '#FFD700'; ctx.shadowColor = '#FFD700'; ctx.shadowBlur = 6;
    for (let b of this.bullets) ctx.fillRect(b.x, b.y, b.w, b.h);
    ctx.shadowBlur = 0;

    // Enemies
    const eColors = ['#E74C3C', '#FF6B9D', '#F1C40F'];
    for (let e of this.enemies) {
      if (e.hp <= 0) continue;
      ctx.fillStyle = eColors[e.type] || eColors[0];
      ctx.fillRect(e.x, e.y, e.w, e.h);
      ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.strokeRect(e.x, e.y, e.w, e.h);
    }

    // Powerups
    for (let p of this.powerups) {
      ctx.fillStyle = p.type === 0 ? '#27AE60' : '#FFD700';
      ctx.beginPath(); ctx.arc(p.x + 10, p.y + 10, 10, 0, Math.PI * 2); ctx.fill();
    }

    // HUD
    this.engine.hud.drawLives(ctx, this.lives);
    this.engine.hud.drawScore(ctx, this.score, this.w);
    this.engine.hud.drawText(ctx, `WAVE ${this.wave}`, this.w / 2, 12, 13, '#00D4FF', 'center');
    if (this.multiplier > 1) this.engine.hud.drawText(ctx, `x${this.multiplier}`, this.w / 2, 30, 11, '#FFD700', 'center');
  }
  destroy() {}
};

/* ═══════════════════════════════════════════════════════════════
   GAME 2: HexCipher — Puzzle (Colour Matching Grid)
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[2] = class HexCipher {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.score = 0; this.level = 1; this.gameOver = false;
    this.colors = ['#00D4FF', '#E74C3C', '#27AE60', '#F1C40F', '#9B59B6', '#FF6B9D', '#E67E22', '#00B4A0'];
    this.moves = 0; this.maxMoves = 20;
    this.generatePuzzle();
  }
  generatePuzzle() {
    const size = Math.min(4 + Math.floor(this.level / 3), 7);
    const numColors = Math.min(3 + Math.floor(this.level / 2), 6);
    this.gridSize = size;
    this.grid = [];
    this.target = [];
    for (let i = 0; i < size * size; i++) {
      this.target.push(Utils.randInt(0, numColors - 1));
    }
    this.grid = [...this.target];
    // Shuffle by performing random rotations
    const shuffles = 10 + this.level * 3;
    for (let s = 0; s < shuffles; s++) {
      const r = Utils.randInt(0, size - 1);
      const isRow = Math.random() > 0.5;
      if (isRow) {
        const row = [];
        for (let c = 0; c < size; c++) row.push(this.grid[r * size + c]);
        row.unshift(row.pop());
        for (let c = 0; c < size; c++) this.grid[r * size + c] = row[c];
      } else {
        const col = [];
        for (let rr = 0; rr < size; rr++) col.push(this.grid[rr * size + r]);
        col.unshift(col.pop());
        for (let rr = 0; rr < size; rr++) this.grid[rr * size + r] = col[rr];
      }
    }
    this.moves = 0;
    this.maxMoves = 15 + this.level * 3;
    this.selectedRow = -1; this.selectedCol = -1; this.selecting = false;
  }
  update(dt) {
    if (this.gameOver) return;
    const inp = this.engine.input;
    if (inp.mouse.clicked) {
      const cs = Math.min(this.w, this.h - 120) / (this.gridSize + 2);
      const ox = (this.w - cs * this.gridSize) / 2;
      const oy = 80;
      const mx = inp.mouse.x, my = inp.mouse.y;
      const col = Math.floor((mx - ox) / cs);
      const row = Math.floor((my - oy) / cs);
      // Check row shift buttons
      for (let r = 0; r < this.gridSize; r++) {
        const ry = oy + r * cs + cs / 2;
        // Left arrow
        if (Collision.pointInRect(mx, my, { x: ox - cs * 0.8, y: ry - cs * 0.3, w: cs * 0.6, h: cs * 0.6 })) {
          this.shiftRow(r, -1); return;
        }
        // Right arrow
        if (Collision.pointInRect(mx, my, { x: ox + this.gridSize * cs + cs * 0.2, y: ry - cs * 0.3, w: cs * 0.6, h: cs * 0.6 })) {
          this.shiftRow(r, 1); return;
        }
      }
      // Col shift buttons
      for (let c = 0; c < this.gridSize; c++) {
        const cx = ox + c * cs + cs / 2;
        if (Collision.pointInRect(mx, my, { x: cx - cs * 0.3, y: oy - cs * 0.8, w: cs * 0.6, h: cs * 0.6 })) {
          this.shiftCol(c, -1); return;
        }
        if (Collision.pointInRect(mx, my, { x: cx - cs * 0.3, y: oy + this.gridSize * cs + cs * 0.2, w: cs * 0.6, h: cs * 0.6 })) {
          this.shiftCol(c, 1); return;
        }
      }
    }
  }
  shiftRow(r, dir) {
    if (this.moves >= this.maxMoves) return;
    const s = this.gridSize;
    const row = [];
    for (let c = 0; c < s; c++) row.push(this.grid[r * s + c]);
    if (dir > 0) row.unshift(row.pop()); else row.push(row.shift());
    for (let c = 0; c < s; c++) this.grid[r * s + c] = row[c];
    this.moves++; this.engine.audio.play('click');
    this.checkWin();
  }
  shiftCol(c, dir) {
    if (this.moves >= this.maxMoves) return;
    const s = this.gridSize;
    const col = [];
    for (let r = 0; r < s; r++) col.push(this.grid[r * s + c]);
    if (dir > 0) col.unshift(col.pop()); else col.push(col.shift());
    for (let r = 0; r < s; r++) this.grid[r * s + c] = col[r];
    this.moves++; this.engine.audio.play('click');
    this.checkWin();
  }
  checkWin() {
    const match = this.grid.every((v, i) => v === this.target[i]);
    if (match) {
      const bonus = Math.max(0, (this.maxMoves - this.moves) * 100);
      this.score += 500 * this.level + bonus;
      this.engine.audio.play('success');
      this.level++;
      this.generatePuzzle();
    } else if (this.moves >= this.maxMoves) {
      this.gameOver = true;
      this.engine.triggerGameOver(this.score);
    }
  }
  render(ctx) {
    ctx.fillStyle = '#0A0A20'; ctx.fillRect(0, 0, this.w, this.h);
    const cs = Math.min((this.w - 100) / (this.gridSize + 2), (this.h - 200) / (this.gridSize + 2));
    const ox = (this.w - cs * this.gridSize) / 2;
    const oy = 80;

    // Target (small) top-right
    this.engine.hud.drawText(ctx, 'TARGET:', this.w - 10, 40, 10, '#95A5A6', 'right');
    const ts = 8;
    const txo = this.w - 10 - this.gridSize * (ts + 1);
    for (let i = 0; i < this.grid.length; i++) {
      const r = Math.floor(i / this.gridSize), c = i % this.gridSize;
      ctx.fillStyle = this.colors[this.target[i]];
      ctx.fillRect(txo + c * (ts + 1), 54 + r * (ts + 1), ts, ts);
    }

    // Arrow buttons
    ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.font = `${Math.floor(cs * 0.4)}px sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (let r = 0; r < this.gridSize; r++) {
      const ry = oy + r * cs + cs / 2;
      ctx.fillText('◀', ox - cs * 0.5, ry);
      ctx.fillText('▶', ox + this.gridSize * cs + cs * 0.5, ry);
    }
    for (let c = 0; c < this.gridSize; c++) {
      const cx = ox + c * cs + cs / 2;
      ctx.fillText('▲', cx, oy - cs * 0.5);
      ctx.fillText('▼', cx, oy + this.gridSize * cs + cs * 0.5);
    }

    // Grid cells
    for (let i = 0; i < this.grid.length; i++) {
      const r = Math.floor(i / this.gridSize), c = i % this.gridSize;
      const x = ox + c * cs, y = oy + r * cs;
      ctx.fillStyle = this.colors[this.grid[i]];
      ctx.fillRect(x + 2, y + 2, cs - 4, cs - 4);
      // Highlight matches
      if (this.grid[i] === this.target[i]) {
        ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 2;
        ctx.strokeRect(x + 2, y + 2, cs - 4, cs - 4); ctx.lineWidth = 1;
      }
    }

    // HUD
    this.engine.hud.drawScore(ctx, this.score, this.w);
    this.engine.hud.drawText(ctx, `LEVEL ${this.level}`, this.w / 2, 10, 14, '#00D4FF', 'center');
    this.engine.hud.drawText(ctx, `Moves: ${this.moves}/${this.maxMoves}`, 14, 14, 12, this.moves > this.maxMoves * 0.8 ? '#E74C3C' : '#ECF0F1');
  }
  destroy() {}
};

/* ═══════════════════════════════════════════════════════════════
   GAME 3: GravityRacer — Top-down Racing
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[3] = class GravityRacer {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.score = 0; this.gameOver = false;
    this.player = { x: this.w / 2 - 12, y: this.h - 100, w: 24, h: 36, speed: 0, maxSpeed: 400 };
    this.obstacles = []; this.tokens = []; this.scrollSpeed = 150; this.distance = 0;
    this.lane = 1; // 0-left, 1-center, 2-right
    this.laneWidth = this.w / 4;
    this.roadLeft = this.w * 0.15; this.roadRight = this.w * 0.85;
    this.spawnTimer = 0; this.bgOffset = 0;
  }
  update(dt) {
    if (this.gameOver) return;
    const inp = this.engine.input;
    const spd = 300;
    if (inp.isDown('ArrowLeft') || inp.isDown('a')) this.player.x -= spd * dt;
    if (inp.isDown('ArrowRight') || inp.isDown('d')) this.player.x += spd * dt;
    if (inp.isDown('ArrowUp') || inp.isDown('w')) this.scrollSpeed = Math.min(this.scrollSpeed + 200 * dt, 500);
    if (inp.isDown('ArrowDown') || inp.isDown('s')) this.scrollSpeed = Math.max(this.scrollSpeed - 200 * dt, 80);
    this.player.x = Utils.clamp(this.player.x, this.roadLeft + 5, this.roadRight - this.player.w - 5);

    this.scrollSpeed += 2 * dt; // gradual speed increase
    this.distance += this.scrollSpeed * dt;
    this.bgOffset = (this.bgOffset + this.scrollSpeed * dt) % 60;

    // Spawn obstacles and tokens
    this.spawnTimer += dt;
    if (this.spawnTimer > 0.6) {
      this.spawnTimer = 0;
      if (Math.random() > 0.3) {
        this.obstacles.push({
          x: Utils.rand(this.roadLeft + 10, this.roadRight - 40), y: -40,
          w: 30, h: 30, speed: this.scrollSpeed * 0.3
        });
      }
      if (Math.random() > 0.5) {
        this.tokens.push({
          x: Utils.rand(this.roadLeft + 20, this.roadRight - 30), y: -20, w: 14, h: 14
        });
      }
    }

    for (let o of this.obstacles) o.y += (this.scrollSpeed + o.speed) * dt;
    for (let t of this.tokens) t.y += this.scrollSpeed * dt;
    this.obstacles = this.obstacles.filter(o => o.y < this.h + 40);
    this.tokens = this.tokens.filter(t => t.y < this.h + 20);

    // Collision
    for (let o of this.obstacles) {
      if (Collision.aabb(this.player, o)) {
        this.gameOver = true;
        this.engine.particles.emit(this.player.x + 12, this.player.y + 18, 25, '#E74C3C');
        this.engine.audio.play('explosion');
        this.engine.triggerGameOver(this.score);
        return;
      }
    }

    for (let t of this.tokens) {
      if (Collision.aabb(this.player, t)) {
        t.y = 9999; this.score += 100; this.engine.audio.play('collect');
      }
    }

    this.score += Math.floor(this.scrollSpeed * dt * 0.1);
  }
  render(ctx) {
    // Sky
    ctx.fillStyle = '#060618'; ctx.fillRect(0, 0, this.w, this.h);
    // Road
    ctx.fillStyle = '#1A1A3E';
    ctx.fillRect(this.roadLeft, 0, this.roadRight - this.roadLeft, this.h);
    // Road lines
    ctx.strokeStyle = 'rgba(0,212,255,0.15)'; ctx.setLineDash([20, 20]);
    for (let i = 1; i < 3; i++) {
      const lx = this.roadLeft + (this.roadRight - this.roadLeft) * i / 3;
      ctx.beginPath(); ctx.moveTo(lx, -20 + this.bgOffset); ctx.lineTo(lx, this.h + 20); ctx.stroke();
    }
    ctx.setLineDash([]);
    // Road edges
    ctx.strokeStyle = '#E74C3C'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(this.roadLeft, 0); ctx.lineTo(this.roadLeft, this.h); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(this.roadRight, 0); ctx.lineTo(this.roadRight, this.h); ctx.stroke();
    ctx.lineWidth = 1;

    // Obstacles (asteroids)
    ctx.fillStyle = '#555';
    for (let o of this.obstacles) {
      ctx.beginPath(); ctx.arc(o.x + o.w / 2, o.y + o.h / 2, o.w / 2, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#888'; ctx.stroke();
    }

    // Tokens
    ctx.fillStyle = '#FFD700';
    for (let t of this.tokens) {
      ctx.beginPath(); ctx.arc(t.x + 7, t.y + 7, 7, 0, Math.PI * 2); ctx.fill();
    }

    // Player ship
    ctx.fillStyle = '#00D4FF';
    ctx.beginPath();
    ctx.moveTo(this.player.x + this.player.w / 2, this.player.y);
    ctx.lineTo(this.player.x, this.player.y + this.player.h);
    ctx.lineTo(this.player.x + this.player.w / 2, this.player.y + this.player.h - 8);
    ctx.lineTo(this.player.x + this.player.w, this.player.y + this.player.h);
    ctx.closePath(); ctx.fill();
    // Engine glow
    ctx.fillStyle = '#E74C3C';
    ctx.beginPath(); ctx.arc(this.player.x + this.player.w / 2, this.player.y + this.player.h + 4, 5, 0, Math.PI * 2); ctx.fill();

    // HUD
    this.engine.hud.drawScore(ctx, this.score, this.w);
    this.engine.hud.drawText(ctx, `SPEED: ${Math.floor(this.scrollSpeed)}`, 14, 14, 12, '#00D4FF');
    this.engine.hud.drawText(ctx, `DIST: ${Math.floor(this.distance)}m`, this.w / 2, 14, 12, '#ECF0F1', 'center');
  }
  destroy() {}
};

/* ═══════════════════════════════════════════════════════════════
   GAME 4: PixelFarm — Farming Simulation
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[4] = class PixelFarm {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.score = 0; this.gold = 50; this.day = 1; this.gameOver = false;
    this.gridCols = 6; this.gridRows = 5;
    this.crops = ['🌱', '🌿', '🌾', '🌽']; // stages
    this.cropNames = ['Wheat', 'Carrot', 'Corn', 'Tomato'];
    this.cropValues = [10, 15, 20, 30];
    this.seedCost = 5;
    // Grid: 0=empty, {type, stage, water, timer}
    this.grid = Array(this.gridCols * this.gridRows).fill(null);
    this.selectedTool = 0; // 0=plant, 1=water, 2=harvest
    this.tools = ['🌱 Plant', '💧 Water', '🌾 Harvest'];
    this.growTimer = 0; this.dayTimer = 0;
    this.message = 'Click plots to farm! Press 1/2/3 for tools.';
    this.msgTimer = 3;
  }
  update(dt) {
    if (this.gameOver) return;
    const inp = this.engine.input;
    if (inp.isPressed('1')) this.selectedTool = 0;
    if (inp.isPressed('2')) this.selectedTool = 1;
    if (inp.isPressed('3')) this.selectedTool = 2;

    // Day cycle
    this.dayTimer += dt;
    if (this.dayTimer >= 8) { this.dayTimer = 0; this.day++; this.advanceDay(); }

    // Grow crops
    this.growTimer += dt;
    if (this.growTimer >= 2) {
      this.growTimer = 0;
      for (let i = 0; i < this.grid.length; i++) {
        const c = this.grid[i];
        if (c && c.watered && c.stage < 3) { c.stage++; c.watered = false; }
      }
    }

    if (this.msgTimer > 0) this.msgTimer -= dt;

    // Click
    if (inp.mouse.clicked) {
      const cs = Math.min((this.w - 60) / this.gridCols, (this.h - 180) / this.gridRows);
      const ox = (this.w - cs * this.gridCols) / 2;
      const oy = 100;
      const col = Math.floor((inp.mouse.x - ox) / cs);
      const row = Math.floor((inp.mouse.y - oy) / cs);
      if (col >= 0 && col < this.gridCols && row >= 0 && row < this.gridRows) {
        const idx = row * this.gridCols + col;
        this.interact(idx);
      }
      // Tool buttons
      for (let t = 0; t < 3; t++) {
        const bx = this.w / 2 - 150 + t * 110, by = this.h - 55;
        if (Collision.pointInRect(inp.mouse.x, inp.mouse.y, { x: bx, y: by, w: 100, h: 36 })) {
          this.selectedTool = t;
          this.engine.audio.play('click');
        }
      }
    }
  }
  interact(idx) {
    const cell = this.grid[idx];
    if (this.selectedTool === 0) { // Plant
      if (!cell && this.gold >= this.seedCost) {
        this.grid[idx] = { type: Utils.randInt(0, 3), stage: 0, watered: false };
        this.gold -= this.seedCost;
        this.engine.audio.play('click');
        this.setMsg('Planted a seed! Water it to grow.');
      }
    } else if (this.selectedTool === 1) { // Water
      if (cell && cell.stage < 3 && !cell.watered) {
        cell.watered = true;
        this.engine.audio.play('collect');
        this.setMsg('Watered! It will grow soon.');
      }
    } else if (this.selectedTool === 2) { // Harvest
      if (cell && cell.stage >= 3) {
        const val = this.cropValues[cell.type];
        this.gold += val; this.score += val * 10;
        this.grid[idx] = null;
        this.engine.audio.play('success');
        this.engine.particles.emit(this.w / 2, this.h / 2, 10, '#FFD700');
        this.setMsg(`Harvested for ${val} gold!`);
      }
    }
  }
  advanceDay() {
    // Random event
    if (Math.random() > 0.7) {
      const idx = Utils.randInt(0, this.grid.length - 1);
      if (this.grid[idx]) { this.grid[idx] = null; this.setMsg('⚠️ A pest destroyed a crop!'); }
    }
    if (this.day > 30 && this.gold <= 0) {
      this.gameOver = true; this.engine.triggerGameOver(this.score);
    }
  }
  setMsg(m) { this.message = m; this.msgTimer = 3; }
  render(ctx) {
    // Background
    const grad = ctx.createLinearGradient(0, 0, 0, this.h);
    grad.addColorStop(0, '#87CEEB'); grad.addColorStop(0.6, '#90EE90'); grad.addColorStop(1, '#654321');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, this.w, this.h);

    const cs = Math.min((this.w - 60) / this.gridCols, (this.h - 180) / this.gridRows);
    const ox = (this.w - cs * this.gridCols) / 2;
    const oy = 100;

    // Grid
    for (let i = 0; i < this.grid.length; i++) {
      const r = Math.floor(i / this.gridCols), c = i % this.gridCols;
      const x = ox + c * cs, y = oy + r * cs;
      ctx.fillStyle = this.grid[i] ? '#5C4033' : '#8B7355';
      ctx.fillRect(x + 2, y + 2, cs - 4, cs - 4);
      ctx.strokeStyle = '#3E2723'; ctx.strokeRect(x + 2, y + 2, cs - 4, cs - 4);
      if (this.grid[i]) {
        const crop = this.grid[i];
        const emojis = ['🌱', '🌿', '🌾', '🌽'];
        ctx.font = `${cs * 0.45}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(emojis[crop.stage], x + cs / 2, y + cs / 2);
        if (crop.watered) {
          ctx.fillStyle = 'rgba(0,150,255,0.2)'; ctx.fillRect(x + 2, y + 2, cs - 4, cs - 4);
        }
      }
    }

    // HUD bar
    ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(0, 0, this.w, 45);
    this.engine.hud.drawText(ctx, `💰 ${this.gold}`, 14, 12, 14, '#FFD700');
    this.engine.hud.drawText(ctx, `Day ${this.day}`, this.w / 2, 12, 14, '#FFFFFF', 'center');
    this.engine.hud.drawText(ctx, `Score: ${this.score}`, this.w - 14, 12, 14, '#FFFFFF', 'right');
    // Day progress bar
    this.engine.hud.drawBar(ctx, 14, 34, this.w - 28, 6, this.dayTimer, 8, '#F1C40F');

    // Message
    if (this.msgTimer > 0) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(0, 48, this.w, 24);
      ctx.font = '12px Inter, sans-serif'; ctx.fillStyle = '#ECF0F1'; ctx.textAlign = 'center';
      ctx.fillText(this.message, this.w / 2, 64);
    }

    // Tool buttons
    for (let t = 0; t < 3; t++) {
      const bx = this.w / 2 - 150 + t * 110, by = this.h - 55;
      ctx.fillStyle = t === this.selectedTool ? '#27AE60' : 'rgba(0,0,0,0.5)';
      ctx.fillRect(bx, by, 100, 36);
      ctx.strokeStyle = '#27AE60'; ctx.strokeRect(bx, by, 100, 36);
      ctx.font = 'bold 12px Inter, sans-serif'; ctx.fillStyle = '#FFF'; ctx.textAlign = 'center';
      ctx.fillText(this.tools[t], bx + 50, by + 22);
    }
    ctx.textAlign = 'left';
  }
  destroy() {}
};

/* ═══════════════════════════════════════════════════════════════
   GAME 5: ShadowHopper — Platformer
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[5] = class ShadowHopper {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.score = 0; this.lives = 3; this.gameOver = false;
    this.player = { x: this.w / 2 - 12, y: this.h - 120, w: 24, h: 30, vy: 0, grounded: false };
    this.gravity = 800; this.jumpForce = -420;
    this.platforms = []; this.orbs = []; this.scrollY = 0; this.maxHeight = 0;
    // Initial platforms
    this.platforms.push({ x: this.w / 2 - 40, y: this.h - 80, w: 80, h: 12, type: 0 });
    for (let i = 0; i < 20; i++) {
      this.platforms.push({
        x: Utils.rand(20, this.w - 100), y: this.h - 80 - (i + 1) * 70,
        w: Utils.rand(60, 100), h: 12, type: Math.random() > 0.8 ? 1 : 0
      });
      if (Math.random() > 0.5) {
        this.orbs.push({ x: Utils.rand(30, this.w - 30), y: this.h - 120 - (i + 1) * 70, r: 8 });
      }
    }
    this.highestPlatY = this.platforms[this.platforms.length - 1].y;
  }
  update(dt) {
    if (this.gameOver) return;
    const inp = this.engine.input;
    const spd = 280;
    if (inp.isDown('ArrowLeft') || inp.isDown('a')) this.player.x -= spd * dt;
    if (inp.isDown('ArrowRight') || inp.isDown('d')) this.player.x += spd * dt;
    // Wrap horizontally
    if (this.player.x < -this.player.w) this.player.x = this.w;
    if (this.player.x > this.w) this.player.x = -this.player.w;

    // Jump
    if ((inp.isPressed(' ') || inp.isPressed('ArrowUp') || inp.isPressed('w')) && this.player.grounded) {
      this.player.vy = this.jumpForce; this.player.grounded = false;
      this.engine.audio.play('jump');
    }

    this.player.vy += this.gravity * dt;
    this.player.y += this.player.vy * dt;
    this.player.grounded = false;

    // Platform collision (only when falling)
    if (this.player.vy > 0) {
      for (let p of this.platforms) {
        const py = p.y - this.scrollY;
        if (this.player.x + this.player.w > p.x && this.player.x < p.x + p.w &&
            this.player.y + this.player.h >= py && this.player.y + this.player.h <= py + p.h + this.player.vy * dt + 5) {
          this.player.y = py - this.player.h;
          this.player.vy = 0; this.player.grounded = true;
          if (p.type === 1) { // Spring platform
            this.player.vy = this.jumpForce * 1.5;
            this.player.grounded = false;
            this.engine.audio.play('powerup');
          }
        }
      }
    }

    // Scroll camera up
    const scrollThreshold = this.h * 0.35;
    if (this.player.y < scrollThreshold) {
      const diff = scrollThreshold - this.player.y;
      this.player.y = scrollThreshold;
      this.scrollY += diff;
      // Generate more platforms
      while (this.highestPlatY - this.scrollY > -100) {
        this.highestPlatY -= Utils.rand(55, 90);
        this.platforms.push({
          x: Utils.rand(20, this.w - 100),
          y: this.highestPlatY + this.scrollY,
          w: Utils.rand(50, 90), h: 12,
          type: Math.random() > 0.85 ? 1 : 0
        });
        if (Math.random() > 0.4) {
          this.orbs.push({ x: Utils.rand(30, this.w - 30), y: this.highestPlatY + this.scrollY - 20, r: 8 });
        }
      }
    }

    // Collect orbs
    for (let o of this.orbs) {
      const oy = o.y - this.scrollY;
      if (Utils.dist(this.player.x + 12, this.player.y + 15, o.x, oy) < o.r + 15) {
        o.y = -99999; this.score += 10; this.engine.audio.play('collect');
      }
    }

    // Height score
    const height = Math.floor(this.scrollY / 10);
    if (height > this.maxHeight) { this.maxHeight = height; this.score = Math.max(this.score, this.maxHeight); }

    // Fall off bottom
    if (this.player.y > this.h + 50) {
      this.gameOver = true;
      this.engine.triggerGameOver(this.score);
    }

    // Cleanup
    this.platforms = this.platforms.filter(p => (p.y - this.scrollY) < this.h + 50);
    this.orbs = this.orbs.filter(o => (o.y - this.scrollY) < this.h + 50 && o.y > -99990);
  }
  render(ctx) {
    ctx.fillStyle = '#F5F0E8'; ctx.fillRect(0, 0, this.w, this.h);
    // Background mountains
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    for (let i = 0; i < 5; i++) {
      ctx.beginPath(); ctx.moveTo(i * this.w / 4, this.h);
      ctx.lineTo(i * this.w / 4 + this.w / 8, this.h - 200 - Math.sin(i) * 80);
      ctx.lineTo(i * this.w / 4 + this.w / 4, this.h); ctx.fill();
    }

    // Platforms
    for (let p of this.platforms) {
      const py = p.y - this.scrollY;
      if (py > -20 && py < this.h + 20) {
        ctx.fillStyle = p.type === 1 ? '#27AE60' : '#1A1A1A';
        ctx.fillRect(p.x, py, p.w, p.h);
        if (p.type === 1) { ctx.fillStyle = '#FFD700'; ctx.fillRect(p.x + p.w / 2 - 3, py - 5, 6, 5); }
      }
    }

    // Orbs
    ctx.fillStyle = '#FFD700';
    for (let o of this.orbs) {
      const oy = o.y - this.scrollY;
      if (oy > -20 && oy < this.h + 20) {
        ctx.beginPath(); ctx.arc(o.x, oy, o.r, 0, Math.PI * 2); ctx.fill();
      }
    }

    // Player (shadow silhouette)
    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(this.player.x, this.player.y, this.player.w, this.player.h);
    // Eye
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath(); ctx.arc(this.player.x + 16, this.player.y + 8, 4, 0, Math.PI * 2); ctx.fill();

    // HUD
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(0, 0, this.w, 36);
    this.engine.hud.drawLives(ctx, this.lives);
    this.engine.hud.drawScore(ctx, this.score, this.w);
    this.engine.hud.drawText(ctx, `HEIGHT: ${this.maxHeight}m`, this.w / 2, 10, 12, '#FFD700', 'center');
  }
  destroy() {}
};

/* ═══════════════════════════════════════════════════════════════
   GAME 6: BeatForge — Rhythm (Falling Notes)
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[6] = class BeatForge {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.score = 0; this.gameOver = false;
    this.lanes = 4; this.laneW = this.w / (this.lanes + 2);
    this.hitLineY = this.h - 80;
    this.notes = []; this.combo = 0; this.maxCombo = 0;
    this.hp = 100; this.spawnTimer = 0; this.noteSpeed = 200;
    this.bpm = 120; this.beatInterval = 60 / this.bpm;
    this.laneKeys = ['d', 'f', 'j', 'k'];
    this.laneColors = ['#E74C3C', '#00D4FF', '#27AE60', '#F1C40F'];
    this.flashLane = [-1, 0]; this.rating = ''; this.ratingTimer = 0;
    this.totalNotes = 0; this.hitNotes = 0;
  }
  update(dt) {
    if (this.gameOver) return;

    this.spawnTimer += dt;
    if (this.spawnTimer >= this.beatInterval) {
      this.spawnTimer -= this.beatInterval;
      if (Math.random() > 0.3) {
        const lane = Utils.randInt(0, this.lanes - 1);
        this.notes.push({ lane, y: -20, hit: false, missed: false });
        this.totalNotes++;
      }
      this.noteSpeed += 0.5;
    }

    for (let n of this.notes) {
      if (!n.hit && !n.missed) n.y += this.noteSpeed * dt;
      if (n.y > this.hitLineY + 50 && !n.hit && !n.missed) {
        n.missed = true; this.combo = 0; this.hp -= 5;
        this.showRating('MISS');
      }
    }
    this.notes = this.notes.filter(n => n.y < this.h + 20 || n.hit);

    // Key press detection
    const inp = this.engine.input;
    for (let l = 0; l < this.lanes; l++) {
      if (inp.isPressed(this.laneKeys[l])) {
        this.flashLane = [l, 0.15];
        let bestNote = null, bestDist = 999;
        for (let n of this.notes) {
          if (n.lane === l && !n.hit && !n.missed) {
            const dist = Math.abs(n.y - this.hitLineY);
            if (dist < 40 && dist < bestDist) { bestNote = n; bestDist = dist; }
          }
        }
        if (bestNote) {
          bestNote.hit = true; this.hitNotes++;
          if (bestDist < 12) { this.score += 300; this.showRating('PERFECT'); this.engine.audio.play('beat'); }
          else if (bestDist < 25) { this.score += 150; this.showRating('GOOD'); this.engine.audio.play('beat'); }
          else { this.score += 50; this.showRating('OK'); this.engine.audio.play('click'); }
          this.combo++; this.maxCombo = Math.max(this.maxCombo, this.combo);
          const mult = Math.min(Math.floor(this.combo / 10) + 1, 8);
          this.score += (mult - 1) * 20;
          this.engine.particles.emit(
            this.laneW * (bestNote.lane + 1.5), this.hitLineY, 8, this.laneColors[bestNote.lane]
          );
        } else {
          this.engine.audio.play('miss');
        }
      }
    }

    if (this.flashLane[1] > 0) this.flashLane[1] -= dt;
    if (this.ratingTimer > 0) this.ratingTimer -= dt;
    if (this.hp <= 0) { this.gameOver = true; this.engine.triggerGameOver(this.score); }
  }
  showRating(r) { this.rating = r; this.ratingTimer = 0.6; }
  render(ctx) {
    ctx.fillStyle = '#0A0812'; ctx.fillRect(0, 0, this.w, this.h);

    // Lanes
    for (let l = 0; l < this.lanes; l++) {
      const lx = this.laneW * (l + 1);
      ctx.fillStyle = (this.flashLane[0] === l && this.flashLane[1] > 0)
        ? this.laneColors[l] + '33' : 'rgba(255,255,255,0.03)';
      ctx.fillRect(lx, 0, this.laneW, this.h);
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.strokeRect(lx, 0, this.laneW, this.h);
      // Key label
      ctx.font = 'bold 16px Orbitron, sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.textAlign = 'center'; ctx.fillText(this.laneKeys[l].toUpperCase(), lx + this.laneW / 2, this.h - 20);
    }

    // Hit line
    ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(this.laneW, this.hitLineY); ctx.lineTo(this.laneW * (this.lanes + 1), this.hitLineY); ctx.stroke();
    ctx.lineWidth = 1;

    // Notes
    for (let n of this.notes) {
      if (n.hit || n.missed) continue;
      const lx = this.laneW * (n.lane + 1);
      ctx.fillStyle = this.laneColors[n.lane];
      ctx.shadowColor = this.laneColors[n.lane]; ctx.shadowBlur = 8;
      ctx.fillRect(lx + 4, n.y - 10, this.laneW - 8, 20);
      ctx.shadowBlur = 0;
    }

    // Rating
    if (this.ratingTimer > 0) {
      const col = this.rating === 'PERFECT' ? '#FFD700' : this.rating === 'GOOD' ? '#00D4FF' : this.rating === 'MISS' ? '#E74C3C' : '#95A5A6';
      ctx.font = `bold 24px Orbitron, sans-serif`; ctx.fillStyle = col;
      ctx.textAlign = 'center'; ctx.globalAlpha = this.ratingTimer / 0.6;
      ctx.fillText(this.rating, this.w / 2, this.hitLineY - 40);
      ctx.globalAlpha = 1;
    }

    // HUD
    this.engine.hud.drawScore(ctx, this.score, this.w);
    this.engine.hud.drawBar(ctx, 14, 10, 120, 10, this.hp, 100, '#E74C3C');
    this.engine.hud.drawText(ctx, `COMBO: ${this.combo}`, this.w / 2, 10, 14, this.combo >= 10 ? '#FFD700' : '#FFFFFF', 'center');
    ctx.textAlign = 'left';
  }
  destroy() {}
};

/* ═══════════════════════════════════════════════════════════════
   GAME 7: CrystalMaze — Mirror Light Puzzle
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[7] = class CrystalMaze {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.score = 0; this.level = 1; this.gameOver = false;
    this.gridSize = 6; this.generateLevel();
  }
  generateLevel() {
    const gs = this.gridSize;
    this.grid = Array(gs * gs).fill(0); // 0=empty, 1=mirror-R, 2=mirror-L, 3=block, 4=target
    this.source = { x: 0, y: Math.floor(gs / 2), dir: 'right' };
    // Place target
    const tx = gs - 1, ty = Utils.randInt(1, gs - 2);
    this.grid[ty * gs + tx] = 4;
    this.targetIdx = ty * gs + tx;
    // Place some mirrors randomly
    const mirrorCount = 2 + this.level;
    for (let i = 0; i < mirrorCount; i++) {
      let idx;
      do { idx = Utils.randInt(0, gs * gs - 1); } while (this.grid[idx] !== 0 || idx === ty * gs + tx);
      this.grid[idx] = Utils.randInt(1, 2);
    }
    // Place blocks
    const blockCount = Math.floor(this.level / 2);
    for (let i = 0; i < blockCount; i++) {
      let idx;
      do { idx = Utils.randInt(0, gs * gs - 1); } while (this.grid[idx] !== 0);
      this.grid[idx] = 3;
    }
    this.solved = false;
    this.beamPath = this.traceBeam();
  }
  traceBeam() {
    const path = [];
    let x = this.source.x, y = this.source.y;
    let dx = 1, dy = 0;
    for (let steps = 0; steps < 100; steps++) {
      path.push({ x, y });
      if (x < 0 || x >= this.gridSize || y < 0 || y >= this.gridSize) break;
      const cell = this.grid[y * this.gridSize + x];
      if (cell === 3) break; // block
      if (cell === 4) { this.solved = true; break; }
      if (cell === 1) { const tmp = dx; dx = -dy; dy = -tmp; } // mirror /
      if (cell === 2) { const tmp = dx; dx = dy; dy = tmp; } // mirror \.
      x += dx; y += dy;
    }
    return path;
  }
  update(dt) {
    if (this.gameOver) return;
    const inp = this.engine.input;
    if (inp.mouse.clicked) {
      const cs = Math.min((this.w - 40) / this.gridSize, (this.h - 120) / this.gridSize);
      const ox = (this.w - cs * this.gridSize) / 2;
      const oy = 70;
      const col = Math.floor((inp.mouse.x - ox) / cs);
      const row = Math.floor((inp.mouse.y - oy) / cs);
      if (col >= 0 && col < this.gridSize && row >= 0 && row < this.gridSize) {
        const idx = row * this.gridSize + col;
        if (this.grid[idx] === 4 || this.grid[idx] === 3) return;
        this.grid[idx] = (this.grid[idx] + 1) % 3; // cycle: empty → mirror-R → mirror-L → empty
        this.engine.audio.play('click');
        this.beamPath = this.traceBeam();
        if (this.solved) {
          this.score += 500 * this.level;
          this.engine.audio.play('success');
          this.level++; this.gridSize = Math.min(6 + Math.floor(this.level / 3), 10);
          this.generateLevel();
        }
      }
    }
  }
  render(ctx) {
    ctx.fillStyle = '#060620'; ctx.fillRect(0, 0, this.w, this.h);
    const cs = Math.min((this.w - 40) / this.gridSize, (this.h - 120) / this.gridSize);
    const ox = (this.w - cs * this.gridSize) / 2;
    const oy = 70;

    // Grid
    for (let i = 0; i < this.gridSize * this.gridSize; i++) {
      const r = Math.floor(i / this.gridSize), c = i % this.gridSize;
      const x = ox + c * cs, y = oy + r * cs;
      ctx.fillStyle = 'rgba(0,180,160,0.08)';
      ctx.fillRect(x + 1, y + 1, cs - 2, cs - 2);
      ctx.strokeStyle = 'rgba(0,180,160,0.2)'; ctx.strokeRect(x + 1, y + 1, cs - 2, cs - 2);

      const cell = this.grid[i];
      if (cell === 1) { // Mirror /
        ctx.strokeStyle = '#00D4FF'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(x + cs - 4, y + 4); ctx.lineTo(x + 4, y + cs - 4); ctx.stroke();
        ctx.lineWidth = 1;
      } else if (cell === 2) { // Mirror \.
        ctx.strokeStyle = '#FF6B9D'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(x + 4, y + 4); ctx.lineTo(x + cs - 4, y + cs - 4); ctx.stroke();
        ctx.lineWidth = 1;
      } else if (cell === 3) { // Block
        ctx.fillStyle = '#333'; ctx.fillRect(x + 4, y + 4, cs - 8, cs - 8);
      } else if (cell === 4) { // Target
        ctx.fillStyle = '#FFD700';
        ctx.beginPath(); ctx.arc(x + cs / 2, y + cs / 2, cs / 4, 0, Math.PI * 2); ctx.fill();
      }
    }

    // Beam
    ctx.strokeStyle = '#00FF88'; ctx.lineWidth = 2; ctx.shadowColor = '#00FF88'; ctx.shadowBlur = 6;
    ctx.beginPath();
    for (let i = 0; i < this.beamPath.length; i++) {
      const p = this.beamPath[i];
      const px = ox + p.x * cs + cs / 2, py = oy + p.y * cs + cs / 2;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke(); ctx.shadowBlur = 0; ctx.lineWidth = 1;

    // Source indicator
    ctx.fillStyle = '#00FF88'; ctx.font = `${cs * 0.5}px sans-serif`;
    ctx.fillText('💡', ox - cs * 0.7, oy + this.source.y * cs + cs * 0.65);

    // HUD
    this.engine.hud.drawScore(ctx, this.score, this.w);
    this.engine.hud.drawText(ctx, `LEVEL ${this.level}`, this.w / 2, 12, 14, '#00D4FF', 'center');
    this.engine.hud.drawText(ctx, 'Click cells to place mirrors', this.w / 2, 36, 10, '#95A5A6', 'center');
  }
  destroy() {}
};

/* ═══════════════════════════════════════════════════════════════
   GAME 8: TowerTide — Tower Defense
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[8] = class TowerTide {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.score = 0; this.gold = 100; this.lives = 10; this.wave = 0;
    this.gameOver = false;
    this.gridCols = 12; this.gridRows = 8;
    this.cellW = (this.w - 40) / this.gridCols;
    this.cellH = (this.h - 140) / this.gridRows;
    this.ox = 20; this.oy = 60;
    // Path: simple zigzag
    this.path = this.generatePath();
    this.pathSet = new Set(this.path.map(p => `${p.x},${p.y}`));
    this.towers = []; this.enemies = []; this.projectiles = [];
    this.waveTimer = 3; this.spawning = false; this.spawnQueue = [];
    this.selectedTower = 0; // tower type
    this.towerTypes = [
      { name: 'Coral', cost: 20, range: 100, damage: 10, rate: 1, color: '#00B4A0' },
      { name: 'Laser', cost: 40, range: 140, damage: 20, rate: 0.7, color: '#E74C3C' },
      { name: 'Freeze', cost: 30, range: 120, damage: 5, rate: 1.5, color: '#00D4FF' }
    ];
  }
  generatePath() {
    const p = [];
    let x = 0, y = 0;
    p.push({ x, y });
    // Zigzag path
    while (x < this.gridCols - 1) {
      x++; p.push({ x, y });
      if (x % 3 === 0 && y < this.gridRows - 1) {
        for (let i = 0; i < 2 && y < this.gridRows - 1; i++) { y++; p.push({ x, y }); }
      }
    }
    // Go to last row
    while (y < this.gridRows - 1) { y++; p.push({ x, y }); }
    return p;
  }
  update(dt) {
    if (this.gameOver) return;
    const inp = this.engine.input;

    // Wave timer
    if (!this.spawning && this.spawnQueue.length === 0 && this.enemies.length === 0) {
      this.waveTimer -= dt;
      if (this.waveTimer <= 0) { this.wave++; this.startWave(); this.waveTimer = 5; }
    }

    // Spawn enemies
    if (this.spawnQueue.length > 0) {
      this.spawnQueue[0].delay -= dt;
      if (this.spawnQueue[0].delay <= 0) {
        const e = this.spawnQueue.shift();
        this.enemies.push({ pathIdx: 0, progress: 0, hp: e.hp, maxHp: e.hp, speed: e.speed, slow: 0 });
      }
    }

    // Move enemies
    for (let e of this.enemies) {
      const spd = e.speed * (e.slow > 0 ? 0.5 : 1);
      e.slow = Math.max(0, e.slow - dt);
      e.progress += spd * dt / this.cellW;
      if (e.progress >= 1) { e.progress -= 1; e.pathIdx++; }
      if (e.pathIdx >= this.path.length - 1) { this.lives--; e.hp = 0; this.engine.audio.play('hit'); }
    }
    this.enemies = this.enemies.filter(e => e.hp > 0);

    // Towers shoot
    for (let t of this.towers) {
      t.cooldown -= dt;
      if (t.cooldown <= 0) {
        // Find closest enemy in range
        let closest = null, closestDist = 999;
        for (let e of this.enemies) {
          if (e.pathIdx >= this.path.length) continue;
          const pp = this.path[Math.min(e.pathIdx, this.path.length - 1)];
          const ex = this.ox + pp.x * this.cellW + this.cellW / 2;
          const ey = this.oy + pp.y * this.cellH + this.cellH / 2;
          const d = Utils.dist(t.x, t.y, ex, ey);
          if (d < t.range && d < closestDist) { closest = e; closestDist = d; }
        }
        if (closest) {
          const pp = this.path[Math.min(closest.pathIdx, this.path.length - 1)];
          const ex = this.ox + pp.x * this.cellW + this.cellW / 2;
          const ey = this.oy + pp.y * this.cellH + this.cellH / 2;
          this.projectiles.push({ x: t.x, y: t.y, tx: ex, ty: ey, damage: t.damage, speed: 400, color: t.color, target: closest, type: t.type });
          t.cooldown = 1 / t.rate;
        }
      }
    }

    // Move projectiles
    for (let p of this.projectiles) {
      const dx = p.tx - p.x, dy = p.ty - p.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 8) {
        if (p.target && p.target.hp > 0) {
          p.target.hp -= p.damage;
          if (p.type === 2) p.target.slow = 2;
          if (p.target.hp <= 0) {
            this.gold += 10; this.score += 50;
            this.engine.particles.emit(p.x, p.y, 6, p.color);
          }
        }
        p.x = -999;
      } else {
        p.x += (dx / d) * p.speed * dt;
        p.y += (dy / d) * p.speed * dt;
      }
    }
    this.projectiles = this.projectiles.filter(p => p.x > -900);

    // Place tower
    if (inp.mouse.clicked) {
      const mx = inp.mouse.x, my = inp.mouse.y;
      // Tower type buttons
      for (let i = 0; i < 3; i++) {
        const bx = 20 + i * 100, by = this.h - 45;
        if (Collision.pointInRect(mx, my, { x: bx, y: by, w: 90, h: 35 })) {
          this.selectedTower = i; this.engine.audio.play('click'); return;
        }
      }
      // Grid placement
      const col = Math.floor((mx - this.ox) / this.cellW);
      const row = Math.floor((my - this.oy) / this.cellH);
      if (col >= 0 && col < this.gridCols && row >= 0 && row < this.gridRows) {
        if (!this.pathSet.has(`${col},${row}`) && !this.towers.find(t => t.gx === col && t.gy === row)) {
          const tt = this.towerTypes[this.selectedTower];
          if (this.gold >= tt.cost) {
            this.gold -= tt.cost;
            this.towers.push({
              x: this.ox + col * this.cellW + this.cellW / 2,
              y: this.oy + row * this.cellH + this.cellH / 2,
              gx: col, gy: row, range: tt.range, damage: tt.damage,
              rate: tt.rate, cooldown: 0, color: tt.color, type: this.selectedTower
            });
            this.engine.audio.play('click');
          }
        }
      }
    }

    if (this.lives <= 0) { this.gameOver = true; this.engine.triggerGameOver(this.score); }
  }
  startWave() {
    const count = 5 + this.wave * 2;
    for (let i = 0; i < count; i++) {
      this.spawnQueue.push({
        hp: 30 + this.wave * 15,
        speed: 40 + this.wave * 3,
        delay: i * 0.6
      });
    }
  }
  render(ctx) {
    ctx.fillStyle = '#061A2E'; ctx.fillRect(0, 0, this.w, this.h);

    // Grid
    for (let r = 0; r < this.gridRows; r++) {
      for (let c = 0; c < this.gridCols; c++) {
        const x = this.ox + c * this.cellW, y = this.oy + r * this.cellH;
        const isPath = this.pathSet.has(`${c},${r}`);
        ctx.fillStyle = isPath ? 'rgba(194,178,128,0.3)' : 'rgba(0,180,160,0.06)';
        ctx.fillRect(x + 1, y + 1, this.cellW - 2, this.cellH - 2);
      }
    }

    // Towers
    for (let t of this.towers) {
      ctx.fillStyle = t.color;
      ctx.beginPath(); ctx.arc(t.x, t.y, this.cellW * 0.3, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.stroke();
    }

    // Enemies
    for (let e of this.enemies) {
      if (e.pathIdx >= this.path.length) continue;
      const pp = this.path[e.pathIdx];
      const np = this.path[Math.min(e.pathIdx + 1, this.path.length - 1)];
      const ex = Utils.lerp(this.ox + pp.x * this.cellW + this.cellW / 2, this.ox + np.x * this.cellW + this.cellW / 2, e.progress);
      const ey = Utils.lerp(this.oy + pp.y * this.cellH + this.cellH / 2, this.oy + np.y * this.cellH + this.cellH / 2, e.progress);
      ctx.fillStyle = e.slow > 0 ? '#88CCFF' : '#E74C3C';
      ctx.beginPath(); ctx.arc(ex, ey, 8, 0, Math.PI * 2); ctx.fill();
      // HP bar
      ctx.fillStyle = '#333'; ctx.fillRect(ex - 10, ey - 14, 20, 3);
      ctx.fillStyle = '#27AE60'; ctx.fillRect(ex - 10, ey - 14, 20 * (e.hp / e.maxHp), 3);
    }

    // Projectiles
    for (let p of this.projectiles) {
      ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill();
    }

    // HUD
    ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(0, 0, this.w, 50);
    this.engine.hud.drawText(ctx, `Wave: ${this.wave}`, 14, 10, 13, '#00D4FF');
    this.engine.hud.drawText(ctx, `💰 ${this.gold}`, 14, 30, 12, '#FFD700');
    this.engine.hud.drawText(ctx, `Lives: ${this.lives}`, this.w / 2, 10, 13, this.lives < 4 ? '#E74C3C' : '#FFFFFF', 'center');
    this.engine.hud.drawScore(ctx, this.score, this.w);

    // Tower buttons
    for (let i = 0; i < 3; i++) {
      const tt = this.towerTypes[i];
      const bx = 20 + i * 100, by = this.h - 45;
      ctx.fillStyle = i === this.selectedTower ? tt.color + '44' : 'rgba(0,0,0,0.5)';
      ctx.fillRect(bx, by, 90, 35);
      ctx.strokeStyle = tt.color; ctx.strokeRect(bx, by, 90, 35);
      ctx.font = 'bold 10px Inter'; ctx.fillStyle = '#FFF'; ctx.textAlign = 'center';
      ctx.fillText(`${tt.name} ($${tt.cost})`, bx + 45, by + 22);
    }
    ctx.textAlign = 'left';
  }
  destroy() {}
};

/* ═══════════════════════════════════════════════════════════════
   GAME 9: WordWeave — Word Finding
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[9] = class WordWeave {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.score = 0; this.gameOver = false;
    this.wordsFound = []; this.timer = 90; this.level = 1;
    this.dictionary = ['THE','AND','FOR','ARE','BUT','NOT','YOU','ALL','CAN','HER','WAS','ONE','OUR','OUT','DAY','HAD','HAS','HIS','HOW','MAN','NEW','NOW','OLD','SEE','WAY','WHO','DID','GET','HAS','HIM','LET','SAY','SHE','TOO','USE','CAT','DOG','RUN','SIT','TOP','RED','BIG','CUT','EAT','FAR','HOT','SUN','FUN','WIN','BOX','CUP','MAP','PEN','SKY','FLY','TRY','WHY','AIR','AGE','ARM','ART','BAD','BAG','BED','BIT','BOY','CAR','DRY','EAR','END','EYE','FEW','GAS','GOD','GUN','GUY','ICE','JOB','KEY','LAW','LEG','LIE','LOT','LOW','OIL','PAY','PUT','RAN','ROW','SET','SIX','TEN','WAR','WET','WON','YET','ABLE','ALSO','BACK','BEEN','BEST','BODY','BOOK','CALL','CAME','CITY','COME','DARK','EACH','FACT','FIND','FISH','FOOD','GAME','GIVE','GOLD','GOOD','GROW','HAND','HARD','HAVE','HEAD','HELP','HERE','HIGH','HOME','HOPE','IDEA','INTO','JUST','KEEP','KIND','KING','KNOW','LAKE','LAND','LAST','LEFT','LIFE','LIKE','LINE','LIVE','LONG','LOOK','LORD','MADE','MAKE','MIND','MISS','MOON','MOVE','MUCH','MUST','NAME','NEAR','NEED','NEXT','ONLY','OPEN','OVER','PART','PLAN','PLAY','RAIN','READ','REAL','REST','RICH','ROAD','ROCK','ROOM','SAFE','SAME','SHIP','SHOW','SIDE','SNOW','SOME','SONG','SORT','STAR','STEP','STOP','SURE','TAKE','TALK','TELL','THAN','THAT','THEM','THEN','THEY','THIS','TIME','TOOK','TREE','TRUE','TURN','TYPE','UNIT','UPON','VERY','WANT','WELL','WENT','WERE','WHAT','WHEN','WILL','WIND','WITH','WOOD','WORD','WORK','YEAR','YOUR','FIRE','FOUR','FIVE','GIRL','GONE','HALF','HOLE','HOUR','HUGE','JUMP','KILL','LATE','LOST','LOVE','MILE','MORE','MOVE','NICE','NOTE','ONCE','PAIR','PASS','PATH','PICK','POOL','PULL','PUSH','RACE','RISE','RULE','SAVE','SEAT','SEEM','SIGN','SKIN','SOFT','SOUL','STAY','SURE','TALL','TEST','THIN','TOWN','TRIP','WARM','WASH','WAVE','WEAK','WIDE','WIFE','WILD','WISE','WISH','WORE','ZERO'];
    this.gridSize = 5;
    this.generateGrid();
    this.currentWord = '';
    this.selectedCells = [];
  }
  generateGrid() {
    this.letters = [];
    const vowels = 'AEIOU'; const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
    for (let i = 0; i < this.gridSize * this.gridSize; i++) {
      this.letters.push(Math.random() > 0.35 ? Utils.choice([...consonants]) : Utils.choice([...vowels]));
    }
  }
  update(dt) {
    if (this.gameOver) return;
    this.timer -= dt;
    if (this.timer <= 0) {
      this.gameOver = true; this.engine.triggerGameOver(this.score); return;
    }
    const inp = this.engine.input;
    if (inp.mouse.clicked) {
      const cs = Math.min((this.w - 60) / this.gridSize, (this.h - 200) / this.gridSize);
      const ox = (this.w - cs * this.gridSize) / 2;
      const oy = 100;
      const col = Math.floor((inp.mouse.x - ox) / cs);
      const row = Math.floor((inp.mouse.y - oy) / cs);
      if (col >= 0 && col < this.gridSize && row >= 0 && row < this.gridSize) {
        const idx = row * this.gridSize + col;
        if (this.selectedCells.includes(idx)) {
          // Submit word
          this.submitWord();
        } else {
          // Check adjacency
          if (this.selectedCells.length === 0 || this.isAdjacent(this.selectedCells[this.selectedCells.length - 1], idx)) {
            this.selectedCells.push(idx);
            this.currentWord += this.letters[idx];
            this.engine.audio.play('click');
          }
        }
      } else {
        // Click outside grid - submit
        if (this.currentWord.length > 0) this.submitWord();
      }
    }
    // Press Enter to submit
    if (inp.isPressed('Enter') && this.currentWord.length > 0) this.submitWord();
    // Press Escape/Backspace to clear
    if (inp.isPressed('Escape') || inp.isPressed('Backspace')) { this.currentWord = ''; this.selectedCells = []; }
  }
  isAdjacent(a, b) {
    const ar = Math.floor(a / this.gridSize), ac = a % this.gridSize;
    const br = Math.floor(b / this.gridSize), bc = b % this.gridSize;
    return Math.abs(ar - br) <= 1 && Math.abs(ac - bc) <= 1 && !this.selectedCells.includes(b);
  }
  submitWord() {
    if (this.currentWord.length >= 3 && this.dictionary.includes(this.currentWord) && !this.wordsFound.includes(this.currentWord)) {
      const pts = this.currentWord.length === 3 ? 100 : this.currentWord.length === 4 ? 300 : this.currentWord.length === 5 ? 600 : 1000;
      this.score += pts;
      this.wordsFound.push(this.currentWord);
      this.engine.audio.play('success');
      this.engine.particles.emit(this.w / 2, this.h / 2 - 20, 10, '#FFD700');
    } else if (this.currentWord.length >= 3) {
      this.engine.audio.play('fail');
    }
    this.currentWord = ''; this.selectedCells = [];
  }
  render(ctx) {
    ctx.fillStyle = '#1A1200'; ctx.fillRect(0, 0, this.w, this.h);
    const cs = Math.min((this.w - 60) / this.gridSize, (this.h - 200) / this.gridSize);
    const ox = (this.w - cs * this.gridSize) / 2;
    const oy = 100;

    // Grid
    for (let i = 0; i < this.letters.length; i++) {
      const r = Math.floor(i / this.gridSize), c = i % this.gridSize;
      const x = ox + c * cs, y = oy + r * cs;
      const selected = this.selectedCells.includes(i);
      ctx.fillStyle = selected ? '#27AE60' : '#2D2D1A';
      ctx.fillRect(x + 2, y + 2, cs - 4, cs - 4);
      ctx.strokeStyle = selected ? '#FFFFFF' : '#5C5C3A'; ctx.strokeRect(x + 2, y + 2, cs - 4, cs - 4);
      ctx.font = `bold ${cs * 0.45}px Inter, sans-serif`; ctx.fillStyle = '#ECF0F1';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(this.letters[i], x + cs / 2, y + cs / 2);
    }

    // Current word display
    ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(ox, oy + this.gridSize * cs + 10, this.gridSize * cs, 40);
    ctx.font = 'bold 20px Orbitron, sans-serif'; ctx.fillStyle = '#FFD700'; ctx.textAlign = 'center';
    ctx.fillText(this.currentWord || 'Select letters...', this.w / 2, oy + this.gridSize * cs + 35);

    // Words found
    ctx.font = '10px Inter'; ctx.fillStyle = '#95A5A6'; ctx.textAlign = 'left';
    const wfStr = this.wordsFound.slice(-8).join(' · ');
    ctx.fillText(`Found: ${wfStr}`, 14, this.h - 14);

    // HUD
    ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(0, 0, this.w, 45);
    this.engine.hud.drawScore(ctx, this.score, this.w);
    this.engine.hud.drawText(ctx, `⏱️ ${Math.ceil(this.timer)}s`, this.w / 2, 12, 14, this.timer < 15 ? '#E74C3C' : '#FFFFFF', 'center');
    this.engine.hud.drawText(ctx, `Words: ${this.wordsFound.length}`, 14, 14, 12, '#27AE60');
    ctx.textAlign = 'left';
  }
  destroy() {}
};

/* ═══════════════════════════════════════════════════════════════
   GAME 10: QuantumDrift — Dual Particle Experimental
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[10] = class QuantumDrift {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.score = 0; this.gameOver = false; this.level = 1;
    this.p1 = { x: this.w * 0.3, y: this.h / 2 }; // cyan particle
    this.p2 = { x: this.w * 0.7, y: this.h / 2 }; // magenta particle (mirrors)
    this.tokens = []; this.obstacles = [];
    this.collapsed = false; this.collapsedSide = 0;
    this.scrollX = 0; this.speed = 80;
    this.generateLevel();
  }
  generateLevel() {
    this.tokens = []; this.obstacles = [];
    for (let i = 0; i < 15 + this.level * 5; i++) {
      const x = 200 + i * 120;
      this.tokens.push({ x, y: Utils.rand(60, this.h - 60), r: 10, collected: false });
    }
    for (let i = 0; i < 5 + this.level * 3; i++) {
      const x = 300 + i * 180;
      this.obstacles.push({ x, y: Utils.rand(40, this.h - 40), w: 30, h: 30 });
    }
    this.p1 = { x: 80, y: this.h * 0.35 };
    this.p2 = { x: 80, y: this.h * 0.65 };
    this.collapsed = false; this.scrollX = 0;
  }
  update(dt) {
    if (this.gameOver) return;
    const inp = this.engine.input;
    const spd = 180;
    const dy = inp.isDown('ArrowUp') || inp.isDown('w') ? -spd * dt : inp.isDown('ArrowDown') || inp.isDown('s') ? spd * dt : 0;

    if (!this.collapsed) {
      this.p1.y += dy; this.p2.y += dy; // both move together
      this.p1.y = Utils.clamp(this.p1.y, 20, this.h - 20);
      this.p2.y = Utils.clamp(this.p2.y, 20, this.h - 20);
    } else {
      const p = this.collapsedSide === 0 ? this.p1 : this.p2;
      p.y += dy; p.y = Utils.clamp(p.y, 20, this.h - 20);
    }

    // Collapse
    if (inp.isPressed(' ') && !this.collapsed) {
      this.collapsed = true;
      this.collapsedSide = inp.mouse.y < this.h / 2 ? 0 : 1;
      this.engine.audio.play('click');
    }

    this.scrollX += this.speed * dt;
    this.speed += 2 * dt;

    // Token collection
    const particles = this.collapsed ? [this.collapsedSide === 0 ? this.p1 : this.p2] : [this.p1, this.p2];
    for (let t of this.tokens) {
      if (t.collected) continue;
      for (let p of particles) {
        if (Utils.dist(p.x, p.y, t.x - this.scrollX, t.y) < t.r + 12) {
          t.collected = true;
          this.score += this.collapsed ? 100 : 200;
          this.engine.audio.play('collect');
          this.engine.particles.emit(t.x - this.scrollX, t.y, 6, this.collapsed ? '#00D4FF' : '#FFD700');
        }
      }
    }

    // Obstacle collision
    for (let o of this.obstacles) {
      const ox = o.x - this.scrollX;
      for (let p of particles) {
        if (p.x + 10 > ox && p.x - 10 < ox + o.w && p.y + 10 > o.y && p.y - 10 < o.y + o.h) {
          this.gameOver = true;
          this.engine.particles.emit(p.x, p.y, 20, '#E74C3C');
          this.engine.audio.play('explosion');
          this.engine.triggerGameOver(this.score);
          return;
        }
      }
    }

    // Level complete
    const lastToken = this.tokens[this.tokens.length - 1];
    if (lastToken && lastToken.x - this.scrollX < -50) {
      this.level++; this.score += 1000;
      this.engine.audio.play('success');
      this.generateLevel();
    }
  }
  render(ctx) {
    ctx.fillStyle = '#060008'; ctx.fillRect(0, 0, this.w, this.h);
    // Probability waves
    ctx.strokeStyle = 'rgba(155,89,182,0.15)';
    for (let y = 0; y < this.h; y += 30) {
      ctx.beginPath();
      for (let x = 0; x < this.w; x += 5) {
        const yy = y + Math.sin((x + this.scrollX) * 0.02) * 15;
        if (x === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }

    // Tokens
    for (let t of this.tokens) {
      if (t.collected) continue;
      const tx = t.x - this.scrollX;
      if (tx < -20 || tx > this.w + 20) continue;
      ctx.fillStyle = '#FFD700';
      ctx.beginPath(); ctx.arc(tx, t.y, t.r, 0, Math.PI * 2); ctx.fill();
    }

    // Obstacles
    ctx.fillStyle = '#E74C3C';
    for (let o of this.obstacles) {
      const ox = o.x - this.scrollX;
      if (ox < -40 || ox > this.w + 40) continue;
      ctx.fillRect(ox, o.y, o.w, o.h);
      ctx.strokeStyle = '#FF6B6B'; ctx.strokeRect(ox, o.y, o.w, o.h);
    }

    // Particles
    if (!this.collapsed || this.collapsedSide === 0) {
      ctx.fillStyle = '#00D4FF'; ctx.shadowColor = '#00D4FF'; ctx.shadowBlur = 12;
      ctx.beginPath(); ctx.arc(this.p1.x, this.p1.y, 12, 0, Math.PI * 2); ctx.fill();
    }
    if (!this.collapsed || this.collapsedSide === 1) {
      ctx.fillStyle = '#FF6B9D'; ctx.shadowColor = '#FF6B9D'; ctx.shadowBlur = 12;
      ctx.beginPath(); ctx.arc(this.p2.x, this.p2.y, 12, 0, Math.PI * 2); ctx.fill();
    }
    ctx.shadowBlur = 0;

    // HUD
    this.engine.hud.drawScore(ctx, this.score, this.w);
    this.engine.hud.drawText(ctx, `LEVEL ${this.level}`, this.w / 2, 10, 14, '#9B59B6', 'center');
    this.engine.hud.drawText(ctx, this.collapsed ? 'COLLAPSED' : 'SUPERPOSITION (Space to collapse)', 14, this.h - 20, 10, '#95A5A6');
  }
  destroy() {}
};

/* ═══════════════════════════════════════════════════════════════
   GAME 11: MathBlaster3D — Math Shooter
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[11] = class MathBlaster3D {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.score = 0; this.gameOver = false; this.lives = 3;
    this.streak = 0; this.timer = 60; this.level = 1;
    this.currentProblem = null; this.inputStr = '';
    this.asteroids = [];
    this.generateProblem();
  }
  generateProblem() {
    const ops = ['+', '-', '×'];
    const op = Utils.choice(ops);
    let a, b, answer;
    if (this.level <= 2) { a = Utils.randInt(1, 10); b = Utils.randInt(1, 10); }
    else if (this.level <= 4) { a = Utils.randInt(2, 20); b = Utils.randInt(2, 15); }
    else { a = Utils.randInt(5, 50); b = Utils.randInt(2, 20); }
    if (op === '+') answer = a + b;
    else if (op === '-') { if (a < b) [a, b] = [b, a]; answer = a - b; }
    else answer = a * b;
    this.currentProblem = { text: `${a} ${op} ${b} = ?`, answer: String(answer) };
    this.inputStr = '';
    // Spawn asteroid
    this.asteroids.push({
      x: Utils.rand(60, this.w - 60), y: -40,
      size: 30 + this.level * 3, speed: 30 + this.level * 5,
      text: this.currentProblem.text
    });
  }
  update(dt) {
    if (this.gameOver) return;
    this.timer -= dt;
    if (this.timer <= 0) { this.gameOver = true; this.engine.triggerGameOver(this.score); return; }

    const inp = this.engine.input;
    // Number input
    for (let k = 0; k <= 9; k++) {
      if (inp.isPressed(String(k))) { this.inputStr += String(k); this.engine.audio.play('click'); }
    }
    if (inp.isPressed('-') && this.inputStr.length === 0) { this.inputStr = '-'; }
    if (inp.isPressed('Backspace') && this.inputStr.length > 0) this.inputStr = this.inputStr.slice(0, -1);

    if (inp.isPressed('Enter') && this.inputStr.length > 0) {
      if (this.inputStr === this.currentProblem.answer) {
        this.streak++;
        const mult = Math.min(Math.floor(this.streak / 5) + 1, 4);
        this.score += 200 * mult;
        this.asteroids = this.asteroids.filter(a => a.text !== this.currentProblem.text);
        this.engine.audio.play('explosion');
        this.engine.particles.emit(this.w / 2, this.h / 2, 15, '#FFD700');
        if (this.streak % 10 === 0) this.level++;
        this.generateProblem();
      } else {
        this.streak = 0; this.score = Math.max(0, this.score - 50);
        this.engine.audio.play('fail'); this.inputStr = '';
      }
    }

    // Move asteroids
    for (let a of this.asteroids) {
      a.y += a.speed * dt;
      if (a.y > this.h) {
        this.lives--; this.streak = 0;
        this.engine.audio.play('hit');
        this.asteroids = this.asteroids.filter(aa => aa !== a);
        if (this.lives <= 0) { this.gameOver = true; this.engine.triggerGameOver(this.score); }
        else this.generateProblem();
      }
    }
  }
  render(ctx) {
    ctx.fillStyle = '#05051A'; ctx.fillRect(0, 0, this.w, this.h);
    // Stars
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    for (let i = 0; i < 50; i++) {
      const x = (i * 73 + 11) % this.w, y = (i * 47 + 23) % this.h;
      ctx.fillRect(x, y, 1.5, 1.5);
    }

    // Asteroids
    for (let a of this.asteroids) {
      ctx.fillStyle = '#555'; ctx.beginPath(); ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#888'; ctx.stroke();
      ctx.font = `bold ${a.size * 0.5}px Orbitron`; ctx.fillStyle = '#FFF';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(a.text, a.x, a.y);
    }

    // Input display
    ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(this.w / 2 - 120, this.h - 80, 240, 50);
    ctx.strokeStyle = '#F1C40F'; ctx.strokeRect(this.w / 2 - 120, this.h - 80, 240, 50);
    ctx.font = 'bold 24px Orbitron'; ctx.fillStyle = '#F1C40F'; ctx.textAlign = 'center';
    ctx.fillText(this.inputStr || '_', this.w / 2, this.h - 50);

    // HUD
    this.engine.hud.drawLives(ctx, this.lives);
    this.engine.hud.drawScore(ctx, this.score, this.w);
    this.engine.hud.drawText(ctx, `⏱️ ${Math.ceil(this.timer)}s`, this.w / 2, 10, 14, '#FFFFFF', 'center');
    this.engine.hud.drawText(ctx, `Streak: ${this.streak}`, this.w / 2, 30, 11, this.streak >= 5 ? '#FFD700' : '#95A5A6', 'center');
    ctx.textAlign = 'left';
  }
  destroy() {}
};

/* ═══════════════════════════════════════════════════════════════
   GAME 12: EcoBalance — Ecosystem Simulation
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[12] = class EcoBalance {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.score = 0; this.gameOver = false; this.month = 1; this.year = 1;
    this.monthTimer = 0;
    this.stats = { flora: 60, fauna: 50, water: 70, air: 65, temp: 50 };
    this.events = []; this.message = 'Balance the ecosystem!'; this.msgTimer = 3;
    this.biodiversity = 0; this.updateBiodiversity();
    this.buttons = [
      { label: 'Plant Trees', effect: { flora: 5, air: 3, fauna: 2 }, cost: 0 },
      { label: 'Clean Water', effect: { water: 8, fauna: 2 }, cost: 0 },
      { label: 'Reduce Emissions', effect: { air: 6, temp: -3 }, cost: 0 },
      { label: 'Build Reserve', effect: { fauna: 8, flora: 3 }, cost: 0 },
      { label: 'Cool Atmosphere', effect: { temp: -8, water: 2 }, cost: 0 }
    ];
    this.actionCooldown = 0;
  }
  updateBiodiversity() {
    const s = this.stats;
    const vals = [s.flora, s.fauna, s.water, s.air, 100 - Math.abs(s.temp - 50) * 2];
    this.biodiversity = Math.floor(vals.reduce((a, b) => a + b) / vals.length);
  }
  update(dt) {
    if (this.gameOver) return;
    this.monthTimer += dt;
    this.actionCooldown = Math.max(0, this.actionCooldown - dt);
    if (this.msgTimer > 0) this.msgTimer -= dt;

    if (this.monthTimer >= 3) {
      this.monthTimer = 0; this.month++;
      if (this.month > 12) { this.month = 1; this.year++; }
      // Natural decay
      this.stats.flora = Utils.clamp(this.stats.flora - 2, 0, 100);
      this.stats.fauna = Utils.clamp(this.stats.fauna - 3, 0, 100);
      this.stats.water = Utils.clamp(this.stats.water - 1, 0, 100);
      this.stats.air = Utils.clamp(this.stats.air - 2, 0, 100);
      this.stats.temp = Utils.clamp(this.stats.temp + 1, 0, 100);
      // Random event
      if (Math.random() > 0.6) {
        const events = [
          { msg: '🔥 Wildfire! Flora -10', effect: { flora: -10, fauna: -5 } },
          { msg: '🌊 Flood! Water +15', effect: { water: 15, fauna: -3 } },
          { msg: '🏭 Industrial pollution! Air -8', effect: { air: -8, temp: 3 } },
          { msg: '🐛 Pest outbreak! Fauna -8', effect: { fauna: -8, flora: -3 } }
        ];
        const ev = Utils.choice(events);
        for (let k in ev.effect) this.stats[k] = Utils.clamp(this.stats[k] + ev.effect[k], 0, 100);
        this.message = ev.msg; this.msgTimer = 3;
        this.engine.audio.play('hit');
      }
      this.updateBiodiversity();
      this.score += this.biodiversity;
      if (this.biodiversity < 20) { this.gameOver = true; this.engine.triggerGameOver(this.score); }
    }

    // Button clicks
    const inp = this.engine.input;
    if (inp.mouse.clicked && this.actionCooldown <= 0) {
      for (let i = 0; i < this.buttons.length; i++) {
        const bx = 20, by = this.h / 2 - 80 + i * 44;
        if (Collision.pointInRect(inp.mouse.x, inp.mouse.y, { x: bx, y: by, w: 180, h: 36 })) {
          for (let k in this.buttons[i].effect) {
            this.stats[k] = Utils.clamp(this.stats[k] + this.buttons[i].effect[k], 0, 100);
          }
          this.updateBiodiversity();
          this.engine.audio.play('success');
          this.actionCooldown = 1;
          break;
        }
      }
    }
  }
  render(ctx) {
    const grad = ctx.createLinearGradient(0, 0, 0, this.h);
    const health = this.biodiversity / 100;
    grad.addColorStop(0, `rgba(${Math.floor(135 * health)},${Math.floor(206 * health)},235,1)`);
    grad.addColorStop(1, `rgba(${Math.floor(39 * health + 50)},${Math.floor(174 * health + 20)},${Math.floor(96 * health + 20)},1)`);
    ctx.fillStyle = grad; ctx.fillRect(0, 0, this.w, this.h);

    // Stats bars (right side)
    const labels = ['Flora 🌿', 'Fauna 🦌', 'Water 💧', 'Air 🌬️', 'Temp 🌡️'];
    const keys = ['flora', 'fauna', 'water', 'air', 'temp'];
    const colors = ['#27AE60', '#E67E22', '#3498DB', '#95A5A6', '#E74C3C'];
    const bw = 160, bh = 18;
    for (let i = 0; i < 5; i++) {
      const x = this.w - bw - 30, y = 80 + i * 40;
      ctx.font = 'bold 11px Inter'; ctx.fillStyle = '#FFF'; ctx.textAlign = 'right';
      ctx.fillText(labels[i], x - 6, y + 13);
      this.engine.hud.drawBar(ctx, x, y, bw, bh, this.stats[keys[i]], 100, colors[i]);
      ctx.font = '10px Inter'; ctx.fillStyle = '#FFF'; ctx.textAlign = 'center';
      ctx.fillText(Math.floor(this.stats[keys[i]]), x + bw / 2, y + 14);
    }

    // Biodiversity gauge (center)
    const cx = this.w / 2, cy = this.h / 2 - 30;
    ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.beginPath(); ctx.arc(cx, cy, 60, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = this.biodiversity > 50 ? '#27AE60' : this.biodiversity > 30 ? '#F1C40F' : '#E74C3C';
    ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(cx, cy, 55, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2) * this.biodiversity / 100); ctx.stroke();
    ctx.lineWidth = 1;
    ctx.font = 'bold 24px Orbitron'; ctx.fillStyle = '#FFF'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(`${this.biodiversity}%`, cx, cy);
    ctx.font = '10px Inter'; ctx.fillText('BIODIVERSITY', cx, cy + 22);

    // Action buttons
    for (let i = 0; i < this.buttons.length; i++) {
      const bx = 20, by = this.h / 2 - 80 + i * 44;
      ctx.fillStyle = this.actionCooldown > 0 ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.5)';
      ctx.fillRect(bx, by, 180, 36);
      ctx.strokeStyle = '#27AE60'; ctx.strokeRect(bx, by, 180, 36);
      ctx.font = 'bold 11px Inter'; ctx.fillStyle = '#ECF0F1'; ctx.textAlign = 'center';
      ctx.fillText(this.buttons[i].label, bx + 90, by + 22);
    }

    // HUD
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(0, 0, this.w, 40);
    this.engine.hud.drawText(ctx, `Year ${this.year} Month ${this.month}`, 14, 10, 13, '#FFFFFF');
    this.engine.hud.drawScore(ctx, this.score, this.w);

    // Message
    if (this.msgTimer > 0) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(0, 44, this.w, 24);
      ctx.font = '12px Inter'; ctx.fillStyle = '#F1C40F'; ctx.textAlign = 'center';
      ctx.fillText(this.message, this.w / 2, 60);
    }
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
  }
  destroy() {}
};

/* ═══════════════════════════════════════════════════════════════
   GAME 13: RuneChaser — Top-down Adventure
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[13] = class RuneChaser {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.score = 0; this.gameOver = false; this.level = 1; this.hp = 100;
    this.tileSize = 32; this.cols = Math.floor(this.w / this.tileSize);
    this.rows = Math.floor(this.h / this.tileSize);
    this.player = { x: 1, y: 1 };
    this.runes = []; this.traps = []; this.guardians = [];
    this.timer = 60;
    this.generateLevel();
  }
  generateLevel() {
    this.map = [];
    for (let r = 0; r < this.rows; r++) {
      this.map[r] = [];
      for (let c = 0; c < this.cols; c++) {
        if (r === 0 || r === this.rows - 1 || c === 0 || c === this.cols - 1) this.map[r][c] = 1;
        else this.map[r][c] = Math.random() > 0.78 ? 1 : 0;
      }
    }
    this.map[1][1] = 0; this.map[1][2] = 0; this.map[2][1] = 0;
    this.player = { x: 1, y: 1 };
    this.runes = []; this.traps = []; this.guardians = [];
    const runeCount = 5 + this.level * 2;
    for (let i = 0; i < runeCount; i++) {
      let rx, ry;
      do { rx = Utils.randInt(2, this.cols - 2); ry = Utils.randInt(2, this.rows - 2); }
      while (this.map[ry][rx] === 1);
      this.runes.push({ x: rx, y: ry, collected: false });
    }
    for (let i = 0; i < 3 + this.level; i++) {
      let tx, ty;
      do { tx = Utils.randInt(2, this.cols - 2); ty = Utils.randInt(2, this.rows - 2); }
      while (this.map[ty][tx] === 1);
      this.traps.push({ x: tx, y: ty });
    }
    for (let i = 0; i < Math.min(this.level, 5); i++) {
      let gx, gy;
      do { gx = Utils.randInt(3, this.cols - 3); gy = Utils.randInt(3, this.rows - 3); }
      while (this.map[gy][gx] === 1);
      this.guardians.push({ x: gx, y: gy, moveTimer: 0 });
    }
    this.timer = 60; this.hp = Math.min(this.hp + 20, 100);
  }
  update(dt) {
    if (this.gameOver) return;
    this.timer -= dt;
    if (this.timer <= 0) { this.gameOver = true; this.engine.triggerGameOver(this.score); return; }

    const inp = this.engine.input;
    // Grid movement with cooldown
    this.moveCooldown = (this.moveCooldown || 0) - dt;
    if (this.moveCooldown <= 0) {
      let dx = 0, dy = 0;
      if (inp.isDown('ArrowLeft') || inp.isDown('a')) dx = -1;
      else if (inp.isDown('ArrowRight') || inp.isDown('d')) dx = 1;
      else if (inp.isDown('ArrowUp') || inp.isDown('w')) dy = -1;
      else if (inp.isDown('ArrowDown') || inp.isDown('s')) dy = 1;
      if (dx !== 0 || dy !== 0) {
        const nx = this.player.x + dx, ny = this.player.y + dy;
        if (ny >= 0 && ny < this.rows && nx >= 0 && nx < this.cols && this.map[ny][nx] === 0) {
          this.player.x = nx; this.player.y = ny; this.moveCooldown = 0.12;
        }
      }
    }

    // Collect runes
    for (let r of this.runes) {
      if (!r.collected && r.x === this.player.x && r.y === this.player.y) {
        r.collected = true; this.score += 200;
        this.engine.audio.play('collect');
        this.engine.particles.emit(r.x * this.tileSize + 16, r.y * this.tileSize + 16, 8, '#00D4FF');
      }
    }

    // Traps
    for (let t of this.traps) {
      if (t.x === this.player.x && t.y === this.player.y) {
        this.hp -= 20; t.x = -99;
        this.engine.audio.play('hit');
        if (this.hp <= 0) { this.gameOver = true; this.engine.triggerGameOver(this.score); return; }
      }
    }

    // Guardians (simple chase)
    for (let g of this.guardians) {
      g.moveTimer += dt;
      if (g.moveTimer >= 0.5) {
        g.moveTimer = 0;
        const dx = Math.sign(this.player.x - g.x);
        const dy = Math.sign(this.player.y - g.y);
        const nx = g.x + (Math.random() > 0.5 ? dx : 0);
        const ny = g.y + (Math.random() > 0.5 ? dy : 0);
        if (ny >= 0 && ny < this.rows && nx >= 0 && nx < this.cols && this.map[ny][nx] === 0) {
          g.x = nx; g.y = ny;
        }
        if (g.x === this.player.x && g.y === this.player.y) {
          this.hp -= 30; this.engine.audio.play('hit');
          if (this.hp <= 0) { this.gameOver = true; this.engine.triggerGameOver(this.score); }
        }
      }
    }

    // All runes collected = next level
    if (this.runes.every(r => r.collected)) {
      this.score += 2000; this.level++;
      this.engine.audio.play('success');
      this.generateLevel();
    }
  }
  render(ctx) {
    ctx.fillStyle = '#120E08'; ctx.fillRect(0, 0, this.w, this.h);
    const ts = this.tileSize;
    // Map
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.map[r][c] === 1) {
          ctx.fillStyle = '#3E2723'; ctx.fillRect(c * ts, r * ts, ts, ts);
          ctx.strokeStyle = '#5D4037'; ctx.strokeRect(c * ts, r * ts, ts, ts);
        } else {
          ctx.fillStyle = '#1A1410'; ctx.fillRect(c * ts, r * ts, ts, ts);
        }
      }
    }

    // Traps
    ctx.fillStyle = '#8B0000';
    for (let t of this.traps) { if (t.x >= 0) ctx.fillRect(t.x * ts + 8, t.y * ts + 8, ts - 16, ts - 16); }

    // Runes
    ctx.font = `${ts * 0.6}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (let r of this.runes) {
      if (!r.collected) { ctx.fillText('🔮', r.x * ts + ts / 2, r.y * ts + ts / 2); }
    }

    // Guardians
    for (let g of this.guardians) { ctx.fillText('👹', g.x * ts + ts / 2, g.y * ts + ts / 2); }

    // Player
    ctx.fillText('🏃', this.player.x * ts + ts / 2, this.player.y * ts + ts / 2);

    // HUD
    ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(0, 0, this.w, 32);
    this.engine.hud.drawBar(ctx, 14, 8, 100, 12, this.hp, 100, '#E74C3C');
    this.engine.hud.drawScore(ctx, this.score, this.w);
    this.engine.hud.drawText(ctx, `LVL ${this.level}`, this.w / 2, 8, 12, '#FFD700', 'center');
    const remaining = this.runes.filter(r => !r.collected).length;
    this.engine.hud.drawText(ctx, `Runes: ${remaining}`, this.w / 2 + 80, 8, 11, '#00D4FF');
    this.engine.hud.drawText(ctx, `⏱️${Math.ceil(this.timer)}`, 130, 8, 11, '#FFF');
    ctx.textAlign = 'left';
  }
  destroy() {}
};

/* ═══════════════════════════════════════════════════════════════
   GAME 14: NeuralNet — Node Connection Logic Puzzle
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[14] = class NeuralNet {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.score = 0; this.level = 1; this.gameOver = false;
    this.generatePuzzle();
  }
  generatePuzzle() {
    const layers = Math.min(2 + Math.floor(this.level / 2), 5);
    const nodesPerLayer = Math.min(2 + Math.floor(this.level / 3), 4);
    this.nodes = []; this.connections = []; this.target = [];
    this.dragging = null; this.solved = false;
    for (let l = 0; l < layers; l++) {
      const count = l === 0 || l === layers - 1 ? nodesPerLayer : nodesPerLayer + 1;
      for (let n = 0; n < count; n++) {
        const x = 80 + l * ((this.w - 160) / (layers - 1));
        const y = 80 + n * ((this.h - 180) / (count - 1 || 1));
        this.nodes.push({ x, y, layer: l, idx: n, active: l === 0 });
      }
    }
    // Target: last layer must all be active
    const lastLayer = layers - 1;
    this.targetNodes = this.nodes.filter(n => n.layer === lastLayer);
    this.optimalConnections = (layers - 1) * nodesPerLayer;
  }
  update(dt) {
    if (this.gameOver || this.solved) return;
    const inp = this.engine.input;
    if (inp.mouse.clicked) {
      // Find clicked node
      for (let n of this.nodes) {
        if (Utils.dist(inp.mouse.x, inp.mouse.y, n.x, n.y) < 18) {
          if (this.dragging === null) { this.dragging = n; }
          else {
            if (n.layer === this.dragging.layer + 1) {
              // Add connection
              const exists = this.connections.find(c => c.from === this.dragging && c.to === n);
              if (!exists) {
                this.connections.push({ from: this.dragging, to: n });
                this.engine.audio.play('click');
                this.propagateSignal();
              }
            }
            this.dragging = null;
          }
          return;
        }
      }
      this.dragging = null;
    }
    // Right-click to remove (use 'r' key)
    if (inp.isPressed('r') && this.connections.length > 0) {
      this.connections.pop();
      this.propagateSignal();
      this.engine.audio.play('click');
    }
  }
  propagateSignal() {
    // Reset all non-input nodes
    for (let n of this.nodes) { if (n.layer > 0) n.active = false; }
    // Propagate
    for (let c of this.connections) {
      if (c.from.active) c.to.active = true;
    }
    // Check solved
    if (this.targetNodes.every(n => n.active)) {
      this.solved = true;
      const efficiency = Math.max(0, (this.optimalConnections - this.connections.length + 2) * 100);
      this.score += 1000 + efficiency;
      this.engine.audio.play('success');
      setTimeout(() => { this.level++; this.generatePuzzle(); this.solved = false; }, 1200);
    }
  }
  render(ctx) {
    ctx.fillStyle = '#080818'; ctx.fillRect(0, 0, this.w, this.h);
    // Circuit lines
    ctx.strokeStyle = 'rgba(0,212,255,0.05)';
    for (let x = 0; x < this.w; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, this.h); ctx.stroke(); }

    // Connections
    for (let c of this.connections) {
      ctx.strokeStyle = c.from.active ? '#00FF88' : '#333'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(c.from.x, c.from.y); ctx.lineTo(c.to.x, c.to.y); ctx.stroke();
      if (c.from.active) {
        ctx.shadowColor = '#00FF88'; ctx.shadowBlur = 4; ctx.stroke(); ctx.shadowBlur = 0;
      }
      ctx.lineWidth = 1;
    }

    // Nodes
    for (let n of this.nodes) {
      ctx.fillStyle = n.active ? '#00D4FF' : '#333';
      ctx.shadowColor = n.active ? '#00D4FF' : 'transparent'; ctx.shadowBlur = n.active ? 10 : 0;
      ctx.beginPath(); ctx.arc(n.x, n.y, 14, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = n === this.dragging ? '#FFD700' : '#555'; ctx.lineWidth = 2; ctx.stroke(); ctx.lineWidth = 1;
      // Layer label
      if (n.idx === 0) {
        ctx.font = '9px Inter'; ctx.fillStyle = '#95A5A6'; ctx.textAlign = 'center';
        ctx.fillText(n.layer === 0 ? 'INPUT' : n.layer === this.targetNodes[0]?.layer ? 'OUTPUT' : `L${n.layer}`, n.x, n.y - 22);
      }
    }

    // HUD
    this.engine.hud.drawScore(ctx, this.score, this.w);
    this.engine.hud.drawText(ctx, `LEVEL ${this.level}`, this.w / 2, 10, 14, '#00D4FF', 'center');
    this.engine.hud.drawText(ctx, `Connections: ${this.connections.length} (R to undo)`, 14, 14, 11, '#95A5A6');
    this.engine.hud.drawText(ctx, this.dragging ? 'Click target node...' : 'Click source node to connect', 14, this.h - 20, 10, '#95A5A6');
    if (this.solved) {
      ctx.font = 'bold 28px Orbitron'; ctx.fillStyle = '#00FF88'; ctx.textAlign = 'center';
      ctx.fillText('SOLVED!', this.w / 2, this.h / 2);
    }
    ctx.textAlign = 'left';
  }
  destroy() {}
};

/* ═══════════════════════════════════════════════════════════════
   GAME 15: GalacticGardener — Idle Clicker
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[15] = class GalacticGardener {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.stardust = 0; this.totalEarned = 0; this.sps = 0; this.gameOver = false;
    this.plants = [
      { name: 'Moon Fern', cost: 10, sps: 1, count: 0, emoji: '🌱', color: '#27AE60' },
      { name: 'Sun Bloom', cost: 50, sps: 5, count: 0, emoji: '🌻', color: '#F1C40F' },
      { name: 'Star Vine', cost: 200, sps: 20, count: 0, emoji: '🍇', color: '#9B59B6' },
      { name: 'Nebula Rose', cost: 1000, sps: 100, count: 0, emoji: '🌹', color: '#E74C3C' },
      { name: 'Cosmic Tree', cost: 5000, sps: 500, count: 0, emoji: '🌳', color: '#00B4A0' }
    ];
    this.clickValue = 1; this.collectTimer = 0;
    // Load saved state
    const saved = engine.storage.load('galacticgardener_state');
    if (saved) {
      this.stardust = saved.stardust || 0;
      this.totalEarned = saved.totalEarned || 0;
      saved.plants?.forEach((p, i) => { if (this.plants[i]) this.plants[i].count = p; });
      this.recalcSPS();
    }
  }
  recalcSPS() { this.sps = this.plants.reduce((s, p) => s + p.sps * p.count, 0); }
  update(dt) {
    this.collectTimer += dt;
    // Auto collect
    this.stardust += this.sps * dt;
    this.totalEarned += this.sps * dt;

    const inp = this.engine.input;
    if (inp.mouse.clicked) {
      const mx = inp.mouse.x, my = inp.mouse.y;
      // Click garden center = manual collect
      if (Utils.dist(mx, my, this.w / 2, this.h / 2 - 30) < 60) {
        this.stardust += this.clickValue;
        this.totalEarned += this.clickValue;
        this.engine.audio.play('collect');
        this.engine.particles.emit(mx, my, 5, '#FFD700');
      }
      // Buy plant buttons
      for (let i = 0; i < this.plants.length; i++) {
        const bx = this.w - 220, by = 60 + i * 50;
        if (Collision.pointInRect(mx, my, { x: bx, y: by, w: 200, h: 42 })) {
          if (this.stardust >= this.plants[i].cost) {
            this.stardust -= this.plants[i].cost;
            this.plants[i].count++;
            this.plants[i].cost = Math.floor(this.plants[i].cost * 1.4);
            this.recalcSPS();
            this.engine.audio.play('powerup');
            this.saveState();
          }
        }
      }
    }

    // Auto-save every 5s
    if (this.collectTimer > 5) { this.collectTimer = 0; this.saveState(); }
  }
  saveState() {
    this.engine.storage.save('galacticgardener_state', {
      stardust: Math.floor(this.stardust),
      totalEarned: Math.floor(this.totalEarned),
      plants: this.plants.map(p => p.count)
    });
    this.engine.storage.saveHighScore('galacticgardener', Math.floor(this.totalEarned));
  }
  render(ctx) {
    ctx.fillStyle = '#05050F'; ctx.fillRect(0, 0, this.w, this.h);
    // Stars
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    for (let i = 0; i < 60; i++) ctx.fillRect((i * 67) % this.w, (i * 43) % this.h, 1, 1);

    // Central garden click area
    ctx.fillStyle = 'rgba(39,174,96,0.1)';
    ctx.beginPath(); ctx.arc(this.w / 2, this.h / 2 - 30, 60, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#27AE60'; ctx.stroke();
    ctx.font = '36px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('✨', this.w / 2, this.h / 2 - 30);
    ctx.font = '10px Inter'; ctx.fillStyle = '#95A5A6';
    ctx.fillText('Click to collect!', this.w / 2, this.h / 2 + 40);

    // Owned plants display
    let px = 30, py = this.h / 2 - 40;
    for (let p of this.plants) {
      if (p.count > 0) {
        ctx.font = '20px sans-serif'; ctx.fillText(p.emoji, px, py);
        ctx.font = '10px Inter'; ctx.fillStyle = p.color; ctx.textAlign = 'left';
        ctx.fillText(`x${p.count}`, px + 14, py + 6);
        py += 30;
      }
    }

    // Shop panel (right)
    ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fillRect(this.w - 230, 50, 220, this.plants.length * 50 + 20);
    ctx.font = 'bold 12px Orbitron'; ctx.fillStyle = '#00D4FF'; ctx.textAlign = 'center';
    ctx.fillText('SHOP', this.w - 120, 68);
    for (let i = 0; i < this.plants.length; i++) {
      const p = this.plants[i]; const bx = this.w - 220, by = 80 + i * 50;
      const canBuy = this.stardust >= p.cost;
      ctx.fillStyle = canBuy ? 'rgba(39,174,96,0.2)' : 'rgba(255,255,255,0.03)';
      ctx.fillRect(bx, by, 200, 42);
      ctx.strokeStyle = canBuy ? '#27AE60' : '#333'; ctx.strokeRect(bx, by, 200, 42);
      ctx.font = '16px sans-serif'; ctx.textAlign = 'left';
      ctx.fillText(p.emoji, bx + 8, by + 28);
      ctx.font = 'bold 11px Inter'; ctx.fillStyle = '#ECF0F1';
      ctx.fillText(p.name, bx + 32, by + 18);
      ctx.font = '9px Inter'; ctx.fillStyle = '#95A5A6';
      ctx.fillText(`+${p.sps}/s | Cost: ${Math.floor(p.cost)}`, bx + 32, by + 34);
      ctx.fillStyle = '#555'; ctx.textAlign = 'right';
      ctx.fillText(`x${p.count}`, bx + 194, by + 18);
    }

    // Top HUD
    ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(0, 0, this.w, 40);
    ctx.font = 'bold 16px Orbitron'; ctx.fillStyle = '#FFD700'; ctx.textAlign = 'left';
    ctx.fillText(`✨ ${Math.floor(this.stardust)}`, 14, 28);
    ctx.font = '11px Inter'; ctx.fillStyle = '#95A5A6';
    ctx.fillText(`${this.sps.toFixed(1)}/s`, 14 + ctx.measureText(`✨ ${Math.floor(this.stardust)}`).width + 10, 28);
    this.engine.hud.drawText(ctx, `Total: ${Math.floor(this.totalEarned)}`, this.w - 14, 10, 12, '#FFF', 'right');
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
  }
  destroy() { this.saveState(); }
};

/* ═══════════════════════════════════════════════════════════════
   GAME 16: FusionChef — Order Matching Simulation
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[16] = class FusionChef {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.score = 0; this.gameOver = false; this.combo = 0;
    this.ingredients = ['🍅','🧀','🍖','🥬','🍄','🌶️','🥚','🧅'];
    this.recipes = this.generateRecipes();
    this.orders = []; this.currentMix = [];
    this.timer = 90; this.maxOrders = 3;
    this.spawnOrder(); this.spawnOrder();
  }
  generateRecipes() {
    const r = [];
    for (let i = 0; i < 8; i++) {
      const len = Utils.randInt(2, 3);
      const recipe = [];
      for (let j = 0; j < len; j++) recipe.push(Utils.randInt(0, this.ingredients.length - 1));
      r.push({ name: `Dish ${i + 1}`, items: recipe.sort() });
    }
    return r;
  }
  spawnOrder() {
    if (this.orders.length >= this.maxOrders) return;
    const recipe = Utils.choice(this.recipes);
    this.orders.push({ recipe, timer: 20 + Math.random() * 10 });
  }
  update(dt) {
    if (this.gameOver) return;
    this.timer -= dt;
    if (this.timer <= 0) { this.gameOver = true; this.engine.triggerGameOver(this.score); return; }

    // Order timers
    for (let o of this.orders) {
      o.timer -= dt;
      if (o.timer <= 0) { this.combo = 0; this.engine.audio.play('fail'); }
    }
    this.orders = this.orders.filter(o => o.timer > 0);
    if (this.orders.length < 2) this.spawnOrder();

    const inp = this.engine.input;
    if (inp.mouse.clicked) {
      // Ingredient buttons
      for (let i = 0; i < this.ingredients.length; i++) {
        const bx = 20 + (i % 4) * 70, by = this.h - 100 + Math.floor(i / 4) * 40;
        if (Collision.pointInRect(inp.mouse.x, inp.mouse.y, { x: bx, y: by, w: 60, h: 32 })) {
          if (this.currentMix.length < 4) {
            this.currentMix.push(i);
            this.engine.audio.play('click');
          }
        }
      }
      // Serve button
      if (Collision.pointInRect(inp.mouse.x, inp.mouse.y, { x: this.w / 2 + 50, y: this.h - 55, w: 100, h: 36 })) {
        this.serveDish();
      }
      // Clear button
      if (Collision.pointInRect(inp.mouse.x, inp.mouse.y, { x: this.w / 2 - 50, y: this.h - 55, w: 80, h: 36 })) {
        this.currentMix = [];
        this.engine.audio.play('click');
      }
    }
  }
  serveDish() {
    const sorted = [...this.currentMix].sort();
    let matched = false;
    for (let i = 0; i < this.orders.length; i++) {
      const o = this.orders[i];
      if (sorted.length === o.recipe.items.length && sorted.every((v, idx) => v === o.recipe.items[idx])) {
        this.orders.splice(i, 1); matched = true;
        this.combo++; this.score += 500 * this.combo;
        this.engine.audio.play('success');
        this.engine.particles.emit(this.w / 2, this.h / 2, 12, '#FFD700');
        this.spawnOrder();
        break;
      }
    }
    if (!matched) { this.combo = 0; this.score = Math.max(0, this.score - 100); this.engine.audio.play('fail'); }
    this.currentMix = [];
  }
  render(ctx) {
    ctx.fillStyle = '#1A1008'; ctx.fillRect(0, 0, this.w, this.h);

    // Orders
    for (let i = 0; i < this.orders.length; i++) {
      const o = this.orders[i];
      const ox = 20 + i * (this.w - 40) / this.maxOrders, oy = 50;
      ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fillRect(ox, oy, (this.w - 60) / this.maxOrders, 120);
      ctx.strokeStyle = o.timer < 5 ? '#E74C3C' : '#E67E22'; ctx.strokeRect(ox, oy, (this.w - 60) / this.maxOrders, 120);
      ctx.font = 'bold 12px Inter'; ctx.fillStyle = '#ECF0F1'; ctx.textAlign = 'left';
      ctx.fillText(o.recipe.name, ox + 8, oy + 20);
      // Recipe items
      ctx.font = '20px sans-serif';
      o.recipe.items.forEach((item, j) => { ctx.fillText(this.ingredients[item], ox + 8 + j * 30, oy + 50); });
      // Timer bar
      this.engine.hud.drawBar(ctx, ox + 4, oy + 80, (this.w - 68) / this.maxOrders, 8, o.timer, 30, o.timer < 5 ? '#E74C3C' : '#E67E22');
      ctx.font = '9px Inter'; ctx.fillStyle = '#95A5A6';
      ctx.fillText(`${Math.ceil(o.timer)}s`, ox + 8, oy + 105);
    }

    // Current mix
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(this.w / 2 - 100, this.h - 150, 200, 40);
    ctx.font = '22px sans-serif'; ctx.textAlign = 'center';
    const mixStr = this.currentMix.map(i => this.ingredients[i]).join(' ');
    ctx.fillText(mixStr || '...', this.w / 2, this.h - 123);

    // Ingredient buttons
    for (let i = 0; i < this.ingredients.length; i++) {
      const bx = 20 + (i % 4) * 70, by = this.h - 100 + Math.floor(i / 4) * 40;
      ctx.fillStyle = 'rgba(230,126,34,0.2)'; ctx.fillRect(bx, by, 60, 32);
      ctx.strokeStyle = '#E67E22'; ctx.strokeRect(bx, by, 60, 32);
      ctx.font = '18px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(this.ingredients[i], bx + 30, by + 24);
    }

    // Serve + Clear buttons
    ctx.fillStyle = '#27AE60'; ctx.fillRect(this.w / 2 + 50, this.h - 55, 100, 36);
    ctx.font = 'bold 12px Inter'; ctx.fillStyle = '#FFF'; ctx.textAlign = 'center';
    ctx.fillText('SERVE', this.w / 2 + 100, this.h - 32);
    ctx.fillStyle = '#555'; ctx.fillRect(this.w / 2 - 50, this.h - 55, 80, 36);
    ctx.fillStyle = '#FFF'; ctx.fillText('CLEAR', this.w / 2 - 10, this.h - 32);

    // HUD
    ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(0, 0, this.w, 40);
    this.engine.hud.drawScore(ctx, this.score, this.w);
    this.engine.hud.drawText(ctx, `⏱️ ${Math.ceil(this.timer)}s`, this.w / 2, 10, 14, '#FFF', 'center');
    this.engine.hud.drawText(ctx, `Combo: x${this.combo}`, 14, 14, 12, this.combo >= 3 ? '#FFD700' : '#ECF0F1');
    ctx.textAlign = 'left';
  }
  destroy() {}
};

/* ═══════════════════════════════════════════════════════════════
   GAME 17: StellarSurf — Balance Sports
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[17] = class StellarSurf {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.score = 0; this.gameOver = false;
    this.player = { x: this.w / 2, y: this.h * 0.7, balance: 0, speed: 0 };
    this.stars = []; this.obstacles = [];
    this.scrollX = 0; this.waveY = 0; this.wavePhase = 0;
    this.inAir = false; this.trickTimer = 0; this.trickScore = 0;
    this.spawnTimer = 0; this.distance = 0;
  }
  update(dt) {
    if (this.gameOver) return;
    const inp = this.engine.input;
    this.player.speed = 200 + this.distance * 0.05;

    // Balance
    if (inp.isDown('ArrowLeft') || inp.isDown('a')) this.player.balance -= 2 * dt;
    if (inp.isDown('ArrowRight') || inp.isDown('d')) this.player.balance += 2 * dt;
    this.player.balance *= 0.96; // drag
    this.player.balance += (Math.random() - 0.5) * 0.3 * dt; // wave noise

    // Wave motion
    this.wavePhase += dt * 2;
    this.waveY = Math.sin(this.wavePhase) * 20;

    // Jump / trick
    if ((inp.isPressed(' ') || inp.isPressed('ArrowUp')) && !this.inAir) {
      this.inAir = true; this.trickTimer = 0; this.trickScore = 0;
      this.engine.audio.play('jump');
    }
    if (this.inAir) {
      this.trickTimer += dt;
      if (inp.isDown('ArrowLeft') || inp.isDown('a')) { this.trickScore += 100 * dt; }
      if (inp.isDown('ArrowRight') || inp.isDown('d')) { this.trickScore += 100 * dt; }
      if (this.trickTimer > 1.5) {
        this.inAir = false; this.score += Math.floor(this.trickScore);
        this.engine.audio.play('success');
      }
    }

    this.scrollX += this.player.speed * dt;
    this.distance += this.player.speed * dt * 0.01;
    this.player.x = Utils.clamp(this.w / 2 + this.player.balance * 100, 50, this.w - 50);

    // Spawn stars/obstacles
    this.spawnTimer += dt;
    if (this.spawnTimer > 0.5) {
      this.spawnTimer = 0;
      this.stars.push({ x: this.w + 20, y: Utils.rand(this.h * 0.3, this.h * 0.65) });
      if (Math.random() > 0.6) this.obstacles.push({ x: this.w + 20, y: this.h * 0.68, w: 20, h: 20 });
    }

    for (let s of this.stars) s.x -= this.player.speed * dt;
    for (let o of this.obstacles) o.x -= this.player.speed * dt;
    this.stars = this.stars.filter(s => s.x > -20);
    this.obstacles = this.obstacles.filter(o => o.x > -20);

    // Collect stars
    for (let s of this.stars) {
      if (Utils.dist(this.player.x, this.player.y + this.waveY, s.x, s.y) < 25) {
        s.x = -999; this.score += 100; this.engine.audio.play('collect');
      }
    }

    // Hit obstacles
    if (!this.inAir) {
      for (let o of this.obstacles) {
        if (Math.abs(this.player.x - o.x) < 25 && Math.abs(this.player.y + this.waveY - o.y) < 25) {
          this.gameOver = true; this.engine.audio.play('hit');
          this.engine.triggerGameOver(this.score); return;
        }
      }
    }

    // Fall off balance
    if (Math.abs(this.player.balance) > 1.5) {
      this.gameOver = true; this.engine.audio.play('hit');
      this.engine.triggerGameOver(this.score);
    }

    this.score += Math.floor(dt * 5);
  }
  render(ctx) {
    const grad = ctx.createLinearGradient(0, 0, 0, this.h);
    grad.addColorStop(0, '#0A0030'); grad.addColorStop(1, '#1A0060');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, this.w, this.h);

    // Wave
    ctx.fillStyle = 'rgba(155,89,182,0.3)';
    ctx.beginPath(); ctx.moveTo(0, this.h * 0.75);
    for (let x = 0; x <= this.w; x += 10) {
      const y = this.h * 0.72 + Math.sin((x + this.scrollX) * 0.02 + this.wavePhase) * 15;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(this.w, this.h); ctx.lineTo(0, this.h); ctx.fill();

    // Stars
    ctx.fillStyle = '#FFD700';
    for (let s of this.stars) { ctx.beginPath(); ctx.arc(s.x, s.y, 8, 0, Math.PI * 2); ctx.fill(); }

    // Obstacles
    ctx.fillStyle = '#E74C3C';
    for (let o of this.obstacles) ctx.fillRect(o.x - 10, o.y - 10, o.w, o.h);

    // Player
    const py = this.inAir ? this.player.y + this.waveY - 40 - this.trickTimer * 30 : this.player.y + this.waveY;
    ctx.fillStyle = '#00D4FF';
    ctx.beginPath(); ctx.arc(this.player.x, py, 14, 0, Math.PI * 2); ctx.fill();
    // Board
    ctx.fillStyle = '#FF6B9D'; ctx.fillRect(this.player.x - 18, py + 12, 36, 6);

    // Balance meter
    const bx = this.w / 2 - 80, by = this.h - 30;
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(bx, by, 160, 12);
    const bal = this.player.balance / 1.5;
    ctx.fillStyle = Math.abs(bal) > 0.7 ? '#E74C3C' : '#27AE60';
    ctx.fillRect(bx + 80 + bal * 70, by, 8, 12);

    // HUD
    this.engine.hud.drawScore(ctx, this.score, this.w);
    this.engine.hud.drawText(ctx, `DIST: ${Math.floor(this.distance)}m`, 14, 14, 12, '#E67E22');
    if (this.inAir) this.engine.hud.drawText(ctx, `TRICK! +${Math.floor(this.trickScore)}`, this.w / 2, 60, 16, '#FFD700', 'center');
  }
  destroy() {}
};

/* ═══════════════════════════════════════════════════════════════
   GAME 18: ChromaShift — Color Matching Arcade
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[18] = class ChromaShift {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.score = 0; this.gameOver = false; this.lives = 3;
    this.colors = ['#E74C3C', '#00D4FF', '#27AE60', '#F1C40F', '#9B59B6'];
    this.colorNames = ['Red', 'Blue', 'Green', 'Yellow', 'Purple'];
    this.numColors = 3; this.currentColor = 0;
    this.portals = []; this.streak = 0; this.spawnTimer = 0;
    this.portalSpeed = 120; this.level = 1;
  }
  update(dt) {
    if (this.gameOver) return;
    const inp = this.engine.input;

    // Cycle color
    if (inp.isPressed('ArrowLeft') || inp.isPressed('a')) {
      this.currentColor = (this.currentColor - 1 + this.numColors) % this.numColors;
      this.engine.audio.play('click');
    }
    if (inp.isPressed('ArrowRight') || inp.isPressed('d')) {
      this.currentColor = (this.currentColor + 1) % this.numColors;
      this.engine.audio.play('click');
    }
    // Direct keys
    for (let i = 0; i < this.numColors; i++) {
      if (inp.isPressed(String(i + 1))) { this.currentColor = i; this.engine.audio.play('click'); }
    }

    // Spawn portals
    this.spawnTimer += dt;
    if (this.spawnTimer > Math.max(0.6, 1.5 - this.level * 0.1)) {
      this.spawnTimer = 0;
      this.portals.push({
        x: Utils.rand(60, this.w - 60), y: -30, color: Utils.randInt(0, this.numColors - 1),
        size: 25, speed: this.portalSpeed
      });
    }

    for (let p of this.portals) p.y += p.speed * dt;

    // Check collision with player area
    const playerY = this.h - 60;
    for (let p of this.portals) {
      if (p.y >= playerY - 15 && p.y <= playerY + 15) {
        if (p.color === this.currentColor) {
          this.score += 200; this.streak++;
          this.score += Math.floor(this.streak / 10) * 50;
          this.engine.audio.play('beat');
          this.engine.particles.emit(p.x, playerY, 10, this.colors[p.color]);
        } else {
          this.lives--; this.streak = 0;
          this.engine.audio.play('fail');
          if (this.lives <= 0) { this.gameOver = true; this.engine.triggerGameOver(this.score); }
        }
        p.y = 9999;
      }
      if (p.y > this.h + 30) p.y = 9999;
    }
    this.portals = this.portals.filter(p => p.y < 9990);

    // Level up
    if (this.streak > 0 && this.streak % 20 === 0) {
      this.level++;
      this.portalSpeed += 15;
      if (this.level >= 3 && this.numColors < 5) this.numColors = Math.min(this.numColors + 1, 5);
    }
  }
  render(ctx) {
    ctx.fillStyle = '#0A0A18'; ctx.fillRect(0, 0, this.w, this.h);

    // Portals
    for (let p of this.portals) {
      ctx.strokeStyle = this.colors[p.color]; ctx.lineWidth = 3;
      ctx.shadowColor = this.colors[p.color]; ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.stroke();
      ctx.shadowBlur = 0; ctx.lineWidth = 1;
    }

    // Player probe
    const py = this.h - 60;
    ctx.fillStyle = this.colors[this.currentColor];
    ctx.shadowColor = this.colors[this.currentColor]; ctx.shadowBlur = 20;
    ctx.beginPath(); ctx.arc(this.w / 2, py, 22, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;

    // Match line
    ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.setLineDash([5, 5]);
    ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(this.w, py); ctx.stroke();
    ctx.setLineDash([]);

    // Color indicator
    for (let i = 0; i < this.numColors; i++) {
      const cx = this.w / 2 - (this.numColors * 25) / 2 + i * 25 + 12;
      ctx.fillStyle = i === this.currentColor ? this.colors[i] : this.colors[i] + '44';
      ctx.beginPath(); ctx.arc(cx, this.h - 18, 8, 0, Math.PI * 2); ctx.fill();
      ctx.font = '8px Inter'; ctx.fillStyle = '#95A5A6'; ctx.textAlign = 'center';
      ctx.fillText(String(i + 1), cx, this.h - 4);
    }

    // HUD
    this.engine.hud.drawLives(ctx, this.lives);
    this.engine.hud.drawScore(ctx, this.score, this.w);
    this.engine.hud.drawText(ctx, `Streak: ${this.streak}`, this.w / 2, 10, 14, this.streak >= 10 ? '#FFD700' : '#FFF', 'center');
    ctx.textAlign = 'left';
  }
  destroy() {}
};

/* ═══════════════════════════════════════════════════════════════
   GAME 19: FrostFortress — Resource Survival
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[19] = class FrostFortress {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.score = 0; this.gameOver = false; this.night = 1;
    this.heat = 80; this.food = 70; this.medicine = 60;
    this.survivors = 10; this.defenders = 3;
    this.nightTimer = 0; this.nightDuration = 15;
    this.creatures = []; this.message = 'Night 1 begins. Manage your resources!'; this.msgTimer = 3;
    this.actions = [
      { label: '🔥 Stoke Fire', effect: () => { this.heat = Math.min(100, this.heat + 15); } },
      { label: '🍖 Feed Camp', effect: () => { this.food = Math.max(0, this.food - 10); this.survivors = Math.min(10, this.survivors); } },
      { label: '💊 Heal Wounds', effect: () => { this.medicine = Math.max(0, this.medicine - 15); } },
      { label: '⚔️ Add Defender', effect: () => { if (this.defenders < this.survivors) this.defenders++; } },
      { label: '🏠 Fortify', effect: () => { this.defenders += 0; this.heat = Math.max(0, this.heat - 5); } }
    ];
    this.actionCooldown = 0;
  }
  update(dt) {
    if (this.gameOver) return;
    this.nightTimer += dt;
    this.actionCooldown = Math.max(0, this.actionCooldown - dt);
    if (this.msgTimer > 0) this.msgTimer -= dt;

    // Resource drain
    this.heat -= 3 * dt; this.food -= 2 * dt; this.medicine -= 1 * dt;

    // Creature attacks
    if (this.nightTimer > 5 && Math.random() < 0.02 * this.night) {
      const dmg = Math.max(0, Utils.randInt(5, 15) - this.defenders * 2);
      if (dmg > 0) {
        this.survivors = Math.max(0, this.survivors - (dmg > 10 ? 1 : 0));
        this.medicine -= dmg; this.message = `⚔️ Creature attack! Damage: ${dmg}`; this.msgTimer = 2;
        this.engine.audio.play('hit');
      } else {
        this.message = '🛡️ Defenders repelled the attack!'; this.msgTimer = 2;
      }
    }

    // Survivor death
    if (this.heat < 10) { this.survivors = Math.max(0, this.survivors - (Math.random() > 0.98 ? 1 : 0)); }
    if (this.food < 10) { this.survivors = Math.max(0, this.survivors - (Math.random() > 0.97 ? 1 : 0)); }
    this.defenders = Math.min(this.defenders, this.survivors);

    // Night end
    if (this.nightTimer >= this.nightDuration) {
      this.nightTimer = 0; this.score += 1000 + this.survivors * 100;
      this.night++;
      this.heat = Math.min(100, this.heat + 20); this.food = Math.min(100, this.food + 15);
      this.medicine = Math.min(100, this.medicine + 10);
      this.message = `Dawn! Night ${this.night} begins...`; this.msgTimer = 3;
      this.engine.audio.play('success');
    }

    if (this.survivors <= 0) { this.gameOver = true; this.engine.triggerGameOver(this.score); }

    const inp = this.engine.input;
    if (inp.mouse.clicked && this.actionCooldown <= 0) {
      for (let i = 0; i < this.actions.length; i++) {
        const bx = 20, by = this.h / 2 + 20 + i * 44;
        if (Collision.pointInRect(inp.mouse.x, inp.mouse.y, { x: bx, y: by, w: 170, h: 36 })) {
          this.actions[i].effect(); this.actionCooldown = 1.5;
          this.engine.audio.play('click'); break;
        }
      }
    }
  }
  render(ctx) {
    ctx.fillStyle = '#0A1628'; ctx.fillRect(0, 0, this.w, this.h);
    // Snow particles
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    for (let i = 0; i < 40; i++) {
      const x = (i * 47 + Date.now() * 0.01 * (i % 3 + 1)) % this.w;
      const y = (i * 31 + Date.now() * 0.02 * (i % 2 + 1)) % this.h;
      ctx.fillRect(x, y, 2, 2);
    }

    // Resource bars (right side)
    const bars = [
      { label: '🔥 Heat', val: this.heat, color: '#E74C3C' },
      { label: '🍖 Food', val: this.food, color: '#E67E22' },
      { label: '💊 Medicine', val: this.medicine, color: '#27AE60' }
    ];
    for (let i = 0; i < bars.length; i++) {
      const bx = this.w - 200, by = 70 + i * 40;
      ctx.font = '11px Inter'; ctx.fillStyle = '#ECF0F1'; ctx.textAlign = 'left';
      ctx.fillText(bars[i].label, bx, by);
      this.engine.hud.drawBar(ctx, bx, by + 6, 170, 14, bars[i].val, 100, bars[i].color);
      ctx.fillStyle = '#FFF'; ctx.textAlign = 'center'; ctx.font = '9px Inter';
      ctx.fillText(Math.floor(bars[i].val), bx + 85, by + 18);
    }

    // Survivors / Defenders
    ctx.font = '14px Inter'; ctx.fillStyle = '#ECF0F1'; ctx.textAlign = 'center';
    ctx.fillText(`👥 Survivors: ${this.survivors}  ⚔️ Defenders: ${this.defenders}`, this.w / 2, this.h / 2 - 10);

    // Night progress
    this.engine.hud.drawBar(ctx, this.w / 2 - 100, this.h / 2 + 4, 200, 8, this.nightTimer, this.nightDuration, '#1A1A3E');

    // Action buttons
    for (let i = 0; i < this.actions.length; i++) {
      const bx = 20, by = this.h / 2 + 20 + i * 44;
      ctx.fillStyle = this.actionCooldown > 0 ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.5)';
      ctx.fillRect(bx, by, 170, 36);
      ctx.strokeStyle = '#00D4FF'; ctx.strokeRect(bx, by, 170, 36);
      ctx.font = 'bold 11px Inter'; ctx.fillStyle = '#ECF0F1'; ctx.textAlign = 'center';
      ctx.fillText(this.actions[i].label, bx + 85, by + 22);
    }

    // HUD
    ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(0, 0, this.w, 40);
    this.engine.hud.drawText(ctx, `Night ${this.night}`, 14, 10, 14, '#00D4FF');
    this.engine.hud.drawScore(ctx, this.score, this.w);

    if (this.msgTimer > 0) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(0, 44, this.w, 22);
      ctx.font = '11px Inter'; ctx.fillStyle = '#F1C40F'; ctx.textAlign = 'center';
      ctx.fillText(this.message, this.w / 2, 59);
    }
    ctx.textAlign = 'left';
  }
  destroy() {}
};

/* ═══════════════════════════════════════════════════════════════
   GAME 20: MemoryMatrix — Sequence Memory
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[20] = class MemoryMatrix {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.score = 0; this.gameOver = false; this.lives = 3; this.level = 1;
    this.gridSize = 3; this.sequence = []; this.playerInput = [];
    this.phase = 'showing'; // showing, input
    this.showIdx = 0; this.showTimer = 0; this.flashDuration = 0.6;
    this.colors = ['#E74C3C','#00D4FF','#27AE60','#F1C40F','#9B59B6','#FF6B9D','#E67E22','#00B4A0','#FFD700'];
    this.activeCell = -1;
    this.generateSequence();
  }
  generateSequence() {
    this.sequence = [];
    const len = 2 + this.level;
    for (let i = 0; i < len; i++) this.sequence.push(Utils.randInt(0, this.gridSize * this.gridSize - 1));
    this.playerInput = []; this.phase = 'showing'; this.showIdx = 0; this.showTimer = 0;
  }
  update(dt) {
    if (this.gameOver) return;

    if (this.phase === 'showing') {
      this.showTimer += dt;
      if (this.showTimer < this.flashDuration) {
        this.activeCell = this.sequence[this.showIdx];
      } else if (this.showTimer < this.flashDuration + 0.3) {
        this.activeCell = -1;
      } else {
        this.showTimer = 0; this.showIdx++;
        if (this.showIdx >= this.sequence.length) {
          this.phase = 'input'; this.activeCell = -1;
        }
      }
    }

    if (this.phase === 'input') {
      const inp = this.engine.input;
      if (inp.mouse.clicked) {
        const cs = Math.min((this.w - 80) / this.gridSize, (this.h - 180) / this.gridSize);
        const ox = (this.w - cs * this.gridSize) / 2;
        const oy = (this.h - cs * this.gridSize) / 2;
        const col = Math.floor((inp.mouse.x - ox) / cs);
        const row = Math.floor((inp.mouse.y - oy) / cs);
        if (col >= 0 && col < this.gridSize && row >= 0 && row < this.gridSize) {
          const idx = row * this.gridSize + col;
          this.playerInput.push(idx);
          this.activeCell = idx; setTimeout(() => { this.activeCell = -1; }, 200);
          const ci = this.playerInput.length - 1;
          if (idx === this.sequence[ci]) {
            this.engine.audio.play('click');
            if (this.playerInput.length === this.sequence.length) {
              // Correct!
              this.score += this.sequence.length * 100;
              this.level++;
              if (this.level % 3 === 0 && this.gridSize < 5) this.gridSize++;
              this.engine.audio.play('success');
              setTimeout(() => this.generateSequence(), 500);
            }
          } else {
            this.lives--; this.engine.audio.play('fail');
            if (this.lives <= 0) { this.gameOver = true; this.engine.triggerGameOver(this.score); }
            else setTimeout(() => this.generateSequence(), 500);
          }
        }
      }
    }
  }
  render(ctx) {
    ctx.fillStyle = '#080820'; ctx.fillRect(0, 0, this.w, this.h);
    const cs = Math.min((this.w - 80) / this.gridSize, (this.h - 180) / this.gridSize);
    const ox = (this.w - cs * this.gridSize) / 2;
    const oy = (this.h - cs * this.gridSize) / 2;

    for (let i = 0; i < this.gridSize * this.gridSize; i++) {
      const r = Math.floor(i / this.gridSize), c = i % this.gridSize;
      const x = ox + c * cs, y = oy + r * cs;
      const isActive = i === this.activeCell;
      ctx.fillStyle = isActive ? this.colors[i % this.colors.length] : '#1A1A3E';
      ctx.fillRect(x + 3, y + 3, cs - 6, cs - 6);
      if (isActive) {
        ctx.shadowColor = this.colors[i % this.colors.length]; ctx.shadowBlur = 12;
        ctx.fillRect(x + 3, y + 3, cs - 6, cs - 6); ctx.shadowBlur = 0;
      }
      ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.strokeRect(x + 3, y + 3, cs - 6, cs - 6);
    }

    // Phase indicator
    ctx.font = 'bold 16px Orbitron'; ctx.fillStyle = '#FFF'; ctx.textAlign = 'center';
    ctx.fillText(this.phase === 'showing' ? 'WATCH...' : 'YOUR TURN!', this.w / 2, 40);

    // Progress dots
    const dotY = oy + this.gridSize * cs + 30;
    for (let i = 0; i < this.sequence.length; i++) {
      ctx.fillStyle = i < this.playerInput.length ? '#27AE60' : 'rgba(255,255,255,0.2)';
      ctx.beginPath(); ctx.arc(this.w / 2 - (this.sequence.length * 12) / 2 + i * 12 + 6, dotY, 4, 0, Math.PI * 2); ctx.fill();
    }

    // HUD
    this.engine.hud.drawLives(ctx, this.lives);
    this.engine.hud.drawScore(ctx, this.score, this.w);
    this.engine.hud.drawText(ctx, `Level ${this.level} • Seq: ${this.sequence.length}`, this.w / 2, this.h - 30, 11, '#95A5A6', 'center');
    ctx.textAlign = 'left';
  }
  destroy() {}
};

/* ═══════════════════════════════════════════════════════════════
   GAME 21: Sokobot — Push Puzzle
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[21] = class Sokobot {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.score = 0; this.level = 1; this.gameOver = false; this.moves = 0;
    this.levels = this.generateLevels();
    this.loadLevel();
  }
  generateLevels() {
    return [
      { w:5,h:5, walls:[[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[0,2],[0,3],[0,4],[4,1],[4,2],[4,3],[4,4],[1,4],[2,4],[3,4]], boxes:[[2,2]], targets:[[3,3]], player:[1,1] },
      { w:6,h:5, walls:[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[0,1],[0,2],[0,3],[0,4],[5,1],[5,2],[5,3],[5,4],[1,4],[2,4],[3,4],[4,4],[3,2]], boxes:[[2,2],[4,2]], targets:[[1,3],[4,3]], player:[1,1] },
      { w:7,h:6, walls:[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[0,1],[0,2],[0,3],[0,4],[0,5],[6,1],[6,2],[6,3],[6,4],[6,5],[1,5],[2,5],[3,5],[4,5],[5,5],[3,3]], boxes:[[2,2],[4,2],[3,4]], targets:[[5,1],[5,3],[5,4]], player:[1,1] }
    ];
  }
  loadLevel() {
    const lv = this.levels[Math.min(this.level - 1, this.levels.length - 1)];
    this.mapW = lv.w; this.mapH = lv.h;
    this.wallSet = new Set(lv.walls.map(([x,y]) => `${x},${y}`));
    this.boxes = lv.boxes.map(([x,y]) => ({x,y}));
    this.targets = lv.targets.map(([x,y]) => ({x,y}));
    this.player = {x: lv.player[0], y: lv.player[1]};
    this.moves = 0;
  }
  isBlocked(x, y) {
    if (x < 0 || x >= this.mapW || y < 0 || y >= this.mapH) return true;
    return this.wallSet.has(`${x},${y}`);
  }
  getBox(x, y) { return this.boxes.find(b => b.x === x && b.y === y); }
  update(dt) {
    if (this.gameOver) return;
    const inp = this.engine.input;
    let dx = 0, dy = 0;
    if (inp.isPressed('ArrowLeft') || inp.isPressed('a')) dx = -1;
    if (inp.isPressed('ArrowRight') || inp.isPressed('d')) dx = 1;
    if (inp.isPressed('ArrowUp') || inp.isPressed('w')) dy = -1;
    if (inp.isPressed('ArrowDown') || inp.isPressed('s')) dy = 1;
    if (inp.isPressed('r')) { this.loadLevel(); return; }

    if (dx !== 0 || dy !== 0) {
      const nx = this.player.x + dx, ny = this.player.y + dy;
      if (this.isBlocked(nx, ny)) return;
      const box = this.getBox(nx, ny);
      if (box) {
        const bx = nx + dx, by = ny + dy;
        if (this.isBlocked(bx, by) || this.getBox(bx, by)) return;
        box.x = bx; box.y = by;
        this.engine.audio.play('click');
      }
      this.player.x = nx; this.player.y = ny; this.moves++;

      // Check win
      if (this.targets.every(t => this.getBox(t.x, t.y))) {
        this.score += 300 * this.level + Math.max(0, (30 - this.moves) * 50);
        this.engine.audio.play('success');
        this.level++;
        if (this.level > this.levels.length) { this.gameOver = true; this.engine.triggerGameOver(this.score); }
        else setTimeout(() => this.loadLevel(), 600);
      }
    }
  }
  render(ctx) {
    ctx.fillStyle = '#12120E'; ctx.fillRect(0, 0, this.w, this.h);
    const cs = Math.min((this.w - 40) / this.mapW, (this.h - 100) / this.mapH);
    const ox = (this.w - cs * this.mapW) / 2, oy = 60;

    // Floor
    for (let y = 0; y < this.mapH; y++) {
      for (let x = 0; x < this.mapW; x++) {
        const px = ox + x * cs, py = oy + y * cs;
        if (this.wallSet.has(`${x},${y}`)) {
          ctx.fillStyle = '#3E3E3E'; ctx.fillRect(px, py, cs, cs);
        } else {
          ctx.fillStyle = '#1A1A14'; ctx.fillRect(px, py, cs, cs);
        }
        ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.strokeRect(px, py, cs, cs);
      }
    }

    // Targets
    ctx.fillStyle = 'rgba(0,212,255,0.3)';
    for (let t of this.targets) ctx.fillRect(ox + t.x * cs + cs * 0.2, oy + t.y * cs + cs * 0.2, cs * 0.6, cs * 0.6);

    // Boxes
    for (let b of this.boxes) {
      const onTarget = this.targets.some(t => t.x === b.x && t.y === b.y);
      ctx.fillStyle = onTarget ? '#27AE60' : '#E67E22';
      ctx.fillRect(ox + b.x * cs + 3, oy + b.y * cs + 3, cs - 6, cs - 6);
      ctx.strokeStyle = '#FFF'; ctx.strokeRect(ox + b.x * cs + 3, oy + b.y * cs + 3, cs - 6, cs - 6);
    }

    // Player
    ctx.fillStyle = '#00D4FF';
    ctx.beginPath();
    ctx.arc(ox + this.player.x * cs + cs / 2, oy + this.player.y * cs + cs / 2, cs * 0.35, 0, Math.PI * 2);
    ctx.fill();

    // HUD
    this.engine.hud.drawScore(ctx, this.score, this.w);
    this.engine.hud.drawText(ctx, `LEVEL ${this.level}`, this.w / 2, 12, 14, '#00D4FF', 'center');
    this.engine.hud.drawText(ctx, `Moves: ${this.moves} (R=restart)`, 14, 14, 11, '#95A5A6');
  }
  destroy() {}
};

/* ═══════════════════════════════════════════════════════════════
   GAME 22: AquaFlow — Pipe Connection Puzzle
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[22] = class AquaFlow {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.score = 0; this.level = 1; this.gameOver = false;
    this.gridSize = 5;
    this.generatePuzzle();
  }
  generatePuzzle() {
    this.gridSize = Math.min(5 + Math.floor(this.level / 3), 8);
    this.grid = Array(this.gridSize * this.gridSize).fill(0);
    // 0=empty, 1=horizontal, 2=vertical, 3=corner-TL, 4=corner-TR, 5=corner-BL, 6=corner-BR
    this.source = { x: 0, y: Math.floor(this.gridSize / 2) };
    this.target = { x: this.gridSize - 1, y: Math.floor(this.gridSize / 2) + (this.level > 2 ? 1 : 0) };
    this.grid[this.source.y * this.gridSize + this.source.x] = 7; // source
    this.grid[this.target.y * this.gridSize + this.target.x] = 8; // target
    this.connected = false;
  }
  checkConnection() {
    // Simple BFS from source
    const visited = new Set();
    const queue = [{ x: this.source.x, y: this.source.y }];
    visited.add(`${this.source.x},${this.source.y}`);
    while (queue.length > 0) {
      const { x, y } = queue.shift();
      if (x === this.target.x && y === this.target.y) { this.connected = true; return; }
      const cell = this.grid[y * this.gridSize + x];
      const neighbors = this.getConnections(x, y, cell);
      for (let [nx, ny] of neighbors) {
        const key = `${nx},${ny}`;
        if (nx >= 0 && nx < this.gridSize && ny >= 0 && ny < this.gridSize && !visited.has(key)) {
          const nc = this.grid[ny * this.gridSize + nx];
          if (nc > 0 && this.connects(x, y, cell, nx, ny, nc)) {
            visited.add(key); queue.push({ x: nx, y: ny });
          }
        }
      }
    }
    this.connected = false;
  }
  getConnections(x, y, cell) {
    const n = [];
    if (cell === 1 || cell === 7 || cell === 8 || cell === 3 || cell === 4) n.push([x + 1, y]);
    if (cell === 1 || cell === 7 || cell === 8 || cell === 5 || cell === 6) n.push([x - 1, y]);
    if (cell === 2 || cell === 3 || cell === 5) n.push([x, y + 1]);
    if (cell === 2 || cell === 4 || cell === 6) n.push([x, y - 1]);
    if (cell === 7 || cell === 8) { n.push([x+1,y],[x-1,y],[x,y+1],[x,y-1]); }
    return n;
  }
  connects(x1, y1, c1, x2, y2, c2) {
    // Check if c1 connects towards (x2,y2) and c2 connects back towards (x1,y1)
    return true; // simplified
  }
  update(dt) {
    if (this.gameOver) return;
    const inp = this.engine.input;
    if (inp.mouse.clicked) {
      const cs = Math.min((this.w - 60) / this.gridSize, (this.h - 140) / this.gridSize);
      const ox = (this.w - cs * this.gridSize) / 2, oy = 80;
      const col = Math.floor((inp.mouse.x - ox) / cs);
      const row = Math.floor((inp.mouse.y - oy) / cs);
      if (col >= 0 && col < this.gridSize && row >= 0 && row < this.gridSize) {
        const idx = row * this.gridSize + col;
        if (this.grid[idx] !== 7 && this.grid[idx] !== 8) {
          this.grid[idx] = (this.grid[idx] + 1) % 7;
          if (this.grid[idx] === 0) this.grid[idx] = 1;
          this.engine.audio.play('click');
          this.checkConnection();
          if (this.connected) {
            this.score += 1000 * this.level; this.level++;
            this.engine.audio.play('success');
            this.engine.particles.emit(this.w / 2, this.h / 2, 15, '#00D4FF');
            this.generatePuzzle();
          }
        }
      }
    }
  }
  render(ctx) {
    ctx.fillStyle = '#081828'; ctx.fillRect(0, 0, this.w, this.h);
    const cs = Math.min((this.w - 60) / this.gridSize, (this.h - 140) / this.gridSize);
    const ox = (this.w - cs * this.gridSize) / 2, oy = 80;

    for (let i = 0; i < this.gridSize * this.gridSize; i++) {
      const r = Math.floor(i / this.gridSize), c = i % this.gridSize;
      const x = ox + c * cs, y = oy + r * cs;
      ctx.fillStyle = 'rgba(0,100,150,0.1)'; ctx.fillRect(x + 1, y + 1, cs - 2, cs - 2);
      ctx.strokeStyle = 'rgba(0,180,255,0.15)'; ctx.strokeRect(x + 1, y + 1, cs - 2, cs - 2);

      const cell = this.grid[i]; const cx = x + cs / 2, cy = y + cs / 2;
      ctx.strokeStyle = '#00D4FF'; ctx.lineWidth = 4;
      if (cell === 1) { ctx.beginPath(); ctx.moveTo(x + 4, cy); ctx.lineTo(x + cs - 4, cy); ctx.stroke(); }
      else if (cell === 2) { ctx.beginPath(); ctx.moveTo(cx, y + 4); ctx.lineTo(cx, y + cs - 4); ctx.stroke(); }
      else if (cell === 3) { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x + cs - 4, cy); ctx.moveTo(cx, cy); ctx.lineTo(cx, y + cs - 4); ctx.stroke(); }
      else if (cell === 4) { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x + cs - 4, cy); ctx.moveTo(cx, cy); ctx.lineTo(cx, y + 4); ctx.stroke(); }
      else if (cell === 5) { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x + 4, cy); ctx.moveTo(cx, cy); ctx.lineTo(cx, y + cs - 4); ctx.stroke(); }
      else if (cell === 6) { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x + 4, cy); ctx.moveTo(cx, cy); ctx.lineTo(cx, y + 4); ctx.stroke(); }
      else if (cell === 7) { ctx.fillStyle = '#27AE60'; ctx.beginPath(); ctx.arc(cx, cy, cs * 0.3, 0, Math.PI * 2); ctx.fill(); }
      else if (cell === 8) { ctx.fillStyle = '#FFD700'; ctx.beginPath(); ctx.arc(cx, cy, cs * 0.3, 0, Math.PI * 2); ctx.fill(); }
      ctx.lineWidth = 1;
    }

    this.engine.hud.drawScore(ctx, this.score, this.w);
    this.engine.hud.drawText(ctx, `LEVEL ${this.level}`, this.w / 2, 12, 14, '#00D4FF', 'center');
    this.engine.hud.drawText(ctx, 'Click cells to place/rotate pipes', this.w / 2, 40, 10, '#95A5A6', 'center');
  }
  destroy() {}
};

/* ═══════════════════════════════════════════════════════════════
   GAME 23: SpeedScript — Typing Challenge
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[23] = class SpeedScript {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.score = 0; this.gameOver = false;
    this.snippets = [
      'let x = 42;','const name = "hello";','for (let i = 0; i < 10; i++)','function add(a, b) {','return a + b;',
      'console.log("test");','if (x > 0) {','while (true) {','const arr = [1, 2, 3];','arr.push(4);',
      'let sum = 0;','class Player {','this.score = 0;','Math.random();','document.getElementById("app");',
      'addEventListener("click");','JSON.stringify(data);','async function fetch() {','await response.json();',
      'export default App;'
    ];
    this.currentSnippet = ''; this.typed = ''; this.errors = 0;
    this.totalChars = 0; this.correctChars = 0;
    this.timer = 60; this.wpm = 0; this.startTime = Date.now();
    this.snippetIdx = 0; this.nextSnippet();
    this.charTimes = [];
  }
  nextSnippet() {
    this.currentSnippet = this.snippets[this.snippetIdx % this.snippets.length];
    this.snippetIdx++; this.typed = '';
  }
  update(dt) {
    if (this.gameOver) return;
    this.timer -= dt;
    if (this.timer <= 0) { this.gameOver = true; this.engine.triggerGameOver(this.score); return; }

    const inp = this.engine.input;
    // Listen to all key presses
    for (let key of Object.keys(inp.keys)) {
      if (inp.isPressed(key) && key.length === 1) {
        this.totalChars++;
        if (key === this.currentSnippet[this.typed.length]) {
          this.typed += key; this.correctChars++;
          this.engine.audio.play('click');
          if (this.typed === this.currentSnippet) {
            this.score += this.currentSnippet.length * 10;
            this.engine.audio.play('success');
            this.nextSnippet();
          }
        } else {
          this.errors++; this.engine.audio.play('fail');
        }
      }
    }
    if (inp.isPressed('Backspace') && this.typed.length > 0) {
      this.typed = this.typed.slice(0, -1);
    }

    // WPM calculation
    const elapsed = (Date.now() - this.startTime) / 60000;
    if (elapsed > 0) this.wpm = Math.floor((this.correctChars / 5) / elapsed);
  }
  render(ctx) {
    ctx.fillStyle = '#1E1E2E'; ctx.fillRect(0, 0, this.w, this.h);

    // Code display area
    ctx.fillStyle = '#0D0D1A'; ctx.fillRect(40, this.h / 2 - 60, this.w - 80, 80);
    ctx.strokeStyle = '#333'; ctx.strokeRect(40, this.h / 2 - 60, this.w - 80, 80);

    // Render snippet with typed highlighting
    const x = 55, y = this.h / 2 - 20;
    ctx.font = '20px Courier New, monospace'; ctx.textBaseline = 'middle';
    for (let i = 0; i < this.currentSnippet.length; i++) {
      const ch = this.currentSnippet[i];
      if (i < this.typed.length) ctx.fillStyle = '#27AE60'; // typed correct
      else if (i === this.typed.length) { ctx.fillStyle = '#FFD700'; } // cursor
      else ctx.fillStyle = '#555';
      ctx.fillText(ch, x + i * 12, y);
    }
    // Cursor blink
    if (Math.floor(Date.now() / 500) % 2 === 0) {
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(x + this.typed.length * 12, y - 12, 2, 24);
    }

    // Stats
    const accuracy = this.totalChars > 0 ? Math.floor(this.correctChars / this.totalChars * 100) : 100;
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(0, 0, this.w, 50);
    this.engine.hud.drawText(ctx, `WPM: ${this.wpm}`, 14, 14, 16, '#00D4FF');
    this.engine.hud.drawText(ctx, `Accuracy: ${accuracy}%`, this.w / 2 - 60, 14, 14, accuracy > 90 ? '#27AE60' : '#E74C3C');
    this.engine.hud.drawText(ctx, `⏱️ ${Math.ceil(this.timer)}s`, this.w - 100, 14, 14, '#FFF');
    this.engine.hud.drawScore(ctx, this.score, this.w);
    this.engine.hud.drawText(ctx, `Errors: ${this.errors}`, this.w / 2 + 80, 14, 12, '#E74C3C');

    // Instructions
    ctx.font = '11px Inter'; ctx.fillStyle = '#95A5A6'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillText('Type the code snippet exactly as shown!', this.w / 2, this.h / 2 + 40);
    ctx.textAlign = 'left';
  }
  destroy() {}
};

/* ═══════════════════════════════════════════════════════════════
   GAME 24: DungeonDice — Dice Combat Strategy
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[24] = class DungeonDice {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.score = 0; this.gameOver = false; this.floor = 1; this.room = 1;
    this.playerHP = 50; this.playerMaxHP = 50;
    this.dice = [0, 0, 0]; this.rolled = false;
    this.slots = { attack: null, defend: null, heal: null };
    this.enemy = this.spawnEnemy();
    this.phase = 'roll'; // roll, assign, resolve
    this.message = 'Roll your dice!'; this.msgTimer = 3;
    this.dragDie = -1;
  }
  spawnEnemy() {
    const names = ['Goblin', 'Skeleton', 'Orc', 'Troll', 'Dragon'];
    const hp = 15 + this.floor * 10;
    return { name: names[Math.min(this.floor - 1, 4)], hp, maxHp: hp, attack: 3 + this.floor * 2 };
  }
  update(dt) {
    if (this.gameOver) return;
    if (this.msgTimer > 0) this.msgTimer -= dt;
    const inp = this.engine.input;

    if (inp.mouse.clicked) {
      const mx = inp.mouse.x, my = inp.mouse.y;
      if (this.phase === 'roll') {
        // Roll button
        if (Collision.pointInRect(mx, my, { x: this.w / 2 - 60, y: this.h - 60, w: 120, h: 40 })) {
          this.dice = [Utils.randInt(1, 6), Utils.randInt(1, 6), Utils.randInt(1, 6)];
          this.rolled = true; this.phase = 'assign';
          this.slots = { attack: null, defend: null, heal: null };
          this.engine.audio.play('click');
          this.message = 'Click dice then click a slot!';
        }
      } else if (this.phase === 'assign') {
        // Click dice
        for (let i = 0; i < 3; i++) {
          const dx = this.w / 2 - 100 + i * 70, dy = this.h / 2 + 20;
          if (Collision.pointInRect(mx, my, { x: dx, y: dy, w: 50, h: 50 }) && !this.isDieAssigned(i)) {
            this.dragDie = i; this.engine.audio.play('click'); return;
          }
        }
        // Click slots
        const slotNames = ['attack', 'defend', 'heal'];
        for (let i = 0; i < 3; i++) {
          const sx = this.w / 2 - 130 + i * 100, sy = this.h / 2 + 90;
          if (Collision.pointInRect(mx, my, { x: sx, y: sy, w: 80, h: 40 }) && this.dragDie >= 0) {
            this.slots[slotNames[i]] = this.dice[this.dragDie];
            this.dragDie = -1;
            this.engine.audio.play('click');
            // Check if all assigned
            if (Object.values(this.slots).every(v => v !== null)) {
              this.phase = 'resolve'; this.resolve();
            }
          }
        }
      }
    }
  }
  isDieAssigned(idx) {
    const val = this.dice[idx];
    let used = 0;
    for (let s of Object.values(this.slots)) { if (s === val) used++; }
    const available = this.dice.filter((d, i) => d === val).length;
    return used >= available;
  }
  resolve() {
    const atk = this.slots.attack || 0;
    const def = this.slots.defend || 0;
    const heal = this.slots.heal || 0;
    // Player attacks
    this.enemy.hp -= atk * 3;
    this.engine.particles.emit(this.w * 0.7, this.h * 0.3, 10, '#E74C3C');
    // Enemy attacks
    const dmg = Math.max(0, this.enemy.attack - def * 2);
    this.playerHP -= dmg;
    // Heal
    this.playerHP = Math.min(this.playerMaxHP, this.playerHP + heal * 2);

    if (this.enemy.hp <= 0) {
      this.score += 500 * this.floor;
      this.room++;
      this.engine.audio.play('success');
      if (this.room > 3) { this.room = 1; this.floor++; }
      this.enemy = this.spawnEnemy();
      this.message = `Victory! Floor ${this.floor} Room ${this.room}`;
    } else {
      this.message = `Dealt ${atk * 3} dmg, took ${dmg}, healed ${heal * 2}`;
    }
    this.msgTimer = 3;

    if (this.playerHP <= 0) { this.gameOver = true; this.engine.triggerGameOver(this.score); return; }
    this.phase = 'roll'; this.rolled = false;
  }
  render(ctx) {
    ctx.fillStyle = '#120C08'; ctx.fillRect(0, 0, this.w, this.h);

    // Enemy
    ctx.font = '40px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(this.floor >= 5 ? '🐉' : this.floor >= 3 ? '👹' : '💀', this.w * 0.7, this.h * 0.25);
    ctx.font = 'bold 14px Inter'; ctx.fillStyle = '#ECF0F1';
    ctx.fillText(this.enemy.name, this.w * 0.7, this.h * 0.32);
    this.engine.hud.drawBar(ctx, this.w * 0.55, this.h * 0.34, 120, 10, this.enemy.hp, this.enemy.maxHp, '#E74C3C');

    // Player
    ctx.font = '34px sans-serif'; ctx.fillText('⚔️', this.w * 0.25, this.h * 0.25);
    ctx.font = 'bold 14px Inter'; ctx.fillStyle = '#ECF0F1';
    ctx.fillText('Hero', this.w * 0.25, this.h * 0.32);
    this.engine.hud.drawBar(ctx, this.w * 0.12, this.h * 0.34, 120, 10, this.playerHP, this.playerMaxHP, '#27AE60');

    // Dice
    for (let i = 0; i < 3; i++) {
      const dx = this.w / 2 - 100 + i * 70, dy = this.h / 2 + 20;
      ctx.fillStyle = this.dragDie === i ? '#FFD700' : '#1A1A3E';
      ctx.fillRect(dx, dy, 50, 50);
      ctx.strokeStyle = '#6C3FC9'; ctx.strokeRect(dx, dy, 50, 50);
      if (this.rolled) {
        ctx.font = 'bold 22px Orbitron'; ctx.fillStyle = '#FFF';
        ctx.fillText(String(this.dice[i]), dx + 25, dy + 32);
      }
    }

    // Slots
    const slotLabels = ['⚔️ ATK', '🛡️ DEF', '💚 HEAL'];
    const slotNames = ['attack', 'defend', 'heal'];
    for (let i = 0; i < 3; i++) {
      const sx = this.w / 2 - 130 + i * 100, sy = this.h / 2 + 90;
      ctx.fillStyle = this.slots[slotNames[i]] !== null ? 'rgba(39,174,96,0.3)' : 'rgba(0,0,0,0.3)';
      ctx.fillRect(sx, sy, 80, 40);
      ctx.strokeStyle = '#555'; ctx.strokeRect(sx, sy, 80, 40);
      ctx.font = '11px Inter'; ctx.fillStyle = '#ECF0F1';
      ctx.fillText(slotLabels[i], sx + 40, sy + 18);
      if (this.slots[slotNames[i]] !== null) {
        ctx.font = 'bold 14px Orbitron'; ctx.fillStyle = '#FFD700';
        ctx.fillText(String(this.slots[slotNames[i]]), sx + 40, sy + 35);
      }
    }

    // Roll / action button
    if (this.phase === 'roll') {
      ctx.fillStyle = '#6C3FC9';
      ctx.fillRect(this.w / 2 - 60, this.h - 60, 120, 40);
      ctx.font = 'bold 14px Inter'; ctx.fillStyle = '#FFF';
      ctx.fillText('🎲 ROLL', this.w / 2, this.h - 35);
    }

    // HUD
    ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(0, 0, this.w, 36);
    this.engine.hud.drawText(ctx, `Floor ${this.floor} Room ${this.room}`, 14, 8, 13, '#FFD700');
    this.engine.hud.drawScore(ctx, this.score, this.w);

    if (this.msgTimer > 0) {
      ctx.font = '11px Inter'; ctx.fillStyle = '#F1C40F'; ctx.textAlign = 'center';
      ctx.fillText(this.message, this.w / 2, this.h / 2);
    }
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
  }
  destroy() {}
};

/* ═══════════════════════════════════════════════════════════════
   GAME 25: NightMarket — Idle Market Stall
   ═══════════════════════════════════════════════════════════════ */
GameRegistry[25] = class NightMarket {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.gold = 0; this.totalGold = 0; this.gps = 0; this.gameOver = false;
    this.day = 1; this.dayTimer = 0;
    this.goods = [
      { name: 'Tea', cost: 10, gps: 1, count: 0, emoji: '🍵' },
      { name: 'Dumplings', cost: 50, gps: 5, count: 0, emoji: '🥟' },
      { name: 'Lanterns', cost: 200, gps: 20, count: 0, emoji: '🏮' },
      { name: 'Silk', cost: 1000, gps: 100, count: 0, emoji: '🧣' },
      { name: 'Fireworks', cost: 5000, gps: 500, count: 0, emoji: '🎆' }
    ];
    this.clickValue = 1; this.customers = [];
    this.customerTimer = 0;
    // Load
    const saved = engine.storage.load('nightmarket_state');
    if (saved) {
      this.gold = saved.gold || 0; this.totalGold = saved.totalGold || 0; this.day = saved.day || 1;
      saved.goods?.forEach((g, i) => { if (this.goods[i]) this.goods[i].count = g; });
      this.recalc();
    }
  }
  recalc() { this.gps = this.goods.reduce((s, g) => s + g.gps * g.count, 0); }
  update(dt) {
    this.gold += this.gps * dt; this.totalGold += this.gps * dt;
    this.dayTimer += dt;
    if (this.dayTimer > 10) { this.dayTimer = 0; this.day++; this.save(); }

    // Customers animation
    this.customerTimer += dt;
    if (this.customerTimer > 2) {
      this.customerTimer = 0;
      if (this.customers.length < 5 && this.gps > 0) {
        this.customers.push({ x: -20, y: this.h * 0.65 + Utils.rand(-20, 20), speed: 30 + Math.random() * 20 });
      }
    }
    for (let c of this.customers) c.x += c.speed * dt;
    this.customers = this.customers.filter(c => c.x < this.w + 20);

    const inp = this.engine.input;
    if (inp.mouse.clicked) {
      const mx = inp.mouse.x, my = inp.mouse.y;
      // Click stall
      if (Collision.pointInRect(mx, my, { x: this.w / 2 - 80, y: this.h * 0.3, w: 160, h: 120 })) {
        this.gold += this.clickValue; this.totalGold += this.clickValue;
        this.engine.audio.play('collect');
        this.engine.particles.emit(mx, my, 4, '#FFD700');
      }
      // Buy buttons
      for (let i = 0; i < this.goods.length; i++) {
        const bx = this.w - 210, by = 60 + i * 48;
        if (Collision.pointInRect(mx, my, { x: bx, y: by, w: 195, h: 40 })) {
          if (this.gold >= this.goods[i].cost) {
            this.gold -= this.goods[i].cost;
            this.goods[i].count++;
            this.goods[i].cost = Math.floor(this.goods[i].cost * 1.35);
            this.recalc();
            this.engine.audio.play('powerup');
            this.save();
          }
        }
      }
    }
  }
  save() {
    this.engine.storage.save('nightmarket_state', {
      gold: Math.floor(this.gold), totalGold: Math.floor(this.totalGold),
      day: this.day, goods: this.goods.map(g => g.count)
    });
    this.engine.storage.saveHighScore('nightmarket', Math.floor(this.totalGold));
  }
  render(ctx) {
    // Night sky gradient
    const grad = ctx.createLinearGradient(0, 0, 0, this.h);
    grad.addColorStop(0, '#0A0020'); grad.addColorStop(0.5, '#1A0A30'); grad.addColorStop(1, '#2A1A10');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, this.w, this.h);

    // Stars
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    for (let i = 0; i < 30; i++) ctx.fillRect((i * 67) % this.w, (i * 31) % (this.h * 0.4), 1.5, 1.5);

    // Stall
    ctx.fillStyle = '#8B4513'; ctx.fillRect(this.w / 2 - 80, this.h * 0.3, 160, 120);
    ctx.fillStyle = '#D2691E'; ctx.fillRect(this.w / 2 - 90, this.h * 0.28, 180, 20);
    ctx.font = 'bold 12px Inter'; ctx.fillStyle = '#FFD700'; ctx.textAlign = 'center';
    ctx.fillText('🏪 CLICK TO SELL', this.w / 2, this.h * 0.39);

    // Goods on stall
    let gx = this.w / 2 - 60;
    for (let g of this.goods) {
      if (g.count > 0) { ctx.font = '18px sans-serif'; ctx.fillText(g.emoji, gx, this.h * 0.44); gx += 28; }
    }

    // Customers
    ctx.font = '16px sans-serif';
    for (let c of this.customers) ctx.fillText('🚶', c.x, c.y);

    // Ground
    ctx.fillStyle = '#2A1A08'; ctx.fillRect(0, this.h * 0.72, this.w, this.h * 0.28);

    // Shop panel
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(this.w - 220, 50, 210, this.goods.length * 48 + 20);
    ctx.font = 'bold 12px Orbitron'; ctx.fillStyle = '#E67E22';
    ctx.fillText('UPGRADES', this.w - 115, 68);
    for (let i = 0; i < this.goods.length; i++) {
      const g = this.goods[i]; const bx = this.w - 210, by = 80 + i * 48;
      ctx.fillStyle = this.gold >= g.cost ? 'rgba(230,126,34,0.2)' : 'rgba(255,255,255,0.03)';
      ctx.fillRect(bx, by, 195, 40);
      ctx.strokeStyle = this.gold >= g.cost ? '#E67E22' : '#333'; ctx.strokeRect(bx, by, 195, 40);
      ctx.font = '15px sans-serif'; ctx.textAlign = 'left'; ctx.fillText(g.emoji, bx + 6, by + 27);
      ctx.font = 'bold 10px Inter'; ctx.fillStyle = '#ECF0F1'; ctx.fillText(g.name, bx + 28, by + 18);
      ctx.font = '9px Inter'; ctx.fillStyle = '#95A5A6'; ctx.fillText(`+${g.gps}/s | $${Math.floor(g.cost)}`, bx + 28, by + 33);
      ctx.textAlign = 'right'; ctx.fillStyle = '#555'; ctx.fillText(`x${g.count}`, bx + 188, by + 18);
    }

    // HUD
    ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(0, 0, this.w, 44);
    ctx.font = 'bold 16px Orbitron'; ctx.fillStyle = '#FFD700'; ctx.textAlign = 'left';
    ctx.fillText(`💰 ${Math.floor(this.gold)}`, 14, 28);
    ctx.font = '10px Inter'; ctx.fillStyle = '#95A5A6';
    ctx.fillText(`${this.gps.toFixed(1)}/s`, 14 + ctx.measureText(`💰 ${Math.floor(this.gold)}`).width + 10, 28);
    this.engine.hud.drawText(ctx, `Day ${this.day}`, this.w / 2, 10, 13, '#FFF', 'center');
    this.engine.hud.drawText(ctx, `Total: ${Math.floor(this.totalGold)}`, this.w - 14, 10, 11, '#FFF', 'right');
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
  }
  destroy() { this.save(); }
};

/* ═══════════════════════════════════════════════════════════════
   Placeholder for games 26-100 (coming soon)
   ═══════════════════════════════════════════════════════════════ */
// Games 26-100 will show a "Coming Soon" screen
class ComingSoon {
  init(canvas, ctx, engine) {
    this.w = canvas.width; this.h = canvas.height; this.engine = engine;
    this.gameData = null;
  }
  setGameData(data) { this.gameData = data; }
  update(dt) {}
  render(ctx) {
    ctx.fillStyle = '#0D0D1A'; ctx.fillRect(0, 0, this.w, this.h);
    ctx.font = '48px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(this.gameData?.emoji || '🎮', this.w / 2, this.h / 2 - 50);
    ctx.font = 'bold 24px Orbitron'; ctx.fillStyle = '#00D4FF';
    ctx.fillText(this.gameData?.title || 'Game', this.w / 2, this.h / 2 + 10);
    ctx.font = '14px Inter'; ctx.fillStyle = '#95A5A6';
    ctx.fillText('Coming Soon!', this.w / 2, this.h / 2 + 45);
    ctx.font = '11px Inter'; ctx.fillStyle = '#555';
    ctx.fillText(this.gameData?.desc || '', this.w / 2, this.h / 2 + 75);
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
  }
  destroy() {}
}
