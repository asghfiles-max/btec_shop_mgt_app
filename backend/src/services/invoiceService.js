const supabase = require('../config/supabase');
const { ensureSupabaseConfigured } = require('../utils/supabaseHelper');

async function createInvoice(payload) {
  ensureSupabaseConfigured();
  const { data, error } = await supabase.from('invoices').insert([payload]).single();
  if (error) throw error;
  return data;
}

async function getInvoice(id) {
  ensureSupabaseConfigured();
  const { data, error } = await supabase.from('invoices').select('*, invoice_items(*)').eq('id', id).single();
  if (error) throw error;
  return data;
}

async function listInvoices(filters) {
  ensureSupabaseConfigured();
  let builder = supabase.from('invoices').select('*, customers(name,email)');
  if (filters?.status) builder = builder.eq('status', filters.status);
  const { data, error } = await builder.order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

module.exports = { createInvoice, getInvoice, listInvoices };
