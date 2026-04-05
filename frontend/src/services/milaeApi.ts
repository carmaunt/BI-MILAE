/**
 * SERVIÇO DE API — BI-MILAE
 *
 * Responsável por comunicar com o backend.
 * Configure VITE_API_URL no ambiente para apontar para o servidor real.
 * Enquanto não existe backend, o hook useMilaeRecords usa os dados mock.
 */
import axios from "axios";
import type { MilaeRecord } from "../data/db";
import type { CadastroMilaeFormData } from "../pages/Cadastro/schema";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

/** Busca todos os registros de MILAE do backend */
export async function fetchMilaeRecords(): Promise<MilaeRecord[]> {
  const { data } = await api.get<MilaeRecord[]>("/api/milae");
  return data;
}

/** Busca um único MILAE por ID */
export async function fetchMilaeById(id: number): Promise<MilaeRecord> {
  const { data } = await api.get<MilaeRecord>(`/api/milae/${id}`);
  return data;
}

/** Cria um novo registro de MILAE no backend */
export async function createMilaeRecord(payload: CadastroMilaeFormData): Promise<MilaeRecord> {
  const { data } = await api.post<MilaeRecord>("/api/milae", payload);
  return data;
}
