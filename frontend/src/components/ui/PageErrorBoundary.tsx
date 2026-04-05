import { ErrorBoundary } from "react-error-boundary";
import type { ReactNode } from "react";

function Fallback({ resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        padding: "64px 24px",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: "40px" }}>💥</span>
      <h2 style={{ margin: 0, fontSize: "20px", color: "#111827" }}>
        Algo deu errado nesta página
      </h2>
      <p style={{ margin: 0, fontSize: "14px", color: "#6b7280", maxWidth: "400px" }}>
        Ocorreu um erro inesperado. Tente recarregar a seção ou entre em contato com o suporte.
      </p>
      <button
        onClick={resetErrorBoundary}
        style={{
          marginTop: "8px",
          background: "#111827",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "10px 22px",
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        Recarregar
      </button>
    </div>
  );
}

export default function PageErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      {children}
    </ErrorBoundary>
  );
}
