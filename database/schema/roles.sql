-- roles table
create table if not exists roles (
  id serial primary key,
  name text unique not null,
  description text,
  created_at timestamp with time zone default now()
);

-- define role names for RBAC
insert into roles (name, description) values
('Super Admin','Full system access'),
('Manager','Manage customers, orders, inventory'),
('Cashier','Process sales and payments'),
('Designer','Review artwork and prepare jobs'),
('Printing Operator','Execute print production');
