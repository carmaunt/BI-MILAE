import { Line, LineChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { chartData } from "../../../data/milaeData";
import Panel from "../../../components/ui/Panel";

export default function EvolucaoCasosChart() {
  return (
    <Panel title="Evolução dos casos">
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
    </Panel>
  );
}
