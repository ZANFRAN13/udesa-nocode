# Glosario de IA para crear productos digitales (vibecoding)

> Público: personas sin base técnica que quieren usar IA para imaginar, prototipar y lanzar productos digitales.
> Estructura: **Nombre**, **Descripción**, **Ejemplo**, **Términos relacionados**.

---

## Modelos fundacionales
**Descripción:** Modelos de IA grandes, entrenados con cantidades masivas de datos generales (texto, imágenes, audio, video) para aprender patrones amplios del mundo. Luego se adaptan a tareas específicas.
**Ejemplo:** GPT, Llama, Claude, Gemini o modelos de visión como CLIP; se usan “tal cual” para chatear, resumir o generar imágenes.
**Términos relacionados:** LLM, VLM, IA Generativa, Entrenamiento, Fine‑tuning, Multimodal, Parámetro, Transformer.

## LLM (Large Language Model)
**Descripción:** Modelo fundacional especializado en trabajar con **texto**: entiende, genera, traduce y razona en lenguaje natural.
**Ejemplo:** Pedirle a un LLM que proponga 10 nombres de marca y luego reescriba la descripción del producto en tono cercano.
**Términos relacionados:** Token, Contexto, Prompt, Temperatura, Entropía, Transformer, Razonamiento, SLM.

## SLM (Small Language Model)
**Descripción:** LLM más pequeño y liviano. Consume menos recursos, responde rápido y puede correr “en el borde” (celular/laptop). Suele rendir muy bien en tareas acotadas.
**Ejemplo:** Un SLM en una app móvil que resume correos sin conexión a Internet.
**Términos relacionados:** LLM, Fine‑tuning, Parámetro, Multimodal (si el SLM lo soporta).

## VLM (Vision‑Language Model)
**Descripción:** Modelo que combina **visión** e **idioma**. Puede “ver” imágenes/video y “hablar” sobre ellos o generar contenido a partir de lo que ve.
**Ejemplo:** Subir un wireframe dibujado a mano y pedirle sugerencias de UX o que genere el copy de la pantalla.
**Términos relacionados:** Multimodal, Embedding, IA Generativa, Transformer, LLM.

## IA Generativa
**Descripción:** Familia de métodos que **crean** contenido nuevo (texto, imágenes, audio, video, código) a partir de ejemplos previos.
**Ejemplo:** Generar una landing en texto + HTML con el tono de tu marca y varias variantes de héroe.
**Términos relacionados:** LLM, VLM, Prompt, Temperatura, Entropía, Razonamiento, Orquestación.

## Machine Learning (Aprendizaje Automático)
**Descripción:** Campo de la IA donde los sistemas aprenden patrones a partir de datos sin ser programados con reglas rígidas.
**Ejemplo:** Un modelo que aprende a predecir churn mirando el historial de uso de usuarios.
**Términos relacionados:** Deep Learning, Entrenamiento, Datos, Parámetro, Modelo fundacional.

## Deep Learning (Aprendizaje Profundo)
**Descripción:** Subcampo de ML que usa **redes neuronales** con muchas capas para aprender representaciones complejas.
**Ejemplo:** Reconocer objetos en fotos o convertir voz a texto con alta precisión.
**Términos relacionados:** Red Neuronal, Transformer, Entrenamiento, Parámetro.

## Red Neuronal
**Descripción:** Estructura de nodos (neuronas artificiales) conectados por “pesos” (parámetros). Cada capa transforma la información para resolver una tarea.
**Ejemplo:** Una red que convierte texto en un vector (embedding) y otra que lo usa para responder preguntas.
**Términos relacionados:** Deep Learning, Parámetro, Entrenamiento, Embedding.

## Token
**Descripción:** Unidad mínima de texto que procesa un LLM (trozos de palabra o palabras completas). Los modelos cuentan y limitan tokens en **entrada** (prompt + contexto) y **salida**.
**Ejemplo:** “vibecoding” puede dividirse en “vibe” + “coding” según el tokenizador. Un límite de 8k tokens marca cuánto texto cabe en una interacción.
**Términos relacionados:** Contexto, Prompt, Embedding, Parámetro.

## Embedding
**Descripción:** Representación numérica (vector) de un texto, imagen o audio que captura su **significado** para poder compararlo y buscarlo.
**Ejemplo:** Guardar embeddings de artículos del blog y, dado un prompt, buscar los más parecidos para alimentar un RAG.
**Términos relacionados:** RAG, Vector, Similaridad, VLM, LLM, Red Neuronal.

## Entropía
**Descripción:** Medida de **incertidumbre** en la predicción del modelo. Alta entropía = múltiples palabras posibles; baja = el modelo está muy seguro.
**Ejemplo:** En una pregunta ambigua (“¿háblame del banco?”), la entropía sube porque “banco” puede ser mueble o entidad financiera.
**Términos relacionados:** Temperatura, Muestreo, Probabilidades, Razonamiento.

## Temperatura
**Descripción:** Parámetro de generación que controla la **aleatoriedad**. 0 = más determinista; valores altos = más creativo/variado (pero con más riesgo de errores).
**Ejemplo:** Para brainstorming de slogans usar 0.8; para instrucciones legales usar 0.1.
**Términos relacionados:** Entropía, Top‑p, Muestreo, Prompt.

## Transformer
**Descripción:** Arquitectura de red neuronal clave en los modelos modernos. Usa **atención** para enfocarse en partes relevantes del input en paralelo.
**Ejemplo:** Un LLM basado en transformer entiende dependencias largas en un contrato de varias páginas.
**Términos relacionados:** LLM, VLM, Atención, Parámetro, Deep Learning.

## Agente de IA (≠ asistente)
**Descripción:** Sistema capaz de **actuar** de forma autónoma hacia una meta: decide, llama herramientas/APIs, lee/escribe archivos, navega y coordina pasos.
**Ejemplo:** Un agente que revisa analíticas, crea una campaña de anuncios, prueba variaciones y pausa las que rinden mal, sin intervención humana.
**Términos relacionados:** Orquestación, Herramientas, Razonamiento, Planificación, Asistente de IA, DAG, Threads.

## Asistente de IA (≠ agente)
**Descripción:** Interfaz conversacional enfocada en **ayudar al usuario** en tareas acotadas (explicar, resumir, reescribir). No actúa por sí sola; generalmente espera instrucciones.
**Ejemplo:** Un chat que reescribe el pitch de tu producto en tono más claro y sugiere mejoras.
**Términos relacionados:** Prompt, Contexto, LLM, Orquestación, Agente de IA.

## Entrenamiento (de un modelo)
**Descripción:** Proceso de ajustar los **parámetros** del modelo con datos para que aprenda patrones. Puede ser costoso en tiempo y computación.
**Ejemplo:** Entrenar un clasificador de tickets de soporte con históricos etiquetados.
**Términos relacionados:** Fine‑tuning, Datos, Red Neuronal, Deep Learning, Parámetro.

## Fine‑tuning (de un modelo)
**Descripción:** Ajuste **posterior** y específico de un modelo ya entrenado (fundacional) con tus propios datos para especializarlo.
**Ejemplo:** Afinar un LLM con FAQs y tono de marca para responder como tu soporte.
**Términos relacionados:** Entrenamiento, LLM, SLM, Parámetro, Instrucciones, Evaluación.

## Parámetro
**Descripción:** Número interno del modelo (peso) que determina cómo transforma entradas en salidas. Más parámetros no siempre = mejor para tu caso.
**Ejemplo:** Un LLM de 7B (siete mil millones) vs uno de 70B; el primero puede ser suficiente si tu tarea es simple y buscas velocidad.
**Términos relacionados:** Entrenamiento, Deep Learning, LLM/SLM, Eficiencia.

## Multimodal
**Descripción:** Capacidad de un modelo para manejar **múltiples tipos de datos** (texto, imagen, audio, video) en la misma interacción.
**Ejemplo:** Subir un video corto y pedir un guion + thumbnails + CTA para TikTok.
**Términos relacionados:** VLM, LLM, IA Generativa, Orquestación.

## Threads (Hilos)
**Descripción:** 1) En chats, una **conversación** con memoria. 2) En agentes, **líneas de trabajo** paralelas que coordinan subtareas.
**Ejemplo:** Un hilo por cliente donde el asistente recuerda su tono; o varios hilos en un agente que ejecutan scraping, análisis y redacción en paralelo.
**Términos relacionados:** Contexto, Orquestación, Agente de IA, DAG.

## Contexto
**Descripción:** Información que el modelo “tiene a mano” al responder: tu prompt, historial del hilo, documentos insertados, resultados de búsquedas, etc. Limita qué puede considerar.
**Ejemplo:** Añadir el brief del producto y los principios de marca como contexto mejora las respuestas del asistente.
**Términos relacionados:** Token, Prompt, RAG, Threads, MCP.

## Prompt
**Descripción:** Instrucciones o ejemplo(s) que le das al modelo. Un buen prompt define **rol, tarea, formato, restricciones** y puede incluir contexto y ejemplos.
**Ejemplo:** “Actúa como PM. Dame 3 propuestas de onboarding para una app de hábitos, con bullets, tono cercano y CTA claros.”
**Términos relacionados:** Contexto, LLM, Temperatura, Razonamiento, Orquestación.

## Razonamiento
**Descripción:** Capacidad del modelo/agente para **descomponer** problemas, planear pasos, usar herramientas y verificar resultados. Puede ser implícito o guiado por técnicas específicas.
**Ejemplo:** Pedir que explique su plan antes de ejecutar o que compare alternativas y justifique la elección.
**Términos relacionados:** Agente de IA, Orquestación, DAG, Evaluación.

## MCP (Model Context Protocol)
**Descripción:** Protocolo para conectar herramientas, datos y servicios externos a modelos/assistentes de forma estandarizada y segura, ampliando su **contexto** y acciones.
**Ejemplo:** Un asistente que, vía MCP, accede a tu Google Drive para leer briefs y a una API de analytics para traer métricas.
**Términos relacionados:** Orquestación, RAG, Contexto, Herramientas, Agente de IA.

## RAG (Retrieval‑Augmented Generation)
**Descripción:** Patrón donde antes de generar, el sistema **recupera** (retrieve) información relevante de una base (por ejemplo con embeddings) y la pasa al modelo como contexto.
**Ejemplo:** Un chatbot que responde preguntas sobre tu documentación interna buscando párrafos relacionados y citándolos.
**Términos relacionados:** Embedding, Vector DB, Contexto, LLM, MCP, Orquestación, Agente de IA.

## DAG (Directed Acyclic Graph / Grafo Acíclico Dirigido)
**Descripción:** Estructura para modelar **flujos** de pasos (nodos) con dependencias dirigidas y sin ciclos. Útil para pipelines reproducibles.
**Ejemplo:** Un flujo de: *ingesta de datos → limpieza → embeddings → RAG → evaluación*, donde cada paso depende del anterior.
**Términos relacionados:** Orquestación, Razonamiento, Agente de IA, Threads.

## Orquestación / Orquestador
**Descripción:** Capa que **coordina** modelos, herramientas, datos, prompts, memoria y flujos (DAG/threads) para lograr un resultado consistente y seguro.
**Ejemplo:** Un orquestador que: 1) recibe una tarea de usuario, 2) decide si usar un SLM o LLM, 3) llama a RAG, 4) ejecuta un agente con permisos limitados, 5) valida y entrega el output.
**Términos relacionados:** Agente de IA, Asistente de IA, MCP, RAG, DAG, Contexto, Prompt.

## Alucinación
**Descripción:** Cuando un modelo genera información **incorrecta** o inventada con seguridad, como si fuera verdad.
**Ejemplo:** El asistente asegura que existe una “API de pagos ZetaPay” de tu banco cuando en realidad no existe.
**Términos relacionados:** RAG, Contexto, Evaluación, Temperatura, Entropía, Orquestación.

## Context Engineering (Ingeniería de contexto)
**Descripción:** Práctica de **preparar y seleccionar** la información que el modelo verá antes de responder: documentos, datos, ejemplos, estilo, políticas y memoria. Busca **reducir alucinaciones** y mejorar la utilidad.
**Ejemplo:** Para un bot de soporte, recuperar (con RAG) solo los 5 párrafos más relevantes del manual y añadir el tono de marca y políticas de reembolso.
**Términos relacionados:** RAG, Prompt Engineering, Contexto, MCP, Orquestación, Embedding.

## Prompt Engineering (Ingeniería de prompts)
**Descripción:** Técnica de **diseñar instrucciones** claras y efectivas: rol, tarea, formato, restricciones, ejemplos y criterios de evaluación.
**Ejemplo:** “Eres un redactor UX. Escribe microcopys para onboarding en 3 variantes A/B, voz cercana, 120–160 caracteres, con CTA. Devuelve en tabla.”
**Términos relacionados:** Prompt, Razonamiento, Contexto, Temperatura, Orquestación, Evaluación.

## Context Window (Ventana de contexto)
**Descripción:** Capacidad **máxima** de información (medida en **tokens**) que el modelo puede considerar **a la vez**. Si el texto supera el límite, hay que **resumir, seleccionar o recuperar** lo importante.
**Ejemplo:** Un modelo con 8k tokens no puede leer un PDF de 50k tokens completo; se usa RAG para traer solo las secciones relevantes.
**Términos relacionados:** Token, Contexto, RAG, Embedding, Límite de tokens.

## Atención (Attention)
**Descripción:** Mecanismo de los modelos tipo **Transformer** que permite “enfocarse” en las partes más relevantes del input, ponderando qué palabras o elementos se relacionan entre sí.
**Ejemplo:** Para entender “El botón *Guardar* no funciona y da error 502”, el modelo presta más atención a “no funciona” y “error 502” que a conectores.
**Términos relacionados:** Transformer, LLM, VLM, Parámetro, Razonamiento.

## Vector
**Descripción:** Lista ordenada de números que representa información de manera que se pueda **comparar** por distancia o similaridad. Los **embeddings** son vectores.
**Ejemplo:** Convertir cada artículo de tu help center en un vector y buscar los más cercanos al query del usuario para construir una respuesta con RAG.
**Términos relacionados:** Embedding, Vector DB, Similaridad, RAG, LLM, VLM.


---

## Mini‑guía práctica para vibecoding
- **Primero el problema y la audiencia.** La tecnología (LLM/SLM/VLM) es el medio, no el fin.
- **Diseña prompts como brief creativo.** Rol, tarea, formato, límites y ejemplos.
- **Contexto curado.** RAG con tus fuentes confiables; evita ruido.
- **Temperatura según objetivo.** Baja para precisión; alta para creatividad.
- **Empieza simple.** SLM + RAG suele alcanzar; sube a LLM grandes si falta calidad.
- **Orquesta con seguridad.** Define permisos de agentes y logs de cada paso.

## Consejos rápidos de uso
- **Primero el contexto, luego el prompt:** selecciona la info útil (context engineering) y recién después redacta el prompt.
- **Cuida la ventana de contexto:** recorta y prioriza; no pegues documentos enormes sin filtrar.
- **Evalúa y mitiga alucinaciones:** cita fuentes, pide “si no estás seguro, di ‘no sé’”, y usa RAG.
