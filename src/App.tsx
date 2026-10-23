import { Navigate, Route, Routes } from "react-router";
import LandingPage from "./components/home/LandingPage";
import VsConsolePage from "./components/compare/VsConsolePage";
import VsIacPage from "./components/compare/VsIacPage";
import { WaitlistModalProvider } from "./components/home/WaitlistModalContext";
import WaitlistModal from "./components/home/WaitlistModal";

export default function App() {
  return (
    <WaitlistModalProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/vs-console" element={<VsConsolePage />} />
        <Route path="/vs-iac" element={<VsIacPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <WaitlistModal />
    </WaitlistModalProvider>
  );
}
