export interface DevTerm {
  id: string
  name: string
  category: string
  description: string
  relatedTerms?: string[]
  example?: string
  codeExample?: string
  imageUrl?: string
  imageUrls?: string[]
  tags?: string[]
}

export const devTermsData: DevTerm[] = [
  {
    id: "api",
    name: "API (Application Programming Interface)",
    category: "Backend",
    description: "Conjunto de reglas y protocolos que permite que diferentes aplicaciones se comuniquen entre sí. Define cómo los componentes de software deben interactuar.",
    relatedTerms: ["rest", "endpoint", "api-key", "http", "http-errors"],
    example: "Cuando abres Instagram en tu teléfono, la app usa una API para obtener tus fotos desde los servidores de Instagram. Es como un camarero que lleva tu pedido a la cocina y te trae la comida.",
    tags: ["basics"]
  },
  {
    id: "backend",
    name: "Backend",
    category: "Architecture",
    description: "La parte del software que maneja la lógica de negocio, *[bases de datos](#databases)* y procesamiento del servidor. No es visible para el usuario final.",
    relatedTerms: ["frontend", "server", "databases", "api", "fullstack"],
    example: "El backend de una red social maneja el almacenamiento de posts, *[autenticación](#authentication)* de usuarios y envío de notificaciones.",
    tags: ["basics"]
  },
  {
    id: "frontend",
    name: "Frontend",
    category: "Architecture",
    description: "La parte del software que interactúa directamente con el usuario. Incluye la interfaz de usuario y la experiencia visual.",
    relatedTerms: ["backend", "components", "responsive-design", "client", "fullstack"],
    example: "La página web que ves en el navegador, con botones, formularios y animaciones, es el frontend de una aplicación.",
    tags: ["basics"]
  },
  {
    id: "framework",
    name: "Framework",
    category: "Development",
    description: "Conjunto de herramientas y *[library](#library)* predefinidas que proporciona una estructura base para desarrollar aplicaciones más rápidamente.",
    relatedTerms: ["library", "components"],
    example: "React para interfaces web, Django para Python, o Express.js para Node.js son frameworks populares.",
    tags: ["basics"]
  },
  {
    id: "library",
    name: "Librería (Library)",
    category: "Development",
    description: "Colección de código reutilizable que proporciona funcionalidades específicas para ser utilizadas en otros programas.",
    relatedTerms: ["framework", "dependency", "open-source"],
    example: "Como una caja de herramientas: una librería de matemáticas te da *[funciones](#functions)* para calcular, una librería de fechas te ayuda a manejar calendarios, o una librería de gráficos te permite crear gráficos sin escribir todo el código desde cero."
  },
  {
    id: "version-control",
    name: "Control de Versiones (Version Control)",
    category: "Development",
    description: "Sistema que registra cambios en archivos a lo largo del tiempo, permitiendo volver a versiones anteriores y colaborar en equipo.",
    relatedTerms: ["git", "github", "commit", "branch", "merge"],
    example: "*[git](#git)* permite rastrear cambios en código, crear *[branch](#branch)* para nuevas funcionalidades y *[merge](#merge)* trabajo de diferentes desarrolladores."
  },
  {
    id: "repository",
    name: "Repositorio (Repository)",
    category: "Development",
    description: "Almacén central donde se guarda el código fuente de un proyecto, junto con su historial de cambios y metadatos.",
    relatedTerms: ["git", "github", "version-control", "commit", "branch"],
    example: "Un repositorio en *[github](#github)* contiene todo el código de una aplicación web, incluyendo *[documentation](#documentation)* y configuración."
  },
  {
    id: "server",
    name: "Servidor (Server)",
    category: "Infrastructure",
    description: "Computadora o programa que proporciona servicios, recursos o datos a otros dispositivos (*[client](#client)*) en una red.",
    relatedTerms: ["client", "backend", "deployment", "localhost", "port", "api"],
    example: "Un servidor web como Apache o Nginx que entrega páginas web a los navegadores de los usuarios."
  },
  {
    id: "client",
    name: "Cliente (Client)",
    category: "Architecture",
    description: "Aplicación o dispositivo que solicita servicios o recursos a un *[server](#server)*. En web, típicamente es el navegador.",
    relatedTerms: ["server", "frontend", "client-server"],
    example: "Tu navegador web (Chrome, Firefox) es un cliente que solicita páginas web a *[server](#server)*."
  },
  {
    id: "http",
    name: "HTTP (HyperText Transfer Protocol)",
    category: "Protocols",
    description: "Protocolo de comunicación que permite la transferencia de información en la web entre *[client](#client)* y *[server](#server)*.",
    relatedTerms: ["rest", "api", "ssl-tls"],
    example: "Cuando escribes una URL en el navegador, se envía una petición HTTP GET al *[server](#server)* para obtener la página."
  },
  {
    id: "rest",
    name: "REST (Representational State Transfer)",
    category: "Backend",
    description: "Arquitectura de software para diseñar *[api](#api)* web que utiliza métodos *[http](#http)* estándar (GET, POST, PUT, DELETE).",
    relatedTerms: ["api", "http", "endpoint", "json", "backend"],
    example: "Una *[api](#api)* REST permite obtener usuarios con GET /api/users, crear uno nuevo con POST /api/users."
  },
  {
    id: "json",
    name: "JSON (JavaScript Object Notation)",
    category: "Data Formats",
    description: "Formato de intercambio de datos ligero y fácil de leer, basado en la sintaxis de JavaScript.",
    relatedTerms: ["api", "data-structures"],
    example: "{\"nombre\": \"Juan\", \"edad\": 30, \"ciudad\": \"Buenos Aires\"} es un objeto JSON con información de usuario."
  },
  {
    id: "authentication",
    name: "Autenticación (Authentication)",
    category: "Security",
    description: "Proceso de verificar la identidad de un usuario, típicamente mediante credenciales como usuario y contraseña.",
    relatedTerms: ["authorization", "sso", "encryption", "cookies", "session-storage"],
    example: "El login en una aplicación web donde ingresas email y contraseña para acceder a tu cuenta.",
    tags: ["basics"]
  },
  {
    id: "authorization",
    name: "Autorización (Authorization)",
    category: "Security",
    description: "Proceso de determinar qué acciones o recursos puede acceder un usuario *[authentication](#authentication)*.",
    relatedTerms: ["authentication", "rls", "sso", "api-key"],
    example: "Un usuario administrador puede eliminar posts, mientras que un usuario normal solo puede crear y editar los suyos."
  },
  {
    id: "encryption",
    name: "Encriptación (Encryption)",
    category: "Security",
    description: "Proceso de convertir información en un formato ilegible para protegerla de accesos no autorizados.",
    relatedTerms: ["ssl-tls", "authentication"],
    example: "Las contraseñas se almacenan encriptadas en la *[base de datos](#databases)*, no en texto plano."
  },
  {
    id: "ssl-tls",
    name: "SSL/TLS",
    category: "Security",
    description: "Protocolos de seguridad que encriptan la comunicación entre navegadores y *[servidores](#server)* web.",
    relatedTerms: ["encryption", "http"],
    example: "El candado verde en la barra de direcciones indica que el sitio usa SSL/TLS para proteger tus datos."
  },
  {
    id: "caching",
    name: "Caché (Caching)",
    category: "Performance",
    description: "Técnica de almacenar datos temporalmente en una ubicación de acceso rápido para mejorar el *[performance](#performance)*.",
    relatedTerms: ["cdn", "performance"],
    example: "Un navegador guarda imágenes en caché para no descargarlas nuevamente en visitas posteriores."
  },
  {
    id: "cdn",
    name: "CDN (Content Delivery Network)",
    category: "Infrastructure",
    description: "Red de *[servidores](#server)* distribuidos geográficamente que entrega contenido web más rápido a los usuarios.",
    relatedTerms: ["caching", "performance"],
    example: "Cloudflare o AWS CloudFront distribuyen imágenes y videos desde *[servidores](#server)* cercanos al usuario."
  },
  {
    id: "responsive-design",
    name: "Diseño Responsive",
    category: "Frontend",
    description: "Enfoque de diseño web que hace que las páginas se adapten automáticamente a diferentes tamaños de pantalla.",
    relatedTerms: ["mobile-first", "web-app-responsive"],
    example: "Una página web que se ve bien tanto en desktop como en móvil, ajustando el layout automáticamente.",
    tags: ["basics"]
  },
  {
    id: "mobile-first",
    name: "Mobile First",
    category: "Frontend",
    description: "Metodología de diseño que prioriza la experiencia móvil, diseñando primero para pantallas pequeñas.",
    relatedTerms: ["responsive-design", "mobile-app"],
    example: "Comenzar el diseño de una aplicación web optimizada para móvil y luego expandir para desktop."
  },
  {
    id: "progressive-web-app",
    name: "Progressive Web App (PWA)",
    category: "Frontend",
    description: "Aplicación web que utiliza tecnologías modernas para ofrecer una experiencia similar a las apps nativas. La diferencia con una Web App convencional es que una PWA puede funcionar offline y ser instalada como una app en el dispositivo mientras que una Web App se ejecuta en el navegador.",
    relatedTerms: ["single-page-application", "web-app-responsive"],
    example: "Una PWA puede funcionar offline, enviar notificaciones y ser instalada como una app en el dispositivo."
  },
  {
    id: "single-page-application",
    name: "Single Page Application (SPA)",
    category: "Frontend",
    description: "Aplicación web que carga una sola página HTML y actualiza el contenido dinámicamente sin recargar la página.",
    relatedTerms: ["progressive-web-app", "routes", "framework"],
    example: "Gmail, Facebook o aplicaciones construidas con React, Vue o Angular son SPAs."
  },
  {
    id: "microservices",
    name: "Microservicios (Microservices)",
    category: "Architecture",
    description: "Arquitectura de software que divide una aplicación en servicios pequeños e independientes que se comunican entre sí.",
    relatedTerms: ["api", "container", "docker"],
    example: "Una aplicación de e-commerce puede tener microservicios separados para usuarios, productos, pagos y envíos."
  },
  {
    id: "container",
    name: "Contenedor (Container)",
    category: "DevOps",
    description: "Unidad de software que empaqueta código y *[dependencias](#dependency)* para ejecutarse de manera consistente en cualquier entorno.",
    relatedTerms: ["docker", "kubernetes", "dependency"],
    example: "*[Docker](#docker)* permite crear contenedores que incluyen la aplicación y todas sus dependencias."
  },
  {
    id: "docker",
    name: "Docker",
    category: "DevOps",
    description: "Plataforma que permite crear, desplegar y ejecutar aplicaciones usando *[contenedores](#container)* virtualizados.",
    relatedTerms: ["container", "kubernetes", "deployment"],
    example: "Docker permite que una aplicación funcione igual en desarrollo, testing y producción."
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    category: "DevOps",
    description: "Sistema de orquestación de *[contenedores](#container)* que automatiza el despliegue, escalado y gestión de aplicaciones.",
    relatedTerms: ["docker", "container", "scalability"],
    example: "Kubernetes puede manejar automáticamente el escalado de una aplicación cuando aumenta la demanda."
  },
  {
    id: "ci-cd",
    name: "CI/CD (Continuous Integration/Continuous Deployment)",
    category: "DevOps",
    description: "Prácticas de desarrollo que automatizan la integración de código y el despliegue de aplicaciones.",
    relatedTerms: ["testing", "deployment", "github"],
    example: "*[GitHub](#github)* Actions ejecuta *[pruebas](#testing)* automáticamente cuando se hace *[push](#push)* y despliega la aplicación si todo está bien."
  },
  {
    id: "testing",
    name: "Testing (Pruebas)",
    category: "Development",
    description: "Proceso de verificar que el software funciona correctamente mediante la ejecución de pruebas automatizadas o manuales.",
    relatedTerms: ["unit-test", "integration-test", "debugging"],
    example: "*[unit-test](#unit-test)* verifican *[funciones](#functions)* individuales, *[integration-test](#integration-test)* verifican que los *[componentes](#components)* trabajen juntos."
  },
  {
    id: "unit-test",
    name: "Prueba Unitaria (Unit Test)",
    category: "Testing",
    description: "Prueba que verifica el funcionamiento de una unidad específica de código (*[función](#functions)*, método, clase) de forma aislada.",
    relatedTerms: ["testing", "integration-test", "functions"],
    example: "Una prueba unitaria verifica que una *[función](#functions)* de cálculo de impuestos devuelva el resultado correcto."
  },
  {
    id: "integration-test",
    name: "Prueba de Integración (Integration Test)",
    category: "Testing",
    description: "Prueba que verifica la interacción entre diferentes *[componentes](#components)* o módulos de una aplicación.",
    relatedTerms: ["testing", "unit-test"],
    example: "Una prueba de integración verifica que el login funcione correctamente con la *[base de datos](#databases)* y el *[frontend](#frontend)*."
  },
  {
    id: "agile",
    name: "Metodología Ágil (Agile)",
    category: "Methodology",
    description: "Enfoque de desarrollo de software que enfatiza la colaboración, flexibilidad y entrega iterativa de valor.",
    relatedTerms: ["scrum", "user-story", "mvp"],
    example: "*[scrum](#scrum)* y Kanban son metodologías ágiles que organizan el trabajo en sprints cortos con entregas frecuentes."
  },
  {
    id: "scrum",
    name: "Scrum",
    category: "Methodology",
    description: "Framework *[agile](#agile)* que organiza el trabajo en sprints de 1-4 semanas con roles definidos y ceremonias regulares.",
    relatedTerms: ["agile", "user-story", "mvp", "testing"],
    example: "Un equipo Scrum tiene un Product Owner, Scrum Master y desarrolladores que trabajan en sprints de 2 semanas."
  },
  {
    id: "user-story",
    name: "Historia de Usuario (User Story)",
    category: "Methodology",
    description: "Descripción simple de una funcionalidad desde la perspectiva del usuario final.",
    relatedTerms: ["agile", "scrum", "mvp", "documentation"],
    example: "Como usuario, quiero poder restablecer mi contraseña para poder acceder a mi cuenta si la olvido."
  },
  {
    id: "mvp",
    name: "MVP (Minimum Viable Product)",
    category: "Methodology",
    description: "Versión de un producto con las funcionalidades mínimas necesarias para ser útil a los primeros usuarios.",
    relatedTerms: ["agile", "user-story"],
    example: "Un MVP de una red social podría incluir solo registro, login, crear posts y ver posts de otros usuarios."
  },
  {
    id: "refactoring",
    name: "Refactoring (Refactorización)",
    category: "Development",
    description: "Proceso de mejorar el código existente sin cambiar su funcionalidad externa, enfocándose en la calidad y mantenibilidad.",
    relatedTerms: ["code-review", "functions", "variables"],
    example: "Reorganizar *[funciones](#functions)* duplicadas, mejorar nombres de *[variables](#variables)* o simplificar lógica compleja sin cambiar el comportamiento."
  },
  {
    id: "code-review",
    name: "Revisión de Código (Code Review)",
    category: "Development",
    description: "Proceso donde otros desarrolladores revisan el código antes de integrarlo al proyecto principal.",
    relatedTerms: ["pull-request", "git", "github", "refactoring", "testing"],
    example: "Un desarrollador crea un *[pull-request](#pull-request)* y otros miembros del equipo revisan el código y sugieren mejoras."
  },
  {
    id: "documentation",
    name: "Documentación (Documentation)",
    category: "Development",
    description: "Conjunto de documentos que explican cómo usar, mantener y entender un sistema de software.",
    relatedTerms: ["code-review", "repository", "user-story", "api"],
    example: "README files, comentarios en código, guías de API y manuales de usuario son tipos de documentación."
  },
  {
    id: "debugging",
    name: "Debugging (Depuración)",
    category: "Development",
    description: "Proceso de identificar, analizar y corregir errores o bugs en el código de software. En VibeCoding se suele copiar y pegar los *[console-log](#console-log)* en el chat para que lo arregle la IA.",
    relatedTerms: ["console-log", "testing", "logging", "bug", "ide"],
    example: "Usar herramientas como breakpoints, logs o debuggers para encontrar por qué una *[función](#functions)* no funciona correctamente.",
    tags: ["basics"]
  },
  {
    id: "performance",
    name: "Rendimiento (Performance)",
    category: "Quality",
    description: "Medida de qué tan rápido y eficientemente funciona una aplicación bajo diferentes condiciones.",
    relatedTerms: ["caching", "scalability", "cdn"],
    example: "Optimizar el tiempo de carga de una página web, reducir el uso de memoria o mejorar la velocidad de consultas a *[bases de datos](#databases)*."
  },
  {
    id: "scalability",
    name: "Escalabilidad (Scalability)",
    category: "Architecture",
    description: "Capacidad de un sistema para manejar un aumento en la carga de trabajo manteniendo el *[performance](#performance)*.",
    relatedTerms: ["performance", "kubernetes", "microservices"],
    example: "Una aplicación que puede manejar 100 usuarios debe poder escalar para manejar 10,000 usuarios sin problemas."
  },
  {
    id: "monitoring",
    name: "Monitoreo (Monitoring)",
    category: "DevOps",
    description: "Proceso de observar y medir el *[performance](#performance)* y salud de una aplicación en tiempo real.",
    relatedTerms: ["logging", "performance"],
    example: "Herramientas como New Relic o DataDog monitorean errores, tiempo de respuesta y uso de recursos de una aplicación."
  },
  {
    id: "logging",
    name: "Logging (Registro de Eventos)",
    category: "DevOps",
    description: "Práctica de registrar eventos y actividades de una aplicación para facilitar el *[debugging](#debugging)* y *[monitoring](#monitoring)*.",
    relatedTerms: ["debugging", "monitoring", "console-log"],
    example: "Registrar cuando un usuario se loguea, cuando ocurre un error, o cuándo se procesa una transacción."
  },
  {
    id: "open-source",
    name: "Código Abierto (Open Source)",
    category: "Development",
    description: "Software cuyo código fuente está disponible públicamente y puede ser modificado y distribuido libremente.",
    relatedTerms: ["library", "github", "repository"],
    example: "Linux, React, Node.js y muchas *[librerías](#library)* de JavaScript son proyectos de código abierto."
  },
  {
    id: "git",
    name: "Git",
    category: "Development",
    description: "Sistema de *[control de versiones](#version-control)* distribuido que permite rastrear cambios en archivos y coordinar trabajo en equipo.",
    relatedTerms: ["github", "version-control", "commit", "branch", "merge", "pull", "push", "ide"],
    example: "Git permite crear *[ramas](#branch)* para nuevas funcionalidades, *[fusionar](#merge)* cambios y mantener un historial completo del proyecto.",
    tags: ["basics"]
  },
  {
    id: "github",
    name: "GitHub",
    category: "Development",
    description: "Plataforma de hosting para *[repositorios](#repository)* *[Git](#git)* que facilita la colaboración y gestión de proyectos de software.",
    relatedTerms: ["git", "repository", "pull-request", "open-source", "ci-cd"],
    example: "GitHub permite subir código, crear *[pull request](#pull-request)*, gestionar issues y colaborar en proyectos de *[código abierto](#open-source)*.",
    tags: ["basics"]
  },
  {
    id: "pull-request",
    name: "Pull Request (PR)",
    category: "Development",
    description: "Propuesta de cambios en un *[repositorio](#repository)* que solicita *[fusionar](#merge)* código de una *[rama](#branch)* a otra.",
    relatedTerms: ["merge", "branch", "github", "code-review", "git"],
    example: "Un desarrollador crea una PR para fusionar su nueva funcionalidad con la *[rama](#branch)* principal del proyecto."
  },
  {
    id: "merge",
    name: "Merge (Fusión)",
    category: "Development",
    description: "Proceso de combinar cambios de diferentes *[ramas](#branch)* o *[commits](#commit)* en una sola rama.",
    relatedTerms: ["branch", "pull-request", "git", "commit", "version-control"],
    example: "Fusionar una *[rama](#branch)* de nueva funcionalidad con la rama principal después de aprobar un *[pull request](#pull-request)*."
  },
  {
    id: "branch",
    name: "Rama (Branch)",
    category: "Development",
    description: "Línea de desarrollo independiente que permite trabajar en funcionalidades sin afectar el código principal.",
    relatedTerms: ["git", "merge", "commit", "pull-request", "version-control"],
    example: "Crear una rama 'feature/nuevo-login' para desarrollar una nueva funcionalidad de *[autenticación](#authentication)*."
  },
  {
    id: "commit",
    name: "Commit",
    category: "Development",
    description: "Punto en el historial de *[Git](#git)* que representa un conjunto de cambios específicos en el código.",
    relatedTerms: ["git", "branch", "merge", "push", "version-control"],
    example: "Un commit puede representar la adición de una nueva función, corrección de un bug o actualización de *[documentación](#documentation)*.",
    codeExample: `# Comandos básicos de Git para commits
git add .                    # Agregar todos los cambios
git commit -m "Mensaje"      # Crear commit con mensaje
git commit -am "Mensaje"      # Agregar y commitear en un paso

# Ejemplos de mensajes de commit
git commit -m "Agregar función de login"
git commit -m "Corregir bug en validación"
git commit -m "Actualizar documentación"`,
    tags: ["basics"]
  },
  {
    id: "programming-languages",
    name: "Lenguajes de Programación",
    category: "Development",
    description: "Conjunto de instrucciones y reglas que permiten a los programadores crear software. Cada lenguaje tiene su sintaxis y propósito específico.",
    relatedTerms: ["framework", "library", "functions", "variables", "data-types"],
    example: "JavaScript para web, Python para data science, Java para aplicaciones empresariales, o Swift para iOS.",
    tags: ["basics"]
  },
  {
    id: "data-types",
    name: "Tipos de Datos",
    category: "Development",
    description: "Clasificación que define qué tipo de información puede almacenar una *[variable](#variables)* y qué operaciones se pueden realizar con ella.",
    relatedTerms: ["variables", "data-structures"],
    example: `🔢 Integer (int)

Qué es:
Un número entero sin decimales, que puede ser positivo, negativo o cero. Es el tipo de dato más básico para contar y hacer matemáticas simples.

Para qué se usa:
Contar elementos (cantidad de productos en carrito), identificadores (ID de usuario), edades, años, posiciones en listas, o cualquier valor que no necesite decimales.

Cómo se ve:
\`\`\`javascript
let edad = 25;
let cantidadProductos = 10;
let temperatura = -5;
let año = 2024;
\`\`\`

---

🎯 Float (decimal)

Qué es:
Un número con decimales (punto flotante). Permite representar valores fraccionarios y medidas precisas.

Para qué se usa:
Precios ($19.99), medidas (1.75 metros), porcentajes (0.15 = 15%), coordenadas GPS, cálculos científicos, o cualquier valor que necesite precisión decimal.

Cómo se ve:
\`\`\`javascript
let precio = 19.99;
let altura = 1.75;
let descuento = 0.15;  // 15%
let pi = 3.14159;
\`\`\`

---

📝 String (texto)

Qué es:
Una cadena de caracteres (letras, números, símbolos) que representa texto. Se escribe entre comillas.

Para qué se usa:
Nombres, direcciones, mensajes, emails, URLs, descripciones, cualquier información textual que necesites mostrar o procesar.

Cómo se ve:
\`\`\`javascript
let nombre = "María García";
let email = "maria@ejemplo.com";
let mensaje = 'Hola, ¿cómo estás?';
let html = \`<h1>Título</h1>\`;  // Template literal
\`\`\`

---

🔤 Char (carácter)

Qué es:
Un único carácter (una letra, número o símbolo). JavaScript no tiene un tipo específico para esto, se usa un string de longitud 1.

Para qué se usa:
Iniciales de nombres, calificaciones (A, B, C), símbolos individuales, teclas presionadas, o cuando necesitas trabajar con un solo carácter.

Cómo se ve:
\`\`\`javascript
// En JavaScript se usan strings de 1 carácter
let inicial = "M";
let calificacion = "A";
let simbolo = "@";
let respuesta = "S";  // Sí
\`\`\`

---

✅ Boolean (bool)

Qué es:
Un valor lógico que solo puede ser verdadero (true) o falso (false). Es la base de todas las decisiones en programación.

Para qué se usa:
Condiciones (¿está logueado?, ¿es mayor de edad?), estados (activo/inactivo), permisos, switches on/off, validaciones de formularios.

Cómo se ve:
\`\`\`javascript
let estaLogueado = true;
let esMayorDeEdad = false;
let tieneDescuento = true;
let formularioValido = false;
\`\`\`

---

⚫ NULL

Qué es:
Representa la ausencia intencional de valor. Es diferente a "vacío", significa "intencionalmente sin valor".

Para qué se usa:
Indicar que una variable existe pero no tiene valor asignado todavía, resetear valores, o representar la ausencia de un objeto.

Cómo se ve:
\`\`\`javascript
let usuarioSeleccionado = null;  // Ninguno seleccionado aún
let foto = null;  // No hay foto cargada
let respuesta = null;  // Esperando respuesta del servidor

// Verificar null
if (usuarioSeleccionado === null) {
  console.log("No hay usuario seleccionado");
}
\`\`\`

---

❌ NaN (Not a Number)

Qué es:
Un valor especial que significa "No es un Número". Se produce cuando intentas hacer operaciones matemáticas inválidas.

Para qué se usa:
Detectar errores en cálculos matemáticos, validar que el input del usuario sea numérico, o manejar operaciones imposibles.

Cómo se ve:
\`\`\`javascript
let resultado = 0 / 0;  // NaN
let conversion = parseInt("abc");  // NaN
let operacion = "texto" * 5;  // NaN

// Verificar NaN (¡importante!)
if (isNaN(resultado)) {
  console.log("El resultado no es un número válido");
}

// NaN es especial: NaN !== NaN (¡es true!)
\`\`\`

---

❓ Undefined

Qué es:
Significa que una variable ha sido declarada pero no se le ha asignado ningún valor. Es el valor por defecto de variables no inicializadas.

Para qué se usa:
Detectar variables sin inicializar, verificar parámetros opcionales de funciones, o identificar propiedades que no existen en objetos.

Cómo se ve:
\`\`\`javascript
let sinValor;  // undefined (declarada pero no asignada)
console.log(sinValor);  // undefined

// Propiedad que no existe
let persona = {nombre: "Ana"};
console.log(persona.edad);  // undefined

// Parámetro opcional
function saludar(nombre) {
  if (nombre === undefined) {
    return "Hola, extraño";
  }
  return \`Hola, \${nombre}\`;
}
\`\`\``,
    tags: ["basics"]
  },
  {
    id: "data-structures",
    name: "Estructuras de Datos",
    category: "Development",
    description: "Formas organizadas de almacenar y acceder a datos de manera eficiente, cada una optimizada para diferentes tipos de operaciones.",
    relatedTerms: ["data-types", "variables", "json"],
    example: `📋 Array (Arreglo o Lista)

Qué es:
Una colección ordenada de elementos que se identifican por su posición (índice). Es como una fila de cajones numerados donde cada cajón puede guardar un valor.

Para qué se usa:
Guardar listas de elementos del mismo tipo (lista de productos, usuarios, nombres). Ideal cuando necesitas acceder a elementos por su posición o recorrer todos los elementos en orden.

Cómo se ve:
\`\`\`javascript
let frutas = ["manzana", "banana", "naranja"];
// Acceder: frutas[0] → "manzana"
// Agregar: frutas.push("uva")
// Longitud: frutas.length → 4
\`\`\`

---

📦 Object (Objeto)

Qué es:
Una colección de pares clave-valor, como un diccionario. Cada propiedad tiene un nombre (clave) y un valor asociado.

Para qué se usa:
Representar entidades con múltiples características (un usuario con nombre, email, edad). Perfecto cuando necesitas organizar información relacionada bajo un mismo concepto.

Cómo se ve:
\`\`\`javascript
let usuario = {
  nombre: "Ana",
  edad: 25,
  email: "ana@email.com",
  activo: true
};
// Acceder: usuario.nombre → "Ana"
// Modificar: usuario.edad = 26
\`\`\`

---

🎯 Set (Conjunto)

Qué es:
Una colección de valores únicos, sin duplicados y sin orden específico. Como una bolsa donde no puedes meter dos cosas idénticas.

Para qué se usa:
Eliminar duplicados de una lista, verificar si un elemento existe, o guardar valores únicos (tags únicos, IDs de usuarios visitantes).

Cómo se ve:
\`\`\`javascript
let tags = new Set(["javascript", "react", "javascript"]);
// Resultado: Set {"javascript", "react"}
// Agregar: tags.add("nodejs")
// Verificar: tags.has("react") → true
// Tamaño: tags.size → 3
\`\`\`

---

🗺️ Map (Mapa o Diccionario)

Qué es:
Una colección de pares clave-valor donde las claves pueden ser de cualquier tipo (no solo strings como en objetos). Como un directorio telefónico mejorado.

Para qué se usa:
Asociar valores con claves específicas, crear cachés, o guardar configuraciones. Mejor que objetos cuando las claves son dinámicas o no son strings.

Cómo se ve:
\`\`\`javascript
let precios = new Map();
precios.set("manzana", 2.50);
precios.set("banana", 1.80);
// Obtener: precios.get("manzana") → 2.50
// Verificar: precios.has("banana") → true
// Eliminar: precios.delete("manzana")
\`\`\`

---

📚 Stack (Pila)

Qué es:
Una estructura LIFO (Last In, First Out - último en entrar, primero en salir). Como una pila de platos: solo puedes agregar o quitar del tope.

Para qué se usa:
Historial de navegación (botón "Volver"), deshacer/rehacer acciones, evaluar expresiones matemáticas, o gestionar llamadas de funciones.

Cómo se ve:
\`\`\`javascript
// Usando array como stack
let historial = [];
historial.push("/home");    // Agregar al tope
historial.push("/productos");
historial.push("/carrito");
// Quitar del tope: historial.pop() → "/carrito"
// Ver el tope: historial[historial.length - 1]
\`\`\`

---

🎫 Queue (Cola)

Qué es:
Una estructura FIFO (First In, First Out - primero en entrar, primero en salir). Como una fila de personas: el primero que llega es el primero en ser atendido.

Para qué se usa:
Procesar tareas en orden de llegada (cola de impresión, procesamiento de mensajes, sistema de turnos), o implementar sistemas de mensajería.

Cómo se ve:
\`\`\`javascript
// Usando array como queue
let colaTareas = [];
colaTareas.push("tarea1");   // Agregar al final
colaTareas.push("tarea2");
colaTareas.push("tarea3");
// Procesar: colaTareas.shift() → "tarea1" (quita del inicio)
// Ver siguiente: colaTareas[0]
\`\`\`

---

🔒 Tuple (Tupla)

Qué es:
Una colección ordenada e inmutable de elementos de longitud fija. Una vez creada, no puedes cambiar sus valores ni su tamaño. Como una caja sellada con compartimentos numerados.

Para qué se usa:
Representar datos que no deben cambiar (coordenadas geográficas, códigos RGB de colores, pares clave-valor fijos). Ideal cuando necesitas garantizar que los datos permanezcan constantes.

Cómo se ve:
\`\`\`javascript
// JavaScript no tiene tuplas nativas, pero podemos simularlas
// Usando array como tupla (por convención no se modifica)
const coordenadas = [40.7128, -74.0060]; // [latitud, longitud]
const colorRGB = [255, 128, 0]; // [red, green, blue]

// En TypeScript puedes definirlas explícitamente
// let punto: [number, number] = [10, 20];
// punto = [30, 40]; // OK: reasignar
// punto[0] = 50;    // OK en runtime, pero TypeScript lo permite
// punto.push(60);   // Evitar: rompe la estructura de tupla

// Uso común: retornar múltiples valores
function obtenerCoordenadas() {
  return [40.7128, -74.0060]; // Devuelve una tupla
}
const [lat, lng] = obtenerCoordenadas(); // Desestructuración
\`\`\``,
    tags: ["basics"]
  },
  {
    id: "algorithms",
    name: "Algoritmo",
    category: "Development",
    description: "Secuencia de pasos lógicos y ordenados para resolver un problema específico o realizar una tarea computacional.",
    relatedTerms: ["functions", "control-structures"],
    example: "Como una receta de cocina: 'Si no hay ingredientes, ve al supermercado. Si hay ingredientes, cocina la comida.' Los algoritmos son pasos lógicos que le dicen a la computadora qué hacer en cada situación.",
    codeExample: `// Algoritmo para encontrar el número más grande
PASO 1: Tomar la primera lista de números
PASO 2: Comparar cada número con el anterior
PASO 3: Guardar el número más grande encontrado
PASO 4: Repetir hasta revisar todos los números
PASO 5: Mostrar el número más grande`,
    tags: ["basics"]
  },
  {
    id: "control-structures",
    name: "Estructuras de Control",
    category: "Development",
    description: "Instrucciones que determinan el flujo de ejecución de un programa, permitiendo tomar decisiones y repetir acciones.",
    relatedTerms: ["algorithms", "functions"],
    example: `🔀 Condicionales (if/else)

Cómo funciona:
Permiten que el programa tome decisiones y ejecute diferentes acciones según si una condición es verdadera o falsa. Es como un camino que se bifurca.

Caso de uso:
Si un usuario ingresa la contraseña correcta, mostrar el dashboard; si no, mostrar un mensaje de error. O si el carrito de compras supera $1000, aplicar un descuento del 10%.

---

🔄 Bucles o Loops (for, while)

Cómo funciona:
Repiten una acción múltiples veces hasta que se cumpla una condición de salida. Como hacer la misma tarea una y otra vez automáticamente.

Caso de uso:
Mostrar todos los productos de una tienda online (recorrer la lista uno por uno). O enviar un email de bienvenida a 1000 usuarios nuevos sin tener que hacerlo manualmente.

---

🎯 Switch

Cómo funciona:
Evalúa una variable y ejecuta diferentes bloques de código según su valor. Es útil cuando tienes múltiples opciones posibles.

Caso de uso:
En un menú de navegación, si el usuario hace clic en "Inicio" mostrar la página principal, si hace clic en "Productos" mostrar el catálogo, si hace clic en "Contacto" mostrar el formulario. Es más claro que tener muchos if/else encadenados.

---

⏹️ Break y Continue

Cómo funciona:
Controlan el comportamiento de los bucles. Break detiene el bucle completamente, y Continue salta a la siguiente iteración sin terminar la actual.

Caso de uso:
En una búsqueda de productos, usar break para detener el bucle cuando encuentres el producto que buscas (no tiene sentido seguir buscando). O usar continue para saltar productos sin stock y seguir mostrando solo los disponibles.`,
    tags: ["basics"]
  },
  {
    id: "functions",
    name: "Funciones",
    category: "Development",
    description: "Bloques de código reutilizables que realizan una tarea específica y pueden recibir parámetros y devolver resultados.",
    relatedTerms: ["variables", "input-output", "algorithms", "components"],
    example: "Como una máquina expendedora: le das dinero (parámetros), presionas un botón, y te devuelve lo que pediste (resultado). Las funciones son 'máquinas' que toman información, la procesan, y te devuelven el resultado.",
    codeExample: `// Ejemplo de función simple
function calcularTotal(precio, cantidad) {
  return precio * cantidad;  // Devuelve el resultado
}

// Uso de la función
let total = calcularTotal(10, 3);  // total = 30`,
    tags: ["basics"]
  },
  {
    id: "input-output",
    name: "Input / Output (Entrada / Salida)",
    category: "Development",
    description: "Input (entrada) es la información que un programa recibe del usuario o de otra fuente. Output (salida) es la información que el programa muestra o devuelve como resultado. Es la forma en que los programas se comunican con el mundo exterior.",
    relatedTerms: ["functions", "console-log", "variables"],
    example: "Cuando llenas un formulario en una web (escribes tu nombre, email, contraseña), esos son inputs. Cuando la web te muestra un mensaje de 'Registro exitoso', ese es el output. En una calculadora: los números que ingresas son inputs, el resultado que ves es el output.",
    codeExample: `// Input: Recibir información
let nombre = prompt("¿Cuál es tu nombre?");  // Input del usuario

// Procesamiento
let saludo = "¡Hola, " + nombre + "!";

// Output: Mostrar resultado
alert(saludo);                               // Output en ventana
console.log(saludo);                         // Output en consola

// Función con input y output
function sumar(a, b) {          // a y b son inputs
  return a + b;                 // El resultado es el output
}

let resultado = sumar(5, 3);    // Input: 5 y 3
console.log(resultado);         // Output: 8`,
    tags: ["basics"]
  },
  {
    id: "web-app-responsive",
    name: "Web App",
    category: "Frontend",
    description: "Aplicación que funciona en el navegador web y se puede acceder desde cualquier dispositivo con internet. No necesita instalarse, se ejecuta directamente en navegadores como Chrome, Firefox o Safari.",
    relatedTerms: ["frontend", "progressive-web-app", "single-page-application", "responsive-design"],
    example: "Gmail, Google Docs, Netflix, Spotify Web, o tiendas online como Mercado Libre. Abres el navegador, entras a la dirección web y ya puedes usar la aplicación sin descargar nada.",
    tags: ["basics"]
  },
  {
    id: "desktop-app",
    name: "App Desktop",
    category: "Frontend",
    description: "Aplicación que se ejecuta en sistemas operativos de escritorio, optimizada para mouse, teclado y pantallas grandes.",
    relatedTerms: ["web-app-responsive", "mobile-app", "frontend"],
    example: "Microsoft Word, Photoshop, o aplicaciones de escritorio que se instalan en Windows, Mac o Linux.",
    tags: ["basics"]
  },
  {
    id: "mobile-app",
    name: "App Mobile",
    category: "Frontend",
    description: "Aplicación diseñada específicamente para dispositivos móviles, optimizada para pantallas táctiles y uso en movimiento.",
    relatedTerms: ["web-app-responsive", "desktop-app", "mobile-first", "progressive-web-app"],
    example: "WhatsApp, Instagram, o apps bancarias que se descargan desde App Store o Google Play.",
    tags: ["basics"]
  },
  {
    id: "components",
    name: "Componentes",
    category: "Frontend",
    description: "Piezas reutilizables de interfaz de usuario que encapsulan una funcionalidad y pueden combinarse para crear aplicaciones complejas. Se crea una vez y se puede usar en múltiples lugares de la app.",
    relatedTerms: ["frontend", "framework", "functions", "routes"],
    example: "Botón, formulario de login, tarjeta de producto, o header de navegación que se puede usar en múltiples páginas.",
    codeExample: `// Ejemplo de componente React
function BotonPersonalizado({ texto, color }) {
  return (
    <button style={{ backgroundColor: color }}>
      {texto}
    </button>
  );
}

// Uso del componente
<BotonPersonalizado texto="Guardar" color="blue" />
<BotonPersonalizado texto="Cancelar" color="red" />`,
    tags: ["basics"]
  },
  {
    id: "api-key",
    name: "API Key",
    category: "Backend",
    description: "Identificador único que autentica y autoriza el acceso a una *[api](#api)*, actuando como contraseña para servicios externos.",
    relatedTerms: ["api", "authentication", "environment-variables"],
    example: "Clave para acceder a la *[api](#api)* de Google Maps, API key de OpenAI para ChatGPT, o token de Twitter para publicar tweets.",
    tags: ["basics"]
  },
  {
    id: "endpoint",
    name: "Endpoint",
    category: "Backend",
    description: "URL específica donde una *[api](#api)* recibe peticiones y devuelve respuestas. Es el punto de entrada a un servicio web.",
    relatedTerms: ["api", "rest", "routes"],
    example: "https://api.github.com/users para obtener datos de usuario, o /api/products para gestionar productos en una tienda.",
    tags: ["basics"]
  },
  {
    id: "environment-variables",
    name: "Variables de Entorno",
    category: "Development",
    description: "Valores configurables que se almacenan fuera del código y permiten ajustar el comportamiento de una aplicación según el entorno.",
    relatedTerms: ["api-key", "development-environments", "variables"],
    example: "DATABASE_URL para conexión a *[base de datos](#databases)*, API_KEY para servicios externos, o DEBUG_MODE para activar logs detallados.",
    codeExample: `// Variables de entorno en un archivo .env
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
API_KEY=sk-1234567890abcdef
DEBUG_MODE=true

// Uso en el código
const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;`,
    tags: ["basics"]
  },
  {
    id: "development-environments",
    name: "Entornos de Programación",
    category: "DevOps",
    description: "Diferentes configuraciones donde se ejecuta una aplicación: desarrollo (dev), staging (stg) y producción (prod).",
    relatedTerms: ["environment-variables", "deployment"],
    example: "Dev para programar, Staging para pruebas antes del lanzamiento, y Producción para usuarios finales.",
    tags: ["basics"]
  },
  {
    id: "pull",
    name: "Pull",
    category: "Development",
    description: "Comando de Git que descarga y fusiona cambios desde un repositorio remoto al repositorio local.",
    relatedTerms: ["git", "push", "merge", "repository", "github"],
    example: "git pull para obtener los últimos cambios del equipo, o pull request para revisar cambios antes de fusionarlos.",
    codeExample: `# Comandos de Git para obtener cambios
git pull                      # Obtener cambios del repositorio remoto
git pull origin main          # Obtener cambios de la rama main
git pull --rebase             # Obtener cambios y reorganizar commits

# Verificar cambios antes de hacer pull
git fetch                     # Ver qué cambios hay disponibles
git log --oneline origin/main # Ver commits remotos`,
    tags: ["basics"]
  },
  {
    id: "push",
    name: "Push",
    category: "Development",
    description: "Comando de Git que sube los cambios locales a un repositorio remoto, sincronizando el trabajo con el equipo.",
    relatedTerms: ["git", "pull", "commit", "repository", "github"],
    example: "git push para subir commits al repositorio en GitHub, o push de una nueva funcionalidad al servidor.",
    codeExample: `# Comandos de Git para subir cambios
git push                      # Subir commits a la rama actual
git push origin main          # Subir a la rama main específicamente
git push -u origin main       # Subir y configurar rama principal

# Subir nueva rama
git push -u origin nueva-rama # Crear y subir nueva rama
git push --force              # Forzar push (usar con cuidado)`,
    tags: ["basics"]
  },
  {
    id: "deploy",
    name: "Deploy (Despliegue / Release)",
    category: "DevOps",
    description: "Proceso de poner una aplicación en funcionamiento en un servidor para que los usuarios puedan acceder a ella. Un Release es una versión oficial numerada que se publica, mientras que Deploy es el acto técnico de subirla.",
    relatedTerms: ["ci-cd", "development-environments", "testing"],
    example: `Es como subir una foto a Instagram: tu app está en tu computadora, pero para que otros la vean, necesitas 'subirla' a un servidor en internet. Deploy es ese proceso de 'subir' tu app para que funcione en la web.

Release vs Deploy: Un 'Release v2.5.0' es la versión oficial (como un álbum de música), mientras que 'Deploy' es el acto de subirlo al servidor (como publicarlo en Spotify). Puedes hacer muchos deploys del mismo release (por ejemplo, desplegar a staging, luego a producción).

Ejemplo de releases:
- v1.0.0 → Primera versión oficial
- v1.1.0 → Nueva funcionalidad
- v1.1.1 → Corrección de bug
- v2.0.0 → Cambios grandes

Cuando ves 'Release v1.5.0' en GitHub, incluye notas como: '✨ Nuevas funcionalidades: Dark mode, notificaciones. 🐛 Correcciones: Login mejorado'.`,
    tags: ["basics"]
  },
  {
    id: "routes",
    name: "Rutas",
    category: "Frontend",
    description: "URLs que definen las diferentes páginas o secciones de una aplicación web, mapeando direcciones a *[componentes](#components)* específicos.",
    relatedTerms: ["components", "single-page-application", "endpoint"],
    example: "/home para la página principal, /profile para perfil de usuario, o /products/:id para páginas de productos específicos.",
    tags: ["basics"]
  },
  {
    id: "databases",
    name: "Bases de Datos",
    category: "Backend",
    description: "Sistemas organizados para almacenar, gestionar y recuperar información de manera estructurada y eficiente.",
    relatedTerms: ["backend", "rls", "api"],
    example: "Imagina una biblioteca gigante donde puedes guardar y encontrar información rápidamente. Las bases de datos son como bibliotecas digitales que almacenan todos los datos de una app: usuarios, productos, mensajes, etc.",
    tags: ["basics"]
  },
  {
    id: "client-server",
    name: "Arquitectura Cliente-Servidor",
    category: "Architecture",
    description: "Modelo donde el *[client](#client)* (*[frontend](#frontend)*) solicita servicios al *[server](#server)* (*[backend](#backend)*), que procesa y devuelve respuestas.",
    relatedTerms: ["client", "server", "frontend", "backend"],
    example: "Tu navegador (*[client](#client)*) solicita una página web al *[server](#server)*, que la procesa y envía el HTML de vuelta.",
    tags: ["basics"]
  },
  {
    id: "sso",
    name: "SSO (Single Sign-On)",
    category: "Security",
    description: "Sistema de *[authentication](#authentication)* que permite a los usuarios acceder a múltiples aplicaciones con una sola credencial.",
    relatedTerms: ["authentication", "authorization"],
    example: "Iniciar sesión con Google para acceder a Gmail, YouTube y Drive, o login corporativo para todas las herramientas de la empresa.",
    tags: ["basics"]
  },
  {
    id: "rls",
    name: "RLS (Row Level Security)",
    category: "Backend",
    description: "Mecanismo de seguridad en *[bases de datos](#databases)* que controla el acceso a filas específicas basado en el usuario autenticado.",
    relatedTerms: ["databases", "authentication", "authorization"],
    example: "Un usuario solo puede ver sus propios posts, o un empleado solo accede a datos de su departamento en la base de datos.",
    tags: ["basics"]
  },
  {
    id: "dependency",
    name: "Dependencia",
    category: "Development",
    description: "Paquete o librería externa que tu proyecto necesita para funcionar correctamente. Son herramientas que otros desarrolladores crearon y que tú puedes usar.",
    relatedTerms: ["library", "framework", "container", "open-source"],
    example: "React es una dependencia para crear interfaces web, o Express.js es una dependencia para crear servidores en Node.js.",
    codeExample: `# Ver dependencias instaladas
npm list                    # Ver todas las dependencias
npm list --depth=0         # Ver solo dependencias directas

# Instalar nueva dependencia
npm install react           # Instalar React
npm install --save-dev jest # Instalar Jest para testing

# package.json muestra las dependencias
{
  "dependencies": {
    "react": "^18.0.0",
    "express": "^4.18.0"
  }
}`,
    tags: ["basics"]
  },
  {
    id: "fullstack",
    name: "Fullstack",
    category: "Architecture",
    description: "Desarrollador que trabaja tanto en el *[frontend](#frontend)* (interfaz de usuario) como en el *[backend](#backend)* (lógica del servidor) de una aplicación. Conoce todo el stack tecnológico.",
    relatedTerms: ["frontend", "backend", "databases"],
    example: "Un desarrollador fullstack puede crear una app web completa: desde el diseño de la interfaz hasta la *[base de datos](#databases)* y la lógica del *[servidor](#server)*.",
    codeExample: `# Stack tecnológico típico de un fullstack
Frontend: React, Vue, Angular
Backend: Node.js, Python, Java
Base de datos: PostgreSQL, MongoDB
Servidor: Express, Django, Spring

# Ejemplo de proyecto fullstack
- Frontend: React para la interfaz
- Backend: Node.js + Express para la API
- Base de datos: PostgreSQL para datos
- Deploy: Heroku o AWS para hosting`,
    tags: ["basics"]
  },
  {
    id: "variables",
    name: "Variables",
    category: "Development",
    description: "Contenedores que almacenan información que puede cambiar durante la ejecución de un programa. Son como cajas con etiquetas donde guardas datos.",
    relatedTerms: ["data-types", "functions", "data-structures"],
    example: "Una variable 'nombre' puede contener 'María' hoy y 'Carlos' mañana. Una variable 'edad' puede cambiar de 25 a 26.",
    codeExample: `// Declarar variables
let nombre = "María";        // Variable que puede cambiar
const edad = 25;             // Variable constante (no cambia)
var apellido = "García";     // Forma antigua (evitar)

// Usar variables
console.log(nombre);         // Mostrar: María
console.log(edad);           // Mostrar: 25

// Cambiar valor
nombre = "Carlos";           // Ahora nombre es "Carlos"
// edad = 26;                // Error! No se puede cambiar const`,
    tags: ["basics"]
  },
  {
    id: "console-log",
    name: "Console Log",
    category: "Development",
    description: "Comando que muestra información en la consola del navegador o terminal. Es como escribir en un cuaderno para ver qué está pasando en tu código. **IMPORTANTE:** En la consola también aparecen los errores de tu aplicación, por lo que es fundamental saber cómo abrirla.\n\n**Cómo abrir la consola del navegador:**\n- **Windows:** Presiona `F12` o `Ctrl + Shift + I`, luego haz clic en la pestaña 'Console'\n- **Mac:** Presiona `Cmd + Option + I`, luego haz clic en la pestaña 'Console'\n- **Alternativa:** Click derecho en la página → 'Inspeccionar' → pestaña 'Console'",
    relatedTerms: ["debugging", "variables", "input-output", "logging"],
    example: "Usar console.log() para ver el valor de una variable, mostrar mensajes de error, o verificar que tu código funciona correctamente. También revisa la consola para encontrar errores que puedan estar rompiendo tu aplicación. Ver imágenes de ayuda abajo para saber cómo abrir la consola.",
    codeExample: `// Ejemplos básicos de console.log
console.log("Hola mundo");           // Mostrar texto
console.log(42);                     // Mostrar número
console.log(true);                   // Mostrar boolean

// Mostrar variables
let nombre = "María";
let edad = 25;
console.log("Nombre:", nombre);      // Nombre: María
console.log("Edad:", edad);          // Edad: 25

// Mostrar objetos
let persona = {nombre: "Carlos", edad: 30};
console.log(persona);                // {nombre: "Carlos", edad: 30}

// Diferentes tipos de console
console.error("¡Error!");            // Mensaje de error (rojo)
console.warn("Advertencia");         // Mensaje de advertencia (amarillo)
console.info("Información");         // Mensaje informativo (azul)`,
    imageUrls: [
      "/images/glossary-help/helplog1.png",
      "/images/glossary-help/helplog2.png"
    ],
    tags: ["basics"]
  },
  {
    id: "localhost",
    name: "localhost",
    category: "Development",
    description: "Dirección web que apunta a tu propia máquina. Útil para probar aplicaciones y servicios en local, desde el navegador pero sin exponerlos a Internet. Es lo mismo que usar la dirección IP 127.0.0.1.",
    relatedTerms: ["server", "api", "port"],
    example: "Ejecutar una app en desarrollo en http://localhost:3000 para pruebas. En este caso, 3000 es el número de puerto que está usando.",
    codeExample: `// Iniciar un servidor local en Node.js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('¡Hola desde localhost!');
});

app.listen(PORT, () => {
  console.log(\`Servidor corriendo en http://localhost:\${PORT}\`);
});`,
    tags: ["basics"]
  },
  {
    id: "local-storage",
    name: "localStorage (Web)",
    category: "Frontend",
    description: "Almacenamiento clave-valor del navegador, persistente por sitio (hasta borrar datos). Ideal para guardar configuraciones simples o estado de UI; no para información sensible. Los datos se guardan como texto y persisten incluso cuando cierras el navegador.",
    relatedTerms: ["cookies", "session-storage", "frontend"],
    example: "Guardar el 'modo oscuro', borradores de prompts o el último hilo abierto en tu app web. Los datos quedan guardados incluso si cierras y vuelves a abrir el navegador.",
    tags: ["basics"]
  },
  {
    id: "session-storage",
    name: "sessionStorage (Web)",
    category: "Frontend",
    description: "Similar a localStorage pero los datos solo duran mientras la pestaña del navegador está abierta. Cuando cierras la pestaña, los datos se borran automáticamente.",
    relatedTerms: ["local-storage", "cookies", "frontend"],
    example: "Guardar el estado temporal de un formulario multipaso o el progreso en un proceso de compra. Si el usuario cierra la pestaña por accidente, los datos se pierden.",
    codeExample: `// Funciona exactamente igual que localStorage
// pero los datos solo duran mientras la pestaña está abierta

// Guardar datos
sessionStorage.setItem('pasoActual', '2');
sessionStorage.setItem('carrito', JSON.stringify(['item1', 'item2']));

// Leer datos
const paso = sessionStorage.getItem('pasoActual');

// Al cerrar la pestaña, todo se borra automáticamente`,
    tags: ["basics"]
  },
  {
    id: "cookies",
    name: "Cookies",
    category: "Frontend",
    description: "Pequeños archivos de texto que los sitios web guardan en tu navegador para recordar información. A diferencia de localStorage, las cookies se envían automáticamente al servidor en cada petición.",
    relatedTerms: ["local-storage", "session-storage", "authentication", "frontend", "backend"],
    example: "Guardar tu sesión de login, preferencias de idioma, o el carrito de compras. Las cookies pueden tener fecha de expiración y el servidor puede leerlas.",
    tags: ["basics"]
  },
  {
    id: "port",
    name: "Puerto (Port)",
    category: "Infrastructure",
    description: "Número que identifica un punto de entrada específico en una computadora para comunicaciones de red. Es como el número de departamento en un edificio: la IP es la dirección del edificio, el puerto es el departamento.",
    relatedTerms: ["localhost", "server", "api"],
    example: "Un servidor web corre típicamente en el puerto 80 (HTTP) o 443 (HTTPS). En desarrollo local usás puertos como 3000, 3001, 8080. Por ejemplo: http://localhost:3000 usa el puerto 3000.",
    codeExample: `// Puertos comunes:
// 80   - HTTP (web)
// 443  - HTTPS (web segura)
// 3000 - Apps de desarrollo (React, Next.js)
// 3001 - Otro servidor local
// 5432 - PostgreSQL (base de datos)
// 27017 - MongoDB (base de datos)

// Iniciar servidor en un puerto específico
const PORT = 3000;
app.listen(PORT);
// Ahora puedes acceder en http://localhost:3000`,
    tags: ["basics"]
  },
  {
    id: "ide",
    name: "IDE (Integrated Development Environment)",
    category: "Development",
    description: "Entorno de Desarrollo Integrado. Es un programa que te ayuda a escribir, probar y corregir código, todo en un mismo lugar. Incluye un editor de texto avanzado, herramientas para ejecutar tu código, debugger y otras funcionalidades que hacen más fácil programar.",
    relatedTerms: ["debugging", "console-log", "git", "bug"],
    example: `💻 VSCode (Visual Studio Code)

Qué es:
El IDE más popular del mundo, creado por Microsoft. Es gratuito, liviano, Open Source y tiene miles de extensiones para personalizarlo.

---

🤖 Cursor

Qué es:
Un IDE con IA integrada que te ayuda a escribir código y corregir errores. Está basado en VSCode pero integrado con modelos de inteligencia artificial generativa.

---

🌊 Windsurf

Qué es:
Similar a Cursor, también es un "fork" o clon de VSCode pero con capacidades de IA avanzadas.`,
    tags: ["basics"]
  },
  {
    id: "bug",
    name: "Bug (Error)",
    category: "Development",
    description: "Error o defecto en el código que hace que un programa no funcione como se espera. Puede ser un error de lógica, sintaxis, o un comportamiento inesperado. El nombre viene de un insecto (bug en inglés) que literalmente se metió en una computadora en 1947. Estos, junto con los *[errores de HTTP](#http-errors)*, aparecen en rojo en la consola del navegador o en la terminal de tu *[IDE](#ide)*, por ejemplo, Cursor.",
    relatedTerms: ["debugging", "testing", "console-log", "ide"],
    example: `🐛 Error de tipeo (Typo)

Qué es:
Escribir mal el nombre de una variable o función. Es como escribir "usario" en vez de "usuario".

Para qué sirve identificarlo:
Cuando intentas usar la variable correcta, el programa dice que no existe y te muestra un error. Es de los bugs más fáciles de arreglar una vez que lo encuentras.

Cómo se ve:
Un mensaje de error que dice "variable is not defined" o "undefined". El programa se detiene y no funciona hasta que corrijas el nombre.

---

🔀 Bug de lógica

Qué es:
El código funciona sin dar errores, pero hace lo contrario de lo que debería. La instrucción está al revés o usa la condición incorrecta.

Para qué sirve identificarlo:
Estos bugs son más difíciles de encontrar porque el programa "funciona" pero da resultados incorrectos. Por ejemplo, una función que debería permitir votar a mayores de 18, pero permite solo a menores de 18.

Cómo se ve:
La app no da errores pero se comporta raro: botones que hacen lo opuesto a lo esperado, cálculos que dan resultados incorrectos, permisos que están al revés.

---

🔁 Bucle infinito

Qué es:
Un bucle que se repite sin parar porque olvidaste cambiar la condición que lo detiene.

Para qué sirve identificarlo:
La app se congela, el navegador se pone lento o se cuelga. Un contador que nunca aumenta, entonces siempre es 0 y nunca llega a 10 para detenerse.

Cómo se ve:
La página deja de responder, el navegador te pregunta si querés cerrar la pestaña porque "no responde", o la app consume cada vez más memoria hasta que se cuelga.

---

Casos de uso:
Un botón de "Enviar" que no hace nada cuando lo clickeas. Una calculadora que suma mal. Una app que se pone cada vez más lenta después de un rato de usarla. Un formulario que dice que tu email es inválido aunque esté bien escrito.`,
    tags: ["basics"]
  },
  {
    id: "http-errors",
    name: "Errores de HTTP (Códigos de Estado)",
    category: "Protocols",
    description: "Códigos numéricos que el servidor web devuelve para indicar si una petición fue exitosa o qué tipo de problema ocurrió. Los códigos empiezan con diferentes números según el tipo: 2xx = éxito, 3xx = redirección, 4xx = error del cliente, 5xx = error del servidor.",
    relatedTerms: ["api", "server", "backend", "frontend"],
    example: "Cuando intentas entrar a una página que no existe, ves un error 404. Si intentas acceder a algo sin permiso, recibes un 403. Si el servidor tiene problemas, muestra un 500.",
    codeExample: `// Códigos más comunes:

// ✅ 2xx - ÉXITO
// 200 OK - Todo salió bien
// 201 Created - Se creó algo nuevo (ej: nuevo usuario registrado)

// 🔄 3xx - REDIRECCIÓN
// 301 Moved Permanently - La página se movió a otra dirección
// 302 Found - Redirección temporal

// ❌ 4xx - ERROR DEL CLIENTE (algo mal en tu petición)
// 400 Bad Request - La petición está mal formada
// 401 Unauthorized - Necesitas estar logueado
// 403 Forbidden - No tienes permiso (aunque estés logueado)
// 404 Not Found - La página/recurso no existe
// 405 Method Not Allowed - Método HTTP incorrecto (ej: POST en vez de GET)
// 429 Too Many Requests - Hiciste demasiadas peticiones muy rápido

// 💥 5xx - ERROR DEL SERVIDOR (problema en el servidor)
// 500 Internal Server Error - Error genérico del servidor
// 502 Bad Gateway - El servidor recibió respuesta inválida
// 503 Service Unavailable - El servidor está temporalmente fuera de servicio
// 504 Gateway Timeout - El servidor tardó demasiado en responder`,
    tags: ["basics"]
  },
  {
    id: "landing-page",
    name: "Landing Page (Página de Aterrizaje)",
    category: "Frontend",
    description: "Página web diseñada con un objetivo específico de conversión (registros, ventas, descargas). En el contexto de desarrollo, es importante entender que una landing page tiene características técnicas particulares: debe cargar rápido, ser responsive (adaptarse a móviles), tener buena optimización SEO para aparecer en buscadores, y formularios que envíen datos correctamente. Generalmente es una Single Page (una sola página sin navegación compleja) con secciones como hero, beneficios, testimonios y llamada a la acción.",
    relatedTerms: ["frontend", "web-app-responsive", "responsive-design", "single-page-application", "routes", "components"],
    example: "Desarrollar una landing page implica: crear un diseño responsive que se vea bien en móvil y desktop, implementar formularios con validación, optimizar imágenes para carga rápida, integrar analytics para medir conversiones, y conectar con una API para procesar registros. Es común usar frameworks como React o Next.js, y herramientas como V0, Lovable o Replit para crearlas rápidamente.",
    tags: ["basics"]
  }
]

export const devCategories = [
  "Todos",
  "Architecture",
  "Backend",
  "Frontend",
  "Development",
  "DevOps",
  "Security",
  "Testing",
  "Methodology",
  "Infrastructure",
  "Protocols",
  "Data Formats",
  "Performance",
  "Quality"
]
