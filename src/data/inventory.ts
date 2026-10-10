import type { RoomTypeCode } from "./roomTypes";

/**
 * HOSTEL STUDENT-ROOM INVENTORY — structural master.
 *
 * Source: operational workbook `residences (2).xlsx` (one worksheet per hostel).
 * This OVERRIDES older capacities published on thapar.edu.
 *
 * Parsing rules (implemented in scripts/import-residences.py):
 *   include a row only when  Room Type is non-empty  AND  Capacity > 0  AND  Residence Active = 1
 *   exclude non-student spaces (guest room, warden/caretaker office, reception, mess, gym,
 *   laundry, common/water-cooler area, project/electrical rooms, visitor/waiting areas)
 *   e.g. Agira Hall "Guest Room 1" and "Guest Room 2" are excluded.
 *
 * Vacant/Occupied columns are NOT used — this is not a live availability feed.
 *
 * This is PHYSICAL inventory only. What a cohort may be allotted is defined
 * separately in cohorts.ts (`allocation`) and must never be derived from this file.
 *
 * Keyed by hostel code (see hostels.ts). Future table: hostel_room_inventory.
 */
export type HostelInventoryRow = {
  roomType: RoomTypeCode;
  /** Physical student rooms of this type. */
  roomCount: number;
  /** Student beds of this type (rooms × seater). */
  bedCount: number;
};

const r = (roomType: RoomTypeCode, roomCount: number, bedCount: number): HostelInventoryRow => ({ roomType, roomCount, bedCount });

export const HOSTEL_INVENTORY: Record<string, HostelInventoryRow[]> = {
  A: [r("2S_WST_AC", 464, 928)],
  B: [r("1S_AC", 97, 97), r("2S_AC", 313, 626)],
  C: [r("2S_AC", 174, 348), r("3S_AC", 13, 39)],
  D: [r("2S_WST_AC", 464, 928)],
  H: [r("2S_AC", 15, 30), r("2S_NAC", 5, 10), r("4S_AC", 147, 588), r("4S_NAC", 13, 52)],
  J: [r("1S_AC", 480, 480), r("1S_NAC", 456, 456), r("2S_AC", 78, 156)],
  K: [r("2S_AC", 243, 486), r("2S_NAC", 57, 114)],
  L: [r("2S_AC", 150, 300)],
  M: [r("1S_WAT_AC", 132, 132), r("1S_WST_AC", 376, 376), r("2S_WAT_AC", 99, 198), r("2S_WST_AC", 656, 1312)],
  O: [r("2S_WST_AC", 464, 928)],
  "FRF/G": [r("1S_NAC", 64, 64), r("3S_NAC", 160, 480)],
  E: [r("1S_AC", 48, 48), r("2S_AC", 4, 8), r("3S_AC", 38, 114), r("4S_AC", 16, 64)],
  G: [r("1S_AC", 48, 48), r("3S_AC", 38, 114), r("4S_AC", 18, 72)],
  I: [r("1S_AC", 61, 61), r("1S_NAC", 117, 117), r("2S_AC", 10, 20), r("3S_AC", 66, 198), r("4S_AC", 1, 4), r("4S_NAC", 10, 40)],
  N: [r("1S_WAT_AC", 97, 97), r("1S_WST_AC", 162, 162), r("2S_WST_AC", 120, 240)],
  PG: [r("2S_WST_AC", 464, 928)],
  Q: [r("2S_WST_AC", 463, 926)],
  "PG-II": [r("2S_WST_AC", 464, 928)],
};

/** Expected totals per hostel (rooms / beds) — used by scripts/validate-inventory.mjs. */
export const INVENTORY_EXPECTED_TOTALS: Record<string, { rooms: number; beds: number }> = {
  A: { rooms: 464, beds: 928 }, B: { rooms: 410, beds: 723 }, C: { rooms: 187, beds: 387 }, D: { rooms: 464, beds: 928 },
  H: { rooms: 180, beds: 680 }, J: { rooms: 1014, beds: 1092 }, K: { rooms: 300, beds: 600 }, L: { rooms: 150, beds: 300 },
  M: { rooms: 1227, beds: 1959 }, O: { rooms: 464, beds: 928 }, "FRF/G": { rooms: 224, beds: 544 },
  E: { rooms: 106, beds: 234 }, G: { rooms: 104, beds: 234 }, I: { rooms: 265, beds: 440 }, N: { rooms: 370, beds: 485 },
  PG: { rooms: 89, beds: 178 }, Q: { rooms: 463, beds: 926 }, "PG-II": { rooms: 116, beds: 232 },
};
