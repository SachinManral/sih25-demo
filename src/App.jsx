import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ReportIssue from "./pages/ReportIssue";
import Analytics from "./pages/Analytics";
import Admin from "./pages/Admin"

export default function App() {
  const location = useLocation();

  // Pages where Navbar and Footer should NOT be shown
  const hideNavFooterRoutes = ["/login", "/register"];
  const shouldShowNavFooter = !hideNavFooterRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      {shouldShowNavFooter && <Navbar />}

      {/* Main Content */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/report" element={<ReportIssue />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>

      {/* Footer */}
      {shouldShowNavFooter && <Footer />}
    </div>
  );
}
