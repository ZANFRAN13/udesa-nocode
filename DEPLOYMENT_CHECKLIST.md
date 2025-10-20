# ✅ Checklist de Deployment - Password Reset

## Antes de Deployar a Producción

### 1. 🔐 Configuración de Supabase (CRÍTICO)

- [ ] **SMTP configurado en Supabase**
  - Ir a: Authentication → Settings → SMTP
  - Configurar con Gmail, SendGrid, Resend u otro servicio
  - Verificar sender email
  - Guardar configuración

- [ ] **Email templates personalizados**
  - Ir a: Authentication → Email Templates → Reset Password
  - Personalizar mensaje con tu marca
  - Verificar que `{{ .ConfirmationURL }}` esté presente
  - Guardar cambios

- [ ] **URL de redirección configurada**
  - Verificar en el código: `/forgot-password/page.tsx` línea 30
  - Debe apuntar a: `https://tudominio.com/reset-password`
  - Cambiar si es necesario antes de deployar

### 2. 🧪 Testing en Desarrollo

- [ ] **Probar flujo completo localmente**
  - [ ] Click en "¿Olvidaste tu contraseña?"
  - [ ] Ingresar email y verificar que llega el correo
  - [ ] Click en enlace del correo
  - [ ] Cambiar contraseña exitosamente
  - [ ] Verificar login con nueva contraseña

- [ ] **Verificar mensajes de error**
  - [ ] Email no registrado
  - [ ] Contraseñas que no coinciden
  - [ ] Contraseña muy corta
  - [ ] Enlace expirado

- [ ] **Verificar responsive design**
  - [ ] Mobile (320px - 768px)
  - [ ] Tablet (768px - 1024px)
  - [ ] Desktop (1024px+)

### 3. 🌐 Variables de Entorno

- [ ] **Verificar en Vercel/tu hosting**
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (si usas)

### 4. 🔗 URLs y Dominios

- [ ] **Configurar dominio en Supabase**
  - Authentication → URL Configuration
  - Site URL: `https://tudominio.com`
  - Redirect URLs: 
    - `https://tudominio.com/auth/callback`
    - `https://tudominio.com/reset-password`

### 5. 📧 SMTP en Producción

**Opción recomendada: SendGrid o Resend**

#### SendGrid:
```
Host: smtp.sendgrid.net
Port: 587
User: apikey
Password: [tu-api-key]
Sender: email@tudominio.com (debe estar verificado)
```

#### Resend:
```
Host: smtp.resend.com
Port: 465
User: resend
Password: [tu-api-key]
Sender: email@tudominio.com (debe estar verificado)
```

### 6. 🔒 Seguridad

- [ ] **Verificar límites de rate limiting**
  - Supabase tiene límites por defecto
  - Considera configurar límites personalizados

- [ ] **Tiempo de expiración de enlaces**
  - Por defecto: 3600 segundos (1 hora)
  - Ajustar en Authentication → Settings si es necesario

- [ ] **Política de contraseñas**
  - Mínimo actual: 6 caracteres
  - Ajustar en el código si necesitas más seguridad

### 7. 📊 Monitoreo

- [ ] **Configurar alertas**
  - Errores de envío de email
  - Fallos en reset de contraseña
  - Intentos sospechosos

- [ ] **Revisar logs regularmente**
  - Supabase Dashboard → Logs
  - Filtrar por errores de auth

### 8. 🎨 UX/UI Final

- [ ] **Textos revisados**
  - Sin errores ortográficos
  - Tono consistente con tu marca
  - Instrucciones claras

- [ ] **Tema dark/light**
  - Verificar contraste
  - Verificar legibilidad en ambos modos

### 9. 📱 Notificaciones

- [ ] **Email de confirmación enviado**
  - Mensaje claro al usuario
  - Instrucción para revisar spam

- [ ] **Email de éxito**
  - Considerar enviar confirmación de cambio de contraseña
  - Puede configurarse en Supabase Email Templates

### 10. 🚀 Deploy

- [ ] **Build exitoso**
  ```bash
  npm run build
  ```

- [ ] **Verificar en preview/staging primero**
  - Probar flujo completo en staging
  - Verificar que emails lleguen

- [ ] **Deploy a producción**
  - Hacer deployment
  - Probar inmediatamente después

## Post-Deployment

### Inmediatamente después:

- [ ] Probar flujo completo en producción
- [ ] Verificar que emails lleguen (y no vayan a spam)
- [ ] Probar en diferentes dispositivos
- [ ] Revisar logs por errores

### Primera semana:

- [ ] Monitorear tasa de éxito de password resets
- [ ] Revisar feedback de usuarios
- [ ] Ajustar templates de email si es necesario
- [ ] Verificar deliverability de emails

## 🆘 Troubleshooting Común en Producción

### Emails no llegan en producción (pero funcionaban en dev)

**Posibles causas:**
1. SMTP no configurado para producción
2. Sender email no verificado
3. Dominio en lista negra de spam
4. Límite de envío excedido

**Solución:**
- Revisar configuración SMTP en Supabase
- Verificar sender domain en tu servicio SMTP
- Revisar logs de Supabase
- Contactar soporte del servicio SMTP

### Enlace dice "inválido" en producción

**Posibles causas:**
1. URL de redirección no configurada correctamente
2. Redirect URL no autorizada en Supabase
3. Problema con CORS

**Solución:**
- Verificar URLs en Supabase → Authentication → URL Configuration
- Agregar dominio de producción a redirect URLs permitidas
- Verificar que el código use la URL correcta

### Usuarios reportan no recibir emails

**Checklist:**
1. ¿El email está registrado en la base de datos?
2. ¿El usuario revisó spam?
3. ¿Los logs de Supabase muestran el envío?
4. ¿Tu servicio SMTP tiene problemas?
5. ¿Alcanzaste el límite de envío?

## 📚 Recursos Útiles

- [Supabase Auth Dashboard](https://app.supabase.com)
- [SendGrid Dashboard](https://app.sendgrid.com)
- [Resend Dashboard](https://resend.com/emails)
- [Documentación completa](./SUPABASE_EMAIL_SETUP.md)

---

**Última actualización**: Verificar que todos los checkboxes estén marcados antes de considerar el deployment completo.

