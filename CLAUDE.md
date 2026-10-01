# Design System & Code Style Guidelines

## Aesthetic Direction
- **Style:** Dark Mode, Modern Glassmorphism, Cinematic Minimalist. Editorial de lujo estilo revista de moda (referencia: Vogue México).
- **Typography:**
  - Titulares y cabeceras: 'Bodoni Moda' (serif de alto contraste), itálicas para énfasis.
  - Cuerpo y navegación: 'Outfit' (la sans redonda y bold del logo). Soft/rounded typography.
  - El logo mezcla serif itálica ("core") con sans bold ("studio."); el titular del hero repite esa mezcla.
  - Etiquetas pequeñas en mayúsculas con tracking amplio (`.eyebrow`).
- **Color (del logo):** crema durazno `#FFE1C5` (peach) para logo, acentos, itálicas y botón principal; fondo negro cálido `#0F0C0A`; texto `#F6ECE2`; secundarios `#B8A898` y `#7D7064`. Nada de grises fríos.
- **Rounded Corners:** Use `rounded-2xl` and `rounded-3xl` for cards, inputs, and buttons.

## Visual Effects (Tailwind CSS)
- **Glassmorphism:** Use `backdrop-blur-md bg-cocoa-900/60 border border-peach/10` (versión cálida del glass; `cocoa-900` = `#1A1511`).
- **Glows:** Use radial gradients and blur elements for subtle glow backgrounds, teñidos del durazno del logo.

## Animations
- All interactive elements must have `transition-all duration-300 ease-in-out`.
- Include entrance animations on scroll (fade-up and reveal) for sections and elements.

## Project structure
- El contenido editable vive solo en `assets/js/content.js`; no escribir textos de proyectos directamente en `index.html`.
- Tokens de color y tipografía en `:root` de `assets/css/styles.css`.
