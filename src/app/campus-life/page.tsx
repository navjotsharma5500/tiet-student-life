import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { ACHIEVEMENTS, EVENTS_GALLERY, FOOD_FACILITIES, HEALTH_IMAGE, SPORTS_GALLERY, type Story } from "@/data/directory";
import { HOSTELS } from "@/data/hostels";
import { Img, Reveal } from "@/components/motion";
import { CampusHero, type CampusSlide } from "@/components/CampusHero";
import { Breadcrumbs, SectionTitle } from "@/components/ui";

export const metadata: Metadata = { title: "Campus Life" };

const S = "https://ik.imagekit.io/itmh/Societies";
const HERO: CampusSlide[] = [
  { kind: "triptych", urls: [`${S}/Copy%20of%20OWL05064.jpg?updatedAt=1777761542760`, `${S}/Copy%20of%20OWL05179.jpg?updatedAt=1777761528839`, `${S}/Copy%20of%20OWL05131.jpg?updatedAt=1777761530750`], alt: "TIET students at society events", positions: ["55% 50%", "center 36%", "72% 40%"] },
  { kind: "photo", url: `${S}/TIET%20STUDENTS%20WITH%20OVERALL%20TROPHY.jpg?updatedAt=1777761517797`, alt: "TIET students with the overall trophy", position: "center 72%" },
  { kind: "photo", url: `${S}/Screenshot%202026-05-03%20035754.png?updatedAt=1777761518545`, alt: "TIET student societies", position: "center 40%" },
  { kind: "photo", url: `${S}/Copy%20of%20IMG_5352.png?updatedAt=1777761541073`, alt: "TIET student life", position: "center 55%" },
  { kind: "photo", url: `${S}/Copy%20of%20DSC00855.JPG?updatedAt=1777761540766`, alt: "TIET student life", position: "center 45%" },
];

const aspect = (s: Story) => (s.span === "tall" ? "aspect-[3/4]" : s.span === "wide" ? "aspect-[16/10]" : "aspect-[4/3]");

function Masonry({ items }: { items: Story[] }) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {items.map((s, i) => (
        <Reveal key={s.image + i} delay={(i % 3) * 0.06} className="group relative mb-4 break-inside-avoid overflow-hidden rounded-[1.25rem]">
          <Img src={s.image} alt={s.alt} className={aspect(s)} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" zoom width={900} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent p-5 pt-16">
            <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-white/70">{s.kicker}</p>
            <p className="font-serif text-xl leading-tight text-white">{s.title}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function CampusLife() {
  const hostelPics = HOSTELS.filter((h) => h.images.length).slice(0, 4);
  return (
    <>
      <header className="relative isolate overflow-hidden bg-ink text-white">
        <CampusHero slides={HERO} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/25" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/60 via-ink/10 to-transparent" aria-hidden />
        <div className="container pb-14 pt-10 md:pb-20 md:pt-14">
          <div className="[&_a]:text-white/70 [&_li]:text-white/70 [&_span]:!text-white"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Campus Life" }]} /></div>
          <div className="pt-24 md:pt-40">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">Campus Life</p>
            <h1 className="mt-3 max-w-3xl text-balance text-[2.5rem] leading-[1.05] md:text-[3.75rem]">Everything you need is inside the campus walls.</h1>
            <p className="mt-4 max-w-xl text-lg text-white/80">Sports, societies, fests, health and food — a place to live, not only to study.</p>
          </div>
        </div>
      </header>

      <nav aria-label="On this page" className="sticky top-[4.25rem] z-30 border-b border-line bg-cream/95 backdrop-blur md:top-[4.75rem]">
        <ul className="container no-scrollbar flex gap-6 overflow-x-auto py-3 text-sm font-semibold text-ink-soft">
          {[["Sports", "sports"], ["Fests & events", "events"], ["Societies & achievements", "societies"], ["Health", "health"], ["Hostels", "hostels"], ["Food", "food"]].map(([l, id]) => (
            <li key={id} className="shrink-0"><a href={`#${id}`} className="hover:text-crimson">{l}</a></li>
          ))}
        </ul>
      </nav>

      <section id="sports" className="container scroll-mt-32 py-16 md:py-24">
        <SectionTitle eyebrow="Sports facilities" title="Grounds, courts, track and pool" lede="Outdoor grounds, synthetic courts, an international-standard track, a swimming pool and gym halls in the hostels." />
        <Masonry items={SPORTS_GALLERY} />
      </section>

      <section id="events" className="scroll-mt-32 bg-white">
        <div className="container py-16 md:py-24">
          <SectionTitle eyebrow="Fests & events" title="URJA and the athletic calendar" />
          <div className="grid gap-4 md:grid-cols-3">
            {EVENTS_GALLERY.map((s, i) => (
              <Reveal key={s.image} delay={i * 0.05} className={`group relative overflow-hidden rounded-[1.25rem] ${i === 0 ? "md:col-span-2 md:row-span-2" : i === 3 ? "md:col-span-3" : ""}`}>
                <Img src={s.image} alt={s.alt} className={i === 0 ? "aspect-[4/3] h-full" : i === 3 ? "aspect-[4/3] md:aspect-[21/8]" : "aspect-[4/3]"} zoom width={i === 0 ? 1400 : 700} />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-5 pt-16">
                  <p className="font-serif text-xl text-white">{s.title}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Link href="/portals" className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-crimson">Check the Event Calendar <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <section id="societies" className="container scroll-mt-32 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">Societies, music & performance</p>
            <h2 className="mt-2 text-[2rem] leading-tight md:text-[2.4rem]">Find your people</h2>
            <p className="body-copy mt-4 max-w-md text-base">Technical, cultural, music and performance societies and chapters run events across the year — and TIET teams bring home trophies.</p>
            <a href="https://studentsocieties.thapar.edu/" target="_blank" rel="noopener noreferrer" className="btn-primary mt-6">Browse student societies <ArrowUpRight className="h-4 w-4" /></a>
          </Reveal>
          <div className="grid grid-cols-2 gap-4">
            {ACHIEVEMENTS.map((s, i) => (
              <Reveal key={s.image} delay={i * 0.06} className={`group relative overflow-hidden rounded-[1.25rem] ${i === 0 ? "col-span-2" : ""}`}>
                <Img src={s.image} alt={s.alt} className={i === 0 ? "aspect-[16/9]" : "aspect-square"} zoom width={i === 0 ? 1200 : 600} />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 pt-12">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-white/70">{s.kicker}</p>
                  <p className="font-serif text-lg leading-tight text-white">{s.title}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="health" className="scroll-mt-32 bg-mint/60">
        <div className="container grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-20">
          <Reveal><Img src={HEALTH_IMAGE} alt="TIET Health Centre" className="aspect-[4/3] rounded-[1.5rem]" width={1000} /></Reveal>
          <Reveal>
            <p className="eyebrow">Health centre</p>
            <h2 className="mt-2 text-[2rem] leading-tight">Care on campus</h2>
            <p className="body-copy mt-4 max-w-md text-base">The campus health centre supports students day to day. The TIET Health Hub carries services and information, and the Counselling Cell (TICC) is part of the Student Affairs Office.</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a href="https://campusconnect.thapar.edu/dispensary" target="_blank" rel="noopener noreferrer" className="btn-primary">TIET Health Hub <ArrowUpRight className="h-4 w-4" /></a>
              <Link href="/dosa" className="btn-ghost">Counselling Cell</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="hostels" className="container scroll-mt-32 py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle eyebrow="Hostels" title="Home for most students" lede={`${HOSTELS.length} residences for boys and girls, each with its own caretaker office.`} />
          <Link href="/hostel/directory" className="btn-ghost mb-8">Hostel directory <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="no-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-4 md:px-0">
          {hostelPics.map((h) => (
            <Link key={h.slug} href={`/hostel/directory/${h.slug}`} className="group w-[70vw] shrink-0 snap-start sm:w-[40vw] md:w-auto">
              <div className="overflow-hidden rounded-[1.25rem]"><Img src={h.images[0].url} alt={h.images[0].alt} className="aspect-[3/4]" zoom width={600} /></div>
              <p className="mt-3 font-serif text-lg text-ink group-hover:text-crimson">{h.name}</p>
              <p className="text-xs capitalize text-ink-muted">{h.gender}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="food" className="container scroll-mt-32 py-16 md:py-24">
        <SectionTitle eyebrow="Food & dining" title="Campus Food Facilities" lede="Dining outlets across the campus, from quick bites to a quiet faculty lounge." />
        <div className="grid gap-x-6 gap-y-10 md:grid-cols-2">
          {FOOD_FACILITIES.map((f, i) => {
            const featured = i === 0;
            return (
              <Reveal key={f.name} delay={(i % 2) * 0.06} className={`group ${featured ? "md:col-span-2 md:grid md:grid-cols-[1.35fr_1fr] md:items-center md:gap-10" : ""}`}>
                <div className="overflow-hidden rounded-[1.25rem] shadow-soft transition-shadow duration-500 group-hover:shadow-lift">
                  <Img src={f.image} alt={f.name} className={featured ? "aspect-[16/10]" : "aspect-[3/2]"} sizes={featured ? "(min-width:768px) 56vw, 100vw" : "(min-width:768px) 50vw, 100vw"} zoom width={featured ? 1200 : 900} />
                </div>
                <div className={featured ? "mt-5 md:mt-0" : "mt-5"}>
                  <p className="inline-flex items-center gap-1.5 rounded-full bg-sky px-3 py-1 text-xs font-semibold text-ink-soft"><Clock className="h-3.5 w-3.5 text-crimson" aria-hidden /> {f.timing}</p>
                  <h3 className={`mt-3 font-serif leading-tight text-ink ${featured ? "text-[2rem] md:text-[2.4rem]" : "text-[1.5rem]"}`}>{f.name}</h3>
                  <p className="body-copy mt-2 max-w-xl text-base">{f.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
