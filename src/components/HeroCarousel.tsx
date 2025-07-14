import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AppItem } from '../types';

interface HeroCarouselProps {
  featuredApps: AppItem[];
  onSelectApp: (app: AppItem) => void;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ featuredApps, onSelectApp }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading && !isTransitioning) {
        handleNext();
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [featuredApps.length, isLoading, isTransitioning]);

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => {
      const newSet = new Set(prev);
      newSet.add(index);
      if (newSet.size === featuredApps.length) {
        setIsLoading(false);
      }
      return newSet;
    });
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => (prev + 1) % featuredApps.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => (prev - 1 + featuredApps.length) % featuredApps.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleDotClick = (index: number) => {
    if (isTransitioning || currentIndex === index) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  if (!featuredApps.length) return null;

  return (
    <div 
      className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full overflow-hidden rounded-lg bg-surface-dark"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-surface-dark animate-pulse" />
      )}
      
      {/* Image Container */}
      <div className="relative h-full">
        {featuredApps.map((app, index) => (
          <div 
            key={app.id}
            className={`absolute inset-0 transition-all duration-500 ease-out transform ${
              index === currentIndex 
                ? 'opacity-100 translate-x-0 scale-100' 
                : 'opacity-0 translate-x-full scale-95'
            }`}
            style={{ zIndex: index === currentIndex ? 1 : 0 }}
          >
            <div className="relative h-full w-full">
              <img 
                src={app.imageUrl} 
                alt={app.name}
                className={`w-full h-full object-cover transition-opacity duration-200 ${
                  loadedImages.has(index) ? 'opacity-90' : 'opacity-0'
                }`}
                loading="lazy"
                onLoad={() => handleImageLoad(index)}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-10">
                <div className="max-w-1xl mx-auto">
                  <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 text-white line-clamp-2">
                    {app.name}
                  </h2>
                  <p className="text-sm text-neutral-400 sm:text-sm md:text-1xl sm:text-2xl mb-3 sm:mb-4 md:mb-6  line-clamp-2 sm:line-clamp-3  sm:block">
                    {app.description}
                  </p>
                  <button 
                    className="bg-secondary hover:bg-accent text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-colors duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectApp(app);
                    }}
                  >
                    Descargar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Buttons - Hidden on mobile */}
      <button 
        className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 sm:p-3 rounded-full text-white hover:bg-black/70 transition-all duration-300 backdrop-blur-sm"
        onClick={handlePrev}
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>
      
      <button 
        className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 sm:p-3 rounded-full text-white hover:bg-black/70 transition-all duration-300 backdrop-blur-sm"
        onClick={handleNext}
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>
      
      {/* Dots Navigation */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2 sm:space-x-3">
        {featuredApps.map((_, index) => (
          <button
            key={index}
            className={`transition-all duration-300 ${
              index === currentIndex
                ? 'w-6 sm:w-8 h-1.5 sm:h-2 bg-white rounded-full'
                : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50 hover:bg-white/70 rounded-full'
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;