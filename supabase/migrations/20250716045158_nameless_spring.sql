/*
  # Crear tabla de aplicaciones

  1. Nueva tabla
    - `apps` - Almacena todas las aplicaciones con su información completa
      - `id` (text, primary key)
      - `name` (text)
      - `description` (text)
      - `category` (text)
      - `subcategory` (text)
      - `image_url` (text)
      - `logo_url` (text)
      - `screenshots` (text array)
      - `youtube_id` (text)
      - `rating` (numeric)
      - `reviews` (integer)
      - `price` (text)
      - `publisher` (text)
      - `download_url` (text)
      - `type` (text)
      - `featured` (boolean)
      - `system_requirements` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Seguridad
    - Habilitar RLS en la tabla `apps`
    - Agregar política para que todos puedan leer las aplicaciones
*/

CREATE TABLE IF NOT EXISTS apps (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  subcategory text NOT NULL,
  image_url text NOT NULL,
  logo_url text,
  screenshots text[] DEFAULT '{}',
  youtube_id text,
  rating numeric DEFAULT 0,
  reviews integer DEFAULT 0,
  price text DEFAULT 'Free',
  publisher text NOT NULL,
  download_url text NOT NULL,
  type text DEFAULT 'development',
  featured boolean DEFAULT false,
  system_requirements jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE apps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read apps"
  ON apps
  FOR SELECT
  TO public
  USING (true);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_apps_updated_at 
  BEFORE UPDATE ON apps 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();