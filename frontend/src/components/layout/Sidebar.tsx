import type { Page } from "../../types";
import { getMenuButtonStyle } from "../../styles/common";
import { useAuthStore } from "../../store/authStore";

type SidebarProps = {
  activePage: Page;
  onNavigate: (page: Page) => void;
  isAdmin: boolean;
};

export default function Sidebar({ activePage, onNavigate, isAdmin }: SidebarProps) {
  const { user, logout } = useAuthStore();

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

        {isAdmin && (
          <button
            style={getMenuButtonStyle(activePage === "cadastro")}
            onClick={() => onNavigate("cadastro")}
          >
            Cadastro
          </button>
        )}
      </nav>

      <div style={{ marginTop: "auto", borderTop: "1px solid #1f2937", paddingTop: "16px" }}>
        <div style={{ marginBottom: "12px" }}>
          <p style={{ margin: 0, fontSize: "14px", color: "#f9fafb", fontWeight: 600 }}>
            {user?.nome}
          </p>
          <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#9ca3af" }}>
            {user?.email}
          </p>
          <span
            style={{
              display: "inline-block",
              marginTop: "6px",
              fontSize: "11px",
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: "999px",
              background: isAdmin ? "#1d4ed8" : "#374151",
              color: "#fff",
            }}
          >
            {isAdmin ? "ADMIN" : "VISUALIZADOR"}
          </span>
        </div>

        <button
          onClick={logout}
          style={{
            background: "transparent",
            border: "1px solid #374151",
            color: "#9ca3af",
            padding: "9px 14px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "13px",
            width: "100%",
            textAlign: "left",
          }}
        >
          Sair
        </button>
      </div>
    </aside>
  );
}
