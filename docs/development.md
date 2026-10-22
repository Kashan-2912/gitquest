# Development Guide

## Needs
- Node.js 20 (see `.nvmrc`; run `nvm use` if you use nvm)
- Your own keys for Gemini, Neon, and Vercel Blob

## Start
```bash
npm install
cp .env.example .env.local   # then fill in your keys
npx drizzle-kit push
npm run dev
```

## Checks before a pull request
```bash
npm run lint
npm run build
```

## Notes
- Never commit `.env.local` or a real key.
- Keep one change per pull request and fill in the PR template.
