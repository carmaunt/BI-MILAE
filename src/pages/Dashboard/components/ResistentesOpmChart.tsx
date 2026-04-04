import { Bar, BarChart, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { opmData } from "../../../data/milaeData";
import Panel from "../../../components/ui/Panel";

export default function ResistentesOpmChart() {
  return (
    <Panel title="Resistentes por OPM">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={opmData} layout="vertical" margin={{ top: 10, right: 20, left: 30, bottom: 10 }}>
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
    </Panel>
  );
}
