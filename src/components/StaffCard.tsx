"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail, RotateCcw } from "lucide-react";
import { useState, type KeyboardEvent, type ReactNode } from "react";
import type { Person, TierLayout } from "@/data/directory";
import { EASE, Img } from "./motion";

/* ───────────── Shared bits ───────────── */

function initials(name: string) {
  return name.replace(/^(Dr|Mr|Mrs|Ms)\.?\s+/i, "").split(/\s+/).map((w) => w[0]).slice(0, 2).join("");
}

function Portrait({ p, className, width = 600, zoom = false, eager = false }: { p: Person; className: string; width?: number; zoom?: boolean; eager?: boolean }) {
  if (p.photo) {
    return <Img src={p.photo} alt={`Portrait of ${p.name}`} className={className} width={width} zoom={zoom} eager={eager} objectPosition={p.photoPosition} />;
  }
  return (
    <div role="img" aria-label={p.name} className={`${className} flex items-center justify-center bg-gradient-to-br from-lavender to-blush font-serif text-3xl text-ink`}>
      {initials(p.name)}
    </div>
  );
}

const PROFILE_LABEL = "Opens official profile in a new tab";

/* ───────────── Profile cards (whole card → official profile) ───────────── */

function ProfileShell({ p, children, className }: { p: Person; children: ReactNode; className: string }) {
  if (p.interaction !== "profile" || !p.profileUrl) return <div className={className}>{children}</div>;
  return (
    <a href={p.profileUrl} target="_blank" rel="noopener noreferrer" aria-label={`${p.name}, ${p.role}. ${PROFILE_LABEL}`} className={`${className} rounded-[1.5rem] outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-4 focus-visible:ring-offset-cream`}>
      {children}
    </a>
  );
}

function ProfileCue({ light = false }: { light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 text-sm font-semibold ${light ? "text-white" : "text-crimson"}`}>
      <span className="bg-gradient-to-r from-current to-current bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">View profile</span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
    </span>
  );
}

const TINTS = ["bg-sky", "bg-blush", "bg-mint", "bg-lavender"];

const RINGS: Record<string, string> = { "bg-sky": "ring-sky", "bg-blush": "ring-blush", "bg-mint": "ring-mint", "bg-lavender": "ring-lavender" };

export function FeatureCard({ p }: { p: Person }) {
  return (
    <ProfileShell p={p} className="group relative grid items-stretch overflow-hidden rounded-[2rem] bg-gradient-to-br from-lavender via-lavender/80 to-blush/70 shadow-soft transition-shadow duration-500 hover:shadow-lift md:grid-cols-[minmax(0,22rem)_1fr]">
      <div className="overflow-hidden">
        <Portrait p={p} className="aspect-[4/5] h-full w-full md:aspect-auto md:min-h-[26rem]" width={700} eager zoom />
      </div>
      <div className="flex flex-col justify-center p-7 md:p-14">
        <span className="inline-flex w-fit rounded-full bg-white/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">{p.role}</span>
        <h3 className="mt-5 text-[2.4rem] leading-[1.05] transition-colors group-hover:text-crimson md:text-[3.4rem]">{p.name}</h3>
        <span className="mt-5 block h-px w-16 bg-crimson/40" aria-hidden />
        <p className="lede mt-5 max-w-lg">Leads the Office of the Dean of Student Affairs.</p>
        {p.profileUrl && <div className="mt-7"><ProfileCue /></div>}
      </div>
    </ProfileShell>
  );
}

/** Associate Deans — large tinted cards, photo beside text from sm up. */
export function PortraitCard({ p, tint = "bg-lavender" }: { p: Person; tint?: string }) {
  return (
    <ProfileShell p={p} className={`group grid h-full overflow-hidden rounded-[1.75rem] ${tint} shadow-soft transition-shadow duration-500 hover:shadow-lift sm:grid-cols-[minmax(0,13rem)_1fr]`}>
      <div className="overflow-hidden">
        <Portrait p={p} className="aspect-[4/5] h-full w-full sm:aspect-auto sm:min-h-[19rem]" width={600} zoom />
      </div>
      <div className="flex flex-col justify-center gap-1 p-6 md:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">{p.role}</p>
        <h3 className="font-serif text-[1.6rem] leading-tight text-ink transition-colors group-hover:text-crimson md:text-[1.85rem]">{p.name}</h3>
        {p.responsibility && (
          <p className="mt-2 flex items-start gap-2 border-t border-ink/10 pt-2.5 text-[0.82rem] leading-snug text-ink-soft">
            <span className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-crimson/70" aria-hidden />
            <span>{p.responsibility}</span>
          </p>
        )}
        {p.profileUrl && <div className="mt-3"><ProfileCue /></div>}
      </div>
    </ProfileShell>
  );
}

/** Coordinating wardens — larger horizontal card. Whole card links to the profile; email is a separate link. */
export function ProminentCard({ p, tint }: { p: Person; tint: string }) {
  const linked = p.interaction === "profile" && p.profileUrl;
  return (
    <div className={`group relative grid overflow-hidden rounded-[1.5rem] ${tint} transition-shadow duration-500 hover:shadow-lift sm:grid-cols-[minmax(0,11rem)_1fr]`}>
      <div className="overflow-hidden">
        <Portrait p={p} className="aspect-[4/5] h-full w-full sm:aspect-auto sm:min-h-[14rem]" width={600} zoom />
      </div>
      <div className="flex flex-col justify-center gap-1 p-5 md:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">{p.role}</p>
        <h3 className="text-[1.4rem] leading-tight md:text-[1.5rem]">
          {linked ? (
            <a href={p.profileUrl!} target="_blank" rel="noopener noreferrer" aria-label={`${p.name}, ${p.role}. ${PROFILE_LABEL}`}
              className="outline-none transition-colors after:absolute after:inset-0 after:rounded-[1.5rem] group-hover:text-crimson focus-visible:after:ring-2 focus-visible:after:ring-crimson">
              {p.name}
            </a>
          ) : p.name}
        </h3>
        {p.email && (
          <a href={`mailto:${p.email}`} className="relative z-10 mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-sm font-medium text-ink transition hover:bg-white">
            <Mail className="h-4 w-4 text-crimson" aria-hidden /> {p.email}
          </a>
        )}
        {linked && <div className="mt-4"><ProfileCue /></div>}
      </div>
    </div>
  );
}

/* ───────────── Flip cards (tap / click / Enter / Space → official email) ───────────── */

export function FlipCard({ p, size, tint = "bg-sky" }: { p: Person; size: "compact" | "mini"; tint?: string }) {
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();
  const toggle = () => setFlipped((f) => !f);
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    if (e.key === "Escape" && flipped) setFlipped(false);
  };

  const face = "absolute inset-0 overflow-hidden rounded-[1.5rem] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]";
  const anim = reduce
    ? { front: { opacity: flipped ? 0 : 1 }, back: { opacity: flipped ? 1 : 0 } }
    : { front: { rotateY: flipped ? 180 : 0 }, back: { rotateY: flipped ? 0 : -180 } };
  const transition = reduce ? { duration: 0.25 } : { duration: 0.6, ease: EASE };
  const height = size === "compact" ? "h-[19.5rem]" : "h-[12rem]";

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${p.name}, ${p.role}. ${flipped ? "Showing contact. Press to flip back." : "Press to show official email."}`}
      onClick={toggle}
      onKeyDown={onKey}
      className={`group relative ${height} cursor-pointer select-none rounded-[1.5rem] outline-none [perspective:1200px] focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-4 focus-visible:ring-offset-cream`}
    >
      {/* Front */}
      <motion.div aria-hidden={flipped} className={`${face} flex flex-col ${size === "compact" ? tint : "border border-line bg-white"} transition-shadow group-hover:shadow-soft`} initial={false} animate={anim.front} transition={transition}>
        {size === "compact" ? (
          <>
            <div className="p-2.5 pb-0"><Portrait p={p} className="h-[12.25rem] w-full shrink-0 overflow-hidden rounded-[1.1rem]" width={500} /></div>
            <div className="flex flex-1 flex-col px-4 pb-3.5 pt-3">
              <p className="font-semibold leading-snug text-ink">{p.name}</p>
              <p className="mt-0.5 line-clamp-2 text-sm text-ink-muted">{p.role}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-semibold text-crimson"><Mail className="h-3.5 w-3.5" aria-hidden /> Tap for email</span>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center">
            <Portrait p={p} className={`h-[5.25rem] w-[5.25rem] shrink-0 rounded-full ring-4 ${RINGS[tint] ?? "ring-sky"} shadow-soft`} width={240} />
            <div>
              <p className="text-sm font-semibold leading-snug text-ink">{p.name}</p>
              <p className="text-xs text-ink-muted">{p.role}</p>
            </div>
            <span className="inline-flex items-center gap-1 text-[0.68rem] font-semibold text-crimson"><Mail className="h-3 w-3" aria-hidden /> Tap for email</span>
          </div>
        )}
      </motion.div>

      {/* Back */}
      <motion.div aria-hidden={!flipped} className={`${face} flex flex-col justify-between bg-ink p-5 text-white`} initial={false} animate={anim.back} transition={transition}
        style={{ pointerEvents: flipped ? "auto" : "none" }}>
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/55">{p.role}</p>
          <p className={`mt-1 font-serif leading-tight ${size === "compact" ? "text-[1.45rem]" : "text-lg"}`}>{p.name}</p>
        </div>
        {p.email ? (
          <div className="space-y-3">
            <p className={`break-all font-medium text-white/90 ${size === "compact" ? "text-[0.95rem]" : "text-[0.8rem]"}`}>{p.email}</p>
            <a
              href={`mailto:${p.email}`}
              tabIndex={flipped ? 0 : -1}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              className={`inline-flex items-center justify-center gap-2 rounded-full bg-white font-semibold text-ink transition hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${size === "compact" ? "w-full px-4 py-2.5 text-sm" : "w-full px-3 py-2 text-xs"}`}
            >
              <Mail className="h-4 w-4" aria-hidden /> Send email
            </a>
          </div>
        ) : (
          <p className="text-sm text-white/70">Contact via the DoSA Office.</p>
        )}
        <span className="inline-flex items-center gap-1 self-end text-[0.68rem] text-white/50"><RotateCcw className="h-3 w-3" aria-hidden /> Tap to flip back</span>
      </motion.div>
    </div>
  );
}

/* ───────────── Dispatcher: layout + interaction both come from data ───────────── */

export function StaffCard({ p, layout, index = 0 }: { p: Person; layout: TierLayout; index?: number }) {
  if (p.interaction === "flip-contact") return <FlipCard p={p} size={layout === "mini" ? "mini" : "compact"} tint={TINTS[index % 4]} />;
  switch (layout) {
    case "feature": return <FeatureCard p={p} />;
    case "portrait": return <PortraitCard p={p} tint={TINTS[(index + 3) % 4]} />;
    case "prominent": return <ProminentCard p={p} tint={TINTS[index % 4]} />;
    default: return <PortraitCard p={p} tint={TINTS[index % 4]} />;
  }
}
