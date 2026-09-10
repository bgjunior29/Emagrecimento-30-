import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import DashboardPage from "./pages/DashboardPage";
import MealPlanPage from "./pages/MealPlanPage";
import CheckInPage from "./pages/CheckInPage";
import RecipesPage from "./pages/RecipesPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import AdminPage from "./pages/AdminPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import LegacyLandingRoute from "./pages/LegacyLandingRoute";
import { CHECKOUT_URL } from "./config";

function ProtectedRoute({ children }) {
  const hasUser = Boolean(localStorage.getItem("em30plus_user"));

  useEffect(() => {
    if (!hasUser) {
      window.location.replace(CHECKOUT_URL);
    }
  }, [hasUser]);

  return hasUser ? children : null;
}

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("em30plus_user") || "null");
  return user?.role === "admin" ? (
    children
  ) : (
    <Navigate to="/admin-login" replace />
  );
}

function UserRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("em30plus_user") || "null");
  return user?.role === "admin" ? (
    <Navigate to="/app/admin" replace />
  ) : (
    children
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LegacyLandingRoute />} />
        <Route path="/oferta" element={<LegacyLandingRoute />} />
        <Route path="/site" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <OnboardingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/cardapio"
          element={
            <ProtectedRoute>
              <MealPlanPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/checkin"
          element={
            <ProtectedRoute>
              <CheckInPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/receitas"
          element={
            <ProtectedRoute>
              <RecipesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/perfil"
          element={
            <UserRoute>
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            </UserRoute>
          }
        />
        <Route
          path="/app/configuracoes"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />

        <Route
          path="/dashboard"
          element={<Navigate to="/app/dashboard" replace />}
        />
        <Route
          path="/cardapio"
          element={<Navigate to="/app/cardapio" replace />}
        />
        <Route
          path="/checkin"
          element={<Navigate to="/app/checkin" replace />}
        />
        <Route
          path="/receitas"
          element={<Navigate to="/app/receitas" replace />}
        />
        <Route path="/perfil" element={<Navigate to="/app/perfil" replace />} />
        <Route
          path="/configuracoes"
          element={<Navigate to="/app/configuracoes" replace />}
        />
        <Route path="/admin" element={<Navigate to="/app/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
