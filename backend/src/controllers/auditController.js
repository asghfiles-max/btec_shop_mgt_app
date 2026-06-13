const supabase = require('../config/supabase');
const { ensureSupabaseConfigured } = require('../utils/supabaseHelper');

async function getAuditLogs(req, res, next) {
  try {
    ensureSupabaseConfigured();
    const { data, error } = await supabase.from('audit_logs').select('*, users(id,name,email,role)').order('created_at', { ascending: false }).limit(100);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = { getAuditLogs };
