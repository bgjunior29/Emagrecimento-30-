import { AppShell } from "../components/Layout";
import { adminStats } from "../data/mockData";

export default function AdminPage() {
  return (
    <AppShell pageTitle="Painel administrativo">
      <div className="space-y-6">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {adminStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-slate-500">{stat.label}</p>
              <div className="mt-4 text-3xl font-black text-slate-900">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-black text-slate-900">Gestão rápida</h3>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              "Receitas",
              "Ingredientes",
              "Desafios",
              "Usuários",
              "Notificações",
              "Comunidade",
              "Relatórios",
              "Logs",
            ].map((item) => (
              <button
                key={item}
                type="button"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
