/** Courses, portals, staff, notices, circulars, campus life and site imagery. */

export const COURSES: Record<string, string[]> = {
  BE: ["AIML", "CCA", "CHE", "CIE", "COBS", "COE", "COED", "COEN", "COEQ", "COET", "COPC", "COSE", "DSAI", "ECE", "EEC", "EIC", "ELE", "ENC", "EVD", "MEC", "MEE", "RAI"],
  BTECH: ["BT", "BME"],
  BLAS: ["UD"],
  MA: ["CHE", "PSY", "PSYS"],
  MCA: ["MCA"],
  ME: ["AI", "CCE", "CINE", "CSE", "ECE", "EVT", "MEN", "PS", "STRE", "THR", "TPE"],
  MSC: ["BT", "CHEM", "MATHS", "PHY"],
  MTECH: ["AI", "BT", "CSE", "ECE", "EST", "MEE", "VD", "VLSI"],
  PHD: ["BT", "CBH", "CHE", "CIE", "COE", "DCBC", "DOM", "DPMS", "ECE", "EIED", "ELE", "LIBS", "LMTSM", "MEE", "MSS", "PHY", "SEE", "SHSS", "SOM"],
};

/** Which courses each form-enabled cohort may pick (configurable per cohort). */
export const COHORT_COURSES: Record<string, string[]> = {
  "ug-tslas-1": ["BLAS"],
  "pg-eng-1": ["ME", "MTECH", "MSC", "MA", "MCA"],
  "pg-tslas-1": ["MA", "MSC"],
  "phd-new": ["PHD"],
};

export const BLOOD_GROUPS = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];

// ───────────────────────── Portals ─────────────────────────
export type Portal = { name: string; url: string | null; what: string; when: string; group: string; featured?: boolean };

export const PORTALS: Portal[] = [
  { name: "Event Calendar", url: "https://campusconnect.thapar.edu/event-calendar", group: "Campus life", featured: true,
    what: "Every fest, talk, competition and society event on campus in one calendar.", when: "Planning your week, or checking whether a date is free before booking a venue." },
  { name: "Campus Connect", url: "https://campusconnect.thapar.edu/", group: "Essentials",
    what: "The hub for student services — most of the portals below live here.", when: "Your starting point when you are not sure where a request goes." },
  { name: "Student Notices", url: "https://campusconnect.thapar.edu/student-notices", group: "Essentials",
    what: "Official notices for students, including hostel allocation notices and circulars.", when: "Before every application window and reporting date." },
  { name: "Student Grievance", url: "https://campusconnect.thapar.edu/grievance/form", group: "Essentials",
    what: "Raise a formal grievance so it reaches the right office and can be tracked.", when: "When an issue isn’t resolved through the usual channel." },
  { name: "Public Forms", url: "https://campusconnect.thapar.edu/public-forms", group: "Essentials",
    what: "Downloadable and online forms for common student requests.", when: "When an office asks you to “fill the form”." },
  { name: "TIET Health Hub", url: "https://campusconnect.thapar.edu/dispensary", group: "Wellbeing",
    what: "Information and services from the campus dispensary / health centre.", when: "Checking health-centre services or timings." },
  { name: "Student Societies", url: "https://studentsocieties.thapar.edu/", group: "Campus life",
    what: "Discover societies and chapters, and what they do.", when: "Finding your people — technical, cultural, sports and more." },
  { name: "Society Night Pass", url: "https://studentsocieties.thapar.edu/permissions/", group: "Permissions",
    what: "Permissions for society activities that run late.", when: "Your society has an approved late-evening activity." },
  { name: "Library Night Pass", url: "https://campusconnect.thapar.edu/permissions/", group: "Permissions",
    what: "Permission for late-hour library use.", when: "Exam season and long study nights at the library." },
  { name: "Guest Room Portal", url: "https://campusconnect.thapar.edu/guest-room", group: "Bookings",
    what: "Request on-campus guest room accommodation.", when: "Parents or guests are visiting." },
  { name: "Event Venue Booking", url: "https://campusconnect.thapar.edu/venue-enquiry", group: "Bookings",
    what: "Enquire about and book venues for events.", when: "Your society or team is organising an event." },
  { name: "Lost & Found", url: "https://campusconnect.thapar.edu/lostnfound/", group: "Essentials",
    what: "Report something you lost — or something you found.", when: "As soon as possible." },
  { name: "Dormly Thapar Resident App", url: null, group: "Residence",
    what: "Your hostel in your pocket: allotment, fee payment, room booking, leave and maintenance requests.", when: "Every resident. App-store links will be added here." },
];

// ───────────────────────── Staff ─────────────────────────
const S = "https://ik.imagekit.io/itmh/Guest%20Room%20Website/Dosa%20Office%20Staff";

/**
 * DoSA staff. Future table: staff (+ staff_tiers).
 * Public contact for central DoSA staff is the OFFICIAL EMAIL ONLY — never store or
 * render personal mobile numbers here.
 * `interaction` drives card behaviour (no section-name logic in JSX):
 *   "profile"      — whole card links to the official faculty profile (new tab)
 *   "flip-contact" — tap / click / Enter flips the card to reveal the official email
 *   "static"       — no interaction
 */
export type Person = {
  name: string;
  role: string;
  /** Functional responsibility, shown under the role on Associate Dean cards. */
  responsibility?: string;
  photo: string | null;
  /** CSS object-position for the portrait crop, e.g. "center 20%". */
  photoPosition?: string;
  email?: string | null;
  profileUrl?: string | null;
  interaction?: "profile" | "flip-contact" | "static";
};

/** Visual weight of a tier, rendered by the DoSA page. */
export type TierLayout = "feature" | "portrait" | "prominent" | "compact" | "mini";
export type StaffTier = { id: string; title: string; note: string; layout: TierLayout; people: Person[] };

/** Display order is the array order. */
export const STAFF: StaffTier[] = [
  { id: "dean", title: "Dean Student Affairs", note: "Leads the Office of the Dean of Student Affairs.", layout: "feature", people: [
    { name: "Dr. Meenakshi Rana", role: "Dean Student Affairs", photo: `${S}/Dr,%20Meenakshi%20Rana.jpeg`, photoPosition: "center 25%",
      profileUrl: "https://som.thapar.edu/facultydetails/NjQ0", interaction: "profile" },
  ] },
  { id: "associate", title: "Associate Deans Student Affairs", note: "Associate Deans of Student Affairs.", layout: "portrait", people: [
    { name: "Dr. Ashish Purohit", role: "Associate Dean Student Affairs 1", responsibility: "Students Fests & Interdepartmental Coordination", photo: `${S}/Dr.%20Ashish%20Purohit.jpg?updatedAt=1790456505547`, photoPosition: "center 25%",
      profileUrl: "https://med.thapar.edu/facultydetails/MTE3Nw==", interaction: "profile" },
    { name: "Dr. Neeraj Grover", role: "Associate Dean Student Affairs 2", responsibility: "Hostel Management & Student Housing", photo: `${S}/Dr.%20Neeraj%20Grover.jpg?updatedAt=1790456505571`, photoPosition: "center 25%",
      profileUrl: "https://med.thapar.edu/facultydetails/MTE3OA==", interaction: "profile" },
    { name: "Dr. Sumit Chandok", role: "Associate Dean Student Affairs 3", responsibility: "Student Clubs, Societies & Chapters", photo: `${S}/Dr.%20Sumit%20Chandok.jpg?updatedAt=1790456505507`, photoPosition: "center 25%",
      profileUrl: "https://som.thapar.edu/facultydetails/NjQ5", interaction: "profile" },
    { name: "Dr. Vishal Srivastava", role: "Associate Dean Student Affairs 4", responsibility: "Health, Wellness & DoSA Digital Affairs", photo: `${S}/Dr.%20Vishal%20Srivastava.jpg?updatedAt=1790456505524`, photoPosition: "center 25%",
      profileUrl: "https://www.thapar.edu/faculties/view/Dr.-Vishal-Srivastava/Mjk0/Nw==", interaction: "profile" },
  ] },
  { id: "wardens", title: "Coordinating Wardens", note: "Coordinate across the boys’ and girls’ residences.", layout: "prominent", people: [
    { name: "Dr. Mohit Agarwal", role: "Coordinating Warden, Boys", photo: `${S}/Dr,%20Mohit%20Aggarwal.jpg?updatedAt=1790456505629`, photoPosition: "center 25%",
      email: "mohit.agarwal@thapar.edu", profileUrl: "https://eced.thapar.edu/facultydetails/MTI0MA%3D%3D", interaction: "profile" },
    { name: "Dr. Richa Babbar", role: "Coordinating Warden, Girls", photo: `${S}/Dr.%20Richa%20Babbar.jpg`, photoPosition: "center 25%",
      email: "richa.babbar@thapar.edu", profileUrl: "https://ced.thapar.edu/facultydetails/OTQz", interaction: "profile" },
  ] },
  { id: "ops", title: "Sports, Counselling & Hostel Operations", note: "Specialist functions supporting student life. Tap a card for the official email.", layout: "compact", people: [
    { name: "Mr. Lakhbir Singh", role: "Director, Sports", photo: `${S}/Mr.%20Lakhbir%20Singh.jpg?updatedAt=1790456505521`, photoPosition: "center 25%", email: "lakhbir@thapar.edu", interaction: "flip-contact" },
    { name: "Dr. Sonam Dullat", role: "Manager (Student Counsellor), Counselling Cell (TICC)", photo: `${S}/Dr.%20Sonam%20Dullat.jpg?updatedAt=1790456505570`, photoPosition: "center 25%", email: "sonam.dullat@thapar.edu", interaction: "flip-contact" },
    { name: "Mr. Sandeep K. Rawat", role: "Admin Officer, Hostels", photo: `${S}/Mr.%20Sandeep%20K.%20Rawat.jpg?updatedAt=1790456505581`, photoPosition: "center 25%", email: "ao_hostels@thapar.edu", interaction: "flip-contact" },
    { name: "Mr. Harsh Preet Singh Neerav", role: "Head, Food & Beverage", photo: `${S}/Mr.%20Harsh%20Preet%20Singh%20Neerav.jpg?updatedAt=1790456505542`, photoPosition: "center 25%", email: "harshpreet.neerav@thapar.edu", interaction: "flip-contact" },
    { name: "Mr. Harpreet Singh Virdi", role: "All Hostels Manager", photo: `${S}/Mr.%20Harpreet%20Singh%20Virdi.jpg?updatedAt=1790456505534`, photoPosition: "center 25%", email: "harpreet.virdi@thapar.edu", interaction: "flip-contact" },
    { name: "Mr. Navjot Sharma", role: "Associate IT, All Hostels", photo: `${S}/IMG_4888.JPG?updatedAt=1790456505522`, photoPosition: "center 20%", email: "itmh@thapar.edu", interaction: "flip-contact" },
  ] },
  { id: "office", title: "Office Team", note: "Your first point of contact at the Student Affairs Office. Tap a card for the official email.", layout: "mini", people: [
    { name: "Mr. Naminder Kumar", role: "Senior Assistant", photo: `${S}/Mr.%20Naminder%20Kumar.jpg?updatedAt=1790456505506`, photoPosition: "center 25%", email: "dosa.office@thapar.edu", interaction: "flip-contact" },
    { name: "Mr. Surinder Singh", role: "Senior Associate", photo: `${S}/Mr.%20Surinder%20Singh.jpg?updatedAt=1790456505549`, photoPosition: "center 25%", email: "dosa.office@thapar.edu", interaction: "flip-contact" },
    { name: "Mr. Raghav Bhatnagar", role: "Senior Associate", photo: `${S}/Mr.%20Raghav%20Bhatnagar.jpg?updatedAt=1790456505551`, photoPosition: "center 25%", email: "dosa.office@thapar.edu", interaction: "flip-contact" },
    { name: "Mrs. Shabnam Rani", role: "Assistant", photo: `${S}/Mrs.%20Shabnam%20Rani.jpg?updatedAt=1790456505515`, photoPosition: "center 25%", email: "shabnam.rani@thapar.edu", interaction: "flip-contact" },
    { name: "Mr. Avinash Kumar", role: "Senior Assistant", photo: "https://ik.imagekit.io/7khjnlfow/email-assets/IMG_0545.HEIC", photoPosition: "center 25%", email: "Avinash.kumar@thapar.edu", interaction: "flip-contact" },
  ] },
];

/** Maintainer reference only — not rendered. */
export const STAFF_SOURCE_META = { roles: "https://www.thapar.edu/students/pages/dean-student-notice-board" };

// ───────────────────────── Notices & circulars ─────────────────────────
/**
 * PROTOTYPE PLACEHOLDERS. These entries demonstrate the notice model and the
 * search/filter UI. They are not real notices. In production, notices + PDFs are
 * published from the CMS (or synced from the official student-notices page).
 */
export type Notice = {
  id: string;
  title: string;
  /** Applicability line, where the notice names who it is for. */
  subtitle?: string;
  category: "Hostel Allocation" | "Fees" | "Reporting" | "Residence Rules" | "ID Cards";
  /** Official PDF, opened directly in a new tab. */
  pdf: string;
};

/** Maintainer reference only — not linked from the public UI. */
export const LEGACY_NOTICES_SOURCE = "https://thapar.edu/students/pages/student-notices";
export const CAMPUS_NOTICES_URL = "https://campusconnect.thapar.edu/student-notices";

const SC = "https://ik.imagekit.io/itmh/Guest%20Room%20Website/Student%20Circulars";

export const NOTICES: Notice[] = [
  { id: "n1", title: "Hostel Fee Structure", category: "Fees",
    pdf: `${SC}/Fee%20Structure%20Odd%20Sem%20July%20to%20Dec%20(2026-27).pdf` },
  { id: "n2", title: "NOTICE – Reporting Schedule & Mess Fee Payment Guidelines", category: "Reporting",
    subtitle: "ODD Semester 2026–27 • TIET / TSLAS • UG 2nd, 3rd & Final Year • PG Students",
    pdf: `${SC}/Reporting%20Schedule.pdf` },
  { id: "n3", title: "NOTICE – Hostel Allotment for Session ODD Sem 2026–27", category: "Hostel Allocation",
    subtitle: "UG 2nd, 3rd & 4th Year • TSLAS 2nd / 3rd / 4th Year onwards • PhD / PG 2nd Year",
    pdf: `${SC}/Hostel_Allotment_Notice_2026-27.pdf` },
  { id: "n4", title: "NOTICE – ID Card Issue, Session 2026–27", category: "ID Cards",
    subtitle: "All Branches – UG | PG | PhD | TSLAS Students",
    pdf: `${SC}/ID%20Card%20Notice%20Odd%20Sem%2026-27.pdf` },
  { id: "n5", title: "Hostel Allocation Process | Session 2026–27", category: "Hostel Allocation",
    subtitle: "Applicable for: Newly Admitted First Year TSLAS Students",
    pdf: `${SC}/TIET_Hostel_Allocation_Notice_TSLAS_2026-27.pdf` },
  { id: "n6", title: "Hostel Cancellation & Refund Policy – ODD Sem 2026–27", category: "Fees",
    pdf: `${SC}/Hostel_Cancellation_Refund_Policy_ODD_Sem_2026-27_Styled.pdf` },
  // Display title is 2026–2027 as instructed; the PDF filename itself says 2025-2026.
  { id: "n7", title: "Admissions 2026–2027 Refund Policy", category: "Fees",
    pdf: `${SC}/Admissions%202025-2026%20Refund%20Policy.pdf` },
  { id: "n8", title: "Procedure for Issue of Duplicate ID Card – Lost / Damage / Updation", category: "ID Cards",
    pdf: "https://ik.imagekit.io/7khjnlfow/Public%20Forms/Lost_ID_Card.pdf" },
];

export const CIRCULAR_SLOTS = [
  { title: "Active Hostel Allocation Notice", category: "Hostel Allocation" },
  { title: "Active Fee Notice (Hostel + Mess)", category: "Fees" },
  { title: "Reporting Circular", category: "Reporting" },
  { title: "Rules & Regulations Undertaking", category: "Residence Rules" },
  { title: "Refund Policy", category: "Fees" },
];

// ───────────────────────── Imagery ─────────────────────────
const SP = "https://ik.imagekit.io/itmh/Guest%20Room%20Website/Pictures/Sports%20Facilities";

export const HERO_SLIDES: { url: string; alt: string; position?: string; zoom?: number }[] = [
  { url: "https://ik.imagekit.io/7khjnlfow/email-assets/ThaparBackground1.png?updatedAt=1772797493052", alt: "Thapar Institute campus", position: "center 55%" },
  { url: "https://ik.imagekit.io/7khjnlfow/email-assets/03_dsyrsv.png?updatedAt=1774118995455", alt: "Thapar Institute campus", position: "center 50%" },
  { url: "https://ik.imagekit.io/7khjnlfow/email-assets/NNCL1.png?updatedAt=1773174395921", alt: "Nirvana Nook Central Library", position: "center 45%", zoom: 1.18 },
  { url: "https://ik.imagekit.io/itmh/Guest%20Room%20Website/ChatGPT%20Image%20Sep%2027,%202026,%2001_57_54%20AM.png?updatedAt=1790454505740", alt: "Thapar Institute campus", position: "center 50%" },
  { url: "https://ik.imagekit.io/itmh/Guest%20Room%20Website/Thapar_reference_style_1.jpg?updatedAt=1790453270787", alt: "Thapar Institute campus", position: "center 50%" },
];

export const HEALTH_IMAGE = "https://ik.imagekit.io/itmh/Guest%20Room%20Website/Pictures/Health%20Center.png?updatedAt=1790462619787";

export type Story = { title: string; kicker: string; text: string; image: string; alt: string; span?: "tall" | "wide" | "normal" };

export const SPORTS_GALLERY: Story[] = [
  { kicker: "Athletics", title: "International-standard synthetic track", text: "", image: `${SP}/INTERNATIONAL%20STANDARD%20SYNTHETIC%20TRACK.jpg?updatedAt=1790455960679`, alt: "Synthetic athletics track", span: "wide" },
  { kicker: "Aquatics", title: "Swimming pool", text: "", image: `${SP}/SWIMMING%20POOL.jpg?updatedAt=1790455961793`, alt: "Swimming pool", span: "tall" },
  { kicker: "Courts", title: "Synthetic basketball court", text: "", image: `${SP}/SYNTHETIC%20BASKETBALL%20COURT.jpg?updatedAt=1790455960762`, alt: "Synthetic basketball court" },
  { kicker: "Courts", title: "Synthetic tennis court", text: "", image: `${SP}/SYNTHETIC%20TENNIS%20COURT.jpg?updatedAt=1790455960583`, alt: "Synthetic tennis court" },
  { kicker: "Indoor", title: "Badminton hall", text: "", image: `${SP}/BADMINTON%20HALL.jpg?updatedAt=1790455960539`, alt: "Badminton hall" },
  { kicker: "Grounds", title: "Cricket ground", text: "", image: `${SP}/CRICKET%20GROUND.jpg?updatedAt=1790455960490`, alt: "Cricket ground", span: "wide" },
  { kicker: "Grounds", title: "Football ground", text: "", image: `${SP}/FOOTBALL%20GROUND.jpg?updatedAt=1790455960430`, alt: "Football ground" },
  { kicker: "Grounds", title: "Volleyball ground", text: "", image: `${SP}/VOLLEYBALL%20GROUND.jpg?updatedAt=1790455961497`, alt: "Volleyball ground" },
  { kicker: "Fitness", title: "Gym halls in hostels", text: "", image: `${SP}/GYM%20HALL%20IN%20HOSTELS.jpg?updatedAt=1790455961300`, alt: "Gym hall in a hostel", span: "tall" },
];

export const EVENTS_GALLERY: Story[] = [
  { kicker: "URJA", title: "Opening ceremony of URJA", text: "", image: `${SP}/Opening%20Ceremony%20Of%20URJA.jpg?updatedAt=1790455961190`, alt: "Opening ceremony of URJA", span: "wide" },
  { kicker: "URJA", title: "URJA", text: "", image: `${SP}/URJA.jpg?updatedAt=1790455961706`, alt: "URJA event" },
  { kicker: "URJA", title: "URJA", text: "", image: `${SP}/URJA%204.jpg?updatedAt=1790455962225`, alt: "URJA event" },
  { kicker: "Athletics", title: "Annual Athletic Meet", text: "", image: `${SP}/ANNUAL%20ATHLETIC%20MEET.jpg?updatedAt=1790455960113`, alt: "Annual Athletic Meet", span: "wide" },
];

export const ACHIEVEMENTS: Story[] = [
  { kicker: "Achievement", title: "TIET students with the overall trophy", text: "", image: "https://ik.imagekit.io/itmh/Societies/TIET%20STUDENTS%20WITH%20OVERALL%20TROPHY.jpg?updatedAt=1777761517797", alt: "TIET students with the overall trophy", span: "wide" },
  { kicker: "Teams", title: "Basketball boys team", text: "", image: "https://ik.imagekit.io/itmh/Societies/BASKETBALL%20BOYS%20TEAM.JPG?updatedAt=1777761541740", alt: "TIET basketball boys team" },
  { kicker: "Societies", title: "Society life", text: "", image: "https://ik.imagekit.io/itmh/Societies/5.jpeg?updatedAt=1777761517631", alt: "TIET students at a society event" },
];

// ───────────────────────── Campus food facilities ─────────────────────────
// Timings corrected to AM/PM per the DoSA team.
const FOOD = "https://ik.imagekit.io/itmh/Guest%20Room%20Website/guest%20room%20pic/guest%20room%20pic/Food%20Court";
export type FoodFacility = { name: string; image: string; timing: string; text: string };
export const FOOD_FACILITIES: FoodFacility[] = [
  { name: "Kravings", image: `${FOOD}/Kravings%202.jpeg`, timing: "9:00 AM – 8:00 PM", text: "A vibrant dining hub offering a wide variety of food choices under one roof. Guests can enjoy popular outlets including Subway, Domino's, Burgrill, Chai Vyanjan, and the Food Court, catering to diverse tastes throughout the day." },
  { name: "Domino's", image: `${FOOD}/Dominos.jpeg`, timing: "9:00 AM – 8:00 PM", text: "Savor a wide selection of freshly baked pizzas, sides, and desserts, perfect for a quick and satisfying meal." },
  { name: "Burgrill", image: `${FOOD}/Burgrill.jpeg`, timing: "9:00 AM – 8:00 PM", text: "Relish delicious grilled burgers, wraps, fries, and beverages prepared with fresh ingredients and bold flavors." },
  { name: "Subway", image: `${FOOD}/Subway.jpeg`, timing: "9:00 AM – 8:00 PM", text: "Enjoy freshly made sandwiches, wraps, and salads customized to your preferences with wholesome ingredients." },
  { name: "Faculty Lounge", image: `${FOOD}/Faculty%20Launge.png`, timing: "9:30 AM – 6:00 PM", text: "A comfortable dining space designed for faculty members and official guests, offering a peaceful environment to enjoy meals, refreshments, and informal discussions." },
];

export const COMING_SOON_PLACES = ["Cravings", "Domino’s", "CCD", "Food Court", "Nirvana Park", "Auditoriums", "Library"];
