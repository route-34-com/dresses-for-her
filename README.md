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

Real try-on reels play in the hero, a scroll-scrubbed video lets visitors "twirl" an outfit frame by frame, and every product opens in a full quick view with its own video before going into a bag that sends the order straight to Instagram DM.

   🎬 **GSAP + ScrollTrigger + Flip** drive the scroll scenes, reveals, filters and quick-view transitions

   🧈 **Lenis** provides buttery smooth scrolling across the whole page

   🎠 A custom **3D cylinder carousel** powers the lookbook (drag, tap-to-pause, momentum and snap)

   ⚡ No build step — plain HTML, CSS and JavaScript, deployed as a static site on **Vercel**

> **Note:** Product names, prices and descriptions are **placeholder content** written from the brand's Instagram photos. Confirm them with the client before going live.

## Features

- **Logo preloader** in the brand's deep green and gold, gone in about 1.5 seconds
- **Floating header bar** with logo, section links, light / dark switch and bag
- **Light / dark mode** switch in the header (remembers the visitor's choice)
- **Hero** with three real try-on reels, staggered parallax and a split-line headline
- **Why shop with us** strip: pan-India dispatch, made in Tamil Nadu, Instagram ordering, XS–XXL sizes
- **Scroll to twirl** — the page pins and scroll scrubs a reel frame by frame, with fabric callouts
- **Shop** of 20 products filterable by **Kurthi sets / Maxis / Co-ords** with smooth Flip re-layout
- **Quick view** that morphs out of the product card, plays the try-on video and picks a size
- **Bag** drawer with quantity controls; remembers items between visits
- **Order via Instagram DM** — the bag is copied as a ready-to-paste message and the brand's DM opens
- **3D lookbook carousel** — auto-spins, tap to pause, tap again to play, drag with momentum
- **Ordering is easy** section with the studio sewing clip and a four-step how-to-order guide
- Count-up stats, Instagram grid linking to the real posts, gold wordmark footer
- Fully responsive with 2-column shop on phones, respects `prefers-reduced-motion`

## Live Site

**https://dresses-for-her.vercel.app**

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

> **Cache busting:** `styles.css`, `script.js` and `carousel.js` are cached for a year. After editing any of them, bump the `?v=` number on its `<link>` / `<script>` tag in `index.html` so visitors get the new file.

## Customizing the Site

| What to change | Where |
|---|---|
| Products — names, prices, categories, descriptions, tags, videos | `PRODUCTS` array at the top of `script.js` |
| Lookbook carousel photos | `LOOKS` array in `script.js` |
| Instagram grid photos and post links | `POSTS` array in `script.js` |
| Carousel speed, size, tilt, pause behaviour | options passed to `new CircularCarousel(...)` in `script.js` |
| Headline, tagline, why-shop strip, order steps, stats, footer links | `index.html` |
| Colours (light and dark themes), fonts, spacing | CSS variables at the top and bottom of `styles.css` |
| Logo and tab icon | `assets/logo.jpg`, `assets/favicon.png` |
| Product photos | `assets/img/p/<product-id>-1.jpg` and `-2.jpg` (900 × 1200, 3:4) |
| Videos | `assets/video/` (muted, 540p H.264, `faststart`) |

## Project Structure

```
├── index.html          Page markup and sections
├── styles.css          All styles, light and dark themes
├── script.js           Products, shop, quick view, bag, scroll animations
├── carousel.js         3D cylinder lookbook carousel
├── vercel.json         Vercel caching and security headers
└── assets/
    ├── logo.jpg, favicon.png
    ├── img/p/          Product photos
    └── video/          Hero, twirl, try-on and studio clips
```

## Troubleshooting

- **Videos don't play or show a black box** — open the site through a local server (see *Running Locally*), not as a `file://` page.
- **Changes don't show after deploying** — bump the `?v=` number for the edited CSS/JS file in `index.html`, then hard-refresh with `Ctrl + F5`.
- **The twirl video doesn't move on iPhone** — tap the page once; iOS only allows video scrubbing after a user gesture.
- **Animations feel off on a low-power device** — the site switches to a static version automatically when the device has *Reduce motion* turned on.
