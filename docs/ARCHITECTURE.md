# Architecture Overview

The Printing Shop Management System is built as a modular full-stack application.

## Frontend
- Static pages served from `frontend/pages`
- Vanilla JS service layer in `frontend/js`
- Responsive UI with mobile-first design
- JWT authentication for secure API access

## Backend
- Express.js API server in `backend/src`
- Authentication and RBAC middleware
- Supabase client for PostgreSQL database integration
- RESTful controllers and business services
- PDF invoice generation and email notification support

## Database
- Supabase PostgreSQL with schema, functions, triggers, and views
- Row Level Security policies for data protection
- Audit logging and notification triggers

## Deployment
- Frontend deploys on Vercel
- Backend deploys on Railway
- Database lives on Supabase
