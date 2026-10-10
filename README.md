# TIET Student Life — Hostel & Residence Portal (frontend prototype)

A mobile-first Next.js prototype for the Office of the Dean of Student Affairs, TIET.
It explains hostel onboarding, allocation, fees, reporting, residence life, check-out and refunds —
filtered to the student's own cohort — plus Online Portals, Notices, Campus Life and the DoSA Office.

**Status:** design/frontend prototype. There is no backend. The hostel application form validates
and shows a success screen, but **nothing is uploaded, saved or emailed**.

## Run locally

Requires Node 18.18+ (tested on Node 22).

```bash
npm install
npm run dev          # http://localhost:3000
# or a production build
npm run build && npm start
```

All pages are statically generated (≈180 routes). Images load from ImageKit and fonts from
Google Fonts, so the browser needs internet access.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS 3 · Framer Motion · Lucide icons ·
ImageKit URLs (no S3, no local media).

## Site map

| Route | What it is |
|---|---|
| `/` | Hero carousel (crossfade + Ken Burns, progress dots, pause), quick level picker, journey, Event Calendar highlight, campus teaser, notices, DoSA |
| `/journey` | Six-stage resident journey + comparison of the three routes into residence |
| `/hostel` | Hostel Application Guide: UG / PG / PhD editorial rows → in-page drill-down to year/cohort rows (`?level=ug` deep-links) |
| `/hostel/[cohort]` | Cohort guide: sticky sidebar (desktop) / chip bar (mobile), single-open accordion, `#section` deep links |
| `/hostel/[cohort]/hostels` | Cohort-filtered hostel options: gender filter, search, cohort switcher |
| `/hostel/[cohort]/hostels/[hostel]` | Hostel detail: gallery + lightbox, room types & capacity (non-cohort rooms greyed), contacts |
| `/hostel/[cohort]/fees` · `process` · `payment` · `reporting` | Cohort-specific detail pages with Back / Next |
| `/hostel/[cohort]/apply` | Own application form (TSLAS-1, PG-1, PhD-new); other cohorts get an explanation of where they apply |
| `/hostel/directory`, `/hostel/directory/[hostel]` | All hostels |
| `/hostel/fees`, `/hostel/apply`, `/hostel/resident-app`, `/hostel/living`, `/hostel/checkout`, `/hostel/refund`, `/hostel/circulars` | Shared pages ("Back to your guide" remembers the last cohort for the browser session) |
| `/portals`, `/notices`, `/dosa`, `/campus-life` | Directory pages |

## Data model (`src/data`)

Content lives in typed data files, not in components — each maps to a future table.

| File | Contents | Future table(s) |
|---|---|---|
| `roomTypes.ts` | Room Type Master. Internal `code` (e.g. `2S_WST_AC`) is never rendered; UI uses the full label. Reference fees. | `room_types`, `fee_structure_versions` |
| `hostels.ts` | Hostel Directory Master: name, legacy code, gender, images (URL + alt + caption). Merges inventory and profiles at load. | `hostels`, `media` |
| `inventory.ts` | **Physical student-room inventory** (rooms + beds per room type) from `residences (2).xlsx`. Never used to decide cohort eligibility. | `hostel_room_inventory` |
| `hostelProfiles.ts` | Overview, facilities, warden / assistant warden / caretakers / reception contacts per hostel. Source issues listed in `SOURCE_ISSUES`. | `hostel_profiles`, `hostel_contacts` |
| `cohorts.ts` | Levels, cohorts, and the **separate** cohort → hostel → room-type mapping | `cohorts`, `cohort_hostel_room_types` |
| `processes.ts` | Three workflows (Admission Cell, DoSA new admission, continuing/CGPA) with steps flagged `dynamic` | `process_templates`, `process_steps` |
| `residence.ts` | Leave, timings, rules, check-out, refund windows | CMS content blocks |
| `directory.ts` | Courses→branches, portals, **staff** (tiers with `layout`; people with `photoPosition`, `email`, `profileUrl`, `interaction`), notices, imagery | `courses`, `portals`, `staff`, `notices` |
| `journey.ts` | Journey stages | CMS content blocks |

Changing which hostels/rooms a cohort sees = editing `allocation` in `cohorts.ts` (later: an admin screen).

## Inventory tooling

```bash
npm run validate:inventory                       # checks inventory.ts against the validation table + cohort eligibility
python3 scripts/import-residences.py "residences (2).xlsx" [--write]   # re-derive inventory from the workbook (needs openpyxl)
```

The importer keeps rows with a Room Type, Capacity > 0 and Residence Active = 1, and drops non-student
spaces (guest rooms, offices, reception, mess, gym, laundry, common areas…). Vacant/Occupied are ignored.

## What is dynamic / pending

Marked in the UI with a yellow **“Set by active notice”**-style tag.

- **Mess fee** and all room fees → active academic-year fee notice (current figures are reference only).
- Allocation dates, preference limit, payment/room-booking window, reporting dates → active notices/circulars.
- Hostel contacts and facilities were transferred from the public hostel pages (Oct 2026). Inconsistencies in that source are listed in `SOURCE_ISSUES` (`src/data/hostelProfiles.ts`) for DoSA to confirm.
- **Pavani Hall** facilities/description: the public text duplicates Hostel FRF/G's, so a factual overview is generated from inventory instead.
- **Pavani Hall (PG-II)** has no photographs; a neutral placeholder is shown (no other hostel's photo is substituted).
- **Notices and circular PDFs** → the Notices page shows notice *types* as placeholders, clearly labelled.
- **Dormly Thapar Resident App** store links.
- Form submission: future version saves to DB, issues an application ID, sets status (Pending / Under Review / Approved / Allocated / Joined / Rejected) and sends the acknowledgement from `noreply_hostelallotment1@thapar.edu`.

## Media reliability

`Img` tries the transformed ImageKit URL, then the raw URL once, then shows a branded fallback with the alt
text — never an empty box. Portraits support a per-person focal point (`photoPosition`).

## Accessibility & motion

Semantic headings, breadcrumb nav, skip link, `aria-expanded`/`aria-controls` accordions, keyboard
lightbox (←/→/Esc), staff flip cards operable with Enter/Space (crossfade instead of 3D under reduced motion), visible focus rings, labelled form errors that move focus to the first invalid field.
`prefers-reduced-motion` disables Ken Burns, slideshow autoplay and reduces transitions.

## Next phase (backend / CMS)

PostgreSQL + role-based admin CMS with Draft → Review → Publish; session, cohort, eligibility and
mapping management; fee-structure versions; notice/PDF manager; ImageKit media fields (URL + metadata only);
application submissions with statuses and email templates; audit log. Components already render from
structured data, so they can switch to database queries without redesign.
