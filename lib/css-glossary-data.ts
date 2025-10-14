export interface CSSTerm {
  id: string
  name: string
  category: string
  description: string
  relatedTerms?: string[]
  example?: string
  configuration?: string
  imageUrl?: string
  tags?: string[]
}

export const cssTermsData: CSSTerm[] = [
  {
    id: "padding",
    name: "Padding (CSS)",
    category: "Spacing",
    description: "Espacio interno entre el contenido de un elemento y su *[border](#border)*. Afecta el tamaño \"caja\" del componente.",
    relatedTerms: ["margin", "border", "width-height"],
    example: "Añadir padding: 16px; a una tarjeta para que el texto no quede pegado al borde.",
    configuration: "**Variantes disponibles**\n- `padding` (todos lados)\n- `padding-top` (solo arriba)\n- `padding-right` (solo derecha)\n- `padding-bottom` (solo abajo)\n- `padding-left` (solo izquierda)\n\n**Sintaxis múltiple**\n- `padding: 16px` (todos los lados iguales)\n- `padding: 8px 16px` (arriba/abajo, izquierda/derecha)\n- `padding: 8px 12px 16px 20px` (arriba, derecha, abajo, izquierda)\n\n**Unidades de medida**\n- `px` (fijo: `16px`)\n- `rem` (relativo al root: `1rem = 16px`)\n- `em` (relativo al padre: `1.2em`)\n- `%` (porcentaje del padre: `50%`)\n\n**Equivalencias útiles**\n- `1rem = 16px`\n- `0.5rem = 8px`\n- `1.5rem = 24px`\n\n**Ejemplos prácticos**\n- `padding: 1rem` (escalable)\n- `padding: 16px` (fijo)\n- `padding: 0.5rem 1rem` (vertical, horizontal)",
    tags: ["basics"]
  },
  {
    id: "margin",
    name: "Margin (CSS)",
    category: "Spacing",
    description: "Espacio externo que separa un elemento de otros elementos adyacentes.",
    relatedTerms: ["padding", "border"],
    example: "Aplicar margin-top: 24px; entre secciones para mejorar la respiración visual.",
    configuration: "**Variantes disponibles**\n- `margin` (todos lados)\n- `margin-top` (solo arriba)\n- `margin-right` (solo derecha)\n- `margin-bottom` (solo abajo)\n- `margin-left` (solo izquierda)\n\n**Sintaxis múltiple**\n- `margin: 16px` (todos los lados iguales)\n- `margin: 8px 16px` (arriba/abajo, izquierda/derecha)\n- `margin: 8px 12px 16px 20px` (arriba, derecha, abajo, izquierda)\n\n**Valores especiales**\n- `margin: 0 auto` (centrar horizontalmente)\n- `margin: auto` (centrar en ambos ejes)\n\n**Unidades de medida**\n- `px` (fijo: `16px`)\n- `rem` (relativo al root)\n- `em` (relativo al padre)\n- `%` (porcentaje del padre)\n- `vh/vw` (viewport)\n\n**Valores negativos**\n- `margin-top: -1rem` (superponer elementos)\n- `margin-left: -10px` (compensar espaciado)\n\n**Ejemplos prácticos**\n- `margin: 1rem auto` (centrar con espaciado)\n- `margin-top: 2rem` (separar secciones)\n- `margin: 0` (eliminar espaciado)",
    tags: ["basics"]
  },
  {
    id: "border",
    name: "Border (CSS)",
    category: "Visual",
    description: "Línea que delimita el contorno de un elemento; puede tener grosor, color y estilo.",
    relatedTerms: ["padding", "margin", "box-shadow"],
    example: "Usar border: 1px solid #E5E7EB; para delinear una tabla con suavidad.",
    configuration: "**Variantes disponibles**\n- `border` (todos lados)\n- `border-top` (solo arriba)\n- `border-right` (solo derecha)\n- `border-bottom` (solo abajo)\n- `border-left` (solo izquierda)\n\n**Sintaxis completa**\n- `border: grosor estilo color`\n- `border: 1px solid #000`\n\n**Grosor**\n- `1px`, `2px`, `3px`\n- `thin` (1px)\n- `medium` (3px)\n- `thick` (5px)\n\n**Estilos**\n- `solid` (línea continua)\n- `dashed` (líneas discontinuas)\n- `dotted` (puntos)\n- `double` (doble línea)\n- `groove` (3D hundido)\n- `ridge` (3D elevado)\n- `inset` (hundido)\n- `outset` (elevado)\n- `none` (sin borde)\n\n**Colores**\n- `#000` (hex)\n- `rgb(0,0,0)` (RGB)\n- `black` (nombre)\n- `transparent` (transparente)\n\n**Border-radius**\n- `border-radius: 8px` (todas las esquinas)\n- `border-radius: 4px 8px` (esquina superior-izquierda, esquina inferior-derecha)\n- `border-radius: 50%` (círculo perfecto)\n\n**Ejemplos prácticos**\n- `border: 1px solid #e5e7eb` (borde sutil)\n- `border-top: 2px solid blue` (línea superior)\n- `border-radius: 0.5rem` (esquinas redondeadas)",
    tags: ["basics"]
  },
  {
    id: "width-height",
    name: "Width / Height (CSS)",
    category: "Layout",
    description: "Dimensiones explícitas de un elemento. Pueden ser fijas (px) o relativas (%, vw/vh).",
    relatedTerms: ["display", "units", "padding"],
    example: "Definir width: 100%; max-width: 640px; para que un contenedor crezca pero no exceda un ancho legible.",
    configuration: "**Propiedades disponibles**\n- `width` (ancho)\n- `height` (altura)\n- `max-width` (ancho máximo)\n- `max-height` (altura máxima)\n- `min-width` (ancho mínimo)\n- `min-height` (altura mínima)\n\n**Unidades de medida**\n- `px` (fijo: `300px`)\n- `%` (porcentaje del padre: `100%`)\n- `rem` (relativo al root: `20rem`)\n- `em` (relativo al padre: `2em`)\n- `vw/vh` (viewport: `50vw`)\n- `fr` (solo en Grid: `1fr`)\n\n**Equivalencias útiles**\n- `1rem = 16px`\n- `1vw = 1% del ancho de pantalla`\n- `100vh = altura completa de pantalla`\n\n**Valores especiales**\n- `auto` (ajuste automático)\n- `fit-content` (ajustar al contenido)\n- `max-content` (máximo contenido)\n- `min-content` (mínimo contenido)\n\n**Ejemplos prácticos**\n- `width: 100%; max-width: 1200px` (responsivo con límite)\n- `height: 100vh` (altura completa de pantalla)\n- `min-height: 200px` (altura mínima garantizada)",
    tags: ["basics"]
  },
  {
    id: "display",
    name: "Display (CSS)",
    category: "Layout",
    description: "Controla cómo se muestra un elemento en la página: si ocupa toda una línea (bloque), si se alinea horizontalmente con otros (en línea), si se comporta como una tabla, o si directamente no se muestra (oculto). Es como decidir si un elemento es una caja grande que ocupa todo el ancho, o una caja pequeña que se pone al lado de otras.",
    relatedTerms: ["flexbox", "grid"],
    example: "Cambiar display: inline a display: block para que un enlace ocupe todo el ancho clicable, o display: none para ocultar un elemento.",
    configuration: "**Valores principales**\n- `block` (ocupa toda la línea)\n- `inline` (se alinea horizontalmente)\n- `inline-block` (híbrido: inline pero con width/height)\n- `flex` (contenedor flexible)\n- `grid` (rejilla bidimensional)\n- `none` (completamente oculto)\n- `table` (comportamiento de tabla)\n- `inline-table` (tabla inline)\n\n**Combinaciones con Flexbox**\n- `display: flex` + `flex-direction: row/column`\n- `justify-content: center` + `align-items: center`\n\n**Combinaciones con Grid**\n- `display: grid` + `grid-template-columns: repeat(3, 1fr)`\n- `gap: 20px`\n\n**Comportamiento**\n- `block` permite width/height\n- `inline` no permite width/height\n- `inline-block` combina ambos\n\n**Ejemplos prácticos**\n- `display: flex; justify-content: center` (centrar horizontalmente)\n- `display: grid; grid-template-columns: 1fr 2fr` (2 columnas, segunda el doble de ancha)",
    tags: ["basics"]
  },
  {
    id: "color",
    name: "Color (CSS)",
    category: "Visual",
    description: "Propiedad para cambiar el color del texto de un elemento.",
    relatedTerms: ["background-color"],
    example: "Usar color: #333; para hacer el texto más legible en fondos claros.",
    configuration: "**Sintaxis básica**\n- `color: #333;` (hex)\n- `color: rgb(51, 51, 51);` (RGB)\n- `color: black;` (nombre)\n- `color: rgba(51, 51, 51, 0.8);` (RGB con transparencia)\n\n**Valores comunes**\n- `#000` (negro)\n- `#333` (gris oscuro)\n- `#666` (gris medio)\n- `#999` (gris claro)\n- `#fff` (blanco)\n\n**Colores semánticos**\n- `red` (rojo)\n- `green` (verde)\n- `blue` (azul)\n- `orange` (naranja)\n- `purple` (morado)\n\n**Ejemplos prácticos**\n- `color: #333;` (texto principal)\n- `color: #666;` (texto secundario)\n- `color: #999;` (texto deshabilitado)\n- `color: red;` (texto de error)",
    tags: ["basics"]
  },
  {
    id: "background-color",
    name: "Background-color (CSS)",
    category: "Visual",
    description: "Propiedad para cambiar el color de fondo de un elemento.",
    relatedTerms: ["color"],
    example: "Aplicar background-color: #f8f9fa; a una tarjeta para darle un fondo sutil.",
    configuration: "**Sintaxis básica**\n- `background-color: #f8f9fa;` (hex)\n- `background-color: rgb(248, 249, 250);` (RGB)\n- `background-color: white;` (nombre)\n- `background-color: rgba(248, 249, 250, 0.5);` (RGB con transparencia)\n\n**Valores comunes**\n- `#fff` (blanco)\n- `#f8f9fa` (gris muy claro)\n- `#e9ecef` (gris claro)\n- `#dee2e6` (gris medio claro)\n- `#000` (negro)\n\n**Colores semánticos**\n- `red` (rojo)\n- `green` (verde)\n- `blue` (azul)\n- `yellow` (amarillo)\n- `transparent` (transparente)\n\n**Ejemplos prácticos**\n- `background-color: #f8f9fa;` (fondo sutil)\n- `background-color: #e3f2fd;` (fondo azul claro)\n- `background-color: #fff3e0;` (fondo naranja claro)\n- `background-color: transparent;` (sin fondo)",
    tags: ["basics"]
  },
  {
    id: "font-size",
    name: "Font-size (CSS)",
    category: "Typography",
    description: "Propiedad para controlar el tamaño del texto.",
    relatedTerms: ["line-height-letter-spacing"],
    example: "Usar font-size: 18px; para títulos principales y font-size: 14px; para texto secundario.",
    configuration: "**Unidades de medida**\n- `font-size: 16px;` (píxeles fijos)\n- `font-size: 1rem;` (relativo al root)\n- `font-size: 1.2em;` (relativo al padre)\n- `font-size: 100%;` (porcentaje del padre)\n\n**Tamaños comunes**\n- `12px` (muy pequeño)\n- `14px` (pequeño)\n- `16px` (normal)\n- `18px` (mediano)\n- `24px` (grande)\n- `32px` (muy grande)\n\n**Valores relativos**\n- `0.75rem` (12px si 1rem=16px)\n- `0.875rem` (14px si 1rem=16px)\n- `1rem` (16px)\n- `1.125rem` (18px si 1rem=16px)\n- `1.5rem` (24px si 1rem=16px)\n\n**Ejemplos prácticos**\n- `font-size: 1rem;` (texto base)\n- `font-size: 1.5rem;` (título)\n- `font-size: 0.875rem;` (texto pequeño)\n- `font-size: 2rem;` (título principal)",
    tags: ["basics"]
  },
  {
    id: "text-align",
    name: "Text-align (CSS)",
    category: "Typography",
    description: "Propiedad para alinear el texto horizontalmente dentro de su contenedor.",
    relatedTerms: ["display"],
    example: "Usar text-align: center; para centrar un título o text-align: justify; para justificar párrafos.",
    configuration: "**Valores principales**\n- `text-align: left;` (izquierda)\n- `text-align: center;` (centro)\n- `text-align: right;` (derecha)\n- `text-align: justify;` (justificado)\n\n**Uso por tipo de contenido**\n- Títulos: `text-align: center;`\n- Párrafos: `text-align: left;` o `text-align: justify;`\n- Botones: `text-align: center;`\n- Números: `text-align: right;`\n\n**Ejemplos prácticos**\n- `text-align: center;` (título centrado)\n- `text-align: left;` (texto normal)\n- `text-align: right;` (precios, fechas)\n- `text-align: justify;` (artículos, documentos)",
    tags: ["basics"]
  },
  {
    id: "flexbox",
    name: "Flexbox (CSS)",
    category: "Layout",
    description: "Sistema de layout unidimensional para alinear y distribuir espacio entre elementos.",
    relatedTerms: ["grid", "display"],
    example: "Centrar vertical y horizontalmente con *[display](#display)*: flex; align-items: center; justify-content: center;.",
    configuration: "**Contenedor (display: flex)**\n- `flex-direction: row` (horizontal)\n- `flex-direction: column` (vertical)\n- `justify-content: center` (centrar horizontalmente)\n- `justify-content: space-between` (distribuir con espacios)\n- `align-items: center` (centrar verticalmente)\n- `gap: 16px` (espacio entre elementos)\n\n**Elementos hijos**\n- `flex: 1` (crecer para llenar espacio)\n- `flex: 0 0 200px` (ancho fijo 200px)\n- `flex-grow: 2` (crecer 2x más que otros)\n- `flex-shrink: 0` (no encoger)\n\n**Alineación individual**\n- `align-self: center` (sobrescribir alineación del contenedor)\n\n**Ejemplos prácticos**\n- `display: flex; justify-content: center; align-items: center` (centrar completamente)\n- `display: flex; justify-content: space-between` (distribuir con espacios)\n- `display: flex; gap: 1rem` (elementos con espaciado)"
  },
  {
    id: "grid",
    name: "Grid (CSS)",
    category: "Layout",
    description: "Sistema de layout bidimensional para crear rejillas complejas con filas y columnas.",
    relatedTerms: ["flexbox", "display"],
    example: "Construir un dashboard con grid-template-columns: repeat(12, 1fr); y áreas definidas.",
    configuration: "**Contenedor (display: grid)**\n- `grid-template-columns: repeat(3, 1fr)` (3 columnas iguales)\n- `grid-template-rows: auto 1fr auto` (header, contenido, footer)\n- `grid-template-areas: \"header header\" \"sidebar main\" \"footer footer\"` (nombres de áreas)\n- `gap: 20px` (espacio entre celdas)\n- `row-gap: 10px`, `column-gap: 20px`\n\n**Unidades de Grid**\n- `fr` (fracción del espacio disponible)\n- `1fr 2fr` (segunda columna doble de ancha)\n- `px`, `rem`, `%` (tamaños fijos: `200px 1fr 100px`)\n- `auto` (ajuste al contenido: `auto 1fr auto`)\n\n**Elementos hijos**\n- `grid-column: 1 / 3` (ocupar columnas 1 a 3)\n- `grid-row: 2 / 4` (ocupar filas 2 a 4)\n- `grid-area: header` (asignar a área nombrada)\n\n**Ejemplos prácticos**\n- `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))` (columnas responsivas)\n- `display: grid; grid-template-columns: 1fr 2fr; gap: 1rem` (2 columnas con espaciado)"
  },
  {
    id: "position",
    name: "Position (CSS)",
    category: "Layout",
    description: "Controla cómo se posiciona un elemento (static, relative, absolute, fixed, sticky).",
    relatedTerms: ["z-index", "display"],
    example: "Usar position: sticky; top: 0; para mantener visible una barra de filtros al hacer scroll.",
    configuration: "**Valores de position**\n- `static` (comportamiento normal, por defecto)\n- `relative` (base para posicionar elementos hijos)\n- `absolute` (posición exacta respecto al contenedor posicionado más cercano)\n- `fixed` (posición fija respecto a la ventana del navegador)\n- `sticky` (híbrido entre relative y fixed)\n\n**Propiedades de posición**\n- `top`, `right`, `bottom`, `left` (distancia desde cada lado)\n- Valores: `px`, `rem`, `%`, `vh/vw`\n- `auto` (ajuste automático)\n\n**Z-index**\n- Solo funciona con `relative`, `absolute`, `fixed`, `sticky`\n\n**Ejemplos prácticos**\n- `position: absolute; top: 0; left: 0` (esquina superior izquierda)\n- `position: fixed; top: 0; right: 0` (esquina superior derecha fija)\n- `position: sticky; top: 20px` (se pega a 20px del top al hacer scroll)"
  },
  {
    id: "z-index",
    name: "Z-index (CSS)",
    category: "Layout",
    description: "Prioridad de apilamiento de elementos posicionados; determina cuál queda por encima.",
    relatedTerms: ["position"],
    example: "Dar z-index: 1000 a un modal para que se muestre por encima del resto de la interfaz.",
    configuration: "**Valores comunes**\n- `z-index: 1` (ligeramente encima)\n- `z-index: 10` (modales)\n- `z-index: 100` (tooltips)\n- `z-index: 1000` (overlays)\n- `z-index: -1` (detrás)\n\n**Requisitos**\n- Solo funciona con `position: relative/absolute/fixed/sticky`\n- No funciona con `position: static`\n\n**Valores negativos**\n- `z-index: -1` (detrás del contenido normal)\n- `z-index: -10` (muy atrás)\n\n**Ejemplos prácticos**\n- `z-index: 1000` (modal sobre todo)\n- `z-index: 10` (tooltip sobre botón)\n- `z-index: -1` (fondo decorativo)"
  },
  {
    id: "overflow",
    name: "Overflow (CSS)",
    category: "Layout",
    description: "Define qué ocurre cuando el contenido excede el contenedor (visible, hidden, scroll, auto).",
    relatedTerms: ["width-height"],
    example: "Aplicar overflow-y: auto; a una lista alta para permitir desplazamiento dentro de un panel.",
    configuration: "**Valores principales**\n- `overflow: visible` (muestra todo el contenido)\n- `overflow: hidden` (oculta contenido que se sale)\n- `overflow: scroll` (siempre muestra barras de scroll)\n- `overflow: auto` (muestra barras solo si es necesario)\n\n**Por eje específico**\n- `overflow-x: hidden` (solo horizontal)\n- `overflow-y: auto` (solo vertical)\n- `overflow-x: scroll` (scroll horizontal)\n- `overflow-y: hidden` (ocultar scroll vertical)\n\n**Combinaciones útiles**\n- `overflow: hidden` (contenedor con altura fija)\n- `overflow-y: auto` (lista con scroll vertical)\n- `overflow-x: auto` (tabla con scroll horizontal)\n\n**Ejemplos prácticos**\n- `overflow: hidden` (imagen de fondo sin scroll)\n- `overflow-y: auto` (lista de chat)\n- `overflow-x: auto` (tabla responsiva)"
  },
  {
    id: "media-query",
    name: "Media Query (CSS)",
    category: "Responsive",
    description: "Reglas condicionales para aplicar estilos según características del dispositivo (ancho, preferencia de color, etc.).",
    relatedTerms: ["breakpoint", "responsive"],
    example: "@media (max-width: 768px) { … } para ajustar tipografía y espaciados en pantallas pequeñas usando *[breakpoint](#breakpoint)*.",
    configuration: "**Sintaxis básica**\n- `@media (max-width: 768px) { }` (móviles)\n- `@media (min-width: 1024px) { }` (desktop)\n- `@media (min-width: 768px) and (max-width: 1023px) { }` (tablet)\n\n**Características del dispositivo**\n- `@media (prefers-color-scheme: dark) { }` (modo oscuro)\n- `@media (hover: hover) { }` (dispositivos con mouse)\n- `@media (orientation: portrait) { }` (vertical)\n- `@media (orientation: landscape) { }` (horizontal)\n\n**Combinaciones con `and`**\n- `@media (max-width: 768px) and (orientation: portrait)` (móvil vertical)\n- `@media (min-width: 1024px) and (hover: hover)` (desktop con mouse)\n\n**Breakpoints comunes**\n- `640px` (móvil grande)\n- `768px` (tablet)\n- `1024px` (desktop)\n- `1280px` (desktop grande)\n\n**Ejemplos prácticos**\n- `@media (max-width: 768px) { font-size: 14px; }` (texto más pequeño en móvil)\n- `@media (min-width: 1024px) { display: grid; }` (grid solo en desktop)"
  },
  {
    id: "breakpoint",
    name: "Breakpoint (CSS)",
    category: "Responsive",
    description: "Puntos de corte de ancho/alto en los que el diseño cambia su disposición.",
    relatedTerms: ["responsive", "media-query"],
    example: "Usar breakpoints a 640/768/1024px para reorganizar tarjetas de 1→2→3 columnas.",
    configuration: "**Valores estándar**\n- `640px` (móvil grande)\n- `768px` (tablet)\n- `1024px` (desktop)\n- `1280px` (desktop grande)\n- `1536px` (desktop extra grande)\n\n**En Tailwind CSS**\n- `sm:` (640px+)\n- `md:` (768px+)\n- `lg:` (1024px+)\n- `xl:` (1280px+)\n- `2xl:` (1536px+)\n\n**En CSS puro**\n- `@media (min-width: 768px) { }` (desde tablet)\n- `@media (max-width: 767px) { }` (solo móvil)\n- `@media (min-width: 768px) and (max-width: 1023px) { }` (solo tablet)\n\n**Estrategias**\n- **Mobile First**: Empezar con móvil, agregar `min-width`\n- **Desktop First**: Empezar con desktop, usar `max-width`\n\n**Ejemplos prácticos**\n- `@media (min-width: 768px) { grid-template-columns: repeat(3, 1fr); }` (3 columnas desde tablet)\n- `@media (max-width: 767px) { padding: 1rem; }` (padding reducido en móvil)"
  },
  {
    id: "css-variables",
    name: "CSS Variables (Custom Properties)",
    category: "Advanced",
    description: "Valores reutilizables definidos por el usuario que pueden cambiarse en cascada.",
    relatedTerms: ["specificity"],
    example: "--color-primary: #7C3AED; y usar color: var(--color-primary); para mantener consistencia de marca.",
    configuration: "**Definir variables**\n- `:root { --color-primary: #7C3AED; }` (variables globales)\n- `.card { --card-padding: 1rem; }` (variables locales)\n- `--spacing-sm: 0.5rem;` (espaciados)\n- `--border-radius: 8px;` (valores reutilizables)\n\n**Usar variables**\n- `color: var(--color-primary);` (aplicar variable)\n- `color: var(--color-primary, #000);` (con valor por defecto)\n- `padding: var(--spacing-sm);` (espaciado consistente)\n\n**Cálculos con variables**\n- `--size: calc(100% - 2rem);` (cálculos)\n- `--half-size: calc(var(--size) / 2);` (usar otras variables)\n\n**Ventajas**\n- Cambios globales fáciles\n- Consistencia en el diseño\n- Temas dinámicos\n\n**Ejemplos prácticos**\n- `:root { --primary: #7C3AED; --secondary: #10B981; }` (paleta de colores)\n- `background: var(--primary);` (usar color primario)\n- `--spacing: 1rem; padding: var(--spacing);` (espaciado consistente)"
  },
  {
    id: "specificity",
    name: "Specificity (CSS)",
    category: "Advanced",
    description: "Reglas de prioridad que determinan qué estilos se aplican cuando hay conflictos.",
    relatedTerms: ["css-variables"],
    example: "Preferir clases sobre IDs para evitar especificidad demasiado alta que dificulte el override.",
    configuration: "**Orden de prioridad**\n- `!important` (máxima prioridad)\n- `#id` (100 puntos)\n- `.class` (10 puntos)\n- `element` (1 punto)\n- `*` (0 puntos)\n\n**Cálculo de especificidad**\n- `#header` = 100 puntos\n- `.card.active` = 20 puntos (10+10)\n- `div.card` = 11 puntos (1+10)\n- `p` = 1 punto\n\n**Buenas prácticas**\n- Evita `!important` cuando sea posible\n- Usa `.class` en lugar de `#id`\n- Combina selectores para mayor especificidad\n- Mantén especificidad baja para facilitar override\n\n**Ejemplos prácticos**\n- `.card.active` (más específico que `.card`)\n- `#header .nav` (muy específico, difícil de override)\n- `.btn.btn-primary` (especificidad media)\n- `!important` (último recurso)"
  },
  {
    id: "box-shadow",
    name: "Box-shadow (CSS)",
    category: "Visual",
    description: "Sombra alrededor de un elemento que aporta jerarquía y profundidad.",
    relatedTerms: ["border", "transform-transition-animation"],
    example: "Elevar una tarjeta en hover con box-shadow más amplio para reforzar el affordance.",
    configuration: "**Sintaxis básica**\n- `box-shadow: x y blur color`\n- `box-shadow: 0 2px 4px rgba(0,0,0,0.1);` (sombra estándar)\n- `box-shadow: 0 0 0 1px #e5e7eb;` (borde sutil)\n\n**Múltiples sombras**\n- `box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);` (doble sombra)\n- `box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);` (sombra suave)\n\n**Sombras internas**\n- `box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);` (sombra interna)\n- `box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);` (hundido)\n\n**Valores comunes**\n- `0 1px 3px rgba(0,0,0,0.1)` (sombra sutil)\n- `0 4px 6px -1px rgba(0,0,0,0.1)` (sombra media)\n- `0 10px 15px -3px rgba(0,0,0,0.1)` (sombra grande)\n\n**Ejemplos prácticos**\n- `box-shadow: 0 2px 4px rgba(0,0,0,0.1);` (tarjeta elevada)\n- `box-shadow: 0 0 0 1px #e5e7eb;` (borde sin border)\n- `box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);` (botón presionado)"
  },
  {
    id: "line-height-letter-spacing",
    name: "Line-height / Letter-spacing (CSS)",
    category: "Typography",
    description: "Propiedades tipográficas que controlan la altura de línea y el espaciado entre letras para mejorar legibilidad.",
    relatedTerms: ["units"],
    example: "Usar line-height: 1.6 en párrafos y letter-spacing: 0.02em en títulos pequeños.",
    configuration: "**Line-height (altura de línea)**\n- `line-height: 1.2` (títulos, más apretado)\n- `line-height: 1.5` (texto general, estándar)\n- `line-height: 1.6` (párrafos, más legible)\n- `line-height: 2` (texto muy espaciado)\n\n**Letter-spacing (espaciado entre letras)**\n- `letter-spacing: -0.025em` (más apretado)\n- `letter-spacing: 0` (normal)\n- `letter-spacing: 0.05em` (más espaciado)\n- `letter-spacing: 0.1em` (muy espaciado)\n\n**Valores sin unidad**\n- Escalan automáticamente con el tamaño de fuente\n- `line-height: 1.5` (mejor que `line-height: 24px`)\n- `letter-spacing: 0.05em` (mejor que `letter-spacing: 1px`)\n\n**Uso por tipo de texto**\n- Títulos: `line-height: 1.2; letter-spacing: -0.025em`\n- Párrafos: `line-height: 1.6; letter-spacing: 0`\n- Botones: `line-height: 1.4; letter-spacing: 0.05em`\n\n**Ejemplos prácticos**\n- `line-height: 1.5; letter-spacing: 0;` (texto estándar)\n- `line-height: 1.2; letter-spacing: -0.025em;` (título compacto)\n- `line-height: 1.6; letter-spacing: 0.05em;` (texto legible)"
  },
  {
    id: "units",
    name: "Units (px, rem, em, vw, vh)",
    category: "Advanced",
    description: "Unidades de medida para dimensiones y tipografía; relativas (rem/em/vw/vh) favorecen la escalabilidad.",
    relatedTerms: ["width-height", "line-height-letter-spacing"],
    example: "Definir tipografía base en rem para respetar ajustes de accesibilidad del usuario.",
    configuration: "**Unidades absolutas**\n- `px` (píxeles: `16px`)\n- `pt` (puntos: `12pt`)\n- `in`, `cm`, `mm` (medidas físicas)\n\n**Unidades relativas**\n- `rem` (relativo al root: `1rem = 16px`)\n- `em` (relativo al padre: `1.2em`)\n- `%` (porcentaje del padre: `50%`)\n\n**Unidades de viewport**\n- `vw` (viewport width: `100vw` = ancho completo)\n- `vh` (viewport height: `100vh` = altura completa)\n- `vmin` (menor entre vw y vh)\n- `vmax` (mayor entre vw y vh)\n\n**Unidades de Grid**\n- `fr` (fracción: `1fr` = una fracción del espacio disponible)\n\n**Equivalencias útiles**\n- `1rem = 16px`\n- `1em = 16px` (si el padre es 16px)\n\n**Uso recomendado**\n- `rem` para tipografía\n- `px` para bordes\n- `%` para layouts\n- `vw/vh` para elementos de pantalla completa"
  },
  {
    id: "transform-transition-animation",
    name: "Transform / Transition / Animation (CSS)",
    category: "Animation",
    description: "Propiedades para mover/rotar/escalar elementos y controlar la suavidad y duración de los cambios.",
    relatedTerms: ["box-shadow"],
    example: "Aplicar transform: translateY(-2px); transition: transform 150ms ease; al presionar un botón.",
    configuration: "**Transform (transformar)**\n- `transform: translateX(10px)` (mover horizontalmente)\n- `transform: translateY(-5px)` (mover verticalmente)\n- `transform: scale(1.1)` (escalar 110%)\n- `transform: rotate(45deg)` (rotar 45 grados)\n- `transform: translateX(10px) scale(1.1)` (combinar)\n\n**Transition (transición)**\n- `transition: all 0.3s ease` (todas las propiedades)\n- `transition: transform 150ms ease-in-out` (solo transform)\n- `transition: opacity 0.2s, transform 0.3s` (múltiples)\n\n**Timing functions**\n- `ease` (inicio lento, rápido, final lento)\n- `ease-in` (inicio lento)\n- `ease-out` (final lento)\n- `ease-in-out` (inicio y final lentos)\n\n**Animation (animación)**\n- `animation: fadeIn 0.5s ease-in-out` (animación personalizada)\n- `animation: slideIn 0.3s ease-out` (deslizar)\n- `animation: bounce 0.6s ease-in-out` (rebotar)\n\n**Ejemplos prácticos**\n- `transform: translateY(-2px); transition: transform 150ms ease;` (botón hover)\n- `transform: scale(0.95); transition: transform 100ms ease;` (botón presionado)\n- `transform: rotate(180deg); transition: transform 300ms ease;` (icono rotar)"
  }
]

export const cssCategories = [
  "Todos",
  "Layout",
  "Spacing", 
  "Visual",
  "Typography",
  "Responsive",
  "Animation",
  "Advanced"
]
