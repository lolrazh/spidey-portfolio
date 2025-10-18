This project uses [Next.js](https://nextjs.org) with the App Router and Tailwind CSS.

## Managing images (Netlify CMS)

The site ships with a friendly content manager powered by [Netlify CMS (Decap CMS)](https://decapcms.org/). Non-technical editors can log in at `/admin` and update the hero, polaroids, and masonry gallery without touching code.

### One-time Netlify setup

1. In your Netlify site dashboard, enable **Identity**.
2. Invite anyone who should manage images (they will confirm via email).
3. In **Identity → Services**, enable **Git Gateway** so the CMS can commit changes back to the repository.

### Uploading & organizing photos

1. Visit `https://<your-site>/admin` and log in with the Netlify Identity account.
2. Open the **Gallery** entry.
3. Use the **Images** list to upload new photos, set their accessibility-friendly alt text, and choose whether they appear in the main gallery (leave hero/polaroid images unchecked to hide duplicates).
4. Drag items by the handle on the left to reorder how they appear on the page.
5. Select the **Hero Image** and **Polaroid Image** fields to control the primary photos in the about section and lightbox button.
6. Click **Publish**. The CMS commits your updates to the repo, triggering a fresh Netlify build.

During each build, the `npm run build` script runs `scripts/optimize-images.mjs` to regenerate the responsive `public/optimized-images` assets used by the front-end.

### Editing locally

Content editors working in code can modify `src/content/gallery.json` directly. Run `npm run build` (or `npm run dev` for live reloading) to regenerate optimized image assets.

## Getting Started (development)

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to preview the site. Changes to files inside `src` hot-reload automatically.
