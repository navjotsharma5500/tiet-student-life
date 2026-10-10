import type { Metadata } from "next";
import { ExternalLink, Info } from "lucide-react";
import { NoticesBrowser } from "@/components/NoticesBrowser";
import { PageHeader } from "@/components/ui";
import { CAMPUS_NOTICES_URL } from "@/data/directory";

export const metadata: Metadata = { title: "Student Notices" };

export default function Notices() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Notices" }]}
        eyebrow="Notices"
        title="Student notices"
        lede="Allocation notices, fee notices, reporting circulars and residence rules — searchable in one place."
        tint="bg-butter/50"
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={CAMPUS_NOTICES_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">Campus Connect notices <ExternalLink className="h-3.5 w-3.5" /></a>
        </div>
      </PageHeader>
      <div className="container py-12">
        <div className="mb-8 flex gap-3 rounded-2xl border border-dashed border-line bg-white/70 p-4 text-sm text-ink-soft">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-crimson" aria-hidden />
          <p>Prototype: the entries below are the notice <strong className="text-ink">types</strong> this page will carry, not live notices. Dates and PDFs will be published from the DoSA content system. Until then, use Campus Connect notices above.</p>
        </div>
        <NoticesBrowser />
      </div>
    </>
  );
}
