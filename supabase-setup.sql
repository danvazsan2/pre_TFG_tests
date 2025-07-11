-- =============================================
-- SUPABASE DATABASE SETUP
-- =============================================

-- 1. Crear la tabla de perfiles (profiles)
-- Esta tabla almacenará información adicional de los usuarios
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- 2. Crear índices para mejorar el rendimiento
CREATE INDEX idx_profiles_id ON profiles(id);

-- 3. Habilitar Row Level Security (RLS) para la tabla profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 4. Crear políticas de seguridad para la tabla profiles
-- Política para permitir que los usuarios vean solo su propio perfil
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Política para permitir que los usuarios actualicen solo su propio perfil
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Política para permitir que los usuarios inserten su propio perfil
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 5. Crear función para manejar la creación automática de perfiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, full_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Crear trigger para ejecutar la función cuando se crea un nuevo usuario
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 7. Crear función para actualizar el timestamp de updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Crear trigger para actualizar automáticamente updated_at
CREATE TRIGGER handle_updated_at_profiles
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

-- =============================================
-- CONFIGURACIÓN DE AUTENTICACIÓN
-- =============================================

-- 9. Configurar las políticas de autenticación (ejecutar en el dashboard de Supabase)
-- Ir a Authentication > Settings y configurar:
-- - Site URL: http://localhost:3000 (para desarrollo)
-- - Redirect URLs: http://localhost:3000/auth/callback (para desarrollo)
-- - Email confirmation: Enabled (recomendado)
-- - Double confirm email changes: Enabled (recomendado)

-- =============================================
-- DATOS DE EJEMPLO (OPCIONAL)
-- =============================================

-- Insertar algunos datos de ejemplo (opcional)
-- Nota: Estos datos se insertarán automáticamente cuando los usuarios se registren
-- a través de la aplicación web

-- =============================================
-- CONSULTAS ÚTILES PARA VERIFICAR EL SETUP
-- =============================================

-- Verificar que las tablas se crearon correctamente
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Verificar que las políticas RLS están habilitadas
SELECT schemaname, tablename, rowsecurity FROM pg_tables WHERE tablename = 'profiles';

-- Verificar las políticas de seguridad
SELECT policyname, tablename, cmd, permissive, roles, qual, with_check 
FROM pg_policies WHERE tablename = 'profiles';

-- Verificar los triggers
SELECT trigger_name, table_name, action_timing, event_manipulation 
FROM information_schema.triggers 
WHERE table_name IN ('profiles');

-- =============================================
-- INSTRUCCIONES ADICIONALES
-- =============================================

/*
Para ejecutar estas consultas en Supabase:

1. Ve a tu proyecto en https://supabase.com
2. Navega a "SQL Editor" en el menú lateral
3. Crea una nueva consulta
4. Copia y pega el código SQL de arriba
5. Ejecuta la consulta haciendo clic en "Run"

IMPORTANTE: 
- Ejecuta estas consultas en orden
- Algunas consultas pueden fallar si ya existen las tablas/funciones
- Revisa la consola de errores para cualquier problema
- Asegúrate de que tu proyecto de Supabase esté en modo desarrollo para pruebas

CONFIGURACIÓN ADICIONAL EN EL DASHBOARD:
1. Ve a Authentication > Settings
2. Configura el Site URL: http://localhost:3000
3. Configura las Redirect URLs: http://localhost:3000/auth/callback
4. Habilita Email confirmation si quieres que los usuarios confirmen su email
*/
