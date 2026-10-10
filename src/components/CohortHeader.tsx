import { levelById, PROCESS_LABEL, type Cohort } from "@/data/cohorts";
import { processFor } from "@/data/processes";
import { PageHeader } from "./ui";
import { RememberCohort } from "./CohortContext";

export function CohortHeader({ c, page, title, lede }: { c: Cohort; page?: string; title?: string; lede?: string }) {
  const L = levelById(c.level)!;
  const p = processFor(c);
  const crumbs = [
    { label: "Hostel & Housing", href: "/hostel" },
    { label: L.name, href: `/hostel?level=${L.id}` },
    page ? { label: c.title, href: `/hostel/${c.id}` } : { label: c.title },
    ...(page ? [{ label: page }] : []),
  ];
  return (
    <>
      <RememberCohort id={c.id} />
      <PageHeader crumbs={crumbs} eyebrow={page ? c.title : `${L.name} · ${c.year}`} title={title ?? c.title} lede={lede ?? (page ? undefined : p.summary)} tint={L.tint}>
        {!page && (
          <dl className="mt-8 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-3">
            {[
              ["Handled by", c.handledBy],
              ["Allocation", PROCESS_LABEL[c.process]],
              ["Resident App", p.residentApp.required ? "Required before reporting" : "Not required before first reporting"],
            ].map(([k, v]) => (
              <div key={k} className="bg-white/80 px-4 py-3">
                <dt className="text-[0.7rem] font-semibold uppercase tracking-wider text-ink-muted">{k}</dt>
                <dd className="mt-0.5 text-sm font-semibold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </PageHeader>
    </>
  );
}
