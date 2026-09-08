import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { demoCredentials } from "../data/mockData";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: demoCredentials.email,
    password: demoCredentials.password,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "", form: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Informe um e-mail válido.";
    }

    if (form.password.length < 6) {
      nextErrors.password = "A senha deve ter no mínimo 6 caracteres.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const savedUser = JSON.parse(
      localStorage.getItem("em30plus_user") || "null",
    );
    const validDemoLogin =
      form.email.toLowerCase() === demoCredentials.email &&
      form.password === demoCredentials.password;
    const validSavedUser =
      savedUser &&
      savedUser.email === form.email.toLowerCase() &&
      savedUser.password === form.password;

    if (!validDemoLogin && !validSavedUser) {
      setErrors({
        form: "Credenciais inválidas. Use o acesso demo ou cadastre um perfil.",
      });
      return;
    }

    const userPayload = {
      name: savedUser?.name || "Ana",
      email: form.email.toLowerCase(),
      password: form.password,
    };

    localStorage.setItem("em30plus_user", JSON.stringify(userPayload));

    const onboarding = JSON.parse(
      localStorage.getItem("em30plus_onboarding") || "null",
    );
    navigate(onboarding ? "/app/dashboard" : "/onboarding");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_55px_rgba(15,23,42,0.08)] animate-[fadeUp_0.5s_ease]">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-xl font-black text-white shadow-lg shadow-emerald-200">
            30+
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">Entrar</h1>
          <p className="mt-2 text-sm text-slate-600">
            Acesse sua conta e continue sua rotina de bem-estar.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              className={`w-full rounded-2xl border bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white ${
                errors.email ? "border-red-300" : "border-slate-200"
              }`}
            />
            {errors.email ? (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            ) : null}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                Senha
              </label>
              <a href="#" className="text-xs font-medium text-emerald-700">
                Esqueci a senha
              </a>
            </div>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full rounded-2xl border bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white ${
                errors.password ? "border-red-300" : "border-slate-200"
              }`}
            />
            {errors.password ? (
              <p className="mt-1 text-xs text-red-600">{errors.password}</p>
            ) : null}
          </div>

          {errors.form ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {errors.form}
            </div>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500"
          >
            Entrar
          </button>

          <button
            type="button"
            onClick={() => {
              const prefill = {
                email: demoCredentials.email,
                password: demoCredentials.password,
              };
              setForm(prefill);
              setErrors({});
            }}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Usar demo de acesso
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          Ainda não tem conta?{" "}
          <Link to="/onboarding" className="font-semibold text-emerald-700">
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
}
