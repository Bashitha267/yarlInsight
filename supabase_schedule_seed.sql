-- =========================================================
-- YARL INSIGHT 3.0 - SUPABASE SCHEDULE SCHEMA & SEED SCRIPT
-- Copy and paste this into Supabase SQL Editor to update tables & insert schedule data
-- =========================================================

-- 1. Drop existing schedule tables to ensure correct column data types
DROP TABLE IF EXISTS schedule_events CASCADE;
DROP TABLE IF EXISTS schedule_days CASCADE;

-- 2. Create Schedule Days Table (event_date as VARCHAR for flexible labels)
CREATE TABLE schedule_days (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    day_label VARCHAR(50) NOT NULL, -- e.g., 'Day 01'
    event_date VARCHAR(100) NOT NULL, -- e.g., 'Day 1 Schedule' or 'October 24, 2024'
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Schedule Events Table (with is_active flag for HAPPENING NOW)
CREATE TABLE schedule_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    day_id UUID REFERENCES schedule_days(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    speaker VARCHAR(255),
    event_type VARCHAR(100), -- 'KEYNOTE', 'WORKSHOP', 'PANEL', 'BREAK', 'GENERAL'
    display_time VARCHAR(100) NOT NULL, -- e.g., '07:30 AM - 08:00 AM'
    is_active BOOLEAN DEFAULT false,    -- Flag to toggle 'HAPPENING NOW'
    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable RLS and setup public permissions
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

-- 5. Insert actual Day 01 and Day 02 Schedule Data
DO $$
DECLARE
    day1_id UUID;
    day2_id UUID;
BEGIN
    -- DAY 01
    INSERT INTO schedule_days (day_label, event_date, sort_order)
    VALUES ('Day 01', 'Day 1 Schedule', 1)
    RETURNING id INTO day1_id;

    INSERT INTO schedule_events (day_id, title, speaker, event_type, display_time, is_active, sort_order) VALUES
    (day1_id, 'Registration of the Participants', 'Organizing Team', 'GENERAL', '07:30 AM - 08:00 AM', false, 1),
    (day1_id, 'Opening Ceremony', 'President, VC, Dean, HOD & IEEE Counselor', 'GENERAL', '08:00 AM - 09:15 AM', false, 2),
    (day1_id, 'AI-powered Requirement Engineering and Product Discovery (Part 1)', 'Naresh Shanmgaraj', 'KEYNOTE', '09:30 AM - 10:30 AM', true, 3),
    (day1_id, 'Tea Break', '', 'BREAK', '10:30 AM - 11:00 AM', false, 4),
    (day1_id, 'AI-powered Requirement Engineering and Product Discovery (Part 2)', 'Naresh Shanmgaraj', 'WORKSHOP', '11:00 AM - 12:30 PM', false, 5),
    (day1_id, 'Lunch Break', '', 'BREAK', '12:30 PM - 01:30 PM', false, 6),
    (day1_id, 'AI-assisted Development and Code Generation (Part 1)', 'Anto Sheron', 'KEYNOTE', '01:30 PM - 03:00 PM', false, 7),
    (day1_id, 'Tea Break', '', 'BREAK', '03:00 PM - 03:30 PM', false, 8),
    (day1_id, 'AI-assisted Development and Code Generation (Part 2)', 'Anto Sheron', 'WORKSHOP', '03:30 PM - 05:00 PM', false, 9),
    (day1_id, 'Group Photo & Closing', 'Organizing Team', 'GENERAL', '05:00 PM - 05:10 PM', false, 10);

    -- DAY 02
    INSERT INTO schedule_days (day_label, event_date, sort_order)
    VALUES ('Day 02', 'Day 2 Schedule', 2)
    RETURNING id INTO day2_id;

    INSERT INTO schedule_events (day_id, title, speaker, event_type, display_time, is_active, sort_order) VALUES
    (day2_id, 'Automated Testing and Quality Assurance using AI (Part 1)', 'Susara Jayaweera Patabendige', 'KEYNOTE', '09:00 AM - 10:30 AM', false, 1),
    (day2_id, 'Tea Break', '', 'BREAK', '10:30 AM - 11:00 AM', false, 2),
    (day2_id, 'Automated Testing and Quality Assurance using AI (Part 2)', 'Susara Jayaweera Patabendige', 'WORKSHOP', '11:00 AM - 12:30 PM', false, 3),
    (day2_id, 'Lunch Break', '', 'BREAK', '12:30 PM - 01:30 PM', false, 4),
    (day2_id, 'AI-driven DevOps, Monitoring, and Predictive Maintenance (Part 1)', 'Gnanakeethan Balasubramaniam', 'KEYNOTE', '01:30 PM - 03:00 PM', false, 5),
    (day2_id, 'Tea Break', '', 'BREAK', '03:00 PM - 03:30 PM', false, 6),
    (day2_id, 'AI-driven DevOps, Monitoring, and Predictive Maintenance (Part 2)', 'Gnanakeethan Balasubramaniam', 'WORKSHOP', '03:30 PM - 05:00 PM', false, 7),
    (day2_id, 'Vote of Thanks, Group Photo & Closing', 'Organizing Committee', 'GENERAL', '05:00 PM - 05:10 PM', false, 8);

END $$;
