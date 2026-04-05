import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { fetchUsuarios, atualizarStatus, type Usuario, type StatusUsuario } from "../../services/authApi";
import { panelStyle, panelTitleStyle } from "../../styles/common";

const STATUS_LABEL: Record<StatusUsuario, string> = {
  PENDENTE: "Pendente",
  ATIVO: "Ativo",
  INATIVO: "Inativo",
};

const STATUS_COLOR: Record<StatusUsuario, { bg: string; color: string }> = {
  PENDENTE: { bg: "#fef3c7", color: "#92400e" },
  ATIVO: { bg: "#dcfce7", color: "#166534" },
  INATIVO: { bg: "#f3f4f6", color: "#6b7280" },
};

export default function UsuariosPage() {
  const token = useAuthStore((s) => s.token)!;
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState<number | null>(null);
  const [erro, setErro] = useState("");

  const pendentes = usuarios.filter((u) => u.status === "PENDENTE");
  const demais = usuarios.filter((u) => u.status !== "PENDENTE");

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    setCarregando(true);
    try {
      const data = await fetchUsuarios(token);
      setUsuarios(data);
    } catch {
      setErro("Erro ao carregar usuários.");
    } finally {
      setCarregando(false);
    }
  }

  async function mudarStatus(id: number, status: StatusUsuario) {
    setAtualizando(id);
    try {
      const atualizado = await atualizarStatus(token, id, status);
      setUsuarios((prev) => prev.map((u) => (u.id === id ? { ...u, ...atualizado } : u)));
    } catch {
      setErro("Erro ao atualizar status.");
    } finally {
      setAtualizando(null);
    }
  }

  if (carregando) {
    return <div style={{ padding: "24px", color: "#6b7280" }}>Carregando...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ margin: 0, fontSize: "26px", color: "#111827" }}>Usuários</h1>
        <p style={{ margin: "4px 0 0", color: "#6b7280", fontSize: "14px" }}>
          Gerencie os acessos ao sistema
        </p>
      </div>

      {erro && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "12px 16px", color: "#dc2626", fontSize: "13px" }}>
          {erro}
        </div>
      )}

      {/* Pendentes */}
      <div style={panelStyle}>
        <h2 style={{ ...panelTitleStyle, display: "flex", alignItems: "center", gap: "10px" }}>
          Aguardando aprovação
          {pendentes.length > 0 && (
            <span style={{ background: "#f59e0b", color: "#fff", borderRadius: "999px", fontSize: "12px", fontWeight: 700, padding: "2px 10px" }}>
              {pendentes.length}
            </span>
          )}
        </h2>

        {pendentes.length === 0 ? (
          <p style={{ color: "#9ca3af", fontSize: "14px", margin: 0 }}>Nenhuma solicitação pendente.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {pendentes.map((u) => (
              <div key={u.id} style={rowStyle}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 600, color: "#111827", fontSize: "14px" }}>{u.nome}</p>
                  <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#6b7280" }}>{u.email}</p>
                  <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#9ca3af" }}>
                    Solicitado em {new Date(u.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <button
                    onClick={() => mudarStatus(u.id, "ATIVO")}
                    disabled={atualizando === u.id}
                    style={{ ...btnStyle, background: "#16a34a", color: "#fff" }}
                  >
                    {atualizando === u.id ? "..." : "Aprovar"}
                  </button>
                  <button
                    onClick={() => mudarStatus(u.id, "INATIVO")}
                    disabled={atualizando === u.id}
                    style={{ ...btnStyle, background: "#dc2626", color: "#fff" }}
                  >
                    {atualizando === u.id ? "..." : "Rejeitar"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Todos os outros */}
      <div style={panelStyle}>
        <h2 style={panelTitleStyle}>Todos os usuários</h2>
        {demais.length === 0 ? (
          <p style={{ color: "#9ca3af", fontSize: "14px", margin: 0 }}>Nenhum usuário cadastrado.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Nome", "E-mail", "Papel", "Status", "Ações"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: "12px", color: "#6b7280", fontWeight: 600, borderBottom: "1px solid #e5e7eb" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {demais.map((u) => {
                const st = STATUS_COLOR[u.status];
                return (
                  <tr key={u.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={tdStyle}>{u.nome}</td>
                    <td style={{ ...tdStyle, color: "#6b7280" }}>{u.email}</td>
                    <td style={tdStyle}>
                      <span style={{ fontSize: "12px", fontWeight: 600, padding: "2px 8px", borderRadius: "999px", background: u.role === "ADMIN" ? "#dbeafe" : "#f3f4f6", color: u.role === "ADMIN" ? "#1d4ed8" : "#374151" }}>
                        {u.role === "ADMIN" ? "Admin" : "Visualizador"}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <span style={{ fontSize: "12px", fontWeight: 600, padding: "2px 8px", borderRadius: "999px", background: st.bg, color: st.color }}>
                        {STATUS_LABEL[u.status]}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      {u.status === "ATIVO" && (
                        <button
                          onClick={() => mudarStatus(u.id, "INATIVO")}
                          disabled={atualizando === u.id}
                          style={{ ...btnStyle, background: "transparent", color: "#dc2626", border: "1px solid #fecaca" }}
                        >
                          {atualizando === u.id ? "..." : "Desativar"}
                        </button>
                      )}
                      {u.status === "INATIVO" && (
                        <button
                          onClick={() => mudarStatus(u.id, "ATIVO")}
                          disabled={atualizando === u.id}
                          style={{ ...btnStyle, background: "transparent", color: "#16a34a", border: "1px solid #bbf7d0" }}
                        >
                          {atualizando === u.id ? "..." : "Reativar"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const rowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  padding: "14px 16px",
  background: "#fffbeb",
  borderRadius: "10px",
  border: "1px solid #fde68a",
};

const tdStyle: React.CSSProperties = {
  padding: "12px",
  fontSize: "14px",
  color: "#111827",
};

const btnStyle: React.CSSProperties = {
  border: "none",
  borderRadius: "8px",
  padding: "7px 14px",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
};
