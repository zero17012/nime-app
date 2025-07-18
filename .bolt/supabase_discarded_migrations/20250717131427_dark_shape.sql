/*
  # Actualizar esquema de apps para soportar versiones, dependencias y episodios

  1. Nuevos campos
    - `versions` (jsonb) - Para versiones anteriores de programas/juegos
    - `dependencies` (jsonb) - Para dependencias requeridas
    - `downloads` (jsonb) - Para múltiples opciones de descarga (películas)
    - `episodes` (jsonb) - Para episodios de series
    - `duration` (text) - Duración de películas/episodios
    - `genre` (text) - Género de entretenimiento
    - `director` (text) - Director de películas/series
    - `cast` (text[]) - Reparto de películas/series

  2. Actualizar tabla existente
    - Agregar nuevos campos con valores por defecto
    - Mantener compatibilidad con datos existentes
*/

-- Agregar nuevos campos a la tabla apps
ALTER TABLE apps 
ADD COLUMN IF NOT EXISTS versions JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS dependencies JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS downloads JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS episodes JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS duration TEXT,
ADD COLUMN IF NOT EXISTS genre TEXT,
ADD COLUMN IF NOT EXISTS director TEXT,
ADD COLUMN IF NOT EXISTS cast TEXT[] DEFAULT '{}';

-- Actualizar algunos registros de ejemplo con datos específicos por tipo

-- Ejemplo para Visual Studio Code (programa con versiones y dependencias)
UPDATE apps SET 
  versions = '[
    {
      "version": "1.84.0",
      "release_date": "2023-11-01",
      "download_url": "https://code.visualstudio.com/sha/download?build=stable&os=win32-x64",
      "changes": "Mejoras en el editor y corrección de errores"
    },
    {
      "version": "1.83.0", 
      "release_date": "2023-10-01",
      "download_url": "https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-archive",
      "changes": "Nuevas funciones de depuración"
    }
  ]'::jsonb,
  dependencies = '[
    {
      "name": ".NET Framework",
      "version": "4.7.2 o superior",
      "required": true,
      "download_url": "https://dotnet.microsoft.com/download/dotnet-framework"
    },
    {
      "name": "Git",
      "version": "2.0 o superior", 
      "required": false,
      "download_url": "https://git-scm.com/downloads"
    }
  ]'::jsonb
WHERE id = 'vscode';

-- Ejemplo para Steam (juego/plataforma con dependencias)
UPDATE apps SET
  dependencies = '[
    {
      "name": "DirectX",
      "version": "11 o superior",
      "required": true,
      "download_url": "https://www.microsoft.com/download/details.aspx?id=35"
    },
    {
      "name": "Visual C++ Redistributable",
      "version": "2019",
      "required": true,
      "download_url": "https://aka.ms/vs/16/release/vc_redist.x64.exe"
    }
  ]'::jsonb
WHERE id = 'steam';

-- Ejemplo para Your Name (película con múltiples resoluciones)
UPDATE apps SET
  type = 'movie',
  duration = '106 min',
  genre = 'Anime, Romance, Drama',
  director = 'Makoto Shinkai',
  cast = '{"Ryunosuke Kamiki", "Mone Kamishiraishi", "Masami Nagasawa"}',
  downloads = '[
    {
      "quality": "4K UHD",
      "format": "MKV",
      "size": "8.5 GB",
      "url": "https://example.com/yourname-4k.mkv",
      "server": "Servidor Premium",
      "speed": "Alta velocidad"
    },
    {
      "quality": "1080p",
      "format": "MP4", 
      "size": "2.1 GB",
      "url": "https://example.com/yourname-1080p.mp4",
      "server": "Servidor Estándar",
      "speed": "Velocidad media"
    },
    {
      "quality": "720p",
      "format": "MP4",
      "size": "1.2 GB", 
      "url": "https://example.com/yourname-720p.mp4",
      "server": "Servidor Básico",
      "speed": "Velocidad básica"
    }
  ]'::jsonb
WHERE id = 'yourname';

-- Agregar ejemplo de serie
INSERT INTO apps (
  id, name, description, category, subcategory, image_url, logo_url,
  screenshots, youtube_id, rating, reviews, price, publisher, download_url,
  type, featured, duration, genre, director, cast, episodes
) VALUES (
  'attackontitan',
  'Attack on Titan',
  'Una serie épica sobre la humanidad luchando contra titanes gigantes en un mundo post-apocalíptico.',
  'entertainment',
  'Series',
  'https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg',
  'https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg',
  ARRAY[
    'https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg',
    'https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg'
  ],
  'dQw4w9WgXcQ',
  4.9,
  15420,
  'Gratis',
  'Wit Studio / MAPPA',
  'https://example.com/aot-s1.zip',
  'series',
  true,
  '24 min por episodio',
  'Anime, Acción, Drama',
  'Tetsuro Araki',
  ARRAY['Yuki Kaji', 'Marina Inoue', 'Yui Ishikawa'],
  '[
    {
      "season": 1,
      "episode": 1,
      "title": "To You, in 2000 Years",
      "duration": "24 min",
      "description": "La humanidad vive tras enormes muros para protegerse de los titanes.",
      "download_url": "https://example.com/aot-s1e1.mp4",
      "quality": "1080p",
      "size": "350 MB"
    },
    {
      "season": 1,
      "episode": 2, 
      "title": "That Day",
      "duration": "24 min",
      "description": "Eren presencia la destrucción de su hogar.",
      "download_url": "https://example.com/aot-s1e2.mp4", 
      "quality": "1080p",
      "size": "340 MB"
    },
    {
      "season": 1,
      "episode": 3,
      "title": "A Dim Light Amid Despair",
      "duration": "24 min", 
      "description": "Los sobrevivientes buscan refugio.",
      "download_url": "https://example.com/aot-s1e3.mp4",
      "quality": "1080p", 
      "size": "345 MB"
    }
  ]'::jsonb
);