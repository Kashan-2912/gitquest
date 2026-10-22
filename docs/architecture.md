# GitQuest Architecture

## How a summon works
1. A visitor enters a GitHub username or profile URL on the home page
   or the `/summon` page (`components/forms/github-form.tsx`).
2. The server fetches that profile's contribution count from GitHub.
3. `server/ai.ts` asks Google Gemini 2.5 Flash Image for a D&D-style
   creature; the contribution count sets its tier (CR 0 to CR 20+).
4. The image is stored in Vercel Blob and the record is saved with
   Drizzle ORM to Neon PostgreSQL (`db/schema.ts`, table `creatures`).
5. The creature is shown on its card, the leaderboard (`/leaderboard`),
   and the profile page (`/[username]`).

## Main parts
- `app/` - Next.js 16 App Router pages and API routes.
  `app/api/widget/[username]` serves the README widget SVG and
  `app/api/tagline` serves the animated tagline SVG.
- `components/` - UI. `creature-card.tsx` is the main display card;
  `components/ui/` holds the shared Radix-based pieces.
- `server/` - Server actions: `ai.ts` (Gemini) and `creatures.ts` (data).
- `db/` - Drizzle client and schema.
- `lib/` - Shared helpers (`cn` class-name helper).

## Data
One table, `creatures`: id, GitHub profile URL, description, image URL,
contribution count, created / updated times.
