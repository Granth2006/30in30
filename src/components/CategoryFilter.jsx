import { categories } from '../data/projects';
import { useProjects } from '../context/ProjectsContext';

export default function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useProjects();

  return (
    <div className="catalog-filter">
      <button
        type="button"
        onClick={() => setSelectedCategory('All')}
        className={`catalog-filter__pill ${
          selectedCategory === 'All' ? 'is-active' : ''
        }`}
      >
        All projects
      </button>

      {categories
        .filter((category) => category !== 'All')
        .map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`catalog-filter__pill ${
              selectedCategory === category ? 'is-active' : ''
            }`}
          >
            {category}
          </button>
        ))}
    </div>
  );
}
