# Bar On Hands — Scroll-Driven 12-Year Reserve Experience & Storefront

A complete recreation of [Bar On Hands](https://sanidhyavardhansin.wixsite.com/baronhands) integrated with the scroll-driven 3D animation from your uploaded reference video (`Whiskey_bottle_product_animation_1080p_20261024133732.mp4`).

## Included Assets (Zero External Placeholders Needed for the Hero Sequence)
- `public/assets/whiskey_bottle_animation_1080p.mp4`: Your original 1080p 24fps reference video.
- `public/assets/frames/frame_001.webp` ... `frame_060.webp`: 60 WebP frames extracted directly from your reference video for ultra-smooth, zero-lag HTML5 `<canvas>` + GSAP `ScrollTrigger` scrubbing forward and backward.
- `public/assets/images/`: High-resolution WebP studio imagery for the Bar On Hands 12-Year bottle, luxury hookah promo, and backlit bar shelves.

## Local Development
```bash
npm install
npm run dev
```

## Deploying to Vercel
1. Push this directory to a GitHub/GitLab repository, OR run the Vercel CLI directly:
   ```bash
   npx vercel
   ```
2. `vercel.json` is pre-configured with `"framework": "vite"`, `"buildCommand": "npm run build"`, and `"outputDirectory": "dist"`.
