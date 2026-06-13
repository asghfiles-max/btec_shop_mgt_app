const supabase = require('../config/supabase');

/**
 * Ensures Supabase is configured before performing database operations
 * @throws {Error} If Supabase is not configured
 */
function ensureSupabaseConfigured() {
  if (!supabase) {
    throw new Error('Supabase configuration is required. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  }
}

module.exports = { ensureSupabaseConfigured };
