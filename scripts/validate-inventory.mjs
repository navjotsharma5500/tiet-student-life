// Validates src/data/inventory.ts against the Excel-derived validation table and
// checks that cohort eligibility (cohorts.ts) only references physically present room types.
// Run: npm run validate:inventory   (Node 22.18+ strips TypeScript types natively)
import { HOSTEL_INVENTORY, INVENTORY_EXPECTED_TOTALS } from "../src/data/inventory.ts";
import { COHORTS } from "../src/data/cohorts.ts";

const SEATER = { "1S": 1, "2S": 2, "3S": 3, "4S": 4 };
let failures = 0;
const fail = (m) => { failures++; console.error("✗", m); };

for (const [code, rows] of Object.entries(HOSTEL_INVENTORY)) {
  const rooms = rows.reduce((s, r) => s + r.roomCount, 0);
  const beds = rows.reduce((s, r) => s + r.bedCount, 0);
  const exp = INVENTORY_EXPECTED_TOTALS[code];
  if (!exp) fail(`${code}: no expected total`);
  else if (exp.rooms !== rooms || exp.beds !== beds) fail(`${code}: ${rooms} rooms / ${beds} beds, expected ${exp.rooms} / ${exp.beds}`);
  for (const r of rows) {
    const seats = SEATER[r.roomType.slice(0, 2)];
    if (r.roomCount * seats !== r.bedCount) fail(`${code} ${r.roomType}: ${r.roomCount} rooms × ${seats} ≠ ${r.bedCount} beds`);
  }
}

// Agira guest rooms (2-Seater AC attached washroom) must not appear in student inventory.
if (HOSTEL_INVENTORY.A.some((r) => r.roomType === "2S_WAT_AC")) fail("Agira Hall includes guest rooms (2S_WAT_AC)");

for (const c of COHORTS) {
  for (const g of ["boys", "girls"]) {
    for (const a of c.allocation[g]) {
      const inv = HOSTEL_INVENTORY[a.hostel];
      if (!inv) { fail(`${c.id}: hostel ${a.hostel} has no inventory`); continue; }
      for (const rt of a.rooms) if (!inv.some((r) => r.roomType === rt)) fail(`${c.id}: ${a.hostel} offers ${rt} but hostel has none`);
    }
  }
}

const total = Object.values(HOSTEL_INVENTORY).flat();
console.log(`${Object.keys(HOSTEL_INVENTORY).length} hostels · ${total.reduce((s, r) => s + r.roomCount, 0)} rooms · ${total.reduce((s, r) => s + r.bedCount, 0)} beds`);
if (failures) { console.error(`${failures} problem(s)`); process.exit(1); }
console.log("✓ inventory matches the validation table; cohort eligibility only uses physically present room types");
