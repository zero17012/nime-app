import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppItem } from '../lib/supabase';
import {
  ArrowLeft,
  Download,
  Star,
  Play,
  Globe,
  Cpu,
  HardDrive,
  Monitor,
  Clock,
  Film,
  User,
} from 'lucide-react';
import ReactPlayer from 'react-player';

interface AppDetailsPageProps {
  app: AppItem;
}



const AppDetailsPage: React.FC<AppDetailsPageProps> = ({ app }) => {
  const navigate = useNavigate();
  const [selectedDownload, setSelectedDownload] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);


  const [selectedImage, setSelectedImage] = useState<string | null>(null);


const isExternalLink = (url: string) => {
  const externalHosts = ['gofile.io', 'drive.google.com', 'mega.nz', 'onedrive.live.com', '1drv.ms'];
  return externalHosts.some(host => url.includes(host));
};

const isDirectDownloadLink = (url: string) => {
  return /\.(exe|apk|zip|tar\.gz|rar|mp4|pdf|mkv|avi)$/i.test(url);
};

const handleDownload = async (index: number) => {
  if (isDownloading) return;

  let url: string | undefined;

  if (app.category === 'entertainment') {
    url = app.downloads?.[index]?.url;
  } else {
    url = app.downloadUrl;
  }

  if (!url) return;

  // Enlaces externos conocidos (Gofile, Mega, etc.)
  if (isExternalLink(url)) {
    window.open(url, '_blank');
    return;
  }

  // Detectamos si el enlace es directo pero puede redirigir (ejemplo SublimeText)
  // Simplemente abrir en pestaña nueva para evitar problemas
  if (isDirectDownloadLink(url)) {
    window.open(url, '_blank');
    return;
  }

  // Si no es externo ni directo, hacer descarga simulada con iframe
  setSelectedDownload(index);
  setIsDownloading(true);

  try {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.src = url;

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDownloading(false);
            setDownloadProgress(0);
            setSelectedDownload(null);
            if (iframe && document.body.contains(iframe)) {
              document.body.removeChild(iframe);
            }
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  } catch (error) {
    console.error('Error durante la descarga:', error);
    setIsDownloading(false);
    setDownloadProgress(0);
    setSelectedDownload(null);
  }
};


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderEntertainmentContent = () => {
    if (app.type !== 'movie' && app.type !== 'series') return null;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {app.youtubeId && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Trailer</h2>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${app.youtubeId}`}
                  width="100%"
                  height="100%"
                  controls
                />
              </div>
            </section>
          )}

        <section>
      <h2 className="text-2xl font-semibold mb-4">Capturas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {app.screenshots.map((screenshot, index) => (
          <div
            key={index}
            className="relative aspect-[16/9] overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => setSelectedImage(screenshot)}
          >
            <img
              src={screenshot}
              alt={`Screenshot ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Modal para vista previa */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Vista previa"
            className="max-w-full max-h-full rounded-lg shadow-xl animate-fade-in"
          />
        </div>
      )}
    </section>

          {app.cast && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Reparto</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {app.cast.map((actor, index) => (
                  <div key={index} className="bg-surface p-4 rounded-lg">
                    <p className="font-medium">{actor}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div>
          <section className="bg-surface rounded-xl p-6 sticky top-24">
            <h2 className="text-2xl font-semibold mb-6">Opciones de Descarga</h2>
            <div className="space-y-4">
              {app.downloads?.map((download, index) => (
                <div key={index} className="bg-surface-dark rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{download.quality}</h3>
                      <p className="text-gray-400 text-sm">
                        {download.format} • {download.size}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">{download.server}</p>
                      <p className="text-sm text-green-400">{download.speed}</p>
                    </div>
                  </div>

                  {isDownloading && selectedDownload === index ? (
                    <div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                        <div
                          className="bg-secondary h-2 rounded-full transition-all duration-200"
                          style={{ width: `${downloadProgress}%` }}
                        />
                      </div>
                      <p className="text-center text-sm text-gray-400">
                        Descargando... {downloadProgress}%
                      </p>
                    </div>
                  ) : (
                   <button
                      onClick={() => handleDownload(index)}
                      className="w-full bg-secondary hover:bg-accent text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <Download size={18} />
                      Descargar
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  };

  const renderProgramContent = () => {
    if (app.type === 'movie' || app.type === 'series') return null;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {app.youtubeId && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Video</h2>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${app.youtubeId}`}
                  width="100%"
                  height="100%"
                  controls
                />
              </div>
            </section>
          )}

     <section>
      <h2 className="text-2xl font-semibold mb-4">Capturas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {app.screenshots.map((screenshot, index) => (
          <div
            key={index}
            className="relative aspect-[16/9] overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => setSelectedImage(screenshot)}
          >
            <img
              src={screenshot}
              alt={`Screenshot ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Modal para vista previa */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Vista previa"
            className="max-w-full max-h-full rounded-lg shadow-xl animate-fade-in"
          />
        </div>
      )}
    </section>
    
          <section>
            <h2 className="text-2xl font-semibold mb-4">Información adicional</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Los enlaces de descarga pueden redirigir a sitios externos.</li>
              <li>Verifica los requisitos del sistema antes de instalar.</li>
              <li>Algunos enlaces pueden requerir una cuenta para acceder.</li>
            </ul>
            <div className="mt-4 p-4 border-l-4 border-yellow-500 bg-yellow-900/20 text-yellow-300 rounded">
              ⚠️ <strong>Advertencia:</strong> Asegúrate de descargar solo desde fuentes confiables. No nos hacemos responsables por el uso indebido del contenido.
            </div>
          </section>





          <section>
            <h2 className="text-2xl font-semibold mb-4">Requisitos del Sistema</h2>
            {app.system_requirements && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Mínimos</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Monitor className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-400">Sistema Operativo</p>
                      <p className="text-white">{app.system_requirements?.minimum.os}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Cpu className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-400">Procesador</p>
                      <p className="text-white">{app.system_requirements?.minimum.processor}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <HardDrive className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-400">Memoria RAM</p>
                      <p className="text-white">{app.system_requirements?.minimum.memory}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Monitor className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-400">Gráficos</p>
                      <p className="text-white">{app.system_requirements?.minimum.graphics}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <HardDrive className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-400">Almacenamiento</p>
                      <p className="text-white">{app.system_requirements?.minimum.storage}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Recomendados</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Monitor className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-400">Sistema Operativo</p>
                      <p className="text-white">{app.system_requirements?.recommended.os}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Cpu className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-400">Procesador</p>
                      <p className="text-white">{app.system_requirements?.recommended.processor}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <HardDrive className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-400">Memoria RAM</p>
                      <p className="text-white">{app.system_requirements?.recommended.memory}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Monitor className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-400">Gráficos</p>
                      <p className="text-white">{app.system_requirements?.recommended.graphics}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <HardDrive className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-400">Almacenamiento</p>
                      <p className="text-white">{app.system_requirements?.recommended.storage}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}
          </section>
        </div>

        <div>
          <section className="bg-surface rounded-xl p-6 sticky top-24">
            <div className="text-center mb-4">
              <span className="text-2xl font-bold text-secondary">
                {app.price === 'Free' || app.price === 'Gratis' ? 'Gratis' : app.price}
              </span>
            </div>

            {isDownloading ? (
              <div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className="bg-secondary h-2 rounded-full transition-all duration-200"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
                <p className="text-center text-sm text-gray-400">
                  Descargando... {downloadProgress}%
                </p>
              </div>
            ) : (
               <button
                onClick={() => handleDownload(0)}
                className="w-full bg-secondary hover:bg-accent text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-3 transition-colors"
              >
                <Download size={20} />
                Descargar
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
                  <span className="text-gray-400">Tipo</span>
                  <span className="text-white">{app.type}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-2 py-4 sm:py-2 animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 sm:mb-8 flex items-center text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />

      </button>

      <div className="relative h-[400px] sm:h-[700px] rounded-xl overflow-hidden mb-8 shadow-lg">
        <img
          src={app.imageUrl}
          alt={app.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white">
          <div className="flex items-center gap-4 mb-4">
            {app.logoUrl && (
              <img
                src={app.logoUrl}
                alt={`${app.name} logo`}
                className="h-12 sm:h-16 w-auto object-contain"
              />
            )}
            <h1 className="text-3xl sm:text-5xl font-bold">{app.name}</h1>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base text-gray-300 mb-4">
            {app.type === 'movie' || app.type === 'series' ? (
              <>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {app.duration}
                </span>
                <span className="flex items-center">
                  <Film className="w-4 h-4 mr-1" />
                  {app.genre}
                </span>
                <span className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {app.director}
                </span>
              </>
            ) : (
              <>
                <span className="flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  {app.publisher}
                </span>
                <span className="flex items-center capitalize">
                  <Monitor className="w-4 h-4 mr-1" />
                  {app.type}
                </span>
              </>
            )}

            <span className="flex items-center bg-black/50 px-3 py-1 rounded-full text-white">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              {app.rating}
            </span>
          </div>

          <p className="text-base sm:text-lg text-gray-200 max-w-3xl">{app.description}</p>
        </div>
      </div>

      {renderEntertainmentContent()}
      {renderProgramContent()}
    </div>
  );

};

export default AppDetailsPage;
