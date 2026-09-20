# Orvian — Task Management Landing Site

A pixel-faithful, fully responsive implementation of the **Orvian Task Management** Figma design, built as a production-ready website and optimized for deployment on **Vercel**.

Built from the Figma source: layout, typography, color, spacing, imagery and responsive behaviour were extracted directly from the design (design tokens, component structure and mobile layouts) and rebuilt as real, animated components.

## ✨ Highlights

- **Pages**: Home, Features (Product), Blog, Blog Detail
- **Navigation**: desktop **mega menu** (hover) + full **mobile menu** drawer with an expandable Product section
- **Design system from Figma tokens**
  - Display serif: **STIX Two Text** (H1 / H2 / H3)
  - UI/body: **Geist**
  - Dark palette (`#0c0c0f` / `#17171a`), pale-cyan primary, glassmorphism, exact chart colors
- **Recreated product UI in CSS/SVG** (not screenshots): the hero dashboard, animated bar / line / donut / activity charts, task lists, pricing, testimonials
- **Smooth animations** with Framer Motion: scroll reveals, staggered grids, animated charts, marquees, mega-menu & mobile-menu transitions — all respecting `prefers-reduced-motion`
- **Responsive** and verified at Desktop, Tablet and **Mobile (390px)** — following the Figma mobile layouts (not just a shrunk desktop)

## 🛠 Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [lucide-react](https://lucide.dev/) icons
- `next/image` for optimized imagery

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm run start
```

## ▲ Deploy to Vercel

1. Push this repo to GitHub / GitLab / Bitbucket.
2. Import the project in [Vercel](https://vercel.com/new) — the framework (Next.js) is auto-detected; no extra configuration is required.
3. Deploy.

Or with the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## 📁 Structure

```
app/
  layout.tsx            # fonts, metadata, Navbar + Footer shell
  page.tsx              # Home
  features/page.tsx     # Features (Product)
  blog/page.tsx         # Blog listing (filter + search)
  blog/[slug]/page.tsx  # Blog detail (SSG)
components/
  navbar.tsx            # nav + mega menu + mobile menu
  footer.tsx
  dashboard/            # hero dashboard + animated charts
  sections/             # hero, steps, showcase, pricing, testimonials, cta...
  blog/                 # blog card + list
lib/
  site.ts               # nav, pricing, testimonials, footer data
  blog.ts               # blog posts + content
public/images/          # optimized imagery
```

## 🖼 Imagery

Photographic assets (hero landscapes, blog photos, avatars) are sourced from [Unsplash](https://unsplash.com/) to match the Figma scenes. All product/dashboard UI is recreated in code for crispness and animation.
