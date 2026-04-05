import CadastroPage from "./pages/Cadastro";
import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import DashboardPage from "./pages/Dashboard";
import AgentesPage from "./pages/Agentes";
import LoginPage from "./pages/Login";
import { useAuthStore } from "./store/authStore";
import type { Page } from "./types";

export default function App() {
  const { isAuthenticated, user } = useAuthStore();
  const [activePage, setActivePage] = useState<Page>("dashboard");

  if (!isAuthenticated()) {
    return <LoginPage />;
  }

  const isAdmin = user?.role === "ADMIN";

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <Sidebar activePage={activePage} onNavigate={setActivePage} isAdmin={isAdmin} />

      <main style={{ flex: 1, background: "#f3f4f6", padding: "24px" }}>
        {activePage === "dashboard" && <DashboardPage />}
        {activePage === "agentes" && <AgentesPage />}
        {activePage === "cadastro" && isAdmin && <CadastroPage />}
      </main>
    </div>
  );
}
