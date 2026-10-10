import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COHORTS, cohortById } from "@/data/cohorts";
import { hostelByCode, hostelBySlug } from "@/data/hostels";
import { HostelDetail } from "@/components/HostelDetail";

type P = { params: Promise<{ cohort: string; hostel: string }> };

export function generateStaticParams() {
  return COHORTS.flatMap((c) =>
    [...c.allocation.boys, ...c.allocation.girls].map((a) => ({ cohort: c.id, hostel: hostelByCode(a.hostel)!.slug })),
  );
}
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const h = hostelBySlug((await params).hostel);
  return { title: h ? h.name : "Hostel" };
}

export default async function CohortHostel({ params }: P) {
  const { cohort, hostel } = await params;
  const c = cohortById(cohort);
  const h = hostelBySlug(hostel);
  if (!c || !h || !c.allocation[h.gender].some((a) => a.hostel === h.code)) notFound();
  return <HostelDetail h={h} cohort={c} />;
}
