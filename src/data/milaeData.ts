import type { MilaeEntry, FaccaoEntry, OpmEntry, PeriodoEntry, ChartEntry } from "../types";

export const milaeData: MilaeEntry[] = [
  { id: 1, resistentes: 1, agentes: 2, mes: "2026-01" },
  { id: 2, resistentes: 2, agentes: 2, mes: "2026-02" },
  { id: 3, resistentes: 2, agentes: 3, mes: "2026-03" },
];

export const chartData: ChartEntry[] = [
  { mes: "Jan", ano2025: 9, ano2026: 4 },
  { mes: "Fev", ano2025: 7, ano2026: 4 },
  { mes: "Mar", ano2025: 10, ano2026: 6 },
  { mes: "Abr", ano2025: 6, ano2026: 6 },
  { mes: "Mai", ano2025: 6, ano2026: 5 },
  { mes: "Jun", ano2025: 12, ano2026: 7 },
  { mes: "Jul", ano2025: 5, ano2026: 4 },
  { mes: "Ago", ano2025: 7, ano2026: 6 },
  { mes: "Set", ano2025: 8, ano2026: 5 },
  { mes: "Out", ano2025: 6, ano2026: 4 },
  { mes: "Nov", ano2025: 9, ano2026: 7 },
  { mes: "Dez", ano2025: 11, ano2026: 8 },
];

export const faccaoData: FaccaoEntry[] = [
  { nome: "BDM", quantidade: 65 },
  { nome: "NÃO VINCULADO", quantidade: 22 },
  { nome: "CV", quantidade: 19 },
  { nome: "PCC", quantidade: 8 },
  { nome: "KLV", quantidade: 1 },
];

export const opmData: OpmEntry[] = [
  { nome: "BPT-RMS", quantidade: 65 },
  { nome: "26° BPM", quantidade: 13 },
  { nome: "81ª CIPM", quantidade: 9 },
  { nome: "36ª CIPM", quantidade: 7 },
  { nome: "59ª CIPM", quantidade: 6 },
  { nome: "22ª CIPM", quantidade: 5 },
  { nome: "53ª CIPM", quantidade: 5 },
  { nome: "52ª CIPM", quantidade: 3 },
];

export const periodoData: PeriodoEntry[] = [
  { periodo: "Madrugada", quantidade: 14 },
  { periodo: "Manhã", quantidade: 18 },
  { periodo: "Tarde", quantidade: 60 },
  { periodo: "Noite", quantidade: 23 },
];
