# Heartland Animal Shelter

A modern, full-stack website for Heartland Animal Shelter (Wheeling, IL) featuring a no-code admin CMS, adoptable animal listings, donation tools, volunteer/foster sign-ups, and more.

---

## How to View the Live Site

### Permanent URL (24/7, no Manus required)

> **Live Site:** [https://heartland-animal-shelter.onrender.com](https://heartland-animal-shelter.onrender.com)

This is the permanent address for the site. It is hosted on Render.com and stays live around the clock. To activate it for the first time, follow the one-time, free setup in **[DEPLOYMENT.md](./DEPLOYMENT.md)** — it takes about 10 minutes.

Once deployed:
- The site is always available at the URL above.
- Every time you push a change to GitHub, the site **automatically updates**.
- The admin panel is always at **https://heartland-animal-shelter.onrender.com/admin**.

### Run Locally on Your Computer

If you prefer to preview the site on your own machine without deploying:

```bash
# 1. Clone the repository
git clone https://github.com/danielle-creator/heartland-animal-shelter.git
cd heartland-animal-shelter

# 2. Install dependencies
npm install -g pnpm
pnpm install

# 3. Start the development server
pnpm dev
```

Then open your browser and go to: **http://localhost:3000**

The admin panel is at: **http://localhost:3000/admin**

---

## Pages

| Page | URL | Description |
|---|---|---|
| Home | `/` | Hero slider, featured animals, impact stats, foster CTA |
| Adopt | `/adopt` | Browse adoptable animals, fees, FAQ |
| Get Involved | `/get-involved` | Volunteer, wishlist, community programs |
| Foster | `/foster` | Foster program info and sign-up |
| Donate | `/donate` | Donation widget, impact stats, monthly giving |
| About | `/about` | Mission, history, staff, strategic plan |
| News & Events | `/news` | News articles and upcoming events |
| Resources | `/resources` | Lost & found, surrender, community programs |
| Shop | `/shop` | Merchandise |
| **Admin** | `/admin` | No-code CMS dashboard |

---

## Admin Panel (No-Code CMS)

The site includes a built-in admin panel at `/admin`. No coding required to:

- **Page Builder** — Drag and drop sections, change layouts, edit text, upload photos, adjust colors
- **Animals Manager** — Add/edit/delete adoptable animal profiles with photos
- **News & Events** — Create and publish news posts and events
- **Site Settings** — Update logo, contact info, social links, navigation, and brand colors

See [Heartland_CMS_User_Guide.md](./Heartland_CMS_User_Guide.md) for full instructions.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, TailwindCSS, Vite |
| Backend | Node.js, Express, tRPC |
| Database | MySQL / TiDB (via Drizzle ORM) |
| Auth | Manus OAuth |
| Hosting | Render.com (free tier) |
| Package Manager | pnpm |

---

## Repository Files

| File | Purpose |
|---|---|
| `README.md` | This file |
| `DEPLOYMENT.md` | Step-by-step guide to deploy on Render.com |
| `Heartland_CMS_User_Guide.md` | How to use the no-code admin panel |
| `render.yaml` | Render.com deployment configuration |
| `package.json` | Scripts: `pnpm dev`, `pnpm build`, `pnpm start` |
| `client/` | React frontend source code |
| `server/` | Express + tRPC backend source code |
| `drizzle/` | Database schema and migrations |
| `shared/` | Shared types and constants |

---

*Built with [Manus AI](https://manus.im)*
