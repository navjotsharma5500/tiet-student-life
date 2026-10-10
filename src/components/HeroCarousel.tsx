"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { HERO_SLIDES } from "@/data/directory";
import { ik, ikSrcSet } from "@/lib/media";
import { EASE, retryRaw } from "./motion";

const DURATION = 7000;

export function HeroCarousel() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => setI((n) => (n + 1) % HERO_SLIDES.length), DURATION);
    return () => clearTimeout(t);
  }, [i, paused, reduce]);

  const s = HERO_SLIDES[i];

  return (
    <section aria-roledescription="carousel" aria-label="Campus life" className="relative isolate overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={s.url}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          >
            <div className="h-full w-full" style={s.zoom ? { transform: `scale(${s.zoom})` } : undefined}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ik(s.url, 1920, 78)}
              srcSet={ikSrcSet(s.url)}
              sizes="100vw"
              alt={s.alt}
              onError={retryRaw(s.url)}
              fetchPriority={i === 0 ? "high" : "auto"}
              className={`h-full w-full object-cover ${reduce ? "" : "animate-kenburns"}`}
              style={{ animationDuration: `${DURATION + 2000}ms`, objectPosition: s.position }}
            />
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/10 to-transparent" aria-hidden />
      </div>

      <div className="container relative flex min-h-[78svh] flex-col justify-end pb-10 pt-32 md:min-h-[82svh] md:pb-14">
        <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.1 }} className="max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F4A7B2]" /> Office of the Dean of Student Affairs
          </p>
          <h1 className="text-balance text-[2.5rem] leading-[1.05] text-white md:text-[3.75rem]">
            Life at Thapar, starting with where you’ll live.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
            Hostel allocation, fees, reporting and everyday residence — explained clearly for your programme and year.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/hostel" className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-cream">
              Find your hostel guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/hostel/apply" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Apply for hostel
            </Link>
          </div>
        </motion.div>

        <div className="mt-12 flex items-center gap-4">
          <div className="flex flex-1 gap-2" role="tablist" aria-label="Choose slide">
            {HERO_SLIDES.map((sl, n) => (
              <button
                key={sl.url}
                role="tab"
                aria-selected={n === i}
                aria-label={`Slide ${n + 1}: ${sl.alt}`}
                onClick={() => setI(n)}
                className="group relative h-6 flex-1 max-w-24"
              >
                <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/25 group-hover:bg-white/40">
                  {n === i && (
                    <motion.span
                      key={`${i}-${paused}`}
                      className="absolute inset-y-0 left-0 bg-white"
                      initial={{ width: paused || reduce ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: paused || reduce ? 0 : DURATION / 1000, ease: "linear" }}
                    />
                  )}
                  {n < i && <span className="absolute inset-0 bg-white/70" />}
                </span>
              </button>
            ))}
          </div>
          <button onClick={() => setPaused((p) => !p)} aria-label={paused ? "Play slideshow" : "Pause slideshow"} className="rounded-full border border-white/30 p-2 text-white/80 hover:bg-white/10">
            {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          </button>
          <p className="hidden text-xs text-white/60 sm:block" aria-live="polite">{s.alt}</p>
        </div>
      </div>
    </section>
  );
}
