import Link from "next/link";
import { Logo } from "./Logo";

const cols = [
  { title: "Hostel & Housing", links: [
    ["Application Guide", "/hostel"], ["Hostel Directory", "/hostel/directory"], ["Room Types & Fees", "/hostel/fees"],
    ["Apply for Hostel", "/hostel/apply"], ["Refund Policy", "/hostel/refund"],
  ] },
  { title: "Residence", links: [
    ["Resident App", "/hostel/resident-app"], ["Living in Residence", "/hostel/living"], ["Check-out & No Dues", "/hostel/checkout"], ["Circulars", "/hostel/circulars"],
  ] },
  { title: "Student Affairs", links: [
    ["Student Journey", "/journey"], ["Online Portals", "/portals"], ["Notices", "/notices"], ["Campus Life", "/campus-life"], ["Student Affairs Office", "/dosa"],
  ] },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-ink text-white/80">
      <div className="container grid gap-12 py-14 md:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div>
          <div className="inline-flex rounded-xl bg-white px-3 py-2">
            <Logo width={320} className="h-9 w-auto" lazy />
          </div>
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/70">
            Office of the Dean of Student Affairs, Thapar Institute of Engineering &amp; Technology, Patiala.
          </p>
          <p className="mt-4 max-w-xs text-xs leading-5 text-white/50">
            Guidance on this site is in plain language. Official notices and circulars remain the governing record.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-white/50">{c.title}</h2>
            <ul className="space-y-2.5 text-sm">
              {c.links.map(([l, h]) => (
                <li key={h}><Link href={h} className="transition-colors hover:text-white">{l}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-2 py-5 text-xs text-white/50 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Thapar Institute of Engineering &amp; Technology</span>
          <span>Student Life</span>
        </div>
      </div>
    </footer>
  );
}
