export const recipeCatalog = [
  {
    id: 1,
    name: "Tigela de aveia com frutas",
    type: "Café da manhã",
    tags: ["Rápido", "Alta proteína"],
    calories: 420,
    time: "10 min",
  },
  {
    id: 2,
    name: "Salada de grão-de-bico",
    type: "Almoço",
    tags: ["Vegetariano", "Sem glúten"],
    calories: 520,
    time: "20 min",
  },
  {
    id: 3,
    name: "Frango grelhado com quinoa",
    type: "Jantar",
    tags: ["Alta proteína", "Baixo custo"],
    calories: 610,
    time: "30 min",
  },
  {
    id: 4,
    name: "Iogurte com granola",
    type: "Lanche",
    tags: ["Rápido", "Sem lactose"],
    calories: 330,
    time: "5 min",
  },
  {
    id: 5,
    name: "Omelete com abacate",
    type: "Café da manhã",
    tags: ["Low carb", "Saturado"],
    calories: 390,
    time: "12 min",
  },
  {
    id: 6,
    name: "Wrap de frango e salada",
    type: "Almoço",
    tags: ["Leve", "Prático"],
    calories: 540,
    time: "15 min",
  },
  {
    id: 7,
    name: "Peixe ao forno com legumes",
    type: "Jantar",
    tags: ["Fácil", "Proteína"],
    calories: 640,
    time: "28 min",
  },
  {
    id: 8,
    name: "Smoothie verde com banana",
    type: "Lanche",
    tags: ["Rápido", "Natural"],
    calories: 290,
    time: "5 min",
  },
  {
    id: 9,
    name: "Pão integral com ovos",
    type: "Café da manhã",
    tags: ["Fácil", "Sustentável"],
    calories: 410,
    time: "10 min",
  },
  {
    id: 10,
    name: "Bowl de quinoa e legumes",
    type: "Almoço",
    tags: ["Completo", "Sem glúten"],
    calories: 560,
    time: "18 min",
  },
  {
    id: 11,
    name: "Salmão com arroz integral",
    type: "Jantar",
    tags: ["Omega 3", "Forte"],
    calories: 700,
    time: "35 min",
  },
  {
    id: 12,
    name: "Pudim de chia com frutas",
    type: "Lanche",
    tags: ["Vegano", "Fibras"],
    calories: 310,
    time: "15 min",
  },
];

export const mealPlanWeek = [
  {
    day: "Segunda",
    meals: {
      breakfast: "Omelete com abacate",
      lunch: "Wrap de frango e salada",
      dinner: "Frango grelhado com quinoa",
    },
  },
  {
    day: "Terça",
    meals: {
      breakfast: "Tigela de aveia com frutas",
      lunch: "Salada de grão-de-bico",
      dinner: "Peixe ao forno com legumes",
    },
  },
  {
    day: "Quarta",
    meals: {
      breakfast: "Pão integral com ovos",
      lunch: "Bowl de quinoa e legumes",
      dinner: "Salmão com arroz integral",
    },
  },
  {
    day: "Quinta",
    meals: {
      breakfast: "Omelete com abacate",
      lunch: "Wrap de frango e salada",
      dinner: "Peixe ao forno com legumes",
    },
  },
  {
    day: "Sexta",
    meals: {
      breakfast: "Tigela de aveia com frutas",
      lunch: "Bowl de quinoa e legumes",
      dinner: "Frango grelhado com quinoa",
    },
  },
  {
    day: "Sábado",
    meals: {
      breakfast: "Smoothie verde com banana",
      lunch: "Salada de grão-de-bico",
      dinner: "Salmão com arroz integral",
    },
  },
  {
    day: "Domingo",
    meals: {
      breakfast: "Pão integral com ovos",
      lunch: "Wrap de frango e salada",
      dinner: "Peixe ao forno com legumes",
    },
  },
];

export const defaultShoppingList = [
  {
    id: "tomate",
    name: "Tomate",
    qty: "8 unidades",
    category: "Vegetais",
    checked: true,
  },
  {
    id: "banana",
    name: "Banana",
    qty: "5 unidades",
    category: "Frutas",
    checked: false,
  },
  {
    id: "frango",
    name: "Frango",
    qty: "1 kg",
    category: "Carnes",
    checked: false,
  },
  {
    id: "arroz",
    name: "Arroz integral",
    qty: "2 pacotes",
    category: "Grãos",
    checked: false,
  },
  {
    id: "iogurte",
    name: "Iogurte natural",
    qty: "4 potes",
    category: "Laticínios",
    checked: true,
  },
  {
    id: "quinoa",
    name: "Quinoa",
    qty: "1 pacote",
    category: "Grãos",
    checked: false,
  },
];

export const productsCatalog = [
  {
    id: 1,
    name: "Kit de refeições leve",
    category: "Suplemento",
    price: 79.9,
    badge: "Popular",
  },
  {
    id: 2,
    name: "Shaker + whey protein",
    category: "Proteína",
    price: 129.9,
    badge: "Top",
  },
  {
    id: 3,
    name: "Pack de vitaminas",
    category: "Bem-estar",
    price: 59.9,
    badge: "Essencial",
  },
  {
    id: 4,
    name: "Lanche integral 30 dias",
    category: "Alimentação",
    price: 89.9,
    badge: "Novo",
  },
];

export const demoCredentials = {
  email: "ana@emagrecimento30.com",
  password: "demo123",
};

export const adminStats = [
  { label: "Usuários cadastrados", value: "1.284" },
  { label: "Usuários ativos", value: "946" },
  { label: "Check-ins", value: "8.920" },
  { label: "Cardápios gerados", value: "2.410" },
];

export const notifications = [
  { id: 1, title: "Lembrete de café da manhã", time: "07:30", status: "Ativo" },
  { id: 2, title: "Check-in diário", time: "20:00", status: "Ativo" },
  {
    id: 3,
    title: "Lista de compras",
    time: "Segunda 18:00",
    status: "Pendente",
  },
];
