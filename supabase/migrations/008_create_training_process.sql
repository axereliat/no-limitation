-- Create training_process table
CREATE TABLE training_process (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE training_process ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Training process are viewable by everyone"
  ON training_process FOR SELECT USING (true);

CREATE POLICY "Admins can insert training_process"
  ON training_process FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can update training_process"
  ON training_process FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can delete training_process"
  ON training_process FOR DELETE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Junction table: martial_arts <-> training_process (many-to-many)
CREATE TABLE martial_arts_training_process (
  martial_art_id INTEGER NOT NULL REFERENCES martial_arts(id) ON DELETE CASCADE,
  training_process_id INTEGER NOT NULL REFERENCES training_process(id) ON DELETE CASCADE,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (martial_art_id, training_process_id)
);

-- Enable RLS
ALTER TABLE martial_arts_training_process ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Martial arts training process are viewable by everyone"
  ON martial_arts_training_process FOR SELECT USING (true);

CREATE POLICY "Admins can insert martial_arts_training_process"
  ON martial_arts_training_process FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can update martial_arts_training_process"
  ON martial_arts_training_process FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can delete martial_arts_training_process"
  ON martial_arts_training_process FOR DELETE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Indexes
CREATE INDEX idx_martial_arts_training_process_martial_art ON martial_arts_training_process(martial_art_id);
CREATE INDEX idx_martial_arts_training_process_training ON martial_arts_training_process(training_process_id);