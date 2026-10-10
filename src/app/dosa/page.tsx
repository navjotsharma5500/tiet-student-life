import type { Metadata } from "next";
import { STAFF, type StaffTier } from "@/data/directory";
import { PageHeader } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { StaffCard } from "@/components/StaffCard";

export const metadata: Metadata = { title: "DoSA Office" };

/** Grid per tier layout. Order and layout both come from data (STAFF). */
const GRID: Record<StaffTier["layout"], string> = {
  feature: "",
  portrait: "grid gap-6 md:grid-cols-2",
  prominent: "grid gap-5 lg:grid-cols-2",
  compact: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
  mini: "grid grid-cols-2 gap-3 md:grid-cols-4",
};

export default function Dosa() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "DoSA Office" }]}
        eyebrow="Office of the Dean of Student Affairs"
        title="The people behind student life"
        lede="Residence, welfare, counselling, sports, food and the everyday running of the hostels."
        tint="bg-lavender/60"
      />

      <div className="container py-14 md:py-20">
        {STAFF.map((tier, ti) =>
          tier.layout === "feature" ? (
            <section key={tier.id} aria-labelledby={`tier-${tier.id}`}>
              <h2 id={`tier-${tier.id}`} className="sr-only">{tier.title}</h2>
              <Reveal>{tier.people.map((p) => <StaffCard key={p.name} p={p} layout="feature" />)}</Reveal>
            </section>
          ) : (
            <section key={tier.id} aria-labelledby={`tier-${tier.id}`} className={`border-t border-line pt-10 ${ti === 1 ? "mt-16" : "mt-20"} lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-10`}>
              <div className="mb-6 lg:mb-0">
                <h2 id={`tier-${tier.id}`} className="text-[1.5rem] leading-tight">{tier.title}</h2>
                <p className="mt-2 text-sm text-ink-muted">{tier.note}</p>
              </div>
              <ul className={GRID[tier.layout]}>
                {tier.people.map((p, i) => (
                  <Reveal as="li" key={p.name} delay={Math.min(i, 5) * 0.05}>
                    <StaffCard p={p} layout={tier.layout} index={i} />
                  </Reveal>
                ))}
              </ul>
            </section>
          ),
        )}
      </div>
    </>
  );
}
