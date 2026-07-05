# Foxy — landing page

Marketing one-pager for the Foxy math app, built with Next.js and Tailwind CSS.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment

Set the required keys in `.env.local` (see the comments there):

- `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, `RESEND_NOTIFY_TO` — subscribe form (stores signups in a Resend audience and emails a notification).
- `NOTION_TOKEN`, `NOTION_DATABASE_ID` — optional CMS for editable page copy. See [NOTION.md](NOTION.md).

The same variables must also be set in the hosting provider (e.g. Vercel → Settings → Environment Variables).

## Content

All page copy is editable in Notion when configured — see **[NOTION.md](NOTION.md)**. Edits appear within ~30s, or instantly via `POST /api/revalidate`. Without Notion, the built-in default copy is used.
