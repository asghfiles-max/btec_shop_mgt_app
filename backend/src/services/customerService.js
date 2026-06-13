const supabase = require('../config/supabase');

async function createCustomer(payload) {
  const { data, error } = await supabase.from('customers').insert([payload]).single();
  if (error) throw error;
  return data;
}

async function updateCustomer(id, payload) {
  const { data, error } = await supabase.from('customers').update(payload).eq('id', id).single();
  if (error) throw error;
  return data;
}

async function deleteCustomer(id) {
  const { error } = await supabase.from('customers').delete().eq('id', id);
  if (error) throw error;
  return true;
}

async function listCustomers(query) {
  let builder = supabase.from('customers').select('*');
  if (query?.search) {
    builder = builder.ilike('name', `%${query.search}%`).or(`email.ilike.%${query.search}%`);
  }
  const { data, error } = await builder.order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

async function getCustomerHistory(customerId) {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

module.exports = { createCustomer, updateCustomer, deleteCustomer, listCustomers, getCustomerHistory };
