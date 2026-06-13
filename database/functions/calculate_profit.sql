create or replace function calculate_profit()
returns table(total_revenue numeric, total_cost numeric, profit numeric)
language sql
as $$
  select
    coalesce(sum(i.total_amount),0) as total_revenue,
    coalesce(sum(p.cost_price * oi.quantity),0) as total_cost,
    coalesce(sum(i.total_amount),0) - coalesce(sum(p.cost_price * oi.quantity),0) as profit
  from invoices i
  left join order_items oi on oi.order_id = i.order_id
  left join products p on p.id = oi.product_id;
$$;
