import { Bar, BarChart, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Panel from "../../../components/ui/Panel";

type Props = {
  data: { nome: string; quantidade: number }[];
};

export default function ResistentesFaccaoChart({ data }: Props) {
  return (
    <Panel title="Resistentes por facção">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, left: 40, bottom: 10 }}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="nome" tickLine={false} axisLine={false} width={110} />
          <Tooltip />
          <Bar dataKey="quantidade" radius={[0, 8, 8, 0]}>
            {data.map((_, index) => (
              <Cell key={`faccao-${index}`} fill={index === 0 ? "#4b3427" : "#d9d9d9"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Panel>
  );
}
