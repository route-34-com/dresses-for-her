const LOOKS = ["maroon", "manjal", "cottoncandy", "rasagulla", "vaanam", "lavender", "comfy", "organza", "vintage",
  "hakoba", "silkmaxi", "oviyam", "banarasi", "chennur"];
const FEEL = ["maroon", "rasagulla", "vaanam", "lavender", "vintage", "silkmaxi"];
const WALL_REELS = ["floralmaxi", "organza", "rasagulla", "banarasi", "cottoncandy", "hakoba"];
const DROP = PRODUCTS.filter((p) => !p.sold);

const hasGSAP = typeof window.gsap !== "undefined";
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const animate = hasGSAP && !reduce;

function splitChars(el) {
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === 1) return walk(child);
      if (child.nodeType !== 3) return;
      const frag = document.createDocumentFragment();
      child.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) return frag.appendChild(document.createTextNode(" "));
        const w = document.createElement("span");
        w.className = "word";
        [...part].forEach((ch) => {
          const c = document.createElement("span");
          c.className = "char";
          c.textContent = ch;
          w.appendChild(c);
        });
        frag.appendChild(w);
      });
      child.replaceWith(frag);
    });
  };
  walk(el);
  return $$(".char", el);
}

$("#grid").innerHTML = DROP.map(cardHTML).join("");
$("#dropCount").textContent = `${DROP.length} pieces available now · ${PRODUCTS.length - DROP.length} more in the archive`;

const lookWheel = new PaintedWheel($("#lookCarousel"), LOOKS.map((id) => ({ id, src: `${IMG}c/${id}-1.jpg`, alt: byIdName(id) })), {
  onPick: (it, fig) => {
    lookWheel.held = true;
    openQuick(it.id, fig);
  },
});

const feelRow = $("#feelRow");
feelRow.innerHTML = FEEL.map((id, i) => `
  <button class="feel__panel${i ? "" : " is-open"}" type="button" data-id="${id}" aria-expanded="${!i}" aria-label="${byIdName(id)}">
    <img src="${IMG}feel/${id}.jpg" alt="" draggable="false" loading="lazy" />
    <span class="feel__label">${byIdName(id)}<small>View the set</small></span>
  </button>`).join("");
const feelOpen = (panel) => $$(".feel__panel", feelRow).forEach((p) => {
  p.classList.toggle("is-open", p === panel);
  p.setAttribute("aria-expanded", p === panel);
});
feelRow.addEventListener("pointerover", (e) => {
  const p = e.target.closest(".feel__panel");
  if (p && e.pointerType === "mouse") feelOpen(p);
});
feelRow.addEventListener("focusin", (e) => feelOpen(e.target.closest(".feel__panel")));
feelRow.addEventListener("click", (e) => {
  const p = e.target.closest(".feel__panel");
  if (!p) return;
  if (!p.classList.contains("is-open")) return feelOpen(p);
  openQuick(p.dataset.id, p);
});

const wall = $("#wall");
const wallPics = PRODUCTS.flatMap((p) => p.imgs.slice(0, p.sold ? 1 : 2).map((src) => ({ src, id: p.id })));
let wallCols = 0;
let wallVideoIO = null;

function wallTile(t, hidden) {
  const tab = hidden ? ' tabindex="-1"' : "";
  const media = t.reel
    ? `<video src="${VID + t.reel}.mp4" poster="${VID + t.reel}.jpg" muted loop playsinline preload="none"></video><span class="wall__badge">▶ Reel</span>`
    : `<img src="${cardSrc(t.src)}" alt="${hidden ? "" : esc(byIdName(t.id))}" loading="lazy" draggable="false" />`;
  return `<button class="wall__tile${t.reel ? " wall__tile--reel" : ""}" type="button" data-id="${t.id}"${tab}>${media}<span class="wall__name">${esc(byIdName(t.id))}</span></button>`;
}

function buildWall() {
  const n = innerWidth < 640 ? 3 : innerWidth < 1024 ? 4 : 6;
  if (n === wallCols) return;
  wallCols = n;
  const cols = Array.from({ length: n }, () => []);
  wallPics.forEach((t, i) => cols[i % n].push(t));
  WALL_REELS.forEach((id, i) => cols[i % n].splice(1 + (i % 3), 0, { reel: byId(id).video, id }));
  wall.innerHTML = cols.map((c, i) => `
    <div class="wall__col" style="--dur:${48 + ((i * 13) % 26)}s">
      <div class="wall__track${i % 2 ? " is-down" : ""}">
        <div class="wall__set">${c.map((t) => wallTile(t, false)).join("")}</div>
        <div class="wall__set" aria-hidden="true">${c.map((t) => wallTile(t, true)).join("")}</div>
      </div>
    </div>`).join("");
  if (wallVideoIO) wallVideoIO.disconnect();
  wallVideoIO = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting && !reduce) e.target.play().catch(() => {});
    else e.target.pause();
  }), { threshold: 0.15 });
  $$("video", wall).forEach((v) => wallVideoIO.observe(v));
}

buildWall();
addEventListener("resize", buildWall);
new IntersectionObserver(([e]) => wall.classList.toggle("is-live", e.isIntersecting)).observe(wall);
wall.addEventListener("click", (e) => {
  const t = e.target.closest("button.wall__tile");
  if (t) openQuick(t.dataset.id, t);
});

$("#grid").addEventListener("click", (e) => {
  const f = e.target.closest("[data-fav]");
  if (f) {
    const on = favs.toggle(f.dataset.fav);
    f.setAttribute("aria-pressed", on);
    return toast(on ? "Saved to favourites" : "Removed from favourites");
  }
  const m = e.target.closest(".card__media");
  if (m) openQuick(m.closest(".card").dataset.id, m);
});

let lenis = null;
const pauseScroll = () => lenis && lenis.stop();
const resumeScroll = () => lenis && lenis.start();

const qv = $("#qv");
const qvMedia = $("#qvMedia");
let qvState = null;

function openQuick(id, from) {
  const p = byId(id);
  qvState = { id, from, morph: from.classList.contains("card__media") };
  $("#qvFav").setAttribute("aria-pressed", favs.has(id));
  qvMedia.innerHTML = "";
  showMedia(qvMedia, p);
  qvMedia.dataset.flipId = from.dataset.flipId || "";
  $("#qvCat").textContent = tagOf(p) ? `${CAT_LABEL[p.cat]} · ${tagOf(p)}` : CAT_LABEL[p.cat];
  $("#qvName").textContent = p.name;
  $("#qvThumbs").innerHTML = thumbsHTML(p);
  $("#qvBody").innerHTML = detailsHTML(p);
  $("#qvAdd").hidden = !!p.sold;
  $("#qvAsk").hidden = !p.sold;
  pauseScroll();
  qv.setAttribute("aria-hidden", "false");

  if (!animate) {
    qv.classList.add("is-open", "is-static");
    return;
  }
  const state = Flip.getState(from);
  qv.classList.add("is-open");
  from.style.visibility = "hidden";
  gsap.timeline()
    .to(".qv__bg", { opacity: 1, duration: 0.6 }, 0)
    .add(Flip.from(state, { targets: qvMedia, duration: 1, ease: "expo.inOut", zIndex: 300 }), 0)
    .from(".qv__panel", { backgroundColor: "rgba(246,240,232,0)", duration: 0.5 }, 0.45)
    .from(".qv__info > *", { y: 40, opacity: 0, duration: 0.8, stagger: 0.05, ease: "expo.out" }, 0.55);
}

function closeQuick() {
  if (!qvState) return;
  const { from, morph } = qvState;
  qvState = null;
  const done = () => {
    qv.classList.remove("is-open", "is-static");
    qv.setAttribute("aria-hidden", "true");
    qvMedia.innerHTML = "";
    from.style.visibility = "";
    lookWheel.held = false;
    if (hasGSAP) gsap.set([".qv__info > *", ".qv__panel", qvMedia], { clearProps: "all" });
    resumeScroll();
  };
  if (!animate) return done();
  if (!morph) {
    from.style.visibility = "";
    return gsap.timeline({ onComplete: done })
      .to(".qv__info > *", { opacity: 0, y: 20, duration: 0.3, stagger: 0.02 }, 0)
      .to([qvMedia, ".qv__panel"], { opacity: 0, scale: 0.96, duration: 0.5, ease: "power2.in" }, 0.1)
      .to(".qv__bg", { opacity: 0, duration: 0.6 }, 0.2);
  }
  const state = Flip.getState(qvMedia);
  gsap.timeline({ onComplete: done })
    .to(".qv__info > *", { opacity: 0, y: 20, duration: 0.3, stagger: 0.02 }, 0)
    .to(".qv__panel", { backgroundColor: "rgba(246,240,232,0)", duration: 0.3 }, 0.1)
    .to(".qv__bg", { opacity: 0, duration: 0.7 }, 0.2)
    .add(() => {
      from.style.visibility = "";
      qvMedia.style.visibility = "hidden";
      Flip.from(state, { targets: from, duration: 0.9, ease: "expo.inOut", zIndex: 300 });
    }, 0.2)
    .to({}, { duration: 0.9 }, 0.2);
}

$$("[data-qv-close]").forEach((el) => el.addEventListener("click", closeQuick));
$("#qvFav").addEventListener("click", (e) => {
  if (!qvState) return;
  const on = favs.toggle(qvState.id);
  e.currentTarget.setAttribute("aria-pressed", on);
  $$(`[data-fav="${qvState.id}"]`).forEach((b) => b.setAttribute("aria-pressed", on));
  toast(on ? "Saved to favourites" : "Removed from favourites");
});
syncFavCount();
bindThumbs($("#qvThumbs"), qvMedia, () => qvState && byId(qvState.id));

$("#qvAsk").addEventListener("click", () => {
  if (!qvState) return;
  const p = byId(qvState.id);
  enquireOnInstagram(`Hi Wardrobe by She! The ${p.name} is sold out — will it be restocked?\nMy size: `, toast);
});

$("#qvAdd").addEventListener("click", () => {
  if (!qvState) return;
  const { id } = qvState;
  flyToBag(qvMedia, byId(id).imgs[0], () => addToBag(id));
  setTimeout(closeQuick, 250);
});

const store = {
  get() { try { return JSON.parse(localStorage.getItem("wbs-bag")) || []; } catch { return []; } },
  set(v) { try { localStorage.setItem("wbs-bag", JSON.stringify(v)); } catch {} },
};
let bagItems = store.get().filter((i) => byId(i.id));
const bag = $("#bag");

function renderBag() {
  $("#bagCount").textContent = bagItems.reduce((n, i) => n + i.qty, 0);
  $("#bagItems").innerHTML = bagItems.length
    ? bagItems.map((i, k) => {
        const p = byId(i.id);
        return `<li class="line">
          <img src="${IMG + p.imgs[0].replace("p/", "c/")}" alt="" />
          <div><p class="line__name">${p.name}</p><p class="line__meta">${CAT_LABEL[p.cat]}</p>
            <div class="line__qty"><button data-dec="${k}" aria-label="Decrease">−</button>${i.qty}<button data-inc="${k}" aria-label="Increase">+</button></div></div>
          </li>`;
      }).join("")
    : `<li class="bag__empty">Your bag is empty —<br/>go find your twirl.</li>`;
  store.set(bagItems);
}

function addToBag(id) {
  const hit = bagItems.find((i) => i.id === id);
  hit ? hit.qty++ : bagItems.push({ id, qty: 1 });
  renderBag();
  const b = $("#bagCount");
  b.classList.remove("bump");
  void b.offsetWidth;
  b.classList.add("bump");
  toast(`${byId(id).name} added to bag`);
}

function flyToBag(fromEl, img, done) {
  if (!animate) return done();
  const r = fromEl.getBoundingClientRect();
  const t = $("#bagBtn").getBoundingClientRect();
  const f = document.createElement("div");
  f.className = "flyer";
  f.innerHTML = `<img src="${IMG + img}" alt="" />`;
  Object.assign(f.style, { left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px" });
  document.body.appendChild(f);
  gsap.to(f, {
    x: t.left + t.width / 2 - (r.left + r.width / 2),
    y: t.top + t.height / 2 - (r.top + r.height / 2),
    scale: 0.05, borderRadius: 400, duration: 1, ease: "expo.inOut",
    onComplete: () => { f.remove(); done(); },
  });
}

$("#bagItems").addEventListener("click", (e) => {
  const inc = e.target.closest("[data-inc]");
  const dec = e.target.closest("[data-dec]");
  if (inc) bagItems[+inc.dataset.inc].qty++;
  if (dec && --bagItems[+dec.dataset.dec].qty <= 0) bagItems.splice(+dec.dataset.dec, 1);
  if (inc || dec) renderBag();
});

const openBag = () => { bag.classList.add("is-open"); bag.setAttribute("aria-hidden", "false"); pauseScroll(); };
const closeBag = () => { bag.classList.remove("is-open"); bag.setAttribute("aria-hidden", "true"); resumeScroll(); };
$("#bagBtn").addEventListener("click", openBag);
$$("[data-bag-close]").forEach((el) => el.addEventListener("click", closeBag));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeBag(); closeQuick(); } });

$("#sendOrder").addEventListener("click", async () => {
  if (!bagItems.length) return toast("Your bag is empty");
  const lines = bagItems.map((i) => `• ${byId(i.id).name} × ${i.qty}`);
  enquireOnInstagram(`Hi Wardrobe by She! I'd like to order:\n${lines.join("\n")}\n\nCould you share the price and available sizes?\nMy size: `, toast);
});

let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("is-show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("is-show"), 2400);
}

const pill = $("#pill");
const movePill = (b) => {
  pill.style.width = b.offsetWidth + "px";
  pill.style.height = b.offsetHeight + "px";
  pill.style.transform = `translate(${b.offsetLeft}px, ${b.offsetTop}px)`;
};
$("#filters").addEventListener("click", (e) => {
  const b = e.target.closest(".filter");
  if (!b) return;
  const f = b.dataset.filter;
  $$(".filter").forEach((x) => x.classList.toggle("is-active", x === b));
  movePill(b);
  const cards = $$(".card");
  const show = (c) => f === "all" || c.dataset.cat === f;
  const apply = () => cards.forEach((c) => c.classList.toggle("is-hidden", !show(c)));
  if (!animate) return apply();
  const grid = $("#grid");
  const leaving = cards.filter((c) => !c.classList.contains("is-hidden") && !show(c));
  filterTl && filterTl.progress(1);
  filterTl = gsap.timeline();
  if (leaving.length) filterTl.to(leaving, { opacity: 0, y: 20, duration: 0.3, ease: "power2.in" });
  filterTl.add(() => {
      const h0 = grid.offsetHeight;
      const state = Flip.getState(cards.filter((c) => !c.classList.contains("is-hidden")));
      apply();
      if (leaving.length) gsap.set(leaving, { clearProps: "opacity,transform" });
      const h1 = grid.offsetHeight;
      Flip.from(state, {
        duration: 0.7, ease: "power3.inOut",
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power3.out" }),
      });
      gsap.fromTo(grid, { height: h0, overflow: "hidden" }, {
        height: h1, duration: 0.7, ease: "power3.inOut",
        onComplete: () => { gsap.set(grid, { clearProps: "height,overflow" }); ScrollTrigger.refresh(); },
      });
    });
});
let filterTl = null;
movePill($(".filter.is-active"));
document.fonts && document.fonts.ready.then(() => movePill($(".filter.is-active")));
addEventListener("resize", () => movePill($(".filter.is-active")));
renderBag();

function smoothLoop(slot, fade = 1.1) {
  const a = $("video", slot);
  a.removeAttribute("loop");
  a.removeAttribute("autoplay");
  const b = a.cloneNode();
  b.preload = "auto";
  b.classList.add("is-back");
  slot.appendChild(b);
  let cur = a;
  let nxt = b;
  let on = false;
  let running = false;
  const step = () => {
    if (!on) { running = false; return; }
    if (cur.duration && cur.currentTime >= cur.duration - fade && nxt.paused) {
      nxt.currentTime = 0;
      nxt.play().catch(() => {});
      nxt.classList.remove("is-back");
      cur.classList.add("is-back");
      [cur, nxt] = [nxt, cur];
    }
    requestAnimationFrame(step);
  };
  new IntersectionObserver(([e]) => {
    on = e.isIntersecting;
    if (!on) return [a, b].forEach((v) => v.pause());
    cur.play().catch(() => {});
    if (!running) { running = true; requestAnimationFrame(step); }
  }, { threshold: 0.05 }).observe(slot);
}
if (!reduce) $$(".hero .reel").forEach((r) => smoothLoop(r));

const io = new IntersectionObserver((entries) => entries.forEach((e) => {
  const v = e.target;
  e.isIntersecting ? v.play().catch(() => {}) : v.pause();
}), { threshold: 0.05 });
$$("video[autoplay]").forEach((v) => io.observe(v));

const nav = $("#nav");
const themeBtn = $("#themeToggle");
const syncTheme = () => themeBtn.setAttribute("aria-label", document.documentElement.dataset.theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
syncTheme();
themeBtn.addEventListener("click", () => {
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.classList.add("theme-anim");
  if (next === "dark") root.dataset.theme = "dark";
  else delete root.dataset.theme;
  try { localStorage.setItem("wbs-theme", next); } catch (e) {}
  syncTheme();
  setTimeout(() => root.classList.remove("theme-anim"), 500);
});
let lastY = 0;
addEventListener("scroll", () => {
  const y = scrollY;
  nav.classList.toggle("is-hidden", y > lastY && y > 300 && !bag.classList.contains("is-open"));
  lastY = y;
}, { passive: true });

if (hasGSAP) gsap.registerPlugin(ScrollTrigger, Flip);

if (animate && window.Lenis) {
  lenis = new Lenis({ duration: 1.25, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

$$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
  const id = a.getAttribute("href");
  if (id.length < 2) return;
  e.preventDefault();
  lenis ? lenis.scrollTo(id, { duration: 1.8 }) : $(id).scrollIntoView({ behavior: "smooth" });
}));

function loader(onDone) {
  const chars = splitChars($(".loader__word"));
  const heroVid = $("#heroMain video");
  const ring = $(".loader__mark .mark__ring") || $(".loader__mark svg");
  const ready = new Promise((res) => {
    if (heroVid.readyState >= 3) return res();
    heroVid.addEventListener("canplay", res, { once: true });
    setTimeout(res, 1200);
  });
  const tl = gsap.timeline();
  tl.from(".loader__mark", { scale: 0.8, opacity: 0, duration: 0.7, ease: "expo.out" })
    .from(chars, { yPercent: 115, duration: 0.7, stagger: 0.02, ease: "expo.out" }, 0.15)
    .from(".loader__tag", { opacity: 0, y: 10, duration: 0.5 }, 0.45);
  ready.then(() => tl.then(() => {
    gsap.timeline({ onComplete: () => { $("#loader").remove(); document.body.classList.remove("is-loading"); } })
      .to(".loader__mark, .loader__word, .loader__tag", { opacity: 0, y: -16, duration: 0.35, stagger: 0.04, ease: "power2.in" })
      .to("#loader", { clipPath: "inset(0% 0% 100% 0%)", duration: 0.9, ease: "expo.inOut" })
      .add(onDone, "<0.2");
  }));
}

function intro() {
  gsap.timeline({ defaults: { ease: "expo.out" } })
    .fromTo("#heroMain", { clipPath: `inset(50% 0% 50% 0% round ${innerWidth > 900 ? 8 : 0}px)` }, { clipPath: `inset(0% 0% 0% 0% round ${innerWidth > 900 ? 8 : 0}px)`, duration: 1.6, ease: "expo.inOut" }, 0)
    .fromTo("#heroMain video", { scale: 1.5 }, { scale: 1.12, duration: 2.2 }, 0)
    .from(".reel--side", { yPercent: (i) => (i ? -40 : 40), opacity: 0, duration: 1.8, stagger: 0.1 }, 0.35)
    .from(".hero__title .ln > *", { yPercent: 115, rotate: 4, duration: 1.4, stagger: 0.1 }, 0.5)
    .from(".hero__eyebrow span", { yPercent: 110, duration: 1 }, 0.6)
    .from(".hero__sub, .hero__copy .btn", { y: 30, opacity: 0, duration: 1.2, stagger: 0.1 }, 0.9)
    .from(".nav > *", { y: -24, opacity: 0, duration: 1, stagger: 0.08 }, 0.8);
}

function scenes() {
  const mm = gsap.matchMedia();

  gsap.to(".hero__copy", { yPercent: -30, opacity: 0, ease: "none", scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom 30%", scrub: true } });
  mm.add("(min-width: 901px)", () => {
    $$(".reel--side").forEach((r) => gsap.to(r, { yPercent: +r.dataset.speed * 100, ease: "none", scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true } }));
    gsap.to("#heroMain", { scale: 0.86, ease: "none", scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true } });
  });
  gsap.to("#heroMain video", { yPercent: 8, ease: "none", scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true } });

  gsap.from(".usp__item", { y: 30, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: ".usp", start: "top 90%" } });

  const tv = $("#twirlVideo");
  const unlock = () => { tv.play().then(() => tv.pause()).catch(() => {}); };
  addEventListener("touchstart", unlock, { once: true, passive: true });
  const clip = { t: 0 };
  let want = 0;
  const seek = (t) => {
    want = t;
    if (tv.readyState >= 1 && !tv.seeking) tv.currentTime = want;
  };
  tv.addEventListener("seeked", () => { if (Math.abs(tv.currentTime - want) > 0.02) tv.currentTime = want; });
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: "#twirl", start: "top top", end: "+=260%", pin: ".twirl__stage", scrub: 0.6, anticipatePin: 1 },
  });
  tl.fromTo("#twirlFrame", { scale: 0.5, borderRadius: 200 }, { scale: 1, borderRadius: 26, duration: 0.18, ease: "power2.out" }, 0)
    .fromTo(".twirl__bg", { xPercent: -38 }, { xPercent: -62, duration: 1 }, 0)
    .to(clip, {
      t: 1, duration: 1,
      onUpdate: () => {
        const d = tv.duration || 7;
        seek(Math.min(d - 0.05, clip.t * d));
      },
    }, 0)
    .to("#twirlProgress", { scaleX: 1, duration: 1 }, 0)
    .to(".twirl__hint", { opacity: 0, duration: 0.08 }, 0.05);
  [[".note--1", 0.18], [".note--2", 0.42], [".note--3", 0.66]].forEach(([n, at]) => {
    tl.fromTo(n, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" }, at)
      .to(n, { opacity: 0, y: -30, duration: 0.08 }, at + 0.2);
  });

  $$(".split-reveal").forEach((el) => {
    gsap.from(splitChars(el), {
      yPercent: 110, opacity: 0, rotate: 6, duration: 1.2, stagger: 0.025, ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });

  gsap.set(".card__media", { clipPath: "inset(100% 0% 0% 0% round 8px)" });
  gsap.set(".card__inner", { scale: 1.4 });
  gsap.set(".card__info", { opacity: 0, y: 30 });
  ScrollTrigger.batch(".card", {
    start: "top 88%", once: true,
    onEnter: (els) => {
      gsap.to(els.map((c) => $(".card__media", c)), { clipPath: "inset(0% 0% 0% 0% round 8px)", duration: 1.4, stagger: 0.12, ease: "expo.inOut" });
      gsap.to(els.map((c) => $(".card__inner", c)), { scale: 1, duration: 1.8, stagger: 0.12, ease: "expo.out" });
      gsap.to(els.map((c) => $(".card__info", c)), { opacity: 1, y: 0, duration: 1.2, stagger: 0.12, delay: 0.4, ease: "expo.out" });
    },
  });

  gsap.from(".studio__media", { clipPath: "inset(100% 0% 0% 0% round 8px)", duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: ".studio", start: "top 75%" } });
  gsap.from(".studio__copy > *, .step", { y: 40, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: ".studio__copy", start: "top 80%" } });

  $$(".stat b").forEach((el) => {
    const o = { v: 0 };
    gsap.to(o, {
      v: +el.dataset.count, duration: 2.2, ease: "power3.out",
      onUpdate: () => (el.textContent = Math.round(o.v) + el.dataset.suffix),
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });

  gsap.from(".wall__col", {
    y: (i) => (i % 2 ? -160 : 160), opacity: 0, duration: 1.6, stagger: 0.08, ease: "expo.out",
    scrollTrigger: { trigger: ".wall", start: "top 85%" },
  });

  gsap.from(splitChars($("#footerMega")), {
    yPercent: 100, opacity: 0, duration: 1.3, stagger: 0.04, ease: "expo.out",
    scrollTrigger: { trigger: ".footer", start: "top 65%" },
  });
}

if (animate) {
  scenes();
  loader(intro);
} else {
  $("#loader").remove();
  document.body.classList.remove("is-loading");
  $$(".note").forEach((n) => (n.style.opacity = 1));
}
