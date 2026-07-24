import { useEffect, useState, type FormEvent } from "react";
import {
  Menu,
  X,
  ShieldCheck,
  Trophy,
  Dumbbell,
  Brain,
  Users,
  HeartPulse,
  Activity,
  ClipboardList,
  Droplets,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  ArrowRight,
  Check,
} from "lucide-react";

import { navigation as siteNavigation } from "@/config/navigation";

import heroImg from "@/assets/hero-training.jpg";
import aboutImg from "@/assets/about-action.jpg";
import academyImg from "@/assets/academy-coach.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";

const LOGO =
  "/__l5e/assets-v1/3bf6664e-8874-4cff-90af-cfa55ea1df38/sunesa-logo.jpg";

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`max-w-3xl ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      {eyebrow && (
        <div className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] text-brand-primary">
          <span className="h-px w-8 bg-brand-primary" />
          {eyebrow}
        </div>
      )}

      <h2 className="font-display text-3xl leading-[1.05] sm:text-4xl md:text-5xl">
        {title.split("|").map((part, i) => (
          <span
            key={i}
            className={
              i % 2 === 1
                ? "font-brand text-gradient-gold tracking-[0.06em]"
                : ""
            }
          >
            {part}
          </span>
        ))}
      </h2>

      {subtitle && (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  full = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  full?: boolean;
}) {
  return (
    <label className={`flex flex-col gap-2 ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="rounded-xl border border-border bg-brand-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-primary"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </span>
      <select
        name={name}
        className="rounded-xl border border-border bg-brand-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-primary"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ---------- Navbar ---------- */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[color-mix(in_oklab,var(--gold)_20%,transparent)] bg-[color-mix(in_oklab,var(--charcoal)_88%,transparent)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:grid-cols-[auto_1fr_auto]">
        <a href="#home" className="flex min-w-0 items-center gap-3">
          <img
            src={LOGO}
            alt="Sunesa Football Club emblem"
            className="h-11 w-11 shrink-0 rounded-full ring-1 ring-[color-mix(in_oklab,var(--gold)_45%,transparent)]"
          />

          <div className="min-w-0 leading-tight">
           <div className="brand-font truncate text-base tracking-wider text-foreground">
           Sunesa Football Club
           </div>

            <div className="truncate text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              Football Development Academy
            </div>
          </div>
        </a>

        <nav className="hidden justify-center lg:flex">
          <ul className="flex items-center gap-1">
            {siteNavigation.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-white/5 hover:text-brand-primary"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2">
          <a
            href="#trials"
            className="hidden items-center gap-2 rounded-xl bg-gradient-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-primary-foreground shadow-gold transition-all duration-300 hover:scale-105 hover:shadow-xl sm:inline-flex"
          >
            Join Trials
            <ArrowRight className="h-4 w-4" />
          </a>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-white/5 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-brand-background/95 backdrop-blur-xl lg:hidden">
          <ul className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
            {siteNavigation.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-brand-primary"
                >
                  {n.label}
                </a>
              </li>
            ))}

            <li className="pt-3">
              <a
                href="#trials"
                onClick={() => setOpen(false)}
                className="block rounded-xl bg-gradient-gold px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.12em] text-primary-foreground shadow-gold"
              >
                Join Trials
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */

function TrustBadge({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <div className="inline-flex items-center gap-3 rounded-full bg-white/6 px-4 py-2 text-sm font-medium text-foreground">
        <ShieldCheck className="h-5 w-5 text-gold" />
        <span>Trusted Coaching &amp; Development</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative isolate min-h-screen overflow-hidden">
      <img
        src={heroImg}
        alt="Sunesa Football Club players during training"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/70 to-charcoal" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,var(--charcoal)_85%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 pt-32 pb-16 text-center sm:px-6">

        <TrustBadge className="mb-8" />

        <div className="relative mb-10">
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-brand-primary/25 to-transparent blur-3xl" />

          <img
            src={LOGO}
            alt="Sunesa Football Club Logo"
            className="h-32 w-32 rounded-full ring-2 ring-brand-primary/60 shadow-gold sm:h-40 sm:w-40"
          />
        </div>

        <h1 className="max-w-5xl font-display text-5xl leading-[0.92] sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="block text-foreground">
            One Club.
          </span>

          <span className="block text-gradient-gold">
            One Passion.
          </span>

          <span className="block text-foreground">
            Endless Possibilities.
          </span>
        </h1>

        <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Sunesa Football Club develops disciplined, confident and technically
          gifted footballers through professional coaching, competitive training
          and a passion for the beautiful game.
        </p>

        <div className="mt-12 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">

          <a
            href="#trials"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-primary-foreground shadow-gold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-auto"
          >
            Join Trials

            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="#about"
            className="inline-flex w-full items-center justify-center rounded-xl border border-brand-primary/50 px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-brand-primary transition-all duration-300 hover:bg-brand-primary/10 sm:w-auto"
          >
            About Us
          </a>

        </div>

        <div className="mt-20 grid w-full max-w-3xl grid-cols-3 gap-6 border-t border-border/60 pt-10">

          {[
            {
              k: "6+",
              v: "Age Groups",
            },
            {
              k: "10+",
              v: "Experienced Coaches",
            },
            {
              k: "100%",
              v: "Passion For Football",
            },
          ].map((item) => (
            <div key={item.v} className="text-center">
              <div className="font-display text-3xl text-brand-primary sm:text-4xl">
                {item.k}
              </div>

              <div className="mt-2 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                {item.v}
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

function AboutSection() {
  const values = [
    "Discipline",
    "Development",
    "Respect",
    "Teamwork",
    "Commitment",
    "Excellence",
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* Image */}

          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-border">
              <img
                src={aboutImg}
                alt="Sunesa Football Club players training"
                className="h-full w-full object-cover"
                loading="lazy"
                width={1400}
                height={1000}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />

              <div className="absolute bottom-6 left-6">
                <TrustBadge />
              </div>
            </div>

            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-brand-primary/40 bg-brand-surface p-6 shadow-gold lg:block">
              <div className="font-display text-3xl text-gradient-gold">
                EST. 2012
              </div>

              <div className="mt-1 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                BDFA 'C' Division Club
              </div>
            </div>
          </div>
          </div>

          {/* Content */}

          <div>

            <SectionHeading
              eyebrow="About Sunesa FC"
              title={"Building Bangalore's |Next Generation| of Footballers"}
              subtitle="Sunesa Football Club was founded in 2012 with one mission — to identify raw talent from the grassroots and shape it into disciplined, match-ready players. From local grounds to BDFA 'C' Division, we provide structured coaching, competitive exposure and a clear pathway for young footballers in Bangalore."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2">

              <div className="glass-card rounded-2xl p-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-primary">
                  Mission
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  To identify grassroots talent and develop disciplined,
                  technically skilled footballers through structured coaching,
                  competitive match experience and a culture of continuous
                  improvement.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-primary">
                  Vision
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  To become one of Bangalore's leading football clubs by
                  creating opportunities for players to progress from grassroots
                  football to senior competitive league football.
                </p>
              </div>

            </div>

            <div className="mt-10">

              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-primary">
                Core Values
              </div>

              <ul className="flex flex-wrap gap-3">

                {values.map((value) => (
                  <li
                    key={value}
                    className="rounded-full border border-border bg-secondary px-4 py-2 text-xs uppercase tracking-wide text-muted-foreground transition-all duration-300 hover:border-brand-primary/40 hover:text-brand-primary"
                  >
                    {value}
                  </li>
                ))}

              </ul>

            </div>

            <div className="mt-14">

              <SectionHeading
                eyebrow="Why Sunesa FC"
                title={"Why Players Choose |Sunesa|"}
                subtitle="We believe great footballers are built through consistent training, competitive experience and a culture that values character just as much as talent."
                align="center"
              />

              <div className="mt-10 grid gap-6 md:grid-cols-3">  

              <div className="glass-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/30">
                <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-primary">
                  Discipline
                </div>

                <h3 className="font-display text-2xl text-foreground">
                  Character First
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Structured training that develops discipline, responsibility
                  and confidence both on and off the pitch.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/30">
                <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-primary">
                  Development
                </div>

                <h3 className="font-display text-2xl text-foreground">
                  Train With Purpose
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Professional coaching, technical development and regular
                  competitive matches help every player improve football IQ,
                  confidence and performance.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/30">
                <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-primary">
                  Opportunity
                </div>

                <h3 className="font-display text-2xl text-foreground">
                  Pathway To Competition
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  A clear progression from academy training to senior football
                  and BDFA league competition, giving players opportunities to
                  showcase and develop their talent.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}


/* ---------- Gallery ---------- */

const GALLERY = [
  {
    src: gallery1,
    cat: "Team",
    alt: "Sunesa FC team photo",
    span: "row-span-2",
  },
  {
    src: gallery2,
    cat: "Training",
    alt: "Training session",
    span: "",
  },
  {
    src: gallery3,
    cat: "Matches",
    alt: "Match action",
    span: "",
  },
  {
    src: gallery5,
    cat: "Events",
    alt: "Club event",
    span: "row-span-2",
  },
  {
    src: news1,
    cat: "Team",
    alt: "Team gallery",
    span: "",
  },
  {
    src: news2,
    cat: "Training",
    alt: "Training gallery",
    span: "",
  },
  {
    src: gallery6,
    cat: "Matches",
    alt: "Match gallery",
    span: "",
  },
  {
    src: news3,
    cat: "Events",
    alt: "Events gallery",
    span: "",
  },
];

const CATS = [
  "All",
  "Team",
  "Training",
  "Matches",
  "Events",
] as const;

function GallerySection() {
  const [active, setActive] = useState<(typeof CATS)[number]>("All");

  const filtered = GALLERY.filter(
    (g) => active === "All" || g.cat === active
  );

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">

          <SectionHeading
            eyebrow="Gallery"
            title={"Moments From |Sunesa|"}
            subtitle="Explore the journey of Sunesa Football Club through team moments, training sessions, competitive matches and club events."
          />

          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                  active === c
                    ? "border-brand-primary bg-brand-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-brand-primary/60 hover:text-brand-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

        </div>

        <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">

          {filtered.map((g, i) => (
            <figure
              key={i}
              className={`group relative overflow-hidden rounded-2xl border border-border ${g.span}`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-90" />

              <figcaption className="absolute bottom-4 left-4 rounded-full bg-brand-background/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-primary backdrop-blur">
                {g.cat}
              </figcaption>
            </figure>
          ))}

        </div>

      </div>
    </section>
  );
}

/* ---------- From The Ground ---------- */

const UPDATES = [
  {
    img: news1,
    date: "20 Jul 2026",
    cat: "Match Result",
    title: "Sunesa FC 2 - 1 Opponent FC",
    excerpt:
      "An important victory in the BDFA 'C' Division as the team continued its strong run with a disciplined performance.",
  },
  {
    img: news2,
    date: "Now Open",
    cat: "Trials",
    title: "Academy Trials 2026",
    excerpt:
      "Trials are now open for boys and girls aged 12–18. Register now to begin your football journey with Sunesa FC.",
  },
  {
    img: news3,
    date: "Weekly Schedule",
    cat: "Training",
    title: "Senior Team Training",
    excerpt:
      "Training sessions are held Monday to Friday at 6:00 AM and 5:00 PM. Join us as we prepare for the upcoming season.",
  },
];

function NewsSection() {
  return (
    <section
      id="news"
      className="relative bg-brand-surface/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <SectionHeading
          eyebrow="From The Ground"
          title={"Latest From |Sunesa|"}
          subtitle="Stay updated with match results, trial announcements, training schedules and everything happening around the club."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">

          {UPDATES.map((post) => (
            <article
              key={post.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-brand-background transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.img}
                  alt={post.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-brand-secondary/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground">
                  {post.cat}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">

                <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  {post.date}
                </div>

                <h3 className="mt-3 font-display text-xl leading-snug text-foreground">
                  {post.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>

                <button
                  className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary transition-colors hover:text-brand-primary-soft"
                >
                  Read Update
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

              </div>
            </article>
          ))}

        </div>

      </div>
    </section>
  );
}

/* ---------- Apply For Trials ---------- */

function TrialsSection() {
  const [submitted, setSubmitted] = useState(false);

  // Future CMS values (Supabase)
  const applicationsOpen = true;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="trials" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">

          <div>

            <SectionHeading
              eyebrow="Apply For Trials"
              title={"Your Boots. Your Dream.| Our Club.|"}
              subtitle="Think you have what it takes? Apply for trials and begin your football journey with Sunesa Football Club."
            />

            <div className="mt-8 space-y-5 text-sm text-muted-foreground">

              <p className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-brand-primary" />
                Open to aspiring footballers looking to train and compete.
              </p>

              <p className="flex items-start gap-3">
                <Users className="mt-0.5 h-4 w-4 text-brand-primary" />
                Structured coaching with competitive match exposure.
              </p>

              <p className="flex items-start gap-3">
                <Trophy className="mt-0.5 h-4 w-4 text-brand-primary" />
                Outstanding players progress into competitive Sunesa FC squads.
              </p>

              <div className="glass-card mt-8 rounded-2xl p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary">
                  Trial Status
                </div>

                <div className="mt-3 flex items-center gap-3">

                  <span
                    className={`h-3 w-3 rounded-full ${
                      applicationsOpen
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />

                  <span className="font-medium text-foreground">
                    {applicationsOpen
                      ? "Applications are currently OPEN"
                      : "Applications are currently CLOSED"}
                  </span>

                </div>

                <p className="mt-3 text-sm text-muted-foreground">
                  Trial availability will be managed from the future admin
                  dashboard.
                </p>
              </div>

            </div>

          </div>

          <form
            onSubmit={onSubmit}
            className="glass-card rounded-3xl p-8"
          >

            <div className="grid gap-5 sm:grid-cols-2">

              <Field
                label="Player Name"
                name="player"
                placeholder="Full Name"
              />

              <Field
                label="Date of Birth"
                name="dob"
                type="date"
              />

              <Field
                label="Parent / Guardian"
                name="guardian"
                placeholder="Full Name"
              />

              <Field
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
              />

              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="you@example.com"
                full
              />

              <SelectField
                label="Age Group"
                name="age"
                options={[
                  "Under 10",
                  "Under 12",
                  "Under 14",
                  "Under 16",
                  "Under 18",
                ]}
              />

              <SelectField
                label="Preferred Training"
                name="batch"
                options={[
                  "Morning",
                  "Evening",
                  "Weekend",
                ]}
              />

              <Field
                label="Previous Football Experience"
                name="experience"
                placeholder="School Team, Academy, None..."
                full
              />

              <div className="sm:col-span-2">

                <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  Additional Information
                </label>

                <textarea
                  rows={4}
                  name="notes"
                  placeholder="Tell us anything you'd like us to know..."
                  className="w-full rounded-xl border border-border bg-brand-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-primary"
                />

              </div>

            </div>

            <button
              type="submit"
              disabled={!applicationsOpen}
              className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] transition-all ${
                applicationsOpen
                  ? "bg-gradient-gold text-primary-foreground shadow-gold hover:-translate-y-0.5"
                  : "cursor-not-allowed bg-secondary text-muted-foreground"
              }`}
            >
              {submitted
                ? "Application Submitted Successfully"
                : applicationsOpen
                ? "Apply For Trials"
                : "Applications Closed"}

              {applicationsOpen && !submitted && (
                <ArrowRight className="h-4 w-4" />
              )}
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}

/* ---------- Contact ---------- */

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Training Ground",
    value: "Sunesa Football Club, Bangalore",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 XXXXX XXXXX",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 XXXXX XXXXX",
  },
  {
    icon: Mail,
    label: "Email",
    value: "sunesafc2012@gmail.com",
  },
  {
    icon: Clock,
    label: "Training Schedule",
    value: "Mon – Fri • 6:00 AM & 5:00 PM",
  },
];

const SOCIALS = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "#",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "#",
  },
  {
    icon: Youtube,
    label: "YouTube",
    href: "#",
  },
];

function ContactSection() {
  return (
    <section
      id="contact"
      className="relative bg-brand-surface/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <SectionHeading
          eyebrow="Contact"
          title={"Visit |Sunesa|"}
          subtitle="Whether you're looking to join our academy, support the club or simply learn more, we'd love to hear from you."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.25fr]">

          {/* Left */}

          <div className="space-y-5">

            {CONTACT_INFO.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-2xl border border-border bg-brand-background p-5 transition-colors hover:border-brand-primary/40"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <item.icon className="h-5 w-5" />
                </div>

                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    {item.label}
                  </div>

                  <div className="mt-1 text-sm text-foreground">
                    {item.value}
                  </div>
                </div>
              </div>
            ))}

            <div className="glass-card rounded-2xl p-6">

              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary">
                Follow Sunesa FC
              </div>

              <div className="mt-5 flex gap-3">

                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-brand-background transition-all hover:border-brand-primary hover:text-brand-primary"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="space-y-6">

            <div className="glass-card rounded-2xl p-6">

              <h3 className="font-display text-2xl text-foreground">
                Ready to Visit?
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Come experience Sunesa Football Club firsthand. Watch a training
                session, meet our coaches and discover how we develop the next
                generation of footballers.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <a
                  href="#trials"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-gold px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground shadow-gold"
                >
                  Join Trials
                </a>

                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-lg border border-brand-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-primary transition-colors hover:bg-brand-primary/10"
                >
                  Get Directions
                </a>

              </div>

            </div>

            <div className="overflow-hidden rounded-2xl border border-border">

              {/* Replace with Google Maps iframe later */}

              <div className="grid min-h-[360px] place-items-center bg-[radial-gradient(ellipse_at_center,var(--surface)_0%,var(--charcoal)_75%)]">

                <div className="text-center">

                  <MapPin className="mx-auto h-10 w-10 text-brand-primary" />

                  <h3 className="mt-4 font-display text-2xl">
                    Google Maps
                  </h3>

                  <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                    This area will display the club's embedded Google Map.
                    The map URL will later be managed directly from the
                    admin dashboard.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="relative border-t border-border bg-brand-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">

        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-3">

              <img
                src={LOGO}
                alt="Sunesa Football Club"
                className="h-12 w-12 rounded-full ring-1 ring-brand-primary/50"
              />

              <div>

                <div className="brand-font truncate text-sm tracking-[0.08em] text-foreground">
                 Sunesa Football Club
                </div>

                <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Established 2012
                </div>

              </div>

            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Building Bangalore's next generation of footballers through
              disciplined coaching, competitive football and professional
              development.
            </p>

          </div>

          {/* Links */}

          <div>

            <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-primary">
              Quick Links
            </div>

            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">

              {siteNavigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="transition-colors hover:text-brand-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}

            </ul>

          </div>

          {/* Contact */}

          <div>

            <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-primary">
              Contact
            </div>

            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">

              <li>Bangalore, Karnataka</li>

              <li>+91 XXXXX XXXXX</li>

              <li>sunesafc2012@gmail.com</li>

              <li>Mon – Fri • 6:00 AM & 5:00 PM</li>

            </ul>

          </div>

          {/* Social */}

          <div>

            <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-primary">
              Follow Us
            </div>

            <div className="mt-4 flex gap-3">

              {[Instagram, Facebook, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-brand-surface text-muted-foreground transition-all hover:border-brand-primary hover:text-brand-primary"
                  aria-label="Social Media"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}

            </div>

          </div>

        </div>

        <div className="mt-12 gold-divider opacity-40" />

        <div className="mt-6 flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">

          <div>
            © {new Date().getFullYear()} Sunesa Football Club. All Rights Reserved.
          </div>

          <div className="uppercase tracking-[0.22em] text-brand-primary">
            Grassroots Heart • Professional Standards
          </div>

        </div>

      </div>
    </footer>
  );
}

/* ---------- Root ---------- */

export function SunesaSite() {
  return (
    <div className="scroll-smooth bg-brand-background text-foreground antialiased">

      <Navbar />

      <main>

        <Hero />

        <AboutSection />

        <GallerySection />

        <NewsSection />

        <TrialsSection />

        <ContactSection />

      </main>

      <Footer />

    </div>
  );
}