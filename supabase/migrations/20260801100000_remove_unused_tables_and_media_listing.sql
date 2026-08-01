-- Remove empty, unused tables left behind by earlier experiments.
-- The current forms engine stores sections and fields in forms.sections JSONB.
drop table if exists public.form_fields;
drop table if exists public.form_sections;
drop table if exists public.profiles;

-- The media bucket is public, so direct object URLs work without a broad
-- SELECT policy that also exposes bucket listing through the API.
drop policy if exists "Public can read media" on storage.objects;
