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

import sunesaLogoAsset from "@/assets/sunesa-logo.asset.json";
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

const LOGO = sunesaLogoAsset.url;

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About Arka Vega", href: "#about" },
  { label: "Sunesa Academy", href: "#academy" },
  { label: "Programs", href: "#programs" },
  { label: "Schedule", href: "#schedule" },
  { label: "Gallery", href: "#gallery" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

/* ---------- Building blocks ---------- */

function TrustBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--gold)_35%,transparent)] bg-[color-mix(in_oklab,var(--surface)_70%,transparent)] px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-gold backdrop-blur-md ${className}`}
    >
      <ShieldCheck className="h-3.5 w-3.5" />
      <span>Official Academy · Arka Vega Sports Academy</span>
    </div>
  );
}

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
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] text-gold">
          <span className="h-px w-8 bg-gold" />
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-3xl leading-[1.05] sm:text-4xl md:text-5xl">
        {title.split("|").map((part, i) => (
          <span key={i} className={i % 2 === 1 ? "text-gradient-gold" : ""}>
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
            <div className="truncate font-display text-base tracking-wider text-foreground">
              SUNESA FC
            </div>
            <div className="truncate text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              Arka Vega Sports Academy
            </div>
          </div>
        </a>

        <nav className="hidden justify-center lg:flex">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-gold"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2">
          <a
            href="#enroll"
            className="hidden rounded-md border border-gold px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-gold transition-all hover:bg-gold hover:text-primary-foreground sm:inline-flex"
          >
            Enroll Now
          </a>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-charcoal/95 backdrop-blur-xl lg:hidden">
          <ul className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-gold"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#enroll"
                onClick={() => setOpen(false)}
                className="block rounded-md border border-gold px-3 py-2.5 text-center text-sm font-semibold uppercase tracking-[0.18em] text-gold"
              >
                Enroll Now
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section id="home" className="relative isolate min-h-screen overflow-hidden">
      <img
        src={heroImg}
        alt="Youth footballers training at golden hour"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/75 to-charcoal" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--charcoal)_75%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 pb-16 pt-32 text-center sm:px-6">
        <TrustBadge className="mb-8" />

        <div className="relative mb-8">
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-blood/40 to-transparent blur-3xl" />
          <img
            src={LOGO}
            alt="Sunesa Football Club official emblem"
            className="h-28 w-28 rounded-full ring-2 ring-gold/60 shadow-gold sm:h-36 sm:w-36"
          />
        </div>

        <h1 className="font-display text-4xl leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="block text-foreground">Train With Purpose.</span>
          <span className="text-gradient-gold block">Play With Pride.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Youth football development guided by experienced veteran players and dedicated coaches
          — building disciplined, technical, and confident footballers.
        </p>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <a
            href="#enroll"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-gradient-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-gold transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            Book a Trial Session
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#programs"
            className="inline-flex w-full items-center justify-center rounded-md border border-gold/60 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold/10 sm:w-auto"
          >
            Explore Programs
          </a>
        </div>

        <div className="mt-16 grid w-full max-w-2xl grid-cols-3 gap-4 border-t border-border/60 pt-8 text-center">
          {[
            { k: "6", v: "Age Groups" },
            { k: "10+", v: "Veteran Coaches" },
            { k: "365", v: "Days of Training" },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-display text-2xl text-gold sm:text-3xl">{s.k}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.24em] text-muted-foreground sm:text-xs">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- About Arka Vega ---------- */

function AboutSection() {
  const values = [
    "Discipline",
    "Teamwork",
    "Respect",
    "Fitness",
    "Leadership",
    "Integrity",
  ];
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl border border-border">
            <img
              src={aboutImg}
              alt="Football boot striking a ball under stadium lights"
              className="h-full w-full object-cover"
              loading="lazy"
              width={1400}
              height={1000}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <TrustBadge />
            </div>
          </div>
          <div className="absolute -bottom-6 -right-4 hidden rounded-xl border border-gold/40 bg-surface p-5 shadow-gold sm:block">
            <div className="font-display text-3xl text-gradient-gold">EST.</div>
            <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Veteran-led trust
            </div>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="About Arka Vega"
            title={"A veterans' trust building the |next generation| of footballers."}
            subtitle="Arka Vega Sports Academy is a trust founded by veteran footballers who returned to the game with one mission — to structure the raw talent of young players into disciplined, technically sound athletes ready for competitive football."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="glass-card rounded-xl p-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                Mission
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Develop youth through structured, professional football coaching rooted in the
                experience of former players.
              </p>
            </div>
            <div className="glass-card rounded-xl p-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                Vision
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Create real, sustained opportunities for aspiring footballers to progress from
                grassroots to elite level.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
              Core Values
            </div>
            <ul className="flex flex-wrap gap-2">
              {values.map((v) => (
                <li
                  key={v}
                  className="rounded-full border border-border bg-secondary px-3.5 py-1.5 text-xs text-muted-foreground"
                >
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Sunesa Academy ---------- */

function AcademySection() {
  const pillars = [
    "Grassroots development",
    "Technical coaching",
    "Tactical awareness",
    "Physical conditioning",
    "Match preparation",
    "Character & discipline",
  ];
  const cards = [
    {
      icon: Dumbbell,
      title: "Technical Training",
      desc: "First touch, passing weight, ball mastery and 1-v-1 command — drilled daily under expert eyes.",
    },
    {
      icon: Brain,
      title: "Match Intelligence",
      desc: "Reading the game, positioning, decision-making and tactical awareness across every phase of play.",
    },
    {
      icon: HeartPulse,
      title: "Fitness & Conditioning",
      desc: "Age-appropriate strength, speed, agility and recovery programs built for lifelong athlete health.",
    },
  ];
  return (
    <section id="academy" className="relative py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-7xl gold-divider opacity-40" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Sunesa Academy"
              title={"Where |grassroots talent| meets structured coaching."}
              subtitle="Sunesa Football Club is the youth academy arm of Arka Vega — where young players are shaped through a philosophy of progression, respect, and relentless craft."
            />
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {pillars.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                    <Check className="h-3 w-3" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border">
            <img
              src={academyImg}
              alt="Veteran coach mentoring young footballers"
              className="h-full w-full object-cover"
              loading="lazy"
              width={1400}
              height={1000}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-charcoal via-transparent to-transparent" />
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all hover:border-gold/50 hover:shadow-gold"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/25">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Programs ---------- */

const PROGRAMS = [
  {
    group: "U8",
    days: "Mon · Wed · Fri",
    timing: "4:30 – 5:45 PM",
    focus: "Fun, coordination & ball feel",
    batch: "12 players",
    fee: "₹ 2,500 / month",
  },
  {
    group: "U10",
    days: "Mon · Wed · Fri",
    timing: "5:00 – 6:30 PM",
    focus: "Ball mastery & basic passing",
    batch: "14 players",
    fee: "₹ 2,800 / month",
  },
  {
    group: "U12",
    days: "Tue · Thu · Sat",
    timing: "5:00 – 6:45 PM",
    focus: "Small-sided games & positioning",
    batch: "16 players",
    fee: "₹ 3,200 / month",
  },
  {
    group: "U14",
    days: "Tue · Thu · Sat",
    timing: "5:30 – 7:15 PM",
    focus: "Tactical shape & 1-v-1 duels",
    batch: "18 players",
    fee: "₹ 3,500 / month",
  },
  {
    group: "U16",
    days: "Mon · Wed · Fri · Sat",
    timing: "5:30 – 7:30 PM",
    focus: "Match tempo & physical prep",
    batch: "20 players",
    fee: "₹ 3,800 / month",
  },
  {
    group: "U18",
    days: "Daily except Sunday",
    timing: "6:00 – 8:00 PM",
    focus: "Competitive scouting & S&C",
    batch: "22 players",
    fee: "₹ 4,200 / month",
  },
];

function ProgramsSection() {
  return (
    <section id="programs" className="relative bg-surface/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Programs"
          title={"Age-group |pathways| built for progression."}
          subtitle="Every program is age-appropriate, structured and led by qualified coaches with playing experience."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p) => (
            <article
              key={p.group}
              className="group relative overflow-hidden rounded-2xl border border-border bg-charcoal p-6 transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-gold"
            >
              <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-blood/25 blur-2xl transition-all group-hover:bg-gold/30" />
              <div className="flex items-start justify-between">
                <div className="font-display text-4xl text-gradient-gold sm:text-5xl">
                  {p.group}
                </div>
                <span className="rounded-full border border-blood/40 bg-blood/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-ember">
                  Enrolling
                </span>
              </div>
              <dl className="mt-6 space-y-3 text-sm">
                <Row label="Training days" value={p.days} />
                <Row label="Timing" value={p.timing} />
                <Row label="Skill focus" value={p.focus} />
                <Row label="Batch size" value={p.batch} />
                <Row label="Fee" value={p.fee} highlight />
              </dl>
              <a
                href="#enroll"
                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:text-gold-soft"
              >
                Enroll {p.group} <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-2 last:border-0 last:pb-0">
      <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</dt>
      <dd
        className={`text-right text-sm ${
          highlight ? "font-semibold text-gold" : "text-foreground"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

/* ---------- Schedule ---------- */

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SCHEDULE: Record<string, { morning?: string; evening?: string }> = {
  Mon: { morning: "U16 · U18 (6–8 AM)", evening: "U8 · U10 · U16 (4:30–7:30 PM)" },
  Tue: { morning: "Goalkeeping clinic (6–8 AM)", evening: "U12 · U14 (5–7:15 PM)" },
  Wed: { morning: "U16 · U18 (6–8 AM)", evening: "U8 · U10 · U16 (4:30–7:30 PM)" },
  Thu: { morning: "S&C session (6–7:30 AM)", evening: "U12 · U14 (5–7:15 PM)" },
  Fri: { morning: "U16 · U18 (6–8 AM)", evening: "U8 · U10 · U16 (4:30–7:30 PM)" },
  Sat: { morning: "Match simulations (7–10 AM)", evening: "U12 · U14 · U16 (4–7 PM)" },
  Sun: { morning: "Rest & recovery", evening: "Match day (fixtures)" },
};

function ScheduleSection() {
  return (
    <section id="schedule" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Weekly Schedule"
          title={"Training rhythm, |every week|."}
          subtitle="Two batches per day — morning for advanced groups and evening for grassroots. Match simulations on weekends."
        />

        {/* Desktop table */}
        <div className="mt-14 hidden overflow-hidden rounded-2xl border border-border md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface">
                <th className="px-5 py-4 text-left text-[10px] uppercase tracking-[0.22em] text-gold">
                  Day
                </th>
                <th className="px-5 py-4 text-left text-[10px] uppercase tracking-[0.22em] text-gold">
                  Morning Batch
                </th>
                <th className="px-5 py-4 text-left text-[10px] uppercase tracking-[0.22em] text-gold">
                  Evening Batch
                </th>
              </tr>
            </thead>
            <tbody>
              {DAYS.map((d) => (
                <tr key={d} className="border-t border-border/60 hover:bg-surface/60">
                  <td className="px-5 py-4 font-display text-lg text-foreground">{d}</td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {SCHEDULE[d].morning ?? "—"}
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {SCHEDULE[d].evening ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="mt-10 grid gap-3 md:hidden">
          {DAYS.map((d) => (
            <div key={d} className="rounded-xl border border-border bg-surface p-4">
              <div className="mb-2 font-display text-lg text-gold">{d}</div>
              <div className="space-y-1.5 text-sm">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Morning
                  </span>
                  <div className="text-foreground/90">{SCHEDULE[d].morning ?? "—"}</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Evening
                  </span>
                  <div className="text-foreground/90">{SCHEDULE[d].evening ?? "—"}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Facilities ---------- */

function FacilitiesSection() {
  const items = [
    { icon: Trophy, title: "Football Ground", desc: "Full-size training pitch with dedicated grassroots zones." },
    { icon: Dumbbell, title: "Training Equipment", desc: "Cones, ladders, rebounders and match-quality footballs." },
    { icon: Activity, title: "Fitness Area", desc: "Age-appropriate strength & mobility corner for prep and cooldown." },
    { icon: ClipboardList, title: "Match Analysis", desc: "Video review sessions and tactical whiteboard breakdowns." },
    { icon: HeartPulse, title: "Recovery Support", desc: "Guided stretching, foam rolling and post-session protocols." },
    { icon: Droplets, title: "Safety & Hydration", desc: "First-aid readiness, hydration stations and trained staff on site." },
  ];
  return (
    <section id="facilities" className="relative bg-surface/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Facilities"
          title={"Everything a young footballer |needs|, in one place."}
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-charcoal p-6 transition-all hover:border-gold/50"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gold/10 text-gold ring-1 ring-gold/25 transition-colors group-hover:bg-gold group-hover:text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Gallery ---------- */

const GALLERY = [
  { src: gallery1, cat: "Matches", alt: "Aerial view of a football pitch at dusk", span: "row-span-2" },
  { src: gallery2, cat: "Team", alt: "Player celebrating a goal", span: "" },
  { src: gallery3, cat: "Team", alt: "Team huddle on the pitch", span: "" },
  { src: gallery5, cat: "Training", alt: "Young footballer dribbling", span: "row-span-2" },
  { src: news1, cat: "Training", alt: "Cone drills at sunset", span: "" },
  { src: news2, cat: "Tournaments", alt: "Team lifting a trophy", span: "" },
  { src: gallery6, cat: "Events", alt: "Golden football trophy", span: "" },
  { src: news3, cat: "Events", alt: "Tactical whiteboard session", span: "" },
];
const CATS = ["All", "Training", "Matches", "Tournaments", "Team", "Events"] as const;

function GallerySection() {
  const [active, setActive] = useState<(typeof CATS)[number]>("All");
  const filtered = GALLERY.filter((g) => active === "All" || g.cat === active);

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Gallery" title={"Moments from the |Sunesa| ground."} />
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full border px-3.5 py-1.5 text-xs uppercase tracking-[0.2em] transition-colors ${
                  active === c
                    ? "border-gold bg-gold text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-gold/60 hover:text-gold"
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
              className={`group relative overflow-hidden rounded-xl border border-border ${g.span}`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-charcoal/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-gold backdrop-blur">
                {g.cat}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- News ---------- */

const NEWS = [
  {
    img: news1,
    date: "Jul 12, 2026",
    cat: "Training",
    title: "New pre-season conditioning block begins for U16 & U18",
    excerpt:
      "A focused four-week block targeting speed, agility and match endurance kicks off across our senior youth groups.",
  },
  {
    img: news2,
    date: "Jun 28, 2026",
    cat: "Tournaments",
    title: "Sunesa U14 lift the district youth cup after unbeaten run",
    excerpt:
      "Discipline, structure and character earned the boys a well-deserved title against a strong final opponent.",
  },
  {
    img: news3,
    date: "Jun 15, 2026",
    cat: "Academy",
    title: "Veteran-led tactics workshop opens to all age groups",
    excerpt:
      "Weekly video and whiteboard sessions now supplement on-pitch work — sharpening match intelligence early.",
  },
];

function NewsSection() {
  return (
    <section id="news" className="relative bg-surface/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="News & Updates"
          title={"From the |touchline|."}
          subtitle="Match reports, academy announcements and behind-the-scenes stories from Sunesa FC."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {NEWS.map((n) => (
            <article
              key={n.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-charcoal transition-all hover:-translate-y-1 hover:border-gold/50"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={n.img}
                  alt={n.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-blood/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground">
                  {n.cat}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  {n.date}
                </div>
                <h3 className="mt-3 font-display text-xl leading-snug text-foreground">
                  {n.title}
                </h3>
                <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{n.excerpt}</p>
                <a
                  href="#"
                  className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:text-gold-soft"
                >
                  Read more <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Enrollment ---------- */

function EnrollSection() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="enroll" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Enroll"
              title={"Start your |journey| with Sunesa FC."}
              subtitle="Fill out the form and our team will reach out to schedule a trial and answer any questions."
            />
            <div className="mt-8 space-y-4 text-sm text-muted-foreground">
              <p className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-gold" />
                Trial sessions are complimentary for first-time players.
              </p>
              <p className="flex items-start gap-3">
                <Users className="mt-0.5 h-4 w-4 text-gold" />
                Batch sizes are capped to keep individual attention high.
              </p>
              <p className="flex items-start gap-3">
                <Trophy className="mt-0.5 h-4 w-4 text-gold" />
                Selected players progress into competitive squads.
              </p>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="glass-card relative overflow-hidden rounded-2xl p-6 sm:p-8"
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Player name" name="player" placeholder="Full name" />
              <Field label="Date of birth" name="dob" type="date" />
              <Field label="Parent / guardian" name="parent" placeholder="Full name" />
              <Field label="Phone number" name="phone" type="tel" placeholder="+91 —" />
              <Field label="Email" name="email" type="email" placeholder="you@email.com" full />
              <SelectField
                label="Age group"
                name="age"
                options={["U8", "U10", "U12", "U14", "U16", "U18"]}
              />
              <SelectField
                label="Preferred batch"
                name="batch"
                options={["Morning", "Evening", "Weekend"]}
              />
              <Field
                label="Previous experience"
                name="exp"
                placeholder="School team, academy, none…"
                full
              />
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  Additional notes
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  className="w-full rounded-md border border-border bg-charcoal/60 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-gold"
                  placeholder="Anything we should know?"
                />
              </div>
              <div className="sm:col-span-2">
                <div className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  Trial session requested
                </div>
                <div className="flex gap-2">
                  {["Yes", "No"].map((opt) => (
                    <label
                      key={opt}
                      className="flex-1 cursor-pointer rounded-md border border-border bg-charcoal/60 px-4 py-2.5 text-center text-sm transition-colors has-[input:checked]:border-gold has-[input:checked]:bg-gold/10 has-[input:checked]:text-gold"
                    >
                      <input type="radio" name="trial" value={opt} className="sr-only" defaultChecked={opt === "Yes"} />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gradient-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-gold transition-transform hover:-translate-y-0.5"
            >
              {submitted ? "Request received — we'll be in touch" : "Submit enrollment request"}
              {!submitted && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  full,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label
        htmlFor={name}
        className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md border border-border bg-charcoal/60 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-gold"
      />
    </div>
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
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="w-full rounded-md border border-border bg-charcoal/60 px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-gold"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ---------- Contact ---------- */

function ContactSection() {
  const items = [
    { icon: MapPin, label: "Address", value: "Sunesa Ground, Arka Vega Sports Academy, City" },
    { icon: Phone, label: "Phone", value: "+91 00000 00000" },
    { icon: MessageCircle, label: "WhatsApp", value: "+91 00000 00000" },
    { icon: Mail, label: "Email", value: "hello@sunesa.arkavega.in" },
    { icon: Clock, label: "Training hours", value: "Mon–Sat · 6–8 AM & 4:30–8 PM" },
  ];
  return (
    <section id="contact" className="relative bg-surface/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title={"Visit, call or |train with us|."}
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <ul className="space-y-3">
            {items.map((it) => (
              <li
                key={it.label}
                className="flex items-start gap-4 rounded-xl border border-border bg-charcoal p-5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold ring-1 ring-gold/25">
                  <it.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {it.label}
                  </div>
                  <div className="mt-1 truncate text-sm text-foreground">{it.value}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-charcoal">
            <div className="grid h-full min-h-[360px] place-items-center bg-[radial-gradient(ellipse_at_center,var(--surface)_0%,var(--charcoal)_70%)]">
              <div className="text-center">
                <MapPin className="mx-auto h-8 w-8 text-gold" />
                <div className="mt-3 font-display text-xl text-foreground">
                  Embedded map area
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Add your Google Maps embed here
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
    <footer className="relative border-t border-border bg-charcoal">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img src={LOGO} alt="Sunesa FC" className="h-12 w-12 rounded-full ring-1 ring-gold/50" />
              <div>
                <div className="font-display tracking-wider">SUNESA FC</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Arka Vega Sports Academy
                </div>
              </div>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              A veteran-led youth football academy shaping the next generation of disciplined,
              technically sharp footballers.
            </p>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
              Quick Links
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {NAV.slice(0, 6).map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="transition-colors hover:text-gold">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
              Contact
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Sunesa Ground, Arka Vega</li>
              <li>+91 00000 00000</li>
              <li>hello@sunesa.arkavega.in</li>
              <li>Mon–Sat · 6–8 AM & 4:30–8 PM</li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
              Follow
            </div>
            <div className="mt-4 flex gap-2">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social"
                  className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 gold-divider opacity-40" />

        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Sunesa Football Club. All rights reserved.</div>
          <div className="uppercase tracking-[0.22em] text-gold/80">
            Powered by Arka Vega Sports Academy
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Root ---------- */

export function SunesaSite() {
  return (
    <div className="scroll-smooth bg-charcoal text-foreground antialiased">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <AcademySection />
        <ProgramsSection />
        <ScheduleSection />
        <FacilitiesSection />
        <GallerySection />
        <NewsSection />
        <EnrollSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}