
-- Switch has_role to SECURITY INVOKER (the "users view own roles" policy already lets users see their own row)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY INVOKER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Lock trigger function: revoke execute from public/authenticated (trigger runs as table owner regardless)
REVOKE EXECUTE ON FUNCTION public.handle_new_user_role() FROM PUBLIC, anon, authenticated;

-- Tighten storage listing: only admins can LIST; public still gets read via direct URL through CDN
DROP POLICY "Public read site-media" ON storage.objects;
CREATE POLICY "Public read site-media via url" ON storage.objects FOR SELECT TO anon USING (bucket_id = 'site-media');
CREATE POLICY "Admins list site-media" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'site-media');

-- Length caps on inquiries to prevent abuse
ALTER TABLE public.inquiries
  ADD CONSTRAINT inquiries_name_len CHECK (char_length(name) BETWEEN 1 AND 120),
  ADD CONSTRAINT inquiries_email_len CHECK (email IS NULL OR char_length(email) <= 255),
  ADD CONSTRAINT inquiries_phone_len CHECK (phone IS NULL OR char_length(phone) <= 40),
  ADD CONSTRAINT inquiries_message_len CHECK (char_length(message) BETWEEN 1 AND 2000);
