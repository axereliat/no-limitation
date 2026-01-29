-- Create classes table
CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  discipline TEXT NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME,
  age_group TEXT DEFAULT 'adult' CHECK (age_group IN ('adult', '5-7', '8-13')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;

-- Anyone can read classes
CREATE POLICY "Classes are viewable by everyone"
  ON classes FOR SELECT
  USING (true);

-- Only admins can insert/update/delete
CREATE POLICY "Admins can insert classes"
  ON classes FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update classes"
  ON classes FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete classes"
  ON classes FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Insert initial schedule data
INSERT INTO classes (discipline, day_of_week, start_time, end_time, age_group) VALUES
-- Adult classes
('BJJ - Gi', 0, '20:00', '21:30', 'adult'),
('MMA Striking', 1, '20:00', '21:30', 'adult'),
('Eskrima', 2, '19:00', '20:00', 'adult'),
('Grappling No-Gi', 2, '20:00', '21:30', 'adult'),
('BJJ - Gi', 3, '20:00', '21:30', 'adult'),
('MMA Striking', 4, '20:00', '21:30', 'adult'),
('Grappling No-Gi', 5, '18:00', '19:30', 'adult'),
('Eskrima', 6, '17:00', '18:00', 'adult'),
('MMA Striking', 6, '18:00', '19:30', 'adult'),
-- Kids classes (5-7 years)
('BJJ - Gi', 0, '18:15', '19:00', '5-7'),
('BJJ - Gi', 3, '18:15', '19:00', '5-7'),
-- Kids classes (8-13 years)
('BJJ - Gi', 0, '19:00', '20:00', '8-13'),
('JKD Kickbox', 1, '19:00', '20:00', '8-13'),
('BJJ - Gi', 3, '19:00', '20:00', '8-13'),
('JKD Kickbox', 4, '19:00', '20:00', '8-13');
