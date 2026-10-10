import type { Metadata } from "next";
import { FeeStructure } from "@/components/FeeStructure";
import { BackNext, PageHeader } from "@/components/ui";
import { BackToGuide } from "@/components/CohortContext";

export const metadata: Metadata = { title: "Room Types & Fee Structure" };

export default function Fees() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Hostel & Housing", href: "/hostel" }, { label: "Room Types & Fees" }]}
        eyebrow="Hostel & Housing"
        title="Room Types & Fee Structure"
        lede="Every room type in TIET residences, with its current reference room fee and the hostels that offer it. Your cohort guide shows only the room types you can be allotted."
        tint="bg-butter/50"
      >
        <div className="mt-6"><BackToGuide anchor="rooms" /></div>
      </PageHeader>
      <div className="container py-10 md:py-14">
        <FeeStructure />
        <BackNext back={{ href: "/hostel", label: "Hostel Application Guide" }} next={{ href: "/hostel/refund", label: "Refund policy" }} />
      </div>
    </>
  );
}
