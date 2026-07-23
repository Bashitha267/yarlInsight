-- =========================================================
-- YARL INSIGHT 3.0 - SUPABASE SCHEDULE SCHEMA & SEED SCRIPT (DAY 01 ONLY)
-- Copy and paste this into Supabase SQL Editor to update tables & insert exact agenda
-- =========================================================

-- 1. Drop existing schedule tables to ensure a clean schema reset
DROP TABLE IF EXISTS schedule_events CASCADE;
DROP TABLE IF EXISTS schedule_days CASCADE;

-- 2. Create Schedule Days Table
CREATE TABLE schedule_days (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    day_label VARCHAR(50) NOT NULL, -- e.g., 'Day 01'
    event_date VARCHAR(100) NOT NULL, -- e.g., '25 JULY'
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Schedule Events Table
CREATE TABLE schedule_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    day_id UUID REFERENCES schedule_days(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    speaker VARCHAR(255),
    event_type VARCHAR(100), -- 'KEYNOTE', 'WORKSHOP', 'PANEL', 'BREAK', 'GENERAL'
    display_time VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT false,    -- Flag to toggle 'HAPPENING NOW'
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable RLS & public access policies
ALTER TABLE schedule_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on schedule_days" ON schedule_days;
CREATE POLICY "Allow public read access on schedule_days" ON schedule_days FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access on schedule_events" ON schedule_events;
CREATE POLICY "Allow public read access on schedule_events" ON schedule_events FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow full access on schedule_days" ON schedule_days;
CREATE POLICY "Allow full access on schedule_days" ON schedule_days FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow full access on schedule_events" ON schedule_events;
CREATE POLICY "Allow full access on schedule_events" ON schedule_events FOR ALL USING (true);

-- 5. Enable Realtime updates across clients
ALTER PUBLICATION supabase_realtime ADD TABLE schedule_events;

-- 6. Insert Exact Day 01 Agenda (25 JULY 2026)
DO $$
DECLARE
    day1_id UUID;
BEGIN
    INSERT INTO schedule_days (day_label, event_date, sort_order)
    VALUES ('Day 01', 'July 25, 2026', 1)
    RETURNING id INTO day1_id;

    INSERT INTO schedule_events (day_id, title, speaker, event_type, display_time, is_active, sort_order) VALUES
    (day1_id, 'Registration', 'Organizing Team', 'GENERAL', '08.00 – 08.30 AM', false, 1),
    (day1_id, 'Lighting of the Oil Lamp', 'Dignitaries', 'GENERAL', '08.30 – 08.40 AM', false, 2),
    (day1_id, 'Welcome Speech (Chairperson)', 'Chairperson', 'GENERAL', '08.40 – 08.50 AM', false, 3),
    (day1_id, 'Speech by Vice Chancellor, University of Jaffna', 'Vice Chancellor, UOJ', 'GENERAL', '08.50 – 09.00 AM', false, 4),
    (day1_id, 'Speech by Dean, Faculty of Science', 'Dean, Faculty of Science', 'GENERAL', '09.00 – 09.10 AM', false, 5),
    (day1_id, 'Speech by HoD, Department of Computer Science', 'HoD, Department of Computer Science', 'GENERAL', '09.10 – 09.20 AM', false, 6),
    (day1_id, 'Overview of Yarl Insight & Event Guidelines', 'Organizing Committee', 'GENERAL', '09.20 – 09.30 AM', false, 7),
    (day1_id, 'Session 1: AI-powered Requirement Engineering & Product Discovery', 'Mr. Naresh Shanmugaraj', 'KEYNOTE', '09.30 – 10.30 AM', true, 8),
    (day1_id, 'Tea Break', '', 'BREAK', '10.30 – 11.00 AM', false, 9),
    (day1_id, 'Session 1: Continue', 'Mr. Naresh Shanmugaraj', 'WORKSHOP', '11.00 – 12.30 PM', false, 10),
    (day1_id, 'Lunch Break', '', 'BREAK', '12.30 – 01.30 PM', false, 11),
    (day1_id, 'Session 2: AI-assisted Development & Code Generation', 'Mr. Jude Selvakumar Anto Sheron', 'KEYNOTE', '01.30 – 03.00 PM', false, 12),
    (day1_id, 'Tea Break', '', 'BREAK', '03.00 – 03.30 PM', false, 13),
    (day1_id, 'Session 2: Continue', 'Mr. Jude Selvakumar Anto Sheron', 'WORKSHOP', '03.30 – 05.00 PM', false, 14),
    (day1_id, 'Group Photo & Closing Ceremony', 'Organizing Team', 'GENERAL', '05.00 – 05.10 PM', false, 15);
END $$;
