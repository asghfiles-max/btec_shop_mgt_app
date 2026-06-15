-- Migration: Add Admin User
-- Description: Inserts initial admin user with hashed password
-- Created: 2024-06-13
-- Email: burnatecsolutions@gmail.com
-- Password: Iamtech@100 (hashed with bcrypt, 10 rounds)

-- ============================================================================
-- UP MIGRATION
-- ============================================================================

-- Insert admin user with idempotency check
-- This ensures the migration can be run multiple times without creating duplicates
INSERT INTO users (name, email, password, role, active)
SELECT 
  'Admin User',
  'burnatecsolutions@gmail.com',
  '$2a$10$A6KzGYvOxOsepgOzC9vQE.fJw0eVKyEhqKohJDZofDfLdAtHUxd/2',
  'Super Admin',
  true
WHERE NOT EXISTS (
  SELECT 1 FROM users WHERE email = 'burnatecsolutions@gmail.com'
);

-- ============================================================================
-- DOWN MIGRATION
-- ============================================================================

-- Remove admin user (rollback)
DELETE FROM users WHERE email = 'burnatecsolutions@gmail.com';
