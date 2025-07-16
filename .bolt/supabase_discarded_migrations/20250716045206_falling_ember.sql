/*
  # Insertar aplicaciones de muestra

  1. Datos de muestra
    - Insertar los primeros 3 registros de cada categoría
    - Aplicaciones, Juegos, Entretenimiento
    - Datos tomados del mockData existente

  2. Categorías incluidas
    - apps: Visual Studio Code, Sublime Text, Drop Icons
    - games: Steam, Yuzu, Playnite  
    - entertainment: Your Name
*/

-- Aplicaciones (apps)
INSERT INTO apps (
  id, name, description, category, subcategory, image_url, logo_url, 
  screenshots, youtube_id, rating, reviews, price, publisher, download_url, 
  type, featured, system_requirements
) VALUES 
(
  'vscode',
  'Visual Studio Code',
  'Visual Studio Code es un editor de código fuente desarrollado por Microsoft para Windows, Linux, macOS y Web. Incluye soporte para la depuración, control integrado de Git, resaltado de sintaxis, finalización inteligente de código, fragmentos y refactorización de código.',
  'apps',
  'Software',
  'https://jonathancv.neocities.org/Nime%20Studio/Visual%20Studio%20Code/banner.jpg',
  'https://jonathancv.neocities.org/Nime%20Studio/Visual%20Studio%20Code/logo.png',
  ARRAY['https://jonathancv.neocities.org/Nime%20Studio/Visual%20Studio%20Code/hero.png'],
  'CxF3ykWP1H4',
  4.8,
  1000000,
  'Free',
  'Microsoft',
  'https://update.code.visualstudio.com/latest/win32-x64-user/stable',
  'development',
  true,
  '{
    "minimum": {
      "os": "Windows 7, 8, 10, 11",
      "processor": "Intel Core i3 o AMD equivalente (1.6 GHz o superior)",
      "memory": "1 GB RAM",
      "graphics": "Compatible con DirectX 9",
      "storage": "500 MB de espacio libre"
    },
    "recommended": {
      "os": "Windows 10 o superior",
      "processor": "Intel Core i5 o AMD Ryzen 5 (2.0 GHz o superior)",
      "memory": "4 GB RAM o más",
      "graphics": "Compatible con DirectX 11",
      "storage": "1 GB de espacio libre"
    }
  }'::jsonb
),
(
  'sublime',
  'Sublime Text',
  'Sublime Text es un editor de texto y editor de código fuente. Está escrito en C++ y Python para los plugins.​ Desarrollado originalmente como una extensión de Vim, con el tiempo fue creando una identidad propia.',
  'apps',
  'Software',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhQq9YkCjTltAmLZnL8efmRDRm4139KziGNvC2efvz2JRbDu_Feo4a9zpBHbJfF0MbJdLbbSYHfcrSGWmY3Mx941o_gbb3u_YTB5Fh3DlcmuA-2LuygZu0N-u3VHyw4vo_h5-oG-kOvs3WU/s1600/sublime-header-e1549925268193-768x390.png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlPDDOjs-NRNNFRboOOlP0aELPnIilPCRo5Q&s',
  ARRAY['https://www.sublimetext.com/screenshots/sublime_text_4.png'],
  'FjWG_W88c2o',
  4.7,
  1000000,
  'Free',
  'Sublime HQ',
  'https://www.sublimetext.com/download_thanks?target=win-x64',
  'development',
  false,
  '{
    "minimum": {
      "os": "Windows 7, 8, 10, 11",
      "processor": "Intel Core i3 o AMD equivalente (1.0 GHz o superior)",
      "memory": "1 GB RAM",
      "graphics": "Compatible con DirectX 9",
      "storage": "250 MB de espacio libre"
    },
    "recommended": {
      "os": "Windows 10 o superior",
      "processor": "Intel Core i5 o AMD Ryzen 5",
      "memory": "4 GB RAM o más",
      "graphics": "Compatible con DirectX 11",
      "storage": "500 MB de espacio libre"
    }
  }'::jsonb
),
(
  'dropicons',
  'Drop Icons',
  'Drop Icons es una aplicación de código abierto para convertir imágenes en iconos (.ico) para Windows, con una sencilla función de arrastrar y soltar.',
  'apps',
  'Software',
  'https://jonathancv.neocities.org/Captura%20de%20pantalla%202025-05-09%20095704.png',
  'https://jonathancv.neocities.org/drop.png',
  ARRAY[
    'https://genesistoxical.github.io/drop-icons/assets/Drop-Icons-App-v2.gif',
    'https://genesistoxical.github.io/drop-icons/assets/Drop-Icons-Options-v2.gif'
  ],
  '3rIlpAgfWdY',
  4.8,
  2500,
  '29.99',
  'Iconicer',
  'https://github.com/Zero12123/test/raw/main/Drop%20Icons.rar',
  'apps',
  false,
  '{
    "minimum": {
      "os": "Windows 7, 8, 10, 11",
      "processor": "Intel Pentium 4 o AMD Athlon 64 (1.0 GHz o superior)",
      "memory": "512 MB RAM",
      "graphics": "Compatible con DirectX 9",
      "storage": "50 MB de espacio libre"
    },
    "recommended": {
      "os": "Windows 10 o superior",
      "processor": "Intel Core i3 o AMD Ryzen 3",
      "memory": "2 GB RAM o más",
      "graphics": "Compatible con DirectX 11",
      "storage": "100 MB de espacio libre"
    }
  }'::jsonb
);

-- Juegos (games)
INSERT INTO apps (
  id, name, description, category, subcategory, image_url, logo_url,
  screenshots, youtube_id, rating, reviews, price, publisher, download_url,
  type, featured, system_requirements
) VALUES
(
  'steam',
  'Steam',
  'Plataforma definitiva para jugar, discutir y crear juegos',
  'games',
  'Plataforma',
  'https://clan.cloudflare.steamstatic.com/images/41316928/f7f5587c77587cc8ae5eb50e39defcbcc3acaa88.jpg',
  'https://jonathancv.neocities.org/Nime%20Studio/steam/Steam-Logo.png',
  ARRAY['https://jonathancv.neocities.org/Nime%20Studio/steam/steam-3951018.webp'],
  'G3_TTII32lg',
  4.9,
  85000,
  'Free',
  'Valve',
  'https://cdn.akamai.steamstatic.com/client/installer/SteamSetup.exe',
  'game',
  false,
  '{
    "minimum": {
      "os": "Windows 7 / macOS X 10.9 / Ubuntu 12.04",
      "processor": "2.8 GHz dual-core",
      "memory": "1 GB RAM",
      "graphics": "DirectX 9 compatible",
      "storage": "200 MB"
    },
    "recommended": {
      "os": "Windows 10 / macOS X 10.13 / Ubuntu 18.04",
      "processor": "2.5 GHz dual-core",
      "memory": "4 GB RAM",
      "graphics": "DirectX 11 compatible",
      "storage": "1 GB"
    }
  }'::jsonb
),
(
  'yuzu',
  'Yuzu',
  'Yuzu, fue un proyecto para desarrollar un emulador libre y de código abierto de Nintendo Switch. Se anunció que Yuzu estaría en desarrollo el 14 de enero de 2018, ​​ 10 meses después del lanzamiento de Nintendo Switch.',
  'games',
  'Emulador',
  'https://cdn2.steamgriddb.com/thumb/07329c52f7966a5d9cd3a0c148da52aa.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Yuzu_Emulator.svg/1843px-Yuzu_Emulator.svg.png',
  ARRAY[
    'https://www.notebookcheck.nl/fileadmin/Notebooks/News/_nc3/NSwitch_TheLegendOfZeldaTearsOfTheKingdom_26.jpg',
    'https://www.hd-tecnologia.com/imagenes/articulos/2019/07/El-emulador-Yuzu-ya-puede-correr-juegos-de-Switch-con-resoluci%C3%B3n-8K-600x300.jpg'
  ],
  'ZGeqCZ7JBFc',
  5.0,
  2000000,
  'Free',
  'Yuzu Team',
  'https://gofile.io/d/16ede1bd-6ee7-4343-b3c7-a4d665531f52',
  'game',
  false,
  '{
    "minimum": {
      "os": "Windows 7 / 8.1 / 10 (64-bit), Ubuntu 18.04 (64-bit), macOS 10.12 (64-bit)",
      "processor": "Intel Core i5-4430 / AMD Ryzen 3 1200",
      "memory": "8 GB RAM",
      "graphics": "NVIDIA GeForce GTX 1060 / AMD Radeon RX 570",
      "storage": "1 GB disponible"
    },
    "recommended": {
      "os": "Windows 10 (64-bit), Ubuntu 20.04 (64-bit), macOS 10.14 (64-bit)",
      "processor": "Intel Core i7-6700K / AMD Ryzen 5 3600",
      "memory": "16 GB RAM",
      "graphics": "NVIDIA GeForce GTX 1660 / AMD Radeon RX 5700",
      "storage": "1 GB disponible"
    }
  }'::jsonb
),
(
  'playnite',
  'Playnite',
  'Playnite es un lanzador de videojuegos de código abierto para Windows que unifica todas tus bibliotecas de juegos en una sola interfaz. Permite importar títulos desde Steam, GOG, Epic, Origin, Battle.net y otros servicios.',
  'games',
  'Launcher',
  'https://repository-images.githubusercontent.com/86182490/c9590600-7403-11ea-91aa-1446457c89c9',
  'https://playnite.link/applogo.png',
  ARRAY[
    'https://playnite.link/screen1.jpg',
    'https://playnite.link/screen2.jpg',
    'https://playnite.link/screen3.jpg'
  ],
  'RaCzwL46Adk',
  4.7,
  120000,
  'Gratis',
  'Josef Nemec',
  'https://playnite.link/download/PlayniteInstaller.exe',
  'application',
  false,
  '{
    "minimum": {
      "os": "Windows 10",
      "processor": "CPU dual-core",
      "memory": "2 GB",
      "graphics": "Compatible con DirectX 10",
      "storage": "200 MB"
    },
    "recommended": {
      "os": "Windows 10",
      "processor": "CPU de 4 núcleos",
      "memory": "4 GB",
      "graphics": "Compatible con DirectX 11",
      "storage": "500 MB"
    }
  }'::jsonb
);

-- Entretenimiento (entertainment)
INSERT INTO apps (
  id, name, description, category, subcategory, image_url, logo_url,
  screenshots, youtube_id, rating, reviews, price, publisher, download_url,
  type, featured, system_requirements
) VALUES
(
  'your-name',
  'Your Name',
  'Mitsuha y Taki son dos estudiantes de secundaria que viven en diferentes partes de Japón y nunca se han conocido. Cuando comienzan a intercambiar cuerpos mientras duermen, sus vidas se entrelazan de maneras inesperadas.',
  'entertainment',
  'Anime',
  'https://images.pexels.com/photos/9899966/pexels-photo-9899966.jpeg',
  null,
  ARRAY[
    'https://images.pexels.com/photos/9899966/pexels-photo-9899966.jpeg',
    'https://images.pexels.com/photos/9899967/pexels-photo-9899967.jpeg',
    'https://images.pexels.com/photos/9899968/pexels-photo-9899968.jpeg'
  ],
  'xU47nhruN-Q',
  4.9,
  15000,
  'Free',
  'CoMix Wave Films',
  '#',
  'movie',
  false,
  null
);