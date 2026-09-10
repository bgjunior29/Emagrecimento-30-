import { useEffect, useState } from "react";
import { AppShell } from "../components/Layout";
import { API_URL } from "../config";

const mealLabels = {
  breakfast: "Café da manhã",
  lunch: "Almoço",
  dinner: "Jantar",
};

export default function MealPlanPage() {
  const [plan, setPlan] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const dayNames = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];
  const token = localStorage.getItem("em30plus_token");

  const getAlternatives = (mealType) =>
    recipes.filter((item) => item.type === mealLabels[mealType]);

  const readPlan = (payload) =>
    payload
      ? payload.days.map((day, dayIndex) => ({
          day: dayNames[dayIndex],
          dayIndex,
          meals: day.meals,
        }))
      : [];

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/meal-plans/current`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`${API_URL}/api/recipes`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ])
      .then(async ([planResponse, recipeResponse]) => {
        const planPayload = await planResponse.json();
        const recipePayload = await recipeResponse.json();
        if (!planResponse.ok || !recipeResponse.ok)
          throw new Error(
            planPayload.error ||
              recipePayload.error ||
              "Não foi possível carregar o cardápio.",
          );
        setPlan(readPlan(planPayload.plan));
        setRecipes(recipePayload.recipes || []);
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [token]);

  const swapMeal = async (dayIndex, mealType) => {
    const alternatives = getAlternatives(mealType);
    const currentValue = plan[dayIndex].meals[mealType];
    const currentIndex = alternatives.findIndex(
      (item) => item.id === currentValue.id,
    );
    const nextValue = alternatives[(currentIndex + 1) % alternatives.length];
    const response = await fetch(
      `${API_URL}/api/meal-plans/current/items/${dayIndex}/${mealType}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ recipeId: nextValue.id }),
      },
    );
    if (!response.ok) return;
    setPlan((current) =>
      current.map((day, index) =>
        index === dayIndex
          ? { ...day, meals: { ...day.meals, [mealType]: nextValue } }
          : day,
      ),
    );
  };

  const regeneratePlan = async () => {
    setSaving(true);
    const response = await fetch(`${API_URL}/api/meal-plans/generate`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const payload = await response.json();
    if (response.ok) setPlan(readPlan(payload.plan));
    else setError(payload.error || "Não foi possível gerar o cardápio.");
    setSaving(false);
  };

  return (
    <AppShell pageTitle="Cardápio semanal">
      <div className="space-y-6">
        <div className="shine-sweep rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              Plano
            </p>
            <h3 className="mt-1 text-xl font-black text-slate-900">
              Semana atual
            </h3>
          </div>
          <button
            type="button"
            onClick={regeneratePlan}
            disabled={saving || loading}
            className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            {saving ? "Gerando..." : "Gerar novo cardápio"}
          </button>
        </div>

        {error ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {error}
          </p>
        ) : null}
        {loading ? (
          <p className="rounded-2xl bg-white p-6 text-center text-sm text-slate-500">
            Carregando seu cardápio...
          </p>
        ) : null}
        {!loading && plan?.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-emerald-300 bg-emerald-50 p-8 text-center">
            <h3 className="text-xl font-black text-slate-900">
              Seu cardápio começa com você
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
              Ainda não há refeições definidas. Gere uma sugestão para a sua
              semana e troque qualquer opção que não combine com sua rotina.
            </p>
          </div>
        ) : null}

        <div className="grid gap-5 xl:grid-cols-2">
          {plan?.map((day, dayIndex) => (
            <div
              key={day.day}
              className="reveal-up lift-on-hover rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-xl font-black text-slate-900">{day.day}</h4>
              </div>

              <div className="space-y-3 text-sm text-slate-600">
                {Object.entries(day.meals).map(([mealKey, mealName]) => (
                  <div
                    key={mealKey}
                    className="lift-on-hover rounded-2xl bg-slate-50 p-3"
                  >
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <strong className="text-slate-900">
                        {mealLabels[mealKey]}:
                      </strong>
                      <button
                        type="button"
                        onClick={() => swapMeal(dayIndex, mealKey)}
                        className="text-xs font-medium text-emerald-700 hover:text-emerald-600"
                      >
                        Trocar
                      </button>
                    </div>
                    <a
                      href={`/app/receitas/${mealName.id}`}
                      className="font-medium text-emerald-700 hover:underline"
                    >
                      {mealName.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
