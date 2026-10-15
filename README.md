# ComercializadoraDcortes.github.io

Sitio de **Comercializadora D'Cortés**, todo para sublimar en el Centro de Puebla.

Sitio programado por Miguel Ángel Huerta Vázquez ([@miguelhuerta-dev](https://github.com/miguelhuerta-dev) en GitHub).

## Páginas

| Archivo | Qué es |
|---|---|
| `index.html` | Inicio: buscador, categorías, más pedidos, kit para empezar, cómo comprar, datos de pago y ubicación |
| `catalogo.html` | Catálogo y lista de precios con búsqueda, filtros, orden, ficha de producto y cotización por WhatsApp |
| `productos.html` | Redirige a `catalogo.html` (para no romper enlaces viejos) |
| `404.html` | Página de error de GitHub Pages |

## Cómo editar precios y productos

Todo el catálogo vive en **`assets/js/data.js`**. Cada producto es una línea:

```js
add('Taza mágica 11 oz', 35, { d: 'Descripción', a: { k: 'mug', fin: 'matte' },
  v: vv([['Negra', C.blk, 35], ['Roja', C.red, 45]]) });
```

- El segundo valor es el precio (más IVA). Usa `null` si se cotiza por WhatsApp.
- `v` son las variantes: `[nombre, color, precio]`. Si una variante cuesta distinto, pon su precio.
- `top: 1` lo muestra en "Lo que más se llevan" en el inicio.
- `u: 'paq. 10'` cambia la unidad ("por paq. 10").

## Fotos de producto

Cada producto trae una ilustración generada (`assets/js/art.js`) con fondo transparente.
Para usar una foto real, guárdala en `images/productos/` (PNG o WebP sin fondo, cuadrada, unos 800 px)
y agrega `img` al producto:

```js
add('Taza blanca AA 11 oz', null, { img: 'images/productos/taza-blanca-11oz.webp', a: { k: 'mug' } });
```

También puedes poner `img` dentro de una variante para que cada color tenga su foto.

## Datos de contacto

WhatsApp, teléfonos e IVA están al inicio de `assets/js/site.js` (`DC.CFG`) y en el HTML de `index.html`.

## Estructura

```
assets/css/site.css    estilos (escritorio y teléfono)
assets/js/data.js      catálogo y precios
assets/js/art.js       ilustraciones de producto
assets/js/site.js      cotización, tarjetas, ficha de producto, barra móvil
assets/js/home.js      lógica del inicio
assets/js/catalogo.js  filtros y búsqueda del catálogo
assets/fonts/          tipografía Archivo (licencia SIL OFL)
images/                logo e imágenes originales
```
