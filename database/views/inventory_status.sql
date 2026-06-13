create or replace view inventory_status as
select
  i.id,
  i.name,
  i.category,
  i.stock_level,
  i.reorder_threshold,
  case when i.stock_level <= i.reorder_threshold then 'Low' else 'Healthy' end as status
from inventory i;
