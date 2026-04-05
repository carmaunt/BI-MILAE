import type { CSSProperties } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { createMilaeRecord } from "../../services/milaeApi";
import {
  cadastroMilaeSchema,
  faccaoOptions,
  type CadastroMilaeFormData,
} from "./schema";

type CadastroMilaeFormInput = z.input<typeof cadastroMilaeSchema>;

const sectionStyle: CSSProperties = {
  background: "#fff",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  boxSizing: "border-box",
};

const labelStyle: CSSProperties = {
  display: "grid",
  gap: "6px",
  fontSize: "14px",
  color: "#374151",
};

const errorStyle: CSSProperties = {
  color: "#dc2626",
  fontSize: "12px",
};

const buttonStyle: CSSProperties = {
  border: "none",
  background: "#111827",
  color: "#fff",
  padding: "10px 14px",
  borderRadius: "10px",
  cursor: "pointer",
};

const secondaryButtonStyle: CSSProperties = {
  border: "1px solid #d1d5db",
  background: "#fff",
  color: "#111827",
  padding: "10px 14px",
  borderRadius: "10px",
  cursor: "pointer",
};

const defaultValues: CadastroMilaeFormInput = {
  data: "",
  hora: "",
  local: "",
  lat: "",
  lng: "",
  agentes: [{ nome: "", matricula: "", opm: "" }],
  resistentes: [{ nome: "", idade: undefined, faccao: undefined }],
};

export default function CadastroPage() {
  const queryClient = useQueryClient();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CadastroMilaeFormInput, unknown, CadastroMilaeFormData>({
    resolver: zodResolver(cadastroMilaeSchema),
    defaultValues,
  });

  const agentesArray = useFieldArray({
    control,
    name: "agentes",
  });

  const resistentesArray = useFieldArray({
    control,
    name: "resistentes",
  });

  const createMutation = useMutation({
    mutationFn: createMilaeRecord,
    onSuccess: async () => {
      reset(defaultValues);
      await queryClient.invalidateQueries({ queryKey: ["milae-records"] });
      alert("Cadastro salvo com sucesso.");
    },
    onError: () => {
      alert("Erro ao salvar cadastro.");
    },
  });

  function onSubmit(data: CadastroMilaeFormData) {
    createMutation.mutate(data);
  }

  return (
    <div style={{ display: "grid", gap: "24px" }}>
      <header>
        <h1 style={{ margin: 0, fontSize: "28px", color: "#111827" }}>Cadastro de MILAE</h1>
        <p style={{ marginTop: "8px", color: "#6b7280" }}>
          Preencha os dados do caso, agentes e resistentes.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "grid", gap: "24px" }}>
        <section style={sectionStyle}>
          <h2 style={{ marginTop: 0, marginBottom: "16px", color: "#111827" }}>Dados gerais</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            <label style={labelStyle}>
              Data
              <input type="date" {...register("data")} style={inputStyle} />
              {errors.data && <span style={errorStyle}>{errors.data.message}</span>}
            </label>

            <label style={labelStyle}>
              Hora
              <input type="time" {...register("hora")} style={inputStyle} />
              {errors.hora && <span style={errorStyle}>{errors.hora.message}</span>}
            </label>

            <label style={{ ...labelStyle, gridColumn: "1 / -1" }}>
              Local
              <input type="text" {...register("local")} style={inputStyle} />
              {errors.local && <span style={errorStyle}>{errors.local.message}</span>}
            </label>

            <label style={labelStyle}>
              Latitude do confronto
              <input type="number" step="any" {...register("lat")} style={inputStyle} />
              {errors.lat && <span style={errorStyle}>{errors.lat.message}</span>}
            </label>

            <label style={labelStyle}>
              Longitude do confronto
              <input type="number" step="any" {...register("lng")} style={inputStyle} />
              {errors.lng && <span style={errorStyle}>{errors.lng.message}</span>}
            </label>
          </div>
        </section>

        <section style={sectionStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ margin: 0, color: "#111827" }}>Agentes</h2>
            <button
              type="button"
              style={secondaryButtonStyle}
              onClick={() => agentesArray.append({ nome: "", matricula: "", opm: "" })}
            >
              Adicionar agente
            </button>
          </div>

          <div style={{ display: "grid", gap: "16px" }}>
            {agentesArray.fields.map((field, index) => (
              <div
                key={field.id}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "16px",
                  display: "grid",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "12px",
                  }}
                >
                  <label style={labelStyle}>
                    Nome
                    <input type="text" {...register(`agentes.${index}.nome`)} style={inputStyle} />
                    {errors.agentes?.[index]?.nome && (
                      <span style={errorStyle}>{errors.agentes[index]?.nome?.message}</span>
                    )}
                  </label>

                  <label style={labelStyle}>
                    Matrícula
                    <input type="text" {...register(`agentes.${index}.matricula`)} style={inputStyle} />
                    {errors.agentes?.[index]?.matricula && (
                      <span style={errorStyle}>{errors.agentes[index]?.matricula?.message}</span>
                    )}
                  </label>

                  <label style={labelStyle}>
                    OPM
                    <input type="text" {...register(`agentes.${index}.opm`)} style={inputStyle} />
                    {errors.agentes?.[index]?.opm && (
                      <span style={errorStyle}>{errors.agentes[index]?.opm?.message}</span>
                    )}
                  </label>
                </div>

                {agentesArray.fields.length > 1 && (
                  <button
                    type="button"
                    style={secondaryButtonStyle}
                    onClick={() => agentesArray.remove(index)}
                  >
                    Remover agente
                  </button>
                )}
              </div>
            ))}
          </div>

          {errors.agentes?.message && <span style={errorStyle}>{errors.agentes.message}</span>}
        </section>

        <section style={sectionStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ margin: 0, color: "#111827" }}>Resistentes</h2>
            <button
              type="button"
              style={secondaryButtonStyle}
              onClick={() => resistentesArray.append({ nome: "", idade: undefined, faccao: undefined })}
            >
              Adicionar resistente
            </button>
          </div>

          <div style={{ display: "grid", gap: "16px" }}>
            {resistentesArray.fields.map((field, index) => (
              <div
                key={field.id}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "16px",
                  display: "grid",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "12px",
                  }}
                >
                  <label style={labelStyle}>
                    Nome
                    <input
                      type="text"
                      {...register(`resistentes.${index}.nome`)}
                      style={inputStyle}
                    />
                  </label>

                  <label style={labelStyle}>
                    Idade
                    <input
                      type="number"
                      {...register(`resistentes.${index}.idade`)}
                      style={inputStyle}
                    />
                  </label>

                  <label style={labelStyle}>
                    Facção
                    <select {...register(`resistentes.${index}.faccao`)} style={inputStyle}>
                      <option value="">Não informado</option>
                      {faccaoOptions.map((faccao) => (
                        <option key={faccao} value={faccao}>
                          {faccao}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                {resistentesArray.fields.length > 1 && (
                  <button
                    type="button"
                    style={secondaryButtonStyle}
                    onClick={() => resistentesArray.remove(index)}
                  >
                    Remover resistente
                  </button>
                )}
              </div>
            ))}
          </div>

          {errors.resistentes?.message && <span style={errorStyle}>{errors.resistentes.message}</span>}
        </section>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" style={buttonStyle} disabled={createMutation.isPending}>
            {createMutation.isPending ? "Salvando..." : "Salvar cadastro"}
          </button>
        </div>
      </form>
    </div>
  );
}