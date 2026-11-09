const IG = "https://www.instagram.com/_wardrobe.by.she_/";
const IMG = "assets/img/";
const VID = "assets/video/";


const PRODUCTS = [
  {"id": "maroon", "name": "Maroon Zari Check Set", "cat": "kurthi", "tag": "New", "video": "r/maroon", "fabric": "Kurta, palazzo and dupatta · rich zari detailing", "desc": "Deep maroon with shimmering gold zari checks, finished with a soft Ajrakh-style dupatta and matching palazzo. Festive, graceful and made for Diwali and beyond.", "ig": "p/DfCG_58ku6b", "imgs": ["p/maroon-1.jpg", "p/maroon-2.jpg", "p/maroon-3.jpg"]},
  {"id": "manjal", "name": "Manjal", "cat": "kurthi", "video": "r/manjal", "fabric": "Banarasi top and dupatta · santoon bottom · cotton lining", "desc": "They call it Manjal — sunshine in a three-piece, in pure Banarasi.", "ig": "p/DUX4K8RkhSg", "imgs": ["p/manjal-1.jpg", "p/manjal-2.jpg", "p/manjal-3.jpg"]},
  {"id": "cottoncandy", "name": "Cotton Candy Set", "cat": "kurthi", "video": "r/cottoncandy", "fabric": "Soft cotton top and bottom · Kota Doria dupatta · pure cotton lining", "sizes": "XXS to XXXL", "desc": "A cloud-feel cotton top and bottom with a breezy Kota Doria dupatta. Light, breathable and our viral summer favourite.", "ig": "p/DVkvdlpia5y", "imgs": ["p/cottoncandy-1.jpg", "p/cottoncandy-2.jpg", "p/cottoncandy-3.jpg", "p/cottoncandy-4.jpg"]},
  {"id": "rasagulla", "name": "Rasagulla", "cat": "kurthi", "video": "r/rasagulla", "fabric": "Soft cotton Jamdani · zari details", "sizes": "2XS to 3XL", "desc": "Soft cotton Jamdani with the prettiest zari details that catch the light. Light, breathable and effortlessly put together.", "ig": "p/Dd0xvYkiSz0", "imgs": ["p/rasagulla-1.jpg", "p/rasagulla-2.jpg", "p/rasagulla-3.jpg"]},
  {"id": "vaanam", "name": "Vaanam", "cat": "kurthi", "video": "r/vaanam", "fabric": "Slub silk top and bottom · pure cotton lining · hand-painted Pen Kalamkari dupatta", "sizes": "2XS to 3XL", "custom": "Customisation available", "desc": "The art of storytelling: a 3-piece set in rich slub silk, elevated by an authentic, hand-painted Pen Kalamkari dupatta.", "ig": "p/Dd3lH2qiR9P", "imgs": ["p/vaanam-1.jpg", "p/vaanam-2.jpg", "p/vaanam-3.jpg"]},
  {"id": "sindhoor", "name": "Sindhoor", "cat": "kurthi", "video": "r/sindhoor", "fabric": "Pure cotton · premium kota dupatta", "desc": "Pure cotton on the skin, premium kota dupatta on the shoulder. Three pieces, one attitude.", "ig": "reel/DeRQYFwp1_z", "imgs": ["p/sindhoor-1.jpg"]},
  {"id": "lavender", "name": "Lavender Kota Doria Suit", "cat": "kurthi", "video": "r/lavender", "fabric": "Handblock printed kurta · soft cotton pant · kota doria dupatta", "desc": "Too hot for heavy fabrics? An everyday-to-occasion set that is light as air — perfect for college and office wear.", "ig": "p/DeBlzOZiaaM", "imgs": ["p/lavender-1.jpg", "p/lavender-2.jpg", "p/lavender-3.jpg"]},
  {"id": "comfy", "name": "Comfy Black Maxi", "cat": "maxi", "video": "r/comfy", "fabric": "Softest pure cotton", "desc": "A black maxi in the softest pure cotton that gives you all the room to breathe and move. Brunch or a coffee run?", "ig": "p/Dd6Du-wiUcS", "imgs": ["p/comfy-1.jpg", "p/comfy-2.jpg", "p/comfy-3.jpg"]},
  {"id": "jamdani", "name": "Jamdani Festive Set", "cat": "kurthi", "video": "r/jamdani", "fabric": "Jamdani top and dupatta · cotton lining", "sizes": "XXXS to XXXL", "desc": "From our premium Jamdani collection, made for the festive season.", "ig": "reel/DPq4KLRElzc", "imgs": ["p/jamdani-1.jpg"]},
  {"id": "organza", "name": "Organza Suit", "cat": "kurthi", "video": "r/organza", "fabric": "Soft organza · flowy dupatta", "sizes": "XXS to XXXL", "custom": "Feeding-friendly customisation available · 4 weeks delivery", "desc": "Our most requested suit: soft organza, dreamy hues and a flowy dupatta — elegance in every detail.", "ig": "reel/DVsVDnqCdm6", "imgs": ["p/organza-1.jpg"]},
  {"id": "summer", "name": "Summer Jamdani Set", "cat": "kurthi", "video": "r/summer", "fabric": "Traditional Jamdani cotton", "desc": "Made to cool and comfort you: Jamdani cotton sets that feel breezy, refined and incredibly soft.", "ig": "p/DXooieFCT_i", "imgs": ["p/summer-1.jpg", "p/summer-2.jpg", "p/summer-3.jpg", "p/summer-4.jpg"]},
  {"id": "linen", "name": "Cotton Suit with Linen Dupatta", "cat": "kurthi", "video": "r/linen", "fabric": "100% pure cotton top and bottom · premium linen dupatta · cotton lining", "sizes": "XXXS to XXXL", "desc": "Breathable pure cotton with a linen dupatta in geometric motifs. Effortless, organic, authentic.", "ig": "p/DVqbCs0iSRL", "imgs": ["p/linen-1.jpg", "p/linen-2.jpg"]},
  {"id": "vintage", "name": "Vintage Anarkali", "cat": "maxi", "tag": "2 colours", "video": "r/vintage", "fabric": "Anarkali with regal flares", "sizes": "XXXS to XXXL", "desc": "A vintage-inspired Anarkali with regal flares and royal detailing, made to celebrate festive days. Shown in two colours.", "ig": "p/DS18D2Bkt78", "imgs": ["p/vintage-1.jpg", "p/vintage-2.jpg", "p/vintage-3.jpg", "p/vintage-4.jpg"]},
  {"id": "hakoba", "name": "Hakoba Co-ord Set", "cat": "coord", "tag": "2 colours", "video": "r/hakoba", "fabric": "Premium pure cotton hakoba · thread embroidery · soft cotton lining", "sizes": "XXXS to XXXL", "desc": "An A-line top and bottom co-ord in pure cotton hakoba with detailed thread embroidery. Lightweight, breathable and elegant.", "ig": "reel/DRMbUoukoOW", "imgs": ["p/hakoba-1.jpg"]},
  {"id": "silkmaxi", "name": "Festive Silk Maxi", "cat": "maxi", "fabric": "Silk maxi · cotton lining", "sizes": "XXXS to XXXL", "custom": "Open for customisation", "desc": "A silk maxi lined with soft cotton for comfort — a festive ensemble.", "ig": "p/DPF_tlkkgOS", "imgs": ["p/silkmaxi-1.jpg", "p/silkmaxi-2.jpg", "p/silkmaxi-3.jpg"]},
  {"id": "oviyam", "name": "Oviyam", "cat": "kurthi", "sold": true, "video": "r/oviyam", "fabric": "Slub silk with subtle checks · handblock Kalamkari silk dupatta · pure cotton lining", "custom": "Feeding-friendly, neck and sleeve customisation on request", "desc": "Wearing a piece of art: modern slub silk checks with a handblock Kalamkari silk dupatta where every motif tells a story.", "ig": "p/DV0mp1EiUgF", "imgs": ["p/oviyam-1.jpg", "p/oviyam-2.jpg", "p/oviyam-3.jpg"]},
  {"id": "floralmaxi", "name": "Floral Silk Maxi", "cat": "maxi", "sold": true, "video": "r/floralmaxi", "fabric": "Silk · pleated", "desc": "A long, flowy, pleated floral silk maxi — the easy wedding-guest look.", "ig": "reel/DUiOtRXEh_h", "imgs": ["p/floralmaxi-1.jpg"]},
  {"id": "banarasi", "name": "Banarasi Silk Suit", "cat": "kurthi", "sold": true, "video": "r/banarasi", "fabric": "Banarasi silk top and dupatta · santoon bottom", "desc": "No heavy jewellery, no extra effort — just pure Banarasi magic.", "ig": "p/DUc9VWukvp0", "imgs": ["p/banarasi-1.jpg", "p/banarasi-2.jpg", "p/banarasi-3.jpg"]},
  {"id": "chennur", "name": "Silk Maxi with Chennur Kalamkari", "cat": "maxi", "sold": true, "video": "r/chennur", "fabric": "Rich silk maxi with lining · Chennur Kalamkari dupatta", "sizes": "XXS to XXXL", "desc": "For women who appreciate art, culture and comfort: a flowing silk maxi paired with an authentic Chennur Kalamkari dupatta.", "ig": "p/DShX7_Wkt3i", "imgs": ["p/chennur-1.jpg", "p/chennur-2.jpg", "p/chennur-3.jpg"]},
  {"id": "kotachecks", "name": "Kota Doria Checks Set", "cat": "kurthi", "sold": true, "video": "r/kotachecks", "fabric": "Pure cotton checks · 2.5 m Kota Doria dupatta · cotton lining", "sizes": "XXS to XXXL", "desc": "Light as a breeze: soft cotton checks with a dreamy Kota Doria dupatta for work, college or casual days.", "ig": "reel/DQQ88TSEugG", "imgs": ["p/kotachecks-1.jpg"]},
  {"id": "silkkalamkari", "name": "Silk Suit with Kalamkari Dupatta", "cat": "kurthi", "sold": true, "video": "r/silkkalamkari", "fabric": "Premium silk 3-piece · Kalamkari dupatta", "sizes": "XXXS to XXXL", "desc": "A premium silk suit paired with an exquisite Kalamkari dupatta — tradition, in style.", "ig": "reel/DPLNAu7Evdx", "imgs": ["p/silkkalamkari-1.jpg"]},
  {"id": "cottonsilk", "name": "Cotton Silk Festive Set", "cat": "kurthi", "sold": true, "fabric": "Cotton silk", "sizes": "XXXS to XXXL", "desc": "Elegant, comfy and festive — a cotton silk showstopper.", "ig": "p/DPqKyxRkt1m", "imgs": ["p/cottonsilk-1.jpg", "p/cottonsilk-2.jpg", "p/cottonsilk-3.jpg"]},
  {"id": "muslin", "name": "Cotton Muslin Suit", "cat": "kurthi", "sold": true, "fabric": "Cotton muslin 3-piece · soft cotton lining", "sizes": "XXXS to XXXL", "desc": "Effortless elegance and all-day comfort, stylish and breathable.", "ig": "p/DPGe0krEgxj", "imgs": ["p/muslin-1.jpg", "p/muslin-2.jpg", "p/muslin-3.jpg"]},
  {"id": "kattam", "name": "Kattam", "cat": "maxi", "sold": true, "ig": "p/DPlWadDEq9G", "imgs": ["p/kattam-1.jpg", "p/kattam-2.jpg", "p/kattam-3.jpg"]},
  {"id": "handloom", "name": "Handloom", "cat": "kurthi", "sold": true, "video": "r/handloom", "ig": "p/DSeUkUuEsyR", "imgs": ["p/handloom-1.jpg", "p/handloom-2.jpg", "p/handloom-3.jpg"]},
  {"id": "blush", "name": "Blush", "cat": "kurthi", "sold": true, "ig": "p/DSmk-Dcks5l", "imgs": ["p/blush-1.jpg", "p/blush-2.jpg"]},
];

const ASK_US = "Message us on Instagram for price and availability.";

function byIdName(id) { return PRODUCTS.find((p) => p.id === id).name; }

const CAT_META = { kurthi: "Kurthi set", maxi: "Maxi", coord: "Co-ord set" };
const CAT_LABEL = { kurthi: "Kurthi set", maxi: "Maxi dress", coord: "Co-ord set" };

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const byId = (id) => PRODUCTS.find((p) => p.id === id);

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const cardSrc = (src) => IMG + src.replace("p/", "c/");
const tagOf = (p) => (p.sold ? "Sold out" : p.tag || "");

function cardHTML(p) {
  const tag = tagOf(p);
  return `
  <article class="card${p.sold ? " is-sold" : ""}" data-cat="${p.cat}" data-id="${p.id}">
    <div class="card__media" data-flip-id="m-${p.id}">
      <div class="card__inner">
        <img class="card__img" src="${cardSrc(p.imgs[0])}" alt="${esc(p.name)}" loading="lazy" />
        ${p.imgs[1] ? `<img class="card__img card__img--alt" src="${cardSrc(p.imgs[1])}" alt="" loading="lazy" />` : ""}
      </div>
      ${tag ? `<span class="card__tag${p.sold ? " card__tag--sold" : ""}">${tag}</span>` : ""}
      <button class="fav-btn fav-btn--card" type="button" data-fav="${p.id}" aria-pressed="${favs.has(p.id)}" aria-label="Save ${esc(p.name)} to favourites">${HEART}</button>
      ${p.video ? `<span class="card__live">Reel</span>` : ""}
      <button class="card__quick" type="button">Quick view</button>
    </div>
    <div class="card__info">
      <h3 class="card__name">${esc(p.name)}</h3>
      <p class="card__meta">${CAT_META[p.cat]}${p.fabric ? ` · ${esc(p.fabric.split(" · ")[0])}` : ""}</p>
    </div>
  </article>`;
}

function detailsHTML(p) {
  const rows = [["Fabric", p.fabric], ["Sizes", p.sizes], ["Made to order", p.custom]].filter((r) => r[1]);
  return `
    ${p.desc ? `<p class="qv__desc">${esc(p.desc)}</p>` : ""}
    ${rows.length ? `<dl class="pd">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>` : ""}
    <p class="pd__note">${p.sold ? "Sold out for now — message us to ask about a restock." : ASK_US}</p>
    ${p.ig ? `<a class="pd__ig" href="${IG}${p.ig}/" target="_blank" rel="noopener">See the original post on Instagram ↗</a>` : ""}`;
}

const mediaItems = (p) => [...(p.video ? [{ v: p.video }] : []), ...p.imgs.map((i) => ({ i }))];

function showMedia(box, p, k = 0) {
  const it = mediaItems(p)[k];
  const html = it.v
    ? `<video src="${VID + it.v}.mp4" poster="${VID + it.v}.jpg" muted loop playsinline autoplay></video>`
    : `<img src="${IMG + it.i}" alt="${esc(p.name)}" />`;
  const old = box.querySelector(".qv__slide");
  const el = document.createElement("div");
  el.className = "qv__slide";
  el.innerHTML = html;
  box.appendChild(el);
  requestAnimationFrame(() => el.classList.add("is-in"));
  if (old) setTimeout(() => old.remove(), 450);
}

function thumbsHTML(p) {
  const items = mediaItems(p);
  if (items.length < 2) return "";
  return `<div class="thumbs" role="tablist" aria-label="Photos and reel">${items.map((it, k) => `
    <button type="button" class="thumb${k ? "" : " is-active"}" data-k="${k}" aria-label="${it.v ? "Play reel" : `Photo ${k + (p.video ? 0 : 1)}`}">
      <img src="${it.v ? VID + it.v + ".jpg" : cardSrc(it.i)}" alt="" loading="lazy" />${it.v ? "<i>▶</i>" : ""}
    </button>`).join("")}</div>`;
}

function bindThumbs(root, box, current) {
  root.addEventListener("click", (e) => {
    const t = e.target.closest(".thumb");
    const p = current();
    if (!t || !p || t.classList.contains("is-active")) return;
    $$(".thumb", root).forEach((x) => x.classList.toggle("is-active", x === t));
    showMedia(box, p, +t.dataset.k);
  });
}

const FAV_KEY = "wbs-fav";
const favs = {
  get() { try { return (JSON.parse(localStorage.getItem(FAV_KEY)) || []).filter((id) => byId(id)); } catch { return []; } },
  set(v) { try { localStorage.setItem(FAV_KEY, JSON.stringify(v)); } catch {} },
  has(id) { return favs.get().includes(id); },
  toggle(id) {
    const v = favs.get();
    const on = !v.includes(id);
    favs.set(on ? [...v, id] : v.filter((x) => x !== id));
    syncFavCount();
    return on;
  },
};

function syncFavCount() {
  const n = favs.get().length;
  $$("[data-fav-count]").forEach((b) => { b.textContent = n; b.hidden = !n; });
}

async function enquireOnInstagram(msg, done) {
  try { await navigator.clipboard.writeText(msg); if (done) done("Message copied — paste it in our DM"); } catch { if (done) done("Opening Instagram DM…"); }
  window.open("https://ig.me/m/_wardrobe.by.she_", "_blank", "noopener");
}

addEventListener("pointermove", (e) => {
  if (e.pointerType !== "mouse") return;
  const m = e.target.closest && e.target.closest(".card__media");
  if (!m) return;
  const r = m.getBoundingClientRect();
  m.style.setProperty("--zx", ((e.clientX - r.left) / r.width) * 100 + "%");
  m.style.setProperty("--zy", ((e.clientY - r.top) / r.height) * 100 + "%");
}, { passive: true });

const HEART =`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.3s-7.6-4.6-9.2-9.4C1.7 7.6 3.9 4.3 7.3 4.3c2 0 3.6 1.1 4.7 2.8 1.1-1.7 2.7-2.8 4.7-2.8 3.4 0 5.6 3.3 4.5 6.6-1.6 4.8-9.2 9.4-9.2 9.4z"/></svg>`;
const SEARCH = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg>`;
