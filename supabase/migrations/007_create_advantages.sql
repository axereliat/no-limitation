-- Create advantages table
CREATE TABLE advantages (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE advantages ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Advantages are viewable by everyone"
  ON advantages FOR SELECT USING (true);

CREATE POLICY "Admins can insert advantages"
  ON advantages FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can update advantages"
  ON advantages FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can delete advantages"
  ON advantages FOR DELETE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Junction table: martial_arts <-> advantages (many-to-many)
CREATE TABLE martial_arts_advantages (
  martial_art_id INTEGER NOT NULL REFERENCES martial_arts(id) ON DELETE CASCADE,
  advantage_id INTEGER NOT NULL REFERENCES advantages(id) ON DELETE CASCADE,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (martial_art_id, advantage_id)
);

-- Enable RLS
ALTER TABLE martial_arts_advantages ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Martial arts advantages are viewable by everyone"
  ON martial_arts_advantages FOR SELECT USING (true);

CREATE POLICY "Admins can insert martial_arts_advantages"
  ON martial_arts_advantages FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can update martial_arts_advantages"
  ON martial_arts_advantages FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can delete martial_arts_advantages"
  ON martial_arts_advantages FOR DELETE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Indexes
CREATE INDEX idx_martial_arts_advantages_martial_art ON martial_arts_advantages(martial_art_id);
CREATE INDEX idx_martial_arts_advantages_advantage ON martial_arts_advantages(advantage_id);