export interface ProductTerm {
  id: string
  name: string
  category: string
  description: string
  relatedTerms?: string[]
  example?: string
  imageUrl?: string
  imageUrls?: string[]
  tags?: string[]
}

export const productTermsData: ProductTerm[] = [
  {
    id: "mvp",
    name: "MVP (Minimum Viable Product)",
    category: "Strategy",
    description: "Versión de un producto con las funcionalidades mínimas necesarias para ser útil y validar suposiciones con usuarios reales. No es un producto 'barato' o 'mal hecho', sino uno estratégicamente simplificado para aprender rápido.",
    relatedTerms: ["feature", "user-story", "product-market-fit", "problem-solution-fit", "alfa", "beta"],
    example: "Instagram empezó como un MVP que solo permitía subir fotos con filtros, sin historias, reels ni mensajes. Twitter comenzó permitiendo solo publicar textos cortos de 140 caracteres. Dropbox hizo un video demo antes de construir el producto completo para validar el interés. El objetivo es lanzar rápido, aprender de usuarios reales, y luego iterar basándote en feedback real en vez de suposiciones.",
    tags: ["basics"]
  },
  {
    id: "prd",
    name: "PRD (Product Requirements Document)",
    category: "Planning",
    description: "Documento que define qué se va a construir y por qué, incluyendo el problema a resolver, objetivos, funcionalidades, casos de uso, y criterios de éxito. Es la 'biblia' del producto que alinea a todo el equipo.",
    relatedTerms: ["user-story", "feature", "roadmap", "product-vision-board"],
    example: "Un PRD para una app de delivery incluiría: Problema ('usuarios quieren comida rápida'), Objetivo ('reducir tiempo de entrega a 30min'), Funcionalidades clave ('buscar restaurantes, ordenar, pagar, trackear pedido'), Casos de uso ('como usuario hambriento, quiero ver restaurantes cercanos'), Métricas de éxito ('80% de pedidos en menos de 30min'). No es código, es la guía estratégica antes de programar.",
    tags: ["basics"]
  },
  {
    id: "feature",
    name: "Feature (Funcionalidad)",
    category: "Development",
    description: "Una capacidad o característica específica del producto que provee valor al usuario. Es lo que tu producto 'puede hacer'.",
    relatedTerms: ["user-story", "epic", "mvp", "roadmap"],
    example: "En Spotify: reproducir música es una feature, crear playlists es otra feature, modo offline es otra. En una app de notas: crear nota, editar nota, compartir nota, son features diferentes. Una feature grande se divide en *[user-story](#user-story)* más pequeñas para desarrollarlas por partes.",
    tags: ["basics"]
  },
  {
    id: "user-story",
    name: "User Story (Historia de Usuario)",
    category: "Planning",
    description: "Descripción de una funcionalidad desde la perspectiva del usuario, siguiendo el formato: 'Como [tipo de usuario], quiero [acción], para [beneficio]'. Ayuda a mantener el foco en el valor para el usuario.",
    relatedTerms: ["feature", "epic", "moscow", "kanban"],
    example: "✅ Bien: 'Como usuario nuevo, quiero registrarme con Google, para ahorrar tiempo y no recordar otra contraseña'. ❌ Mal: 'Implementar OAuth de Google'. La diferencia es que la user story explica el POR QUÉ y PARA QUIÉN, no solo el QUÉ técnico. Varios user stories juntos forman un *[epic](#epic)*.",
    tags: ["basics"]
  },
  {
    id: "epic",
    name: "Epic (Épica)",
    category: "Planning",
    description: "Conjunto grande de *[user-story](#user-story)* relacionadas que juntas forman una *[feature](#feature)* o capacidad completa del producto. Es demasiado grande para completarse en una iteración, por eso se divide en historias más pequeñas.",
    relatedTerms: ["user-story", "feature", "roadmap", "kanban"],
    example: "Epic: 'Sistema de Pagos'. Se divide en user stories como: 'Agregar tarjeta de crédito', 'Procesar pago', 'Ver historial de pagos', 'Recibir recibo por email', 'Cancelar suscripción'. Un epic puede tomar semanas o meses, mientras que una user story debería completarse en días.",
    tags: ["basics"]
  },
  {
    id: "value-proposition-canvas",
    name: "Value Proposition Canvas",
    category: "Strategy",
    description: "Herramienta visual que ayuda a diseñar productos que realmente necesita la gente. Tiene dos lados: el perfil del cliente (sus trabajos, dolores y ganancias) y tu propuesta de valor (qué ofreces, cómo alivias dolores, cómo creas ganancias). El objetivo es encontrar el 'fit' perfecto entre ambos.",
    relatedTerms: ["product-vision-board", "problem-solution-fit", "product-market-fit", "jobs-to-be-done"],
    example: "Para Uber: CLIENTE (Trabajos: llegar del punto A al B, Dolores: taxis caros e impredecibles, esperar mucho, Ganancias deseadas: llegar rápido, saber precio exacto). PROPUESTA DE VALOR (Productos: app de transporte, Alivio de dolores: precio claro antes de subir, ver tiempo de llegada, Creación de ganancias: más barato, más rápido, cashless). Se usa en las primeras etapas para validar si tu idea resuelve un problema real.",
    imageUrl: "/images/vpc.avif"
  },
  {
    id: "product-vision-board",
    name: "Product Vision Board",
    category: "Strategy",
    description: "Tablero de una página que define la visión estratégica del producto: quién es el target, qué necesidades tiene, qué hace tu producto, y qué lo hace único. Es como el 'acta de nacimiento' del producto.",
    relatedTerms: ["value-proposition-canvas", "prd", "roadmap", "mvp"],
    example: "Para Airbnb sería: VISIÓN ('Un mundo donde puedas pertenecer a cualquier lugar'), TARGET (viajeros que buscan experiencias auténticas, anfitriones con espacio extra), NECESIDADES (hospedaje único y asequible / ganar dinero con espacio sin usar), PRODUCTO (plataforma que conecta anfitriones y viajeros), VALOR ÚNICO (estadías únicas en casas reales, no hoteles). Se usa al inicio del proyecto para alinear al equipo.",
    imageUrl: "/images/pvb.jpg"
  },
  {
    id: "moscow",
    name: "MoSCoW",
    category: "Planning",
    description: "Técnica de priorización que clasifica *[features](#feature)* en: Must have (debe tener), Should have (debería tener), Could have (podría tener), Won't have (no tendrá ahora). Ayuda a decidir qué va en el *[MVP](#mvp)* y qué espera.",
    relatedTerms: ["mvp", "feature", "roadmap", "user-story"],
    example: "App de delivery: MUST (buscar restaurantes, ordenar comida, pagar, ver estado del pedido), SHOULD (filtrar por tipo de cocina, calificar restaurante), COULD (chat con repartidor, programa de puntos), WON'T (reservar mesas, recetas de cocina, juegos). Los 'Must' son tu MVP, los demás se agregan después basándote en *[feedback](#feedback)*.",
    imageUrl: "/images/moscow.webp",
    tags: ["basics"]
  },
  {
    id: "kanban",
    name: "Kanban",
    category: "Planning",
    description: "Sistema visual para gestionar trabajo usando columnas que representan estados (típicamente: Por Hacer, En Progreso, Hecho). Cada tarea es una tarjeta que se mueve de izquierda a derecha. Ayuda a ver el progreso del equipo de un vistazo.",
    relatedTerms: ["user-story", "roadmap", "epic", "agile"],
    example: "Tablero típico: TODO (login con Google, diseño de perfil), EN PROGRESO (sistema de pagos), EN REVISIÓN (búsqueda de productos), HECHO (registro de usuario, pantalla de bienvenida). Herramientas populares: Trello, Notion, Jira, GitHub Projects. Regla clave: limitar cuántas tareas pueden estar 'En Progreso' al mismo tiempo para evitar tener todo empezado y nada terminado.",
    tags: ["basics"]
  },
  {
    id: "roadmap",
    name: "Roadmap (Hoja de Ruta)",
    category: "Planning",
    description: "Plan visual que muestra qué *[features](#feature)* se construirán y cuándo, organizado típicamente en trimestres o meses. No es una promesa fija, es una guía flexible que evoluciona basándose en aprendizajes.",
    relatedTerms: ["feature", "epic", "mvp", "kanban", "product-vision-board"],
    example: "Q1 2024: MVP con login, búsqueda básica, pagos. Q2 2024: notificaciones push, perfil de usuario, favoritos. Q3 2024: integración con redes sociales, modo offline. Q4 2024: IA para recomendaciones. Herramientas: ProductBoard, Aha!, Notion, hasta un simple Excel. Lo importante es comunicar la dirección, no fechas exactas grabadas en piedra.",
    tags: ["basics"]
  },
  {
    id: "user-journey-map",
    name: "User Journey Map (Mapa de Viaje del Usuario)",
    category: "Research",
    description: "Diagrama que visualiza la experiencia completa de un usuario con tu producto a lo largo del tiempo, incluyendo puntos de contacto, emociones, dolores y oportunidades en cada etapa.",
    relatedTerms: ["user-flow", "task-flow", "persona", "customer-journey"],
    example: "Viaje de comprar en e-commerce: DESCUBRIMIENTO (ve ad en Instagram, se siente curioso), INVESTIGACIÓN (busca reviews, compara precios, siente duda), COMPRA (agrega al carrito, paga, aliviado), ESPERA (trackea envío, ansioso), RECEPCIÓN (abre paquete, emocionado o decepcionado), POST-COMPRA (usa producto, puede recomendar o devolver). Se mapean las emociones en cada paso para identificar dónde mejorar.",
  },
  {
    id: "user-flow",
    name: "User Flow (Flujo de Usuario)",
    category: "Design",
    description: "Diagrama que muestra los diferentes caminos que un usuario puede tomar para completar una tarea en tu producto, incluyendo decisiones, acciones y pantallas.",
    relatedTerms: ["task-flow", "user-journey-map", "wireframe", "prototype"],
    example: "Flujo de registro: Usuario abre app → Ve pantalla de bienvenida → Click en 'Registrarse' → Elige Google o Email → [Si Google: autoriza cuenta → Listo] [Si Email: ingresa datos → Verifica email → Listo] → Redirige al dashboard. Se dibuja con formas: rectángulos (pantallas), rombos (decisiones), flechas (navegación). Ayuda a identificar pasos innecesarios o confusos antes de diseñar.",
    tags: ["basics"]
  },
  {
    id: "task-flow",
    name: "Task Flow (Flujo de Tarea)",
    category: "Design",
    description: "Similar al *[user-flow](#user-flow)* pero más enfocado: muestra los pasos lineales para completar UNA tarea específica, sin ramificaciones. Es más simple y directo.",
    relatedTerms: ["user-flow", "user-journey-map", "usability"],
    example: "Task flow para 'Resetear contraseña': Pantalla login → Click 'Olvidé contraseña' → Ingresa email → Recibe código → Ingresa código → Crea nueva contraseña → Confirma → Listo. No incluye caminos alternativos ni el contexto emocional, solo los pasos necesarios para esa tarea específica. Útil para optimizar tareas repetitivas.",
  },
  {
    id: "call-to-action",
    name: "Call To Action (CTA)",
    category: "Strategy",
    description: "Un elemento o mensaje diseñado para motivar al usuario a realizar una acción específica y valiosa para el negocio: registrarse, comprar, descargar, suscribirse, o contactar. Los CTAs efectivos son claros, visibles, y crean urgencia o valor percibido.",
    relatedTerms: ["conversion", "landing-page", "user-flow", "ab-test"],
    example: "Ejemplos efectivos: 'Empieza gratis por 30 días' (valor + sin riesgo), 'Únete a 10,000+ usuarios' (prueba social), 'Descarga tu guía ahora' (acción clara). Malos CTAs: 'Enviar' (¿enviar qué?), 'Clic aquí' (no dice beneficio). Los CTAs se optimizan con *[ab-test](#ab-test)* probando texto, color, ubicación, y tamaño. Un buen CTA puede aumentar conversión 20-50%.",
    tags: ["basics"]
  },
  {
    id: "card-sorting",
    name: "Card Sorting",
    category: "Research",
    description: "Técnica de investigación donde pides a usuarios que organicen temas o funcionalidades en categorías que tengan sentido para ellos. Ayuda a diseñar la navegación y arquitectura de información basándote en el modelo mental de los usuarios, no el tuyo.",
    relatedTerms: ["tree-testing", "usability", "user-research", "information-architecture"],
    example: "Tienes 30 tarjetas con funciones de tu app (Perfil, Notificaciones, Configuración, Favoritos, etc.). Pides a 10 usuarios que las agrupen como quieran. Descubres que todos pusieron 'Cambiar foto' en el grupo 'Perfil', pero 'Cambiar contraseña' algunos lo pusieron en 'Perfil' y otros en 'Seguridad'. Esto te dice dónde ubicar cada función en tu menú.",
  },
  {
    id: "tree-testing",
    name: "Tree Testing",
    category: "Research",
    description: "Técnica para evaluar si la estructura de navegación de tu producto tiene sentido. Muestras a usuarios una lista jerárquica de secciones (sin diseño visual) y les pides que encuentren algo específico. Mides si lo encuentran rápido o se pierden.",
    relatedTerms: ["card-sorting", "usability", "user-research", "information-architecture"],
    example: "Tu app tiene: Inicio > Cuenta > Configuración > Privacidad. Pides a usuarios: 'Encuentra dónde cambiar quién puede ver tu perfil'. Si el 80% va directo a Cuenta > Configuración > Privacidad = buena estructura. Si el 80% se pierde o va a lugares incorrectos = necesitas reorganizar. Se hace ANTES de diseñar para validar la arquitectura.",
  },
  {
    id: "product-market-fit",
    name: "Product Market Fit (PMF)",
    category: "Strategy",
    description: "El momento mágico cuando tu producto satisface una necesidad fuerte del mercado. Señal: los usuarios lo recomiendan activamente, vuelven solos, y se quejarían mucho si desapareciera. Es cuando el producto 'jala' usuarios en vez de tener que empujarlos.",
    relatedTerms: ["problem-solution-fit", "mvp", "early-adopters", "retention", "nps"],
    example: "ANTES del PMF: inviertes mucho en marketing pero usuarios no regresan, nadie te recomienda, crecimiento lento. DESPUÉS del PMF: usuarios invitan amigos solos, el 'boca a boca' funciona, crecimiento más orgánico y sostenible. WhatsApp alcanzó PMF cuando la gente decía 'necesito tu WhatsApp' en vez de 'tu número'. No es perfección, es encontrar el mercado correcto para tu solución.",
    tags: ["basics"]
  },
  {
    id: "problem-solution-fit",
    name: "Problem Solution Fit",
    category: "Strategy",
    description: "Validación temprana de que tu solución realmente resuelve el problema que identificaste. Es anterior al *[product-market-fit](#product-market-fit)*: primero validas que entendiste el problema correctamente y tu solución tiene sentido.",
    relatedTerms: ["product-market-fit", "mvp", "value-proposition-canvas", "user-research"],
    example: "PROBLEMA: 'La gente quiere comida rápida pero los delivery tardan mucho'. SOLUCIÓN: 'Una app que garantiza entrega en 30 min o es gratis'. VALIDACIÓN: Haces *[entrevistas](#entrevistas)* y descubres que la gente SÍ quiere rapidez, pero también quiere variedad de restaurantes y precios justos. Ajustas: 'App de delivery rápido con muchos restaurantes'. Es un paso antes de construir el *[MVP](#mvp)*.",
  },
  {
    id: "nps",
    name: "NPS (Net Promoter Score)",
    category: "Metrics",
    description: "Métrica que mide lealtad preguntando: '¿Qué tan probable es que recomiendes este producto del 0 al 10?'. Se calcula: % promotores (9-10) menos % detractores (0-6). Un NPS alto indica *[product-market-fit](#product-market-fit)*.",
    relatedTerms: ["product-market-fit", "feedback", "kpi", "retention", "usability"],
    example: "100 usuarios responden: 60 dan 9-10 (promotores), 20 dan 7-8 (pasivos), 20 dan 0-6 (detractores). NPS = 60% - 20% = 40. Interpretación: >50 excelente, 0-50 bueno, <0 preocupante. La pregunta de seguimiento '¿Por qué?' es oro: descubres qué aman los promotores (para duplicar) y qué odian los detractores (para arreglar urgente).",
    imageUrl: "/images/nps.webp",
    tags: ["basics"]
  },
  {
    id: "matriz-riesgo",
    name: "Matriz de Riesgo",
    category: "Planning",
    description: "Herramienta para identificar y priorizar riesgos del proyecto en dos ejes: probabilidad de que ocurra (alta/baja) e impacto si ocurre (alto/bajo). Ayuda a decidir qué riesgos atacar primero.",
    relatedTerms: ["roadmap", "prd", "testing", "stakeholder"],
    example: "Cuadrantes: ALTA PROBABILIDAD + ALTO IMPACTO (atender YA: 'la API de pagos puede caerse') → ALTA PROB + BAJO IMPACTO (monitorear: 'usuarios pueden no usar una feature secundaria') → BAJA PROB + ALTO IMPACTO (tener plan B: 'proveedor principal quiebra') → BAJA PROB + BAJO IMPACTO (ignorar: 'un usuario reporta bug en un caso ultra raro'). Se revisa cada sprint.",
    imageUrl: "/images/risk-matrix.jpg"
  },
  {
    id: "alfa",
    name: "Alfa (Alpha)",
    category: "Development",
    description: "Versión muy temprana del producto, típicamente inestable y con bugs, usada solo internamente por el equipo para probar funcionalidades básicas. No está lista para usuarios externos.",
    relatedTerms: ["beta", "mvp", "testing", "prototype"],
    example: "En fase alfa, el equipo prueba la app dentro de la empresa. Muchas cosas no funcionan o se rompen. Es normal ver pantallas a medio terminar, botones que no hacen nada, y errores frecuentes. El objetivo es probar que la idea técnica funciona, no que sea bonita o estable. Después de alfa viene *[beta](#beta)*.",
    tags: ["basics"]
  },
  {
    id: "beta",
    name: "Beta",
    category: "Development",
    description: "Versión casi completa del producto que se libera a un grupo limitado de usuarios externos (*[early-adopters](#early-adopters)*) para obtener *[feedback](#feedback)* y encontrar bugs en condiciones reales antes del lanzamiento oficial.",
    relatedTerms: ["alfa", "mvp", "early-adopters", "testing", "feedback"],
    example: "Instagram beta: invitas a 100 usuarios a probar la app antes del lanzamiento público. Ellos encuentran bugs que tu equipo no vio, sugieren mejoras, y validas que funciona con diferentes teléfonos y conexiones. 'Beta cerrada' = invitación solo, 'Beta abierta' = cualquiera puede registrarse. Después de beta exitosa, viene el lanzamiento público.",
    tags: ["basics"]
  },
  {
    id: "testing-users",
    name: "Testing de Usuarios (User Testing)",
    category: "Research",
    description: "Proceso de observar usuarios reales usando tu producto para identificar problemas de *[usabilidad](#usability)*, confusión, o fricción. Es ver cómo usan tu producto 'en vivo', no solo preguntarles su opinión.",
    relatedTerms: ["usability", "user-research", "feedback", "prototype", "wireframe"],
    example: "Le pides a un usuario que compre un producto en tu e-commerce mientras lo observas (presencial o grabación de pantalla). Notas: tarda 3 minutos en encontrar el botón de pago (problema de diseño), intenta hacer click en algo que no es clickeable (problema de affordance), se rinde en el paso 4 del checkout (demasiados pasos). No le digas NADA, solo observa. 5 usuarios encuentran el 80% de problemas de usabilidad.",
    tags: ["basics"]
  },
  {
    id: "ab-test",
    name: "A/B Test (Prueba A/B)",
    category: "Testing",
    description: "Experimento donde muestras dos versiones diferentes (A y B) a grupos de usuarios distintos para ver cuál funciona mejor según una métrica específica. Es la forma científica de tomar decisiones de diseño/producto.",
    relatedTerms: ["testing-users", "kpi", "metrics", "feedback"],
    example: "Versión A: botón 'Comprar' en azul. Versión B: botón 'Comprar' en verde. Muestras A al 50% de usuarios, B al otro 50%. Después de 1000 visitas cada una, ves que B tiene 25% más clicks. Gana B, cambias todo a verde. Otros tests: precio $9.99 vs $10, texto 'Regístrate' vs 'Empieza gratis', video en homepage vs imagen. Siempre testea UNA cosa a la vez.",
    tags: ["basics"]
  },
  {
    id: "encuestas",
    name: "Encuestas (Surveys)",
    category: "Research",
    description: "Cuestionarios con preguntas cerradas (opción múltiple, escalas) o abiertas enviados a muchos usuarios para obtener datos cuantitativos y cualitativos. Útil para validar hipótesis con números.",
    relatedTerms: ["entrevistas", "user-research", "nps", "feedback"],
    example: `Cómo funciona:

Cuestionarios con preguntas cerradas (opción múltiple, escalas) o abiertas enviados a muchos usuarios para validar hipótesis con datos cuantitativos. Útiles para medir patrones y obtener números, pero necesitas complementar con *[entrevistas](#entrevistas)* para entender el "por qué".

Guía rápida:

**PASO 1 - Define tu objetivo (30 seg)**
¿Qué necesitas saber exactamente? Ej: "Por qué usuarios abandonan el carrito en el paso 3" (específico) vs "feedback general" (vago).

**PASO 2 - Estructura (5-10 preguntas MAX)**
• INICIO: 1-2 preguntas fáciles y rápidas (para enganchar)
• MEDIO: Preguntas clave sobre tu objetivo principal
• FINAL: 1 pregunta abierta opcional ("¿Algo más que quieras agregar?")

**PASO 3 - Tipos de preguntas**

Cuantitativas (miden):
• Escala 1-5: "¿Qué tan fácil fue encontrar X?" (1=muy difícil, 5=muy fácil)
• Sí/No: "¿Volverías a comprar?"
• Opción múltiple: "¿Qué feature usas más?" con lista de opciones

Cualitativas (explican):
• Texto libre corto: "¿Qué mejorarías?"
• Siempre pregunta "¿Por qué?" después de respuestas cerradas

**PASO 4 - Cuándo enviarla**
• Post-compra (inmediatamente después)
• Post-onboarding (después de usar 1 semana)
• A usuarios inactivos (para entender por qué dejaron de usar)

**PASO 5 - Aumenta respuestas**
• Título honesto: "2 minutos - ayúdanos a mejorar"
• Incentivo pequeño: "Participá del sorteo de $X"
• Recordatorio después de 3 días

Errores comunes:
❌ Más de 10 preguntas → la gente abandona
❌ Preguntas ambiguas: "¿Te gusta la app?" (¿qué parte específicamente?)
❌ Preguntas sesgadas: "¿Qué tan INCREÍBLE es X?" (induce respuesta positiva)
❌ Solo preguntas abiertas → nadie las completa

Herramientas:
Google Forms (gratis, básico) | Typeform (bonito, interactivo) | SurveyMonkey (robusto, con analytics)`,
    tags: ["basics"]
  },
  {
    id: "entrevistas",
    name: "Entrevistas de Usuario (User Interviews)",
    category: "Research",
    description: "Conversaciones uno-a-uno con usuarios o potenciales usuarios para entender profundamente sus necesidades, problemas, comportamientos y motivaciones. Es investigación cualitativa: buscas entender el 'por qué' detrás del comportamiento.",
    relatedTerms: ["encuestas", "user-research", "persona", "problem-solution-fit"],
    example: `Cómo funciona:

Conversaciones uno-a-uno con usuarios o potenciales usuarios para entender profundamente sus necesidades, problemas y motivaciones. Investigación cualitativa que busca el "por qué" detrás del comportamiento. NO es para vender tu idea, es para descubrir problemas reales.

Guía rápida:

**ANTES - Preparación (15 min)**

Define qué quieres aprender:
❌ Mal: "feedback general sobre mi app"
✅ Bien: "Cómo deciden qué restaurante elegir para delivery"

Recluta 5-10 personas:
• Usuarios actuales o potenciales del perfil que buscas
• Ofrece incentivo: $10 gift card, sorteo, acceso beta gratis

Prepara 8-12 preguntas abiertas:
❌ No preguntes: "¿Te gustaría una feature de X?"
✅ Pregunta: "Cuéntame sobre la última vez que hiciste X"

**DURANTE - La entrevista (30-60 min)**

INICIO (5 min):
"Gracias por tu tiempo. Esto es informal, no hay respuestas correctas. Estoy buscando entender [problema], no vender nada. ¿Puedo grabar para no perder detalles?"

CONTEXTO (10 min):
• "Cuéntame sobre tu [rol/trabajo/situación]"
• "¿Cómo es un día típico?"
• "¿Qué herramientas/apps usas para [tarea]?"

COMPORTAMIENTO (30 min) - La parte más valiosa:
• "Cuéntame sobre la ÚLTIMA VEZ que intentaste hacer [X]"
• "¿Qué fue frustrante?"
• "¿Cómo lo resolviste?"
• "¿Qué alternativas consideraste?"

Preguntas de seguimiento (úsalas SIEMPRE):
"¿Por qué?" | "Contame más" | "¿Qué pasó después?" | "¿Cómo te sentiste?"

CIERRE (5 min):
• "¿Algo que no pregunté y sea importante?"
• "¿Conoces a alguien más con quien pueda hablar?"

**DESPUÉS - Análisis**

Inmediatamente después (30 min):
• Transcribe frases textuales del usuario
• Anota patrones de comportamiento observados
• Lista frustraciones mencionadas
• Documenta soluciones actuales que usan

Después de 5-10 entrevistas:
¿Qué problemas mencionaron 3+ personas? ← Esto es un patrón real
¿Qué soluciones actuales usan todos? ← Tu competencia real
¿Qué palabras/frases se repiten? ← Su lenguaje, no el tuyo

Reglas de oro:

✅ Escucha 80%, habla 20%
✅ Pregunta sobre PASADO (hechos), no FUTURO (opiniones)
✅ NO vendas tu idea ni expliques tu solución
✅ Acepta el silencio (deja que piensen)
✅ Graba (con permiso) para revisar después
✅ Anota frases textuales ("me molesta que..." es oro)

Errores comunes:

❌ "¿Pagarías $X por esto?" → todos mienten sobre dinero
❌ "¿Te gustaría que agregue Y?" → siempre dirán "sí"
❌ "¿Qué features debería agregar?" → no es su trabajo, es el tuyo
❌ Defender tu producto si critican → estás ahí para aprender
❌ Interrumpir mientras hablan → pierde insights valiosos
❌ Lenguaje corporal negativo → sesga sus respuestas

Caso de uso:

Para una app de delivery, en vez de preguntar "¿te gustaría poder filtrar por precio?", preguntas: "Cuéntame sobre la última vez que pediste comida a domicilio. ¿Qué fue lo más frustrante? ¿Cómo decidiste qué restaurante? ¿Cuánto tiempo te tomó? ¿Qué casi te hace abandonar el pedido?"

5-10 entrevistas de 30-60 min encuentran el 80% de problemas. 3+ personas mencionando lo mismo = patrón real que vale la pena resolver.`,
    tags: ["basics"]
  },
  {
    id: "early-adopters",
    name: "Early Adopters",
    category: "Users",
    description: "Los primeros usuarios entusiastas que adoptan tu producto cuando todavía es imperfecto. Son tolerantes con bugs, dan *[feedback](#feedback)* valioso, y si les gusta, lo recomiendan activamente. Son críticos para encontrar *[product-market-fit](#product-market-fit)*.",
    relatedTerms: ["beta", "mvp", "product-market-fit", "feedback"],
    example: "Los primeros 100 usuarios de Twitter, los beta testers de Spotify, la gente que compró el primer iPhone aunque le faltaban features. Son tus 'fans' iniciales. Los identificas porque: buscan activamente soluciones nuevas, toleran imperfección a cambio de innovación, dan feedback sin que se lo pidas. No los confundas con el 'mercado mainstream': lo que funciona con early adopters puede necesitar cambios para la mayoría.",
    imageUrl: "/images/tech-adop.webp",
    tags: ["basics"]
  },
  {
    id: "persona",
    name: "Persona",
    category: "Users",
    description: "Representación semi-ficticia de tu usuario ideal basada en investigación real (*[entrevistas](#entrevistas)*, datos). Incluye: demografía, objetivos, frustraciones, comportamientos, motivaciones. Ayuda al equipo a empatizar y diseñar para alguien concreto, no 'todos'.",
    relatedTerms: ["protopersona", "arquetipo", "user-research", "user-journey-map"],
    example: "Ejemplo: 'Ana, 28, diseñadora freelance. Vive en Buenos Aires, trabaja desde casa. OBJETIVOS: organizar proyectos, cumplir deadlines. FRUSTRACIONES: apps muy complejas, perder tiempo en tareas administrativas. MOTIVACIONES: autonomía, creatividad, balance vida-trabajo. USA: Notion, Figma, Slack'. Con esta persona en mente, diseñas features que Ana valoraría. Crea 2-3 personas máximo, más de 5 es contraproducente.",
    tags: ["basics"]
  },
  {
    id: "protopersona",
    name: "Proto-Persona",
    category: "Users",
    description: "Versión rápida y preliminar de una *[persona](#persona)* basada en suposiciones del equipo en vez de investigación profunda. Es un punto de partida cuando no tienes tiempo/presupuesto para investigación completa, pero debe validarse después.",
    relatedTerms: ["persona", "arquetipo", "user-research"],
    example: "En una sesión de 1 hora, el equipo define: 'Creemos que nuestro usuario típico es: 25-35 años, usa smartphone todo el día, frustrado con apps lentas, valora diseño simple'. Es una hipótesis que DEBE validarse con *[entrevistas](#entrevistas)* reales después. Útil para empezar rápido, peligroso si se toma como verdad absoluta sin validar.",
  },
  {
    id: "arquetipo",
    name: "Arquetipo de Usuario",
    category: "Users",
    description: "Patrón de comportamiento o rol que agrupa usuarios con necesidades similares, pero más abstracto que una *[persona](#persona)*. Mientras una persona es 'Ana, 28, diseñadora', un arquetipo es 'El Explorador' o 'El Organizador'.",
    relatedTerms: ["persona", "protopersona", "user-research"],
    example: "En una app de productividad: ARQUETIPO 1 'El Planificador' (quiere control total, listas detalladas), ARQUETIPO 2 'El Flexible' (quiere simplicidad, pocas opciones), ARQUETIPO 3 'El Colaborador' (prioriza trabajo en equipo). Cada arquetipo puede incluir múltiples personas concretas. Los arquetipos ayudan a diseñar modos o vistas diferentes para diferentes estilos de uso.",
  },
  {
    id: "usability",
    name: "Usabilidad",
    category: "Design",
    description: "Qué tan fácil, intuitivo y eficiente es para usuarios completar tareas en tu producto. Un producto usable: se entiende rápido, tiene pocos errores, y usuarios logran sus objetivos sin frustrarse.",
    relatedTerms: ["testing-users", "user-flow", "task-flow", "ux"],
    example: "BUENA USABILIDAD: botón de 'Eliminar' con confirmación ('¿Estás seguro?'), mensajes de error claros ('Email inválido: falta @'), formulario que recuerda lo que escribiste si te equivocas. MALA USABILIDAD: botón crítico escondido, formulario que se borra si hay un error, textos técnicos ('Error 500' sin explicación). Se mide con *[testing-users](#testing-users)*: ¿cuánto tardan? ¿cuántos errores cometen? ¿logran completar la tarea?",
    tags: ["basics"]
  },
  {
    id: "wireframe",
    name: "Wireframe",
    category: "Design",
    description: "Boceto básico de baja fidelidad que muestra la estructura y layout de una pantalla sin diseño visual (sin colores, tipografías, o imágenes reales). Es como el plano de una casa antes de decorarla.",
    relatedTerms: ["mockup", "prototype", "user-flow", "testing-users"],
    example: "Un wireframe de login muestra: rectángulo (logo), dos cajas (email y password), botón (entrar), texto (¿olvidaste contraseña?). Todo en gris y blanco, con cajas y líneas. NO muestra colores bonitos, fotos reales, o detalles visuales. Se hace rápido (papel, Figma, Balsamiq) para validar la estructura antes de invertir tiempo en diseño detallado. Se testea con usuarios para ver si entienden la interfaz.",
    tags: ["basics"]
  },
  {
    id: "mockup",
    name: "Mockup",
    category: "Design",
    description: "Diseño visual estático de alta fidelidad que muestra cómo se verá el producto final: colores, tipografías, imágenes, íconos. Es más detallado que un *[wireframe](#wireframe)* pero no es interactivo como un *[prototype](#prototype)*.",
    relatedTerms: ["wireframe", "prototype", "design-system"],
    example: "Un mockup de Instagram muestra: la pantalla exacta con colores reales (fondo blanco, corazón rojo), fotos de ejemplo, texto con la tipografía final, íconos en su estilo. Es una imagen estática que parece la app real. Se usa para: presentar a stakeholders, validar diseño visual, guiar a desarrolladores. Herramientas: Figma, Sketch, Adobe XD.",
    tags: ["basics"]
  },
  {
    id: "mobile-first",
    name: "Mobile First",
    category: "Design",
    description: "Filosofía de diseño y desarrollo que consiste en crear primero la experiencia para dispositivos móviles y luego expandir hacia pantallas más grandes. En lugar de 'adaptar' un diseño de escritorio quitando cosas, empiezas con lo esencial en móvil y agregas elementos en pantallas más grandes.",
    relatedTerms: ["responsive", "mvp", "user-experience", "wireframe"],
    example: "Proceso Mobile First: 1) Diseñas para móvil priorizando contenido crítico, navegación simple, botones grandes para tocar. 2) Expandes a tablet agregando más espacios, secundarias opciones. 3) Expandes a desktop agregando columnas, barras laterales, contenido extra. Beneficios: aseguras que la experiencia móvil sea excelente (no limitada), reduces tiempo de carga en móvil, obligas a priorizar lo importante. La mayoría del tráfico web hoy es móvil, por eso este enfoque es estándar.",
    tags: ["basics"]
  },
  {
    id: "prototype",
    name: "Prototipo (Prototype)",
    category: "Design",
    description: "Versión interactiva y simulada del producto que permite hacer click y navegar entre pantallas, pero no tiene código real detrás. Es como una 'demo' clickeable para testear flujos antes de programar.",
    relatedTerms: ["wireframe", "mockup", "testing-users", "mvp"],
    example: "En Figma: creas 5 pantallas (login, home, perfil, búsqueda, resultados) y las conectas con links clickeables. Usuarios pueden 'usar' la app (click en botones, navegar entre pantallas) aunque no sea real. Sirve para *[testing-users](#testing-users)* temprano, presentar la idea a inversores, o validar flujos antes de gastar semanas programando. Un prototipo bueno se siente real aunque no lo sea.",
    tags: ["basics"]
  },
  {
    id: "feedback",
    name: "Feedback (Retroalimentación)",
    category: "Research",
    description: "Información que recibes de usuarios sobre su experiencia con el producto: qué les gusta, qué les frustra, qué necesitan, qué mejorarían. Es el combustible para *[iteración](#iteracion)* y mejora continua.",
    relatedTerms: ["user-research", "entrevistas", "encuestas", "nps", "testing-users"],
    example: "CANALES: comentarios en app store, mensajes de soporte, *[encuestas](#encuestas)*, *[testing-users](#testing-users)*, analytics (qué hacen vs qué dicen). FEEDBACK ÚTIL: 'El botón de pagar se esconde en móvil' (accionable). FEEDBACK DIFUSO: 'No me gusta' (¿qué específicamente?). Tip: agrupa feedback por temas, prioriza lo que más se repite, siempre pregunta '¿por qué?' para entender la raíz.",
    tags: ["basics"]
  },
  {
    id: "iteracion",
    name: "Iteración",
    category: "Development",
    description: "Ciclo de mejora continua: construyes algo → obtienes *[feedback](#feedback)* → aprendes → mejoras → repites. Filosofía de desarrollo ágil donde prefieres muchos ciclos pequeños de mejora en vez de un lanzamiento 'perfecto' que toma años.",
    relatedTerms: ["mvp", "agile", "feedback", "pivot"],
    example: "Instagram: Iteración 1 (solo fotos + filtros) → Feedback ('quiero compartir videos cortos') → Iteración 2 (agrega videos 15seg) → Feedback ('quiero contenido que desaparezca') → Iteración 3 (agrega Stories). Nunca esperaron a tener 'todo' perfecto. Lanzan, aprenden, mejoran. Cada 2 semanas es una iteración.",
    tags: ["basics"]
  },
  {
    id: "pivot",
    name: "Pivot",
    category: "Strategy",
    description: "Cambio estratégico significativo en el producto o modelo de negocio basado en aprendizajes. No es un pequeño ajuste, es cambiar de dirección porque descubriste que el camino original no funciona.",
    relatedTerms: ["iteracion", "product-market-fit", "mvp", "problem-solution-fit"],
    example: "PIVOTS FAMOSOS: Instagram empezó como 'Burbn' (app de check-in tipo Foursquare), pivotaron a solo la feature de fotos con filtros. Twitter empezó como plataforma de podcasting, pivotaron a microblogging. YouTube empezó como sitio de citas con video, pivotaron a plataforma general de videos. Señal de pivot necesario: bajo uso, feedback negativo persistente, mercado muy pequeño, o descubres un uso no previsto que funciona mejor.",
  },
  {
    id: "kpi",
    name: "KPI (Key Performance Indicator)",
    category: "Metrics",
    description: "Métrica clave que mide el éxito del producto. Son los números más importantes que debes monitorear para saber si vas por buen camino.",
    relatedTerms: ["okr", "nps", "metrics", "product-market-fit"],
    example: "E-commerce: KPI = tasa de conversión (% visitantes que compran), ticket promedio, tasa de abandono de carrito. Red social: KPI = usuarios activos diarios (DAU), tiempo en app, % que publican contenido. SaaS: KPI = MRR (ingresos mensuales recurrentes), churn rate (% que cancelan), LTV (valor de vida del cliente). Elige 3-5 KPIs críticos, no 50. Si todo es importante, nada es importante.",
    tags: ["basics"]
  },
  {
    id: "okr",
    name: "OKR (Objectives & Key Results)",
    category: "Planning",
    description: "Metodología de establecer metas: un Objetivo (aspiracional y cualitativo) y 2-5 Key Results (cuantitativos y medibles) que indican si lograste el objetivo.",
    relatedTerms: ["kpi", "roadmap", "metrics"],
    example: "OBJETIVO: 'Mejorar la retención de usuarios'. KEY RESULTS: 1) Aumentar DAU de 10k a 15k, 2) Reducir churn del 5% al 3%, 3) Aumentar sesiones por usuario de 3 a 5 por semana. Se revisan cada trimestre. Los OKRs deben ser ambiciosos: lograr 70% ya es excelente. Google, Intel y muchas startups los usan. Diferencia con *[KPI](#kpi)*: OKRs son temporales y aspiracionales, KPIs son continuos y operacionales.",
  },
  {
    id: "jobs-to-be-done",
    name: "Jobs to be Done (JTBD)",
    category: "Strategy",
    description: "Framework que enfoca en el 'trabajo' que el usuario quiere completar, no en el producto en sí. La idea: la gente no compra productos, 'contrata' productos para hacer un trabajo.",
    relatedTerms: ["value-proposition-canvas", "problem-solution-fit", "user-research"],
    example: "La gente no compra un taladro porque quiere un taladro, lo compra porque quiere un agujero en la pared (el 'job'). No quieren leche, quieren desayuno rápido. Spotify no compite solo contra Apple Music, compite contra el silencio, la radio, o cualquier cosa que la gente 'contrate' para entretenerse. Preguntas JTBD: '¿Cuándo fue la última vez que hiciste X? ¿Qué intentabas lograr? ¿Qué alternativas consideraste?'",
  },
  {
    id: "customer-journey",
    name: "Customer Journey",
    category: "Research",
    description: "El recorrido completo del cliente desde que descubre que tiene un problema hasta que se convierte en cliente leal (o no). Incluye momentos pre-producto, durante uso, y post-compra.",
    relatedTerms: ["user-journey-map", "user-flow", "touchpoint"],
    example: "AWARENESS (ve un ad, busca en Google) → CONSIDERACIÓN (lee reviews, compara opciones) → DECISIÓN (se registra, prueba gratis) → USO (onboarding, primeras features) → RETENCIÓN (sigue usando, paga) → ADVOCACY (recomienda a amigos). En cada etapa hay 'touchpoints' (puntos de contacto): email, app, soporte, etc. Mapear esto ayuda a optimizar cada punto y no perder clientes en el camino.",
  },
  {
    id: "stakeholder",
    name: "Stakeholder",
    category: "Planning",
    description: "Cualquier persona o grupo con interés en el producto: CEO, inversores, equipo de desarrollo, marketing, ventas, soporte, y usuarios. Cada uno tiene necesidades y expectativas diferentes que debes balancear.",
    relatedTerms: ["roadmap", "prd", "feedback"],
    example: "CEO quiere crecimiento rápido, CTO quiere código limpio, Marketing quiere features llamativas, Ventas quiere integraciones enterprise, Usuarios quieren simplicidad, Inversores quieren retorno. Como Product Manager, debes: comunicar decisiones, manejar expectativas, priorizar entre demandas conflictivas. Un roadmap no puede satisfacer a todos al mismo tiempo, pero todos deben entender el 'por qué' de las decisiones.",
  },
  {
    id: "go-to-market",
    name: "Go-to-Market Strategy (GTM)",
    category: "Strategy",
    description: "Plan de cómo vas a lanzar y vender tu producto: quién es tu cliente ideal, cómo lo alcanzarás, cuál es tu mensaje, qué canales usarás, y cómo ganarás tracción inicial.",
    relatedTerms: ["mvp", "product-market-fit", "early-adopters", "roadmap"],
    example: "Para Dropbox: TARGET (early adopters tech-savvy), MENSAJE ('tus archivos, en todas partes'), CANALES (video viral en Hacker News, programa de referidos), TRACCIÓN (free tier con límite de GB, invita amigos = más espacio). Para Slack: vendían directo a equipos de ingeniería (bottom-up), no a CEOs. Un buen GTM responde: ¿Quién compra primero? ¿Cómo se enteran? ¿Por qué comprarían? ¿Cuánto costará adquirirlos?",
  },
  {
    id: "churn",
    name: "Churn Rate (Tasa de Cancelación)",
    category: "Metrics",
    description: "Porcentaje de usuarios que dejan de usar tu producto en un período de tiempo. Es lo opuesto a *[retention](#retention)*. Churn alto = problema grave de producto o *[product-market-fit](#product-market-fit)*.",
    relatedTerms: ["retention", "product-market-fit", "kpi", "nps"],
    example: "Cálculo: Si empiezas el mes con 1000 usuarios y pierdes 50, tu churn mensual es 5%. CHURN BUENO: <2% mensual para SaaS B2B, <5% para consumo. CHURN MALO: >10% (problema crítico). Razones comunes: producto no resuelve el problema, mala experiencia de usuario, competidor mejor, o precio muy alto. Tip: entrevista usuarios que se van para entender el 'por qué' real.",
    tags: ["basics"]
  },
  {
    id: "retention",
    name: "Retention (Retención)",
    category: "Metrics",
    description: "Porcentaje de usuarios que vuelven a usar tu producto después de cierto tiempo. Es lo opuesto a *[churn](#churn)*. Retención alta indica *[product-market-fit](#product-market-fit)* y valor real para usuarios.",
    relatedTerms: ["churn", "product-market-fit", "kpi", "engagement"],
    example: "DAY 1 RETENTION: 100 usuarios se registran hoy, 40 vuelven mañana = 40%. DAY 7: de esos 100, 25 vuelven en 7 días = 25%. DAY 30: 15 siguen activos = 15%. Retención típica buena: Día 1 (40-50%), Día 7 (20-30%), Día 30 (10-20%). Si tu retención día 30 es <5%, no importa cuánto gastes en marketing: estás llenando un balde con agujeros. Arregla el producto primero.",
    tags: ["basics"]
  },
  {
    id: "engagement",
    name: "Engagement (Compromiso)",
    category: "Metrics",
    description: "Qué tan activamente los usuarios interactúan con tu producto: frecuencia de uso, tiempo en la app, acciones tomadas. Un usuario 'engaged' usa el producto frecuentemente y aprovecha sus features.",
    relatedTerms: ["retention", "kpi", "dau-mau", "product-market-fit"],
    example: "BAJO ENGAGEMENT: usuario abre la app 1 vez al mes, sale en 30 segundos. ALTO ENGAGEMENT: abre 5 veces al día, pasa 20 minutos, crea contenido, interactúa. Métricas de engagement: sesiones por usuario, tiempo en app, % usuarios que hacen acción clave (postear, comprar, compartir). Facebook mide engagement con likes, comments, shares. YouTube con watch time. El engagement predice *[retention](#retention)*.",
    tags: ["basics"]
  },
  {
    id: "dau-mau",
    name: "DAU/MAU",
    category: "Metrics",
    description: "Ratio de Usuarios Activos Diarios sobre Usuarios Activos Mensuales. Indica qué tan 'sticky' (adictivo) es tu producto. Ratio alto = producto de uso frecuente.",
    relatedTerms: ["engagement", "retention", "kpi"],
    example: "1000 usuarios únicos usaron tu app este mes (MAU = 1000). En un día típico, 400 la usan (DAU = 400). DAU/MAU = 400/1000 = 40% = muy bueno. INTERPRETACIÓN: <10% problema (la mayoría no vuelve), 10-20% OK para productos ocasionales, 20-50% bueno, >50% excelente (apps diarias como WhatsApp, Instagram). Si DAU/MAU es bajo, la app no está logrando 'hábito' en usuarios.",
  },
  {
    id: "user-research",
    name: "User Research (Investigación de Usuarios)",
    category: "Research",
    description: "Proceso sistemático de entender a tus usuarios: quiénes son, qué necesitan, cómo se comportan, qué problemas tienen. Incluye *[entrevistas](#entrevistas)*, *[encuestas](#encuestas)*, *[testing-users](#testing-users)*, observación, y análisis de datos.",
    relatedTerms: ["entrevistas", "encuestas", "testing-users", "persona", "feedback"],
    example: "Métodos CUALITATIVOS (entender el por qué): *[entrevistas](#entrevistas)* 1-1, *[testing-users](#testing-users)*, observación contextual. Métodos CUANTITATIVOS (medir qué tanto): *[encuestas](#encuestas)*, analytics, A/B tests. Un buen producto balancea ambos: números te dicen QUÉ pasa, conversaciones te dicen POR QUÉ. Regla de oro: habla con usuarios cada semana, no solo cuando lanzas.",
    tags: ["basics"]
  },
  {
    id: "ux",
    name: "UX (User Experience)",
    category: "Design",
    description: "La experiencia completa que tiene un usuario al interactuar con tu producto: desde el primer contacto hasta después de usarlo. Incluye *[usabilidad](#usability)*, accesibilidad, emociones, y percepción de valor.",
    relatedTerms: ["usability", "ui", "user-journey-map", "design"],
    example: "UX NO ES SOLO DISEÑO BONITO. Es: ¿Qué tan fácil es registrarse? ¿Entiendo qué hace la app? ¿Me frustro o me siento empoderado? ¿Logro mi objetivo rápido? ¿Volvería a usar esto? BUENA UX: Uber te muestra exactamente dónde está tu chofer y cuándo llega. MALA UX: formulario de 50 campos obligatorios. La UX se nota cuando es mala, desaparece cuando es buena.",
    tags: ["basics"]
  },
  {
    id: "ui",
    name: "UI (User Interface)",
    category: "Design",
    description: "Los elementos visuales e interactivos con los que el usuario interactúa: botones, menús, colores, tipografías, íconos, layouts. Es lo que ves y tocas en la pantalla. UI es parte de *[UX](#ux)*, pero UX es más amplio.",
    relatedTerms: ["ux", "design-system", "mockup", "wireframe"],
    example: "UI: el botón es rojo, esquinas redondeadas, fuente Helvetica 16px, ícono de corazón. UX: qué pasa cuando hago click, dónde está ubicado, si tiene sentido en este contexto. BUENA UI: Netflix con su diseño limpio y thumbnails grandes. MALA UI: controles confusos, colores que no se leen, botones demasiado chicos. Puedes tener UI bonita con UX horrible (bella pero inútil) o UI fea con UX buena (fea pero efectiva).",
    tags: ["basics"]
  },
  {
    id: "design-system",
    name: "Design System (Sistema de Diseño)",
    category: "Design",
    description: "Colección de componentes reutilizables, estilos, patrones y reglas que aseguran consistencia visual en todo el producto. Es como un LEGO kit para diseño: piezas predefinidas que se combinan.",
    relatedTerms: ["ui", "mockup", "component-library"],
    example: "Define: COLORES (primario, secundario, errores), TIPOGRAFÍA (títulos, body, tamaños), COMPONENTES (botones, cards, inputs con sus variaciones), ESPACIADO (8px, 16px, 24px), ÍCONOS. Ejemplos famosos: Material Design (Google), Human Interface Guidelines (Apple), Polaris (Shopify). Beneficio: diseñadores y developers usan las mismas piezas = producto más consistente y desarrollo más rápido.",
  },
  {
    id: "component-library",
    name: "Component Library (Biblioteca de Componentes)",
    category: "Development",
    description: "Colección de componentes de código reutilizables (botones, formularios, cards) que implementan el *[design-system](#design-system)*. Es la versión técnica del design system.",
    relatedTerms: ["design-system", "ui", "development"],
    example: "En React: creas `<Button variant='primary'>Click</Button>`, `<Card>contenido</Card>`. No programas cada botón desde cero, usas el componente de la librería. Ejemplos: Ant Design, Material-UI, Chakra UI, o tu propia librería interna. Beneficio: consistencia, velocidad de desarrollo, menos bugs (componentes testeados), fácil actualizar diseño en toda la app.",
  },
  {
    id: "information-architecture",
    name: "Information Architecture (IA)",
    category: "Design",
    description: "La estructura y organización de la información en tu producto: cómo se agrupan las secciones, cómo se navega entre ellas, cómo se categoriza el contenido. Es el 'esqueleto' invisible que hace que encontrar cosas sea fácil o imposible.",
    relatedTerms: ["card-sorting", "tree-testing", "user-flow", "navigation"],
    example: "E-commerce: IA define si organizas productos por categoría (Electrónica > Celulares > Samsung) o por necesidad (Regalos > Para papá > Tech). App bancaria: ¿'Transferir dinero' va en Inicio, en Pagos, o en ambos? BUENA IA: encuentras lo que buscas en 3 clicks. MALA IA: te pierdes, no sabes dónde buscar. Se valida con *[card-sorting](#card-sorting)* y *[tree-testing](#tree-testing)*.",
  },
  {
    id: "onboarding",
    name: "Onboarding",
    category: "Design",
    description: "Experiencia que guía a usuarios nuevos en sus primeros pasos con el producto. El objetivo: llevarlos del registro a su primer momento 'Aha!' (valor percibido) lo más rápido posible.",
    relatedTerms: ["ux", "user-flow", "activation", "retention"],
    example: "MALO: tutorial forzado de 10 pantallas antes de usar la app. BUENO: tooltips contextuales que aparecen cuando necesitas ayuda. Duolingo: te hace tomar una micro-lección antes de explicar features. Slack: te hace enviar tu primer mensaje al equipo inmediatamente. El onboarding debe mostrar valor rápido: usuarios que completan onboarding tienen 5-10x más *[retention](#retention)* que los que lo abandonan.",
  },
  {
    id: "activation",
    name: "Activation (Activación)",
    category: "Metrics",
    description: "El momento cuando un usuario nuevo experimenta el valor core del producto por primera vez. Es el 'momento Aha!'. Un usuario 'activado' tiene mucha mayor probabilidad de quedarse.",
    relatedTerms: ["onboarding", "retention", "kpi", "engagement"],
    example: "Facebook: agregar 7 amigos en 10 días (descubrieron que usuarios que hacían esto se quedaban). Twitter: seguir 30 cuentas. Dropbox: subir un archivo a la carpeta. Uber: completar tu primer viaje. Airbnb: reservar tu primera estancia. Define TU 'activation event' analizando qué hacen usuarios que se quedan vs los que se van. Luego optimiza el onboarding para llevar a más usuarios a ese momento.",
    imageUrl: "/images/aarrr.webp"
  },
  {
    id: "metrics",
    name: "Métricas",
    category: "Metrics",
    description: "Números que miden el desempeño del producto. Te dicen objetivamente si vas en la dirección correcta. Sin métricas, tomas decisiones basadas en intuición o opiniones, no datos.",
    relatedTerms: ["kpi", "analytics", "ab-test", "data-driven"],
    example: "Categorías: CRECIMIENTO (nuevos usuarios, tráfico), ENGAGEMENT (DAU, tiempo en app), RETENCIÓN (churn, retention rate), MONETIZACIÓN (ingresos, conversión), SATISFACCIÓN (NPS, rating). Trampa común: medir todo pero no actuar en nada. Mejor: elige 5-7 métricas clave para tu etapa actual, revísalas semanalmente, actúa cuando algo se desvía.",
    tags: ["basics"]
  },
  {
    id: "analytics",
    name: "Analytics (Analíticas)",
    category: "Metrics",
    description: "Herramientas y proceso de recolectar, medir y analizar datos sobre cómo usuarios interactúan con tu producto. Te dice QUÉ hacen los usuarios (las *[entrevistas](#entrevistas)* te dicen POR QUÉ).",
    relatedTerms: ["metrics", "kpi", "ab-test", "data-driven"],
    example: "Herramientas: Google Analytics, Mixpanel, Amplitude, Segment. Mides: páginas visitadas, clicks en botones, tiempo en pantalla, flujos de conversión, embudos de abandono. Ejemplo: ves que 60% abandonan en el paso 3 del checkout → investigas por qué → descubres que pedir teléfono ahí causa fricción → lo mueves al final → conversión sube 15%.",
    tags: ["basics"]
  },
  {
    id: "data-driven",
    name: "Data-Driven (Guiado por Datos)",
    category: "Strategy",
    description: "Filosofía de tomar decisiones de producto basándote en datos y evidencia en vez de opiniones o intuición. No significa ignorar la intuición, significa validarla con datos.",
    relatedTerms: ["analytics", "metrics", "ab-test", "user-research"],
    example: "NO DATA-DRIVEN: 'Creo que el botón debería ser azul porque me gusta'. DATA-DRIVEN: 'Hicimos un A/B test con 1000 usuarios, azul convirtió 12% más que verde, lo cambiamos'. Combina: datos cuantitativos (qué tanto) + cualitativos (por qué) + intuición de producto. Los mejores PMs no son 100% datos ni 100% intuición, balancean ambos.",
  },
  {
    id: "north-star-metric",
    name: "North Star Metric",
    category: "Metrics",
    description: "La métrica única más importante que mejor representa el valor que entregas a usuarios. Es tu estrella guía: si esta sube, tu producto está yendo en la dirección correcta.",
    relatedTerms: ["kpi", "okr", "product-market-fit", "metrics"],
    example: "Airbnb: 'noches reservadas' (no usuarios registrados). Facebook: 'usuarios activos diarios'. Uber: 'viajes completados'. WhatsApp: 'mensajes enviados'. Características: 1) Refleja valor entregado, 2) Mide progreso, 3) Es accionable (el equipo puede influir en ella), 4) Es comprensible para todos. Evita 'vanity metrics' como descargas o registros que no correlacionan con éxito real.",
  }
]

export const productCategories = [
  "Todos",
  "Strategy",
  "Planning",
  "Development",
  "Design",
  "Research",
  "Testing",
  "Metrics",
  "Users"
]

