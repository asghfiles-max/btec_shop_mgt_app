# API Documentation

## Authentication
- POST `/api/auth/login` — login with email and password
- POST `/api/auth/reset-password` — request password reset

## Customers
- GET `/api/customers` — list customers
- POST `/api/customers` — create customer
- PUT `/api/customers/:id` — update customer
- DELETE `/api/customers/:id` — remove customer
- GET `/api/customers/:id/history` — customer order history

## Orders
- GET `/api/orders` — list orders
- POST `/api/orders` — create order
- GET `/api/orders/:id` — get order details
- PUT `/api/orders/:id` — update order

## Inventory
- GET `/api/inventory` — list inventory
- POST `/api/inventory` — create inventory item
- PUT `/api/inventory/:id` — update stock

## Invoices
- GET `/api/invoices/:id` — get invoice details
- POST `/api/invoices` — create invoice
- GET `/api/invoices/:id/pdf` — download invoice PDF

## Reports
- GET `/api/reports/daily-sales`
- GET `/api/reports/monthly-sales`
- GET `/api/reports/profit-analysis`
- GET `/api/reports/inventory-status`
