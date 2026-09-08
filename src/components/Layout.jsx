import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function getStoredUser() {
  if (typeof window === "undefined") {
    return { name: "Ana" };
  }

  try {
    return JSON.parse(localStorage.getItem("em30plus_user")) || { name: "Ana" };
  } catch {
    return { name: "Ana" };
  }
}

export function AppShell({ children, pageTitle }) {
  const user = getStoredUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    ["Dashboard", "/app/dashboard"],
    ["Cardápio", "/app/cardapio"],
    ["Compras", "/app/compras"],
    ["Check-in", "/app/checkin"],
    ["Receitas", "/app/receitas"],
    ["Perfil", "/app/perfil"],
  ];

  const handleLogout = () => {
    localStorage.removeItem("em30plus_user");
    navigate("/login");
  };

  return (
    <div className="paper-grid min-h-screen text-[#38271f]">
      <header className="sticky top-0 z-40 border-b border-[#e7dccb] bg-[#fffdf8]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/app/dashboard"
            className="flex items-center gap-2 text-lg font-black text-[#38271f]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e4a82f] text-sm font-black text-[#38271f] shadow-sm">
              30+
            </span>
            Emagrecimento 30+
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-[#e7dccb] bg-[#f8f1e5] p-1 text-sm font-bold text-[#705443] md:flex">
            {navItems.map(([label, to]) => (
              <Link
                key={to}
                to={to}
                className={`rounded-full px-3 py-2 transition ${location.pathname === to ? "bg-white text-[#31523c] shadow-sm" : "hover:bg-white/70"}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden rounded-full border border-[#e7dccb] bg-[#f8f1e5] px-3 py-2 text-xs font-bold text-[#705443] sm:block">
              {user.name}
            </div>
            <Link
              to="/"
              className="hidden rounded-full border border-[#e7dccb] px-4 py-2 text-sm font-bold text-[#705443] transition hover:bg-white sm:block"
            >
              Site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-[#31523c] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#496b47]"
            >
              Sair
            </button>
            <button
              type="button"
              aria-label="Abrir menu"
              onClick={() => setMenuOpen((current) => !current)}
              className="rounded-xl border border-[#e7dccb] px-3 py-2 text-lg text-[#38271f] md:hidden"
            >
              {menuOpen ? "×" : "☰"}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <nav className="border-t border-[#e7dccb] bg-[#fffdf8] px-4 py-3 md:hidden">
            <div className="mx-auto grid max-w-7xl gap-1 sm:grid-cols-2">
              {navItems.map(([label, to]) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-3 py-3 text-sm font-bold ${location.pathname === to ? "bg-[#e8f0e4] text-[#31523c]" : "text-[#705443]"}`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        ) : null}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {pageTitle ? (
          <h1 className="mb-6 text-2xl font-black tracking-tight text-[#38271f] sm:text-3xl">
            {pageTitle}
          </h1>
        ) : null}
        {children}
      </main>
    </div>
  );
}
