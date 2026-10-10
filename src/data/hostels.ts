import { ROOM_TYPES, ROOM_TYPE_ORDER, type RoomTypeCode } from "./roomTypes";
import { HOSTEL_INVENTORY, type HostelInventoryRow } from "./inventory";
import { HOSTEL_PROFILES } from "./hostelProfiles";
import type { Media } from "@/lib/media";

/**
 * Hostel Directory Master (shared by every cohort).
 *
 * Three independent concerns, so each can move to its own CMS table:
 *   1. directory data  — name, legacy code, gender, overview, facilities, media   (this file)
 *   2. physical inventory — rooms & beds per room type                            (inventory.ts, from the Excel workbook)
 *   3. cohort eligibility — which hostel + room types a cohort may be allotted   (cohorts.ts)
 * Never derive (3) from (2).
 *
 * Operational contacts are copied into local typed data from the hostel pages so
 * students never need to leave the portal. A field that is not published is left
 * undefined and simply not rendered.
 */
export type Gender = "boys" | "girls";

export type PersonContact = { name: string; email?: string; phone?: string };

export type HostelOperationalContact = {
  warden?: PersonContact | null;
  assistantWarden?: PersonContact | null;
  dayCaretakers?: Array<{ name: string; phone?: string }>;
  nightCaretakers?: Array<{ name: string; phone?: string }>;
  /** Caretaker-office numbers published for the team rather than one person. */
  caretakerPhones?: string[];
  caretakerEmail?: string | null;
  receptionPhone?: string | null;
};

export type HostelSourceMeta = {
  /** Maintainer reference only — never rendered publicly. */
  contactSource?: string;
  descriptionSource?: string;
  inventorySource?: string;
};

type HostelRecord = {
  slug: string;
  code: string; // legacy letter code — shown as "formerly Hostel X"
  name: string;
  gender: Gender;
  /** Optional hand-written overview. When absent, a factual overview is generated from inventory. */
  overview?: string;
  /** Facilities that are documented (photo set / published page). Never invented. */
  facilities: string[];
  images: Media[];
  operationalContacts: HostelOperationalContact;
  sourceMeta?: HostelSourceMeta;
};

export type Hostel = HostelRecord & {
  overview: string;
  inventory: HostelInventoryRow[];
  /** Derived: beds per room type (kept for convenience in list views). */
  capacity: Partial<Record<RoomTypeCode, number>>;
};

const SOURCE_BOYS = "https://www.thapar.edu/students/pages/boys-hostel";
const SOURCE_GIRLS = "https://www.thapar.edu/students/pages/girls-hostel";
const INVENTORY_SOURCE = "residences (2).xlsx — active student rooms only";

/** Default (empty) contacts + source metadata. Real values are merged from hostelProfiles.ts. */
const contactsPending = (gender: Gender): Pick<HostelRecord, "operationalContacts" | "sourceMeta"> => ({
  operationalContacts: {},
  sourceMeta: {
    contactSource: gender === "boys" ? SOURCE_BOYS : SOURCE_GIRLS,
    descriptionSource: gender === "boys" ? SOURCE_BOYS : SOURCE_GIRLS,
    inventorySource: INVENTORY_SOURCE,
  },
});

const H = "https://ik.imagekit.io/itmh/Guest%20Room%20Website/Pictures/Hostels";

function img(path: string, alt: string, caption?: string): Media {
  return { url: `${H}/${path}`, alt, caption };
}

const RECORDS: HostelRecord[] = [
  // ───────── Boys ─────────
  {
    slug: "agira-hall", code: "A", name: "Agira Hall", gender: "boys",
    images: [
      img("Agira%20Hall%20(A)/outerview-a.jpg?updatedAt=1790455969623", "Agira Hall exterior", "Exterior"),
      img("Agira%20Hall%20(A)/roomview-a.jpg?updatedAt=1790455973579", "A room in Agira Hall", "Room"),
      img("Agira%20Hall%20(A)/reception-a.jpg?updatedAt=1790455975221", "Agira Hall reception", "Reception"),
      img("Agira%20Hall%20(A)/mess-a.jpg?updatedAt=1790455973936", "Agira Hall mess", "Mess"),
      img("Agira%20Hall%20(A)/gym-a.jpg?updatedAt=1790455973197", "Agira Hall gym", "Gym"),
    ],
    facilities: ["Reception", "Mess", "Gym"],
    ...contactsPending("boys"),
  },
  {
    slug: "amritam-hall", code: "B", name: "Amritam Hall", gender: "boys",
    images: [
      img("Amritam%20Hall%20(B)/hostelb1.jpg?updatedAt=1790455961651", "Amritam Hall"),
      img("Amritam%20Hall%20(B)/hostelb3.jpg?updatedAt=1790455964978", "Amritam Hall"),
      img("Amritam%20Hall%20(B)/hostelb4.jpg?updatedAt=1790455968167", "Amritam Hall"),
    ],
    facilities: [],
    ...contactsPending("boys"),
  },
  {
    slug: "prithvi-hall", code: "C", name: "Prithvi Hall", gender: "boys",
    images: [
      img("Prithvi%20Hall%20(C)/Prithvi%20Hall%20(C).jpg?updatedAt=1790455965562", "Prithvi Hall"),
      img("Prithvi%20Hall%20(C)/chostel2.jpg?updatedAt=1790455965484", "Prithvi Hall"),
      img("Prithvi%20Hall%20(C)/chostel4.jpg?updatedAt=1790455969288", "Prithvi Hall"),
      img("Prithvi%20Hall%20(C)/chostel8.jpg?updatedAt=1790455965332", "Prithvi Hall"),
    ],
    facilities: [],
    ...contactsPending("boys"),
  },
  {
    slug: "neeram-hall", code: "D", name: "Neeram Hall", gender: "boys",
    images: [
      img("Neeram%20Hall%20(D)/1OUTERVIEWD.jpg?updatedAt=1790455978004", "Neeram Hall exterior", "Exterior"),
      img("Neeram%20Hall%20(D)/2INSIDED.jpg?updatedAt=1790455975684", "Inside Neeram Hall", "Interior"),
      img("Neeram%20Hall%20(D)/4ROOMD.jpg?updatedAt=1790455970091", "A room in Neeram Hall", "Room"),
      img("Neeram%20Hall%20(D)/3MESSD.jpg?updatedAt=1790455972078", "Neeram Hall mess", "Mess"),
    ],
    facilities: ["Mess"],
    ...contactsPending("boys"),
  },
  {
    slug: "vyan-hall", code: "H", name: "Vyan Hall", gender: "boys",
    images: [
      img("Vyan%20Hall%20(H)/hostelH_1.png?updatedAt=1790455962160", "Vyan Hall"),
      img("Vyan%20Hall%20(H)/hostelH_2.png?updatedAt=1790455962720", "Vyan Hall"),
      img("Vyan%20Hall%20(H)/hostelH_3.png?updatedAt=1790455962441", "Vyan Hall"),
    ],
    facilities: [],
    ...contactsPending("boys"),
  },
  {
    slug: "tejas-hall", code: "J", name: "Tejas Hall", gender: "boys",
    images: [
      img("Tejas%20Hall%20(J)/hostelJ_1.png?updatedAt=1790455962819", "Tejas Hall"),
      img("Tejas%20Hall%20(J)/hostelJ_2.png?updatedAt=1790455962113", "Tejas Hall"),
      img("Tejas%20Hall%20(J)/hostelJ_3.png?updatedAt=1790455962339", "Tejas Hall"),
      img("Tejas%20Hall%20(J)/hostelJ_4.png?updatedAt=1790455962919", "Tejas Hall"),
    ],
    facilities: [],
    ...contactsPending("boys"),
  },
  {
    slug: "ambaram-hall", code: "K", name: "Ambaram Hall", gender: "boys",
    images: [
      img("Ambaram%20Hall%20(K)/front_hostel_k(1).jpg?updatedAt=1790455963917", "Ambaram Hall front view", "Front view"),
      img("Ambaram%20Hall%20(K)/Hostelk1.jpeg?updatedAt=1790456016669", "Ambaram Hall"),
      img("Ambaram%20Hall%20(K)/outer_k(1).jpg?updatedAt=1790455964887", "Ambaram Hall exterior", "Exterior"),
    ],
    facilities: [],
    ...contactsPending("boys"),
  },
  {
    slug: "viyat-hall", code: "L", name: "Viyat Hall", gender: "boys",
    images: [
      img("Viyat%20Hall%20(L)/1outerviewl.jpg?updatedAt=1790456018562", "Viyat Hall exterior", "Exterior"),
      img("Viyat%20Hall%20(L)/4bedrooml.jpg?updatedAt=1790456018164", "A bedroom in Viyat Hall", "Bedroom"),
      img("Viyat%20Hall%20(L)/3receptionl.jpg?updatedAt=1790456018156", "Viyat Hall reception", "Reception"),
      img("Viyat%20Hall%20(L)/6messl.jpg?updatedAt=1790456016610", "Viyat Hall mess", "Mess"),
    ],
    facilities: ["Reception", "Mess"],
    ...contactsPending("boys"),
  },
  {
    slug: "anantam-hall", code: "M", name: "Anantam Hall", gender: "boys",
    images: [
      img("Anantam%20Hall%20(M)/hostelm.jpg?updatedAt=1790455961684", "Anantam Hall"),
      img("Anantam%20Hall%20(M)/hostelm_mess.jpg?updatedAt=1790455961171", "Anantam Hall mess", "Mess"),
      img("Anantam%20Hall%20(M)/hostelm_gym.jpg?updatedAt=1790455961384", "Anantam Hall gym", "Gym"),
    ],
    facilities: ["Mess", "Gym"],
    ...contactsPending("boys"),
  },
  {
    slug: "vyom-hall", code: "O", name: "Vyom Hall", gender: "boys",
    images: [
      img("Vyom%20Hall%20(O)/hostelO_1.png?updatedAt=1790455993187", "Vyom Hall"),
      img("Vyom%20Hall%20(O)/hostelO_3.png?updatedAt=1790455994904", "Vyom Hall"),
      img("Vyom%20Hall%20(O)/hostelO_4.png?updatedAt=1790455994316", "Vyom Hall"),
    ],
    facilities: [],
    ...contactsPending("boys"),
  },
  {
    slug: "hostel-frfg", code: "FRF/G", name: "Hostel FRF/G", gender: "boys",
    images: [
      img("Hoste%20FRFG/frontfrfg.jpeg?updatedAt=1790455969133", "Hostel FRF/G front view", "Front view"),
      img("Hoste%20FRFG/roomfrfg.jpeg?updatedAt=1790455964955", "A room in Hostel FRF/G", "Room"),
      img("Hoste%20FRFG/studyroomfrfg.jpeg?updatedAt=1790455965953", "Study room in Hostel FRF/G", "Study room"),
    ],
    facilities: ["Study room"],
    ...contactsPending("boys"),
  },

  // ───────── Girls ─────────
  {
    slug: "ira-hall", code: "I", name: "Ira Hall", gender: "girls",
    images: [
      img("Ira%20Hall%20(I)/Front%20viewI.jpg?updatedAt=1790455962233", "Ira Hall front view", "Front view"),
      img("Ira%20Hall%20(I)/inner%20viewI.jpg?updatedAt=1790455962136", "Inside Ira Hall", "Interior"),
      img("Ira%20Hall%20(I)/guest%20roomI.jpg?updatedAt=1790455961895", "Ira Hall guest room", "Guest room"),
      img("Ira%20Hall%20(I)/gymI.jpg?updatedAt=1790455962133", "Ira Hall gym", "Gym"),
    ],
    facilities: ["Guest room", "Gym"],
    ...contactsPending("girls"),
  },
  {
    slug: "ananta-hall", code: "N", name: "Ananta Hall", gender: "girls",
    images: [
      img("Ananta%20Hall%20(N)/1.jpg?updatedAt=1790455961489", "Ananta Hall"),
      img("Ananta%20Hall%20(N)/3(1).jpg?updatedAt=1790455961232", "Ananta Hall"),
      img("Ananta%20Hall%20(N)/Mess%20Area-min.jpg?updatedAt=1790455971887", "Ananta Hall mess area", "Mess area"),
      img("Ananta%20Hall%20(N)/Sitting%20Area%20in%20Mess-min.jpg?updatedAt=1790455969271", "Sitting area in the Ananta Hall mess", "Mess sitting area"),
    ],
    facilities: ["Mess"],
    ...contactsPending("girls"),
  },
  {
    slug: "dhriti-hall", code: "PG", name: "Dhriti Hall", gender: "girls",
    images: [
      img("Dhriti%20Hall%20(PG)/HostelPG1.jpeg?updatedAt=1790455961619", "Dhriti Hall"),
      img("Dhriti%20Hall%20(PG)/HostelPG1_3.jpeg?updatedAt=1790455962506", "Dhriti Hall"),
      img("Dhriti%20Hall%20(PG)/HostelPG1_4.jpeg?updatedAt=1790455965126", "Dhriti Hall"),
      img("Dhriti%20Hall%20(PG)/HostelPG1_6.jpeg?updatedAt=1790455963926", "Dhriti Hall"),
    ],
    facilities: [],
    ...contactsPending("girls"),
  },
  {
    slug: "pavani-hall", code: "PG-II", name: "Pavani Hall", gender: "girls",
    images: [], // photographs pending — a designed placeholder is shown; no other hostel's photo is substituted
    facilities: [],
    ...contactsPending("girls"),
  },
  {
    slug: "vahni-hall", code: "Q", name: "Vahni Hall", gender: "girls",
    images: [
      img("Vahni%20Hall%20(Q)/1OUTERVIEWQ.jpg?updatedAt=1790456018384", "Vahni Hall exterior", "Exterior"),
      img("Vahni%20Hall%20(Q)/2INNERVIEWQ.jpg?updatedAt=1790456018237", "Inside Vahni Hall", "Interior"),
      img("Vahni%20Hall%20(Q)/4BEDROOMQ.jpg?updatedAt=1790456017572", "A bedroom in Vahni Hall", "Bedroom"),
      img("Vahni%20Hall%20(Q)/5WASHROOMQ.jpg?updatedAt=1790456019278", "Vahni Hall washroom", "Washroom"),
    ],
    facilities: [],
    ...contactsPending("girls"),
  },
  {
    slug: "vasudha-hall-e", code: "E", name: "Vasudha Hall — Block E", gender: "girls",
    images: [
      img("Vasudha%20Hall%20(E)/hostele1.jpg?updatedAt=1790455984040", "Vasudha Hall Block E"),
      img("Vasudha%20Hall%20(E)/Hostele1%20(1).jpg?updatedAt=1790456014236", "Vasudha Hall Block E"),
      img("Vasudha%20Hall%20(E)/Hostele2.jpg?updatedAt=1790456015110", "Vasudha Hall Block E"),
    ],
    facilities: [],
    ...contactsPending("girls"),
  },
  {
    slug: "vasudha-hall-g", code: "G", name: "Vasudha Hall — Block G", gender: "girls",
    images: [
      img("Vasudha%20Hall%20(G)/enteranceG.jpg?updatedAt=1790455996258", "Vasudha Hall Block G entrance", "Entrance"),
      img("Vasudha%20Hall%20(G)/Hostelg2.jpg?updatedAt=1790456011939", "Vasudha Hall Block G"),
      img("Vasudha%20Hall%20(G)/messG.jpg?updatedAt=1790455992879", "Vasudha Hall Block G mess", "Mess"),
      img("Vasudha%20Hall%20(G)/washroomG.jpg?updatedAt=1790455961069", "Vasudha Hall Block G washroom", "Washroom"),
    ],
    facilities: ["Mess"],
    ...contactsPending("girls"),
  },
];

const sortRows = (rows: HostelInventoryRow[]) =>
  [...rows].sort((a, b) => ROOM_TYPE_ORDER.indexOf(a.roomType) - ROOM_TYPE_ORDER.indexOf(b.roomType));

function generatedOverview(h: HostelRecord, inv: HostelInventoryRow[]) {
  const beds = inv.reduce((s, r) => s + r.bedCount, 0);
  const rooms = inv.reduce((s, r) => s + r.roomCount, 0);
  const kinds = inv.map((r) => ROOM_TYPES[r.roomType].label);
  const list = kinds.length > 1 ? `${kinds.slice(0, -1).join("; ")} and ${kinds[kinds.length - 1]}` : kinds[0];
  return `${h.name} is a ${h.gender === "boys" ? "boys’" : "girls’"} residence with ${rooms.toLocaleString("en-IN")} student rooms and ${beds.toLocaleString("en-IN")} beds. Room configuration${kinds.length > 1 ? "s" : ""}: ${list}.`;
}

export const HOSTELS: Hostel[] = RECORDS.map((rec) => {
  const inventory = sortRows(HOSTEL_INVENTORY[rec.code] ?? []);
  const capacity: Hostel["capacity"] = {};
  inventory.forEach((r) => { capacity[r.roomType] = r.bedCount; });
  const profile = HOSTEL_PROFILES[rec.code];
  return {
    ...rec,
    inventory,
    capacity,
    overview: profile?.overview || rec.overview || generatedOverview(rec, inventory),
    facilities: profile?.facilities.length ? profile.facilities : rec.facilities,
    operationalContacts: profile?.contacts ?? rec.operationalContacts,
  };
});

export const hostelByCode = (code: string) => HOSTELS.find((h) => h.code === code);
export const hostelBySlug = (slug: string) => HOSTELS.find((h) => h.slug === slug);

export const totalBeds = (h: Hostel) => h.inventory.reduce((a, r) => a + r.bedCount, 0);
export const totalRooms = (h: Hostel) => h.inventory.reduce((a, r) => a + r.roomCount, 0);
export const inventoryRow = (h: Hostel, code: RoomTypeCode) => h.inventory.find((r) => r.roomType === code);

export const hasContacts = (c: HostelOperationalContact) =>
  Boolean(c.warden || c.assistantWarden || c.dayCaretakers?.length || c.nightCaretakers?.length || c.caretakerPhones?.length || c.caretakerEmail || c.receptionPhone);

/** "Hostel J" style legacy code, or null when the current name already is the code. */
export const legacyCode = (h: Pick<Hostel, "name" | "code">): string | null => {
  const esc = h.code.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
  return new RegExp(`(^|[\\s—-])${esc}($|\\s)`).test(h.name) ? null : `Hostel ${h.code}`;
};
