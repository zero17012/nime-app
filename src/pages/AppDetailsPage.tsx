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
  Package,
  History,
  PlayCircle,
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

  const handleDownload = async (index: number, url?: string) => {
    if (isDownloading) return;

    let downloadUrl: string | undefined;

    if (url) {
      downloadUrl = url;
    } else if (app.downloads?.[index]) {
      downloadUrl = app.downloads[index].url;
    } else {
      downloadUrl = app.download_url;
    }

    if (!downloadUrl) return;

    if (isExternalLink(downloadUrl) || isDirectDownloadLink(downloadUrl)) {
      window.open(downloadUrl, '_blank');
      return;
    }

    setSelectedDownload(index);
    setIsDownloading(true);

    try {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      iframe.src = downloadUrl;

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

  // Renderizar sección de versiones anteriores (para programas y juegos)
  const renderVersionsSection = () => {
    if (!app.versions || app.versions.length === 0) return null;
    if (app.type === 'movie' || app.type === 'series') return null;

    return (
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <History className="w-6 h-6" />
          Versiones Anteriores
        </h2>
        <div className="space-y-4">
          {app.versions.map((version, index) => (
            <div key={index} className="bg-surface p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">Versión {version.version}</h3>
                  <p className="text-gray-400 text-sm">{version.release_date}</p>
                </div>
                <button
                  onClick={() => handleDownload(-1, version.download_url)}
                  className="bg-secondary hover:bg-accent text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                >
                  <Download size={16} />
                  Descargar
                </button>
              </div>
              <p className="text-gray-300 text-sm">{version.changes}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Renderizar sección de dependencias (para programas y juegos)
  const renderDependenciesSection = () => {
    if (!app.dependencies || app.dependencies.length === 0) return null;
    if (app.type === 'movie' || app.type === 'series') return null;

    return (
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Package className="w-6 h-6" />
          Dependencias
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {app.dependencies.map((dep, index) => (
            <div key={index} className="bg-surface p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{dep.name}</h3>
                  <p className="text-gray-400 text-sm">Versión: {dep.version}</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs mt-1 ${
                    dep.required ? 'bg-red-900/20 text-red-300' : 'bg-blue-900/20 text-blue-300'
                  }`}>
                    {dep.required ? 'Requerido' : 'Opcional'}
                  </span>
                </div>
                <button
                  onClick={() => window.open(dep.download_url, '_blank')}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Descargar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Renderizar sección de episodios (para series)
  const renderEpisodesSection = () => {
    if (app.type !== 'series' || !app.episodes || app.episodes.length === 0) return null;

    return (
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <PlayCircle className="w-6 h-6" />
          Episodios
        </h2>
        <div className="space-y-3">
          {app.episodes.map((episode, index) => (
            <div key={index} className="bg-surface p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    T{episode.season}E{episode.episode}: {episode.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">{episode.duration} • {episode.quality} • {episode.size}</p>
                  <p className="text-gray-300 text-sm">{episode.description}</p>
                </div>
                <div className="ml-4">
                  {isDownloading && selectedDownload === index ? (
                    <div className="text-center">
                      <div className="w-16 bg-gray-700 rounded-full h-2 mb-2">
                        <div
                          className="bg-secondary h-2 rounded-full transition-all duration-200"
                          style={{ width: `${downloadProgress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400">{downloadProgress}%</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleDownload(index, episode.download_url)}
                      className="bg-secondary hover:bg-accent text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                    >
                      <Download size={16} />
                      Descargar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Renderizar contenido para entretenimiento (películas y series)
  const renderEntertainmentContent = () => {
    if (app.type !== 'movie' && app.type !== 'series') return null;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {app.youtube_id && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Trailer</h2>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${app.youtube_id}`}
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

          {/* Episodios para series */}
          {renderEpisodesSection()}
        </div>

        <div>
          <section className="bg-surface rounded-xl p-6 sticky top-24">
            <h2 className="text-2xl font-semibold mb-6">
              {app.type === 'series' ? 'Información de la Serie' : 'Opciones de Descarga'}
            </h2>
            
            {app.type === 'movie' && app.downloads && app.downloads.length > 0 ? (
              <div className="space-y-4">
                {app.downloads.map((download, index) => (
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
            ) : (
              <div className="text-center mb-4">
                <span className="text-2xl font-bold text-secondary">
                  {app.price === 'Free' || app.price === 'Gratis' ? 'Gratis' : app.price}
                </span>
              </div>
            )}

            <div className="border-t border-gray-700 pt-4 mt-6">
              <h4 className="text-gray-400 text-sm mb-2">Información</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">
                    {app.type === 'movie' || app.type === 'series' ? 'Estudio' : 'Desarrollador'}
                  </span>
                  <span className="text-white">{app.publisher}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Categoría</span>
                  <span className="text-white">{app.subcategory}</span>
                </div>
                {app.genre && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Género</span>
                    <span className="text-white">{app.genre}</span>
                  </div>
                )}
                {app.duration && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duración</span>
                    <span className="text-white">{app.duration}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Tipo</span>
                  <span className="text-white capitalize">{app.type}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  };

  // Renderizar contenido para programas y juegos
  const renderProgramContent = () => {
    if (app.type === 'movie' || app.type === 'series') return null;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {app.youtube_id && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Video</h2>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${app.youtube_id}`}
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

          {/* Versiones anteriores */}
          {renderVersionsSection()}

          {/* Dependencias */}
          {renderDependenciesSection()}

          {app.system_requirements && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Requisitos del Sistema</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Mínimos</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Monitor className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-400">Sistema Operativo</p>
                        <p className="text-white">{app.system_requirements.minimum.os}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Cpu className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-400">Procesador</p>
                        <p className="text-white">{app.system_requirements.minimum.processor}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <HardDrive className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-400">Memoria RAM</p>
                        <p className="text-white">{app.system_requirements.minimum.memory}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Monitor className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-400">Gráficos</p>
                        <p className="text-white">{app.system_requirements.minimum.graphics}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <HardDrive className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-400">Almacenamiento</p>
                        <p className="text-white">{app.system_requirements.minimum.storage}</p>
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
                        <p className="text-white">{app.system_requirements.recommended.os}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Cpu className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-400">Procesador</p>
                        <p className="text-white">{app.system_requirements.recommended.processor}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <HardDrive className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-400">Memoria RAM</p>
                        <p className="text-white">{app.system_requirements.recommended.memory}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Monitor className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-400">Gráficos</p>
                        <p className="text-white">{app.system_requirements.recommended.graphics}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <HardDrive className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-400">Almacenamiento</p>
                        <p className="text-white">{app.system_requirements.recommended.storage}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        <div>
          <section className="bg-surface rounded-xl p-6 sticky top-24">
            <div className="text-center mb-4">
              <span className="text-2xl font-bold text-secondary">
                {app.price === 'Free' || app.price === 'Gratis' ? 'Gratis' : app.price}
              </span>
            </div>

            {isDownloading && selectedDownload === 0 ? (
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

            <div className="border-t border-gray-700 pt-4 mt-6">
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
                  <span className="text-white capitalize">{app.type}</span>
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
        Volver
      </button>

      <div className="relative h-[400px] sm:h-[700px] rounded-xl overflow-hidden mb-8 shadow-lg">
        <img
          src={app.image_url}
          alt={app.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white">
          <div className="flex items-center gap-4 mb-4">
            {app.logo_url && (
              <img
                src={app.logo_url}
                alt={`${app.name} logo`}
                className="h-12 sm:h-16 w-auto object-contain"
              />
            )}
            <h1 className="text-3xl sm:text-5xl font-bold">{app.name}</h1>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base text-gray-300 mb-4">
            {app.type === 'movie' || app.type === 'series' ? (
              <>
                {app.duration && (
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {app.duration}
                  </span>
                )}
                {app.genre && (
                  <span className="flex items-center">
                    <Film className="w-4 h-4 mr-1" />
                    {app.genre}
                  </span>
                )}
                {app.director && (
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {app.director}
                  </span>
                )}
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