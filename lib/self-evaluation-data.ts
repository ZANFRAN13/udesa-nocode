/**
 * Autoevaluaciones por clase: preguntas de opción múltiple.
 * Las entradas actuales son ejemplos (dummy) para probar la app; reemplazar por contenido real editando este archivo.
 */

export type SelfEvalQuestion = {
  id: string
  prompt: string
  /** Cuatro opciones; la correcta es `options[correctIndex]`. */
  options: [string, string, string, string]
  correctIndex: 0 | 1 | 2 | 3
}

export type SelfEvalClass = {
  id: string
  title: string
  questions: SelfEvalQuestion[]
}

/** Clave estable por clase para tests y analytics futuros. */
export const SELF_EVALUATION_CLASSES: SelfEvalClass[] = [
  {
    id: "clase-1",
    title: "Clase 1: La revolución de Producto",
    questions: dummyQuestionsFor("Clase 1"),
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
        "Postergar cualquier prototipo",
      ],
      correctIndex: 0,
    },
    {
      id: `${classLabel}-q2`,
      prompt: `[Ejemplo] Para repasar ${classLabel}, ¿cuál sería un buen siguiente paso práctico?`,
      options: [
        "Anotar 1 aprendizaje y 1 acción concreta para la semana",
        "Dejar el tema sin aplicarlo a tu proyecto",
        "Copiar sin entender el sentido del ejercicio",
        "Evitar contrastar con lo que ya sabés del tema",
      ],
      correctIndex: 0,
    },
    {
      id: `${classLabel}-q3`,
      prompt: `[Ejemplo] Si tenés dudas sobre lo visto en ${classLabel}, ¿qué enfoque es más útil?`,
      options: [
        "Volver a la grabación o material y anotar dudas puntuales",
        "Asumir que ya está todo entendido sin revisar",
        "Saltar a otro tema sin conectar conceptos",
        "Evitar preguntar en la comunidad o al equipo docente",
      ],
      correctIndex: 0,
    },
  ]
}
