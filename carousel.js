class PaintedWheel {
  constructor(root, items, opts = {}) {
    this.o = Object.assign({ speed: -3.6, tilt: -7, drag: 0.25, ratio: 4 / 3, onPick: null }, opts);
    this.root = root;
    this.items = items;
    this.base = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : this.o.speed;
    this.ang = 0;
    this.vel = this.base;
    this.drag = null;
    this.held = false;
    this.visible = true;
    this.build();
    this.layout();
    this.bind();
    this.last = performance.now();
    requestAnimationFrame((t) => this.tick(t));
  }

  build() {
    this.root.classList.add("pw");
    this.root.innerHTML = `<div class="pw__ring"></div>`;
    this.ring = this.root.firstElementChild;
    this.figs = this.items.map((it, i) => {
      const f = document.createElement("figure");
      f.className = "pw__card";
      f.dataset.i = i;
      f.innerHTML = `<img src="${it.src}" alt="${it.alt}" draggable="false" decoding="async" loading="lazy" /><figcaption>${it.alt}</figcaption>`;
      this.ring.appendChild(f);
      return { f, cap: f.lastElementChild };
    });
  }

  layout() {
    const n = this.items.length;
    const cw = innerWidth < 600 ? Math.round(innerWidth * 0.34) : Math.max(150, Math.min(310, innerWidth * 0.21));
    this.root.style.setProperty("--cw", cw + "px");
    this.root.style.setProperty("--ch", cw * this.o.ratio + "px");
    this.R = Math.round(cw / 2 / Math.tan(Math.PI / n) + cw * 0.35);
    this.figs.forEach(({ f }, i) => { f.style.transform = `rotateY(${(i * 360) / n}deg) translateZ(${this.R}px)`; });
  }

  bind() {
    const r = this.root;
    let moved = 0;
    let lastT = 0;
    new IntersectionObserver(([e]) => { this.visible = e.isIntersecting; }).observe(r);
    addEventListener("resize", () => this.layout());
    r.addEventListener("wheel", (e) => {
      const dx = e.deltaX || (e.shiftKey ? e.deltaY : 0);
      if (!dx || (!e.shiftKey && Math.abs(dx) < Math.abs(e.deltaY))) return;
      e.preventDefault();
      this.ang -= dx * 0.12;
      this.vel = -dx * 3.6;
    }, { passive: false });
    r.addEventListener("pointerdown", (e) => {
      this.drag = { x: e.clientX, a: this.ang };
      moved = 0;
      lastT = performance.now();
      try { r.setPointerCapture(e.pointerId); } catch {}
      r.classList.add("is-dragging");
    });
    r.addEventListener("pointermove", (e) => {
      if (!this.drag) return;
      const now = performance.now();
      const dx = e.clientX - this.drag.x;
      moved = Math.max(moved, Math.abs(dx));
      const na = this.drag.a + dx * this.o.drag;
      this.vel = Math.max(-400, Math.min(400, ((na - this.ang) / Math.max(8, now - lastT)) * 1000));
      this.ang = na;
      lastT = now;
    });
    const end = (e) => {
      const d = this.drag;
      this.drag = null;
      r.classList.remove("is-dragging");
      if (performance.now() - lastT > 120) this.vel = this.base;
      if (!d || moved >= 6 || e.type === "pointercancel") return;
      const f = document.elementFromPoint(e.clientX, e.clientY)?.closest(".pw__card");
      if (f && this.o.onPick) this.o.onPick(this.items[+f.dataset.i], f);
    };
    r.addEventListener("pointerup", end);
    r.addEventListener("pointercancel", end);
  }

  draw() {
    const n = this.items.length;
    this.ring.style.transform = `translateZ(${-this.R}px) rotateX(${this.o.tilt}deg) rotateY(${this.ang}deg)`;
    this.figs.forEach(({ f, cap }, i) => {
      const c = Math.cos((((i * 360) / n + this.ang) * Math.PI) / 180);
      f.style.opacity = (c >= 0 ? 0.55 + 0.45 * c : 0.55 + 0.2 * c).toFixed(2);
      f.style.zIndex = Math.round(c * 100) + 100;
      cap.style.opacity = c > 0.2 ? 1 : 0;
    });
  }

  tick(now) {
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    if (this.visible) {
      if (!this.drag && !this.held) {
        this.ang += this.vel * dt;
        this.vel += (this.base - this.vel) * Math.min(1, dt * 1.2);
      }
      this.draw();
    }
    requestAnimationFrame((t) => this.tick(t));
  }
}
