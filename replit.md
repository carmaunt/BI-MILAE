# BI-MILAE

## Overview
A React + Vite analytics dashboard (Painel analítico) for MILAE data visualization. The app displays dashboards, agent data, heatmaps, and various analytical charts.

## Tech Stack
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 8
- **UI Library**: MUI (Material UI) v7
- **Routing**: React Router DOM v7
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query + Axios
- **Charts**: Recharts
- **Maps**: Leaflet + React Leaflet (with heatmap support)
- **Forms**: React Hook Form + Zod
- **Real-time**: Socket.io client
- **Excel Export**: ExcelJS + FileSaver

## Project Structure
- `src/App.tsx` — Main application with routing and page components
- `src/MilaeHeatMap.tsx` — Heatmap component using Leaflet
- `src/main.tsx` — Entry point
- `src/theme.ts` — MUI theme configuration
- `public/` — Static assets
- `index.html` — HTML entry point

## Development
- Run: `npm run dev` (port 5000)
- Build: `npm run build`

## Deployment
- Type: Static site
- Build command: `npm run build`
- Output directory: `dist`
