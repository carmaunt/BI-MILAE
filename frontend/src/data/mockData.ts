/**
 * DADOS MOCK — usados enquanto o backend não está disponível.
 *
 * O formato espelha exatamente o que o backend enviará (MilaeRecord).
 * Para ativar o backend real, basta definir VITE_API_URL no ambiente.
 */
import type { MilaeRecord } from "./db";

const LUIS_FELIPE = { nome: "SD PM LUIS FELIPE VITORINO DE SOUZA",  matricula: "30412001", opm: "BPT-RMS",  vtr: "6.0801" };
const WILLIAM     = { nome: "SD PM WILLIAM OLIVEIRA NASCIMENTO",     matricula: "30412002", opm: "BPT-RMS",  vtr: "6.0802" };
const MATHEUS     = { nome: "SD PM MATHEUS RIBEIRO PINTO",           matricula: "30412003", opm: "BPT-RMS",  vtr: "6.0803" };
const ELSON       = { nome: "SD PM ELSON TELES ALVES DA SILVA",      matricula: "30412004", opm: "26° BPM",  vtr: "2.0601" };
const JEFFERSON   = { nome: "SD PM JEFFERSON COSTA DOS REIS",        matricula: "30412005", opm: "36ª CIPM", vtr: "3.0601" };
const LUIS_PAULO  = { nome: "SD PM LUIS PAULO LIMA DOS SANTOS",      matricula: "30412006", opm: "81ª CIPM", vtr: "8.0101" };

export const MOCK_MILAE_RECORDS: MilaeRecord[] = [
  // ── Janeiro 2025 ────────────────────────────────────────────────────────────
  {
    id: 1,
    data: "2025-01-08", hora: "15:30",
    local: "Conjunto Habitacional Coração de Maria, Estrada das Pedreiras, Cassange - Salvador-BA",
    lat: -12.9714, lng: -38.5014,
    agentes: [LUIS_FELIPE, WILLIAM, JEFFERSON],
    resistentes: [
      { faccao: "BDM",           lat: -12.9714, lng: -38.5014 },
      { faccao: "NÃO VINCULADO", lat: -12.9650, lng: -38.4900 },
    ],
  },
  {
    id: 2,
    data: "2025-01-21", hora: "20:45",
    local: "Rua das Pedras, Plataforma - Salvador-BA",
    lat: -12.9500, lng: -38.4800,
    agentes: [LUIS_FELIPE, MATHEUS],
    resistentes: [
      { faccao: "BDM", lat: -12.9500, lng: -38.4800 },
    ],
  },

  // ── Fevereiro 2025 ──────────────────────────────────────────────────────────
  {
    id: 3,
    data: "2025-02-14", hora: "16:00",
    local: "Rua Alto do Cabrito, Cabrito - Salvador-BA",
    lat: -12.9900, lng: -38.4700,
    agentes: [LUIS_FELIPE, WILLIAM, ELSON, LUIS_PAULO],
    resistentes: [
      { faccao: "CV", lat: -12.9900, lng: -38.4700 },
    ],
  },

  // ── Março 2025 ───────────────────────────────────────────────────────────────
  {
    id: 4,
    data: "2025-03-05", hora: "09:15",
    local: "Avenida Paralela, Narandiba - Salvador-BA",
    lat: -12.8200, lng: -38.3200,
    agentes: [WILLIAM, JEFFERSON],
    resistentes: [
      { faccao: "BDM", lat: -12.8200, lng: -38.3200 },
    ],
  },

  // ── Abril 2025 ───────────────────────────────────────────────────────────────
  {
    id: 5,
    data: "2025-04-18", hora: "14:20",
    local: "Rua Nova Brasília, Fazenda Grande do Retiro - Salvador-BA",
    lat: -12.7300, lng: -38.3300,
    agentes: [MATHEUS, ELSON],
    resistentes: [
      { faccao: "NÃO VINCULADO", lat: -12.7300, lng: -38.3300 },
    ],
  },

  // ── Maio 2025 ────────────────────────────────────────────────────────────────
  {
    id: 6,
    data: "2025-05-30", hora: "13:50",
    local: "Rua da Paz, Cajazeiras - Salvador-BA",
    lat: -12.6500, lng: -38.3200,
    agentes: [LUIS_PAULO],
    resistentes: [
      { faccao: "CV", lat: -12.6500, lng: -38.3200 },
    ],
  },

  // ── Julho 2025 ───────────────────────────────────────────────────────────────
  {
    id: 7,
    data: "2025-07-10", hora: "15:45",
    local: "Rua Bela Vista, Castelo Branco - Salvador-BA",
    lat: -12.6700, lng: -38.4800,
    agentes: [LUIS_FELIPE, WILLIAM, MATHEUS, ELSON, JEFFERSON, LUIS_PAULO],
    resistentes: [
      { faccao: "BDM", lat: -12.6700, lng: -38.4800 },
      { faccao: "BDM", lat: -12.6750, lng: -38.4750 },
    ],
  },
  {
    id: 8,
    data: "2025-07-27", hora: "03:10",
    local: "Travessa dos Eucaliptos, Mussurunga - Salvador-BA",
    lat: -12.7400, lng: -38.4500,
    agentes: [LUIS_FELIPE, WILLIAM, MATHEUS],
    resistentes: [
      { faccao: "NÃO VINCULADO", lat: -12.7400, lng: -38.4500 },
    ],
  },

  // ── Agosto 2025 ──────────────────────────────────────────────────────────────
  {
    id: 9,
    data: "2025-08-19", hora: "17:30",
    local: "Estrada do Derba, Valéria - Salvador-BA",
    lat: -12.9800, lng: -38.5100,
    agentes: [ELSON, LUIS_PAULO],
    resistentes: [
      { faccao: "PCC", lat: -12.9800, lng: -38.5100 },
    ],
  },

  // ── Setembro 2025 ────────────────────────────────────────────────────────────
  {
    id: 10,
    data: "2025-09-03", hora: "16:00",
    local: "Rua Álvaro Barreto, Brotas - Salvador-BA",
    lat: -12.9600, lng: -38.5200,
    agentes: [LUIS_FELIPE, WILLIAM, MATHEUS, ELSON, JEFFERSON, LUIS_PAULO],
    resistentes: [
      { faccao: "BDM", lat: -12.9600, lng: -38.5200 },
      { faccao: "CV",  lat: -12.9550, lng: -38.5250 },
    ],
  },

  // ── Outubro 2025 ─────────────────────────────────────────────────────────────
  {
    id: 11,
    data: "2025-10-22", hora: "22:00",
    local: "Rua Dois de Julho, Periperi - Salvador-BA",
    lat: -12.8900, lng: -38.4400,
    agentes: [JEFFERSON],
    resistentes: [
      { faccao: "BDM", lat: -12.8900, lng: -38.4400 },
    ],
  },

  // ── Janeiro 2026 ─────────────────────────────────────────────────────────────
  {
    id: 12,
    data: "2026-01-15", hora: "14:10",
    local: "Rua Caetano Moura, Federação - Salvador-BA",
    lat: -12.9714, lng: -38.4600,
    agentes: [LUIS_FELIPE, WILLIAM],
    resistentes: [
      { faccao: "BDM", lat: -12.9714, lng: -38.4600 },
    ],
  },

  // ── Fevereiro 2026 ───────────────────────────────────────────────────────────
  {
    id: 13,
    data: "2026-02-08", hora: "15:00",
    local: "Rua Nova, Jardim Nova Esperança - Salvador-BA",
    lat: -12.9400, lng: -38.5300,
    agentes: [WILLIAM, MATHEUS],
    resistentes: [
      { faccao: "NÃO VINCULADO", lat: -12.9400, lng: -38.5300 },
      { faccao: "BDM",           lat: -12.9380, lng: -38.5350 },
    ],
  },

  // ── Março 2026 ───────────────────────────────────────────────────────────────
  {
    id: 14,
    data: "2026-03-20", hora: "08:40",
    local: "Conjunto Habitacional Coração de Maria, Cassange - Salvador-BA",
    lat: -12.9100, lng: -38.4800,
    agentes: [LUIS_FELIPE, MATHEUS, JEFFERSON],
    resistentes: [
      { faccao: "CV",  lat: -12.9100, lng: -38.4800 },
      { faccao: "BDM", lat: -12.9150, lng: -38.4850 },
    ],
  },
];
