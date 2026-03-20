import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database helper functions
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: true });
  
  if (error) throw error;
  return data;
}

export async function getProjectById(id) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createProject(project) {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateProject(id, updates) {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteProject(id) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

// Storage helper functions
export async function uploadImage(file, fileName) {
  const { data, error } = await supabase.storage
    .from('project-thumbnails')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true
    });
  
  if (error) throw error;
  return data;
}

export async function getImageUrl(path) {
  const { data } = supabase.storage
    .from('project-thumbnails')
    .getPublicUrl(path);
  
  return data.publicUrl;
}

export async function deleteImage(path) {
  const { error } = await supabase.storage
    .from('project-thumbnails')
    .remove([path]);
  
  if (error) throw error;
}
