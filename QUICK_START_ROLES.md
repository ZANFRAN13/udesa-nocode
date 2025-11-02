# Quick Start - Sistema de Roles

## 🚀 Paso a Paso Rápido

### 1️⃣ Ejecutar Script SQL (OBLIGATORIO)

1. Abre Supabase → Tu proyecto → **SQL Editor**
2. Abre el archivo `SUPABASE_RLS_SETUP.sql` de este repositorio
3. Copia TODO el contenido
4. Pégalo en el SQL Editor de Supabase
5. Click en **Run** (o presiona Ctrl+Enter)
6. Verifica que diga "Success"

### 2️⃣ Asignar Roles a Usuarios

Opción A - Desde Supabase UI:
1. Ve a **Table Editor** → `user_roles`
2. Click **Insert** → **Insert row**
3. Llena:
   - `user_id`: (copia el UUID desde la tabla `auth.users`)
   - `role_name`: escribe `free` o `premium` o `admin`
4. **Save**

Opción B - Con SQL:
```sql
-- Para marcar como FREE
INSERT INTO user_roles (user_id, role_name)
VALUES ('UUID-DEL-USUARIO-AQUI', 'free')
ON CONFLICT (user_id) DO UPDATE SET role_name = 'free';

-- Para marcar como PREMIUM
INSERT INTO user_roles (user_id, role_name)
VALUES ('UUID-DEL-USUARIO-AQUI', 'premium')
ON CONFLICT (user_id) DO UPDATE SET role_name = 'premium';
```

### 3️⃣ Verificar que Funciona

1. Refresca la app (F5)
2. Abre la consola del navegador (F12)
3. Inicia sesión
4. Busca en la consola:
   - ✅ `✓ Role found: free` → Usuario debe ver Comunidad bloqueada 🔒
   - ✅ `✓ Role found: premium` → Usuario puede acceder a Comunidad
   - ⚠️ Si ves error 406 o "RLS_PERMISSION_ERROR" → Vuelve al paso 1

## 🎯 Comportamiento Esperado

### Usuario FREE (role_name = 'free')
- 🔒 Ve "Comunidad" con candado
- ❌ No puede hacer clic
- ❌ No ve "WhatsApp" ni "Beneficios Exclusivos"
- ❌ Si intenta ir a `/dashboard/benefits`, es redirigido

### Usuario PREMIUM/ADMIN (role_name = 'premium' o 'admin')
- ✅ Puede abrir "Comunidad"
- ✅ Ve "WhatsApp" y "Beneficios Exclusivos"
- ✅ Accede a códigos en `/dashboard/benefits`

### Usuario SIN ROL en la tabla
- ✅ Se trata como PREMIUM (acceso completo)

## ❓ FAQ Rápido

**P: ¿Por qué veo error 406 en la consola?**
R: No ejecutaste el script SQL. Ve al paso 1.

**P: ¿Cómo sé qué UUID tiene un usuario?**
R: En Supabase, ve a **Authentication** → **Users** o a **Table Editor** → `auth.users` y busca por email.

**P: ¿Puedo cambiar el rol de un usuario?**
R: Sí, en `user_roles` edita el campo `role_name` o ejecuta:
```sql
UPDATE user_roles SET role_name = 'premium' WHERE user_id = 'UUID-AQUI';
```

**P: ¿Los cambios se aplican inmediatamente?**
R: El usuario debe cerrar sesión y volver a iniciar sesión para que se actualice el rol.

**P: ¿Qué pasa si borro un usuario de user_roles?**
R: Se trata automáticamente como premium (acceso completo).

## 📝 Archivos Importantes

- `SUPABASE_RLS_SETUP.sql` - Script para configurar permisos (EJECUTAR PRIMERO)
- `ROLE_TESTING_GUIDE.md` - Guía detallada de testing
- `ROLE_BASED_ACCESS_CONTROL.md` - Documentación técnica completa
- `lib/hooks/use-user-role.ts` - Hook que obtiene el rol del usuario

## 🆘 ¿Problemas?

1. **Error 406**: Ejecuta `SUPABASE_RLS_SETUP.sql`
2. **Todos ven bloqueado**: Ejecuta `SUPABASE_RLS_SETUP.sql`
3. **No se actualiza el rol**: Cierra sesión y vuelve a entrar
4. **Consola vacía**: Abre la pestaña "Console" en DevTools (F12)

