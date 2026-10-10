import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, FileText } from "lucide-react";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Img, Reveal } from "@/components/motion";
import { LEVELS, COHORTS } from "@/data/cohorts";
import { ACHIEVEMENTS, NOTICES, PORTALS, SPORTS_GALLERY, STAFF } from "@/data/directory";
import { JOURNEY } from "@/data/journey";
import { SectionTitle } from "@/components/ui";

export default function Home() {
  const calendar = PORTALS.find((p) => p.featured)!;
  const dean = STAFF[0].people[0];
  return (
    <>
      <HeroCarousel />

      {/* Quick start */}
      <section className="border-b border-line bg-white">
        <div className="container grid gap-6 py-8 md:grid-cols-[14rem_1fr] md:items-center md:py-10">
          <div>
            <p className="eyebrow">Start here</p>
            <p className="mt-1 font-serif text-xl text-ink">I am a student in…</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-3">
            {LEVELS.map((l) => (
              <li key={l.id}>
                <Link href={`/hostel?level=${l.id}`} className={`group flex items-center justify-between rounded-2xl ${l.tint} px-5 py-4 transition hover:shadow-soft`}>
                  <span>
                    <span className="block font-semibold text-ink">{l.name}</span>
                    <span className="block text-xs text-ink-muted">{COHORTS.filter((c) => c.level === l.id).length} cohort guides</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-ink transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Journey */}
      <section className="container py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle eyebrow="Student Journey" title="From admission to your room key — and beyond" lede="Six moments in residence. Each cohort’s guide tells you exactly how they work for you." />
          <Link href="/journey" className="btn-ghost mb-8">See the full journey <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <ol className="grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {JOURNEY.map((j, i) => (
            <Reveal as="li" key={j.title} delay={i * 0.05} className={`group relative bg-white p-6 transition-colors ${j.hover} md:p-8`}>
              <span className="font-sans text-xs font-semibold tabular-nums text-crimson">0{i + 1}</span>
              <h3 className="mt-3 text-[1.45rem] leading-snug">{j.title}</h3>
              <p className="body-copy mt-2">{j.text}</p>
              <Link href={j.href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink after:absolute after:inset-0">
                {j.cta} <ArrowRight className="h-4 w-4 text-crimson transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Event calendar highlight */}
      <section className="container">
        <Reveal className="relative overflow-hidden rounded-[1.75rem] bg-crimson text-white">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" aria-hidden />
          <div className="absolute -bottom-32 right-40 h-72 w-72 rounded-full bg-white/5" aria-hidden />
          <div className="relative grid gap-8 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70"><CalendarDays className="h-4 w-4" /> Event Calendar</p>
              <h2 className="mt-3 max-w-xl text-[2rem] leading-tight md:text-[2.4rem]">What’s happening on campus this week?</h2>
              <p className="mt-3 max-w-lg text-white/80">{calendar.what}</p>
            </div>
            <a href={calendar.url!} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-crimson transition hover:bg-cream">
              Open the Event Calendar <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* Campus life teaser */}
      <section className="container py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle eyebrow="Campus Life" title="More than a room" lede="Grounds, courts, a pool, societies and fests — all within campus." />
          <Link href="/campus-life" className="btn-ghost mb-8">Explore campus life <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
          {[SPORTS_GALLERY[0], SPORTS_GALLERY[1], ACHIEVEMENTS[0], SPORTS_GALLERY[2], SPORTS_GALLERY[4]].map((s, i) => (
            <Reveal key={s.image} delay={i * 0.05} className={`group relative overflow-hidden rounded-[1.25rem] ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
              <Img src={s.image} alt={s.alt} className={i === 0 ? "aspect-square h-full md:aspect-auto" : "aspect-square"} sizes={i === 0 ? "50vw" : "25vw"} zoom width={i === 0 ? 1200 : 600} />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 pt-12">
                <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-white/70">{s.kicker}</p>
                <p className="font-serif text-lg leading-tight text-white">{s.title}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Notices + DoSA */}
      <section className="bg-white">
        <div className="container grid gap-12 py-20 md:grid-cols-[1.4fr_1fr] md:py-24">
          <div>
            <SectionTitle eyebrow="Notices" title="For your attention" />
            <ul className="divide-y divide-line border-y border-line">
              {NOTICES.slice(0, 4).map((n) => (
                <li key={n.id}>
                  <Link href={`/notices#${n.id}`} className="group flex items-start gap-4 py-4">
                    <FileText className="mt-1 h-4 w-4 shrink-0 text-crimson" aria-hidden />
                    <span className="flex-1">
                      <span className="block font-semibold text-ink group-hover:text-crimson">{n.title}</span>
                      <span className="block text-sm text-ink-muted">{n.subtitle ? `${n.category} · ${n.subtitle}` : n.category}</span>
                    </span>
                    <ArrowRight className="mt-1 h-4 w-4 text-ink-muted transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/notices" className="link-underline mt-5 inline-block text-sm font-semibold">All notices</Link>
          </div>
          <Reveal className="rounded-[1.5rem] bg-cream p-6 md:p-8">
            <p className="eyebrow">Student Affairs Office</p>
            <div className="mt-5 flex items-center gap-4">
              {dean.photo && <Img src={dean.photo} alt={dean.name} className="h-20 w-20 shrink-0 rounded-full" width={200} />}
              <div>
                <p className="font-serif text-xl text-ink">{dean.name}</p>
                <p className="text-sm text-ink-muted">{dean.role}</p>
              </div>
            </div>
            <p className="body-copy mt-5">The Office of the Dean of Student Affairs looks after residence, student welfare, counselling, sports and student life at TIET.</p>
            <Link href="/dosa" className="btn-primary mt-6">Meet the team <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
