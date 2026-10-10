import type { Cohort, ProcessId } from "./cohorts";

/**
 * Process content per allocation workflow. Plain-language, student-facing.
 * Session-specific values (dates, preference limits, reporting dates, mess fee)
 * are NEVER hard-coded — they are flagged `dynamic` and resolved from the
 * active notice in production.
 */
export type Step = { title: string; detail?: string; dynamic?: boolean; who?: string };

export type ProcessContent = {
  summary: string;
  eligibility: string[];
  application: { intro: string; steps: Step[] };
  payment: { intro: string; steps: Step[]; modes?: string[] };
  reporting: { intro: string; steps: Step[] };
  residentApp: { required: boolean; intro: string; steps: Step[] };
  circularsChannel: string;
};

export const RESIDENT_APP_ONBOARDING: Step[] = [
  { title: "Check your email", detail: "You will receive an email with Resident App onboarding instructions once your hostel and room are allotted." },
  { title: "Download Dormly Thapar Resident App", detail: "Available on Android and iOS.", dynamic: true },
  { title: "Choose “My Hostel is using Dormly Thapar Resident App”", detail: "Select this option on the first screen." },
  { title: "Log in with your application email", detail: "Use exactly the same email address you submitted in the hostel application form." },
  { title: "Enter the OTP", detail: "The one-time password may land in your Inbox or your Spam folder — check both." },
  { title: "Open your dashboard", detail: "Your allotted hostel and room number are visible here." },
  { title: "Pay hostel fee and mess fee", detail: "Both fees are paid online through the app." },
];

const DOSA_NEW = (c: Cohort): ProcessContent => ({
  summary:
    "You apply on this website. The DoSA Office verifies your eligibility and allots both your hostel and your room number. You then pay online in the Resident App and report to your hostel caretaker.",
  eligibility: [
    c.level === "phd" ? "Confirmed PhD admission at TIET." : "Confirmed admission at TIET" + (c.stream === "TSLAS" ? " through the Thapar School of Liberal Arts and Sciences." : "."),
    "Academic fee paid.",
    "Admission letter — mandatory. It is uploaded with your hostel application (PDF, up to 10 MB).",
    ...(c.jrfDocuments ? ["JRF scholars only: upload your JRF Letter and HRA (House Rent Allowance) Certificate with the application."] : []),
    "Hostel and room allotment is subject to availability and applicable Institute rules.",
  ],
  application: {
    intro: "Apply through the Student Life website’s own hostel application form — not a Google Form.",
    steps: [
      { title: "Submit the hostel application form", detail: "Fill in student, parent and address details and upload your admission letter.", who: "You" },
      { title: "No hostel preference is collected", detail: "You do not choose a hostel or room type — the DoSA Office allots both." },
      { title: "Eligibility verification", detail: "The DoSA Office checks your admission and academic fee status.", who: "DoSA Office" },
      { title: "Hostel and room number allotted", detail: "DoSA allots your hostel and your specific room number.", who: "DoSA Office" },
      { title: "Allotment appears in the Resident App", detail: "You receive an onboarding email for the Dormly Thapar Resident App." },
    ],
  },
  payment: {
    intro: "Both the hostel fee and the mess fee are paid online through the Resident App after your allotment appears.",
    steps: [
      { title: "Log in to the Resident App", detail: "Use the email you submitted in the application." },
      { title: "Review your allotted hostel and room" },
      { title: "Pay hostel fee + mess fee online", detail: "Fees are as per the active academic-year fee notice.", dynamic: true },
    ],
  },
  reporting: {
    intro: "Report directly to the caretaker office of your allotted hostel on the date published in the applicable circular.",
    steps: [
      { title: "Reporting date", detail: "Published in the applicable circular / notice.", dynamic: true },
      { title: "Go to your hostel’s caretaker office", who: "You" },
      { title: "Verification", detail: "The caretaker verifies your roll / application details and confirms both hostel and mess fees are paid.", who: "Caretaker" },
      { title: "Rules & Regulations undertaking", detail: "Read and sign the undertaking provided by the caretaker." },
      { title: "Room key handed over", detail: "Welcome to residence." },
    ],
  },
  residentApp: {
    required: true,
    intro: "The Resident App is required before reporting — you pay your fees through it and it holds your allotment.",
    steps: RESIDENT_APP_ONBOARDING,
  },
  circularsChannel: "Reporting dates and instructions are published in DoSA circulars and sent to your registered email.",
});

const ADMISSION_CELL: ProcessContent = {
  summary:
    "Your hostel is allotted on campus by the Admission Cell, in slots ordered by JEE Main merit. You give preferences for hostel + room-type combinations in advance, pay at allocation and collect your key from the caretaker.",
  eligibility: [
    "Admitted to a first-year engineering undergraduate programme at TIET.",
    "Hostel allocation merit is based only on JEE Main merit / percentile.",
    "Allocation is subject to availability at the time of your slot.",
  ],
  application: {
    intro: "Everything is coordinated by the Admission Cell by email. There is no separate form on this website for your cohort.",
    steps: [
      { title: "Admission into TIET", who: "You" },
      { title: "Hostel instructions by email", detail: "The Admission Cell emails hostel-related instructions.", who: "Admission Cell" },
      { title: "Preference link", detail: "You receive a link to submit preferences." },
      { title: "Give hostel + room-type preferences", detail: "Rank the available hostel and room-type combinations — for example a particular hostel with a 2-Seater AC room — not just a hostel name.", who: "You" },
      { title: "Allocation slots by merit", detail: "Students are called in slots by JEE Main merit / percentile — higher merit is called earlier.", who: "Admission Cell" },
      { title: "Date and venue by email", detail: "Your slot date and venue are communicated by email.", dynamic: true },
      { title: "Come to TIET on your allotted date", detail: "Students and parents attend in person." },
      { title: "Hostel allotted", detail: "Allotted on the spot subject to current availability and your merit." },
    ],
  },
  payment: {
    intro: "Payment is completed at the allocation venue, at the time of allocation.",
    modes: ["Cash", "UPI", "Debit card", "Credit card", "Net banking"],
    steps: [
      { title: "Pay at allocation", detail: "Payment modes are as made available at the venue." },
      { title: "Receive your allocation slip", detail: "Keep it safe — you will show it to your hostel caretaker." },
    ],
  },
  reporting: {
    intro: "From the allocation venue, go to the caretaker office of your allotted hostel.",
    steps: [
      { title: "Go to the allotted hostel’s caretaker office", detail: "Carry your allocation slip.", who: "You" },
      { title: "Verification", detail: "The caretaker verifies your slip / the system record.", who: "Caretaker" },
      { title: "Room key handed over" },
    ],
  },
  residentApp: {
    required: false,
    intro:
      "The Resident App is not required before first reporting for your cohort. Instructions for residence services are shared after you join.",
    steps: [],
  },
  circularsChannel: "First-year undergraduate circulars and instructions are primarily communicated by Admission Cell email.",
};

const CONTINUING: ProcessContent = {
  summary:
    "When the hostel allocation notice is published, apply in the Resident App — on your own or as a group. Hostels are allotted by CGPA; after paying, you pick your room on a first-come, first-served basis.",
  eligibility: [
    "Existing Dormly Thapar Resident App account.",
    "Allocation is based on CGPA. Group allocation uses the group’s average CGPA.",
    "From Second Year onwards, discipline records / cases may be checked as part of allocation eligibility and allotment review.",
    "Allocation remains subject to availability.",
  ],
  application: {
    intro: "The active hostel allocation notice sets the dates and limits for this session.",
    steps: [
      { title: "Allocation notice published", detail: "It contains application / preference dates, allotment dates and the payment / room-booking window.", dynamic: true, who: "DoSA Office" },
      { title: "Open your existing Resident App account", who: "You" },
      { title: "Apply individually — or make a group", detail: "You can make a group. The group leader manages the group’s preferences." },
      { title: "Submit hostel preferences", detail: "The number of preferences is as specified in the active allocation notice.", dynamic: true },
      { title: "Allotment by CGPA", detail: "Individual CGPA, or average CGPA for groups. Subject to availability and discipline-record review.", who: "DoSA Office" },
    ],
  },
  payment: {
    intro: "Payment and room booking happen in the Resident App within the window in the allocation notice.",
    steps: [
      { title: "Pay hostel fee + mess fee in the app", detail: "After your hostel is allotted from your preferences.", dynamic: true },
      { title: "Select your room", detail: "Room selection is first come, first served after payment." },
      { title: "Check “Upcoming Booking”", detail: "Your selected room appears under Upcoming Booking in the app." },
    ],
  },
  reporting: {
    intro: "Go directly to the caretaker office of your hostel on the reporting date.",
    steps: [
      { title: "Reporting date", detail: "Published by circular / notice.", dynamic: true },
      { title: "Give your roll number at the caretaker office", who: "You" },
      { title: "Verification", detail: "The caretaker verifies your allotment and that both hostel and mess fees are paid.", who: "Caretaker" },
      { title: "Sign the Rules & Regulations undertaking" },
      { title: "Room key handed over" },
    ],
  },
  residentApp: {
    required: true,
    intro: "You use your existing Resident App account to apply, pay and book your room.",
    steps: [
      { title: "Log in with your existing account" },
      { title: "Apply or join a group during the application window", dynamic: true },
      { title: "Pay hostel + mess fee after allotment" },
      { title: "Book your room — first come, first served" },
      { title: "Confirm it under Upcoming Booking" },
    ],
  },
  circularsChannel: "Allocation notices and reporting circulars are published on the Notices page and by DoSA.",
};

export function processFor(c: Cohort): ProcessContent {
  const map: Record<ProcessId, ProcessContent> = {
    "admission-cell": ADMISSION_CELL,
    "dosa-new": DOSA_NEW(c),
    continuing: CONTINUING,
  };
  return map[c.process];
}

export const OPEN_DAY = {
  title: "Open Day",
  intro:
    "Before allocation, first-year undergraduate and TSLAS students and their parents may be invited for an Open Day.",
  points: [
    "Teams guide students and parents through the applicable hostels.",
    "Brochures may be provided.",
    "See hostel and mess facilities and understand food / mess arrangements.",
  ],
};
