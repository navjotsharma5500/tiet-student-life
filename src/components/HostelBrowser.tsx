"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Images, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { COHORTS, cohortById } from "@/data/cohorts";
import { HOSTELS, hostelByCode, inventoryRow, legacyCode, totalBeds, totalRooms, type Gender, type Hostel } from "@/data/hostels";
import { ROOM_TYPES, ROOM_TYPE_ORDER, type RoomTypeCode } from "@/data/roomTypes";
import { EASE, Img } from "./motion";
import { Logo } from "./Logo";

type Row = { hostel: Hostel; rooms: RoomTypeCode[] };

export function HostelBrowser({ cohortId }: { cohortId?: string }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const cohort = cohortId ? cohortById(cohortId) : undefined;
  const [gender, setGender] = useState<"all" | Gender>("all");
  const [q, setQ] = useState("");

  const rows: Row[] = useMemo(() => {
    if (!cohort) return HOSTELS.map((h) => ({ hostel: h, rooms: h.inventory.map((r) => r.roomType) }));
    return (["boys", "girls"] as Gender[]).flatMap((g) =>
      cohort.allocation[g].map((a) => ({ hostel: hostelByCode(a.hostel)!, rooms: a.rooms })).filter((r) => r.hostel),
    );
  }, [cohort]);

  const filtered = rows.filter(({ hostel, rooms }) => {
    if (gender !== "all" && hostel.gender !== gender) return false;
    if (!q.trim()) return true;
    const hay = [hostel.name, hostel.code, `hostel ${hostel.code}`, ...rooms.map((r) => ROOM_TYPES[r].label)].join(" ").toLowerCase();
    return q.toLowerCase().split(/\s+/).every((t) => hay.includes(t));
  });

  const count = (g: "all" | Gender) => rows.filter((r) => g === "all" || r.hostel.gender === g).length;
  const detailBase = cohort ? `/hostel/${cohort.id}/hostels` : "/hostel/directory";

  return (
    <div>
      {/* Toolbar */}
      <div className="sticky top-[4.25rem] z-30 -mx-5 mb-8 border-b border-line bg-cream/95 px-5 py-3 backdrop-blur md:top-[4.75rem] md:mx-0 md:rounded-2xl md:border md:bg-white/90 md:px-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div role="tablist" aria-label="Filter by residence" className="flex rounded-full bg-cream-deep p-1">
            {(["all", "boys", "girls"] as const).map((g) => (
              <button
                key={g}
                role="tab"
                aria-selected={gender === g}
                onClick={() => setGender(g)}
                className={`relative flex-1 rounded-full px-4 py-1.5 text-sm font-semibold capitalize transition-colors md:flex-none ${gender === g ? "text-white" : "text-ink-soft hover:text-ink"}`}
              >
                {gender === g && <motion.span layoutId="g-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.3, ease: EASE }} />}
                <span className="relative">{g === "all" ? "All" : g} <span className="opacity-60">{count(g)}</span></span>
              </button>
            ))}
          </div>
          <label className="relative flex-1">
            <span className="sr-only">Search hostels</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by hostel, code or room type (e.g. “Tejas”, “J”, “1-Seater”)"
              className="field !rounded-full !py-2 pl-10 pr-9"
            />
            {q && (
              <button onClick={() => setQ("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"><X className="h-4 w-4" /></button>
            )}
          </label>
          <label className="flex min-w-0 items-center gap-2 text-sm">
            <span className="whitespace-nowrap font-semibold text-ink">Cohort</span>
            <select
              className="field min-w-0 flex-1 truncate !rounded-full !py-2 pr-8 text-sm md:!w-64 md:flex-none"
              value={cohort?.id ?? ""}
              onChange={(e) => router.push(e.target.value ? `/hostel/${e.target.value}/hostels` : "/hostel/directory")}
            >
              <option value="">All hostels</option>
              {COHORTS.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </label>
        </div>
      </div>

      <p className="mb-6 text-sm text-ink-muted" aria-live="polite">
        Showing {filtered.length} of {rows.length} residences{cohort ? ` for ${cohort.title}` : ""}.
        {cohort && " Only the room types open to your cohort are listed."}
      </p>

      <motion.ul layout className="space-y-6">
        <AnimatePresence initial={false} mode="popLayout">
          {filtered.map(({ hostel: h, rooms }, i) => {
            const sorted = [...rooms].sort((a, b) => ROOM_TYPE_ORDER.indexOf(a) - ROOM_TYPE_ORDER.indexOf(b));
            const cohortBeds = rooms.reduce((s, r) => s + (h.capacity[r] ?? 0), 0);
            const legacy = legacyCode(h);
            return (
              <motion.li
                layout
                key={h.slug}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: Math.min(i, 6) * 0.04 } }}
                exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
              >
                <Link href={`${detailBase}/${h.slug}`} className="group grid overflow-hidden rounded-[1.5rem] border border-line bg-white transition hover:border-crimson/30 hover:shadow-lift md:grid-cols-[minmax(0,22rem)_1fr]">
                  <div className="relative">
                    {h.images[0] ? (
                      <Img src={h.images[0].url} alt={h.images[0].alt} className="aspect-[16/10] h-full md:aspect-auto md:min-h-[15rem]" sizes="(min-width: 768px) 22rem, 100vw" width={900} zoom />
                    ) : (
                      <NoPhoto />
                    )}
                    {h.images.length > 1 && (
                      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-ink/75 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                        <Images className="h-3.5 w-3.5" aria-hidden /> {h.images.length}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col p-5 md:p-7">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wider ${h.gender === "boys" ? "bg-sky text-[#1D4467]" : "bg-blush text-[#7A2232]"}`}>{h.gender}</span>
                      {legacy && <span className="text-xs text-ink-muted">formerly {legacy}</span>}
                    </div>
                    <h3 className="mt-2 text-[1.6rem] leading-tight text-ink transition-colors group-hover:text-crimson">{h.name}</h3>
                    <ul className="mt-4 space-y-1.5">
                      {sorted.map((r) => (
                        <li key={r} className="flex items-baseline justify-between gap-4 text-sm">
                          <span className="text-ink-soft">{ROOM_TYPES[r].label}</span>
                          <span className="shrink-0 tabular-nums text-ink-muted">{inventoryRow(h, r)?.roomCount.toLocaleString("en-IN") ?? "—"} rooms · {inventoryRow(h, r)?.bedCount.toLocaleString("en-IN") ?? "—"} beds</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex items-center justify-between gap-4 pt-5">
                      <p className="text-xs text-ink-muted">
                        {cohort ? <>{cohortBeds.toLocaleString("en-IN")} beds in your room types · </> : null}
                        {totalRooms(h).toLocaleString("en-IN")} rooms · {totalBeds(h).toLocaleString("en-IN")} beds in total
                      </p>
                      <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-crimson">
                        View hostel <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-line p-10 text-center">
          <p className="font-semibold text-ink">No residences match “{q}”.</p>
          <button onClick={() => { setQ(""); setGender("all"); }} className="link-underline mt-2 text-sm">Clear filters</button>
        </div>
      )}
    </div>
  );
}

export function NoPhoto({ className = "" }: { className?: string }) {
  return (
    <div role="img" aria-label="Photographs coming soon" className={`relative flex aspect-[16/10] h-full flex-col items-center justify-center gap-3 overflow-hidden bg-gradient-to-br from-cream-deep via-cream to-lavender/70 md:aspect-auto md:min-h-[15rem] ${className}`}>
      <span aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/40" />
      <span aria-hidden className="absolute -bottom-16 left-8 h-40 w-40 rounded-full bg-blush/50" />
      <span className="relative rounded-2xl bg-white/85 px-4 py-3 shadow-soft"><Logo width={240} alt="" className="h-8 w-auto opacity-70" /></span>
      <span className="relative text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">Photo coming soon</span>
    </div>
  );
}
