import { useState } from 'react';
import {
  ArrowUpRight,
  Bot,
  Brush,
  Code2,
  FileStack,
  Globe,
  Image as ImageIcon,
  Lock,
  Workflow,
  X,
  Github
} from 'lucide-react';

const categoryThemes = {
  'File Tools': {
    accent: '#f97316',
    surface: 'linear-gradient(135deg, #fff1e7 0%, #ffd6bf 100%)',
    icon: FileStack,
  },
  'Image Tools': {
    accent: '#db2777',
    surface: 'linear-gradient(135deg, #fdf2f8 0%, #fbcfe8 100%)',
    icon: ImageIcon,
  },
  'Developer Tools': {
    accent: '#2563eb',
    surface: 'linear-gradient(135deg, #eff6ff 0%, #bfdbfe 100%)',
    icon: Code2,
  },
  'AI Tools': {
    accent: '#7c3aed',
    surface: 'linear-gradient(135deg, #f5f3ff 0%, #ddd6fe 100%)',
    icon: Bot,
  },
  Productivity: {
    accent: '#059669',
    surface: 'linear-gradient(135deg, #ecfdf5 0%, #a7f3d0 100%)',
    icon: Workflow,
  },
  Creative: {
    accent: '#e11d48',
    surface: 'linear-gradient(135deg, #fff1f2 0%, #fecdd3 100%)',
    icon: Brush,
  },
  'Web Tools': {
    accent: '#0f766e',
    surface: 'linear-gradient(135deg, #f0fdfa 0%, #99f6e4 100%)',
    icon: Globe,
  },
  Security: {
    accent: '#b45309',
    surface: 'linear-gradient(135deg, #fffbeb 0%, #fde68a 100%)',
    icon: Lock,
  },
};

function getProjectInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export default function ProjectCard({ project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const theme = categoryThemes[project.category] || {
    accent: '#334155',
    surface: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    icon: Code2,
  };

  const CategoryIcon = theme.icon;
  const hasThumbnail = Boolean(project.thumbnail_url);
  const visibleTech = project.tech_stack?.slice(0, 3) || [];
  const extraTechCount = Math.max((project.tech_stack?.length || 0) - visibleTech.length, 0);

  return (
    <>
      <article className="project-card">
        <div className="project-card__media" style={!hasThumbnail ? { background: theme.surface } : undefined}>
          {hasThumbnail ? (
            <img
              src={project.thumbnail_url}
              alt={project.name}
              className="project-card__image"
              loading="lazy"
            />
          ) : (
            <div className="project-card__placeholder">
              <span
                className="project-card__placeholder-icon"
                style={{ color: theme.accent }}
              >
                <CategoryIcon size={22} />
              </span>
              <strong>{getProjectInitials(project.name)}</strong>
              <span>{project.category}</span>
            </div>
          )}

          <div className="project-card__overlay" />
          <span
            className="project-card__badge"
            style={{ '--project-accent': theme.accent }}
          >
            {project.category}
          </span>
        </div>

        <div className="project-card__body">
          <div className="project-card__heading">
            <h3>{project.name}</h3>
            <span className="project-card__glyph" style={{ color: theme.accent }}>
              <CategoryIcon size={18} />
            </span>
          </div>

          {/* <p className="project-card__description">{project.description}</p>

          <div className="project-card__tech">
            {visibleTech.map((tech) => (
              <span key={tech} className="project-card__chip">
                {tech}
              </span>
            ))}
            {extraTechCount > 0 && (
              <span className="project-card__chip is-muted">+{extraTechCount} more</span>
            )}
          </div> */}

          <button
            onClick={() => setIsModalOpen(true)}
            className="project-card__action"
          >
            <span>Know more</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </article>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm shadow-2xl">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col relative">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b bg-white border-gray-100">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-lg" style={{ backgroundColor: theme.accent + '20', color: theme.accent }}>
                  <CategoryIcon size={24} />
                </span>
                <h2 className="text-xl font-bold text-gray-900">{project.name}</h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Thumbnail representation */}
              <div className="w-full h-48 rounded-xl overflow-hidden shadow-sm border border-gray-100" style={!hasThumbnail ? { background: theme.surface } : undefined}>
                {hasThumbnail ? (
                  <img src={project.thumbnail_url} alt={project.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 gap-2">
                    <CategoryIcon size={40} style={{ color: theme.accent }} />
                    <span className="font-semibold text-lg">{project.name}</span>
                  </div>
                )}
              </div>

              {/* Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">About the Project</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {project.description}
                </p>
              </div>

              {/* Full Tech Stack */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack?.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium border border-gray-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer / Actions */}
            <div className="sticky bottom-0 bg-gray-50 p-4 border-t border-gray-100 flex gap-3">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors gitrepobtn"
                >
                  <Github size={18} />
                  GitHub Repo
                </a>
              )}
              <a
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-white font-medium rounded-xl transition-colors shadow-sm"
                style={{ backgroundColor: theme.accent }}
              >
                <ArrowUpRight size={18} />
                View Project
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
