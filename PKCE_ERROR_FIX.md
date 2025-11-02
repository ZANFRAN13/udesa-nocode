# 🔧 Fix: Error PKCE "code verifier should be non-empty"

## 🐛 El Problema

Cuando haces click en el enlace de confirmación del email, ves:

```
Error al confirmar el email: invalid request: both auth code and code verifier should be non-empty
```

### ¿Por qué pasa esto?

**PKCE** (Proof Key for Code Exchange) es una medida de seguridad que Supabase usa por defecto. Funciona así:

1. Cuando te registras, se guarda un "código secreto" (code_verifier) en las cookies de tu navegador
2. Cuando haces click en el enlace del email, Supabase busca ese código secreto
3. Si no lo encuentra (porque abriste el enlace en otro navegador/dispositivo), falla

Este problema ocurre cuando:
- ❌ Abres el enlace en un navegador diferente
- ❌ Las cookies se limpiaron antes de confirmar
- ❌ El enlace se abre en un cliente de email que no comparte cookies
- ❌ Hay problemas de configuración de dominio/cookies en producción

---

## ✅ Soluciones (en orden de preferencia)

### Solución 1: Deshabilitar Confirmación de Email (MÁS SIMPLE - Recomendado para desarrollo)

Esta es la solución más simple para entornos de desarrollo o si no necesitas confirmación obligatoria.

#### Pasos:

1. **Ir a:** [Supabase Dashboard](https://app.supabase.com)

2. **Seleccionar tu proyecto**

3. **Ir a:** `Authentication` → `Settings`

4. **Buscar:** "Enable email confirmations"

5. **Desactivar** esa opción ❌

6. **Guardar cambios**

7. **Resultado:** Los usuarios podrán iniciar sesión inmediatamente después de registrarse, sin confirmar email

#### Pros y Contras:

✅ **Pros:**
- Funciona inmediatamente
- No hay problemas de PKCE
- Mejor experiencia de usuario (no hay que esperar email)

❌ **Contras:**
- No verifica que el email sea real
- Usuarios pueden registrarse con emails falsos

**Recomendado para:** Desarrollo, MVPs, apps internas

---

### Solución 2: Usar Magic Link en lugar de Password

En lugar de registro con contraseña, usa "Magic Link" (enlace mágico) para autenticación.

#### Cambiar el flujo de registro:

```typescript
// En app/login/page.tsx, reemplazar el handleAuth con:

const handleMagicLink = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)
  setError(null)

  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })
    
    if (error) throw error
    
    setMessage('¡Revisa tu email! Te hemos enviado un enlace mágico para iniciar sesión.')
    setLoading(false)
  } catch (error: any) {
    setError(error.message)
    setLoading(false)
  }
}
```

#### Pros y Contras:

✅ **Pros:**
- Sin problemas de PKCE
- Sin contraseñas (más seguro)
- Experiencia moderna

❌ **Contras:**
- Cambio en el flujo de UX
- Requiere acceso al email cada vez

---

### Solución 3: Configurar Correctamente el Dominio y Cookies

Si quieres mantener el flujo actual, asegúrate de que todo esté configurado correctamente.

#### A) Verificar Site URL en Supabase

1. **Ir a:** `Authentication` → `URL Configuration`

2. **Site URL** debe ser tu dominio de producción:
   ```
   https://udesanocode.vercel.app
   ```

3. **NO usar:** `localhost` como Site URL en producción

#### B) Verificar Redirect URLs

Deben estar ambas:
```
http://localhost:3000/auth/callback
https://udesanocode.vercel.app/auth/callback
```

#### C) Verificar Configuración de Cookies en Producción

Asegúrate de que tu app en Vercel tenga las variables de entorno configuradas:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

---

### Solución 4: Abrir Enlace en el Mismo Navegador

Esta es una "solución temporal" pero no es práctica:

1. Registrarte en un navegador
2. Abrir el email **EN EL MISMO NAVEGADOR**
3. No limpiar cookies entre el registro y la confirmación

⚠️ **No recomendado:** Esto no es una solución real, solo un workaround para testing.

---

## 🎯 Mi Recomendación

### Para Desarrollo/Testing:
→ **Usar Solución 1** (Deshabilitar confirmación de email)

### Para Producción:
→ **Usar Solución 2** (Magic Link) o **Solución 1** dependiendo de tus necesidades

### Si REALMENTE necesitas email+password con confirmación:
→ **Usar Solución 3** (Configuración correcta) + considerar enviar un "segundo email" de bienvenida después de que el usuario inicie sesión manualmente

---

## 🔄 Plan de Acción Recomendado

### Opción A: Quick Fix (5 minutos)

```
1. Ir a Supabase Dashboard
2. Authentication → Settings
3. Desactivar "Enable email confirmations"
4. Guardar
5. ✅ Listo - registra un nuevo usuario y podrás iniciar sesión inmediatamente
```

### Opción B: Solución Profesional (30 minutos)

```
1. Implementar Magic Link (código arriba)
2. Actualizar UI para reflejar nuevo flujo
3. Probar en desarrollo
4. Deployar a producción
5. ✅ Experiencia de usuario moderna sin contraseñas
```

---

## 🧪 Cómo Probar Después del Fix

### Si deshabilitaste confirmación de email:

1. Ir a `/login`
2. Registrarse con email y contraseña
3. ✅ Deberías poder iniciar sesión **inmediatamente**
4. No necesitas confirmar email

### Si implementaste Magic Link:

1. Ir a `/login`
2. Ingresar solo email (sin contraseña)
3. Revisar email
4. Click en magic link
5. ✅ Deberías estar autenticado automáticamente

---

## 💡 Entendiendo PKCE (Para Referencia)

**PKCE** = Proof Key for Code Exchange

Es como un "apretón de manos secreto":

```
Registro:
1. Navegador genera un secreto aleatorio
2. Lo guarda en cookies
3. Registra usuario

Confirmación:
4. Email con enlace
5. Click en enlace
6. Busca el secreto en cookies
7. ❌ Si no está = ERROR
8. ✅ Si está = Éxito
```

El problema es el paso 6 - si no estás en el mismo navegador, no hay secreto.

---

## 🆘 Ayuda Adicional

### El error persiste después de deshabilitar confirmación:
- Registra un **nuevo usuario** (los anteriores siguen con el estado viejo)
- Limpia cookies del navegador
- Prueba en modo incógnito

### Quiero mantener confirmación de email:
- Considera cambiar a Magic Link
- O acepta que usuarios deben abrir enlace en mismo navegador
- O implementa un flujo híbrido (registro sin confirmación + opción de verificar después)

---

## 📚 Referencias

- [Supabase PKCE Flow](https://supabase.com/docs/guides/auth/auth-helpers/nextjs#understanding-the-authentication-flow)
- [Magic Links en Supabase](https://supabase.com/docs/guides/auth/auth-magic-link)
- [Email OTP vs Password](https://supabase.com/docs/guides/auth/auth-email-templates)

---

**Última actualización:** Noviembre 2, 2025  
**Versión:** 1.0 - Soluciones PKCE

