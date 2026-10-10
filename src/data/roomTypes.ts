/**
 * Room Type Master.
 * `code` is INTERNAL ONLY (admin/data). It must never be rendered to students —
 * always render `label` (or `seater` + `ac` + `washroom`).
 * Fees are CURRENT REFERENCE values. In production they come from the active
 * academic-year fee notice (fee_structure_versions table).
 */
export type RoomTypeCode =
  | "2S_AC" | "2S_NAC" | "3S_AC" | "3S_NAC" | "4S_AC" | "4S_NAC"
  | "2S_WST_AC" | "2S_WAT_AC" | "1S_AC" | "1S_NAC" | "1S_WST_AC" | "1S_WAT_AC";

export type Washroom = "common" | "shared" | "attached";

export type RoomType = {
  code: RoomTypeCode;
  seater: 1 | 2 | 3 | 4;
  ac: boolean;
  washroom: Washroom;
  label: string;
  referenceFee: number;
};

export const WASHROOM_LABEL: Record<Washroom, string> = {
  common: "Common Washroom",
  shared: "Shared Washroom & Toilet between Two Rooms",
  attached: "Attached Washroom & Toilet",
};

export const WASHROOM_NOTE: Record<Washroom, string> = {
  common: "Washrooms are on the floor and used by residents of several rooms.",
  shared: "One washroom & toilet is shared by the residents of two adjoining rooms.",
  attached: "The room has its own washroom & toilet.",
};

function rt(code: RoomTypeCode, seater: RoomType["seater"], ac: boolean, washroom: Washroom, referenceFee: number): RoomType {
  return {
    code,
    seater,
    ac,
    washroom,
    referenceFee,
    label: `${seater}-Seater ${ac ? "AC" : "Non-AC"} — ${WASHROOM_LABEL[washroom]}`,
  };
}

export const ROOM_TYPES: Record<RoomTypeCode, RoomType> = {
  "1S_NAC": rt("1S_NAC", 1, false, "common", 51000),
  "1S_AC": rt("1S_AC", 1, true, "common", 60000),
  "1S_WST_AC": rt("1S_WST_AC", 1, true, "shared", 68500),
  "1S_WAT_AC": rt("1S_WAT_AC", 1, true, "attached", 78500),
  "2S_NAC": rt("2S_NAC", 2, false, "common", 45500),
  "2S_AC": rt("2S_AC", 2, true, "common", 57000),
  "2S_WST_AC": rt("2S_WST_AC", 2, true, "shared", 61500),
  "2S_WAT_AC": rt("2S_WAT_AC", 2, true, "attached", 65000),
  "3S_NAC": rt("3S_NAC", 3, false, "common", 39500),
  "3S_AC": rt("3S_AC", 3, true, "common", 50500),
  "4S_NAC": rt("4S_NAC", 4, false, "common", 34600),
  "4S_AC": rt("4S_AC", 4, true, "common", 45600),
};

export const ROOM_TYPE_ORDER: RoomTypeCode[] = [
  "1S_WAT_AC", "1S_WST_AC", "1S_AC", "1S_NAC",
  "2S_WAT_AC", "2S_WST_AC", "2S_AC", "2S_NAC",
  "3S_AC", "3S_NAC", "4S_AC", "4S_NAC",
];

export const FEE_NOTICE = {
  session: "Current reference",
  messFee: null as number | null, // dynamic — published in the active fee notice
  note: "Room fees shown are current reference figures. The active academic-year fee notice is the governing record for hostel and mess fees.",
};

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export function shortRoomLabel(r: RoomType) {
  return `${r.seater}-Seater ${r.ac ? "AC" : "Non-AC"}`;
}
