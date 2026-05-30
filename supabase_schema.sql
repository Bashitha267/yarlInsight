-- 1. Projects Table (Based on ProjectDetails.jsx)
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    tag VARCHAR(100),
    start_date DATE,
    end_date DATE,
    location VARCHAR(255),
    description TEXT,
    hero_image_url TEXT,
    thumbnail_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Project Speakers
CREATE TABLE project_speakers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    description TEXT,
    image_url TEXT,
    sort_order INTEGER DEFAULT 0
);

-- 3. Project Committee
CREATE TABLE project_committee (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    image_url TEXT,
    sort_order INTEGER DEFAULT 0
);

-- 3b. Project Sponsors
CREATE TABLE project_sponsors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    color VARCHAR(20),
    image_url TEXT,
    sort_order INTEGER DEFAULT 0
);

-- 4. Project Highlights (Gallery)
CREATE TABLE project_highlights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(255),
    type VARCHAR(100), -- e.g., 'Main Stage', 'Networking'
    image_url TEXT,
    grid_size VARCHAR(50) -- e.g., 'large', 'wide', 'small' to match your grid layout
);

-- 5. Schedule Days
CREATE TABLE schedule_days (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    day_label VARCHAR(50) NOT NULL, -- e.g., 'Day 01'
    event_date DATE NOT NULL,
    sort_order INTEGER DEFAULT 0
);

-- 6. Schedule Events
CREATE TABLE schedule_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    day_id UUID REFERENCES schedule_days(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    speaker VARCHAR(255),
    event_type VARCHAR(100), -- e.g., 'KEYNOTE', 'WORKSHOP', 'PANEL'
    start_time TIMESTAMPTZ NOT NULL, -- Full timestamp to check current time
    end_time TIMESTAMPTZ NOT NULL,   -- Full timestamp to check current time
    display_time VARCHAR(50)         -- e.g., '08:30 AM' for fallback/display
);

-- Enable RLS (Row Level Security) and allow public read access
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_committee ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on project_speakers" ON project_speakers FOR SELECT USING (true);
CREATE POLICY "Allow public read access on project_sponsors" ON project_sponsors FOR SELECT USING (true);
CREATE POLICY "Allow public read access on project_committee" ON project_committee FOR SELECT USING (true);
CREATE POLICY "Allow public read access on project_highlights" ON project_highlights FOR SELECT USING (true);
CREATE POLICY "Allow public read access on schedule_days" ON schedule_days FOR SELECT USING (true);
CREATE POLICY "Allow public read access on schedule_events" ON schedule_events FOR SELECT USING (true);

-- Insert dummy data for testing the Schedule highlighting logic
DO $$
DECLARE
    new_project_id UUID;
    day1_id UUID;
BEGIN
    INSERT INTO projects (title, tag, start_date, end_date, location, description)
    VALUES ('Quantum Leap: AI', 'Annual Summit 2024', CURRENT_DATE, CURRENT_DATE + interval '2 days', 'Tech Hub, Colombo', 'Test description')
    RETURNING id INTO new_project_id;

    INSERT INTO schedule_days (project_id, day_label, event_date)
    VALUES (new_project_id, 'Day 01', CURRENT_DATE)
    RETURNING id INTO day1_id;

    -- Add an event that is currently happening (NOW is between start and end)
    INSERT INTO schedule_events (day_id, title, speaker, event_type, start_time, end_time, display_time)
    VALUES (
        day1_id, 
        'Live Keynote (Active Now!)', 
        'Dr. Aris Thorne', 
        'KEYNOTE', 
        NOW() - interval '30 minutes', -- Started 30 mins ago
        NOW() + interval '30 minutes', -- Ends in 30 mins
        'CURRENT TIME'
    );

    -- Add an event that is in the future
    INSERT INTO schedule_events (day_id, title, speaker, event_type, start_time, end_time, display_time)
    VALUES (
        day1_id, 
        'Future Workshop', 
        'Elena Rossi', 
        'WORKSHOP', 
        NOW() + interval '1 hour', 
        NOW() + interval '2 hours', 
        'LATER TODAY'
    );
END $$;

-- 7. Admins Table
CREATE TABLE admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
-- We allow public read access so the client can query the hash to verify login
CREATE POLICY "Allow public read access on admins" ON admins FOR SELECT USING (true);

-- Insert default admin user: username 'admin', password 'admin123'
-- The hash below is for 'admin123' generated via bcrypt
INSERT INTO admins (username, password_hash)
VALUES ('admin', '$2b$10$.mkeX8JYk0opSZRbtM8DY.0.Z9rySRTZuZctGlcJvma0DST5ruxSO');

