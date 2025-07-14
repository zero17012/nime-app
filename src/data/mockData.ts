import { AppItem, Category } from '../types';

export const categories: Category[] = [
  { id: 'home', name: 'Inicio', icon: 'Home' },
  { id: 'entertainment', name: 'Entretenimiento', icon: 'Film' },
  {
    id: 'apps',
    name: 'Aplicaciones',
    icon: 'LayoutGrid',
    subcategories: [
      { id: 'development', name: 'Desarrollo', icon: 'Code' },
      { id: 'productivity', name: 'Productividad', icon: 'Briefcase' },
      { id: 'design', name: 'Diseño', icon: 'Palette' },
      {id: 'entertainment', name: 'Entretenimiento', icon: 'Film' }
    ]
  },
  { id: 'games', name: 'Juegos', icon: 'Gamepad2' },
  //{ id: 'extensions', name: 'Extensiones', icon: 'Puzzle' },
  //{ id: 'websites', name: 'Utilidades', icon: 'Globe' },
  //{ id: 'new', name: 'Novedades', icon: 'Sparkles' },
  //{ id: 'add', name: 'Añadir', icon: 'Plus' }
];

export const appData: AppItem[] = [


  // Páginas Útiles - Entretenimiento
  {
    id: 'Steam',
    name: 'Stremio',
    description: 'Plataforma de streaming gratuita que te permite ver películas, series y canales de TV. Organiza y reproduce todo tu contenido multimedia con addons.',
    category: 'websites',
    subcategory: 'Entretenimiento',
    imageUrl: 'https://images.pexels.com/photos/2726370/pexels-photo-2726370.jpeg',
    screenshots: [
      'https://images.pexels.com/photos/2726370/pexels-photo-2726370.jpeg',
      'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg'
    ],
    youtubeId: 'I2UKjyszmfU',
    rating: 4.8,
    reviews: 35000,
    price: 'Free',
    publisher: 'Stremio',
    type: 'web',
    webPreview: 'https://www.stremio.com',
    downloadUrl: 'https://www.stremio.com',
    featured: false
  },


  //Visual Studio Code - Listo
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    description: 'Visual Studio Code es un editor de código fuente desarrollado por Microsoft para Windows, Linux, macOS y Web. Incluye soporte para la depuración, control integrado de Git, resaltado de sintaxis, finalización inteligente de código, fragmentos y refactorización de código.',
    category: 'apps',
    subcategory: 'Software',
    logoUrl: 'https://jonathancv.neocities.org/Nime%20Studio/Visual%20Studio%20Code/logo.png',
    imageUrl: 'https://jonathancv.neocities.org/Nime%20Studio/Visual%20Studio%20Code/banner.jpg',
    screenshots: [
      'https://jonathancv.neocities.org/Nime%20Studio/Visual%20Studio%20Code/hero.png',


    ],
    youtubeId: 'CxF3ykWP1H4',
    rating: 4.8,
    reviews: 1000000,
    price: 'Free',
    publisher: 'Microsoft',
    downloadUrl: 'https://update.code.visualstudio.com/latest/win32-x64-user/stable',
    type: 'development',
    featured: true,
    systemRequirements: {
      minimum: {
        os: "Windows 7, 8, 10, 11",
        processor: "Intel Core i3 o AMD equivalente (1.6 GHz o superior)",
        memory: "1 GB RAM",
        graphics: "Compatible con DirectX 9",
        storage: "500 MB de espacio libre"
      },
      recommended: {
        os: "Windows 10 o superior",
        processor: "Intel Core i5 o AMD Ryzen 5 (2.0 GHz o superior)",
        memory: "4 GB RAM o más",
        graphics: "Compatible con DirectX 11",
        storage: "1 GB de espacio libre"
      }
    }


  },
  //Sublime Text - Listo
  {
    id: 'sublime',
    name: 'Sublime Text',
    description: 'Sublime Text es un editor de texto y editor de código fuente. Está escrito en C++ y Python para los plugins.​ Desarrollado originalmente como una extensión de Vim, con el tiempo fue creando una identidad propia. Aún conserva un modo de edición tipo vi llamado Vintage mode.​',
    category: 'apps',
    logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlPDDOjs-NRNNFRboOOlP0aELPnIilPCRo5Q&s',
    subcategory: 'Software',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhQq9YkCjTltAmLZnL8efmRDRm4139KziGNvC2efvz2JRbDu_Feo4a9zpBHbJfF0MbJdLbbSYHfcrSGWmY3Mx941o_gbb3u_YTB5Fh3DlcmuA-2LuygZu0N-u3VHyw4vo_h5-oG-kOvs3WU/s1600/sublime-header-e1549925268193-768x390.png',
    screenshots: [
      'https://www.sublimetext.com/screenshots/sublime_text_4.png',
    ],
    youtubeId: 'FjWG_W88c2o',
    rating: 4.7,
    reviews: 1000000,
    price: 'Free',
    publisher: 'Sublime HQ',
    downloadUrl: 'https://www.sublimetext.com/download_thanks?target=win-x64',
    type: 'development',
    systemRequirements: {
      minimum: {
        os: "Windows 7, 8, 10, 11",
        processor: "Intel Core i3 o AMD equivalente (1.0 GHz o superior)",
        memory: "1 GB RAM",
        graphics: "Compatible con DirectX 9",
        storage: "250 MB de espacio libre"
      },
      recommended: {
        os: "Windows 10 o superior",
        processor: "Intel Core i5 o AMD Ryzen 5",
        memory: "4 GB RAM o más",
        graphics: "Compatible con DirectX 11",
        storage: "500 MB de espacio libre"
      }
    }


  },
  //Drop Icons - Check
  {
    id: 'dropicons',
    name: 'Drop Icons',
    description: 'Drop Icons es una aplicación de código abierto para convertir imágenes en iconos (.ico) para Windows, con una sencilla función de arrastrar y soltar.',
    category: 'apps',
    subcategory: 'Software',
    logoUrl: 'https://jonathancv.neocities.org/drop.png',
    imageUrl: 'https://jonathancv.neocities.org/Captura%20de%20pantalla%202025-05-09%20095704.png',
    screenshots: [
      'https://genesistoxical.github.io/drop-icons/assets/Drop-Icons-App-v2.gif',
      'https://genesistoxical.github.io/drop-icons/assets/Drop-Icons-Options-v2.gif'
    ],
    youtubeId: '3rIlpAgfWdY',
    rating: 4.8,
    reviews: 2500,
    price: 29.99,
    publisher: 'Iconicer',
    downloadUrl: 'https://github.com/Zero12123/test/raw/main/Drop%20Icons.rar',
    type: 'apps',
    systemRequirements: {
      minimum: {
        os: "Windows 7, 8, 10, 11",
        processor: "Intel Pentium 4 o AMD Athlon 64 (1.0 GHz o superior)",
        memory: "512 MB RAM",
        graphics: "Compatible con DirectX 9",
        storage: "50 MB de espacio libre"
      },
      recommended: {
        os: "Windows 10 o superior",
        processor: "Intel Core i3 o AMD Ryzen 3",
        memory: "2 GB RAM o más",
        graphics: "Compatible con DirectX 11",
        storage: "100 MB de espacio libre"
      }
    }


  },
  //Upscayl - check
  {
    "id": "upscayl",
    "name": "Upscayl",
    "description": "Upscayl puede mejorar imágenes de baja resolución e imágenes pixeladas, pero no puede desenfocar ni realizar ajustes de enfoque en la imagen.",
    "category": "apps",
    "subcategory": "Software",
    "imageUrl": "https://jonathancv.neocities.org/Nime%20Studio/upscayl/og-image.webp",
    logoUrl: 'https://img.utdstc.com/icon/fbf/90f/fbf90f020ccdd3d8bb839a831ac41a5d91a9d19650c94018c7e25059ae6cab40:200',
    "screenshots": [
      "https://jonathancv.neocities.org/Nime%20Studio/upscayl/Upscayl.jpg",
      "https://jonathancv.neocities.org/Nime%20Studio/upscayl/3_lV2SCpS.webp"
    ],
    "youtubeId": "YeR4yFyyjFI",
    featured: true,
    "rating": 5,
    "reviews": 200000,
    "price": 0,
    "publisher": "Upscayl.",
    "downloadUrl": "https://github.com/upscayl/upscayl/releases/download/v2.15.0/upscayl-2.15.0-win.exe",
    "type": "development",
    systemRequirements: {
      minimum: {
        os: "Windows 10 o 11",
        processor: "Intel Core i3 o AMD Ryzen 3 (mínimo 2 núcleos)",
        memory: "4 GB RAM",
        graphics: "GPU compatible con Vulkan (por ejemplo, Intel HD Graphics 620, AMD Radeon Vega 8)",
        storage: "200 MB de espacio libre"
      },
      recommended: {
        os: "Windows 10 o 11",
        processor: "Intel Core i5 o AMD Ryzen 5",
        memory: "8 GB RAM o más",
        graphics: "GPU dedicada compatible con Vulkan (por ejemplo, NVIDIA GTX 1050 o superior)",
        storage: "500 MB de espacio libre"
      }
    }

  },
  //Microsoft office 2019 - check
  {
    id: 'office-2019',
    name: 'Microsoft Office 2019',
    description: 'Microsoft Office 2019 es una suite de aplicaciones de productividad, que incluye aplicaciones como Word, Excel, PowerPoint, Outlook, y más. Es la última versión de la suite de oficina de Microsoft antes de la transición completa a Office 365. Está diseñada para usuarios que prefieren software de pago con licencia perpetua.',
    category: 'apps',
    subcategory: 'Software',
    logoUrl: 'https://img.icons8.com/fluent/512/microsoft-office-2019.png',
    imageUrl: 'https://www.mailmaster.co.th/public/upload/blog/mailmaster-in-th_5bab49a26662c_o.jpg',
    screenshots: [
      'https://cdn.mos.cms.futurecdn.net/4ZEqdYxz5NZ7Ybiiiw6aXb.png',
      'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Story-blade_02_work-across-devices_RWLUNh:VP1-539x349?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1500&hei=1020&qlt=75&fit=constrain',
    ],
    youtubeId: 'ndaD7GLITmA',
    rating: 4.6,
    feacture: false,
    reviews: 500000,
    price: 'Desde $149.99',
    publisher: 'Microsoft',
    downloadUrl: 'https://gofile.io/d/4c2825f0-5fb5-417a-b47f-1193fef25996',
    type: 'productivity',
    featured: false,
    systemRequirements: {
      minimum: {
        os: "Windows 10, Windows Server 2019",
        processor: "1.6 GHz, 2 núcleos",
        memory: "4 GB",
        graphics: "DirectX 9 compatible o superior",
        storage: "4 GB de espacio disponible"
      },
      recommended: {
        os: "Windows 10, Windows Server 2019",
        processor: "2.5 GHz, 4 núcleos",
        memory: "8 GB",
        graphics: "DirectX 11 compatible o superior",
        storage: "4 GB de espacio disponible"
      }
    }
  },
  //spacedesk - check
  {
    id: 'spacedesk',
    name: 'spacedesk',
    description: 'spacedesk es una aplicación que permite convertir dispositivos Android en pantallas secundarias para tu PC con Windows. Utiliza la red local (Wi-Fi o Ethernet) para extender o duplicar la pantalla de tu computadora en otros dispositivos, lo que permite una experiencia multitarea más fluida y un uso eficiente del espacio en pantallas adicionales.',
    category: 'apps',
    subcategory: 'Productivity',
    logoUrl: 'https://play-lh.googleusercontent.com/wmAFJtQXntcOvlr-TLkjwPgqDFyES77JK3wKITKShv4QRiGASc9ADaQd36F62ptkANo',
    imageUrl: 'https://www.provideocoalition.com/wp-content/uploads/spacedesk001.jpg',
    screenshots: [
      'https://play-lh.googleusercontent.com/OltJQ3S8zNacl6Ecxnt_I8V79d_l9Ze_sL38bRbPA3abTXaBifwCrInJjFjt_rVyFg_6=w526-h296-rw',
    ],
    youtubeId: 'vy7FdAWsx_o',
    rating: 4.5,
    reviews: 200000,
    price: 'Gratis',
    publisher: 'spacedesk',
    downloadUrl: 'https://www.spacedesk.net/downloadidd64',
    type: 'utility',
    featured: false,
    systemRequirements: {
      minimum: {
        os: "Windows 7 o superior",
        processor: "Intel Core i3 o equivalente",
        memory: "2 GB",
        graphics: "Compatible con DirectX 9",
        storage: "100 MB"
      },
      recommended: {
        os: "Windows 10",
        processor: "Intel Core i5 o superior",
        memory: "4 GB",
        graphics: "Compatible con DirectX 11",
        storage: "200 MB"
      }
    }
  },

  //anydesk - check
  {
    id: 'anydesk',
    name: 'AnyDesk',
    description: 'AnyDesk es un software de control remoto y acceso a escritorios que permite a los usuarios conectarse a equipos y dispositivos desde cualquier parte del mundo. Ofrece alta calidad de imagen, baja latencia y es utilizado tanto para uso personal como profesional.',
    category: 'apps',
    subcategory: 'Acceso remoto',
    logoUrl: 'https://img.icons8.com/?size=512&id=cDG2YNX6xhA6&format=png',
    imageUrl: 'https://grupoioe.es/wp-content/uploads/2024/10/anydesk.webp',
    screenshots: [
      'https://support.anydesk.com/hs-fs/hubfs/image-png-Jul-31-2024-02-33-57-8637-PM.png?width=688&height=422&name=image-png-Jul-31-2024-02-33-57-8637-PM.png',
      'https://www.ionos.es/digitalguide/fileadmin/_processed_/b/8/csm_anydesk_1c3fb44d13.webp'
    ],
    youtubeId: 'bbE86K8AfDY',
    rating: 4.7,
    reviews: 2500000,
    price: 'Free / Paid',
    publisher: 'AnyDesk Software GmbH',
    downloadUrl: 'https://download.anydesk.com/AnyDesk.exe',
    type: 'software',
    featured: false,
    systemRequirements: {
      minimum: {
        os: "Windows 7, 8, 10, 11",
        processor: "Procesador Intel o AMD de 1 GHz o superior",
        memory: "2 GB de RAM",
        graphics: "Tarjeta gráfica compatible con OpenGL 2.0",
        storage: "100 MB de espacio disponible"
      },
      recommended: {
        os: "Windows 10 o superior",
        processor: "Procesador Intel i3 o AMD Ryzen 3 a 2 GHz o superior",
        memory: "4 GB de RAM",
        graphics: "Tarjeta gráfica compatible con OpenGL 3.3",
        storage: "100 MB de espacio disponible"
      }
    }

  },

  //brave - check
  {
    id: 'brave',
    name: 'Brave',
    description: 'Brave es un navegador web centrado en la privacidad que bloquea anuncios y rastreadores de manera predeterminada. También permite a los usuarios ganar recompensas por ver anuncios opcionales. Su enfoque en la seguridad y el rendimiento lo convierte en una alternativa popular a otros navegadores.',
    category: 'apps',
    subcategory: 'Web Browser',
    logoUrl: 'https://logodownload.org/wp-content/uploads/2022/04/brave-logo-0.png',
    imageUrl: 'https://t7m8e9c8.delivery.rocketcdn.me/wp-content/uploads/2020/06/navegador-brave.jpg',
    screenshots: [
      'https://blogthinkbig.com/wp-content/uploads/sites/4/2019/11/Brave-Browser-Privacy.jpg?fit=1500%2C1000',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDrHgOKX6iUrQ6N9CW5MzNDnIBe8av-GQbAQmJTv-52C4eYBOnpRAGe5Vns5TCCP5sALE&usqp=CAU'
    ],
    youtubeId: 'Awhs5gjhyV0',
    rating: 4.6,
    reviews: 5000000,
    price: 'Free',
    publisher: 'Brave Software',
    downloadUrl: 'https://laptop-updates.brave.com/download/BRV015?bitness=64',
    type: 'software',
    featured: false,
    systemRequirements: {
      minimum: {
        os: "Windows 7, 8, 10, 11",
        processor: "Procesador Intel o AMD de 1.8 GHz o superior",
        memory: "2 GB de RAM",
        graphics: "Tarjeta gráfica compatible con WebGL 2.0",
        storage: "200 MB de espacio disponible"
      },
      recommended: {
        os: "Windows 10 o superior",
        processor: "Procesador Intel i3 o AMD Ryzen 3 a 2.0 GHz o superior",
        memory: "4 GB de RAM",
        graphics: "Tarjeta gráfica compatible con WebGL 2.0",
        storage: "200 MB de espacio disponible"
      }
    }

  },
  //opera gx - check
  {
    id: 'opera_gx',
    name: 'Opera GX',
    description: 'Opera GX es un navegador web enfocado en los jugadores. Ofrece características como el control de la CPU, RAM y el ancho de banda de la red para que el navegador no interfiera con el rendimiento de los juegos. También incluye integraciones con plataformas de streaming y personalización temática.',
    category: 'apps',
    subcategory: 'Web Browser',
    logoUrl: 'https://images.icon-icons.com/3053/PNG/512/opera_gx_macos_bigsur_icon_189866.png',
    imageUrl: 'https://cdn-production-opera-website.operacdn.com/staticfiles/assets/images/og/og-opera-lp-opera-gx.4c628195330d.png',
    screenshots: [
      'https://cdn-production-opera-website.operacdn.com/staticfiles/assets/images/sections/2023/hero-top/gx/opera__gx--hero.1d817bdb8ff5.png',
      'https://cdn-production-opera-website.operacdn.com/staticfiles/assets/images/sections/2023/hero-top/gx/opera__gx--hero-bottom.c7bd66fe0148.png',
      'https://t2.tudocdn.net/734885?w=824&h=494'
    ],
    youtubeId: '9Vuaj6vyedo',
    rating: 4.5,
    reviews: 1000000,
    price: 'Free',
    publisher: 'Opera Software',
    downloadUrl: 'https://net.geo.opera.com/opera_gx/stable/windows?utm_tryagain=yes',
    type: 'software',
    featured: false,
    systemRequirements: {
      minimum: {
        os: "Windows 7, 8, 10, 11",
        processor: "Procesador Intel o AMD de 1.6 GHz o superior",
        memory: "2 GB de RAM",
        graphics: "Tarjeta gráfica compatible con OpenGL 2.0",
        storage: "200 MB de espacio disponible"
      },
      recommended: {
        os: "Windows 10 o superior",
        processor: "Procesador Intel i5 o AMD Ryzen 5 a 2.0 GHz o superior",
        memory: "4 GB de RAM",
        graphics: "Tarjeta gráfica compatible con OpenGL 3.0",
        storage: "200 MB de espacio disponible"
      }
    }

  },
  //vlc Media Player - check
  {
    id: 'vlc',
    name: 'VLC Media Player',
    description: 'VLC Media Player es un reproductor multimedia gratuito y de código abierto que puede reproducir casi todos los formatos de audio y video. Está disponible para todos los sistemas operativos más populares, como Windows, macOS, Linux, iOS y Android.',
    category: 'apps',
    subcategory: 'Reproductores de medios',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/38/VLC_icon.png',
    imageUrl: 'https://www.linuxuntu.com/wp-content/uploads/2023/01/VLC-Logo-1024x576.jpg',
    screenshots: [
      'https://images.videolan.org/vlc/screenshots/2.2.0/vlc-2.2-macosx-audio-playback-dark.jpg',
      'https://image.winudf.com/v2/image1/b3JnLnZpZGVvbGFuLnZsY19iYW5uZXJfMTU1NTA2ODYzMl8wNDA/banner.jpg?fakeurl=1&w=600',
    ],
    youtubeId: 'QOGDE9SlXlk',
    rating: 4.7,
    reviews: 50000000,
    price: 'Free',
    publisher: 'VideoLAN',
    downloadUrl: 'https://edgeuno-bog2.mm.fcix.net/videolan-ftp/vlc/3.0.21/win64/vlc-3.0.21-win64.exe',
    type: 'multimedia',
    featured: false,
    systemRequirements: {
      minimum: {
        os: "Windows 7, 8, 10, 11",
        processor: "Procesador a 1.2 GHz o superior",
        memory: "512 MB de RAM",
        graphics: "Tarjeta gráfica compatible con DirectX 9",
        storage: "200 MB de espacio disponible"
      },
      recommended: {
        os: "Windows 10 o superior",
        processor: "Procesador a 2.0 GHz o superior",
        memory: "2 GB de RAM",
        graphics: "Tarjeta gráfica compatible con DirectX 11",
        storage: "200 MB de espacio disponible"
      }
    }
    ,
    downloadButton: {
      text: 'Descargar VLC',
      action: () => {
        window.location.href = 'https://get.videolan.org/vlc/3.0.21/win64/vlc-3.0.21-win64.exe';
      }
    }
  }
  ,

  //splash - check
  {
    id: 'splash',
    name: 'Splash Player',
    description: 'Splash es un reproductor de video de alta calidad diseñado para la reproducción de contenidos en 4K, HD y otros formatos, optimizado para una reproducción fluida con un bajo uso de recursos del sistema. Perfecto para aquellos que buscan calidad de imagen sin comprometer el rendimiento.',
    category: 'apps',
    subcategory: 'Reproductores de Video',
    logoUrl: 'https://www.techspot.com/images2/downloads/topdownload/2016/02/splash.png',
    imageUrl: 'https://www.artistapirata.com/wp-content/uploads/2024/11/Splash-full.jpg',
    screenshots: [
      'https://www.artistapirata.com/wp-content/uploads/2024/11/Splash-full.jpg',
      'https://mirillis.com/res/old/media/images/product/splash/1_Overview_01.jpg',
      'https://mirillis.com/res/old/media/images/product/splash/1_Overview_06.jpg'
    ],
    youtubeId: 'HPTSfo-JvnU', // Añadir un video de ejemplo si es necesario
    rating: 4.7,
    reviews: 35000,
    price: 'Free Trial / Paid Version',
    publisher: 'Mirillis',
    downloadUrl: 'https://download.mirillis.com/files/splash_2_7_0_setup.exe', // Página de descarga oficial
    type: 'media-player',
    featured: false,
    systemRequirements: {
      minimum: {
        os: "Windows 7 or higher",
        processor: "Intel Core i3",
        memory: "2 GB RAM",
        graphics: "DirectX 9 compatible",
        storage: "100 MB"
      },
      recommended: {
        os: "Windows 10",
        processor: "Intel Core i5 or higher",
        memory: "4 GB RAM",
        graphics: "DirectX 11 compatible",
        storage: "200 MB"
      }
    }
  }

  //winrar - check
  , {
    id: 'winrar',
    name: 'WinRAR',
    description: 'WinRAR es una popular herramienta de compresión de archivos, capaz de crear y abrir archivos RAR y ZIP, y de admitir una amplia gama de formatos de compresión como TAR, GZ y más.',
    category: 'apps',
    subcategory: 'File Compression',
    logoUrl: 'https://www.win-rar.com/favicon.ico',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6bTXSt6yhFFZHK6JjUFAWHlVexDyEfHtzfA&s',
    screenshots: [
      'https://catedu.github.io/internet-basico/img/winrar.jpg',

    ],
    youtubeId: 'SrUDfuAOnnY',
    rating: 4.8,
    reviews: 45987,
    price: '$29.99 (Trial Available)',
    publisher: 'RARLAB',
    downloadUrl: 'https://www.rarlab.com/rar/winrar-x64-711.exe',
    type: 'Compression Tool',
    featured: false,
    systemRequirements: {
      minimum: {
        os: 'Windows 7 or later',
        processor: 'Any',
        memory: '1GB RAM',
        graphics: 'Any',
        storage: '5MB'
      },
      recommended: {
        os: 'Windows 10 or later',
        processor: 'Any modern processor',
        memory: '2GB RAM',
        graphics: 'Any',
        storage: '10MB'
      }
    }
  },


  // Games

  //steam - cheack
  {
    id: 'steam',
    name: 'Steam',
    description: 'Plataforma definitiva para jugar, discutir y crear juegos',
    category: 'games',
    logoUrl: 'https://jonathancv.neocities.org/Nime%20Studio/steam/Steam-Logo.png',
    subcategory: 'Plataforma',
    imageUrl: 'https://clan.cloudflare.steamstatic.com/images/41316928/f7f5587c77587cc8ae5eb50e39defcbcc3acaa88.jpg',
    screenshots: [
      'https://jonathancv.neocities.org/Nime%20Studio/steam/steam-3951018.webp'
    ],
    youtubeId: 'G3_TTII32lg',
    rating: 4.9,
    reviews: 85000,
    price: 'Free',
    featured: false,
    publisher: 'Valve',
    downloadUrl: 'https://cdn.akamai.steamstatic.com/client/installer/SteamSetup.exe',
    type: 'game',
    systemRequirements: {
      minimum: {
        os: "Windows 7 / macOS X 10.9 / Ubuntu 12.04",
        processor: "2.8 GHz dual-core",
        memory: "1 GB RAM",
        graphics: "DirectX 9 compatible",
        storage: "200 MB"
      },
      recommended: {
        os: "Windows 10 / macOS X 10.13 / Ubuntu 18.04",
        processor: "2.5 GHz dual-core",
        memory: "4 GB RAM",
        graphics: "DirectX 11 compatible",
        storage: "1 GB"
      }
    }

  },
  //yuzu - check
  {
    id: 'yuzu',
    name: 'Yuzu',
    description: 'Yuzu, fue un proyecto para desarrollar un emulador libre y de código abierto de Nintendo Switch. Se anunció que Yuzu estaría en desarrollo el 14 de enero de 2018, ​​ 10 meses después del lanzamiento de Nintendo Switch.​ Estaba desarrollado en C++.',
    category: 'games',
    subcategory: 'Emulador',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Yuzu_Emulator.svg/1843px-Yuzu_Emulator.svg.png',
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/07329c52f7966a5d9cd3a0c148da52aa.jpg',
    screenshots: [
      'https://www.notebookcheck.nl/fileadmin/Notebooks/News/_nc3/NSwitch_TheLegendOfZeldaTearsOfTheKingdom_26.jpg',
      'https://www.hd-tecnologia.com/imagenes/articulos/2019/07/El-emulador-Yuzu-ya-puede-correr-juegos-de-Switch-con-resoluci%C3%B3n-8K-600x300.jpg'
    ],
    youtubeId: 'ZGeqCZ7JBFc',
    rating: 5,
    reviews: 2000000,
    featured: false,
    price: 0,
    publisher: 'Yuzu Team',
    downloadUrl: 'https://gofile.io/d/16ede1bd-6ee7-4343-b3c7-a4d665531f52',
    type: 'game',
    systemRequirements: {
      minimum: {
        os: "Windows 7 / 8.1 / 10 (64-bit), Ubuntu 18.04 (64-bit), macOS 10.12 (64-bit)",
        processor: "Intel Core i5-4430 / AMD Ryzen 3 1200",
        memory: "8 GB RAM",
        graphics: "NVIDIA GeForce GTX 1060 / AMD Radeon RX 570",
        storage: "1 GB disponible"
      },
      recommended: {
        os: "Windows 10 (64-bit), Ubuntu 20.04 (64-bit), macOS 10.14 (64-bit)",
        processor: "Intel Core i7-6700K / AMD Ryzen 5 3600",
        memory: "16 GB RAM",
        graphics: "NVIDIA GeForce GTX 1660 / AMD Radeon RX 5700",
        storage: "1 GB disponible"
      }
    }


  },

  //playnite- check
  {
    id: 'playnite',
    name: 'Playnite',
    description: 'Playnite es un lanzador de videojuegos de código abierto para Windows que unifica todas tus bibliotecas de juegos en una sola interfaz. Permite importar títulos desde Steam, GOG, Epic, Origin, Battle.net y otros servicios, así como juegos emulados. Ofrece una interfaz altamente personalizable, soporte para extensiones, y un modo de pantalla completa ideal para setups tipo consola.',
    category: 'games',
    subcategory: 'Launcher',
    logoUrl: 'https://playnite.link/applogo.png',
    imageUrl: 'https://repository-images.githubusercontent.com/86182490/c9590600-7403-11ea-91aa-1446457c89c9',
    screenshots: [
      'https://playnite.link/screen1.jpg',
      'https://playnite.link/screen2.jpg',
      'https://playnite.link/screen3.jpg',
      'https://playnite.link/screen4.jpg',
      'https://playnite.link/screen5.jpg'
    ],
    youtubeId: 'RaCzwL46Adk',
    rating: 4.7,
    reviews: 120000,
    price: 'Gratis',
    publisher: 'Josef Nemec',
    downloadUrl: 'https://playnite.link/download/PlayniteInstaller.exe',
    type: 'application',
    featured: false,
    systemRequirements: {
      minimum: {
        os: "Windows 10",
        processor: "CPU dual-core",
        memory: "2 GB",
        graphics: "Compatible con DirectX 10",
        storage: "200 MB"
      },
      recommended: {
        os: "Windows 10",
        processor: "CPU de 4 núcleos",
        memory: "4 GB",
        graphics: "Compatible con DirectX 11",
        storage: "500 MB"
      }
    }
  },

  //xenia - check
  {
    id: 'xenia',
    name: 'Xenia',
    description: 'Xenia es un emulador de código abierto de Xbox 360 para Windows, que permite jugar juegos de Xbox 360 en una PC. Ofrece una alta compatibilidad y características como la mejora gráfica al ejecutar los juegos en resoluciones superiores a las de la consola original.',
    category: 'games',
    subcategory: 'Emulador',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Xenia_Emulator_Updated_Logo.svg/2048px-Xenia_Emulator_Updated_Logo.svg.png',
    imageUrl: 'https://cdn2.steamgriddb.com/grid/2850d3b69679c93faf8a00aa3cd7b734.png',
    screenshots: [
      'https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2024/10/a-person-holding-an-xbox-360-controller-in-front-of-a-pc-with-some-games-on-the-screen.jpg'
    ],
    youtubeId: '382YN-Ql_VI',
    rating: 4.5,
    reviews: 500000,
    price: 'Free',
    publisher: 'Xenia Team',
    downloadUrl: 'https://github.com/xenia-project/release-builds-windows/releases/latest/download/xenia_master.zip',
    type: 'emulator',
    featured: false,
    systemRequirements: {
      minimum: {
        os: "Windows 7 o superior",
        processor: "Intel Core i3 o equivalente",
        memory: "4 GB de RAM",
        graphics: "Tarjeta gráfica compatible con DirectX 12",
        storage: "1 GB de espacio disponible"
      },
      recommended: {
        os: "Windows 10 o superior",
        processor: "Intel Core i5 o equivalente",
        memory: "8 GB de RAM",
        graphics: "Tarjeta gráfica compatible con DirectX 12 y soporte para Vulkan",
        storage: "2 GB de espacio disponible"
      }
    }
  },
  //DropJoi - check
  {
    id: 'droidjoy',
    name: 'DroidJoy',
    description: 'DroidJoy convierte tu smartphone Android en un gamepad real para tu PC con Windows, compatible con juegos que utilizan DInput y XInput. Permite jugar títulos como GTA V, Call of Duty, Need for Speed, entre otros.',
    category: 'games',
    subcategory: 'Controladores de juego',
    logoUrl: 'https://images.dwncdn.net/images/t_app-icon-l/p/4c0d9719-c3b8-409d-846b-21aaf9ddf881/347027031/20432_4-77453821-imgingest-1468172212720441249.png',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToZiULmh3OAdIRhCPEQ0dODwsR5QTnZz4mqA&s',
    screenshots: [
      'https://i.ytimg.com/vi/v6euJq_SK-I/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDhcfmie4NteCaefVL6Tz4mlDPL3g',
      'https://i.ytimg.com/vi/GrjO6jzLRJ8/maxresdefault.jpg'
    ],
    youtubeId: 'jCHxhcYih1Y',
    rating: 4.3,
    reviews: 390,
    price: '$3.49',
    publisher: 'Florian Grill',
    downloadUrl: 'https://gofile.io/d/21312431-dfd5-44ce-82d3-1ebac431f26d',
    type: 'controlador',
    featured: false,
    systemRequirements: {
      minimum: {
        os: 'Android 5.0 o superior',
        processor: 'Procesador de doble núcleo',
        memory: '1 GB de RAM',
        storage: '10 MB de espacio libre'
      },
      recommended: {
        os: 'Android 8.0 o superior',
        processor: 'Procesador de cuatro núcleos',
        memory: '2 GB de RAM',
        storage: '20 MB de espacio libre'
      }
    }
  }
  ,

  {
    id: 'dolphin',
    name: 'Dolphin Emulator',
    description: 'Dolphin es un emulador de consola de videojuegos gratuito y de código abierto para Nintendo GameCube y Wii. Te permite jugar a tus juegos favoritos de GameCube y Wii en tu PC con un gran rendimiento y compatibilidad.',
    category: 'games',
    subcategory: 'Game Emulator',
    logoUrl: 'https://jonathancv.neocities.org/Nime%20Studio/dolphin/logo.png',
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/cbec7ddbb30e261abd365bf9f814647d.jpg',
    screenshots: [
      'https://jonathancv.neocities.org/Nime%20Studio/dolphin/1.png',
      'https://jonathancv.neocities.org/Nime%20Studio/dolphin/2.jpg'
    ],
    youtubeId: 'l0Mf1bfVWMk',
    rating: 4.5,
    reviews: 12345,
    price: 'Free',
    publisher: 'Dolphin Emulator Team',
    downloadUrl: 'https://dl.dolphin-emu.org/releases/2503a/dolphin-2503a-x64.7z',
    type: 'Emulator',
    featured: false,
    systemRequirements: {
      "minimum": {
        "os": "Windows 7, 8, 10, 11 (64-bit)",
        "processor": "Intel Core i5 2.8 GHz o equivalente",
        "memory": "4 GB de RAM",
        "graphics": "Gráficos compatibles con OpenGL 4.5 o superior",
        "storage": "1 GB de espacio libre"
      },
      "recommended": {
        "os": "Windows 10 (64-bit)",
        "processor": "Intel Core i5 4.0 GHz o superior",
        "memory": "8 GB de RAM",
        "graphics": "NVIDIA GeForce GTX 1060 o equivalente",
        "storage": "1 GB de espacio libre"
      }
    }

  },
  {
    id: 'pcsx2',
    name: 'PCSX2',
    description: 'PCSX2 es un emulador de código abierto de PlayStation 2 para Windows, Linux y macOS. Te permite jugar juegos de PlayStation 2 en tu PC, ofreciendo una gran compatibilidad y rendimiento.',
    category: 'games',
    subcategory: 'Game Emulator',
    logoUrl: 'https://www.pcguide.com/wp-content/uploads/2021/10/pcsx2.png',
    imageUrl: 'https://www.notebookcheck.org/fileadmin/Notebooks/News/_nc4/PCSX2-emulator.jpg',
    screenshots: [
      'https://cl.buscafs.com/www.levelup.com/public/uploads/images/741984/741984.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCMgz1MgtPREmXvgOgPffcJMtFqJKyWZq3UGMPtG5J0_OgrX_EjFzK_rD72Fdtbs0zMRs&usqp=CAU'
    ],
    youtubeId: 'kYGxxT0J9cU',
    rating: 4.3,
    reviews: 10345,
    price: 'Free',
    publisher: 'PCSX2 Team',
    downloadUrl: 'https://gofile.io/d/2504010c-17d4-459d-ac7a-4a7d5c2b7f4b',
    type: 'Emulator',
    featured: false,
    systemRequirements: {
      minimum: {
        os: 'Windows 7 64-bit or macOS 10.10',
        processor: 'Intel Core i3-4160 / AMD FX-6300',
        memory: '4GB RAM',
        graphics: 'NVIDIA GeForce GTX 660 / AMD Radeon HD 7870',
        storage: '2GB'
      },
      recommended: {
        os: 'Windows 10 64-bit or macOS 10.14',
        processor: 'Intel Core i5-6600 / AMD Ryzen 5 3400G',
        memory: '8GB RAM',
        graphics: 'NVIDIA GeForce GTX 1060 / AMD Radeon RX 580',
        storage: '4GB'
      }
    }
  },
  {
    id: 'sudachi',
    name: 'Sudachi',
    description: 'Yuzu es un emulador experimental de código abierto para la Nintendo Switch, desarrollado por los creadores de Citra.',
    category: 'games',
    subcategory: 'Emulador',
    logoUrl: 'https://cdn2.steamgriddb.com/icon/3d2ac0298c4437c1506ab5c9cdbf643a.ico',
    imageUrl: 'https://www.logic-sunrise.com/images/news/1196608/switch-sudachi-continue-de-sameliorer-sur-macos-windows-et-android.png',
    screenshots: [
      'https://jonathancv.neocities.org/Nime%20Studio/Suda/Captura%20de%20pantalla%20(3).png',
      'https://jonathancv.neocities.org/Nime%20Studio/Suda/Captura%20de%20pantalla%20(4).png'
    ],
    youtubeId: '3hB7V_mvDbI',
    rating: 4.0,
    reviews: 789,
    price: 'Free',
    publisher: 'Sudachi Project',
    downloadUrl: 'https://gofile.io/d/69e8ee47-7215-4a87-94b3-08330d547426',
    type: 'Emulador',
    featured: false,
    systemRequirements: {
      minimum: {
        os: 'Linux, macOS, Windows',
        processor: 'Any',
        memory: '1GB RAM',
        graphics: 'Any',
        storage: '50MB'
      },
      recommended: {
        os: 'Linux, macOS, Windows',
        processor: 'Any modern processor',
        memory: '2GB RAM',
        graphics: 'Any',
        storage: '100MB'
      }
    }
  }, {
    id: 'your-name',
    name: 'Your Name',
    description: 'Mitsuha y Taki son dos estudiantes de secundaria que viven en diferentes partes de Japón y nunca se han conocido. Cuando comienzan a intercambiar cuerpos mientras duermen, sus vidas se entrelazan de maneras inesperadas.',
    category: 'entertainment',
    subcategory: 'Anime',
    imageUrl: 'https://images.pexels.com/photos/9899966/pexels-photo-9899966.jpeg',
    screenshots: [
      'https://images.pexels.com/photos/9899966/pexels-photo-9899966.jpeg',
      'https://images.pexels.com/photos/9899967/pexels-photo-9899967.jpeg',
      'https://images.pexels.com/photos/9899968/pexels-photo-9899968.jpeg'
    ],
    youtubeId: 'xU47nhruN-Q',
    rating: 4.9,
    reviews: 15000,
    year: 2016,
    director: 'Makoto Shinkai',
    cast: ['Ryunosuke Kamiki', 'Mone Kamishiraishi', 'Ryo Narita'],
    duration: '1h 46min',
    genre: 'Animación, Drama, Fantasía',
    type: 'movie',
    downloads: [
      {
        quality: '4K HDR',
        size: '15.4 GB',
        format: 'MKV',
        server: 'Mega',
        speed: '20 MB/s',
        url: 'https://gofile.io/d/69e8ee47-7215-4a87-94b3-08330d547426#'
      },
      {
        quality: '1080p',
        size: '8.2 GB',
        format: 'MKV',
        server: 'MediaFire',
        speed: '15 MB/s',
        url: 'https://gofile.io/d/69e8ee47-7215-4a87-94b3-08330d547426'
      },
      {
        quality: '720p',
        size: '4.1 GB',
        format: 'MP4',
        server: 'Google Drive',
        speed: '25 MB/s',
        url: 'https://gofile.io/d/69e8ee47-7215-4a87-94b3-08330d547426'
      }
    ],
    price: 'Free',
    publisher: 'CoMix Wave Films',
    downloadUrl: '#'
  },


















];

export const featuredApps = appData.filter(app => app.featured);

export const getAppsByCategory = (categoryId: string, type?: string) => {
  if (categoryId === 'home') return appData;
  return appData.filter(app => {
    if (type) {
      return app.category === categoryId && app.type === type;
    }
    return app.category === categoryId;
  });
};

export const getAppsBySearch = (query: string): AppItem[] => {
  const searchTerm = query.toLowerCase();
  return appData.filter(app =>
    app.name.toLowerCase().includes(searchTerm) ||
    app.description.toLowerCase().includes(searchTerm) ||
    app.subcategory.toLowerCase().includes(searchTerm) ||
    app.publisher.toLowerCase().includes(searchTerm)
  );
};

export const getAppById = (id: string) => {
  return appData.find(app => app.id === id);
};

export const getCategoryById = (id: string) => {
  return categories.find(category => category.id === id);
};

export const addApp = (app: AppItem) => {
  appData.push(app);
};