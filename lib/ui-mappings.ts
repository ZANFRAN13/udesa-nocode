import {
  FileText,
  GraduationCap,
  BookOpen,
  Video,
  Brain,
  User,
  Mic,
} from "lucide-react"
import type { ResourceType, ResourceTopic } from "./additional-resources-data"

// Type Icons Mapping
export const typeIcons: Record<ResourceType, any> = {
  articulo: FileText,
  guia: GraduationCap,
  bibliografia: BookOpen,
  video: Video,
  paper: Brain,
  documentacion: FileText,
  curso: GraduationCap,
  referentes: User,
  podcast: Mic,
}

// Type Labels Mapping
export const typeLabels: Record<ResourceType, string> = {
  articulo: "Artículo",
  guia: "Guía",
  bibliografia: "Libro",
  video: "Video",
  paper: "Paper",
  documentacion: "Documentación",
  curso: "Curso",
  referentes: "Referente",
  podcast: "Podcast",
}

// Topic Labels Mapping
export const topicLabels: Record<ResourceTopic, string> = {
  vibecoding: "VibeCoding",
  llm: "LLM",
  agentes: "Agentes",
  prompting: "Prompting",
  arquitectura: "Arquitectura",
  "ux-ui": "UX/UI",
  desarrollo: "Desarrollo",
  producto: "Producto",
  general: "General",
}

// Topic Colors Mapping
export const topicColors: Record<ResourceTopic, string> = {
  vibecoding: "bg-purple-100 text-purple-800 dark:bg-purple-950/30 dark:text-purple-400 border-purple-200 dark:border-purple-800",
  llm: "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  agentes: "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-400 border-green-200 dark:border-green-800",
  prompting: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
  arquitectura: "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400 border-red-200 dark:border-red-800",
  "ux-ui": "bg-pink-100 text-pink-800 dark:bg-pink-950/30 dark:text-pink-400 border-pink-200 dark:border-pink-800",
  desarrollo: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
  producto: "bg-orange-100 text-orange-800 dark:bg-orange-950/30 dark:text-orange-400 border-orange-200 dark:border-orange-800",
  general: "bg-gray-100 text-gray-800 dark:bg-gray-950/30 dark:text-gray-400 border-gray-200 dark:border-gray-800",
}

// Helper Functions
export function getTypeIcon(type: ResourceType) {
  return typeIcons[type] || FileText
}

export function getTypeLabel(type: ResourceType) {
  return typeLabels[type] || type
}

export function getTopicLabel(topic: ResourceTopic) {
  return topicLabels[topic] || topic
}

export function getTopicColor(topic: ResourceTopic) {
  return topicColors[topic] || topicColors.general
}

