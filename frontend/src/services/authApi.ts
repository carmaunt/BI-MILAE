import axios from "axios";
import type { AuthUser } from "../store/authStore";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

const api = axios.create({ baseURL: BASE_URL });

export type StatusUsuario = "PENDENTE" | "ATIVO" | "INATIVO";

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  role: "ADMIN" | "VISUALIZADOR";
  status: StatusUsuario;
  createdAt: string;
}

export async function registrar(nome: string, email: string, senha: string): Promise<string> {
  try {
    const { data } = await api.post("/api/auth/registrar", { nome, email, senha });
    return data.message;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.data?.error) {
      throw new Error(err.response.data.error);
    }
    throw new Error("Não foi possível conectar ao servidor.");
  }
}

export async function login(
  email: string,
  senha: string
): Promise<{ token: string; user: AuthUser }> {
  try {
    const { data } = await api.post("/api/auth/login", { email, senha });
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.data?.error) {
      throw new Error(err.response.data.error);
    }
    throw new Error("Não foi possível conectar ao servidor.");
  }
}

export async function fetchUsuarios(token: string): Promise<Usuario[]> {
  const { data } = await api.get("/api/auth/usuarios", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export async function atualizarStatus(
  token: string,
  id: number,
  status: StatusUsuario
): Promise<Usuario> {
  const { data } = await api.patch(
    `/api/auth/usuarios/${id}`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
}
