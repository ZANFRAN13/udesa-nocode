# Configuración de OpenAI - Guía para Usuarios

## 🎯 ¿Qué cambió?

Ahora la plataforma usa **OpenAI** (el mismo sistema detrás de ChatGPT) como motor de inteligencia artificial para las dos funciones principales:

1. **🎓 Tutor IA** - El asistente que te ayuda a entender términos del glosario
2. **🧭 Brújula** - El navegador inteligente que te ayuda a encontrar contenido

---

## ⚡ Nueva Característica: Límite de Consultas

### ¿Qué significa?
Para cuidar los recursos y costos, cada sesión tiene:
- **10 consultas** disponibles
- Se renuevan cada **2 horas** (120 minutos)

### ¿Cómo sé cuántas consultas me quedan?
Vas a ver un pequeño indicador verde que dice, por ejemplo:
```
7/10 consultas
```

Esto significa que te quedan 7 consultas de las 10 disponibles.

---

## 🔑 ¿Qué pasa si se me acaban las consultas?

No te preocupes, hay dos opciones:

### Opción 1: Esperar (Gratis)
- Esperá **2 horas** y tus consultas se renuevan automáticamente
- No necesitás hacer nada

### Opción 2: Usar tu propia API Key de Google Gemini
Si necesitás consultar algo urgente, podés usar tu propia clave de Gemini (¡es más fácil y gratis!):

1. **Obtené tu API Key gratis en 2 clicks:**
   - Andá a: https://aistudio.google.com/api-keys
   - Iniciá sesión con tu cuenta de Google
   - Hacé clic en "Create API Key"
   - Copiá la clave (empieza con `AIza`)

2. **Usala en la app:**
   - Cuando se te acaben las consultas, vas a ver un campo azul
   - Pegá tu API key ahí
   - Tu búsqueda se procesará inmediatamente

3. **¿Es seguro?**
   - ✅ Tu clave NO se guarda en nuestros servidores
   - ✅ Solo se usa para ESA búsqueda
   - ✅ La clave se borra cuando cerrás el popup

---

## 💡 Consejos para Aprovechar tus Consultas

### Hacé preguntas inteligentes:
En lugar de preguntar cosas simples que podés leer, usá el asistente para:
- Pedir ejemplos prácticos
- Entender cómo aplicarlo en tu proyecto
- Aclarar conceptos complejos
- Relacionar términos con tu flujo de trabajo

### Ejemplo:
❌ **Pregunta básica:** "¿Qué es Git?"  
✅ **Pregunta aprovechable:** "¿Cómo uso Git en mi flujo de vibecoding con Cursor?"

---

## 🎓 Modo Tutor: Límite Adicional

Además del límite de sesión, el Modo Tutor tiene un límite de conversación:
- **3 preguntas por conversación** (1 inicial + 2 de seguimiento)
- Esto es para que puedas profundizar en un tema
- Cuando se acaba, simplemente seleccioná otro término para empezar una nueva conversación

### Ejemplo de uso:
1. Pregunta 1: "Explícalo simple"
2. Pregunta 2: "Dame un ejemplo con React"
3. Pregunta 3: "¿Cómo lo integro con Tailwind?"
4. ✨ Nueva conversación: Seleccioná otro término

---

## 🤖 Sobre el Modelo: GPT-4o Mini

Estamos usando `gpt-4o-mini`, que es:
- ⚡ Súper rápido
- 💰 Eficiente en costos
- 🎯 Optimizado para respuestas educativas
- 🌟 El modelo más reciente y eficiente de OpenAI

---

## ❓ Preguntas Frecuentes

### ¿Por qué hay límite de consultas?
Para mantener la app gratuita y sustentable. OpenAI cobra por cada consulta, y el límite nos ayuda a controlar los costos.

### ¿Se resetea el contador?
Sí, cada 2 horas automáticamente. También se resetea si cerrás y volvés a abrir el navegador después de un tiempo.

### ¿Puedo conseguir más consultas?
Sí, usando tu propia API key de OpenAI. Las primeras consultas son gratuitas en OpenAI también.

### ¿Qué pasó con Gemini?
Gemini se usa como fallback para usuarios (porque es más fácil de conseguir). El servidor usa OpenAI para garantizar calidad consistente, pero si se te acaban las consultas, podés usar tu propia clave de Gemini que es gratis y fácil de obtener.

### ¿Funciona offline?
No, necesitás conexión a internet porque se conecta con los servidores de OpenAI.

---

## 🎨 ¿Dónde veo el contador?

### En el Tutor:
Vas a ver dos contadores:
1. **Verde:** `{X}/10 consultas` - Tu límite de sesión
2. **Context Window:** Las 3 preguntas de la conversación actual

### En la Brújula:
Un contador verde arriba que dice `{X}/10 consultas`

---

## 🚀 Empezá a Usar

1. **Navegá a cualquier página del Dashboard**
2. **Hacé clic en el botón flotante ✨** (abajo a la derecha)
3. **Elegí tu modo:**
   - 🎓 Tutor (para términos específicos)
   - 🧭 Brújula (para buscar contenido)
4. **¡Hacé tu pregunta!**

---

**Última actualización:** 12 de Noviembre, 2024  
**Versión:** 1.0 con OpenAI GPT-4o Mini

