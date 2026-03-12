// ─────────────────────────────────────────────
//  AddDonorModal
//  A 742px-wide popup for registering a new donor.
//  Uses FormField, constants, and utils.
// ─────────────────────────────────────────────

export function AddDonorModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  const { useState, useEffect, useCallback } = React;

  // Pull from globals (inlined by index.html build)
  const { ADD_DONOR_FIELDS, INITIAL_DONOR_FORM } = window.__CONSTANTS__;
  const { validateDonorForm, mapFormToDonorRow }  = window.__UTILS__;
  const { FormField }                             = window.__COMPONENTS__;

  const [formValues, setFormValues] = useState({ ...INITIAL_DONOR_FORM });
  const [errors, setErrors]         = useState({});
  const [submitted, setSubmitted]   = useState(false);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormValues({ ...INITIAL_DONOR_FORM });
      setErrors({});
      setSubmitted(false);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = e => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleChange = useCallback((id, value) => {
    setFormValues(prev => ({ ...prev, [id]: value }));
    if (submitted) {
      // Live-validate on change after first submit attempt
      const field = ADD_DONOR_FIELDS.find(f => f.id === id);
      if (field) {
        const err = window.__UTILS__.validateField(field, value);
        setErrors(prev => ({ ...prev, [id]: err }));
      }
    }
  }, [submitted]);

  const handleSubmit = () => {
    const errs = validateDonorForm(formValues, ADD_DONOR_FIELDS);
    setErrors(errs);
    setSubmitted(true);
    if (Object.keys(errs).length > 0) return;
    const newDonor = mapFormToDonorRow(formValues);
    onSubmit(newDonor);
    onClose();
  };

  const requiredCount  = ADD_DONOR_FIELDS.filter(f => f.required).length;
  const filledRequired = ADD_DONOR_FIELDS.filter(f => f.required && formValues[f.id]?.toString().trim()).length;
  const progressPct    = Math.round((filledRequired / requiredCount) * 100);

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 300,
          background: "rgba(17,24,39,0.45)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "24px",
          animation: "fadeIn 0.15s ease",
        }}
      >
        {/* ── Modal panel (742px wide, dynamic height) ── */}
        <div
          onClick={e => e.stopPropagation()}
          style={{
            width: 742,
            maxWidth: "100%",
            maxHeight: "calc(100vh - 48px)",
            background: "#FFFFFF",
            borderRadius: 14,
            boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "slideUp 0.18s ease",
          }}
        >
          {/* ── Modal Header ── */}
          <div style={{
            padding: "22px 28px 18px",
            borderBottom: "1px solid #E5E7EB",
            flexShrink: 0,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: "#EFF6FF", border: "1px solid #BFDBFE",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                  stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <line x1="20" y1="8" x2="20" y2="14"/>
                  <line x1="23" y1="11" x2="17" y2="11"/>
                </svg>
              </div>
              <div>
                <h2 style={{
                  fontSize: 17, fontWeight: 600, color: "#111827",
                  letterSpacing: "-0.2px", margin: 0, lineHeight: 1.3,
                }}>Add New Donor</h2>
                <p style={{
                  fontSize: 13, fontWeight: 500, color: "#6B7280",
                  margin: 0, lineHeight: 1.4, marginTop: 2,
                }}>Enter the details for the new donor registration.</p>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                width: 32, height: 32, borderRadius: 8,
                border: "1px solid #E5E7EB", background: "#F9FAFB",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", flexShrink: 0, color: "#6B7280",
                transition: "all 0.12s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#F3F4F6"; e.currentTarget.style.color = "#111827"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#F9FAFB"; e.currentTarget.style.color = "#6B7280"; }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* ── Progress bar ── */}
          <div style={{ height: 3, background: "#F3F4F6", flexShrink: 0 }}>
            <div style={{
              height: "100%", background: "#3B82F6", borderRadius: "0 2px 2px 0",
              width: `${progressPct}%`, transition: "width 0.3s ease",
            }} />
          </div>

          {/* ── Scrollable form body ── */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "24px 28px",
            scrollbarWidth: "thin",
            scrollbarColor: "#E5E7EB transparent",
          }}>
            {/* Section label */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8, marginBottom: 18,
            }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                Donor Information
              </span>
              <div style={{ flex: 1, height: 1, background: "#F3F4F6" }} />
              <span style={{ fontSize: 11, color: "#9CA3AF" }}>
                {filledRequired}/{requiredCount} required fields
              </span>
            </div>

            {/* 2×2 grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px 20px",
            }}>
              {ADD_DONOR_FIELDS.map(field => (
                <div
                  key={field.id}
                  style={{ gridColumn: field.colSpan === 2 ? "1 / -1" : "auto" }}
                >
                  <FormField
                    field={field}
                    value={formValues[field.id] ?? ""}
                    onChange={handleChange}
                    error={errors[field.id] || null}
                  />
                </div>
              ))}
            </div>

            {/* Global error summary */}
            {submitted && Object.keys(errors).length > 0 && (
              <div style={{
                marginTop: 18, padding: "10px 14px", borderRadius: 8,
                background: "#FEF2F2", border: "1px solid #FECACA",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span style={{ fontSize: 12, color: "#DC2626", fontWeight: 500 }}>
                  Please fix {Object.keys(errors).length} error{Object.keys(errors).length > 1 ? "s" : ""} before submitting.
                </span>
              </div>
            )}
          </div>

          {/* ── Modal Footer ── */}
          <div style={{
            padding: "16px 28px",
            borderTop: "1px solid #E5E7EB",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#FAFAFA",
          }}>
            <span style={{ fontSize: 12, color: "#9CA3AF" }}>
              <span style={{ color: "#EF4444" }}>*</span> Required fields
            </span>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={onClose}
                style={{
                  padding: "9px 20px", borderRadius: 8,
                  border: "1px solid #E5E7EB", background: "#fff",
                  fontSize: 13, fontWeight: 500, color: "#374151",
                  cursor: "pointer", fontFamily: "inherit",
                  transition: "background 0.12s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "9px 20px", borderRadius: 8,
                  border: "none", background: "#3B82F6",
                  fontSize: 13, fontWeight: 500, color: "#fff",
                  cursor: "pointer", fontFamily: "inherit",
                  boxShadow: "0 1px 3px rgba(59,130,246,0.35)",
                  transition: "background 0.12s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#2563EB"}
                onMouseLeave={e => e.currentTarget.style.background = "#3B82F6"}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Add Donor
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Keyframe animations (injected once) ── */}
      <style>{`
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        select option { color: #111827; }
      `}</style>
    </>
  );
}
