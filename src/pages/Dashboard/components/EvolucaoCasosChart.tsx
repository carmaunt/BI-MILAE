import { Line, LineChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getEvolucaoMensal } from "../../../data/db";
import Panel from "../../../components/ui/Panel";

const CORES: Record<number, string> = {
  2024: "#6b7280",
  2025: "#111827",
  2026: "#9ca3af",
  2027: "#d1d5db",
};

export default function EvolucaoCasosChart() {
  const { data, anos } = getEvolucaoMensal();

  return (
    <Panel title="Evolução dos casos">
      <div style={{ width: "100%", overflowX: "auto", overflowY: "hidden" }}>
        <div style={{ width: "1100px", height: "280px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
              <XAxis dataKey="mes" interval={0} />
              <YAxis />
              <Tooltip />
              <Legend />
              {anos.map((ano) => (
                <Line
                  key={ano}
                  type="monotone"
                  dataKey={`ano${ano}`}
                  name={String(ano)}
                  stroke={CORES[ano] ?? "#374151"}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Panel>
  );
}
