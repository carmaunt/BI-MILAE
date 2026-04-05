import type { CSSProperties } from "react";

export const cardStyle: CSSProperties = {
  background: "#fff",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

export const cardTitleStyle: CSSProperties = {
  margin: "0 0 12px",
  fontSize: "14px",
  color: "#6b7280",
};

export const cardValueStyle: CSSProperties = {
  fontSize: "28px",
  color: "#111827",
};

export const panelStyle: CSSProperties = {
  background: "#fff",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

export const panelTitleStyle: CSSProperties = {
  margin: "0 0 16px",
  fontSize: "18px",
  color: "#111827",
};

export const thStyle: CSSProperties = {
  padding: "12px",
  fontSize: "14px",
  color: "#6b7280",
};

export const tdStyle: CSSProperties = {
  padding: "12px",
  fontSize: "14px",
  color: "#111827",
};

export const getMenuButtonStyle = (isActive: boolean): CSSProperties => ({
  background: isActive ? "#1f2937" : "transparent",
  border: isActive ? "1px solid #60a5fa" : "1px solid #374151",
  color: "#fff",
  padding: "12px 14px",
  borderRadius: "10px",
  textAlign: "left",
  cursor: "pointer",
  fontSize: "14px",
  width: "100%",
});
