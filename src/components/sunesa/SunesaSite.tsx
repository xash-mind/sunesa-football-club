import { useEffect, useState, type FormEvent } from "react";
import {
  Menu,
  X,
  ShieldCheck,
  Trophy,
  Users,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  ArrowRight,
} from "lucide-react";
import { usePages } from "@/hooks/usePages";
import { getForms, type Form } from "@/services/forms";
import FormRenderer from "@/components/forms/FormRenderer";

import { navigation as siteNavigation } from "@/config/navigation";
import { getPublishedNews } from "@/services/news";

/* ---------- Assets ---------- */


import aboutImg from "@/assets/hero/hero1.png";
import Logo from "@/assets/logo/Logo.jpg";
import heroImg from "@/assets/gallery/Team (7).jpg";

/* Gallery */
import {
  getAllGalleryImages,
  type GalleryImage,
} from "@/services/gallery";


/* News */
import newsMatchday from "@/assets/news/News-MatchDay (1).jpg";
import newsResult from "@/assets/news/News-Results (1).jpg";
import newsStartingXI from "@/assets/news/News-StartingTeam (1).jpg";


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
            src={Logo}
            alt="Sunesa Football Club emblem"
            className="h-11 w-11 shrink-0 rounded-full ring-1 ring-[color-mix(in_oklab,var(--gold)_45%,transparent)]"
          />

          <div className="min-w-0 leading-tight">
           <div className="brand-font truncate text-base tracking-wider text-foreground">
           sunesa football club
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

function TrustBadge({
  className,
  badge,
}: {
  className?: string;
  badge?: string;
}) {
  return (
    <div className={className} aria-hidden>
      <div className="inline-flex items-center gap-3 rounded-full border border-brand-primary/25 bg-brand-background/30 px-5 py-2.5 backdrop-blur-xl shadow-gold transition-all duration-300 hover:border-brand-primary/45 hover:bg-brand-background/40">
        <ShieldCheck className="h-5 w-5 text-brand-primary" />

        <span className="text-sm font-medium tracking-wide text-foreground">
          {badge || "Official BDFA Club ⭐"}
        </span>
      </div>
    </div>
  );
}
          
type HeroContent = {
  badge?: string;
  heading1?: string;
  heading2?: string;
  heading3?: string;
  description?: string;
  primaryButton?: string;
  primaryButtonLink?: string;
  secondaryButton?: string;
  secondaryButtonLink?: string;
  stats?: {
    value: string;
    label: string;
  }[];
};
function Hero({
  hero,
}: {
  hero?: HeroContent;
}) {
  return (
    <section id="home" className="relative isolate min-h-screen overflow-hidden">

      <img
  src={aboutImg}
  alt="Sunesa Football Club players during training"
  className="
    absolute inset-0
    h-full w-full
    object-cover
    object-[87%_center]
    sm:object-center
    scale-105
  "
  width={1920}
  height={1080}
/>

      {/* Cinematic overlays */}

      <div className="absolute inset-0 bg-gradient-to-b from-brand-background/60 via-brand-background/35 to-brand-background/82" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,var(--background)_88%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 pt-20 pb-16 text-center sm:px-6">

        {/* Trust Badge */}

       <TrustBadge
  className="mb-20"
  badge={hero?.badge}
/>
       <div className="relative -mt-4 mb-6">

  <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-brand-primary/35 via-brand-secondary/15 to-transparent blur-3xl scale-100" />

  <div className="h-32 w-32 overflow-hidden rounded-full shadow-[0_0_55px_rgba(212,175,55,0.30)] sm:h-40 sm:w-40">

    <img
      src={Logo}
      alt="Sunesa Football Club Logo"
      className="h-full w-full scale-[1.10] object-cover"
    />

  </div>

</div>


        {/* Hero Text */}

        <div className="relative">

          <div className="absolute -inset-10 -z-10 rounded-[4rem] bg-black/18 blur-3xl" />

          <h1 className="max-w-5xl font-display text-5xl leading-[0.92] text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.75)] sm:text-6xl md:text-7xl lg:text-8xl">

            <span className="block">
             {hero?.heading1 || "One Club."}
            </span>

            <span className="block text-gradient-gold drop-shadow-[0_0_20px_rgba(214,174,70,0.35)]">
              {hero?.heading2 || "One Passion."}
            </span>

            <span className="block">
              {hero?.heading3 || "Endless Possibilities."}
            </span>

          </h1>

        </div>

        <p className="mt-8 max-w-3xl text-base leading-relaxed text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] sm:text-lg">
          {hero?.description || 
  "Sunesa Football Club develops disciplined, confident and technically gifted footballers through professional coaching, competitive training and a passion for the beautiful game."}
        </p>

        <div className="mt-12 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">

          <a
            href={hero?.primaryButtonLink || "#trials"}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-primary-foreground shadow-gold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-auto"
          >
            {hero?.primaryButton || "Join Trials"}

            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href={hero?.secondaryButtonLink || "#about"}
            className="inline-flex w-full items-center justify-center rounded-xl border border-brand-primary/50 bg-brand-background/20 px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-brand-primary backdrop-blur-md transition-all duration-300 hover:bg-brand-primary/10 sm:w-auto"
          >
            {hero?.secondaryButton || "About Us"}
          </a>

        </div>

        <div className="mt-20 grid w-full max-w-3xl grid-cols-3 gap-6 border-t border-brand-primary/20 pt-10">

         {(
  hero?.stats ?? [
    {
      value: "150+",
      label: "Players",
    },
    {
      value: "14+",
      label: "Years",
    },
    {
      value: "BDFA",
      label: "League Club",
    },
  ]
).map((item) => (
  <div
    key={item.label}
    className="text-center"
  >
    <div className="font-display text-3xl text-gradient-gold sm:text-4xl">
      {item.value}
    </div>

    <div className="mt-2 text-[11px] uppercase tracking-[0.24em] text-white/70">
      {item.label}
    </div>
  </div>
))}

        </div>

      </div>

    </section>
  );
}
type AboutContent = {

  card1Eyebrow?: string;
card1Title?: string;
card1Description?: string;

card2Eyebrow?: string;
card2Title?: string;
card2Description?: string;

card3Eyebrow?: string;
card3Title?: string;
card3Description?: string;

  badge?: string;
  established?: string;

  eyebrow?: string;
  title?: string;
 subtitle?: string;

  missionTitle?: string;
  missionDescription?: string;

  visionTitle?: string;
  visionDescription?: string;

  story?: string;

  valuesTitle?: string;
  values?: string[];

  whyEyebrow?: string;
  whyTitle?: string;
  whySubtitle?: string;

  cards?: {
    eyebrow: string;
    title: string;
    description: string;
  }[];
};
function AboutSection({
  about,
}: {
  about?: AboutContent;
}) {
  const values =
  about?.values ||  [
    "Discipline",
    "Development",
    "Respect",
    "Teamwork",
    "Commitment",
    "Excellence",
  ];

const whyCards = [
  {
    eyebrow: about?.card1Eyebrow || "Discipline",
    title: about?.card1Title || "Character First",
    description:
      about?.card1Description ||
      "Structured training develops discipline, responsibility and confidence on and off the pitch.",
  },
  {
    eyebrow: about?.card2Eyebrow || "Development",
    title: about?.card2Title || "Train With Purpose",
    description:
      about?.card2Description ||
      "Professional coaching and competitive football accelerate technical growth and football intelligence.",
  },
  {
    eyebrow: about?.card3Eyebrow || "Opportunity",
    title: about?.card3Title || "Pathway To Competition",
    description:
      about?.card3Description ||
      "A clear progression from academy football to senior league competition provides players with meaningful opportunities to grow.",
  },
];

  return (
  <section id="about" className="relative pt-24 pb-14 sm:pt-32 sm:pb-16">

    <div className="mx-auto max-w-7xl px-4 sm:px-6">

      {/* ================= TOP ================= */}

      <div className="grid items-center gap-10 lg:grid-cols-[1.8fr_0.7fr]">

        {/* Hero Image */}

        <div className="relative overflow-hidden rounded-3xl border border-brand-primary/20 shadow-gold">
        <div className="h-[280px] sm:h-[360px] lg:h-[460px] w-full object-cover object-center brightness-105 contrast-110 saturate-125">

          <img
            src={heroImg}
            alt="About Sunesa Football Club"
            className="h-[280px] sm:h-[360px] lg:h-[460px] w-full object-cover object-center"
            loading="lazy"
          />
        </div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-background via-brand-background/10 to-transparent" />

          {/* Trust Badge */}

          <div className="absolute bottom-6 left-6">
            <TrustBadge badge={about?.badge} />
          </div>

          {/* EST Card */}

        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">

  <div
    className="
      rounded-lg
      border border-brand-primary/15
      bg-brand-background/35
      px-3 py-2
      sm:px-4 sm:py-3
      backdrop-blur-3xl
      backdrop-saturate-150
      shadow-[0_8px_24px_rgba(0,0,0,0.18)]
    "
  >

    <div className="font-display text-lg tracking-[0.08em] text-brand-primary sm:text-2xl">
      {about?.established || "EST. 2012"}
    </div>

  </div>

</div>

        </div>

        {/* Header */}

        <div>

         <SectionHeading
  eyebrow={about?.eyebrow || "About Sunesa FC"}
  title={
    about?.title || 
    "Building Bangalore's |Next Generation| of Footballers"
  }
  subtitle={
    about?.subtitle || 
    "Sunesa Football Club was founded in 2012 with one mission — to identify raw talent from the grassroots and shape it into disciplined, match-ready players. From local grounds to BDFA 'C' Division, we provide structured coaching, competitive exposure and a clear pathway for young footballers in Bangalore."
  }
/>
        </div>

      </div>

      

        {/* ================= CONTENT ================= */}

        <div className="mt-16">

          <div className="grid gap-6 lg:grid-cols-2">

            <div className="glass-card rounded-2xl p-6">

              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-primary">
                {about?.missionTitle || "Mission"}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {about?.missionDescription || 
  "To identify grassroots talent and develop disciplined, technically skilled footballers through structured coaching, competitive match experience and a culture of continuous improvement."}
              </p>

            </div>

            <div className="glass-card rounded-2xl p-6">

              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-primary">
                {about?.visionTitle || "Vision"}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {about?.visionDescription || 
  "To become one of Bangalore's leading football clubs by creating opportunities for players to progress from grassroots football to senior competitive league football."}
              </p>

            </div>

          </div>

          {/* Story */}

          <div className="mt-10 glass-card rounded-2xl p-8">

            <p className="text-base leading-8 text-muted-foreground">
              {about?.story || 
  "From local grounds to the BDFA C Division, Sunesa Football Club provides structured coaching, competitive exposure and a clear pathway for young footballers in Bangalore. We believe success is built on consistency, discipline and creating an environment where every player is challenged to improve."}
            </p>

          </div>

          {/* Core Values */}

          <div className="mt-12">

            <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-primary">
              {about?.valuesTitle || "Core Values"}
            </div>

            <ul className="flex flex-wrap gap-3">

              {values.map((value: string) => (
                <li
                  key={value}
                  className="rounded-full border border-border bg-secondary px-5 py-2 text-xs uppercase tracking-wide text-muted-foreground transition-all hover:border-brand-primary hover:text-brand-primary"
                >
                  {value}
                </li>
              ))}

            </ul>

          </div>

          {/* Why Choose */}

          <div className="mt-20">

            <SectionHeading
  eyebrow={about?.whyEyebrow || "Why Sunesa FC"}
  title={
    about?.whyTitle || "Why Players Choose |sunesa|"
  }
  subtitle={
    about?.whySubtitle || "We believe great footballers are built through consistent training, competitive experience and a culture that values character just as much as talent."
  }
  align="center"
/>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
  {whyCards.map((card) => (
    <div
      key={card.title}
      className="glass-card rounded-2xl p-6"
    >
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-primary">
        {card.eyebrow}
      </div>

      <h3 className="font-display text-2xl">
        {card.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {card.description}
      </p>
    </div>
  ))}
</div>

          </div>

        </div>

      </div>

    </section>
  );
}


/* ---------- Gallery ---------- */



const CATS = [
  "All",
  "Team",
  "Training",
  "Matches",
  "Events",
] as const;

type GalleryContent = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

function GallerySection({
  gallery,
}: {
  gallery?: GalleryContent;
}) {
  const [active, setActive] =
    useState<(typeof CATS)[number]>("All");

  const [selectedImage, setSelectedImage] =
    useState<GalleryImage | null>(null);

  const [images, setImages] =
    useState<GalleryImage[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadGallery() {
      try {
        const data =
          await getAllGalleryImages();

        setImages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadGallery();
  }, []);

  const filtered = images.filter(
    (image) =>
      active === "All" ||
      image.category === active
  );

  return (
    <section
      id="gallery"
      className="relative pt-14 pb-24 sm:pt-16 sm:pb-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">

          <SectionHeading
            eyebrow={gallery?.eyebrow || "Gallery"}
            title={
              gallery?.title ||
              "Moments From |sunesa|"
            }
            subtitle={
              gallery?.subtitle ||
              "Explore Sunesa's journey through training sessions, matchdays, team moments and memorable events since 2012."
            }
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

        {loading ? (

          <p className="mt-12 text-center text-muted-foreground">
            Loading gallery...
          </p>

        ) : (

          <div className="news-scroll mt-12 max-h-[70vh] overflow-y-auto pr-4">
            <div className="grid auto-rows-[220px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">

              {filtered.map((g, i) => (

                <figure
                  key={g.id}
                  onClick={() => setSelectedImage(g)}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-border transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary hover:shadow-gold ${
                    i % 7 === 0 ? "row-span-2" : ""
                  } ${
                    i % 11 === 0 ? "col-span-2" : ""
                  }`}
                >

                  <img
                    src={g.image_url}
                    alt={g.title ?? g.category}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-brand-background via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-90" />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/20">
                    <span className="text-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      🔍
                    </span>
                  </div>

                  <figcaption className="absolute bottom-4 left-4 rounded-full bg-brand-background/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-primary backdrop-blur">
                    {g.category}
                  </figcaption>

                </figure>

              ))}

            </div>
          </div>

        )}

      </div>

      {selectedImage && (

        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 backdrop-blur-md animate-in fade-in duration-200"
        >

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            className="absolute right-6 top-6 rounded-full bg-brand-background/80 px-4 py-2 text-xl text-white transition hover:bg-brand-primary"
          >
            ✕
          </button>

          <img
            src={selectedImage.image_url}
            alt={
              selectedImage.title ??
              selectedImage.category
            }
            onClick={(e) =>
              e.stopPropagation()
            }
            className="max-h-[90vh] max-w-[90vw] rounded-3xl object-contain shadow-2xl"
          />

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-brand-background/80 px-5 py-2 backdrop-blur">
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-primary">
              {selectedImage.category}
            </span>
          </div>

        </div>

      )}

    </section>
  );
}
/* ---------- From The Ground ---------- */
function NewsSection({
  news,
}: {
  news?: Record<string, any>;
}) {

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    async function loadNews() {

      try {

        const data = await getPublishedNews();

        setPosts(data);

      } catch(err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    }

    loadNews();

  }, []);



 return (
  <section
    id="news"
    className="relative bg-brand-surface/40 py-24 sm:py-32"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
     <SectionHeading
  eyebrow={news?.eyebrow || "From The Ground"}
  title={news?.title || "Latest From |sunesa|"}
  subtitle={
    news?.subtitle ||
    "Stay updated with match results, trial announcements, training schedules and everything happening at Sunesa Football Club."
  }
/>

      {loading && (
        <p className="mt-10 text-muted-foreground">
          Loading updates...
        </p>
      )}

      {!loading && posts.length === 0 && (
        <p className="mt-10 text-muted-foreground">
          No updates available yet.
        </p>
      )}

      {posts.length <= 3 ? (
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-brand-background transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-brand-secondary/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]">
                  News
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl">
                  {post.title}
                </h3>

                <p className="mt-3 flex-1 text-sm text-muted-foreground">
                  {post.excerpt}
                </p>

                <a
                  href={`/news/${post.slug}`}
                  className="mt-6 inline-flex w-fit items-center gap-2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary transition-colors hover:text-brand-primary-soft"
                >
                  Read Update
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
       <>
       <div className="mt-6 mb-4 flex items-center justify-start gap-2 text-xs font-medium uppercase tracking-[0.22em] text-brand-primary/80">
       <span className="scroll-hint-arrow">←</span>
       <span>Swipe to explore</span>
       <span className="scroll-hint-arrow-right">→</span>
       </div>

        <div className="news-scroll mt-14 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex min-w-[340px] max-w-[340px] snap-start flex-col overflow-hidden rounded-2xl border border-border bg-brand-background transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-brand-secondary/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]">
                  News
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl">
                  {post.title}
                </h3>

                <p className="mt-3 flex-1 text-sm text-muted-foreground">
                  {post.excerpt}
                </p>

                <a
                  href={`/news/${post.slug}`}
                  className="mt-6 inline-flex w-fit items-center gap-2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary transition-colors hover:text-brand-primary-soft"
                >
                  Read Update
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                </a>
              </div>
            </article>
          ))}
        </div>
        </>
      )}
    </div>
  </section>
  
);
}

/* ---------- Apply For Trials ---------- */

type TrialsContent = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;

  point1?: string;
  point2?: string;
  point3?: string;
};


function TrialsSection({
  trials,
}: {
  trials?: Record<string, any>;
}) {
  const [submitted, setSubmitted] = useState(false);
const [trialForms, setTrialForms] = useState<Form[]>([]);
const [loadingForms, setLoadingForms] = useState(true);
const [selectedForm, setSelectedForm] = useState<Form | null>(null);

useEffect(() => {
  async function loadTrialForms() {
    try {
      const forms = await getForms();

      setTrialForms(
        forms.filter(
          (form) =>
            form.active &&
            form.placement === "trials"
        )
      );
    } catch (error) {
      console.error("Failed to load trial forms:", error);
    } finally {
      setLoadingForms(false);
    }
  }

  loadTrialForms();
}, []);

const applicationsOpen = trialForms.length > 0;
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
              eyebrow={trials?.eyebrow || "Apply For Trials"}
  title={
    trials?.title ||
    "Your Boots. Your Dream.| Our Club.|"
  }
  subtitle={
    trials?.subtitle ||
    "Think you have what it takes? Apply for trials and begin your football journey with Sunesa Football Club."
  }
/>
            <div className="mt-8 space-y-5 text-sm text-muted-foreground">

               <p className="flex items-start gap-3">
    <ShieldCheck className="mt-0.5 h-4 w-4 text-brand-primary" />
    {trials?.point1 ||
      "Open to aspiring footballers looking to train and compete."}
  </p>

  <p className="flex items-start gap-3">
    <Users className="mt-0.5 h-4 w-4 text-brand-primary" />
    {trials?.point2 ||
      "Structured coaching with competitive match exposure."}
  </p>

  <p className="flex items-start gap-3">
    <Trophy className="mt-0.5 h-4 w-4 text-brand-primary" />
    {trials?.point3 ||
      "Outstanding players progress into competitive Sunesa FC squads."}
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

         <div className="space-y-5">

   {selectedForm ? (
  <FormRenderer
    form={selectedForm}
    onBack={() => setSelectedForm(null)}
  />
) : loadingForms ? (
  <div className="glass-card rounded-3xl p-8 text-center">
    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-brand-primary border-t-transparent" />

    <p className="mt-4 text-sm text-muted-foreground">
      Loading available trials...
    </p>
  </div>
) : trialForms.length === 0 ? (
  <div className="glass-card rounded-3xl p-8 text-center">
    <p className="text-sm text-muted-foreground">
      Applications are currently closed.
    </p>
  </div>
) : (
  <div className="space-y-4">
    {trialForms.map((form) => (
      <div
        key={form.id}
        className="
          glass-card
          rounded-3xl
          p-6
          transition-all
          hover:-translate-y-1
          hover:border-brand-primary/50
          hover:shadow-gold
        "
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl">
              {form.name}
            </h3>

            {form.description && (
              <p className="mt-2 text-sm text-muted-foreground">
                {form.description}
              </p>
            )}
          </div>

          <span
            className="
              shrink-0
              rounded-full
              bg-green-500/10
              px-3 py-1
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-green-400
            "
          >
            Open
          </span>
        </div>

        <button
          type="button"
          onClick={() => setSelectedForm(form)}
          className="
            mt-6
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-gradient-gold
            px-6
            py-3.5
            text-sm
            font-semibold
            uppercase
            tracking-[0.18em]
            text-primary-foreground
            shadow-gold
            transition-all
            hover:-translate-y-0.5
          "
        >
          Apply Now
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    ))}
  </div>
)}


  
  

</div>

        </div>

      </div>
    </section>
  );
}

/* ---------- Contact ---------- */

const CONTACT_INFO = (contact?: ContactContent) => [
  {
    icon: MapPin,
    label: contact?.card1Label || "Training Ground",
    value: contact?.card1Value || "Sunesa Football Club, Bangalore",
  },
  {
    icon: Phone,
    label: contact?.card2Label || "Phone",
    value: contact?.card2Value || "+91 XXXXX XXXXX",
  },
  {
    icon: MessageCircle,
    label: contact?.card3Label || "WhatsApp",
    value: contact?.card3Value || "+91 XXXXX XXXXX",
  },
  {
    icon: Mail,
    label: contact?.card4Label || "Email",
    value: contact?.card4Value || "sunesafc2012@gmail.com",
  },
  {
    icon: Clock,
    label: contact?.card5Label || "Training Schedule",
    value: contact?.card5Value || "Mon – Fri • 6:00 AM & 5:00 PM",
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
type ContactContent = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;

  card1Label?: string;
  card1Value?: string;

  card2Label?: string;
  card2Value?: string;

  card3Label?: string;
  card3Value?: string;

  card4Label?: string;
  card4Value?: string;

  card5Label?: string;
  card5Value?: string;

  socialTitle?: string;

  visitTitle?: string;
  visitDescription?: string;

  primaryButton?: string;
  primaryButtonLink?: string;

  secondaryButton?: string;
  secondaryButtonLink?: string;

  mapTitle?: string;
  mapDescription?: string;

  instagram?: string;
  facebook?: string;
  youtube?: string;
};
function ContactSection({
  contact,
}: {
  contact?: Record<string, any>;
}) {
  return (
    <section
      id="contact"
      className="relative bg-brand-surface/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <SectionHeading
          eyebrow={contact?.eyebrow || "Contact"}
          title={
            contact?.title || 
            "Visit |sunesa|"
          }
          subtitle={
            contact?.subtitle || 
            "Whether you're looking to join our academy, support the club or simply learn more, we'd love to hear from you."
          }
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.25fr]">

          {/* Left */}

          <div className="space-y-5">

            {CONTACT_INFO(contact).map(
  (
    item: {
      icon: any;
      label: string;
      value: string;
    }
  ) => (
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
              )
            )}

            <div className="glass-card rounded-2xl p-6">

              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary">
                {contact?.socialTitle || 
                  "Follow Sunesa FC"}
              </div>

              <div className="mt-5 flex gap-3">           

  {[
    {
      icon: Instagram,
      label: "Instagram",
      href: contact?.instagram || "#",
    },
    {
      icon: Facebook,
      label: "Facebook",
      href: contact?.facebook || "#",
    },
    {
      icon: Youtube,
      label: "YouTube",
      href: contact?.youtube || "#",
    },
  ].map((social) => (
    <a
      key={social.label}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
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
                {contact?.visitTitle || 
                  "Ready to Visit?"}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {contact?.visitDescription || 
                  "Come experience Sunesa Football Club firsthand. Watch a training session, meet our coaches and discover how we develop the next generation of footballers."}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <a
                  href={
                    contact?.primaryButtonLink || 
                    "#trials"
                  }
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-gold px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground shadow-gold"
                >
                  {contact?.primaryButton || 
                    "Join Trials"}
                </a>

                <a
                  href={
                    contact?.secondaryButtonLink || 
                    "#"
                  }
                  className="inline-flex items-center justify-center rounded-lg border border-brand-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-primary transition-colors hover:bg-brand-primary/10"
                >
                  {contact?.secondaryButton || 
                    "Get Directions"}
                </a>

              </div>

            </div>

            <div className="overflow-hidden rounded-2xl border border-border">

  {contact?.mapEmbed ? (

    <iframe
      src={contact.mapEmbed}
      className="h-[360px] w-full"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />

  ) : (

    <div className="grid min-h-[360px] place-items-center bg-[radial-gradient(ellipse_at_center,var(--surface)_0%,var(--charcoal)_75%)]">

      <div className="text-center">

        <MapPin className="mx-auto h-10 w-10 text-brand-primary" />

        <p className="mt-4 text-sm text-muted-foreground">
          No Google Maps embed has been configured yet.
        </p>

      </div>

    </div>

  )}

</div>

          </div>

        </div>

      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer({
  footer,
}: {
  footer?: Record<string, any>;
}) {
  return (
    <footer className="relative border-t border-border bg-brand-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">

        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-3">

              <img
                src={Logo}
                alt="Sunesa Football Club"
                className="h-12 w-12 rounded-full ring-1 ring-brand-primary/50"
              />

              <div>

                <div className="brand-font truncate text-sm tracking-[0.08em] text-foreground">
                  sunesa football club
                </div>

                <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Established 2012
                </div>

              </div>

            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {footer?.description ||
                "Building Bangalore's next generation of footballers through disciplined coaching, competitive football and professional development."}
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

              <li>
                {footer?.address || "Bangalore, Karnataka"}
              </li>

              <li>
                {footer?.phone || "+91 XXXXX XXXXX"}
              </li>

              <li>
                {footer?.email || "sunesafc2012@gmail.com"}
              </li>

              <li>
                {footer?.schedule || "Mon – Fri • 6:00 AM & 5:00 PM"}
              </li>

            </ul>

          </div>

          {/* Social */}

          <div>

            <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-primary">
              Follow Us
            </div>

            <div className="mt-4 flex gap-3">

              <a
                href={footer?.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-brand-surface text-muted-foreground transition-all hover:border-brand-primary hover:text-brand-primary"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href={footer?.facebook || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-brand-surface text-muted-foreground transition-all hover:border-brand-primary hover:text-brand-primary"
              >
                <Facebook className="h-5 w-5" />
              </a>

              <a
                href={footer?.youtube || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-brand-surface text-muted-foreground transition-all hover:border-brand-primary hover:text-brand-primary"
              >
                <Youtube className="h-5 w-5" />
              </a>

            </div>

          </div>

        </div>

        <div className="mt-12 gold-divider opacity-40" />

        <div className="mt-6 flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">

          <div>
            {footer?.copyright ||
              `© ${new Date().getFullYear()} Sunesa Football Club. All Rights Reserved.`}
          </div>

         <div className="uppercase tracking-[0.22em] text-brand-primary">
          {footer?.tagline ||
          "Grassroots Heart • Professional Standards"}
        </div>
        </div>

      </div>
    </footer>
  );
}

/* ---------- Root ---------- */

export function SunesaSite() {

  const { pages, loading } = usePages();

  const hero = pages.find(
    (p) => p.section === "hero"
  )?.content;

  const about = pages.find(
    (p) => p.section === "about"
  )?.content as AboutContent | undefined;

  const gallery = pages.find(
    (p) => p.section === "gallery"
  )?.content;

  const news = pages.find(
    (p) => p.section === "news"
  )?.content;

  const trials = pages.find(
    (p) => p.section === "trials"
  )?.content;

  const contact = pages.find(
    (p) => p.section === "contact"
  )?.content;

  const footer = pages.find(
    (p) => p.section === "footer"
  )?.content;

  const [showLoader, setShowLoader] = useState(true);


  useEffect(() => {
  if (!loading) {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1800); // 2.5 seconds

    return () => clearTimeout(timer);
  }
}, [loading]);

if (loading || showLoader) {
 
  return (
  <div className="flex min-h-screen flex-col items-center justify-center bg-brand-background">
    <div className="coin-loader mb-7">
  <img
    src={Logo}
    alt="Sunesa Football Club"
    className="logo-image"
  />
</div>
  </div>
);
     
    
}

  return (
    <div className="scroll-smooth bg-brand-background text-foreground antialiased">

      <Navbar />

      <main>

       <Hero hero={hero} />

<AboutSection about={about} />

<GallerySection gallery={gallery} />

<NewsSection news={news} />

<TrialsSection trials={trials} />

<ContactSection contact={contact} />

</main>

<Footer footer={footer} />


    </div>
  );
}