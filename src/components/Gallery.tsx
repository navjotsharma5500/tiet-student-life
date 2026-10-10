"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { Media } from "@/lib/media";
import { ik } from "@/lib/media";
import { EASE, Img, retryRaw } from "./motion";

/** Editorial gallery: one large lead image + supporting tiles, with an accessible lightbox. */
export function Gallery({ images, title }: { images: Media[]; title: string }) {
  const [idx, setIdx] = useState<number | null>(null);
  const close = useCallback(() => setIdx(null), []);
  const step = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + images.length) % images.length)), [images.length]);

  useEffect(() => {
    if (idx === null) return;
    const on = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", on);
    return () => { window.removeEventListener("keydown", on); document.body.style.overflow = ""; };
  }, [idx, close, step]);

  if (!images.length) return null;
  const [lead, ...rest] = images;

  return (
    <>
      <div className="grid gap-3 md:grid-cols-3 md:grid-rows-2">
        <button onClick={() => setIdx(0)} className="group relative overflow-hidden rounded-[1.25rem] md:col-span-2 md:row-span-2" aria-label={`Open gallery: ${lead.alt}`}>
          <Img src={lead.url} alt={lead.alt} className="aspect-[4/3] h-full md:aspect-auto md:min-h-[26rem]" sizes="(min-width: 768px) 66vw, 100vw" eager zoom />
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ink opacity-0 shadow-soft transition group-hover:opacity-100 group-focus-visible:opacity-100">
            <Expand className="h-3.5 w-3.5" /> View all {images.length}
          </span>
        </button>
        {rest.slice(0, 2).map((m, i) => (
          <button key={m.url} onClick={() => setIdx(i + 1)} className="group relative overflow-hidden rounded-[1.25rem]" aria-label={`Open photo: ${m.alt}`}>
            <Img src={m.url} alt={m.alt} className="aspect-[4/3] h-full" sizes="(min-width: 768px) 33vw, 100vw" zoom width={800} />
            {m.caption && <span className="absolute bottom-3 left-3 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">{m.caption}</span>}
            {i === 1 && rest.length > 2 && (
              <span className="absolute inset-0 flex items-center justify-center bg-ink/45 font-serif text-2xl text-white">+{rest.length - 2}</span>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {idx !== null && (
          <motion.div
            role="dialog" aria-modal="true" aria-label={`${title} photo gallery`}
            className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between px-4 py-3 text-white/80 md:px-6">
              <p className="text-sm"><span className="font-semibold text-white">{title}</span> · {idx + 1} / {images.length}{images[idx].caption ? ` · ${images[idx].caption}` : ""}</p>
              <button onClick={close} aria-label="Close gallery" autoFocus className="rounded-full p-2 hover:bg-white/10"><X className="h-6 w-6" /></button>
            </div>
            <div className="relative flex flex-1 items-center justify-center px-4 pb-4 md:px-16">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={images[idx].url}
                  src={ik(images[idx].url, 1920, 82)}
                  alt={images[idx].alt}
                  onError={retryRaw(images[idx].url)}
                  className="max-h-[78dvh] max-w-full rounded-xl object-contain"
                  initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                />
              </AnimatePresence>
              {images.length > 1 && (
                <>
                  <button onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 md:left-4"><ChevronLeft className="h-5 w-5" /></button>
                  <button onClick={() => step(1)} aria-label="Next photo" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 md:right-4"><ChevronRight className="h-5 w-5" /></button>
                </>
              )}
            </div>
            <div className="no-scrollbar flex justify-center gap-2 overflow-x-auto px-4 pb-5">
              {images.map((m, i) => (
                <button key={m.url} onClick={() => setIdx(i)} aria-label={`Show photo ${i + 1}`} className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg ring-2 transition ${i === idx ? "ring-white" : "ring-transparent opacity-50 hover:opacity-90"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ik(m.url, 200)} alt="" onError={retryRaw(m.url)} className="h-full w-full bg-white/10 object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
