create or replace function audit_log_trigger()
returns trigger
language plpgsql
as $$
begin
  insert into audit_logs (user_id, action, entity, entity_id, metadata)
  values (current_setting('app.current_user_id', true)::bigint, tg_op, TG_TABLE_NAME, coalesce(new.id, old.id), row_to_json(new));
  return new;
end;
$$;

create trigger audit_log_insert
after insert on orders
for each row execute function audit_log_trigger();

create trigger audit_log_update
after update on orders
for each row execute function audit_log_trigger();
