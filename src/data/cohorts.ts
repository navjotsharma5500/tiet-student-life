import type { RoomTypeCode } from "./roomTypes";
import type { Gender } from "./hostels";

/**
 * Cohorts and the cohort ↔ hostel ↔ room-type mapping.
 * In production this is the `cohort_hostel_room_types` table, editable by
 * DoSA admins without code changes.
 */
export type LevelId = "ug" | "pg" | "phd";
export type ProcessId = "admission-cell" | "dosa-new" | "continuing";

export type Allocation = { hostel: string /* hostel code */; rooms: RoomTypeCode[] };

export type Cohort = {
  id: string;
  level: LevelId;
  year: string; // grouping label, e.g. "First Year"
  stream: string; // "Engineering", "TSLAS", "TIET", ...
  title: string;
  short: string;
  isNewAdmission: boolean;
  process: ProcessId;
  handledBy: string;
  hasApplicationForm: boolean;
  hasOpenDay: boolean;
  jrfDocuments: boolean;
  allocation: Record<Gender, Allocation[]>;
};

export type Level = {
  id: LevelId;
  name: string;
  short: string;
  blurb: string;
  image: { url: string; alt: string };
  tint: string;
};

export const LEVELS: Level[] = [
  {
    id: "ug",
    name: "Undergraduate",
    short: "UG",
    blurb:
      "Engineering and Thapar School of Liberal Arts and Sciences (TSLAS) undergraduates — from first-year admission through to your final year in residence.",
    image: { url: "https://ik.imagekit.io/itmh/Societies/Copy%20of%20OWL05064.jpg?updatedAt=1777761542760", alt: "TIET students on campus" },
    tint: "bg-blush",
  },
  {
    id: "pg",
    name: "Postgraduate",
    short: "PG",
    blurb:
      "Master’s students admitted through TIET or TSLAS, and continuing second-year postgraduates applying for the new session.",
    image: { url: "https://ik.imagekit.io/itmh/Guest%20Room%20Website/Thapar_reference_style_1.jpg", alt: "Thapar Institute campus" },
    tint: "bg-sky",
  },
  {
    id: "phd",
    name: "PhD",
    short: "PhD",
    blurb:
      "Doctoral scholars joining the Institute, including JRF scholars, and PhD residents continuing from the second year onwards.",
    image: { url: "https://ik.imagekit.io/7khjnlfow/email-assets/NNCL1.png?updatedAt=1773174395921", alt: "Thapar Institute campus" },
    tint: "bg-lavender",
  },
];

const A = (hostel: string, ...rooms: RoomTypeCode[]): Allocation => ({ hostel, rooms });

const TSLAS_ALLOC: Record<Gender, Allocation[]> = {
  boys: [A("D", "2S_WST_AC")],
  girls: [A("Q", "2S_WST_AC")],
};
const PG1_ALLOC: Record<Gender, Allocation[]> = {
  boys: [A("M", "2S_WST_AC"), A("J", "1S_AC"), A("L", "2S_AC")],
  girls: [A("Q", "2S_WST_AC")],
};

const base = {
  hasApplicationForm: false,
  hasOpenDay: false,
  jrfDocuments: false,
};

export const COHORTS: Cohort[] = [
  {
    ...base, id: "ug-eng-1", level: "ug", year: "First Year", stream: "Engineering",
    title: "First-Year Engineering Undergraduate", short: "New admission", isNewAdmission: true,
    process: "admission-cell", handledBy: "Admission Cell, TIET", hasOpenDay: true,
    allocation: {
      boys: [A("H", "2S_AC", "2S_NAC", "4S_AC"), A("J", "1S_NAC", "2S_AC"), A("K", "2S_AC", "2S_NAC"), A("L", "2S_AC"), A("FRF/G", "3S_NAC")],
      girls: [A("I", "1S_NAC", "2S_AC", "3S_AC"), A("Q", "2S_WST_AC"), A("E", "2S_AC", "3S_AC", "4S_AC"), A("G", "3S_AC", "4S_AC")],
    },
  },
  {
    ...base, id: "ug-tslas-1", level: "ug", year: "First Year", stream: "TSLAS",
    title: "First-Year TSLAS Undergraduate", short: "New admission · Thapar School of Liberal Arts and Sciences", isNewAdmission: true,
    process: "dosa-new", handledBy: "Dean of Student Affairs (DoSA) Office", hasApplicationForm: true, hasOpenDay: true,
    allocation: TSLAS_ALLOC,
  },
  {
    ...base, id: "ug-eng-2", level: "ug", year: "Second Year", stream: "Engineering",
    title: "Second-Year Engineering Undergraduate", short: "Continuing resident", isNewAdmission: false,
    process: "continuing", handledBy: "Student Affairs Office · Hostel Allocation",
    allocation: {
      boys: [A("B", "1S_AC", "2S_AC"), A("D", "2S_WST_AC"), A("C", "2S_AC", "3S_AC"), A("L", "2S_AC"), A("J", "2S_AC"), A("O", "2S_WST_AC")],
      girls: [A("PG", "2S_WST_AC"), A("PG-II", "2S_WST_AC")],
    },
  },
  {
    ...base, id: "ug-tslas-2", level: "ug", year: "Second Year", stream: "TSLAS",
    title: "Second-Year TSLAS Undergraduate", short: "Continuing resident", isNewAdmission: false,
    process: "continuing", handledBy: "Student Affairs Office · Hostel Allocation", allocation: TSLAS_ALLOC,
  },
  {
    ...base, id: "ug-eng-3", level: "ug", year: "Third Year", stream: "Engineering",
    title: "Third-Year Engineering Undergraduate", short: "Continuing resident", isNewAdmission: false,
    process: "continuing", handledBy: "Student Affairs Office · Hostel Allocation",
    allocation: {
      boys: [A("A", "2S_WST_AC"), A("M", "2S_WST_AC"), A("J", "1S_AC"), A("O", "2S_WST_AC")],
      girls: [A("PG-II", "2S_WST_AC"), A("Q", "2S_WST_AC")],
    },
  },
  {
    ...base, id: "ug-tslas-3", level: "ug", year: "Third Year", stream: "TSLAS",
    title: "Third-Year TSLAS Undergraduate", short: "Continuing resident", isNewAdmission: false,
    process: "continuing", handledBy: "Student Affairs Office · Hostel Allocation", allocation: TSLAS_ALLOC,
  },
  {
    ...base, id: "ug-eng-4", level: "ug", year: "Fourth Year", stream: "Engineering",
    title: "Fourth-Year Engineering Undergraduate", short: "Continuing resident", isNewAdmission: false,
    process: "continuing", handledBy: "Student Affairs Office · Hostel Allocation",
    allocation: {
      boys: [A("M", "2S_WST_AC", "2S_WAT_AC", "1S_WST_AC", "1S_WAT_AC"), A("J", "1S_AC")],
      girls: [A("N", "2S_WST_AC", "1S_WST_AC", "1S_WAT_AC"), A("Q", "2S_WST_AC"), A("E", "1S_AC"), A("G", "1S_AC")],
    },
  },
  {
    ...base, id: "ug-tslas-4", level: "ug", year: "Fourth Year", stream: "TSLAS",
    title: "Fourth-Year TSLAS Undergraduate", short: "Continuing resident", isNewAdmission: false,
    process: "continuing", handledBy: "Student Affairs Office · Hostel Allocation", allocation: TSLAS_ALLOC,
  },
  {
    ...base, id: "pg-eng-1", level: "pg", year: "First Year", stream: "TIET",
    title: "First-Year Postgraduate — TIET", short: "New admission through TIET", isNewAdmission: true,
    process: "dosa-new", handledBy: "Dean of Student Affairs (DoSA) Office", hasApplicationForm: true,
    allocation: PG1_ALLOC,
  },
  {
    ...base, id: "pg-tslas-1", level: "pg", year: "First Year", stream: "TSLAS",
    title: "First-Year Postgraduate — TSLAS", short: "New admission through Thapar School of Liberal Arts and Sciences", isNewAdmission: true,
    process: "dosa-new", handledBy: "Dean of Student Affairs (DoSA) Office", hasApplicationForm: true,
    allocation: PG1_ALLOC,
  },
  {
    ...base, id: "pg-2", level: "pg", year: "Second Year", stream: "All programmes",
    title: "Second-Year Postgraduate", short: "Continuing resident", isNewAdmission: false,
    process: "continuing", handledBy: "Student Affairs Office · Hostel Allocation",
    allocation: {
      boys: [A("J", "1S_AC"), A("L", "2S_AC")],
      girls: [A("PG", "2S_WST_AC"), A("PG-II", "2S_WST_AC")],
    },
  },
  {
    ...base, id: "phd-new", level: "phd", year: "New Admission", stream: "Doctoral",
    title: "PhD — New Admission", short: "Joining the Institute as a doctoral scholar", isNewAdmission: true,
    process: "dosa-new", handledBy: "Dean of Student Affairs (DoSA) Office", hasApplicationForm: true, jrfDocuments: true,
    allocation: {
      boys: [A("J", "1S_AC")],
      girls: [A("I", "1S_AC"), A("E", "1S_AC"), A("G", "1S_AC")],
    },
  },
  {
    ...base, id: "phd-existing", level: "phd", year: "Second Year Onwards", stream: "Doctoral",
    title: "PhD — Second Year Onwards", short: "Continuing resident", isNewAdmission: false,
    process: "continuing", handledBy: "Student Affairs Office · Hostel Allocation",
    allocation: { boys: [A("J", "1S_AC")], girls: [A("I", "1S_AC")] },
  },
];

export const cohortById = (id: string) => COHORTS.find((c) => c.id === id);
export const levelById = (id: string) => LEVELS.find((l) => l.id === id);
export const cohortsForLevel = (level: LevelId) => COHORTS.filter((c) => c.level === level);

/** Room-type codes available to a cohort (either gender), de-duplicated. */
export function cohortRoomTypes(c: Cohort): { code: RoomTypeCode; genders: Gender[] }[] {
  const map = new Map<RoomTypeCode, Set<Gender>>();
  (["boys", "girls"] as Gender[]).forEach((g) =>
    c.allocation[g].forEach((a) => a.rooms.forEach((r) => (map.get(r) ?? map.set(r, new Set()).get(r)!).add(g))),
  );
  return [...map.entries()].map(([code, set]) => ({ code, genders: [...set] }));
}

export const PROCESS_LABEL: Record<ProcessId, string> = {
  "admission-cell": "Merit-based allocation by Admission Cell",
  "dosa-new": "DoSA application & allotment",
  continuing: "CGPA-based allocation in the Resident App",
};
