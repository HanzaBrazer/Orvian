-- Orvian blog CMS — Supabase schema
-- Run this in the Supabase SQL Editor.

-- 1) Posts table
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text default '',
  category text not null default 'Business',
  read_time text default '5 min read',
  image text default '',
  body jsonb not null default '[]'::jsonb,
  date text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_updated_at on public.posts;
create trigger posts_updated_at before update on public.posts
for each row execute function public.set_updated_at();

-- 2) Row Level Security
alter table public.posts enable row level security;

drop policy if exists "public read" on public.posts;
create policy "public read" on public.posts
  for select using (true);

drop policy if exists "admin insert" on public.posts;
create policy "admin insert" on public.posts
  for insert to authenticated with check (true);

drop policy if exists "admin update" on public.posts;
create policy "admin update" on public.posts
  for update to authenticated using (true) with check (true);

drop policy if exists "admin delete" on public.posts;
create policy "admin delete" on public.posts
  for delete to authenticated using (true);

-- 3) Storage bucket for cover images
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

drop policy if exists "public read images" on storage.objects;
create policy "public read images" on storage.objects
  for select using (bucket_id = 'blog-images');

drop policy if exists "admin upload images" on storage.objects;
create policy "admin upload images" on storage.objects
  for insert to authenticated with check (bucket_id = 'blog-images');

drop policy if exists "admin delete images" on storage.objects;
create policy "admin delete images" on storage.objects
  for delete to authenticated using (bucket_id = 'blog-images');
