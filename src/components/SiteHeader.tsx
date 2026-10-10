"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EASE } from "./motion";

type NavItem = { label: string; href: string; children?: { label: string; href: string; note?: string }[] };

export const NAV: NavItem[] = [
  { label: "Student Journey", href: "/journey" },
  {
    label: "Hostel & Housing", href: "/hostel",
    children: [
      { label: "Hostel Application Guide", href: "/hostel", note: "Choose your level and year" },
      { label: "Hostel Directory", href: "/hostel/directory", note: "All boys’ and girls’ residences" },
      { label: "Room Types & Fees", href: "/hostel/fees", note: "Current reference fee structure" },
      { label: "Apply for Hostel", href: "/hostel/apply", note: "New TSLAS, PG and PhD admissions" },
      { label: "Resident App", href: "/hostel/resident-app", note: "Dormly Thapar Resident App onboarding" },
      { label: "Living in Residence", href: "/hostel/living", note: "Leave, timings and rules" },
      { label: "Check-out & Refund", href: "/hostel/checkout", note: "No Dues and refund policy" },
      { label: "Circulars & Documents", href: "/hostel/circulars" },
    ],
  },
  { label: "Online Portals", href: "/portals" },
  { label: "Notices", href: "/notices" },
  { label: "Campus Life", href: "/campus-life" },
  { label: "Student Affairs Office", href: "/dosa" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setOpen(false); setMenu(null); }, [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && (setOpen(false), setMenu(null));
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={`sticky top-0 z-50 transition-[background,box-shadow] duration-300 ${scrolled || open ? "bg-cream/95 backdrop-blur shadow-[0_1px_0_#E4DCCD]" : "bg-cream"}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm">Skip to content</a>
      <div className="h-1 bg-crimson" aria-hidden />
      <div className="container flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Link href="/" className="flex items-center gap-3.5" aria-label="TIET Student Life — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Thapar_Logo.png" width={725} height={691} alt="Thapar Institute of Engineering & Technology" className="h-12 w-auto object-contain md:h-14" />
          <span className="hidden border-l border-line pl-4 leading-tight sm:block">
            <span className="block font-serif text-[1.05rem] text-ink">Student Life</span>
            <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">Dean of Student Affairs</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); item.children && setMenu(item.label); }}
                onMouseLeave={() => { closeTimer.current = setTimeout(() => setMenu(null), 120); }}
              >
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    className={`relative rounded-full px-3 py-2 text-[0.88rem] font-semibold transition-colors ${isActive(item.href) ? "text-crimson" : "text-ink hover:text-crimson"}`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded bg-crimson" transition={{ duration: 0.35, ease: EASE }} />
                    )}
                  </Link>
                  {item.children && (
                    <button
                      aria-label={`${item.label} menu`}
                      aria-expanded={menu === item.label}
                      onClick={() => setMenu(menu === item.label ? null : item.label)}
                      className="-ml-2 rounded-full p-1 text-ink-muted hover:text-crimson"
                    >
                      <ChevronDown className={`h-4 w-4 transition-transform ${menu === item.label ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
                <AnimatePresence>
                  {item.children && menu === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.22, ease: EASE }}
                      className="absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-3"
                    >
                      <div className="grid grid-cols-2 gap-1 rounded-2xl border border-line bg-white p-3 shadow-lift">
                        {item.children.map((c) => (
                          <Link key={c.href} href={c.href} className="rounded-xl px-3 py-2.5 transition hover:bg-cream">
                            <span className="block text-sm font-semibold text-ink">{c.label}</span>
                            {c.note && <span className="block text-xs text-ink-muted">{c.note}</span>}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/hostel/apply" className="btn-primary hidden md:inline-flex !py-2">Apply for Hostel</Link>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 4.25rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-y-auto border-t border-line bg-cream lg:hidden"
          >
            <ul className="container divide-y divide-line py-2">
              {NAV.map((item, i) => (
                <motion.li key={item.href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i + 0.08, ease: EASE }}>
                  <Link href={item.href} className={`flex items-center justify-between py-4 font-serif text-[1.35rem] ${isActive(item.href) ? "text-crimson" : "text-ink"}`}>
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="-mt-1 mb-3 grid grid-cols-1 gap-0.5 pl-1">
                      {item.children.slice(1).map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className="block rounded-lg px-2 py-1.5 text-[0.92rem] text-ink-soft hover:bg-white">{c.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </ul>
            <div className="container pb-10">
              <Link href="/hostel/apply" className="btn-primary w-full justify-center">Apply for Hostel</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
