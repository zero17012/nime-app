import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import CategorySection from '../components/CategorySection';
import { AppItem } from '../types';
import { featuredApps, getAppsByCategory, getAppsBySearch } from '../data/mockData';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId, query } = useParams();
  const [gamesApps, setGamesApps] = useState<AppItem[]>([]);
  const [productivityApps, setProductivityApps] = useState<AppItem[]>([]);
  const [entertainmentApps, setEntertainmentApps] = useState<AppItem[]>([]);
  const [filtered, setFiltered] = useState<AppItem[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setGamesApps(getAppsByCategory('games'));
    setProductivityApps(getAppsByCategory('apps'));
    setEntertainmentApps(getAppsByCategory('entertainment'));
  }, []);

  useEffect(() => {
    if (query) {
      const searchResults = getAppsBySearch(query);
      setFiltered(searchResults);
      setShowAll(true);
    } else if (categoryId && categoryId !== 'home') {
      const categoryApps = getAppsByCategory(categoryId);
      setFiltered(categoryApps);
      setShowAll(true);
    } else {
      setFiltered([]);
      setShowAll(false);
    }
  }, [categoryId, query]);

  const handleViewAll = (category: string) => {
    navigate(`/category/${category}`);
  };

  const handleSelectApp = (app: AppItem) => {
    navigate(`/app/${app.id}`);
  };

if (showAll) {
  // Se calcula el título fuera del JSX para mayor claridad
  const title = query 
    ? `Resultados para "${query}" (${filtered.length})`
    : `${categoryId?.charAt(0).toUpperCase() + categoryId?.slice(1)}`;

  return (
    <div className="py-0">
      <h2 className="text-white text-xl font-semibold mb-5">
        {title}
      </h2>

      {/* Grilla de aplicaciones con Tailwind */}
 <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
  {filtered.map((app) => (
    <div
      key={app.id}
      className="bg-neutral-900 rounded-lg overflow-hidden shadow-lg cursor-pointer"
      onClick={() => handleSelectApp(app)}
    >
      <div className="relative h-36">
        <img
          src={app.imageUrl}
          alt={app.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold mb-2">{app.name}</h3>
        <p className="text-neutral-400 text-sm line-clamp-2">{app.description}</p>
      </div>
    </div>
  ))}
</div>

    </div>
  );
}


  return (
    <div>
      <HeroCarousel featuredApps={featuredApps} onSelectApp={handleSelectApp} />
      
      <div className="py-6">
        <CategorySection
          title="Juegos"
          apps={gamesApps}
          onSelectApp={handleSelectApp}
          onViewAll={() => handleViewAll('games')}
        />
        
        <CategorySection
          title="Aplicaciones"
          apps={productivityApps}
          onSelectApp={handleSelectApp}
          onViewAll={() => handleViewAll('apps')}
        />
        
        <CategorySection
          title="Entretenimiento"
          apps={entertainmentApps}
          onSelectApp={handleSelectApp}
          onViewAll={() => handleViewAll('entertainment')}
        />
      </div>
    </div>
  );
};

export default Home;