// src/App.tsx
import { useMemo, useState } from "react";
import MilaeHeatMap from "./MilaeHeatMap";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Page = "dashboard" | "agentes";

type RankingItem = {
  nome: string;
  ocorrencias: number;
  resistentesTotal: number;
  mensal: Record<
    "jan" | "fev" | "mar" | "abr" | "mai" | "jun" | "jul" | "ago" | "set" | "out" | "nov" | "dez",
    number
  >;
  faccoes: { nome: string; quantidade: number }[];
};

function App() {
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [agenteSelecionado, setAgenteSelecionado] = useState<string | null>(null);

  const milaeData = [
    { id: 1, resistentes: 1, agentes: 2, mes: "2026-01" },
    { id: 2, resistentes: 2, agentes: 2, mes: "2026-02" },
    { id: 3, resistentes: 2, agentes: 3, mes: "2026-03" },
  ];

  const totalResistentes = milaeData.reduce((total, item) => total + item.resistentes, 0);

  const resistentesPorMes: Record<string, number> = {};
  milaeData.forEach((item) => {
    if (!resistentesPorMes[item.mes]) resistentesPorMes[item.mes] = 0;
    resistentesPorMes[item.mes] += item.resistentes;
  });

  const totalMeses = Object.keys(resistentesPorMes).length || 1;
  const somaMensal = Object.values(resistentesPorMes).reduce((total, valor) => total + valor, 0);
  const mediaMensalResistentes = Math.round(somaMensal / totalMeses);

  const totalAgentes = milaeData.reduce((total, item) => total + item.agentes, 0);
  const mediaAgentesPorMilae = (totalAgentes / milaeData.length).toFixed(2);

  const chartData = [
    { mes: "Jan", ano2025: 9, ano2026: 4 },
    { mes: "Fev", ano2025: 7, ano2026: 4 },
    { mes: "Mar", ano2025: 10, ano2026: 6 },
    { mes: "Abr", ano2025: 6, ano2026: 6 },
    { mes: "Mai", ano2025: 6, ano2026: 5 },
    { mes: "Jun", ano2025: 12, ano2026: 7 },
    { mes: "Jul", ano2025: 5, ano2026: 4 },
    { mes: "Ago", ano2025: 7, ano2026: 6 },
    { mes: "Set", ano2025: 8, ano2026: 5 },
    { mes: "Out", ano2025: 6, ano2026: 4 },
    { mes: "Nov", ano2025: 9, ano2026: 7 },
    { mes: "Dez", ano2025: 11, ano2026: 8 },
  ];

  const faccaoData = [
    { nome: "BDM", quantidade: 65 },
    { nome: "NÃO VINCULADO", quantidade: 22 },
    { nome: "CV", quantidade: 19 },
    { nome: "PCC", quantidade: 8 },
    { nome: "KLV", quantidade: 1 },
  ];

  const opmData = [
    { nome: "BPT-RMS", quantidade: 65 },
    { nome: "26° BPM", quantidade: 13 },
    { nome: "81ª CIPM", quantidade: 9 },
    { nome: "36ª CIPM", quantidade: 7 },
    { nome: "59ª CIPM", quantidade: 6 },
    { nome: "22ª CIPM", quantidade: 5 },
    { nome: "53ª CIPM", quantidade: 5 },
    { nome: "52ª CIPM", quantidade: 3 },
  ];

  const periodoData = [
    { periodo: "Madrugada", quantidade: 14 },
    { periodo: "Manhã", quantidade: 18 },
    { periodo: "Tarde", quantidade: 60 },
    { periodo: "Noite", quantidade: 23 },
  ];

  const rankingData: RankingItem[] = [
    {
      nome: "SD PM LUIS FELIPE VITORINO DE SOUZA",
      ocorrencias: 6,
      resistentesTotal: 9,
      mensal: {
        jan: 2,
        fev: 1,
        mar: 0,
        abr: 0,
        mai: 0,
        jun: 0,
        jul: 2,
        ago: 0,
        set: 1,
        out: 0,
        nov: 0,
        dez: 0,
      },
      faccoes: [
        { nome: "BDM", quantidade: 2 },
        { nome: "NÃO VINCULADO", quantidade: 3 },
        { nome: "CV", quantidade: 1 },
      ],
    },
    {
      nome: "SD PM WILLIAM OLIVEIRA NASCIMENTO",
      ocorrencias: 6,
      resistentesTotal: 8,
      mensal: {
        jan: 1,
        fev: 1,
        mar: 1,
        abr: 0,
        mai: 0,
        jun: 0,
        jul: 2,
        ago: 0,
        set: 1,
        out: 0,
        nov: 0,
        dez: 0,
      },
      faccoes: [
        { nome: "BDM", quantidade: 1 },
        { nome: "NÃO VINCULADO", quantidade: 4 },
        { nome: "CV", quantidade: 1 },
      ],
    },
    {
      nome: "SD PM MATHEUS RIBEIRO PINTO",
      ocorrencias: 5,
      resistentesTotal: 7,
      mensal: {
        jan: 1,
        fev: 0,
        mar: 0,
        abr: 1,
        mai: 0,
        jun: 0,
        jul: 2,
        ago: 0,
        set: 1,
        out: 0,
        nov: 0,
        dez: 0,
      },
      faccoes: [
        { nome: "BDM", quantidade: 2 },
        { nome: "NÃO VINCULADO", quantidade: 2 },
        { nome: "CV", quantidade: 1 },
      ],
    },
    {
      nome: "SD PM ELSON TELES ALVES DA SILVA",
      ocorrencias: 5,
      resistentesTotal: 6,
      mensal: {
        jan: 0,
        fev: 1,
        mar: 0,
        abr: 1,
        mai: 0,
        jun: 0,
        jul: 1,
        ago: 1,
        set: 1,
        out: 0,
        nov: 0,
        dez: 0,
      },
      faccoes: [
        { nome: "BDM", quantidade: 1 },
        { nome: "NÃO VINCULADO", quantidade: 3 },
        { nome: "CV", quantidade: 1 },
      ],
    },
    {
      nome: "SD PM JEFFERSON COSTA DOS REIS",
      ocorrencias: 5,
      resistentesTotal: 5,
      mensal: {
        jan: 1,
        fev: 0,
        mar: 1,
        abr: 0,
        mai: 0,
        jun: 0,
        jul: 1,
        ago: 0,
        set: 1,
        out: 1,
        nov: 0,
        dez: 0,
      },
      faccoes: [
        { nome: "BDM", quantidade: 1 },
        { nome: "NÃO VINCULADO", quantidade: 2 },
        { nome: "CV", quantidade: 2 },
      ],
    },
    {
      nome: "SD PM LUIS PAULO LIMA DOS SANTOS",
      ocorrencias: 5,
      resistentesTotal: 6,
      mensal: {
        jan: 0,
        fev: 1,
        mar: 0,
        abr: 0,
        mai: 1,
        jun: 0,
        jul: 1,
        ago: 1,
        set: 1,
        out: 0,
        nov: 0,
        dez: 0,
      },
      faccoes: [
        { nome: "BDM", quantidade: 2 },
        { nome: "NÃO VINCULADO", quantidade: 2 },
        { nome: "CV", quantidade: 1 },
      ],
    },
  ];

  const dadosTela = useMemo(() => {
    if (agenteSelecionado) {
      const agente = rankingData.find((item) => item.nome === agenteSelecionado);
      if (!agente) return null;

      const meses = Object.values(agente.mensal);
      const mesesComOcorrencia = meses.filter((valor) => valor > 0).length || 1;

      return {
        titulo: agente.nome,
        totalMilae: agente.ocorrencias,
        totalResistentes: agente.resistentesTotal,
        mediaMensalResistentes: (agente.resistentesTotal / mesesComOcorrencia).toFixed(2),
        ocorrenciasPorMesData: [
          { mes: "jan", quantidade: agente.mensal.jan },
          { mes: "fev", quantidade: agente.mensal.fev },
          { mes: "mar", quantidade: agente.mensal.mar },
          { mes: "abr", quantidade: agente.mensal.abr },
          { mes: "mai", quantidade: agente.mensal.mai },
          { mes: "jun", quantidade: agente.mensal.jun },
          { mes: "jul", quantidade: agente.mensal.jul },
          { mes: "ago", quantidade: agente.mensal.ago },
          { mes: "set", quantidade: agente.mensal.set },
          { mes: "out", quantidade: agente.mensal.out },
          { mes: "nov", quantidade: agente.mensal.nov },
          { mes: "dez", quantidade: agente.mensal.dez },
        ],
        ocorrenciasPorFaccaoData: agente.faccoes,
      };
    }

    const totalMilae = rankingData.reduce((acc, item) => acc + item.ocorrencias, 0);
    const totalResistentes = rankingData.reduce((acc, item) => acc + item.resistentesTotal, 0);

    const somaMensalAgentes = {
      jan: 0,
      fev: 0,
      mar: 0,
      abr: 0,
      mai: 0,
      jun: 0,
      jul: 0,
      ago: 0,
      set: 0,
      out: 0,
      nov: 0,
      dez: 0,
    };

    rankingData.forEach((item) => {
      somaMensalAgentes.jan += item.mensal.jan;
      somaMensalAgentes.fev += item.mensal.fev;
      somaMensalAgentes.mar += item.mensal.mar;
      somaMensalAgentes.abr += item.mensal.abr;
      somaMensalAgentes.mai += item.mensal.mai;
      somaMensalAgentes.jun += item.mensal.jun;
      somaMensalAgentes.jul += item.mensal.jul;
      somaMensalAgentes.ago += item.mensal.ago;
      somaMensalAgentes.set += item.mensal.set;
      somaMensalAgentes.out += item.mensal.out;
      somaMensalAgentes.nov += item.mensal.nov;
      somaMensalAgentes.dez += item.mensal.dez;
    });

    const mesesComOcorrencia =
      Object.values(somaMensalAgentes).filter((valor) => valor > 0).length || 1;

    const faccaoMap: Record<string, number> = {};
    rankingData.forEach((item) => {
      item.faccoes.forEach((faccao) => {
        faccaoMap[faccao.nome] = (faccaoMap[faccao.nome] || 0) + faccao.quantidade;
      });
    });

    return {
      titulo: "Visão geral",
      totalMilae,
      totalResistentes,
      mediaMensalResistentes: (totalResistentes / mesesComOcorrencia).toFixed(2),
      ocorrenciasPorMesData: [
        { mes: "jan", quantidade: somaMensalAgentes.jan },
        { mes: "fev", quantidade: somaMensalAgentes.fev },
        { mes: "mar", quantidade: somaMensalAgentes.mar },
        { mes: "abr", quantidade: somaMensalAgentes.abr },
        { mes: "mai", quantidade: somaMensalAgentes.mai },
        { mes: "jun", quantidade: somaMensalAgentes.jun },
        { mes: "jul", quantidade: somaMensalAgentes.jul },
        { mes: "ago", quantidade: somaMensalAgentes.ago },
        { mes: "set", quantidade: somaMensalAgentes.set },
        { mes: "out", quantidade: somaMensalAgentes.out },
        { mes: "nov", quantidade: somaMensalAgentes.nov },
        { mes: "dez", quantidade: somaMensalAgentes.dez },
      ],
      ocorrenciasPorFaccaoData: Object.entries(faccaoMap).map(([nome, quantidade]) => ({
        nome,
        quantidade,
      })),
    };
  }, [agenteSelecionado, rankingData]);

  const renderDashboard = () => (
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
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Total de MILAE</h3>
          <strong style={cardValueStyle}>{milaeData.length}</strong>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Total de resistentes</h3>
          <strong style={cardValueStyle}>{totalResistentes}</strong>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Média mensal de resistentes</h3>
          <strong style={cardValueStyle}>{mediaMensalResistentes}</strong>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Média de agentes por MILAE</h3>
          <strong style={cardValueStyle}>{mediaAgentesPorMilae}</strong>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div style={panelStyle}>
          <h2 style={panelTitleStyle}>Evolução dos casos</h2>

          <div style={{ width: "100%", overflowX: "auto", overflowY: "hidden" }}>
            <div style={{ width: "1100px", height: "280px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                  <XAxis dataKey="mes" interval={0} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="ano2025" name="2025" stroke="#111827" />
                  <Line type="monotone" dataKey="ano2026" name="2026" stroke="#9ca3af" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div style={panelStyle}>
          <h2 style={panelTitleStyle}>Resistentes por facção</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={faccaoData}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 40, bottom: 10 }}
            >
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="nome" tickLine={false} axisLine={false} width={110} />
              <Tooltip />
              <Bar dataKey="quantidade" radius={[0, 8, 8, 0]}>
                {faccaoData.map((_, index) => (
                  <Cell key={`faccao-${index}`} fill={index === 0 ? "#4b3427" : "#d9d9d9"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div style={panelStyle}>
          <h2 style={panelTitleStyle}>Resistentes por período</h2>

          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={periodoData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
              <XAxis dataKey="periodo" />
              <YAxis />
              <Tooltip
                formatter={(value) => [value, "Quantidade"]}
                labelFormatter={(label) => `Período: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="quantidade"
                stroke="#111827"
                fill="#d1d5db"
                fillOpacity={0.8}
                dot={{ r: 4, fill: "#ffffff", stroke: "#111827", strokeWidth: 1 }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={panelStyle}>
          <h2 style={panelTitleStyle}>Resistentes por OPM</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={opmData}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 30, bottom: 10 }}
            >
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="nome" tickLine={false} axisLine={false} width={90} />
              <Tooltip />
              <Bar dataKey="quantidade" radius={[0, 8, 8, 0]}>
                {opmData.map((_, index) => (
                  <Cell key={`opm-${index}`} fill={index === 0 ? "#4b3427" : "#d9d9d9"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
        <div style={panelStyle}>
          <h2 style={panelTitleStyle}>Mancha de calor de incidência de MILAE</h2>

          <MilaeHeatMap />

          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              marginTop: "12px",
              background: "rgba(255,255,255,0.9)",
              padding: "10px 12px",
              borderRadius: "12px",
              fontSize: "13px",
              color: "#111827",
              width: "fit-content",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "999px",
                  background: "#fef08a",
                  display: "inline-block",
                }}
              />
              Baixa
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "999px",
                  background: "#f59e0b",
                  display: "inline-block",
                }}
              />
              Média
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "999px",
                  background: "#dc2626",
                  display: "inline-block",
                }}
              />
              Alta
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const renderAgentes = () => (
    <>
      <header style={{ marginBottom: "24px" }}>
        <h1 style={{ margin: 0, fontSize: "28px", color: "#111827" }}>Agentes</h1>
        <p style={{ marginTop: "8px", color: "#6b7280" }}>
          {agenteSelecionado ? `Filtro ativo: ${dadosTela?.titulo}` : "Área inicial da página de agentes"}
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
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Total de MILAE</h3>
          <strong style={cardValueStyle}>{dadosTela?.totalMilae ?? 0}</strong>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Total de resistentes</h3>
          <strong style={cardValueStyle}>{dadosTela?.totalResistentes ?? 0}</strong>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Média mensal de resistentes</h3>
          <strong style={cardValueStyle}>{dadosTela?.mediaMensalResistentes ?? 0}</strong>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        <div style={panelStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h2 style={panelTitleStyle}>Ranking MILAE</h2>

            {agenteSelecionado && (
              <button
                onClick={() => setAgenteSelecionado(null)}
                style={{
                  border: "none",
                  background: "#111827",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Limpar filtro
              </button>
            )}
          </div>

          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
                  <th style={thStyle}>PM</th>
                  <th style={thStyle}>Ocorrências</th>
                </tr>
              </thead>
              <tbody>
                {rankingData.map((item, index) => {
                  const ativo = agenteSelecionado === item.nome;

                  return (
                    <tr
                      key={index}
                      style={{
                        borderBottom: "1px solid #e5e7eb",
                        background: ativo ? "#dbeafe" : index % 2 === 0 ? "#f9fafb" : "#fff",
                      }}
                    >
                      <td style={tdStyle}>
                        <button
                          onClick={() => setAgenteSelecionado(item.nome)}
                          style={{
                            background: "transparent",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                            color: ativo ? "#1d4ed8" : "#111827",
                            fontWeight: ativo ? 700 : 400,
                            textAlign: "left",
                          }}
                        >
                          {item.nome}
                        </button>
                      </td>
                      <td style={tdStyle}>{item.ocorrencias}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div style={panelStyle}>
          <h2 style={{ ...panelTitleStyle, textAlign: "center" }}>Ocorrências por Facção</h2>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={dadosTela?.ocorrenciasPorFaccaoData || []}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 40, bottom: 10 }}
            >
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="nome" tickLine={false} axisLine={false} width={140} />
              <Tooltip />
              <Bar dataKey="quantidade" radius={[0, 8, 8, 0]}>
                {(dadosTela?.ocorrenciasPorFaccaoData || []).map((entry, index) => (
                  <Cell
                    key={`faccao-agente-${index}`}
                    fill={entry.nome === "NÃO VINCULADO" ? "#4b3427" : "#eeeeee"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section style={{ marginTop: "16px" }}>
        <div style={panelStyle}>
          <h2 style={{ ...panelTitleStyle, textAlign: "center" }}>Ocorrências por Mês</h2>

          <ResponsiveContainer width="100%" height={260}>
            <AreaChart
              data={dadosTela?.ocorrenciasPorMesData || []}
              margin={{ top: 10, right: 20, left: 30, bottom: 10 }}
            >
              <XAxis dataKey="mes" />
              <YAxis hide />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="quantidade"
                stroke="#4b3427"
                fill="#b4a287"
                fillOpacity={0.9}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <aside
        style={{
          width: "260px",
          background: "#111827",
          color: "#fff",
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: "22px" }}>BI-MILAE</h2>
          <p style={{ margin: "8px 0 0", fontSize: "14px", color: "#9ca3af" }}>Painel analítico</p>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            style={getMenuButtonStyle(activePage === "dashboard")}
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </button>

          <button
            style={getMenuButtonStyle(activePage === "agentes")}
            onClick={() => setActivePage("agentes")}
          >
            Agentes
          </button>
        </nav>
      </aside>

      <main style={{ flex: 1, background: "#f3f4f6", padding: "24px" }}>
        {activePage === "dashboard" ? renderDashboard() : renderAgentes()}
      </main>
    </div>
  );
}

const getMenuButtonStyle = (isActive: boolean) => ({
  background: isActive ? "#1f2937" : "transparent",
  border: isActive ? "1px solid #60a5fa" : "1px solid #374151",
  color: "#fff",
  padding: "12px 14px",
  borderRadius: "10px",
  textAlign: "left" as const,
  cursor: "pointer",
  fontSize: "14px",
});

const cardStyle = {
  background: "#fff",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const cardTitleStyle = {
  margin: "0 0 12px",
  fontSize: "14px",
  color: "#6b7280",
};

const cardValueStyle = {
  fontSize: "28px",
  color: "#111827",
};

const panelStyle = {
  background: "#fff",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const panelTitleStyle = {
  margin: "0 0 16px",
  fontSize: "18px",
  color: "#111827",
};

const thStyle = {
  padding: "12px",
  fontSize: "14px",
  color: "#6b7280",
};

const tdStyle = {
  padding: "12px",
  fontSize: "14px",
  color: "#111827",
};

export default App;