/**
 * Autoevaluaciones por clase: preguntas de opción múltiple (A/B/C), explicación tras confirmar.
 * Clase 1: contenido alineado al material del programa (autotests clase 1).
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
      "Git sirve para trabajar sobre versiones; GitHub sirve para alojar, compartir y colaborar sobre repositorios",
      "Git se usa en proyectos chicos y GitHub en proyectos grandes",
      "Git organiza el código y GitHub reemplaza la base de datos",
    ],
    correctIndex: 0,
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
      "Porque reúne piezas útiles como base de datos, autenticación y backend en una misma solución",
      "Porque reemplaza completamente la necesidad de pensar la lógica del producto",
      "Porque sirve sobre todo para diseñar pantallas y animaciones",
    ],
    correctIndex: 0,
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
      "El desarrollo fue creando capas de abstracción que hicieron más simple interactuar con la tecnología",
      "El no-code apareció para reemplazar por completo a la programación",
      "La tecnología avanzó, pero la barrera de entrada siguió siendo casi la misma",
    ],
    correctIndex: 0,
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
      "Usar IA como apoyo, pero manteniendo criterio, revisión y decisiones conscientes sobre estructura y calidad",
      "Aceptar lo que propone la IA mientras el resultado parezca funcionar",
      "Escribir todo manualmente sin usar herramientas inteligentes",
    ],
    correctIndex: 0,
    explanation: "La IA ayuda mucho, pero el criterio sigue siendo humano.",
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

/** Clase estable por clase para tests y analytics futuros. */
export const SELF_EVALUATION_CLASSES: SelfEvalClass[] = [
  {
    id: "clase-1",
    title: "Clase 1: La revolución de Producto",
    questions: CLASE_1_QUESTIONS,
  },
  {
    id: "clase-2",
    title: "Clase 2: Definamos IA",
    questions: dummyQuestionsFor("Clase 2"),
  },
  {
    id: "clase-3",
    title: "Clase 3: De idea a Producto",
    questions: dummyQuestionsFor("Clase 3"),
  },
  {
    id: "clase-4",
    title: "Clase 4: Haciendo que funcione",
    questions: dummyQuestionsFor("Clase 4"),
  },
  {
    id: "clase-5",
    title: "Clase 5: Lanzamiento y luego qué?",
    questions: dummyQuestionsFor("Clase 5"),
  },
  {
    id: "clase-6",
    title: "Clase 6: Demo y futuro",
    questions: dummyQuestionsFor("Clase 6"),
  },
  {
    id: "clase-7",
    title: "Clase 7: Título pendiente",
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
