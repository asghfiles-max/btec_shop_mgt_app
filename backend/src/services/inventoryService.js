const supabase = require('../config/supabase');
const { ensureSupabaseConfigured } = require('../utils/supabaseHelper');

async function listInventory(filters) {
  ensureSupabaseConfigured();
  let builder = supabase.from('inventory').select('*');
  if (filters?.search) builder = builder.ilike('name', `%${filters.search}%`);
  const { data, error } = await builder.order('updated_at', { ascending: false });
  if (error) throw error;
  return data;
}

async function updateStock(id, payload) {
  ensureSupabaseConfigured();
  const { data, error } = await supabase.from('inventory').update(payload).eq('id', id).single();
  if (error) throw error;
  return data;
}

async function createInventoryItem(payload) {
  ensureSupabaseConfigured();
  const { data, error } = await supabase.from('inventory').insert([payload]).single();
  if (error) throw error;
  return data;
}

module.exports = { listInventory, updateStock, createInventoryItem };
