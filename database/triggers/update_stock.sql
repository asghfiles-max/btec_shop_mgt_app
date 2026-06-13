create trigger inventory_stock_alert
after update on inventory
for each row execute function inventory_alert();
