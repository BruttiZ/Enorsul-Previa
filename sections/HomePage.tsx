"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import brazil from "@svg-maps/brazil";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronDown,
  CircuitBoard,
  Droplets,
  Gauge,
  Globe2,
  Mail,
  MapPin,
  Menu,
  Moon,
  Navigation,
  Phone,
  Radar,
  ShieldCheck,
  Sun,
  Trophy,
  Waves,
  X
} from "lucide-react";

const navItems = [
  ["Inicio", "#inicio"],
  ["Quem Somos", "#quem-somos"],
  ["Servicos", "#servicos"],
  ["Obras", "#obras"],
  ["Tecnologia", "#tecnologia"],
  ["Premiacoes", "#premiacoes"],
  ["Atuacao", "#atuacao"],
  ["Contato", "#contato"]
];

const stats = [
  { value: 36, suffix: "+", label: "anos de experiencia", detail: "historia desde 1990" },
  { value: 10, suffix: "+", label: "estados mapeados", detail: "atuacao e historico nacional" },
  { value: 500, suffix: "+", label: "profissionais", detail: "estrutura operacional" },
  { value: 60, suffix: " mil", label: "ligacoes", detail: "projeto historico no AC" }
];

const services = [
  {
    icon: CircuitBoard,
    title: "Automacao e telemetria",
    text: "Projetos de macromedicao, telecomando, sensores de vazao, pressao e nivel, UTRs, CLPs e supervisao em CCO."
  },
  {
    icon: Gauge,
    title: "Reducao de perdas",
    text: "Controle de vazoes e pressoes, pitometria, deteccao de vazamentos nao visiveis e otimizacao de sistemas."
  },
  {
    icon: Globe2,
    title: "GIS e cadastro tecnico",
    text: "Digitalizacao de plantas, cadastro georreferenciado, analise de redes e sistemas de informacoes geograficas."
  },
  {
    icon: Activity,
    title: "Desenvolvimento operacional",
    text: "Diagnosticos, planejamento operacional, manutencao de unidades e rotinas para abastecimento e esgotamento."
  },
  {
    icon: ShieldCheck,
    title: "Gestao comercial e fraudes",
    text: "Cadastro de consumidores, leitura, faturamento, ordens de servico, recuperacao de receita e caca-fraudes."
  },
  {
    icon: Building2,
    title: "Servicos e obras",
    text: "Operacao e manutencao de ETAs, ETEs, elevatorias, redes, ramais, setorizacao, VRPs e macromedidores."
  }
];

const techPillars = [
  "Mapas GIS em tempo real",
  "Dashboards operacionais",
  "Sensores de vazao e pressao",
  "Telemetria e telecomando",
  "Indicadores de perdas",
  "Controle operacional integrado"
];

const cases = [
  ["Reducao de perdas", "Contratos de performance, pesquisa de vazamentos nao visiveis, pitometria e controle de pressoes para ganhos reais de eficiencia."],
  ["Combate a fraudes", "Acoes comerciais para recuperacao de clientes inativos, irregularidades, faturamento e arrecadacao."],
  ["Controle operacional", "Planejamento, monitoramento de parametros, rotinas operacionais e compatibilizacao entre distribuicao e comercial."],
  ["Cadastro georreferenciado", "Documentacao tecnico-operacional, digitalizacao de plantas e GIS aplicado ao saneamento."],
  ["Telemetria", "Arquitetura de sensores, remotas, linhas de comunicacao, supervisao, testes e partida operacional."]
];

const awards = [
  ["2009", "1o Premio Eficiencia Operacional SABESP UNS", "Melhor prestador em pesquisa e deteccao de vazamentos nao visiveis."],
  ["2011", "Premios SABESP de eficiencia", "Reducao do indice de perdas no Setor Mussolini e reconhecimento como melhor prestador TACE."],
  ["2016", "MundoGeo Connect Latin America", "Projeto CCGeo na Baixada Santista, com centro georreferenciado de combate a perdas."],
  ["2017", "Bentley Systems Be Inspired Awards", "Finalista internacional em Cingapura pelo projeto de otimizacao da rede de Olinda/PE."],
  ["2019", "Melhores em Gestao SABESP", "Reconhecimento no Programa de Excelencia Global da Unidade de Negocio Sul."]
];

const locations = [
  { uf: "SP", city: "Sao Paulo, Santo Andre, Santos, Guarulhos, Mogi, Sertaozinho e Bebedouro", work: "Operacao, obras, TACE, perdas e gestao comercial" },
  { uf: "RS", city: "Caxias do Sul", work: "Operacoes regionais e reconhecimento SAMAE" },
  { uf: "PE", city: "Olinda e Recife", work: "Otimizacao de rede, reducao de perdas e escritorio regional" },
  { uf: "ES", city: "Serra", work: "Escritorio regional e suporte tecnico" },
  { uf: "RO", city: "Porto Velho", work: "Operacao regional" },
  { uf: "RR", city: "Boa Vista", work: "Operacao regional" },
  { uf: "AL", city: "Maceio", work: "Operacao regional" },
  { uf: "MS", city: "Campo Grande", work: "Historico em agua, esgoto e sistema comercial" },
  { uf: "MA", city: "Sao Jose de Ribamar e Paco do Lumiar", work: "Historico de concessao, operacao e gestao comercial" },
  { uf: "AC", city: "Rio Branco", work: "Melhoria operacional, cadastro, pitometria e reducao de vazamentos" }
];

const clientRegions = [
  {
    id: "norte",
    name: "Norte",
    states: ["ac", "ro", "rr"],
    clients: ["CAERD", "CAER"],
    description: "Operacoes regionais, melhoria operacional, cadastro tecnico, pitometria e reducao de vazamentos."
  },
  {
    id: "nordeste",
    name: "Nordeste",
    states: ["pe", "al", "ma"],
    clients: ["COMPESA", "CAGEPA", "IGUA", "CAGECE"],
    description: "Contratos e historico em otimizacao de rede, perdas, concessoes e suporte regional."
  },
  {
    id: "sudeste",
    name: "Sudeste",
    states: ["sp", "es"],
    clients: ["SABESP", "Telefonica", "COPASA", "CESAN", "SAEMAS", "SAERP", "SAAE", "SEMAE", "AGUAS DO RIO", "Rio+ Saneamento"],
    description: "Maior concentracao de operacoes, premios SABESP, automacao, TACE, obras, perdas e gestao comercial."
  },
  {
    id: "sul",
    name: "Sul",
    states: ["rs"],
    clients: ["CORSAN", "SANEPAR", "DMAE", "SAMAE"],
    description: "Operacoes regionais e relacionamento com autarquias e companhias de saneamento."
  },
  {
    id: "centro-oeste",
    name: "Centro-Oeste",
    states: ["ms"],
    clients: ["SANESUL"],
    description: "Historico em agua, esgoto, sistema comercial e desenvolvimento operacional."
  }
];

type BrazilState = {
  id: string;
  name: string;
  path: string;
};

const brazilStates = brazil.locations as BrazilState[];
const activeStateIds = new Set(locations.map((location) => location.uf.toLowerCase()));
const stateById = new Map(locations.map((location) => [location.uf.toLowerCase(), location]));
const regionByState = new Map(clientRegions.flatMap((region) => region.states.map((state) => [state, region])));

const gallery = [
  ["ETA", "/images/banner-home-02.jpg"],
  ["ETE", "/images/banner-home-03.jpg"],
  ["Redes", "/images/banner-home-04.jpg"],
  ["Equipes", "/images/banner-home-05.jpg"],
  ["Campo", "/images/banner-home-06.jpg"],
  ["Automacao", "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80"]
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const totalFrames = 70;
    const tick = () => {
      frame += 1;
      setDisplay(Math.round((value * frame) / totalFrames));
      if (frame < totalFrames) requestAnimationFrame(tick);
    };
    tick();
  }, [inView, value]);

  return (
    <div ref={ref} className="text-4xl font-black tracking-normal text-[var(--enorsul-red)] md:text-5xl">
      {display}
      {suffix}
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  text
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-[var(--enorsul-red)]">{eyebrow}</p>
      <h2 className="text-3xl font-black tracking-normal text-slate-950 dark:text-white md:text-5xl">{title}</h2>
      {text ? <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">{text}</p> : null}
    </motion.div>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLocation, setActiveLocation] = useState(locations[0]);
  const [activeRegion, setActiveRegion] = useState(clientRegions[2]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { y: 38, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out" }
      );
      gsap.to(".hero-water", {
        yPercent: 7,
        scale: 1.04,
        scrollTrigger: undefined,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const headerClass = scrolled || menuOpen
    ? "border-b border-slate-200/80 bg-white/94 text-slate-950 shadow-lg shadow-slate-950/5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/94 dark:text-white"
    : "border-b border-white/10 bg-white/6 text-white backdrop-blur-md";

  return (
    <main id="inicio" className="overflow-hidden text-slate-950 dark:text-white">
      <header className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${headerClass}`}>
        <div className="section-shell flex h-18 items-center justify-between gap-4 md:h-20">
          <a href="#inicio" className="flex items-center gap-3" aria-label="Enorsul inicio">
            <span className="inline-flex h-12 w-[122px] items-center md:h-14 md:w-[146px]">
              <Image src="/logo/enorsul.svg" alt="Enorsul Saneamento" width={295} height={145} priority className="h-auto w-full" />
            </span>
          </a>
          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-5 text-sm font-semibold lg:flex xl:gap-6">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="transition hover:text-[var(--enorsul-red)]">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark((value) => !value)}
              className="grid h-11 w-11 place-items-center rounded-full border border-current/15 transition hover:border-[var(--enorsul-light-blue)] hover:text-[var(--enorsul-light-blue)]"
              aria-label="Alternar modo escuro"
            >
              {dark ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <a href="#contato" className="hidden rounded-full bg-[var(--enorsul-red)] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition hover:bg-[var(--enorsul-dark-red)] md:inline-flex">
              Solicitar Contato
            </a>
            <button
              onClick={() => setMenuOpen((value) => !value)}
              className="grid h-11 w-11 place-items-center rounded-full border border-current/15 lg:hidden"
              aria-label="Abrir menu"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <div className="border-t border-slate-200 bg-white px-4 pb-5 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
            <div className="mx-auto grid max-w-md gap-1 pt-3">
              {navItems.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded px-3 py-3 font-semibold hover:bg-slate-100 dark:hover:bg-slate-900">
                  {label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <section ref={heroRef} className="relative min-h-[92vh] overflow-hidden bg-slate-950 pt-24 text-white">
        <Image
          src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=2200&q=84"
          alt="Equipe tecnica em infraestrutura industrial de saneamento"
          fill
          priority
          className="hero-water object-cover opacity-72"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,17,31,.88),rgba(6,17,31,.56),rgba(27,120,181,.18))]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#f7fafc] to-transparent dark:from-[#06111f]" />
        <div className="absolute inset-0 water-grid opacity-30" />
        <div className="section-shell relative z-10 grid min-h-[calc(92vh-96px)] items-center pb-28 pt-14">
          <div className="max-w-3xl">
            <div className="hero-reveal mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-white/24 bg-slate-950/30 px-4 py-2 text-xs font-semibold backdrop-blur sm:text-sm">
              <Waves size={18} className="text-[var(--enorsul-light-blue)]" />
              ENORSUL 2026 - Engenharia, Operacao e Inteligencia em Saneamento
            </div>
            <h1 className="hero-reveal max-w-3xl text-4xl font-black leading-[1.03] tracking-normal sm:text-5xl md:text-6xl xl:text-7xl">
              Solucoes Inteligentes em Saneamento para Todo o Brasil
            </h1>
            <p className="hero-reveal mt-6 max-w-2xl text-lg leading-8 text-slate-100 md:text-2xl">
              Operacao, engenharia, automacao e tecnologia aplicadas ao saneamento.
            </p>
            <div className="hero-reveal mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#quem-somos" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--enorsul-red)] px-7 py-4 font-bold text-white transition hover:bg-[var(--enorsul-dark-red)]">
                Conheca a Enorsul <ArrowRight size={18} />
              </a>
              <a href="#servicos" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur transition hover:bg-white/20">
                Nossos Servicos <ChevronDown size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-20 z-20 pb-16">
        <div className="section-shell grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/8 dark:border-slate-800 dark:bg-slate-900"
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="mt-3 text-base font-black text-slate-950 dark:text-white">{stat.label}</p>
              <p className="mt-1 text-sm font-semibold leading-6 text-slate-500 dark:text-slate-300">{stat.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="quem-somos" className="bg-transparent py-20">
        <div className="section-shell grid items-center gap-12 lg:grid-cols-[.95fr_1.05fr]">
          <motion.div initial={{ opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative min-h-[520px] overflow-hidden rounded-lg">
            <Image src="/images/banner-enorsul.jpg" alt="Equipe operacional Enorsul" fill className="object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/80 to-transparent p-7 text-white">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--enorsul-light-blue)]">Desde 1990</p>
              <p className="mt-2 text-2xl font-black">Presenca tecnica em campo e em centros de controle.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-[var(--enorsul-red)]">Quem Somos</p>
            <h2 className="text-3xl font-black tracking-normal md:text-5xl">Uma empresa nacional de engenharia e saneamento com operacao real.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Criada em 1990 como Emissao Engenharia e Construcoes e consolidada em 2005 como Enorsul, a empresa atua em solucoes de saneamento basico com tecnologia, treinamento de profissionais e parcerias tecnicas.
            </p>
            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
              A capacidade da Enorsul nasce da combinacao entre engenharia, operacao de campo, sistemas informatizados, automacao, telemetria e profundo conhecimento das estruturas das companhias de saneamento.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Abastecimento de agua", "Esgotamento sanitario", "Controle de perdas", "Gestao comercial"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm dark:bg-slate-900">
                  <CheckCircle2 className="text-[var(--enorsul-blue)]" />
                  <span className="font-bold">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="servicos" className="bg-white py-20 dark:bg-slate-950">
        <div className="section-shell">
          <SectionTitle
            eyebrow="Servicos"
            title="Da operacao ao dado: saneamento com engenharia aplicada."
            text="Frentes extraidas do site institucional atual da Enorsul e reorganizadas para comunicar valor, escala e tecnologia."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  className="group rounded-lg border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-[var(--enorsul-light-blue)] hover:shadow-2xl hover:shadow-sky-900/10 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="mb-6 grid h-13 w-13 place-items-center rounded bg-[var(--enorsul-blue)] text-white transition group-hover:bg-[var(--enorsul-red)]">
                    <Icon size={25} />
                  </div>
                  <h3 className="text-xl font-black">{service.title}</h3>
                  <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{service.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="tecnologia" className="relative overflow-hidden bg-white py-24 dark:bg-slate-950">
        <Image src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1800&q=80" alt="Centro operacional com dashboards" fill className="object-cover opacity-12 dark:opacity-18" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/72 dark:from-slate-950 dark:via-slate-950/90 dark:to-slate-950/72" />
        <div className="section-shell relative z-10 grid items-center gap-10 lg:grid-cols-[.92fr_1.08fr]">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-[var(--enorsul-red)]">Tecnologia</p>
            <h2 className="text-3xl font-black tracking-normal md:text-5xl">Transformando dados em eficiencia operacional.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              A Enorsul ja conecta georreferenciamento, automacao e controle operacional. O novo site transforma esse ativo em narrativa central: dados servindo a redes, equipes, indicadores e decisoes de campo.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white/92 p-6 shadow-xl shadow-slate-950/8 backdrop-blur dark:border-slate-800 dark:bg-slate-900/92">
            <div className="grid gap-4 sm:grid-cols-2">
              {techPillars.map((pillar) => (
                <div key={pillar} className="flex items-center gap-3 rounded border border-slate-200 bg-slate-50 p-4 text-slate-950 dark:border-slate-700 dark:bg-slate-950/70 dark:text-white">
                  <Radar className="shrink-0 text-[var(--enorsul-blue)] dark:text-[var(--enorsul-light-blue)]" />
                  <span className="font-bold leading-6">{pillar}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-slate-950 p-5 text-white">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-bold">Painel operacional</span>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">online</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {["Perdas", "Pressao", "Vazao"].map((metric, index) => (
                  <div key={metric} className="rounded bg-white/8 p-4">
                    <BarChart3 className="mb-4 text-[var(--enorsul-light-blue)]" />
                    <p className="text-sm text-slate-300">{metric}</p>
                    <p className="mt-1 text-2xl font-black">{[18, 42, 76][index]}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="section-shell">
          <SectionTitle eyebrow="Cases" title="Problemas complexos tratados como sistemas integrados." />
          <div className="grid gap-5 md:grid-cols-5">
            {cases.map(([title, text]) => (
              <motion.article key={title} whileHover={{ y: -6 }} className="rounded-lg border border-white/10 bg-white/6 p-5">
                <Droplets className="mb-5 text-[var(--enorsul-light-blue)]" />
                <h3 className="text-lg font-black">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-300">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="premiacoes" className="py-20">
        <div className="section-shell">
          <SectionTitle eyebrow="Premiacoes" title="Reconhecimentos que provam campo, resultado e inovacao." />
          <div className="overflow-x-auto pb-4">
            <div className="flex min-w-[980px] gap-5">
              {awards.map(([year, title, text], index) => (
                <motion.article
                  key={`${year}-${title}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="relative w-[300px] shrink-0 rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <Trophy className="text-[var(--enorsul-red)]" />
                    <span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-black text-[var(--enorsul-blue)] dark:bg-sky-950">{year}</span>
                  </div>
                  <h3 className="text-lg font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="atuacao" className="relative overflow-hidden bg-white py-20 dark:bg-slate-950">
        <div className="absolute inset-0 opacity-70 dark:opacity-20">
          <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(77,180,231,.26),transparent_28%),radial-gradient(circle_at_78%_76%,rgba(27,120,181,.18),transparent_24%)]" />
        </div>
        <div className="section-shell relative z-10">
          <SectionTitle
            eyebrow="Clientes e Atuacao"
            title="Presenca nacional conectada a companhias, autarquias e operacoes regionais."
            text="Uma leitura inspirada no mapa institucional atual da Enorsul, agora com estados reais, regioes interativas e marcas destacadas por area de atendimento."
          />

          <div className="grid gap-6 lg:grid-cols-[260px_1fr_300px]">
            <div className="space-y-4">
              {clientRegions.slice(0, 2).map((region) => (
                <button
                  key={region.id}
                  onClick={() => setActiveRegion(region)}
                  className={`w-full rounded-lg border p-4 text-left transition hover:-translate-y-0.5 ${
                    activeRegion.id === region.id
                      ? "border-[var(--enorsul-red)] bg-white shadow-xl shadow-red-950/10 dark:bg-slate-900"
                      : "border-slate-200 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
                  }`}
                >
                  <span className="text-sm font-black uppercase tracking-[0.2em] text-[var(--enorsul-red)]">{region.name}</span>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {region.clients.map((client) => (
                      <span key={client} className="rounded bg-sky-50 px-3 py-2 text-sm font-black text-[var(--enorsul-blue)] dark:bg-slate-950 dark:text-[var(--enorsul-light-blue)]">
                        {client}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            <div className="relative rounded-lg border border-slate-200 bg-[linear-gradient(145deg,#ffffff,#e9f7ff)] p-5 shadow-xl shadow-slate-950/8 dark:border-slate-800 dark:bg-[linear-gradient(145deg,#08192a,#06111f)] md:p-8">
              <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/85 px-5 py-3 text-center shadow-lg dark:bg-slate-950/85 md:block">
                <p className="text-sm font-bold text-slate-500 dark:text-slate-300">Clientes</p>
                <Image src="/logo/enorsul.svg" alt="Enorsul Saneamento" width={126} height={62} className="mt-1 h-auto w-[126px]" />
              </div>
              <svg viewBox={brazil.viewBox} role="img" aria-label="Mapa do Brasil com clientes e estados de atuacao da Enorsul" className="mx-auto aspect-square w-full max-w-[540px]">
                <defs>
                  <linearGradient id="mapActive" x1="0" x2="1">
                    <stop offset="0%" stopColor="#E30613" />
                    <stop offset="100%" stopColor="#B1000C" />
                  </linearGradient>
                  <linearGradient id="mapBase" x1="0" x2="1">
                    <stop offset="0%" stopColor="#7CC3EA" />
                    <stop offset="100%" stopColor="#1B78B5" />
                  </linearGradient>
                </defs>
                {brazilStates.map((state) => {
                  const location = stateById.get(state.id);
                  const region = regionByState.get(state.id);
                  const inActiveRegion = activeRegion.states.includes(state.id);
                  const active = activeLocation.uf.toLowerCase() === state.id;
                  const highlighted = activeStateIds.has(state.id);
                  return (
                    <path
                      key={state.id}
                      d={state.path}
                      onMouseEnter={() => {
                        if (location) setActiveLocation(location);
                        if (region) setActiveRegion(region);
                      }}
                      onFocus={() => {
                        if (location) setActiveLocation(location);
                        if (region) setActiveRegion(region);
                      }}
                      tabIndex={location ? 0 : -1}
                      className={`outline-none transition duration-200 ${location ? "cursor-pointer" : ""}`}
                      fill={active ? "url(#mapActive)" : inActiveRegion ? "#4DB4E7" : highlighted ? "url(#mapBase)" : "rgba(148,163,184,.28)"}
                      stroke={active || inActiveRegion ? "#ffffff" : "rgba(255,255,255,.9)"}
                      strokeWidth={active ? 2.8 : inActiveRegion ? 2 : 1.1}
                      opacity={highlighted || inActiveRegion || active ? 1 : 0.48}
                    >
                      <title>{location ? `${location.uf} - ${location.city}` : state.name}</title>
                    </path>
                  );
                })}
              </svg>

              <div className="mt-5 grid gap-3 rounded-lg bg-white/80 p-4 dark:bg-slate-950/70 sm:grid-cols-[auto_1fr]">
                <div className="flex items-center gap-2 text-sm font-black text-[var(--enorsul-red)]">
                  <MapPin size={18} /> {activeRegion.name}
                </div>
                <p className="text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">{activeRegion.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              {clientRegions.slice(2).map((region) => (
                <button
                  key={region.id}
                  onClick={() => setActiveRegion(region)}
                  className={`w-full rounded-lg border p-4 text-left transition hover:-translate-y-0.5 ${
                    activeRegion.id === region.id
                      ? "border-[var(--enorsul-red)] bg-white shadow-xl shadow-red-950/10 dark:bg-slate-900"
                      : "border-slate-200 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
                  }`}
                >
                  <span className="text-sm font-black uppercase tracking-[0.2em] text-[var(--enorsul-red)]">{region.name}</span>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {region.clients.map((client) => (
                      <span key={client} className="rounded bg-sky-50 px-3 py-2 text-sm font-black text-[var(--enorsul-blue)] dark:bg-slate-950 dark:text-[var(--enorsul-light-blue)]">
                        {client}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-slate-200 bg-white/80 p-4 text-sm font-semibold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300">
            <strong className="text-slate-950 dark:text-white">{activeLocation.uf} - {activeLocation.city}:</strong> {activeLocation.work}
          </div>
        </div>
      </section>

      <section id="obras" className="py-20">
        <div className="section-shell">
          <SectionTitle eyebrow="Galeria de Obras" title="Infraestrutura, equipes e automacao em primeiro plano." />
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {gallery.map(([category, src], index) => (
              <motion.figure
                key={category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative mb-5 break-inside-avoid overflow-hidden rounded-lg ${index % 2 ? "h-80" : "h-60"}`}
              >
                <Image src={src} alt={category} fill className="object-cover transition duration-700 hover:scale-105" />
                <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-sm font-black text-slate-950">
                  {category}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <footer id="contato" className="relative overflow-hidden bg-white text-slate-950 dark:bg-[#06111f] dark:text-white">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--enorsul-red)] via-[var(--enorsul-blue)] to-[var(--enorsul-light-blue)]" />
        <div className="section-shell py-14 md:py-18">
          <div className="grid gap-8 rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-xl shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-900 md:p-8 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <span className="inline-flex w-[190px]">
                <Image src="/logo/enorsul.svg" alt="Enorsul Saneamento" width={295} height={145} className="h-auto w-full" />
              </span>
              <h2 className="mt-7 max-w-2xl text-2xl font-black tracking-normal md:text-4xl">
                Engenharia, operacao e inteligencia para saneamento em escala nacional.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">
                Solucoes de campo, automacao, GIS, telemetria, controle operacional e gestao comercial para companhias, municipios e consorcios.
              </p>
            </div>
            <div className="grid gap-4 content-start">
              <a href="mailto:enorsul@enorsul.com.br" className="flex gap-4 rounded-lg bg-white p-4 shadow-sm transition hover:-translate-y-0.5 dark:bg-slate-950">
                <Mail className="shrink-0 text-[var(--enorsul-blue)]" />
                <span><strong className="block">E-mail</strong> enorsul@enorsul.com.br</span>
              </a>
              <a href="tel:+551155814700" className="flex gap-4 rounded-lg bg-white p-4 shadow-sm transition hover:-translate-y-0.5 dark:bg-slate-950">
                <Phone className="shrink-0 text-[var(--enorsul-blue)]" />
                <span><strong className="block">Telefone</strong> (11) 5581-4700</span>
              </a>
              <div className="flex gap-4 rounded-lg bg-white p-4 shadow-sm dark:bg-slate-950">
                <Navigation className="shrink-0 text-[var(--enorsul-blue)]" />
                <span><strong className="block">Sede operacional</strong> Av. Dr. Altino Arantes, 754, Vila Clementino, Sao Paulo - SP</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 border-t border-slate-200 py-7 text-sm font-semibold text-slate-500 dark:border-slate-800 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-4">
              {["Compliance", "LGPD", "Politica de Qualidade", "Integridade"].map((item) => (
                <a key={item} href="#contato" className="hover:text-[var(--enorsul-red)]">{item}</a>
              ))}
            </div>
            <a href="#inicio" className="inline-flex items-center gap-2 font-black text-[var(--enorsul-red)]">
              Voltar ao topo <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
