import { useMilaeRecords } from "../../hooks/useMilaeRecords";
import StatCard from "../../components/ui/StatCard";
import EvolucaoCasosChart from "./components/EvolucaoCasosChart";
import ResistentesFaccaoChart from "./components/ResistentesFaccaoChart";
import ResistentesPeriodoChart from "./components/ResistentesPeriodoChart";
import ResistentesOpmChart from "./components/ResistentesOpmChart";
import HeatMapPanel from "./components/HeatMapPanel";
import {
  getTotalMilae,
  getTotalResistentes,
  getMediaMensalResistentes,
  getMediaAgentesPorMilae,
  getEvolucaoMensal,
  getResistentesPorFaccao,
  getResistentesPorPeriodo,
  getResistentesPorOpm,
  getHeatPoints,
} from "../../data/db";

export default function DashboardPage() {
  const { data: records = [], isLoading } = useMilaeRecords();

  const evolucao    = getEvolucaoMensal(records);
  const faccaoData  = getResistentesPorFaccao(records);
  const periodoData = getResistentesPorPeriodo(records);
  const opmData     = getResistentesPorOpm(records);
  const heatPoints  = getHeatPoints(records);

  if (isLoading) {
    return <div style={{ padding: 24, color: "#6b7280" }}>Carregando dados...</div>;
  }

  return (
    <>
      <header style={{ marginBottom: "24px" }}>
        <h1 style={{ margin: 0, fontSize: "28px", color: "#111827" }}>Dashboard</h1>
        <p style={{ marginTop: "8px", color: "#6b7280" }}>Visão geral dos dados de MILAE</p>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <StatCard title="Total de MILAE"              value={getTotalMilae(records)} />
        <StatCard title="Total de resistentes"        value={getTotalResistentes(records)} />
        <StatCard title="Média mensal de resistentes" value={getMediaMensalResistentes(records)} />
        <StatCard title="Média de agentes por MILAE"  value={getMediaAgentesPorMilae(records)} />
      </section>

      <section
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px", marginBottom: "24px" }}
      >
        <EvolucaoCasosChart data={evolucao.data} anos={evolucao.anos} />
        <ResistentesFaccaoChart data={faccaoData} />
      </section>

      <section
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}
      >
        <ResistentesPeriodoChart data={periodoData} />
        <ResistentesOpmChart data={opmData} />
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
        <HeatMapPanel heatPoints={heatPoints} />
      </section>
    </>
  );
}
