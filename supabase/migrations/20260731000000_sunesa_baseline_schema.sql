-- Reproducible baseline for the Sunesa content-management backend.
-- Content rows and uploaded media are migrated separately from schema.

create extension if not exists pgcrypto;

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  excerpt text,
  content jsonb default '{}'::jsonb,
  thumbnail text,
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text,
  image_url text not null,
  category text,
  uploaded_at timestamptz default now()
);

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  section text not null unique,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

create table if not exists public.forms (
  id uuid primary key default gen_random_uuid(),
  form_type text not null,
  name text,
  email text,
  phone text,
  message text,
  status text default 'Unread'::text,
  created_at timestamptz default now(),
  slug text,
  active boolean not null default false,
  updated_at timestamptz not null default now(),
  description text,
  sections jsonb default '[]'::jsonb,
  placement text not null default 'standalone'::text
);

create unique index if not exists forms_slug_unique
on public.forms (slug)
where slug is not null;

create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  form_id uuid not null references public.forms(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  submitted_at timestamptz not null default now()
);

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update
set name = excluded.name,
    public = excluded.public;
