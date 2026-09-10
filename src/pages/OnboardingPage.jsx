import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "../components/Layout";
import { API_URL } from "../config";

const goals = [
  "Emagrecimento",
  "Manutenção",
  "Ganho de peso",
  "Organização alimentar",
  "Mais energia",
  "Melhorar rotina alimentar",
];

const activityLevels = [
  "Sedentário",
  "Levemente ativo",
  "Moderadamente ativo",
  "Muito ativo",
];

const basics = [
  "Carnes",
  "Frango",
  "Peixes",
  "Ovos",
  "Vegetais",
  "Frutas",
  "Massas",
  "Arroz",
  "Feijão",
  "Laticínios",
];

const commonAllergies = [
  "Leite",
  "Ovo",
  "Amendoim",
  "Castanhas",
  "Peixe",
  "Frutos do mar",
  "Soja",
  "Glúten",
];

const emptyForm = {
  name: "",
  age: "",
  height: "",
  weight: "",
  goal: "Emagrecimento",
  activity: "Moderadamente ativo",
  preferences: [],
  allergies: [],
};

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [allergyInput, setAllergyInput] = useState("");

  const handleField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const togglePreference = (item) => {
    setForm((current) => {
      const exists = current.preferences.includes(item);
      const preferences = exists
        ? current.preferences.filter((value) => value !== item)
        : [...current.preferences, item];

      return { ...current, preferences };
    });
  };

  const toggleAllergy = (item) => {
    setForm((current) => ({
      ...current,
      allergies: current.allergies.includes(item)
        ? current.allergies.filter((value) => value !== item)
        : [...current.allergies, item],
    }));
  };

  const addAllergy = () => {
    const value = allergyInput.trim();
    if (!value) return;
    setForm((current) => ({
      ...current,
      allergies: current.allergies.includes(value)
        ? current.allergies
        : [...current.allergies, value],
    }));
    setAllergyInput("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Informe seu nome.";
    if (!Number(form.age) || Number(form.age) < 12 || Number(form.age) > 90)
      nextErrors.age = "Idade deve estar entre 12 e 90 anos.";
    if (
      !Number(form.height) ||
      Number(form.height) < 120 ||
      Number(form.height) > 220
    )
      nextErrors.height = "Altura deve ser válida.";
    if (
      !Number(form.weight) ||
      Number(form.weight) < 35 ||
      Number(form.weight) > 220
    )
      nextErrors.weight = "Peso deve ser válido.";
    if (!form.goal) nextErrors.goal = "Selecione um objetivo.";
    if (!form.activity) nextErrors.activity = "Selecione o nível de atividade.";
    if (form.preferences.length === 0)
      nextErrors.preferences = "Escolha ao menos uma preferência.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`${API_URL}/api/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("em30plus_token")}`,
        },
        body: JSON.stringify({
          name: form.name.trim(),
          age: Number(form.age),
          heightCm: Number(form.height),
          weightKg: Number(form.weight),
          goal: form.goal,
          activity: form.activity,
          preferences: form.preferences,
          allergies: form.allergies,
        }),
      });
      const payload = await response.json();
      if (!response.ok)
        throw new Error(payload.error || "Não foi possível salvar seu perfil.");

      const user =
        JSON.parse(localStorage.getItem("em30plus_user") || "null") || {};
      localStorage.setItem(
        "em30plus_user",
        JSON.stringify({
          ...user,
          name: form.name.trim(),
          profile: payload.user.profile,
        }),
      );
      localStorage.setItem("em30plus_onboarding", JSON.stringify(form));
      navigate("/app/dashboard");
    } catch (error) {
      setErrors({
        form: error.message || "Não foi possível salvar seu perfil.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppShell pageTitle="Onboarding">
      <form
        onSubmit={handleSubmit}
        className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.06)] sm:p-8"
      >
        {errors.form ? (
          <p className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errors.form}
          </p>
        ) : null}
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">
            Perfil inicial
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-900">
            Completar seu perfil nutricional
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Nome
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleField}
              className={`w-full rounded-2xl border bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white ${errors.name ? "border-red-300" : "border-slate-200"}`}
              placeholder="Seu nome"
            />
            {errors.name ? (
              <p className="mt-1 text-xs text-red-600">{errors.name}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Idade
            </label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleField}
              className={`w-full rounded-2xl border bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white ${errors.age ? "border-red-300" : "border-slate-200"}`}
              placeholder="35"
            />
            {errors.age ? (
              <p className="mt-1 text-xs text-red-600">{errors.age}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Altura (cm)
            </label>
            <input
              type="number"
              name="height"
              value={form.height}
              onChange={handleField}
              className={`w-full rounded-2xl border bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white ${errors.height ? "border-red-300" : "border-slate-200"}`}
              placeholder="165"
            />
            {errors.height ? (
              <p className="mt-1 text-xs text-red-600">{errors.height}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Peso (kg)
            </label>
            <input
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleField}
              className={`w-full rounded-2xl border bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white ${errors.weight ? "border-red-300" : "border-slate-200"}`}
              placeholder="72"
            />
            {errors.weight ? (
              <p className="mt-1 text-xs text-red-600">{errors.weight}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-4 text-lg font-bold text-slate-900">
            Objetivo principal
          </h3>
          <div className="flex flex-wrap gap-3">
            {goals.map((goal) => (
              <button
                key={goal}
                type="button"
                onClick={() => setForm((current) => ({ ...current, goal }))}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  form.goal === goal
                    ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"
                }`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-4 text-lg font-bold text-slate-900">
            Nível de atividade
          </h3>
          <div className="flex flex-wrap gap-3">
            {activityLevels.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() =>
                  setForm((current) => ({ ...current, activity: level }))
                }
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  form.activity === level
                    ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-4 text-lg font-bold text-slate-900">
            Preferências alimentares
          </h3>
          <div className="flex flex-wrap gap-3">
            {basics.map((item) => {
              const active = form.preferences.includes(item);

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => togglePreference(item)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
          {errors.preferences ? (
            <p className="mt-2 text-xs text-red-600">{errors.preferences}</p>
          ) : null}
        </div>

        <div className="mt-8 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5">
          <h3 className="text-lg font-bold text-slate-900">
            Alergias e alimentos a evitar
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            As receitas incompatíveis serão filtradas automaticamente do seu
            catálogo e do cardápio.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {commonAllergies.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => toggleAllergy(item)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${form.allergies.includes(item) ? "border-amber-400 bg-amber-100 text-amber-900" : "border-slate-200 bg-white text-slate-700 hover:border-amber-300"}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <input
              value={allergyInput}
              onChange={(event) => setAllergyInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addAllergy();
                }
              }}
              placeholder="Outra alergia ou ingrediente"
              className="min-w-0 flex-1 rounded-2xl border border-amber-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-400"
            />
            <button
              type="button"
              onClick={addAllergy}
              className="rounded-full bg-amber-500 px-5 py-3 text-sm font-bold text-white"
            >
              Adicionar
            </button>
          </div>
          {form.allergies.length ? (
            <p className="mt-3 text-sm font-semibold text-amber-900">
              A evitar: {form.allergies.join(", ")}
            </p>
          ) : null}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500"
          >
            {saving ? "Salvando seu perfil..." : "Continuar para o dashboard"}
          </button>
        </div>
      </form>
    </AppShell>
  );
}
