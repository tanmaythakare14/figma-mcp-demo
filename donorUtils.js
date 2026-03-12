// ─────────────────────────────────────────────
//  DONOR UTILITIES
//  Pure helper functions — no side effects
// ─────────────────────────────────────────────

/**
 * Generate a new donor ID in the format DNR-YYYY-XXXX
 * based on the current year and a random suffix.
 */
export function generateDonorId() {
  const year   = new Date().getFullYear();
  const suffix = String(Math.floor(Math.random() * 9000) + 1000);
  return `DNR-${year}-${suffix}`;
}

/**
 * Format an age + sex value for table display.
 * @param {number|string} age
 * @param {string} sex  "Male" | "Female" | "Other"
 * @returns {string}  e.g. "34 / M"
 */
export function formatAgeSex(age, sex) {
  const abbr = sex === "Male" ? "M" : sex === "Female" ? "F" : "O";
  return `${age} / ${abbr}`;
}

/**
 * Get the relative "last updated" label for newly added donors.
 */
export function getRelativeTime() {
  return "Just now";
}

// ── Form validation ────────────────────────────

/**
 * Validate a single field value.
 * Returns an error string or null if valid.
 * @param {object} field  — field config from ADD_DONOR_FIELDS
 * @param {string} value  — current field value
 */
export function validateField(field, value) {
  if (field.required && !value.toString().trim()) {
    return `${field.label} is required.`;
  }
  if (field.type === "number" && value !== "") {
    const num = Number(value);
    if (isNaN(num))            return "Must be a valid number.";
    if (field.min !== undefined && num < field.min)
      return `Must be at least ${field.min}.`;
    if (field.max !== undefined && num > field.max)
      return `Must be at most ${field.max}.`;
  }
  if (field.type === "email" && value.trim()) {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(value.trim())) return "Enter a valid email address.";
  }
  return null;
}

/**
 * Validate the entire form.
 * Returns an object { fieldId: errorString } for every invalid field.
 * An empty object means the form is valid.
 *
 * @param {object} formValues  — { [fieldId]: value }
 * @param {Array}  fields      — ADD_DONOR_FIELDS array
 * @returns {object}
 */
export function validateDonorForm(formValues, fields) {
  const errors = {};
  fields.forEach(field => {
    const err = validateField(field, formValues[field.id] ?? "");
    if (err) errors[field.id] = err;
  });
  return errors;
}

/**
 * Map form values to a table-ready donor row object.
 * @param {object} formValues
 * @returns {object}
 */
export function mapFormToDonorRow(formValues) {
  return {
    id:              generateDonorId(),
    unos:            formValues.unosId     || "—",
    match:           formValues.matchId    || "—",
    age:             Number(formValues.age) || 0,
    sex:             formValues.sex === "Male" ? "M" : formValues.sex === "Female" ? "F" : "O",
    kdpi:            Number(formValues.kdpi) || 0,
    status:          formValues.status     || "Draft",
    alertSent:       formValues.alertSent  || "No",
    centerResponses: formValues.centerResponses || "0/5",
    lastUpdated:     getRelativeTime(),
    // extra fields stored for detail view
    fullName:        formValues.fullName,
    email:           formValues.email,
    bloodType:       formValues.bloodType,
    gender:          formValues.gender,
    notes:           formValues.notes,
  };
}

/**
 * Derive tab counts from a donor array.
 * @param {Array} donors
 * @returns {object}
 */
export function getDonorTabCounts(donors) {
  return {
    "All Donors":     donors.length,
    "Active Donors":  donors.filter(d => d.status === "In Progress").length,
    "Pending Review": donors.filter(d => d.status === "Draft").length,
    "Completed":      donors.filter(d =>
      d.status === "Alert Accepted" || d.status === "Alert Unaccepted"
    ).length,
  };
}

/**
 * Filter donors by tab, search string, and KDPI range.
 */
export function filterDonors(donors, { activeTab, search, kdpiMin, kdpiMax }) {
  return donors.filter(d => {
    const matchSearch =
      search === "" ||
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.unos.toLowerCase().includes(search.toLowerCase());

    const matchTab =
      activeTab === "All Donors"     ? true :
      activeTab === "Active Donors"  ? d.status === "In Progress" :
      activeTab === "Pending Review" ? d.status === "Draft" :
      d.status === "Alert Accepted"  || d.status === "Alert Unaccepted";

    const matchKdpi = d.kdpi >= kdpiMin && d.kdpi <= kdpiMax;

    return matchSearch && matchTab && matchKdpi;
  });
}
