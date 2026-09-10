import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "../components/Layout";
import { recipeCatalog } from "../data/mockData";

export default function RecipesPage() {
  const [filter, setFilter] = useState("Todas");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("em30plus_favorites") || "[]");
    } catch {
      return [];
    }
  });
  const filters = [
    "Todas",
    "Café da manhã",
    "Almoço",
    "Jantar",
    "Lanche",
    "Vegetariano",
    "Rápido",
  ];
  const recipes = useMemo(
    () =>
      recipeCatalog.filter((recipe) => {
        const matchesFilter =
          filter === "Todas" ||
          recipe.type === filter ||
          recipe.tags.includes(filter);
        return (
          matchesFilter &&
          recipe.name.toLowerCase().includes(query.toLowerCase())
        );
      }),
    [filter, query],
  );

  const toggleFavorite = (id) => {
    const next = favorites.includes(id)
      ? favorites.filter((item) => item !== id)
      : [...favorites, id];
    setFavorites(next);
    localStorage.setItem("em30plus_favorites", JSON.stringify(next));
  };

  return (
    <AppShell pageTitle="Receitas">
      <div className="space-y-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
                Catálogo
              </p>
              <h3 className="mt-1 text-xl font-black text-slate-900">
                Receitas personalizadas
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`rounded-full border px-3 py-2 text-xs font-medium transition ${filter === item ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar receita"
              className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:bg-white"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="reveal-up lift-on-hover rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <Link
                to={`/app/receitas/${recipe.id}`}
                className="float-soft mb-4 block h-36 rounded-[1.5rem] bg-gradient-to-br from-emerald-100 via-teal-100 to-amber-100"
                aria-label={`Abrir receita ${recipe.name}`}
              />
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
                  {recipe.type}
                </span>
                <span className="text-xs text-slate-500">{recipe.time}</span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link
                    to={`/app/receitas/${recipe.id}`}
                    className="text-xl font-black text-slate-900 hover:text-emerald-700"
                  >
                    {recipe.name}
                  </Link>
                  <p className="mt-1 text-sm text-slate-500">
                    {recipe.calories} kcal
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Favoritar receita"
                  onClick={() => toggleFavorite(recipe.id)}
                  className={`text-xl ${favorites.includes(recipe.id) ? "text-amber-500" : "text-slate-300"}`}
                >
                  {favorites.includes(recipe.id) ? "★" : "☆"}
                </button>
              </div>
              <Link
                to={`/app/receitas/${recipe.id}`}
                className="mt-5 inline-flex text-sm font-bold text-emerald-700 hover:text-emerald-600"
              >
                Ver receita e preparo
              </Link>
              <div className="mt-4 flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        {recipes.length === 0 ? (
          <p className="rounded-2xl bg-white p-6 text-center text-sm text-slate-500">
            Nenhuma receita encontrada.
          </p>
        ) : null}
      </div>
    </AppShell>
  );
}
