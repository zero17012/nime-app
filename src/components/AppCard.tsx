import React, { useState } from 'react';
import { Download, CheckCircle } from 'lucide-react';
import { AppItem } from '../lib/supabase';

interface AppCardProps {
  app: AppItem;
  onClick: (app: AppItem) => void;
}

const AppCard: React.FC<AppCardProps> = ({ app, onClick }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const isExternalLink = (url: string) => {
    const externalHosts = ['gofile.io', 'drive.google.com', 'mega.nz', 'onedrive.live.com'];
    return externalHosts.some(host => url.includes(host));
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isDownloading) return;

    // Si es un enlace externo, abrirlo en una nueva pestaña
    if (isExternalLink(app.downloadUrl)) {
      window.open(app.downloadUrl, '_blank');
      return;
    }

    setIsDownloading(true);

    let iframe: HTMLIFrameElement | null = null;

    try {
      iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      if (iframe.contentWindow) {
        iframe.contentWindow.location.href = app.downloadUrl;
      }

      const interval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsDownloading(false);
              setDownloadProgress(0);
              if (iframe && document.body.contains(iframe)) {
                document.body.removeChild(iframe);
              }
            }, 500);
            return 100;
          }
          return prev + 10;
        });
      }, 300);

    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
      setDownloadProgress(0);
      if (iframe && document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    }
  };

  const isEntrenamiento = app.category === 'entrenamiento';

  return (
    <div
      className={`overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in rounded-lg 
        ${isEntrenamiento ? 'bg-red-600' : 'bg-surface'}`}
      onClick={() => onClick(app)}
    >
      <div className="relative aspect-video">
        <img 
          src={app.image_url} 
          alt={app.name} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {isDownloading ? (
          <div className="absolute bottom-4 right-4 bg-white rounded-full p-2">
            <div className="w-6 h-6 relative">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E91E63"
                  strokeWidth="3"
                  strokeDasharray={`${downloadProgress}, 100`}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-secondary">
                {downloadProgress}%
              </span>
            </div>
          </div>
        ) : (
          <button 
            className="absolute bottom-4 right-4 bg-secondary hover:bg-secondary/80 text-white p-2 rounded-full transition-colors"
            onClick={handleDownload}
          >
            <Download size={15} />
          </button>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-white font-medium text-lg">{app.name}</h3>
          {app.type === 'extension' && (
            <CheckCircle size={16} className="text-secondary mt-1" />
          )}
        </div>
        <p className="text-neutral-400 text-sm line-clamp-2">{app.description}</p>
      </div>
    </div>
  );
};

export default AppCard;
