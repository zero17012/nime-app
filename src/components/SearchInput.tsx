import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { AppItem } from '../types';
import { getAppsBySearch } from '../data/mockData';

const SearchInput: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<AppItem[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      if (value.length > 0) {
        const searchResults = getAppsBySearch(value);
        setResults(searchResults);
        setShowResults(true);
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);
  };

  const handleClearSearch = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  const handleResultClick = (app: AppItem) => {
    navigate(`/app/${app.id}`);
    handleClearSearch();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query.trim())}`);
      setShowResults(false);
      setQuery(''); // ✅ Borra el input al hacer Enter
    }
  };

  return (
    <div
      className="relative flex-1 max-w-full md:max-w-3xl px-4 md:px-0 mx-auto"
      ref={searchRef}
    >
      <form onSubmit={handleSearchSubmit}>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar"
            className="w-full text-gray-100 pl-4 pr-10 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-secondary bg-neutral-800"
            value={query}
            onChange={handleSearchChange}
          />
          {query ? (
            <button
              type="button"
              className="absolute right-3 top-1.5 text-gray-400 hover:text-gray-200 transition-colors"
              onClick={handleClearSearch}
            >
              <X size={18} />
            </button>
          ) : (
            <button
              type="submit"
              className="absolute right-3 top-1.5 text-gray-400 hover:text-gray-200 transition-colors"
            >
              <Search size={18} />
            </button>
          )}
        </div>
      </form>

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface rounded-lg shadow-lg overflow-hidden z-50">
          <div className="max-h-96 overflow-y-auto">
            {results.map((app) => (
              <div
                key={app.id}
                className="flex items-center p-3 hover:bg-surface-dark cursor-pointer transition-colors"
                onClick={() => handleResultClick(app)}
              >
                <img
                  src={app.imageUrl}
                  alt={app.name}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="ml-3">
                  <h3 className="text-white font-medium">{app.name}</h3>
                  <p className="text-gray-400 text-sm">{app.subcategory}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
