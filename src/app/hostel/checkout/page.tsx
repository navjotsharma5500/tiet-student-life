import type { Metadata } from "next";
import { CHECKOUT_STEPS, REFUND_WINDOWS } from "@/data/residence";
import { ArrowLink, BackNext, GoverningNote, PageHeader, StepList } from "@/components/ui";
import { BackToGuide } from "@/components/CohortContext";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = { title: "Check-out & No Dues" };

export default function Checkout() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Hostel & Housing", href: "/hostel" }, { label: "Check-out & No Dues" }]}
        eyebrow="Leaving residence"
        title="Check-out & Hostel No Dues"
        lede="Return what was issued to you, get your room checked and collect your No Dues Slip."
        tint="bg-lavender"
      >
        <div className="mt-6"><BackToGuide anchor="checkout" /></div>
      </PageHeader>
      <div className="container py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <Reveal><StepList steps={CHECKOUT_STEPS} /></Reveal>
          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[1.25rem] border border-line bg-white p-5">
              <p className="font-semibold text-ink">Bring back</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                <li>Room key</li><li>Almirah key</li><li>AC remote (where applicable)</li><li>Any other item issued to you</li>
              </ul>
            </div>
            <div className="rounded-[1.25rem] bg-cream-deep p-5">
              <p className="font-semibold text-ink">Refund windows</p>
              <ul className="mt-3 space-y-2 text-sm">
                {REFUND_WINDOWS.map((w) => <li key={w.range} className="flex justify-between gap-3"><span className="text-ink-soft">{w.range}</span><span className="font-semibold text-ink">{w.deduction}</span></li>)}
              </ul>
              <div className="mt-4"><ArrowLink href="/hostel/refund">Full refund policy</ArrowLink></div>
            </div>
          </aside>
        </div>
        <div className="mt-12"><GoverningNote /></div>
        <BackNext back={{ href: "/hostel/living", label: "Living in residence" }} next={{ href: "/hostel/refund", label: "Refund policy" }} />
      </div>
    </>
  );
}
