# 🔧 Fix: Password Reset Redirect

## ❌ Problema
El enlace de "restablecer contraseña" en el email redirigía a la página principal (home) con un código en la URL en lugar de ir a `/reset-password`.

## ✅ Solución Implementada

### 1. **Cambio en el Código**
Se actualizó `app/forgot-password/page.tsx` para redirigir directamente a `/reset-password`:

```typescript
// ANTES (línea 31):
redirectTo: `${window.location.origin}/auth/callback`,

// AHORA:
redirectTo: `${window.location.origin}/reset-password`,
```

### 2. **Configuración Necesaria en Supabase**

Para que esto funcione correctamente, debes configurar las URLs en Supabase:

#### Paso 1: Ir a la Configuración de URLs
1. Abre tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. Ve a **Authentication** → **URL Configuration**

#### Paso 2: Verificar Site URL
Asegúrate que tu **Site URL** sea correcta según el ambiente:
- **Producción**: `https://udesanocode.vercel.app`
- **Desarrollo**: `http://localhost:3000`

#### Paso 3: Agregar Redirect URLs
En la sección **Redirect URLs**, agrega estas URLs (una por línea):

```
https://udesanocode.vercel.app/reset-password
https://udesanocode.vercel.app/auth/callback
http://localhost:3000/reset-password
http://localhost:3000/auth/callback
```

**Importante**: 
- `/reset-password` es para el flujo de recuperación de contraseña
- `/auth/callback` es para la confirmación de email de nuevos registros (NO eliminar)

#### Paso 4: Verificar Template de Email (Opcional)
1. Ve a **Authentication** → **Email Templates** → **"Reset Password"**
2. El template por defecto debe funcionar (usa `{{ .ConfirmationURL }}`)
3. Si quieres personalizarlo, asegúrate de mantener `{{ .ConfirmationURL }}` como el enlace

## 🔄 Flujos Separados (No se Afectan Entre Sí)

### Password Reset Flow:
```
Usuario olvida contraseña
  ↓
/forgot-password (solicita email)
  ↓
Email con enlace → /reset-password ✅
  ↓
Usuario ingresa nueva contraseña
  ↓
/login
```

### Email Confirmation Flow (NO MODIFICADO):
```
Usuario se registra
  ↓
Email con enlace → /auth/callback ✅
  ↓
/auth/callback valida código
  ↓
/dashboard
```

**✅ Ambos flujos funcionan independientemente y no se interfieren.**

## 🧪 Cómo Probar

### Test 1: Reset Password
1. Ve a `/forgot-password`
2. Ingresa un email registrado
3. Revisa tu email
4. Click en el enlace
5. **Deberías llegar a** `/reset-password` (NO a la home con código)
6. Ingresa nueva contraseña
7. Verifica que puedas hacer login

### Test 2: Email Confirmation (Verificar que NO se rompió)
1. Registra un usuario nuevo
2. Revisa el email de confirmación
3. Click en el enlace
4. **Deberías ver** el mensaje de "¡Registro completado exitosamente!"
5. **Deberías llegar a** `/dashboard` o `/login` (NO a la home)

## 🐛 Troubleshooting

### Problema: Sigue redirigiendo a home
**Causa**: Las Redirect URLs no están configuradas en Supabase

**Solución**: 
1. Ve a Authentication → URL Configuration en Supabase
2. Agrega `/reset-password` a las Redirect URLs
3. Espera 1-2 minutos (caché de Supabase)
4. Intenta de nuevo

### Problema: "URL not allowed" o "Invalid redirect URL"
**Causa**: La URL no está en la lista de Redirect URLs permitidas

**Solución**:
1. Revisa que agregaste EXACTAMENTE estas URLs:
   - `https://udesanocode.vercel.app/reset-password`
   - `http://localhost:3000/reset-password`
2. No debe haber espacios extras ni caracteres adicionales
3. Guarda los cambios en Supabase

### Problema: El enlace expira muy rápido
**Causa**: Configuración de expiración por defecto

**Solución**:
1. Ve a Authentication → Settings en Supabase
2. Busca "Password Recovery Expiration"
3. Por defecto es 3600 segundos (1 hora)
4. Ajusta si necesitas más tiempo

### Problema: La confirmación de email dejó de funcionar
**Causa**: Probablemente no agregaste `/auth/callback` a las Redirect URLs

**Solución**:
1. Asegúrate de agregar AMBAS rutas:
   - `/reset-password` (para password reset)
   - `/auth/callback` (para email confirmation)
2. Ambas son necesarias y no se interfieren

## 📋 Checklist de Configuración

Antes de considerar el fix completo, verifica:

- [ ] Código actualizado (ya está listo)
- [ ] Site URL configurada en Supabase
- [ ] Redirect URLs agregadas en Supabase:
  - [ ] `/reset-password` para producción
  - [ ] `/reset-password` para localhost
  - [ ] `/auth/callback` para producción (confirmación email)
  - [ ] `/auth/callback` para localhost (confirmación email)
- [ ] SMTP configurado en Supabase
- [ ] Probado en desarrollo: reset password funciona
- [ ] Probado en desarrollo: confirmación de email funciona
- [ ] Desplegado a producción
- [ ] Probado en producción: ambos flujos funcionan

## 🎯 Resultado Esperado

Después de esta implementación:

1. **Password Reset**: Email → `/reset-password` ✅
2. **Email Confirmation**: Email → `/auth/callback` → `/dashboard` ✅
3. Ningún flujo afecta al otro ✅
4. No más redirects a home con código en URL ✅

## 📚 Documentos Relacionados

- `PASSWORD_RESET_GUIDE.md` - Guía completa de password reset
- `SUPABASE_EMAIL_SETUP.md` - Configuración de SMTP
- `EMAIL_TEMPLATE_CONFIG.md` - Configuración de templates

---

**Última actualización**: Noviembre 2, 2025  
**Estado**: ✅ Implementado - Requiere configuración en Supabase

