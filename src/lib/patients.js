/**
 * Normalization helpers for the Coalition Technologies Patient Data API response.
 * API docs: https://documenter.getpostman.com/view/11861104/2sA35G42ve
 */

const TARGET_PATIENT = 'Jessica Taylor';

/** Accept a raw array or { patients: [...] } / { data: [...] } wrapper */
export function extractPatientList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.patients)) return payload.patients;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

/** Find a patient by name (case-insensitive, trimmed) */
export function findPatientByName(payload, name = TARGET_PATIENT) {
  const list = extractPatientList(payload);
  return (
    list.find(
      (p) => (p?.name ?? '').trim().toLowerCase() === name.trim().toLowerCase()
    ) ?? null
  );
}

/**
 * Diagnosis history in chronological order (oldest first).
 * The API returns newest first, so we reverse for a left-to-right chart.
 */
export function getDiagnosisHistory(patient) {
  const raw = patient?.diagnosis_history ?? [];
  return [...raw].reverse();
}

/** Most recent diagnosis entry — used for the vitals row */
export function getLatestVitals(patient) {
  const history = patient?.diagnosis_history ?? [];
  return history[0] ?? null;
}

export function getDiagnosticList(patient) {
  return patient?.diagnostic_list ?? [];
}

export function getLabResults(patient) {
  return patient?.lab_results ?? [];
}

/**
 * Format a month + year pair from the API into a short label, e.g. "Mar, 2024"
 * The API uses full month names like "March".
 */
export function formatMonthYear(month, year) {
  if (!month) return year ? String(year) : '';
  const short = String(month).slice(0, 3);
  return year ? `${short}, ${year}` : short;
}

/** Format a date-of-birth string to "MMM DD, YYYY" */
export function formatDate(dateString) {
  if (!dateString) return '—';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/** Calculate age from a date-of-birth string */
export function calculateAge(dateOfBirth) {
  if (!dateOfBirth) return null;
  const dob = new Date(dateOfBirth);
  if (Number.isNaN(dob.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age -= 1;
  return age;
}
