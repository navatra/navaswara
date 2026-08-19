-- =============================================================
-- NAVASWARA — Supabase Database Migration
-- Run this in Supabase SQL Editor or via CLI
-- =============================================================

-- Table: rsvp
-- Stores guest RSVP confirmations
CREATE TABLE IF NOT EXISTS rsvp (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_slug TEXT NOT NULL,
  guest_name      TEXT NOT NULL,
  attendance      TEXT NOT NULL CHECK (attendance IN ('hadir', 'tidak_hadir')),
  pax_count       INTEGER NOT NULL DEFAULT 1 CHECK (pax_count > 0 AND pax_count <= 10),
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rsvp_invitation_slug ON rsvp(invitation_slug);
CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON rsvp(created_at DESC);

-- Table: wishes
-- Stores guest wishes / ucapan
CREATE TABLE IF NOT EXISTS wishes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_slug TEXT NOT NULL,
  guest_name      TEXT NOT NULL,
  message         TEXT NOT NULL,
  is_visible      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_wishes_invitation_slug ON wishes(invitation_slug);
CREATE INDEX IF NOT EXISTS idx_wishes_created_at ON wishes(created_at DESC);

-- =============================================================
-- Row Level Security
-- =============================================================

-- RLS for rsvp table
ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_insert_rsvp"
  ON rsvp FOR INSERT
  WITH CHECK (true);

-- Only service_role can SELECT rsvp (owner via Supabase Dashboard)
CREATE POLICY "service_read_rsvp"
  ON rsvp FOR SELECT
  USING (auth.role() = 'service_role');

-- RLS for wishes table
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_insert_wishes"
  ON wishes FOR INSERT
  WITH CHECK (true);

-- Public can read visible wishes (shown on invitation page)
CREATE POLICY "public_read_visible_wishes"
  ON wishes FOR SELECT
  USING (is_visible = true);

-- Service role can read all wishes (including hidden, for moderation)
CREATE POLICY "service_read_all_wishes"
  ON wishes FOR SELECT
  USING (auth.role() = 'service_role');

-- Service role can update wishes (for moderation: set is_visible = false)
CREATE POLICY "service_update_wishes"
  ON wishes FOR UPDATE
  USING (auth.role() = 'service_role');
