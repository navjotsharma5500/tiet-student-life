import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COHORTS } from "@/data/cohorts";
import { PageHeader } from "@/components/ui";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = { title: "Apply for Hostel" };

export default function ApplyChooser() {
  const eligible = COHORTS.filter((c) => c.hasApplicationForm);
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Hostel & Housing", href: "/hostel" }, { label: "Apply for Hostel" }]}
        eyebrow="Hostel & Housing"
        title="Apply for hostel accommodation"
        lede="The website application is for new admissions allotted by the DoSA Office. Choose your cohort to open the right form."
      />
      <div className="container py-12">
        <ul className="grid gap-4 md:grid-cols-2">
          {eligible.map((c, i) => (
            <Reveal as="li" key={c.id} delay={i * 0.05}>
              <Link href={`/hostel/${c.id}/apply`} className="group flex h-full items-center justify-between gap-4 rounded-[1.25rem] border border-line bg-white p-6 transition hover:border-crimson/40 hover:shadow-lift">
                <span>
                  <span className="block font-serif text-xl text-ink group-hover:text-crimson">{c.title}</span>
                  <span className="mt-1 block text-sm text-ink-muted">{c.short}{c.jrfDocuments ? " · JRF documents if applicable" : ""}</span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-crimson transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </Reveal>
          ))}
        </ul>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.25rem] bg-blush p-6">
            <p className="font-semibold text-ink">First-Year Engineering (UG)?</p>
            <p className="body-copy mt-1">You don’t use this form. The Admission Cell emails you a preference link and allots hostels on campus by JEE Main merit.</p>
            <Link href="/hostel/ug-eng-1/process" className="link-underline mt-3 inline-block text-sm font-semibold">How first-year allocation works</Link>
          </div>
          <div className="rounded-[1.25rem] bg-mint p-6">
            <p className="font-semibold text-ink">Second year onwards?</p>
            <p className="body-copy mt-1">Apply directly in the Resident App when the hostel allocation notice is published — individually or as a group.</p>
            <Link href="/hostel?level=ug" className="link-underline mt-3 inline-block text-sm font-semibold">Find your cohort guide</Link>
          </div>
        </div>
      </div>
    </>
  );
}
