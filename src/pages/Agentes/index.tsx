import { useMemo, useState } from "react";
import StatCard from "../../components/ui/StatCard";
import RankingTable from "./components/RankingTable";
import OcorrenciasFaccaoChart from "./components/OcorrenciasFaccaoChart";
import OcorrenciasMesChart from "./components/OcorrenciasMesChart";
import { getRankingAgentes, type AgenteStat } from "../../data/db";

const MESES_KEY = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"] as const;

function calcularDadosTela(agenteSelecionado: string | null, ranking: AgenteStat[]) {
  if (agenteSelecionado) {
    const agente = ranking.find((a) => a.nome === agenteSelecionado);
    if (agente) {
      const mesesComOcorrencia = Object.values(agente.mensal).filter((v) => v > 0).length || 1;
      return {
        titulo: agente.nome,
        totalMilae: agente.ocorrencias,
        totalResistentes: agente.resistentesTotal,
        mediaMensalResistentes: (agente.resistentesTotal / mesesComOcorrencia).toFixed(2),
        ocorrenciasPorMesData: MESES_KEY.map((mes) => ({ mes, quantidade: agente.mensal[mes] })),
        ocorrenciasPorFaccaoData: agente.faccoes,
      };
    }
  }

  const totalMilae = ranking.reduce((acc, a) => acc + a.ocorrencias, 0);
  const totalResistentes = ranking.reduce((acc, a) => acc + a.resistentesTotal, 0);

  const somaMensal = MESES_KEY.reduce((acc, mes) => {
    acc[mes] = ranking.reduce((sum, a) => sum + a.mensal[mes], 0);
    return acc;
  }, {} as Record<string, number>);

  const mesesComOcorrencia = Object.values(somaMensal).filter((v) => v > 0).length || 1;

  const faccaoMap: Record<string, number> = {};
  ranking.forEach((a) =>
    a.faccoes.forEach((f) => {
      faccaoMap[f.nome] = (faccaoMap[f.nome] || 0) + f.quantidade;
    })
  );

  return {
    titulo: "Visão geral",
    totalMilae,
    totalResistentes,
    mediaMensalResistentes: (totalResistentes / mesesComOcorrencia).toFixed(2),
    ocorrenciasPorMesData: MESES_KEY.map((mes) => ({ mes, quantidade: somaMensal[mes] })),
    ocorrenciasPorFaccaoData: Object.entries(faccaoMap).map(([nome, quantidade]) => ({ nome, quantidade })),
  };
}

export default function AgentesPage() {
  const [agenteSelecionado, setAgenteSelecionado] = useState<string | null>(null);
  const ranking = useMemo(() => getRankingAgentes(), []);
  const dadosTela = useMemo(() => calcularDadosTela(agenteSelecionado, ranking), [agenteSelecionado, ranking]);

  return (
    <>
      <header style={{ marginBottom: "24px" }}>
        <h1 style={{ margin: 0, fontSize: "28px", color: "#111827" }}>Agentes</h1>
        <p style={{ marginTop: "8px", color: "#6b7280" }}>
          {agenteSelecionado ? `Filtro ativo: ${dadosTela.titulo}` : "Área inicial da página de agentes"}
        </p>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <StatCard title="Total de MILAE"                value={dadosTela.totalMilae} />
        <StatCard title="Total de resistentes"          value={dadosTela.totalResistentes} />
        <StatCard title="Média mensal de resistentes"   value={dadosTela.mediaMensalResistentes} />
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
        <RankingTable
          rankingData={ranking}
          agenteSelecionado={agenteSelecionado}
          onSelect={setAgenteSelecionado}
          onClearFilter={() => setAgenteSelecionado(null)}
        />
        <OcorrenciasFaccaoChart data={dadosTela.ocorrenciasPorFaccaoData} />
      </section>

      <section style={{ marginTop: "16px" }}>
        <OcorrenciasMesChart data={dadosTela.ocorrenciasPorMesData} />
      </section>
    </>
  );
}
