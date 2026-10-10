import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COHORTS, cohortById } from "@/data/cohorts";
import { CohortHeader } from "@/components/CohortHeader";
import { HostelBrowser } from "@/components/HostelBrowser";
import { BackNext } from "@/components/ui";

type P = { params: Promise<{ cohort: string }> };
export const generateStaticParams = () => COHORTS.map((c) => ({ cohort: c.id }));
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const c = cohortById((await params).cohort);
  return { title: c ? `Hostel Options — ${c.title}` : "Hostel Options" };
}

export default async function CohortHostels({ params }: P) {
  const c = cohortById((await params).cohort);
  if (!c) notFound();
  return (
    <>
      <CohortHeader c={c} page="Hostel Options" title="Hostel Options" lede="Every residence open to your cohort, with only the room types you can be allotted. Open a hostel to see its photographs, capacity and contacts." />
      <div className="container py-10 md:py-14">
        <HostelBrowser cohortId={c.id} />
        <BackNext back={{ href: `/hostel/${c.id}#rooms`, label: "Back to your application guide" }} next={{ href: `/hostel/${c.id}/fees`, label: "Room types & pricing" }} />
      </div>
    </>
  );
}
