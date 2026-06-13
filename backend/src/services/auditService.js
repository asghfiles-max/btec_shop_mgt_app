const supabase = require('../config/supabase');

async function logAction(userId, action, entity, entityId, metadata = {}) {
  const payload = {
    user_id: userId,
    action,
    entity,
    entity_id: entityId,
    metadata: JSON.stringify(metadata)
  };

  const { error } = await supabase.from('audit_logs').insert([payload]);
  if (error) {
    console.error('Audit log error:', error);
  }
}

module.exports = { logAction };
