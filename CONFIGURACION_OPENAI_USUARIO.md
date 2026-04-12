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

Hay **dos cosas distintas** (no las mezcles):

### 1) Límite de la app (10 consultas cada 2 horas)
- Cuando llegás a ese tope, tenés que **esperar** el tiempo que indica el mensaje.
- **No** aparece el recuadro azul para pegar una clave de Gemini por esto: **no** es un fallo de OpenAI, es el control de uso de la plataforma.

### 2) El servicio OpenAI del sitio va “al límite” (muchos usos a la vez)
- Ahí **sí** puede aparecer el panel azul para pegar una **clave de Google AI Studio (Gemini)** — gratis, empieza con `AIza`.
- Pasos:
  1. Abrí https://aistudio.google.com/api-keys
  2. Creá la clave y copiala
  3. Pegala en el recuadro cuando la app te lo pida y volvé a enviar la pregunta

**Importante:** Esa clave **no es** una clave de OpenAI (`sk-...`); la app usa OpenAI con la cuenta del proyecto; Gemini solo como respaldo en ese caso.

### ¿Es seguro pegar la clave?
- No la guardamos en una base de datos.
- Se envía solo cuando hacés la consulta; podés cerrar el popup cuando quieras.

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

### ¿Puedo conseguir más consultas cuando se acaba el cupo de 10/2h?
No con otra clave: ese límite es de la app. Tenés que esperar o usar otro navegador/sesión según lo que indique el mensaje.

### ¿Qué es Gemini entonces?
Es **opcional** y solo entra si el **OpenAI del servidor** está temporalmente saturado (límite de uso del proveedor). En ese caso podés pegar una clave de Google AI Studio; no reemplaza a las 10 consultas de la app.

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

**Última actualización:** abril 2026  
**Versión:** OpenAI GPT-4o Mini + respaldo Gemini (usuario) solo ante límite de OpenAI del servidor

