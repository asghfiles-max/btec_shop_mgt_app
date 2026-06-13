create or replace view customer_statistics as
select
  c.id as customer_id,
  c.name,
  c.email,
  count(distinct o.id) as total_orders,
  coalesce(sum(i.total_amount),0) as total_spent
from customers c
left join orders o on o.customer_id = c.id
left join invoices i on i.customer_id = c.id
group by c.id, c.name, c.email;
