import React from 'react';
import { ChevronRight } from 'lucide-react';
import AppCard from './AppCard';
import { AppItem } from '../lib/supabase';

interface CategorySectionProps {
  title: string;
  apps: AppItem[];
  viewAll?: boolean;
  onViewAll?: () => void;
  onSelectApp: (app: AppItem) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ 
  title, 
  apps, 
  viewAll = true, 
  onViewAll, 
  onSelectApp 
}) => {
  if (!apps.length) return null;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-semibold">{title}</h2>
        {viewAll && (
          <button 
            className="text-neutral-400 hover:text-gray-300 flex items-center"
            onClick={onViewAll}
          >
    
            <ChevronRight size={30} />
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {apps.slice(0, 20).map((app) => (
          <AppCard 
            key={app.id} 
            app={app} 
            onClick={onSelectApp} 
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;