# Heartland Animal Shelter — Deployment Guide

This guide explains how to deploy the Heartland Animal Shelter website as a **permanent, live public URL** using [Render.com](https://render.com) — a free hosting platform that connects directly to your GitHub repository. Once set up, every time you push a change to GitHub, the live site updates automatically.

---

## Why Render.com?

This site is a full-stack application (React frontend + Node.js/Express backend). It cannot be hosted on GitHub Pages alone, which only supports static HTML files. Render.com's free tier supports full Node.js applications and connects directly to GitHub for automatic deployments.

---

## One-Time Setup: Deploy to Render.com

Follow these steps **once**. After setup, the site runs permanently without needing Manus.

### Step 1 — Create a Render Account

1. Go to [https://render.com](https://render.com) and click **Get Started for Free**.
2. Sign up using your **GitHub account** (recommended — this links your repos automatically).

### Step 2 — Create a New Web Service

1. From your Render dashboard, click **New +** → **Web Service**.
2. Under **Connect a repository**, select **`danielle-creator/heartland-animal-shelter`**.
   - If you don't see it, click **Configure account** to grant Render access to your GitHub repos.
3. Click **Connect**.

### Step 3 — Configure the Service

Fill in the settings exactly as shown below:

| Setting | Value |
|---|---|
| **Name** | `heartland-animal-shelter` (or any name you like) |
| **Region** | US East (Ohio) — or whichever is closest to you |
| **Branch** | `main` |
| **Runtime** | `Node` |
| **Build Command** | `pnpm install && pnpm build` |
| **Start Command** | `node dist/index.js` |
| **Instance Type** | **Free** |

### Step 4 — Add Environment Variables

Scroll down to the **Environment Variables** section and add the following:

| Key | Value |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `JWT_SECRET` | *(click "Generate" to auto-create a secure random value)* |
| `VITE_APP_ID` | `heartland-animal-shelter` |

> **Optional (for full features):** If you want user login and a real database, you will also need `DATABASE_URL` (from a free [PlanetScale](https://planetscale.com) or [Neon](https://neon.tech) MySQL/Postgres database) and `VITE_OAUTH_PORTAL_URL` (from [Manus OAuth](https://auth.manus.im)).

### Step 5 — Deploy

Click **Create Web Service**. Render will:
1. Clone your GitHub repository.
2. Run `pnpm install && pnpm build` to build the site.
3. Start the server with `node dist/index.js`.

The first deploy takes about **3–5 minutes**. Once complete, Render gives you a permanent URL like:

```
https://heartland-animal-shelter.onrender.com
```

---

## After Deployment

### Viewing the Live Site
Navigate to your Render URL (e.g., `https://heartland-animal-shelter.onrender.com`) in any browser.

### Accessing the Admin Panel
Add `/admin` to the end of your URL:
```
https://heartland-animal-shelter.onrender.com/admin
```

### Automatic Redeployment
Every time you push a commit to the `main` branch on GitHub, Render automatically rebuilds and redeploys the site within a few minutes. No manual action is needed.

### Free Tier Note
On Render's free tier, the server **spins down after 15 minutes of inactivity**. The first visit after a period of inactivity may take **20–30 seconds** to load while the server wakes up. Subsequent visits are instant. To avoid this, upgrade to Render's Starter plan ($7/month).

---

## Updating the Site Content

You do **not** need to redeploy to update content. Use the built-in admin panel:

1. Go to `https://[your-render-url].onrender.com/admin`
2. Use the **Page Builder**, **Animals**, **News & Events**, or **Site Settings** tabs to make changes.
3. Changes are saved instantly to the database — no rebuild required.

---

## Troubleshooting

| Problem | Solution |
|---|---|
| Build fails on Render | Check the Render logs. Most common cause: missing environment variable. |
| Site loads but admin shows "Access Restricted" | You need a database (`DATABASE_URL`) set up for user authentication in production. |
| Images not uploading | Add `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_S3_BUCKET` env vars for S3 storage, or images will save locally (lost on redeploy). |
| Site is slow on first load | Expected on the free tier — the server wakes up after inactivity. |

---

## Summary of All Repository Files

| File | Purpose |
|---|---|
| `render.yaml` | Render.com deployment configuration (auto-detected) |
| `package.json` | Build (`pnpm build`) and start (`node dist/index.js`) scripts |
| `vite.config.ts` | Frontend build config — outputs to `dist/public` |
| `server/_core/index.ts` | Express server entry point — serves API + static frontend |
| `Heartland_CMS_User_Guide.md` | How to use the no-code admin panel |
| `DEPLOYMENT.md` | This file — how to deploy permanently |
