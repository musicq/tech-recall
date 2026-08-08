# Deploy to Cloudflare Pages

Recommended production domain: **`recall.liangkui.me`**.

## Cloudflare Pages

Connect this repository from **Workers & Pages → Create application → Pages → Import an existing Git repository**.

Use these settings:

| Setting | Value |
| --- | --- |
| Repository | `musicq/tech-recall` |
| Production branch | `main` |
| Framework preset | `VitePress` |
| Build command | `npm run docs:build` |
| Build output directory | `.vitepress/dist` |
| Node.js | `22` |

After the first deployment, every push to `main` will trigger a new production deployment. Pull requests can use Cloudflare preview deployments.

## Custom domain

After the Pages project is live:

1. Open the Pages project in Cloudflare.
2. Go to **Custom domains**.
3. Add `recall.liangkui.me`.
4. Follow the DNS prompt if Cloudflare asks for confirmation.

The VitePress sitemap is already configured for `https://recall.liangkui.me`.

## Local preview

```bash
npm install
npm run docs:dev
```

Production build:

```bash
npm run docs:build
npm run docs:preview
```
