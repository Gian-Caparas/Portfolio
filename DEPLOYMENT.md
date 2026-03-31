# 🚀 Portfolio — Vercel Deployment Guide

## 📁 Folder Structure

```
portfolio/                        ← Root of your repo (push this to GitHub)
├── index.html                    ← Main entry point
├── resume.pdf                    ← Downloadable CV
├── assets/
│   ├── css/
│   │   └── styles.css            ← All styles
│   ├── js/
│   │   └── script.js             ← All JavaScript
│   └── images/
│       ├── profile.jpg           ← Your hero photo (rename from image1.jpg)
│       ├── tools/                ← Tech stack icons
│       │   ├── html.png
│       │   ├── css.png
│       │   ├── javascript.png
│       │   ├── figma.png
│       │   ├── c++.png
│       │   ├── php.png
│       │   ├── photoshop.png
│       │   ├── python.png
│       │   ├── react.png
│       │   ├── adobe.png
│       │   ├── angular.png
│       │   └── java.png
│       ├── social/               ← Social media icons (optional, SVGs used inline)
│       │   ├── facebook.png
│       │   ├── instagram.png
│       │   ├── linkedin.png
│       │   └── github.png
│       └── projects/             ← Add your project screenshots here
│           ├── zenith-devs.jpg
│           ├── oltk-analyzer.jpg
│           ├── journeya.jpg
│           └── aicon.jpg
└── DEPLOYMENT.md                 ← This file
```

---

## ⚡ Deploy to Vercel (Step-by-Step)

### Option A — Deploy from GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "initial portfolio"
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com) → Sign in with GitHub
   - Click **"Add New Project"**
   - Select your `portfolio` repository
   - Framework Preset: **Other** (static site — no build needed)
   - Root Directory: leave as `/` (default)
   - Click **Deploy**

3. **Done!** Vercel auto-detects `index.html` as the entry point ✓

---

### Option B — Deploy via Vercel CLI

```bash
npm install -g vercel
cd portfolio
vercel
# Follow the prompts — choose "Other" for framework
```

---

## 🖼️ Adding Project Screenshots

Replace the placeholder cards in your projects section by:

1. Adding your screenshots to `assets/images/projects/`
2. In `index.html`, replace the `.project-placeholder` div with:

```html
<div class="project-img-wrap">
  <img src="assets/images/projects/zenith-devs.jpg" 
       alt="Zenith Devs" 
       style="width:100%; height:100%; object-fit:cover;" />
  <div class="project-overlay">
    <a href="YOUR_LIVE_URL" target="_blank" class="overlay-btn">View Case Study ↗</a>
  </div>
</div>
```

---

## 🎨 Customization Cheatsheet

| What to Change | Where |
|---|---|
| Name, bio, links | `index.html` — search for "Gian" |
| Colors / accent | `assets/css/styles.css` → `:root` variables |
| Fonts | `index.html` → Google Fonts `<link>` + CSS `--font-display` |
| EmailJS service | `index.html` + `assets/js/script.js` |
| Hero photo | Replace `assets/images/profile.jpg` |

---

## 🔑 Key CSS Variables

```css
:root {
  --accent: #d4ff00;        /* Change to any color for full theme shift */
  --bg: #080808;            /* Main background */
  --font-display: 'Syne';   /* Heading font */
  --font-body: 'DM Sans';   /* Body font */
}
```

---

## 📌 Vercel Custom Domain

After deploying:
1. Vercel Dashboard → Your Project → **Settings → Domains**
2. Add your custom domain (e.g., `giancaparas.dev`)
3. Update DNS records as instructed

---

## ✅ Pre-Launch Checklist

- [ ] Replace `profile.jpg` with your actual photo
- [ ] Update project links in `index.html` (search `href="#"`)
- [ ] Add real project screenshots to `assets/images/projects/`
- [ ] Verify EmailJS service ID & template ID in `script.js`
- [ ] Test contact form
- [ ] Test on mobile
- [ ] Add `<meta>` OG tags for social sharing (optional)
