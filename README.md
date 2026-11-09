<h1 align="center">Wardrobe by She — Ethnic Wear Storefront</h1>
<br>
<p align="center">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/gsap-88CE02?style=for-the-badge&logo=greensock&logoColor=black" alt="GSAP">
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
</p>
<br>

👗 A video-led, scroll-animated storefront for **Wardrobe by She**, an Instagram-first women's ethnic wear label from **Tamil Nadu** selling kurthi sets, maxis and co-ord sets.

Every product, name, fabric and reel on the site comes from the brand's own Instagram posts. Real try-on reels play in the hero, a scroll-scrubbed reel lets visitors "twirl" an outfit frame by frame, and every product opens in a quick view with its reel and photo gallery before going into a bag or enquiry that is sent straight to Instagram DM.

   🎬 **GSAP + ScrollTrigger + Flip** drive the scroll scenes, reveals, filters and quick-view transitions

   🧈 **Lenis** provides buttery smooth scrolling across the whole page

   🎠 A slow-turning **3D lookbook wheel**, an **accordion of looks** and a **drifting wall** of reels and photos

   ⚡ No build step — plain HTML, CSS and JavaScript, deployed as a static site on **Vercel**

> **Content source:** product names, fabrics, sizes, customisation notes, sold-out status, the size chart and the order terms are taken from the brand's Instagram captions and highlights (posts up to 28 Oct 2026). **Prices are intentionally not shown** — visitors ask for them in DM, the way the brand sells today.

## Features

- **Logo preloader** in the brand's deep green and gold, gone in about 1.5 seconds
- **Floating header bar** with logo, section links, search, favourites, light / dark switch and bag
- **Light / dark mode** switch in the header (remembers the visitor's choice)
- **Hero** with the three best try-on reels, crossfaded at each loop so they never jump, staggered parallax and a split-line headline
- **Why shop with us** strip: free shipping in Tamil Nadu, Instagram ordering, sizes XXXS–XXXL, customisation
- **Scroll to twirl** — the page pins and scroll-scrubs the Vaanam reel frame by frame, with its real fabric callouts
- **The drop** — the pieces currently available, filterable by **Kurthi sets / Maxis / Co-ords** with smooth Flip re-layout. Photos are cropped around the model so heads line up; hovering swaps to the next photo and zooms in where the cursor points
- **Quick view** that morphs out of the product card, with the product's reel, a photo gallery, fabric, sizes, customisation and a link to the original post
- **Bag** drawer with quantity controls; remembers items between visits
- **Order via Instagram DM** — the bag is copied as a ready-to-paste message asking for price and sizes, and the brand's DM opens
- **One girl, six looks** accordion with the faces lined up across every panel
- **3D lookbook wheel** — turns slowly, drag or swipe sideways to spin, tap a look to open it
- **Collections page** (`collections.html`) — all 26 pieces with category tabs, filters (available, new, with reel, sold out), search by name or fabric, favourites saved in the browser, and an enquiry sent to Instagram DM
- **Size guide and terms** — the brand's size chart and order terms (prepaid, shipping, dispatch time, exchanges)
- **Ordering is easy** section with the studio sewing clip and a four-step how-to-order guide
- Count-up stats, a drifting Instagram wall of reels and photos, gold wordmark footer
- Fully responsive with 2-column shop on phones, respects `prefers-reduced-motion`

## Live Site

**https://wardrobebyshe.route34solutions.com**

Hosted on Vercel. Every push to `main` deploys to production automatically; pushes to other branches get their own preview URL.

## Installation

### Step 1: Clone the Repository

**Option A: Using VS Code Terminal**
1. Open Visual Studio Code
2. Open a new terminal (Terminal → New Terminal or ``Ctrl+Shift+` ``)
3. Navigate to your desired directory:
   ```bash
   cd path/to/your/desired/folder
   ```
4. Clone the repository:
   ```bash
   git clone https://github.com/route-34-com/dresses-for-her.git
   ```
5. Open the project folder:
   ```bash
   cd dresses-for-her
   ```
6. Open the project in VS Code:
   ```bash
   code .
   ```

**Option B: Using VS Code Git Integration**
1. Open Visual Studio Code
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
3. Type "Git: Clone" and select it
4. Paste the repository URL: `https://github.com/route-34-com/dresses-for-her.git`
5. Choose a folder location and click "Select Repository Location"
6. Click "Open" when prompted

### Step 2: Get a Local Web Server

The site has no dependencies to install, but it must be opened through a local web server (not by double-clicking `index.html`) so the videos and scripts load correctly. Use **either** of these:

- **Python** (already on most machines) — verify with:
  ```bash
  python --version
  ```
- **Node.js** — download the **LTS** version from the [Node.js Download Page](https://nodejs.org/) and verify with:
  ```bash
  node -v
  ```

## Usage

### Running Locally

With Python:

```bash
python -m http.server 5534
```

Or with Node.js:

```bash
npx serve .
```

Open `http://localhost:5534` (or the URL `serve` prints) and **start scrolling!** The page will:
- Play the try-on reels in the hero
- Pin the twirl section and scrub the video as you scroll
- Let you filter the shop, open a quick view and add to the bag

### Deploying

Push to `main`:

```bash
git add .
git commit -m "Describe your change"
git push
```

Vercel picks up the push and deploys it within a minute. `vercel.json` sets caching and security headers; there is no build step.

> **Cache busting:** the CSS and JS files are cached for a year. After editing any of them, bump the `?v=` number on every `<link>` / `<script>` tag in `index.html` and `collections.html` so visitors get the new files.

## Customizing the Site

| What to change | Where |
|---|---|
| Products — names, categories, fabric, sizes, descriptions, sold-out status, reels | `PRODUCTS` array at the top of `data.js` (shared by both pages) |
| Lookbook carousel photos | `LOOKS` array in `script.js` |
| Accordion looks | `FEEL` array in `script.js`; face-aligned crops in `assets/img/feel/` |
| Drifting wall reels | `WALL_REELS` in `script.js` |
| Wheel speed and tilt | options passed to `new PaintedWheel(...)` in `script.js` |
| Headline, tagline, why-shop strip, order steps, stats, size chart, terms, footer links | `index.html` |
| Colours (light and dark themes), fonts, spacing | CSS variables at the top and bottom of `styles.css` |
| Logo and tab icon | `assets/logo.jpg`, `assets/favicon.png` |
| Product photos | `assets/img/p/<product-id>-<n>.jpg` (up to 1080 px wide), plus a model-centred 3:4 crop of each in `assets/img/c/` used on cards |
| Videos | product reels in `assets/video/r/<product-id>.mp4` with a `.jpg` poster (muted, 540p H.264, `faststart`) |

## Project Structure

```
├── index.html          Home page markup and sections
├── collections.html    Collections page: tabs, search, favourites, enquiry
├── styles.css          All styles, light and dark themes
├── data.js             Products, favourites store, Instagram enquiry (shared)
├── script.js           Home: shop, quick view, bag, accordion, wall, scroll animations
├── collections.js      Collections page logic
├── carousel.js         3D lookbook wheel
├── vercel.json         Vercel caching and security headers
└── assets/
    ├── logo.jpg, favicon.png
    ├── img/p/          Product photos
    ├── img/c/          Model-centred card crops
    ├── img/feel/       Face-aligned accordion crops
    └── video/          Twirl and studio clips; r/ holds one reel per product
```

## Troubleshooting

- **Videos don't play or show a black box** — open the site through a local server (see *Running Locally*), not as a `file://` page.
- **Changes don't show after deploying** — bump the `?v=` numbers in `index.html` and `collections.html`, then hard-refresh with `Ctrl + F5`.
- **The twirl video doesn't move on iPhone** — tap the page once; iOS only allows video scrubbing after a user gesture.
- **Animations feel off on a low-power device** — the site switches to a static version automatically when the device has *Reduce motion* turned on.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

In case of any queries, please leave a message or contact me via the email provided in my profile.

<p align="center">
⭐ <strong>Star this repository if you found it helpful!</strong>
</p>
