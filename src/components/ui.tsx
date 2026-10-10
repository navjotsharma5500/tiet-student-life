import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight, CircleDashed, FileText } from "lucide-react";
import type { ReactNode } from "react";
import type { Step } from "@/data/processes";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-[0.8rem] text-ink-muted">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden />}
            {it.href ? (
              <Link href={it.href} className="hover:text-crimson transition-colors">{it.label}</Link>
            ) : (
              <span aria-current="page" className="text-ink font-medium">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeader({
  eyebrow, title, lede, crumbs, tint = "bg-cream", children,
}: {
  eyebrow?: string; title: string; lede?: ReactNode; crumbs?: { label: string; href?: string }[]; tint?: string; children?: ReactNode;
}) {
  return (
    <header className={`${tint} border-b border-line/70`}>
      <div className="container pt-8 pb-10 md:pt-12 md:pb-14">
        {crumbs && <Breadcrumbs items={crumbs} />}
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="text-balance text-[2.1rem] leading-[1.1] md:text-5xl md:leading-[1.08] max-w-3xl">{title}</h1>
        {lede && <div className="lede mt-4 max-w-2xl">{lede}</div>}
        {children}
      </div>
    </header>
  );
}

export function DynamicTag({ children = "Set by active notice" }: { children?: ReactNode }) {
  return (
    <span className="dynamic-tag" title="Session-specific — confirmed in the active notice / circular">
      <CircleDashed className="h-3 w-3" aria-hidden /> {children}
    </span>
  );
}

export function StepList({ steps, start = 1 }: { steps: Step[]; start?: number }) {
  return (
    <ol className="relative space-y-0">
      {steps.map((s, i) => (
        <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
          {i < steps.length - 1 && <span aria-hidden className="absolute left-[15px] top-8 bottom-0 w-px bg-line" />}
          <span className="relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-white text-xs font-semibold text-ink">
            {i + start}
          </span>
          <div className="pt-1">
            <p className="font-semibold text-ink leading-snug">
              {s.title}
              {s.who && <span className="ml-2 align-middle text-[0.7rem] font-semibold uppercase tracking-wide text-ink-muted">{s.who}</span>}
            </p>
            {s.detail && <p className="body-copy mt-1">{s.detail}</p>}
            {s.dynamic && <div className="mt-2"><DynamicTag /></div>}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function GoverningNote({ children }: { children?: ReactNode }) {
  return (
    <aside className="flex gap-3 rounded-2xl border border-line bg-white/70 p-4 text-sm text-ink-soft">
      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-crimson" aria-hidden />
      <p>
        {children ?? "This page is a plain-language guide. The official notice / circular is the governing record — where they differ, the circular applies."}{" "}
        <Link href="/hostel/circulars" className="link-underline font-semibold text-ink">Circulars & documents</Link>
      </p>
    </aside>
  );
}

export function BackNext({
  back, next,
}: { back?: { href: string; label: string }; next?: { href: string; label: string } }) {
  return (
    <div className="mt-14 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
      {back ? (
        <Link href={back.href} className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden /> {back.label}
        </Link>
      ) : <span />}
      {next && (
        <Link href={next.href} className="group inline-flex items-center justify-between gap-6 rounded-2xl border border-line bg-white px-5 py-4 shadow-soft transition hover:border-crimson/40 hover:shadow-lift sm:min-w-[18rem]">
          <span>
            <span className="block text-[0.7rem] font-semibold uppercase tracking-wider text-ink-muted">Next</span>
            <span className="block font-semibold text-ink">{next.label}</span>
          </span>
          <ArrowRight className="h-5 w-5 text-crimson transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      )}
    </div>
  );
}

export function SectionTitle({ eyebrow, title, lede, id }: { eyebrow?: string; title: string; lede?: ReactNode; id?: string }) {
  return (
    <div className="mb-8 max-w-2xl" id={id}>
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <h2 className="text-[1.75rem] leading-tight md:text-[2.1rem]">{title}</h2>
      {lede && <p className="body-copy mt-3 text-base">{lede}</p>}
    </div>
  );
}

export function ArrowLink({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  const cls = "group inline-flex items-center gap-1.5 text-sm font-semibold text-crimson hover:text-crimson-dark";
  const inner = (<>{children}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden /></>);
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
  ) : (
    <Link href={href} className={cls}>{inner}</Link>
  );
}
