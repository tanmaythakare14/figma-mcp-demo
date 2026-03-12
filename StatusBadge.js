// ─────────────────────────────────────────────
//  StatusBadge — pill badge for donor status
// ─────────────────────────────────────────────

export function StatusBadge({ status }) {
  const { STATUS_CONFIG } = window.__CONSTANTS__;
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["Draft"];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 10px", borderRadius: 999,
      backgroundColor: cfg.bg, color: cfg.color,
      fontSize: 12, fontWeight: 500, whiteSpace: "nowrap",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: cfg.dot, flexShrink: 0 }} />
      {status}
    </span>
  );
}
