import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COHORTS, cohortById } from "@/data/cohorts";
import { CohortHeader } from "@/components/CohortHeader";
import { ProcessDetail } from "@/components/ProcessDetail";

type P = { params: Promise<{ cohort: string }> };
export const generateStaticParams = () => COHORTS.map((c) => ({ cohort: c.id }));
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const c = cohortById((await params).cohort);
  return { title: c ? `Payment & Room Booking — ${c.title}` : "Payment & Room Booking" };
}

export default async function Page({ params }: P) {
  const c = cohortById((await params).cohort);
  if (!c) notFound();
  return (
    <>
      <CohortHeader c={c} page="Payment & Room Booking" title="Payment & Room Booking" />
      <ProcessDetail c={c} view="payment" />
    </>
  );
}
