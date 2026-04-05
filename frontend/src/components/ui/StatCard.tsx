import { cardStyle, cardTitleStyle, cardValueStyle } from "../../styles/common";

type StatCardProps = {
  title: string;
  value: string | number;
};

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div style={cardStyle}>
      <h3 style={cardTitleStyle}>{title}</h3>
      <strong style={cardValueStyle}>{value}</strong>
    </div>
  );
}
