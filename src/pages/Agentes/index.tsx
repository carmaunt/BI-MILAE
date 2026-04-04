import { useMemo, useState } from "react";
import StatCard from "../../components/ui/StatCard";
import RankingTable from "./components/RankingTable";
import OcorrenciasFaccaoChart from "./components/OcorrenciasFaccaoChart";
import OcorrenciasMesChart from "./components/OcorrenciasMesChart";
import {
  getRankingAgentes,
  getTotalMilae,
  getTotalResistentes,
  getMediaMensalResistentes,
  getResistentesPorFaccao,
  milaeRecords,
  type AgenteStat,
} from "../../data/db";

const MESES_KEY = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"] as const;

function getOcorrenciasPorMesGeral() {
  const mapa: Record<string, number> = {};
  milaeRecords.forEach((m) => {
    const mesIdx = Number(m.data.slice(5, 7)) - 1;
    const mesKey = MESES_KEY[mesIdx];
    mapa[mesKey] = (mapa[mesKey] || 0) + 1;
  });
  return MESES_KEY.map((mes) => ({ mes, quantidade: mapa[mes] || 0 }));
}

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

  // Visão geral: totais diretos da tabela única — mesma fonte do Dashboard
  const totalResistentes = getTotalResistentes();
  return {
    titulo: "Visão geral",
    totalMilae: getTotalMilae(),
    totalResistentes,
    mediaMensalResistentes: String(getMediaMensalResistentes()),
    ocorrenciasPorMesData: getOcorrenciasPorMesGeral(),
    ocorrenciasPorFaccaoData: getResistentesPorFaccao(),
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
