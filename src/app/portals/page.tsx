import type { Metadata } from "next";
import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import { HEALTH_IMAGE, PORTALS } from "@/data/directory";
import { PageHeader, DynamicTag } from "@/components/ui";
import { Img, Reveal } from "@/components/motion";

export const metadata: Metadata = { title: "Online Portals" };

const GROUP_ORDER = ["Essentials", "Residence", "Campus life", "Bookings", "Permissions", "Wellbeing"];

export default function Portals() {
  const featured = PORTALS.find((p) => p.featured)!;
  const groups = GROUP_ORDER.map((g) => [g, PORTALS.filter((p) => p.group === g && !p.featured)] as const).filter(([, l]) => l.length);

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Online Portals" }]}
        eyebrow="Online Portals"
        title="Every student portal, explained"
        lede="What each portal is for, and when you’d use it — in one place."
        tint="bg-sky/60"
      />

      <div className="container py-12 md:py-16">
        <Reveal>
          <a href={featured.url!} target="_blank" rel="noopener noreferrer"
            className="group relative grid overflow-hidden rounded-[1.75rem] bg-ink text-white md:grid-cols-[1fr_20rem]">
            <div className="p-8 md:p-12">
              <p className="inline-flex items-center gap-2 rounded-full bg-crimson px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                <CalendarDays className="h-3.5 w-3.5" /> Featured
              </p>
              <h2 className="mt-5 text-[2.2rem] leading-tight md:text-[2.8rem]">{featured.name}</h2>
              <p className="mt-3 max-w-lg text-lg text-white/80">{featured.what}</p>
              <p className="mt-2 max-w-lg text-sm text-white/60">Use it when: {featured.when}</p>
              <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition group-hover:bg-cream">
                Open calendar <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
            <div className="relative hidden md:block" aria-hidden>
              <div className="absolute inset-6 grid grid-cols-7 gap-1.5 rounded-2xl bg-white/5 p-4">
                {Array.from({ length: 35 }).map((_, i) => (
                  <span key={i} className={`rounded-md ${[3, 9, 12, 17, 23, 26, 31].includes(i) ? "bg-crimson" : "bg-white/10"} transition-transform duration-500 group-hover:scale-95`} style={{ transitionDelay: `${(i % 7) * 25}ms` }} />
                ))}
              </div>
            </div>
          </a>
        </Reveal>

        <div className="mt-16 space-y-14">
          {groups.map(([g, list]) => (
            <Reveal as="section" key={g} className="grid gap-6 md:grid-cols-[12rem_1fr] md:gap-10">
              <div>
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted md:pt-5">{g}</h2>
                {g === "Wellbeing" && <Img src={HEALTH_IMAGE} alt="TIET Health Centre" className="mt-4 hidden aspect-[4/3] rounded-2xl md:block" width={500} />}
              </div>
              <ul className="divide-y divide-line border-y border-line">
                {list.map((p) => {
                  const inner = (
                    <>
                      <div className="flex-1">
                        <p className="font-serif text-[1.35rem] leading-tight text-ink transition-colors group-hover:text-crimson">{p.name}</p>
                        <p className="body-copy mt-1">{p.what}</p>
                        <p className="mt-1.5 flex items-start gap-1.5 text-sm text-ink-muted"><Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />{p.when}</p>
                      </div>
                      {p.url ? (
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line transition group-hover:border-crimson group-hover:bg-crimson group-hover:text-white">
                          <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </span>
                      ) : <DynamicTag>Links pending</DynamicTag>}
                    </>
                  );
                  return (
                    <li key={p.name}>
                      {p.url ? (
                        <a href={p.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-6 py-5">
                          {inner}<span className="sr-only">(opens in a new tab)</span>
                        </a>
                      ) : <div className="flex items-center gap-6 py-5">{inner}</div>}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
