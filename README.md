
# Suit Up Invitation (React + Vite)

A tiny animated, route-driven invitation that mimics your provided design.

## Quick Start

```bash
pnpm i   # or: npm i  OR  yarn
pnpm dev # or: npm run dev
```

Open http://localhost:5173 and visit a whitelisted name, e.g.:
- `/joshua`
- `/mike`
- `/andre`

To change the allowed names, edit the `ALLOWED` set in `src/pages/Invite.tsx`.

## Stack

- React 18 + Vite 5
- React Router 6 (route param for the name)
- Framer Motion (subtle entrance & bowtie wiggle)
- Google Fonts (Playfair Display for the big title, Manrope for small text)

The layout uses plain CSS (no Tailwind needed) to keep this ultra-simple.

## Deploy

Build with:

```bash
pnpm build   # or npm run build
```

Then serve the `dist/` folder using any static host.
