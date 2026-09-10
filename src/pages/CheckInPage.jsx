import { useState } from "react";
import { AppShell } from "../components/Layout";
import { API_URL } from "../config";

const ratings = [1, 2, 3, 4, 5];

export default function CheckInPage() {
  const fields = ["Energia", "Sono", "Fome", "Humor", "Disposição"];
  const [values, setValues] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("em30plus_checkin") || "null")
          ?.values || {}
      );
    } catch {
      return {};
    }
  });
  const [notes, setNotes] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("em30plus_checkin") || "null")?.notes ||
        ""
      );
    } catch {
      return "";
    }
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const saveCheckIn = async () => {
    if (Object.keys(values).length !== fields.length) return;
    setSaving(true);
    try {
      const response = await fetch(`${API_URL}/api/check-ins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("em30plus_token")}`,
        },
        body: JSON.stringify({
          energy: values.Energia,
          sleep: values.Sono,
          hunger: values.Fome,
          mood: values.Humor,
          disposition: values["Disposição"],
          notes,
        }),
      });
      const payload = await response.json();
      if (!response.ok)
        throw new Error(payload.error || "Não foi possível salvar o check-in.");
      localStorage.setItem(
        "em30plus_checkin",
        JSON.stringify({ values, notes, date: payload.checkIn.date }),
      );
      setSaved(true);
    } catch {
      setSaved(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppShell pageTitle="Check-in diário">
      <div className="shine-sweep rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            Hoje
          </p>
          <h3 className="mt-1 text-xl font-black text-slate-900">
            Como você está se sentindo?
          </h3>
        </div>

        <div className="space-y-6">
          {fields.map((field) => (
            <div key={field} className="reveal-up">
              <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
                <span>{field}</span>
                <span>
                  {values[field] ? `${values[field]}/5` : "Selecione"}
                </span>
              </div>
              <div className="flex gap-2">
                {ratings.map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => {
                      setValues((current) => ({ ...current, [field]: rating }));
                      setSaved(false);
                    }}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition ${values[field] === rating ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"}`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Observações
            </label>
            <textarea
              rows="4"
              value={notes}
              onChange={(event) => {
                setNotes(event.target.value);
                setSaved(false);
              }}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 focus:bg-white"
              placeholder="Descreva como foi o dia..."
            />
          </div>

          <button
            type="button"
            onClick={saveCheckIn}
            disabled={saving}
            className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-500"
          >
            {saving ? "Salvando..." : "Salvar check-in"}
          </button>
          {saved ? (
            <p className="text-sm font-medium text-emerald-700">
              Check-in salvo com sucesso.
            </p>
          ) : null}
        </div>
      </div>
    </AppShell>
  );
}
