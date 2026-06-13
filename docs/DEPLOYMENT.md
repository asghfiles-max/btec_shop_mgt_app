# Deployment Guide

## Frontend (Vercel)
1. Connect repository to Vercel.
2. Set `ROOT` to `frontend`.
3. Configure environment variables in Vercel:
   - `API_URL`
   - `APP_NAME`
4. Deploy and verify routes.

## Backend (Railway)
1. Create Railway project and connect repository.
2. Set project root to `backend`.
3. Configure environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_ANON_KEY`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN`
   - `FRONTEND_URL`
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
4. Add health check endpoint: `/api/health`.
5. Deploy and inspect logs.

## Database (Supabase)
1. Create a Supabase project.
2. Apply migrations from `database/schema`, `database/functions`, `database/triggers`, and `database/views`.
3. Configure RLS policies for `users`, `customers`, `orders`, `inventory`, `invoices`, `payments`, and `notifications`.
4. Seed sample data from `database/seed/sample_data.sql`.
