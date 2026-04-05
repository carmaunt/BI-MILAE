import { z } from "zod";

export const faccaoOptions = ["BDM", "CV", "PCC", "KLV", "NÃO VINCULADO"] as const;

export const agenteSchema = z.object({
  nome: z.string().min(3, "Informe o nome do agente."),
  matricula: z.string().min(1, "Informe a matrícula."),
  opm: z.string().min(1, "Informe a OPM."),
});

export const resistenteSchema = z.object({
  nome: z.string().optional(),
  idade: z.coerce.number().optional(),
  faccao: z.enum(faccaoOptions).optional(),
});

export const cadastroMilaeSchema = z.object({
  data: z.string().min(1, "Informe a data."),
  hora: z.string().min(1, "Informe a hora."),
  local: z.string().min(5, "Informe o local da ocorrência."),
  lat: z.coerce
    .number({ error: "Informe uma latitude válida." })
    .min(-90, "Latitude inválida.")
    .max(90, "Latitude inválida."),
  lng: z.coerce
    .number({ error: "Informe uma longitude válida." })
    .min(-180, "Longitude inválida.")
    .max(180, "Longitude inválida."),
  agentes: z.array(agenteSchema).min(1, "Adicione pelo menos um agente."),
  resistentes: z.array(resistenteSchema),
});

export type CadastroMilaeFormData = z.infer<typeof cadastroMilaeSchema>;