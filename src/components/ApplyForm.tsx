"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, FileUp, Loader2, Paperclip, X } from "lucide-react";
import { useMemo, useRef, useState, type ReactNode } from "react";
import { cohortById } from "@/data/cohorts";
import { BLOOD_GROUPS, COHORT_COURSES, COURSES } from "@/data/directory";
import { EASE } from "./motion";

const MAX_BYTES = 10 * 1024 * 1024;
const PHONE = /^(\+91[\s-]?)?[6-9]\d{9}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Values = Record<string, string>;
type Files = { admission: File | null; jrf: File | null; hra: File | null };

const ACK =
  "Thank you for submitting your hostel accommodation request. Your details have been received successfully. Your request will be reviewed by the concerned team and further information regarding hostel allocation/onboarding will be communicated on your registered email address. Hostel and room allocation is subject to availability and applicable Institute rules.";

export function ApplyForm({ cohortId }: { cohortId: string }) {
  const c = cohortById(cohortId)!;
  const courses = COHORT_COURSES[c.id] ?? Object.keys(COURSES);
  const [v, setV] = useState<Values>({ course: courses.length === 1 ? courses[0] : "", year: c.isNewAdmission ? "1" : "" });
  const [files, setFiles] = useState<Files>({ admission: null, jrf: null, hra: null });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState(false);
  const [state, setState] = useState<"idle" | "submitting" | "done">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const branches = useMemo(() => (v.course ? COURSES[v.course] ?? [] : []), [v.course]);
  const isJrf = c.jrfDocuments && v.jrf === "yes";

  const set = (k: string, val: string) => {
    setV((s) => {
      const n = { ...s, [k]: val };
      if (k === "course") n.branch = (COURSES[val] ?? []).length === 1 ? COURSES[val][0] : "";
      return n;
    });
    if (touched) setErrors((e) => ({ ...e, [k]: "" }));
  };

  function validate(): Record<string, string> {
    const e: Record<string, string> = {};
    const req = (k: string, label: string) => { if (!v[k]?.trim()) e[k] = `${label} is required.`; };
    req("name", "Student name"); req("roll", "Admission / roll number");
    req("phone", "Contact number"); req("email", "Email");
    req("course", "Course"); req("branch", "Branch"); req("year", "Year");
    req("dob", "Date of birth"); req("blood", "Blood group");
    req("father", "Father’s name"); req("fatherPhone", "Father’s contact");
    req("mother", "Mother’s name"); req("motherPhone", "Mother’s contact");
    req("address", "Permanent address");
    (["phone", "fatherPhone", "motherPhone"] as const).forEach((k) => {
      if (v[k] && !PHONE.test(v[k].replace(/\s/g, ""))) e[k] = "Enter a valid 10-digit mobile number.";
    });
    (["email", "fatherEmail", "motherEmail"] as const).forEach((k) => {
      if (v[k] && !EMAIL.test(v[k])) e[k] = "Enter a valid email address.";
    });
    if (!files.admission) e.admission = "Admission letter is mandatory.";
    if (c.jrfDocuments && !v.jrf) e.jrf = "Please tell us whether you are a JRF scholar.";
    if (isJrf && !files.jrf) e.jrfFile = "JRF Letter is required for JRF scholars.";
    if (isJrf && !files.hra) e.hraFile = "HRA Certificate is required for JRF scholars.";
    if (v.declare !== "yes") e.declare = "Please confirm the declaration.";
    return e;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setTouched(true);
    const e = validate();
    setErrors(e);
    const first = Object.keys(e).find((k) => e[k]);
    if (first) {
      const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.querySelector<HTMLElement>("input,select,textarea,button")?.focus({ preventScroll: true });
      return;
    }
    setState("submitting");
    await new Promise((r) => setTimeout(r, 1100)); // prototype: no network call is made
    setState("done");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  if (state === "done") {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="mx-auto max-w-2xl py-6 text-center">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 16 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint">
          <CheckCircle2 className="h-8 w-8 text-[#1F5A36]" aria-hidden />
        </motion.div>
        <h2 className="mt-6 text-[2rem]">Thank you{v.name ? `, ${v.name.trim().split(/\s+/)[0]}` : ""}</h2>
        <p className="body-copy mt-2">Your form is complete and passed every check.</p>
        <figure className="mx-auto mt-8 max-w-xl rounded-2xl border border-line bg-white p-5 text-left">
          <figcaption className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Acknowledgement sent to your registered email (live system)</figcaption>
          <blockquote className="body-copy mt-2">{ACK}</blockquote>
        </figure>
        <div className="mx-auto mt-4 max-w-xl rounded-2xl border border-dashed border-crimson/40 bg-crimson-soft/40 p-4 text-left text-sm text-ink-soft">
          <p className="font-semibold text-crimson-dark">Prototype notice</p>
          <p className="mt-1">This is a design prototype. Nothing was uploaded, saved or emailed, and no application ID was created. In production this step will store the application, issue an ID, set status to <em>Pending</em> and send the acknowledgement from noreply_hostelallotment1@thapar.edu.</p>
        </div>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={`/hostel/${c.id}#process`} className="btn-ghost justify-center">Back to your guide</Link>
          <Link href="/hostel/resident-app" className="btn-primary justify-center">Next: Resident App onboarding</Link>
        </div>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-12">
      <AnimatePresence>
        {touched && errorCount > 0 && (
          <motion.div role="alert" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-3 overflow-hidden rounded-2xl bg-crimson-soft px-4 py-3 text-sm text-crimson-dark">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden /> Please fix {errorCount} field{errorCount > 1 ? "s" : ""} highlighted below.
          </motion.div>
        )}
      </AnimatePresence>

      <Fieldset n="1" title="Student details">
        <Field k="name" label="Student name" errors={errors} className="sm:col-span-2"><input className="field" autoComplete="name" value={v.name ?? ""} onChange={(e) => set("name", e.target.value)} /></Field>
        <Field k="roll" label="Admission number / Roll number" errors={errors}><input className="field" value={v.roll ?? ""} onChange={(e) => set("roll", e.target.value)} /></Field>
        <Field k="phone" label="Student contact number" errors={errors}><input className="field" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" value={v.phone ?? ""} onChange={(e) => set("phone", e.target.value)} /></Field>
        <Field k="email" label="Student email / official Thapar email" hint="Use this same email later to log in to the Resident App." errors={errors} className="sm:col-span-2"><input className="field" type="email" autoComplete="email" value={v.email ?? ""} onChange={(e) => set("email", e.target.value)} /></Field>
        <Field k="dob" label="Date of birth" errors={errors}><input className="field" type="date" value={v.dob ?? ""} onChange={(e) => set("dob", e.target.value)} /></Field>
        <Field k="blood" label="Blood group" errors={errors}>
          <select className="field" value={v.blood ?? ""} onChange={(e) => set("blood", e.target.value)}>
            <option value="">Select</option>{BLOOD_GROUPS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </Field>
      </Fieldset>

      <Fieldset n="2" title="Programme">
        <Field k="course" label="Course" errors={errors}>
          <select className="field" value={v.course ?? ""} onChange={(e) => set("course", e.target.value)}>
            <option value="">Select course</option>{courses.map((k) => <option key={k}>{k}</option>)}
          </select>
        </Field>
        <Field k="branch" label="Branch" hint={!v.course ? "Choose a course first." : undefined} errors={errors}>
          <select className="field disabled:opacity-50" disabled={!v.course} value={v.branch ?? ""} onChange={(e) => set("branch", e.target.value)}>
            <option value="">{v.course ? "Select branch" : "—"}</option>{branches.map((b) => <option key={b}>{b}</option>)}
          </select>
        </Field>
        <Field k="year" label="Year" errors={errors}>
          <select className="field" value={v.year ?? ""} onChange={(e) => set("year", e.target.value)}>
            <option value="">Select</option>{["1", "2", "3", "4", "5"].map((y) => <option key={y} value={y}>Year {y}</option>)}
          </select>
        </Field>
      </Fieldset>

      <Fieldset n="3" title="Parent details">
        <Field k="father" label="Father’s name" errors={errors}><input className="field" value={v.father ?? ""} onChange={(e) => set("father", e.target.value)} /></Field>
        <Field k="fatherPhone" label="Father’s contact number" errors={errors}><input className="field" inputMode="tel" value={v.fatherPhone ?? ""} onChange={(e) => set("fatherPhone", e.target.value)} /></Field>
        <Field k="fatherEmail" label="Father’s email" optional errors={errors} className="sm:col-span-2"><input className="field" type="email" value={v.fatherEmail ?? ""} onChange={(e) => set("fatherEmail", e.target.value)} /></Field>
        <Field k="mother" label="Mother’s name" errors={errors}><input className="field" value={v.mother ?? ""} onChange={(e) => set("mother", e.target.value)} /></Field>
        <Field k="motherPhone" label="Mother’s contact number" errors={errors}><input className="field" inputMode="tel" value={v.motherPhone ?? ""} onChange={(e) => set("motherPhone", e.target.value)} /></Field>
        <Field k="motherEmail" label="Mother’s email" optional errors={errors} className="sm:col-span-2"><input className="field" type="email" value={v.motherEmail ?? ""} onChange={(e) => set("motherEmail", e.target.value)} /></Field>
        <Field k="address" label="Permanent / home address" errors={errors} className="sm:col-span-2"><textarea rows={3} className="field" autoComplete="street-address" value={v.address ?? ""} onChange={(e) => set("address", e.target.value)} /></Field>
      </Fieldset>

      <Fieldset n="4" title="Documents">
        <FileField k="admission" label="Admission letter" required file={files.admission} errors={errors}
          onChange={(f) => { setFiles((s) => ({ ...s, admission: f })); setErrors((e) => ({ ...e, admission: "" })); }}
          setError={(m) => setErrors((e) => ({ ...e, admission: m }))} className="sm:col-span-2" />

        {c.jrfDocuments && (
          <div data-field="jrf" className="sm:col-span-2">
            <p className="field-label">Are you a JRF student?</p>
            <div className="flex gap-2" role="radiogroup" aria-label="Are you a JRF student?">
              {["yes", "no"].map((o) => (
                <label key={o} className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-semibold capitalize transition ${v.jrf === o ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink/40"}`}>
                  <input type="radio" name="jrf" value={o} className="sr-only" checked={v.jrf === o} onChange={() => set("jrf", o)} />{o}
                </label>
              ))}
            </div>
            {errors.jrf && <p className="mt-1.5 text-sm text-crimson">{errors.jrf}</p>}
            <p className="mt-2 text-xs text-ink-muted">Only PhD students who are JRF scholars upload a JRF Letter and HRA (House Rent Allowance) Certificate.</p>
          </div>
        )}
        <AnimatePresence initial={false}>
          {isJrf && (
            <motion.div key="jrf-files" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: EASE }}
              className="grid gap-5 overflow-hidden sm:col-span-2 sm:grid-cols-2">
              <FileField k="jrfFile" label="JRF Letter" required file={files.jrf} errors={errors}
                onChange={(f) => { setFiles((s) => ({ ...s, jrf: f })); setErrors((e) => ({ ...e, jrfFile: "" })); }}
                setError={(m) => setErrors((e) => ({ ...e, jrfFile: m }))} />
              <FileField k="hraFile" label="HRA Certificate" required file={files.hra} errors={errors}
                onChange={(f) => { setFiles((s) => ({ ...s, hra: f })); setErrors((e) => ({ ...e, hraFile: "" })); }}
                setError={(m) => setErrors((e) => ({ ...e, hraFile: m }))} />
            </motion.div>
          )}
        </AnimatePresence>
      </Fieldset>

      <div data-field="declare" className="rounded-2xl border border-line bg-white p-5">
        <label className="flex cursor-pointer gap-3 text-sm leading-6 text-ink-soft">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-crimson" checked={v.declare === "yes"} onChange={(e) => set("declare", e.target.checked ? "yes" : "")} />
          I confirm the details above are correct. I understand that hostel and room allocation is subject to availability and applicable Institute rules, and that the Student Affairs Office allots both the hostel and the room number.
        </label>
        {errors.declare && <p className="mt-2 text-sm text-crimson">{errors.declare}</p>}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Link href={`/hostel/${c.id}#process`} className="text-sm font-semibold text-ink-soft hover:text-ink">Cancel and return to guide</Link>
        <button type="submit" disabled={state === "submitting"} className="btn-primary justify-center !px-8 !py-3 disabled:opacity-70">
          {state === "submitting" ? <><Loader2 className="h-4 w-4 animate-spin" /> Checking your details…</> : "Submit hostel application"}
        </button>
      </div>
    </form>
  );
}

function Fieldset({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <fieldset className="grid gap-x-5 gap-y-5 md:grid-cols-[12rem_1fr]">
      <legend className="contents">
        <span className="flex items-center gap-3 md:block">
          <span className="font-sans text-xs font-semibold tabular-nums text-crimson">0{n}</span>
          <span className="block font-serif text-xl text-ink md:mt-1">{title}</span>
        </span>
      </legend>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({ k, label, hint, optional, errors, className = "", children }: { k: string; label: string; hint?: string; optional?: boolean; errors: Record<string, string>; className?: string; children: ReactNode }) {
  const err = errors[k];
  return (
    <div data-field={k} className={`${className} ${err ? "[&_.field]:!border-crimson" : ""}`}>
      <label className="field-label">
        {label} {optional ? <span className="font-normal text-ink-muted">(optional)</span> : <span className="text-crimson" aria-hidden>*</span>}
        <span className="mt-1.5 block font-normal">{children}</span>
      </label>
      {hint && !err && <p className="mt-1.5 text-xs text-ink-muted">{hint}</p>}
      {err && <p className="mt-1.5 text-sm text-crimson">{err}</p>}
    </div>
  );
}

function FileField({ k, label, required, file, onChange, setError, errors, className = "" }: {
  k: string; label: string; required?: boolean; file: File | null; onChange: (f: File | null) => void; setError: (m: string) => void; errors: Record<string, string>; className?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const pick = (f?: File | null) => {
    if (!f) return;
    if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) { setError("Only PDF files are accepted."); return; }
    if (f.size > MAX_BYTES) { setError(`File is ${(f.size / 1048576).toFixed(1)} MB — the maximum is 10 MB.`); return; }
    onChange(f);
  };
  const err = errors[k];
  return (
    <div data-field={k} className={className}>
      <p className="field-label">{label} {required && <span className="text-crimson" aria-hidden>*</span>} <span className="font-normal text-ink-muted">· PDF, max 10 MB</span></p>
      {file ? (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-3">
          <span className="flex min-w-0 items-center gap-2.5 text-sm"><Paperclip className="h-4 w-4 shrink-0 text-crimson" aria-hidden /><span className="truncate font-medium text-ink">{file.name}</span><span className="shrink-0 text-ink-muted">{(file.size / 1048576).toFixed(2)} MB</span></span>
          <button type="button" onClick={() => onChange(null)} aria-label={`Remove ${label}`} className="rounded-full p-1 text-ink-muted hover:bg-cream hover:text-ink"><X className="h-4 w-4" /></button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files?.[0]); }}
          className={`flex w-full flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed px-4 py-7 text-sm transition ${drag ? "border-crimson bg-crimson-soft/40" : err ? "border-crimson/60 bg-white" : "border-line bg-white hover:border-ink/30"}`}
        >
          <FileUp className="h-5 w-5 text-ink-muted" aria-hidden />
          <span className="font-semibold text-ink">Choose a PDF</span>
          <span className="text-xs text-ink-muted">or drag and drop it here</span>
        </button>
      )}
      <input ref={ref} type="file" accept="application/pdf,.pdf" className="sr-only" tabIndex={-1} onChange={(e) => { pick(e.target.files?.[0]); e.target.value = ""; }} />
      {err && <p className="mt-1.5 text-sm text-crimson">{err}</p>}
    </div>
  );
}
