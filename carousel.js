class CircularCarousel {
  constructor(root, items, opts = {}) {
    this.o = Object.assign({
      cardWidth: 220, aspectRatio: 1, speed: 14, gap: 25, tilt: -5, curve: 1, perspective: 2500,
      autoplay: "drift", interval: 3, direction: "left", momentum: 0.6, snap: true, pauseOnHover: true,
      focusOnClick: true, draggable: true, parallax: 0.3, stretch: 0.5, fadeColor: "#000000",
      depthFade: 0.55, innerShade: 0.6, cornerRadius: 12, intro: "rise", onFocus: null,
    }, opts);
    this.root = root;
    this.items = items;
    this.rot = 0;
    this.vel = 0;
    this.hover = false;
    this.dragging = false;
    this.resumeAt = 0;
    this.target = null;
    this.paused = false;
    this.build();
    this.bind();
    this.last = performance.now();
    requestAnimationFrame((t) => this.tick(t));
  }

  get step() { return 360 / this.items.length; }

  build() {
    const o = this.o;
    const w = innerWidth < 600 ? Math.round(o.cardWidth * 0.72) : o.cardWidth;
    this.w = w;
    this.radius = ((w + o.gap) * this.items.length) / (2 * Math.PI) * o.curve;
    this.root.classList.add("cc");
    this.root.style.perspective = o.perspective + "px";
    this.root.innerHTML = `<div class="cc__tilt" style="transform:rotateX(${o.tilt}deg)"><div class="cc__ring"></div></div>`;
    this.ring = this.root.querySelector(".cc__ring");
    this.cards = this.items.map((it, i) => {
      const el = document.createElement("figure");
      el.className = "cc__card";
      Object.assign(el.style, { width: w + "px", height: w / o.aspectRatio + "px", margin: `${-w / o.aspectRatio / 2}px 0 0 ${-w / 2}px`, borderRadius: o.cornerRadius + "px" });
      el.innerHTML = `<img src="${it.src}" alt="${it.alt || ""}" draggable="false" loading="lazy" /><i class="cc__fade" style="background:${o.fadeColor}"></i><i class="cc__shade"></i>`;
      el.dataset.i = i;
      this.ring.appendChild(el);
      return { el, img: el.querySelector("img"), fade: el.querySelector(".cc__fade"), shade: el.querySelector(".cc__shade"), base: i * this.step };
    });
    if (o.intro === "rise") this.rise();
  }

  rise() {
    this.cards.forEach((c) => c.el.classList.add("cc__card--pre"));
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      this.cards.forEach((c, i) => setTimeout(() => c.el.classList.remove("cc__card--pre"), i * 45));
    }, { threshold: 0.25 });
    io.observe(this.root);
  }

  bind() {
    const o = this.o;
    const degPerPx = 360 / (2 * Math.PI * this.radius);
    let lastX = 0, lastT = 0, moved = 0, downAt = 0;
    if (o.pauseOnHover) {
      this.root.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") this.hover = true; });
      this.root.addEventListener("pointerleave", () => { this.hover = false; });
    }
    if (o.draggable) {
      this.root.addEventListener("pointerdown", (e) => {
        this.dragging = true;
        this.target = null;
        this.vel = 0;
        moved = 0;
        downAt = performance.now();
        lastX = e.clientX;
        lastT = performance.now();
        try { this.root.setPointerCapture(e.pointerId); } catch {}
        this.root.classList.add("is-dragging");
      });
      this.root.addEventListener("pointermove", (e) => {
        if (!this.dragging) return;
        const now = performance.now();
        const dx = e.clientX - lastX;
        moved += Math.abs(dx);
        this.rot += dx * degPerPx;
        this.vel = (dx * degPerPx) / Math.max(1, now - lastT) * 1000;
        lastX = e.clientX;
        lastT = now;
      });
      const end = (e) => {
        if (!this.dragging) return;
        this.dragging = false;
        this.root.classList.remove("is-dragging");
        this.resumeAt = performance.now() + o.interval * 1000;
        if (moved < 6 && performance.now() - downAt < 400) {
          if (this.paused) {
            this.paused = false;
            this.resumeAt = 0;
          } else {
            const card = document.elementFromPoint(e.clientX, e.clientY)?.closest(".cc__card");
            if (card && o.focusOnClick) this.focus(+card.dataset.i);
            this.paused = true;
          }
          this.root.classList.toggle("is-paused", this.paused);
        }
      };
      this.root.addEventListener("pointerup", end);
      this.root.addEventListener("pointercancel", () => {
        this.dragging = false;
        this.root.classList.remove("is-dragging");
      });
    }
  }

  nudge(deg) {
    if (this.dragging || this.paused || !deg) return;
    this.target = null;
    this.rot += deg;
  }

  focus(i) {
    const want = -this.cards[i].base;
    const diff = ((want - this.rot) % 360 + 540) % 360 - 180;
    this.target = this.rot + diff;
    this.vel = 0;
    this.resumeAt = performance.now() + this.o.interval * 1000;
    this.o.onFocus && this.o.onFocus(this.items[i], i);
  }

  tick(now) {
    const o = this.o;
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    if (!this.dragging) {
      if (this.target !== null) {
        this.rot += (this.target - this.rot) * Math.min(1, dt * 7);
        if (Math.abs(this.target - this.rot) < 0.02) { this.rot = this.target; this.target = null; }
      } else if (Math.abs(this.vel) > 2) {
        this.rot += this.vel * dt;
        this.vel *= Math.pow(1 - (1 - o.momentum) * 0.9, dt * 10);
        if (Math.abs(this.vel) <= 2 && o.snap) this.target = Math.round(this.rot / this.step) * this.step;
      } else if (o.autoplay === "drift" && !this.paused && !this.hover && now > this.resumeAt) {
        this.rot += (o.direction === "left" ? -1 : 1) * o.speed * dt;
      }
    }
    this.render();
    requestAnimationFrame((t) => this.tick(t));
  }

  render() {
    const o = this.o;
    this.ring.style.transform = `translateZ(${-this.radius}px) rotateY(${this.rot}deg)`;
    this.cards.forEach((c) => {
      const a = ((c.base + this.rot) % 360 + 360) % 360;
      const rad = (a * Math.PI) / 180;
      const facing = Math.cos(rad);
      const side = Math.sin(rad);
      const sx = 1 + o.stretch * 0.25 * Math.abs(side);
      c.el.style.transform = `rotateY(${c.base}deg) translateZ(${this.radius}px) scaleX(${sx})`;
      c.img.style.transform = `translateX(${-side * o.parallax * 50}%) scale(${1 + o.parallax})`;
      c.fade.style.opacity = ((1 - facing) / 2) * o.depthFade;
      c.shade.style.opacity = facing < 0 ? -facing * o.innerShade : 0;
      c.el.style.zIndex = Math.round(facing * 100) + 100;
    });
  }
}
