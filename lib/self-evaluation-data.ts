/**
 * Autoevaluaciones por clase: preguntas de opción múltiple (A/B/C), explicación tras confirmar.
 * Clase 1: contenido alineado al material del programa (autotests clase 1).
 * Clase 2: proceso de producto, PM, vibecoding, brief/PRD, user flows, 021, v0, APIs.
 */

export type SelfEvalQuestion = {
  id: string
  prompt: string
  /** Tres opciones (A, B, C); la correcta es `options[correctIndex]`. */
  options: [string, string, string]
  correctIndex: 0 | 1 | 2
  explanation: string
}

export type SelfEvalClass = {
  id: string
  title: string
  questions: SelfEvalQuestion[]
}

const CLASE_1_QUESTIONS: SelfEvalQuestion[] = [
  {
    id: "clase-1-q1",
    prompt:
      "¿Qué se entiende mejor por SDLC en un proyecto digital? (SDLC = ciclo de vida del software)",
    options: [
      "Un lenguaje para desarrollar apps más rápido",
      "El recorrido completo de un producto de software, desde la idea hasta su mejora y mantenimiento",
      "Una metodología específica para equipos de programación avanzada",
    ],
    correctIndex: 1,
    explanation:
      "El SDLC es el ciclo de vida del software: pensar, diseñar, construir, probar, lanzar y mejorar.",
  },
  {
    id: "clase-1-q2",
    prompt: "¿Qué barreras ayuda a bajar la IA dentro del SDLC?",
    options: [
      "Principalmente tiempo, costo inicial y barrera de conocimiento técnico para empezar o iterar",
      "Principalmente la necesidad de entender al usuario y definir prioridades de negocio",
      "Principalmente la necesidad de testear, revisar errores y mantener el producto a futuro",
    ],
    correctIndex: 0,
    explanation:
      "La IA acelera tareas y facilita empezar, pero no reemplaza el criterio ni el mantenimiento.",
  },
  {
    id: "clase-1-q3",
    prompt:
      "¿Qué nuevas posibilidades abre la IA en el desarrollo de software para perfiles no técnicos?",
    options: [
      "Elimina barreras y otorga independencia, ampliando sus capacidades",
      "Ya no hace falta entender el problema del usuario y diseñar el producto. La IA lo hace por mí",
      "Reemplaza por completo al equipo técnico en productos digitales",
    ],
    correctIndex: 0,
    explanation:
      "La IA amplía la capacidad de acción de perfiles generalistas y funcionales, de negocio o producto, aunque no reemplaza el pensamiento crítico ni elimina la necesidad de trabajar con otras disciplinas o entender al usuario. La IA empodera a estos perfiles a innovar con menos barreras y más independencia.",
  },
  {
    id: "clase-1-q4",
    prompt: "¿Cuál es la diferencia entre Git y GitHub?",
    options: [
      "Git se usa en proyectos chicos y GitHub en proyectos grandes",
      "Git organiza el código y GitHub reemplaza la base de datos",
      "Git sirve para trabajar sobre versiones; GitHub sirve para alojar, compartir y colaborar sobre repositorios"
    ],
    correctIndex: 2,
    explanation:
      "Git controla cambios. GitHub agrega colaboración, repositorio remoto e historial compartido.",
  },
  {
    id: "clase-1-q5",
    prompt:
      "¿Cuál es la mejor razón para usar GitHub, aunque no sea estrictamente obligatorio?",
    options: [
      "Porque ayuda a conservar control sobre el código, gestionar versiones y colaborar sin depender tanto de una sola plataforma",
      "Porque es la única forma de usar Git correctamente",
      "Porque evita por completo errores y conflictos entre versiones",
    ],
    correctIndex: 0,
    explanation:
      "GitHub no es mágico, pero sí muy útil para mantener orden, control y portabilidad del proyecto.",
  },
  {
    id: "clase-1-q6",
    prompt: "¿Qué es un repositorio?",
    options: [
      "Un espacio donde vive el proyecto junto con sus archivos y su historial de cambios",
      "Una interfaz visual para diseñar aplicaciones sin código",
      "Una carpeta temporal donde la IA guarda prompts anteriores",
    ],
    correctIndex: 0,
    explanation: "El repositorio contiene el proyecto y su evolución.",
  },
  {
    id: "clase-1-q7",
    prompt: "¿Qué función cumple una base de datos en una aplicación?",
    options: [
      "Guardar, organizar y permitir consultar la información del sistema",
      "Diseñar la interfaz que ve el usuario",
      "Convertir texto en prompts para la IA",
    ],
    correctIndex: 0,
    explanation:
      "Usuarios, turnos, productos o mensajes suelen vivir en una base de datos.",
  },
  {
    id: "clase-1-q8",
    prompt:
      "¿Por qué Supabase aparece mucho en proyectos no-code, low-code o AI-assisted?",
    options: [
      "Porque reemplaza completamente la necesidad de pensar la lógica del producto",
      "Porque reúne piezas útiles como base de datos, autenticación y backend en una misma solución",
      "Porque sirve sobre todo para diseñar pantallas y animaciones"
    ],
    correctIndex: 1,
    explanation:
      "Supabase simplifica varias capas técnicas y acelera la construcción de productos. Además es fácilmente integrable dado su enfoque low-code.",
  },
  {
    id: "clase-1-q9",
    prompt: "¿Qué diferencia describe mejor a no-code y low-code?",
    options: [
      "No-code apunta a construir con interfaces visuales; low-code también simplifica, pero admite o requiere algo de código",
      "No-code sirve para productos simples y low-code solo para productos complejos",
      "Low-code y no-code son lo mismo, cambia solo el nombre comercial",
    ],
    correctIndex: 0,
    explanation:
      "Ambos reducen barreras, pero low-code suele dar más flexibilidad técnica. La IA ecualiza esta diferencia dado que ahora podemos generar código funcional sin saber escribirlo.",
  },
  {
    id: "clase-1-q10",
    prompt:
      "Cuando comparamos web-based, desktop y CLI, muchas veces estamos comparando…",
    options: [
      "Distintos niveles de abstracción y distintas formas de interactuar con herramientas de desarrollo",
      "Tres tipos de programación incompatibles entre sí",
      "Tres maneras de guardar una base de datos",
    ],
    correctIndex: 0,
    explanation:
      "Una CLI suele exigir más precisión técnica; una interfaz web suele simplificar más.",
  },
  {
    id: "clase-1-q11",
    prompt:
      "¿Qué idea resume mejor la historia del no-code dentro de la evolución del software?",
    options: [
      "El no-code apareció para reemplazar por completo a la programación",
      "La tecnología avanzó, pero la barrera de entrada siguió siendo casi la misma",
      "El desarrollo fue creando capas de abstracción que hicieron más simple interactuar con la tecnología"
    ],
    correctIndex: 2,
    explanation:
      "La historia del software puede leerse como una sucesión de simplificaciones de interfaz.",
  },
  {
    id: "clase-1-q12",
    prompt:
      "La frase «le digo a la IA lo que quiero, acepto todos los cambios y solo me fijo que funcione» describe mejor…",
    options: [
      "AI-Assisted Engineering, porque igual hay una persona supervisando",
      "Vibe-Coding, porque se prioriza avanzar rápido sin revisar demasiado la estructura",
      "Programación tradicional, porque el foco sigue estando en que funcione",
    ],
    correctIndex: 1,
    explanation:
      "Hablamos de Vibe-Coding cuando importa más el resultado visible que el entendimiento profundo de cómo quedó construido y su estructura final.",
  },
  {
    id: "clase-1-q13",
    prompt: "¿Qué caracteriza mejor al AI-Assisted Engineering?",
    options: [
      "Aceptar lo que propone la IA mientras el resultado parezca funcionar",
      "Escribir todo manualmente sin usar herramientas inteligentes",
      "Usar IA como apoyo, pero manteniendo criterio, revisión y decisiones conscientes sobre estructura y calidad"
    ],
    correctIndex: 2,
    explanation: "La IA ayuda mucho, pero el criterio aún sigue siendo humano. Combinar decisión humana con mano de obra de máquina es la mejor forma de aprovechar al máximo la IA. Es importante entender los principios fundamentales para decidir y delegar a la IA la implementación.",
  },
  {
    id: "clase-1-q14",
    prompt:
      "¿Cuál expresa mejor la diferencia entre Lovable/v0/etc. y Cursor/Claude Code/etc.?",
    options: [
      "Lovable/v0 son más amigables para usar pero más limitadas; Cursor/Claude Code ofrecen una experiencia más profunda y completa",
      "Lovable/v0 son para principiantes y Cursor/Claude Code solo para expertos",
      "Lovable/v0 hacen frontend y Cursor/Claude Code solo backend",
    ],
    correctIndex: 0,
    explanation:
      "Ambos manejan front y backend y pueden hacer productos funcionales. La diferencia más útil para entenderlas es el alcance del producto deseado. Si querés algo rápido y funcional sin mayor esfuerzo o conocimiento, herramientas como Lovable/v0 son ideales. Si querés darle un alcance más serio y completo a tu producto, herramientas como Cursor y Claude Code aportan un rango mucho más amplio de posibilidades, aun para perfiles no técnicos.",
  },
  {
    id: "clase-1-q15",
    prompt: "¿Qué forma de promptear suele ser más conveniente en general?",
    options: [
      "Adaptar el prompt según la herramienta, el nivel de abstracción y el resultado que se busca",
      "Cuanto más largo el prompt siempre es mejor ",
      "Dar la menor cantidad posible de contexto para que la IA complete sola lo que falta",
    ],
    correctIndex: 0,
    explanation:
      "No se promptéa igual si querés un resultado rápido y genérico que si querés un resultado específico y complejo. Hay que entender cómo la IA procesa los pedidos y según la herramienta hasta cuántos caracteres soporta. En las próximas clases veremos esto en detalle.",
  },
  {
    id: "clase-1-q16",
    prompt: "¿Cómo se cobra el uso de las herramientas (v0, Cursor, etc.)?",
    options: [
      "No se cobra, son gratuitas",
      "Se cobra un fijo de consultas por mes",
      "El uso se mide en tokens o créditos que se gastan en cada interacción",
    ],
    correctIndex: 2,
    explanation:
      "El uso se mide en tokens (o en algunos casos «créditos») cuyo consumo varía según la cantidad de texto procesado tanto en el input (prompt + contexto) como en el output (respuesta) como en el proceso interno de la respuesta. La gran mayoría ofrecen una cuota de tokens gratuitos mensual.",
  },
  {
    id: "clase-1-q17",
    prompt:
      "¿Cómo hago para quedarme con la propiedad del software que genero en v0, Lovable, etc.?",
    options: [
      "Tengo que pagar la suscripción a la herramienta para disponer del software creado",
      "No puedo usar libremente el software creado con Lovable y otros",
      "El software es de mi propiedad desde un inicio",
    ],
    correctIndex: 2,
    explanation:
      "El software creado con estas herramientas de generación de código es propiedad tuya desde el inicio. Si querés que exista fuera del ambiente de una herramienta particular podés exportarlo a un gestor de repositorios como GitHub o descargando la carpeta raíz del proyecto en tu PC.",
  },
]

const CLASE_2_QUESTIONS: SelfEvalQuestion[] = [
  {
    id: "clase-2-q1",
    prompt:
      "Al inicio del proceso de producto, ¿qué tipo de herramientas suele usar un PM para entender mejor el problema, el usuario y la propuesta de valor?",
    options: [
      "Herramientas como Value Proposition Canvas, entrevistas, mapas de problema, research y marcos de priorización",
      "Principalmente herramientas de deployment, hosting y DevOps",
      "Solo herramientas de diseño visual, porque al inicio lo importante es la estética",
    ],
    correctIndex: 0,
    explanation:
      "En etapas tempranas, un PM suele apoyarse en herramientas para entender necesidades, pains, gains, propuesta de valor y oportunidades. Todavía no se trata de construir, sino de pensar mejor qué conviene construir.",
  },
  {
    id: "clase-2-q2",
    prompt: "¿Cuál de estas frases resume mejor la relación entre vibecoding y éxito de producto?",
    options: [
      "Si algo fue hecho con vibecoding y funciona, ya puede considerarse un producto exitoso",
      "Vibecoding puede acelerar la construcción, pero no reemplaza validación de mercado, criterio de producto ni ejecución",
      "Vibecoding sirve solo para diseño, no para producto",
    ],
    correctIndex: 1,
    explanation:
      "Que algo «ande» no significa que resuelva un problema real, que alguien lo quiera usar o que tenga buen encaje con el mercado. El build es una parte; el éxito de producto es bastante más que eso.",
  },
  {
    id: "clase-2-q3",
    prompt: "¿Cómo conviene pensar el uso de IA a lo largo del proceso de producto?",
    options: [
      "Como una herramienta que puede ayudar en brainstorming, research, diseño, prototipado y desarrollo, según la etapa",
      "Como una herramienta que solo sirve cuando ya está todo definido",
      "Como un reemplazo completo del trabajo humano en todas las etapas",
    ],
    correctIndex: 0,
    explanation:
      "La IA puede aportar valor en distintas instancias del proceso, pero no reemplaza el criterio humano ni la validación real.",
  },
  {
    id: "clase-2-q4",
    prompt: "¿Qué NO conviene delegarle a la IA, incluso si la usamos mucho en el flujo?",
    options: [
      "Tareas repetitivas o borradores iniciales",
      "La redacción inicial de ideas o requerimientos",
      "El criterio, la decisión final y la responsabilidad de validar si algo tiene sentido",
    ],
    correctIndex: 2,
    explanation:
      "La IA puede asistir mucho, pero la última palabra no conviene delegarla. Siempre hace falta revisar, contrastar y pensar.",
  },
  {
    id: "clase-2-q5",
    prompt: "¿Qué diferencia describe mejor a un Product Brief frente a un PRD?",
    options: [
      "El Product Brief baja la idea a una visión breve y alineadora; el PRD entra más en requisitos, comportamiento y alcance del producto",
      "El Product Brief es técnico y el PRD es solo inspiracional",
      "Son documentos equivalentes con distinto nombre",
    ],
    correctIndex: 0,
    explanation:
      "El brief ayuda a alinear qué se quiere lograr. El PRD traduce eso a una definición más concreta y operativa.",
  },
  {
    id: "clase-2-q6",
    prompt: "¿Qué describe mejor a un PRD?",
    options: [
      "Un documento que define propósito, funciones, comportamiento y requisitos del producto para alinear al equipo",
      "Un pitch comercial para convencer inversores",
      "Un documento visual para mostrar colores y tipografías",
    ],
    correctIndex: 0,
    explanation:
      "El PRD ayuda a ordenar qué se está construyendo, cómo debería funcionar y qué entra o no entra en el alcance.",
  },
  {
    id: "clase-2-q7",
    prompt: "¿Qué es un User Flow?",
    options: [
      "Un mapa visual de los pasos que sigue una persona para completar una tarea dentro del producto",
      "Un listado de tecnologías del backend",
      "Un historial de cambios del repositorio",
    ],
    correctIndex: 0,
    explanation:
      "El user flow permite pensar la experiencia del usuario antes de construir y detectar posibles fricciones.",
  },
  {
    id: "clase-2-q8",
    prompt: "¿Qué es 021 dentro de este flujo?",
    options: [
      "Un sistema de hosting para desplegar aplicaciones",
      "Una herramienta de product management asistida por IA que transforma una idea en specs más estructuradas",
      "Un reemplazo de GitHub para guardar código",
    ],
    correctIndex: 1,
    explanation:
      "021 ayuda a bajar una idea a documentos y especificaciones más profesionales y accionables.",
  },
  {
    id: "clase-2-q9",
    prompt: "¿Cómo conviene usar 021 dentro de un flujo de vibecoding o AI-assisted building?",
    options: [
      "Como una capa previa para convertir una idea difusa en brief, PRD, user flows y specs más concretas antes de pedirle cosas a la IA constructora",
      "Como una herramienta de analytics para medir usuarios activos",
      "Como una base de datos para guardar registros del producto",
    ],
    correctIndex: 0,
    explanation:
      "Un input más estructurado suele producir mejores resultados que una idea vaga cuando luego se trabaja con herramientas de generación o coding asistido.",
  },
  {
    id: "clase-2-q10",
    prompt: "¿021 valida si mi idea tiene mercado?",
    options: [
      "Sí, porque si genera un PRD sólido entonces la idea ya quedó validada",
      "No; estructura la idea, pero la validación real hay que hacerla afuera, con mercado y usuarios",
      "Sí, siempre que luego lo pase a v0 o Lovable",
    ],
    correctIndex: 1,
    explanation:
      "Estructurar una idea no equivale a validarla. La validación ocurre al contrastarla con usuarios reales y mercado.",
  },
  {
    id: "clase-2-q11",
    prompt: "Si quiero validar una idea antes de enamorarme del build, ¿qué tiene más sentido?",
    options: [
      "Hacer entrevistas, encuestas o pruebas con potenciales usuarios, usando IA para preparar preguntas o analizar respuestas",
      "Construir toda la app primero y validar después",
      "Asumir que si la IA pudo construirlo, entonces el mercado existe",
    ],
    correctIndex: 0,
    explanation:
      "La IA puede ayudar a preparar entrevistas o analizar resultados, pero la validación real no ocurre solo dentro de la herramienta.",
  },
  {
    id: "clase-2-q12",
    prompt: "En términos prácticos, ¿qué postura conviene asumir sobre lo que construyo en v0?",
    options: [
      "Que queda encerrado dentro de v0 y no puedo moverlo a ningún otro lado a menos que pague",
      "Que puedo sincronizarlo con GitHub y trabajar el código como propio en el ambiente que elija",
      "Que solo me pertenece si pago un plan Enterprise",
    ],
    correctIndex: 1,
    explanation:
      "El código creado es de tu propiedad y podés trabajar ese código como parte de tu proyecto, manteniendo control y portabilidad. Exportarlo a GitHub facilita esto.",
  },
  {
    id: "clase-2-q13",
    prompt: "¿Es razonable decir que hoy se puede lanzar un producto digital por $0?",
    options: [
      "Sí, puede ser posible si el proyecto entra dentro de los free tiers y límites de herramientas como v0, Supabase y Vercel",
      "Sí, independientemente de la complejidad, features, tamaño o intensidad de uso del producto",
      "No, porque siempre algo hay que pagar",
    ],
    correctIndex: 0,
    explanation:
      "Para MVPs o proyectos chicos puede ser viable lanzar sin costo usando planes gratuitos, aunque eso depende del consumo y del caso.",
  },
  {
    id: "clase-2-q14",
    prompt: "¿Cómo se mide normalmente el consumo en plataformas como v0 y otras herramientas de IA?",
    options: [
      "En créditos o tokens que se van gastando con cada interacción, generación o cambio",
      "Solo por cantidad de usuarios finales de la app",
      "Solo por la cantidad de pantallas diseñadas",
    ],
    correctIndex: 0,
    explanation:
      "Una buena analogía es pensarlo como combustible: cada acción consume parte del saldo disponible.",
  },
  {
    id: "clase-2-q15",
    prompt: "¿Puedo usar un dominio propio en un proyecto hecho con herramientas como v0 o Lovable?",
    options: [
      "Sí; normalmente estas plataformas permiten conectar un dominio propio al proyecto",
      "No; necesariamente queda con subdominio de la plataforma",
      "Solo si exporto todo y rehago el proyecto desde cero",
    ],
    correctIndex: 0,
    explanation:
      "Usar dominio propio suele ser posible y es una práctica común para dar una identidad más profesional al producto.",
  },
  {
    id: "clase-2-q16",
    prompt: "¿Qué describe mejor qué es una API y para qué sirve?",
    options: [
      "Una forma estandarizada de permitir que distintos sistemas se comuniquen e intercambien datos o acciones",
      "Una contraseña especial para entrar a cualquier software",
      "Un tipo de base de datos visual pensada para diseñar apps sin código",
    ],
    correctIndex: 0,
    explanation:
      "Una API permite que un sistema «hable» con otro de forma ordenada. Gracias a una API, una app puede pedir datos, enviar información o usar funcionalidades de otro servicio.",
  },
  {
    id: "clase-2-q17",
    prompt: "¿Cuál de estas opciones describe mejor qué es una API key y qué cuidado principal hay que tener?",
    options: [
      "Es una contraseña pública pensada para que cualquier integrante del equipo la reutilice",
      "Es un identificador visual del proyecto que puede dejarse en el navegador sin problema",
      "Es una clave que identifica y autoriza tu uso de una API; no conviene exponerla en frontend, compartirla ni subirla al repositorio",
    ],
    correctIndex: 2,
    explanation:
      "Una API key sirve para autenticar el uso de una API. Si se filtra, pueden consumir recursos o generar costos a tu nombre.",
  },
]

/**
 * IDs de clases con cuestionario real (no placeholder). Incluir aquí al dar de alta preguntas nuevas
 * y refleja qué se puede elegir en el modal de autoevaluación.
 */
export const SELF_EVAL_CLASS_IDS_LIVE: readonly string[] = ["clase-1", "clase-2"]

/** Clase estable por clase para tests y analytics futuros. */
export const SELF_EVALUATION_CLASSES: SelfEvalClass[] = [
  {
    id: "clase-1",
    title: "Clase 1: La revolución de Producto",
    questions: CLASE_1_QUESTIONS,
  },
  {
    id: "clase-2",
    title: "Clase 2: De Idea a Producto",
    questions: CLASE_2_QUESTIONS,
  },
  {
    id: "clase-3",
    title: "Clase 3: Definamos IA",
    questions: dummyQuestionsFor("Clase 3"),
  },
  {
    id: "clase-4",
    title: "Clase 4: Herramientas Avanzadas",
    questions: dummyQuestionsFor("Clase 4"),
  },
  {
    id: "clase-5",
    title: "Clase 5: Haciendo que funcione",
    questions: dummyQuestionsFor("Clase 5"),
  },
  {
    id: "clase-6",
    title: "Clase 6: Lanzamiento y luego qué?",
    questions: dummyQuestionsFor("Clase 6"),
  },
  {
    id: "clase-7",
    title: "Clase 7: Demo day + Frameworks Emergentes",
    questions: dummyQuestionsFor("Clase 7"),
  },
]

function dummyQuestionsFor(classLabel: string): SelfEvalQuestion[] {
  return [
    {
      id: `${classLabel}-q1`,
      prompt: `[Ejemplo] ¿Qué idea central conviene recordar de ${classLabel}?`,
      options: [
        "La idea principal que el docente enfatizó en la clase",
        "Ignorar el feedback de usuarios",
        "Evitar definir un problema claro",
      ],
      correctIndex: 0,
      explanation:
        "Los ejemplos solo sirven para otras clases hasta que agregues el contenido real.",
    },
    {
      id: `${classLabel}-q2`,
      prompt: `[Ejemplo] Para repasar ${classLabel}, ¿cuál sería un buen siguiente paso práctico?`,
      options: [
        "Anotar 1 aprendizaje y 1 acción concreta para la semana",
        "Dejar el tema sin aplicarlo a tu proyecto",
        "Copiar sin entender el sentido del ejercicio",
      ],
      correctIndex: 0,
      explanation:
        "Los ejemplos solo sirven para otras clases hasta que agregues el contenido real.",
    },
    {
      id: `${classLabel}-q3`,
      prompt: `[Ejemplo] Si tenés dudas sobre lo visto en ${classLabel}, ¿qué enfoque es más útil?`,
      options: [
        "Volver a la grabación o material y anotar dudas puntuales",
        "Asumir que ya está todo entendido sin revisar",
        "Saltar a otro tema sin conectar conceptos",
      ],
      correctIndex: 0,
      explanation:
        "Los ejemplos solo sirven para otras clases hasta que agregues el contenido real.",
    },
  ]
}
