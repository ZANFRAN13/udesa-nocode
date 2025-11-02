-- =====================================================
-- CONFIGURACIÓN DE PERMISOS PARA CONTROL DE ROLES
-- Ejecutar en Supabase SQL Editor
-- =====================================================

-- 1. Habilitar RLS en ambas tablas (si no está habilitado)
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- 2. Eliminar políticas existentes que puedan estar causando conflictos
DROP POLICY IF EXISTS "Users can read their own role" ON user_roles;
DROP POLICY IF EXISTS "Enable read access for all users" ON user_roles;
DROP POLICY IF EXISTS "Allow users to read roles" ON roles;
DROP POLICY IF EXISTS "Enable read access for authenticated users only" ON user_roles;

-- 3. POLÍTICA PARA user_roles: Los usuarios pueden leer su propio rol
CREATE POLICY "Users can read their own role" 
ON user_roles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- 4. POLÍTICA PARA roles: Todos los usuarios autenticados pueden leer la tabla de roles
CREATE POLICY "Authenticated users can read all roles" 
ON roles 
FOR SELECT 
TO authenticated
USING (true);

-- 5. Verificar que las políticas se crearon correctamente
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('user_roles', 'roles')
ORDER BY tablename, policyname;

