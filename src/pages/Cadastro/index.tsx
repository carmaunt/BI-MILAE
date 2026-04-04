import { useState } from "react";

type AgenteForm = {
  nome: string;
  matricula: string;
  opm: string;
  vtr: string;
};

type ResistenteForm = {
  faccao: "BDM" | "CV" | "PCC" | "KLV" | "NÃO VINCULADO";
  lat: string;
  lng: string;
};

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export default function CadastroPage() {
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [local, setLocal] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const [agentes, setAgentes] = useState<AgenteForm[]>([
    { nome: "", matricula: "", opm: "", vtr: "" },
  ]);

  const [resistentes, setResistentes] = useState<ResistenteForm[]>([
    { faccao: "BDM", lat: "", lng: "" },
  ]);

  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  function updateAgente(index: number, field: keyof AgenteForm, value: string) {
    setAgentes((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  }

  function updateResistente(index: number, field: keyof ResistenteForm, value: string) {
    setResistentes((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  }

  function addAgente() {
    setAgentes((prev) => [...prev, { nome: "", matricula: "", opm: "", vtr: "" }]);
  }

  function removeAgente(index: number) {
    setAgentes((prev) => prev.filter((_, i) => i !== index));
  }

  function addResistente() {
    setResistentes((prev) => [...prev, { faccao: "BDM", lat: "", lng: "" }]);
  }

  function removeResistente(index: number) {
    setResistentes((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMensagem("");
    setLoading(true);

    try {
      const payload = {
        data,
        hora,
        local,
        lat: Number(lat),
        lng: Number(lng),
        agentes: agentes.map((a) => ({
          nome: a.nome,
          matricula: a.matricula,
          opm: a.opm,
          vtr: a.vtr || undefined,
        })),
        resistentes: resistentes.map((r) => ({
          faccao: r.faccao,
          lat: Number(r.lat),
          lng: Number(r.lng),
        })),
      };

      const response = await fetch(`${API_URL}/api/milae`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Falha ao salvar cadastro.");
      }

      setMensagem("Cadastro salvo com sucesso.");
      setData("");
      setHora("");
      setLocal("");
      setLat("");
      setLng("");
      setAgentes([{ nome: "", matricula: "", opm: "", vtr: "" }]);
      setResistentes([{ faccao: "BDM", lat: "", lng: "" }]);
    } catch (error) {
      setMensagem("Erro ao salvar cadastro.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <header style={{ marginBottom: "24px" }}>
        <h1 style={{ margin: 0, fontSize: "28px", color: "#111827" }}>Cadastro de MILAE</h1>
        <p style={{ marginTop: "8px", color: "#6b7280" }}>
          Tela de inserção operacional para usuários do sistema
        </p>
      </header>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "24px" }}>
        <section style={{ background: "#fff", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <h2 style={{ marginTop: 0 }}>Dados gerais</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(220px, 1fr))", gap: "16px" }}>
            <label>
              <div>Data</div>
              <input type="date" value={data} onChange={(e) => setData(e.target.value)} style={{ width: "100%", padding: "10px" }} required />
            </label>

            <label>
              <div>Hora</div>
              <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} style={{ width: "100%", padding: "10px" }} required />
            </label>

            <label style={{ gridColumn: "1 / -1" }}>
              <div>Local</div>
              <input type="text" value={local} onChange={(e) => setLocal(e.target.value)} style={{ width: "100%", padding: "10px" }} required />
            </label>

            <label>
              <div>Latitude do confronto</div>
              <input type="number" step="any" value={lat} onChange={(e) => setLat(e.target.value)} style={{ width: "100%", padding: "10px" }} required />
            </label>

            <label>
              <div>Longitude do confronto</div>
              <input type="number" step="any" value={lng} onChange={(e) => setLng(e.target.value)} style={{ width: "100%", padding: "10px" }} required />
            </label>
          </div>
        </section>

        <section style={{ background: "#fff", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ margin: 0 }}>Agentes</h2>
            <button type="button" onClick={addAgente}>Adicionar agente</button>
          </div>

          <div style={{ display: "grid", gap: "16px" }}>
            {agentes.map((agente, index) => (
              <div key={index} style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "16px", display: "grid", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(220px, 1fr))", gap: "12px" }}>
                  <input placeholder="Nome" value={agente.nome} onChange={(e) => updateAgente(index, "nome", e.target.value)} style={{ padding: "10px" }} required />
                  <input placeholder="Matrícula" value={agente.matricula} onChange={(e) => updateAgente(index, "matricula", e.target.value)} style={{ padding: "10px" }} required />
                  <input placeholder="OPM" value={agente.opm} onChange={(e) => updateAgente(index, "opm", e.target.value)} style={{ padding: "10px" }} required />
                  <input placeholder="VTR" value={agente.vtr} onChange={(e) => updateAgente(index, "vtr", e.target.value)} style={{ padding: "10px" }} />
                </div>

                {agentes.length > 1 && (
                  <button type="button" onClick={() => removeAgente(index)} style={{ width: "fit-content" }}>
                    Remover agente
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: "#fff", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ margin: 0 }}>Resistentes</h2>
            <button type="button" onClick={addResistente}>Adicionar resistente</button>
          </div>

          <div style={{ display: "grid", gap: "16px" }}>
            {resistentes.map((resistente, index) => (
              <div key={index} style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "16px", display: "grid", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(180px, 1fr))", gap: "12px" }}>
                  <select
                    value={resistente.faccao}
                    onChange={(e) => updateResistente(index, "faccao", e.target.value)}
                    style={{ padding: "10px" }}
                  >
                    <option value="BDM">BDM</option>
                    <option value="CV">CV</option>
                    <option value="PCC">PCC</option>
                    <option value="KLV">KLV</option>
                    <option value="NÃO VINCULADO">NÃO VINCULADO</option>
                  </select>

                  <input
                    type="number"
                    step="any"
                    placeholder="Latitude"
                    value={resistente.lat}
                    onChange={(e) => updateResistente(index, "lat", e.target.value)}
                    style={{ padding: "10px" }}
                    required
                  />

                  <input
                    type="number"
                    step="any"
                    placeholder="Longitude"
                    value={resistente.lng}
                    onChange={(e) => updateResistente(index, "lng", e.target.value)}
                    style={{ padding: "10px" }}
                    required
                  />
                </div>

                {resistentes.length > 1 && (
                  <button type="button" onClick={() => removeResistente(index)} style={{ width: "fit-content" }}>
                    Remover resistente
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button type="submit" disabled={loading} style={{ padding: "12px 18px" }}>
            {loading ? "Salvando..." : "Salvar cadastro"}
          </button>

          {mensagem && <span style={{ color: "#111827" }}>{mensagem}</span>}
        </section>
      </form>
    </div>
  );
}