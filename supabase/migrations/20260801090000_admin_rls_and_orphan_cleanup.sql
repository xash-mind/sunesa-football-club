-- Sunesa RLS hardening.
-- Admin access is granted through auth.users.raw_app_meta_data.role = 'admin'.
-- Public visitors can read published/public content and submit active forms.

alter table public.news enable row level security;
alter table public.gallery enable row level security;
alter table public.pages enable row level security;
alter table public.forms enable row level security;
alter table public.form_submissions enable row level security;

-- Reset policies on Sunesa-owned public tables so this migration is repeatable.
do $$
declare
  policy_record record;
begin
  for policy_record in
    select schemaname, tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and tablename in (
        'news',
        'gallery',
        'pages',
        'forms',
        'form_submissions'
      )
  loop
    execute format(
      'drop policy if exists %I on %I.%I',
      policy_record.policyname,
      policy_record.schemaname,
      policy_record.tablename
    );
  end loop;
end
$$;

-- Remove only Sunesa's known Storage policies. Do not disturb policies for
-- unrelated buckets if this migration is ever run in a shared project.
drop policy if exists "Public can read media" on storage.objects;
drop policy if exists "Admins can upload media" on storage.objects;
drop policy if exists "Admins can update media" on storage.objects;
drop policy if exists "Admins can delete media" on storage.objects;

-- NEWS
create policy "Public can read published news"
on public.news
for select
to anon, authenticated
using (published = true);

create policy "Admins can read all news"
on public.news
for select
to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can insert news"
on public.news
for insert
to authenticated
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can update news"
on public.news
for update
to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can delete news"
on public.news
for delete
to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- GALLERY
create policy "Public can read gallery"
on public.gallery
for select
to anon, authenticated
using (true);

create policy "Admins can insert gallery"
on public.gallery
for insert
to authenticated
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can update gallery"
on public.gallery
for update
to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can delete gallery"
on public.gallery
for delete
to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- PAGES
create policy "Public can read pages"
on public.pages
for select
to anon, authenticated
using (true);

create policy "Admins can insert pages"
on public.pages
for insert
to authenticated
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can update pages"
on public.pages
for update
to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can delete pages"
on public.pages
for delete
to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- FORMS
create policy "Public can read active forms"
on public.forms
for select
to anon, authenticated
using (active = true);

create policy "Admins can read all forms"
on public.forms
for select
to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can insert forms"
on public.forms
for insert
to authenticated
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can update forms"
on public.forms
for update
to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can delete forms"
on public.forms
for delete
to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- FORM SUBMISSIONS
create policy "Public can submit forms"
on public.form_submissions
for insert
to anon, authenticated
with check (
  exists (
    select 1
    from public.forms
    where forms.id = form_submissions.form_id
      and forms.active = true
  )
);

create policy "Admins can read submissions"
on public.form_submissions
for select
to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can delete submissions"
on public.form_submissions
for delete
to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- STORAGE
-- The bucket itself is public, while only admins may mutate its objects.
create policy "Public can read media"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'media');

create policy "Admins can upload media"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'media'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

create policy "Admins can update media"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'media'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
)
with check (
  bucket_id = 'media'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

create policy "Admins can delete media"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'media'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);
