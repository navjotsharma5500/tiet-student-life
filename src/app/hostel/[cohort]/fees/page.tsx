import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COHORTS, cohortById } from "@/data/cohorts";
import { CohortHeader } from "@/components/CohortHeader";
import { FeeStructure } from "@/components/FeeStructure";
import { BackNext } from "@/components/ui";

type P = { params: Promise<{ cohort: string }> };
export const generateStaticParams = () => COHORTS.map((c) => ({ cohort: c.id }));
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const c = cohortById((await params).cohort);
  return { title: c ? `Fee Structure — ${c.title}` : "Fee Structure" };
}

export default async function Page({ params }: P) {
  const c = cohortById((await params).cohort);
  if (!c) notFound();
  return (
    <>
      <CohortHeader c={c} page="Room Types & Pricing" title="Room Types & Pricing" lede="The room types open to your cohort, the current reference room fee for each, and the hostels that offer them." />
      <div className="container py-10 md:py-14">
        <FeeStructure cohort={c} />
        <BackNext back={{ href: `/hostel/${c.id}#rooms`, label: "Back to your application guide" }} next={{ href: `/hostel/${c.id}/process`, label: c.process === "dosa-new" ? "Application & allotment" : "Allocation process" }} />
      </div>
    </>
  );
}
