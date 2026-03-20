import { FolderSearch, LoaderCircle } from 'lucide-react';
import { useProjects } from '../context/ProjectsContext';
import ProjectCard from './ProjectCard';

export default function ProjectGrid() {
  const { filteredProjects, loading } = useProjects();

  if (loading) {
    return (
      <div className="catalog-empty">
        <LoaderCircle className="catalog-empty__spinner" size={28} />
        <h3>Loading projects</h3>
        <p>Pulling in the collection now.</p>
      </div>
    );
  }

  if (filteredProjects.length === 0) {
    return (
      <div className="catalog-empty">
        <span className="catalog-empty__icon">
          <FolderSearch size={28} />
        </span>
        <h3>No projects match yet</h3>
        <p>Try a broader search term or switch to another category.</p>
      </div>
    );
  }

  return (
    <div className="project-grid">
      {filteredProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
