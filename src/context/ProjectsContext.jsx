import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  getProjects, 
  createProject, 
  updateProject, 
  deleteProject,
  uploadImage,
  getImageUrl,
  deleteImage
} from '../lib/supabase';
import { initialProjects } from '../data/projects';

const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      // If no data from database, use fallback
      if (!data || data.length === 0) {
        setProjects(initialProjects.map((p, i) => ({ ...p, id: i + 1 })));
      } else {
        setProjects(data);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err.message);
      // Fallback to initial projects if database is not set up
      setProjects(initialProjects.map((p, i) => ({ ...p, id: i + 1 })));
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort projects based on search, category, and Day number
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    const getDayNumber = (name) => {
      const match = name.match(/Day\s+(\d+)/i);
      return match ? parseInt(match[1], 10) : 999; // Items without a day go to the end
    };
    return getDayNumber(a.name) - getDayNumber(b.name);
  });

  // Add new project
  const addProject = async (projectData, imageFile) => {
    try {
      let thumbnailUrl = projectData.thumbnail_url;
      
      // Upload image if provided
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        await uploadImage(imageFile, fileName);
        thumbnailUrl = await getImageUrl(fileName);
      }

      const newProject = await createProject({
        ...projectData,
        thumbnail_url: thumbnailUrl
      });

      setProjects(prev => [...prev, newProject]);
      return newProject;
    } catch (err) {
      console.error('Error adding project:', err);
      throw err;
    }
  };

  // Edit project
  const editProject = async (id, updates, imageFile) => {
    try {
      let thumbnailUrl = updates.thumbnail_url;
      
      // Upload new image if provided
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        await uploadImage(imageFile, fileName);
        thumbnailUrl = await getImageUrl(fileName);
      }

      const updated = await updateProject(id, {
        ...updates,
        thumbnail_url: thumbnailUrl
      });

      setProjects(prev => prev.map(p => p.id === id ? updated : p));
      return updated;
    } catch (err) {
      console.error('Error updating project:', err);
      throw err;
    }
  };

  // Remove project
  const removeProject = async (id) => {
    try {
      const project = projects.find(p => p.id === id);
      
      // Delete image from storage if exists
      if (project?.thumbnail_url) {
        const path = project.thumbnail_url.split('/').pop();
        if (path) await deleteImage(path);
      }

      await deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting project:', err);
      throw err;
    }
  };

  const value = {
    projects,
    filteredProjects,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    fetchProjects,
    addProject,
    editProject,
    removeProject
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
}
