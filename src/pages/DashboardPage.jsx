import { Link } from "react-router-dom";
import { AppShell } from "../components/Layout";

const quickActions = [
  { label: "Ver cardápio", to: "/app/cardapio" },
  { label: "Registrar refeição", to: "/app/checkin" },
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
  const hasOnboarding = Boolean(localStorage.getItem("em30plus_onboarding"));
  const checkIn = JSON.parse(
    localStorage.getItem("em30plus_checkin") || "null",
  );
  const checkInValues = checkIn?.values || {};
  const ratingFields = ["Energia", "Sono", "Fome", "Humor", "Disposição"];
  const cards = [
    {
      label: "Refeições planejadas",
      value: hasOnboarding ? "Ainda não definido" : "Comece pelo perfil",
      detail: hasOnboarding ? "Monte seu primeiro dia" : "Primeiro passo",
    },
    {
      label: "Refeições registradas",
      value: "Nenhuma",
      detail: "Registre quando começar",
    },
    {
      label: "Check-in de hoje",
      value: `${Object.keys(checkInValues).length}/${ratingFields.length}`,
      detail: "Avaliações preenchidas",
    },
    {
      label: "Seu objetivo",
      value: hasOnboarding ? profile.goal : "Não definido",
      detail: hasOnboarding ? profile.activity : "Complete seu perfil",
    },
  ];

  return (
    <AppShell pageTitle="Dashboard">
      <div className="space-y-8">
        <section className="shine-sweep rounded-[2rem] bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white shadow-xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-100">
            Olá, {profile.name}
          </p>
          <h2 className="mt-3 text-3xl font-black">Resumo do dia</h2>
          <p className="mt-3 max-w-xl text-emerald-50">
            {hasOnboarding
              ? "Seu espaço está pronto para você construir uma rotina alimentar que faça sentido para a sua vida."
              : "Comece preenchendo seu perfil. Depois você poderá montar seu cardápio e acompanhar sua rotina sem dados pré-preenchidos."}
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.label}
              className="reveal-up lift-on-hover rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
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
            <h3 className="text-xl font-bold text-slate-900">Seu histórico</h3>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Conforme você fizer registros, seu histórico aparecerá aqui.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">
              Check-in rápido
            </h3>
            <div className="mt-5 space-y-4">
              {ratingFields.map((item) => (
                <div key={item}>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                    <span>{item}</span>
                    <span>
                      {checkInValues[item]
                        ? `${checkInValues[item]}/5`
                        : "Não registrado"}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    {checkInValues[item] ? (
                      <div
                        className="progress-grow h-2 rounded-full bg-emerald-500"
                        style={{ width: `${checkInValues[item] * 20}%` }}
                      />
                    ) : null}
                  </div>
                </div>
              ))}
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
