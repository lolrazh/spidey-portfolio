# Spidey Portfolio

A Next.js portfolio for Spidey with an image gallery that can now be managed entirely through Netlify CMS.

## Development

```bash
npm install
npm run dev
```

The project runs on [http://localhost:3000](http://localhost:3000). Builds automatically optimise uploaded images before running the Next.js build via the `npm run build` script.

## Managing images (no-code workflow)

1. Deploy the site to Netlify and enable **Netlify Identity** with email invites for editors.
2. Under Identity → Services, enable **Git Gateway** so the CMS can commit content changes.
3. Invite your editors. They can open `https://your-site.netlify.app/admin` to log in and manage content.
4. Inside the CMS they can:
   - Update the hero image and its alt text.
   - Add, remove, and reorder polaroids.
   - Add, remove, and reorder gallery images.
   - Upload new images – they are stored in `public/uploads/` and optimised automatically during the next build.
5. Publish the changes. Netlify will run a new build, execute the optimisation script, and deploy the updated gallery.

## Manual edits (optional)

- Image metadata lives in `src/content/gallery.json`. The UI reads from this file, so changes there instantly update the gallery order and alt text.
- Original images are stored in `public/uploads/`. The optimisation script outputs responsive `webp` and `avif` files into `public/optimized-images/` that are used at runtime.

## Commands

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Optimise images and create a production build. |

## Deployment notes

- The repository includes `public/admin/index.html` and `config.yml`, which enable Netlify CMS at `/admin`.
- Ensure that the Netlify build command uses `npm run build` (or `bun run build` if you prefer Bun) so that image optimisation runs before the Next.js build step.
