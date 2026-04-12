# Sistema híbrido: OpenAI (servidor) + Gemini (solo respaldo del usuario)

## Configuración actual

### Servidor (OpenAI)

- **Modelo:** `gpt-4o-mini`
- **Variable de entorno:** `OPENAI_API_KEY`
- **Uso:** Todas las respuestas normales de **Tutor** y **Brújula**; siempre se intenta primero.

### Respaldo del usuario (Google AI Studio / Gemini)

- **Modelo por defecto:** `gemini-2.5-flash` (configurable con `GEMINI_USER_FALLBACK_MODEL` en el servidor)
- **Cuándo se usa:** Solo si la llamada a **OpenAI con la clave del servidor** falla por **límite de uso / saturación** (no por el límite de “10 consultas por sesión” de la app).
- **Clave:** La pega el usuario en el panel azul; se obtiene gratis en [Google AI Studio](https://aistudio.google.com/api-keys) (prefijo típico `AIza`).

---

## Dos límites distintos (importante)

| Qué | Efecto | ¿Aparece el campo de clave Gemini? |
|-----|--------|-------------------------------------|
| **Límite de la app** (10 consultas / 120 min por sesión) | Mensaje de espera; `errorType: session_limit` | No |
| **Límite de OpenAI del servidor** (cuota / muchas peticiones) | Mensaje + opción de clave; `errorType: openai_rate_limit` | Sí |

---

## Flujo resumido

```
Usuario envía una consulta
    ↓
¿Límite de sesión (10/120 min) agotado?
    ↓ SÍ → Error session_limit (sin panel Gemini)
    ↓ NO
Llamada a OpenAI con OPENAI_API_KEY
    ↓ OK → Respuesta
    ↓ Error de límite de OpenAI
¿El usuario pegó una clave Gemini en el panel?
    ↓ SÍ → Llamada a Gemini con esa clave (mismo modelo configurable arriba)
    ↓ NO → Error openai_rate_limit (se muestra el panel para pegar clave)
```

---

## Implementación técnica (backend)

Archivo: `app/api/gemini/route.ts`

- Siempre: cliente OpenAI desde `getOpenAIClient()`.
- Tras error de OpenAI clasificado como rate limit: si hay `userApiKey`, se usa `createUserGeminiModel` (JSON para Brújula vía `responseMimeType: application/json`).
- Errores de facturación / cuota insuficiente de OpenAI (`insufficient_quota`): `errorType: openai_insufficient_quota` (sin ofrecer Gemini como solución).

---

## UI

- El panel azul para pegar clave solo se muestra cuando `errorType === 'openai_rate_limit'`.
- Tras una respuesta exitosa con **OpenAI**, la clave pegada se borra del estado del popup. Tras éxito con **user-gemini-fallback**, la clave se mantiene en el navegador para poder reintentar sin volver a pegarla.

---

## Resumen no técnico

La app responde con **OpenAI** (como ChatGPT) usando la clave del proyecto. Eso tiene un tope de **10 preguntas cada 2 horas** por sesión: si lo superás, tenés que esperar; **no** se soluciona pegando una clave de Gemini.

La clave de **Gemini (Google AI Studio)** sirve solo si el **servicio OpenAI del sitio** va lento o llega a su propio límite de uso: ahí podés crear una clave gratis, pegarla en el recuadro azul y seguir.

---

**Última actualización:** abril 2026  
**Estado:** OpenAI primero; Gemini solo como respaldo opcional ante límite de OpenAI del servidor.
