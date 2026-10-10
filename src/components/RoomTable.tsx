import { ROOM_TYPES, ROOM_TYPE_ORDER, WASHROOM_NOTE, inr, type RoomTypeCode } from "@/data/roomTypes";
import type { Gender } from "@/data/hostels";
import { Snowflake, Fan } from "lucide-react";

export function RoomTable({
  rows, showGender = true, compact = false,
}: { rows: { code: RoomTypeCode; genders?: Gender[] }[]; showGender?: boolean; compact?: boolean }) {
  const sorted = [...rows].sort((a, b) => ROOM_TYPE_ORDER.indexOf(a.code) - ROOM_TYPE_ORDER.indexOf(b.code));
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Room types and current reference annual room fee</caption>
        <thead className="bg-cream/70 text-[0.72rem] uppercase tracking-wider text-ink-muted">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">Room type</th>
            {showGender && <th scope="col" className="hidden px-4 py-3 font-semibold sm:table-cell">For</th>}
            <th scope="col" className="px-4 py-3 text-right font-semibold">Reference fee</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {sorted.map(({ code, genders }) => {
            const r = ROOM_TYPES[code];
            return (
              <tr key={code} className="align-top">
                <td className="px-4 py-3.5">
                  <div className="flex items-start gap-2.5">
                    <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${r.ac ? "bg-sky" : "bg-butter"}`} aria-hidden>
                      {r.ac ? <Snowflake className="h-3.5 w-3.5 text-ink" /> : <Fan className="h-3.5 w-3.5 text-ink" />}
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{r.seater}-Seater {r.ac ? "AC" : "Non-AC"}</p>
                      <p className="text-ink-soft">{r.label.split(" — ")[1]}</p>
                      {!compact && <p className="mt-0.5 text-xs text-ink-muted">{WASHROOM_NOTE[r.washroom]}</p>}
                      {showGender && genders && <p className="mt-1 text-xs capitalize text-ink-muted sm:hidden">{genders.join(" & ")}</p>}
                    </div>
                  </div>
                </td>
                {showGender && (
                  <td className="hidden px-4 py-3.5 capitalize text-ink-soft sm:table-cell">{genders?.join(" & ") ?? "—"}</td>
                )}
                <td className="whitespace-nowrap px-4 py-3.5 text-right font-semibold tabular-nums text-ink">{inr(r.referenceFee)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
