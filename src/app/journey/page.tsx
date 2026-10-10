import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COHORTS, type ProcessId } from "@/data/cohorts";
import { JOURNEY } from "@/data/journey";
import { PageHeader, SectionTitle } from "@/components/ui";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = { title: "Student Journey" };

const ROUTES: { id: ProcessId; name: string; tint: string; rows: Record<string, string> }[] = [
  {
    id: "admission-cell", name: "First-Year Engineering", tint: "bg-blush",
    rows: {
      "Handled by": "Admission Cell, TIET",
      "How you apply": "Preference link sent by email",
      "Preferences": "Hostel + room-type combinations",
      "Allocation basis": "JEE Main merit / percentile, in slots",
      "Payment": "At the allocation venue",
      "Resident App": "Not required before first reporting",
      "Reporting": "Caretaker, with your allocation slip",
    },
  },
  {
    id: "dosa-new", name: "DoSA New Admissions", tint: "bg-sky",
    rows: {
      "Handled by": "DoSA Office",
      "How you apply": "Hostel application form on this website",
      "Preferences": "None — DoSA allots hostel and room number",
      "Allocation basis": "Eligibility verification by DoSA",
      "Payment": "Hostel + mess fee online in the Resident App",
      "Resident App": "Required before reporting",
      "Reporting": "Caretaker, on the circular date",
    },
  },
  {
    id: "continuing", name: "Second Year Onwards", tint: "bg-mint",
    rows: {
      "Handled by": "DoSA Office · Hostel Allocation",
      "How you apply": "In the Resident App, alone or as a group",
      "Preferences": "Limit set in the active allocation notice",
      "Allocation basis": "CGPA (group: average CGPA); discipline record may be reviewed",
      "Payment": "Hostel + mess fee in the app, then book your room (FCFS)",
      "Resident App": "Your existing account",
      "Reporting": "Caretaker, with your roll number",
    },
  },
];

export default function Journey() {
  const keys = Object.keys(ROUTES[0].rows);
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Student Journey" }]}
        eyebrow="Student Journey"
        title="Your journey through residence"
        lede="Six moments every resident passes through. How each one works depends on which route brought you in."
      />

      <section className="container py-14 md:py-20">
        <ol className="relative space-y-4 md:space-y-0">
          {JOURNEY.map((j, i) => (
            <Reveal as="li" key={j.title} className="md:grid md:grid-cols-[10rem_1fr] md:gap-10">
              <div className="hidden md:block md:pt-8 md:text-right">
                <span className="font-serif text-5xl text-ink/15">0{i + 1}</span>
              </div>
              <div className={`rounded-[1.5rem] ${j.tint} p-6 md:mb-4 md:p-8`}>
                <p className="font-sans text-xs font-semibold text-crimson md:hidden">0{i + 1}</p>
                <h2 className="text-[1.6rem]">{j.title}</h2>
                <p className="body-copy mt-2 max-w-prose">{j.text}</p>
                <Link href={j.href} className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                  {j.cta} <ArrowRight className="h-4 w-4 text-crimson transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section id="routes" className="scroll-mt-28 bg-white">
        <div className="container py-16 md:py-24">
          <SectionTitle eyebrow="Three routes into residence" title="Which route are you on?" lede="Find your column, then open your cohort guide for hostels, room types and dates." />

          {/* Mobile: stacked cards */}
          <div className="space-y-4 lg:hidden">
            {ROUTES.map((r) => (
              <Reveal key={r.id} className={`rounded-[1.25rem] ${r.tint} p-5`}>
                <h3 className="text-xl">{r.name}</h3>
                <dl className="mt-4 space-y-3">
                  {keys.map((k) => (
                    <div key={k}>
                      <dt className="text-[0.7rem] font-semibold uppercase tracking-wider text-ink-muted">{k}</dt>
                      <dd className="text-sm text-ink">{r.rows[k]}</dd>
                    </div>
                  ))}
                </dl>
                <CohortLinks id={r.id} />
              </Reveal>
            ))}
          </div>

          {/* Desktop: comparison table */}
          <Reveal className="hidden overflow-hidden rounded-[1.25rem] border border-line lg:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr>
                  <th scope="col" className="w-48 bg-cream p-5" />
                  {ROUTES.map((r) => <th key={r.id} scope="col" className={`${r.tint} p-5 font-serif text-xl font-normal text-ink`}>{r.name}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {keys.map((k) => (
                  <tr key={k}>
                    <th scope="row" className="bg-cream/60 p-5 text-xs font-semibold uppercase tracking-wider text-ink-muted">{k}</th>
                    {ROUTES.map((r) => <td key={r.id} className="p-5 align-top text-ink-soft">{r.rows[k]}</td>)}
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="bg-cream/60 p-5 text-xs font-semibold uppercase tracking-wider text-ink-muted">Cohort guides</th>
                  {ROUTES.map((r) => <td key={r.id} className="p-5 align-top"><CohortLinks id={r.id} /></td>)}
                </tr>
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function CohortLinks({ id }: { id: ProcessId }) {
  return (
    <ul className="mt-4 space-y-1.5 lg:mt-0">
      {COHORTS.filter((c) => c.process === id).map((c) => (
        <li key={c.id}><Link href={`/hostel/${c.id}`} className="link-underline text-sm font-medium text-ink">{c.title}</Link></li>
      ))}
    </ul>
  );
}
