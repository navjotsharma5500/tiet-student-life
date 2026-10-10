import Link from "next/link";
import { CalendarDays, CheckCircle2, ClipboardList, KeyRound, Wallet } from "lucide-react";
import type { Cohort } from "@/data/cohorts";
import { OPEN_DAY, processFor } from "@/data/processes";
import { BackNext, GoverningNote, StepList } from "./ui";
import { Reveal } from "./motion";

export type ProcessView = "process" | "payment" | "reporting";

const NEXT: Record<ProcessView, { view: ProcessView | "hostels"; label: string } | null> = {
  process: { view: "payment", label: "Payment & room booking" },
  payment: { view: "reporting", label: "Reporting & joining" },
  reporting: null,
};

export function ProcessDetail({ c, view }: { c: Cohort; view: ProcessView }) {
  const p = processFor(c);
  const base = `/hostel/${c.id}`;
  const anchor = view === "process" ? "process" : view;

  const checklist: Record<ProcessView, string[]> = {
    process: c.process === "dosa-new"
      ? ["Admission letter as a PDF (max 10 MB)", "Your official / registered email address", "Parent contact details", ...(c.jrfDocuments ? ["JRF Letter and HRA Certificate (JRF scholars only)"] : [])]
      : c.process === "admission-cell"
        ? ["Watch your email for the Admission Cell preference link", "Decide your hostel + room-type preference order", "Note your allocation slot date and venue"]
        : ["Read the active hostel allocation notice", "Agree group members early if you want to apply as a group", "Keep your Resident App login working"],
    payment: c.process === "admission-cell"
      ? ["Payment at the allocation venue", "Keep your allocation slip safe"]
      : ["Pay both hostel fee and mess fee in the Resident App", ...(c.process === "continuing" ? ["Book your room promptly — first come, first served"] : [])],
    reporting: c.process === "admission-cell"
      ? ["Allocation slip", "Go straight to the allotted hostel’s caretaker office"]
      : ["Roll number / application details", "Both fees paid", "Ready to sign the Rules & Regulations undertaking"],
  };

  const block = {
    process: { icon: ClipboardList, title: c.process === "dosa-new" ? "Application & allotment" : "Allocation process", intro: p.application.intro, steps: p.application.steps },
    payment: { icon: Wallet, title: "Payment & room booking", intro: p.payment.intro, steps: p.payment.steps },
    reporting: { icon: KeyRound, title: "Reporting & joining", intro: p.reporting.intro, steps: p.reporting.steps },
  }[view];

  const next = NEXT[view];

  return (
    <div className="container py-10 md:py-14">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <div>
          <Reveal>
            <p className="lede max-w-prose">{block.intro}</p>
            {view === "process" && <p className="body-copy mt-4 max-w-prose">{p.summary}</p>}
          </Reveal>

          <Reveal className="mt-10">
            <StepList steps={block.steps} />
          </Reveal>

          {view === "payment" && p.payment.modes && (
            <Reveal className="mt-10 rounded-2xl bg-mint p-5">
              <p className="font-semibold text-ink">Payment modes at the venue</p>
              <p className="body-copy mt-1">Supported modes may include the following, as made available:</p>
              <div className="mt-3 flex flex-wrap gap-2">{p.payment.modes.map((m) => <span key={m} className="chip">{m}</span>)}</div>
            </Reveal>
          )}

          {view === "process" && c.hasOpenDay && (
            <Reveal className="mt-10 rounded-2xl bg-lavender p-6">
              <p className="flex items-center gap-2 font-serif text-xl text-ink"><CalendarDays className="h-5 w-5" aria-hidden /> {OPEN_DAY.title}</p>
              <p className="body-copy mt-2">{OPEN_DAY.intro}</p>
              <ul className="mt-3 space-y-1.5">{OPEN_DAY.points.map((pt) => <li key={pt} className="body-copy flex gap-2"><span aria-hidden>·</span>{pt}</li>)}</ul>
            </Reveal>
          )}

          {view === "reporting" && (
            <Reveal className="mt-10 rounded-2xl border border-line bg-white p-5">
              <p className="font-semibold text-ink">After you get your key</p>
              <p className="body-copy mt-1">Read how leave, timings and maintenance work in residence.</p>
              <Link href="/hostel/living" className="link-underline mt-2 inline-block text-sm font-semibold">Living in residence</Link>
            </Reveal>
          )}

          <div className="mt-10"><GoverningNote>{p.circularsChannel} The official circular is the governing record.</GoverningNote></div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[1.25rem] bg-ink p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60">What you need to do</p>
            <ul className="mt-4 space-y-3">
              {checklist[view].map((t) => (
                <li key={t} className="flex gap-2.5 text-sm leading-6"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#F4A7B2]" aria-hidden />{t}</li>
              ))}
            </ul>
            {c.hasApplicationForm && view === "process" && (
              <Link href={`${base}/apply`} className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-cream">Open the application form</Link>
            )}
          </div>
          <nav aria-label="Process pages" className="mt-4 rounded-[1.25rem] border border-line bg-white p-2">
            {(["process", "payment", "reporting"] as ProcessView[]).map((v) => (
              <Link key={v} href={`${base}/${v}`} aria-current={v === view ? "page" : undefined}
                className={`block rounded-xl px-3 py-2 text-sm transition ${v === view ? "bg-cream font-semibold text-ink" : "text-ink-soft hover:bg-cream/60"}`}>
                {v === "process" ? "Application / allocation" : v === "payment" ? "Payment & room booking" : "Reporting & joining"}
              </Link>
            ))}
          </nav>
        </aside>
      </div>

      <BackNext
        back={{ href: `${base}#${anchor}`, label: "Back to your application guide" }}
        next={next ? { href: `${base}/${next.view}`, label: next.label } : { href: "/hostel/resident-app", label: "Resident App guide" }}
      />
    </div>
  );
}
