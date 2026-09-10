import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const recipes = [
  [
    "Tigela de aveia com frutas",
    "Café da manhã",
    ["Rápido", "Alta proteína"],
    420,
    10,
    ["Aveia em flocos", "Iogurte natural", "Banana", "Morangos", "Chia"],
    [
      "Misture a aveia e o iogurte.",
      "Cubra com as frutas.",
      "Finalize com chia e sirva.",
    ],
  ],
  [
    "Salada de grão-de-bico",
    "Almoço",
    ["Vegetariano", "Sem glúten"],
    520,
    20,
    [
      "Grão-de-bico cozido",
      "Tomate",
      "Pepino",
      "Cebola roxa",
      "Azeite",
      "Limão",
    ],
    ["Corte os vegetais.", "Misture com o grão-de-bico.", "Tempere e sirva."],
  ],
  [
    "Frango grelhado com quinoa",
    "Jantar",
    ["Alta proteína", "Baixo custo"],
    610,
    30,
    ["Peito de frango", "Quinoa", "Brócolis", "Alho", "Azeite"],
    [
      "Tempere o frango.",
      "Grelhe até cozinhar.",
      "Sirva com quinoa e brócolis.",
    ],
  ],
  [
    "Iogurte com granola",
    "Lanche",
    ["Rápido", "Sem lactose"],
    330,
    5,
    ["Iogurte natural", "Granola", "Banana", "Canela"],
    [
      "Coloque o iogurte em uma tigela.",
      "Adicione granola e banana.",
      "Finalize com canela.",
    ],
  ],
  [
    "Omelete com abacate",
    "Café da manhã",
    ["Low carb", "Saturado"],
    390,
    12,
    ["Ovos", "Abacate", "Tomate", "Cebolinha", "Azeite"],
    [
      "Bata e tempere os ovos.",
      "Cozinhe até firmar.",
      "Sirva com abacate e tomate.",
    ],
  ],
  [
    "Wrap de frango e salada",
    "Almoço",
    ["Leve", "Prático"],
    540,
    15,
    [
      "Tortilha integral",
      "Frango desfiado",
      "Alface",
      "Tomate",
      "Iogurte natural",
    ],
    ["Aqueça a tortilha.", "Recheie com frango e salada.", "Enrole e sirva."],
  ],
  [
    "Peixe ao forno com legumes",
    "Jantar",
    ["Fácil", "Proteína"],
    640,
    28,
    ["Filé de peixe", "Abobrinha", "Cenoura", "Limão", "Azeite"],
    ["Tempere o peixe.", "Disponha com os legumes.", "Asse até ficar macio."],
  ],
  [
    "Smoothie verde com banana",
    "Lanche",
    ["Rápido", "Natural"],
    290,
    5,
    ["Banana", "Couve", "Leite ou bebida vegetal", "Aveia", "Gengibre"],
    ["Lave a couve.", "Bata todos os ingredientes.", "Sirva imediatamente."],
  ],
  [
    "Pão integral com ovos",
    "Café da manhã",
    ["Fácil", "Sustentável"],
    410,
    10,
    ["Pão integral", "Ovos", "Tomate", "Folhas verdes"],
    ["Prepare os ovos.", "Toste o pão.", "Monte e sirva."],
  ],
  [
    "Bowl de quinoa e legumes",
    "Almoço",
    ["Completo", "Sem glúten"],
    560,
    18,
    ["Quinoa", "Abobrinha", "Cenoura", "Grão-de-bico", "Azeite"],
    ["Cozinhe a quinoa.", "Refogue os legumes.", "Misture e tempere."],
  ],
  [
    "Salmão com arroz integral",
    "Jantar",
    ["Omega 3", "Forte"],
    700,
    35,
    ["Filé de salmão", "Arroz integral", "Limão", "Brócolis", "Azeite"],
    ["Tempere o salmão.", "Asse até cozinhar.", "Sirva com arroz e brócolis."],
  ],
  [
    "Pudim de chia com frutas",
    "Lanche",
    ["Vegano", "Fibras"],
    310,
    15,
    [
      "Sementes de chia",
      "Leite ou bebida vegetal",
      "Banana",
      "Frutas vermelhas",
    ],
    [
      "Misture chia e leite.",
      "Refrigere por pelo menos 2 horas.",
      "Sirva com frutas.",
    ],
  ],
];

async function main() {
  for (const [
    name,
    type,
    tags,
    calories,
    timeMinutes,
    ingredients,
    steps,
  ] of recipes) {
    await prisma.recipe.upsert({
      where: { name },
      update: {
        type,
        tags,
        calories,
        timeMinutes,
        ingredients,
        steps,
        active: true,
      },
      create: { name, type, tags, calories, timeMinutes, ingredients, steps },
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
