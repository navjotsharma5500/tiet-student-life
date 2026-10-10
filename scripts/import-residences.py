#!/usr/bin/env python3
"""
Import the hostel room workbook (e.g. `residences (2).xlsx`) into src/data/inventory.ts.

Usage:
  python3 scripts/import-residences.py "path/to/residences (2).xlsx"            # print summary + diff check
  python3 scripts/import-residences.py "path/to/residences (2).xlsx" --write    # also rewrite HOSTEL_INVENTORY

Rules (student room inventory only):
  * one worksheet per hostel
  * include a row when Room Type is non-empty AND Capacity > 0 AND Residence Active = 1
  * exclude non-student spaces by room name/type keyword (guest room, offices, reception, mess, gym,
    laundry, common / water-cooler area, project / electrical rooms, visitor / waiting areas)
  * Vacant / Occupied columns are ignored (not a live availability feed)
Requires: pip install openpyxl
"""
import re, sys, json
from collections import defaultdict

try:
    import openpyxl
except ImportError:
    sys.exit("openpyxl is required: pip install openpyxl")

# Worksheet name → hostel code used in src/data/hostels.ts. Matching is case/spacing-insensitive
# and also accepts the code in brackets, e.g. "Agira Hall (A)".
SHEET_TO_CODE = {
    "agira": "A", "amritam": "B", "prithvi": "C", "neeram": "D", "vyan": "H", "tejas": "J",
    "ambaram": "K", "viyat": "L", "anantam": "M", "vyom": "O", "frf": "FRF/G", "frfg": "FRF/G",
    "vasudhae": "E", "blocke": "E", "vasudhag": "G", "blockg": "G", "ira": "I", "ananta": "N",
    "dhriti": "PG", "vahni": "Q", "pavani": "PG-II",
}

EXCLUDE = re.compile(
    r"guest|warden|care\s*taker|caretaker|office|reception|mess|gym|laundry|common|water\s*cooler|"
    r"cooler|project|electrical|electric|visitor|waiting|store|pantry|kitchen|lobby|staff",
    re.I,
)

def norm(s): return re.sub(r"[^a-z0-9]", "", str(s or "").lower())

def sheet_code(name):
    n = norm(name)
    m = re.search(r"\(([^)]+)\)", str(name))
    if m:
        c = m.group(1).strip().upper().replace("PG-2", "PG-II").replace("PG2", "PG-II")
        if c in {"A","B","C","D","H","J","K","L","M","O","E","G","I","N","PG","Q","PG-II","FRF/G","FRFG"}:
            return "FRF/G" if c == "FRFG" else c
    for key in sorted(SHEET_TO_CODE, key=len, reverse=True):
        if key in n:
            return SHEET_TO_CODE[key]
    return None

def room_code(t):
    s = str(t).upper().replace("-", " ")
    m = re.search(r"([1-4])\s*S", s)
    if not m: return None
    seats = m.group(1)
    non_ac = bool(re.search(r"NON\s*AC|NAC", s))
    if "WAT" in s or "ATTACHED" in s: return f"{seats}S_WAT_AC"
    if "WST" in s or "SHARED" in s: return f"{seats}S_WST_AC"
    return f"{seats}S_{'NAC' if non_ac else 'AC'}"

def header_index(row):
    idx = {}
    for i, v in enumerate(row):
        n = norm(v)
        if n in ("roomno", "roomnumber", "room"): idx["room"] = i
        elif n == "roomtype": idx["type"] = i
        elif n == "capacity": idx["cap"] = i
        elif n in ("residenceactive", "active"): idx["active"] = i
    return idx if {"type", "cap", "active"} <= idx.keys() else None

def parse(path):
    wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
    inv = defaultdict(lambda: defaultdict(lambda: [0, 0]))
    report = {"skipped_sheets": [], "excluded": [], "unknown_types": []}
    for ws in wb.worksheets:
        code = sheet_code(ws.title)
        if not code:
            report["skipped_sheets"].append(ws.title); continue
        idx = None
        for row in ws.iter_rows(values_only=True):
            if idx is None:
                idx = header_index(row); continue
            rtype = row[idx["type"]] if idx["type"] < len(row) else None
            cap = row[idx["cap"]] if idx["cap"] < len(row) else None
            active = row[idx["active"]] if idx["active"] < len(row) else None
            room = row[idx["room"]] if "room" in idx and idx["room"] < len(row) else ""
            if not rtype or str(rtype).strip() == "": continue
            try: cap = float(cap)
            except (TypeError, ValueError): continue
            if cap <= 0 or str(active).strip() not in ("1", "1.0", "True", "TRUE"): continue
            if EXCLUDE.search(f"{room} {rtype}"):
                report["excluded"].append(f"{ws.title}: {room} ({rtype})"); continue
            rc = room_code(rtype)
            if not rc:
                report["unknown_types"].append(f"{ws.title}: {room} ({rtype})"); continue
            inv[code][rc][0] += 1
            inv[code][rc][1] += int(cap)
    return inv, report

def to_ts(inv):
    order = ["A","B","C","D","H","J","K","L","M","O","FRF/G","E","G","I","N","PG","Q","PG-II"]
    lines = []
    for code in order + sorted(set(inv) - set(order)):
        if code not in inv: continue
        rows = ", ".join(f'r("{rt}", {v[0]}, {v[1]})' for rt, v in sorted(inv[code].items()))
        key = code if re.fullmatch(r"[A-Z]+", code) else json.dumps(code)
        lines.append(f"  {key}: [{rows}],")
    return "\n".join(lines)

if __name__ == "__main__":
    if len(sys.argv) < 2: sys.exit(__doc__)
    inv, rep = parse(sys.argv[1])
    for code, rows in inv.items():
        r = sum(v[0] for v in rows.values()); b = sum(v[1] for v in rows.values())
        print(f"{code:6} {r:5} rooms {b:6} beds  " + ", ".join(f"{k}:{v[0]}/{v[1]}" for k, v in sorted(rows.items())))
    for k, v in rep.items():
        if v: print(f"\n{k} ({len(v)}):\n  " + "\n  ".join(v[:50]))
    if "--write" in sys.argv:
        p = "src/data/inventory.ts"
        src = open(p).read()
        new = re.sub(r"(export const HOSTEL_INVENTORY: Record<string, HostelInventoryRow\[\]> = \{\n)[\s\S]*?(\n\};)",
                     lambda m: m.group(1) + to_ts(inv) + m.group(2), src, count=1)
        open(p, "w").write(new)
        print(f"\nWrote {p}. Now run: npm run validate:inventory")
