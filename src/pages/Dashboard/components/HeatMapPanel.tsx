import MilaeHeatMap from "../../../components/map/MilaeHeatMap";
import Panel from "../../../components/ui/Panel";

const legendItems = [
  { label: "Baixa", color: "#fef08a" },
  { label: "Média", color: "#f59e0b" },
  { label: "Alta",  color: "#dc2626" },
];

type Props = {
  heatPoints: [number, number, number][];
};

export default function HeatMapPanel({ heatPoints }: Props) {
  return (
    <Panel title="Mancha de calor de incidência de MILAE">
      <MilaeHeatMap heatPoints={heatPoints} />
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
        {legendItems.map(({ label, color }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{ width: "14px", height: "14px", borderRadius: "999px", background: color, display: "inline-block" }}
            />
            {label}
          </div>
        ))}
      </div>
    </Panel>
  );
}
