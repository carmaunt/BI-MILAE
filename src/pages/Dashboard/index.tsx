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
} from "../../data/db";

export default function DashboardPage() {
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
        <StatCard title="Total de MILAE"                value={getTotalMilae()} />
        <StatCard title="Total de resistentes"          value={getTotalResistentes()} />
        <StatCard title="Média mensal de resistentes"   value={getMediaMensalResistentes()} />
        <StatCard title="Média de agentes por MILAE"    value={getMediaAgentesPorMilae()} />
      </section>

      <section
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px", marginBottom: "24px" }}
      >
        <EvolucaoCasosChart />
        <ResistentesFaccaoChart />
      </section>

      <section
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}
      >
        <ResistentesPeriodoChart />
        <ResistentesOpmChart />
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
        <HeatMapPanel />
      </section>
    </>
  );
}
