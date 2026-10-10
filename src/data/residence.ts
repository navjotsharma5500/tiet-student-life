/** Living in Residence, Check-out & Refund content. */

export const LEAVE_STEPS = [
  { title: "Apply for leave in the Resident App", detail: "For students already staying in a hostel." },
  { title: "Parent is informed on WhatsApp", detail: "Dormly Thapar Resident App sends your parent an informational WhatsApp message." },
  { title: "Show the acknowledgement to your caretaker", detail: "Show the parent acknowledgement / screenshot at the caretaker office." },
  { title: "Girls’ hostels: parent email too", detail: "An additional email from your parent is required." },
  { title: "Make the exit register entry", detail: "Complete the entry before you leave." },
];

export const TIMINGS = [
  { time: "6:00 AM", label: "Earliest routine departure from campus" },
  { time: "8:00 PM", label: "Main gate return deadline" },
  { time: "8:30 PM", label: "Hostel in-time — boys and girls" },
];

export const TIMING_NOTES = [
  "Routine student exit after 8:00 PM is not allowed.",
  "If you must leave after 8:00 PM, a parent / guardian must personally come to collect you.",
  "Late return may trigger a WhatsApp / email message to your parents.",
  "Repeated late return may lead to hostel-level action.",
];

export const RULES = [
  "Occupy only the room officially allotted to you.",
  "Unauthorised room swapping is not allowed.",
  "The Rules & Regulations undertaking is provided and collected by the caretaker at reporting.",
  "Raise maintenance requests through the Resident App or your caretaker, as applicable.",
];

export const CHECKOUT_STEPS = [
  { title: "Go to your caretaker office" },
  { title: "Return hostel assets", detail: "Room key, almirah key, AC remote and any other items issued to you, where applicable." },
  { title: "Return items in the condition issued", detail: "Damaged or missing assets may lead to an applicable fine / recovery." },
  { title: "Room and asset check", detail: "The caretaker verifies the room and returned assets." },
  { title: "Hostel No Dues Slip issued" },
  { title: "Refund, if applicable", detail: "Processed only as applicable under the current refund policy." },
];

export const REFUND_WINDOWS = [
  { range: "0 – 28 days", deduction: "25% deduction", detail: "on total Hostel Fee + Mess Fee", tone: "bg-mint" },
  { range: "29 – 56 days", deduction: "50% deduction", detail: "on total Hostel Fee + Mess Fee", tone: "bg-butter" },
  { range: "After 56 days", deduction: "No refund", detail: "", tone: "bg-blush" },
];

export const REFUND_COUNTING = [
  "Days are normally counted from the Hostel Session Start Date.",
  "If you were allotted after the session started, days are counted from your Room Allotment Date.",
  "Your check-in date is not used for the refund calculation.",
];
