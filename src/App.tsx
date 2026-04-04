import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import DashboardPage from "./pages/Dashboard";
import AgentesPage from "./pages/Agentes";
import type { Page } from "./types";

export default function App() {
  const [activePage, setActivePage] = useState<Page>("dashboard");

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <main style={{ flex: 1, background: "#f3f4f6", padding: "24px" }}>
        {activePage === "dashboard" ? <DashboardPage /> : <AgentesPage />}
      </main>
    </div>
  );
}
