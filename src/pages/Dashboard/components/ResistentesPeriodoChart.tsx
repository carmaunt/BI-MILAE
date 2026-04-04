import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Panel from "../../../components/ui/Panel";

type Props = {
  data: { periodo: string; quantidade: number }[];
};

export default function ResistentesPeriodoChart({ data }: Props) {
  return (
    <Panel title="Resistentes por período">
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
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
    </Panel>
  );
}
