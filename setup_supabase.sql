-- 1. Create the scraped_data table
create table if not exists public.scraped_data (
  slug text primary key,
  name text,
  rating text,
  review_count text,
  address text,
  phone text,
  image_urls text[],
  reviews jsonb,
  media jsonb,
  map_embed_url text,
  source_data jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) on the table
alter table public.scraped_data enable row level security;

-- Create policy for public read access (for your Next.js app to read without service key)
create policy "Enable read access for all users" 
  on public.scraped_data for select 
  using (true);

-- (Inserts and Updates will be handled by the backend using the Service Role Key, 
-- which automatically bypasses RLS, so no insert/update policies are strictly needed here).

-- 2. Create Storage Buckets
-- Create 'scraped_images' bucket (public)
insert into storage.buckets (id, name, public) 
values ('scraped_images', 'scraped_images', true)
on conflict (id) do nothing;

-- Create 'templates' bucket (public)
insert into storage.buckets (id, name, public) 
values ('templates', 'templates', true)
on conflict (id) do nothing;

-- 3. Storage Policies
-- Allow public read access to the scraped_images bucket
create policy "Public Read scraped_images" 
  on storage.objects for select 
  using (bucket_id = 'scraped_images');

-- Allow public read access to the templates bucket
create policy "Public Read templates" 
  on storage.objects for select 
  using (bucket_id = 'templates');
