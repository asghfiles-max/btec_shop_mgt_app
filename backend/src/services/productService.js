const supabase = require('../config/supabase');
const { ensureSupabaseConfigured } = require('../utils/supabaseHelper');

async function listProducts(query) {
  ensureSupabaseConfigured();
  let builder = supabase.from('products').select('*');
  if (query?.search) builder = builder.ilike('name', `%${query.search}%`).or(`sku.ilike.%${query.search}%`);
  const { data, error } = await builder.order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

async function getProduct(id) {
  ensureSupabaseConfigured();
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

async function createProduct(payload) {
  ensureSupabaseConfigured();
  const { data, error } = await supabase.from('products').insert([payload]).single();
  if (error) throw error;
  return data;
}

async function updateProduct(id, payload) {
  ensureSupabaseConfigured();
  const { data, error } = await supabase.from('products').update(payload).eq('id', id).single();
  if (error) throw error;
  return data;
}

module.exports = { listProducts, getProduct, createProduct, updateProduct };
