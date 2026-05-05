# Trust-IT (BD) Ltd — Corporate Landing Page

## Project Overview

A fully responsive, production-grade corporate landing page for Trust-IT (BD) Ltd, an IT services company based in Uttara, Dhaka, Bangladesh. Built as part of a Junior Frontend Developer application.

The design uses — dark mode default with a light mode toggle — featuring animated orbs, a CSS grid background, monospace typography accents, and smooth scroll-reveal animations.

---

## Technologies Used

| Layer     | Technology                               |
| --------- | ---------------------------------------- |
| Markup    | HTML5 (semantic)                         |
| Styling   | CSS3 (custom, no framework)              |
| Scripting | Vanilla JavaScript (ES6+)                |
| Icons     | Font Awesome 6.5                         |
| Fonts     | Google Fonts (Syne, Space Mono, DM Sans) |

## Features

### Core Requirements

- **Hero Section** — Company name, heading, description, CTA, animated stats counter
- **Services Section** — 6 service cards with icons, titles, descriptions, and feature lists
- **About Section** — Company intro with animated terminal illustration and floating badges
- **Contact Form** — Name, email, phone, service selector, message; full JS validation with inline error messages
- **Responsive Navbar** — Desktop nav with active state tracking, hamburger menu for mobile

### Bonus Features

- Dark/Light Mode Toggle — Persisted to `localStorage`
- Smooth Scrolling
- Scroll Reveal Animations
- Back-to-Top Button — Appears after 400px scroll
- SEO-Friendly Structure — Semantic HTML5, meta tags, alt text, ARIA labels
- Accessibility— ARIA roles, `aria-live` regions for form errors, focus-visible styles, reduced-motion support

---

## Project Structure

```
trust-it-bd lmtd/
├── index.html          # Main homepage (entry point)
├──  styles.css      # All styles (CSS variables, responsive, animations)
├── script.js       # All interactivity (navbar, theme, form, counters)
├── images/             # Place logo/visual assets here
│
└── README.md           # This file
```

---

## How to Run

### Option 1 — Open Directly

Simply open `index.html` in any modern browser. No build step or server required.

### Option 2 — Local Dev Server (recommended)

```bash
# Using VS Code Live Server extension (recommended)
# Right-click index.html → "Open with Live Server"



## Customization

- Colors & Theme**: Edit CSS variables in `:root` and `[data-theme="light"]` blocks in `styles.css`
- Company Details- Update text content in `index.html`
- Services: Add/remove `.service-card` article blocks in the services section
- Form Submission: Replace `simulateApiCall()` in `script.js` with a real API endpoint (e.g., Formspree, EmailJS, or a custom backend)

---

## Author

Developed for Trust-IT (BD) Ltd
Position: Junior Frontend Developer
Location: Uttara, Dhaka, Bangladesh
```
