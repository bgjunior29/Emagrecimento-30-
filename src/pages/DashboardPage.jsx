import { Link } from "react-router-dom";
import { AppShell } from "../components/Layout";

const quickActions = [
  { label: "Ver cardápio", to: "/app/cardapio" },
  { label: "Registrar refeição", to: "/app/checkin" },
  { label: "Lista de compras", to: "/app/compras" },
  { label: "Receitas", to: "/app/receitas" },
];

function getProfile() {
  if (typeof window === "undefined") {
    return {
      name: "Ana",
      goal: "Emagrecimento",
      age: 35,
      weight: 72,
      height: 165,
      activity: "Moderadamente ativo",
    };
  }

  try {
    const user = JSON.parse(
      localStorage.getItem("em30plus_user") || "null",
    ) || { name: "Ana" };
    const onboarding =
      JSON.parse(localStorage.getItem("em30plus_onboarding") || "null") || {};

    return {
      name: user.name || "Ana",
      goal: onboarding.goal || "Emagrecimento",
      age: onboarding.age || 35,
      weight: onboarding.weight || 72,
      height: onboarding.height || 165,
      activity: onboarding.activity || "Moderadamente ativo",
    };
  } catch {
    return {
      name: "Ana",
      goal: "Emagrecimento",
      age: 35,
      weight: 72,
      height: 165,
      activity: "Moderadamente ativo",
    };
  }
}

export default function DashboardPage() {
  const profile = getProfile();
  const cards = [
    { label: "Refeições planejadas", value: "21", detail: "Semana" },
    { label: "Refeições concluídas", value: "14", detail: "67%" },
    { label: "Água consumida", value: "1.8L", detail: "Meta 2.5L" },
    { label: "Nível de energia", value: "4/5", detail: profile.activity },
  ];

  return (
    <AppShell pageTitle="Dashboard">
      <div className="space-y-8">
        <section className="rounded-[2rem] bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white shadow-xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-100">
            Olá, {profile.name}
          </p>
          <h2 className="mt-3 text-3xl font-black">Resumo do dia</h2>
          <p className="mt-3 max-w-xl text-emerald-50">
            Seu plano está ajustado para {profile.goal.toLowerCase()} e sua
            rotina foi estruturada para manter consistência, energia e controle.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.label}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-sm text-slate-500">{card.label}</p>
              <div className="mt-4 text-3xl font-black text-slate-900">
                {card.value}
              </div>
              <div className="mt-2 text-sm text-emerald-700">{card.detail}</div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">
              Progresso semanal
            </h3>
            <div className="mt-6 flex h-40 items-end gap-3">
              {[45, 72, 56, 88, 80, 94, 76].map((value, index) => (
                <div
                  key={index}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <div
                    className="w-full rounded-t-2xl bg-gradient-to-t from-emerald-500 to-teal-400 transition-all duration-500"
                    style={{ height: `${value}%` }}
                  />
                  <span className="text-xs text-slate-500">
                    {["S", "T", "Q", "Q", "S", "S", "D"][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">
              Check-in rápido
            </h3>
            <div className="mt-5 space-y-4">
              {["Energia", "Sono", "Fome", "Humor", "Disposição"].map(
                (item) => (
                  <div key={item}>
                    <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                      <span>{item}</span>
                      <span>4/5</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200">
                      <div
                        className="h-2 rounded-full bg-emerald-500"
                        style={{ width: "80%" }}
                      />
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-slate-900">Atalhos</h3>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Rápido
            </span>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.to}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
