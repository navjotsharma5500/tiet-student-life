"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ik } from "@/lib/media";
import { retryRaw } from "./motion";

export type CampusSlide =
  | { kind: "photo"; url: string; alt: string; position?: string; zoom?: number }
  | { kind: "triptych"; urls: string[]; alt: string; positions?: string[] };

const SLIDE_INTERVAL = 1000;
const FADE = 0.35;

/** Full-bleed crossfading background for the Campus Life hero. Text and overlays live in the page. */
export function CampusHero({ slides }: { slides: CampusSlide[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || slides.length < 2) return;
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), SLIDE_INTERVAL);
    return () => clearTimeout(t);
  }, [i, reduce, slides.length]);

  // At a 1s cadence every slide must already be cached, or it would fade in blank.
  useEffect(() => {
    slides.forEach((sl) => (sl.kind === "photo" ? [sl.url] : sl.urls).forEach((u) => {
      new Image().src = ik(u, sl.kind === "photo" ? 1920 : 1000, 80);
    }));
  }, [slides]);

  const s = slides[i];
  const img = (url: string, alt: string, position: string | undefined, width: number, first: boolean, zoom?: number) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={ik(url, width, 80)} onError={retryRaw(url)} alt={alt} fetchPriority={first ? "high" : "auto"} className="h-full w-full object-cover" style={{ objectPosition: position, ...(zoom ? { transform: `scale(${zoom})`, transformOrigin: "center top" } : null) }} />
  );

  return (
    <div className="absolute inset-0 -z-10" role="img" aria-label={s.alt}>
      <AnimatePresence initial={false}>
        <motion.div key={i} className="absolute inset-0" initial={{ opacity: 0, scale: reduce ? 1 : 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: FADE, ease: "easeInOut" }}>
          {s.kind === "photo" ? (
            img(s.url, "", s.position, 1920, i === 0, s.zoom)
          ) : (
            <div className="grid h-full w-full grid-rows-3 gap-1 bg-ink md:grid-cols-3 md:grid-rows-1">
              {s.urls.map((u, n) => <div key={u} className="min-h-0 overflow-hidden">{img(u, "", s.positions?.[n], 1000, i === 0)}</div>)}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
