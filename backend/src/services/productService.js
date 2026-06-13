const supabase = require('../config/supabase');

async function listProducts(query) {
  let builder = supabase.from('products').select('*');
  if (query?.search) builder = builder.ilike('name', `%${query.search}%`).or(`sku.ilike.%${query.search}%`);
  const { data, error } = await builder.order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

async function getProduct(id) {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

async function createProduct(payload) {
  const { data, error } = await supabase.from('products').insert([payload]).single();
  if (error) throw error;
  return data;
}

async function updateProduct(id, payload) {
  const { data, error } = await supabase.from('products').update(payload).eq('id', id).single();
  if (error) throw error;
  return data;
}

module.exports = { listProducts, getProduct, createProduct, updateProduct };
