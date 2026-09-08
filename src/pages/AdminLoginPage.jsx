import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await response.json();

      if (!response.ok)
        throw new Error(payload.error || "Acesso administrativo inválido.");

      localStorage.setItem("em30plus_token", payload.token);
      localStorage.setItem("em30plus_user", JSON.stringify(payload.user));
      navigate(
        payload.user.role === "admin"
          ? "/app/admin"
          : payload.user.profile
            ? "/app/dashboard"
            : "/onboarding",
      );
    } catch (requestError) {
      setError(
        requestError.message || "Não foi possível conectar ao servidor.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f0e7] px-4 py-10">
      <div className="page-enter w-full max-w-md rounded-[2rem] border border-[#e8dfd2] bg-[#fffefa] p-8 shadow-[0_20px_55px_rgba(76,54,38,0.12)]">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#49634d] text-xl font-black text-white">
            30+
          </div>
          <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-[#49634d]">
            Acesso ao app
          </p>
          <h1 className="mt-2 text-3xl font-black text-[#3f342c]">Entrar</h1>
          <p className="mt-2 text-sm text-[#806f60]">
            Use suas credenciais. O sistema abre automaticamente a área correta.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-bold text-[#685748]">
              E-mail
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              className="w-full rounded-2xl border border-[#e8dfd2] bg-[#f6f0e7] px-4 py-3 outline-none focus:border-[#49634d] focus:bg-white"
              placeholder="admin@seudominio.com"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-[#685748]">
              Senha
            </label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  password: event.target.value,
                }))
              }
              className="w-full rounded-2xl border border-[#e8dfd2] bg-[#f6f0e7] px-4 py-3 outline-none focus:border-[#49634d] focus:bg-white"
              placeholder="Sua senha secreta"
            />
          </div>

          {error ? (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-2xl bg-[#49634d] px-4 py-3 font-bold text-white transition hover:bg-[#5b7958]"
          >
            {loading ? "Validando acesso..." : "Entrar"}
          </button>
        </form>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link
            to="/login"
            className="rounded-2xl border border-[#e8dfd2] bg-[#f6f0e7] px-4 py-3 text-center text-sm font-black text-[#49634d] transition hover:bg-white"
          >
            APP
          </Link>
          <Link
            to="/oferta"
            className="rounded-2xl border border-[#e8dfd2] bg-[#f6f0e7] px-4 py-3 text-center text-sm font-bold text-[#685748] transition hover:bg-white"
          >
            Oferta
          </Link>
        </div>
      </div>
    </main>
  );
}
