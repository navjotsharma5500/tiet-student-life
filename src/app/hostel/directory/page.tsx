import type { Metadata } from "next";
import { HostelBrowser } from "@/components/HostelBrowser";
import { PageHeader, BackNext } from "@/components/ui";
import { HOSTELS, totalBeds } from "@/data/hostels";

export const metadata: Metadata = { title: "Hostel Directory" };

export default function Directory() {
  const boys = HOSTELS.filter((h) => h.gender === "boys");
  const girls = HOSTELS.filter((h) => h.gender === "girls");
  const sum = (l: typeof HOSTELS) => l.reduce((s, h) => s + totalBeds(h), 0).toLocaleString("en-IN");
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Hostel & Housing", href: "/hostel" }, { label: "Hostel Directory" }]}
        eyebrow="Hostel & Housing"
        title="Hostel Directory"
        lede="All residences at TIET. Pick your cohort to see only the hostels and room types you can be allotted."
      >
        <div className="mt-8 grid max-w-xl grid-cols-2 gap-3">
          <div className="rounded-2xl bg-sky p-4"><p className="font-serif text-3xl">{boys.length}</p><p className="text-sm text-ink-soft">Boys’ residences · {sum(boys)} beds</p></div>
          <div className="rounded-2xl bg-blush p-4"><p className="font-serif text-3xl">{girls.length}</p><p className="text-sm text-ink-soft">Girls’ residences · {sum(girls)} beds</p></div>
        </div>
      </PageHeader>
      <div className="container py-10 md:py-14">
        <HostelBrowser />
        <BackNext back={{ href: "/hostel", label: "Hostel Application Guide" }} next={{ href: "/hostel/fees", label: "Room types & fees" }} />
      </div>
    </>
  );
}
