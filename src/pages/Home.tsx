import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import CategorySection from '../components/CategorySection';
import { AppItem } from '../lib/supabase';
import { getFeaturedApps, getAppsByCategory, getAppsBySearch } from '../data/supabaseData';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId, query } = useParams();
  const [featuredApps, setFeaturedApps] = useState<AppItem[]>([]);
  const [gamesApps, setGamesApps] = useState<AppItem[]>([]);
  const [productivityApps, setProductivityApps] = useState<AppItem[]>([]);
  const [entertainmentApps, setEntertainmentApps] = useState<AppItem[]>([]);
  const [filtered, setFiltered] = useState<AppItem[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApps = async () => {
      setLoading(true);
      try {
        const [featured, games, apps, entertainment] = await Promise.all([
          getFeaturedApps(),
          getAppsByCategory('games'),
          getAppsByCategory('apps'),
          getAppsByCategory('entertainment')
        ]);
        
        setFeaturedApps(featured);
        setGamesApps(games);
        setProductivityApps(apps);
        setEntertainmentApps(entertainment);
      } catch (error) {
        console.error('Error loading apps:', error);
      } finally {
        setLoading(false);
      }
    };

    loadApps();
  }, []);

  useEffect(() => {
    const loadFilteredApps = async () => {
      if (query) {
        const searchResults = await getAppsBySearch(query);
        setFiltered(searchResults);
        setShowAll(true);
      } else if (categoryId && categoryId !== 'home') {
        const categoryApps = await getAppsByCategory(categoryId);
        setFiltered(categoryApps);
        setShowAll(true);
      } else {
        setFiltered([]);
        setShowAll(false);
      }
    };

    loadFilteredApps();
  }, [categoryId, query]);

  const handleViewAll = (category: string) => {
    navigate(`/category/${category}`);
  };

  const handleSelectApp = (app: AppItem) => {
    navigate(`/app/${app.id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white">Cargando aplicaciones...</p>
        </div>
      </div>
    );
  }

  if (showAll) {
    const title = query 
      ? `Resultados para "${query}" (${filtered.length})`
      : `${categoryId?.charAt(0).toUpperCase() + categoryId?.slice(1)}`;

    return (
      <div className="py-0">
        <h2 className="text-white text-xl font-semibold mb-5">
          {title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {filtered.map((app) => (
            <div
              key={app.id}
              className="bg-neutral-900 rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={() => handleSelectApp(app)}
            >
              <div className="relative h-36">
                <img
                  src={app.image_url}
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
        {gamesApps.length > 0 && (
          <CategorySection
            title="Juegos"
            apps={gamesApps}
            onSelectApp={handleSelectApp}
            onViewAll={() => handleViewAll('games')}
          />
        )}
        
        {productivityApps.length > 0 && (
          <CategorySection
            title="Aplicaciones"
            apps={productivityApps}
            onSelectApp={handleSelectApp}
            onViewAll={() => handleViewAll('apps')}
          />
        )}
        
        {entertainmentApps.length > 0 && (
          <CategorySection
            title="Entretenimiento"
            apps={entertainmentApps}
            onSelectApp={handleSelectApp}
            onViewAll={() => handleViewAll('entertainment')}
          />
        )}
      </div>
    </div>
  );
};

export default Home;