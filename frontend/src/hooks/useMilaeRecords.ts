import { useQuery } from "@tanstack/react-query";
import { fetchMilaeRecords } from "../services/milaeApi";

export function useMilaeRecords() {
  return useQuery({
    queryKey: ["milae-records"],
    queryFn: fetchMilaeRecords,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
