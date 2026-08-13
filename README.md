# Dawson Landscaping & Maintenance — Static Website

Hand-authored, fully formatted static site. No build step, no framework — upload and go.

## 1. Folder structure

```
dawson-landscaping/
├── index.html            # Complete, indented, semantic HTML5 page
├── robots.txt
└── assets/
    ├── css/styles.css    # Commented stylesheet (brand tokens at the top)
    ├── js/main.js        # Header, nav, reveal, before/after slider, reviews, form
    └── img/
        ├── logo.png          # Brand tree mark (header + footer, real PNG)
        ├── favicon.png
        ├── hero-garden.jpg
        ├── before.jpg
        └── after.jpg
```

All asset paths are **relative** (`assets/img/logo.png`), so the site works at a domain
root, in a subfolder, or opened directly from disk.

## 2. Brand colour system

| Role                | Hex       | CSS variable |
| ------------------- | --------- | ------------ |
| Primary / Forest    | `#2C3B27` | `--forest`   |
| Accent / CTA Gold   | `#DDA220` | `--gold`     |
| Background Cream    | `#E6E4CE` | `--cream`    |
| Text Charcoal       | `#1A2418` | `--charcoal` |
| Card surface        | `#F2F0E2` | `--card`     |
| Muted text          | `#5A6455` | `--muted-text` |

Edit the values once in `:root` inside `assets/css/styles.css` — everything re-themes.

## 3. Typography & design concept

- **Font:** Montserrat (400–900) via Google Fonts, with a system-sans fallback stack.
- **Headings:** extra-bold, `letter-spacing: -0.02em`, `line-height: 1.1` — architectural and tight.
- **Concept:** cream studio canvas, deep forest structure, gold reserved exclusively for
  conversion actions. Generous negative space (`5rem` mobile / `9rem` desktop section padding),
  soft layered shadows, and subtle scroll reveal animations.

## 4. SEO & accessibility

- Semantic HTML5: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<footer>`.
- One `<h1>` (hero), `<h2>` per section, `<h3>` on service cards — clean heading hierarchy.
- Descriptive `alt` text on every image, `aria-label` on icon-only controls, `aria-live` form status.
- JSON-LD `LandscapingBusiness` structured data in `<head>` (name, phone, address, hours, rating).
- Canonical URL, Open Graph and Twitter card tags — update the domain in `index.html` before launch.
- `loading="lazy"` on below-the-fold images; explicit `width`/`height` to avoid layout shift.

## 5. Deployment

### cPanel / shared hosting
1. Zip contents (not the parent folder) or upload the folder via File Manager.
2. Extract into `public_html/` so `index.html` sits at the document root.
3. Visit your domain — done. No Node, PHP or database required.

### Apache
Static files work as-is. Optional caching in `.htaccess`:

```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/png  "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType text/css   "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
</IfModule>
```

### Nginx

```nginx
server {
  root /var/www/dawson-landscaping;
  index index.html;
  location / { try_files $uri $uri/ /index.html; }
}
```

## 6. Form wiring

`assets/js/main.js` section 6 currently simulates a submission. Replace the `setTimeout`
with a real POST to your handler, e.g.:

```js
fetch("/send-quote.php", { method: "POST", body: new FormData(form) });
```

## 7. WordPress migration notes

**Option A — static in a theme:** copy `assets/` into your theme folder, enqueue
`styles.css` and `main.js` from `functions.php` with `get_template_directory_uri()`, and
paste the `<main>` markup into `front-page.php`.

**Option B — page builder rebuild:** recreate the sections in Elementor/Gutenberg using the
hex codes above, Montserrat, and the same copy. Use a before/after slider widget for the
comparison block and Contact Form 7 / WPForms for the quote forms with the gold CTA styling.

Keep the JSON-LD block by pasting it into an SEO plugin's schema field (Rank Math / Yoast)
rather than duplicating it in the theme header.
