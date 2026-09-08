export const aiConfig = {
  enabled: false,
  provider: "OpenAI / modelo futuro",
  purpose:
    "Sugestão de receitas, resumo semanal, ajustes de cardápio e recomendações baseadas em check-ins.",
};

export async function generateMealSuggestion(context) {
  return {
    ok: true,
    fallback: "Sugestão genérica baseada em preferências do usuário.",
    context,
    status: "pending_integration",
  };
}
