/* ==========================================================================
   CONTENIDO DEL SITIO — edita solo este archivo para cambiar textos y medios.
   Todo lo marcado con  // EDITAR  es un dato provisional que debes confirmar.
   Las rutas de imágenes y videos son relativas a la carpeta del sitio.
   Si un archivo no existe todavía, el sitio muestra un placeholder elegante.
   ========================================================================== */

window.SITE = {
  brand: {
    name: "Core",
    suffix: "Studio",
    logo: "assets/img/brand/logo.png",   // logo recortado de CoreStudio/Logo Corestudio.png
    tagline: "Producción audiovisual",
    location: "Puebla, México",
  },

  hero: {
    eyebrow: "Producción audiovisual · Puebla, México",
    title: ["Imagen", "con intención."],   // línea 1 en serif itálica, línea 2 en sans bold (como el logo)
    subtitle:
      "Cinematografía, contenido y cobertura para marcas y negocios que quieren verse como se sienten.",
    reel: {
      src: "assets/video/reel.mp4",           // 17 s armados con Molino de los Reyes, Opening Nova y Cluffy
      srcWebm: "",
      poster: "assets/video/reel-poster.jpg",
      fullUrl: "https://www.instagram.com/corestudios._/", // cámbialo por tu reel en YouTube o Vimeo cuando lo subas
      linkLabel: "Ver más en Instagram",
    },
  },

  /* layout: "tall" (vertical 4:5), "wide" (horizontal 16:10), "square"
     focus: qué parte de la imagen se conserva al recortar ("50% 50%" = centro)
     gallery: imágenes extra que se ven dentro de la ventana del proyecto
     video: link de YouTube o Vimeo (se reproduce dentro de la ventana del proyecto)
     oculto: true -> el proyecto no aparece en la página
     El filtro por categoría aparece solo cuando hay 6 proyectos o más. */
  projects: [
    {
      id: "sectur-tlaxcala",
      title: "SECTUR Tlaxcala",
      client: "Secretaría de Turismo de Tlaxcala",
      category: "Turismo",
      year: "2025",
      role: "Producción audiovisual",
      layout: "tall",
      cover: "assets/img/projects/danzantes-mascara.jpg",
      focus: "50% 45%",
      gallery: [
        "assets/img/projects/danzantes-tambor.jpg",
        "assets/img/projects/danzantes-penacho.jpg",
        "assets/img/projects/danzantes-encuentro.jpg",
        "assets/img/projects/danzantes-luz.jpg",
        "assets/img/projects/danzantes-bn-retrato.jpg",
        "assets/img/projects/danzantes-bn.jpg",
      ],
      video: "",   // EDITAR: link de YouTube/Vimeo del video completo
      summary:
        "Pieza cinematográfica para la Secretaría de Turismo de Tlaxcala, presentada en FITUR. Retrata el Carnaval de Tlaxcala: los huehues, sus danzas, máscaras y vestuarios. Fotos en blanco y negro de Aldhair Castañeda.",
    },
    {
      id: "molino-de-los-reyes",
      title: "Molino de los Reyes",
      client: "Molino de los Reyes",
      category: "Turismo",
      year: "2026",
      role: "Producción audiovisual de marca y experiencia",
      layout: "wide",
      cover: "assets/img/projects/hacienda-fachada.jpg",
      focus: "50% 45%",
      gallery: [
        "assets/img/projects/hacienda-balcon.jpg",
        "assets/img/projects/molino-chimenea.jpg",
        "assets/img/projects/hacienda-jardin.jpg",
        "assets/img/projects/hacienda-ventana.jpg",
        "assets/img/projects/molino-aereo.jpg",
        "assets/img/projects/hacienda-exterior.jpg",
      ],
      video: "",   // EDITAR
      summary:
        "Video para Molino de los Reyes, hotel boutique, spa y restaurante en Tlaxcala. Mostramos su arquitectura, su comida y su entorno natural para acercarlo a nuevos visitantes.",
    },
    {
      id: "nova-studios",
      title: "Nova Studios",
      client: "Nova Studio",
      category: "Comercial",
      year: "2026",
      role: "Producción audiovisual",
      layout: "tall",
      cover: "assets/img/projects/nova-retrato.jpg",
      focus: "66% 50%",
      gallery: ["assets/img/projects/nova-detalle.jpg"],
      video: "",   // EDITAR
      summary:
        "Video de marca para Nova: el esfuerzo, la constancia y la energía detrás de cada entrenamiento.",
    },
    {
      id: "cluffy",
      title: "Cluffy",
      client: "Cluffy",
      category: "Comercial",
      year: "2026",
      role: "Campaña de publicidad",
      layout: "wide",
      cover: "assets/img/projects/cluffy-portada.jpg",
      focus: "40% 50%",
      gallery: [
        "assets/img/projects/cluffy-botines.jpg",
        "assets/img/projects/cluffy-conos.jpg",
        "assets/img/projects/cluffy-calcetas.jpg",
        "assets/img/projects/cluffy-juego.jpg",
      ],
      video: "",   // EDITAR
      summary: "Campaña de publicidad para Cluffy, marca de plantillas de Estados Unidos: el ritual antes de jugar, el equipo en primer plano y el balón en movimiento.",
    },
    {
      id: "autonacion",
      title: "AutoNación",
      client: "AutoNación",
      category: "Comercial",
      year: "2026",                    // EDITAR
      role: "Fotografía publicitaria",
      layout: "tall",
      cover: "assets/img/projects/autonacion-ferrari-trasera.jpg",
      focus: "50% 50%",
      gallery: [
        "assets/img/projects/autonacion-gtr.jpg",
        "assets/img/projects/autonacion-ferrari-lateral.jpg",
        "assets/img/projects/autonacion-placa.jpg",
        "assets/img/projects/autonacion-interior.jpg",
        "assets/img/projects/autonacion-cofre.jpg",
        "assets/img/projects/autonacion-naranja.jpg",
        "assets/img/projects/autonacion-emblema.jpg",
        "assets/img/projects/autonacion-porsche.jpg",
        "assets/img/projects/autonacion-volante.jpg",
      ],
      video: "",
      summary: "Fotos para la campaña de publicidad de AutoNación, agencia de autos de lujo en Puebla: Ferrari, Porsche y Corvette en detalle.",
    },
    {
      id: "restaurantes",
      title: "Restaurantes",
      client: "Cus Cus Cholula · Atracadero",
      category: "Comercial",
      year: "2026",                        // EDITAR
      role: "Fotografía de espacios",
      layout: "tall",
      cover: "assets/img/projects/restaurantes-cuadro.jpg",
      focus: "50% 45%",
      gallery: [
        "assets/img/projects/restaurantes-salon.jpg",
        "assets/img/projects/restaurantes-barra.jpg",
        "assets/img/projects/restaurantes-bn.jpg",
      ],
      video: "",
      summary: "Fotografía para Cus Cus Cholula y Atracadero, restaurante de mariscos: sus espacios, la barra y el ambiente de cada lugar.",
    },
    {
      id: "deportivos",
      title: "Proyectos deportivos",
      client: "Varios",
      category: "Deportes",
      year: "2026",
      role: "Fotografía · Video",
      layout: "tall",
      cover: "assets/img/projects/motocross.jpg",
      focus: "50% 40%",
      gallery: ["assets/img/projects/deportivos-carrera.jpg", "assets/img/projects/deportivos-box.jpg"],
      video: "",
      summary: "Motocross, box, carrera y futbol: foto y video de gente entrenando y compitiendo.",
    },
    {
      id: "sanamente",
      title: "Sanamente",
      client: "Sanamente",
      category: "Comercial",
      year: "2026",
      role: "Producción audiovisual",   // EDITAR
      layout: "wide",
      cover: "assets/img/projects/sanamente-masaje.jpg",
      focus: "50% 50%",
      gallery: ["assets/img/projects/sanamente-terapia.jpg"],
      video: "",   // EDITAR
      summary: "Video para Sanamente, centro de fisioterapia y masoterapia: tratamientos, espacios y el trato con sus pacientes.",
    },
  ],

  /* Sección "¿Quiénes somos?" */
  team: {
    intro: [
      "Somos Fernando y Aldhair, los fundadores de Core Studio. Llevamos 4 años trabajando juntos haciendo foto y video para negocios.",
      "En ese tiempo aprendimos que los mejores proyectos salen cuando hay confianza. Por eso nos gusta conocer a nuestros clientes y hacernos sus amigos: platicamos de lo que quieres lograr, te proponemos ideas y trabajamos a gusto de principio a fin.",
    ],
    people: [
      {
        name: "Fernando Avelino",
        role: "Dirección estética y video",
        bio: "Tiene 19 años, estudia cine y lo que más disfruta es hacer video. Es el encargado de la dirección estética: cuida cómo se ve cada toma, la luz y el color.",
        photo: "assets/img/about/fernando.jpg",
      },
      {
        name: "Aldhair Castañeda",
        role: "Foto, video y marketing",
        bio: "Es fotógrafo y videógrafo, y le gusta experimentar en cada sesión. También es el encargado del marketing: se asegura de que el contenido le sirva a tu negocio para llegar a más gente.",
        photo: "assets/img/about/aldhair.jpg",
      },
    ],
  },

  services: [
    {
      title: "Cinematografía comercial",
      body: "Spots, videos de marca y lookbooks con lenguaje de cine: dirección de foto, iluminación y color.",
      deliverables: ["Spot 30 s / 60 s", "Versiones para redes", "Stills del rodaje"],
    },
    {
      title: "Cobertura de eventos",
      body: "Aperturas, lanzamientos, conferencias y celebraciones con una o varias cámaras y audio limpio.",
      deliverables: ["Recap de 30–60 s", "Video completo", "Galería de fotos"],
    },
    {
      title: "Reels y contenido para redes",
      body: "Producción mensual de video vertical con guion, rodaje por bloques y edición a ritmo de plataforma.",
      deliverables: ["Paquetes mensuales", "Formato 9:16", "Subtítulos"],
    },
    {
      title: "Promoción turística y de espacios",
      body: "Haciendas, hoteles, restaurantes y destinos filmados para que la gente quiera ir.",
      deliverables: ["Video promocional", "Tomas aéreas", "Fotografía de arquitectura"],
    },
    {
      title: "Fotografía de producto y editorial",
      body: "Producto, moda y retrato en estudio o en locación, listo para ecommerce, catálogos y campañas.",
      deliverables: ["Fondo limpio", "Ambientada", "Retrato editorial"],
    },
    {
      title: "Postproducción y color",
      body: "Edición, corrección de color y diseño sonoro para material propio o de otros rodajes.",
      deliverables: ["Edición", "Color", "Mezcla de audio"],
    },
  ],

  contact: {
    email: "corestds@gmail.com",
    whatsapp: "522221244671",
    whatsappDisplay: "222 124 4671",
    whatsappMessage: "Hola, vi su portafolio y me interesa cotizar un proyecto.",
    formEndpoint: "",              // opcional: URL de Formspree para recibir el formulario en tu correo
    projectTypes: ["Video comercial", "Evento", "Reels para redes", "Promoción turística", "Fotografía", "Otro"],
  },

  /* Solo se muestran las redes que tienen link */
  socials: [
    { label: "Instagram", handle: "@corestudios._", url: "https://www.instagram.com/corestudios._/" },
    { label: "Facebook", url: "" },
    { label: "YouTube", url: "" },
    { label: "Vimeo", url: "" },
    { label: "TikTok", url: "" },
  ],
};
