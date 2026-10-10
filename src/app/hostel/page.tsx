import type { Metadata } from "next";
import Link from "next/link";
import { HostelDrilldown } from "@/components/HostelDrilldown";
import { PageHeader } from "@/components/ui";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Hostel Application Guide" };

export default function HostelLanding() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Hostel & Housing" }]}
        eyebrow="Hostel & Housing"
        title="Hostel Application Guide"
        lede="Every cohort at TIET joins residence a little differently. Choose your programme and year to see only the hostels, room types, steps and dates that apply to you."
      >
        <div className="mt-8 flex flex-wrap gap-2 text-sm">
          {[
            ["Hostel Directory", "/hostel/directory"],
            ["Room Types & Fees", "/hostel/fees"],
            ["Apply for Hostel", "/hostel/apply"],
            ["Refund Policy", "/hostel/refund"],
          ].map(([l, h]) => (
            <Link key={h} href={h} className="chip group !py-1.5 hover:border-ink/30">
              {l} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </PageHeader>
      <HostelDrilldown />
    </>
  );
}
