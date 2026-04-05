import { useMemo, useState } from "react";
import { useMilaeRecords } from "../../hooks/useMilaeRecords";
import StatCard from "../../components/ui/StatCard";
import ErrorBanner from "../../components/ui/ErrorBanner";
import RankingTable from "./components/RankingTable";
import OcorrenciasFaccaoChart from "./components/OcorrenciasFaccaoChart";
import OcorrenciasMesChart from "./components/OcorrenciasMesChart";
import {
  getRankingAgentes,
  getTotalMilae,
  getTotalResistentes,
  getMediaMensalResistentes,
  getResistentesPorFaccao,
  getOcorrenciasPorMes,
  type AgenteStat,
  type MilaeRecord,
} from "../../data/db";

const MESES_KEY = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"] as const;

function calcularDadosTela(
  agenteSelecionado: string | null,
  ranking: AgenteStat[],
  records: MilaeRecord[]
) {
  if (agenteSelecionado) {
    const agente = ranking.find((a) => a.nome === agenteSelecionado);
    if (agente) {
      const mesesComOcorrencia = Object.values(agente.mensal).filter((v) => v > 0).length || 1;
      return {
        titulo:                  agente.nome,
        totalMilae:              agente.ocorrencias,
        totalResistentes:        agente.resistentesTotal,
        mediaMensalResistentes:  (agente.resistentesTotal / mesesComOcorrencia).toFixed(2),
        ocorrenciasPorMesData:   MESES_KEY.map((mes) => ({ mes, quantidade: agente.mensal[mes] })),
        ocorrenciasPorFaccaoData: agente.faccoes,
      };
    }
  }

  return {
    titulo:                  "Visão geral",
    totalMilae:              getTotalMilae(records),
    totalResistentes:        getTotalResistentes(records),
    mediaMensalResistentes:  String(getMediaMensalResistentes(records)),
    ocorrenciasPorMesData:   getOcorrenciasPorMes(records),
    ocorrenciasPorFaccaoData: getResistentesPorFaccao(records),
  };
}

export default function AgentesPage() {
  const { data: records = [], isLoading, isError, refetch } = useMilaeRecords();
  const [agenteSelecionado, setAgenteSelecionado] = useState<string | null>(null);

  const ranking    = useMemo(() => getRankingAgentes(records), [records]);
  const dadosTela  = useMemo(
    () => calcularDadosTela(agenteSelecionado, ranking, records),
    [agenteSelecionado, ranking, records]
  );

  if (isLoading) {
    return <div style={{ padding: 24, color: "#6b7280" }}>Carregando dados...</div>;
  }

  if (isError) {
    return (
      <>
        <header style={{ marginBottom: "24px" }}>
          <h1 style={{ margin: 0, fontSize: "28px", color: "#111827" }}>Agentes</h1>
        </header>
        <ErrorBanner
          mensagem="Não foi possível carregar os dados dos agentes. Verifique sua conexão e tente novamente."
          onRetry={() => refetch()}
        />
      </>
    );
  }

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
        <StatCard title="Total de MILAE"              value={dadosTela.totalMilae} />
        <StatCard title="Total de resistentes"        value={dadosTela.totalResistentes} />
        <StatCard title="Média mensal de resistentes" value={dadosTela.mediaMensalResistentes} />
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
