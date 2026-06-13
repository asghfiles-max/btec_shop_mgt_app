-- Sample seed data for Supabase

insert into users (name, email, password, role, active)
values
('Super Admin', 'admin@example.com', '$2a$10$4rAEuGK/2pHfHkRlD6Mx4OgpyhNDT/Zf0F9ZxwGPjPbgzjO1JxzelK', 'Super Admin', true),
('Manager User', 'manager@example.com', '$2a$10$4rAEuGK/2pHfHkRlD6Mx4OgpyhNDT/Zf0F9ZxwGPjPbgzjO1JxzelK', 'Manager', true),
('Cashier User', 'cashier@example.com', '$2a$10$4rAEuGK/2pHfHkRlD6Mx4OgpyhNDT/Zf0F9ZxwGPjPbgzjO1JxzelK', 'Cashier', true);

insert into customers (name, email, phone, address, company, notes)
values
('John Doe','john@example.com','0801234567','123 Main Street','ACME Ltd','Regular client'),
('Jane Smith','jane@example.com','0807654321','456 Market Road','Creative Print','Requires fast turnaround');

insert into suppliers (name, email, phone, address)
values
('Paper Supply Co','paper@supply.com','08011112222','Warehouse 3'),
('Ink Solutions','ink@supply.com','08033334444','Printer district');

insert into products (sku, name, description, unit_price, cost_price, category)
values
('PRD-001','A4 Glossy Paper','Premium glossy print paper',250.00,150.00,'Paper'),
('PRD-002','Color Ink Cartridge','Magenta ink cartridge',1800.00,1200.00,'Ink');

insert into inventory (name, category, stock_level, reorder_threshold, unit, supplier_id, cost)
values
('A4 Glossy Paper','Paper',500,100,'sheets',1,150.00),
('Magenta Ink Cartridge','Ink',50,10,'units',2,1200.00);
