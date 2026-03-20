-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  thumbnail_url TEXT,
  project_url TEXT,
  github_url TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to read projects
CREATE POLICY "Allow public read access" ON projects
  FOR SELECT USING (true);

-- Allow authenticated users to insert/update/delete (for admin)
CREATE POLICY "Allow authenticated insert" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON projects
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON projects
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create storage bucket for thumbnails
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-thumbnails', 'project-thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Allow public read access to thumbnails" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-thumbnails');

CREATE POLICY "Allow authenticated upload to thumbnails" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'project-thumbnails' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Allow authenticated delete from thumbnails" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'project-thumbnails' 
    AND auth.role() = 'authenticated'
  );
