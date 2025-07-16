import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { categories } from '../data/categories';
import * as Icons from 'lucide-react';
import Header from './Header';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Detecta la categoría activa correctamente
  const pathname = location.pathname;
  const activeCategory = pathname.startsWith('/entertainment')
    ? 'entertainment'
    : pathname.startsWith('/add')
    ? 'add'
    : pathname.startsWith('/category/')
    ? pathname.split('/')[2]
    : pathname === '/' ? 'home' : '';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCategoryClick = (categoryId: string) => {
    setMobileMenuOpen(false);

    if (categoryId === 'home') {
      navigate('/');
    } else {
      navigate(`/category/${categoryId}`);
    }
  };

  return (
    <>
      <Header onMenuClick={() => setMobileMenuOpen(true)} />

      {/* Desktop Sidebar */}
      <div className="hidden md:flex bg-surface top-10 w-16 md:w-20 h-full flex-col items-center pt-5 fixed left-0 top-0 bottom-0 z-20">
        {categories.map((category) => {
          const IconComponent = Icons[category.icon];
          return (
            <div
              key={category.id}
              className={`w-full flex flex-col items-center justify-center py-4 cursor-pointer transition-all duration-200 hover:bg-neutral-800 ${
                activeCategory === category.id ? 'border-l-4 border-secondary bg-neutral-800' : ''
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {IconComponent && <IconComponent className="w-6 h-6 text-neutral-300" />}
              <p className="text-xs text-neutral-300 mt-1">{category.name}</p>
            </div>
          );
        })}
      </div>

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed inset-0 z-30 md:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Slide-in panel */}
        <div
          className={`absolute top-0 left-0 bottom-0 w-64 bg-neutral-900 transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Logo + Nombre */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-neutral-800">
            <img src="/Content/logo.png" alt="Nime" className="h-8 w-auto" />
            <span className="text-white font-semibold text-lg">Nime Studio</span>
          </div>

          {/* Lista de categorías */}
          <div className="p-4">
            {categories.map((category) => {
              const IconComponent = Icons[category.icon];
              return (
                <div
                  key={category.id}
                  className={`flex items-center py-3 px-2 cursor-pointer rounded-md ${
                    activeCategory === category.id
                      ? 'bg-neutral-800 text-secondary'
                      : 'text-neutral-300'
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {IconComponent && <IconComponent className="w-5 h-5 mr-2" />}
                  <span>{category.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
