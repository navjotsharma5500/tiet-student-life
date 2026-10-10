"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ik, ikSrcSet, rawSrc } from "@/lib/media";
import { ImageOff } from "lucide-react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children, delay = 0, y = 18, className, as = "div",
}: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "section" | "article" }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

type Stage = "transformed" | "raw" | "failed";

/**
 * Lazy, responsive ImageKit image with a calm skeleton and fade-in.
 * Reliability: transformed URL → original (raw) ImageKit URL once → branded fallback.
 * It never renders an empty block: until the image paints, a tinted shimmer is shown;
 * if both URLs fail, a designed fallback with the alt text is shown.
 */
export function Img({
  src, alt, className = "", sizes = "100vw", eager = false, width = 1200, zoom = false, objectPosition, fit = "cover",
}: {
  src: string; alt: string; className?: string; sizes?: string; eager?: boolean; width?: number; zoom?: boolean;
  /** CSS object-position / focal point, e.g. "center 20%" for face-first portraits. */
  objectPosition?: string;
  fit?: "cover" | "contain";
}) {
  const [stage, setStage] = useState<Stage>("transformed");
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => { setStage("transformed"); setLoaded(false); }, [src]);

  const fail = () => setStage((s) => (s === "transformed" ? "raw" : "failed"));

  // Images can finish (or fail) before React hydrates, in which case onLoad/onError never fire.
  useEffect(() => {
    const el = ref.current;
    if (!el || !el.complete) return;
    if (el.naturalWidth > 0) setLoaded(true);
    else fail();
  }, [src, stage]);

  return (
    <div className={`relative overflow-hidden bg-cream-deep ${className}`}>
      {!loaded && stage !== "failed" && (
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <div className="h-full w-full -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>
      )}
      {stage === "failed" ? (
        <ImageFallback label={alt} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={stage}
          ref={ref}
          src={stage === "transformed" ? ik(src, width) : rawSrc(src)}
          srcSet={stage === "transformed" ? ikSrcSet(src) : undefined}
          sizes={stage === "transformed" ? sizes : undefined}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={fail}
          style={objectPosition ? { objectPosition } : undefined}
          className={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"} transition-[opacity,transform] duration-700 ease-out ${loaded ? "opacity-100" : "opacity-0"} ${zoom ? "group-hover:scale-[1.04]" : ""}`}
        />
      )}
    </div>
  );
}

/** Branded placeholder used when media is missing or cannot load. Never blank. */
export function ImageFallback({ label, note }: { label: string; note?: string }) {
  return (
    <div role="img" aria-label={label} className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-cream-deep via-cream to-blush/60 p-4 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-soft">
        <ImageOff className="h-4 w-4 text-crimson/70" aria-hidden />
      </span>
      <span className="max-w-[16rem] text-xs font-medium leading-snug text-ink-soft">{label}</span>
      {note && <span className="text-[0.68rem] uppercase tracking-wider text-ink-muted">{note}</span>}
    </div>
  );
}

/** For plain <img> tags (hero, lightbox, logo): retry the raw ImageKit URL once on error. */
export function retryRaw(raw: string) {
  return (e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    if (el.dataset.retried) return;
    el.dataset.retried = "1";
    el.removeAttribute("srcset");
    el.src = rawSrc(raw);
  };
}
