/**
 * FONTE ÚNICA DE DADOS — BI-MILAE
 *
 * Domínio:
 *  - MILAE: ocorrência policial com resistente(s) morto(s)
 *  - Resistente: o criminoso morto — possui facção e localização
 *  - Agente: policial de serviço — possui nome e unidade de origem (OPM)
 *  - 1 MILAE pode ter N agentes e N resistentes
 */

// ─── Tipos primitivos ────────────────────────────────────────────────────────

export type Periodo = "Madrugada" | "Manhã" | "Tarde" | "Noite";
export type Faccao = "BDM" | "CV" | "PCC" | "KLV" | "NÃO VINCULADO";

export type Agente = {
  nome: string;
  opm: string;
};

export type Resistente = {
  faccao: Faccao;
  lat: number;
  lng: number;
};

export type MilaeRecord = {
  id: number;
  data: string;       // "YYYY-MM-DD"
  periodo: Periodo;
  agentes: Agente[];
  resistentes: Resistente[];
};

// ─── Agentes cadastrados ─────────────────────────────────────────────────────

const LUIS_FELIPE: Agente = { nome: "SD PM LUIS FELIPE VITORINO DE SOUZA", opm: "BPT-RMS" };
const WILLIAM: Agente     = { nome: "SD PM WILLIAM OLIVEIRA NASCIMENTO",    opm: "BPT-RMS" };
const MATHEUS: Agente     = { nome: "SD PM MATHEUS RIBEIRO PINTO",          opm: "BPT-RMS" };
const ELSON: Agente       = { nome: "SD PM ELSON TELES ALVES DA SILVA",     opm: "26° BPM" };
const JEFFERSON: Agente   = { nome: "SD PM JEFFERSON COSTA DOS REIS",       opm: "36ª CIPM" };
const LUIS_PAULO: Agente  = { nome: "SD PM LUIS PAULO LIMA DOS SANTOS",     opm: "81ª CIPM" };

// ─── TABELA ÚNICA: registros de MILAE ────────────────────────────────────────

export const milaeRecords: MilaeRecord[] = [
  // ── Janeiro 2025 ────────────────────────────────────────────────────────────
  {
    id: 1,
    data: "2025-01-08",
    periodo: "Tarde",
    agentes: [LUIS_FELIPE, WILLIAM, JEFFERSON],
    resistentes: [
      { faccao: "BDM",          lat: -12.9714, lng: -38.5014 },
      { faccao: "NÃO VINCULADO", lat: -12.9650, lng: -38.4900 },
    ],
  },
  {
    id: 2,
    data: "2025-01-21",
    periodo: "Noite",
    agentes: [LUIS_FELIPE, MATHEUS],
    resistentes: [
      { faccao: "BDM", lat: -12.9500, lng: -38.4800 },
    ],
  },

  // ── Fevereiro 2025 ──────────────────────────────────────────────────────────
  {
    id: 3,
    data: "2025-02-14",
    periodo: "Tarde",
    agentes: [LUIS_FELIPE, WILLIAM, ELSON, LUIS_PAULO],
    resistentes: [
      { faccao: "CV", lat: -12.9900, lng: -38.4700 },
    ],
  },

  // ── Março 2025 ───────────────────────────────────────────────────────────────
  {
    id: 4,
    data: "2025-03-05",
    periodo: "Manhã",
    agentes: [WILLIAM, JEFFERSON],
    resistentes: [
      { faccao: "BDM", lat: -12.8200, lng: -38.3200 },
    ],
  },

  // ── Abril 2025 ───────────────────────────────────────────────────────────────
  {
    id: 5,
    data: "2025-04-18",
    periodo: "Tarde",
    agentes: [MATHEUS, ELSON],
    resistentes: [
      { faccao: "NÃO VINCULADO", lat: -12.7300, lng: -38.3300 },
    ],
  },

  // ── Maio 2025 ────────────────────────────────────────────────────────────────
  {
    id: 6,
    data: "2025-05-30",
    periodo: "Tarde",
    agentes: [LUIS_PAULO],
    resistentes: [
      { faccao: "CV", lat: -12.6500, lng: -38.3200 },
    ],
  },

  // ── Julho 2025 ───────────────────────────────────────────────────────────────
  {
    id: 7,
    data: "2025-07-10",
    periodo: "Tarde",
    agentes: [LUIS_FELIPE, WILLIAM, MATHEUS, ELSON, JEFFERSON, LUIS_PAULO],
    resistentes: [
      { faccao: "BDM", lat: -12.6700, lng: -38.4800 },
      { faccao: "BDM", lat: -12.6750, lng: -38.4750 },
    ],
  },
  {
    id: 8,
    data: "2025-07-27",
    periodo: "Madrugada",
    agentes: [LUIS_FELIPE, WILLIAM, MATHEUS],
    resistentes: [
      { faccao: "NÃO VINCULADO", lat: -12.7400, lng: -38.4500 },
    ],
  },

  // ── Agosto 2025 ──────────────────────────────────────────────────────────────
  {
    id: 9,
    data: "2025-08-19",
    periodo: "Tarde",
    agentes: [ELSON, LUIS_PAULO],
    resistentes: [
      { faccao: "PCC", lat: -12.9800, lng: -38.5100 },
    ],
  },

  // ── Setembro 2025 ────────────────────────────────────────────────────────────
  {
    id: 10,
    data: "2025-09-03",
    periodo: "Tarde",
    agentes: [LUIS_FELIPE, WILLIAM, MATHEUS, ELSON, JEFFERSON, LUIS_PAULO],
    resistentes: [
      { faccao: "BDM", lat: -12.9600, lng: -38.5200 },
      { faccao: "CV",  lat: -12.9550, lng: -38.5250 },
    ],
  },

  // ── Outubro 2025 ─────────────────────────────────────────────────────────────
  {
    id: 11,
    data: "2025-10-22",
    periodo: "Noite",
    agentes: [JEFFERSON],
    resistentes: [
      { faccao: "BDM", lat: -12.8900, lng: -38.4400 },
    ],
  },

  // ── Janeiro 2026 ─────────────────────────────────────────────────────────────
  {
    id: 12,
    data: "2026-01-15",
    periodo: "Tarde",
    agentes: [LUIS_FELIPE, WILLIAM],
    resistentes: [
      { faccao: "BDM", lat: -12.9714, lng: -38.4600 },
    ],
  },

  // ── Fevereiro 2026 ───────────────────────────────────────────────────────────
  {
    id: 13,
    data: "2026-02-08",
    periodo: "Tarde",
    agentes: [WILLIAM, MATHEUS],
    resistentes: [
      { faccao: "NÃO VINCULADO", lat: -12.9400, lng: -38.5300 },
      { faccao: "BDM",           lat: -12.9380, lng: -38.5350 },
    ],
  },

  // ── Março 2026 ───────────────────────────────────────────────────────────────
  {
    id: 14,
    data: "2026-03-20",
    periodo: "Manhã",
    agentes: [LUIS_FELIPE, MATHEUS, JEFFERSON],
    resistentes: [
      { faccao: "CV",  lat: -12.9100, lng: -38.4800 },
      { faccao: "BDM", lat: -12.9150, lng: -38.4850 },
    ],
  },
];

// ─── Funções derivadas ────────────────────────────────────────────────────────

function getMes(data: string) {
  return data.slice(0, 7); // "YYYY-MM"
}

function getAno(data: string) {
  return Number(data.slice(0, 4));
}

function getMesAbrev(data: string) {
  const meses = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  return meses[Number(data.slice(5, 7)) - 1];
}

// Cards do Dashboard ──────────────────────────────────────────────────────────

export function getTotalMilae() {
  return milaeRecords.length;
}

export function getTotalResistentes() {
  return milaeRecords.reduce((total, m) => total + m.resistentes.length, 0);
}

export function getMediaMensalResistentes() {
  const porMes: Record<string, number> = {};
  milaeRecords.forEach((m) => {
    const mes = getMes(m.data);
    porMes[mes] = (porMes[mes] || 0) + m.resistentes.length;
  });
  const meses = Object.keys(porMes).length || 1;
  const soma = Object.values(porMes).reduce((a, b) => a + b, 0);
  return Math.round(soma / meses);
}

export function getMediaAgentesPorMilae() {
  const total = milaeRecords.reduce((sum, m) => sum + m.agentes.length, 0);
  return (total / milaeRecords.length).toFixed(2);
}

// Gráfico: Evolução dos casos (MILAE por mês, comparativo por ano) ────────────

export function getEvolucaoMensal() {
  const MESES_ABREV = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

  const anos = [...new Set(milaeRecords.map((m) => getAno(m.data)))].sort();
  const chave = (ano: number) => `ano${ano}`;

  const mapa: Record<string, Record<string, number>> = {};
  MESES_ABREV.forEach((mes) => {
    mapa[mes] = {};
    anos.forEach((ano) => (mapa[mes][chave(ano)] = 0));
  });

  milaeRecords.forEach((m) => {
    const mes = getMesAbrev(m.data);
    const ano = getAno(m.data);
    if (mapa[mes]) mapa[mes][chave(ano)] = (mapa[mes][chave(ano)] || 0) + 1;
  });

  return {
    data: MESES_ABREV.map((mes) => ({ mes, ...mapa[mes] })),
    anos,
  };
}

// Gráfico: Resistentes por facção ─────────────────────────────────────────────

export function getResistentesPorFaccao() {
  const mapa: Partial<Record<Faccao, number>> = {};
  milaeRecords.forEach((m) =>
    m.resistentes.forEach((r) => {
      mapa[r.faccao] = (mapa[r.faccao] || 0) + 1;
    })
  );
  return Object.entries(mapa)
    .map(([nome, quantidade]) => ({ nome, quantidade: quantidade! }))
    .sort((a, b) => b.quantidade - a.quantidade);
}

// Gráfico: Resistentes por período ────────────────────────────────────────────

export function getResistentesPorPeriodo() {
  const mapa: Partial<Record<Periodo, number>> = {};
  milaeRecords.forEach((m) =>
    m.resistentes.forEach(() => {
      mapa[m.periodo] = (mapa[m.periodo] || 0) + 1;
    })
  );
  const ordem: Periodo[] = ["Madrugada", "Manhã", "Tarde", "Noite"];
  return ordem
    .filter((p) => mapa[p] !== undefined)
    .map((periodo) => ({ periodo, quantidade: mapa[periodo]! }));
}

// Gráfico: Resistentes por OPM ────────────────────────────────────────────────
// Lógica: cada OPM recebe crédito pelos resistentes de todo MILAE em que
// pelo menos um agente daquela OPM estava presente.

export function getResistentesPorOpm() {
  const mapa: Record<string, number> = {};
  milaeRecords.forEach((m) => {
    const opmsNoMilae = [...new Set(m.agentes.map((a) => a.opm))];
    opmsNoMilae.forEach((opm) => {
      mapa[opm] = (mapa[opm] || 0) + m.resistentes.length;
    });
  });
  return Object.entries(mapa)
    .map(([nome, quantidade]) => ({ nome, quantidade }))
    .sort((a, b) => b.quantidade - a.quantidade);
}

// Página de Agentes: ranking ──────────────────────────────────────────────────

const MESES_KEY = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"] as const;
type MesKey = typeof MESES_KEY[number];

export type AgenteStat = {
  nome: string;
  opm: string;
  ocorrencias: number;
  resistentesTotal: number;
  mensal: Record<MesKey, number>;
  faccoes: { nome: string; quantidade: number }[];
};

export function getRankingAgentes(): AgenteStat[] {
  const mapa: Record<string, AgenteStat> = {};

  milaeRecords.forEach((m) => {
    m.agentes.forEach((agente) => {
      if (!mapa[agente.nome]) {
        mapa[agente.nome] = {
          nome: agente.nome,
          opm: agente.opm,
          ocorrencias: 0,
          resistentesTotal: 0,
          mensal: { jan:0, fev:0, mar:0, abr:0, mai:0, jun:0, jul:0, ago:0, set:0, out:0, nov:0, dez:0 },
          faccoes: [],
        };
      }

      const stat = mapa[agente.nome];
      stat.ocorrencias += 1;
      stat.resistentesTotal += m.resistentes.length;

      const mesIdx = Number(m.data.slice(5, 7)) - 1;
      const mesKey = MESES_KEY[mesIdx];
      stat.mensal[mesKey] += 1;

      m.resistentes.forEach((r) => {
        const faccao = stat.faccoes.find((f) => f.nome === r.faccao);
        if (faccao) faccao.quantidade += 1;
        else stat.faccoes.push({ nome: r.faccao, quantidade: 1 });
      });
    });
  });

  return Object.values(mapa).sort((a, b) => b.ocorrencias - a.ocorrencias);
}

// Pontos do heatmap ───────────────────────────────────────────────────────────

export function getHeatPoints(): [number, number, number][] {
  return milaeRecords.flatMap((m) =>
    m.resistentes.map((r) => [r.lat, r.lng, 1.0] as [number, number, number])
  );
}
