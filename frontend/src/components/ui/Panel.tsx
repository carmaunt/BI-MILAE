import type { CSSProperties, ReactNode } from "react";
import { panelStyle, panelTitleStyle } from "../../styles/common";

type PanelProps = {
  title: string;
  titleStyle?: CSSProperties;
  children: ReactNode;
  headerRight?: ReactNode;
};

export default function Panel({ title, titleStyle, children, headerRight }: PanelProps) {
  return (
    <div style={panelStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ ...panelTitleStyle, margin: 0, ...titleStyle }}>{title}</h2>
        {headerRight}
      </div>
      {children}
    </div>
  );
}
