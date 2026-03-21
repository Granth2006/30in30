import { ArrowRight, FolderKanban, LayoutGrid, ShieldCheck, Sparkles } from 'lucide-react';
import { useProjects } from '../context/ProjectsContext';
import { categories } from '../data/projects';
import CategoryFilter from '../components/CategoryFilter';
import ProjectGrid from '../components/ProjectGrid';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const { filteredProjects, projects, selectedCategory } = useProjects();
  const totalCategories = categories.filter((category) => category !== 'All').length;
  const highlightedCount = Math.min(filteredProjects.length, 12);

  return (
    <div className="catalog-page">
      <div className="catalog-shell">
        <header className="catalog-topbar">
          <a href="/" className="catalog-brand" aria-label="30in30 home">
            <span className="catalog-brand__mark">
              <img src="/favicon.png" alt="30in30 Logo" style={{ width: 36, height: 36, borderRadius: 12 }} />
            </span>
            <span className="catalog-brand__text">
              <strong>30in30</strong>
              <span>challenge</span>
            </span>
          </a>

          <nav className="catalog-nav">
            <a href="/admin" className="catalog-nav__link">
              Admin
            </a>
          </nav>
        </header>

        <main className="catalog-main">
          <section className="catalog-hero">
            <div className="catalog-hero__content">
              <p className="catalog-eyebrow">30 Web Apps in 30 Days Challenge</p>
              <h1>Building a new web app every single day.</h1>
              <p className="catalog-hero__copy">
                Hey, I'm Granth Kumar! I built this project to challenge myself to create 30 web apps in 30 days. 
                Explore the collection below to see what I've been working on.
              </p>

              <div className="catalog-hero__stats" aria-label="Project statistics">
                <article className="catalog-stat">
                  <span className="catalog-stat__icon">
                    <FolderKanban size={18} />
                  </span>
                  <div>
                    <strong>{projects.length}</strong>
                    <span>live projects</span>
                  </div>
                </article>

                <article className="catalog-stat">
                  <span className="catalog-stat__icon">
                    <LayoutGrid size={18} />
                  </span>
                  <div>
                    <strong>{totalCategories}</strong>
                    <span>categories</span>
                  </div>
                </article>

                <article className="catalog-stat">
                  <span className="catalog-stat__icon">
                    <ShieldCheck size={18} />
                  </span>
                  <div>
                    <strong>{highlightedCount}</strong>
                    <span>featured in focus</span>
                  </div>
                </article>
              </div>
            </div>

            <aside className="catalog-hero__panel">
              <span className="catalog-hero__panel-label">Current view</span>
              <strong>{selectedCategory === 'All' ? 'All categories' : selectedCategory}</strong>
              <p>
                {filteredProjects.length} project{filteredProjects.length === 1 ? '' : 's'} match
                your current search and category filter.
              </p>
              <a href="#projects" className="catalog-hero__panel-link">
                Explore projects
                <ArrowRight size={16} />
              </a>
            </aside>
          </section>

          <section className="catalog-controls" aria-label="Search and filter controls">
            <div className="catalog-controls__top">
              <div>
                <p className="catalog-section-label">Discover</p>
                <h2>Find the right build fast</h2>
              </div>
              <div className="catalog-results">
                <strong>{filteredProjects.length}</strong>
                <span>
                  of {projects.length} project{projects.length === 1 ? '' : 's'}
                </span>
              </div>
            </div>

            <div className="catalog-controls__bar">
              <SearchBar />
              <CategoryFilter />
            </div>
          </section>

          <section className="catalog-projects" id="projects">
            <ProjectGrid />
          </section>
        </main>

        <footer className="catalog-footer">
          <div>
            <strong>30in30</strong>
            <p>Developed with ❤️ by Granth Kumar for the 30 Web Apps in 30 Days challenge.</p>
          </div>
          <a href="/admin" className="catalog-footer__link">
            Open admin
            <ArrowRight size={16} />
          </a>
        </footer>
      </div>
    </div>
  );
}
