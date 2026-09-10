import { useEffect, useState } from "react";
import { AppShell } from "../components/Layout";
import { API_URL } from "../config";

const emptyRecipe = {
  name: "",
  type: "Café da manhã",
  tags: "",
  calories: "",
  timeMinutes: "",
  ingredients: "",
  steps: "",
};

export default function AdminPage() {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState(emptyRecipe);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("em30plus_token");

  const loadRecipes = async () => {
    const response = await fetch(`${API_URL}/api/recipes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const payload = await response.json();
    if (!response.ok)
      throw new Error(
        payload.error || "Não foi possível carregar as receitas.",
      );
    setRecipes(payload.recipes || []);
  };

  useEffect(() => {
    loadRecipes().catch((requestError) => setError(requestError.message));
  }, []);

  const updateField = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const editRecipe = (recipe) => {
    setEditingId(recipe.id);
    setForm({
      name: recipe.name,
      type: recipe.type,
      tags: recipe.tags.join(", "),
      calories: String(recipe.calories),
      timeMinutes: String(recipe.timeMinutes),
      ingredients: recipe.ingredients.join("\n"),
      steps: recipe.steps.join("\n"),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveRecipe = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    const body = {
      ...form,
      tags: form.tags
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      ingredients: form.ingredients
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      steps: form.steps
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    };
    const response = await fetch(
      `${API_URL}/api/admin/recipes${editingId ? `/${editingId}` : ""}`,
      {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      },
    );
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Não foi possível salvar a receita.");
      return;
    }
    setForm(emptyRecipe);
    setEditingId(null);
    setMessage("Receita salva no catálogo.");
    loadRecipes().catch((requestError) => setError(requestError.message));
  };

  const archiveRecipe = async (id) => {
    const response = await fetch(`${API_URL}/api/admin/recipes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok)
      setRecipes((current) => current.filter((recipe) => recipe.id !== id));
  };

  return (
    <AppShell pageTitle="Painel administrativo">
      <div className="space-y-6">
        <div className="rounded-[1.75rem] border border-dashed border-emerald-300 bg-emerald-50 p-6">
          <h2 className="text-xl font-black text-slate-900">
            Dados administrativos
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Os indicadores aparecerão quando usuários reais criarem contas,
            completarem perfis e registrarem atividades.
          </p>
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

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <form
            onSubmit={saveRecipe}
            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-xl font-black text-slate-900">
              {editingId ? "Editar receita" : "Nova receita"}
            </h3>
            <div className="mt-5 space-y-4">
              <input
                name="name"
                value={form.name}
                onChange={updateField}
                required
                placeholder="Nome da receita"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              />
              <select
                name="type"
                value={form.type}
                onChange={updateField}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                {["Café da manhã", "Almoço", "Jantar", "Lanche"].map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
              <input
                name="tags"
                value={form.tags}
                onChange={updateField}
                placeholder="Tags separadas por vírgula"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  name="calories"
                  type="number"
                  value={form.calories}
                  onChange={updateField}
                  required
                  placeholder="Calorias"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                />
                <input
                  name="timeMinutes"
                  type="number"
                  value={form.timeMinutes}
                  onChange={updateField}
                  required
                  placeholder="Minutos"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                />
              </div>
              <textarea
                name="ingredients"
                value={form.ingredients}
                onChange={updateField}
                required
                rows="5"
                placeholder="Um ingrediente por linha"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              />
              <textarea
                name="steps"
                value={form.steps}
                onChange={updateField}
                required
                rows="5"
                placeholder="Um passo por linha"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              />
              <button
                type="submit"
                className="w-full rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white"
              >
                {editingId ? "Atualizar receita" : "Cadastrar receita"}
              </button>
              {editingId ? (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm(emptyRecipe);
                  }}
                  className="w-full rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700"
                >
                  Cancelar edição
                </button>
              ) : null}
              {message ? (
                <p className="text-sm text-emerald-700">{message}</p>
              ) : null}
              {error ? <p className="text-sm text-red-700">{error}</p> : null}
            </div>
          </form>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-black text-slate-900">
              Receitas publicadas
            </h3>
            <div className="mt-5 space-y-3">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-bold text-slate-900">{recipe.name}</p>
                    <p className="text-xs text-slate-500">
                      {recipe.type} · {recipe.time} · {recipe.calories} kcal
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => editRecipe(recipe)}
                      className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => archiveRecipe(recipe.id)}
                      className="rounded-full border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-700"
                    >
                      Arquivar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
