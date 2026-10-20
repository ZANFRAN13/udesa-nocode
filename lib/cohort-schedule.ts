/**
 * Calendario de la cohorte actual (COHORTE 3 H2 2026).
 *
 * Cada clase se dicta un viernes. Ese mismo viernes (00:00 hora Argentina) se desbloquean
 * automáticamente la tarea (Worksheets) y la autoevaluación de esa clase.
 *
 * Si una semana no hay clase (feriado, receso), alcanza con correr la fecha de esa clase
 * y las siguientes en esta lista.
 */
export const CLASS_DATES: Record<number, string> = {
  1: "2026-10-16",
  2: "2026-10-23",
  3: "2026-10-30",
  4: "2026-11-06",
  5: "2026-11-13",
  6: "2026-11-20",
  7: "2026-11-27",
}

/** Argentina no tiene horario de verano: siempre UTC-3. */
const ARGENTINA_UTC_OFFSET = "-03:00"

/** `true` si la tarea/autoevaluación de la clase ya está disponible. */
export function isClassUnlocked(classNumber: number, now: Date = new Date()): boolean {
  const date = CLASS_DATES[classNumber]
  if (!date) return false
  return now >= new Date(`${date}T00:00:00${ARGENTINA_UTC_OFFSET}`)
}

/** Acepta ids tipo "clase-3". */
export function isClassIdUnlocked(classId: string, now: Date = new Date()): boolean {
  const match = /^clase-(\d+)$/.exec(classId)
  return match ? isClassUnlocked(Number(match[1]), now) : false
}
