export type Page = "dashboard" | "agentes";

export type Mes =
  | "jan"
  | "fev"
  | "mar"
  | "abr"
  | "mai"
  | "jun"
  | "jul"
  | "ago"
  | "set"
  | "out"
  | "nov"
  | "dez";

export type MilaeEntry = {
  id: number;
  resistentes: number;
  agentes: number;
  mes: string;
};

export type FaccaoEntry = {
  nome: string;
  quantidade: number;
};

export type OpmEntry = {
  nome: string;
  quantidade: number;
};

export type PeriodoEntry = {
  periodo: string;
  quantidade: number;
};

export type ChartEntry = {
  mes: string;
  ano2025: number;
  ano2026: number;
};

export type RankingItem = {
  nome: string;
  ocorrencias: number;
  resistentesTotal: number;
  mensal: Record<Mes, number>;
  faccoes: FaccaoEntry[];
};

export type DadosTela = {
  titulo: string;
  totalMilae: number;
  totalResistentes: number;
  mediaMensalResistentes: string;
  ocorrenciasPorMesData: { mes: string; quantidade: number }[];
  ocorrenciasPorFaccaoData: FaccaoEntry[];
};
