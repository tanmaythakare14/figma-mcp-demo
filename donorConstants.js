// ─────────────────────────────────────────────
//  DONOR CONSTANTS
//  All static config, enums, field definitions
// ─────────────────────────────────────────────

export const STATUS_CONFIG = {
  "In Progress":      { bg: "#EFF6FF", color: "#2563EB", dot: "#3B82F6" },
  "Alert Accepted":   { bg: "#F0FDF4", color: "#16A34A", dot: "#22C55E" },
  "Alert Unaccepted": { bg: "#FFF7ED", color: "#C2410C", dot: "#F97316" },
  "Draft":            { bg: "#F9FAFB", color: "#6B7280", dot: "#9CA3AF" },
};

export const DONOR_STATUS_OPTIONS = [
  "In Progress",
  "Alert Accepted",
  "Alert Unaccepted",
  "Draft",
];

export const SEX_OPTIONS = ["Male", "Female", "Other"];

export const GENDER_OPTIONS = [
  "Male",
  "Female",
  "Non-binary",
  "Transgender Male",
  "Transgender Female",
  "Prefer not to say",
  "Other",
];

export const BLOOD_TYPE_OPTIONS = [
  "A+", "A−",
  "B+", "B−",
  "AB+", "AB−",
  "O+", "O−",
];

export const ALERT_SENT_OPTIONS = ["Yes", "No"];

export const NAV_ITEMS = [
  { label: "Dashboard",       icon: "grid"      },
  { label: "Donor Management",icon: "users"     },
  { label: "Organ Allocation", icon: "heart"    },
  { label: "Match Reports",   icon: "activity"  },
  { label: "Alerts",          icon: "bell",  badge: 3 },
  { label: "Analytics",       icon: "bar-chart" },
  { label: "Settings",        icon: "settings"  },
];

export const TABLE_HEADERS = [
  "Donor ID",
  "UNOS ID",
  "Match ID",
  "Age / Sex",
  "KDPI",
  "Alert Sent",
  "Center Responses",
  "Last Updated",
  "Status",
];

export const TABS = [
  "All Donors",
  "Active Donors",
  "Pending Review",
  "Completed",
];

export const DAY_FILTER_OPTIONS = [
  "Today",
  "Last 7 Days",
  "Last 30 Days",
  "Last 90 Days",
];

export const ROWS_PER_PAGE = 8;

// ── Add Donor form field definitions ──────────
// Each field: { id, label, placeholder, type, options?, required, colSpan? }
export const ADD_DONOR_FIELDS = [
  {
    id: "fullName",
    label: "Donor's Full Name",
    placeholder: "e.g. John A. Smith",
    type: "text",
    required: true,
  },
  {
    id: "age",
    label: "Donor's Age",
    placeholder: "e.g. 34",
    type: "number",
    required: true,
    min: 1,
    max: 120,
  },
  {
    id: "email",
    label: "Email Address",
    placeholder: "e.g. donor@hospital.org",
    type: "email",
    required: true,
  },
  {
    id: "unosId",
    label: "UNOS ID",
    placeholder: "e.g. UNO-748291",
    type: "text",
    required: true,
  },
  {
    id: "sex",
    label: "Sex",
    placeholder: "Select sex",
    type: "select",
    options: SEX_OPTIONS,
    required: true,
  },
  {
    id: "gender",
    label: "Gender",
    placeholder: "Select gender identity",
    type: "select",
    options: GENDER_OPTIONS,
    required: false,
  },
  {
    id: "bloodType",
    label: "Blood Type",
    placeholder: "Select blood type",
    type: "select",
    options: BLOOD_TYPE_OPTIONS,
    required: true,
  },
  {
    id: "kdpi",
    label: "KDPI Score (%)",
    placeholder: "e.g. 42",
    type: "number",
    required: true,
    min: 0,
    max: 100,
  },
  {
    id: "matchId",
    label: "Match ID",
    placeholder: "e.g. MCH-3821",
    type: "text",
    required: false,
  },
  {
    id: "alertSent",
    label: "Alert Sent",
    placeholder: "Select",
    type: "select",
    options: ALERT_SENT_OPTIONS,
    required: false,
  },
  {
    id: "centerResponses",
    label: "Center Responses",
    placeholder: "e.g. 3/5",
    type: "text",
    required: false,
  },
  {
    id: "status",
    label: "Status",
    placeholder: "Select status",
    type: "select",
    options: DONOR_STATUS_OPTIONS,
    required: true,
  },
  {
    id: "notes",
    label: "Clinical Notes",
    placeholder: "Any additional notes for this donor case...",
    type: "textarea",
    required: false,
    colSpan: 2,        // spans both columns
  },
];

export const INITIAL_DONOR_FORM = ADD_DONOR_FIELDS.reduce((acc, field) => {
  acc[field.id] = "";
  return acc;
}, {});
