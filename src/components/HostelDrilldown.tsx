"use client";

import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { COHORTS, LEVELS, PROCESS_LABEL, type LevelId } from "@/data/cohorts";
import { EASE, Img } from "./motion";

function readLevel(): LevelId | null {
  if (typeof window === "undefined") return null;
  const v = new URLSearchParams(window.location.search).get("level");
  return v === "ug" || v === "pg" || v === "phd" ? v : null;
}

export function HostelDrilldown() {
  const [level, setLevel] = useState<LevelId | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    setLevel(readLevel());
    const onPop = () => setLevel(readLevel());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const choose = useCallback((l: LevelId | null) => {
    const url = l ? `/hostel?level=${l}` : "/hostel";
    window.history.pushState(null, "", url);
    setLevel(l);
    const top = document.getElementById("drilldown");
    if (top) {
      const y = top.getBoundingClientRect().top + window.scrollY - 96;
      if (window.scrollY > y) window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
    }
  }, [reduce]);

  const L = LEVELS.find((l) => l.id === level);

  return (
    <div id="drilldown" className="container py-12 md:py-16">
      <LayoutGroup>
        <AnimatePresence mode="wait" initial={false}>
          {!L ? (
            <motion.div
              key="levels"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -16, transition: { duration: 0.3, ease: EASE } }}
            >
              <div className="mb-10 flex items-end justify-between gap-6">
                <div>
                  <p className="eyebrow mb-2">Step 1 of 3</p>
                  <h2 className="text-[1.75rem] md:text-[2.1rem]">Which programme are you in?</h2>
                </div>
              </div>
              <ul className="space-y-14 md:space-y-20">
                {LEVELS.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.08 * i }}
                    className="grid items-center gap-6 md:grid-cols-12 md:gap-12"
                  >
                    <button
                      onClick={() => choose(l.id)}
                      className={`group block md:col-span-6 ${i % 2 ? "md:order-2" : ""}`}
                      aria-label={`Choose ${l.name}`}
                    >
                      <motion.div layoutId={`level-img-${l.id}`} className="overflow-hidden rounded-[1.5rem]" transition={{ duration: 0.6, ease: EASE }}>
                        <Img src={l.image.url} alt={l.image.alt} className="aspect-[4/3] md:aspect-[5/4]" sizes="(min-width: 768px) 50vw, 100vw" zoom />
                      </motion.div>
                    </button>
                    <div className={`md:col-span-6 ${i % 2 ? "md:order-1 md:pr-6" : "md:pl-6"}`}>
                      <div className="flex items-baseline gap-3">
                        <span className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-xs font-bold text-ink ${l.tint}`}>{l.short}</span>
                        <motion.h3 layoutId={`level-title-${l.id}`} className="text-[2rem] leading-tight md:text-[2.5rem]">{l.name}</motion.h3>
                      </div>
                      <p className="body-copy mt-4 max-w-md text-base">{l.blurb}</p>
                      <p className="mt-3 text-sm text-ink-muted">
                        {COHORTS.filter((c) => c.level === l.id).length} cohort guides
                      </p>
                      <button onClick={() => choose(l.id)} className="group mt-6 inline-flex items-center gap-3 border-b-2 border-crimson pb-1 text-[0.95rem] font-semibold text-ink transition-colors hover:text-crimson">
                        Explore {l.name.toLowerCase()} guides
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                      </button>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ) : (
            <motion.div
              key={`cohorts-${L.id}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 12, transition: { duration: 0.25 } }}
            >
              <button onClick={() => choose(null)} className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-crimson">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden /> All programmes
              </button>

              <div className="grid gap-10 md:grid-cols-12">
                <div className="md:col-span-4">
                  <div className="md:sticky md:top-28">
                    <motion.div layoutId={`level-img-${L.id}`} className="overflow-hidden rounded-[1.25rem]" transition={{ duration: 0.6, ease: EASE }}>
                      <Img src={L.image.url} alt={L.image.alt} className="aspect-[16/9] md:aspect-[4/3]" sizes="(min-width: 768px) 33vw, 100vw" eager />
                    </motion.div>
                    <p className="eyebrow mt-6 mb-2">Step 2 of 3</p>
                    <motion.h2 layoutId={`level-title-${L.id}`} className="text-[2rem] leading-tight">{L.name}</motion.h2>
                    <p className="body-copy mt-3">Choose your year and admission type to open a guide written only for your cohort — your hostels, room types, process and dates.</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {LEVELS.filter((x) => x.id !== L.id).map((x) => (
                        <button key={x.id} onClick={() => choose(x.id)} className="chip hover:border-ink/30">Switch to {x.name}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-8">
                  {groupByYear(L.id).map(([year, list], gi) => (
                    <motion.section
                      key={year}
                      initial={reduce ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, ease: EASE, delay: 0.15 + gi * 0.07 }}
                      className="border-t border-line py-6 first:border-t-0 first:pt-0 md:grid md:grid-cols-[9rem_1fr] md:gap-6"
                    >
                      <h3 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted md:mb-0 md:pt-4">{year}</h3>
                      <ul className="space-y-2">
                        {list.map((c) => (
                          <li key={c.id}>
                            <Link
                              href={`/hostel/${c.id}`}
                              className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-white px-5 py-4 transition hover:border-crimson/40 hover:shadow-soft"
                            >
                              <span className="min-w-0">
                                <span className="flex flex-wrap items-center gap-2">
                                  <span className="font-semibold text-ink">{c.title}</span>
                                  {c.isNewAdmission && <span className="rounded-full bg-mint px-2 py-0.5 text-[0.68rem] font-semibold text-[#1F5A36]">New admission</span>}
                                </span>
                                <span className="mt-0.5 block text-sm text-ink-muted">{PROCESS_LABEL[c.process]}</span>
                              </span>
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink transition group-hover:border-crimson group-hover:bg-crimson group-hover:text-white">
                                <ArrowRight className="h-4 w-4" aria-hidden />
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.section>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
}

function groupByYear(level: LevelId) {
  const map = new Map<string, typeof COHORTS>();
  COHORTS.filter((c) => c.level === level).forEach((c) => {
    if (!map.has(c.year)) map.set(c.year, []);
    map.get(c.year)!.push(c);
  });
  return [...map.entries()];
}
