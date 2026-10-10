"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Building2, CalendarDays, CheckCircle2, FileText, Minus, Plus, Smartphone } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cohortById, cohortRoomTypes } from "@/data/cohorts";
import { hostelByCode, type Gender } from "@/data/hostels";
import { OPEN_DAY, processFor } from "@/data/processes";
import { REFUND_WINDOWS, TIMINGS } from "@/data/residence";
import { CIRCULAR_SLOTS } from "@/data/directory";
import { FEE_NOTICE } from "@/data/roomTypes";
import { RoomTable } from "./RoomTable";
import { ArrowLink, DynamicTag, StepList } from "./ui";
import { EASE } from "./motion";

type Section = { id: string; title: string; kicker: string; href?: string; content?: ReactNode; linkOnly?: boolean };

export function CohortGuide({ cohortId }: { cohortId: string }) {
  const c = cohortById(cohortId)!;
  const p = processFor(c);
  const reduce = useReducedMotion();
  const base = `/hostel/${c.id}`;

  const hostelNames = (g: Gender) => c.allocation[g].map((a) => hostelByCode(a.hostel)?.name ?? a.hostel);

  const sections: Section[] = [
    {
      id: "eligibility", title: "Eligibility", kicker: "Who this applies to",
      content: (
        <div className="space-y-6">
          <ul className="space-y-3">
            {p.eligibility.map((e) => (
              <li key={e} className="flex gap-3 body-copy"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-crimson" aria-hidden />{e}</li>
            ))}
          </ul>
          <div className="rounded-2xl bg-cream p-4 text-sm">
            <span className="font-semibold text-ink">Handled by: </span><span className="text-ink-soft">{c.handledBy}</span>
          </div>
          {c.hasApplicationForm && (
            <Link href={`${base}/apply`} className="btn-primary">Apply for hostel accommodation <ArrowRight className="h-4 w-4" /></Link>
          )}
        </div>
      ),
    },
    {
      id: "hostels", title: "Hostel Options", kicker: `${c.allocation.boys.length + c.allocation.girls.length} residences for your cohort`,
      href: `${base}/hostels`, linkOnly: true,
    },
    {
      id: "rooms", title: "Room Types & Pricing", kicker: "What you can be allotted",
      content: (
        <div className="space-y-5">
          <p className="body-copy">These are the only room types available to your cohort. Fees are the current reference annual room fee; the mess fee is charged separately.</p>
          <RoomTable rows={cohortRoomTypes(c)} compact />
          <div className="flex flex-wrap items-center gap-3 text-sm text-ink-muted">
            <DynamicTag>Mess fee — per active fee notice</DynamicTag>
            <span>{FEE_NOTICE.note}</span>
          </div>
          <ArrowLink href={`${base}/fees`}>View detailed fee structure</ArrowLink>
        </div>
      ),
    },
    {
      id: "process", title: c.process === "dosa-new" ? "Application & Allotment" : "Allocation Process", kicker: p.application.intro,
      content: (
        <div className="space-y-6">
          <p className="body-copy">{p.summary}</p>
          <StepList steps={p.application.steps} />
          {c.hasOpenDay && (
            <div className="rounded-2xl bg-lavender/70 p-5">
              <p className="flex items-center gap-2 font-semibold text-ink"><CalendarDays className="h-4 w-4" aria-hidden /> {OPEN_DAY.title}</p>
              <p className="body-copy mt-1">{OPEN_DAY.intro}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-4">
            <ArrowLink href={`${base}/process`}>Full process, step by step</ArrowLink>
            {c.hasApplicationForm && <ArrowLink href={`${base}/apply`}>Open the application form</ArrowLink>}
          </div>
        </div>
      ),
    },
    {
      id: "payment", title: "Payment & Room Booking", kicker: p.payment.intro,
      content: (
        <div className="space-y-5">
          <StepList steps={p.payment.steps} />
          {p.payment.modes && (
            <div className="flex flex-wrap gap-2">
              {p.payment.modes.map((m) => <span key={m} className="chip">{m}</span>)}
              <span className="text-xs text-ink-muted self-center">as made available at the venue</span>
            </div>
          )}
          <ArrowLink href={`${base}/payment`}>Payment & room booking details</ArrowLink>
        </div>
      ),
    },
    {
      id: "reporting", title: "Reporting & Joining", kicker: p.reporting.intro,
      content: (
        <div className="space-y-5">
          <StepList steps={p.reporting.steps} />
          <ArrowLink href={`${base}/reporting`}>Reporting day checklist</ArrowLink>
        </div>
      ),
    },
    {
      id: "resident-app", title: "Resident App", kicker: p.residentApp.required ? "Required before reporting" : "Not required before first reporting",
      content: (
        <div className="space-y-5">
          <div className={`flex gap-3 rounded-2xl p-4 ${p.residentApp.required ? "bg-sky" : "bg-mint"}`}>
            <Smartphone className="mt-0.5 h-5 w-5 shrink-0 text-ink" aria-hidden />
            <p className="text-sm leading-6 text-ink">{p.residentApp.intro}</p>
          </div>
          {p.residentApp.steps.length > 0 && <StepList steps={p.residentApp.steps.slice(0, 5)} />}
          <ArrowLink href="/hostel/resident-app">Resident App guide</ArrowLink>
        </div>
      ),
    },
    {
      id: "living", title: "Living in Residence", kicker: "Leave, timings and rules",
      content: (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-3">
            {TIMINGS.map((t) => (
              <div key={t.time} className="rounded-2xl border border-line bg-cream/60 p-4">
                <p className="font-serif text-2xl text-ink">{t.time}</p>
                <p className="mt-1 text-sm text-ink-soft">{t.label}</p>
              </div>
            ))}
          </div>
          <p className="body-copy">Leave is applied in the Resident App; your parent is informed on WhatsApp. Occupy only your officially allotted room — unauthorised swapping is not allowed.</p>
          <ArrowLink href="/hostel/living">Living in residence</ArrowLink>
        </div>
      ),
    },
    {
      id: "checkout", title: "Check-out, No Dues & Refund", kicker: "Leaving the hostel",
      content: (
        <div className="space-y-5">
          <p className="body-copy">Return your room key, almirah key, AC remote and other issued items at the caretaker office. After the room check, you receive a Hostel No Dues Slip.</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {REFUND_WINDOWS.map((w) => (
              <div key={w.range} className={`rounded-2xl p-4 ${w.tone}`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{w.range}</p>
                <p className="mt-1 font-semibold text-ink">{w.deduction}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <ArrowLink href="/hostel/checkout">Check-out & No Dues</ArrowLink>
            <ArrowLink href="/hostel/refund">Refund policy</ArrowLink>
          </div>
        </div>
      ),
    },
    {
      id: "circulars", title: "Circulars & Official Documents", kicker: "The governing record",
      content: (
        <div className="space-y-5">
          <p className="body-copy">{p.circularsChannel}</p>
          <ul className="divide-y divide-line rounded-2xl border border-line bg-white">
            {CIRCULAR_SLOTS.map((s) => (
              <li key={s.title} className="flex items-center justify-between gap-3 px-4 py-3">
                <span className="flex items-center gap-2.5 text-sm font-medium text-ink"><FileText className="h-4 w-4 text-crimson" aria-hidden />{s.title}</span>
                <DynamicTag>Awaiting upload</DynamicTag>
              </li>
            ))}
          </ul>
          <ArrowLink href="/hostel/circulars">All circulars & documents</ArrowLink>
        </div>
      ),
    },
  ];

  const [open, setOpen] = useState<string | null>("eligibility");
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.slice(1);
      if (h && sections.some((s) => s.id === h && !s.linkOnly)) {
        setOpen(h);
        settleTo(h, true);
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = useCallback((id: string, scroll = false) => {
    setOpen((cur) => {
      const next = cur === id ? null : id;
      window.history.replaceState(null, "", next ? `#${next}` : window.location.pathname);
      return next;
    });
    if (scroll) settleTo(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  /** After the previous panel collapses, bring the opened heading into view only if needed. */
  function settleTo(id: string, force = false) {
    setTimeout(() => {
      const el = refs.current[id];
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (force || top < 90 || top > window.innerHeight * 0.55) {
        window.scrollTo({ top: top + window.scrollY - 140, behavior: reduce ? "auto" : "smooth" });
      }
    }, reduce ? 0 : 430);
  }

  const openFromNav = (id: string) => {
    setOpen(id);
    window.history.replaceState(null, "", `#${id}`);
    settleTo(id, true);
  };

  return (
    <div className="container grid grid-cols-1 gap-10 py-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-16 lg:py-14">
      {/* Mobile: sticky chip navigation */}
      <nav aria-label="Application guide sections" className="min-w-0 sticky top-[4.25rem] md:top-[4.75rem] z-30 -mx-5 border-b border-line bg-cream/95 px-5 py-3 backdrop-blur md:-mx-8 md:px-8 lg:hidden">
        <ul className="no-scrollbar flex gap-2 overflow-x-auto">
          {sections.map((s, i) => (
            <li key={s.id} className="shrink-0">
              {s.linkOnly ? (
                <Link href={s.href!} className="chip whitespace-nowrap">{i + 1}. {s.title} <ArrowUpRight className="h-3 w-3" /></Link>
              ) : (
                <button onClick={() => openFromNav(s.id)} className={`chip whitespace-nowrap ${open === s.id ? "!border-crimson !bg-crimson !text-white" : ""}`}>
                  {i + 1}. {s.title}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop: sticky contextual sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <p className="eyebrow mb-4">Application Guide</p>
          <ol className="relative space-y-0.5 border-l border-line">
            {sections.map((s, i) => {
              const active = open === s.id;
              const cls = `relative -ml-px flex w-full items-center gap-3 border-l-2 py-2 pl-4 pr-2 text-left text-sm transition-colors ${active ? "border-crimson font-semibold text-ink" : "border-transparent text-ink-soft hover:text-ink"}`;
              return (
                <li key={s.id}>
                  {s.linkOnly ? (
                    <Link href={s.href!} className={cls}>
                      <span className="w-5 text-xs tabular-nums text-ink-muted">{String(i + 1).padStart(2, "0")}</span>{s.title}
                      <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-ink-muted" aria-hidden />
                    </Link>
                  ) : (
                    <button onClick={() => openFromNav(s.id)} className={cls} aria-current={active ? "step" : undefined}>
                      <span className="w-5 text-xs tabular-nums text-ink-muted">{String(i + 1).padStart(2, "0")}</span>{s.title}
                    </button>
                  )}
                </li>
              );
            })}
          </ol>
          <div className="mt-8 rounded-2xl border border-line bg-white p-4 text-sm">
            <p className="font-semibold text-ink">Not your cohort?</p>
            <Link href={`/hostel?level=${c.level}`} className="link-underline mt-1 inline-block text-ink-soft">Choose a different year</Link>
          </div>
        </div>
      </aside>

      {/* Accordion */}
      <div className="min-w-0">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-ink-muted">
          <Building2 className="h-4 w-4" aria-hidden />
          <span><span className="font-semibold text-ink">Boys:</span> {hostelNames("boys").join(", ")}</span>
          <span aria-hidden>·</span>
          <span><span className="font-semibold text-ink">Girls:</span> {hostelNames("girls").join(", ")}</span>
        </div>

        <ol className="border-t border-ink/80">
          {sections.map((s, i) => {
            const isOpen = open === s.id;
            const headId = `h-${s.id}`;
            const panelId = `p-${s.id}`;
            const num = String(i + 1).padStart(2, "0");
            return (
              <li key={s.id} ref={(el) => { refs.current[s.id] = el; }} id={s.id} className="scroll-mt-36 border-b border-line">
                {s.linkOnly ? (
                  <Link href={s.href!} className="group flex items-center gap-4 py-5 md:gap-6 md:py-6">
                    <span className="w-7 font-sans text-sm tabular-nums text-ink-muted">{num}</span>
                    <span className="flex-1">
                      <span className="block font-serif text-[1.35rem] leading-tight text-ink transition-colors group-hover:text-crimson md:text-[1.6rem]">{s.title}</span>
                      <span className="mt-1 block text-sm text-ink-muted">{s.kicker} · opens the hostel directory</span>
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition group-hover:border-crimson group-hover:bg-crimson group-hover:text-white">
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </Link>
                ) : (
                  <>
                    <h3 className="font-sans">
                      <button
                        id={headId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggle(s.id, !isOpen)}
                        className="group flex w-full items-center gap-4 py-5 text-left md:gap-6 md:py-6"
                      >
                        <span className={`w-7 text-sm tabular-nums transition-colors ${isOpen ? "text-crimson" : "text-ink-muted"}`}>{num}</span>
                        <span className="flex-1">
                          <span className={`block font-serif text-[1.35rem] leading-tight transition-colors md:text-[1.6rem] ${isOpen ? "text-crimson" : "text-ink group-hover:text-crimson"}`}>{s.title}</span>
                          <span className="mt-1 block text-sm font-normal text-ink-muted">{s.kicker}</span>
                        </span>
                        <span className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${isOpen ? "border-crimson bg-crimson text-white" : "border-line text-ink group-hover:border-ink/40"}`}>
                          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.35, ease: EASE }} className="flex">
                            {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                          </motion.span>
                        </span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={headId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1, transition: { height: { duration: reduce ? 0 : 0.5, ease: EASE }, opacity: { duration: 0.35, delay: 0.08 } } }}
                          exit={{ height: 0, opacity: 0, transition: { height: { duration: reduce ? 0 : 0.4, ease: EASE }, opacity: { duration: 0.15 } } }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 md:pl-[3.25rem] md:pr-14">{s.content}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <Link href={`${base}/hostels`} className="group flex items-center justify-between rounded-2xl bg-ink px-5 py-4 text-white transition hover:bg-ink-soft">
            <span><span className="block text-xs uppercase tracking-wider text-white/60">Next</span><span className="font-semibold">Explore your hostel options</span></span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
          {c.hasApplicationForm ? (
            <Link href={`${base}/apply`} className="group flex items-center justify-between rounded-2xl bg-crimson px-5 py-4 text-white transition hover:bg-crimson-dark">
              <span><span className="block text-xs uppercase tracking-wider text-white/70">Ready?</span><span className="font-semibold">Apply for hostel accommodation</span></span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          ) : (
            <Link href={`${base}/process`} className="group flex items-center justify-between rounded-2xl border border-line bg-white px-5 py-4 transition hover:border-crimson/40">
              <span><span className="block text-xs uppercase tracking-wider text-ink-muted">Then</span><span className="font-semibold text-ink">Read the full allocation process</span></span>
              <ArrowRight className="h-5 w-5 text-crimson transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
