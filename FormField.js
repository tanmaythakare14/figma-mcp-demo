// ─────────────────────────────────────────────
//  FormField — reusable labeled input/select/textarea
//  Renders itself according to field.type
// ─────────────────────────────────────────────

export function FormField({ field, value, onChange, error }) {
  const baseInput = {
    width: "100%",
    padding: "9px 12px",
    border: `1px solid ${error ? "#FCA5A5" : "#E5E7EB"}`,
    borderRadius: 8,
    fontSize: 13,
    color: "#111827",
    background: error ? "#FFF5F5" : "#F9FAFB",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
    transition: "border-color 0.15s, box-shadow 0.15s",
    appearance: "none",
    WebkitAppearance: "none",
  };

  const focusStyle = {
    borderColor: "#3B82F6",
    boxShadow: "0 0 0 3px rgba(59,130,246,0.12)",
    background: "#fff",
  };

  function handleFocus(e) {
    Object.assign(e.target.style, focusStyle);
  }
  function handleBlur(e) {
    e.target.style.borderColor = error ? "#FCA5A5" : "#E5E7EB";
    e.target.style.boxShadow   = "none";
    e.target.style.background  = error ? "#FFF5F5" : "#F9FAFB";
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {/* Label */}
      <label style={{
        fontSize: 12, fontWeight: 600, color: "#374151",
        display: "flex", alignItems: "center", gap: 3,
        letterSpacing: "-0.05px",
      }}>
        {field.label}
        {field.required && (
          <span style={{ color: "#EF4444", fontSize: 12 }}>*</span>
        )}
      </label>

      {/* Input / Select / Textarea */}
      {field.type === "textarea" ? (
        <textarea
          value={value}
          onChange={e => onChange(field.id, e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={field.placeholder}
          rows={3}
          style={{
            ...baseInput,
            resize: "vertical",
            minHeight: 80,
            lineHeight: 1.5,
          }}
        />
      ) : field.type === "select" ? (
        <div style={{ position: "relative" }}>
          <select
            value={value}
            onChange={e => onChange(field.id, e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              ...baseInput,
              paddingRight: 32,
              cursor: "pointer",
              color: value ? "#111827" : "#9CA3AF",
            }}
          >
            <option value="" disabled>{field.placeholder}</option>
            {field.options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {/* Chevron icon overlay */}
          <span style={{
            position: "absolute", right: 10, top: "50%",
            transform: "translateY(-50%)", pointerEvents: "none",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </span>
        </div>
      ) : (
        <input
          type={field.type}
          value={value}
          onChange={e => onChange(field.id, e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={field.placeholder}
          min={field.min}
          max={field.max}
          style={baseInput}
        />
      )}

      {/* Inline error */}
      {error && (
        <span style={{ fontSize: 11, color: "#EF4444", display: "flex", alignItems: "center", gap: 3 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
            stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}
