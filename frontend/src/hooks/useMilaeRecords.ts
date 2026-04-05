/**
 * HOOK DE DADOS — useMilaeRecords
 *
 * Fonte única de dados para todos os componentes.
 *
 * Comportamento:
 *  - Se VITE_API_URL estiver definido → busca do backend real via API
 *  - Caso contrário → usa os dados mock de desenvolvimento
 *
 * Para ativar o backend: defina VITE_API_URL=https://seu-backend.com no ambiente.
 */
import { useQuery } from "@tanstack/react-query";
import { fetchMilaeRecords } from "../services/milaeApi";
import { MOCK_MILAE_RECORDS } from "../data/mockData";

const HAS_BACKEND = Boolean(import.meta.env.VITE_API_URL);

export function useMilaeRecords() {
  return useQuery({
    queryKey: ["milae-records"],
    queryFn: HAS_BACKEND
      ? fetchMilaeRecords
      : () => Promise.resolve(MOCK_MILAE_RECORDS),
    staleTime: 5 * 60 * 1000,   // considera dados frescos por 5 min
    retry: HAS_BACKEND ? 3 : 0, // sem retry em modo mock
  });
}
