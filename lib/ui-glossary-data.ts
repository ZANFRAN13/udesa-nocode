export interface UITerm {
  id: string
  name: string
  category: string
  description: string
  relatedTerms?: string[]
  example?: string
  configuration?: string
  imageUrl?: string
}

export const uiTermsData: UITerm[] = [
  {
    id: "2d-matrix",
    name: "2D Matrix",
    category: "Controls",
    description: "Un *[control](#control)* de entrada especializado utilizado principalmente en aplicaciones complejas para modificar simultáneamente múltiples parámetros relacionados dibujando una curva compleja. La interacción con este control típicamente ocurre haciendo clic en un punto de una curva existente, luego arrastrando ese punto a una nueva ubicación. Las matrices 2D son útiles cuando hay dos parámetros que dependen uno del otro (como las curvas de luminancia y RGB en aplicaciones de edición de fotos) y que típicamente se modificarán juntos.",
    relatedTerms: ["range-control", "slider", "knob", "input-control"],
    example: "Ajustes de curvas RGB en software de edición de fotos como Photoshop o Lightroom.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/2d-matrix.jpg"
  },
  {
    id: "accordion",
    name: "Accordion",
    category: "Navigation",
    description: "Un elemento de interfaz que se expande en el lugar para exponer información oculta. Los *accordions* se usan frecuentemente para comprimir contenido en páginas largas y son especialmente útiles en móviles. Los *accordions* usualmente se representan con una etiqueta y una flecha o signo más.",
    relatedTerms: ["tab-bar", "collapsible", "expandable-menu"],
    example: "Secciones de preguntas frecuentes donde las preguntas se pueden hacer clic para revelar respuestas, o secciones de menú móvil.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/accordion.jpg"
  },
  {
    id: "anchor-link",
    name: "Anchor Link (In-Page Link, Jump Link)",
    category: "Navigation",
    description: "Un *[link](#link)* que permite a los usuarios navegar de una ubicación a otra dentro de la misma página. Los *anchor links* se usan frecuentemente para implementar tablas de contenido dentro de la página.",
    relatedTerms: ["link"],
    example: "Enlaces de tabla de contenidos que saltan a diferentes secciones de un artículo largo.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/anchor-text.jpg"
  },
  {
    id: "back-to-top-button",
    name: "Back-to-Top Button",
    category: "Controls",
    description: "Un *[button](#button)* que lleva a los usuarios de vuelta al inicio de la página, donde usualmente se ubican la interfaz de navegación u otros controles importantes. Usualmente se implementa como un *[floating-button](#floating-button)* ubicado en la esquina inferior derecha de la página y es particularmente útil en páginas móviles largas.",
    relatedTerms: ["floating-button", "button"],
    example: "Botón de flecha que aparece al hacer scroll hacia abajo en páginas largas para regresar rápidamente al inicio.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/back-to-top.jpg"
  },
  {
    id: "badge",
    name: "Badge",
    category: "Indicators",
    description: "Indica una notificación (usualmente como un punto) o un conteo de elementos (usualmente como un número). Un *badge* usualmente aparece encima de un *[icon](#icon)* (como un carrito de compras o ícono de mensajes) para dirigir la atención a ese elemento.",
    relatedTerms: ["icon", "progress-indicator"],
    example: "Punto rojo con número en el ícono de una app de mensajería mostrando el conteo de mensajes no leídos.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/badge.jpg"
  },
  {
    id: "bottom-sheet",
    name: "Bottom Sheet",
    category: "Overlays",
    description: "Un *[overlay](#overlay)* que se ancla al borde inferior de la pantalla de un dispositivo móvil y que muestra detalles adicionales o acciones.",
    relatedTerms: ["overlay", "side-sheet"],
    example: "Panel de opciones para compartir o menú de acciones adicionales que se desliza desde abajo en aplicaciones móviles.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/bottom-sheet.jpg"
  },
  {
    id: "breadcrumbs",
    name: "Breadcrumbs",
    category: "Navigation",
    description: "Un elemento de navegación que muestra una secuencia jerárquica de categorías (desde la más general hasta la menos general) a la que pertenece la página actual, dentro de la arquitectura de información de un sitio. Es similar a una ruta en un sistema de archivos.",
    relatedTerms: ["navigation-bar"],
    example: "Inicio > Productos > Electrónicos > Smartphones mostrando la ruta de navegación.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/breadcrumbs.jpg"
  },
  {
    id: "button",
    name: "Button",
    category: "Controls",
    description: "Un elemento de interfaz que ejecutará una acción determinada (ej. enviar un formulario, iniciar un proceso) cuando los usuarios hacen clic o tocan. Está compuesto por un área objetivo clickeable con una etiqueta que usualmente describe la acción que se ejecutará. Los botones digitales frecuentemente se asemejan a botones físicos.",
    relatedTerms: ["floating-button", "back-to-top-button", "split-button"],
    example: "Botón de enviar en formularios, botón Agregar al Carrito en e-commerce, o botones de llamada a la acción.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/button.jpg"
  },
  {
    id: "calendar-picker",
    name: "Calendar Picker",
    category: "Controls",
    description: "Un tipo especial de *[date-picker](#date-picker)* que permite a los usuarios seleccionar una fecha desde una representación visual de un calendario. Cuando se activa, típicamente muestra un calendario de vista mensual que los usuarios pueden navegar para elegir un día, mes y año específicos.",
    relatedTerms: ["date-picker", "wheel-style-date-picker", "input-control", "picker"],
    example: "Selección de fechas en formularios de reservas o interfaces de programación de eventos.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/calendar-picker.jpg"
  },
  {
    id: "card",
    name: "Card",
    category: "Layout",
    description: "Un *[container](#container)* para algunas piezas cortas de información relacionada. Se asemeja aproximadamente a una carta de juego en tamaño y forma y está destinado como una representación corta de una unidad conceptual.",
    relatedTerms: ["container"],
    example: "Tarjetas de productos en cuadrículas de e-commerce mostrando imagen, título, precio y calificación.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/20/card.jpg"
  },
  {
    id: "carousel",
    name: "Carousel",
    category: "Layout",
    description: "Un elemento de diseño que muestra un conjunto rotativo de elementos (usualmente imágenes). Los usuarios pueden navegar a través de los elementos del *carousel* manualmente, usando flechas, *[button](#button)*, o desplazamiento horizontal, o el *carousel* puede rotar automáticamente a través de las imágenes en su conjunto. Los *carousels* pueden ahorrar espacio de pantalla ya que pueden ajustar muchos elementos en un área pequeña.",
    relatedTerms: ["button"],
    example: "Galerías de imágenes en páginas de productos o deslizadores de contenido destacado en páginas de inicio.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/20/carousel.jpg"
  },
  {
    id: "checkbox",
    name: "Checkbox",
    category: "Controls",
    description: "Un *[control](#control)* de entrada que puede aparecer solo o en una lista de *checkboxes*. Por sí solo, un *checkbox* permite a los usuarios seleccionar entre dos estados: marcado y desmarcado. Una lista de *checkboxes* se usa para permitir a los usuarios seleccionar múltiples opciones de un conjunto.",
    relatedTerms: ["radio-button", "toggle", "input-control"],
    example: "Aceptación de términos y condiciones, múltiples opciones de filtro en búsquedas, o selección de características.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/checkbox.jpg"
  },
  {
    id: "combo-box",
    name: "Combo Box",
    category: "Controls",
    description: "Una combinación de una *[dropdown-list](#dropdown-list)* y un campo de entrada de texto (*[textbox](#textbox)*), permitiendo a los usuarios seleccionar de opciones predefinidas o escribir su propia entrada.",
    relatedTerms: ["dropdown-list", "textbox", "input-control"],
    example: "Campo de selección de país que permite escribir para filtrar o ingresar un valor personalizado.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/combo-box.jpg"
  },
  {
    id: "container",
    name: "Container",
    category: "Layout",
    description: "Un elemento estructural que contiene y organiza otros elementos de interfaz. Los *containers* ayudan a establecer jerarquía visual y agrupar contenido relacionado.",
    relatedTerms: ["card"],
    example: "Divs contenedores que contienen campos de formulario o secciones de contenido en una página web.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/container.jpg"
  },
  {
    id: "contextual-menu",
    name: "Contextual Menu",
    category: "Navigation",
    description: "Un *[menu](#menu)* que aparece cuando los usuarios hacen clic derecho o presión larga en un elemento, mostrando acciones relevantes a ese contexto específico.",
    relatedTerms: ["menu", "dropdown-menu"],
    example: "Menú de clic derecho en aplicaciones de escritorio o menú de presión larga en dispositivos móviles.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/contextual-menu.jpg"
  },
  {
    id: "control",
    name: "Control",
    category: "Controls",
    description: "Un término general para elementos de interfaz interactivos que permiten a los usuarios realizar acciones o ingresar datos.",
    relatedTerms: ["input-control", "button", "slider", "checkbox", "radio-button"],
    example: "Cualquier elemento interactivo como *[button](#button)*, *[slider](#slider)*, *[checkbox](#checkbox)* o campos de entrada.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/20/control.jpg"
  },
  {
    id: "date-picker",
    name: "Date Picker",
    category: "Controls",
    description: "Un *[control](#control)* de entrada diseñado específicamente para seleccionar fechas. Puede implementarse como *[calendar-picker](#calendar-picker)*, selectores desplegables, o *[wheel-style-date-picker](#wheel-style-date-picker)*.",
    relatedTerms: ["calendar-picker", "wheel-style-date-picker", "input-control", "picker"],
    example: "Selección de fechas en sistemas de reservas, formularios o aplicaciones de programación.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/20/date-picker.jpg"
  },
  {
    id: "dialog",
    name: "Dialog",
    category: "Overlays",
    description: "Una ventana *[modal](#modal)* que aparece encima del contenido principal, requiriendo interacción del usuario antes de proceder. Los *dialogs* interrumpen el flujo de trabajo del usuario para presentar información importante o recopilar entrada.",
    relatedTerms: ["modal", "overlay", "popup", "lightbox"],
    example: "Diálogos de confirmación para eliminar elementos o mensajes de alerta que requieren reconocimiento del usuario.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/dialog.jpg"
  },
  {
    id: "drawer-menu",
    name: "Drawer Menu",
    category: "Navigation",
    description: "Un panel de navegación que se desliza desde el borde de la pantalla, típicamente usado en aplicaciones móviles. También conocido como menú hamburguesa.",
    relatedTerms: ["side-sheet", "navigation-menu", "menu", "icon"],
    example: "Navegación de aplicación móvil que se desliza desde la izquierda al tocar el *[icon](#icon)* de hamburguesa.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/drawer-menu.jpg"
  },
  {
    id: "dropdown-list",
    name: "Dropdown List",
    category: "Controls",
    description: "Un *[control](#control)* que muestra una lista de opciones cuando se activa, permitiendo a los usuarios seleccionar un elemento de la lista.",
    relatedTerms: ["dropdown-menu", "combo-box", "listbox", "input-control"],
    example: "Lista desplegable de selección de país en formularios de registro u opciones de ordenamiento en resultados de búsqueda.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/dropdown-list.jpg"
  },
  {
    id: "dropdown-menu",
    name: "Dropdown Menu (Pulldown Menu, Linear Menu)",
    category: "Navigation",
    description: "Un *[menu](#menu)* que aparece debajo de un elemento disparador cuando se activa, mostrando una lista vertical de opciones o acciones que los usuarios pueden seleccionar.",
    relatedTerms: ["menu", "submenu", "contextual-menu", "dropdown-list"],
    example: "Menú de cuenta de usuario en encabezados o navegación de categorías en sitios de e-commerce.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/dropdown-menu.jpg"
  },
  {
    id: "expandable-menu",
    name: "Expandable Menu",
    category: "Navigation",
    description: "Un sistema de *[menu](#menu)* donde los elementos pueden expandirse para revelar sub-elementos u opciones adicionales, creando una estructura de navegación jerárquica.",
    relatedTerms: ["accordion", "submenu", "menu", "collapsible"],
    example: "Vista de árbol del explorador de archivos o navegación de categorías anidadas en sistemas de gestión de contenido.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/expandable-menu.jpg"
  },
  {
    id: "floating-button",
    name: "Floating Button (Floating Action Button, FAB)",
    category: "Controls",
    description: "Un *[button](#button)* circular que flota sobre el contenido y permanece en una posición fija en la pantalla. Los FABs típicamente se usan para la acción primaria en una pantalla.",
    relatedTerms: ["button", "back-to-top-button"],
    example: "Botón de más para crear contenido nuevo, botón de redactar en aplicaciones de email, o botón de chat en sitios web.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/floating-button.jpg"
  },
  {
    id: "icon",
    name: "Icon",
    category: "Visual Elements",
    description: "Una pequeña representación gráfica de un programa, característica o concepto. Los *icons* se usan para comunicar rápidamente significado y funcionalidad a los usuarios sin requerir texto.",
    relatedTerms: ["button", "badge"],
    example: "Ícono de inicio para navegación, ícono de papelera para eliminar, ícono de corazón para favoritos, o ícono de hamburguesa para *[menu](#menu)*.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/icon.jpg"
  },
  {
    id: "input-control",
    name: "Input Control",
    category: "Controls",
    description: "Cualquier elemento de interfaz que permite a los usuarios ingresar o seleccionar datos, incluyendo campos de texto, *[checkbox](#checkbox)*, *[radio-button](#radio-button)*, *[slider](#slider)*, y listas desplegables.",
    relatedTerms: ["textbox", "checkbox", "radio-button", "slider"],
    example: "Campos de formulario, cajas de búsqueda, o cualquier elemento interactivo que acepta entrada del usuario.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/input-control.jpg"
  },
  {
    id: "input-stepper",
    name: "Input Stepper",
    category: "Controls",
    description: "Un *[input-control](#input-control)* numérico con *[button](#button)* de incremento y decremento, permitiendo a los usuarios ajustar valores en pasos predefinidos.",
    relatedTerms: ["input-control", "slider", "button"],
    example: "Selectores de cantidad en carritos de compras o ajustadores de valores numéricos en configuraciones.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/input-stepper.jpg"
  },
  {
    id: "knob",
    name: "Knob (Virtual Knob)",
    category: "Controls",
    description: "Un *[control](#control)* circular que los usuarios pueden rotar para ajustar valores, imitando perillas físicas encontradas en equipos de audio o electrodomésticos.",
    relatedTerms: ["slider", "range-control", "input-control"],
    example: "Controles de volumen en aplicaciones de audio o ajustes de temperatura en aplicaciones de hogar inteligente.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/knob.jpg"
  },
  {
    id: "lightbox",
    name: "Lightbox",
    category: "Overlays",
    description: "Una técnica de *[overlay](#overlay)* que muestra imágenes o contenido en una ventana *[modal](#modal)* sobre un fondo oscurecido, enfocando la atención en el contenido mostrado.",
    relatedTerms: ["modal", "dialog", "overlay"],
    example: "Galerías de imágenes donde hacer clic en una miniatura abre la imagen completa en un overlay lightbox.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/lightbox.jpg"
  },
  {
    id: "link",
    name: "Link (Hyperlink)",
    category: "Navigation",
    description: "Un elemento clickeable que navega a los usuarios a otra página, sección o recurso. Los *links* son fundamentales para la navegación web.",
    relatedTerms: ["anchor-link"],
    example: "Enlaces de texto en artículos, enlaces de navegación en menús, o enlaces de llamada a la acción en contenido.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/link.jpg"
  },
  {
    id: "listbox",
    name: "Listbox",
    category: "Controls",
    description: "Un *[control](#control)* que presenta una lista de opciones en una caja desplazable, permitiendo a los usuarios seleccionar uno o múltiples elementos.",
    relatedTerms: ["dropdown-list", "input-control", "scrollbar"],
    example: "Listas de selección múltiple en formularios o interfaces de selección de archivos en aplicaciones.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/listbox.jpg"
  },
  {
    id: "megamenu",
    name: "Megamenu (Rectangular Menu, Square Menu)",
    category: "Navigation",
    description: "Un *[dropdown-menu](#dropdown-menu)* grande que puede contener múltiples columnas de enlaces, imágenes y otro contenido, proporcionando opciones extensas de navegación en un diseño organizado.",
    relatedTerms: ["dropdown-menu", "navigation-menu"],
    example: "Menús de navegación grandes en sitios de e-commerce mostrando categorías, subcategorías y productos destacados.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/megamenu.jpg"
  },
  {
    id: "modal",
    name: "Modal",
    category: "Overlays",
    description: "Una ventana o *[overlay](#overlay)* que aparece encima del contenido principal de la página, bloqueando la interacción con el resto de la interfaz hasta que el usuario la cierre o complete una acción. Los modales requieren atención inmediata del usuario y típicamente oscurecen el contenido de fondo.",
    relatedTerms: ["dialog", "overlay", "lightbox", "popup"],
    example: "Ventanas emergentes de confirmación, formularios de inicio de sesión superpuestos, galerías de imágenes en pantalla completa, o avisos que requieren que el usuario haga clic en 'Aceptar' o 'Cancelar' antes de continuar.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/dialog.jpg"
  },
  {
    id: "menu",
    name: "Menu",
    category: "Navigation",
    description: "Una lista de opciones o comandos que los usuarios pueden seleccionar, típicamente organizada en una jerarquía lógica o agrupación.",
    relatedTerms: ["dropdown-menu", "contextual-menu", "navigation-menu"],
    example: "Menús de aplicación, menús de navegación de sitios web, o listas de opciones sensibles al contexto.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/menu.jpg"
  },
  {
    id: "menu-bar",
    name: "Menu Bar",
    category: "Navigation",
    description: "Una barra horizontal que contiene múltiples títulos de *[menu](#menu)*, típicamente encontrada en la parte superior de aplicaciones de escritorio.",
    relatedTerms: ["navigation-bar", "ribbon", "menu"],
    example: "Menús Archivo, Editar, Ver, Ayuda en aplicaciones de escritorio como Microsoft Word o Adobe Photoshop.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/menu-bar.jpg"
  },
  {
    id: "navigation-bar",
    name: "Navigation Bar",
    category: "Navigation",
    description: "Una barra horizontal o vertical que contiene *[link](#link)* de navegación, típicamente ubicada en la parte superior o lateral de una página web para ayudar a los usuarios a navegar entre diferentes secciones o páginas.",
    relatedTerms: ["breadcrumbs", "menu", "menu-bar", "link"],
    example: "Menú principal en la parte superior de sitios web con enlaces a Inicio, Acerca de, Servicios, Contacto.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/nav-bar.jpg"
  },
  {
    id: "navigation-menu",
    name: "Navigation Menu",
    category: "Navigation",
    description: "Una colección de *[link](#link)* u opciones que ayudan a los usuarios a navegar a través de la estructura de un sitio web o aplicación.",
    relatedTerms: ["menu", "navigation-bar", "drawer-menu", "link"],
    example: "Navegación primaria en encabezados de sitios web o cajones de navegación de aplicaciones.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/navigation-menu.jpg"
  },
  {
    id: "overlay",
    name: "Overlay",
    category: "Overlays",
    description: "Un elemento de interfaz que aparece encima del contenido principal, típicamente usado para *[modal](#modal)*, *[tooltip](#tooltip)*, menús desplegables, u otro contenido temporal.",
    relatedTerms: ["modal", "dialog", "tooltip", "popup"],
    example: "Ventanas *[modal](#modal)*, menús desplegables, *[tooltip](#tooltip)*, o cualquier contenido que aparece sobre la interfaz principal.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/overlay.jpg"
  },
  {
    id: "picker",
    name: "Picker",
    category: "Controls",
    description: "Un *[control](#control)* que permite a los usuarios seleccionar de un conjunto de opciones predefinidas, frecuentemente implementado como ruedas, listas o cuadrículas.",
    relatedTerms: ["wheel-picker", "date-picker", "calendar-picker"],
    example: "Selectores de tiempo, selectores de color, o selectores de opciones en aplicaciones móviles.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/picker.jpg"
  },
  {
    id: "pie-menu",
    name: "Pie Menu (Radial Menu)",
    category: "Navigation",
    description: "Un *[menu](#menu)* circular donde las opciones están organizadas alrededor de un punto central, permitiendo selección rápida a través de gestos direccionales.",
    relatedTerms: ["contextual-menu", "menu"],
    example: "Menús radiales en software de diseño o interfaces de juegos para selección rápida de herramientas o acciones.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/pie-menu.jpg"
  },
  {
    id: "popup",
    name: "Popup (Popover)",
    category: "Overlays",
    description: "Un pequeño *[overlay](#overlay)* que aparece cerca de un elemento disparador para mostrar información adicional u opciones sin navegar fuera del contexto actual.",
    relatedTerms: ["tooltip", "overlay"],
    example: "Burbujas de información, mini perfiles al pasar el cursor, o paneles de opciones adicionales.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/popup.jpg"
  },
  {
    id: "popup-tip",
    name: "Popup Tip",
    category: "Overlays",
    description: "Un pequeño *[overlay](#overlay)* informativo que proporciona consejos útiles o explicaciones, similar a los *[tooltip](#tooltip)* pero puede ser más persistente.",
    relatedTerms: ["tooltip", "popup"],
    example: "Consejos de ayuda en formularios o pistas de incorporación en aplicaciones.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/popup-tip.jpg"
  },
  {
    id: "progress-bar",
    name: "Progress Bar",
    category: "Indicators",
    description: "Un indicador visual que muestra el progreso de completación de una tarea o proceso, típicamente apareciendo como una barra horizontal que se llena a medida que el proceso avanza.",
    relatedTerms: ["progress-indicator", "spinner", "skeleton-screen"],
    example: "Progreso de carga de archivos, estado de completación de formularios, o progreso de carga en aplicaciones.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/progress-bar.jpg"
  },
  {
    id: "progress-indicator",
    name: "Progress Indicator",
    category: "Indicators",
    description: "Cualquier elemento visual que comunica el estado o progreso de un proceso en curso a los usuarios.",
    relatedTerms: ["progress-bar", "spinner", "skeleton-screen"],
    example: "Barras de carga, spinners, indicadores de pasos, o porcentajes de completación.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/progress-indicator.jpg"
  },
  {
    id: "radio-button",
    name: "Radio Button",
    category: "Controls",
    description: "Un *[control](#control)* de entrada que permite a los usuarios seleccionar una opción de un conjunto de opciones mutuamente excluyentes. Los *radio buttons* típicamente se presentan en grupos donde solo una opción puede seleccionarse a la vez.",
    relatedTerms: ["checkbox", "input-control", "segmented-button"],
    example: "Selección de género, elección de método de pago, o selecciones de opción única en formularios.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/radio-button.jpg"
  },
  {
    id: "range-control",
    name: "Range Control (Continuous Control)",
    category: "Controls",
    description: "Un *[control](#control)* que permite a los usuarios seleccionar un valor de un rango continuo, típicamente implementado como *[slider](#slider)* o *[knob](#knob)*.",
    relatedTerms: ["slider", "knob", "input-control"],
    example: "Controles de volumen, ajustes de brillo, o cualquier interfaz de selección de valor continuo.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/range-control.jpg"
  },
  {
    id: "ribbon",
    name: "Ribbon",
    category: "Navigation",
    description: "Una interfaz de comandos que organiza características y funciones en un conjunto de pestañas (*[tab-bar](#tab-bar)*), con cada pestaña conteniendo comandos específicos para una actividad particular. Popularizado por las aplicaciones de Microsoft Office.",
    relatedTerms: ["tab-bar", "menu-bar", "button"],
    example: "Interfaz ribbon de Microsoft Office con pestañas Inicio, Insertar, Diseño conteniendo herramientas relacionadas.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/ribbon.jpg"
  },
  {
    id: "scrollbar",
    name: "Scrollbar",
    category: "Controls",
    description: "Un elemento usado para indicar y controlar la porción de un contenedor o página que es visible en la pantalla. Consiste en una pista y una manija arrastrable para navegación a través del contenido.",
    relatedTerms: ["slider"],
    example: "Barras de desplazamiento verticales en páginas web o barras de desplazamiento horizontales para tablas y contenido ancho.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/scrollbar.jpg"
  },
  {
    id: "segmented-button",
    name: "Segmented Button (Segmented Control)",
    category: "Controls",
    description: "Un elemento de interfaz de usuario que muestra un grupo de *[button](#button)* conectados dispuestos en una fila horizontal, permitiendo a los usuarios hacer selecciones de múltiples opciones segmentadas.",
    relatedTerms: ["button", "toggle", "radio-button"],
    example: "Cambiadores de vista (vista de lista/cuadrícula), interruptores de filtro, o selectores de opciones en aplicaciones móviles.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/segmented-button.jpg"
  },
  {
    id: "side-sheet",
    name: "Side Bar (Side Sheet, Drawer, Flyout)",
    category: "Overlays",
    description: "Un tipo de *[overlay](#overlay)* que se desliza desde el borde izquierdo o derecho de la pantalla, usualmente cubriendo una parte significativa de la pantalla. Puede ser modal o no-modal.",
    relatedTerms: ["overlay", "bottom-sheet", "drawer-menu"],
    example: "Cajones de navegación en aplicaciones móviles o paneles de filtro en sitios de e-commerce.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/side-sheet.jpg"
  },
  {
    id: "skeleton-screen",
    name: "Skeleton Screen",
    category: "Indicators",
    description: "Un tipo específico de *[progress-indicator](#progress-indicator)* usado exclusivamente para cargas de página completa que proporciona a los usuarios un visual tipo wireframe imitando el diseño de la página.",
    relatedTerms: ["progress-indicator"],
    example: "Bloques de marcador de posición grises que muestran la estructura del contenido mientras se carga, común en feeds de redes sociales.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/skeleton-screen.jpg"
  },
  {
    id: "slider",
    name: "Slider",
    category: "Controls",
    description: "Un elemento de interfaz que permite a los usuarios ajustar un valor o navegar a través de un rango moviendo un indicador (manija) a lo largo de una pista horizontal o vertical. Apropiado cuando los valores exactos pueden ser difíciles de cuantificar.",
    relatedTerms: ["range-control", "knob", "input-control", "input-stepper"],
    example: "Control de volumen, ajuste de brillo, filtros de rango de precios, o cualquier selección de valor continuo.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/slider.jpg"
  },
  {
    id: "snackbar",
    name: "Snackbar (Toast)",
    category: "Indicators",
    description: "Un *[dialog](#dialog)* no-modal transitorio que usualmente informa al usuario sobre el estado de un proceso y desaparece automáticamente después de un tiempo breve, sin requerir interacción del usuario.",
    relatedTerms: ["dialog", "overlay", "popup"],
    example: "Mensajes de éxito después de guardar datos, notificaciones de error, o confirmaciones de acción de deshacer.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/snackbar.jpg"
  },
  {
    id: "spinner",
    name: "Spinner (Wait Animation, Loading Spinner, Activity Indicator)",
    category: "Indicators",
    description: "Un tipo de *[progress-indicator](#progress-indicator)* usado para indicar que un proceso está en curso, usualmente representado como un círculo rotativo o animación simple. No muestra porcentaje de completación.",
    relatedTerms: ["progress-indicator", "progress-bar"],
    example: "Animaciones de carga mientras se obtienen datos, indicadores de carga de página, o estado de procesamiento.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/spinner.jpg"
  },
  {
    id: "split-button",
    name: "Split Button",
    category: "Controls",
    description: "Un híbrido entre un *[menu](#menu)* y un *[button](#button)*, usualmente representado como un botón con dos componentes: una etiqueta y una flecha. Hacer clic en la etiqueta selecciona una acción predeterminada, hacer clic en la flecha abre acciones adicionales.",
    relatedTerms: ["menu", "button"],
    example: "Botón Guardar con desplegable para opciones 'Guardar Como' o botón Enviar con opciones de entrega.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/split-button.jpg"
  },
  {
    id: "state-switch-control",
    name: "State-Switch Control",
    category: "Controls",
    description: "Un *[control](#control)* diseñado para mover el sistema entre dos estados mutuamente excluyentes (ej. encendido/apagado, silenciado/no silenciado). Los *[toggle](#toggle)* son un tipo de control de cambio de estado.",
    relatedTerms: ["toggle", "checkbox", "button"],
    example: "*[Button](#button)* de silencio, interruptores de encendido, o cualquier control de estado binario en interfaces.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/state-switch-control.jpg"
  },
  {
    id: "submenu",
    name: "Submenu",
    category: "Navigation",
    description: "Un *[menu](#menu)* secundario que aparece como parte de un menú más grande cuando un usuario pasa el cursor o hace clic en un elemento, proporcionando opciones adicionales y organización jerárquica.",
    relatedTerms: ["menu", "dropdown-menu"],
    example: "Elementos de menú anidados en navegación u opciones de menú en cascada en aplicaciones de escritorio.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/submenu.jpg"
  },
  {
    id: "tab-bar",
    name: "Tab Bar (Tabs)",
    category: "Navigation",
    description: "Un elemento de interfaz de usuario que permite a los usuarios ver selectivamente un solo panel de contenido de entre una lista de opciones disponibles. Las pestañas tradicionalmente se muestran horizontalmente.",
    relatedTerms: ["accordion", "anchor-link", "ribbon", "segmented-button"],
    example: "Paneles de configuraciones, secciones de información de productos (Descripción, Reseñas, Especificaciones), o pestañas del navegador.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/tab-bar.jpg"
  },
  {
    id: "textbox",
    name: "Textbox (Text Field, Input Field)",
    category: "Controls",
    description: "Un *[input-control](#input-control)* que permite a los usuarios escribir texto dentro de un área rectangular definida. Bloques de construcción básicos de formularios, pueden aceptar una sola línea o múltiples líneas de texto.",
    relatedTerms: ["input-control"],
    example: "Campos de email en formularios de inicio de sesión, cajas de mensaje en formularios de contacto, o campos de entrada de búsqueda.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/textbox.jpg"
  },
  {
    id: "toggle",
    name: "Toggle (Toggle Switch, Switch)",
    category: "Controls",
    description: "Un *[state-switch-control](#state-switch-control)* usualmente representado como un deslizador entre dos posiciones: encendido y apagado. Equivalente digital de un interruptor de luz físico, debe indicar claramente el estado actual.",
    relatedTerms: ["state-switch-control", "checkbox", "segmented-button"],
    example: "Interruptores de modo oscuro, configuraciones de notificaciones en aplicaciones móviles, o interruptores de habilitar/deshabilitar características.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/toggle.jpg"
  },
  {
    id: "tooltip",
    name: "Tooltip",
    category: "Overlays",
    description: "Un pequeño *[overlay](#overlay)* que muestra mensajes breves e informativos que aparecen cuando un usuario interactúa con un elemento, usualmente iniciado a través de gestos de *[hover](#hover)* del mouse o teclado.",
    relatedTerms: ["overlay", "popup-tip", "popup", "hover"],
    example: "Texto de ayuda que aparece al pasar el cursor sobre *[icon](#icon)*, *[button](#button)* o campos de formulario para contexto adicional.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/tooltip.jpg"
  },
  {
    id: "wheel-picker",
    name: "Wheel Picker",
    category: "Controls",
    description: "Un *[picker](#picker)* específico de iOS que muestra opciones usando una interfaz tipo rueda que los usuarios pueden girar verticalmente para seleccionar valores.",
    relatedTerms: ["wheel-style-date-picker", "picker", "input-control"],
    example: "Ruedas de selección de tiempo en aplicaciones iOS o selectores de opciones con interfaz de rueda giratoria.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/wheel-picker.jpg"
  },
  {
    id: "wheel-style-date-picker",
    name: "Wheel-Style Date Picker",
    category: "Controls",
    description: "Un *[date-picker](#date-picker)* específico de iOS que permite a los usuarios seleccionar valores de fecha y hora usando una interfaz tipo rueda rotatoria, con ruedas separadas para día, mes, año, y a veces componentes de tiempo.",
    relatedTerms: ["calendar-picker", "date-picker", "wheel-picker"],
    example: "Selección de fecha y hora en aplicaciones iOS usando interfaz de rueda giratoria para cada componente.",
    imageUrl: "https://media.nngroup.com/media/editor/2025/02/19/wheel-date-picker.jpg"
  },
  {
    id: "above-the-fold",
    name: "Above the fold",
    category: "Layout",
    description: "Área visible de una página web sin hacer scroll. Suele concentrar el contenido y acciones más importantes.",
    relatedTerms: ["button", "navigation-bar"],
    example: "Colocar el titular, subtítulo y *[button](#button)* CTA principal de una landing inmediatamente \"above the fold\"."
  },
  {
    id: "collapsible",
    name: "Collapsible",
    category: "Layout",
    description: "Sección o componente que puede expandirse/contraerse para mostrar u ocultar contenido.",
    relatedTerms: ["accordion", "expandable-menu", "side-sheet"],
    example: "Un *[accordion](#accordion)* de FAQ donde cada pregunta es \"colapsable\" y al tocarla se despliega la respuesta. O una *[side-sheet](#side-sheet)* que se despliega o se contrae al hacer clic en un *[button](#button)*."
  },
  {
    id: "responsive",
    name: "Responsive",
    category: "Layout",
    description: "Diseño que se adapta fluida y correctamente a diferentes tamaños de pantalla y orientaciones.",
    relatedTerms: ["mobile-app", "desktop-app", "web-app"],
    example: "Un layout que pasa de tres columnas en *[desktop-app](#desktop-app)* a una columna en *[mobile-app](#mobile-app)* manteniendo legibilidad."
  },
  {
    id: "desktop-app",
    name: "Desktop (app)",
    category: "Layout",
    description: "Aplicación diseñada para usarse en equipos de escritorio o laptop, optimizada para mouse/teclado y pantallas grandes.",
    relatedTerms: ["mobile-app", "web-app", "responsive"],
    example: "Microsoft Excel, Chrome son apps originalmente diseñadas para desktop."
  },
  {
    id: "mobile-app",
    name: "Mobile (app)",
    category: "Layout",
    description: "Aplicación diseñada para teléfonos, centrada en gestos táctiles, uso en movimiento y pantallas pequeñas.",
    relatedTerms: ["desktop-app", "web-app", "responsive"],
    example: "WhatsApp, Instagram, Spotify son apps originalmente diseñadas para smartphone."
  },
  {
    id: "web-app",
    name: "Web (app)",
    category: "Layout",
    description: "Aplicación que se ejecuta en el navegador, independiente del sistema operativo, accesible mediante URL.",
    relatedTerms: ["desktop-app", "mobile-app", "responsive"],
    example: "Home-banking, Canva, Gmail son apps originalmente diseñadas para web."
  },
  {
    id: "hover",
    name: "Hover",
    category: "Controls",
    description: "Estado de interacción cuando el puntero se posiciona sobre un elemento (no disponible en pantallas táctiles puras).",
    relatedTerms: ["button", "tooltip", "popup"],
    example: "Un *[button](#button)* que al hacer \"hover\" eleva la sombra y cambia el color del fondo para indicar interactividad."
  },
  {
    id: "hero-section",
    name: "Hero Section",
    category: "Layout",
    description: "La primera sección grande y destacada de una página web, generalmente ubicada en la parte superior (\"*[above-the-fold](#above-the-fold)*\"). Es lo primero que ven los visitantes y suele contener un título principal, un subtítulo descriptivo, una imagen o video de fondo impactante, y un *[button](#button)* de llamada a la acción (CTA). Su objetivo es captar la atención inmediata del visitante y comunicar la propuesta de valor del sitio en pocos segundos.",
    relatedTerms: ["above-the-fold", "button", "landing-page"],
    example: "En la página de inicio de Spotify: un gran banner con el mensaje 'Música para todos', una imagen de fondo atractiva, y un botón 'Obtener Spotify gratis'. En Airbnb: una sección con el texto 'Encuentra espacios únicos' con una barra de búsqueda destacada sobre una foto de una casa increíble."
  },
  {
    id: "landing-page",
    name: "Landing Page (Página de Aterrizaje)",
    category: "Layout",
    description: "Página web diseñada específicamente para recibir visitantes desde una campaña de marketing, anuncio o enlace directo. A diferencia de una página web normal, una *landing page* tiene un único objetivo claro (como conseguir registros, ventas, o descargas) y elimina distracciones innecesarias. Generalmente incluye un *[hero-section](#hero-section)*, beneficios del producto/servicio, testimonios, y un *[button](#button)* de llamada a la acción muy visible.",
    relatedTerms: ["hero-section", "button", "above-the-fold", "card"],
    example: "Una página simple para descargar un ebook gratis a cambio de tu email. Una página de producto con descripción, precios y botón 'Comprar ahora'. Una página de registro para un webinar con fecha, hora y formulario de inscripción. Todas estas páginas tienen un objetivo específico y no tienen menús de navegación complejos que distraigan al visitante."
  }
]

export const categories = [
  "Todos",
  "Controls",
  "Navigation", 
  "Layout",
  "Indicators",
  "Overlays",
  "Visual Elements"
]
