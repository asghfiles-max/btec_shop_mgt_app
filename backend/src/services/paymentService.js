const supabase = require('../config/supabase');

async function listPayments(query) {
  let builder = supabase.from('payments').select('*');
  if (query?.customer_id) builder = builder.eq('customer_id', query.customer_id);
  const { data, error } = await builder.order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

async function getPayment(id) {
  const { data, error } = await supabase.from('payments').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

async function createPayment(payload) {
  const { data, error } = await supabase.from('payments').insert([payload]).single();
  if (error) throw error;
  return data;
}

async function updatePayment(id, payload) {
  const { data, error } = await supabase.from('payments').update(payload).eq('id', id).single();
  if (error) throw error;
  return data;
}

module.exports = { listPayments, getPayment, createPayment, updatePayment };
