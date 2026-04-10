# Guía de Testing - Control de Acceso por Roles

## ⚠️ IMPORTANTE: Primero debes ejecutar SUPABASE_RLS_SETUP.sql

Antes de testear, **DEBES ejecutar el archivo `SUPABASE_RLS_SETUP.sql`** en el SQL Editor de Supabase para configurar los permisos correctamente. Sin esto, el sistema NO funcionará.

## ✅ Cómo verificar que el sistema funciona correctamente

### Paso 1: Abrir la Consola del Navegador

1. Abre el navegador (Chrome, Edge, Firefox)
2. Presiona `F12` o `Ctrl+Shift+I` para abrir las herramientas de desarrollo
3. Ve a la pestaña "Console"

### Paso 2: Iniciar Sesión y Revisar los Logs

Cuando inicies sesión, verás mensajes en la consola como estos:

#### ✅ Usuario SIN rol en la base de datos (se trata como premium):
```
[useUserRole] Fetching role for user: abc123-uuid-here
[useUserRole] Error or no role found: {...}
[useUserRole] Error code: PGRST116
[useUserRole] No role in database - defaulting to premium
```
**Resultado esperado:** Puede acceder a Comunidad ✓

#### ✅ Usuario con rol "premium" explícito:
```
[useUserRole] Fetching role for user: abc123-uuid-here
[useUserRole] Role found: premium
```
**Resultado esperado:** Puede acceder a Comunidad ✓

#### ❌ Usuario con rol "free":
```
[useUserRole] Fetching role for user: abc123-uuid-here
[useUserRole] Role found: free
```
**Resultado esperado:** Ve **Comunidad**, **Material de Clase** y **Clases Grabadas** bloqueadas con candado 🔒

### Paso 3: Verificar Comportamiento Visual

#### Para usuarios PREMIUM (o sin rol):
- ✅ Sección "Comunidad" SIN candado
- ✅ Puede hacer clic y expandir la sección
- ✅ Ve "Comunidad de WhatsApp"
- ✅ Ve "Beneficios Exclusivos"
- ✅ Puede acceder a `/dashboard/benefits`

#### Para usuarios FREE:
- 🔒 **Comunidad**, **Material de Clase** y **Clases Grabadas** CON candado
- ❌ NO puede expandir esas secciones (cursor "not-allowed")
- ❌ Esas tarjetas aparecen con opacidad reducida (60%)
- ❌ Descripción: "Acceso exclusivo para miembros premium"
- ❌ Si intenta `/dashboard/benefits` o `/dashboard/worksheets`, es redirigido al dashboard

## 🔧 Cómo Configurar Roles en Supabase

### Opción 1: Desde el SQL Editor en Supabase

#### Marcar un usuario como FREE:
```sql
-- Buscar el user_id en la tabla auth.users por email
SELECT id, email FROM auth.users WHERE email = 'usuario@ejemplo.com';

-- Insertar o actualizar el rol
INSERT INTO user_roles (user_id, role_name)
VALUES ('el-uuid-del-usuario-aqui', 'free')
ON CONFLICT (user_id) 
DO UPDATE SET role_name = 'free';
```

#### Marcar un usuario como PREMIUM:
```sql
INSERT INTO user_roles (user_id, role_name)
VALUES ('el-uuid-del-usuario-aqui', 'premium')
ON CONFLICT (user_id) 
DO UPDATE SET role_name = 'premium';
```

#### Eliminar el rol de un usuario (volverá a ser premium por defecto):
```sql
DELETE FROM user_roles WHERE user_id = 'el-uuid-del-usuario-aqui';
```

### Opción 2: Desde la tabla directamente en Supabase

1. Ve a tu proyecto en Supabase
2. Navega a **Table Editor** > `user_roles`
3. Haz clic en **Insert** > **Insert row**
4. Completa:
   - `user_id`: UUID del usuario (cópialo de la tabla `auth.users`)
   - `role_name`: `free` o `premium`
5. Guarda

## 🐛 Troubleshooting

### ⚠️ Problema Crítico: Error 406 o "RLS_PERMISSION_ERROR"

Si ves en la consola:
```
⚠️ RLS PERMISSION ERROR - Check Supabase policies!
Run SUPABASE_RLS_SETUP.sql to fix permissions
```

O en el Network tab ves `406 (Not Acceptable)`:

**Causa:** Las tablas `user_roles` y `roles` tienen Row Level Security (RLS) activado pero SIN políticas que permitan leer los datos.

**Solución:**
1. Ve a tu proyecto en Supabase
2. Abre el **SQL Editor**
3. Copia y pega TODO el contenido del archivo `SUPABASE_RLS_SETUP.sql`
4. Ejecuta el script (botón "Run" o Ctrl+Enter)
5. Verifica que dice "Success" sin errores
6. Cierra sesión en tu app y vuelve a iniciar sesión
7. Revisa la consola - ahora debería decir `✓ Role found: premium` (o free)

### Problema: Todos los usuarios ven Comunidad bloqueada

**Causa probable:** Error de permisos en Supabase (RLS activado sin políticas)

**Solución:** Ejecuta `SUPABASE_RLS_SETUP.sql` como se describe arriba.

### Problema: Los cambios no se reflejan

**Solución:**
1. Cierra sesión completamente
2. Limpia el caché del navegador (Ctrl+Shift+Delete)
3. Vuelve a iniciar sesión
4. Revisa la consola para ver qué rol se está obteniendo

### Problema: La tabla user_roles no existe

**Solución:**
Crea la tabla en Supabase SQL Editor:

```sql
CREATE TABLE user_roles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role_name TEXT NOT NULL CHECK (role_name IN ('free', 'premium')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Política para que usuarios lean su rol
CREATE POLICY "Users can read their own role" 
ON user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Política para admins (opcional, ajusta según tus necesidades)
-- CREATE POLICY "Admins can manage all roles" 
-- ON user_roles 
-- USING (auth.jwt() ->> 'role' = 'admin');
```

## 📊 Escenarios de Testing

### Test 1: Usuario nuevo sin rol
1. Crea un usuario nuevo en Supabase Auth
2. NO agregues ningún registro en `user_roles`
3. Inicia sesión con ese usuario
4. **Esperado:** Ve Comunidad como premium (acceso completo)

### Test 2: Usuario marcado como free
1. Usa un usuario existente
2. Agrega registro en `user_roles` con `role_name = 'free'`
3. Inicia sesión
4. **Esperado:** Ve Comunidad, Material de Clase y Clases Grabadas bloqueadas con candado

### Test 3: Usuario marcado como premium
1. Usa un usuario existente
2. Agrega registro en `user_roles` con `role_name = 'premium'`
3. Inicia sesión
4. **Esperado:** Ve Comunidad con acceso completo

### Test 4: Cambio de free a premium
1. Usuario con rol free inicia sesión
2. En Supabase, cambia su rol a premium
3. Usuario cierra sesión y vuelve a iniciar
4. **Esperado:** Ahora tiene acceso completo a Comunidad

## 🔍 Verificación Rápida

Ejecuta esta query en Supabase SQL Editor para ver todos los roles:

```sql
SELECT 
  ur.user_id,
  au.email,
  ur.role_name,
  ur.created_at
FROM user_roles ur
LEFT JOIN auth.users au ON ur.user_id = au.id
ORDER BY ur.created_at DESC;
```

Esto te mostrará:
- Qué usuarios tienen roles asignados
- Qué rol tiene cada uno
- Cuándo se asignó el rol

