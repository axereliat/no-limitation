-- Create martial_arts table
CREATE TABLE martial_arts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  sub_title TEXT,
  description TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE martial_arts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Martial arts are viewable by everyone"
  ON martial_arts FOR SELECT USING (true);

CREATE POLICY "Admins can insert martial_arts"
  ON martial_arts FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can update martial_arts"
  ON martial_arts FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can delete martial_arts"
  ON martial_arts FOR DELETE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));