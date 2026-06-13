create or replace function inventory_alert()
returns trigger
language plpgsql
as $$
begin
  if new.stock_level <= new.reorder_threshold then
    insert into notifications (user_id, title, message, type, data)
    values (null, 'Low stock alert', concat(new.name, ' stock is below threshold.'), 'alert', jsonb_build_object('inventory_id', new.id, 'stock_level', new.stock_level));
  end if;
  return new;
end;
$$;
