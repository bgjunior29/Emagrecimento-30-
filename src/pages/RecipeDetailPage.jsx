import { Link, useParams } from "react-router-dom";
import { AppShell } from "../components/Layout";
import { recipeCatalog, recipeDetails } from "../data/mockData";

export default function RecipeDetailPage() {
  const { recipeId } = useParams();
  const recipe = recipeCatalog.find((item) => item.id === Number(recipeId));
  const detail = recipe ? recipeDetails[recipe.id] : null;

  if (!recipe || !detail) {
    return (
      <AppShell pageTitle="Receita não encontrada">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-slate-600">
            Essa receita não está disponível no catálogo.
          </p>
          <Link
            to="/app/receitas"
            className="mt-5 inline-flex rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white"
          >
            Voltar para receitas
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell pageTitle={recipe.name}>
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-emerald-100 via-teal-100 to-amber-100 p-6 shadow-sm">
          <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
            {recipe.type}
          </span>
          <h2 className="mt-6 text-3xl font-black text-slate-900">
            {recipe.name}
          </h2>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
            <span>{recipe.time}</span>
            <span>{recipe.calories} kcal</span>
          </div>
          <Link
            to="/app/receitas"
            className="mt-8 inline-flex rounded-full border border-slate-300 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-700"
          >
            Voltar para receitas
          </Link>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <h3 className="text-xl font-black text-slate-900">Ingredientes</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {detail.ingredients.map((ingredient) => (
                <li
                  key={ingredient}
                  className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700"
                >
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-black text-slate-900">
              Modo de preparo
            </h3>
            <ol className="mt-4 space-y-4">
              {detail.steps.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-3 text-sm leading-6 text-slate-600"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
