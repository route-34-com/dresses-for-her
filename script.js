const IG = "https://www.instagram.com/_wardrobe.by.she_/";
const IMG = "assets/img/";
const VID = "assets/video/";

const P = (id, n = 2) => Array.from({ length: n }, (_, i) => `p/${id}-${i + 1}.jpg`);

const PRODUCTS = [
  { id: "indigo", name: "Indigo Kalamkari Set", cat: "kurthi", price: 1799, tag: "Bestseller", imgs: P("indigo"), video: "twirl-loop",
    desc: "Blue checked cotton kurtha with a sweetheart neck, straight pants and a hand-painted kalamkari dupatta." },
  { id: "lilac", name: "Lilac Bagru Set", cat: "kurthi", price: 1699, tag: "New", imgs: P("lilac"), video: "lilac",
    desc: "Soft lilac block-printed kurtha with a keyhole neck, white pants and a sheer printed dupatta." },
  { id: "polka", name: "Polka Ajrakh Maxi", cat: "maxi", price: 1499, tag: "New", imgs: P("polka"), video: "maxi",
    desc: "Black flared maxi with a mustard polka yoke, puff sleeves and an ajrakh-striped hem." },
  { id: "rani", name: "Rani Pink Silk Set", cat: "kurthi", price: 2199, tag: "Festive", imgs: P("rani"),
    desc: "Rani pink silk-blend kurtha with woven motifs and a matching zari-border dupatta." },
  { id: "zari", name: "Zari Buti Anarkali", cat: "maxi", price: 2499, tag: "2 colours", imgs: P("zari"),
    desc: "Floor-sweeping anarkali with all-over zari buti and contrast cuffs. Shown in fuchsia and royal blue." },
  { id: "berry", name: "Berry Kalamkari Set", cat: "kurthi", price: 1899, imgs: P("berry"),
    desc: "Berry straight kurtha and pants paired with a cream kalamkari dupatta." },
  { id: "aqua", name: "Aqua Banarasi Set", cat: "kurthi", price: 2099, imgs: P("aqua"),
    desc: "Aqua buti kurtha with a peach banarasi dupatta — wedding-guest ready." },
  { id: "mango", name: "Mango Silk Set", cat: "kurthi", price: 1999, imgs: P("mango"),
    desc: "Mustard woven kurtha with a glowing orange silk dupatta." },
  { id: "midnight", name: "Midnight Check Maxi", cat: "maxi", price: 1599, imgs: P("midnight"),
    desc: "Navy checked maxi with a scalloped red yoke and a woven border hem." },
  { id: "poppy", name: "Poppy Tiered Maxi", cat: "maxi", price: 1449, tag: "New", imgs: P("poppy"),
    desc: "Red floral tiered maxi with flutter sleeves. Light, breezy and twirl-friendly." },
  { id: "sunset", name: "Sunset Stripe Co-ord", cat: "coord", price: 1299, tag: "Co-ord", imgs: P("sunset"),
    desc: "Handloom-stripe ruffle top with matching pants. Wear together or style apart." },
  { id: "wine", name: "Wine Kalamkari Anarkali", cat: "kurthi", price: 2299, imgs: P("wine"),
    desc: "Wine anarkali with a printed yoke and a bold mustard-maroon kalamkari dupatta." },
  { id: "coral", name: "Coral Brocade Set", cat: "kurthi", price: 2399, tag: "Festive", imgs: P("coral"),
    desc: "Coral printed kurtha with a rich red-gold brocade dupatta." },
  { id: "ivory", name: "Ivory Sanganeri Set", cat: "kurthi", price: 1599, imgs: P("ivory"),
    desc: "Cream sanganeri block-print kurtha, pants and a soft mul dupatta." },
  { id: "steel", name: "Steel Blue Buti Set", cat: "kurthi", price: 1399, imgs: P("steel"),
    desc: "A-line blue kurtha with yellow buti, three-quarter sleeves and matching pants." },
  { id: "charcoal", name: "Charcoal Anarkali Set", cat: "kurthi", price: 1899, imgs: P("charcoal"),
    desc: "Charcoal flared anarkali with a red woven hem and contrast pants." },
  { id: "pastel", name: "Ivory Hand-Painted Set", cat: "kurthi", price: 2199, imgs: P("pastel"),
    desc: "Ivory kurtha with bell sleeves and a hand-painted floral dupatta." },
  { id: "candy", name: "Candy Pink Set", cat: "kurthi", price: 1699, imgs: P("candy"),
    desc: "Candy pink silk-blend kurtha with a lime green contrast dupatta." },
  { id: "blush", name: "Blush Mul Set", cat: "kurthi", price: 1499, imgs: P("blush"),
    desc: "Blush pink mul kurtha with a lavender printed dupatta." },
  { id: "noir", name: "Noir Straight Set", cat: "kurthi", price: 1599, imgs: P("noir", 1),
    desc: "Black straight kurtha and pants with a printed monochrome dupatta." },
];

const LOOKS = ["zari", "indigo", "poppy", "aqua", "wine", "lilac", "midnight", "mango", "coral",
  "polka", "berry", "sunset", "ivory", "rani", "pastel", "charcoal", "candy", "steel"]
  .map((id) => [`p/${id}-1.jpg`, byIdName(id)]);

const POSTS = [
  ["p/zari-1.jpg", "p/DS18D2Bkt78"], ["p/poppy-1.jpg", "p/DPF_tlkkgOS"], ["p/aqua-1.jpg", "p/DUc9VWukvp0"],
  ["p/wine-1.jpg", "p/DShX7_Wkt3i"], ["p/midnight-1.jpg", "p/DPlWadDEq9G"], ["p/mango-1.jpg", "p/DUX4K8RkhSg"],
];

function byIdName(id) { return PRODUCTS.find((p) => p.id === id).name; }

const CAT_META = { kurthi: "Kurthi set · with dupatta", maxi: "Maxi dress", coord: "Co-ord set" };
const CAT_LABEL = { kurthi: "Kurthi set", maxi: "Maxi dress", coord: "Co-ord set" };
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const inr = (n) => "₹" + n.toLocaleString("en-IN");
const byId = (id) => PRODUCTS.find((p) => p.id === id);
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

$("#grid").innerHTML = PRODUCTS.map((p) => `
  <article class="card" data-cat="${p.cat}" data-id="${p.id}">
    <div class="card__media" data-flip-id="m-${p.id}"Play" : "View"}">
      <div class="card__inner" style="position:absolute;inset:0">
        <img class="card__img" src="${IMG + p.imgs[0]}" alt="${p.name}" loading="lazy"${p.pos ? ` style="object-position:${p.pos}"` : ""} />
      </div>
      ${p.tag ? `<span class="card__tag">${p.tag}</span>` : ""}
      ${p.video ? `<span class="card__live">Video</span>` : ""}
      <button class="card__quick">Quick view</button>
    </div>
    <div class="card__info">
      <div><h3 class="card__name">${p.name}</h3><p class="card__meta">${CAT_META[p.cat]}</p></div>
      <p class="card__price">${inr(p.price)}</p>
    </div>
  </article>`).join("");

const lookCarousel = new CircularCarousel($("#lookCarousel"), LOOKS.map(([src, cap]) => ({ src: IMG + src, alt: cap })), {
  preset: "cylinder", intro: "rise", cardWidth: 300, aspectRatio: 3 / 4, speed: 14, gap: 25, tilt: -5, curve: 1,
  perspective: 2500, autoplay: reduce ? "none" : "drift", interval: 3, direction: "left", momentum: 0.6, snap: true,
  pauseOnHover: false, focusOnClick: true, draggable: true, parallax: 0.06, stretch: 0.5,
  fadeColor: "#0d1410", depthFade: 0.55, innerShade: 0.6, cornerRadius: 12,
});

$("#instaGrid").innerHTML = POSTS.map(([src, path]) => `
  <a href="${IG}${path}/" target="_blank" rel="noopener"><img src="${IMG + src}" alt="Instagram post" loading="lazy" /></a>`).join("");

$$(".card__media").forEach((m) => {
  m.addEventListener("click", () => openQuick(m.closest(".card").dataset.id, m));
});

let lenis = null;
const pauseScroll = () => lenis && lenis.stop();
const resumeScroll = () => lenis && lenis.start();

const qv = $("#qv");
const qvMedia = $("#qvMedia");
let qvState = null;

function openQuick(id, from) {
  const p = byId(id);
  qvState = { id, from, size: "M" };
  qvMedia.innerHTML = p.video
    ? `<video src="${VID + p.video}.mp4" poster="${IMG + p.imgs[0]}" muted loop playsinline autoplay></video>`
    : `<img src="${IMG + (p.imgs[1] || p.imgs[0])}" alt="${p.name}" />`;
  qvMedia.dataset.flipId = from.dataset.flipId;
  $("#qvCat").textContent = CAT_LABEL[p.cat];
  $("#qvName").textContent = p.name;
  $("#qvPrice").textContent = inr(p.price);
  $("#qvDesc").textContent = p.desc;
  $("#qvSizes").innerHTML = SIZES.map((s) => `<button class="size${s === "M" ? " is-active" : ""}" data-size="${s}">${s}</button>`).join("");
  pauseScroll();
  qv.setAttribute("aria-hidden", "false");

  if (!animate) return qv.classList.add("is-open");
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
  const { from } = qvState;
  qvState = null;
  const done = () => {
    qv.classList.remove("is-open");
    qv.setAttribute("aria-hidden", "true");
    qvMedia.innerHTML = "";
    from.style.visibility = "";
    gsap.set([".qv__info > *", ".qv__panel", qvMedia], { clearProps: "all" });
    resumeScroll();
  };
  if (!animate) return done();
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
$("#qvSizes").addEventListener("click", (e) => {
  const b = e.target.closest(".size");
  if (!b || !qvState) return;
  qvState.size = b.dataset.size;
  $$(".size").forEach((s) => s.classList.toggle("is-active", s === b));
});
$("#qvAdd").addEventListener("click", () => {
  if (!qvState) return;
  const { id, size } = qvState;
  flyToBag(qvMedia, byId(id).imgs[0], () => addToBag(id, size));
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
  $("#bagTotal").textContent = inr(bagItems.reduce((n, i) => n + i.qty * byId(i.id).price, 0));
  $("#bagItems").innerHTML = bagItems.length
    ? bagItems.map((i, k) => {
        const p = byId(i.id);
        return `<li class="line">
          <img src="${IMG + p.imgs[0]}" alt="" />
          <div><p class="line__name">${p.name}</p><p class="line__meta">Size ${i.size}</p>
            <div class="line__qty"><button data-dec="${k}" aria-label="Decrease">−</button>${i.qty}<button data-inc="${k}" aria-label="Increase">+</button></div></div>
          <p class="line__price">${inr(p.price * i.qty)}</p></li>`;
      }).join("")
    : `<li class="bag__empty">Your bag is empty —<br/>go find your twirl.</li>`;
  store.set(bagItems);
}

function addToBag(id, size) {
  const hit = bagItems.find((i) => i.id === id && i.size === size);
  hit ? hit.qty++ : bagItems.push({ id, size, qty: 1 });
  renderBag();
  const b = $("#bagCount");
  b.classList.remove("bump");
  void b.offsetWidth;
  b.classList.add("bump");
  toast(`${byId(id).name} (${size}) added to bag`);
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
  const lines = bagItems.map((i) => `• ${byId(i.id).name} — Size ${i.size} × ${i.qty}`);
  const total = bagItems.reduce((n, i) => n + i.qty * byId(i.id).price, 0);
  const msg = `Hi Wardrobe by She! I'd like to order:\n${lines.join("\n")}\nTotal: ${inr(total)}`;
  try { await navigator.clipboard.writeText(msg); toast("Order copied — paste it in our DM"); } catch { toast("Opening Instagram DM…"); }
  window.open("https://ig.me/m/_wardrobe.by.she_", "_blank", "noopener");
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
    .fromTo("#heroMain", { clipPath: `inset(50% 0% 50% 0% round ${innerWidth > 900 ? 18 : 0}px)` }, { clipPath: `inset(0% 0% 0% 0% round ${innerWidth > 900 ? 18 : 0}px)`, duration: 1.6, ease: "expo.inOut" }, 0)
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

  gsap.set(".card__media", { clipPath: "inset(100% 0% 0% 0% round 16px)" });
  gsap.set(".card__inner", { scale: 1.4 });
  gsap.set(".card__info", { opacity: 0, y: 30 });
  ScrollTrigger.batch(".card", {
    start: "top 88%", once: true,
    onEnter: (els) => {
      gsap.to(els.map((c) => $(".card__media", c)), { clipPath: "inset(0% 0% 0% 0% round 16px)", duration: 1.4, stagger: 0.12, ease: "expo.inOut" });
      gsap.to(els.map((c) => $(".card__inner", c)), { scale: 1, duration: 1.8, stagger: 0.12, ease: "expo.out" });
      gsap.to(els.map((c) => $(".card__info", c)), { opacity: 1, y: 0, duration: 1.2, stagger: 0.12, delay: 0.4, ease: "expo.out" });
    },
  });

  gsap.from(".studio__media", { clipPath: "inset(100% 0% 0% 0% round 22px)", duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: ".studio", start: "top 75%" } });
  gsap.from(".studio__copy > *, .step", { y: 40, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: ".studio__copy", start: "top 80%" } });

  $$(".stat b").forEach((el) => {
    const o = { v: 0 };
    gsap.to(o, {
      v: +el.dataset.count, duration: 2.2, ease: "power3.out",
      onUpdate: () => (el.textContent = Math.round(o.v) + el.dataset.suffix),
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });

  gsap.from(".insta__grid a", {
    y: 120, opacity: 0, rotate: (i) => (i % 2 ? 4 : -4), duration: 1.4, stagger: 0.07, ease: "expo.out",
    scrollTrigger: { trigger: ".insta__grid", start: "top 85%" },
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
