"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FileText, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { NOTICES, type Notice } from "@/data/directory";
import { DynamicTag } from "./ui";
import { EASE } from "./motion";

const CATS: ("All" | Notice["category"])[] = ["All", "Hostel Allocation", "Fees", "Reporting", "Residence Rules", "General"];

export function NoticesBrowser() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const list = useMemo(() => NOTICES.filter((n) =>
    (cat === "All" || n.category === cat) &&
    (!q.trim() || `${n.title} ${n.summary} ${n.audience}`.toLowerCase().includes(q.toLowerCase())),
  ), [q, cat]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0" role="group" aria-label="Filter by category">
          {CATS.filter((c) => c === "All" || NOTICES.some((n) => n.category === c)).map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
              className={`chip shrink-0 whitespace-nowrap !py-1.5 ${cat === c ? "!border-ink !bg-ink !text-white" : "hover:border-ink/30"}`}>{c}</button>
          ))}
        </div>
        <label className="relative md:w-80">
          <span className="sr-only">Search notices</span>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search notices" className="field !rounded-full !py-2 pl-10" />
        </label>
      </div>

      <p className="mt-6 text-sm text-ink-muted" aria-live="polite">{list.length} notice{list.length === 1 ? "" : "s"}</p>
      <ul className="mt-3 divide-y divide-line border-y border-line">
        <AnimatePresence initial={false}>
          {list.map((n) => (
            <motion.li key={n.id} id={n.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}
              className="scroll-mt-32 py-5 target:bg-butter/40">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-8">
                <div className="flex gap-4">
                  <FileText className="mt-1 h-5 w-5 shrink-0 text-crimson" aria-hidden />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{n.category}</p>
                    <h2 className="mt-1 font-serif text-[1.3rem] leading-snug text-ink">{n.title}</h2>
                    <p className="body-copy mt-1">{n.summary}</p>
                    <p className="mt-2 text-sm text-ink-muted"><span className="font-semibold text-ink-soft">For:</span> {n.audience}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3 pl-9 md:flex-col md:items-end md:pl-0">
                  <span className="text-sm text-ink-muted">{n.date ?? "Date: when published"}</span>
                  <DynamicTag>{n.pdf ? "PDF" : "PDF pending"}</DynamicTag>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {list.length === 0 && <p className="py-10 text-center text-ink-muted">No notices match your search.</p>}
    </div>
  );
}
