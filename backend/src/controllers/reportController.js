const supabase = require('../config/supabase');

async function dailySales(req, res, next) {
  try {
    const { data, error } = await supabase.rpc('sales_summary', { period: 'daily' });
    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function monthlySales(req, res, next) {
  try {
    const { data, error } = await supabase.rpc('sales_summary', { period: 'monthly' });
    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function profitAnalysis(req, res, next) {
  try {
    const { data, error } = await supabase.rpc('calculate_profit');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function inventoryStatus(req, res, next) {
  try {
    const { data, error } = await supabase.from('inventory_status').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = { dailySales, monthlySales, profitAnalysis, inventoryStatus };
