import axios from "axios";
import type { MilaeRecord } from "../data/db";
import type { CadastroMilaeFormData } from "../pages/Cadastro/schema";
import { useAuthStore } from "../store/authStore";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(err);
  }
);

export async function fetchMilaeRecords(): Promise<MilaeRecord[]> {
  const { data } = await api.get<MilaeRecord[]>("/api/milae");
  return data;
}

export async function fetchMilaeById(id: number): Promise<MilaeRecord> {
  const { data } = await api.get<MilaeRecord>(`/api/milae/${id}`);
  return data;
}

export async function createMilaeRecord(payload: CadastroMilaeFormData): Promise<MilaeRecord> {
  const { data } = await api.post<MilaeRecord>("/api/milae", payload);
  return data;
}
