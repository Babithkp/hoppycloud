import { Navigate, Route, Routes } from "react-router";
import LandingPage from "./components/home/LandingPage";
import VsConsolePage from "./components/compare/VsConsolePage";
import VsIacPage from "./components/compare/VsIacPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/vs-console" element={<VsConsolePage />} />
      <Route path="/vs-iac" element={<VsIacPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
