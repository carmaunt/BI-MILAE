import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { login } from "../../services/authApi";

type Props = {
  onCadastrar: () => void;
};

export default function LoginPage({ onCadastrar }: Props) {
  const setAuth = useAuthStore((s) => s.setAuth);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const { token, user } = await login(email, senha);
      setAuth(token, user);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Erro ao fazer login. Tente novamente.";
      setErro(msg);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f3f4f6",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "40px 48px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <div style={{ marginBottom: "32px", textAlign: "center" }}>
          <h1 style={{ margin: 0, fontSize: "26px", color: "#111827", fontWeight: 700 }}>
            BI-MILAE
          </h1>
          <p style={{ margin: "8px 0 0", color: "#6b7280", fontSize: "14px" }}>
            Painel analítico — acesso restrito
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", color: "#374151", fontWeight: 600 }}>
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.gov.br"
              style={inputStyle}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", color: "#374151", fontWeight: 600 }}>
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="••••••••"
              autoComplete="current-password"
              style={inputStyle}
            />
          </div>

          {erro && (
            <div
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "8px",
                padding: "10px 14px",
                color: "#dc2626",
                fontSize: "13px",
              }}
            >
              {erro}
            </div>
          )}

          <button
            type="submit"
            disabled={carregando}
            style={{
              background: carregando ? "#6b7280" : "#111827",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              padding: "13px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: carregando ? "not-allowed" : "pointer",
              marginTop: "4px",
              transition: "background 0.2s",
            }}
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <button onClick={onCadastrar} style={linkBtnStyle}>
          Não tem conta? Criar conta como Visualizador
        </button>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  color: "#111827",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

const linkBtnStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  color: "#6b7280",
  fontSize: "13px",
  cursor: "pointer",
  marginTop: "16px",
  width: "100%",
  textAlign: "center",
  textDecoration: "underline",
};
