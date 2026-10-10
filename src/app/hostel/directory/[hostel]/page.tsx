import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HOSTELS, hostelBySlug } from "@/data/hostels";
import { HostelDetail } from "@/components/HostelDetail";

type P = { params: Promise<{ hostel: string }> };
export const generateStaticParams = () => HOSTELS.map((h) => ({ hostel: h.slug }));
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const h = hostelBySlug((await params).hostel);
  return { title: h ? h.name : "Hostel" };
}
export default async function DirectoryHostel({ params }: P) {
  const h = hostelBySlug((await params).hostel);
  if (!h) notFound();
  return <HostelDetail h={h} />;
}
