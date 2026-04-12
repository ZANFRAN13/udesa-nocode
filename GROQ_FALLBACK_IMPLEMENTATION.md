# Implementación de Fallback con Segunda Key de Gemini ✅

> **Nota (2026):** Arquitectura actual: ver [HYBRID_SYSTEM_SUMMARY.md](./HYBRID_SYSTEM_SUMMARY.md) y [USER_API_KEY_FALLBACK.md](./USER_API_KEY_FALLBACK.md). El route actual usa OpenAI como motor principal y Gemini solo como clave opcional del usuario ante límite de OpenAI.

## Resumen

Se implementó un sistema de fallback automático usando una segunda clave de Gemini (GEMINI_API_KEY_2) cuando la clave principal alcanza límites de consultas (error 429). Esto mejora la confiabilidad del sistema y garantiza una mejor experiencia de usuario sin las limitaciones de contexto de GROQ.

## ¿Cómo Funciona?

### 1. **Detección Automática y Fallback Inteligente**
- El sistema intenta usar la clave principal de Gemini (GEMINI_API_KEY) por defecto
- Si la clave principal NO está configurada, usa la clave secundaria (GEMINI_API_KEY_2)
- Si la clave principal devuelve un error 429 (Too Many Requests), el sistema automáticamente cambia a la clave secundaria
- El usuario no necesita hacer nada, el cambio es transparente

### 2. **Proveedor de IA**

#### Gemini (Primary Key)
- Modelo: `gemini-2.0-flash-exp`
- Variable: `GEMINI_API_KEY`
- Usado por defecto para ambos modos (Tutor y Brújula)
- Rápido, alta calidad, y maneja contextos muy largos

#### Gemini (Secondary Key - Fallback)
- Modelo: `gemini-2.0-flash-exp` (mismo modelo)
- Variable: `GEMINI_API_KEY_2`
- Se activa automáticamente cuando la clave principal tiene rate limits
- Mantiene exactamente la misma calidad y capacidad de contexto
- Perfecto para Brújula que requiere contextos de ~27k tokens

### 3. **Transparencia para el Usuario**

Cuando se usa la clave secundaria de Gemini, el usuario ve un pequeño badge discreto que dice **"Gemini 2"**:

- **Modo Tutor**: Badge aparece en el header del popup junto a "Asistente IA"
- **Modo Brújula**: Badge aparece en el header junto a "Brújula de Contenido"

El badge es de color azul y tiene un diseño minimalista para no ser intrusivo.

## Archivos Modificados

### 1. **`app/api/gemini/route.ts`**

**Cambios principales:**
- Función `getGeminiClient()` que acepta parámetro `useFallback` para seleccionar entre claves primaria/secundaria
- Lógica unificada que usa la misma función `handleTutorMode()` y `handleBrujulaMode()` para ambas claves
- Try-catch wrappers para detectar errores 429 y activar fallback
- Las respuestas incluyen campos adicionales:
  - `provider`: "gemini" o "gemini-secondary"
  - `fallbackUsed`: true cuando se usó la clave secundaria

**Código clave:**

```typescript
// Get both primary and fallback models
const primaryModel = getGeminiClient(false)   // Uses GEMINI_API_KEY
const fallbackModel = getGeminiClient(true)   // Uses GEMINI_API_KEY_2

// Intenta con clave primaria primero
try {
  return await handleBrujulaMode(query, primaryModel, "gemini")
} catch (error: any) {
  // Detecta rate limit
  if (error?.status === 429 || error?.message?.includes('429')) {
    console.log("🔄 Primary Gemini rate limited, falling back to secondary key...")
    if (fallbackModel) {
      return await handleBrujulaMode(query, fallbackModel, "gemini-secondary")
    }
    throw error
  }
  throw error
}
```

### 2. **`components/glossary/gemini-popup.tsx`**

**Cambios:**
- Agregado campo `usedFallback` a la interfaz `Message`
- Nuevo estado `showFallbackInfo` para controlar la visualización del badge
- Detección de `data.fallbackUsed` en la respuesta del API
- Badge visual "Gemini 2" en el header cuando se usa la clave secundaria

### 3. **`components/glossary/brujula-popup.tsx`**

**Cambios:**
- Nuevo estado `usedFallback` para tracking del proveedor
- Detección de `data.fallbackUsed` en la respuesta del API
- Badge visual "Gemini 2" en el header cuando se usa la clave secundaria

### 4. **`env.template`**

**Cambios:**
- Agregada variable de entorno `GEMINI_API_KEY_2`
- Documentación sobre cómo obtener la segunda API key de Gemini
- Indicación de que es opcional pero altamente recomendada
- GROQ comentado (no se usa debido a límites de tokens)

## Configuración

### Obtener Segunda API Key de Gemini

1. Visitar: https://aistudio.google.com/app/apikey
2. Crear una nueva API key (puedes tener múltiples keys gratuitas)
3. Copiar la key generada
4. Agregar la key al archivo `.env.local`:

```env
GEMINI_API_KEY=tu_primera_key_aqui
GEMINI_API_KEY_2=tu_segunda_key_aqui
```

### ¿Es Obligatorio?

**No**, la segunda key es opcional. Si no se configura:
- El sistema seguirá funcionando con la clave principal
- Cuando la clave principal tenga rate limits, se mostrará el error al usuario
- No habrá fallback automático

**Altamente Recomendado**: Configurar una segunda key de Gemini para:
- Mejor confiabilidad
- Sin interrupciones por rate limits
- Misma calidad y capacidad de contexto (~27k tokens para Brújula)

## Experiencia de Usuario

### Escenario 1: Clave principal funciona normalmente
- Usuario hace una consulta
- Gemini (clave principal) responde rápidamente
- No se muestra ningún badge especial
- Todo funciona como antes

### Escenario 2: Clave principal tiene rate limit Y hay segunda clave configurada
- Usuario hace una consulta
- Gemini (clave principal) devuelve error 429
- Sistema cambia automáticamente a clave secundaria (en < 1 segundo)
- Gemini (clave secundaria) responde exitosamente
- Se muestra badge discreto "Gemini 2"
- Usuario obtiene su respuesta sin interrupciones
- **Calidad y contexto idénticos a la clave principal**

### Escenario 3: Solo clave secundaria está configurada (principal comentada/sin key)
- Usuario hace una consulta
- Sistema detecta que clave principal no está disponible
- Usa clave secundaria directamente
- Se muestra badge "Gemini 2"
- Usuario obtiene respuesta exitosa
- **Perfecto para testing del fallback**

### Escenario 4: Clave principal tiene rate limit Y NO hay segunda clave
- Usuario hace una consulta
- Gemini devuelve error 429
- Sistema no tiene alternativa
- Se muestra mensaje de error al usuario
- Usuario debe esperar antes de reintentar

## Logs y Debugging

En la consola del servidor verás diferentes mensajes según el escenario:

**Cuando clave principal no está configurada:**
```
⚠️ Primary Gemini API key not found, using secondary key...
```

**Cuando clave principal tiene rate limit:**
```
🔄 Primary Gemini rate limited, falling back to secondary key...
```

Estos logs ayudan a monitorear cuándo se está usando el fallback y por qué razón.

## Beneficios

1. **Mayor Confiabilidad**: Sistema sigue funcionando incluso cuando la clave principal tiene rate limits
2. **Mejor UX**: Usuario no ve errores, el sistema se auto-repara
3. **Sin Pérdida de Calidad**: Usa el mismo modelo (gemini-2.0-flash-exp) con ambas claves
4. **Sin Limitaciones de Contexto**: A diferencia de GROQ (~12k tokens), Gemini maneja contextos muy largos (~27k+ tokens)
5. **Transparencia**: Badge discreto "Gemini 2" informa cuando se usa la clave secundaria
6. **Sin Código Adicional en Frontend**: Los componentes no necesitan cambios significativos
7. **Configuración Opcional**: Se puede usar solo una clave si se prefiere
8. **Ideal para Brújula**: El modo Brújula requiere ~27k tokens de contexto, incompatible con GROQ

## Limitaciones y Consideraciones

1. **Cuota Total**: Ambas claves de Gemini comparten cuotas diarias, pero los rate limits (consultas por minuto) son independientes
2. **Costos**: Actualmente ambas claves son gratuitas en el tier de Gemini, pero eso puede cambiar en el futuro
3. **Rate Limits Simultáneos**: Si ambas claves están en rate limit al mismo tiempo, el usuario verá error
4. **Por qué NO GROQ**: GROQ tiene límite de ~12k tokens, insuficiente para Brújula que requiere ~27k tokens de contexto

## Futuras Mejoras Posibles

1. **Múltiples Fallbacks**: Agregar más proveedores (Claude, OpenAI, etc)
2. **Load Balancing**: Distribuir carga entre proveedores automáticamente
3. **Retry Logic**: Reintentar con Gemini después de cierto tiempo
4. **Analytics**: Trackear uso de cada proveedor para optimizar costos
5. **Provider Selection**: Permitir al usuario elegir su proveedor preferido

## Testing

Para probar el fallback:

1. **Opción A - Simular ausencia de clave principal (Recomendado)**:
   - Comentar temporalmente la clave principal en `.env.local`:
     ```env
     # GEMINI_API_KEY=tu_primera_key
     GEMINI_API_KEY_2=tu_segunda_key
     ```
   - Reiniciar el servidor de desarrollo
   - Hacer una consulta en Brújula o Tutor
   - Verificar en la consola: `⚠️ Primary Gemini API key not found, using secondary key...`
   - Verificar el badge "Gemini 2" en la interfaz
   - Descomenta la clave principal cuando termines de probar

2. **Opción B - Forzar rate limit natural**:
   - Hacer muchas consultas rápidas hasta alcanzar el límite de la clave principal
   - Verificar en la consola: `🔄 Primary Gemini rate limited, falling back to secondary key...`
   - Observar el cambio automático con badge "Gemini 2"

3. **Verificación visual**:
   - Badge azul "Gemini 2" = usando clave secundaria
   - Sin badge = usando clave principal normalmente

---

**Nota**: Este sistema mejora significativamente la confiabilidad de las funciones de IA del asistente sin agregar complejidad al usuario final. Al usar dos claves de Gemini en lugar de GROQ, garantizamos que Brújula funcione correctamente con sus ~27k tokens de contexto.

