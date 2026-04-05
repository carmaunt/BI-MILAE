# BI-MILAE

## Overview
Painel analítico de ocorrências MILAE (Morte em Intervenção de Agente do Estado) para análise de dados policiais em Salvador-BA.

**Domínio:**
- **MILAE**: ocorrência policial com resistente(s) morto(s)
- **Resistente**: criminoso morto — possui facção e localização (lat/lng)
- **Agente**: policial de serviço — possui nome, matrícula e OPM (unidade de origem)

## Tech Stack
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 8
- **Dados**: TanStack React Query + Axios
- **Charts**: Recharts
- **Maps**: Leaflet + leaflet.heat
- **UI**: MUI v7 (instalado, disponível para uso)
- **Forms**: React Hook Form + Zod (disponível)

## Arquitetura de Dados

```
src/
  data/
    db.ts          ← Tipos (MilaeRecord, Agente, Resistente) + funções derivadas puras
    mockData.ts    ← Dados mock para desenvolvimento (sem backend)
  services/
    milaeApi.ts    ← Chamadas HTTP ao backend (axios)
  hooks/
    useMilaeRecords.ts ← Hook React Query (mock ↔ API real via VITE_API_URL)
```

### Fluxo de dados
1. Componentes chamam `useMilaeRecords()` — única fonte de dados
2. O hook retorna `MilaeRecord[]` (mock ou API, conforme env)
3. Funções derivadas puras em `db.ts` calculam todos os cards/gráficos
4. Para ativar o backend real: definir `VITE_API_URL=https://backend.com`

### Contrato do backend (MilaeRecord)
```typescript
{
  id:          number
  data:        string      // "YYYY-MM-DD"
  hora:        string      // "HH:MM"
  local:       string      // endereço textual do confronto
  lat:         number      // latitude do local do confronto
  lng:         number      // longitude do local do confronto
  agentes:     { nome, matricula, opm, vtr? }[]
  resistentes: { faccao, lat, lng }[]
}
```

## Estrutura de Componentes

```
src/
  components/
    layout/Sidebar.tsx
    ui/StatCard.tsx, Panel.tsx
    map/MilaeHeatMap.tsx    ← recebe heatPoints[] como prop
  pages/
    Dashboard/index.tsx     ← usa useMilaeRecords(), passa dados derivados como props
      components/EvolucaoCasosChart, ResistentesFaccao, Periodo, Opm, HeatMapPanel
    Agentes/index.tsx       ← usa useMilaeRecords(), mesma fonte que Dashboard
      components/RankingTable, OcorrenciasFaccao, OcorrenciasMes
  App.tsx
  main.tsx                  ← QueryClientProvider wrapping
```

## Development
- Run: `npm run dev` (port 5000)
- Build: `npm run build`
- Mock data: ativo por padrão (sem VITE_API_URL)

## Deployment
- Type: Static site
- Build: `npm run build`
- Output: `dist/`
