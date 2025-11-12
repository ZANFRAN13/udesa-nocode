# Sistema Híbrido: OpenAI + Gemini

## 🎯 Configuración Actual

### Servidor (OpenAI)
- **Modelo:** `gpt-4o-mini`
- **Uso:** Todas las consultas principales
- **Ventajas:**
  - ✅ Consistente y confiable
  - ✅ Excelente para respuestas estructuradas
  - ✅ Buen rendimiento en español
  - ✅ JSON mode para Brújula

### Fallback de Usuario (Gemini)
- **Modelo:** `gemini-2.0-flash-exp`
- **Uso:** Cuando el usuario alcanza el límite de rate
- **Ventajas:**
  - ✅ API key gratis en 2 clicks
  - ✅ No requiere tarjeta de crédito
  - ✅ Tier gratuito más generoso
  - ✅ Mismo nivel de calidad para contenido educativo

---

## 🔄 Flujo Completo

```
Usuario hace consulta
    ↓
Verifica rate limit (10/120min)
    ↓
¿Límite alcanzado?
    ↓ NO
Usa OpenAI (servidor) ✅
    ↓
Respuesta exitosa
```

```
Usuario hace consulta
    ↓
Verifica rate limit (10/120min)
    ↓
¿Límite alcanzado?
    ↓ SÍ
Muestra input para API key de Gemini
    ↓
Usuario pega su API key de Gemini
    ↓
Usa Gemini con key del usuario ✅
    ↓
Respuesta exitosa
```

---

## 💡 ¿Por Qué Este Sistema?

### Mejor Experiencia de Usuario
1. **Calidad garantizada:** OpenAI en el servidor
2. **Fallback fácil:** Gemini para usuarios (2 clicks)
3. **Sin barreras:** No requiere tarjeta de crédito

### Costo-Efectivo
1. **Servidor:** OpenAI controlado con rate limiting
2. **Usuarios:** Pueden usar su propia key de Gemini gratis

### Flexibilidad
1. **Dos proveedores:** Si uno tiene problemas, el otro funciona
2. **Opciones:** Usuario puede elegir continuar con su key

---

## 📝 Implementación Técnica

### Backend (route.ts)

#### Para Servidor:
```typescript
const openaiClient = getOpenAIClient()
await handleTutorMode(openaiClient, ..., false) // isGemini = false
```

#### Para Usuario:
```typescript
if (userApiKey) {
  const genAI = new GoogleGenerativeAI(userApiKey.trim())
  const userModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })
  await handleTutorMode(userModel, ..., true) // isGemini = true
}
```

### Función Handler Unificada:
```typescript
async function handleTutorMode(
  client: any, // OpenAI o Gemini
  prompt: string,
  context: string,
  conversationHistory: Message[],
  provider: string,
  usedFallback: boolean = false,
  isGemini: boolean = false // Determina qué API usar
) {
  if (isGemini) {
    // Usa Gemini API
    const result = await client.generateContent(fullPrompt)
    text = result.response.text()
  } else {
    // Usa OpenAI API
    const completion = await client.chat.completions.create({...})
    text = completion.choices[0]?.message?.content
  }
}
```

---

## 🎨 UI Actualizada

### Panel de Fallback (Azul)
Cuando se muestra el input para API key:

```
🔑 Solución Rápida: Usá tu propia API Key

Pegá tu API key de Google Gemini para continuar 
con tu búsqueda inmediatamente

[Input: Pegá tu API key de Gemini aquí (AIza...)]

🔗 Conseguir API key gratuita (2 clicks)
🔒 Tu API key solo se usa para esta búsqueda y no se guarda
```

---

## ✅ Ventajas del Sistema Híbrido

### Para el Proyecto:
1. ✅ Control de costos con rate limiting
2. ✅ Calidad garantizada con OpenAI
3. ✅ Resiliencia con dos proveedores

### Para el Usuario:
1. ✅ Servicio gratis hasta 10 consultas
2. ✅ Opción fácil de continuar (Gemini 2 clicks)
3. ✅ Sin barreras de entrada (no requiere tarjeta)

### Comparación:

| Aspecto | OpenAI (Servidor) | Gemini (Usuario) |
|---------|-------------------|------------------|
| **Velocidad** | Rápido | Rápido |
| **Calidad** | Excelente | Excelente |
| **Costo** | Controlado | Gratis para usuario |
| **Setup** | Ya configurado | 2 clicks |
| **Requiere CC** | Sí (servidor) | No (usuario) |
| **JSON Mode** | ✅ Nativo | ⚠️ Manual |

---

## 🔧 Configuración Requerida

### Para Desarrolladores:
```env
# .env.local
OPENAI_API_KEY=sk-your-openai-key-here
```

### Para Usuarios (Opcional):
1. Ir a: https://aistudio.google.com/api-keys
2. Crear API key
3. Pegar cuando se alcanza el límite

---

## 📊 Logs del Sistema

### Servidor usando OpenAI:
```
✅ OpenAI API key configured
🚀 [TUTOR] Attempting OpenAI API...
⚙️  [TUTOR] Processing with PRIMARY API (openai)
✅ [TUTOR] OpenAI API success (450ms)
```

### Usuario usando Gemini:
```
🔑 [TUTOR] User provided their own Gemini API key
⚙️  [TUTOR] Processing with PRIMARY API (user-provided-gemini)
✅ [TUTOR] User Gemini API key success
```

---

## 🎓 Resumen No-Técnico

**¿Qué es el sistema híbrido?**

La app usa dos "cerebros" de inteligencia artificial:

1. **OpenAI (el principal):** Responde todas tus consultas de forma gratis hasta que llegues a 10 preguntas cada 2 horas.

2. **Gemini (tu respaldo):** Si se te acaban las 10 consultas y necesitás seguir, podés conseguir tu propia "llave" de Google Gemini en 2 clicks (gratis, sin tarjeta) y seguir consultando.

**¿Por qué dos?**
- OpenAI es excelente y lo pagamos nosotros
- Gemini es fácil de conseguir para vos si querés más
- Los dos funcionan perfecto para aprender

**¿Cuál es mejor?**
Ambos son excelentes. Usás OpenAI automáticamente, y solo necesitás Gemini si querés hacer más de 10 consultas cada 2 horas.

---

**Última actualización:** 12 de Noviembre, 2024  
**Sistema:** Híbrido OpenAI + Gemini  
**Estado:** ✅ Producción

