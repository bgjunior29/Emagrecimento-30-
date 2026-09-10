import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const port = Number(process.env.PORT || 3001);
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  console.warn("JWT_SECRET nao definido. Configure essa variavel no Render.");
}

const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

function isAllowedOrigin(origin) {
  if (
    !origin ||
    allowedOrigins.length === 0 ||
    allowedOrigins.includes(origin)
  ) {
    return true;
  }

  try {
    const hostname = new URL(origin).hostname;
    return hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origem nao autorizada pelo CORS."));
    },
  }),
);
app.use(express.json({ limit: "1mb" }));

function createToken(userId, role = "user") {
  return jwt.sign({ userId, role }, jwtSecret || "development-only-secret", {
    expiresIn: "7d",
  });
}

function auth(req, res, next) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token)
    return res.status(401).json({ error: "Autenticacao necessaria." });

  try {
    const payload = jwt.verify(token, jwtSecret || "development-only-secret");
    req.userId = payload.userId;
    req.role = payload.role || "user";
    return next();
  } catch {
    return res.status(401).json({ error: "Sessao invalida ou expirada." });
  }
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    profile: user.profile,
    role: user.role || "user",
  };
}

function requireAdmin(req, res, next) {
  if (req.role !== "admin") {
    return res.status(403).json({ error: "Acesso administrativo necessario." });
  }
  return next();
}

function publicRecipe(recipe) {
  return {
    id: recipe.id,
    name: recipe.name,
    type: recipe.type,
    tags: recipe.tags,
    calories: recipe.calories,
    time: `${recipe.timeMinutes} min`,
    timeMinutes: recipe.timeMinutes,
    ingredients: recipe.ingredients,
    steps: recipe.steps,
    active: recipe.active,
  };
}

function getWeekStart(date = new Date()) {
  const value = new Date(date);
  value.setUTCHours(0, 0, 0, 0);
  const day = value.getUTCDay();
  const daysSinceMonday = day === 0 ? 6 : day - 1;
  value.setUTCDate(value.getUTCDate() - daysSinceMonday);
  return value;
}

function publicMealPlan(plan) {
  return {
    id: plan.id,
    weekStart: plan.weekStart,
    days: Array.from({ length: 7 }, (_, dayIndex) => ({
      dayIndex,
      meals: plan.items
        .filter((item) => item.dayIndex === dayIndex)
        .reduce((meals, item) => {
          meals[item.mealType] = publicRecipe(item.recipe);
          return meals;
        }, {}),
    })),
  };
}

function validateRecipeInput(body) {
  const { name, type, tags, calories, timeMinutes, ingredients, steps } = body;
  if (
    !name?.trim() ||
    !type?.trim() ||
    !Array.isArray(tags) ||
    !Number.isInteger(Number(calories)) ||
    Number(calories) <= 0 ||
    !Number.isInteger(Number(timeMinutes)) ||
    Number(timeMinutes) <= 0 ||
    !Array.isArray(ingredients) ||
    ingredients.length === 0 ||
    !Array.isArray(steps) ||
    steps.length === 0
  ) {
    return "Nome, tipo, calorias, tempo, ingredientes e preparo sao obrigatorios.";
  }
  return null;
}

app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return res.json({ ok: true, database: "connected" });
  } catch {
    return res.status(503).json({ ok: false, database: "unavailable" });
  }
});

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (
    !name?.trim() ||
    !/^\S+@\S+\.\S+$/.test(email || "") ||
    password?.length < 6
  ) {
    return res.status(400).json({
      error: "Nome, e-mail valido e senha com 6 caracteres sao obrigatorios.",
    });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name: name.trim(), email: email.toLowerCase(), passwordHash },
    });
    return res
      .status(201)
      .json({ token: createToken(user.id), user: publicUser(user) });
  } catch (error) {
    if (error.code === "P2002")
      return res.status(409).json({ error: "Este e-mail ja esta cadastrado." });
    return res.status(500).json({ error: "Nao foi possivel criar a conta." });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;
  const demoEmail = "ana@emagrecimento30.com";
  const demoPassword = "demo123";

  if (
    adminEmail &&
    adminPassword &&
    email?.toLowerCase() === adminEmail &&
    password === adminPassword
  ) {
    return res.json({
      token: createToken("admin", "admin"),
      user: {
        id: "admin",
        name: "Administrador",
        email: adminEmail,
        role: "admin",
      },
    });
  }

  if (email?.toLowerCase() === demoEmail && password === demoPassword) {
    let demoUser = await prisma.user.findUnique({
      where: { email: demoEmail },
    });
    if (!demoUser) {
      demoUser = await prisma.user.create({
        data: {
          name: "Usuário demo",
          email: demoEmail,
          passwordHash: await bcrypt.hash(demoPassword, 12),
        },
      });
    }
    return res.json({
      token: createToken(demoUser.id),
      user: {
        id: demoUser.id,
        name: demoUser.name,
        email: demoEmail,
        role: "user",
      },
    });
  }

  const user = await prisma.user.findUnique({
    where: { email: email?.toLowerCase() },
    include: { profile: true },
  });
  if (!user || !(await bcrypt.compare(password || "", user.passwordHash))) {
    return res.status(401).json({ error: "E-mail ou senha invalidos." });
  }

  return res.json({ token: createToken(user.id), user: publicUser(user) });
});

app.post("/api/auth/admin-login", async (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return res
      .status(503)
      .json({ error: "Acesso admin ainda não configurado no servidor." });
  }

  if (email?.toLowerCase() !== adminEmail || password !== adminPassword) {
    return res
      .status(401)
      .json({ error: "Credenciais administrativas inválidas." });
  }

  return res.json({
    token: createToken("admin", "admin"),
    user: {
      id: "admin",
      name: "Administrador",
      email: adminEmail,
      role: "admin",
    },
  });
});

app.get("/api/me", auth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    include: { profile: true },
  });
  if (!user) return res.status(404).json({ error: "Usuario nao encontrado." });
  return res.json({ user: publicUser(user) });
});

app.put("/api/profile", auth, async (req, res) => {
  const { name, age, heightCm, weightKg, goal, activity, preferences } =
    req.body;

  if (
    !name?.trim() ||
    !Number(age) ||
    !Number(heightCm) ||
    !Number(weightKg) ||
    !goal ||
    !activity ||
    !Array.isArray(preferences)
  ) {
    return res
      .status(400)
      .json({ error: "Preencha todos os dados nutricionais." });
  }

  const user = await prisma.user.update({
    where: { id: req.userId },
    data: {
      name: name.trim(),
      profile: {
        upsert: {
          create: {
            age: Number(age),
            heightCm: Number(heightCm),
            weightKg: Number(weightKg),
            goal,
            activity,
            preferences,
          },
          update: {
            age: Number(age),
            heightCm: Number(heightCm),
            weightKg: Number(weightKg),
            goal,
            activity,
            preferences,
          },
        },
      },
    },
    include: { profile: true },
  });

  return res.json({ user: publicUser(user) });
});

app.post("/api/check-ins", auth, async (req, res) => {
  const { energy, sleep, hunger, mood, disposition, notes } = req.body;
  const ratings = [energy, sleep, hunger, mood, disposition];

  if (
    ratings.some((value) => !Number.isInteger(value) || value < 1 || value > 5)
  ) {
    return res
      .status(400)
      .json({ error: "Cada avaliacao deve estar entre 1 e 5." });
  }

  const checkIn = await prisma.checkIn.create({
    data: {
      userId: req.userId,
      energy,
      sleep,
      hunger,
      mood,
      disposition,
      notes: notes?.trim() || null,
    },
  });

  return res.status(201).json({ checkIn });
});

app.get("/api/check-ins", auth, async (req, res) => {
  const checkIns = await prisma.checkIn.findMany({
    where: { userId: req.userId },
    orderBy: { date: "desc" },
    take: 30,
  });
  return res.json({ checkIns });
});

app.get("/api/recipes", auth, async (req, res) => {
  const recipes = await prisma.recipe.findMany({
    where: { active: true },
    orderBy: [{ type: "asc" }, { name: "asc" }],
  });
  const favorites = await prisma.favoriteRecipe.findMany({
    where: { userId: req.userId },
    select: { recipeId: true },
  });
  return res.json({
    recipes: recipes.map(publicRecipe),
    favoriteIds: favorites.map((favorite) => favorite.recipeId),
  });
});

app.get("/api/recipes/:recipeId", auth, async (req, res) => {
  const recipe = await prisma.recipe.findFirst({
    where: { id: Number(req.params.recipeId), active: true },
  });
  if (!recipe)
    return res.status(404).json({ error: "Receita nao encontrada." });
  return res.json({ recipe: publicRecipe(recipe) });
});

app.post("/api/admin/recipes", auth, requireAdmin, async (req, res) => {
  const validationError = validateRecipeInput(req.body);
  if (validationError) return res.status(400).json({ error: validationError });
  const recipe = await prisma.recipe.create({
    data: {
      name: req.body.name.trim(),
      type: req.body.type.trim(),
      tags: req.body.tags.map((tag) => String(tag).trim()).filter(Boolean),
      calories: Number(req.body.calories),
      timeMinutes: Number(req.body.timeMinutes),
      ingredients: req.body.ingredients
        .map((item) => String(item).trim())
        .filter(Boolean),
      steps: req.body.steps.map((item) => String(item).trim()).filter(Boolean),
    },
  });
  return res.status(201).json({ recipe: publicRecipe(recipe) });
});

app.put(
  "/api/admin/recipes/:recipeId",
  auth,
  requireAdmin,
  async (req, res) => {
    const validationError = validateRecipeInput(req.body);
    if (validationError)
      return res.status(400).json({ error: validationError });
    try {
      const recipe = await prisma.recipe.update({
        where: { id: Number(req.params.recipeId) },
        data: {
          name: req.body.name.trim(),
          type: req.body.type.trim(),
          tags: req.body.tags.map((tag) => String(tag).trim()).filter(Boolean),
          calories: Number(req.body.calories),
          timeMinutes: Number(req.body.timeMinutes),
          ingredients: req.body.ingredients
            .map((item) => String(item).trim())
            .filter(Boolean),
          steps: req.body.steps
            .map((item) => String(item).trim())
            .filter(Boolean),
          active: req.body.active !== false,
        },
      });
      return res.json({ recipe: publicRecipe(recipe) });
    } catch (error) {
      if (error.code === "P2025")
        return res.status(404).json({ error: "Receita nao encontrada." });
      throw error;
    }
  },
);

app.delete(
  "/api/admin/recipes/:recipeId",
  auth,
  requireAdmin,
  async (req, res) => {
    try {
      const recipe = await prisma.recipe.update({
        where: { id: Number(req.params.recipeId) },
        data: { active: false },
      });
      return res.json({ recipe: publicRecipe(recipe) });
    } catch (error) {
      if (error.code === "P2025")
        return res.status(404).json({ error: "Receita nao encontrada." });
      throw error;
    }
  },
);

app.get("/api/meal-plans/current", auth, async (req, res) => {
  const plan = await prisma.mealPlan.findUnique({
    where: {
      userId_weekStart: { userId: req.userId, weekStart: getWeekStart() },
    },
    include: {
      items: {
        include: { recipe: true },
        orderBy: [{ dayIndex: "asc" }, { mealType: "asc" }],
      },
    },
  });
  return res.json({ plan: plan ? publicMealPlan(plan) : null });
});

app.post("/api/meal-plans/generate", auth, async (req, res) => {
  const recipes = await prisma.recipe.findMany({ where: { active: true } });
  const byType = {
    breakfast: recipes.filter((recipe) => recipe.type === "Café da manhã"),
    lunch: recipes.filter((recipe) => recipe.type === "Almoço"),
    dinner: recipes.filter((recipe) => recipe.type === "Jantar"),
  };
  if (Object.values(byType).some((items) => items.length === 0)) {
    return res
      .status(409)
      .json({
        error: "O catalogo ainda nao possui receitas para todos os horarios.",
      });
  }
  const mealTypes = ["breakfast", "lunch", "dinner"];
  const weekStart = getWeekStart();
  const plan = await prisma.$transaction(async (transaction) => {
    const savedPlan = await transaction.mealPlan.upsert({
      where: { userId_weekStart: { userId: req.userId, weekStart } },
      update: {},
      create: { userId: req.userId, weekStart },
    });
    await transaction.mealPlanItem.deleteMany({
      where: { mealPlanId: savedPlan.id },
    });
    const items = Array.from({ length: 7 }, (_, dayIndex) =>
      mealTypes.map((mealType) => {
        const options = byType[mealType];
        const recipe =
          options[(dayIndex + mealTypes.indexOf(mealType)) % options.length];
        return {
          mealPlanId: savedPlan.id,
          dayIndex,
          mealType,
          recipeId: recipe.id,
        };
      }),
    ).flat();
    await transaction.mealPlanItem.createMany({ data: items });
    return transaction.mealPlan.findUnique({
      where: { id: savedPlan.id },
      include: {
        items: {
          include: { recipe: true },
          orderBy: [{ dayIndex: "asc" }, { mealType: "asc" }],
        },
      },
    });
  });
  return res.status(201).json({ plan: publicMealPlan(plan) });
});

app.put(
  "/api/meal-plans/current/items/:dayIndex/:mealType",
  auth,
  async (req, res) => {
    const dayIndex = Number(req.params.dayIndex);
    const { mealType } = req.params;
    const recipeId = Number(req.body.recipeId);
    if (
      !Number.isInteger(dayIndex) ||
      dayIndex < 0 ||
      dayIndex > 6 ||
      !["breakfast", "lunch", "dinner"].includes(mealType) ||
      !Number.isInteger(recipeId)
    ) {
      return res.status(400).json({ error: "Refeicao invalida." });
    }
    const plan = await prisma.mealPlan.findUnique({
      where: {
        userId_weekStart: { userId: req.userId, weekStart: getWeekStart() },
      },
    });
    const recipe = await prisma.recipe.findFirst({
      where: { id: recipeId, active: true },
    });
    if (!plan || !recipe)
      return res
        .status(404)
        .json({ error: "Plano ou receita nao encontrados." });
    const item = await prisma.mealPlanItem.upsert({
      where: {
        mealPlanId_dayIndex_mealType: {
          mealPlanId: plan.id,
          dayIndex,
          mealType,
        },
      },
      update: { recipeId },
      create: { mealPlanId: plan.id, dayIndex, mealType, recipeId },
      include: { recipe: true },
    });
    return res.json({
      item: { dayIndex, mealType, recipe: publicRecipe(item.recipe) },
    });
  },
);

app.put("/api/favorites/:recipeId", auth, async (req, res) => {
  const recipeId = Number(req.params.recipeId);
  if (!Number.isInteger(recipeId))
    return res.status(400).json({ error: "Receita invalida." });

  const recipe = await prisma.recipe.findFirst({
    where: { id: recipeId, active: true },
  });
  if (!recipe)
    return res.status(404).json({ error: "Receita nao encontrada." });
  const favorite = await prisma.favoriteRecipe.findUnique({
    where: { userId_recipeId: { userId: req.userId, recipeId } },
  });
  if (favorite) {
    await prisma.favoriteRecipe.delete({ where: { id: favorite.id } });
    return res.json({ favorite: false });
  }

  await prisma.favoriteRecipe.create({
    data: { userId: req.userId, recipeId },
  });
  return res.json({ favorite: true });
});

app.use(express.static("dist"));
app.use((_req, res) => res.sendFile("index.html", { root: "dist" }));

app.listen(port, () => console.log(`API rodando na porta ${port}`));
