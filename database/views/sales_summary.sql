create or replace view sales_summary as
select
  date_trunc('day', i.created_at) as period,
  sum(i.total_amount) as total_sales,
  count(distinct i.id) as invoices_count
from invoices i
group by date_trunc('day', i.created_at)
order by period desc;
