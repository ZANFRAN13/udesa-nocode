# 💬 Sistema de Conversación con Memoria (Thread)

## Nueva Funcionalidad

Se implementó un **sistema de conversación con memoria** en el popup del Asistente IA que permite a los usuarios hacer preguntas de seguimiento sin tener que repetir todo el contexto previo.

## 🎯 Objetivo

Permitir conversaciones naturales con la IA donde el usuario puede:
- Hacer una pregunta inicial
- Hacer hasta 2 repreguntas de seguimiento
- La IA recuerda el contexto de toda la conversación
- No necesita repetir información en cada pregunta

## 📊 Límites Implementados

```
Total de mensajes permitidos: 3
- 1 pregunta inicial
- 2 repreguntas de seguimiento
```

**Justificación del límite:**
- Evita conversaciones infinitas que pueden ser costosas
- Mantiene el enfoque en consultas específicas
- Incentiva a seleccionar nuevos contenidos para aprender más
- Balance entre funcionalidad y costo de API

## 🔧 Implementación Técnica

### 1. Estructura de Mensajes

```typescript
interface Message {
  role: "user" | "assistant"
  content: string
}
```

Cada mensaje tiene:
- **role**: Identifica quién habla (usuario o asistente)
- **content**: El contenido del mensaje

### 2. Estado del Popup

```typescript
const [conversationHistory, setConversationHistory] = useState<Message[]>([])
const [prompt, setPrompt] = useState("")
const [isLoading, setIsLoading] = useState(false)

const remainingQuestions = MAX_MESSAGES - conversationHistory.filter(m => m.role === "user").length
```

**Estado mantenido:**
- `conversationHistory`: Array de todos los mensajes
- `remainingQuestions`: Contador de preguntas restantes

### 3. Flujo de Conversación

```
1. Usuario escribe pregunta
   ↓
2. Se agrega al historial como mensaje "user"
   ↓
3. Se envía a API con historial completo
   ↓
4. API procesa con contexto completo
   ↓
5. Respuesta se agrega como mensaje "assistant"
   ↓
6. UI se actualiza con todo el historial
   ↓
7. Usuario puede hacer otra pregunta (si quedan)
```

### 4. Envío a la API

```typescript
body: JSON.stringify({
  prompt: userMessage.content,           // Pregunta actual
  context: selectedText,                  // Contenido del glosario
  conversationHistory: conversationHistory // Todo el historial previo
})
```

### 5. Procesamiento en la API

```typescript
// Construir el historial de conversación para Gemini
let conversationContext = ""
if (conversationHistory.length > 0) {
  conversationContext = "\n\nHISTORIAL DE LA CONVERSACIÓN:\n"
  conversationHistory.forEach((msg: Message) => {
    conversationContext += `\n${msg.role === "user" ? "Usuario" : "Asistente"}: ${msg.content}\n`
  })
}

const fullPrompt = `
${systemContext}
${context}
${conversationContext}
Solicitud actual del usuario: ${prompt}
`
```

Gemini recibe:
1. Contexto del sistema (definición de vibecoding)
2. Contexto del glosario
3. **Historial completo** de la conversación
4. Pregunta actual

## 🎨 Interfaz de Usuario

### Vista Inicial (Sin Historial)

```
┌─────────────────────────────────┐
│ Asistente IA               [X]  │
├─────────────────────────────────┤
│ Contenido seleccionado:         │
│ API (Application Programming... │
├─────────────────────────────────┤
│ [Explícalo como si...] [¿Cómo] │
│ [Dame un ejemplo] [¿Cuándo...]  │
├─────────────────────────────────┤
│ [Escribe tu pregunta...]  [➤]   │
└─────────────────────────────────┘
```

### Vista con Conversación

```
┌─────────────────────────────────┐
│ Asistente IA               [X]  │
├─────────────────────────────────┤
│ Contenido seleccionado:         │
│ API (Application Programming... │
├─────────────────────────────────┤
│     ┌──────────────────┐  👤   │
│     │ ¿Qué es una API? │       │
│     └──────────────────┘        │
│                                 │
│ 🤖  ┌──────────────────┐        │
│     │ Una API es...    │        │
│     │ [respuesta]      │        │
│     └──────────────────┘        │
│                                 │
│     ┌──────────────────┐  👤   │
│     │ Dame un ejemplo  │       │
│     └──────────────────┘        │
│                                 │
│ 🤖  ┌──────────────────┐        │
│     │ Por ejemplo...   │        │
│     └──────────────────┘        │
├─────────────────────────────────┤
│ [Escribe tu pregunta...]  [➤]   │
│ Puedes hacer 1 pregunta más     │
└─────────────────────────────────┘
```

## 🎯 Características Visuales

### Mensajes del Usuario
- **Posición**: Derecha
- **Ícono**: 👤 Usuario
- **Color**: Acento (morado)
- **Estilo**: Fondo sólido

### Mensajes del Asistente
- **Posición**: Izquierda
- **Ícono**: 🤖 Bot (gradiente morado-rosa)
- **Color**: Fondo suave con borde
- **Estilo**: Markdown renderizado

### Contador de Preguntas
- **Activo**: "Puedes hacer X pregunta(s) más" (gris)
- **Agotado**: "Límite alcanzado. Cierra y selecciona otro contenido" (naranja)

### Auto-scroll
- Se desplaza automáticamente al último mensaje
- Animación suave de scroll

## 📝 Ejemplos de Uso

### Ejemplo 1: Progresión Natural

**Pregunta 1:**
```
Usuario: "¿Qué es una API?"

Asistente: "Una API es como un camarero en un restaurante. 
Toma tu pedido (solicitud), lo lleva a la cocina (servidor), 
y te trae lo que pediste (respuesta)..."
```

**Pregunta 2** (con contexto de la anterior):
```
Usuario: "¿Cómo la uso en vibecoding?"

Asistente: "En vibecoding, puedes trabajar con APIs usando prompts a Cursor:
1. 'Crea una función que llame a esta API...'
2. 'Agrega manejo de errores...'
Basándonos en la analogía del camarero que mencioné, 
tu código actúa como el cliente que hace el pedido..."
```

**Pregunta 3** (con contexto completo):
```
Usuario: "Dame un ejemplo específico"

Asistente: "Tomando el concepto de API que expliqué y 
el enfoque de vibecoding que vimos, aquí un ejemplo práctico:

Prompt a Cursor: 'Crea una función que obtenga usuarios desde 
https://api.example.com/users y maneje errores'

[código generado]..."
```

### Ejemplo 2: Profundización

**Pregunta 1:**
```
Usuario: "Explícalo como si tuviera 5 años"

Asistente: "Imagina que tienes un control remoto mágico..."
```

**Pregunta 2:**
```
Usuario: "Ahora explícalo en términos técnicos"

Asistente: "Desde una perspectiva técnica, y expandiendo 
la analogía anterior del control remoto..."
```

**Pregunta 3:**
```
Usuario: "¿Qué patrones debo seguir?"

Asistente: "Considerando lo que discutimos sobre las bases 
técnicas, aquí los patrones principales..."
```

## 🔍 Cómo Gemini Usa el Historial

### Sin Historial (Primera Pregunta)

Gemini recibe:
```
CONTEXTO DEL SISTEMA: [definición vibecoding]
---
Contexto del glosario: [término seleccionado]
---
Solicitud del usuario: ¿Qué es una API?
```

### Con Historial (Repreguntas)

Gemini recibe:
```
CONTEXTO DEL SISTEMA: [definición vibecoding]
---
Contexto del glosario: [término seleccionado]

HISTORIAL DE LA CONVERSACIÓN:
Usuario: ¿Qué es una API?
Asistente: Una API es como un camarero...

Usuario: Dame un ejemplo práctico
Asistente: Por ejemplo, cuando usas Instagram...
---
Solicitud actual del usuario: ¿Cómo la uso en mi proyecto?

IMPORTANTE: Tienes contexto de la conversación anterior. 
Usa esa información para dar respuestas más específicas y relevantes.
```

Gemini puede:
- Hacer referencia a respuestas anteriores
- Construir sobre conceptos ya explicados
- Evitar repetir información
- Dar respuestas más contextualizadas

## 🚀 Beneficios

### Para el Usuario

**Conversación natural:**
- No necesita repetir contexto
- Puede profundizar en temas
- Flujo de aprendizaje continuo

**Ahorro de tiempo:**
- No reescribe preguntas completas
- Puede usar referencias como "esto", "lo anterior"
- Preguntas más cortas y directas

**Mejor comprensión:**
- La IA construye sobre lo explicado
- Respuestas más cohesivas
- Aprendizaje progresivo

### Para el Sistema

**Eficiencia:**
- Reutiliza contexto cargado
- No necesita reexplicar conceptos
- Respuestas más precisas

**Control de costos:**
- Límite de 3 mensajes por sesión
- Evita conversaciones infinitas
- Balance funcionalidad/costo

## 📊 Métricas y Límites

### Límites Implementados

| Concepto | Valor | Razón |
|----------|-------|-------|
| Preguntas totales | 3 | Balance entre funcionalidad y costo |
| Primera pregunta | 1 | Consulta inicial |
| Repreguntas | 2 | Seguimiento y profundización |
| Contexto preservado | 100% | Todo el historial se envía |

### Contadores

```typescript
// Preguntas hechas
const questionsMade = conversationHistory.filter(m => m.role === "user").length

// Preguntas restantes
const remainingQuestions = MAX_MESSAGES - questionsMade

// Estado del límite
if (remainingQuestions > 0) {
  // Puede seguir preguntando
} else {
  // Límite alcanzado - input deshabilitado
}
```

## 🎛️ Flujo Completo

### Estado Inicial
```
Historial: []
Prompts rápidos: Visibles
Input: Activo
Contador: No mostrado
```

### Después de Primera Pregunta
```
Historial: [usuario, asistente]
Prompts rápidos: Ocultos
Input: Activo
Contador: "Puedes hacer 2 preguntas más"
```

### Después de Segunda Pregunta
```
Historial: [usuario, asistente, usuario, asistente]
Prompts rápidos: Ocultos
Input: Activo
Contador: "Puedes hacer 1 pregunta más"
```

### Después de Tercera Pregunta
```
Historial: [usuario, asistente, usuario, asistente, usuario, asistente]
Prompts rápidos: Ocultos
Input: Deshabilitado
Contador: "Límite alcanzado. Cierra y selecciona otro contenido."
```

## 🔄 Reinicio de Conversación

Para iniciar una nueva conversación:
1. Cierra el popup actual
2. Selecciona nuevo contenido (o el mismo)
3. Se crea un nuevo popup con historial vacío
4. Puedes hacer 3 nuevas preguntas

## 🎨 Elementos UI Nuevos

### Ícono de Usuario
```tsx
<div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
  <User className="h-3 w-3" />
</div>
```

### Ícono de Bot
```tsx
<div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
  <Bot className="h-3 w-3 text-white" />
</div>
```

### Contador
```tsx
{remainingQuestions > 0 ? (
  <>Puedes hacer {remainingQuestions} pregunta{remainingQuestions > 1 ? "s" : ""} más</>
) : (
  <span className="text-orange-600">
    Límite alcanzado. Cierra y selecciona otro contenido.
  </span>
)}
```

## 💾 Persistencia

**Estado actual:**
- ❌ El historial NO persiste al cerrar el popup
- ❌ El historial NO persiste al recargar la página

**Comportamiento:**
- Cada apertura del popup = nueva conversación
- Al cerrar se pierde el historial
- Esto incentiva consultas focalizadas

**Futuro posible:**
- Guardar historial en localStorage
- Permitir recuperar conversaciones
- Exportar conversaciones

## 📚 Archivos Modificados

### Frontend
- `components/glossary/gemini-popup.tsx`
  - Nuevo estado `conversationHistory`
  - UI de mensajes estilo chat
  - Contador de preguntas restantes
  - Auto-scroll a últimos mensajes

### Backend
- `app/api/gemini/route.ts`
  - Nuevo parámetro `conversationHistory`
  - Procesamiento de historial
  - Inclusión en prompt a Gemini

---

**Fecha de implementación**: 2025-11-01  
**Estado**: ✅ Activo en producción  
**Impacto**: Mejora significativa en UX y calidad de respuestas  
**Costo**: Controlado mediante límite de 3 mensajes

