import { Search, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useProjects } from '../context/ProjectsContext';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useProjects();
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <label className="catalog-search" aria-label="Search projects">
      <span className="catalog-search__icon">
        <Search size={18} />
      </span>

      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search by name or description"
        className="catalog-search__input"
      />

      {searchQuery ? (
        <button
          type="button"
          onClick={() => setSearchQuery('')}
          className="catalog-search__clear"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      ) : (
        <span className="catalog-search__hint">Ctrl K</span>
      )}
    </label>
  );
}
