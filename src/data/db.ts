/**
 * CAMADA DE DADOS — BI-MILAE
 *
 * Este arquivo define os tipos que espelham exatamente o contrato do backend,
 * e as funções derivadas (puras) que calculam cada card/gráfico do frontend.
 *
 * Todas as funções recebem `records: MilaeRecord[]` como parâmetro —
 * nunca leem dados globais — permitindo trocar a fonte (mock ↔ API)
 * sem alterar nenhuma lógica de negócio.
 */

// ─── Enums / literais ────────────────────────────────────────────────────────

export type Periodo = "Madrugada" | "Manhã" | "Tarde" | "Noite";
export type Faccao  = "BDM" | "CV" | "PCC" | "KLV" | "NÃO VINCULADO";

// ─── Tipos que espelham o contrato do backend ────────────────────────────────

/** Policial de serviço presente no MILAE */
export type Agente = {
  nome:      string;   // ex: "SD JOSÉ DOS REIS GOMES"
  matricula: string;   // ex: "30528133"
  opm:       string;   // ex: "PATAMO", "BPT-RMS", "81ª CIPM"
  vtr?:      string;   // ex: "6.0811" (opcional)
};

/** Resistente (criminoso morto) encontrado no MILAE */
export type Resistente = {
  faccao: Faccao;   // facção a que pertencia
  lat:    number;   // latitude do local onde o corpo foi encontrado
  lng:    number;   // longitude do local onde o corpo foi encontrado
};

/**
 * Registro de MILAE — unidade mínima de dado do backend.
 *
 * Campos derivados do boletim de ocorrência:
 *  - `data` / `hora`:  extraídos do relato textual
 *  - `local`:          endereço completo do confronto (texto livre)
 *  - `lat` / `lng`:    convertidos manualmente pelo operador a partir do endereço
 *  - `agentes`:        guarnição que formalizou o MILAE
 *  - `resistentes`:    HNIs encontrados — cada um com facção e coordenada
 */
export type MilaeRecord = {
  id:          number;
  data:        string;      // "YYYY-MM-DD"
  hora:        string;      // "HH:MM"
  local:       string;      // endereço textual do confronto
  lat:         number;      // latitude do local do confronto
  lng:         number;      // longitude do local do confronto
  agentes:     Agente[];
  resistentes: Resistente[];
};

// ─── Utilitário: período do dia a partir da hora ─────────────────────────────

export function getPeriodo(hora: string): Periodo {
  const h = parseInt(hora.split(":")[0], 10);
  if (h < 6)  return "Madrugada";
  if (h < 12) return "Manhã";
  if (h < 18) return "Tarde";
  return "Noite";
}

// ─── Funções derivadas puras ─────────────────────────────────────────────────
// Todas recebem `records` — nunca dependem de estado global.

export function getTotalMilae(records: MilaeRecord[]) {
  return records.length;
}

export function getTotalResistentes(records: MilaeRecord[]) {
  return records.reduce((t, m) => t + m.resistentes.length, 0);
}

export function getMediaMensalResistentes(records: MilaeRecord[]) {
  const porMes: Record<string, number> = {};
  records.forEach((m) => {
    const mes = m.data.slice(0, 7);
    porMes[mes] = (porMes[mes] || 0) + m.resistentes.length;
  });
  const n = Object.keys(porMes).length || 1;
  const soma = Object.values(porMes).reduce((a, b) => a + b, 0);
  return Math.round(soma / n);
}

export function getMediaAgentesPorMilae(records: MilaeRecord[]) {
  if (!records.length) return "0.00";
  const total = records.reduce((s, m) => s + m.agentes.length, 0);
  return (total / records.length).toFixed(2);
}

// ── Gráfico: evolução mensal de casos (comparativo por ano) ─────────────────

const MESES_ABREV = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

export function getEvolucaoMensal(records: MilaeRecord[]) {
  const anos = [...new Set(records.map((m) => Number(m.data.slice(0, 4))))].sort();
  const chave = (a: number) => `ano${a}`;

  const mapa: Record<string, Record<string, number>> = {};
  MESES_ABREV.forEach((mes) => {
    mapa[mes] = {};
    anos.forEach((a) => (mapa[mes][chave(a)] = 0));
  });

  records.forEach((m) => {
    const mes = MESES_ABREV[Number(m.data.slice(5, 7)) - 1];
    const ano = Number(m.data.slice(0, 4));
    if (mapa[mes]) mapa[mes][chave(ano)] += 1;
  });

  return {
    data: MESES_ABREV.map((mes) => ({ mes, ...mapa[mes] })),
    anos,
  };
}

// ── Gráfico: resistentes por facção ─────────────────────────────────────────

export function getResistentesPorFaccao(records: MilaeRecord[]) {
  const mapa: Partial<Record<Faccao, number>> = {};
  records.forEach((m) =>
    m.resistentes.forEach((r) => { mapa[r.faccao] = (mapa[r.faccao] || 0) + 1; })
  );
  return Object.entries(mapa)
    .map(([nome, quantidade]) => ({ nome, quantidade: quantidade! }))
    .sort((a, b) => b.quantidade - a.quantidade);
}

// ── Gráfico: resistentes por período ────────────────────────────────────────

export function getResistentesPorPeriodo(records: MilaeRecord[]) {
  const mapa: Partial<Record<Periodo, number>> = {};
  records.forEach((m) => {
    const periodo = getPeriodo(m.hora);
    m.resistentes.forEach(() => { mapa[periodo] = (mapa[periodo] || 0) + 1; });
  });
  const ordem: Periodo[] = ["Madrugada", "Manhã", "Tarde", "Noite"];
  return ordem
    .filter((p) => mapa[p] !== undefined)
    .map((periodo) => ({ periodo, quantidade: mapa[periodo]! }));
}

// ── Gráfico: resistentes por OPM ────────────────────────────────────────────
// Cada OPM recebe crédito pelos resistentes de todo MILAE em que
// pelo menos um agente daquela OPM estava presente.

export function getResistentesPorOpm(records: MilaeRecord[]) {
  const mapa: Record<string, number> = {};
  records.forEach((m) => {
    const opms = [...new Set(m.agentes.map((a) => a.opm))];
    opms.forEach((opm) => { mapa[opm] = (mapa[opm] || 0) + m.resistentes.length; });
  });
  return Object.entries(mapa)
    .map(([nome, quantidade]) => ({ nome, quantidade }))
    .sort((a, b) => b.quantidade - a.quantidade);
}

// ── Heatmap: pontos de calor (localização dos resistentes) ──────────────────

export function getHeatPoints(records: MilaeRecord[]): [number, number, number][] {
  return records.flatMap((m) =>
    m.resistentes.map((r) => [r.lat, r.lng, 1.0] as [number, number, number])
  );
}

// ── Ranking de agentes ───────────────────────────────────────────────────────

const MESES_KEY = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"] as const;
type MesKey = typeof MESES_KEY[number];

export type AgenteStat = {
  nome:             string;
  matricula:        string;
  opm:              string;
  ocorrencias:      number;
  resistentesTotal: number;
  mensal:           Record<MesKey, number>;
  faccoes:          { nome: string; quantidade: number }[];
};

export function getRankingAgentes(records: MilaeRecord[]): AgenteStat[] {
  const mapa: Record<string, AgenteStat> = {};

  records.forEach((m) => {
    m.agentes.forEach((agente) => {
      if (!mapa[agente.matricula]) {
        mapa[agente.matricula] = {
          nome:             agente.nome,
          matricula:        agente.matricula,
          opm:              agente.opm,
          ocorrencias:      0,
          resistentesTotal: 0,
          mensal: { jan:0,fev:0,mar:0,abr:0,mai:0,jun:0,jul:0,ago:0,set:0,out:0,nov:0,dez:0 },
          faccoes: [],
        };
      }

      const stat = mapa[agente.matricula];
      stat.ocorrencias      += 1;
      stat.resistentesTotal += m.resistentes.length;

      const mesKey = MESES_KEY[Number(m.data.slice(5, 7)) - 1];
      stat.mensal[mesKey]   += 1;

      m.resistentes.forEach((r) => {
        const f = stat.faccoes.find((x) => x.nome === r.faccao);
        if (f) f.quantidade += 1;
        else stat.faccoes.push({ nome: r.faccao, quantidade: 1 });
      });
    });
  });

  return Object.values(mapa).sort((a, b) => b.ocorrencias - a.ocorrencias);
}

// ── Ocorrências por mês (para a página de Agentes — visão geral) ─────────────

export function getOcorrenciasPorMes(records: MilaeRecord[]) {
  const mapa: Record<string, number> = {};
  records.forEach((m) => {
    const mesKey = MESES_KEY[Number(m.data.slice(5, 7)) - 1];
    mapa[mesKey] = (mapa[mesKey] || 0) + 1;
  });
  return MESES_KEY.map((mes) => ({ mes, quantidade: mapa[mes] || 0 }));
}
