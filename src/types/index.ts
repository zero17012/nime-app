export interface SystemRequirements {
  minimum: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
    additional?: string;
  };
  recommended: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
    additional?: string;
  };
}

export interface AppItem {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  imageUrl: string;
  screenshots: string[];
  videoUrl?: string;
  youtubeId?: string;
  rating: number;
  reviews: number;
  price: number | 'Free' | 'Gratis';
  publisher: string;
  featured?: boolean;
  isInstalled?: boolean;
  webPreview?: string;
  type?: 'development' | 'game' | 'extension' | 'web' | 'movie' | 'series';
  downloadUrl: string;
  systemRequirements?: SystemRequirements;
  fileSize?: number;
  year?: number;
  genre?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories?: Category[];
}

export type ViewMode = 'grid' | 'details';