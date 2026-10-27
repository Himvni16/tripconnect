-- Run this in Supabase SQL Editor.
create table if not exists public.trip_interests (
  id uuid primary key default gen_random_uuid(),
  teacher_name text not null check (char_length(trim(teacher_name)) between 2 and 100),
  school_name text not null check (char_length(trim(school_name)) between 2 and 160),
  email text not null check (char_length(email) <= 254),
  phone text,
  trip_id text not null check (trip_id in ('singapore-stem', 'jaipur-heritage', 'london-universities')),
  student_count integer not null check (student_count between 1 and 10000),
  created_at timestamptz not null default now()
);
create index if not exists trip_interests_trip_id_idx on public.trip_interests (trip_id);
create index if not exists trip_interests_created_at_idx on public.trip_interests (created_at desc);

-- Keep all table access private. Public submissions go through the validated server API;
-- the server uses the user's anon key, so INSERT is intentionally performed by the API's
-- database role only if a suitable policy is added. Recommended safer setup: use a Supabase
-- Edge Function or a server-only service-role key for inserts. This starter instead uses an
-- anon client; enable the INSERT policy below for anonymous submissions and never enable SELECT.
alter table public.trip_interests enable row level security;
drop policy if exists "Public can submit trip interest" on public.trip_interests;
create policy "Public can submit trip interest" on public.trip_interests
  for insert to anon, authenticated with check (
    char_length(trim(teacher_name)) between 2 and 100
    and char_length(trim(school_name)) between 2 and 160
    and char_length(email) <= 254
    and trip_id in ('singapore-stem', 'jaipur-heritage', 'london-universities')
    and student_count between 1 and 10000
  );
-- No SELECT/UPDATE/DELETE policy for anon or authenticated. Admin access is handled in the
-- server route using the same Supabase Auth user; for production, restrict admin access to a
-- dedicated allowlist and use a server-only service-role key for reads.
