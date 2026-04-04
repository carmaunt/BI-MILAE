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
```
src/
  types/
    index.ts              # Shared TypeScript types
  data/
    milaeData.ts          # MILAE, chart, faccao, OPM, periodo data
    rankingData.ts        # Agent ranking data
  styles/
    common.ts             # Shared inline style objects
  components/
    layout/
      Sidebar.tsx         # Navigation sidebar
    ui/
      StatCard.tsx        # Metric card component
      Panel.tsx           # Chart/content panel wrapper
    map/
      MilaeHeatMap.tsx    # Leaflet heatmap component
  pages/
    Dashboard/
      index.tsx           # Dashboard page
      components/
        EvolucaoCasosChart.tsx
        ResistentesFaccaoChart.tsx
        ResistentesPeriodoChart.tsx
        ResistentesOpmChart.tsx
        HeatMapPanel.tsx
    Agentes/
      index.tsx           # Agentes page
      components/
        RankingTable.tsx
        OcorrenciasFaccaoChart.tsx
        OcorrenciasMesChart.tsx
  App.tsx                 # Root layout + page routing
  main.tsx                # Entry point
```

## Development
- Run: `npm run dev` (port 5000)
- Build: `npm run build`

## Deployment
- Type: Static site
- Build command: `npm run build`
- Output directory: `dist`
