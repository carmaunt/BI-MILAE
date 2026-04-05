# BI-MILAE

An analytical dashboard for monitoring and analyzing "Morte em Intervenção de Agente do Estado" (MILAE) — police interventions resulting in deaths — in Salvador, Bahia.

## Architecture

This is a full-stack monorepo with:

- **Frontend**: React 19 + TypeScript + Vite (port 5000)
- **Backend**: Node.js + Express + TypeScript via tsx (port 3001)
- **Database**: PostgreSQL via Prisma ORM (Replit built-in DB)

## Project Structure

```
/
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── pages/     # Dashboard, Agentes, Cadastro
│   │   ├── components/# Reusable UI components
│   │   ├── services/  # API clients (milaeApi.ts)
│   │   ├── hooks/     # Custom hooks (useMilaeRecords)
│   │   └── data/      # Mock data and utilities
│   └── vite.config.ts # Vite config (port 5000, host 0.0.0.0)
├── backend/           # Express API server
│   ├── src/
│   │   ├── server.ts  # Express entry point (port 3001)
│   │   ├── routes/    # milae.ts routes
│   │   └── lib/       # prisma.ts client
│   ├── prisma/        # Schema + migrations
│   └── .env           # Database URL (Replit DB)
└── replit.md
```

## Workflows

- **Start application**: `cd frontend && npm run dev` (port 5000, webview)
- **Backend API**: `cd backend && npm run dev` (port 3001, console)

## Data Models

- **Milae**: An incident record (date, time, location, coordinates)
- **Agente**: Police officer involved (name, badge, unit/OPM)
- **Resistente**: Individual killed (name, age, criminal faction, coordinates)
- **Faccao** enum: BDM, CV, PCC, KLV, NAO_VINCULADO

## Authentication

JWT-based auth with two roles:
- **ADMIN**: full access — can view, create records (Cadastro), and manage users
- **VISUALIZADOR**: read-only — sees Dashboard and Agentes pages only

Initial admin credentials:
- E-mail: `admin@bimilae.gov.br`
- Senha: `admin@2025`

Token stored in localStorage via Zustand persist middleware.
API proxy: Vite forwards `/api/*` to `localhost:3001` so no CORS issue in dev.

User management endpoints:
- `POST /api/auth/login` — public
- `GET /api/auth/me` — any authenticated user
- `GET /api/auth/usuarios` — ADMIN only
- `POST /api/auth/usuarios` — ADMIN only
- `PATCH /api/auth/usuarios/:id` — ADMIN only

Seed new admin: `cd backend && npx tsx src/scripts/seed-admin.ts`

## Key Technologies

- Material UI (MUI) v7 for UI components
- Recharts for data visualization
- Leaflet + leaflet.heat for heat maps
- TanStack React Query for server state
- Zustand for local state
- React Hook Form + Zod for form validation
- Prisma 7 with PostgreSQL adapter (PrismaPg)

## Running Locally

Frontend and backend both use `npm run dev`.

Prisma migrations: `cd backend && npx prisma migrate deploy`
Generate client: `cd backend && npx prisma generate`
