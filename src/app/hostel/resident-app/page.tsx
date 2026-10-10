import type { Metadata } from "next";
import { Smartphone, Wrench, CalendarCheck, Wallet, BedDouble } from "lucide-react";
import { RESIDENT_APP_ONBOARDING } from "@/data/processes";
import { BackNext, PageHeader, StepList, GoverningNote, DynamicTag } from "@/components/ui";
import { BackToGuide } from "@/components/CohortContext";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = { title: "Resident App" };

const uses = [
  { icon: BedDouble, t: "See your allotment", d: "Your hostel and room number, once allotted." },
  { icon: Wallet, t: "Pay hostel + mess fee", d: "Online, in the app." },
  { icon: CalendarCheck, t: "Apply & book rooms", d: "Second year onwards: preferences, groups and room booking." },
  { icon: Smartphone, t: "Apply for leave", d: "Your parent is informed on WhatsApp." },
  { icon: Wrench, t: "Raise maintenance", d: "Through the app or your caretaker, as applicable." },
];

export default function ResidentApp() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Hostel & Housing", href: "/hostel" }, { label: "Resident App" }]}
        eyebrow="Residence services"
        title="Dormly Thapar Resident App"
        lede="Your hostel in your pocket."
        tint="bg-sky"
      >
        <div className="mt-6"><BackToGuide anchor="resident-app" /></div>
      </PageHeader>

      <div className="container py-12 md:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {uses.map(({ icon: I, t, d }, i) => (
            <Reveal key={t} delay={i * 0.05} className="rounded-[1.25rem] border border-line bg-white p-5">
              <I className="h-5 w-5 text-crimson" aria-hidden />
              <p className="mt-4 font-semibold text-ink">{t}</p>
              <p className="mt-1 text-sm text-ink-soft">{d}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <Reveal as="section">
            <h2 className="text-[1.6rem]">New admissions allotted by DoSA</h2>
            <p className="body-copy mt-2">First-Year TSLAS, First-Year PG and PhD new admissions. The app is required before reporting.</p>
            <div className="mt-8"><StepList steps={RESIDENT_APP_ONBOARDING} /></div>
          </Reveal>
          <div className="space-y-6">
            <Reveal as="section" className="rounded-[1.25rem] bg-mint p-6">
              <h2 className="text-[1.4rem]">Second year onwards</h2>
              <p className="body-copy mt-2">Use your existing account to apply (individually or as a group), pay hostel + mess fee after allotment, and book your room — first come, first served. Your room then appears under <strong className="text-ink">Upcoming Booking</strong>.</p>
            </Reveal>
            <Reveal as="section" className="rounded-[1.25rem] bg-butter p-6">
              <h2 className="text-[1.4rem]">First-Year Engineering (UG)</h2>
              <p className="body-copy mt-2">The Resident App is not required before your first reporting. Instructions for residence services are shared after you join.</p>
            </Reveal>
            <Reveal as="section" className="rounded-[1.25rem] border border-line bg-white p-6">
              <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-ink-muted">Download</h2>
              <p className="mt-2 text-ink">App Store and Google Play links will be configured here.</p>
              <div className="mt-3"><DynamicTag>Links pending</DynamicTag></div>
              <p className="mt-4 text-sm text-ink-soft">Tip: your OTP may arrive in Spam. Always log in with the email you used in your hostel application.</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-12"><GoverningNote /></div>
        <BackNext back={{ href: "/hostel", label: "Hostel Application Guide" }} next={{ href: "/hostel/living", label: "Living in residence" }} />
      </div>
    </>
  );
}
