import StatCard from "../../components/ui/StatCard";
import EvolucaoCasosChart from "./components/EvolucaoCasosChart";
import ResistentesFaccaoChart from "./components/ResistentesFaccaoChart";
import ResistentesPeriodoChart from "./components/ResistentesPeriodoChart";
import ResistentesOpmChart from "./components/ResistentesOpmChart";
import HeatMapPanel from "./components/HeatMapPanel";
import { milaeData } from "../../data/milaeData";

function calcularEstatisticas() {
  const totalResistentes = milaeData.reduce((total, item) => total + item.resistentes, 0);
  const resistentesPorMes: Record<string, number> = {};
  milaeData.forEach((item) => {
    resistentesPorMes[item.mes] = (resistentesPorMes[item.mes] || 0) + item.resistentes;
  });
  const totalMeses = Object.keys(resistentesPorMes).length || 1;
  const somaMensal = Object.values(resistentesPorMes).reduce((total, valor) => total + valor, 0);
  const mediaMensalResistentes = Math.round(somaMensal / totalMeses);
  const totalAgentes = milaeData.reduce((total, item) => total + item.agentes, 0);
  const mediaAgentesPorMilae = (totalAgentes / milaeData.length).toFixed(2);
  return { totalResistentes, mediaMensalResistentes, mediaAgentesPorMilae };
}

export default function DashboardPage() {
  const { totalResistentes, mediaMensalResistentes, mediaAgentesPorMilae } = calcularEstatisticas();

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
        <StatCard title="Total de MILAE" value={milaeData.length} />
        <StatCard title="Total de resistentes" value={totalResistentes} />
        <StatCard title="Média mensal de resistentes" value={mediaMensalResistentes} />
        <StatCard title="Média de agentes por MILAE" value={mediaAgentesPorMilae} />
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
