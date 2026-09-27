import {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  faculties,
  programs,
  researchAreas,
  researchCenters,
  researchers,
  publications,
  scholarships,
  news,
  events,
  leadership,
  staticPages,
  internationalConnections,
  type StaticPage,
} from "./content";
import { ui, useLanguage, type Localized } from "./i18n";
import type { SceneVariant } from "./ThreeStage";

const ThreeStage = lazy(() => import("./ThreeStage"));
gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&q=82&w=1800";
const GRAD_IMAGE =
  "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&q=82&w=1800";
const CAREER_REFERENCE =
  "https://www.magnific.com/free-video/back-view-unrecognizable-business-couple-climbing-up-stairs-outdoors_2791853";

function useReveal() {
  const location = useLocation();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          },
        );
      });
      const heroPlane =
        document.querySelector<HTMLElement>(".hero-image-plane");
      if (heroPlane)
        gsap.to(heroPlane, {
          yPercent: 10,
          rotateY: -4,
          ease: "none",
          scrollTrigger: {
            trigger: ".home-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      const graduationImage = document.querySelector<HTMLElement>(
        ".graduation-section img",
      );
      if (graduationImage)
        gsap.fromTo(
          graduationImage,
          { yPercent: -8, scale: 1.08 },
          {
            yPercent: 4,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".graduation-section",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      const stairs = document.querySelector<HTMLElement>(".career-stairs");
      if (stairs)
        gsap.fromTo(
          stairs,
          { xPercent: 14, opacity: 0.35 },
          {
            xPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".career-cinema",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
    });
    return () => ctx.revert();
  }, [location.pathname]);
}

function useIntersectionPerformanceHints() {
  const location = useLocation();
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.inView = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "240px 0px" },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [location.pathname]);
}

function useSeo(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} · Aurelia International University`;
    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
    const ogTitle = document.querySelector<HTMLMetaElement>(
      'meta[property="og:title"]',
    );
    const ogDescription = document.querySelector<HTMLMetaElement>(
      'meta[property="og:description"]',
    );
    if (ogTitle) ogTitle.content = title;
    if (ogDescription) ogDescription.content = description;
  }, [title, description]);
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function Stage({
  variant = "network",
  className = "",
}: {
  variant?: SceneVariant;
  className?: string;
}) {
  return (
    <Suspense
      fallback={
        <div
          className={`three-stage stage-fallback ${className}`}
          aria-hidden="true"
        />
      }
    >
      <ThreeStage variant={variant} className={className} />
    </Suspense>
  );
}

function Brand() {
  return (
    <Link
      to="/"
      className="brand"
      aria-label="Aurelia International University home"
    >
      <span className="brand-mark">A</span>
      <span>
        <strong>Aurelia</strong>
        <small>International University</small>
      </span>
    </Link>
  );
}

const navGroups = [
  {
    label: { en: "Academics", fr: "Études" },
    links: [
      ["/academics", { en: "Overview", fr: "Vue d’ensemble" }],
      ["/faculties", { en: "Faculties", fr: "Facultés" }],
      ["/programs", { en: "Programs", fr: "Programmes" }],
    ],
  },
  {
    label: { en: "Admissions", fr: "Admissions" },
    links: [
      ["/admissions", { en: "Overview", fr: "Vue d’ensemble" }],
      ["/admissions/requirements", { en: "Requirements", fr: "Conditions" }],
      ["/admissions/scholarships", { en: "Scholarships", fr: "Bourses" }],
      ["/apply", { en: "Apply", fr: "Postuler" }],
    ],
  },
  {
    label: { en: "Research", fr: "Recherche" },
    links: [
      ["/research", { en: "Overview", fr: "Vue d’ensemble" }],
      ["/research/centers", { en: "Centers", fr: "Centres" }],
      ["/research/researchers", { en: "Researchers", fr: "Chercheurs" }],
      ["/research/publications", { en: "Publications", fr: "Publications" }],
    ],
  },
  {
    label: { en: "Experience", fr: "Expérience" },
    links: [
      ["/campus-life", { en: "Campus Life", fr: "Vie de campus" }],
      ["/international", { en: "International", fr: "International" }],
      ["/events", { en: "Events", fr: "Événements" }],
      ["/alumni", { en: "Alumni", fr: "Anciens" }],
    ],
  },
  {
    label: { en: "University", fr: "Université" },
    links: [
      ["/about", { en: "About", fr: "À propos" }],
      ["/leadership", { en: "Leadership", fr: "Direction" }],
      ["/directory", { en: "Directory", fr: "Annuaire" }],
      ["/contact", { en: "Contact", fr: "Contact" }],
    ],
  },
] as const;

function Header() {
  const { lang, setLang, pick } = useLanguage();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {pick(ui.menu)}
        </button>
        <nav
          id="main-nav"
          className={open ? "main-nav is-open" : "main-nav"}
          aria-label={
            lang === "en" ? "Main navigation" : "Navigation principale"
          }
        >
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label.en}>
              <span className="nav-label">{pick(group.label)}</span>
              <div className="nav-flyout">
                {group.links.map(([to, label]) => (
                  <NavLink key={to} to={to}>
                    {pick(label)}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="header-actions">
          <div
            className="language-switch"
            aria-label={
              lang === "en" ? "Language switcher" : "Sélecteur de langue"
            }
          >
            <button
              className={lang === "en" ? "active" : ""}
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
            <span>|</span>
            <button
              className={lang === "fr" ? "active" : ""}
              onClick={() => setLang("fr")}
              aria-pressed={lang === "fr"}
            >
              FR
            </button>
          </div>
          <Link to="/apply" className="button button-small">
            {pick(ui.applyNow)}
          </Link>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const { pick } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Brand />
          <p>
            {pick({
              en: "A fictional university platform concept built to demonstrate a complete bilingual digital admissions and academic journey.",
              fr: "Un concept fictif de plateforme universitaire démontrant un parcours académique et d’admission bilingue complet.",
            })}
          </p>
        </div>
        <div>
          <strong>{pick({ en: "Explore", fr: "Explorer" })}</strong>
          <Link to="/programs">
            {pick({ en: "Programs", fr: "Programmes" })}
          </Link>
          <Link to="/research">
            {pick({ en: "Research", fr: "Recherche" })}
          </Link>
          <Link to="/campus-life">
            {pick({ en: "Campus Life", fr: "Vie de campus" })}
          </Link>
        </div>
        <div>
          <strong>{pick({ en: "Plan", fr: "Préparer" })}</strong>
          <Link to="/admissions">
            {pick({ en: "Admissions", fr: "Admissions" })}
          </Link>
          <Link to="/admissions/scholarships">
            {pick({ en: "Scholarships", fr: "Bourses" })}
          </Link>
          <Link to="/international">
            {pick({
              en: "International Students",
              fr: "Étudiants internationaux",
            })}
          </Link>
        </div>
        <div>
          <strong>{pick({ en: "Connect", fr: "Se connecter" })}</strong>
          <Link to="/news">{pick({ en: "News", fr: "Actualités" })}</Link>
          <Link to="/events">{pick({ en: "Events", fr: "Événements" })}</Link>
          <Link to="/contact">{pick({ en: "Contact", fr: "Contact" })}</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Aurelia International University</span>
        <span>
          {pick({
            en: "Prototype content · Not a real admissions service",
            fr: "Contenu de prototype · Pas un service d’admission réel",
          })}
        </span>
      </div>
    </footer>
  );
}

function Layout({ children }: { children: ReactNode }) {
  useReveal();
  useIntersectionPerformanceHints();
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function PageHero({
  eyebrow,
  title,
  intro,
  scene = "network",
  actions,
  compact = false,
}: {
  eyebrow: Localized;
  title: Localized;
  intro: Localized;
  scene?: SceneVariant;
  actions?: ReactNode;
  compact?: boolean;
}) {
  const { pick } = useLanguage();
  return (
    <section className={`page-hero ${compact ? "compact" : ""}`}>
      <Stage variant={scene} />
      <div className="page-hero-glow" />
      <div className="container page-hero-content" data-reveal>
        <p className="eyebrow">{pick(eyebrow)}</p>
        <h1>{pick(title)}</h1>
        <p className="lead">{pick(intro)}</p>
        {actions && <div className="hero-actions">{actions}</div>}
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: Localized;
  title: Localized;
  intro?: Localized;
}) {
  const { pick } = useLanguage();
  return (
    <div className="section-header" data-reveal>
      {eyebrow && <p className="eyebrow">{pick(eyebrow)}</p>}
      <h2>{pick(title)}</h2>
      {intro && <p>{pick(intro)}</p>}
    </div>
  );
}

function HomePage() {
  const { pick } = useLanguage();
  useSeo(
    pick({ en: "Shape Your Future", fr: "Construisez Votre Avenir" }),
    pick({
      en: "Explore programs, admissions, research and student life at Aurelia International University.",
      fr: "Explorez les programmes, admissions, la recherche et la vie étudiante à Aurelia International University.",
    }),
  );
  const stats = [
    ["10,000+", { en: "Students", fr: "Étudiants" }],
    ["50+", { en: "Programs", fr: "Programmes" }],
    ["30+", { en: "Research Areas", fr: "Axes de recherche" }],
    ["95%", { en: "Graduate Employment", fr: "Insertion des diplômés" }],
    ["40+", { en: "International Partners", fr: "Partenaires internationaux" }],
  ] as const;
  return (
    <>
      <section className="home-hero">
        <Stage variant="hero" className="home-canvas" />
        <div className="hero-image-plane">
          <img
            src={HERO_IMAGE}
            alt={pick({
              en: "Graduate in academic cap and gown",
              fr: "Diplômée en tenue académique",
            })}
          />
        </div>
        <div className="hero-vignette" />
        <div className="container home-hero-content" data-reveal>
          <p className="eyebrow">
            {pick({
              en: "Aurelia International University",
              fr: "Université internationale Aurelia",
            })}
          </p>
          <h1>
            {pick({ en: "Shape Your Future", fr: "Construisez Votre Avenir" })}
          </h1>
          <p className="lead">
            {pick({
              en: "Education built for ambitious minds, meaningful work and a world in motion.",
              fr: "Une formation pour les esprits ambitieux, le travail qui compte et un monde en mouvement.",
            })}
          </p>
          <div className="hero-actions">
            <Link className="button" to="/programs">
              {pick(ui.explorePrograms)}
            </Link>
            <Link className="button button-ghost" to="/apply">
              {pick(ui.applyNow)}
            </Link>
          </div>
        </div>
        <a
          href="#intro"
          className="scroll-cue"
          aria-label={pick({
            en: "Scroll to university introduction",
            fr: "Aller à la présentation de l’université",
          })}
        >
          ↓
        </a>
      </section>

      <section id="intro" className="section container intro-section">
        <SectionHeader
          eyebrow={{
            en: "A university for possibility",
            fr: "Une université des possibles",
          }}
          title={{
            en: "Where Knowledge Meets Possibility.",
            fr: "Là où le savoir rencontre les possibles.",
          }}
          intro={{
            en: "Interdisciplinary programs, applied research and a globally connected campus help students turn curiosity into capability.",
            fr: "Programmes interdisciplinaires, recherche appliquée et campus connecté au monde transforment la curiosité en capacité d’agir.",
          }}
        />
        <div className="stats-grid">
          {stats.map(([value, label]) => (
            <article className="stat" key={value}>
              <strong>{value}</strong>
              <span>{pick(label)}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-tonal">
        <div className="container">
          <SectionHeader
            eyebrow={{
              en: "Academic highlights",
              fr: "Points forts académiques",
            }}
            title={{
              en: "Choose a discipline. Build across boundaries.",
              fr: "Choisissez une discipline. Apprenez au-delà des frontières.",
            }}
          />
          <div className="card-grid three">
            {faculties.slice(0, 6).map((faculty, index) => (
              <Link
                className="glass-card tilt-card"
                data-reveal
                key={faculty.slug}
                to={`/faculties/${faculty.slug}`}
              >
                <span className="card-index">0{index + 1}</span>
                <h3>{pick(faculty.name)}</h3>
                <p>{pick(faculty.summary)}</p>
                <span className="text-link">{pick(ui.learnMore)} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section container split-showcase">
        <div data-reveal>
          <p className="eyebrow">
            {pick({
              en: "Research & innovation",
              fr: "Recherche et innovation",
            })}
          </p>
          <h2>
            {pick({
              en: "Research that moves through the world.",
              fr: "Une recherche qui agit dans le monde.",
            })}
          </h2>
          <p>
            {pick({
              en: "From responsible AI to climate resilience and public health, research teams work across disciplines and with real partners.",
              fr: "De l’IA responsable à la résilience climatique et à la santé publique, les équipes travaillent entre disciplines et avec des partenaires réels.",
            })}
          </p>
          <Link to="/research" className="button button-ghost">
            {pick({ en: "Explore research", fr: "Explorer la recherche" })}
          </Link>
        </div>
        <div className="visual-shell">
          <Stage variant="network" />
        </div>
      </section>

      <section className="section section-tonal">
        <div className="container split-showcase reverse">
          <div className="visual-shell">
            <Stage variant="campus" />
          </div>
          <div data-reveal>
            <p className="eyebrow">
              {pick({ en: "Student experience", fr: "Expérience étudiante" })}
            </p>
            <h2>
              {pick({
                en: "A campus designed for momentum.",
                fr: "Un campus conçu pour avancer.",
              })}
            </h2>
            <p>
              {pick({
                en: "Clubs, sport, residences, wellbeing, careers and a 24/7 learning commons create room to grow beyond the classroom.",
                fr: "Clubs, sport, résidences, bien-être, carrières et espaces d’apprentissage créent les conditions pour progresser au-delà des cours.",
              })}
            </p>
            <Link to="/campus-life" className="button button-ghost">
              {pick({
                en: "Explore campus life",
                fr: "Explorer la vie de campus",
              })}
            </Link>
          </div>
        </div>
      </section>

      <section className="graduation-section">
        <img
          src={GRAD_IMAGE}
          alt={pick({
            en: "Large group of graduates in light blue gowns at a ceremony",
            fr: "Grand groupe de diplômés en toges bleu clair lors d’une cérémonie",
          })}
        />
        <div className="graduation-overlay" />
        <div className="container graduation-copy" data-reveal>
          <p className="eyebrow">
            {pick({ en: "Graduation", fr: "Remise des diplômes" })}
          </p>
          <h2>
            {pick({
              en: "A milestone. Not a finish line.",
              fr: "Une étape. Pas une ligne d’arrivée.",
            })}
          </h2>
          <p>
            {pick({
              en: "Graduation marks the point where learning becomes contribution — in research, industry, communities and new ventures.",
              fr: "La remise des diplômes marque le moment où l’apprentissage devient contribution — en recherche, dans l’industrie, les communautés et l’entrepreneuriat.",
            })}
          </p>
        </div>
      </section>

      <section className="career-cinema section">
        <div className="career-stairs" aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} style={{ "--i": i } as CSSProperties} />
          ))}
        </div>
        <div className="container career-copy" data-reveal>
          <p className="eyebrow">
            {pick({ en: "Career / future", fr: "Carrière / avenir" })}
          </p>
          <h2>{pick({ en: "Keep climbing.", fr: "Continuez à avancer." })}</h2>
          <p>
            {pick({
              en: "Career learning is built into programs through projects, internships, employer engagement and an active alumni network.",
              fr: "Le développement professionnel est intégré aux cursus grâce aux projets, stages, relations employeurs et au réseau des anciens.",
            })}
          </p>
          <div className="hero-actions">
            <Link className="button" to="/campus-life/career-center">
              {pick({
                en: "Meet the Career Center",
                fr: "Découvrir le Centre de carrière",
              })}
            </Link>
            <a
              className="button button-ghost"
              href={CAREER_REFERENCE}
              target="_blank"
              rel="noreferrer"
            >
              {pick({
                en: "View supplied visual reference ↗",
                fr: "Voir la référence visuelle fournie ↗",
              })}
            </a>
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="container" data-reveal>
          <p className="eyebrow">Aurelia</p>
          <h2>
            {pick({
              en: "Your Future Is Waiting.",
              fr: "Votre Avenir Vous Attend.",
            })}
          </h2>
          <div className="hero-actions">
            <Link to="/programs" className="button">
              {pick(ui.explorePrograms)}
            </Link>
            <Link to="/apply" className="button button-ghost">
              {pick(ui.applyNow)}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function AcademicsPage() {
  const { pick } = useLanguage();
  useSeo(
    pick({ en: "Academics", fr: "Études" }),
    pick({
      en: "Explore Aurelia faculties, programs and academic discovery.",
      fr: "Explorez les facultés, programmes et parcours académiques d’Aurelia.",
    }),
  );
  return (
    <>
      <PageHero
        eyebrow={{ en: "Academics", fr: "Études" }}
        title={{
          en: "Learn deeply. Connect widely.",
          fr: "Approfondir. Relier. Agir.",
        }}
        intro={{
          en: "Programs combine disciplinary depth, projects and interdisciplinary options so knowledge can travel into practice.",
          fr: "Les programmes associent profondeur disciplinaire, projets et options interdisciplinaires pour mettre les savoirs en pratique.",
        }}
        scene="network"
        actions={
          <>
            <Link to="/programs" className="button">
              {pick(ui.explorePrograms)}
            </Link>
            <Link to="/faculties" className="button button-ghost">
              {pick({ en: "Meet the faculties", fr: "Découvrir les facultés" })}
            </Link>
          </>
        }
      />
      <section className="section container">
        <SectionHeader
          title={{
            en: "Seven faculties. One connected academic system.",
            fr: "Sept facultés. Un système académique connecté.",
          }}
        />
        <div className="card-grid three">
          {faculties.map((f) => (
            <Link
              to={`/faculties/${f.slug}`}
              className="glass-card"
              data-reveal
              key={f.slug}
            >
              <h3>{pick(f.name)}</h3>
              <p>{pick(f.summary)}</p>
              <span className="text-link">{pick(ui.viewDetails)} →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function FacultiesPage() {
  const { pick } = useLanguage();
  useSeo(
    pick({ en: "Faculties", fr: "Facultés" }),
    pick({
      en: "Explore Aurelia’s academic faculties.",
      fr: "Explorez les facultés académiques d’Aurelia.",
    }),
  );
  return (
    <>
      <PageHero
        eyebrow={{ en: "Academics", fr: "Études" }}
        title={{ en: "Faculties", fr: "Facultés" }}
        intro={{
          en: "Each faculty combines teaching, departments, research and student opportunities in a distinct academic community.",
          fr: "Chaque faculté rassemble enseignement, départements, recherche et opportunités étudiantes au sein d’une communauté académique.",
        }}
        compact
      />
      <section className="section container">
        <div className="card-grid two">
          {faculties.map((f) => (
            <Link
              className="glass-card feature-card"
              to={`/faculties/${f.slug}`}
              key={f.slug}
              data-reveal
            >
              <h2>{pick(f.name)}</h2>
              <p>{pick(f.summary)}</p>
              <span className="pill-row">
                {f.departments.slice(0, 2).map((d, i) => (
                  <span className="pill" key={i}>
                    {pick(d)}
                  </span>
                ))}
              </span>
              <span className="text-link">{pick(ui.viewDetails)} →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function FacultyPage() {
  const { slug } = useParams();
  const { pick } = useLanguage();
  const faculty = faculties.find((f) => f.slug === slug);
  if (!faculty) return <Navigate to="/404" replace />;
  const relatedPrograms = programs.filter((p) =>
    faculty.programs.includes(p.slug),
  );
  const facultyBySlug: Record<string, string> = {
    engineering: "Engineering",
    business: "Business",
    science: "Science",
    arts: "Arts & Design",
    "social-sciences": "Social Sciences",
    medicine: "Medicine & Health",
    technology: "Technology & Computing",
  };
  const relatedPeople = researchers
    .filter((r) => r.faculty.en === facultyBySlug[faculty.slug])
    .slice(0, 3);
  const relatedNews = news.slice(0, 2);
  useSeo(pick(faculty.name), pick(faculty.summary));
  return (
    <>
      <PageHero
        eyebrow={{ en: "Faculty", fr: "Faculté" }}
        title={faculty.name}
        intro={faculty.summary}
        scene="network"
        actions={
          <Link className="button" to={`/programs?faculty=${faculty.slug}`}>
            {pick({ en: "View programs", fr: "Voir les programmes" })}
          </Link>
        }
      />
      <section className="section container content-grid">
        <div data-reveal>
          <h2>{pick({ en: "Departments", fr: "Départements" })}</h2>
          <ul className="clean-list">
            {faculty.departments.map((d, i) => (
              <li key={i}>{pick(d)}</li>
            ))}
          </ul>
        </div>
        <div data-reveal>
          <h2>
            {pick({ en: "Research priorities", fr: "Priorités de recherche" })}
          </h2>
          <ul className="clean-list">
            {faculty.research.map((d, i) => (
              <li key={i}>{pick(d)}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section section-tonal">
        <div className="container">
          <SectionHeader
            title={{
              en: "Programs in this faculty",
              fr: "Programmes de cette faculté",
            }}
          />
          <div className="card-grid three">
            {relatedPrograms.map((p) => (
              <ProgramCard key={p.slug} program={p} />
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeader
          title={{ en: "Faculty members", fr: "Enseignants" }}
          intro={{
            en: "Researchers and teachers connected to this academic community.",
            fr: "Chercheurs et enseignants de cette communauté académique.",
          }}
        />
        <div className="card-grid three">
          {relatedPeople.map((r) => (
            <Link
              to={`/research/researchers/${r.slug}`}
              className="glass-card person-card"
              key={r.slug}
            >
              <div className="avatar">{r.name.split(" ").slice(-1)[0][0]}</div>
              <h3>{r.name}</h3>
              <p>{pick(r.position)}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="section section-tonal">
        <div className="container">
          <SectionHeader
            title={{
              en: "Related university news",
              fr: "Actualités associées",
            }}
          />
          <div className="card-grid two">
            {relatedNews.map((n) => (
              <Link to={`/news/${n.slug}`} className="glass-card" key={n.slug}>
                <p className="eyebrow">
                  {pick(n.category)} · {n.date}
                </p>
                <h3>{pick(n.title)}</h3>
                <p>{pick(n.summary)}</p>
              </Link>
            ))}
          </div>
          <div className="section-inline-cta">
            <div>
              <strong>
                {pick({ en: "Faculty contact", fr: "Contact de la faculté" })}
              </strong>
              <p>{faculty.slug}@aurelia.example</p>
            </div>
            <a
              className="button button-ghost"
              href={`mailto:${faculty.slug}@aurelia.example`}
            >
              {pick({
                en: "Email faculty office",
                fr: "Écrire au secrétariat",
              })}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function ProgramCard({ program }: { program: (typeof programs)[number] }) {
  const { pick } = useLanguage();
  return (
    <Link
      className="glass-card program-card tilt-card"
      data-reveal
      to={`/programs/${program.slug}`}
    >
      <div className="program-meta">
        <span>{pick(program.degree)}</span>
        <span>{pick(program.duration)}</span>
      </div>
      <h3>{pick(program.name)}</h3>
      <p>{pick(program.overview)}</p>
      <span className="text-link">{pick(ui.viewDetails)} →</span>
    </Link>
  );
}

function ProgramsPage() {
  const { pick } = useLanguage();
  const location = useLocation();
  const initialFaculty =
    new URLSearchParams(location.search).get("faculty") || "all";
  const [query, setQuery] = useState("");
  const [faculty, setFaculty] = useState(initialFaculty);
  const [degree, setDegree] = useState("all");
  const [duration, setDuration] = useState("all");
  const [mode, setMode] = useState("all");
  useSeo(
    pick({ en: "Program Finder", fr: "Recherche de programmes" }),
    pick({
      en: "Search and filter Aurelia degree programs.",
      fr: "Recherchez et filtrez les programmes d’Aurelia.",
    }),
  );
  const list = programs.filter((p) => {
    const q = query.toLowerCase();
    return (
      (!q ||
        `${p.name.en} ${p.name.fr} ${p.overview.en} ${p.overview.fr}`
          .toLowerCase()
          .includes(q)) &&
      (faculty === "all" || p.faculty === faculty) &&
      (degree === "all" || p.degree.en === degree) &&
      (duration === "all" || p.duration.en === duration) &&
      (mode === "all" || p.mode.en.includes(mode))
    );
  });
  const degrees = Array.from(new Set(programs.map((p) => p.degree.en)));
  const durations = Array.from(new Set(programs.map((p) => p.duration.en)));
  return (
    <>
      <PageHero
        eyebrow={{ en: "Program discovery", fr: "Découverte des programmes" }}
        title={{
          en: "Find the program that moves you forward.",
          fr: "Trouvez le programme qui vous fait avancer.",
        }}
        intro={{
          en: "Search by interest, then filter by faculty, degree, duration and study mode.",
          fr: "Recherchez par intérêt puis filtrez par faculté, diplôme, durée et mode d’étude.",
        }}
        compact
      />
      <section className="section container">
        <div className="filter-panel" data-reveal>
          <label>
            <span>{pick(ui.search)}</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={pick({
                en: "e.g. AI, engineering, public health",
                fr: "ex. IA, ingénierie, santé publique",
              })}
            />
          </label>
          <label>
            <span>{pick({ en: "Faculty", fr: "Faculté" })}</span>
            <select
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            >
              <option value="all">{pick(ui.all)}</option>
              {faculties.map((f) => (
                <option key={f.slug} value={f.slug}>
                  {pick(f.name)}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>{pick({ en: "Degree", fr: "Diplôme" })}</span>
            <select value={degree} onChange={(e) => setDegree(e.target.value)}>
              <option value="all">{pick(ui.all)}</option>
              {degrees.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </label>
          <label>
            <span>{pick({ en: "Duration", fr: "Durée" })}</span>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="all">{pick(ui.all)}</option>
              {durations.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </label>
          <label>
            <span>{pick({ en: "Study mode", fr: "Mode d’étude" })}</span>
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="all">{pick(ui.all)}</option>
              <option value="On campus">
                {pick({ en: "On campus", fr: "Sur campus" })}
              </option>
              <option value="Hybrid">
                {pick({ en: "Hybrid", fr: "Hybride" })}
              </option>
            </select>
          </label>
        </div>
        <p className="results-count">
          {list.length} {pick({ en: "programs", fr: "programmes" })}
        </p>
        {list.length ? (
          <div className="card-grid three">
            {list.map((p) => (
              <ProgramCard key={p.slug} program={p} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>
    </>
  );
}

function ProgramDetailPage() {
  const { slug } = useParams();
  const { pick } = useLanguage();
  const program = programs.find((p) => p.slug === slug);
  if (!program) return <Navigate to="/404" replace />;
  const faculty = faculties.find((f) => f.slug === program.faculty)!;
  const related = programs
    .filter((p) => p.faculty === program.faculty && p.slug !== program.slug)
    .slice(0, 3);
  useSeo(pick(program.name), pick(program.overview));
  return (
    <>
      <PageHero
        eyebrow={program.degree}
        title={program.name}
        intro={program.overview}
        scene="network"
        actions={
          <>
            <Link className="button" to={`/apply?program=${program.slug}`}>
              {pick(ui.applyNow)}
            </Link>
            <Link className="button button-ghost" to="/admissions/requirements">
              {pick({ en: "Entry requirements", fr: "Conditions d’admission" })}
            </Link>
          </>
        }
      />
      <section className="section container program-facts" data-reveal>
        <div>
          <span>{pick({ en: "Degree", fr: "Diplôme" })}</span>
          <strong>{pick(program.degree)}</strong>
        </div>
        <div>
          <span>{pick({ en: "Duration", fr: "Durée" })}</span>
          <strong>{pick(program.duration)}</strong>
        </div>
        <div>
          <span>{pick({ en: "Faculty", fr: "Faculté" })}</span>
          <strong>{pick(faculty.name)}</strong>
        </div>
        <div>
          <span>{pick({ en: "Study mode", fr: "Mode d’étude" })}</span>
          <strong>{pick(program.mode)}</strong>
        </div>
      </section>
      <section className="section container detail-sections">
        <DetailBlock
          title={{ en: "Entry requirements", fr: "Conditions d’admission" }}
          items={program.entry}
        />
        <DetailBlock
          title={{ en: "Curriculum", fr: "Programme d’études" }}
          items={program.curriculum}
        />
        <DetailBlock
          title={{ en: "Career opportunities", fr: "Débouchés" }}
          items={program.careers}
        />
        <DetailBlock
          title={{ en: "Skills you build", fr: "Compétences développées" }}
          items={program.skills}
        />
        <div className="detail-block" data-reveal>
          <h2>{pick({ en: "Fees", fr: "Frais" })}</h2>
          <p>{pick(program.fees)}</p>
          <Link to="/admissions/tuition-fees" className="text-link">
            {pick({
              en: "Understand tuition & funding",
              fr: "Comprendre les frais et financements",
            })}{" "}
            →
          </Link>
        </div>
        <div className="detail-block" data-reveal>
          <h2>
            {pick({
              en: "Application information",
              fr: "Informations de candidature",
            })}
          </h2>
          <p>
            {pick({
              en: "Applications are completed through the guided front-end workflow. This demo does not submit to a live university backend.",
              fr: "Les candidatures utilisent un parcours guidé côté interface. Cette démonstration n’envoie rien vers un système universitaire réel.",
            })}
          </p>
          <Link to={`/apply?program=${program.slug}`} className="button">
            {pick(ui.applyNow)}
          </Link>
        </div>
      </section>
      {related.length > 0 && (
        <section className="section section-tonal">
          <div className="container">
            <SectionHeader
              title={{ en: "Related programs", fr: "Programmes associés" }}
            />
            <div className="card-grid three">
              {related.map((p) => (
                <ProgramCard program={p} key={p.slug} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function DetailBlock({
  title,
  items,
}: {
  title: Localized;
  items: Localized[];
}) {
  const { pick } = useLanguage();
  return (
    <div className="detail-block" data-reveal>
      <h2>{pick(title)}</h2>
      <ul className="clean-list">
        {items.map((item, i) => (
          <li key={i}>{pick(item)}</li>
        ))}
      </ul>
    </div>
  );
}

function AdmissionsPage() {
  const { pick } = useLanguage();
  useSeo(
    pick({ en: "Admissions", fr: "Admissions" }),
    pick({
      en: "Understand Aurelia admissions, requirements, fees and scholarships.",
      fr: "Comprendre les admissions, conditions, frais et bourses d’Aurelia.",
    }),
  );
  const cards = [
    [
      "/admissions/requirements",
      { en: "Requirements", fr: "Conditions" },
      {
        en: "Undergraduate, graduate and international baselines.",
        fr: "Repères pour licence, cycle supérieur et international.",
      },
    ],
    [
      "/admissions/process",
      { en: "Application process", fr: "Processus de candidature" },
      {
        en: "A clear six-step journey from discovery to enrollment.",
        fr: "Un parcours clair en six étapes jusqu’à l’inscription.",
      },
    ],
    [
      "/admissions/tuition-fees",
      { en: "Tuition & fees", fr: "Frais de scolarité" },
      {
        en: "Program costs, planning and payment information.",
        fr: "Coûts des programmes, budget et paiements.",
      },
    ],
    [
      "/admissions/scholarships",
      { en: "Scholarships", fr: "Bourses" },
      {
        en: "Merit, STEM and community-leadership opportunities.",
        fr: "Aides au mérite, STEM et leadership communautaire.",
      },
    ],
    [
      "/admissions/faq",
      { en: "FAQ", fr: "FAQ" },
      {
        en: "Direct answers to common admissions questions.",
        fr: "Réponses directes aux questions fréquentes.",
      },
    ],
  ] as const;
  return (
    <>
      <PageHero
        eyebrow={{ en: "Admissions", fr: "Admissions" }}
        title={{
          en: "Your next chapter starts with a clear plan.",
          fr: "Votre prochain chapitre commence par un plan clair.",
        }}
        intro={{
          en: "Explore requirements, costs, scholarships and the application journey before you submit.",
          fr: "Explorez les conditions, coûts, bourses et le parcours avant de candidater.",
        }}
        scene="timeline"
        actions={
          <Link to="/apply" className="button">
            {pick(ui.applyNow)}
          </Link>
        }
      />
      <section className="section container">
        <div className="card-grid three">
          {cards.map(([to, title, body]) => (
            <Link to={to} className="glass-card" key={to} data-reveal>
              <h3>{pick(title)}</h3>
              <p>{pick(body)}</p>
              <span className="text-link">{pick(ui.learnMore)} →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function ScholarshipsPage() {
  const { pick } = useLanguage();
  useSeo(
    pick({ en: "Scholarships", fr: "Bourses" }),
    pick({
      en: "Explore scholarship opportunities at Aurelia.",
      fr: "Explorez les bourses disponibles à Aurelia.",
    }),
  );
  return (
    <>
      <PageHero
        eyebrow={{ en: "Admissions", fr: "Admissions" }}
        title={{ en: "Scholarships & funding", fr: "Bourses et financement" }}
        intro={{
          en: "Funding opportunities recognize academic strength, community leadership and high-potential STEM study.",
          fr: "Les aides reconnaissent l’excellence académique, le leadership communautaire et le potentiel en STEM.",
        }}
        compact
      />
      <section className="section container">
        <div className="card-grid three">
          {scholarships.map((s, i) => (
            <article className="glass-card" data-reveal key={i}>
              <h3>{pick(s.name)}</h3>
              <dl className="mini-dl">
                <dt>{pick({ en: "Eligibility", fr: "Éligibilité" })}</dt>
                <dd>{pick(s.eligibility)}</dd>
                <dt>{pick({ en: "Deadline", fr: "Date limite" })}</dt>
                <dd>{s.deadline}</dd>
                <dt>{pick({ en: "Coverage", fr: "Couverture" })}</dt>
                <dd>{pick(s.coverage)}</dd>
                <dt>{pick({ en: "Process", fr: "Procédure" })}</dt>
                <dd>{pick(s.process)}</dd>
              </dl>
            </article>
          ))}
        </div>
        <div className="section-inline-cta" data-reveal>
          <p>
            {pick({
              en: "Scholarship consideration never replaces the main admissions application.",
              fr: "La demande de bourse ne remplace jamais la candidature principale.",
            })}
          </p>
          <Link to="/apply" className="button">
            {pick(ui.applyNow)}
          </Link>
        </div>
      </section>
    </>
  );
}

function FaqPage() {
  const { pick } = useLanguage();
  const faqs = [
    [
      {
        en: "Can I apply before final exam results?",
        fr: "Puis-je postuler avant mes résultats finaux ?",
      },
      {
        en: "Yes. You can submit available records; an offer may be conditional on final verified results.",
        fr: "Oui. Vous pouvez soumettre les relevés disponibles ; l’offre peut être conditionnelle aux résultats finaux vérifiés.",
      },
    ],
    [
      {
        en: "Do international students need a visa?",
        fr: "Les étudiants internationaux ont-ils besoin d’un visa ?",
      },
      {
        en: "Usually yes, depending on citizenship and study location. Visa guidance follows admission and should be checked against official immigration rules.",
        fr: "En général oui, selon la nationalité et le lieu d’études. Les démarches suivent l’admission et doivent être vérifiées auprès des autorités officielles.",
      },
    ],
    [
      {
        en: "Can I change programs after applying?",
        fr: "Puis-je changer de programme après avoir postulé ?",
      },
      {
        en: "Before review, contact Admissions. After an offer, a change may require a fresh academic review.",
        fr: "Avant l’évaluation, contactez les Admissions. Après une offre, un changement peut nécessiter une nouvelle évaluation académique.",
      },
    ],
    [
      {
        en: "Is this site accepting real applications?",
        fr: "Ce site accepte-t-il de vraies candidatures ?",
      },
      {
        en: "No. The application is a complete front-end prototype and does not transmit data to a real university backend.",
        fr: "Non. La candidature est un prototype d’interface complet et ne transmet aucune donnée à un système universitaire réel.",
      },
    ],
  ];
  useSeo("FAQ", "Admissions questions and answers.");
  return (
    <>
      <PageHero
        eyebrow={{ en: "Admissions", fr: "Admissions" }}
        title={{ en: "Frequently asked questions", fr: "Questions fréquentes" }}
        intro={{
          en: "Practical answers for planning your application.",
          fr: "Des réponses pratiques pour préparer votre candidature.",
        }}
        compact
      />
      <section className="section container faq-list">
        {faqs.map(([q, a], i) => (
          <details key={i} data-reveal>
            <summary>{pick(q)}</summary>
            <p>{pick(a)}</p>
          </details>
        ))}
      </section>
    </>
  );
}

function ApplicationPage() {
  const { pick } = useLanguage();
  const location = useLocation();
  const programParam =
    new URLSearchParams(location.search).get("program") || "";
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationality: "",
    school: "",
    qualification: "",
    program: programParam,
    statement: "",
  });
  const steps = [
    { en: "Personal", fr: "Identité" },
    { en: "Contact", fr: "Contact" },
    { en: "Academic", fr: "Parcours" },
    { en: "Program", fr: "Programme" },
    { en: "Supporting", fr: "Compléments" },
  ];
  useSeo(
    pick({ en: "Apply", fr: "Postuler" }),
    pick({
      en: "Guided application prototype for Aurelia programs.",
      fr: "Prototype guidé de candidature aux programmes d’Aurelia.",
    }),
  );
  const validate = () => {
    const next: Record<string, string> = {};
    const req = (k: keyof typeof form, msg: string) => {
      if (!form[k].trim()) next[k] = msg;
    };
    if (step === 0) {
      req(
        "firstName",
        pick({ en: "First name is required.", fr: "Le prénom est requis." }),
      );
      req(
        "lastName",
        pick({ en: "Last name is required.", fr: "Le nom est requis." }),
      );
      req(
        "nationality",
        pick({
          en: "Nationality is required.",
          fr: "La nationalité est requise.",
        }),
      );
    }
    if (step === 1) {
      req(
        "email",
        pick({ en: "Email is required.", fr: "L’e-mail est requis." }),
      );
      if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
        next.email = pick({
          en: "Enter a valid email.",
          fr: "Saisissez un e-mail valide.",
        });
      req(
        "phone",
        pick({ en: "Phone is required.", fr: "Le téléphone est requis." }),
      );
    }
    if (step === 2) {
      req(
        "school",
        pick({ en: "School is required.", fr: "L’établissement est requis." }),
      );
      req(
        "qualification",
        pick({
          en: "Qualification is required.",
          fr: "Le diplôme est requis.",
        }),
      );
    }
    if (step === 3)
      req(
        "program",
        pick({ en: "Select a program.", fr: "Sélectionnez un programme." }),
      );
    if (step === 4 && form.statement.trim().length < 80)
      next.statement = pick({
        en: "Please write at least 80 characters.",
        fr: "Écrivez au moins 80 caractères.",
      });
    setErrors(next);
    return Object.keys(next).length === 0;
  };
  const next = () => {
    if (!validate()) return;
    if (step < 4) setStep(step + 1);
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setDone(true);
  };
  const set = (key: keyof typeof form, value: string) =>
    setForm({ ...form, [key]: value });
  if (done)
    return (
      <>
        <PageHero
          eyebrow={{
            en: "Application prototype",
            fr: "Prototype de candidature",
          }}
          title={{
            en: "Your form is complete.",
            fr: "Votre formulaire est complet.",
          }}
          intro={{
            en: "This success state confirms front-end validation only. No data was sent to a real university or backend API.",
            fr: "Cet état confirme uniquement la validation côté interface. Aucune donnée n’a été envoyée à une université réelle ni à une API.",
          }}
          compact
          actions={
            <Link to="/programs" className="button">
              {pick(ui.explorePrograms)}
            </Link>
          }
        />
      </>
    );
  return (
    <>
      <PageHero
        eyebrow={{ en: "Application", fr: "Candidature" }}
        title={{ en: "Apply to Aurelia", fr: "Postuler à Aurelia" }}
        intro={{
          en: "A guided, validated front-end workflow ready to connect to a secure admissions API.",
          fr: "Un parcours guidé et validé, prêt à être connecté à une API d’admission sécurisée.",
        }}
        compact
      />
      <section className="section container application-shell">
        <ol
          className="progress-steps"
          aria-label={pick({
            en: "Application progress",
            fr: "Progression de la candidature",
          })}
        >
          {steps.map((s, i) => (
            <li
              className={i === step ? "active" : i < step ? "done" : ""}
              key={i}
            >
              <span>{i + 1}</span>
              {pick(s)}
            </li>
          ))}
        </ol>
        <form className="form-card" onSubmit={submit} noValidate>
          {step === 0 && (
            <div className="form-grid">
              <Field
                label={{ en: "First name", fr: "Prénom" }}
                value={form.firstName}
                error={errors.firstName}
                onChange={(v) => set("firstName", v)}
                required
              />
              <Field
                label={{ en: "Last name", fr: "Nom" }}
                value={form.lastName}
                error={errors.lastName}
                onChange={(v) => set("lastName", v)}
                required
              />
              <Field
                label={{ en: "Nationality", fr: "Nationalité" }}
                value={form.nationality}
                error={errors.nationality}
                onChange={(v) => set("nationality", v)}
                required
              />
            </div>
          )}
          {step === 1 && (
            <div className="form-grid">
              <Field
                label={{ en: "Email", fr: "E-mail" }}
                value={form.email}
                error={errors.email}
                type="email"
                onChange={(v) => set("email", v)}
                required
              />
              <Field
                label={{ en: "Phone", fr: "Téléphone" }}
                value={form.phone}
                error={errors.phone}
                type="tel"
                onChange={(v) => set("phone", v)}
                required
              />
            </div>
          )}
          {step === 2 && (
            <div className="form-grid">
              <Field
                label={{ en: "School / university", fr: "École / université" }}
                value={form.school}
                error={errors.school}
                onChange={(v) => set("school", v)}
                required
              />
              <Field
                label={{
                  en: "Highest qualification",
                  fr: "Diplôme le plus élevé",
                }}
                value={form.qualification}
                error={errors.qualification}
                onChange={(v) => set("qualification", v)}
                required
              />
            </div>
          )}
          {step === 3 && (
            <label className="field">
              <span>{pick({ en: "Program", fr: "Programme" })} *</span>
              <select
                value={form.program}
                onChange={(e) => set("program", e.target.value)}
              >
                <option value="">
                  {pick({
                    en: "Select a program",
                    fr: "Sélectionnez un programme",
                  })}
                </option>
                {programs.map((p) => (
                  <option value={p.slug} key={p.slug}>
                    {pick(p.name)}
                  </option>
                ))}
              </select>
              {errors.program && (
                <small className="field-error">{errors.program}</small>
              )}
            </label>
          )}
          {step === 4 && (
            <label className="field">
              <span>
                {pick({
                  en: "Why this program?",
                  fr: "Pourquoi ce programme ?",
                })}{" "}
                *
              </span>
              <textarea
                rows={7}
                value={form.statement}
                onChange={(e) => set("statement", e.target.value)}
                placeholder={pick({
                  en: "Describe your goals, preparation and what you hope to contribute.",
                  fr: "Décrivez vos objectifs, votre préparation et ce que vous souhaitez apporter.",
                })}
              />
              {errors.statement && (
                <small className="field-error">{errors.statement}</small>
              )}
            </label>
          )}
          <div className="form-actions">
            {step > 0 && (
              <button
                type="button"
                className="button button-ghost"
                onClick={() => setStep(step - 1)}
              >
                {pick(ui.back)}
              </button>
            )}
            {step < 4 ? (
              <button type="button" className="button" onClick={next}>
                {pick(ui.next)}
              </button>
            ) : (
              <button type="submit" className="button">
                {pick({
                  en: "Validate application",
                  fr: "Valider la candidature",
                })}
              </button>
            )}
          </div>
        </form>
      </section>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  required = false,
}: {
  label: Localized;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
}) {
  const { pick } = useLanguage();
  return (
    <label className="field">
      <span>
        {pick(label)} {required ? "*" : ""}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
      />
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}

function ResearchPage() {
  const { pick } = useLanguage();
  useSeo(
    pick({ en: "Research & Innovation", fr: "Recherche et innovation" }),
    pick({
      en: "Explore Aurelia research areas, centers, people and publications.",
      fr: "Explorez les axes, centres, chercheurs et publications d’Aurelia.",
    }),
  );
  return (
    <>
      <PageHero
        eyebrow={{ en: "Research & Innovation", fr: "Recherche et innovation" }}
        title={{
          en: "From questions to useful change.",
          fr: "Des questions au changement utile.",
        }}
        intro={{
          en: "Aurelia connects disciplines, facilities and partners around problems that matter.",
          fr: "Aurelia relie disciplines, infrastructures et partenaires autour de problèmes qui comptent.",
        }}
        scene="network"
      />
      <section className="section container">
        <SectionHeader
          title={{ en: "Research areas", fr: "Axes de recherche" }}
        />
        <div className="tag-cloud">
          {researchAreas.map((a, i) => (
            <span className="research-tag" data-reveal key={i}>
              {pick(a)}
            </span>
          ))}
        </div>
      </section>
      <section className="section section-tonal">
        <div className="container">
          <SectionHeader
            title={{ en: "Research centers", fr: "Centres de recherche" }}
          />
          <div className="card-grid two">
            {researchCenters.map((c) => (
              <Link
                to={`/research/centers/${c.slug}`}
                className="glass-card"
                key={c.slug}
                data-reveal
              >
                <h3>{pick(c.name)}</h3>
                <p>{pick(c.summary)}</p>
                <span className="text-link">{pick(ui.learnMore)} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeader
          title={{
            en: "University → Research → Innovation → Industry",
            fr: "Université → Recherche → Innovation → Industrie",
          }}
          intro={{
            en: "The research network is designed to move discoveries from labs into prototypes, policy, ventures and partnerships.",
            fr: "Le réseau de recherche fait circuler les découvertes des laboratoires vers les prototypes, politiques, entreprises et partenariats.",
          }}
        />
        <div className="visual-shell wide">
          <Stage variant="network" />
        </div>
        <div className="hero-actions centered">
          <Link to="/research/researchers" className="button button-ghost">
            {pick({ en: "Meet researchers", fr: "Rencontrer les chercheurs" })}
          </Link>
          <Link to="/research/publications" className="button button-ghost">
            {pick({
              en: "Search publications",
              fr: "Rechercher des publications",
            })}
          </Link>
        </div>
      </section>
    </>
  );
}

function ResearchCentersPage() {
  const { pick } = useLanguage();
  useSeo("Research Centers", "Aurelia research centers.");
  return (
    <>
      <PageHero
        eyebrow={{ en: "Research", fr: "Recherche" }}
        title={{ en: "Research centers", fr: "Centres de recherche" }}
        intro={{
          en: "Focused institutes connect people, facilities and external partners around shared challenges.",
          fr: "Des instituts spécialisés relient personnes, équipements et partenaires autour de défis communs.",
        }}
        compact
      />
      <section className="section container">
        <div className="card-grid two">
          {researchCenters.map((c) => (
            <Link
              to={`/research/centers/${c.slug}`}
              className="glass-card feature-card"
              key={c.slug}
            >
              <h2>{pick(c.name)}</h2>
              <p>{pick(c.summary)}</p>
              <span className="pill-row">
                {c.themes.map((t, i) => (
                  <span className="pill" key={i}>
                    {pick(t)}
                  </span>
                ))}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
function ResearchCenterDetail() {
  const { slug } = useParams();
  const { pick } = useLanguage();
  const c = researchCenters.find((x) => x.slug === slug);
  if (!c) return <Navigate to="/404" replace />;
  useSeo(pick(c.name), pick(c.summary));
  return (
    <>
      <PageHero
        eyebrow={{ en: "Research center", fr: "Centre de recherche" }}
        title={c.name}
        intro={c.summary}
        scene="network"
      />
      <section className="section container content-grid">
        <div>
          <h2>{pick({ en: "Core themes", fr: "Thèmes clés" })}</h2>
          <ul className="clean-list">
            {c.themes.map((t, i) => (
              <li key={i}>{pick(t)}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>{pick({ en: "Ways to engage", fr: "Collaborer" })}</h2>
          <p>
            {pick({
              en: "Centers host research projects, graduate supervision, public seminars and partner-led applied work.",
              fr: "Les centres accueillent projets de recherche, encadrement de master/doctorat, séminaires publics et travaux appliqués avec des partenaires.",
            })}
          </p>
          <Link to="/contact" className="button button-ghost">
            {pick({
              en: "Contact research office",
              fr: "Contacter la recherche",
            })}
          </Link>
        </div>
      </section>
    </>
  );
}

function ResearchersPage() {
  const { pick } = useLanguage();
  const [q, setQ] = useState("");
  const list = researchers.filter((r) =>
    `${r.name} ${r.position.en} ${r.faculty.en} ${r.department.en} ${r.interests.map((i) => i.en).join(" ")}`
      .toLowerCase()
      .includes(q.toLowerCase()),
  );
  useSeo("Researchers", "Search Aurelia researchers.");
  return (
    <>
      <PageHero
        eyebrow={{ en: "Research", fr: "Recherche" }}
        title={{ en: "Researchers", fr: "Chercheurs" }}
        intro={{
          en: "Find people by department, position or research interest.",
          fr: "Trouvez des personnes par département, poste ou domaine de recherche.",
        }}
        compact
      />
      <section className="section container">
        <label className="search-bar">
          <span>{pick(ui.search)}</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={pick({
              en: "Search people or research areas",
              fr: "Rechercher des personnes ou domaines",
            })}
          />
        </label>
        <div className="card-grid three">
          {list.map((r) => (
            <Link
              to={`/research/researchers/${r.slug}`}
              className="glass-card person-card"
              key={r.slug}
            >
              <div className="avatar" aria-hidden="true">
                {r.name.split(" ").slice(-1)[0].slice(0, 1)}
              </div>
              <h3>{r.name}</h3>
              <p className="muted">{pick(r.position)}</p>
              <p>{pick(r.department)}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
function ResearcherDetail() {
  const { slug } = useParams();
  const { pick } = useLanguage();
  const r = researchers.find((x) => x.slug === slug);
  if (!r) return <Navigate to="/404" replace />;
  useSeo(r.name, pick(r.position));
  return (
    <>
      <PageHero
        eyebrow={{ en: "Researcher profile", fr: "Profil chercheur" }}
        title={{ en: r.name, fr: r.name }}
        intro={r.position}
        compact
      />
      <section className="section container content-grid">
        <div>
          <h2>
            {pick({
              en: "Biography & research interests",
              fr: "Biographie et domaines de recherche",
            })}
          </h2>
          <p>
            {pick({
              en: `${r.name} works in ${r.department.en}, connecting ${r.interests
                .map((i) => i.en)
                .join(" and ")
                .toLowerCase()} with teaching, graduate supervision and applied research.`,
              fr: `${r.name} travaille au sein de ${r.department.fr}, en reliant ${r.interests
                .map((i) => i.fr)
                .join(" et ")
                .toLowerCase()} à l’enseignement, à l’encadrement et à la recherche appliquée.`,
            })}
          </p>
          <ul className="clean-list">
            {r.interests.map((i, k) => (
              <li key={k}>{pick(i)}</li>
            ))}
          </ul>
          <p>
            <strong>{pick({ en: "Faculty", fr: "Faculté" })}:</strong>{" "}
            {pick(r.faculty)}
          </p>
          <p>
            <strong>{pick({ en: "Department", fr: "Département" })}:</strong>{" "}
            {pick(r.department)}
          </p>
        </div>
        <div>
          <h2>
            {pick({
              en: "Publications & contact",
              fr: "Publications et contact",
            })}
          </h2>
          <p>
            {r.publications}{" "}
            {pick({
              en: "publications indexed in the profile record.",
              fr: "publications indexées dans le profil.",
            })}
          </p>
          <a className="text-link" href={`mailto:${r.email}`}>
            {r.email}
          </a>
          <br />
          <Link className="button button-ghost" to="/research/publications">
            {pick({
              en: "Search publications",
              fr: "Rechercher des publications",
            })}
          </Link>
        </div>
      </section>
    </>
  );
}

function PublicationsPage() {
  const { pick } = useLanguage();
  const [q, setQ] = useState("");
  const list = publications.filter((p) =>
    `${p.title.en} ${p.title.fr} ${p.area.en} ${p.author}`
      .toLowerCase()
      .includes(q.toLowerCase()),
  );
  useSeo("Publications", "Search Aurelia publications.");
  return (
    <>
      <PageHero
        eyebrow={{ en: "Research", fr: "Recherche" }}
        title={{ en: "Publications", fr: "Publications" }}
        intro={{
          en: "Search selected university research outputs by title, author or area.",
          fr: "Recherchez une sélection de travaux par titre, auteur ou domaine.",
        }}
        compact
      />
      <section className="section container">
        <label className="search-bar">
          <span>{pick(ui.search)}</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <div className="publication-list">
          {list.map((p, i) => (
            <article key={i} className="publication-item" data-reveal>
              <span>{p.year}</span>
              <div>
                <p className="eyebrow">{pick(p.area)}</p>
                <h3>{pick(p.title)}</h3>
                <p>{p.author}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function ResearchPartnershipsPage() {
  const { pick } = useLanguage();
  useSeo("Industry Partnerships", "Research and industry partnership model.");
  return (
    <>
      <PageHero
        eyebrow={{ en: "Research", fr: "Recherche" }}
        title={{ en: "Industry partnerships", fr: "Partenariats industriels" }}
        intro={{
          en: "Collaborations translate research into prototypes, talent pipelines and practical change.",
          fr: "Les collaborations transforment la recherche en prototypes, viviers de talents et changements concrets.",
        }}
        scene="network"
      />
      <section className="section container">
        <div className="journey-row">
          {[
            { en: "University", fr: "Université" },
            { en: "Research", fr: "Recherche" },
            { en: "Innovation", fr: "Innovation" },
            { en: "Industry", fr: "Industrie" },
          ].map((x, i) => (
            <div className="journey-node" key={i}>
              {pick(x)}
            </div>
          ))}
        </div>
        <p className="centered copy-narrow">
          {pick({
            en: "Partnership modes include sponsored research, student projects, shared labs, executive learning and venture support.",
            fr: "Les modes de partenariat incluent recherche financée, projets étudiants, laboratoires partagés, formation continue et soutien aux entreprises.",
          })}
        </p>
      </section>
    </>
  );
}

const campusLinks = [
  ["/campus-life/student-life", { en: "Student Life", fr: "Vie étudiante" }],
  [
    "/campus-life/clubs",
    { en: "Clubs & Organizations", fr: "Clubs et associations" },
  ],
  ["/campus-life/sports", { en: "Sports", fr: "Sports" }],
  ["/campus-life/accommodation", { en: "Accommodation", fr: "Logement" }],
  ["/campus-life/library", { en: "Library", fr: "Bibliothèque" }],
  ["/campus-life/cafeteria", { en: "Cafeteria", fr: "Restauration" }],
  [
    "/campus-life/services",
    { en: "Student Services", fr: "Services aux étudiants" },
  ],
  [
    "/campus-life/wellbeing",
    { en: "Health & Wellbeing", fr: "Santé et bien-être" },
  ],
  [
    "/campus-life/career-center",
    { en: "Career Center", fr: "Centre de carrière" },
  ],
] as const;
function CampusLifePage() {
  const { pick } = useLanguage();
  useSeo("Campus Life", "Student life and services.");
  return (
    <>
      <PageHero
        eyebrow={{ en: "Campus Life", fr: "Vie de campus" }}
        title={{
          en: "Life around the learning.",
          fr: "La vie autour de l’apprentissage.",
        }}
        intro={{
          en: "Aurelia’s campus experience combines community, support, movement and opportunity without losing sight of academic purpose.",
          fr: "L’expérience du campus associe communauté, soutien, mouvement et opportunités sans perdre de vue l’exigence académique.",
        }}
        scene="campus"
      />
      <section className="section container">
        <div className="card-grid three">
          {campusLinks.map(([to, label]) => (
            <Link className="glass-card" to={to} key={to}>
              <h3>{pick(label)}</h3>
              <span className="text-link">{pick(ui.learnMore)} →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function InternationalPage() {
  const { pick } = useLanguage();
  useSeo(
    "International Students",
    "International student admissions and support.",
  );
  return (
    <>
      <PageHero
        eyebrow={{
          en: "International Students",
          fr: "Étudiants internationaux",
        }}
        title={{
          en: "Study here. Connect everywhere.",
          fr: "Étudiez ici. Connectez-vous partout.",
        }}
        intro={{
          en: "Admissions support, visa guidance, scholarships, housing and a global network help international students arrive with clarity.",
          fr: "Admissions, visas, bourses, logement et réseau mondial aident les étudiants internationaux à arriver avec confiance.",
        }}
        scene="globe"
      />
      <section className="section container">
        <SectionHeader
          title={{
            en: "Why study at Aurelia?",
            fr: "Pourquoi étudier à Aurelia ?",
          }}
        />
        <div className="card-grid three">
          <InfoCard
            title={{ en: "Global classroom", fr: "Classe internationale" }}
            body={{
              en: "Programs combine regional perspective with international collaboration.",
              fr: "Les programmes associent perspective régionale et collaboration internationale.",
            }}
          />
          <InfoCard
            title={{ en: "Arrival support", fr: "Accompagnement à l’arrivée" }}
            body={{
              en: "Pre-arrival checklists, housing guidance and orientation reduce uncertainty.",
              fr: "Listes de préparation, aide au logement et orientation réduisent les incertitudes.",
            }}
          />
          <InfoCard
            title={{ en: "Scholarship routes", fr: "Voies de financement" }}
            body={{
              en: "International applicants are eligible for selected merit and leadership awards.",
              fr: "Les candidats internationaux sont éligibles à certaines bourses au mérite et au leadership.",
            }}
          />
        </div>
      </section>
      <section className="section section-tonal">
        <div className="container split-showcase">
          <div>
            <SectionHeader
              title={{ en: "Global connections", fr: "Connexions mondiales" }}
              intro={{
                en: "Exchange and partner activity connects the campus with institutions across regions.",
                fr: "Les échanges et partenariats relient le campus à des institutions de plusieurs régions.",
              }}
            />
            <div className="pill-row">
              {internationalConnections.map((c) => (
                <span className="pill" key={c.city}>
                  {c.city} · {pick(c.country)}
                </span>
              ))}
            </div>
          </div>
          <div className="visual-shell">
            <Stage variant="globe" />
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeader
          title={{
            en: "International essentials",
            fr: "Essentiels internationaux",
          }}
        />
        <div className="detail-sections">
          <DetailText
            title={{
              en: "International admissions",
              fr: "Admissions internationales",
            }}
            text={{
              en: "Submit certified academic records and language evidence through the same admissions process.",
              fr: "Soumettez des relevés certifiés et une preuve de langue via le même processus d’admission.",
            }}
          />
          <DetailText
            title={{ en: "Visa information", fr: "Informations visa" }}
            text={{
              en: "Visa rules depend on citizenship and study location. After admission, students should follow current official immigration guidance.",
              fr: "Les règles dépendent de la nationalité et du lieu d’études. Après admission, suivez les instructions officielles d’immigration en vigueur.",
            }}
          />
          <DetailText
            title={{ en: "Accommodation", fr: "Logement" }}
            text={{
              en: "International students receive priority guidance for managed residences and vetted off-campus options.",
              fr: "Les étudiants internationaux bénéficient d’un accompagnement prioritaire pour les résidences et options hors campus vérifiées.",
            }}
          />
          <DetailText
            title={{ en: "International office", fr: "Bureau international" }}
            text={{
              en: "The International Office supports arrival, orientation, exchange and immigration-document coordination.",
              fr: "Le Bureau international accompagne l’arrivée, l’orientation, les échanges et la coordination des documents d’immigration.",
            }}
          />
        </div>
        <div className="hero-actions">
          <Link to="/admissions/scholarships" className="button button-ghost">
            {pick({ en: "Scholarships", fr: "Bourses" })}
          </Link>
          <Link to="/contact" className="button">
            {pick({
              en: "Contact International Office",
              fr: "Contacter le Bureau international",
            })}
          </Link>
        </div>
      </section>
      <section className="section section-tonal">
        <div className="container faq-list">
          <SectionHeader
            title={{
              en: "International student FAQs",
              fr: "FAQ étudiants internationaux",
            }}
          />
          <details>
            <summary>
              {pick({
                en: "When should I start visa planning?",
                fr: "Quand commencer les démarches de visa ?",
              })}
            </summary>
            <p>
              {pick({
                en: "Begin by checking current official immigration requirements before applying. Formal visa steps normally follow an admission offer and the required university documents.",
                fr: "Commencez par vérifier les exigences officielles d’immigration en vigueur. Les démarches formelles suivent généralement l’offre d’admission et les documents universitaires requis.",
              })}
            </p>
          </details>
          <details>
            <summary>
              {pick({
                en: "Can international students apply for scholarships?",
                fr: "Les étudiants internationaux peuvent-ils demander une bourse ?",
              })}
            </summary>
            <p>
              {pick({
                en: "Yes. Selected merit, STEM and leadership awards are open to eligible international applicants.",
                fr: "Oui. Certaines bourses au mérite, STEM et leadership sont ouvertes aux candidats internationaux éligibles.",
              })}
            </p>
          </details>
        </div>
      </section>
    </>
  );
}

function InfoCard({ title, body }: { title: Localized; body: Localized }) {
  const { pick } = useLanguage();
  return (
    <article className="glass-card" data-reveal>
      <h3>{pick(title)}</h3>
      <p>{pick(body)}</p>
    </article>
  );
}
function DetailText({ title, text }: { title: Localized; text: Localized }) {
  const { pick } = useLanguage();
  return (
    <div className="detail-block" data-reveal>
      <h2>{pick(title)}</h2>
      <p>{pick(text)}</p>
    </div>
  );
}

function NewsPage() {
  const { pick } = useLanguage();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const cats = Array.from(new Set(news.map((n) => n.category.en)));
  const list = news.filter(
    (n) =>
      (cat === "all" || n.category.en === cat) &&
      `${n.title.en} ${n.title.fr} ${n.summary.en}`
        .toLowerCase()
        .includes(q.toLowerCase()),
  );
  useSeo("News", "Latest Aurelia university news.");
  return (
    <>
      <PageHero
        eyebrow={{ en: "News", fr: "Actualités" }}
        title={{
          en: "Ideas, milestones and campus stories.",
          fr: "Idées, étapes et histoires du campus.",
        }}
        intro={{
          en: "Follow research, innovation, student work and university developments.",
          fr: "Suivez la recherche, l’innovation, les projets étudiants et l’actualité de l’université.",
        }}
        compact
      />
      <section className="section container">
        <div className="filter-panel compact-filter">
          <label>
            <span>{pick(ui.search)}</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <label>
            <span>{pick({ en: "Category", fr: "Catégorie" })}</span>
            <select value={cat} onChange={(e) => setCat(e.target.value)}>
              <option value="all">{pick(ui.all)}</option>
              {cats.map((c) => (
                <option value={c} key={c}>
                  {pick(news.find((n) => n.category.en === c)!.category)}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="card-grid three">
          {list.map((n) => (
            <Link
              to={`/news/${n.slug}`}
              className="glass-card news-card"
              key={n.slug}
            >
              <p className="eyebrow">
                {pick(n.category)} · {n.date}
              </p>
              <h3>{pick(n.title)}</h3>
              <p>{pick(n.summary)}</p>
              <span className="text-link">
                {pick({ en: "Read article", fr: "Lire l’article" })} →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
function NewsDetail() {
  const { slug } = useParams();
  const { pick } = useLanguage();
  const n = news.find((x) => x.slug === slug);
  if (!n) return <Navigate to="/404" replace />;
  useSeo(pick(n.title), pick(n.summary));
  return (
    <>
      <PageHero
        eyebrow={n.category}
        title={n.title}
        intro={n.summary}
        compact
      />
      <article className="section container article-body">
        <p className="article-meta">
          {n.date} · {n.author}
        </p>
        <p>
          {pick({
            en: "This article expands on the university update with context, implications and next steps for the Aurelia community. The story content is part of this fictional university demonstration and is intentionally concrete rather than placeholder text.",
            fr: "Cet article développe l’actualité de l’université avec son contexte, ses implications et les prochaines étapes pour la communauté Aurelia. Le contenu fait partie de cette démonstration universitaire fictive et reste volontairement concret.",
          })}
        </p>
        <h2>
          {pick({ en: "What changes now", fr: "Ce qui change maintenant" })}
        </h2>
        <p>
          {pick({
            en: "Faculty teams, student groups and relevant offices are moving the initiative from announcement into implementation through scheduled work, open participation and measurable milestones.",
            fr: "Les équipes pédagogiques, groupes étudiants et services concernés passent de l’annonce à la mise en œuvre grâce à un calendrier, une participation ouverte et des jalons mesurables.",
          })}
        </p>
        <div className="share-row">
          <span>{pick({ en: "Share", fr: "Partager" })}:</span>
          <a href={`mailto:?subject=${encodeURIComponent(pick(n.title))}`}>
            Email
          </a>
          <button
            onClick={() => navigator.clipboard?.writeText(window.location.href)}
          >
            {pick({ en: "Copy link", fr: "Copier le lien" })}
          </button>
        </div>
      </article>
      <section className="section section-tonal">
        <div className="container">
          <SectionHeader
            title={{ en: "Related articles", fr: "Articles associés" }}
          />
          <div className="card-grid three">
            {news
              .filter((x) => x.slug !== n.slug)
              .slice(0, 3)
              .map((x) => (
                <Link
                  to={`/news/${x.slug}`}
                  className="glass-card"
                  key={x.slug}
                >
                  <h3>{pick(x.title)}</h3>
                  <p>{pick(x.summary)}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

function EventsPage() {
  const { pick } = useLanguage();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const categories = Array.from(new Set(events.map((e) => e.category.en)));
  const list = events.filter(
    (e) =>
      (category === "all" || e.category.en === category) &&
      `${e.title.en} ${e.title.fr} ${e.category.en} ${e.location.en} ${e.description.en}`
        .toLowerCase()
        .includes(q.toLowerCase()),
  );
  useSeo("Events", "Upcoming Aurelia events.");
  return (
    <>
      <PageHero
        eyebrow={{ en: "Events", fr: "Événements" }}
        title={{
          en: "What’s happening at Aurelia.",
          fr: "Ce qui se passe à Aurelia.",
        }}
        intro={{
          en: "Lectures, open days, showcases and community events bring the university together.",
          fr: "Conférences, portes ouvertes, démonstrations et événements rassemblent l’université.",
        }}
        compact
      />
      <section className="section container">
        <div className="filter-panel compact-filter">
          <label>
            <span>{pick(ui.search)}</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={pick({
                en: "Search events",
                fr: "Rechercher des événements",
              })}
            />
          </label>
          <label>
            <span>{pick({ en: "Category", fr: "Catégorie" })}</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">{pick(ui.all)}</option>
              {categories.map((c) => (
                <option value={c} key={c}>
                  {pick(events.find((e) => e.category.en === c)!.category)}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="event-list">
          {list.map((e) => (
            <Link
              className="event-row"
              to={`/events/${e.slug}`}
              key={e.slug}
              data-reveal
            >
              <div className="event-date">
                <strong>{e.date.slice(8)}</strong>
                <span>
                  {new Date(`${e.date}T12:00:00`).toLocaleString(
                    pick({ en: "en-US", fr: "fr-FR" }),
                    { month: "short" },
                  )}
                </span>
              </div>
              <div>
                <p className="eyebrow">
                  {pick(e.category)} · {e.time}
                </p>
                <h3>{pick(e.title)}</h3>
                <p>{pick(e.location)}</p>
                <p className="muted">{pick(e.description)}</p>
              </div>
              <span>→</span>
            </Link>
          ))}
        </div>
        {!list.length && <EmptyState />}
      </section>
    </>
  );
}

function EventsDetail() {
  const { slug } = useParams();
  const { pick } = useLanguage();
  const event = events.find((x) => x.slug === slug);
  const [open, setOpen] = useState(false);
  const [registered, setRegistered] = useState(false);
  if (!event) return <Navigate to="/404" replace />;
  useSeo(pick(event.title), pick(event.description));
  return (
    <>
      <PageHero
        eyebrow={event.category}
        title={event.title}
        intro={event.description}
        compact
        actions={
          <button className="button" onClick={() => setOpen(true)}>
            {pick(ui.register)}
          </button>
        }
      />
      <section className="section container event-detail">
        <div>
          <span>{pick({ en: "Date", fr: "Date" })}</span>
          <strong>{event.date}</strong>
        </div>
        <div>
          <span>{pick({ en: "Time", fr: "Heure" })}</span>
          <strong>{event.time}</strong>
        </div>
        <div>
          <span>{pick({ en: "Location", fr: "Lieu" })}</span>
          <strong>{pick(event.location)}</strong>
        </div>
      </section>
      {open && (
        <Modal
          title={pick({
            en: "Event registration",
            fr: "Inscription à l’événement",
          })}
          onClose={() => setOpen(false)}
        >
          {registered ? (
            <p>
              {pick({
                en: "Registration details were validated locally for this demo. No real event booking was transmitted.",
                fr: "Les informations ont été validées localement pour cette démonstration. Aucune réservation réelle n’a été transmise.",
              })}
            </p>
          ) : (
            <SimpleSubmitForm
              button={pick({
                en: "Complete registration",
                fr: "Finaliser l’inscription",
              })}
              onSuccess={() => setRegistered(true)}
            />
          )}
        </Modal>
      )}
    </>
  );
}

function AlumniPage() {
  const { pick } = useLanguage();
  useSeo("Alumni", "Aurelia alumni community.");
  const items = [
    ["/alumni/stories", { en: "Alumni Stories", fr: "Parcours d’anciens" }],
    ["/alumni/events", { en: "Alumni Events", fr: "Événements alumni" }],
    ["/alumni/career-network", { en: "Career Network", fr: "Réseau carrière" }],
    ["/alumni/giving", { en: "Giving", fr: "Faire un don" }],
    [
      "/alumni/register",
      { en: "Alumni Registration", fr: "Inscription alumni" },
    ],
  ] as const;
  return (
    <>
      <PageHero
        eyebrow={{ en: "Alumni", fr: "Anciens" }}
        title={{ en: "Where are they now?", fr: "Que deviennent-ils ?" }}
        intro={{
          en: "Aurelia graduates keep building — across research, industry, public service and entrepreneurship.",
          fr: "Les diplômés d’Aurelia continuent de construire — en recherche, industrie, service public et entrepreneuriat.",
        }}
        scene="globe"
      />
      <section className="section container">
        <div className="card-grid three">
          {items.map(([to, label]) => (
            <Link to={to} className="glass-card" key={to}>
              <h3>{pick(label)}</h3>
              <span className="text-link">{pick(ui.learnMore)} →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
function AlumniRegister() {
  const { pick } = useLanguage();
  const [done, setDone] = useState(false);
  useSeo("Alumni Registration", "Join the Aurelia alumni network.");
  return (
    <>
      <PageHero
        eyebrow={{ en: "Alumni", fr: "Anciens" }}
        title={{
          en: "Join the alumni network",
          fr: "Rejoindre le réseau des anciens",
        }}
        intro={{
          en: "Keep your details current to receive event, mentoring and network opportunities.",
          fr: "Mettez vos coordonnées à jour pour recevoir des opportunités d’événements, mentorat et réseau.",
        }}
        compact
      />
      <section className="section container form-narrow">
        {done ? (
          <SuccessMessage
            text={{
              en: "Your alumni profile was validated locally for this demo. No external account was created.",
              fr: "Votre profil alumni a été validé localement pour cette démonstration. Aucun compte externe n’a été créé.",
            }}
          />
        ) : (
          <SimpleSubmitForm
            button={pick({
              en: "Register profile",
              fr: "Enregistrer le profil",
            })}
            onSuccess={() => setDone(true)}
            extended
          />
        )}
      </section>
    </>
  );
}

function DirectoryPage() {
  const { pick } = useLanguage();
  const [q, setQ] = useState("");
  const [facultyFilter, setFacultyFilter] = useState("all");
  const [dept, setDept] = useState("all");
  const [position, setPosition] = useState("all");
  const [area, setArea] = useState("all");
  const facultyOptions = Array.from(
    new Set(researchers.map((r) => r.faculty.en)),
  );
  const depts = Array.from(new Set(researchers.map((r) => r.department.en)));
  const areas = Array.from(
    new Set(researchers.flatMap((r) => r.interests.map((i) => i.en))),
  );
  const list = researchers.filter(
    (r) =>
      (facultyFilter === "all" || r.faculty.en === facultyFilter) &&
      (dept === "all" || r.department.en === dept) &&
      (position === "all" || r.position.en.includes(position)) &&
      (area === "all" || r.interests.some((i) => i.en === area)) &&
      `${r.name} ${r.position.en} ${r.faculty.en} ${r.department.en} ${r.interests.map((i) => i.en).join(" ")}`
        .toLowerCase()
        .includes(q.toLowerCase()),
  );
  useSeo("Faculty & Staff Directory", "Search Aurelia faculty and staff.");
  return (
    <>
      <PageHero
        eyebrow={{ en: "Directory", fr: "Annuaire" }}
        title={{ en: "Faculty & staff directory", fr: "Annuaire du personnel" }}
        intro={{
          en: "Search by faculty, department, position or research area.",
          fr: "Recherchez par faculté, département, poste ou domaine de recherche.",
        }}
        compact
      />
      <section className="section container">
        <div className="filter-panel directory-filter">
          <label>
            <span>{pick(ui.search)}</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <label>
            <span>{pick({ en: "Faculty", fr: "Faculté" })}</span>
            <select
              value={facultyFilter}
              onChange={(e) => setFacultyFilter(e.target.value)}
            >
              <option value="all">{pick(ui.all)}</option>
              {facultyOptions.map((f) => (
                <option key={f} value={f}>
                  {pick(researchers.find((r) => r.faculty.en === f)!.faculty)}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>{pick({ en: "Department", fr: "Département" })}</span>
            <select value={dept} onChange={(e) => setDept(e.target.value)}>
              <option value="all">{pick(ui.all)}</option>
              {depts.map((d) => (
                <option key={d} value={d}>
                  {pick(
                    researchers.find((r) => r.department.en === d)!.department,
                  )}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>{pick({ en: "Position", fr: "Poste" })}</span>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            >
              <option value="all">{pick(ui.all)}</option>
              <option value="Professor">
                {pick({ en: "Professor", fr: "Professeur" })}
              </option>
              <option value="Lecturer">
                {pick({ en: "Lecturer", fr: "Enseignant" })}
              </option>
              <option value="Research">
                {pick({ en: "Research", fr: "Recherche" })}
              </option>
              <option value="Director">
                {pick({ en: "Director", fr: "Direction" })}
              </option>
            </select>
          </label>
          <label>
            <span>
              {pick({ en: "Research area", fr: "Domaine de recherche" })}
            </span>
            <select value={area} onChange={(e) => setArea(e.target.value)}>
              <option value="all">{pick(ui.all)}</option>
              {areas.map((a) => (
                <option value={a} key={a}>
                  {pick(
                    researchers
                      .flatMap((r) => r.interests)
                      .find((i) => i.en === a)!,
                  )}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="card-grid three">
          {list.map((r) => (
            <Link
              to={`/research/researchers/${r.slug}`}
              className="glass-card person-card"
              key={r.slug}
            >
              <div className="avatar">{r.name.split(" ").slice(-1)[0][0]}</div>
              <h3>{r.name}</h3>
              <p>{pick(r.position)}</p>
              <p className="muted">
                {pick(r.department)} · {pick(r.faculty)}
              </p>
            </Link>
          ))}
        </div>
        {!list.length && <EmptyState />}
      </section>
    </>
  );
}

function AboutPage() {
  const { pick } = useLanguage();
  useSeo("About Aurelia", "Mission, history, governance and campus.");
  const items = [
    ["/about/mission", { en: "Mission & Vision", fr: "Mission et vision" }],
    ["/about/history", { en: "History", fr: "Histoire" }],
    ["/leadership", { en: "Leadership", fr: "Direction" }],
    ["/about/governance", { en: "Governance", fr: "Gouvernance" }],
    ["/about/accreditations", { en: "Accreditations", fr: "Accréditations" }],
    ["/about/partnerships", { en: "Partnerships", fr: "Partenariats" }],
    ["/about/campus", { en: "Campus", fr: "Campus" }],
  ] as const;
  return (
    <>
      <PageHero
        eyebrow={{ en: "About Aurelia", fr: "À propos d’Aurelia" }}
        title={{
          en: "Ambitious by design. Grounded in purpose.",
          fr: "Ambitieuse par conception. Ancrée dans sa mission.",
        }}
        intro={{
          en: "Aurelia is a fictional international university concept built around rigorous teaching, useful research and student opportunity.",
          fr: "Aurelia est un concept fictif d’université internationale fondé sur un enseignement rigoureux, une recherche utile et les opportunités étudiantes.",
        }}
        scene="timeline"
      />
      <section className="section container">
        <div className="card-grid three">
          {items.map(([to, label]) => (
            <Link className="glass-card" to={to} key={to}>
              <h3>{pick(label)}</h3>
              <span className="text-link">{pick(ui.learnMore)} →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function LeadershipPage() {
  const { pick } = useLanguage();
  useSeo("Leadership", "Aurelia university leadership.");
  return (
    <>
      <PageHero
        eyebrow={{
          en: "University Leadership",
          fr: "Direction de l’université",
        }}
        title={{ en: "Leadership", fr: "Direction" }}
        intro={{
          en: "Academic and institutional leaders set direction, uphold standards and create the conditions for students and research to thrive.",
          fr: "Les dirigeants académiques et institutionnels donnent la direction, garantissent les standards et créent les conditions de réussite.",
        }}
        compact
      />
      <section className="section container">
        <div className="card-grid two">
          {leadership.map((p) => (
            <Link
              to={`/leadership/${p.slug}`}
              className="glass-card leader-card"
              key={p.slug}
            >
              <div className="avatar large">
                {p.name.split(" ").slice(-1)[0][0]}
              </div>
              <div>
                <h2>{p.name}</h2>
                <p>{pick(p.role)}</p>
                <span className="text-link">{pick(ui.viewDetails)} →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
function LeadershipDetail() {
  const { slug } = useParams();
  const { pick } = useLanguage();
  const p = leadership.find((x) => x.slug === slug);
  if (!p) return <Navigate to="/404" replace />;
  useSeo(p.name, pick(p.role));
  return (
    <>
      <PageHero
        eyebrow={p.role}
        title={{ en: p.name, fr: p.name }}
        intro={p.bio}
        compact
      />
      <section className="section container quote-block">
        <p>“{pick(p.message)}”</p>
        <span>— {p.name}</span>
      </section>
    </>
  );
}

function ContactPage() {
  const { pick } = useLanguage();
  const [done, setDone] = useState(false);
  useSeo("Contact", "Contact Aurelia university offices.");
  return (
    <>
      <PageHero
        eyebrow={{ en: "Contact & Support", fr: "Contact et assistance" }}
        title={{
          en: "Talk to the right team.",
          fr: "Parlez à la bonne équipe.",
        }}
        intro={{
          en: "Admissions, international support, research and general enquiries are routed through one contact experience.",
          fr: "Admissions, international, recherche et demandes générales passent par une expérience de contact unique.",
        }}
        scene="campus"
      />
      <section className="section container contact-grid">
        <div data-reveal>
          <h2>{pick({ en: "Campus & offices", fr: "Campus et bureaux" })}</h2>
          <p>
            <strong>{pick({ en: "Address", fr: "Adresse" })}:</strong>
            <br />
            100 Knowledge Avenue, University District
          </p>
          <p>
            <strong>{pick({ en: "Phone", fr: "Téléphone" })}:</strong>
            <br />
            <a href="tel:+22900000000">+229 00 00 00 00</a>
          </p>
          <p>
            <strong>Email:</strong>
            <br />
            <a href="mailto:hello@aurelia.example">hello@aurelia.example</a>
          </p>
          <p>
            <strong>{pick({ en: "Office hours", fr: "Horaires" })}:</strong>
            <br />
            {pick({ en: "Mon–Fri · 08:30–17:00", fr: "Lun–Ven · 08:30–17:00" })}
          </p>
          <div className="office-list">
            <p>
              <strong>{pick({ en: "Admissions", fr: "Admissions" })}:</strong>{" "}
              admissions@aurelia.example
            </p>
            <p>
              <strong>
                {pick({
                  en: "International Office",
                  fr: "Bureau international",
                })}
                :
              </strong>{" "}
              international@aurelia.example
            </p>
          </div>
          <div className="social-links">
            <strong>
              {pick({ en: "Social media", fr: "Réseaux sociaux" })}
            </strong>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              Instagram ↗
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
              YouTube ↗
            </a>
          </div>
        </div>
        <div className="visual-shell">
          <Stage variant="campus" />
        </div>
      </section>
      <section className="section section-tonal">
        <div className="container form-narrow">
          <SectionHeader
            title={{ en: "Send an enquiry", fr: "Envoyer une demande" }}
          />
          {done ? (
            <SuccessMessage
              text={{
                en: "Your message was validated in this front-end demo. No external email or ticket was created.",
                fr: "Votre message a été validé dans cette démonstration. Aucun e-mail ou ticket externe n’a été créé.",
              }}
            />
          ) : (
            <SimpleSubmitForm
              button={pick(ui.submit)}
              onSuccess={() => setDone(true)}
              extended
            />
          )}
        </div>
      </section>
    </>
  );
}

function GenericStaticPage({ page }: { page: StaticPage }) {
  const { pick } = useLanguage();
  useSeo(pick(page.title), pick(page.intro));
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        intro={page.intro}
        scene={page.scene || "network"}
        compact={!page.scene}
      />
      <section className="section container">
        <div className="bullet-feature-grid">
          {page.bullets.map((b, i) => (
            <article className="glass-card" data-reveal key={i}>
              <span className="card-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p>{pick(b)}</p>
            </article>
          ))}
        </div>
        {page.cta && (
          <div className="section-inline-cta">
            <Link className="button" to={page.cta.to}>
              {pick(page.cta.label)}
            </Link>
          </div>
        )}
      </section>
    </>
  );
}

function SimpleSubmitForm({
  button,
  onSuccess,
  extended = false,
}: {
  button: string;
  onSuccess: () => void;
  extended?: boolean;
}) {
  const { pick } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (
      !name.trim() ||
      !/^\S+@\S+\.\S+$/.test(email) ||
      (extended && message.trim().length < 10)
    ) {
      setErr(
        pick({
          en: "Complete all required fields with a valid email.",
          fr: "Complétez tous les champs requis avec un e-mail valide.",
        }),
      );
      return;
    }
    onSuccess();
  };
  return (
    <form className="form-card" onSubmit={submit} noValidate>
      <Field
        label={{ en: "Name", fr: "Nom" }}
        value={name}
        onChange={setName}
        required
      />
      <Field
        label={{ en: "Email", fr: "E-mail" }}
        value={email}
        onChange={setEmail}
        type="email"
        required
      />
      {extended && (
        <label className="field">
          <span>
            {pick({ en: "Message / details", fr: "Message / détails" })} *
          </span>
          <textarea
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
      )}
      {err && <p className="form-error">{err}</p>}
      <button className="button" type="submit">
        {button}
      </button>
    </form>
  );
}
function SuccessMessage({ text }: { text: Localized }) {
  const { pick } = useLanguage();
  return (
    <div className="success-state" role="status">
      <strong>✓</strong>
      <p>{pick(text)}</p>
    </div>
  );
}
function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.currentTarget === e.target) onClose();
      }}
    >
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="modal-head">
          <h2>{title}</h2>
          <button onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}
function EmptyState() {
  const { pick } = useLanguage();
  return (
    <div className="empty-state" role="status">
      <strong>∅</strong>
      <p>{pick(ui.noResults)}</p>
    </div>
  );
}

function NotFoundPage() {
  const { pick } = useLanguage();
  useSeo("404", "Page not found.");
  return (
    <PageHero
      eyebrow={{ en: "404", fr: "404" }}
      title={{
        en: "This path hasn't been mapped yet.",
        fr: "Ce chemin n’a pas encore été cartographié.",
      }}
      intro={{
        en: "The page may have moved, or the address may be incorrect.",
        fr: "La page a peut-être été déplacée ou l’adresse est incorrecte.",
      }}
      compact
      actions={
        <>
          <Link to="/" className="button">
            {pick(ui.backHome)}
          </Link>
          <Link to="/programs" className="button button-ghost">
            {pick(ui.explorePrograms)}
          </Link>
          <Link to="/contact" className="button button-ghost">
            {pick(ui.contact)}
          </Link>
        </>
      }
    />
  );
}

export default function App() {
  const staticRoutes = useMemo(
    () =>
      staticPages.map((page) => (
        <Route
          key={page.path}
          path={page.path}
          element={<GenericStaticPage page={page} />}
        />
      )),
    [],
  );
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/academics" element={<AcademicsPage />} />
        <Route path="/faculties" element={<FacultiesPage />} />
        <Route path="/faculties/:slug" element={<FacultyPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/programs/:slug" element={<ProgramDetailPage />} />
        <Route path="/admissions" element={<AdmissionsPage />} />
        <Route path="/admissions/scholarships" element={<ScholarshipsPage />} />
        <Route path="/admissions/faq" element={<FaqPage />} />
        <Route path="/apply" element={<ApplicationPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/research/areas" element={<ResearchPage />} />
        <Route path="/research/centers" element={<ResearchCentersPage />} />
        <Route
          path="/research/centers/:slug"
          element={<ResearchCenterDetail />}
        />
        <Route path="/research/researchers" element={<ResearchersPage />} />
        <Route
          path="/research/researchers/:slug"
          element={<ResearcherDetail />}
        />
        <Route path="/research/publications" element={<PublicationsPage />} />
        <Route
          path="/research/partnerships"
          element={<ResearchPartnershipsPage />}
        />
        <Route path="/campus-life" element={<CampusLifePage />} />
        <Route path="/international" element={<InternationalPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:slug" element={<EventsDetail />} />
        <Route path="/alumni" element={<AlumniPage />} />
        <Route path="/alumni/register" element={<AlumniRegister />} />
        <Route path="/directory" element={<DirectoryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/leadership" element={<LeadershipPage />} />
        <Route path="/leadership/:slug" element={<LeadershipDetail />} />
        <Route path="/contact" element={<ContactPage />} />
        {staticRoutes}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
