"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { cohortById } from "@/data/cohorts";

const KEY = "tiet:lastCohort";

export function RememberCohort({ id }: { id: string }) {
  useEffect(() => {
    try { sessionStorage.setItem(KEY, id); } catch { /* storage unavailable */ }
  }, [id]);
  return null;
}

export function useLastCohort() {
  const [id, setId] = useState<string | null>(null);
  useEffect(() => {
    try { setId(sessionStorage.getItem(KEY)); } catch { setId(null); }
  }, []);
  return id ? cohortById(id) ?? null : null;
}

/** "Back to your guide" when the student arrived from a cohort guide; otherwise a generic back link. */
export function BackToGuide({ fallback = { href: "/hostel", label: "Hostel Application Guide" }, anchor }: { fallback?: { href: string; label: string }; anchor?: string }) {
  const c = useLastCohort();
  const href = c ? `/hostel/${c.id}${anchor ? `#${anchor}` : ""}` : fallback.href;
  return (
    <Link href={href} className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-crimson">
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden />
      {c ? <>Back to your guide <span className="hidden font-normal text-ink-muted sm:inline">· {c.title}</span></> : fallback.label}
    </Link>
  );
}
