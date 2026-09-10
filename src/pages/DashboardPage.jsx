import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "../components/Layout";
import { API_URL } from "../config";

const quickActions = [
  { label: "Ver cardápio", to: "/app/cardapio" },
  { label: "Registrar refeição", to: "/app/checkin" },
  { label: "Receitas", to: "/app/receitas" },
];

function getProfile() {
  if (typeof window === "undefined") {
    return {
      name: "",
      goal: "",
      age: null,
      weight: null,
      height: null,
      activity: "",
    };
  }

  try {
    const user =
      JSON.parse(localStorage.getItem("em30plus_user") || "null") || {};
    const onboarding =
      JSON.parse(localStorage.getItem("em30plus_onboarding") || "null") || {};

    return {
      name: user.name || "",
      goal: onboarding.goal || "",
      age: onboarding.age || null,
      weight: onboarding.weight || null,
      height: onboarding.height || null,
      activity: onboarding.activity || "",
    };
  } catch {
    return {
      name: "",
      goal: "",
      age: null,
      weight: null,
      height: null,
      activity: "",
    };
  }
}

export default function DashboardPage() {
  const profile = getProfile();
  const [plan, setPlan] = useState(null);
  const [mealLogs, setMealLogs] = useState([]);
  const [checkInValues, setCheckInValues] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("em30plus_token");
  const hasOnboarding = Boolean(localStorage.getItem("em30plus_onboarding"));
  const ratingFields = ["Energia", "Sono", "Fome", "Humor", "Disposição"];
  const mealTypes = {
    breakfast: "Café da manhã",
    lunch: "Almoço",
    dinner: "Jantar",
  };

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/meal-plans/current`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`${API_URL}/api/meal-logs`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`${API_URL}/api/check-ins`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ])
      .then(async ([planResponse, logsResponse, checkInsResponse]) => {
        const planPayload = await planResponse.json();
        const logsPayload = await logsResponse.json();
        const checkInsPayload = await checkInsResponse.json();
        setPlan(planPayload.plan);
        setMealLogs(logsPayload.mealLogs || []);
        const latestCheckIn = checkInsPayload.checkIns?.[0];
        if (latestCheckIn) {
          setCheckInValues({
            Energia: latestCheckIn.energy,
            Sono: latestCheckIn.sleep,
            Fome: latestCheckIn.hunger,
            Humor: latestCheckIn.mood,
            Disposição: latestCheckIn.disposition,
          });
        }
      })
      .finally(() => setLoading(false));
  }, [token]);

  const plannedMeals =
    plan?.days?.flatMap((day) =>
      Object.entries(day.meals).map(([mealType, recipe]) => ({
        ...recipe,
        dayIndex: day.dayIndex,
        mealType,
      })),
    ) || [];
  const isLogged = (meal) =>
    mealLogs.some(
      (log) =>
        log.recipe?.id === meal.id &&
        log.mealType === meal.mealType &&
        log.completed,
    );
  const toggleMeal = async (meal) => {
    const weekStart = plan?.weekStart ? new Date(plan.weekStart) : new Date();
    weekStart.setUTCDate(weekStart.getUTCDate() + meal.dayIndex);
    const date = weekStart.toISOString().slice(0, 10);
    const response = await fetch(`${API_URL}/api/meal-logs`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        date,
        mealType: meal.mealType,
        recipeId: meal.id,
        completed: !isLogged(meal),
      }),
    });
    const payload = await response.json();
    if (response.ok)
      setMealLogs((current) => [
        ...current.filter(
          (log) =>
            !(
              log.mealType === meal.mealType &&
              log.recipe?.id === meal.id &&
              log.date.startsWith(date)
            ),
        ),
        payload.mealLog,
      ]);
  };
  const completedMeals = mealLogs.filter((log) => log.completed).length;
  const cards = [
    {
      label: "Refeições planejadas",
      value: plan ? `${plannedMeals.length}` : "Ainda não definido",
      detail: plan ? "Nesta semana" : "Monte seu primeiro dia",
    },
    {
      label: "Refeições registradas",
      value: completedMeals ? `${completedMeals}` : "Nenhuma",
      detail: completedMeals
        ? "Salvas nesta semana"
        : "Registre quando começar",
    },
    {
      label: "Check-in de hoje",
      value: `${Object.keys(checkInValues).length}/${ratingFields.length}`,
      detail: "Avaliações preenchidas",
    },
    {
      label: "Seu objetivo",
      value: hasOnboarding ? profile.goal : "Não definido",
      detail: hasOnboarding
        ? profile.activity || "Perfil preenchido"
        : "Complete seu perfil",
    },
  ];

  return (
    <AppShell pageTitle="Dashboard">
      <div className="space-y-8">
        <section className="shine-sweep rounded-[2rem] bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white shadow-xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-100">
            Olá{profile.name ? `, ${profile.name}` : ""}
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
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Sua semana</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Marque o que você realmente comeu.
                </p>
              </div>
              <Link
                to="/app/cardapio"
                className="text-sm font-bold text-emerald-700"
              >
                Editar plano
              </Link>
            </div>
            {loading ? (
              <p className="mt-6 text-sm text-slate-500">
                Carregando sua semana...
              </p>
            ) : null}
            {!loading && !plan ? (
              <p className="mt-6 rounded-2xl bg-emerald-50 p-4 text-sm text-slate-600">
                Gere seu primeiro cardápio para acompanhar cada refeição.
              </p>
            ) : null}
            <div className="mt-5 space-y-3">
              {plannedMeals.slice(0, 9).map((meal) => (
                <div
                  key={`${meal.dayIndex}-${meal.mealType}`}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                      {mealTypes[meal.mealType]}
                    </p>
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {meal.name}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleMeal(meal)}
                    className={`shrink-0 rounded-full px-3 py-2 text-xs font-bold ${isLogged(meal) ? "bg-emerald-600 text-white" : "border border-slate-200 bg-white text-slate-700"}`}
                  >
                    {isLogged(meal) ? "Concluída" : "Marcar"}
                  </button>
                </div>
              ))}
            </div>
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
