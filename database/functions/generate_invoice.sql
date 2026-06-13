create or replace function generate_invoice(order_id bigint)
returns table(invoice_id bigint, invoice_number text, total_amount numeric)
language plpgsql
as $$
begin
  insert into invoices (order_id, customer_id, invoice_number, status, total_amount, due_date)
  select o.id, o.customer_id, concat('INV-', to_char(now(), 'YYYYMMDD'), '-', o.id), 'Unpaid', o.total_amount, now()::date + 14
  from orders o
  where o.id = order_id
  returning id, invoice_number, total_amount into invoice_id, invoice_number, total_amount;
  return next;
end;
$$;
