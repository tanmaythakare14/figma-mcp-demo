// ─────────────────────────────────────────────
//  KpiCard — stat card for the dashboard header
// ─────────────────────────────────────────────

export function KpiCard({ title, subtitle, value, icon, iconBg, iconColor, trend, trendUp }) {
  const { Icon } = window.__COMPONENTS__;
  return (
    <div style={{
      background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 12,
      padding: "18px 20px 16px", boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 14,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", letterSpacing: "-0.1px", marginBottom: 2, lineHeight: 1.3 }}>{title}</div>
          <div style={{ fontSize: 11, fontWeight: 400, color: "#9CA3AF", lineHeight: 1.4 }}>{subtitle}</div>
        </div>
        <div style={{ width: 38, height: 38, borderRadius: 9, backgroundColor: iconBg, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={icon} size={16} color={iconColor} />
        </div>
      </div>
      <div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "#111827", letterSpacing: "-0.5px", lineHeight: 1, marginBottom: 6 }}>{value}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Icon name={trendUp ? "trending-up" : "trending-down"} size={13} color={trendUp ? "#16A34A" : "#DC2626"} />
          <span style={{ fontSize: 12, fontWeight: 500, color: trendUp ? "#16A34A" : "#DC2626" }}>{trend}</span>
          <span style={{ fontSize: 12, color: "#9CA3AF" }}>vs last year</span>
        </div>
      </div>
    </div>
  );
}
