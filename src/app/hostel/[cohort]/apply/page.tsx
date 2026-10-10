import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COHORTS, cohortById } from "@/data/cohorts";
import { CohortHeader } from "@/components/CohortHeader";
import { ApplyForm } from "@/components/ApplyForm";
import { ArrowLink } from "@/components/ui";
import { Info } from "lucide-react";

type P = { params: Promise<{ cohort: string }> };
export const generateStaticParams = () => COHORTS.map((c) => ({ cohort: c.id }));
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const c = cohortById((await params).cohort);
  return { title: c ? `Apply — ${c.title}` : "Apply for Hostel" };
}

export default async function Apply({ params }: P) {
  const c = cohortById((await params).cohort);
  if (!c) notFound();

  if (!c.hasApplicationForm) {
    return (
      <>
        <CohortHeader c={c} page="Apply" title="You don’t apply on this website" />
        <div className="container max-w-3xl py-12">
          <div className="flex gap-4 rounded-[1.25rem] bg-white p-6 shadow-soft">
            <Info className="mt-1 h-5 w-5 shrink-0 text-crimson" aria-hidden />
            <div>
              <p className="text-lg font-semibold text-ink">
                {c.process === "admission-cell"
                  ? "Your hostel preferences are collected by the Admission Cell through the link sent to your email."
                  : "Continuing residents apply directly in the Resident App when the hostel allocation notice opens."}
              </p>
              <p className="body-copy mt-2">The website form is used only by new admissions allotted by the DoSA Office (First-Year TSLAS, First-Year PG and PhD new admission).</p>
              <div className="mt-5 flex flex-wrap gap-5">
                <ArrowLink href={`/hostel/${c.id}/process`}>How allocation works for you</ArrowLink>
                <ArrowLink href={`/hostel/${c.id}`}>Back to your guide</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <CohortHeader
        c={c}
        page="Apply"
        title="Hostel Accommodation Application"
        lede="Takes about 10 minutes. Keep your admission letter ready as a PDF. You do not choose a hostel — the DoSA Office allots both your hostel and room number."
      />
      <div className="container grid grid-cols-1 gap-12 py-10 md:py-14 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <ApplyForm cohortId={c.id} />
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-4 text-sm">
            <div className="rounded-[1.25rem] bg-sky p-5">
              <p className="font-semibold text-ink">After you apply</p>
              <ol className="mt-3 list-decimal space-y-1.5 pl-4 text-ink-soft">
                <li>DoSA verifies eligibility</li>
                <li>Hostel + room number allotted</li>
                <li>Resident App onboarding email</li>
                <li>Pay hostel + mess fee in the app</li>
                <li>Report to your caretaker</li>
              </ol>
            </div>
            <p className="px-1 text-ink-muted">Need help? <Link href="/dosa" className="link-underline text-ink">Contact the DoSA Office</Link>.</p>
          </div>
        </aside>
      </div>
    </>
  );
}
