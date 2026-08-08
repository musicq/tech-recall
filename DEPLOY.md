# Deploy to Cloudflare Pages

Current production URL: **[https://tech-recall.pages.dev](https://tech-recall.pages.dev/)**.

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

The project is connected to `musicq/tech-recall`. Every push to `main` triggers a new production deployment, and pull requests can use Cloudflare preview deployments.

## Future custom domain

No custom domain is currently attached. If one is needed later:

1. Open the Pages project in Cloudflare.
2. Go to **Custom domains**.
3. Add the chosen hostname, such as `recall.liangkui.me`.
4. Follow the DNS prompt if Cloudflare asks for confirmation.

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
