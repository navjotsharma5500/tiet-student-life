import type { Metadata } from "next";
import { NoticesBrowser } from "@/components/NoticesBrowser";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Student Notices" };

export default function Notices() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Notices" }]}
        eyebrow="Notices"
        title="Student notices"
        lede="Official hostel allocation, fee, reporting and ID card notices — searchable in one place."
        tint="bg-butter/50"
      />
      <div className="container py-12">
        <NoticesBrowser />
      </div>
    </>
  );
}
