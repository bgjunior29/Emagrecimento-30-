# Emagrecimento 30+

Aplicativo web de nutrição personalizada, metabolismo e bem-estar, com foco em:

- onboarding personalizado
- geração de cardápio semanal
- lista de compras
- check-in diário
- acompanhamento de evolução e hábitos
- arquitetura pronta para autenticação, banco de dados e integrações futuras

## Stack atual

- React + Vite
- React Router
- Tailwind CSS
- JavaScript
- Express
- Prisma
- PostgreSQL

## Visão do produto

A aplicação foi estruturada em módulos separados para evoluir em direção a um MVP funcional de saúde e nutrição com foco em:

- landing page
- login e cadastro
- onboarding
- dashboard
- planejamento alimentar
- lista de compras
- check-in
- receitas
- perfil e administração

## Como rodar

```bash
npm install
npm run dev
```

Para rodar a API localmente, crie um `.env` a partir do `.env.example`, informe a conexão PostgreSQL e execute:

```bash
npm run db:migrate:dev -- --name init
npm run dev:server
```

O endpoint `GET /api/health` confirma se a API consegue acessar o banco.

### Dados reais de receitas e cardápios

O catálogo de receitas, favoritos e cardápios semanais fica no PostgreSQL. O
arquivo `prisma/seed.js` contém apenas a carga inicial do catálogo; depois do
seed, o painel administrativo passa a ser a fonte de manutenção das receitas.

No Render, o `render.yaml` executa a preparação do banco no `preDeployCommand`,
separada do build da aplicação:

```bash
npm run db:push
npm run db:seed
```

Para preparar um banco local, configure `DATABASE_URL` no `.env` e execute:

```bash
npm run db:push
npm run db:seed
```

Principais endpoints autenticados:

- `GET /api/recipes` lista receitas ativas e favoritos do usuário.
- `GET /api/recipes/:id` abre ingredientes e modo de preparo.
- `PUT /api/favorites/:id` alterna o favorito no PostgreSQL.
- `GET /api/meal-plans/current` carrega o cardápio da semana atual.
- `POST /api/meal-plans/generate` gera o primeiro cardápio da semana.
- `PUT /api/meal-plans/current/items/:dayIndex/:mealType` troca uma refeição.

Endpoints administrativos exigem token com role `admin`:

- `POST /api/admin/recipes` cadastra uma receita.
- `PUT /api/admin/recipes/:id` edita uma receita.
- `DELETE /api/admin/recipes/:id` arquiva uma receita sem apagar histórico.

No primeiro deploy do Render, o `render.yaml` usa `prisma db push` para criar as tabelas diretamente no PostgreSQL informado. Depois de conectar o banco, gere a migration inicial localmente com `npm run db:migrate:dev -- --name init` e passe o build para `npm run db:migrate`.

## Scripts disponíveis

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
npm run db:migrate
npm run db:seed
npm run db:studio
```

## Estrutura principal

```bash
src/
  components/
  data/
  hooks/
  pages/
  services/
  App.jsx
  main.jsx
```

## Deploy no Render

O arquivo `render.yaml` configura o serviço web. No Render, informe `DATABASE_URL` e `CLIENT_URL`. Para um PostgreSQL do próprio Render, use a URL interna em `DATABASE_URL` quando o serviço estiver na mesma região. O comando de build aplica as migrações antes de iniciar a API.

## Próximos passos de arquitetura

- conectar as telas React aos endpoints `/api`
- adicionar camada de serviços para WhatsApp, IA e notificações
- separar validações com Zod e regras por roles
- criar painel administrativo
- preparar integrações para Cloudinary e Google OAuth

## Aviso importante

As recomendações da plataforma têm caráter informativo e não substituem acompanhamento médico ou nutricional profissional.
