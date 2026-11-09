const CAT_COPY = {
  all: ["The <em>wardrobe</em>", "Every piece from our Instagram in one place. Save the ones you love and ask us about them in DM."],
  kurthi: ["Kurthi <em>sets</em>", "Kurta, bottom and dupatta — in cotton, Jamdani, Kota Doria, Banarasi and silk."],
  maxi: ["The <em>maxis</em>", "Flowing maxis and Anarkalis in pure cotton and silk."],
  coord: ["Co-ord <em>sets</em>", "Matching tops and bottoms — wear them together or style them apart."],
};
const PILLS = {
  all: () => true,
  available: (p) => !p.sold,
  new: (p) => p.tag === "New",
  video: (p) => !!p.video,
  sold: (p) => !!p.sold,
};

const state = { cat: "all", pill: "all" };
const grid = $("#colGrid");

function list() {
  return PRODUCTS.filter((p) => (state.cat === "all" || p.cat === state.cat) && PILLS[state.pill](p));
}

function render() {
  const items = list();
  const [title, line] = CAT_COPY[state.cat];
  $("#colTitle").innerHTML = title;
  $("#colLine").textContent = line;
  $$("#colTabs [role=tab]").forEach((t) => t.setAttribute("aria-selected", t.dataset.cat === state.cat));
  $$(".col__pill").forEach((b) => b.classList.toggle("is-active", b.dataset.pill === state.pill));
  grid.innerHTML = items.map(cardHTML).join("");
  $("#colCount").textContent = `${items.length} ${items.length === 1 ? "piece" : "pieces"}`;
  $("#colEmpty").hidden = items.length > 0;
  $$(".card", grid).forEach((c, i) => {
    c.style.animationDelay = `${Math.min(i, 12) * 45}ms`;
    c.classList.add("is-in");
  });
}

function setCat(cat, push) {
  state.cat = CAT_COPY[cat] ? cat : "all";
  if (push) history.replaceState(null, "", state.cat === "all" ? "collections.html" + location.search : "#" + state.cat);
  render();
}

$("#colTabs").addEventListener("click", (e) => {
  const t = e.target.closest("[role=tab]");
  if (t) setCat(t.dataset.cat, true);
});
$("#colPills").addEventListener("click", (e) => {
  const b = e.target.closest(".col__pill");
  if (!b) return;
  state.pill = b.dataset.pill;
  render();
});
$("#colReset").addEventListener("click", () => { state.pill = "all"; setCat("all", true); });
addEventListener("hashchange", () => setCat(location.hash.slice(1), false));

function syncHearts() {
  $$("[data-fav]").forEach((b) => b.setAttribute("aria-pressed", favs.has(b.dataset.fav)));
  if (pvId) $("#pvFav").setAttribute("aria-pressed", favs.has(pvId));
  renderFavs();
}

function toggleFav(id) {
  const on = favs.toggle(id);
  syncHearts();
  toast(on ? "Saved to favourites" : "Removed from favourites");
}

grid.addEventListener("click", (e) => {
  const f = e.target.closest("[data-fav]");
  if (f) return toggleFav(f.dataset.fav);
  const c = e.target.closest(".card");
  if (c) openPv(c.dataset.id);
});

let pvId = null;
let pvTimer = null;
const pv = $("#pv");
const pvMedia = $("#pvMedia");

function openPv(id) {
  const p = byId(id);
  pvId = id;
  clearTimeout(pvTimer);
  pvMedia.innerHTML = "";
  showMedia(pvMedia, p);
  $("#pvCat").textContent = tagOf(p) ? `${CAT_LABEL[p.cat]} · ${tagOf(p)}` : CAT_LABEL[p.cat];
  $("#pvName").textContent = p.name;
  $("#pvThumbs").innerHTML = thumbsHTML(p);
  $("#pvBody").innerHTML = detailsHTML(p);
  $("#pvEnquire span").textContent = p.sold ? "Ask about a restock" : "Enquire on Instagram";
  $("#pvFav").setAttribute("aria-pressed", favs.has(id));
  closeSearch();
  pv.classList.add("is-open");
  pv.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => pv.classList.add("pv--open"));
  document.body.style.overflow = "hidden";
}

function closePv() {
  if (!pvId) return;
  pv.classList.remove("pv--open");
  pv.setAttribute("aria-hidden", "true");
  pvId = null;
  document.body.style.overflow = "";
  pvTimer = setTimeout(() => {
    pv.classList.remove("is-open");
    pvMedia.innerHTML = "";
  }, 450);
}

bindThumbs($("#pvThumbs"), pvMedia, () => pvId && byId(pvId));
$$("[data-pv-close]").forEach((el) => el.addEventListener("click", closePv));
$("#pvFav").addEventListener("click", () => pvId && toggleFav(pvId));
$("#pvEnquire").addEventListener("click", () => {
  const p = byId(pvId);
  const ask = p.sold ? `The ${p.name} is sold out — will it be restocked?` : `I'd love to know more about the ${p.name} (${CAT_LABEL[p.cat]}). Could you share the price and available sizes?`;
  enquireOnInstagram(`Hi Wardrobe by She! ${ask}\nMy size: `, toast);
});

const favd = $("#favd");
function renderFavs() {
  const items = favs.get().map(byId);
  $("#favItems").innerHTML = items.length
    ? items.map((p) => `
      <li class="line">
        <img src="${cardSrc(p.imgs[0])}" alt="" />
        <div><p class="line__name">${esc(p.name)}</p><p class="line__meta">${CAT_LABEL[p.cat]}</p><button class="favd__view" type="button" data-view="${p.id}">View details</button></div>
        <button class="favd__rm" type="button" data-rm="${p.id}" aria-label="Remove ${esc(p.name)}">✕</button>
      </li>`).join("")
    : `<li class="bag__empty">No favourites yet.<br/>Tap the ♡ on any piece to save it.</li>`;
  $("#favEnquire").disabled = !items.length;
}
const openFavs = () => { renderFavs(); favd.classList.add("is-open"); favd.setAttribute("aria-hidden", "false"); };
const closeFavs = () => { favd.classList.remove("is-open"); favd.setAttribute("aria-hidden", "true"); };
$("#favOpen").addEventListener("click", openFavs);
$$("[data-fav-close]").forEach((el) => el.addEventListener("click", closeFavs));
$("#favItems").addEventListener("click", (e) => {
  const rm = e.target.closest("[data-rm]");
  if (rm) return toggleFav(rm.dataset.rm);
  const v = e.target.closest("[data-view]");
  if (v) { closeFavs(); openPv(v.dataset.view); }
});
$("#favEnquire").addEventListener("click", () => {
  const items = favs.get().map(byId);
  if (!items.length) return;
  const lines = items.map((p, i) => `${i + 1}. ${p.name} (${CAT_LABEL[p.cat]})`).join("\n");
  enquireOnInstagram(`Hi Wardrobe by She! I'd love to know more about these pieces:\n${lines}\n\nCould you share the price and available sizes?\nMy size: `, toast);
});

const srch = $("#srch");
const srchIn = $("#srchIn");
const haystack = (p) => `${p.name} ${p.desc || ""} ${p.fabric || ""} ${CAT_LABEL[p.cat]} ${tagOf(p)}`.toLowerCase();

function runSearch() {
  const words = srchIn.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const hits = words.length ? PRODUCTS.filter((p) => words.every((w) => haystack(p).includes(w))) : [];
  $("#srchHint").textContent = !words.length ? "Try “cotton”, “silk”, “kota doria” or “kalamkari”." : hits.length ? `${hits.length} ${hits.length === 1 ? "match" : "matches"}` : "No matches — try a fabric like “jamdani” or “banarasi”.";
  $("#srchList").innerHTML = hits.map((p) => `
    <li><button type="button" data-view="${p.id}">
      <img src="${cardSrc(p.imgs[0])}" alt="" />
      <span><b>${esc(p.name)}</b><small>${CAT_LABEL[p.cat]}</small></span>
    </button></li>`).join("");
}

function openSearch() {
  srch.classList.add("is-open");
  srch.setAttribute("aria-hidden", "false");
  setTimeout(() => srchIn.focus(), 60);
  runSearch();
}
function closeSearch() {
  srch.classList.remove("is-open");
  srch.setAttribute("aria-hidden", "true");
}
$("#searchOpen").addEventListener("click", openSearch);
$$("[data-srch-close]").forEach((el) => el.addEventListener("click", closeSearch));
srchIn.addEventListener("input", runSearch);
srchIn.addEventListener("keydown", (e) => {
  if (e.key === "Enter") { const b = $("#srchList button"); if (b) openPv(b.dataset.view); }
});
$("#srchList").addEventListener("click", (e) => {
  const b = e.target.closest("[data-view]");
  if (b) openPv(b.dataset.view);
});

addEventListener("keydown", (e) => {
  if (e.key === "/" && document.activeElement.tagName !== "INPUT") { e.preventDefault(); openSearch(); }
  if (e.key !== "Escape") return;
  if (pv.classList.contains("is-open")) closePv();
  else if (srch.classList.contains("is-open")) closeSearch();
  else closeFavs();
});

let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("is-show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("is-show"), 2400);
}

const themeBtn = $("#themeToggle");
const syncTheme = () => themeBtn.setAttribute("aria-label", document.documentElement.dataset.theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
themeBtn.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("wbs-theme", next); } catch (e) {}
  syncTheme();
});
syncTheme();

addEventListener("storage", (e) => { if (e.key === FAV_KEY) { syncFavCount(); syncHearts(); } });

setCat(location.hash.slice(1), false);
syncFavCount();
renderFavs();
const open = new URLSearchParams(location.search).get("open");
if (open === "search") openSearch();
if (open === "favourites") openFavs();
