# Printing Shop Management System

A full-stack printing shop management platform built with:
- Frontend: HTML5, CSS3, Vanilla JavaScript
- Backend: Node.js, Express.js
- Database: Supabase PostgreSQL
- Deployment: Vercel (frontend), Railway (backend)

## Project Structure
- `frontend/`: Static web client and application UI
- `backend/`: Express API server, authentication, file uploads, PDF generation
- `database/`: Supabase SQL schema, functions, triggers, views, seed data
- `docs/`: API, deployment, architecture, database documentation
- `scripts/`: migration and seed helpers

## Setup
1. Install dependencies:
   ```bash
   npm install
   npm install --prefix backend
   npm install --prefix frontend
   ```
2. Copy environment template:
   ```bash
   cp .env.example backend/.env.example
   ```
3. Configure Supabase and SMTP values in `backend/.env`.
4. Run backend locally:
   ```bash
   npm --prefix backend run dev
   ```
5. Run frontend locally:
   ```bash
   npm --prefix frontend run dev
   ```

## Deploy
- Frontend: Deploy `frontend/` to Vercel.
- Backend: Deploy `backend/` to Railway.
- Database: Apply SQL migrations in `database/` to Supabase.

## Notes
This repository includes modular backend routing, JWT authentication, role based access control, audit logging, file upload handling, PDF invoice generation, and email notifications.
