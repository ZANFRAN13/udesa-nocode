export interface CSSTerm {
  id: string
  name: string
  category: string
  description: string
  relatedTerms?: string[]
  example?: string
  imageUrl?: string
}

export const cssTermsData: CSSTerm[] = [
  {
    id: "padding",
    name: "Padding (CSS)",
    category: "Spacing",
    description: "Espacio interno entre el contenido de un elemento y su *[border](#border)*. Afecta el tamaño \"caja\" del componente.",
    relatedTerms: ["margin", "border", "width-height"],
    example: "Añadir padding: 16px; a una tarjeta para que el texto no quede pegado al borde."
  },
  {
    id: "margin",
    name: "Margin (CSS)",
    category: "Spacing",
    description: "Espacio externo que separa un elemento de otros elementos adyacentes.",
    relatedTerms: ["padding", "border"],
    example: "Aplicar margin-top: 24px; entre secciones para mejorar la respiración visual."
  },
  {
    id: "border",
    name: "Border (CSS)",
    category: "Visual",
    description: "Línea que delimita el contorno de un elemento; puede tener grosor, color y estilo.",
    relatedTerms: ["padding", "margin", "box-shadow"],
    example: "Usar border: 1px solid #E5E7EB; para delinear una tabla con suavidad."
  },
  {
    id: "width-height",
    name: "Width / Height (CSS)",
    category: "Layout",
    description: "Dimensiones explícitas de un elemento. Pueden ser fijas (px) o relativas (%, vw/vh).",
    relatedTerms: ["display", "units", "padding"],
    example: "Definir width: 100%; max-width: 640px; para que un contenedor crezca pero no exceda un ancho legible."
  },
  {
    id: "display",
    name: "Display (CSS)",
    category: "Layout",
    description: "Controla cómo se muestra un elemento en la página: si ocupa toda una línea (bloque), si se alinea horizontalmente con otros (en línea), si se comporta como una tabla, o si directamente no se muestra (oculto). Es como decidir si un elemento es una caja grande que ocupa todo el ancho, o una caja pequeña que se pone al lado de otras.",
    relatedTerms: ["flexbox", "grid"],
    example: "Cambiar display: inline a display: block para que un enlace ocupe todo el ancho clicable, o display: none para ocultar un elemento."
  },
  {
    id: "flexbox",
    name: "Flexbox (CSS)",
    category: "Layout",
    description: "Sistema de layout unidimensional para alinear y distribuir espacio entre elementos.",
    relatedTerms: ["grid", "display"],
    example: "Centrar vertical y horizontalmente con *[display](#display)*: flex; align-items: center; justify-content: center;."
  },
  {
    id: "grid",
    name: "Grid (CSS)",
    category: "Layout",
    description: "Sistema de layout bidimensional para crear rejillas complejas con filas y columnas.",
    relatedTerms: ["flexbox", "display"],
    example: "Construir un dashboard con grid-template-columns: repeat(12, 1fr); y áreas definidas."
  },
  {
    id: "position",
    name: "Position (CSS)",
    category: "Layout",
    description: "Controla cómo se posiciona un elemento (static, relative, absolute, fixed, sticky).",
    relatedTerms: ["z-index", "display"],
    example: "Usar position: sticky; top: 0; para mantener visible una barra de filtros al hacer scroll."
  },
  {
    id: "z-index",
    name: "Z-index (CSS)",
    category: "Layout",
    description: "Prioridad de apilamiento de elementos posicionados; determina cuál queda por encima.",
    relatedTerms: ["position"],
    example: "Dar z-index: 1000 a un modal para que se muestre por encima del resto de la interfaz."
  },
  {
    id: "overflow",
    name: "Overflow (CSS)",
    category: "Layout",
    description: "Define qué ocurre cuando el contenido excede el contenedor (visible, hidden, scroll, auto).",
    relatedTerms: ["width-height"],
    example: "Aplicar overflow-y: auto; a una lista alta para permitir desplazamiento dentro de un panel."
  },
  {
    id: "media-query",
    name: "Media Query (CSS)",
    category: "Responsive",
    description: "Reglas condicionales para aplicar estilos según características del dispositivo (ancho, preferencia de color, etc.).",
    relatedTerms: ["breakpoint", "responsive"],
    example: "@media (max-width: 768px) { … } para ajustar tipografía y espaciados en pantallas pequeñas usando *[breakpoint](#breakpoint)*."
  },
  {
    id: "breakpoint",
    name: "Breakpoint (CSS)",
    category: "Responsive",
    description: "Puntos de corte de ancho/alto en los que el diseño cambia su disposición.",
    relatedTerms: ["responsive", "media-query"],
    example: "Usar breakpoints a 640/768/1024px para reorganizar tarjetas de 1→2→3 columnas."
  },
  {
    id: "css-variables",
    name: "CSS Variables (Custom Properties)",
    category: "Advanced",
    description: "Valores reutilizables definidos por el usuario que pueden cambiarse en cascada.",
    relatedTerms: ["specificity"],
    example: "--color-primary: #7C3AED; y usar color: var(--color-primary); para mantener consistencia de marca."
  },
  {
    id: "specificity",
    name: "Specificity (CSS)",
    category: "Advanced",
    description: "Reglas de prioridad que determinan qué estilos se aplican cuando hay conflictos.",
    relatedTerms: ["css-variables"],
    example: "Preferir clases sobre IDs para evitar especificidad demasiado alta que dificulte el override."
  },
  {
    id: "box-shadow",
    name: "Box-shadow (CSS)",
    category: "Visual",
    description: "Sombra alrededor de un elemento que aporta jerarquía y profundidad.",
    relatedTerms: ["border", "transform-transition-animation"],
    example: "Elevar una tarjeta en hover con box-shadow más amplio para reforzar el affordance."
  },
  {
    id: "line-height-letter-spacing",
    name: "Line-height / Letter-spacing (CSS)",
    category: "Typography",
    description: "Propiedades tipográficas que controlan la altura de línea y el espaciado entre letras para mejorar legibilidad.",
    relatedTerms: ["units"],
    example: "Usar line-height: 1.6 en párrafos y letter-spacing: 0.02em en títulos pequeños."
  },
  {
    id: "units",
    name: "Units (px, rem, em, vw, vh)",
    category: "Advanced",
    description: "Unidades de medida para dimensiones y tipografía; relativas (rem/em/vw/vh) favorecen la escalabilidad.",
    relatedTerms: ["width-height", "line-height-letter-spacing"],
    example: "Definir tipografía base en rem para respetar ajustes de accesibilidad del usuario."
  },
  {
    id: "transform-transition-animation",
    name: "Transform / Transition / Animation (CSS)",
    category: "Animation",
    description: "Propiedades para mover/rotar/escalar elementos y controlar la suavidad y duración de los cambios.",
    relatedTerms: ["box-shadow"],
    example: "Aplicar transform: translateY(-2px); transition: transform 150ms ease; al presionar un botón."
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
