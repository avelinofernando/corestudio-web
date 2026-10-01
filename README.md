# Core Studio · Sitio de portafolio

Sitio de una sola página en HTML5 + Tailwind CSS (por CDN) + JavaScript sin dependencias.
No necesita instalar nada: abre `index.html` en el navegador.

## Estructura

```
portafolio web/
├── CLAUDE.md                 Guía de diseño del proyecto
├── README.md                 Este archivo
├── index.html                Estructura de la página (secciones)
├── netlify.toml              Configuración de Netlify
├── tools/                    Configuración para regenerar tailwind.css
└── assets/
    ├── css/styles.css        Tokens de color, tipografía, efectos y animaciones
    ├── css/tailwind.css      Estilos de Tailwind ya generados
    ├── js/content.js         TODO el contenido editable (textos, proyectos, servicios, contacto)
    ├── js/main.js            Lógica: galería, filtros, modal, acordeón, formulario, animaciones
    ├── img/
    │   ├── brand/            logo.png (recortado del logo original)
    │   ├── projects/         portadas de proyectos (una por proyecto)
    │   └── about/            retrato.jpg
    └── video/                reel.mp4, reel.webm (opcional), reel-poster.jpg
```

## Cómo agregar tu material

1. **Reel del hero:** ya hay uno de 15 s armado con Molino de los Reyes y Opening Nova. Para cambiarlo, exporta 20–40 s en MP4 (H.264), 1920×1080, sin audio, idealmente < 12 MB.
   Guárdalo como `assets/video/reel.mp4` y un cuadro fijo como `assets/video/reel-poster.jpg`.
   Si subes el reel completo a Vimeo o YouTube, pega el link en `hero.reel.fullUrl`.
2. **Proyectos:** pon cada portada en `assets/img/projects/` con el mismo nombre que aparece en
   `content.js` (por ejemplo `sectur.jpg`). Tamaño recomendado: 2000 px del lado largo, JPG calidad 80.
   - `layout`: `"tall"` (vertical 4:5), `"wide"` (horizontal 16:10) o `"square"` (1:1).
   - `video`: link de YouTube o Vimeo; se reproduce dentro de la ventana del proyecto.
3. **Retrato:** `assets/img/about/retrato.jpg` en vertical 4:5.
4. **Contacto:** cambia `contact.email`, `contact.whatsapp` y los links de `socials`.
5. **Formulario:** para recibir mensajes en tu correo crea un formulario gratis en
   [Formspree](https://formspree.io) y pega su URL en `contact.formEndpoint`.

Mientras falte un archivo, el sitio muestra un placeholder con el nombre del proyecto y la ruta esperada.

## Publicarlo

El sitio vive en GitHub (`avelinofernando/corestudio-web`) y Netlify lo publica solo cada vez que hay un cambio en la rama `main`.
No hay paso de compilación: los estilos de Tailwind ya van generados en `assets/css/tailwind.css`.

Si se agregan clases de Tailwind nuevas en `index.html` o en los `.js`, hay que regenerar ese archivo:

```
npx tailwindcss@3 -c tools/tailwind.config.js -i tools/tailwind.input.css -o assets/css/tailwind.css --minify
```

Los videos y fotos originales en alta resolución NO van en el repositorio; solo las versiones para web.
