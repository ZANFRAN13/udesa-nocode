# Respaldo con clave de usuario (Google AI Studio / Gemini)

## Qué es

Si la API de **OpenAI configurada en el servidor** (`OPENAI_API_KEY`) devuelve un error de **límite de uso / saturación**, el usuario puede pegar una **clave gratuita de Google AI Studio (Gemini)** para que esa misma consulta se complete con Gemini.

**No** sustituye al OpenAI del servidor en condiciones normales: siempre se intenta OpenAI primero.

---

## Cuándo NO aplica

- **Límite de la aplicación** (10 consultas cada 120 minutos por sesión): el usuario ve `errorType: session_limit`. Hay que esperar el tiempo indicado; el panel de clave Gemini **no** se ofrece para esto.
- **Cuota / facturación de OpenAI agotada** en el servidor (`insufficient_quota`): `errorType: openai_insufficient_quota`. No se ofrece Gemini como arreglo; hace falta revisar la cuenta OpenAI del proyecto.

---

## Flujo

1. El usuario hace una consulta en Tutor o Brújula.
2. El servidor llama a OpenAI.
3. Si OpenAI responde con un error de tipo “demasiadas peticiones / límite”:
   - Si el usuario **ya pegó** una clave `AIza...` en el panel, el servidor usa **Gemini** con esa clave.
   - Si **no**, la API devuelve `errorType: 'openai_rate_limit'` y el frontend muestra el panel azul con enlace a [Google AI Studio](https://aistudio.google.com/api-keys).
4. El usuario pega la clave y vuelve a enviar; el servidor vuelve a intentar OpenAI y, si sigue en límite, usa Gemini.

---

## Modelo Gemini

- Por defecto: `gemini-2.5-flash` (tier gratuito de desarrollador en Google).
- Opcional en el servidor: variable `GEMINI_USER_FALLBACK_MODEL` para override.

---

## Frontend

- Estados: `showUserKeyInput`, `userApiKey` en `gemini-popup.tsx` y `brujula-popup.tsx`.
- Se envía `userApiKey` en el body del `POST` a `/api/gemini` solo si el usuario la completó (el servidor la usa **después** de fallar OpenAI por límite, no antes).
- El panel azul se muestra solo si `data.errorType === 'openai_rate_limit'`.

---

## Backend (referencia)

- Archivo: `app/api/gemini/route.ts`
- Funciones útiles: `createUserGeminiModel`, `isRateLimitError`, `isInsufficientQuotaError`, `attachRateLimit`.
- Brújula con Gemini: `generationConfig.responseMimeType: "application/json"` para respuestas JSON estables.

---

## Privacidad

La clave del usuario **no se guarda en base de datos**; viaja al backend solo en la petición y queda en memoria del navegador mientras el popup sigue abierto (se limpia al tener éxito con OpenAI; se conserva en el cliente tras éxito con respaldo Gemini para no tener que pegarla de nuevo en la misma sesión del popup).

---

## Documentación relacionada

- [HYBRID_SYSTEM_SUMMARY.md](./HYBRID_SYSTEM_SUMMARY.md) — visión general del sistema.
- [OPENAI_CONFIGURATION.md](./OPENAI_CONFIGURATION.md) — configuración técnica y variables.
