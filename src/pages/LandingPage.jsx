import { Link } from "react-router-dom";
import {
  benefits,
  faq,
  features,
  sections,
  steps,
  testimonials,
} from "../data/siteContent";
import { CHECKOUT_URL } from "../config";

const heroImage =
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80";

export default function LandingPage() {
  return (
    <div className="landing-motion bg-[#fffefa] text-[#3f342c]">
      <header className="sticky top-0 z-40 border-b border-[#e8dfd2] bg-[#fffefa]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d6a14a] text-lg font-black text-[#3f342c] shadow-sm">
              30+
            </div>
            <div>
              <div className="text-sm font-black uppercase tracking-[0.16em] text-[#49634d]">
                Emagrecimento 30+
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-bold text-[#705443] md:flex">
            <a href="#como-funciona">Como funciona</a>
            <a href="#funcionalidades">Funcionalidades</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="rounded-full border border-[#e8dfd2] px-4 py-2 text-sm font-bold text-[#685748] hover:bg-[#f6f0e7]"
            >
              Já sou cliente
            </Link>
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#49634d] px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-[#5b7958]"
            >
              Comprar acesso
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-[#f6f0e7]">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
            <div className="flex flex-col justify-center">
              <span className="pulse-soft mb-4 inline-flex w-fit rounded-full border border-[#dfb454] bg-[#fff6d9] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#8b5e20]">
                Saúde • Alimentação • Bem-estar
              </span>

              <h1 className="max-w-xl text-4xl font-black tracking-tight text-[#3f342c] sm:text-5xl lg:text-6xl">
                Emagrecimento 30+ com estratégia, rotina e acompanhamento real.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                A plataforma combina plano alimentar personalizado, lista de
                compras, lembretes e acompanhamento diário para transformar sua
                rotina em uma experiência mais leve, organizada e sustentável.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#49634d] px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-[#49634d]/20 transition hover:bg-[#5b7958]"
                >
                  Quero começar agora
                </a>
                <Link
                  to="/login"
                  className="rounded-full border border-[#e1d6c8] bg-[#fffefa] px-6 py-3 text-center text-sm font-bold text-[#685748] hover:bg-white"
                >
                  Já tenho acesso
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-600">
                <div>
                  <strong className="block text-xl font-bold text-slate-900">
                    30+
                  </strong>{" "}
                  refeições prontas
                </div>
                <div>
                  <strong className="block text-xl font-bold text-slate-900">
                    7
                  </strong>{" "}
                  dias de cardápio
                </div>
                <div>
                  <strong className="block text-xl font-bold text-slate-900">
                    1
                  </strong>{" "}
                  app para evoluir
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-10 h-40 w-40 rounded-full bg-emerald-200/60 blur-3xl" />
              <div className="absolute -right-8 bottom-10 h-44 w-44 rounded-full bg-amber-200/70 blur-3xl" />

              <div className="float-soft relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-[0_30px_80px_-25px_rgba(15,23,42,0.25)]">
                <img
                  src={heroImage}
                  alt="Alimentação saudável e bem-estar"
                  className="h-[540px] w-full rounded-[1.5rem] object-cover"
                />
                <div className="shine-sweep absolute left-8 top-8 rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                    Sua rotina
                  </p>
                  <p className="mt-2 text-2xl font-black text-slate-900">
                    No seu ritmo
                  </p>
                  <p className="text-sm text-slate-600">
                    com escolhas possíveis
                  </p>
                </div>
                <div className="absolute bottom-8 right-8 rounded-2xl bg-slate-900 p-4 text-white shadow-xl">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-300">
                    Acompanhamento
                  </p>
                  <p className="mt-2 text-2xl font-black">Dia a dia</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">
                Como funciona
              </p>
              <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
                Simples, eficiente e pensado para a sua rotina.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-sm"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
                    {step.icon}
                  </div>
                  <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
                    Passo {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="funcionalidades" className="bg-slate-900 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-300">
                Principais funcionalidades
              </p>
              <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                Tudo para organizar sua alimentação sem complicar.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className="rounded-3xl border border-slate-700 bg-slate-800/80 p-6"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-xl text-emerald-300">
                    {["🍽️", "📅", "🛒", "📋", "🔔", "📈"][index]}
                  </div>
                  <h3 className="text-xl font-bold">{feature}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Estrutura pensada para evolução do produto com geração
                    automática, lembretes e acompanhamento diário.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">
                Problemas que o app resolve
              </p>
              <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
                Uma rotina mais organizada e menos cansativa.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {sections.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 text-2xl font-black text-emerald-600">
                    0{index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-emerald-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">
                Benefícios
              </p>
              <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
                O que você ganha com uma rotina mais consciente.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 text-3xl">{benefit.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">
                Depoimentos
              </p>
              <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
                Mentorias e experiências reais em desenvolvimento.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((item) => (
                <div
                  key={item.name}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="mb-3 text-2xl text-amber-400">★★★★★</div>
                  <p className="text-slate-600">“{item.text}”</p>
                  <div className="mt-6 font-bold text-slate-900">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">
                FAQ
              </p>
              <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
                Perguntas frequentes
              </h2>
            </div>

            <div className="mt-12 space-y-4">
              {faq.map((item) => (
                <div
                  key={item.question}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-slate-900">
                    {item.question}
                  </h3>
                  <p className="mt-2 text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-16 text-center text-white shadow-xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-100">
              Pronto para começar?
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Crie seu perfil e comece a organizar sua rotina com mais clareza.
            </h2>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 hover:bg-slate-100"
              >
                Comprar acesso
              </a>
              <Link
                to="/login"
                className="rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Entrar no painel
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 text-sm text-slate-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="font-bold text-slate-900">NutriFlow</div>
          <div>© 2026 NutriFlow. Todos os direitos reservados.</div>
          <div className="flex gap-4">
            <a href="#faq">FAQ</a>
            <a href="#funcionalidades">Funcionalidades</a>
            <a href="#como-funciona">Como funciona</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
