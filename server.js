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

app.use(
  cors({
    origin(origin, callback) {
      if (
        !origin ||
        allowedOrigins.length === 0 ||
        allowedOrigins.includes(origin)
      ) {
        return callback(null, true);
      }

      return callback(new Error("Origem nao autorizada pelo CORS."));
    },
  }),
);
app.use(express.json({ limit: "1mb" }));

function createToken(userId) {
  return jwt.sign({ userId }, jwtSecret || "development-only-secret", {
    expiresIn: "7d",
  });
}

function auth(req, res, next) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token)
    return res.status(401).json({ error: "Autenticacao necessaria." });

  try {
    req.userId = jwt.verify(
      token,
      jwtSecret || "development-only-secret",
    ).userId;
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
  };
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

  const user = await prisma.user.findUnique({
    where: { email: email?.toLowerCase() },
    include: { profile: true },
  });
  if (!user || !(await bcrypt.compare(password || "", user.passwordHash))) {
    return res.status(401).json({ error: "E-mail ou senha invalidos." });
  }

  return res.json({ token: createToken(user.id), user: publicUser(user) });
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

app.put("/api/favorites/:recipeId", auth, async (req, res) => {
  const recipeId = Number(req.params.recipeId);
  if (!Number.isInteger(recipeId))
    return res.status(400).json({ error: "Receita invalida." });

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
