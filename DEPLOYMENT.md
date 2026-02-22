# Deploying to Render.com

This guide will walk you through deploying the `heartland-animal-shelter` project to Render.com for a permanent, live URL. Once deployed, the site will be available at:

**https://heartland-animal-shelter.onrender.com**

---

## 5-Step Deployment

**1. Go to [render.com](https://render.com) and sign up with your GitHub account.**

**2. Click New + → Web Service → connect `danielle-creator/heartland-animal-shelter`.**

**3. Set these values:**

| Setting | Value |
|---|---|
| Build Command | `pnpm install && pnpm build` |
| Start Command | `node dist/index.js` |
| Instance Type | **Free** |

**4. Add these environment variables:**

| Key | Value |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `JWT_SECRET` | *(click Generate)* |
| `VITE_APP_ID` | `heartland-animal-shelter` |

**5. Click Create Web Service.** In 3–5 minutes your site will be live at a permanent URL like `https://heartland-animal-shelter.onrender.com`.

---

**Key points to know:**
- Every time you push a change to GitHub, the site **automatically redeploys** — no manual action needed.
- The admin panel is always at `[your-url]/admin`.
- On the free tier, the server sleeps after 15 minutes of inactivity and takes ~20 seconds to wake up on the first visit. This is normal.
