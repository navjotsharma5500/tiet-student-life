import Link from "next/link";
import type { Cohort } from "@/data/cohorts";
import { legacyCode, totalBeds, totalRooms, type Hostel } from "@/data/hostels";
import { ROOM_TYPES, inr, type RoomTypeCode } from "@/data/roomTypes";
import { Gallery } from "./Gallery";
import { NoPhoto } from "./HostelBrowser";
import { HostelContacts } from "./HostelContacts";
import { BackNext, DynamicTag, PageHeader } from "./ui";
import { Reveal } from "./motion";
import { RememberCohort } from "./CohortContext";

export function HostelDetail({ h, cohort }: { h: Hostel; cohort?: Cohort }) {
  const legacy = legacyCode(h);
  // Physical inventory (all active student rooms) vs. cohort eligibility (subset from cohorts.ts).
  const allowed = new Set<RoomTypeCode>(cohort ? cohort.allocation[h.gender].find((a) => a.hostel === h.code)?.rooms ?? [] : h.inventory.map((r) => r.roomType));
  const listHref = cohort ? `/hostel/${cohort.id}/hostels` : "/hostel/directory";
  const rooms = totalRooms(h);
  const beds = totalBeds(h);

  const crumbs = cohort
    ? [{ label: "Hostel & Housing", href: "/hostel" }, { label: cohort.title, href: `/hostel/${cohort.id}` }, { label: "Hostel Options", href: listHref }, { label: h.name }]
    : [{ label: "Hostel & Housing", href: "/hostel" }, { label: "Hostel Directory", href: listHref }, { label: h.name }];

  return (
    <>
      {cohort && <RememberCohort id={cohort.id} />}
      <PageHeader
        crumbs={crumbs}
        eyebrow={`${h.gender === "boys" ? "Boys’" : "Girls’"} residence${legacy ? ` · formerly ${legacy}` : ""}`}
        title={h.name}
        tint={h.gender === "boys" ? "bg-sky/60" : "bg-blush/60"}
      >
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="chip">{rooms.toLocaleString("en-IN")} student rooms</span>
          <span className="chip">{beds.toLocaleString("en-IN")} beds</span>
          <span className="chip">{h.inventory.length} room type{h.inventory.length > 1 ? "s" : ""}</span>
          {cohort && <span className="chip !border-crimson/30 !bg-crimson-soft !text-crimson-dark">{allowed.size} open to your cohort</span>}
        </div>
      </PageHeader>

      <div className="container py-10 md:py-14">
        {h.images.length ? <Gallery images={h.images} title={h.name} /> : <div className="overflow-hidden rounded-[1.25rem]"><NoPhoto className="!aspect-[21/9] md:!min-h-[18rem]" /></div>}

        {/* Mobile order: About → Contacts → Rooms. Desktop: contacts in a sticky side column. */}
        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-14">
          <Reveal as="section" className="lg:col-start-1 lg:row-start-1">
            <h2 className="text-[1.6rem]">About this residence</h2>
            <p className="body-copy mt-3 max-w-prose text-base">{h.overview}</p>
            {h.facilities.length > 0 && (
              <div className="mt-6">
                <h3 className="font-sans text-sm font-semibold text-ink">Facilities</h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {h.facilities.map((f) => <li key={f} className="chip">{f}</li>)}
                </ul>
              </div>
            )}
          </Reveal>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="lg:sticky lg:top-28">
              <HostelContacts c={h.operationalContacts} />
            </div>
          </div>

          <Reveal as="section" className="lg:col-start-1 lg:row-start-2">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-[1.6rem]">Room types & capacity</h2>
              <Link href={cohort ? `/hostel/${cohort.id}/fees` : "/hostel/fees"} className="link-underline text-sm font-semibold">Detailed fee structure</Link>
            </div>
            <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-white">
              <table className="w-full text-sm">
                <caption className="sr-only">Room types in {h.name}: physical student rooms, beds and current reference room fee</caption>
                <thead className="bg-cream/70 text-left text-[0.72rem] uppercase tracking-wider text-ink-muted">
                  <tr>
                    <th className="px-4 py-3 font-semibold" scope="col">Room type</th>
                    <th className="px-3 py-3 text-right font-semibold" scope="col">Rooms</th>
                    <th className="px-3 py-3 text-right font-semibold" scope="col">Beds</th>
                    <th className="hidden px-4 py-3 text-right font-semibold sm:table-cell" scope="col">Reference fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {h.inventory.map((r) => {
                    const on = allowed.has(r.roomType);
                    const rt = ROOM_TYPES[r.roomType];
                    return (
                      <tr key={r.roomType} className={on ? "" : "text-ink-muted"}>
                        <td className="px-4 py-3.5">
                          <span className={on ? "font-semibold text-ink" : ""}>{rt.label}</span>
                          {!on && cohort && <span className="mt-0.5 block text-xs">Not offered to your cohort</span>}
                          <span className="mt-0.5 block text-xs text-ink-muted sm:hidden">{inr(rt.referenceFee)} reference fee</span>
                        </td>
                        <td className="px-3 py-3.5 text-right tabular-nums">{r.roomCount.toLocaleString("en-IN")}</td>
                        <td className="px-3 py-3.5 text-right tabular-nums">{r.bedCount.toLocaleString("en-IN")}</td>
                        <td className="hidden px-4 py-3.5 text-right tabular-nums sm:table-cell">{inr(rt.referenceFee)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="border-t border-line bg-cream/50 font-semibold text-ink">
                  <tr>
                    <th scope="row" className="px-4 py-3 text-left">Total</th>
                    <td className="px-3 py-3 text-right tabular-nums">{rooms.toLocaleString("en-IN")}</td>
                    <td className="px-3 py-3 text-right tabular-nums">{beds.toLocaleString("en-IN")}</td>
                    <td className="hidden sm:table-cell" />
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-ink-muted">
              <DynamicTag>Fees per active fee notice</DynamicTag>
              <span>Room counts are the hostel’s structural inventory, not live availability.</span>
            </div>
          </Reveal>
        </div>

        <BackNext
          back={{ href: listHref, label: cohort ? "Back to your hostel options" : "Back to the hostel directory" }}
          next={cohort ? { href: `/hostel/${cohort.id}/fees`, label: "Room types & pricing" } : { href: "/hostel", label: "Find your cohort guide" }}
        />
      </div>
    </>
  );
}
