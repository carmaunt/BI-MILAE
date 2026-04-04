import type { Page } from "../../types";
import { getMenuButtonStyle } from "../../styles/common";

type SidebarProps = {
  activePage: Page;
  onNavigate: (page: Page) => void;
};

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside
      style={{
        width: "260px",
        background: "#111827",
        color: "#fff",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <div>
        <h2 style={{ margin: 0, fontSize: "22px" }}>BI-MILAE</h2>
        <p style={{ margin: "8px 0 0", fontSize: "14px", color: "#9ca3af" }}>Painel analítico</p>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button style={getMenuButtonStyle(activePage === "dashboard")} onClick={() => onNavigate("dashboard")}>
          Dashboard
        </button>

        <button style={getMenuButtonStyle(activePage === "agentes")} onClick={() => onNavigate("agentes")}>
          Agentes
        </button>
      </nav>
    </aside>
  );
}
