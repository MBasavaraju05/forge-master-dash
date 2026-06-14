import { supabase } from "@/integrations/supabase/client";

export type Service = {
  id: string;
  name: string;
  description: string;
  icon: string | null;
  image_url: string | null;
  display_order: number | null;
};

export type GalleryImage = {
  id: string;
  title: string | null;
  description: string | null;
  category: string;
  image_url: string;
  media_type: "image" | "video";
  storage_path: string | null;
  project_id: string | null;
  display_order: number;
  created_at: string;
};

export type GalleryProject = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  media: GalleryImage[];
  created_at: string;
  updated_at: string;
};

export type Project = {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  completion_date: string | null;
  image_url: string | null;
  created_at: string;
};

export type Testimonial = {
  id: string;
  customer_name: string;
  review: string;
  rating: number | null;
  photo_url: string | null;
};

export type HeroSettings = { heading: string; subheading: string; background_url?: string };
export type AboutSettings = {
  intro: string; history: string; mission: string; vision: string; values: string;
};
export type StatsSettings = {
  projects: number; customers: number; years: number; machines: number;
};
export type ContactSettings = {
  phone: string; whatsapp: string; email: string; address: string; maps_url: string;
};

export async function fetchServices() {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Service[];
}

export async function fetchGallery(category?: string) {
  let q = supabase.from("gallery_projects").select("*, media:gallery_images(*)").order("created_at", { ascending: false });
  if (category && category !== "all") q = q.eq("category", category);
  const { data, error } = await q;
  if (error) throw error;

  const projects = (data ?? []) as any[];
  const normalizedProjects = projects.map((p) => ({
    ...p,
    media: (p.media ?? []).sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
  })) as GalleryProject[];

  // Also include any existing gallery_images rows that do not yet belong to a project.
  const orphanQuery = supabase
    .from("gallery_images")
    .select("*")
    .is("project_id", null)
    .order("created_at", { ascending: false });
  if (category && category !== "all") orphanQuery.eq("category", category);
  const { data: orphans, error: orphanError } = await orphanQuery;
  if (orphanError) throw orphanError;

  const orphanProjects = (orphans ?? []).map((image) => ({
    id: `orphan-${image.id}`,
    title: image.title || "Untitled",
    description: image.description,
    category: image.category,
    created_at: image.created_at,
    updated_at: image.created_at,
    media: [image],
  })) as GalleryProject[];

  return [...normalizedProjects, ...orphanProjects];
}

export async function fetchGalleryImages(category?: string) {
  let q = supabase.from("gallery_images").select("*").order("created_at", { ascending: false });
  if (category && category !== "all") q = q.eq("category", category);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as GalleryImage[];
}

export async function fetchProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("completion_date", { ascending: false, nullsFirst: false });
  if (error) throw error;
  return (data ?? []) as Project[];
}

export async function fetchTestimonials() {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Testimonial[];
}

export async function fetchSetting<T>(key: string, fallback: T): Promise<T> {
  const { data, error } = await supabase
    .from("site_settings").select("value").eq("key", key).maybeSingle();
  if (error) throw error;
  return ((data?.value as T) ?? fallback);
}

export const GALLERY_CATEGORIES = [
  "all",
  "welding",
  "fabrication",
  "gates",
  "railings",
  "agricultural",
  "repairs",
  "custom",
] as const;

export const PROJECT_CATEGORIES = [
  "fabrication",
  "welding",
  "structures",
  "agricultural",
  "custom",
] as const;
