# ORVIAN SAAS — CMS DASHBOARD · UI/UX Design Brief

> Implemented in code under `/admin` (dark mode, Orvian style). This document
> captures the brief and how it maps to the build.

## 01. Product Overview
Orvian SaaS is a SaaS website for task/project management. The CMS Dashboard is a
private admin interface used by administrators to manage the public website's Blog
content. It is not for SaaS end-users and is only accessible after admin login.

**Primary goal** — a CMS that is fast to use, easy to understand, has a clear
publishing workflow, stays consistent with the Orvian brand, lets admins see the
status of all articles quickly, and minimizes publish/delete mistakes.

**Primary user** — Admin / Content Manager: create, edit, draft, publish, delete
articles; manage categories, tags, thumbnails, SEO metadata; preview before publish.

## 02. Design Direction
Modern, minimal, clean, SaaS-oriented, professional, calm, functional, spacious.
**Content first** — the article and editing flow is the focus. Visual hierarchy:
Page title → Primary action → Content → Status → Secondary metadata → Admin actions.

## 03. Application Structure
```
/admin
├── /login (→ /login, shared with public)
├── (dashboard)   → /admin
├── /blog         → list
│   ├── /new      → create
│   └── /[slug]/edit → edit
├── /categories
├── /media
└── /settings
```
Sidebar groups: MAIN (Dashboard, Blog Posts), CONTENT (Categories, Media),
SYSTEM (Settings). Bottom: admin profile + logout.

## 04–05. Layout
- Sidebar 260px: brand `Orvian` + `CMS` badge, grouped nav, active item uses subtle
  background + accent, bottom profile/logout.
- Topbar 64px: breadcrumb + page title (left), admin avatar + email (right), mobile
  menu button.

## 06. Login
Route `/login`. Centered card, split layout with brand panel. Email + password
(Supabase Auth). States: default, focus ring, loading (`Signing in…`), inline error.

## 07. Dashboard
Header `Dashboard` + `Overview of your blog content.` KPI cards: Total Posts,
Published, Drafts, Categories. Recent Posts table (Article, Category, Status,
Updated, Edit) + `View All`. Empty state when no posts.

## 08–09. Blog Posts
Header + `+ New Post`. Toolbar: search, status filter (All / Published / Draft).
Table: Thumbnail (64×40), Title + slug, Category, Status badge, Updated, Actions
(Preview, Edit, Delete). Empty states: no posts (Create / Seed), no results (Clear
Filters). Count line `Showing N of M posts`.

## 10–19. Editor (Create / Edit)
Two-column layout. Header: Back to Posts, Save Draft (secondary), Publish (primary),
Delete (edit only).
- Left: Title (large), Slug (auto from title, editable, `/blog/…`), Excerpt,
  Content (toolbar: heading, bullet; markdown-style textarea, min 440px).
- Right: Featured Image (upload / preview / replace / remove), Category select,
  Tags (chips, Enter to add), Status (Draft / Published), Read time, SEO accordion
  (Meta Title 0/60, Meta Description 0/160).

## 20–24. Edit / Confirmations
Edit shows current status. Unsaved-changes guard (beforeunload + confirm on Back).
Publish confirmation modal. Delete confirmation modal (destructive styling).

## 25–28. Categories / Media / Settings
- Categories: table (Name, Slug, Posts). Fixed to the public blog filters
  (Business, Analytics, Management) with live post counts.
- Media Library: grid of cover images used across posts, copy URL.
- Settings: Profile (name, email), Account (auth, logout), Blog defaults.

## 29. Responsive
Desktop (≥1200): full sidebar + 2-col editor. Tablet: collapsible sidebar. Mobile
(<768): sidebar becomes a drawer; editor collapses to a single column.

## 30–41. System
Reusable components (sidebar, topbar, buttons, inputs, select, status badge,
image uploader, tag input, data table, toast, modal, confirm dialog, empty state,
loading skeletons). Consistent status semantics (Draft neutral, Published success,
never color-only). Toasts top-right, auto-dismiss. Typography reuses Orvian
(STIX Two Text for titles, Inter/Geist for UI). 8px spacing grid. Moderate radii
(input/button 8–12px, card 12px, modal 16px). Accessibility: keyboard nav, focus
rings, aria-labels, focus-trapped modals.

## 42–44. UX Priority & Outcome
Prioritize **Create, Edit, Publish**. Admin should open the CMS, understand the
blog's state in seconds, and create/edit/preview/publish with minimal steps — a
modern SaaS CMS that feels part of the Orvian ecosystem, not a generic template.
