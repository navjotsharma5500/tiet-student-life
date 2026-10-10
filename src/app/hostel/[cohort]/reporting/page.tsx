import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COHORTS, cohortById } from "@/data/cohorts";
import { CohortHeader } from "@/components/CohortHeader";
import { ProcessDetail } from "@/components/ProcessDetail";

type P = { params: Promise<{ cohort: string }> };
export const generateStaticParams = () => COHORTS.map((c) => ({ cohort: c.id }));
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const c = cohortById((await params).cohort);
  return { title: c ? `Reporting & Joining — ${c.title}` : "Reporting & Joining" };
}

export default async function Page({ params }: P) {
  const c = cohortById((await params).cohort);
  if (!c) notFound();
  return (
    <>
      <CohortHeader c={c} page="Reporting & Joining" title="Reporting & Joining" />
      <ProcessDetail c={c} view="reporting" />
    </>
  );
}
