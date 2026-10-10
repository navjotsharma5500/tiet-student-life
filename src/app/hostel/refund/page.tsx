import type { Metadata } from "next";
import { ArrowDown, ArrowUp, Info } from "lucide-react";
import { REFUND_COUNTING, REFUND_WINDOWS } from "@/data/residence";
import { inr } from "@/data/roomTypes";
import { BackNext, GoverningNote, PageHeader } from "@/components/ui";
import { BackToGuide } from "@/components/CohortContext";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = { title: "Refund Policy" };

export default function Refund() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Hostel & Housing", href: "/hostel" }, { label: "Refund Policy" }]}
        eyebrow="Fees"
        title="Hostel refund policy"
        lede="How much of your Hostel Fee + Mess Fee is refunded depends on how many days have passed — and which date the count starts from."
        tint="bg-butter/60"
      >
        <div className="mt-6"><BackToGuide anchor="checkout" /></div>
      </PageHeader>

      <div className="container py-12 md:py-16">
        <Reveal as="section">
          <div className="relative grid gap-3 md:grid-cols-3">
            {REFUND_WINDOWS.map((w, i) => (
              <div key={w.range} className={`rounded-[1.25rem] p-6 ${w.tone}`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Window {i + 1}</p>
                <p className="mt-3 font-serif text-[1.9rem] leading-none text-ink">{w.range}</p>
                <p className="mt-4 text-lg font-semibold text-ink">{w.deduction}</p>
                {w.detail && <p className="text-sm text-ink-soft">{w.detail}</p>}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal as="section" className="mt-14 grid gap-8 md:grid-cols-[16rem_1fr]">
          <h2 className="text-[1.6rem]">Which date counts?</h2>
          <ol className="space-y-3">
            {REFUND_COUNTING.map((r, i) => (
              <li key={r} className="flex gap-4 rounded-xl border border-line bg-white px-5 py-4">
                <span className="font-serif text-xl text-crimson">{i + 1}</span><span className="body-copy">{r}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal as="section" className="mt-16 rounded-[1.5rem] border border-line bg-white p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-lavender px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink">Operational help · illustration</span>
          </div>
          <h2 className="mt-4 text-[1.6rem]">Room upgrades and downgrades</h2>
          <p className="body-copy mt-2 max-w-prose">When your room type changes during the session, the room-fee difference is adjusted using the refund-window percentage that is active at that time.</p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-cream p-5">
              <p className="flex items-center gap-2 font-semibold text-ink"><ArrowUp className="h-4 w-4 text-crimson" aria-hidden /> Upgrade</p>
              <p className="body-copy mt-1">Apply the active refund-window percentage to the room-fee difference.</p>
              <div className="mt-4 rounded-xl bg-white p-4 font-sans text-sm">
                <p className="text-ink-muted">Worked example — 50% window</p>
                <div className="mt-2 space-y-1 tabular-nums">
                  <p className="flex justify-between"><span className="text-ink-soft">New room fee</span><span>{inr(70000)}</span></p>
                  <p className="flex justify-between"><span className="text-ink-soft">Current room fee</span><span>− {inr(60000)}</span></p>
                  <p className="flex justify-between border-t border-line pt-1"><span className="text-ink-soft">Difference</span><span>{inr(10000)}</span></p>
                  <p className="flex justify-between"><span className="text-ink-soft">× active window</span><span>50%</span></p>
                  <p className="flex justify-between border-t border-line pt-1 font-semibold text-ink"><span>Additional adjustment</span><span>{inr(5000)}</span></p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-cream p-5">
              <p className="flex items-center gap-2 font-semibold text-ink"><ArrowDown className="h-4 w-4 text-crimson" aria-hidden /> Downgrade</p>
              <p className="body-copy mt-1">The refund on the room-fee difference is also adjusted by the active refund-window percentage.</p>
            </div>
          </div>
          <p className="mt-6 flex gap-2 text-sm text-ink-muted"><Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />This is an illustration to help you understand the method. The final calculation is subject to the official policy and verification by Accounts / DoSA.</p>
        </Reveal>

        <div className="mt-12"><GoverningNote /></div>
        <BackNext back={{ href: "/hostel/checkout", label: "Check-out & No Dues" }} next={{ href: "/hostel/circulars", label: "Circulars & documents" }} />
      </div>
    </>
  );
}
