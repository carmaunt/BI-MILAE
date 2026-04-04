import { thStyle, tdStyle } from "../../../styles/common";
import type { RankingItem } from "../../../types";

type RankingTableProps = {
  rankingData: RankingItem[];
  agenteSelecionado: string | null;
  onSelect: (nome: string) => void;
  onClearFilter: () => void;
};

export default function RankingTable({ rankingData, agenteSelecionado, onSelect, onClearFilter }: RankingTableProps) {
  const headerRight = agenteSelecionado ? (
    <button
      onClick={onClearFilter}
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
  ) : null;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2 style={{ margin: 0, fontSize: "18px", color: "#111827" }}>Ranking MILAE</h2>
        {headerRight}
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
                      onClick={() => onSelect(item.nome)}
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
  );
}
