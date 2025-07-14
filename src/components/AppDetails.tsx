import React, { useState } from 'react';
import { AppItem } from '../types';
import { X, Download, ChevronLeft, ChevronRight, Star, Play, Globe } from 'lucide-react';

interface AppDetailsProps {
  app: AppItem;
  onClose: () => void;
}

const AppDetails: React.FC<AppDetailsProps> = ({ app, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [isInstalled, setIsInstalled] = useState(app.isInstalled || false);
  const [showWebPreview, setShowWebPreview] = useState(false);

  const allImages = [app.imageUrl, ...app.screenshots];

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleInstall = () => {
    if (isInstalled) return;
    
    setIsInstalling(true);
    
    const interval = setInterval(() => {
      setInstallProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsInstalling(false);
          setIsInstalled(true);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  const formatPrice = (price: number | string) => {
    if (typeof price === 'string') return price;
    return price === 0 ? 'Free' : `${price.toFixed(2)} €`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 overflow-auto">
      <div className="bg-gray-900 rounded-lg w-full max-w-6xl h-auto max-h-[90vh] overflow-auto">
        <div className="relative">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-black">
            <div className="flex items-center">
              <img 
                src={app.imageUrl} 
                alt={app.name} 
                className="w-12 h-12 rounded object-cover mr-4"
              />
              <div>
                <h2 className="text-white text-xl font-semibold">{app.name}</h2>
                <p className="text-gray-400 text-sm">{app.publisher}</p>
              </div>
            </div>
            <button 
              className="text-gray-400 hover:text-white transition-colors"
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </div>

          {/* Media Gallery */}
          <div className="relative h-80 bg-gray-800">
            {showWebPreview && app.webPreview ? (
              <iframe
                src={app.webPreview}
                className="w-full h-full"
                title={`${app.name} preview`}
              />
            ) : (
              <>
                <img 
                  src={allImages[currentImageIndex]} 
                  alt={`${app.name} screenshot ${currentImageIndex + 1}`} 
                  className="h-full w-full object-contain"
                />
                
                {app.youtubeId && currentImageIndex === 0 && (
                  <button 
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-50 transition-all"
                    onClick={() => {
                      const videoUrl = `https://www.youtube.com/embed/${app.youtubeId}?autoplay=1`;
                      window.open(videoUrl, '_blank');
                    }}
                  >
                    <div className="bg-white bg-opacity-80 rounded-full p-4">
                      <Play size={40} className="text-secondary" />
                    </div>
                  </button>
                )}
              </>
            )}
            
            {allImages.length > 1 && !showWebPreview && (
              <>
                <button 
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full text-white hover:bg-black/70 transition-all"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft size={24} />
                </button>
                
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full text-white hover:bg-black/70 transition-all"
                  onClick={handleNextImage}
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
            
            {/* Thumbnail Navigation */}
            {!showWebPreview && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? 'bg-secondary w-6' : 'bg-white bg-opacity-50'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  ></button>
                ))}
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Description */}
            <div className="md:col-span-2">
              <h3 className="text-white text-lg font-semibold mb-3">Descripción</h3>
              <p className="text-gray-300 mb-6">{app.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-gray-400 text-sm mb-1">Categoría</h4>
                  <p className="text-white">{app.subcategory}</p>
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm mb-1">Valoración</h4>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="text-white">{app.rating}</span>
                    <span className="text-gray-400 ml-2">({app.reviews.toLocaleString()} reseñas)</span>
                  </div>
                </div>
              </div>
              
              {/* YouTube Video */}
              {app.youtubeId && (
                <div className="mb-6">
                  <h3 className="text-white text-lg font-semibold mb-3">Video</h3>
                  <div className="relative pt-[56.25%]">
                    <iframe
                      src={`https://www.youtube.com/embed/${app.youtubeId}`}
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      title={`${app.name} video`}
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
              
              {/* Screenshots */}
              <h3 className="text-white text-lg font-semibold mb-3">Capturas de pantalla</h3>
              <div className="grid grid-cols-3 gap-2">
                {app.screenshots.map((screenshot, index) => (
                  <img 
                    key={index}
                    src={screenshot} 
                    alt={`Screenshot ${index + 1}`} 
                    className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setCurrentImageIndex(index + 1)}
                  />
                ))}
              </div>
            </div>
            
            {/* Right Column - Download/Install */}
            <div className="bg-gray-800 p-4 rounded-lg h-fit">
              <p className="text-center mb-2">
                <span className={`text-2xl font-bold ${
                  app.price === 'Free' || app.price === 'Gratis' ? 'text-secondary' : 'text-white'
                }`}>
                  {formatPrice(app.price)}
                </span>
              </p>
              
              {app.type === 'web' ? (
                <div className="space-y-2">
                  <button 
                    className="w-full bg-secondary hover:bg-accent text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                    onClick={() => setShowWebPreview(!showWebPreview)}
                  >
                    <Globe size={18} />
                    <span>{showWebPreview ? 'Ocultar vista previa' : 'Ver vista previa'}</span>
                  </button>
                  <a 
                    href={app.webPreview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Globe size={18} />
                    <span>Abrir en nueva pestaña</span>
                  </a>
                </div>
              ) : isInstalling ? (
                <div className="mb-4">
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div 
                      className="bg-secondary h-2 rounded-full transition-all duration-200" 
                      style={{ width: `${installProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-center text-gray-300 text-sm">Descargando... {installProgress}%</p>
                </div>
              ) : isInstalled ? (
                <button 
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold mb-4 flex items-center justify-center cursor-default"
                >
                  Instalado
                </button>
              ) : (
                <button 
                  className="w-full bg-secondary hover:bg-accent text-white py-3 rounded-lg font-semibold mb-4 flex items-center justify-center gap-2 transition-colors"
                  onClick={handleInstall}
                >
                  <Download size={18} />
                  <span>Descargar</span>
                </button>
              )}
              
              <div className="border-t border-gray-700 pt-4">
                <h4 className="text-gray-400 text-sm mb-2">Información</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Desarrollador</span>
                    <span className="text-white">{app.publisher}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Categoría</span>
                    <span className="text-white">{app.subcategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Compatibilidad</span>
                    <span className="text-white">
                      {app.type === 'android' ? 'Android' : 
                       app.type === 'extension' ? 'Navegadores' : 
                       app.type === 'web' ? 'Web' : 'Windows 10/11'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDetails;