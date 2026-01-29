-- Create instructors table
CREATE TABLE instructors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  photo_url TEXT,
  disciplines TEXT[],
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;

-- Anyone can read instructors
CREATE POLICY "Instructors are viewable by everyone"
  ON instructors FOR SELECT
  USING (true);

-- Only admins can insert/update/delete
CREATE POLICY "Admins can insert instructors"
  ON instructors FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update instructors"
  ON instructors FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete instructors"
  ON instructors FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Insert initial instructor data
INSERT INTO instructors (name, title, bio, disciplines, display_order) VALUES
(
  'Генко Симеонов',
  'Старши инструктор',
  'Съ-основател на NL Fight Club. Старши инструктор по Джийт Кун До под ръководството на GM Любомир Йорданов.',
  ARRAY['Jeet Kune Do', 'MMA', 'Eskrima'],
  1
),
(
  'Панталей Гергов',
  'Старши инструктор',
  'Съ-основател на NL Fight Club. Старши инструктор по Джийт Кун До и треньор по ММА.',
  ARRAY['Jeet Kune Do', 'MMA', 'San Da'],
  2
);
