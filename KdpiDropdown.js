// ─────────────────────────────────────────────
//  KdpiDropdown — dual-handle range picker
// ─────────────────────────────────────────────

export function KdpiDropdown({ kdpiMin, kdpiMax, setKdpiMin, setKdpiMax, onClose }) {
  return (
    <div style={{
      position: "absolute", top: "calc(100% + 6px)", right: 0, zIndex: 200,
      background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10,
      padding: "16px 18px", width: 276,
      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 14 }}>KDPI Range Filter</div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 2 }}>MIN</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#3B82F6" }}>{kdpiMin}%</div>
        </div>
        <div style={{ alignSelf: "center", color: "#D1D5DB" }}>—</div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 2 }}>MAX</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#3B82F6" }}>{kdpiMax}%</div>
        </div>
      </div>
      <div style={{ position: "relative", height: 32, display: "flex", alignItems: "center", marginBottom: 6 }}>
        <div style={{ position: "absolute", left: 0, right: 0, height: 4, borderRadius: 2, background: "#E5E7EB" }} />
        <div style={{ position: "absolute", left: `${kdpiMin}%`, right: `${100 - kdpiMax}%`, height: 4, borderRadius: 2, background: "#3B82F6" }} />
        <input type="range" min={0} max={100} value={kdpiMin}
          onChange={e => setKdpiMin(Math.min(Number(e.target.value), kdpiMax - 1))}
          style={{ position: "absolute", width: "100%", opacity: 0, cursor: "pointer", height: 32, zIndex: 2 }} />
        <input type="range" min={0} max={100} value={kdpiMax}
          onChange={e => setKdpiMax(Math.max(Number(e.target.value), kdpiMin + 1))}
          style={{ position: "absolute", width: "100%", opacity: 0, cursor: "pointer", height: 32, zIndex: 3 }} />
        <div style={{ position: "absolute", left: `${kdpiMin}%`, transform: "translateX(-50%)", width: 14, height: 14, borderRadius: "50%", background: "#fff", border: "2px solid #3B82F6", boxShadow: "0 1px 4px rgba(0,0,0,0.15)", zIndex: 1, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: `${kdpiMax}%`, transform: "translateX(-50%)", width: 14, height: 14, borderRadius: "50%", background: "#fff", border: "2px solid #3B82F6", boxShadow: "0 1px 4px rgba(0,0,0,0.15)", zIndex: 1, pointerEvents: "none" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#D1D5DB", marginBottom: 14 }}>
        <span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span>
      </div>
      <button onClick={onClose} style={{
        width: "100%", padding: "8px", borderRadius: 7,
        background: "#3B82F6", color: "#fff", border: "none", cursor: "pointer",
        fontSize: 13, fontWeight: 500, fontFamily: "inherit",
      }}>Apply Filter</button>
    </div>
  );
}
