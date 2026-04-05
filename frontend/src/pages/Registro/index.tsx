import { useState } from "react";
import { registrar } from "../../services/authApi";

type Props = {
  onVoltar: () => void;
};

export default function RegistroPage({ onVoltar }: Props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (senha !== confirmar) {
      setErro("As senhas não coincidem.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setCarregando(true);
    try {
      await registrar(nome, email, senha);
      setSucesso(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao criar conta.";
      setErro(msg);
    } finally {
      setCarregando(false);
    }
  }

  if (sucesso) {
    return (
      <div style={wrapperStyle}>
        <div style={cardStyle}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>⏳</div>
            <h2 style={{ margin: 0, fontSize: "20px", color: "#111827" }}>Solicitação enviada!</h2>
            <p style={{ margin: "8px 0 0", color: "#6b7280", fontSize: "14px" }}>
              Sua conta está <strong>aguardando aprovação</strong> do administrador. Você receberá acesso assim que for aprovado.
            </p>
          </div>
          <button onClick={onVoltar} style={btnPrimaryStyle}>
            Ir para o login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <div style={{ marginBottom: "28px", textAlign: "center" }}>
          <h1 style={{ margin: 0, fontSize: "22px", color: "#111827", fontWeight: 700 }}>
            Criar conta
          </h1>
          <p style={{ margin: "8px 0 0", color: "#6b7280", fontSize: "13px" }}>
            Acesso como <strong>Visualizador</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Nome completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="Seu nome"
              style={inputStyle}
            />
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle}>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.gov.br"
              style={inputStyle}
            />
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="Mínimo 6 caracteres"
              autoComplete="new-password"
              style={inputStyle}
            />
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Confirmar senha</label>
            <input
              type="password"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              required
              placeholder="Repita a senha"
              autoComplete="new-password"
              style={inputStyle}
            />
          </div>

          {erro && (
            <div style={erroStyle}>{erro}</div>
          )}

          <button type="submit" disabled={carregando} style={{ ...btnPrimaryStyle, opacity: carregando ? 0.6 : 1, cursor: carregando ? "not-allowed" : "pointer" }}>
            {carregando ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <button onClick={onVoltar} style={linkBtnStyle}>
          Já tenho conta — voltar ao login
        </button>
      </div>
    </div>
  );
}

const wrapperStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f3f4f6",
};

const cardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: "16px",
  padding: "40px 48px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
  width: "100%",
  maxWidth: "400px",
};

const fieldGroupStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "13px",
  color: "#374151",
  fontWeight: 600,
};

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

const erroStyle: React.CSSProperties = {
  background: "#fef2f2",
  border: "1px solid #fecaca",
  borderRadius: "8px",
  padding: "10px 14px",
  color: "#dc2626",
  fontSize: "13px",
};

const btnPrimaryStyle: React.CSSProperties = {
  background: "#111827",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  padding: "13px",
  fontSize: "15px",
  fontWeight: 600,
  cursor: "pointer",
  width: "100%",
  marginTop: "4px",
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
