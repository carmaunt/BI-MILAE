import { Bar, BarChart, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { FaccaoEntry } from "../../../types";
import Panel from "../../../components/ui/Panel";

type OcorrenciasFaccaoChartProps = {
  data: FaccaoEntry[];
};

export default function OcorrenciasFaccaoChart({ data }: OcorrenciasFaccaoChartProps) {
  return (
    <Panel title="Ocorrências por Facção" titleStyle={{ textAlign: "center" }}>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, left: 40, bottom: 10 }}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="nome" tickLine={false} axisLine={false} width={140} />
          <Tooltip />
          <Bar dataKey="quantidade" radius={[0, 8, 8, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`faccao-agente-${index}`}
                fill={entry.nome === "NÃO VINCULADO" ? "#4b3427" : "#eeeeee"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Panel>
  );
}
