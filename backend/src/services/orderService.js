const supabase = require('../config/supabase');

async function createOrder(payload) {
  const { data, error } = await supabase.from('orders').insert([payload]).single();
  if (error) throw error;
  return data;
}

async function updateOrder(id, payload) {
  const { data, error } = await supabase.from('orders').update(payload).eq('id', id).single();
  if (error) throw error;
  return data;
}

async function getOrder(id) {
  const { data, error } = await supabase.from('orders').select('*, order_items(*)').eq('id', id).single();
  if (error) throw error;
  return data;
}

async function listOrders(filters) {
  let builder = supabase.from('orders').select('*, customers(name,email), order_items(*)');
  if (filters?.status) builder = builder.eq('status', filters.status);
  if (filters?.search) builder = builder.ilike('reference', `%${filters.search}%`).or(`customers.name.ilike.%${filters.search}%`);
  const { data, error } = await builder.order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

module.exports = { createOrder, updateOrder, getOrder, listOrders };
