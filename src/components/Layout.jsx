import { Link, useNavigate } from "react-router-dom";

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

  const handleLogout = () => {
    localStorage.removeItem("em30plus_user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/app/dashboard"
            className="flex items-center gap-2 text-lg font-bold text-slate-900"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-black text-white shadow-sm">
              30+
            </span>
            Emagrecimento 30+
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <Link to="/app/dashboard">Dashboard</Link>
            <Link to="/app/cardapio">Cardápio</Link>
            <Link to="/app/compras">Compras</Link>
            <Link to="/app/checkin">Check-in</Link>
            <Link to="/app/receitas">Receitas</Link>
            <Link to="/app/perfil">Perfil</Link>
            <Link to="/app/admin">Admin</Link>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 sm:block">
              {user.name}
            </div>
            <Link
              to="/"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
            >
              Site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {pageTitle ? (
          <h1 className="mb-6 text-2xl font-bold text-slate-900">
            {pageTitle}
          </h1>
        ) : null}
        {children}
      </main>
    </div>
  );
}
