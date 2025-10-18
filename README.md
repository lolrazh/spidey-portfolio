This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Manage images with Netlify CMS

This project includes a Netlify-hosted content manager powered by [Decap CMS](https://decapcms.org/) so that non-technical collaborators can add or edit site imagery without touching code.

### One-time Netlify setup

1. Deploy this repository to Netlify (already done).
2. Enable **Netlify Identity** (Site settings → Identity → Enable Identity service).
3. Under **Identity → Services**, enable **Git Gateway**.
4. Invite yourself and any collaborators to the site from the Identity panel. They will receive an email to set a password.

### Using the media manager

1. Visit [`/admin`](https://your-site.netlify.app/admin) on the deployed site.
2. Log in with your Netlify Identity credentials.
3. Open the **Gallery** collection and edit the “Site Images” entry.
4. Use the file pickers to upload new images or replace existing ones. Files are stored in `public/uploads` and committed back to the repository automatically via Git Gateway.
5. Save your changes and click **Publish** to trigger a Netlify build. Drafts can be reviewed before publishing thanks to the editorial workflow.

### Image notes

- The hero, polaroid, and gallery sections all pull their data from [`src/content/gallery.json`](src/content/gallery.json).
- Each gallery item supports an optional dedicated lightbox image. Leave it blank to reuse the main image.
- The site uses standard `<img>` tags, so Next.js will optimize and cache the images at request time. For best performance upload images around 2000px on the long edge.

## Local development tips

When running the project locally you can also reach the CMS at [http://localhost:3000/admin](http://localhost:3000/admin). To log in locally, enable “External providers” → “GitHub” in Netlify Identity, or temporarily run `npx decap-server` for offline editing.
