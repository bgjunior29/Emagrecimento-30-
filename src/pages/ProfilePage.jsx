import { useState } from "react";
import { AppShell } from "../components/Layout";

export default function ProfilePage() {
  const savedUser =
    JSON.parse(localStorage.getItem("em30plus_user") || "null") || {};
  const onboarding =
    JSON.parse(localStorage.getItem("em30plus_onboarding") || "null") || {};
  const [form, setForm] = useState({
    name: savedUser.name || "",
    goal: onboarding.goal || "",
    weight: onboarding.weight || "",
    height: onboarding.height || "",
  });
  const [saved, setSaved] = useState(false);

  const updateField = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setSaved(false);
  };

  const saveProfile = () => {
    localStorage.setItem(
      "em30plus_user",
      JSON.stringify({ ...savedUser, name: form.name }),
    );
    localStorage.setItem(
      "em30plus_onboarding",
      JSON.stringify({ ...onboarding, ...form }),
    );
    setSaved(true);
  };

  return (
    <AppShell pageTitle="Perfil">
      <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-2xl font-black text-white">
              A
            </div>
            <h3 className="mt-4 text-2xl font-black text-slate-900">
              {form.name}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Meta: {form.goal || "Ainda não definida"}
            </p>
          </div>

          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <div className="rounded-2xl bg-slate-50 p-3">
              Objetivo: {form.goal || "Ainda não definido"}
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              Preferências:{" "}
              {onboarding.preferences?.join(", ") || "Ainda não definidas"}
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              Restrições: Não informadas
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              Sequência atual: Ainda sem registros
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-black text-slate-900">
            Editar informações
          </h3>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Nome
              </label>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                name="name"
                value={form.name}
                onChange={updateField}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Objetivo
              </label>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                name="goal"
                value={form.goal}
                onChange={updateField}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Peso
              </label>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                name="weight"
                value={form.weight}
                onChange={updateField}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Altura
              </label>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                name="height"
                value={form.height}
                onChange={updateField}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={saveProfile}
              className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-500"
            >
              Salvar perfil
            </button>
            {saved ? (
              <span className="self-center text-sm font-medium text-emerald-700">
                Perfil salvo.
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
