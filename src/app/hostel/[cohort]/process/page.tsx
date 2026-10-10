import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COHORTS, cohortById } from "@/data/cohorts";
import { CohortHeader } from "@/components/CohortHeader";
import { ProcessDetail } from "@/components/ProcessDetail";

type P = { params: Promise<{ cohort: string }> };
export const generateStaticParams = () => COHORTS.map((c) => ({ cohort: c.id }));
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const c = cohortById((await params).cohort);
  return { title: c ? `Application / Allocation Process — ${c.title}` : "Application / Allocation Process" };
}

export default async function Page({ params }: P) {
  const c = cohortById((await params).cohort);
  if (!c) notFound();
  return (
    <>
      <CohortHeader c={c} page="Application / Allocation Process" title="Application / Allocation Process" />
      <ProcessDetail c={c} view="process" />
    </>
  );
}
