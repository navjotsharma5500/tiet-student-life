import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COHORTS, cohortById } from "@/data/cohorts";
import { CohortHeader } from "@/components/CohortHeader";
import { CohortGuide } from "@/components/CohortGuide";

type P = { params: Promise<{ cohort: string }> };

export function generateStaticParams() {
  return COHORTS.map((c) => ({ cohort: c.id }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const c = cohortById((await params).cohort);
  return { title: c ? `${c.title} — Application Guide` : "Application Guide" };
}

export default async function CohortPage({ params }: P) {
  const c = cohortById((await params).cohort);
  if (!c) notFound();
  return (
    <>
      <CohortHeader c={c} />
      <CohortGuide cohortId={c.id} />
    </>
  );
}
