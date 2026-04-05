import axios from "axios";
import type { AuthUser } from "../store/authStore";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

const api = axios.create({ baseURL: BASE_URL });

export async function registrar(nome: string, email: string, senha: string): Promise<void> {
  try {
    await api.post("/api/auth/registrar", { nome, email, senha });
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

export async function fetchUsuarios(token: string) {
  const { data } = await api.get("/api/auth/usuarios", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export async function criarUsuario(
  token: string,
  payload: { nome: string; email: string; senha: string; role: "ADMIN" | "VISUALIZADOR" }
) {
  const { data } = await api.post("/api/auth/usuarios", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export async function atualizarUsuario(
  token: string,
  id: number,
  payload: Partial<{ nome: string; role: string; ativo: boolean; senha: string }>
) {
  const { data } = await api.patch(`/api/auth/usuarios/${id}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}
