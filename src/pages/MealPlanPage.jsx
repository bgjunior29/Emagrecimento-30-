import { useState } from "react";
import { AppShell } from "../components/Layout";
import { recipeCatalog } from "../data/mockData";

const mealLabels = {
  breakfast: "Café da manhã",
  lunch: "Almoço",
  dinner: "Jantar",
};

function getInitialPlan() {
  if (typeof window === "undefined") return [];

  try {
    const saved = JSON.parse(
      localStorage.getItem("em30plus_meal_plan") || "null",
    );
    return saved || [];
  } catch {
    return [];
  }
}

export default function MealPlanPage() {
  const [plan, setPlan] = useState(getInitialPlan);

  const getAlternatives = (mealType) =>
    recipeCatalog.filter((item) => item.type === mealLabels[mealType]);

  const swapMeal = (dayIndex, mealType) => {
    const alternatives = getAlternatives(mealType);
    const currentValue = plan[dayIndex].meals[mealType];
    const currentIndex = alternatives.findIndex(
      (item) => item.name === currentValue,
    );
    const nextValue =
      alternatives[(currentIndex + 1) % alternatives.length].name;

    const updatedPlan = plan.map((day, index) => {
      if (index !== dayIndex) return day;

      return {
        ...day,
        meals: { ...day.meals, [mealType]: nextValue },
      };
    });

    setPlan(updatedPlan);
    localStorage.setItem("em30plus_meal_plan", JSON.stringify(updatedPlan));
  };

  const regeneratePlan = () => {
    const dayNames = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];
    const today = new Date().getDay();
    const randomized = Array.from({ length: 7 }, (_, index) => ({
      day: dayNames[(today + index) % dayNames.length],
      meals: {
        breakfast:
          getAlternatives("breakfast")[
            Math.floor(Math.random() * getAlternatives("breakfast").length)
          ].name,
        lunch:
          getAlternatives("lunch")[
            Math.floor(Math.random() * getAlternatives("lunch").length)
          ].name,
        dinner:
          getAlternatives("dinner")[
            Math.floor(Math.random() * getAlternatives("dinner").length)
          ].name,
      },
    }));

    setPlan(randomized);
    localStorage.setItem("em30plus_meal_plan", JSON.stringify(randomized));
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
            className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            Gerar novo cardápio
          </button>
        </div>

        {plan.length === 0 ? (
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
          {plan.map((day, dayIndex) => (
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
                    {mealName}
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
