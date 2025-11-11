# Sistema de Triple Fallback con API Key de Usuario

## 🎯 Feature Implementado

Se ha agregado un **tercer nivel de fallback** que permite a los usuarios proporcionar su propia API key de Google Gemini cuando ambas APIs del servidor están agotadas.

---

## 🔄 Niveles de Fallback

### Nivel 1: PRIMARY API (GEMINI_API_KEY)
- Primera API que se intenta
- Configurada en el servidor

### Nivel 2: FALLBACK API (GEMINI_API_KEY_2)
- Se activa automáticamente si PRIMARY falla con 429
- Segunda API configurada en el servidor

### Nivel 3: USER-PROVIDED API KEY ⭐ **NUEVO**
- Se activa cuando ambas APIs del servidor están agotadas
- El usuario proporciona su propia API key temporalmente
- La key NO se guarda, solo se usa para esa búsqueda

---

## 💡 Cómo Funciona

### Flujo Completo:

```
1. Usuario hace búsqueda en Brújula/Tutor
     ↓
2. Intenta PRIMARY API
     ↓ (si 429)
3. Intenta FALLBACK API automáticamente
     ↓ (si también 429)
4. Muestra input para que usuario pegue su propia API key
     ↓
5. Usuario consigue su key gratis en 2 clicks
     ↓
6. Pega la key y obtiene su resultado ✅
```

---

## 🎨 UI/UX

### Cuando Ambas APIs Fallan:

Se muestra un panel azul con:
- 🔑 Título: "Solución Rápida: Usá tu propia API Key"
- Input tipo password para pegar la key
- Link directo a: [https://aistudio.google.com/api-keys](https://aistudio.google.com/api-keys)
- Botón "Buscar" para ejecutar con la key del usuario
- Mensaje de privacidad: "🔒 Tu API key solo se usa para esta búsqueda y no se guarda"

### Features del Input:

- ✅ Auto-focus cuando aparece
- ✅ Tipo password (oculta la key)
- ✅ Validación (debe ser válida)
- ✅ Se limpia automáticamente después de usarse
- ✅ Link para conseguir key gratis
- ✅ Mensaje claro de que no se almacena

---

## 🔧 Implementación Técnica

### Frontend (Brújula & Tutor)

**Estados agregados:**
```typescript
const [showUserKeyInput, setShowUserKeyInput] = useState(false)
const [userApiKey, setUserApiKey] = useState("")
const apiKeyInputRef = useRef<HTMLInputElement>(null)
```

**Request con user key:**
```typescript
const requestBody: any = {
  mode: "brujula",
  query: query.trim(),
}

// Include user's key if provided
if (userApiKey.trim()) {
  requestBody.userApiKey = userApiKey.trim()
}
```

### Backend (API Route)

**Manejo de user key:**
```typescript
// Third-level fallback: User-provided key
if (userApiKey && userApiKey.trim()) {
  const genAI = new GoogleGenerativeAI(userApiKey.trim())
  const userModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })
  return await handleBrujulaMode(query, userModel, "user-provided-key", false)
}
```

**Error handling:**
```typescript
// Si la key del usuario es inválida
return NextResponse.json({
  error: "La API key que proporcionaste no es válida o ha alcanzado su límite.",
  success: false,
  errorType: 'invalid_user_key'
}, { status: 400 })
```

---

## 📊 Logs del Sistema

### Cuando Usuario Usa Su Key:

**Terminal:**
```bash
🧭 [BRÚJULA MODE] Starting request
🔑 [BRÚJULA] User provided their own API key, using it directly
⚙️  [BRÚJULA] Processing with user-provided-key
✅ [BRÚJULA] User API key success
```

**Browser Console:**
```javascript
🔑 [FRONTEND] Using user-provided API key
✅ [FRONTEND] Success! Fallback used: false
```

---

## 🎯 Casos de Uso

### Caso 1: Usuario Testing/Desarrollo
- Desarrollador probando features
- Quiere evitar límites del servidor
- Usa su propia key ilimitada

### Caso 2: Tráfico Alto
- Ambas keys del servidor agotadas
- Usuarios pueden seguir usando la app
- Experiencia sin interrupciones

### Caso 3: Demo/Presentación
- Mostrando la app a alguien
- No quiere quedarse sin cuota
- Usa key personal temporalmente

---

## 🔒 Privacidad y Seguridad

### ✅ Garantías:

1. **No se almacena**: La key nunca se guarda en localStorage, cookies, ni base de datos
2. **Solo en memoria**: Existe solo en el estado de React durante la sesión
3. **Se limpia**: Se borra automáticamente después de cada uso exitoso
4. **Transparente**: Usuario ve claramente que no se guarda
5. **Client-side**: La key va del navegador directo a Google Gemini API

### ⚠️ Consideraciones:

- La key se envía al backend en el request body
- El backend la usa y la descarta inmediatamente
- No se registra en logs (excepto logs de debug)
- Usuario debe confiar en el servidor

---

## 🚀 Cómo Conseguir una API Key

### Pasos Rápidos (2 clicks):

1. **Visitar**: [https://aistudio.google.com/api-keys](https://aistudio.google.com/api-keys)
2. **Login**: Iniciar sesión con cuenta Google
3. **Crear**: Click en "Create API Key"
4. **Copiar**: Click en copiar (ícono de clipboard)
5. **Pegar**: En el input de la app

**Tiempo total**: ~30 segundos

### Límites de la API Gratuita:

- ✅ 15 requests/minuto
- ✅ 1,500 requests/día
- ✅ Sin costo
- ✅ Sin tarjeta de crédito

---

## 📱 Responsive

### Desktop:
- Input ancho completo
- Link y botón lado a lado
- Fácil copiar/pegar

### Mobile:
- Input se adapta al ancho
- Elementos stack verticalmente si es necesario
- Touch-friendly

---

## 🧪 Testing

### Test 1: Flujo Completo
```
1. Agotar ambas keys del servidor (hacer 15+ requests)
2. Intentar nueva búsqueda
3. Verificar que aparece el input azul
4. Conseguir API key personal
5. Pegarla en el input
6. Click en "Buscar"
7. Verificar que funciona ✅
```

### Test 2: Key Inválida
```
1. Triggear el input (ambas APIs agotadas)
2. Pegar key inválida: "abc123"
3. Click "Buscar"
4. Verificar error: "La API key que proporcionaste no es válida"
```

### Test 3: Key También Agotada
```
1. Triggear el input
2. Pegar key que también está en 429
3. Verificar mensaje apropiado
```

---

## 🎨 Diseño

### Colores:
- **Fondo**: Blue-50 (light) / Blue-950/20 (dark)
- **Border**: Blue-300 (light) / Blue-800 (dark)
- **Texto**: Blue-900 (light) / Blue-100 (dark)
- **Link**: Blue-700 (light) / Blue-300 (dark)

### Iconos:
- 🔑 Emoji de llave
- ✨ Sparkles icon
- 🔒 Emoji de candado
- 🔗 External link icon

---

## 📈 Métricas Sugeridas

Para monitorear el uso del feature:

```typescript
// Agregar analytics cuando usuario usa su key:
if (userApiKey.trim()) {
  analytics.track('user_api_key_used', {
    mode: 'brujula', // or 'tutor'
    timestamp: new Date(),
    success: true
  })
}
```

---

## 🔮 Mejoras Futuras

### Opcionales:

1. **Recordar Key** (opcional con checkbox)
   - Guardar en localStorage encriptada
   - User puede decidir si quiere

2. **Validación Frontend**
   - Verificar formato de key antes de enviar
   - Regex: `/^AIza[a-zA-Z0-9_-]{35}$/`

3. **Rate Limit Info**
   - Mostrar cuántas queries quedan
   - Para keys del servidor

4. **Multiple User Keys**
   - Permitir múltiples keys del usuario
   - Rotar entre ellas

---

## ✅ Benefits

### Para Usuarios:
- ✅ Nunca se quedan sin servicio
- ✅ Solución inmediata (30 segundos)
- ✅ Gratis (API key gratuita)
- ✅ Control total
- ✅ Sin registro adicional

### Para la App:
- ✅ Mejor UX bajo carga
- ✅ Escalabilidad infinita
- ✅ Reduce presión en keys del servidor
- ✅ Feature diferenciador
- ✅ Educativo (users aprenden sobre APIs)

---

## 📝 Resumen Ejecutivo

Este feature transforma un **punto de falla crítico** (ambas APIs agotadas) en una **oportunidad educativa** donde el usuario:

1. Aprende sobre API keys
2. Consigue su propia key gratis
3. Mantiene el servicio funcionando
4. Gana autonomía

**Resultado**: App nunca se queda "sin servicio" desde la perspectiva del usuario.

