import { useState } from "react";
import { AppShell } from "../components/Layout";

const sections = [
  {
    title: "Conta",
    items: ["Trocar senha", "Exportar dados", "Excluir conta"],
  },
  {
    title: "Notificações",
    items: [
      "Desativar lembretes",
      "Configurar WhatsApp",
      "Preferências por horário",
    ],
  },
  {
    title: "Privacidade",
    items: ["Consentimento", "Revogar acesso", "Termos e LGPD"],
  },
  {
    title: "Segurança",
    items: ["Autenticação em duas etapas", "Sessões ativas", "Logs de acesso"],
  },
];

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [message, setMessage] = useState("");

  const handleAction = (item) => {
    if (item === "Desativar lembretes") {
      setNotifications((current) => !current);
      setMessage(`Lembretes ${notifications ? "desativados" : "ativados"}.`);
      return;
    }

    if (item === "Exportar dados") {
      const data = JSON.stringify(localStorage, null, 2);
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "emagrecimento-30-dados.json";
      anchor.click();
      URL.revokeObjectURL(url);
      setMessage("Seus dados foram exportados.");
      return;
    }

    setMessage(`${item}: disponível na próxima etapa de integração.`);
  };

  return (
    <AppShell pageTitle="Configurações">
      <div className="grid gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-xl font-black text-slate-900">
              {section.title}
            </h3>
            <div className="mt-4 space-y-3">
              {section.items.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleAction(item)}
                  className="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50"
                >
                  {item === "Desativar lembretes" && !notifications
                    ? "Ativar lembretes"
                    : item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {message ? (
        <p className="mt-5 text-sm font-medium text-emerald-700">{message}</p>
      ) : null}
    </AppShell>
  );
}
