const supabase = require('../config/supabase');

async function listUsers() {
  const { data, error } = await supabase.from('users').select('id,name,email,role,active,created_at');
  if (error) throw error;
  return data;
}

async function getUser(id) {
  const { data, error } = await supabase.from('users').select('id,name,email,role,active,created_at').eq('id', id).single();
  if (error) throw error;
  return data;
}

module.exports = { listUsers, getUser };
