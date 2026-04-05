type Props = {
  mensagem?: string;
  onRetry?: () => void;
};

export default function ErrorBanner({
  mensagem = "Não foi possível carregar os dados. Verifique sua conexão ou tente novamente.",
  onRetry,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        padding: "48px 24px",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: "36px" }}>⚠️</span>
      <p style={{ margin: 0, fontSize: "15px", color: "#374151", maxWidth: "400px" }}>
        {mensagem}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            marginTop: "4px",
            background: "#111827",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "9px 20px",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
