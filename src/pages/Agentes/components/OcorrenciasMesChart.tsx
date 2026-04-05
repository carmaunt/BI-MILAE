import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Panel from "../../../components/ui/Panel";

type OcorrenciasMesChartProps = {
  data: { mes: string; quantidade: number }[];
};

export default function OcorrenciasMesChart({ data }: OcorrenciasMesChartProps) {
  return (
    <Panel title="Ocorrências por Mês" titleStyle={{ textAlign: "center" }}>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 30, bottom: 10 }}>
          <XAxis dataKey="mes" />
          <YAxis hide />
          <Tooltip />
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
