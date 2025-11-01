# 🤖 Guía del Asistente IA con Gemini

## ¿Qué es esta funcionalidad?

El **Asistente IA con Gemini** es una herramienta interactiva que permite a los usuarios consultar a una inteligencia artificial (Gemini Flash 2.5) sobre cualquier término o concepto del glosario de desarrollo. Está diseñada para hacer el aprendizaje más accesible e interactivo.

## 🎯 ¿Para qué sirve?

Esta funcionalidad permite:
- **Obtener explicaciones alternativas** de cualquier término (por ejemplo, "explícalo como si tuviera 5 años")
- **Consultar cómo integrar conceptos** en tu flujo de vibecoding
- **Pedir ejemplos prácticos** de uso
- **Hacer preguntas específicas** sobre cualquier contenido del glosario

## 🚀 Cómo usar el Asistente IA

### Paso 1: Activar el Asistente

1. Ve a la página del **Glosario de Desarrollo** (Dashboard → Glosario de Desarrollo)
2. Verás un **botón flotante circular** con el ícono de estrella (✨) en la esquina inferior derecha
3. Haz clic en el botón para **activar** el modo asistente
   - El botón cambiará a color morado/rosa brillante con una X
   - Aparecerá un mensaje indicando que el modo está activo

### Paso 2: Seleccionar contenido

1. Con el asistente activo, **pasa el mouse** sobre cualquier contenido de texto
2. Los contenedores con texto se **resaltarán** con un borde punteado morado
3. **Haz clic** en el texto que quieras consultar

### Paso 3: Hacer tu pregunta

1. Al hacer clic, aparecerá un **popup** al lado del contenido seleccionado
2. Verás el texto seleccionado en una vista previa
3. Tienes dos opciones:
   - **Usar un prompt rápido**: Haz clic en uno de los botones sugeridos:
     - "Explícalo como si tuviera 5 años"
     - "¿Cómo lo integro en mi flujo de vibecoding?"
     - "Dame un ejemplo práctico"
     - "¿Cuándo debería usarlo?"
   - **Escribir tu propia pregunta**: Escribe en el campo de texto y presiona el botón de enviar (➤)

### Paso 4: Recibir la respuesta y continuar la conversación

1. El asistente procesará tu pregunta
2. Verás un ícono de carga mientras esperas
3. La respuesta de Gemini aparecerá como un mensaje en el chat
4. **¡NUEVO!** Puedes hacer **hasta 2 repreguntas de seguimiento**:
   - La IA recordará todo el contexto anterior
   - No necesitas repetir información
   - Puedes profundizar o pedir más detalles
   - Total: 3 preguntas por conversación (1 inicial + 2 de seguimiento)
5. El contador te mostrará cuántas preguntas te quedan
6. Cuando alcances el límite, cierra y selecciona otro contenido para una nueva conversación

### Paso 5: Desactivar cuando termines

1. Haz clic nuevamente en el **botón flotante** para desactivar el modo asistente
2. El botón volverá a su estado normal
3. Los elementos ya no se resaltarán al pasar el mouse

## ⚙️ Configuración Técnica

### Obtener tu API Key de Gemini

1. Ve a [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en "Create API Key" (Crear clave de API)
4. Copia la clave generada

### Configurar la variable de entorno

1. Abre tu archivo `.env.local` (o créalo si no existe)
2. Agrega esta línea con tu API key:

```env
GEMINI_API_KEY=tu_api_key_aquí
```

3. Guarda el archivo
4. Reinicia el servidor de desarrollo:

```bash
npm run dev
```

### Verificar la configuración

Si ves un error "API key no configurada" al usar el asistente, significa que:
- No agregaste la variable de entorno
- El nombre de la variable está mal escrito
- No reiniciaste el servidor después de agregarla

## 📝 Casos de uso

### Ejemplo 1: Explicación simplificada
**Contenido seleccionado**: "API (Application Programming Interface)"  
**Pregunta**: "Explícalo como si tuviera 5 años"  
**Uso**: Para entender conceptos complejos de forma simple

### Ejemplo 2: Integración práctica
**Contenido seleccionado**: "Variables de entorno"  
**Pregunta**: "¿Cómo lo integro en mi flujo de vibecoding?"  
**Uso**: Para saber cómo aplicar el concepto en tu trabajo

### Ejemplo 3: Ejemplos específicos
**Contenido seleccionado**: "Endpoint"  
**Pregunta**: "Dame un ejemplo práctico"  
**Uso**: Para ver casos reales de uso

### Ejemplo 4: Momento de uso
**Contenido seleccionado**: "Testing"  
**Pregunta**: "¿Cuándo debería usarlo?"  
**Uso**: Para saber el momento apropiado de aplicar el concepto

## 🎨 Características Visuales

- **Botón flotante**: Siempre visible en la esquina inferior derecha
- **Indicador de estado**: Muestra cuando el modo está activo
- **Resaltado en hover**: Los elementos interactivos se resaltan en morado
- **Popup contextual**: Aparece cerca del contenido seleccionado
- **Posicionamiento inteligente**: El popup se ajusta automáticamente para no salirse de la pantalla
- **Scroll adaptable**: Si la respuesta es muy larga, el popup tiene scroll interno
- **Prompts sugeridos**: Botones rápidos para consultas comunes (solo en la primera pregunta)
- **Interfaz de chat**: Mensajes del usuario a la derecha (morado), respuestas de la IA a la izquierda
- **Contador de preguntas**: Te indica cuántas preguntas te quedan (máximo 3 por conversación)
- **Auto-scroll**: Se desplaza automáticamente al último mensaje
- **Respuestas con formato enriquecido**: Soporte completo para markdown incluyendo:
  - **Negritas** para términos importantes
  - *Itálicas* para énfasis
  - Listas numeradas y con viñetas
  - `Bloques de código` para comandos
  - Subtítulos y estructura jerárquica
  - Enlaces clickeables
  - Código con resaltado de sintaxis

## 🔧 Componentes creados

### Archivos nuevos:
- `app/api/gemini/route.ts` - API route para conectar con Gemini
- `components/glossary/gemini-helper.tsx` - Botón flotante y lógica de selección
- `components/glossary/gemini-popup.tsx` - Popup con input y respuestas
- `components/glossary/gemini-markdown-styles.css` - Estilos para renderizado de markdown

### Archivos modificados:
- `app/dashboard/glossary/development/page.tsx` - Integración del asistente
- `env.template` - Configuración de la API key
- `package.json` - Dependencia de `@google/generative-ai`

## 💡 Consejos de uso

1. **Sé específico**: Cuanto más específica sea tu pregunta, mejor será la respuesta
2. **Usa el contexto**: El asistente tiene acceso al texto que seleccionaste, aprovéchalo
3. **Prueba diferentes preguntas**: Si una respuesta no te satisface, reformula tu pregunta
4. **Desactiva cuando no uses**: Para evitar clicks accidentales
5. **Selecciona texto relevante**: El asistente funciona mejor con contenido completo

## 🆘 Solución de problemas

### El botón no aparece
- Verifica que estás en la página del Glosario de Desarrollo
- Refresca la página

### No puedo seleccionar texto
- Asegúrate de que el modo esté activo (botón morado/rosa)
- Intenta con elementos que contengan más texto

### Las respuestas no aparecen
- Verifica tu conexión a internet
- Confirma que la API key está configurada correctamente
- Revisa la consola del navegador para ver errores

### Error "API key no configurada"
- Agrega la variable `GEMINI_API_KEY` en tu `.env.local`
- Reinicia el servidor de desarrollo

## 📚 Tecnologías utilizadas

- **Gemini Flash 2.5**: Modelo de IA de Google para generación de texto
- **Next.js API Routes**: Para el backend de la funcionalidad
- **React Hooks**: Para el manejo de estado y efectos
- **React Markdown**: Para renderizar respuestas con formato enriquecido
- **Remark GFM**: Para soporte de GitHub Flavored Markdown
- **Tailwind CSS**: Para el diseño visual
- **Lucide Icons**: Para los íconos de la interfaz

---

¿Dudas o problemas? Esta funcionalidad está diseñada para hacer tu experiencia de aprendizaje más interactiva y personalizada. ¡Experimenta y aprende a tu ritmo! ✨

