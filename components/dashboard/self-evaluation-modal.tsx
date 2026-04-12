"use client"

/**
 * Autoevaluaciones del Dashboard: selector de clase, 3 preguntas tipo test y resultado.
 * El botón con birrete reutiliza el mismo brillo animado que el asistente IA (gemini-helper-glow).
 */

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, GraduationCap, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  SELF_EVALUATION_CLASSES,
  type SelfEvalClass,
} from "@/lib/self-evaluation-data"
import "@/components/glossary/gemini-markdown-styles.css"

export const SELF_EVAL_SESSION_STORAGE_KEY = "udesa-self-eval-session-done"

type Step = "pick" | "quiz" | "results"

type SelfEvaluationModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Llamar cuando el usuario cierra el modal o termina el test (auto-promo de la sesión no vuelve a mostrarse). */
  onSessionComplete: () => void
}

/** Mayor que la duración CSS (~4.85s) para desmontar el overlay tras el efecto visible */
const BIRRETE_RAINBOW_MS = 5300

export function SelfEvaluationTrigger({
  onClick,
  /** Se incrementa al cerrar o terminar el modal: dispara un barrido arcoíris una vez sobre el birrete. */
  flashKey = 0,
}: {
  onClick: () => void
  flashKey?: number
}) {
  const [rainbowOn, setRainbowOn] = useState(false)

  useEffect(() => {
    if (flashKey <= 0) return
    setRainbowOn(true)
    const id = window.setTimeout(() => setRainbowOn(false), BIRRETE_RAINBOW_MS)
    return () => window.clearTimeout(id)
  }, [flashKey])

  return (
    <span className="relative inline-flex shrink-0">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={onClick}
        className="relative z-10 h-9 w-9 rounded-full border-border bg-accent hover:bg-accent/90 gemini-helper-glow"
        aria-label="Autoevaluaciones"
        title="Autoevaluaciones"
      >
        <GraduationCap className="h-4 w-4 text-black gemini-helper-sparkle" />
      </Button>
      {rainbowOn ? (
        <span
          key={flashKey}
          className="birrete-rainbow-sweep"
          aria-hidden
        >
          <span className="birrete-rainbow-sweep__beam" />
        </span>
      ) : null}
    </span>
  )
}

export function SelfEvaluationModal({
  open,
  onOpenChange,
  onSessionComplete,
}: SelfEvaluationModalProps) {
  const [step, setStep] = useState<Step>("pick")
  const [selectedClass, setSelectedClass] = useState<SelfEvalClass | null>(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [score, setScore] = useState<number | null>(null)

  useEffect(() => {
    if (!open) return
    setStep("pick")
    setSelectedClass(null)
    setQuestionIndex(0)
    setAnswers([])
    setScore(null)
  }, [open])

  if (!open) return null

  const closeAndCompleteSession = () => {
    onSessionComplete()
    onOpenChange(false)
  }

  const handleBackdropClick = () => {
    closeAndCompleteSession()
  }

  const handleSelectClass = (c: SelfEvalClass) => {
    setSelectedClass(c)
    setAnswers(Array(c.questions.length).fill(null))
    setQuestionIndex(0)
    setStep("quiz")
  }

  const currentQ =
    selectedClass && selectedClass.questions[questionIndex]
      ? selectedClass.questions[questionIndex]
      : null

  const pickOption = (optionIndex: number) => {
    if (!selectedClass) return
    setAnswers((prev) => {
      const next = [...prev]
      next[questionIndex] = optionIndex
      return next
    })
  }

  const goNext = () => {
    if (!selectedClass) return
    if (questionIndex < selectedClass.questions.length - 1) {
      setQuestionIndex((i) => i + 1)
    } else {
      setAnswers((prev) => {
        let correct = 0
        selectedClass.questions.forEach((q, i) => {
          if (prev[i] === q.correctIndex) correct += 1
        })
        setScore(correct)
        setStep("results")
        return prev
      })
    }
  }

  const lastIndex = selectedClass
    ? selectedClass.questions.length - 1
    : 0
  const canAdvance =
    selectedClass &&
    answers[questionIndex] !== null &&
    answers[questionIndex] !== undefined

  return (
    <>
      <div
        role="presentation"
        className="fixed inset-0 z-[45] bg-black/50 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <Card className="pointer-events-auto w-full max-w-lg max-h-[90vh] overflow-y-auto bg-background shadow-2xl border-2 border-accent/20 relative scrollbar-subtle">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={closeAndCompleteSession}
            className="absolute top-3 right-3 h-8 w-8 p-0 rounded-full hover:bg-accent/10 z-10"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="p-6 md:p-8 pt-12">
            {step === "pick" && (
              <>
                <div className="text-center mb-6">
                  <div className="inline-flex p-3 rounded-2xl bg-primary/10 mb-3">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold mb-2">
                    Autoevaluaciones
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Elegí una clase para responder unas preguntas rápidas y ver
                    qué tan claro tenés el tema. Son solo tres preguntas por
                    clase.
                  </p>
                </div>
                <ul className="space-y-2">
                  {SELF_EVALUATION_CLASSES.map((c) => (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => handleSelectClass(c)}
                        className="w-full flex items-center justify-between gap-3 rounded-lg border border-border px-4 py-3 text-left text-sm font-medium hover:bg-accent/10 hover:border-primary/30 transition-colors"
                      >
                        <span className="line-clamp-2">{c.title}</span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {step === "quiz" && selectedClass && currentQ && (
              <>
                <p className="text-xs text-muted-foreground mb-1">
                  {selectedClass.title}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Pregunta {questionIndex + 1} de{" "}
                  {selectedClass.questions.length}
                </p>
                <h3 className="text-base md:text-lg font-semibold mb-4">
                  {currentQ.prompt}
                </h3>
                <div className="grid gap-2 mb-6">
                  {currentQ.options.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => pickOption(idx)}
                      className={cn(
                        "rounded-lg border px-3 py-3 text-left text-sm transition-colors",
                        answers[questionIndex] === idx
                          ? "border-primary bg-primary/10"
                          : "border-border hover:bg-accent/5"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={goNext}
                    disabled={!canAdvance}
                  >
                    {questionIndex >= lastIndex
                      ? "Ver resultado"
                      : "Siguiente"}
                  </Button>
                </div>
              </>
            )}

            {step === "results" && selectedClass && score !== null && (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-xl md:text-2xl font-bold mb-2">
                    Resultado
                  </h2>
                  <p className="text-muted-foreground text-sm mb-2">
                    {selectedClass.title}
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {score} / {selectedClass.questions.length}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {score === selectedClass.questions.length
                      ? "¡Muy bien! Repasá el material si querés afianzar detalles."
                      : "Podés volver a la grabación o al material de la clase para reforzar lo que falte."}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setStep("pick")
                      setSelectedClass(null)
                      setQuestionIndex(0)
                      setAnswers([])
                      setScore(null)
                    }}
                  >
                    Otra clase
                  </Button>
                  <Button type="button" onClick={closeAndCompleteSession}>
                    Cerrar
                  </Button>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </>
  )
}
