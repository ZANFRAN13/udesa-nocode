/**
 * Autoevaluaciones por clase: preguntas de opción múltiple (A/B/C), explicación tras confirmar.
 * Clase 1: contenido alineado al material del programa (autotests clase 1).
 * Clase 2: proceso de producto, PM, vibecoding, brief/PRD, user flows, 021, v0, APIs.
 * Clase 3: IA, ML, Deep Learning, redes neuronales, LLMs, tokens, ventana de contexto, entrenamiento.
 * Clase 4: v0 vs Cursor vs Claude Code, local vs online, commits, sesiones, localhost, MCP, costos.
 * Clase 5: Cursor (interfaz, modos, @, terminal, rules), git/GitHub (commit, push, merge, branch, deploy),
 *          variables de entorno (.env, Vercel), V0 vs Cursor, herramientas del flujo, colaboración.
 * Clase 6: CRUD, constraints, RLS, SQL, DBML, migraciones, modelado lógico, UI vs dominio, cuándo conviene
 *          un agente, harness, system prompt, skills, tools, MCP.
 * Clase 7: SDD, vibe coding vs SDD, niveles de madurez, bug 100K, prompt vs spec, herramientas (Spec-kit, Kiro),
 *          matriz de decisión, riesgos del vibe coding, frameworks de desarrollo asistido con IA.
 */

export type SelfEvalQuestion = {
  id: string
  prompt: string
  /** Tres opciones (A, B, C); la correcta es `options[correctIndex]` salvo que haya `correctIndices`. */
  options: [string, string, string]
  correctIndex: 0 | 1 | 2
  /** Si está definido, cualquiera de estos índices cuenta como respuesta correcta. */
  correctIndices?: readonly (0 | 1 | 2)[]
  explanation: string
}

export function isSelfEvalAnswerCorrect(
  question: SelfEvalQuestion,
  answerIndex: number | null
): boolean {
  if (answerIndex === null || answerIndex < 0 || answerIndex > 2) return false
  const idx = answerIndex as 0 | 1 | 2
  if (question.correctIndices?.length) {
    return question.correctIndices.includes(idx)
  }
  return idx === question.correctIndex
}

export function isSelfEvalOptionCorrect(
  question: SelfEvalQuestion,
  optionIndex: number
): boolean {
  if (optionIndex < 0 || optionIndex > 2) return false
  const idx = optionIndex as 0 | 1 | 2
  if (question.correctIndices?.length) {
    return question.correctIndices.includes(idx)
  }
  return idx === question.correctIndex
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

const CLASE_3_QUESTIONS: SelfEvalQuestion[] = [
  {
    id: "clase-3-q1",
    prompt: "¿Qué describe mejor qué es la Inteligencia Artificial?",
    options: [
      "Un conjunto de sistemas capaces de realizar tareas que normalmente asociamos con capacidades humanas como reconocer patrones, generar texto o tomar decisiones asistidas",
      "Un tipo específico de robot físico con forma humana",
      "Una base de datos especialmente rápida para automatizar procesos",
    ],
    correctIndex: 0,
    explanation:
      "La Inteligencia Artificial es un campo amplio. No se limita a robots ni a chatbots: incluye sistemas que clasifican, recomiendan, predicen, generan contenido o ayudan a decidir.",
  },
  {
    id: "clase-3-q2",
    prompt: "¿Qué es Machine Learning?",
    options: [
      "Una rama de la IA en la que los sistemas aprenden patrones a partir de datos en lugar de seguir únicamente reglas programadas a mano",
      "Un lenguaje de programación creado exclusivamente para entrenar chatbots",
      "Un proceso por el cual una base de datos ordena mejor la información automáticamente",
    ],
    correctIndex: 0,
    explanation:
      "En Machine Learning el sistema aprende a partir de ejemplos o datos. No hace falta programar cada caso uno por uno con reglas explícitas.",
  },
  {
    id: "clase-3-q3",
    prompt: "¿Cómo se relacionan Machine Learning y Deep Learning?",
    options: [
      "Son sinónimos: Deep Learning es simplemente otra forma de llamar al Machine Learning",
      "Deep Learning es un subconjunto dentro de Machine Learning que usa redes neuronales con varias capas para abordar problemas de mayor complejidad",
      "Machine Learning es un subconjunto de Deep Learning",
    ],
    correctIndex: 1,
    explanation:
      "Todo Deep Learning es Machine Learning, pero no todo Machine Learning es Deep Learning.",
  },
  {
    id: "clase-3-q4",
    prompt: "¿Qué describe mejor qué es una red neuronal?",
    options: [
      "Una red de computadoras conectadas entre sí para compartir internet",
      "Un sistema que guarda millones de documentos para responder preguntas",
      "Un modelo inspirado de forma general en cómo se conectan neuronas, que transforma entradas en salidas aprendiendo patrones a partir de datos",
    ],
    correctIndex: 2,
    explanation:
      "Una red neuronal no es literalmente un cerebro, pero toma inspiración muy general de esa idea de conexiones y aprendizaje a partir de ejemplos.",
  },
  {
    id: "clase-3-q5",
    prompt: "¿Qué es un LLM o Gran Modelo de Lenguaje?",
    options: [
      "Un tipo de red neuronal entrenada sobre mucho texto para predecir y generar secuencias de tokens",
      "Un chat para crear apps sin código",
      "Una base de datos especializada en documentos largos",
    ],
    correctIndex: 0,
    explanation:
      "LLM significa Large Language Model. Su función central es modelar lenguaje y generar texto probabilísticamente a partir de patrones aprendidos durante el entrenamiento.",
  },
  {
    id: "clase-3-q6",
    prompt: "V0 o Cursor son LLMs especializados en código.",
    options: [
      "Verdadero",
      "Falso",
      "Solo Cursor es un LLM; v0 no lo es",
    ],
    correctIndex: 1,
    explanation:
      "V0 y Cursor no son LLMs. En cambio, usan LLMs para generación de texto (el código es esencialmente texto) y tienen un agente especializado en software para mayor precisión. El modelo es como el «motor» que genera respuestas o código. El agente es más parecido al «auto completo»: usa ese motor, pero además agrega interfaz, herramientas, contexto, archivos, memoria operativa y acciones.",
  },
  {
    id: "clase-3-q7",
    prompt: "Siguiendo la analogía auto y motor, ¿qué comparación representa mejor la relación entre modelo y agente?",
    options: [
      "El modelo es el auto y el agente es la rueda que le permite avanzar",
      "El modelo es el motor; el agente es el sistema completo que usa ese motor para realizar tareas concretas",
      "El modelo y el agente son equivalentes; solo cambia el nombre comercial",
    ],
    correctIndex: 1,
    explanation:
      "Un agente puede usar uno o más modelos, además de contexto, archivos, instrucciones del sistema y herramientas externas para ejecutar tareas más complejas.",
  },
  {
    id: "clase-3-q8",
    prompt: "Un agente de coding puede hacer más cosas que un modelo «pelado» porque además de generar texto o código puede leer archivos, usar herramientas y seguir flujos de trabajo.",
    options: [
      "Verdadero",
      "Falso",
      "Solo si se le da acceso explícito al sistema operativo",
    ],
    correctIndex: 0,
    explanation:
      "Esa es justamente una de las diferencias prácticas más importantes entre un modelo y un agente que trabaja sobre un proyecto real.",
  },
  {
    id: "clase-3-q9",
    prompt: "Los LLMs pueden cometer errores porque…",
    options: [
      "Siempre consultan una fuente externa verificable antes de responder y esa fuente a veces está caída",
      "Trabajan con predicción probabilística, pueden interpretar mal el prompt, carecer de contexto suficiente o generar información incorrecta con tono convincente",
      "Solo fueron entrenados para responder preguntas específicas",
    ],
    correctIndex: 1,
    explanation:
      "Un LLM no garantiza verdad. Predice en base a patrones estadísticos y contexto, por eso puede sonar convincente y aun así equivocarse. Los errores pueden venir de falta de contexto, ambigüedad en el pedido, límites del entrenamiento o simple predicción equivocada.",
  },
  {
    id: "clase-3-q10",
    prompt: "¿Qué es un token en el contexto de los LLMs?",
    options: [
      "Una unidad básica de texto que el modelo procesa, que puede ser una palabra, parte de una palabra o un símbolo",
      "Una contraseña secreta para iniciar sesión en el modelo",
      "Un archivo donde el modelo guarda respuestas anteriores",
    ],
    correctIndex: 0,
    explanation:
      "Los modelos no trabajan exactamente «palabra por palabra». Trabajan sobre tokens, que son unidades más pequeñas o flexibles.",
  },
  {
    id: "clase-3-q11",
    prompt: "¿Cómo usan los LLMs los tokens?",
    options: [
      "Los usan como unidades de entrada y salida para leer el prompt, procesar contexto y generar la respuesta paso a paso",
      "Los usan solo para cobrarle al usuario, pero no para procesar el lenguaje",
      "Los usan únicamente cuando responden en inglés",
    ],
    correctIndex: 0,
    explanation:
      "El modelo recibe tokens de entrada, los procesa dentro de su ventana de contexto y genera tokens de salida uno detrás de otro.",
  },
  {
    id: "clase-3-q12",
    prompt: "¿Qué es la ventana de contexto de un LLM?",
    options: [
      "El límite de información que el modelo puede tener «a la vista» en una interacción dada, incluyendo prompt, historial y a veces archivos o instrucciones",
      "La velocidad máxima con la que el modelo puede responder",
      "La cantidad de personas que pueden usar el modelo al mismo tiempo",
    ],
    correctIndex: 0,
    explanation:
      "La ventana de contexto define cuánta información entra en la conversación activa del modelo para que pueda tenerla en cuenta al responder.",
  },
  {
    id: "clase-3-q13",
    prompt: "Si un prompt o una conversación excede la ventana de contexto, el modelo puede perder información relevante o no tenerla en cuenta correctamente.",
    options: [
      "Verdadero",
      "Falso",
      "Solo ocurre con modelos pequeños o gratuitos",
    ],
    correctIndex: 0,
    explanation:
      "Si el contexto es demasiado largo, parte de la información puede quedar afuera o diluirse, lo que afecta la calidad de la respuesta.",
  },
  {
    id: "clase-3-q14",
    prompt: "¿Qué describe mejor el pre-entrenamiento de un LLM?",
    options: [
      "La etapa en la que el modelo aprende patrones generales del lenguaje a partir de enormes volúmenes de texto",
      "La etapa en la que usuarios finales corrigen respuestas una por una dentro del chat",
      "La etapa en la que el modelo se conecta por primera vez a herramientas externas como un navegador o una terminal",
    ],
    correctIndex: 0,
    explanation:
      "El pre-entrenamiento le da al modelo una base general sobre lenguaje, conceptos, estilos y relaciones estadísticas entre tokens.",
  },
  {
    id: "clase-3-q15",
    prompt: "¿Qué papel cumplen etapas como fine-tuning o RLHF después del pre-entrenamiento?",
    options: [
      "Ayudan a especializar, alinear o ajustar el comportamiento del modelo para ciertos objetivos, tareas o preferencias humanas",
      "Sirven únicamente para reducir el tamaño del modelo y que ocupe menos memoria",
      "Reemplazan por completo todo lo aprendido durante el pre-entrenamiento",
    ],
    correctIndex: 0,
    explanation:
      "Después del pre-entrenamiento, se pueden aplicar ajustes adicionales para mejorar comportamiento, utilidad, seguridad o adaptación a tareas más específicas.",
  },
]

const CLASE_4_QUESTIONS: SelfEvalQuestion[] = [
  {
    id: "clase-4-q1",
    prompt: "¿Cuál describe mejor la diferencia entre v0, Cursor y Claude Code?",
    options: [
      "v0 es más rápido e intuitivo; Cursor y Claude Code son más flexibles y permiten hacer cosas más complejas",
      "v0 sirve solo para diseño, mientras que Cursor y Claude Code sirven solo para backend",
      "Los tres funcionan exactamente igual; solo cambia la empresa que los ofrece",
    ],
    correctIndex: 0,
    explanation:
      "La diferencia más útil para un principiante es el nivel en el que operan. v0 suele abstraer más y acercarte rápido a una UI o app inicial. Cursor y Claude Code dan más libertad y potencia. Claude Code, aparte, puede usar tu computadora para tareas fuera del código.",
  },
  {
    id: "clase-4-q2",
    prompt: "¿Puedo arrancar un proyecto nuevo desde cero en Cursor o Claude Code?",
    options: [
      "No. Solo sirven si ya existe un proyecto completo hecho por otra herramienta",
      "Sí. Pueden ayudarte a inicializar un proyecto nuevo, crear archivos, proponer estructura y avanzar desde una carpeta vacía",
      "Solo Cursor puede; Claude Code no puede crear proyectos nuevos",
    ],
    correctIndex: 1,
    explanation:
      "No hace falta llegar con todo armado. Estas herramientas pueden ayudarte a empezar desde cero, aunque conviene darles un objetivo claro, stack y alcance.",
  },
  {
    id: "clase-4-q3",
    prompt: "Si hice una app en v0 y ahora quiero seguirla en Cursor o Claude Code, ¿cuál es el camino más razonable?",
    options: [
      "Pasarla por GitHub o descargar el proyecto como zip y abrirlo en mi entorno local",
      "Copiar capturas de pantalla de la app en el chat y pedir que la reconstruyan desde cero",
      "No se puede: los proyectos hechos en v0 no pueden seguirse en otras herramientas",
    ],
    correctIndex: 0,
    explanation:
      "La forma práctica de mover el proyecto es trabajar sobre el código fuente: lo más prolijo suele ser GitHub (lo subo a la nube y me lo traigo a cualquier otro entorno); también puede servir descargar la carpeta raíz y abrirla localmente.",
  },
  {
    id: "clase-4-q4",
    prompt: "Si mi proyecto está en Cursor o Claude Code, ¿eso significa que ya está online automáticamente?",
    options: [
      "Sí. Apenas el proyecto existe en el editor, ya queda publicado para cualquier persona",
      "No. Tenerlo en el editor o en local no equivale a tenerlo desplegado en internet",
      "Sí, salvo que el proyecto use base de datos",
    ],
    correctIndex: 1,
    explanation:
      "Una cosa es tener el proyecto en tu compu o editor; otra distinta es desplegarlo en la web (por ejemplo, con Vercel) para que quede accesible online.",
  },
  {
    id: "clase-4-q5",
    prompt: "¿Qué significa correr mi proyecto «en local»?",
    options: [
      "Que la app está ejecutándose en mi propia computadora para probarla antes de publicarla",
      "Que la app ya está publicada globalmente, pero con menos velocidad",
      "Que la app está guardada en GitHub, aunque todavía no la haya abierto",
    ],
    correctIndex: 0,
    explanation:
      "«En local» significa que corre en tu máquina. Sirve para desarrollar, probar y corregir antes de desplegar.",
  },
  {
    id: "clase-4-q6",
    prompt: "¿Qué es un «commit»?",
    options: [
      "Un error de sincronización entre la IA y el editor",
      "Una versión online automática del proyecto lista para compartir",
      "Un paquete de cambios guardado en el historial del proyecto, normalmente acompañado por un mensaje que explica qué se modificó",
    ],
    correctIndex: 2,
    explanation:
      "El commit permite registrar cambios de manera ordenada y volver atrás si hace falta. Lo que nos permite hacer un commit es Git (instalado previamente).",
  },
  {
    id: "clase-4-q7",
    prompt: "En Cursor o Claude Code puedo trabajar con varios chats o sesiones en paralelo, y hasta puede convenir separarlos por tarea.",
    options: [
      "Verdadero",
      "Falso",
      "Solo si tengo una suscripción paga",
    ],
    correctIndex: 0,
    explanation:
      "Separar sesiones por objetivo puede ayudar a no mezclar o agotar contexto: una para debugging, otra para refactor, otra para research o planificación, o para features separadas.",
  },
  {
    id: "clase-4-q8",
    prompt: "¿Por qué puede convenir usar varios chats o sesiones distintas en estas herramientas?",
    options: [
      "Porque ayuda a separar contextos, evitar mezclar tareas y mantener cada conversación más enfocada",
      "Porque cada chat usa un modelo completamente distinto aunque yo no elija ninguno",
      "Porque si abro más chats, el proyecto se despliega automáticamente",
    ],
    correctIndex: 0,
    explanation:
      "Una sesión muy mezclada puede volverse menos clara (y cara, dado que estamos usando contexto que no necesitamos, o sea tokens). Separar temas suele mejorar foco, trazabilidad y eficiencia en general.",
  },
  {
    id: "clase-4-q9",
    prompt: "Con herramientas como Claude Code se pueden automatizar ciertas tareas periódicas o disparadas por eventos, por ejemplo usando workflows, schedulers o triggers.",
    options: [
      "Verdadero",
      "Falso",
      "Solo si tengo acceso a un servidor dedicado",
    ],
    correctIndex: 0,
    explanation:
      "Además del uso interactivo, estas herramientas pueden integrarse en automatizaciones o flujos programados, por ejemplo en CI/CD o tareas recurrentes.",
  },
  {
    id: "clase-4-q10",
    prompt: "Si veo mi proyecto en localhost:3000 o una dirección parecida en mi navegador, ¿puedo pasarle ese link a otra persona para que lo vea desde su computadora?",
    options: [
      "Sí, porque localhost es una dirección pública accesible desde cualquier equipo",
      "No, porque localhost normalmente apunta a mi propia máquina, no a internet",
      "Sí, siempre que la otra persona también use Cursor o Claude Code",
    ],
    correctIndex: 1,
    explanation:
      "localhost suele apuntar a tu compu. Para compartirlo, normalmente hace falta desplegarlo o exponerlo de otra manera.",
  },
  {
    id: "clase-4-q11",
    prompt: "Todos los modelos en Cursor o Claude Code consumen lo mismo, así que con la suscripción que elija da igual cuál use.",
    options: [
      "Verdadero",
      "Falso",
      "Solo aplica a modelos de Anthropic",
    ],
    correctIndex: 1,
    explanation:
      "No necesariamente consumen lo mismo. El uso puede variar según el modelo, la cantidad de contexto y la complejidad de la tarea. En la práctica, modelos más potentes o tareas más pesadas suelen implicar mayor consumo o límites distintos. La suscripción nos da una cantidad de tokens y según cómo los usemos se acabarán antes o después.",
  },
  {
    id: "clase-4-q12",
    prompt: "Si conecto APIs externas a mi proyecto, esos costos ya vienen incluidos dentro de la suscripción de Cursor o Claude Code.",
    options: [
      "Verdadero",
      "Falso",
      "Solo si las APIs son de empresas asociadas a Anthropic o Microsoft",
    ],
    correctIndex: 1,
    explanation:
      "La suscripción de la herramienta de coding no suele cubrir automáticamente el costo de APIs externas. Eso depende del proveedor de cada API, que puede cobrar aparte o tener su propio free tier.",
  },
  {
    id: "clase-4-q13",
    prompt: "¿Qué describe mejor qué es un MCP y para qué sirve?",
    options: [
      "Un estándar para conectar herramientas de IA con fuentes externas de datos, herramientas y sistemas",
      "Un tipo de base de datos donde se guarda el código fuente del proyecto",
      "Un lenguaje visual para diseñar pantallas dentro del editor",
    ],
    correctIndex: 0,
    explanation:
      "MCP ayuda a conectar al agente con herramientas, documentos, servicios o sistemas externos. En ese sentido, se relaciona con el mundo de las APIs, pero como una forma estandarizada de integración para agentes.",
  },
  {
    id: "clase-4-q14",
    prompt: "Puedo darle acceso a mi computadora a Claude Code para que haga ciertas cosas por mí.",
    options: [
      "Verdadero",
      "Falso",
      "Solo en sistemas operativos macOS o Linux",
    ],
    correctIndex: 0,
    explanation:
      "Estas herramientas pueden leer archivos, ejecutar comandos y, en algunos contextos o productos relacionados, interactuar más activamente con tu entorno. Por eso es importante revisar detenidamente permisos, alcance y riesgos.",
  },
  {
    id: "clase-4-q15",
    prompt: "¿Cuál de estas afirmaciones muestra mejor buen criterio de uso con Cursor o Claude Code?",
    options: [
      "Si la herramienta puede editar archivos o ejecutar acciones, ya no hace falta revisar nada manualmente",
      "Cuanto más acceso le doy, menos necesito entender el proyecto",
      "Son herramientas muy potentes, pero conviene usarlas con control, revisión y una idea clara de qué quiero que hagan",
    ],
    correctIndex: 2,
    explanation:
      "El valor de estas herramientas aumenta mucho con buen criterio humano: claridad de objetivo, revisión de cambios, manejo de permisos y control del proceso.",
  },
]

const CLASE_5_QUESTIONS: SelfEvalQuestion[] = [
  {
    id: "clase-5-q1",
    prompt: "¿Qué es un commit?",
    options: [
      "Un error de sincronización entre la IA y el editor",
      "Una versión online automática del proyecto lista para compartir",
      "Un grupo de cambios guardado en el historial del proyecto con un mensaje que los describe",
    ],
    correctIndex: 2,
    explanation:
      "El commit es la forma que tiene Git de registrar el progreso. Es como tomar una foto del estado del proyecto en un momento dado, con una nota que dice qué cambió. Así podés volver atrás si algo sale mal.",
  },
  {
    id: "clase-5-q2",
    prompt: "¿Cuál es la diferencia principal entre Git y GitHub?",
    options: [
      "Git controla versiones localmente; GitHub lo aloja en la nube y permite colaborar",
      "Git es para proyectos chicos y GitHub para proyectos grandes",
      "Son lo mismo con distinto nombre comercial",
    ],
    correctIndex: 0,
    explanation:
      "Git es la herramienta que corre en tu computadora y registra cada cambio. GitHub es la plataforma online donde subís esos cambios para guardarlos en la nube, compartirlos con el equipo y trabajar juntos desde distintos lugares.",
  },
  {
    id: "clase-5-q3",
    prompt: "¿Qué es una branch (rama) en Git?",
    options: [
      "Una copia de seguridad automática del proyecto en Vercel",
      "Una línea de trabajo separada para no afectar lo que ya funciona",
      "Un archivo especial que conecta GitHub con Cursor",
    ],
    correctIndex: 1,
    explanation:
      "Una rama te permite trabajar en algo nuevo (una funcionalidad, un experimento) de forma aislada. Si algo sale mal, el resto del proyecto no se ve afectado. Cuando esté listo, lo incorporás al proyecto principal con un merge.",
  },
  {
    id: "clase-5-q4",
    prompt: "Tu equipo terminó una nueva funcionalidad en una rama separada y quiere incorporarla al proyecto principal. ¿Qué operación hacen?",
    options: [
      "Un commit — para guardar los cambios localmente",
      "Un push — para subir los cambios a GitHub",
      "Un merge — para fusionar la rama con el proyecto principal",
    ],
    correctIndex: 2,
    explanation:
      "Merge es la operación que une dos ramas. Es el paso que se hace cuando una funcionalidad está lista y aprobada, y queremos que forme parte del proyecto principal. Git intenta combinar los cambios automáticamente; si hay conflictos, alguien del equipo los resuelve.",
  },
  {
    id: "clase-5-q5",
    prompt: "¿Qué significa hacer un deploy?",
    options: [
      "Publicar la app en internet para que cualquiera pueda acceder",
      "Guardar los cambios del proyecto en GitHub",
      "Eliminar una versión vieja del proyecto",
    ],
    correctIndex: 0,
    explanation:
      "Deploy (o despliegue) es el proceso de publicar la app en un servidor para que quede disponible online. Plataformas como Vercel o Netlify automatizan gran parte de este proceso: conectás tu repositorio y cada vez que subís cambios, se despliegan solos.",
  },
  {
    id: "clase-5-q6",
    prompt: "En tu flujo de desarrollo usás varias herramientas. ¿Cuál es la que se encarga de publicar la app en internet?",
    options: [
      "GitHub — porque ahí sube el código",
      "Cursor — porque ahí se escribe el código",
      "Vercel o Netlify — porque toman el código y lo despliegan online",
    ],
    correctIndex: 2,
    explanation:
      "GitHub guarda y versiona el código. Cursor es el entorno donde lo editás. Vercel y Netlify son las plataformas de hosting que toman ese código y lo ponen en un servidor para que cualquier persona pueda acceder desde su navegador.",
  },
  {
    id: "clase-5-q7",
    prompt: "¿Para qué sirve Supabase en un proyecto digital?",
    options: [
      "Para publicar y hostear la app en internet",
      "Para versionar el código y gestionar branches",
      "Base de datos, autenticación y backend reunidos en una plataforma",
    ],
    correctIndex: 2,
    explanation:
      "Supabase reúne herramientas que normalmente habría que configurar por separado: una base de datos (donde viven los datos de los usuarios, registros, etc.), manejo de autenticación (login/registro) y acceso desde el frontend. Es muy popular en proyectos AI-assisted por ser fácil de integrar.",
  },
  {
    id: "clase-5-q8",
    prompt: "¿Cuál es la diferencia principal entre V0 y Cursor?",
    options: [
      "V0 corre en el navegador para diseñar interfaces rápido; Cursor es un entorno completo para desarrollar con IA",
      "V0 genera código y Cursor solo genera imágenes",
      "Son idénticos, solo cambia la empresa que los ofrece",
    ],
    correctIndex: 0,
    explanation:
      "V0 (y Lovable) están optimizados para generar interfaces visualmente rápido, desde el navegador, sin instalar nada. Cursor es un entorno de desarrollo completo donde trabajás sobre el código, lo editás, lo depurás y lo integrás con el resto del proyecto. Ambos pueden generar código; la diferencia es el alcance y profundidad del trabajo.",
  },
  {
    id: "clase-5-q9",
    prompt: "¿Puedo crear un proyecto de software completamente nuevo desde Cursor, sin tener nada previo?",
    options: [
      "Sí, podés iniciar desde una carpeta vacía y la IA estructura todo el proyecto",
      "No, Cursor solo sirve para editar proyectos que ya existen",
      "Solo si tenés la versión paga de Cursor",
    ],
    correctIndex: 0,
    explanation:
      "Cursor puede ayudarte a empezar desde cero: crear la estructura de carpetas, instalar dependencias y armar el proyecto inicial. Conviene darle un objetivo claro, el stack tecnológico que querés usar y el alcance del proyecto para que los resultados sean mejores.",
  },
  {
    id: "clase-5-q10",
    prompt: "Querés que la IA de Cursor te explique qué va a hacer antes de tocar nada en el proyecto. ¿Qué modo usás?",
    options: [
      "Agent — porque actúa solo y es el modo principal",
      "Debug — porque detecta errores antes de ejecutar",
      "Plan — te muestra qué hará antes de ejecutar nada",
    ],
    correctIndex: 2,
    explanation:
      "El modo Plan es el que te conviene usar cuando el cambio es importante o abarca muchos archivos: la IA genera un plan de acción detallado que podés revisar, ajustar o cancelar antes de que toque una sola línea de código. El modo Agent, en cambio, actúa directamente.",
  },
  {
    id: "clase-5-q11",
    prompt: "Estás en Cursor y necesitás instalar una nueva librería en tu proyecto. ¿Cómo lo hacés?",
    options: [
      "Pedirle a la IA en el chat que lo haga por vos",
      "Abrir la terminal integrada y escribir el comando directamente (ej: npm install nombre)",
      "Ambas son formas válidas dentro de Cursor",
    ],
    correctIndex: 2,
    explanation:
      "Las dos opciones funcionan en Cursor. Podés pedirle a la IA que instale la librería (ella ejecuta el comando en la terminal por vos) o podés abrir la terminal integrada e ingresarlo directamente. La terminal en Cursor se abre con el atajo Ctrl+` (o desde el menú View → Terminal) y es la misma que usarías fuera del editor.",
  },
  {
    id: "clase-5-q12",
    prompt: "¿Para qué sirve escribir @ seguido del nombre de un archivo en el chat de Cursor?",
    options: [
      "Para darle a la IA acceso al contenido de ese archivo como contexto",
      "Para crear ese archivo desde cero en el proyecto",
      "Para borrarlo del historial del chat",
    ],
    correctIndex: 0,
    explanation:
      "El símbolo @ es la forma de darle contexto específico a la IA. En lugar de copiar y pegar el contenido del archivo, con @nombre-de-archivo la IA lo lee directamente. También podés etiquetar carpetas enteras, documentación o incluso URLs con el mismo símbolo.",
  },
  {
    id: "clase-5-q13",
    prompt: "¿Qué tipo de contenido conviene poner en las Rules (reglas) de Cursor?",
    options: [
      "Las API Keys y claves secretas del proyecto",
      "Instrucciones permanentes para la IA sobre cómo comportarse en ese proyecto",
      "El historial completo de cambios del proyecto",
    ],
    correctIndex: 1,
    explanation:
      "Las Rules son instrucciones que le das a la IA para que se comporte de cierta manera siempre en ese proyecto. Por ejemplo: \"Escribí siempre en español\", \"Preferí componentes funcionales en React\", \"Este es un e-commerce para adultos mayores, usá lenguaje simple\". Las claves secretas van en el archivo .env, nunca en las Rules.",
  },
  {
    id: "clase-5-q14",
    prompt: "Subiste tu app a Vercel y funciona perfecto en tu computadora, pero en producción no conecta con la base de datos. ¿Qué es lo más probable que esté pasando?",
    options: [
      "El código está mal escrito y hay que reescribirlo desde cero",
      "Vercel no es compatible con bases de datos externas",
      "La variable existe en el .env local, pero falta configurarla en Vercel",
    ],
    correctIndex: 2,
    explanation:
      "El archivo .env de tu computadora no se sube automáticamente a Vercel (ni debe hacerlo, porque es un archivo secreto). Tenés que configurar cada variable de entorno manualmente en el panel de Vercel: Settings → Environment Variables. Eso es lo que le permite a tu app en producción saber cómo conectarse a la base de datos.",
  },
  {
    id: "clase-5-q15",
    prompt: "Un compañero te manda el archivo .env del proyecto por WhatsApp para que puedas correrlo en tu máquina. ¿Hay algún problema con esto?",
    options: [
      "Ninguno, es la forma más práctica de compartir la configuración",
      "WhatsApp comprime el archivo y lo daña al enviarlo",
      "Es un riesgo: las claves secretas nunca deben compartirse por canales inseguros",
    ],
    correctIndex: 2,
    explanation:
      "El .env contiene información sensible como claves de APIs, conexiones a bases de datos y contraseñas de servicios. Si alguien accede a esas claves puede consumir servicios a tu nombre o acceder a tu información. Lo correcto es compartirlas por un canal seguro (como un gestor de contraseñas) y que cada integrante configure su propio .env local. Nunca deben subirse al repositorio de GitHub tampoco.",
  },
]

const CLASE_6_QUESTIONS: SelfEvalQuestion[] = [
  {
    id: "clase-6-q1",
    prompt: "¿Qué significa CRUD en el contexto de una aplicación con base de datos?",
    options: [
      "Create, Read, Update, Delete — las cuatro operaciones básicas sobre datos",
      "Connect, Route, Upload, Deploy — el ciclo de publicación de una app",
      "Copy, Restore, Undo, Duplicate — acciones del historial de Git",
    ],
    correctIndex: 0,
    explanation:
      "CRUD resume casi todo lo que hace una app con datos: crear registros, leerlos, actualizarlos y borrarlos. Cuando diseñás una pantalla o un agente, conviene preguntarte qué operaciones CRUD necesita cada entidad (usuarios, turnos, productos, etc.).",
  },
  {
    id: "clase-6-q2",
    prompt: "Al armar un producto digital, ¿qué conviene diseñar primero?",
    options: [
      "Las pantallas, porque el usuario solo ve la interfaz",
      "El modelo de datos del dominio; la UI debería derivar de ahí",
      "El deploy en Vercel, para tener la URL lista desde el día uno",
    ],
    correctIndex: 1,
    explanation:
      "El dominio (qué entidades existen y cómo se relacionan) debería guiar la base de datos y, después, la UI. Si empezás por las pantallas, las tablas suelen quedar atadas al diseño visual y es más difícil evolucionar el producto sin romper datos.",
  },
  {
    id: "clase-6-q3",
    prompt:
      "Un equipo diseñó cada pantalla y luego creó tablas en Supabase para que «calcen» con esos formularios. ¿Cuál es el principal riesgo de este enfoque?",
    options: [
      "Que Supabase no permita más de diez tablas por proyecto",
      "Que las tablas reflejen la UI y no el dominio; cambiar la app obliga a migrar la base",
      "Que la IA no pueda generar código React a partir de esas tablas",
    ],
    correctIndex: 1,
    explanation:
      "Este es el antipatrón clásico: diseñar pantallas primero y modelar tablas para que encajen. El resultado suele ser datos duplicados, tablas que no representan el negocio real y una base rígida. Si cambiás la UI, muchas veces tenés que migrar la base. Un agente también cuesta más integrarlo cuando el modelo de datos no está bien pensado.",
  },
  {
    id: "clase-6-q4",
    prompt: "¿Para qué sirven los constraints en una base de datos?",
    options: [
      "Para acelerar el deploy en Vercel",
      "Para garantizar integridad: obligatorios, únicos, referencias válidas",
      "Para que la IA pueda leer el esquema más rápido",
    ],
    correctIndex: 1,
    explanation:
      "Los constraints son reglas que la base aplica sola: un email no puede quedar vacío, un DNI no se repite, un turno debe apuntar a un paciente que existe. Así evitás datos inconsistentes aunque la UI o el agente cometan un error.",
  },
  {
    id: "clase-6-q5",
    prompt: "¿Qué es RLS (Row Level Security) en Supabase?",
    options: [
      "Un lenguaje para escribir migraciones de base de datos",
      "Controla qué filas ve o modifica cada usuario según quién está autenticado",
      "Un modo de Cursor para depurar consultas SQL",
    ],
    correctIndex: 1,
    explanation:
      "RLS define políticas por fila: por ejemplo, que un usuario solo vea sus propios pedidos o que un médico solo acceda a turnos de su consultorio. Es clave en productos multiusuario: sin RLS, cualquiera con acceso a la API podría leer o cambiar datos de otros.",
  },
  {
    id: "clase-6-q6",
    prompt: "¿Qué es SQL?",
    options: [
      "El lenguaje estándar para consultar y manipular bases de datos relacionales",
      "Un formato de archivo para exportar diseños de Figma",
      "El protocolo que usa Cursor para conectarse a GitHub",
    ],
    correctIndex: 0,
    explanation:
      "SQL (Structured Query Language) es el idioma con el que pedís datos, insertás filas, actualizás campos y creás tablas en bases relacionales como PostgreSQL (la que usa Supabase). No hace falta memorizarlo entero: con IA podés generar consultas, pero conviene entender qué hace cada operación.",
  },
  {
    id: "clase-6-q7",
    prompt: "¿Para qué sirve DBML al diseñar una base de datos?",
    options: [
      "Para publicar la app en internet sin usar Vercel",
      "Para diseñar tablas y relaciones de forma legible antes de escribir SQL",
      "Para reemplazar RLS en proyectos con Supabase",
    ],
    correctIndex: 1,
    explanation:
      "DBML es un lenguaje pensado para modelar bases de datos: definís tablas, columnas y relaciones en un texto claro que el equipo (y la IA) pueden leer. Es un buen paso intermedio entre «lo tengo en la cabeza» y el SQL o las migraciones finales.",
  },
  {
    id: "clase-6-q8",
    prompt:
      "El equipo necesita agregar una columna nueva. Un integrante propone hacerlo directo desde el panel de Supabase. ¿Por qué suele ser mejor usar una migración versionada?",
    options: [
      "Porque el Dashboard de Supabase no permite agregar columnas",
      "Porque las migraciones versionan el esquema, se replican y se pueden revertir con control",
      "Porque Vercel exige migraciones para cada deploy",
    ],
    correctIndex: 1,
    explanation:
      "Cambiar el esquema solo en el panel deja el cambio «invisible» para el resto del equipo y para otros entornos (local, staging, producción). Las migraciones son archivos en el repo que documentan cada cambio, se aplican en orden y permiten que todos tengan la misma estructura y, si hace falta, volver atrás.",
  },
  {
    id: "clase-6-q9",
    prompt: "¿Cuándo suele convenir un agente conversacional en lugar de (o además de) una UI clásica?",
    options: [
      "Siempre: reemplaza cualquier pantalla y reduce costos de diseño",
      "En tareas multi-paso, lenguaje ambiguo o cuando el usuario explora información",
      "Solo cuando el producto no tiene base de datos",
    ],
    correctIndex: 1,
    explanation:
      "Un agente no reemplaza toda la UI: es otra interfaz para otros usos. Conviene cuando el usuario puede pedir algo en lenguaje natural («buscá y reservá», «mové el turno del jueves») o cuando necesita explorar datos sin saber exactamente qué filtro usar.",
  },
  {
    id: "clase-6-q10",
    prompt:
      "Un consultorio registra unas 200 reservas por hora con una UI optimizada. El equipo quiere reemplazar esa pantalla por un agente de chat. ¿Es buena idea?",
    options: [
      "Sí, porque el agente siempre es más moderno y barato de mantener",
      "No necesariamente: alta frecuencia y flujo repetitivo favorecen una UI eficiente",
      "Sí, siempre que el agente use el modelo más potente disponible",
    ],
    correctIndex: 1,
    explanation:
      "En flujos de alta frecuencia y bajo margen de error (muchas cargas por hora), una UI bien diseñada suele ser más rápida y predecible que escribir mensajes. Los agentes brillan en exploración y tareas complejas en lenguaje natural, no en reemplar por agregar fricción donde la UI ya es óptima.",
  },
  {
    id: "clase-6-q11",
    prompt: "En Cursor, ¿qué es el Agent Harness?",
    options: [
      "El modelo de IA que genera el código (el «cerebro»)",
      "El sistema que orquesta al modelo con instrucciones, herramientas y contexto",
      "La terminal integrada donde se ejecutan los comandos npm",
    ],
    correctIndex: 1,
    explanation:
      "El harness es el «cuerpo» que envuelve al modelo: le da instrucciones ajustadas, acceso a buscar en el código, leer y escribir archivos, correr la terminal y ver errores del linter. El modelo piensa; el harness ejecuta y conecta con tu proyecto.",
  },
  {
    id: "clase-6-q12",
    prompt: "¿Qué es el System Prompt de un agente?",
    options: [
      "Las instrucciones base que definen quién es el agente y cómo debe comportarse",
      "El archivo .env con las claves secretas del proyecto",
      "La lista de commits más recientes en GitHub",
    ],
    correctIndex: 0,
    explanation:
      "El system prompt responde a «quién es el agente»: su rol, tono, restricciones generales y límites. Es distinto de las Skills (saber hacer tareas concretas) y de las Tools (acciones ejecutables). En Cursor, parte de esto vive en Rules y en instrucciones del proyecto.",
  },
  {
    id: "clase-6-q13",
    prompt: "¿Qué son las Skills en la arquitectura de un agente?",
    options: [
      "Las API Keys necesarias para conectar Supabase",
      "Instrucciones especializadas que se cargan solo cuando la tarea las requiere",
      "Los atajos de teclado del editor Cursor",
    ],
    correctIndex: 1,
    explanation:
      "Las Skills empaquetan conocimiento procedural (cómo hacer X). Muchas veces se cargan de forma «lazy»: primero solo la descripción, y el contenido completo del archivo SKILL.md cuando el agente decide que hace falta. Así no saturás el contexto con todo el manual en cada conversación.",
  },
  {
    id: "clase-6-q14",
    prompt:
      "¿Qué enfoque es más seguro y mantenible para que un agente interactúe con tu base de datos?",
    options: [
      "Darle acceso SQL directo a Postgres para máxima flexibilidad",
      "Tools que encapsulan lógica de negocio y limitan qué puede hacer el agente",
      "Copiar y pegar el esquema completo en cada mensaje del chat",
    ],
    correctIndex: 1,
    explanation:
      "Si le das SQL libre, el agente es tan poderoso (y riesgoso) como el rol de la base: puede borrar datos o inventar consultas distintas en cada conversación. Las Tools reutilizan tu código, las mismas validaciones que la UI y un esquema explícito de acciones permitidas: vos elegís el «radio de impacto» del agente.",
  },
  {
    id: "clase-6-q15",
    prompt: "En la arquitectura de un agente, ¿qué rol cumple MCP?",
    options: [
      "Define la personalidad y restricciones generales del agente",
      "Empaqueta conocimiento procedural para tareas específicas",
      "Protocolo estándar para exponer herramientas y fuentes externas al agente",
    ],
    correctIndex: 2,
    explanation:
      "MCP (Model Context Protocol) es cómo se exponen las tools hacia clientes externos: conecta el agente con servicios, documentos o sistemas de forma estandarizada. No es lo mismo que el system prompt (quién es), las skills (qué sabe hacer) ni las tools en sí (qué acciones ejecuta): MCP es el «enchufe» para que otras piezas las consuman.",
  },
]

const CLASE_7_QUESTIONS: SelfEvalQuestion[] = [
  {
    id: "clase-7-q1",
    prompt: "¿Qué es Spec Driven Development (SDD)?",
    options: [
      "Escribir las reglas de negocio antes de que la IA genere código",
      "Dejar que la IA decida todas las reglas mientras genera el código",
      "Un framework obligatorio de GitHub para publicar en Vercel",
    ],
    correctIndex: 0,
    explanation:
      "SDD invierte el orden: primero definís qué debe hacer el sistema (en un .md, Google Doc o herramienta), después la IA genera código que respeta esas reglas. No reemplaza la creatividad — la canaliza con más rigor cuando el impacto de un error es alto.",
  },
  {
    id: "clase-7-q2",
    prompt: "¿Cuál es la diferencia principal entre vibe coding y SDD?",
    options: [
      "Vibe coding usa Cursor y SDD solo usa Claude Code",
      "En SDD las reglas están escritas antes; en vibe coding la IA las interpreta del prompt",
      "Son lo mismo; SDD es solo un nombre comercial más nuevo",
    ],
    correctIndex: 1,
    explanation:
      "En vibe coding le decís a la IA «haceme un motor de descuentos» y ella interpreta, adivina reglas y genera código. En SDD esas reglas ya están en un documento (la spec) y el código debe alinearse a ellas. La IA puede participar en ambos; lo que cambia es si las reglas existen por escrito antes de codear.",
  },
  {
    id: "clase-7-q3",
    prompt:
      "La clase compara SDD con la construcción de una casa. ¿Qué afirmaciones forman parte de esa analogía?",
    options: [
      "Construir sin planos es como empezar por paredes y techo y después ver dónde van los caños",
      "SDD es como los planos del arquitecto: detectás errores antes de construir",
      "SDD es como construir sin planos pero más rápido porque la IA ayuda",
    ],
    correctIndex: 1,
    correctIndices: [0, 1],
    explanation:
      "Nadie empieza una casa por las paredes y después resuelve cimientos y cañerías. El plano (la spec) permite ver si algo no cierra antes de levantar paredes. En software, eso significa detectar bugs de lógica de negocio en el diseño, no      cuando ya está en producción.",
  },
  {
    id: "clase-7-q4",
    prompt: "¿Cuál de estas opciones NO es un riesgo típico del vibe coding?",
    options: [
      "Bugs invisibles que «andan» en casos simples y fallan en combinaciones reales",
      "Deuda técnica instantánea y falta de trazabilidad de decisiones",
      "Que la IA siempre genere código incompatible con Supabase",
    ],
    correctIndex: 2,
    explanation:
      "Los riesgos reales que vimos en clase incluyen bugs invisibles, código que no sigue patrones del proyecto, falta de documentación del por qué de cada decisión y problemas de seguridad (permisos, vulnerabilidades). Que Supabase sea incompatible no es un riesgo inherente del vibe coding: depende de cómo uses la herramienta y qué tan bien definas el contexto.",
  },
  {
    id: "clase-7-q5",
    prompt: "¿Qué describe el nivel Spec-as-Source (Nivel 3 de madurez en SDD)?",
    options: [
      "La spec es la fuente de verdad; el código generado no se edita a mano",
      "Escribís la spec una vez y después solo usás vibe coding",
      "La spec solo sirve para prototipos de hackathon",
    ],
    correctIndex: 0,
    explanation:
      "En Spec-as-Source la spec ES el artefacto principal (como Protocol Buffers que generan código en varios lenguajes). Nivel 1 (Spec-First) guía a la IA pero el código sigue siendo el foco. Nivel 2 (Spec-Anchored) agrega governance y validación contra la spec. Nivel 3 es el máximo rigor.",
  },
  {
    id: "clase-7-q6",
    prompt: "¿Cuál es un beneficio clave de la validación temprana en SDD?",
    options: [
      "Elimina la necesidad de probar la app con usuarios reales",
      "Detectar bugs de lógica antes de escribir código",
      "Hacer deploy automático sin revisar nada",
    ],
    correctIndex: 1,
    explanation:
      "Un bug en producción puede costar 10 a 100 veces más que detectarlo en diseño. Cuando las reglas están en la spec, podés revisar casos borde (¿el cupón se evalúa antes o después de las promos?) sin tocar una línea de código. Eso es validación temprana.",
  },
  {
    id: "clase-7-q7",
    prompt: "Según la clase, ¿cuál es el mensaje central del espectro entre vibe coding y SDD?",
    options: [
      "Siempre hay que usar SDD Nivel 3 en todo proyecto",
      "Vibe coding está prohibido en productos profesionales",
      "Elegir el nivel de rigor apropiado para cada situación",
    ],
    correctIndex: 2,
    explanation:
      "No hay que elegir uno u otro para siempre. Un hackathon o prototipo puede ir con vibe coding (velocidad máxima). Pagos, facturación o lógica con muchas reglas que interactúan piden más rigor (Spec-First, Spec-Anchored o Spec-as-Source). Es un slider de autonomía y rigor según impacto y riesgo.",
  },
  {
    id: "clase-7-q8",
    prompt:
      "Un carrito suma $90.000 antes de promos y $79.000 después. El cupón AHORRO exige más de $80.000. ¿Cuándo conviene evaluar si aplica?",
    options: [
      "Sobre el total original, antes de las promos",
      "Después de las promos, sobre el subtotal recalculado",
      "Solo si el usuario lo pide en el chat",
    ],
    correctIndex: 1,
    explanation:
      "La spec del demo define la REGLA CRÍTICA: la elegibilidad del cupón se evalúa DESPUÉS de aplicar promociones por categoría, sobre el subtotal resultante — nunca sobre el total original. Si evaluás sobre $90.000 el cupón aplica; si evaluás sobre $79.000, no. Esa diferencia es el bug del caso «100K USD».",
  },
  {
    id: "clase-7-q9",
    prompt:
      "En el caso Auriculares + Funda + cupón AHORRO, el Motor A (vibe) da $76.000 y el Motor B (spec) da $79.000. ¿Cuál sigue la spec?",
    options: [
      "Motor A — porque el cupón debe aplicarse sobre el total original",
      "Motor B — no aplica cupón porque $79.000 no supera $80.000",
      "Ambos están bien; es cuestión de preferencia del negocio",
    ],
    correctIndex: 1,
    explanation:
      "Motor A aplica el cupón sobre $90.000 (antes de promos) y descuenta $3.000 de más. Motor B aplica promos primero, recalcula a $79.000 y correctamente NO aplica el cupón ($79.000 no es mayor que $80.000). La spec dice comparación estrictamente mayor (>) sobre subtotal post-promos.",
  },
  {
    id: "clase-7-q10",
    prompt: "¿Por qué QA y testing manual a menudo no detectan el bug del motor de descuentos?",
    options: [
      "Porque Supabase no permite probar descuentos en staging",
      "Solo el 3,2% de combinaciones lo exponen; el 96,8% funciona bien",
      "Porque la IA siempre genera código sin bugs en tests simples",
    ],
    correctIndex: 1,
    explanation:
      "De 63 combinaciones de carrito posibles, solo 2 exponen el bug (auriculares + funda, auriculares + remera). El resto coincide entre ambos motores. Por eso parece que «todo anda» hasta que aparece el caso borde. Una spec con 4 reglas claras lo previene desde el diseño.",
  },
  {
    id: "clase-7-q11",
    prompt: "Según la clase, ¿dónde «vive» el bug en casos como el motor de descuentos?",
    options: [
      "En el lenguaje de programación elegido (Python vs JavaScript)",
      "En la distancia entre lo que el prompt describe y lo que la spec define",
      "En que Vercel no soporta cupones con umbral",
    ],
    correctIndex: 1,
    explanation:
      "El prompt describe el qué («motor de descuentos con promos y cupones»). La spec define el cómo y el cuándo (orden de aplicación, sobre qué monto se evalúa el umbral). El bug aparece en la interacción entre reglas — exactamente lo que un prompt vago no fija y una spec sí.",
  },
  {
    id: "clase-7-q12",
    prompt: "¿Hace falta usar Spec-kit, Kiro o Claude Code para practicar SDD?",
    options: [
      "Sí, sin esas herramientas no es SDD",
      "No; un .md escrito a mano y pasado a cualquier agente ya es SDD",
      "Solo si el proyecto está en AWS",
    ],
    correctIndex: 1,
    explanation:
      "Las herramientas (Spec-kit, Claude Code Plan mode, Kiro) ayudan a organizar specs más rápido, pero no son obligatorias. Lo importante es que las reglas estén escritas antes de generar código. Podés usar Cursor, v0 o un Google Doc y cumplir el espíritu del SDD.",
  },
  {
    id: "clase-7-q13",
    prompt: "¿Qué diferencia principal hay entre Spec-kit y Kiro?",
    options: [
      "Spec-kit es CLI agnóstico al IDE; Kiro es un IDE con workflow guiado",
      "Kiro solo funciona sin internet; Spec-kit requiere AWS",
      "Son la misma herramienta con distinto nombre",
    ],
    correctIndex: 0,
    explanation:
      "Spec-kit (GitHub) organiza specs en carpetas con comandos slash y es compatible con cualquier asistente de código — más manual, más disciplina del equipo. Kiro (AWS) es un IDE basado en VS Code con flujo Requirements → Design → Tasks, más guiado pero atado al ecosistema AWS.",
  },
  {
    id: "clase-7-q14",
    prompt: "Tu equipo va a lanzar una feature de pagos en producción con lógica de negocio compleja. ¿Qué approach conviene según la matriz de la clase?",
    options: [
      "Vibe coding puro para llegar más rápido al mercado",
      "Spec-Anchored o Spec-as-Source (rigor alto)",
      "Solo documentar después del deploy en un Google Doc",
    ],
    correctIndex: 1,
    explanation:
      "La matriz de decisión ubica infraestructura crítica (pagos, facturación) en Spec-as-Source o al menos Spec-Anchored. Features en producción con reglas que interactúan también piden Spec-First o más. Vibe coding queda para prototipos, scripts internos y exploración.",
  },
  {
    id: "clase-7-q15",
    prompt: "Tenés un fin de semana para un prototipo de hackathon sin usuarios reales. ¿Qué approach conviene?",
    options: [
      "Spec-as-Source Nivel 3 obligatorio",
      "Vibe coding (velocidad máxima)",
      "No usar IA en absoluto",
    ],
    correctIndex: 1,
    explanation:
      "Para prototipos, pruebas de concepto y exploración de ideas, la clase recomienda vibe coding: máxima velocidad, bajo costo de setup. Cuando hay usuarios reales, impacto económico o legal, o mantenimiento a largo plazo, subís el rigor en el slider hacia SDD.",
  },
]

/**
 * IDs de clases con cuestionario real (no placeholder). Incluir aquí al dar de alta preguntas nuevas
 * y refleja qué se puede elegir en el modal de autoevaluación.
 */
export const SELF_EVAL_CLASS_IDS_LIVE: readonly string[] = ["clase-1", "clase-2", "clase-3", "clase-4", "clase-5", "clase-6", "clase-7"]

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
    questions: CLASE_3_QUESTIONS,
  },
  {
    id: "clase-4",
    title: "Clase 4: Herramientas Avanzadas",
    questions: CLASE_4_QUESTIONS,
  },
  {
    id: "clase-5",
    title: "Clase 5: De Vibe-Coding a AI-Assisted Engineering",
    questions: CLASE_5_QUESTIONS,
  },
  {
    id: "clase-6",
    title: "Clase 6: Lanzamiento y luego qué?",
    questions: CLASE_6_QUESTIONS,
  },
  {
    id: "clase-7",
    title: "Clase 7: Demo day + Frameworks Emergentes",
    questions: CLASE_7_QUESTIONS,
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
