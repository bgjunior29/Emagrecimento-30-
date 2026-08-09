import { useEffect, useMemo, useState } from "react";

const sections = [
  {
    title: "Batalha Constante com o Peso",
    description:
      "A barriga parece surgir do nada, a energia desaparece e o espelho já não reflete a mulher que você sempre conheceu.",
  },
  {
    title: "Frustração e Desânimo",
    description:
      "Você sente que não importa o que faça, os resultados não chegam? A verdade é que não é falta de disciplina ou força de vontade.",
  },
  {
    title: "Impacto Hormonal",
    description:
      "Durante a perimenopausa e a menopausa, o organismo passa por mudanças hormonais profundas que alteram como o corpo funciona.",
  },
  {
    title: "Metabolismo Lento",
    description:
      "Essas mudanças alteram a forma como o corpo produz energia, armazena gordura e responde à alimentação, tornando o emagrecimento um desafio.",
  },
];

const benefits = [
  {
    icon: "✨",
    title: "Recupere Sua Confiança",
    description:
      "Sinta-se novamente conectada com seu corpo e radiante em sua própria pele.",
  },
  {
    icon: "🌿",
    title: "Saúde Hormonal Otimizada",
    description:
      "Estratégias baseadas em ciência para apoiar seu metabolismo durante esta fase da vida.",
  },
  {
    icon: "💪",
    title: "Mais Energia e Disposição",
    description:
      "Diga adeus à fadiga e viva seus dias com vitalidade renovada.",
  },
  {
    icon: "🍎",
    title: "Alimentação Consciente",
    description:
      "Aprenda a fazer escolhas inteligentes que nutrem seu corpo e mente.",
  },
  {
    icon: "🧘‍♀️",
    title: "Equilíbrio no Estresse e Sono",
    description:
      "Estratégias eficazes para gerenciar o estresse e melhorar a qualidade do seu sono.",
  },
  {
    icon: "🗓️",
    title: "Protocolo de 21 Dias",
    description:
      "Um plano prático e fácil de seguir para colocar tudo em ação e ver resultados.",
  },
];

const steps = [
  {
    icon: "🛒",
    title: "Escolha e Clique",
    description:
      'Inicie sua jornada! Clique em "Quero Meu E-book Agora!" ou em qualquer botão de compra da página.',
  },
  {
    icon: "✍️",
    title: "Preencha seus Dados",
    description:
      "Complete rapidamente seus dados no pop-up e prossiga para o ambiente seguro de pagamento (Cakto).",
  },
  {
    icon: "📧",
    title: "Acesso Imediato",
    description:
      "Após a confirmação do pagamento, você receberá o link de acesso ao e-book diretamente no seu e-mail.",
  },
];

const bonusRecipes = [
  {
    label: "Receita Bônus 01",
    title: "Salmão em Crosta de Ervas com Purê de Couve-Flor",
    description: "Um clássico das cozinhas nórdicas, pronto em 25 minutos.",
    macros: ["38g proteína", "412 kcal", "25 min"],
    oldPrice: "R$ 27",
  },
  {
    label: "Receita Bônus 02",
    title: "Filé ao Molho de Vinho Tinto com Aspargos Grelhados",
    description: "Inspirado nos bistrôs franceses, pronto em 30 minutos.",
    macros: ["42g proteína", "438 kcal", "30 min"],
    oldPrice: "R$ 20",
  },
];

const checklist = [
  "Como as alterações hormonais impactam seu metabolismo.",
  "Quais alimentos ajudam seu corpo a funcionar melhor.",
  "Como organizar uma rotina que favorece o equilíbrio hormonal.",
  "Estratégias de exercícios, sono e controle do estresse que potencializam seus resultados.",
  "Um protocolo prático de 21 dias para colocar tudo em ação.",
];

const modalContent = {
  checkout: {
    title: "Finalizar Compra",
    body: "Ambiente de Pagamento Seguro via Cakto. Seus dados estão protegidos.",
  },
  privacy: {
    title: "Política de Privacidade",
    body: "Sua privacidade é nossa prioridade. Coletamos apenas as informações essenciais para processar sua compra e garantir o acesso ao seu e-book. Seus dados nunca são compartilhados com terceiros para fins de marketing sem seu consentimento explícito.",
  },
  terms: {
    title: "Termos de Serviço",
    body: 'Ao adquirir o e-book "Metabolismo em Equilíbrio", você concorda com nossos termos de serviço, que incluem as condições de uso do material, direitos autorais e políticas de reembolso. Nosso objetivo é oferecer um produto de alta qualidade para sua transformação.',
  },
};

function useStickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return isScrolled;
}

function App() {
  const [openModal, setOpenModal] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const isScrolled = useStickyHeader();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const heroImage = useMemo(
    () =>
      "https://hotmart.s3.amazonaws.com/product_pictures/e29c78a9-85e3-48b2-a4bd-39dcd8725b54/capa_produto_1000x1000.png",
    [],
  );

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 backdrop-blur-xl ${
          isScrolled
            ? "border-line/80 bg-cream/90 shadow-[0_6px_20px_-14px_rgba(44,38,32,0.4)]"
            : "border-transparent bg-cream/90"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-7 py-4 transition-all duration-300 sm:px-6">
          <div className="font-display text-xl font-semibold opacity-0 animate-fadeUp animation-delay-100">
            Emagrecimento <span className="text-terracotta">30+</span>
          </div>
          <button
            type="button"
            onClick={() => setOpenModal("checkout")}
            className="relative overflow-hidden rounded-full bg-terracotta px-6 py-2.5 text-sm font-semibold text-white shadow-soft transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02]"
          >
            Quero o E-book
            <span className="pointer-events-none absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full transition-all duration-500 hover:translate-x-0" />
          </button>
        </div>
      </header>

      <main>
        <section className="py-20">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <div className="space-y-8">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.32em] text-terracotta-deep/95">
                Guia para mulheres 30+
              </p>
              <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
                Metabolismo em Equilíbrio
              </h1>
              <p className="max-w-2xl text-base leading-8 text-inkSoft sm:text-lg">
                Seu corpo mudou... mas isso não significa que você precisa
                aceitar isso. Descubra estratégias inteligentes para trabalhar a
                favor do seu corpo e recuperar sua disposição.
              </p>
              <button
                type="button"
                onClick={() => setOpenModal("checkout")}
                className="inline-flex items-center rounded-full bg-terracotta px-8 py-3 text-sm font-semibold text-white shadow-soft transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02]"
              >
                Quero Recuperar Minha Disposição!
              </button>
            </div>
            <div className="relative overflow-hidden rounded-[1.4rem] bg-white/80 p-6 shadow-soft">
              <div className="absolute inset-0 rounded-[1.4rem] bg-[radial-gradient(circle_at_30%_20%,rgba(139,154,124,0.28),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(193,115,78,0.22),transparent_55%)]" />
              <img
                src={heroImage}
                alt="Capa do e-book Metabolismo em Equilíbrio"
                className="relative mx-auto h-full max-h-[520px] w-full rounded-[1.4rem] object-contain shadow-[0_30px_60px_-20px_rgba(44,38,32,0.35)] transition-transform duration-1000 motion-safe:animate-floatY"
              />
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-paper py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.32em] text-terracotta-deep/95">
                O que está acontecendo
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
                Você sente que faz dieta, tenta se exercitar e, mesmo assim, o
                peso continua aumentando?
              </h2>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {sections.map((item, index) => (
                <article
                  key={item.title}
                  className="rounded-[1rem] border border-line bg-cream p-7 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-24px_rgba(44,38,32,0.35)]"
                  style={{
                    animation: loaded
                      ? "fadeUp 0.7s cubic-bezier(.22,.61,.36,1) both"
                      : "none",
                    animationDelay: `${index * 0.08 + 0.1}s`,
                  }}
                >
                  <div className="font-display text-2xl text-terracotta">
                    0{index + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-inkSoft">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <img
              src={heroImage}
              alt="Capa do e-book Metabolismo em Equilíbrio"
              className="rounded-[1.4rem] shadow-[0_24px_50px_-18px_rgba(44,38,32,0.3)]"
            />
            <div className="space-y-6">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.32em] text-terracotta-deep/95">
                A boa notícia
              </p>
              <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                Existe uma maneira inteligente de trabalhar a favor do seu corpo
              </h2>
              <p className="text-base leading-8 text-inkSoft">
                No e-book "Metabolismo em Equilíbrio", você vai descobrir
                estratégias simples, práticas e baseadas em conhecimento sobre
                saúde hormonal para recuperar sua disposição, entender como seu
                metabolismo funciona nessa fase da vida e construir hábitos que
                realmente fazem diferença.
              </p>
              <ul className="space-y-4 rounded-[1rem] border border-line bg-cream p-6">
                {checklist.map((item, index) => (
                  <li
                    key={item}
                    className="flex gap-4 text-sm leading-7 text-inkSoft"
                    style={{
                      animation: loaded
                        ? "fadeUp 0.7s cubic-bezier(.22,.61,.36,1) both"
                        : "none",
                      animationDelay: `${0.15 + index * 0.1}s`,
                    }}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage/20 text-sage-deep">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setOpenModal("checkout")}
                className="inline-flex items-center rounded-full bg-terracotta px-8 py-3 text-sm font-semibold text-white shadow-soft transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02]"
              >
                Sim! Eu Quero Transformar Meu Metabolismo!
              </button>
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-paper py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.32em] text-terracotta-deep/95">
                Resultados
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
                O que você vai conquistar com o "Metabolismo em Equilíbrio"
              </h2>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {benefits.map((item, index) => (
                <article
                  key={item.title}
                  className="rounded-[1rem] border border-line bg-cream p-8 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-24px_rgba(44,38,32,0.35)]"
                  style={{
                    animation: loaded
                      ? "fadeUp 0.7s cubic-bezier(.22,.61,.36,1) both"
                      : "none",
                    animationDelay: `${index * 0.05 + 0.1}s`,
                  }}
                >
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-sage text-white text-2xl transition duration-300 hover:scale-110 hover:-rotate-3 hover:bg-terracotta">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-inkSoft">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bonus bg-paper py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="bonus-tag">🎁 Bônus Exclusivo</span>
              <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
                Duas receitas de chef, avaliadas em R$ 47, inclusas hoje sem
                custo
              </h2>
              <p className="mt-4 text-base leading-8 text-inkSoft">
                Pratos ricos em proteína, pensados para trabalhar a favor do seu
                metabolismo — no mesmo padrão de qualidade do e-book.
              </p>
            </div>
            <div className="bonus-grid mt-10 grid gap-6 md:grid-cols-2">
              {bonusRecipes.map((item, index) => (
                <article
                  key={item.title}
                  className="recipe-card"
                  style={{
                    animation: loaded
                      ? "fadeUp 0.7s cubic-bezier(.22,.61,.36,1) both"
                      : "none",
                    animationDelay: `${index * 0.08 + 0.1}s`,
                  }}
                >
                  <div className="lock-badge">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="4" y="10" width="16" height="10" rx="2" />
                      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    </svg>
                    Bônus
                  </div>
                  <div className="cover">
                    <span className="blob blob-c" />
                    <span className="blob blob-a" />
                    <span className="blob blob-b" />
                  </div>
                  <div className="body">
                    <span className="eyebrow-mini">{item.label}</span>
                    <h3>{item.title}</h3>
                    <p className="desc">{item.description}</p>
                    <div className="macro-tags">
                      {item.macros.map((tag) => (
                        <span key={tag} className="macro-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="price-row">
                      <span className="price-old">{item.oldPrice}</span>
                      <span className="price-new">Grátis hoje</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="bonus-note mt-10 flex items-center justify-center gap-3 text-center text-sm text-inkSoft">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <rect x="4" y="10" width="16" height="10" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
              Disponíveis apenas para quem garantir o e-book hoje.
            </p>
            <div className="bonus-cta mt-8 text-center">
              <button
                type="button"
                onClick={() => setOpenModal("checkout")}
                className="btn btn-primary"
              >
                Quero o E-book + Receitas Bônus
              </button>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[auto_1fr] lg:px-8">
            <div className="overflow-hidden rounded-full border-4 border-paper bg-white shadow-soft transition duration-300 hover:scale-[1.02] hover:shadow-[0_30px_60px_-20px_rgba(44,38,32,0.35)]">
              <img
                src="https://i.pravatar.cc/300?img=68"
                alt="Imagem do Autor John Wesley"
                className="h-full w-full min-h-[260px] object-cover"
              />
            </div>
            <div className="space-y-6">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.32em] text-terracotta-deep/95">
                Sobre o Autor
              </p>
              <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                John Wesley
              </h2>
              <p className="max-w-2xl text-base leading-8 text-inkSoft">
                Este guia foi criado pelo especialista John Wesley, apaixonado
                por saúde e metabolismo. Com anos de experiência e um profundo
                conhecimento das mudanças hormonais, ele desenvolveu este método
                para empoderar mulheres a recuperarem o controle de seus corpos
                e vidas. Sua missão é desmistificar o emagrecimento após os 30,
                oferecendo estratégias reais e sustentáveis.
              </p>
              <button
                type="button"
                onClick={() => setOpenModal("checkout")}
                className="inline-flex items-center rounded-full bg-terracotta px-8 py-3 text-sm font-semibold text-white shadow-soft transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02]"
              >
                Conheça o E-book
              </button>
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-paper py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.32em] text-terracotta-deep/95">
                Processo
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
                Como Funciona a Sua Compra?
              </h2>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {steps.map((item, index) => (
                <article
                  key={item.title}
                  className="rounded-[1rem] border border-line bg-white p-8 text-center shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-24px_rgba(44,38,32,0.35)]"
                  style={{
                    animation: loaded
                      ? "fadeUp 0.7s cubic-bezier(.22,.61,.36,1) both"
                      : "none",
                    animationDelay: `${index * 0.08 + 0.1}s`,
                  }}
                >
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-sage text-white text-2xl transition duration-300 hover:bg-terracotta">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-inkSoft">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="rounded-[2rem] bg-gradient-to-br from-terracotta via-terracottaDeep to-[#8b4f32] px-8 py-16 text-center text-white shadow-soft sm:px-12">
              <h2 className="font-display text-3xl leading-tight sm:text-4xl">
                Não lute mais contra seu metabolismo. Comece a trabalhar com
                ele.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/90">
                Este não é mais um método milagroso. É um guia para mulheres que
                desejam recuperar a confiança, a saúde e a qualidade de vida
                entendendo o próprio corpo e fazendo escolhas mais inteligentes
                todos os dias.
              </p>
              <button
                type="button"
                onClick={() => setOpenModal("checkout")}
                className="mt-10 inline-flex items-center rounded-full bg-white text-black px-9 py-3 text-sm font-semibold text-terracotta-deep shadow-soft transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02]"
              >
                Quero Meu E-book Agora!
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-12 text-center text-sm text-inkSoft">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p>© 2026 Emagrecimento 30+. Todos os direitos reservados.</p>
          <p className="mt-2">
            Desenvolvido com carinho para mulheres que buscam o equilíbrio.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-ink">
            <button
              type="button"
              onClick={() => setOpenModal("privacy")}
              className="font-semibold underline-offset-4 transition hover:underline"
            >
              Política de Privacidade
            </button>
            <span className="text-line">|</span>
            <button
              type="button"
              onClick={() => setOpenModal("terms")}
              className="font-semibold underline-offset-4 transition hover:underline"
            >
              Termos de Serviço
            </button>
          </div>
        </div>
      </footer>

      {openModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => setOpenModal(null)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-[1.5rem] bg-paper p-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenModal(null)}
              className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-cream text-xl text-ink transition hover:bg-terracotta hover:text-white"
            >
              ✕
            </button>
            <h2 className="font-display text-2xl font-semibold text-ink">
              {modalContent[openModal].title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-inkSoft">
              {modalContent[openModal].body}
            </p>

            {openModal === "checkout" ? (
              <div className="mt-8 space-y-6 rounded-[1.25rem] border border-line bg-cream p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <img
                    className="h-20 w-20 rounded-2xl object-cover"
                    src={heroImage}
                    alt="Capa do e-book"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-ink">
                      E-book: Metabolismo em Equilíbrio
                    </h3>
                    <p className="mt-2 text-sm text-inkSoft">
                      Guia completo para mulheres 30+.
                    </p>
                    <div className="mt-3 text-xl font-semibold text-terracotta-deep">
                      R$ 97,00
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-sage/20 bg-sage/10 p-4 text-sm text-sage-deep">
                  <p className="font-semibold">Bônus exclusivo incluso</p>
                  <p className="mt-2 text-sm text-inkSoft">
                    + 2 receitas de chef avaliadas em R$ 47,00 — gratuitas para
                    você hoje.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-inkSoft">
                    <span className="block font-semibold text-ink">
                      Seu Nome Completo
                    </span>
                    <input
                      className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                      placeholder="Digite seu nome completo"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-inkSoft">
                    <span className="block font-semibold text-ink">
                      Seu Melhor E-mail
                    </span>
                    <input
                      className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                      placeholder="voce@email.com"
                      type="email"
                    />
                  </label>
                </div>
                <a
                  href="https://pay.cakto.com.br/39557w7_1002259"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02]"
                >
                  Ir para o Pagamento Seguro (Cakto)
                </a>
                <p className="text-center text-xs text-inkSoft">
                  Ambiente de Pagamento Seguro via Cakto. Seus dados estão
                  protegidos.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
