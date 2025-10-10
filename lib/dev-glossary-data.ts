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
    example: "Cuando abres Instagram en tu teléfono, la app usa una API para obtener tus fotos desde los servidores de Instagram. Es como un camarero que lleva tu pedido a la cocina y te trae la comida.",
    tags: ["basics"]
  },
  {
    id: "backend",
    name: "Backend",
    category: "Architecture",
    description: "La parte del software que maneja la lógica de negocio, *[database](#database)* y procesamiento del servidor. No es visible para el usuario final.",
    example: "El backend de una red social maneja el almacenamiento de posts, *[authentication](#authentication)* de usuarios y envío de notificaciones.",
    tags: ["basics"]
  },
  {
    id: "frontend",
    name: "Frontend",
    category: "Architecture",
    description: "La parte del software que interactúa directamente con el usuario. Incluye la interfaz de usuario y la experiencia visual.",
    example: "La página web que ves en el navegador, con botones, formularios y animaciones, es el frontend de una aplicación.",
    tags: ["basics"]
  },
  {
    id: "framework",
    name: "Framework",
    category: "Development",
    description: "Conjunto de herramientas y *[library](#library)* predefinidas que proporciona una estructura base para desarrollar aplicaciones más rápidamente.",
    example: "React para interfaces web, Django para Python, o Express.js para Node.js son frameworks populares.",
    tags: ["basics"]
  },
  {
    id: "library",
    name: "Librería (Library)",
    category: "Development",
    description: "Colección de código reutilizable que proporciona funcionalidades específicas para ser utilizadas en otros programas.",
    example: "Como una caja de herramientas: una librería de matemáticas te da funciones para calcular, una librería de fechas te ayuda a manejar calendarios, o una librería de gráficos te permite crear gráficos sin escribir todo el código desde cero."
  },
  {
    id: "version-control",
    name: "Control de Versiones (Version Control)",
    category: "Development",
    description: "Sistema que registra cambios en archivos a lo largo del tiempo, permitiendo volver a versiones anteriores y colaborar en equipo.",
    example: "*[git](#git)* permite rastrear cambios en código, crear *[branch](#branch)* para nuevas funcionalidades y *[merge](#merge)* trabajo de diferentes desarrolladores."
  },
  {
    id: "repository",
    name: "Repositorio (Repository)",
    category: "Development",
    description: "Almacén central donde se guarda el código fuente de un proyecto, junto con su historial de cambios y metadatos.",
    example: "Un repositorio en *[github](#github)* contiene todo el código de una aplicación web, incluyendo *[documentation](#documentation)* y configuración."
  },
  {
    id: "deployment",
    name: "Despliegue (Deployment)",
    category: "DevOps",
    description: "Proceso de poner una aplicación en funcionamiento en un servidor o plataforma para que los usuarios puedan acceder a ella.",
    example: "Subir una aplicación web a Heroku, AWS o Vercel para que esté disponible en internet.",
    tags: ["basics"]
  },
  {
    id: "server",
    name: "Servidor (Server)",
    category: "Infrastructure",
    description: "Computadora o programa que proporciona servicios, recursos o datos a otros dispositivos (clientes) en una red.",
    example: "Un servidor web como Apache o Nginx que entrega páginas web a los navegadores de los usuarios."
  },
  {
    id: "client",
    name: "Cliente (Client)",
    category: "Architecture",
    description: "Aplicación o dispositivo que solicita servicios o recursos a un servidor. En web, típicamente es el navegador.",
    example: "Tu navegador web (Chrome, Firefox) es un cliente que solicita páginas web a servidores."
  },
  {
    id: "http",
    name: "HTTP (HyperText Transfer Protocol)",
    category: "Protocols",
    description: "Protocolo de comunicación que permite la transferencia de información en la web entre clientes y servidores.",
    example: "Cuando escribes una URL en el navegador, se envía una petición HTTP GET al servidor para obtener la página."
  },
  {
    id: "rest",
    name: "REST (Representational State Transfer)",
    category: "Backend",
    description: "Arquitectura de software para diseñar *[api](#api)* web que utiliza métodos *[http](#http)* estándar (GET, POST, PUT, DELETE).",
    example: "Una *[api](#api)* REST permite obtener usuarios con GET /api/users, crear uno nuevo con POST /api/users."
  },
  {
    id: "json",
    name: "JSON (JavaScript Object Notation)",
    category: "Data Formats",
    description: "Formato de intercambio de datos ligero y fácil de leer, basado en la sintaxis de JavaScript.",
    example: "{\"nombre\": \"Juan\", \"edad\": 30, \"ciudad\": \"Buenos Aires\"} es un objeto JSON con información de usuario."
  },
  {
    id: "authentication",
    name: "Autenticación (Authentication)",
    category: "Security",
    description: "Proceso de verificar la identidad de un usuario, típicamente mediante credenciales como usuario y contraseña.",
    example: "El login en una aplicación web donde ingresas email y contraseña para acceder a tu cuenta.",
    tags: ["basics"]
  },
  {
    id: "authorization",
    name: "Autorización (Authorization)",
    category: "Security",
    description: "Proceso de determinar qué acciones o recursos puede acceder un usuario *[authentication](#authentication)*.",
    example: "Un usuario administrador puede eliminar posts, mientras que un usuario normal solo puede crear y editar los suyos."
  },
  {
    id: "encryption",
    name: "Encriptación (Encryption)",
    category: "Security",
    description: "Proceso de convertir información en un formato ilegible para protegerla de accesos no autorizados.",
    example: "Las contraseñas se almacenan encriptadas en la base de datos, no en texto plano."
  },
  {
    id: "ssl-tls",
    name: "SSL/TLS",
    category: "Security",
    description: "Protocolos de seguridad que encriptan la comunicación entre navegadores y servidores web.",
    example: "El candado verde en la barra de direcciones indica que el sitio usa SSL/TLS para proteger tus datos."
  },
  {
    id: "caching",
    name: "Caché (Caching)",
    category: "Performance",
    description: "Técnica de almacenar datos temporalmente en una ubicación de acceso rápido para mejorar el rendimiento.",
    example: "Un navegador guarda imágenes en caché para no descargarlas nuevamente en visitas posteriores."
  },
  {
    id: "cdn",
    name: "CDN (Content Delivery Network)",
    category: "Infrastructure",
    description: "Red de servidores distribuidos geográficamente que entrega contenido web más rápido a los usuarios.",
    example: "Cloudflare o AWS CloudFront distribuyen imágenes y videos desde servidores cercanos al usuario."
  },
  {
    id: "responsive-design",
    name: "Diseño Responsive",
    category: "Frontend",
    description: "Enfoque de diseño web que hace que las páginas se adapten automáticamente a diferentes tamaños de pantalla.",
    example: "Una página web que se ve bien tanto en desktop como en móvil, ajustando el layout automáticamente.",
    tags: ["basics"]
  },
  {
    id: "mobile-first",
    name: "Mobile First",
    category: "Frontend",
    description: "Metodología de diseño que prioriza la experiencia móvil, diseñando primero para pantallas pequeñas.",
    example: "Comenzar el diseño de una aplicación web optimizada para móvil y luego expandir para desktop."
  },
  {
    id: "progressive-web-app",
    name: "Progressive Web App (PWA)",
    category: "Frontend",
    description: "Aplicación web que utiliza tecnologías modernas para ofrecer una experiencia similar a las apps nativas.",
    example: "Una PWA puede funcionar offline, enviar notificaciones y ser instalada como una app en el dispositivo."
  },
  {
    id: "single-page-application",
    name: "Single Page Application (SPA)",
    category: "Frontend",
    description: "Aplicación web que carga una sola página HTML y actualiza el contenido dinámicamente sin recargar la página.",
    example: "Gmail, Facebook o aplicaciones construidas con React, Vue o Angular son SPAs."
  },
  {
    id: "microservices",
    name: "Microservicios (Microservices)",
    category: "Architecture",
    description: "Arquitectura de software que divide una aplicación en servicios pequeños e independientes que se comunican entre sí.",
    example: "Una aplicación de e-commerce puede tener microservicios separados para usuarios, productos, pagos y envíos."
  },
  {
    id: "container",
    name: "Contenedor (Container)",
    category: "DevOps",
    description: "Unidad de software que empaqueta código y dependencias para ejecutarse de manera consistente en cualquier entorno.",
    example: "Docker permite crear contenedores que incluyen la aplicación y todas sus dependencias."
  },
  {
    id: "docker",
    name: "Docker",
    category: "DevOps",
    description: "Plataforma que permite crear, desplegar y ejecutar aplicaciones usando contenedores virtualizados.",
    example: "Docker permite que una aplicación funcione igual en desarrollo, testing y producción."
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    category: "DevOps",
    description: "Sistema de orquestación de contenedores que automatiza el despliegue, escalado y gestión de aplicaciones.",
    example: "Kubernetes puede manejar automáticamente el escalado de una aplicación cuando aumenta la demanda."
  },
  {
    id: "ci-cd",
    name: "CI/CD (Continuous Integration/Continuous Deployment)",
    category: "DevOps",
    description: "Prácticas de desarrollo que automatizan la integración de código y el despliegue de aplicaciones.",
    example: "GitHub Actions ejecuta tests automáticamente cuando se hace push y despliega la aplicación si todo está bien."
  },
  {
    id: "testing",
    name: "Testing (Pruebas)",
    category: "Development",
    description: "Proceso de verificar que el software funciona correctamente mediante la ejecución de pruebas automatizadas o manuales.",
    example: "*[unit-test](#unit-test)* verifican funciones individuales, *[integration-test](#integration-test)* verifican que los componentes trabajen juntos."
  },
  {
    id: "unit-test",
    name: "Prueba Unitaria (Unit Test)",
    category: "Testing",
    description: "Prueba que verifica el funcionamiento de una unidad específica de código (función, método, clase) de forma aislada.",
    example: "Una prueba unitaria verifica que una función de cálculo de impuestos devuelva el resultado correcto."
  },
  {
    id: "integration-test",
    name: "Prueba de Integración (Integration Test)",
    category: "Testing",
    description: "Prueba que verifica la interacción entre diferentes componentes o módulos de una aplicación.",
    example: "Una prueba de integración verifica que el login funcione correctamente con la base de datos y el frontend."
  },
  {
    id: "agile",
    name: "Metodología Ágil (Agile)",
    category: "Methodology",
    description: "Enfoque de desarrollo de software que enfatiza la colaboración, flexibilidad y entrega iterativa de valor.",
    example: "*[scrum](#scrum)* y Kanban son metodologías ágiles que organizan el trabajo en sprints cortos con entregas frecuentes."
  },
  {
    id: "scrum",
    name: "Scrum",
    category: "Methodology",
    description: "Framework *[agile](#agile)* que organiza el trabajo en sprints de 1-4 semanas con roles definidos y ceremonias regulares.",
    example: "Un equipo Scrum tiene un Product Owner, Scrum Master y desarrolladores que trabajan en sprints de 2 semanas."
  },
  {
    id: "user-story",
    name: "Historia de Usuario (User Story)",
    category: "Methodology",
    description: "Descripción simple de una funcionalidad desde la perspectiva del usuario final.",
    example: "Como usuario, quiero poder restablecer mi contraseña para poder acceder a mi cuenta si la olvido."
  },
  {
    id: "mvp",
    name: "MVP (Minimum Viable Product)",
    category: "Methodology",
    description: "Versión de un producto con las funcionalidades mínimas necesarias para ser útil a los primeros usuarios.",
    example: "Un MVP de una red social podría incluir solo registro, login, crear posts y ver posts de otros usuarios."
  },
  {
    id: "refactoring",
    name: "Refactoring (Refactorización)",
    category: "Development",
    description: "Proceso de mejorar el código existente sin cambiar su funcionalidad externa, enfocándose en la calidad y mantenibilidad.",
    example: "Reorganizar funciones duplicadas, mejorar nombres de variables o simplificar lógica compleja sin cambiar el comportamiento."
  },
  {
    id: "code-review",
    name: "Revisión de Código (Code Review)",
    category: "Development",
    description: "Proceso donde otros desarrolladores revisan el código antes de integrarlo al proyecto principal.",
    example: "Un desarrollador crea un *[pull-request](#pull-request)* y otros miembros del equipo revisan el código y sugieren mejoras."
  },
  {
    id: "documentation",
    name: "Documentación (Documentation)",
    category: "Development",
    description: "Conjunto de documentos que explican cómo usar, mantener y entender un sistema de software.",
    example: "README files, comentarios en código, guías de API y manuales de usuario son tipos de documentación."
  },
  {
    id: "debugging",
    name: "Debugging (Depuración)",
    category: "Development",
    description: "Proceso de identificar, analizar y corregir errores o bugs en el código de software. En VibeCoding se suele copiar y pegar los console logs en el chat para que lo arregle la IA.",
    example: "Usar herramientas como breakpoints, logs o debuggers para encontrar por qué una función no funciona correctamente.",
    tags: ["basics"]
  },
  {
    id: "performance",
    name: "Rendimiento (Performance)",
    category: "Quality",
    description: "Medida de qué tan rápido y eficientemente funciona una aplicación bajo diferentes condiciones.",
    example: "Optimizar el tiempo de carga de una página web, reducir el uso de memoria o mejorar la velocidad de consultas a base de datos."
  },
  {
    id: "scalability",
    name: "Escalabilidad (Scalability)",
    category: "Architecture",
    description: "Capacidad de un sistema para manejar un aumento en la carga de trabajo manteniendo el rendimiento.",
    example: "Una aplicación que puede manejar 100 usuarios debe poder escalar para manejar 10,000 usuarios sin problemas."
  },
  {
    id: "monitoring",
    name: "Monitoreo (Monitoring)",
    category: "DevOps",
    description: "Proceso de observar y medir el rendimiento y salud de una aplicación en tiempo real.",
    example: "Herramientas como New Relic o DataDog monitorean errores, tiempo de respuesta y uso de recursos de una aplicación."
  },
  {
    id: "logging",
    name: "Logging (Registro de Eventos)",
    category: "DevOps",
    description: "Práctica de registrar eventos y actividades de una aplicación para facilitar el debugging y monitoreo.",
    example: "Registrar cuando un usuario se loguea, cuando ocurre un error, o cuándo se procesa una transacción."
  },
  {
    id: "open-source",
    name: "Código Abierto (Open Source)",
    category: "Development",
    description: "Software cuyo código fuente está disponible públicamente y puede ser modificado y distribuido libremente.",
    example: "Linux, React, Node.js y muchas librerías de JavaScript son proyectos de código abierto."
  },
  {
    id: "git",
    name: "Git",
    category: "Development",
    description: "Sistema de *[version-control](#version-control)* distribuido que permite rastrear cambios en archivos y coordinar trabajo en equipo.",
    example: "Git permite crear *[branch](#branch)* para nuevas funcionalidades, *[merge](#merge)* cambios y mantener un historial completo del proyecto.",
    tags: ["basics"]
  },
  {
    id: "github",
    name: "GitHub",
    category: "Development",
    description: "Plataforma de hosting para *[repository](#repository)* *[git](#git)* que facilita la colaboración y gestión de proyectos de software.",
    example: "GitHub permite subir código, crear *[pull-request](#pull-request)*, gestionar issues y colaborar en proyectos de *[open-source](#open-source)*.",
    tags: ["basics"]
  },
  {
    id: "pull-request",
    name: "Pull Request (PR)",
    category: "Development",
    description: "Propuesta de cambios en un *[repository](#repository)* que solicita *[merge](#merge)* código de una *[branch](#branch)* a otra.",
    example: "Un desarrollador crea una PR para *[merge](#merge)* su nueva funcionalidad con la *[branch](#branch)* principal del proyecto."
  },
  {
    id: "merge",
    name: "Merge (Fusión)",
    category: "Development",
    description: "Proceso de combinar cambios de diferentes *[branch](#branch)* o *[commit](#commit)* en una sola *[branch](#branch)*.",
    example: "*[merge](#merge)* una *[branch](#branch)* de nueva funcionalidad con la *[branch](#branch)* principal después de aprobar un *[pull-request](#pull-request)*."
  },
  {
    id: "branch",
    name: "Rama (Branch)",
    category: "Development",
    description: "Línea de desarrollo independiente que permite trabajar en funcionalidades sin afectar el código principal.",
    example: "Crear una *[branch](#branch)* 'feature/nuevo-login' para desarrollar una nueva funcionalidad de *[authentication](#authentication)*."
  },
  {
    id: "commit",
    name: "Commit",
    category: "Development",
    description: "Punto en el historial de *[git](#git)* que representa un conjunto de cambios específicos en el código.",
    example: "Un *[commit](#commit)* puede representar la adición de una nueva función, corrección de un bug o actualización de *[documentation](#documentation)*.",
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
    example: "JavaScript para web, Python para data science, Java para aplicaciones empresariales, o Swift para iOS.",
    tags: ["basics"]
  },
  {
    id: "data-types",
    name: "Tipos de Datos",
    category: "Development",
    description: "Clasificación que define qué tipo de información puede almacenar una variable y qué operaciones se pueden realizar con ella.",
    example: "Como diferentes tipos de contenedores: un 'String' es como una caja de texto (tu nombre), un 'Integer' es como una caja de números (tu edad), un 'Boolean' es como una caja de sí/no (¿estás casado?), y un 'Array' es como una lista de compras.",
    codeExample: `// Diferentes tipos de datos
let nombre = "María";           // String (texto)
let edad = 25;                  // Integer (número entero)
let esCasada = false;           // Boolean (verdadero/falso)
let compras = ["pan", "leche"];  // Array (lista)`,
    tags: ["basics"]
  },
  {
    id: "data-structures",
    name: "Estructuras de Datos",
    category: "Development",
    description: "Formas organizadas de almacenar y acceder a datos de manera eficiente, cada una optimizada para diferentes tipos de operaciones.",
    example: "Como diferentes tipos de cajas para organizar cosas: una caja simple para una lista de nombres, una caja con compartimentos para guardar información de una persona (nombre, edad, email), o una caja con sub-cajas para organizar archivos por carpetas.",
    codeExample: `// Array (lista simple)
let nombres = ["Ana", "Carlos", "María"];

// Object (caja con compartimentos)
let persona = {
  nombre: "Ana",
  edad: 25,
  email: "ana@email.com"
};

// Array de objetos (lista de personas)
let personas = [
  {nombre: "Ana", edad: 25},
  {nombre: "Carlos", edad: 30}
];`,
    tags: ["basics"]
  },
  {
    id: "algorithms",
    name: "Algoritmo",
    category: "Development",
    description: "Secuencia de pasos lógicos y ordenados para resolver un problema específico o realizar una tarea computacional.",
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
    example: "If/else para decisiones, loops para repetir acciones, o switch para múltiples opciones.",
    codeExample: `// Estructuras de control básicas
if (edad >= 18) {
  console.log("Eres mayor de edad");
} else {
  console.log("Eres menor de edad");
}

// Loop para repetir
for (let i = 0; i < 5; i++) {
  console.log("Número: " + i);
}`,
    tags: ["basics"]
  },
  {
    id: "functions",
    name: "Funciones",
    category: "Development",
    description: "Bloques de código reutilizables que realizan una tarea específica y pueden recibir parámetros y devolver resultados.",
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
    id: "web-app-responsive",
    name: "App Web (Responsive)",
    category: "Frontend",
    description: "Aplicación web que se adapta automáticamente a diferentes tamaños de pantalla y dispositivos.",
    example: "Una tienda online que se ve perfecta tanto en desktop como en móvil, ajustando el layout automáticamente.",
    tags: ["basics"]
  },
  {
    id: "desktop-app",
    name: "App Desktop",
    category: "Frontend",
    description: "Aplicación que se ejecuta en sistemas operativos de escritorio, optimizada para mouse, teclado y pantallas grandes.",
    example: "Microsoft Word, Photoshop, o aplicaciones de escritorio que se instalan en Windows, Mac o Linux.",
    tags: ["basics"]
  },
  {
    id: "mobile-app",
    name: "App Mobile",
    category: "Frontend",
    description: "Aplicación diseñada específicamente para dispositivos móviles, optimizada para pantallas táctiles y uso en movimiento.",
    example: "WhatsApp, Instagram, o apps bancarias que se descargan desde App Store o Google Play.",
    tags: ["basics"]
  },
  {
    id: "components",
    name: "Componentes",
    category: "Frontend",
    description: "Piezas reutilizables de interfaz de usuario que encapsulan una funcionalidad y pueden combinarse para crear aplicaciones complejas. Se crea una vez y se puede usar en múltiples lugares de la app.",
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
    description: "Identificador único que autentica y autoriza el acceso a una API, actuando como contraseña para servicios externos.",
    example: "Clave para acceder a la API de Google Maps, API key de OpenAI para ChatGPT, o token de Twitter para publicar tweets.",
    tags: ["basics"]
  },
  {
    id: "endpoint",
    name: "Endpoint",
    category: "Backend",
    description: "URL específica donde una API recibe peticiones y devuelve respuestas. Es el punto de entrada a un servicio web.",
    example: "https://api.github.com/users para obtener datos de usuario, o /api/products para gestionar productos en una tienda.",
    tags: ["basics"]
  },
  {
    id: "environment-variables",
    name: "Variables de Entorno",
    category: "Development",
    description: "Valores configurables que se almacenan fuera del código y permiten ajustar el comportamiento de una aplicación según el entorno.",
    example: "DATABASE_URL para conexión a base de datos, API_KEY para servicios externos, o DEBUG_MODE para activar logs detallados.",
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
    example: "Dev para programar, Staging para pruebas antes del lanzamiento, y Producción para usuarios finales.",
    tags: ["basics"]
  },
  {
    id: "pull",
    name: "Pull",
    category: "Development",
    description: "Comando de Git que descarga y fusiona cambios desde un repositorio remoto al repositorio local.",
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
    name: "Deploy (Despliegue)",
    category: "DevOps",
    description: "Proceso de poner una aplicación en funcionamiento en un servidor para que los usuarios puedan acceder a ella.",
    example: "Es como subir una foto a Instagram: tu app está en tu computadora, pero para que otros la vean, necesitas 'subirla' a un servidor en internet. Deploy es ese proceso de 'subir' tu app para que funcione en la web.",
    tags: ["basics"]
  },
  {
    id: "routes",
    name: "Rutas",
    category: "Frontend",
    description: "URLs que definen las diferentes páginas o secciones de una aplicación web, mapeando direcciones a componentes específicos.",
    example: "/home para la página principal, /profile para perfil de usuario, o /products/:id para páginas de productos específicos.",
    tags: ["basics"]
  },
  {
    id: "databases",
    name: "Bases de Datos",
    category: "Backend",
    description: "Sistemas organizados para almacenar, gestionar y recuperar información de manera estructurada y eficiente.",
    example: "Imagina una biblioteca gigante donde puedes guardar y encontrar información rápidamente. Las bases de datos son como bibliotecas digitales que almacenan todos los datos de una app: usuarios, productos, mensajes, etc.",
    tags: ["basics"]
  },
  {
    id: "client-server",
    name: "Arquitectura Cliente-Servidor",
    category: "Architecture",
    description: "Modelo donde el cliente (frontend) solicita servicios al servidor (backend), que procesa y devuelve respuestas.",
    example: "Tu navegador (cliente) solicita una página web al servidor, que la procesa y envía el HTML de vuelta.",
    tags: ["basics"]
  },
  {
    id: "sso",
    name: "SSO (Single Sign-On)",
    category: "Security",
    description: "Sistema de autenticación que permite a los usuarios acceder a múltiples aplicaciones con una sola credencial.",
    example: "Iniciar sesión con Google para acceder a Gmail, YouTube y Drive, o login corporativo para todas las herramientas de la empresa.",
    tags: ["basics"]
  },
  {
    id: "rls",
    name: "RLS (Row Level Security)",
    category: "Backend",
    description: "Mecanismo de seguridad en bases de datos que controla el acceso a filas específicas basado en el usuario autenticado.",
    example: "Un usuario solo puede ver sus propios posts, o un empleado solo accede a datos de su departamento en la base de datos.",
    tags: ["basics"]
  },
  {
    id: "dependency",
    name: "Dependencia",
    category: "Development",
    description: "Paquete o librería externa que tu proyecto necesita para funcionar correctamente. Son herramientas que otros desarrolladores crearon y que tú puedes usar.",
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
    description: "Desarrollador que trabaja tanto en el frontend (interfaz de usuario) como en el backend (lógica del servidor) de una aplicación. Conoce todo el stack tecnológico.",
    example: "Un desarrollador fullstack puede crear una app web completa: desde el diseño de la interfaz hasta la base de datos y la lógica del servidor.",
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
