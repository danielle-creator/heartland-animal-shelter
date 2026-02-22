# Heartland Animal Shelter

This repository contains the full source code for the Heartland Animal Shelter website, a modern, full-stack application built with React, TypeScript, TailwindCSS, and a Node.js backend.

---

## Live Site Access

There are two ways to view the live website:

### 1. Permanent Live URL (Recommended)

The permanent, 24/7 live version of this site is hosted on Render.com. To access it, you must first complete a one-time, free deployment by following the instructions in **[DEPLOYMENT.md](DEPLOYMENT.md)**.

> **Permanent URL:** [https://heartland-animal-shelter.onrender.com](https://heartland-animal-shelter.onrender.com)

### 2. Temporary Manus Preview

A temporary preview is available while this Manus session is active. This URL will stop working when the session ends.

> **Temporary URL:** https://3000-iabowpxuur5aqgea23wgp-46d224e4.us2.manus.computer/

---

## Features

*   **Full-Stack Application:** React frontend with a Node.js/Express/tRPC backend.
*   **No-Code Admin Panel:** A complete visual CMS to manage all site content without coding.
    *   Drag-and-drop page builder
    *   Animals manager (add, edit, delete pets)
    *   Site settings panel (nav, colors, contact info)
*   **Database:** Drizzle ORM with a MySQL/TiDB backend.
*   **Deployment:** Configured for permanent hosting on Render.com via `render.yaml`.

## Local Development

To run this project on your local machine:

```bash
# 1. Clone the repository
git clone https://github.com/danielle-creator/heartland-animal-shelter.git
cd heartland-animal-shelter

# 2. Install dependencies
npm install -g pnpm
pnpm install

# 3. Run the development server
pnpm dev
```

Then open **http://localhost:3000** in your browser.
