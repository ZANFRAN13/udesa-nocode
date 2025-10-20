# Configuración de Email para Password Reset en Supabase

Este documento explica cómo configurar el servicio de email en Supabase para que el flujo de recuperación de contraseña funcione correctamente.

## ⚠️ Requisito Importante

Para que el flujo de "Olvidé mi contraseña" funcione, **DEBES configurar el SMTP en tu proyecto de Supabase**. Sin esta configuración, los correos de recuperación NO se enviarán.

## 📧 Configuración de SMTP en Supabase

### Opción 1: Usar el SMTP de Supabase (Más fácil - Para desarrollo)

Supabase proporciona un servicio de email limitado para desarrollo:

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. Navega a **Authentication** → **Email Templates**
3. Supabase ya tiene SMTP configurado por defecto para desarrollo
4. **Limitación**: Solo funciona en desarrollo, tiene límites de envío

### Opción 2: Configurar tu propio SMTP (Recomendado - Para producción)

Para producción, debes usar tu propio servicio SMTP. Opciones populares:

#### A) Gmail (Para desarrollo/testing)

1. Ve a tu [Cuenta de Google](https://myaccount.google.com/)
2. Seguridad → Verificación en dos pasos (actívala si no la tienes)
3. Seguridad → Contraseñas de aplicaciones
4. Genera una contraseña de aplicación para "Correo"
5. En Supabase Dashboard:
   - **Authentication** → **Settings** → **SMTP Settings**
   - **Host**: `smtp.gmail.com`
   - **Port**: `465`
   - **User**: `tu-email@gmail.com`
   - **Password**: La contraseña de aplicación generada
   - **Sender email**: `tu-email@gmail.com`
   - **Sender name**: Tu nombre o nombre de la app

#### B) SendGrid (Recomendado para producción)

1. Crea una cuenta en [SendGrid](https://sendgrid.com/)
2. Verifica tu dominio
3. Crea una API Key
4. En Supabase Dashboard:
   - **Authentication** → **Settings** → **SMTP Settings**
   - **Host**: `smtp.sendgrid.net`
   - **Port**: `587`
   - **User**: `apikey` (literalmente la palabra "apikey")
   - **Password**: Tu API Key de SendGrid
   - **Sender email**: email verificado en SendGrid
   - **Sender name**: Tu nombre o nombre de la app

#### C) Resend (Popular y fácil)

1. Crea una cuenta en [Resend](https://resend.com/)
2. Obtén tu API Key
3. En Supabase Dashboard:
   - **Authentication** → **Settings** → **SMTP Settings**
   - **Host**: `smtp.resend.com`
   - **Port**: `465`
   - **User**: `resend`
   - **Password**: Tu API Key de Resend
   - **Sender email**: email verificado en Resend
   - **Sender name**: Tu nombre o nombre de la app

## 📝 Personalizar el Template del Email

Una vez configurado el SMTP:

1. Ve a **Authentication** → **Email Templates** → **Reset Password**
2. Personaliza el contenido del email:
   ```html
   <h2>Restablecer contraseña</h2>
   <p>Hola,</p>
   <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta.</p>
   <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
   <p><a href="{{ .ConfirmationURL }}">Restablecer contraseña</a></p>
   <p>Si no solicitaste este cambio, ignora este correo.</p>
   <p>Este enlace expirará en 60 minutos.</p>
   ```
3. Guarda los cambios

## 🔧 Variables de Template Disponibles

- `{{ .Email }}` - Email del usuario
- `{{ .ConfirmationURL }}` - URL de confirmación
- `{{ .SiteURL }}` - URL de tu sitio

## ✅ Verificar que Funciona

1. Ve a tu app en `/forgot-password`
2. Ingresa un email registrado
3. Revisa tu bandeja de entrada
4. Si no llega el correo:
   - Revisa spam/correo no deseado
   - Verifica la configuración SMTP en Supabase
   - Revisa los logs en Supabase Dashboard → Logs

## 🚀 Flujo Implementado

### 1. **Forgot Password** (`/forgot-password`)
   - Usuario ingresa su email
   - Se envía un correo con un enlace seguro
   - El enlace apunta a `/reset-password`

### 2. **Reset Password** (`/reset-password`)
   - Verifica que el enlace sea válido
   - Usuario ingresa nueva contraseña
   - Actualiza la contraseña en Supabase
   - Redirige al login

### 3. **Login** (`/login`)
   - Ahora incluye enlace "¿Olvidaste tu contraseña?"
   - Solo visible en modo "Iniciar sesión" (no en registro)

## 🔐 Seguridad

- Los enlaces de recuperación expiran después de 1 hora por defecto
- Solo se puede usar un enlace una vez
- El enlace contiene un token seguro generado por Supabase
- La nueva contraseña debe tener mínimo 6 caracteres (configurable)

## 🎨 Personalización Adicional

### Cambiar tiempo de expiración del enlace

En Supabase Dashboard:
- **Authentication** → **Settings** → **Auth settings**
- **Password Recovery Expiration**: Por defecto 3600 segundos (1 hora)

### Cambiar la URL de redirección

En el código (`app/forgot-password/page.tsx`), línea con `resetPasswordForEmail`:

```typescript
redirectTo: `${window.location.origin}/reset-password`
// Cambia '/reset-password' por tu URL personalizada
```

## 🐛 Troubleshooting

### Los correos no llegan
- ✅ Verifica que SMTP esté configurado en Supabase
- ✅ Revisa la carpeta de spam
- ✅ Verifica que el email del remitente esté verificado
- ✅ Revisa los logs en Supabase Dashboard

### "Invalid session" al abrir el enlace
- ✅ El enlace puede haber expirado (1 hora por defecto)
- ✅ El enlace ya fue usado
- ✅ Verifica que la URL de redirección coincida con tu dominio

### Error al actualizar la contraseña
- ✅ Verifica que la contraseña cumpla los requisitos (mínimo 6 caracteres)
- ✅ Revisa los logs de Supabase para más detalles

## 📱 Testing

Para probar el flujo completo:

1. **Desarrollo local**:
   ```bash
   npm run dev
   ```
   Abre `http://localhost:3000/login`

2. **Test el flujo**:
   - Click en "¿Olvidaste tu contraseña?"
   - Ingresa un email registrado
   - Revisa tu correo
   - Click en el enlace
   - Ingresa nueva contraseña
   - Verifica que puedes hacer login

## 📚 Recursos Adicionales

- [Supabase Auth Email Setup](https://supabase.com/docs/guides/auth/auth-smtp)
- [Supabase Password Recovery](https://supabase.com/docs/guides/auth/passwords#password-recovery)
- [Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)

