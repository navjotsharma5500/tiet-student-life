import type { HostelOperationalContact } from "./hostels";

/**
 * Hostel profiles — overview, facilities and operational contacts, keyed by hostel code.
 * Future table(s): hostel_profiles, hostel_contacts.
 *
 * Source (maintainer reference only, never linked publicly): the TIET boys' and girls'
 * hostel pages, read October 2026. Descriptions are rewritten concisely; capacities in
 * those pages are deliberately NOT used — rooms and beds come from inventory.ts (Excel).
 *
 * Phone rules
 *  - Numbers listed one-per-name in the source are attached to that person.
 *  - Numbers listed for a group without a clear owner go in `caretakerPhones`.
 *  - Numbers that are malformed in the source are omitted (see SOURCE_ISSUES).
 */
export type HostelProfile = {
  overview: string;
  facilities: string[];
  contacts: HostelOperationalContact;
};

export const HOSTEL_PROFILES: Record<string, HostelProfile> = {
  // ───────────────────────── Boys ─────────────────────────
  A: {
    overview: "One of the newest boys’ residences on campus: double-seater rooms that share a washroom between two rooms, set around lawns and water features, with lifts in every block.",
    facilities: ["Furnished rooms", "RO water coolers", "Four lifts with power backup", "Housekeeping", "Laundry", "24/7 Wi-Fi", "Gym", "Mess", "Night canteen", "Lawns & water features", "Security guards", "Fire alarms", "Student executive committee"],
    contacts: {
      warden: { name: "Dr. Pramod Kumar Vaishnav", email: "warden.agira@thapar.edu" },
      assistantWarden: { name: "Dr. Surjit Singh", phone: "8288008640 / 9115600644" },
      dayCaretakers: [{ name: "Birjesh Kumar", phone: "9878667829" }, { name: "Ram Singh", phone: "9814202987" }],
      nightCaretakers: [{ name: "Amrinder Singh", phone: "9464600180" }, { name: "Thakur Singh", phone: "9877831617" }],
      caretakerEmail: "caretaker.agira@thapar.edu",
      receptionPhone: "9115611510",
    },
  },
  B: {
    overview: "Bright, spacious rooms and a relaxed atmosphere, with an air-conditioned mess whose menu is shaped by the residents’ committee.",
    facilities: ["Bed, study table, chair & almirah", "24/7 Wi-Fi in every room", "Geysers in washrooms", "RO water", "TV room", "Gym", "Air-conditioned study room", "Night canteen", "Laundry", "Air-conditioned mess", "CCTV", "24-hour guard", "Executive committee"],
    contacts: {
      warden: { name: "Dr. Pratik Tiwari", email: "warden.amritam@thapar.edu", phone: "9039293105 / 7978607568" },
      assistantWarden: { name: "Dr. Amit Kumar" },
      dayCaretakers: [{ name: "Hardeep Singh", phone: "9115608802" }, { name: "Tushar Sehgal", phone: "9877516478" }],
      nightCaretakers: [{ name: "Maninder Singh", phone: "9855594440" }, { name: "Hardeep Singh", phone: "9781141433" }],
      caretakerEmail: "caretaker.amritam@thapar.edu",
      receptionPhone: "9115611512",
    },
  },
  C: {
    overview: "One of the oldest residences on campus, with air-conditioned two- and three-seater rooms, lawns with fountains and an active residents’ community.",
    facilities: ["Furnished rooms", "RO water cooler", "TV / common room", "Reading room", "Hot water", "Indoor games", "Lawns with fountains", "Housekeeping", "Laundry", "Study spaces", "Outdoor sports", "Student committees"],
    contacts: {
      warden: { name: "Dr. Hari Shankar Singh", email: "warden.prithvi@thapar.edu", phone: "8090143992" },
      dayCaretakers: [{ name: "Gurmeet Singh", phone: "9115608803" }],
      nightCaretakers: [{ name: "Ram Naresh", phone: "9780365771" }],
      caretakerEmail: "caretaker.prithvi@thapar.edu",
      receptionPhone: "9115611513",
    },
  },
  D: {
    overview: "One of the newest boys’ residences: double-seater rooms sharing a washroom between two rooms, lifts in every block, and lawns and water features outside.",
    facilities: ["Furnished rooms", "RO water coolers", "Four lifts with power backup", "Housekeeping", "Laundry", "24/7 Wi-Fi", "Gym", "Mess", "Night canteen", "Lawns & water features", "Security guards", "Fire alarms", "Student executive committee"],
    contacts: {
      warden: { name: "Dr. Danie Roy A. B", email: "warden.neeram@thapar.edu", phone: "9115600155 / 7007660275" },
      assistantWarden: { name: "Dr. Ovais Shafiq Qadri" },
      dayCaretakers: [{ name: "Mandeep Daniel", phone: "9115600144" }, { name: "Manish Kumar", phone: "6280678837" }],
      nightCaretakers: [{ name: "Arvinder Singh", phone: "9855684107" }, { name: "Karanveer Singh", phone: "6283854368" }],
      caretakerEmail: "caretaker.neeram@thapar.edu",
      receptionPhone: "9115600146",
    },
  },
  H: {
    overview: "A residence mainly for first-year students, with its own mess and a semester-wise executive committee of students, warden, caretaker and mess manager.",
    facilities: ["Gym", "TV room", "Table tennis", "Reading room", "In-hostel mess", "Executive committee"],
    contacts: {
      warden: { name: "Dr. Sandeep Pandey", email: "warden.vyan@thapar.edu", phone: "8288008179" },
      dayCaretakers: [{ name: "Varinderdeep Singh", phone: "9464567143" }],
      nightCaretakers: [{ name: "Gurpreet Singh", phone: "6239138634" }, { name: "Kawaljeet Singh", phone: "7986534871" }],
      caretakerEmail: "caretaker.vyan@thapar.edu",
      receptionPhone: "9115611518",
    },
  },
  J: {
    overview: "A multi-storey residence in two towers, organised in clusters of rooms, with an open-air theatre and a night mess.",
    facilities: ["Geysers in each cluster", "RO water coolers", "24/7 Wi-Fi", "Gym", "Air-conditioned reading room", "Lifts with backup in both towers", "Open-air theatre", "Air-conditioned guest rooms", "Mess & night mess", "Guards & patrolling", "CCTV", "Fire alarms", "Online complaint system"],
    contacts: {
      warden: { name: "Dr. Atul Kumar Upadhyay", email: "warden.tejas@thapar.edu", phone: "7579448505" },
      assistantWarden: { name: "Dr. Dinesh" },
      dayCaretakers: [{ name: "Jaspal Singh", phone: "8288008178" }, { name: "Avtar Singh", phone: "9876664547" }, { name: "Parvinder Singh", phone: "8360595212" }],
      nightCaretakers: [{ name: "Ajay Kumar", phone: "7986578196" }, { name: "Nishan Singh", phone: "9464969982" }],
      caretakerEmail: "caretaker.tejas@thapar.edu",
      receptionPhone: "9115611520",
    },
  },
  K: {
    overview: "A two-block, two-floor residence with lawns, parking and its own mess.",
    facilities: ["High-speed internet in each block", "Water purifiers", "Geysers in bathrooms", "Gym", "TV room with newspapers", "Mess", "Regular cleaning", "Indoor games", "Reading rooms", "Laundry", "Guest rooms", "Parking", "Lawns"],
    contacts: {
      warden: { name: "Dr. Yogesh Tatte", email: "warden.ambaram@thapar.edu", phone: "+91 77093 87438" },
      dayCaretakers: [{ name: "Kuldeep Singh", phone: "7508380066" }],
      nightCaretakers: [{ name: "Satnam Singh" }, { name: "Jaspreet Singh" }],
      caretakerPhones: ["8427993205", "8556887825"],
      caretakerEmail: "caretaker.ambaram@thapar.edu",
      receptionPhone: "9115611521",
    },
  },
  L: {
    overview: "An air-conditioned double-occupancy residence next to Thapar Polytechnic, with its own dining hall, library-cum-reading room and guest rooms.",
    facilities: ["Gym", "TV & common room", "Library cum reading room", "Hot water", "RO water", "Table tennis & carom", "Lawns", "Laundry", "Night mess & night canteen", "Guest rooms", "Mess & executive committees"],
    contacts: {
      warden: { name: "Dr. Bharat Garg", email: "warden.viyat@thapar.edu", phone: "9115608834" },
      dayCaretakers: [{ name: "Rajesh Kumar", phone: "9115608840" }],
      nightCaretakers: [{ name: "Karamjit Singh", phone: "8224069562" }],
      caretakerEmail: "caretaker.viyat@thapar.edu",
      receptionPhone: "9115611522",
    },
  },
  M: {
    overview: "A multi-storey residence across four towers with single and double air-conditioned rooms, some with attached and some with shared washrooms.",
    facilities: ["Air-conditioned rooms", "Study tables, almirahs & geysers", "Water cooler, RO & sofas on each floor", "Two lifts per block", "Housekeeping", "Laundry", "24/7 Wi-Fi", "Gym", "Security guards", "Fire alarms", "Guest rooms", "Sick rooms"],
    contacts: {
      warden: { name: "Dr. Shivendra Shivani", email: "warden.anantam@thapar.edu", phone: "9319588365 / 8876191155" },
      assistantWarden: { name: "Dr. Dhamodharan K" },
      dayCaretakers: [{ name: "Satgur Singh" }, { name: "Arun Mattu" }, { name: "Maninderpal Singh" }, { name: "Sandeep Singh" }],
      nightCaretakers: [{ name: "Jagseer Singh" }, { name: "Amrinder Singh" }],
      caretakerPhones: ["7889523067", "9115600633", "9464600180"],
      caretakerEmail: "caretaker.anantam@thapar.edu",
      receptionPhone: "9115611523",
    },
  },
  O: {
    overview: "One of the newest boys’ residences: double-seater rooms sharing a washroom between two rooms, lifts in every block, washing machines and landscaped grounds.",
    facilities: ["Furnished rooms", "Water coolers & RO", "Washing machines", "Four lifts with backup", "Housekeeping", "Laundry", "24/7 Wi-Fi", "Gym", "Mess", "Night canteen", "Lawns & water features", "Security guards", "Fire alarms", "Resident executive committee"],
    contacts: {
      warden: { name: "Dr. Ashish Kumar Gupta", email: "warden.vyom@thapar.edu", phone: "9993409206 / 9873153996" },
      assistantWarden: { name: "Dr. Sachin Kansal" },
      dayCaretakers: [{ name: "Jaspreet Singh", phone: "7009039508" }, { name: "Nitin Bhardwaj", phone: "9855547422" }],
      nightCaretakers: [{ name: "Rajeev Jindal" }, { name: "Gurvinder Singh", phone: "8699677205" }],
      caretakerEmail: "caretaker.vyom@thapar.edu",
      receptionPhone: "9115611514",
    },
  },
  "FRF/G": {
    overview: "A new residence beside the campus 400 m athletics track, with its own mess and on-site laundry.",
    facilities: ["High-speed Wi-Fi", "Mess", "On-site laundry", "Dedicated warden & caretaker team"],
    contacts: {
      warden: { name: "Dr. Surjit Singh", email: "warden.frfg@thapar.edu", phone: "9728433699" },
      dayCaretakers: [{ name: "Mrs. Neeru Gupta", phone: "9988329580" }],
      nightCaretakers: [{ name: "Mrs. Shikha Singh", phone: "7888857834" }],
      caretakerEmail: "caretaker.frfg@thapar.edu",
    },
  },

  // ───────────────────────── Girls ─────────────────────────
  E: {
    overview: "A green, close-knit girls’ residence with a range of room configurations, its own mess and active cultural, sports, mess and discipline committees.",
    facilities: ["Mess", "Cultural, sports, mess & discipline committees", "Bed, study table & almirah", "LED TV in common area", "Uninterrupted power", "Gym", "Indoor & outdoor games", "Night canteen", "First-aid box", "24-hour ambulance", "RO water coolers on each floor", "24-hour gate security"],
    contacts: {
      warden: { name: "Dr. Kavita", email: "warden.vasudhae@thapar.edu", phone: "9654040633" },
      dayCaretakers: [{ name: "S. Mukhtiar Singh", phone: "9115608806" }],
      nightCaretakers: [{ name: "Mrs. Rinkle Sharma", phone: "9592949344" }, { name: "Mrs. Suman", phone: "9988716515" }],
      caretakerEmail: "caretaker.vasudhae@thapar.edu",
      receptionPhone: "9115611515",
    },
  },
  G: {
    overview: "A recently renovated girls’ residence set among lawns, with a student-run mess committee and a shared hangout corner with Block E.",
    facilities: ["Wi-Fi", "RO water coolers on each floor", "Parking", "Semester-wise mess committee", "Senior-student counsellor team", "Inter- & intra-hostel competitions", "Shared hangout corner with Block E"],
    contacts: {
      warden: { name: "Dr. Deepa Mudgal", email: "warden.vasudhag@thapar.edu", phone: "7340997983" },
      dayCaretakers: [{ name: "Mr. Vijay Kumar", phone: "9115608809" }],
      nightCaretakers: [{ name: "Ms. Gagandeep Kaur" }],
      caretakerPhones: ["9814016892"],
      caretakerEmail: "caretaker.vasudhag@thapar.edu",
      receptionPhone: "9115611517",
    },
  },
  I: {
    overview: "An affordable, comfortable girls’ residence with a well-equipped gym, a library-cum-reading room and guest rooms for visiting parents.",
    facilities: ["Gym", "Lift (24/7)", "Air-conditioned reading-cum-library room", "Air-conditioned guest rooms for parents"],
    contacts: {
      warden: { name: "Dr. Anupam Sharma", email: "warden.ira@thapar.edu", phone: "9855572517" },
      assistantWarden: { name: "Dr. Ruchika Lamba" },
      dayCaretakers: [{ name: "Mrs. Shiva Maurya", phone: "9115608807" }, { name: "Mrs. Anuradha Yadav", phone: "8699112625" }],
      nightCaretakers: [{ name: "Mrs. Lakhvir Kaur", phone: "7986445408" }, { name: "Mrs. Amarprit Kaur", phone: "7973129929" }],
      caretakerEmail: "caretaker.ira@thapar.edu",
      receptionPhone: "9115611519",
    },
  },
  N: {
    overview: "A newly built multi-storey girls’ residence with fully air-conditioned single and double rooms, reading rooms on every floor and an open stage.",
    facilities: ["Fully furnished rooms", "Air-conditioning throughout", "Water coolers, RO & sofas on each floor", "Housekeeping", "Laundry", "24/7 Wi-Fi", "Gym", "AC reading room on each floor", "Two lifts with backup", "Open stage", "Guest rooms", "Day & night guards", "Fire alarms", "Mess", "Online complaint system"],
    contacts: {
      warden: { name: "Dr. Geeta Kasana" },
      assistantWarden: { name: "Dr. Anu Mittal", email: "warden.ananta@thapar.edu", phone: "9878262723 / 9996412318" },
      dayCaretakers: [{ name: "Mr. Kuldeep Singh", phone: "9115608810" }, { name: "Mrs. Sukhwinder Kaur", phone: "9463425988" }],
      nightCaretakers: [{ name: "Mrs. Jyoti Badauni", phone: "8847448020" }, { name: "Mrs. Sukhwinder Kaur", phone: "9888953557" }],
      caretakerEmail: "caretaker.ananta@thapar.edu",
      receptionPhone: "9115611524",
    },
  },
  PG: {
    overview: "One of the newest residences for women: air-conditioned double rooms sharing a washroom between two rooms, with a TV lounge, study area and night café.",
    facilities: ["TV lounge", "Gym", "AC study area", "Night café", "Laundry", "24/7 Wi-Fi", "Four lifts with backup", "Mess", "Housekeeping", "Landscaped grounds", "CCTV", "Round-the-clock security"],
    contacts: {
      warden: { name: "Dr. M. Vasundhra", email: "warden.dhriti@thapar.edu", phone: "8288008174 / 9115600644" },
      assistantWarden: { name: "Dr. Trishna Choudhury" },
      dayCaretakers: [{ name: "Mr. Bagicha Singh", phone: "8264921367" }],
      nightCaretakers: [{ name: "Mrs. Virpal Kaur", phone: "9915394184" }, { name: "Mrs. Rajwinder Kaur", phone: "9357777232" }],
      caretakerEmail: "caretaker.dhriti@thapar.edu",
      receptionPhone: "9115611525",
    },
  },
  Q: {
    overview: "A newer residence for women: air-conditioned double rooms sharing a washroom between two rooms, with lawns, water features and a resident executive committee.",
    facilities: ["Desk, chair, bookcase & geyser in rooms", "TV room", "Gym", "Common AC study area", "Night café", "Lawns & water features", "Laundry", "Four lifts with backup", "Housekeeping", "24-hour Wi-Fi", "Mess", "CCTV", "Round-the-clock security", "Fire alarms", "Resident executive committee"],
    contacts: {
      warden: { name: "Dr. Parimita Roy" },
      assistantWarden: { name: "Dr. Garima Singh", email: "warden.vahni@thapar.edu", phone: "9988034083 / 7505500249" },
      dayCaretakers: [{ name: "Mrs. Pawandeep", phone: "9803500935" }, { name: "Ms. Usha Verma", phone: "9115130700" }],
      nightCaretakers: [{ name: "Mrs. Dilpreet Kaur", phone: "7986971106" }, { name: "Mrs. Pooja Verma", phone: "9988814753" }],
      caretakerEmail: "caretaker.vahni@thapar.edu",
      receptionPhone: "9115611516",
    },
  },
  "PG-II": {
    // The published Pavani description/facilities duplicate Hostel FRF/G's text (3-seater non-AC) and
    // contradict the inventory, so only the contacts are used. Overview is generated from inventory.
    overview: "",
    facilities: [],
    contacts: {
      warden: { name: "Dr. Swati Sondhi", email: "warden.pavani@thapar.edu", phone: "8288005496 / 8486120481" },
      assistantWarden: { name: "Dr. Himali Horo" },
      dayCaretakers: [{ name: "Mrs. Jasvir Kaur", phone: "8288005495" }, { name: "Mrs. Sunita", phone: "8437165623" }, { name: "Mrs. Tarnveer Kaur", phone: "9877767645" }],
      nightCaretakers: [{ name: "Mrs. Jyoti Badauni", phone: "8288003204" }, { name: "Mrs. Suman Kumari", phone: "8288003205" }],
      caretakerEmail: "caretaker.pavani@thapar.edu",
    },
  },
};

/** Source inconsistencies found while transferring data — for the DoSA office to confirm. Not rendered. */
export const SOURCE_ISSUES = [
  "Vyom Hall: night caretaker Rajeev Jindal's number is published as 769667652 (9 digits) — omitted.",
  "Pavani Hall: published description/facilities duplicate Hostel FRF/G text and conflict with the inventory — not used.",
  "Anantam Hall: four day caretakers share two numbers (one marked for F-block); two night caretakers share one number — shown as caretaker numbers.",
  "Ambaram Hall night caretakers and Vasudha Block G night caretaker have no individual number — shown as caretaker numbers.",
  "Ananta Hall: Mrs. Sukhwinder Kaur is listed as both day and night caretaker; 'Jyoti Baduani' spelling normalised to 'Badauni'.",
  "Agira Hall assistant warden and Hostel FRF/G warden are both Dr. Surjit Singh; 9115600644 appears for both Agira and Dhriti.",
  "Coordinating Wardens: the public pages list cowarden1@/cowarden2@thapar.edu; the portal uses the personal official emails supplied by DoSA.",
];
