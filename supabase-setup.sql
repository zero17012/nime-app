-- ============================================================
-- NIME LAUNCHER - Script de configuración para Supabase
-- ============================================================
-- Ejecutá este script en el SQL Editor de tu nuevo proyecto
-- de Supabase (Dashboard > SQL Editor > New query).
-- ============================================================

-- ------------------------------------------------------------
-- 1. Tabla: apps
-- Catálogo principal de apps, juegos, películas y series
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS apps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  subcategory text,
  image_url text NOT NULL,
  logo_url text,
  screenshots jsonb NOT NULL DEFAULT '[]'::jsonb,
  youtube_id text,
  rating numeric NOT NULL DEFAULT 0,
  reviews integer NOT NULL DEFAULT 0,
  price text NOT NULL DEFAULT 'Free',
  publisher text NOT NULL,
  download_url text NOT NULL,
  type text,
  featured boolean NOT NULL DEFAULT false,
  versions jsonb,
  dependencies jsonb,
  downloads jsonb,
  episodes jsonb,
  duration text,
  genre text,
  director text,
  cast_members jsonb NOT NULL DEFAULT '[]'::jsonb,
  system_requirements jsonb,
  user_id uuid DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE apps ENABLE ROW LEVEL SECURITY;

-- Lectura pública: cualquier visitante puede ver el catálogo
CREATE POLICY "anon_select_apps" ON apps FOR SELECT
  TO anon, authenticated USING (true);

-- Solo usuarios autenticados pueden crear entradas propias
CREATE POLICY "insert_own_apps" ON apps FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

-- Solo el dueño puede editar sus entradas
CREATE POLICY "update_own_apps" ON apps FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Solo el dueño puede borrar sus entradas
CREATE POLICY "delete_own_apps" ON apps FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Índices para las consultas más frecuentes
CREATE INDEX IF NOT EXISTS idx_apps_category ON apps(category);
CREATE INDEX IF NOT EXISTS idx_apps_featured ON apps(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_apps_created_at ON apps(created_at DESC);

-- Actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER apps_updated_at
  BEFORE UPDATE ON apps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------
-- 2. Tabla: user_profiles
-- Perfiles de usuario (nombre, avatar)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_profile" ON user_profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

CREATE POLICY "insert_own_profile" ON user_profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "update_own_profile" ON user_profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "delete_own_profile" ON user_profiles FOR DELETE
  TO authenticated USING (auth.uid() = id);

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------
-- 3. Tabla: favorites
-- Favoritos de cada usuario
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  app_id uuid REFERENCES apps(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_favorites" ON favorites FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "insert_own_favorites" ON favorites FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "update_own_favorites" ON favorites FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "delete_own_favorites" ON favorites FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE UNIQUE INDEX IF NOT EXISTS idx_favorites_user_app ON favorites(user_id, app_id);

-- ============================================================
-- FIN DEL SCRIPT
-- ============================================================
