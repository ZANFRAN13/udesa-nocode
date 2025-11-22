# **Guía rápida para testear un MVP (webApp)**

**Objetivo:** validar si tu producto entrega valor real y qué hay que mejorar, sin volverte loco con miles de métricas.

---

## **Paso 1: Define qué querés aprender y tu *tarea clave***

**1.1. Anotá en una frase el problema que querés validar**

“Ayudar a \[tipo de usuario\] a \[resultado deseado\] sin tener que \[solución actual molesta\].”

Ejemplo:

“Ayudar a freelancers a agendar reuniones con clientes sin tener que coordinar por WhatsApp.”

**1.2. Define la *tarea clave*** (acción principal en tu app)

Preguntate:

“¿Qué acción, si el usuario la hace, significa que mi producto le dio valor?”

Ejemplos de tarea clave:

* Crear y enviar un link de reunión.

* Crear y compartir un proyecto.

* Subir un archivo y compartirlo.

* Completar una reserva.

**Qué NO es tarea clave:** solo registrarse o entrar al dashboard.

**Herramientas útiles:**

* Para dibujar el flujo y la tarea clave: FigJam o Miro.

---

## **Paso 2: Elige a quién vas a testear (usuarios)**

**2.1. Define tu usuario ideal en 3 líneas (tus *early adopters* {i: aquellos más propensos a usar y pagar por tu producto apenas lanzado antes que el resto})**

* Rol: “freelancers de diseño”, “dueños de pequeños negocios”, etc.

* Problema actual: qué usan hoy (Excel, WhatsApp, nada…).

* Frecuencia: ¿lo hacen seguido? (semanal, diario, mensual).

**2.2. Consigue 5–8 personas que cumplan ese perfil**

Lugares:

* Gente que ya conocés.

* Comunidades, grupos, foros.

* LinkedIn / redes, con mensajes personalizados.

No hace falta más para empezar.

**Herramientas útiles:**

* Para armar un formulario corto para identificar early adopters {i: no hace falta que hagas un form si ya los identificaste}: Google Forms, Typeform.

* Para agendar las entrevistas: Calendly, Google Calendar.

* Para llevar lista de candidatos: Google Sheets, Airtable.

---

## **Paso 3: Define tu North Star Metric (NSM) y 3 métricas básicas**

### **3.1. NSM (tu métrica principal)**

Que sea:

“Cantidad de usuarios que completan la **tarea clave** en la primera semana.”

Ejemplos:

* “Usuarios que crean y envían al menos 1 link de reunión.”

* “Usuarios que crean y comparten al menos 1 proyecto.”

### **3.2. Métricas básicas (no más de 3–4)**

1. **Adquisición**

   * Cantidad de usuarios que llegan a mi producto.

2. **Activación {i: Ahá\! moment: momento en que el usuario se da cuenta que tu producto le entrega valor}**

   * Cantidad de usuarios que completan la **tarea clave** (%).

3. **Retención temprana**

   * % de usuarios que vuelven a entrar a la app dentro de 7 días.

Opcional si tenés pagos:  
 4\. **Pago**

* % de usuarios que pagan o piden una demo.

**Herramientas útiles:**

* Para métricas de producto más adelante: Mixpanel, Amplitude, PostHog.

Recursos útiles: 

[https://pablomarketer.es/que-es-funnel-aarrr/](https://pablomarketer.es/que-es-funnel-aarrr/) 

---

## **Paso 4: Configura analytics mínimo**

No te compliques, pero mide lo esencial.

**4.1. Páginas clave**

* `visit_home`

* `visit_sign_up`

* `visit_dashboard`

**4.2. Eventos clave {i: Los eventos permiten medir interacciones o repeticiones concretas en un sitio web o aplicación.}**

* `sign_up`

* `login`

* `tarea_clave_iniciada` (ej: `crear_proyecto`)

* `tarea_clave_completada` (ej: `proyecto_compartido`)

Opcional:

* `click_cta_principal {i: CTA = Call To Action; formas en las que atraes a tu usuario hacia realizar la tarea clave. Ej: botón que dice “Descargá ahora”}`

* `pago_exitoso` (si aplica)

**4.3. Funnels básicos**

1. `visit_home` → `sign_up`

2. `sign_up` → `tarea_clave_completada`

Con eso ya podés ver dónde se cae la gente.

**Herramientas útiles:**

* Para tráfico, páginas y eventos: Google Analytics, Mixpanel, PostHog, Amplitude.

* Para ver grabaciones y mapas de calor: Hotjar, Microsoft Clarity.

Recursos útiles: 

[https://userpilot.com/blog/user-analytics/\#what-is-user-analytics](https://userpilot.com/blog/user-analytics/#what-is-user-analytics) 

[https://userpilot.medium.com/a-comprehensive-guide-to-user-analytics-tools-methods-7a7f6954ba52](https://userpilot.medium.com/a-comprehensive-guide-to-user-analytics-tools-methods-7a7f6954ba52) 

---

## **Paso 5: Elige el tipo de prueba**

Según tu situación:

1. **Solo tenés una versión muy inicial / fea pero funcional**

   * Usa **test de usabilidad moderado** (videollamada): mirás cómo usan la app y les das tareas para realizar.

2. **Tenés pocos usuarios, sin mucho tráfico**

   * Test de usabilidad moderado \+ algunos tests no moderados (mandar link \+ encuesta corta).

3. **Ya tenés tráfico decente**

   * Podés sumar **A/B tests** (distintas versiones de una pantalla) \+ entrevistas cortas.

Si estás empezando, casi siempre te alcanza con:

5–8 tests de usabilidad moderados \+ analytics básico.

**Herramientas útiles:**

* Para tests moderados (videollamada): Zoom, Google Meet.

* Para tests no moderados y encuestas in‑app: Maze, Useberry.

* Para A/B tests cuando tengas más tráfico: Google Optimize (o alternativas del proveedor de tu front/AB framework) o herramientas de experimentación de tu stack.

Recursos útiles: 

[https://userpilot.com/blog/user-feedback-survey-saas/](https://userpilot.com/blog/user-feedback-survey-saas/) [https://www.usertesting.com/blog/moderated-vs-unmoderated-usability-testing](https://www.usertesting.com/blog/moderated-vs-unmoderated-usability-testing)   
[https://www.nngroup.com/articles/remote-usability-tests/](https://www.nngroup.com/articles/remote-usability-tests/) 

---

## **Paso 6: Corre sesiones simples con usuarios**

Duración sugerida: **30–40 minutos** por persona.

**6.1. Guion simple**

1. **Inicio (5 min)**

   * Gracias por el tiempo.

   * “Estamos probando el producto, no a vos.”

   * Pedir permiso para grabar (si grabás).

2. **Contexto (5–10 min)**

   * ¿Cómo resolvés hoy \[problema\]?

   * ¿Qué herramientas usás?

   * ¿Qué es lo más molesto de ese proceso?

3. **Prueba en la app (15–20 min)**  
    Pedí que hagan la **tarea clave {i: No le muestres cómo hacerlo. La idea es ver si logra hacerlo y con qué esfuerzo.}**, por ejemplo:

   * “Registrate y creá \[X\].”

   * “Compartí \[X\] con alguien.”

4. Indicaciones:

   * Pediles: “Pensá en voz alta, contame qué estás esperando que pase.”

   * Evitá guiarlos. Si se traban, preguntá:

      “¿Qué harías ahora?” en vez de decirles dónde hacer clic.

5. **Cierre (5–10 min)**

   * ¿Qué te gustó más?

   * ¿Qué fue lo más confuso?

   * “Si mañana esto desaparece, ¿te importaría? ¿Por qué?”

**6.2. Qué anotar mientras tanto**

* Dónde se traban.

* Qué no entienden.

* Frases textuales (ej: “No sé qué hacer ahora”, “No entiendo esta parte”).

* Momento exacto en que logran (o no) la tarea clave.

**Herramientas útiles:**

* Para videollamadas y compartir pantalla: Zoom, Google Meet.

* Para grabar sesiones rápidas: Loom.

---

## **Paso 7: Analiza lo que pasó (sin volverte loco)**

### **7.1. Mira números básicos**

Respuestas que querés:

* De 100 visitas, ¿cuántos se registran?

* De los que se registran, ¿cuántos completan la tarea clave?

* De los que completan la tarea clave, ¿cuántos vuelven en 7 días?

Con eso ya ves tu “embudo”.

### **7.2. Junta lo numérico con lo que viste en las sesiones**

Ejemplo:

* Dato: “Solo el 25% de los registrados completan la tarea clave.”

* Observación: “En las sesiones, 4 de 6 personas se traban en el paso 2 del formulario.”

De ahí sale un **insight {i: Un descubrimiento o idea reveladora que nos da la clave para poder resolver un problema.}**:

“El formulario de registro es una fricción grande; la gente se cansa antes de llegar a la tarea clave.”

**Herramientas útiles:**

* Para analizar datos básicos: Google Sheets, Excel.

* Para consolidar insights de entrevistas: Notion, Airtable.

* Para ver funnels y cohortes: Google Analytics, Mixpanel, Amplitude, PostHog.

---

## **Paso 8: Decide qué cambiar (y en qué orden)**

Usá este mini filtro para cada idea de cambio:

1. **Impacto**:  
    ¿Cuánto podría ayudar a que más usuarios completen la tarea clave? (Bajo / Medio / Alto)

2. **Esfuerzo**:  
    ¿Cuánto tiempo les lleva al equipo? (Bajo / Medio / Alto)

3. **Confianza**:  
    ¿Qué tan fuerte es la evidencia de que esto ayuda? (Baja / Media / Alta)

Prioriza cosas de:

* **Alto impacto**

* **Bajo esfuerzo**

* **Confianza media/alta**

Ejemplos típicos de cambios fáciles y útiles:

* Mejorar textos (“microcopy”) en los pasos clave.

* Sacar campos innecesarios del registro.

* Agregar un ejemplo visual de la tarea clave ya hecha.

* Hacer más visible el botón que lleva a la tarea clave.

**Herramientas útiles:**

* Para organizar el backlog: Trello, Jira, Linear.

* Para registrar hipótesis y decisiones: Notion, Confluence.

---

## **Paso 9: Repite el ciclo**

Pensalo como un loop:

1. **Defino hipótesis**

    “Si simplifico el registro, más gente va a llegar a la tarea clave.”

2. **Hago cambios pequeños**  
    Ej: menos campos, mejor texto.

3. **Mido 1–2 métricas**  
    Ej: % registro → tarea clave.

4. **Aprendo**

   * ¿Subió, bajó o quedó igual?

   * ¿Qué dicen ahora los usuarios?

5. **Decido**

   * ¿Escalar este cambio?

   * ¿Probar otra cosa?

No hace falta hacerlo perfecto, solo **iterar**.

**Herramientas útiles:**

* Para planificar y trackear ciclos (sprints): Asana, ClickUp, Jira.

* Para documentar aprendizajes por iteración: Notion, Google Docs.

---

Esta guía rápida está pensada como paso a paso para empezar. Podés adaptarla a tu producto marcando en cada sección tus propias respuestas (problema, tarea clave, métricas, cambios, etc.).

