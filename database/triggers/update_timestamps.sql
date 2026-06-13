create or replace function update_timestamp()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger users_update_timestamp
before update on users
for each row execute function update_timestamp();

create trigger customers_update_timestamp
before update on customers
for each row execute function update_timestamp();

create trigger orders_update_timestamp
before update on orders
for each row execute function update_timestamp();

create trigger products_update_timestamp
before update on products
for each row execute function update_timestamp();

create trigger inventory_update_timestamp
before update on inventory
for each row execute function update_timestamp();

create trigger invoices_update_timestamp
before update on invoices
for each row execute function update_timestamp();

create trigger payments_update_timestamp
before update on payments
for each row execute function update_timestamp();
