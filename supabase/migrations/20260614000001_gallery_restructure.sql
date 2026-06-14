-- Gallery Restructure: Support multiple media items per project/title

-- 1. Create gallery_projects table (groups of media with same title)
CREATE TABLE public.gallery_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL DEFAULT 'welding',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Add new columns to gallery_images (if they don't exist, use ALTER TABLE ADD IF NOT EXISTS)
ALTER TABLE public.gallery_images
  ADD COLUMN IF NOT EXISTS media_type text DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
  ADD COLUMN IF NOT EXISTS project_id uuid REFERENCES public.gallery_projects(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS display_order int DEFAULT 0;

-- 3. Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_gallery_images_project ON public.gallery_images(project_id);
CREATE INDEX IF NOT EXISTS idx_gallery_projects_category ON public.gallery_projects(category);

-- 4. Permissions for gallery_projects
GRANT SELECT ON public.gallery_projects TO anon, authenticated;
GRANT ALL ON public.gallery_projects TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.gallery_projects TO authenticated;
ALTER TABLE public.gallery_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gallery projects" ON public.gallery_projects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage gallery projects" ON public.gallery_projects FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
