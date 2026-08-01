# Sunesa Football Club

Official website and content-management dashboard for Sunesa Football Club, a Bangalore District Football Association registered club established in 2012.

## What this repository contains

- Public club website with editable homepage sections
- News publishing with rich-text articles and thumbnails
- Categorised gallery management
- Configurable public forms and submission review
- Admin authentication backed by Supabase Auth
- Supabase Database and Storage integration
- Row Level Security policies for public and administrator access

## Technology

- React 19
- TypeScript
- TanStack Start and TanStack Router
- Vite 8
- Tailwind CSS 4
- Supabase Database, Auth and Storage
- TipTap rich-text editor
- Nitro deployment output for Vercel

## Local development

Requirements:

- Node.js 22 or newer
- npm
- Access to the Sunesa Supabase project

Clone the repository and install dependencies:

```sh
git clone https://github.com/xash-mind/sunesa-football-club.git
cd sunesa-football-club
npm ci
```

Copy the environment template:

```sh
cp .env.example .env
```

Set the public Supabase project URL and publishable key, then start the development server:

```sh
npm run dev
```

## Environment variables

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-or-anon-key
```

Only a Supabase publishable or legacy anonymous key belongs in the browser application. Never place a service-role key in a `VITE_*` variable.

## Commands

```sh
npm run dev        # Start local development
npm run build      # Create the production build
npm run start      # Run the built Nitro server
npm run preview    # Preview through Vite
npm run typecheck  # Check TypeScript
npm run lint       # Run ESLint
npm run format     # Format the repository
```

## Supabase

Database migrations are stored in `supabase/migrations`.

Administrator access is controlled through the authenticated user's app metadata:

```json
{
  "role": "admin"
}
```

The public website can read published content and active forms. Only authenticated administrators can manage content or mutate files in the public `media` Storage bucket.

## Deployment

The production site is deployed from the `main` branch through the existing Vercel project. Required Supabase environment variables must be configured for the Vercel Production and Preview environments.

Changes should be tested on a branch or preview deployment before merging into `main`.
