# Supabase setup for shared memories

## 1) Create table
Run this SQL in Supabase SQL Editor:

```sql
create table if not exists public.memories (
  id uuid primary key default gen_random_uuid(),
  date text not null,
  title text not null,
  story text not null,
  mood text not null check (mood in ('happy', 'sad')),
  image_url text,
  created_at timestamptz not null default now()
);
```

## 2) Enable Row Level Security and policies

```sql
alter table public.memories enable row level security;

create policy "memories_are_readable_by_everyone"
on public.memories for select
to anon, authenticated
using (true);

create policy "memories_are_insertable_by_everyone"
on public.memories for insert
to anon, authenticated
with check (true);
```

## 3) Add environment variables
Create `.env` in project root:

```env
VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

## 4) Rebuild and deploy

```bash
npm run build
```

Then push to GitHub and redeploy your static host.

## Notes
- This setup makes reads/inserts public. If you want spam protection later, add auth or captcha.
- Existing built-in memories from `src/data.js` are still shown first load.
