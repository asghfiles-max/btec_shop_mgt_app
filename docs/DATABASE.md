# Database Design

## Key Entities
- `users`: application users and roles
- `customers`: customer contacts and metadata
- `orders`: print orders with customer relationships
- `order_items`: line items for orders
- `products`: sellable print products and services
- `inventory`: stock levels for paper, ink, materials
- `suppliers`: suppliers for inventory materials
- `invoices`: billing records for orders
- `invoice_items`: invoice line details
- `payments`: payment receipts and tracking
- `audit_logs`: action auditing for monitoring
- `notifications`: alerts and system notifications

## Operations
- `generate_invoice(order_id)` creates invoice records for orders
- `calculate_profit()` summarizes revenue and cost
- `inventory_alert()` triggers low-stock notifications
- `update_timestamp()` maintains `updated_at` fields
