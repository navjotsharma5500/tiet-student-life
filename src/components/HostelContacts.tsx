import Link from "next/link";
import { Building2, Mail, Moon, Phone, Sun, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { hasContacts, type HostelOperationalContact } from "@/data/hostels";

const tel = (n: string) => `tel:${n.replace(/[^\d+]/g, "")}`;

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t border-line pt-4 first:border-t-0 first:pt-0">
      <h3 className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">{title}</h3>
      <ul className="mt-3 space-y-3">{children}</ul>
    </div>
  );
}

function Row({ icon, label, name, phone, email }: { icon: ReactNode; label: string; name?: string; phone?: string; email?: string | null }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream-deep text-ink-soft" aria-hidden>{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-ink-muted">{label}</p>
        {name && <p className="text-sm font-semibold text-ink">{name}</p>}
        {phone && (
          <span className="mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5">
            {phone.split(/\s*[\/,]\s*/).map((n) => (
              <a key={n} href={tel(n)} className="inline-flex items-center gap-1.5 text-sm tabular-nums text-ink-soft hover:text-crimson">
                <Phone className="h-3.5 w-3.5" aria-hidden />{n}
              </a>
            ))}
          </span>
        )}
        {email && (
          <a href={`mailto:${email}`} className="mt-0.5 flex items-center gap-1.5 break-all text-sm text-ink-soft hover:text-crimson">
            <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden />{email}
          </a>
        )}
      </div>
    </li>
  );
}

/** Hostel Management → Caretaker Team → Reception. Rows that aren't published are simply omitted. */
export function HostelContacts({ c }: { c: HostelOperationalContact }) {
  const mgmt = c.warden || c.assistantWarden;
  const care = c.dayCaretakers?.length || c.nightCaretakers?.length || c.caretakerPhones?.length || c.caretakerEmail;

  return (
    <section aria-labelledby="hostel-contacts" className="rounded-[1.25rem] border border-line bg-white p-5 md:p-6">
      <h2 id="hostel-contacts" className="text-[1.35rem]">Hostel contacts</h2>

      {hasContacts(c) ? (
        <div className="mt-5 space-y-5">
          {mgmt && (
            <Group title="Hostel management">
              {c.warden && <Row icon={<UserRound className="h-4 w-4" />} label="Warden" name={c.warden.name} phone={c.warden.phone} email={c.warden.email} />}
              {c.assistantWarden && <Row icon={<UserRound className="h-4 w-4" />} label="Assistant Warden" name={c.assistantWarden.name} phone={c.assistantWarden.phone} email={c.assistantWarden.email} />}
            </Group>
          )}
          {care && (
            <Group title="Caretaker team">
              {c.dayCaretakers?.map((p) => <Row key={`d-${p.name}`} icon={<Sun className="h-4 w-4" />} label="Day Caretaker" name={p.name} phone={p.phone} />)}
              {c.nightCaretakers?.map((p) => <Row key={`n-${p.name}`} icon={<Moon className="h-4 w-4" />} label="Night Caretaker" name={p.name} phone={p.phone} />)}
              {c.caretakerPhones?.length ? <Row icon={<Phone className="h-4 w-4" />} label="Caretaker office numbers" phone={c.caretakerPhones.join(" / ")} /> : null}
              {c.caretakerEmail && <Row icon={<Mail className="h-4 w-4" />} label="Caretaker office email" email={c.caretakerEmail} />}
            </Group>
          )}
          {c.receptionPhone && (
            <Group title="Reception">
              <Row icon={<Building2 className="h-4 w-4" />} label="Reception" phone={c.receptionPhone} />
            </Group>
          )}
        </div>
      ) : (
        <p className="body-copy mt-3">
          Warden and caretaker details for this residence are being added. At reporting, go straight to the hostel’s caretaker office; for allotment queries, contact the Student Affairs Office.
        </p>
      )}

      <div className="mt-5 rounded-2xl bg-ink p-4 text-sm text-white">
        <p className="font-semibold">Allotment or fee questions?</p>
        <p className="mt-1 text-white/70">The Student Affairs Office handles allotment. For room, maintenance and key matters, start with your caretaker.</p>
        <Link href="/dosa" className="mt-2 inline-block font-semibold underline decoration-white/40 underline-offset-4 hover:decoration-white">Student Affairs Office directory</Link>
      </div>
    </section>
  );
}
