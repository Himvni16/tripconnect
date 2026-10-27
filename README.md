# TripConnect — School Trip Interest

A small Next.js App Router + Supabase starter for collecting teacher's interest in three sample educational trips and reviewing submissions behind Supabase email/password login.


## Stack

- Next.js App Router, React, TypeScript
- Supabase Postgres + Supabase Auth (`@supabase/ssr`)
- Vercel deployment


## Run locally

1. Install Node.js 20+ and create a Supabase project.
2. In the Supabase SQL Editor, run [`supabase/schema.sql`](./supabase/schema.sql).
3. Enable email/password authentication in Supabase and create an admin user.
4. Copy .env.example to .env.local and configure the Supabase URL, publishable/anon key, server-side service role key (if required), and authorised admin email addresses.
5. Install dependencies and start the dev server:

   ```bash
   npm install
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000). Submit a sample interest, then open `/login` and sign in as the admin user to view `/admin`.

## What’s included

- Public page with Singapore STEM, Jaipur Heritage and London Universities sample trips.
- Teacher interest form with browser-side and server-side validation.
- Supabase storage for name, school, email, optional phone, trip and student count.
- Email/password login and admin submissions table with trip filter and student totals.


## What I Would Add Next

- Teacher confirmations: Send an email confirming that a trip interest has been submitted successfully.
- Better admin tools: Add search, date-range filters, and CSV export to make submissions easier to manage.
- Improved security: Introduce rate limiting and CAPTCHA to reduce spam submissions.
- Automated testing: Add tests for form validation, database submissions, and administrator access controls.


## AI tools used

ChatGPT: Assisted with the initial project structure, UI copy, form validation approach, Supabase SQL schema, and README drafting.

AI-generated code was reviewed and tested during development. I used AI as a development aid and take responsibility for understanding and verifying the implemented functionality.