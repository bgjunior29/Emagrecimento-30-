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
    ["Check-in", "/app/checkin"],
    ["Receitas", "/app/receitas"],
    ...(user.role !== "admin" ? [["Perfil", "/app/perfil"]] : []),
    ...(user.role === "admin" ? [["Admin", "/app/admin"]] : []),
  ];

  const handleLogout = () => {
    localStorage.removeItem("em30plus_user");
    localStorage.removeItem("em30plus_token");
    navigate("/login");
  };

  return (
    <div className="paper-grid min-h-screen text-[#3f342c]">
      <header className="sticky top-0 z-40 border-b border-[#e8dfd2] bg-[#fffefa]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/app/dashboard"
            className="flex min-w-0 items-center gap-2 text-lg font-black text-[#3f342c]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d6a14a] text-sm font-black text-[#3f342c] shadow-sm">
              30+
            </span>
            <span className="truncate sm:whitespace-nowrap">
              Emagrecimento 30+
            </span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-[#e8dfd2] bg-[#f6f0e7] p-1 text-sm font-bold text-[#685748] md:flex">
            {navItems.map(([label, to]) => (
              <Link
                key={to}
                to={to}
                className={`rounded-full px-3 py-2 transition ${location.pathname === to ? "bg-white text-[#49634d] shadow-sm" : "hover:bg-white/70"}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="shrink-0 flex items-center gap-2">
            <div className="hidden rounded-full border border-[#e8dfd2] bg-[#f6f0e7] px-3 py-2 text-xs font-bold text-[#685748] sm:block">
              {user.name}
            </div>
            <Link
              to="/oferta"
              className="hidden rounded-full border border-[#e8dfd2] px-4 py-2 text-sm font-bold text-[#685748] transition hover:bg-white sm:block"
            >
              Site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-[#49634d] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#5b7958]"
            >
              Sair
            </button>
            <button
              type="button"
              aria-label="Abrir menu"
              onClick={() => setMenuOpen((current) => !current)}
              className="rounded-xl border border-[#e8dfd2] px-3 py-2 text-lg text-[#3f342c] md:hidden"
            >
              {menuOpen ? "×" : "☰"}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <nav className="border-t border-[#e8dfd2] bg-[#fffefa] px-4 py-3 md:hidden">
            <div className="mx-auto grid max-w-7xl gap-1 sm:grid-cols-2">
              {navItems.map(([label, to]) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-3 py-3 text-sm font-bold ${location.pathname === to ? "bg-[#e8f0e4] text-[#49634d]" : "text-[#685748]"}`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        ) : null}
      </header>

      <main className="page-enter mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {pageTitle ? (
          <h1 className="mb-6 text-2xl font-black tracking-tight text-[#3f342c] sm:text-3xl">
            {pageTitle}
          </h1>
        ) : null}
        {children}
      </main>
    </div>
  );
}
