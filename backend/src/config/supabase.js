const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate environment variables
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('ERROR: Supabase configuration is required.');
  console.error('Missing environment variables:');
  if (!SUPABASE_URL) console.error('  - SUPABASE_URL');
  if (!SUPABASE_SERVICE_ROLE_KEY) console.error('  - SUPABASE_SERVICE_ROLE_KEY');
  console.error('\nPlease set these environment variables in Vercel or your .env file.');
  
  // Export a null client to allow app to start in development mode
  // In production, this will cause runtime errors when trying to use Supabase
  module.exports = null;
} else {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false
    }
  });

  module.exports = supabase;
}
