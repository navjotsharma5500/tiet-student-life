import Link from "next/link";
import type { Cohort } from "@/data/cohorts";
import { HOSTELS, hostelByCode, type Gender } from "@/data/hostels";
import { FEE_NOTICE, ROOM_TYPES, ROOM_TYPE_ORDER, WASHROOM_LABEL, inr, type RoomTypeCode } from "@/data/roomTypes";
import { DynamicTag, GoverningNote } from "./ui";
import { Reveal } from "./motion";

/** Where each room type is available — for a cohort, or across all hostels. */
function availability(code: RoomTypeCode, cohort?: Cohort) {
  const out: Record<Gender, { name: string; slug: string }[]> = { boys: [], girls: [] };
  if (cohort) {
    (["boys", "girls"] as Gender[]).forEach((g) =>
      cohort.allocation[g].forEach((a) => {
        if (a.rooms.includes(code)) {
          const h = hostelByCode(a.hostel)!;
          out[g].push({ name: h.name, slug: h.slug });
        }
      }),
    );
  } else {
    HOSTELS.forEach((h) => { if (h.capacity[code]) out[h.gender].push({ name: h.name, slug: h.slug }); });
  }
  return out;
}

export function FeeStructure({ cohort }: { cohort?: Cohort }) {
  const codes = ROOM_TYPE_ORDER.filter((c) =>
    cohort ? [...cohort.allocation.boys, ...cohort.allocation.girls].some((a) => a.rooms.includes(c)) : true,
  );
  const hostelHref = (slug: string) => (cohort ? `/hostel/${cohort.id}/hostels/${slug}` : `/hostel/directory/${slug}`);
  const seaters = [1, 2, 3, 4] as const;

  return (
    <div className="space-y-12">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-soft md:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">How fees work</p>
          <p className="body-copy mt-2">
            Your hostel charge has two parts: the <strong className="text-ink">room fee</strong>, which depends on the room type you are allotted, and the{" "}
            <strong className="text-ink">mess fee</strong>, which is common and set in the fee notice. {cohort?.process === "admission-cell"
              ? "For your cohort, payment is made at the allocation venue."
              : "Both are paid online in the Resident App after allotment."}
          </p>
        </div>
        <div className="rounded-2xl bg-butter p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6B5410]">Mess fee</p>
          <p className="mt-2 font-serif text-2xl text-ink">As per active fee notice</p>
          <div className="mt-3"><DynamicTag>Session-specific</DynamicTag></div>
        </div>
      </div>

      {seaters.map((s) => {
        const list = codes.filter((c) => ROOM_TYPES[c].seater === s);
        if (!list.length) return null;
        return (
          <Reveal as="section" key={s}>
            <h2 className="text-[1.5rem]">{s}-Seater rooms</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {list.map((code) => {
                const r = ROOM_TYPES[code];
                const av = availability(code, cohort);
                return (
                  <article key={code} className="flex flex-col rounded-[1.25rem] border border-line bg-white p-5 transition hover:shadow-soft">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-ink">{r.seater}-Seater {r.ac ? "AC" : "Non-AC"}</p>
                        <p className="text-sm text-ink-soft">{WASHROOM_LABEL[r.washroom]}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-serif text-2xl tabular-nums text-ink">{inr(r.referenceFee)}</p>
                        <p className="text-[0.7rem] uppercase tracking-wider text-ink-muted">room fee · reference</p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
                      {(["boys", "girls"] as Gender[]).map((g) => av[g].length > 0 && (
                        <p key={g} className="text-ink-soft">
                          <span className="mr-1 font-semibold capitalize text-ink">{g}:</span>
                          {av[g].map((h, i) => (
                            <span key={h.slug}>{i > 0 && ", "}<Link href={hostelHref(h.slug)} className="link-underline">{h.name}</Link></span>
                          ))}
                        </p>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </Reveal>
        );
      })}

      <GoverningNote>{FEE_NOTICE.note}</GoverningNote>
    </div>
  );
}
