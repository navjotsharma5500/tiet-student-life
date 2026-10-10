import type { Metadata } from "next";
import { ExternalLink, FileText } from "lucide-react";
import { CAMPUS_NOTICES_URL, CIRCULAR_SLOTS } from "@/data/directory";
import { BackNext, DynamicTag, PageHeader } from "@/components/ui";
import { BackToGuide } from "@/components/CohortContext";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = { title: "Circulars & Official Documents" };

export default function Circulars() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Hostel & Housing", href: "/hostel" }, { label: "Circulars & Documents" }]}
        eyebrow="Official record"
        title="Circulars & official documents"
        lede="The guides on this site explain the process in plain language. These documents are the governing record."
      >
        <div className="mt-6"><BackToGuide anchor="circulars" /></div>
      </PageHeader>
      <div className="container py-12 md:py-16">
        <ul className="divide-y divide-line overflow-hidden rounded-[1.25rem] border border-line bg-white">
          {CIRCULAR_SLOTS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.04} className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-crimson-soft"><FileText className="h-5 w-5 text-crimson" aria-hidden /></span>
                <span>
                  <span className="block font-semibold text-ink">{s.title}</span>
                  <span className="block text-sm text-ink-muted">{s.category} · current session</span>
                </span>
              </span>
              <DynamicTag>PDF to be published by DoSA</DynamicTag>
            </Reveal>
          ))}
        </ul>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[["Student notices on Campus Connect", CAMPUS_NOTICES_URL]].map(([l, h]) => (
            <a key={h} href={h} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-[1.25rem] bg-ink px-5 py-4 text-white transition hover:bg-ink-soft">
              <span className="font-semibold">{l}</span><ExternalLink className="h-4 w-4 opacity-70 group-hover:opacity-100" />
            </a>
          ))}
        </div>
        <p className="mt-6 text-sm text-ink-muted">First-year engineering students: your circulars and instructions are primarily sent by Admission Cell email.</p>
        <BackNext back={{ href: "/hostel", label: "Hostel Application Guide" }} next={{ href: "/notices", label: "All student notices" }} />
      </div>
    </>
  );
}
