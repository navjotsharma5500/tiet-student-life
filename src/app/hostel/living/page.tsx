import type { Metadata } from "next";
import { Clock, ShieldCheck } from "lucide-react";
import { LEAVE_STEPS, RULES, TIMINGS, TIMING_NOTES } from "@/data/residence";
import { BackNext, GoverningNote, PageHeader, StepList } from "@/components/ui";
import { BackToGuide } from "@/components/CohortContext";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = { title: "Living in Residence" };

export default function Living() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Hostel & Housing", href: "/hostel" }, { label: "Living in Residence" }]}
        eyebrow="Residence"
        title="Living in residence"
        lede="Leave, campus timings and the few rules that keep residence fair and safe for everyone."
        tint="bg-mint"
      >
        <div className="mt-6"><BackToGuide anchor="living" /></div>
      </PageHeader>

      <div className="container py-12 md:py-16">
        <Reveal as="section">
          <p className="eyebrow mb-2">Timings</p>
          <h2 className="text-[1.75rem]">Your day, in three times</h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line sm:grid-cols-3">
            {TIMINGS.map((t) => (
              <div key={t.time} className="bg-white p-6">
                <Clock className="h-4 w-4 text-crimson" aria-hidden />
                <p className="mt-4 font-serif text-[2.4rem] leading-none text-ink">{t.time}</p>
                <p className="mt-2 text-sm text-ink-soft">{t.label}</p>
              </div>
            ))}
          </div>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {TIMING_NOTES.map((n) => <li key={n} className="rounded-xl bg-cream-deep/60 px-4 py-3 text-sm text-ink-soft">{n}</li>)}
          </ul>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <Reveal as="section">
            <p className="eyebrow mb-2">Leave management</p>
            <h2 className="text-[1.75rem]">Going home or travelling</h2>
            <p className="body-copy mt-2">For students already staying in a hostel.</p>
            <div className="mt-8"><StepList steps={LEAVE_STEPS} /></div>
          </Reveal>
          <Reveal as="section" className="rounded-[1.5rem] bg-ink p-7 text-white md:p-9">
            <ShieldCheck className="h-6 w-6 text-[#F4A7B2]" aria-hidden />
            <h2 className="mt-4 text-[1.75rem]">Rules & regulations</h2>
            <ul className="mt-6 space-y-4">
              {RULES.map((r) => <li key={r} className="border-t border-white/15 pt-4 text-[0.98rem] leading-7 text-white/85">{r}</li>)}
            </ul>
            <p className="mt-6 text-sm text-white/60">Room or hostel changes are not a self-service request. Speak to your caretaker or the DoSA Office if you have a genuine concern.</p>
          </Reveal>
        </div>

        <div className="mt-12"><GoverningNote /></div>
        <BackNext back={{ href: "/hostel/resident-app", label: "Resident App" }} next={{ href: "/hostel/checkout", label: "Check-out & No Dues" }} />
      </div>
    </>
  );
}
