# Fahmi Dinsefa Jemal — Portfolio

Personal portfolio site.

## Setup

```bash
npm install
cp .env.example .env
# Fill in Firebase and Gemini keys in .env
npm run dev
```

Get Firebase values from [Firebase Console](https://console.firebase.google.com/) → Project settings → Your apps.

The AI chat widget calls `functions/api/chat.ts`, a Cloudflare Pages Function that
reads `GEMINI_API_KEY` server-side — `npm run dev` doesn't run Pages Functions, so
the widget won't get real replies locally. To test it, run:

```bash
npm run build
npx wrangler pages dev dist
```
