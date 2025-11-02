# 📧 Configuración del Email de Confirmación en Supabase

## 🎯 Objetivo

Hacer que el enlace de confirmación del email lleve directamente al dashboard sin errores.

---

## ⚠️ El Problema Actual

El flujo por defecto de Supabase usa **PKCE** (Proof Key for Code Exchange), que requiere que el enlace se abra en el mismo navegador donde te registraste. Esto causa el error:

```
invalid request: both auth code and code verifier should be non-empty
```

---

## ✅ La Solución: Dos Enfoques

### **Opción 1: Usar Email OTP (SIN PKCE) - RECOMENDADO** ⭐

Este método funciona sin PKCE y es más confiable.

#### A) Configurar el Template en Supabase

1. **Ir a:** https://app.supabase.com → Tu proyecto

2. **Ir a:** `Authentication` → `Email Templates` → **"Confirm signup"**

3. **Reemplazar el template completo con este:**

```html
<h2>¡Bienvenido a UdesaNoCode!</h2>

<p>Gracias por registrarte. Haz click en el botón de abajo para confirmar tu cuenta:</p>

<p>
  <a 
    href="{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=signup" 
    style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;"
  >
    Confirmar mi cuenta
  </a>
</p>

<p>O copia y pega este enlace en tu navegador:</p>
<p>{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=signup</p>

<p style="color: #666; font-size: 12px; margin-top: 24px;">
  Si no te registraste, puedes ignorar este email.
  Este enlace expirará en 24 horas.
</p>
```

4. **Guardar**

#### B) Verificar Site URL

1. En la misma sección `URL Configuration`, verificar **Site URL**:
   ```
   https://udesanocode.vercel.app
   ```
   
2. Para desarrollo local, temporalmente puedes usar:
   ```
   http://localhost:3000
   ```

#### C) ¡Listo! Probar

1. Registrar un nuevo usuario
2. Revisar email
3. Click en el enlace
4. ✅ Debe llevarte al dashboard sin errores

---

### **Opción 2: Usar el Flujo Estándar con Redirect URL**

Si prefieres el flujo estándar de Supabase:

#### A) Template en Supabase

```html
<h2>¡Bienvenido a UdesaNoCode!</h2>

<p>Gracias por registrarte. Haz click en el botón de abajo para confirmar tu cuenta:</p>

<p>
  <a href="{{ .ConfirmationURL }}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
    Confirmar mi cuenta
  </a>
</p>

<p>O copia y pega este enlace en tu navegador:</p>
<p>{{ .ConfirmationURL }}</p>

<p style="color: #666; font-size: 12px; margin-top: 24px;">
  Si no te registraste, puedes ignorar este email.
  Este enlace expirará en 24 horas.
</p>
```

#### B) Configurar Redirect URLs

En `Authentication` → `URL Configuration` → **Redirect URLs**, agregar:

```
https://udesanocode.vercel.app/auth/callback
http://localhost:3000/auth/callback
```

#### C) **IMPORTANTE:** Limitación

⚠️ Con este método, el usuario DEBE abrir el enlace en el mismo navegador donde se registró, o verá el error de PKCE.

**Por eso recomendamos la Opción 1** ⭐

---

## 🧪 Cómo Probar

### Test Completo

1. **Limpiar cookies del navegador** (o usar modo incógnito)

2. **Ir a:** `https://udesanocode.vercel.app/login` (o localhost)

3. **Registrarse** con un email nuevo

4. **Revisar email** (incluyendo spam)

5. **Abrir el enlace** 
   - Con Opción 1: Funciona desde cualquier navegador ✅
   - Con Opción 2: Debe ser el mismo navegador ⚠️

6. **Verificar resultado:**
   - ✅ Deberías ver: "¡Registro completado exitosamente!"
   - ✅ Redirige a `/dashboard` en 2 segundos
   - ✅ Estás autenticado

---

## 🔍 Debug: Ver qué está pasando

### En el Navegador

1. **Abrir DevTools** (F12)

2. **Tab Console**

3. **Hacer click en el enlace del email**

4. **Buscar estos logs:**

Con Opción 1 (Token Hash):
```
Callback params: { ... hasTokenHash: true, type: 'signup' }
Processing token-based email confirmation
Session created via token: tu-email@ejemplo.com
```

Con Opción 2 (Code):
```
Callback params: { ... hasCode: true }
Processing email confirmation with code: abc123...
Session created successfully: tu-email@ejemplo.com
```

### Si Ves Errores

**"Token verification error"**
→ El enlace expiró (24 horas). Registra un nuevo usuario.

**"PKCE error"**
→ Estás usando Opción 2 en un navegador diferente. Usa Opción 1.

**"Exchange error"**
→ Problema de configuración. Verifica las Redirect URLs.

---

## 🎨 Personalizar el Email

Puedes personalizar el template con tu marca:

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <!-- Logo -->
  <div style="text-align: center; padding: 20px;">
    <img src="TU_LOGO_URL" alt="Logo" style="max-width: 200px;">
  </div>
  
  <!-- Contenido -->
  <div style="padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
    <h2 style="color: #333;">¡Bienvenido a UdesaNoCode!</h2>
    
    <p style="color: #666; line-height: 1.6;">
      Gracias por registrarte. Estás a un paso de comenzar tu viaje en el desarrollo sin código.
    </p>
    
    <p style="text-align: center; margin: 30px 0;">
      <a 
        href="{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=signup" 
        style="background-color: #4CAF50; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;"
      >
        Confirmar mi cuenta
      </a>
    </p>
    
    <p style="color: #999; font-size: 12px; text-align: center;">
      Este enlace expirará en 24 horas por seguridad
    </p>
  </div>
  
  <!-- Footer -->
  <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
    <p>UdesaNoCode - Tu plataforma de desarrollo sin código</p>
    <p>Si no te registraste, puedes ignorar este email.</p>
  </div>
</div>
```

---

## 📋 Variables Disponibles en Templates

Puedes usar estas variables en tu template:

- `{{ .Email }}` - Email del usuario
- `{{ .ConfirmationURL }}` - URL completa de confirmación (Opción 2)
- `{{ .TokenHash }}` - Token hash (Opción 1)
- `{{ .Token }}` - Token OTP
- `{{ .SiteURL }}` - URL base de tu sitio
- `{{ .RedirectTo }}` - URL de redirección personalizada

---

## ⚙️ Configuración Adicional

### Tiempo de Expiración

Por defecto, los enlaces expiran en 24 horas. Para cambiar:

1. **Ir a:** `Authentication` → `Settings`
2. Buscar: **"Email Link Expiration"**
3. Cambiar el valor (en segundos)
   - 1 hora = 3600
   - 24 horas = 86400
   - 7 días = 604800

### Reenviar Email de Confirmación

Si un usuario perdió el email, puedes:

**Opción A:** Desde el Dashboard
1. Ir a `Authentication` → `Users`
2. Encontrar el usuario
3. Click en `...` → `Resend confirmation email`

**Opción B:** Programáticamente
```typescript
// Agregar botón en tu UI
const resendConfirmation = async () => {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: userEmail
  })
  
  if (!error) {
    alert('Email reenviado!')
  }
}
```

---

## ✅ Checklist Final

Antes de probar, verifica:

- [ ] Template de email actualizado en Supabase
- [ ] Site URL configurada correctamente
- [ ] Redirect URLs configuradas (si usas Opción 2)
- [ ] Código actualizado (ya lo hicimos en `app/auth/callback/page.tsx`)
- [ ] Variables de entorno configuradas
- [ ] Limpiar cookies / usar modo incógnito para test

---

## 🆘 Ayuda Adicional

Si después de seguir esta guía aún tienes problemas:

1. Verifica que el email llegue (revisa spam)
2. Abre DevTools y revisa la consola
3. Copia el error completo
4. Verifica los logs en Supabase Dashboard → Logs

---

**Recomendación:** Usa **Opción 1 (Token Hash)** para evitar problemas de PKCE.

**Última actualización:** Noviembre 2, 2025  
**Versión:** 1.0

