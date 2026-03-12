// ─────────────────────────────────────────────
//  SuccessConfirmation
//  Confirmation popup shown after a donor is
//  successfully added. Auto-dismisses after 5s.
//
//  Props:
//    isOpen     {boolean}  — controls visibility
//    donorName  {string}   — name to display in body
//    onClose    {function} — called on dismiss
// ─────────────────────────────────────────────

const DISMISS_AFTER_MS = 5000; // 5 seconds

export function SuccessConfirmation({ isOpen, donorName, onClose }) {
  const { useEffect, useState, useRef } = React;

  // ── Countdown timer ──────────────────────────
  const [remaining, setRemaining] = useState(DISMISS_AFTER_MS);
  const intervalRef = useRef(null);
  const startRef    = useRef(null);

  // Reset + start interval whenever modal opens
  useEffect(() => {
    if (!isOpen) {
      setRemaining(DISMISS_AFTER_MS);
      return;
    }
    startRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const left    = Math.max(0, DISMISS_AFTER_MS - elapsed);
      setRemaining(left);
      if (left === 0) {
        clearInterval(intervalRef.current);
        onClose();
      }
    }, 50); // 50ms tick for smooth ring animation

    return () => clearInterval(intervalRef.current);
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = e => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // ── Countdown ring math ───────────────────────
  const RADIUS   = 18;
  const CIRC     = 2 * Math.PI * RADIUS;          // full circle circumference
  const pct      = remaining / DISMISS_AFTER_MS;  // 1 → 0
  const dashOff  = CIRC * (1 - pct);              // increases as time runs out
  const secLabel = Math.ceil(remaining / 1000);

  // ── Status chips ─────────────────────────────
  const chips = [
    { label: "Profile Created", color: "#16A34A", bg: "#F0FDF4" },
    { label: "Record Saved",    color: "#2563EB", bg: "#EFF6FF" },
    { label: "System Updated",  color: "#7C3AED", bg: "#F5F3FF" },
  ];

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 500,
          background: "rgba(17,24,39,0.55)",
          backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: "scFadeIn 0.2s ease",
        }}
      >
        {/* ── Panel — 550px fixed, height by content ── */}
        <div
          onClick={e => e.stopPropagation()}
          style={{
            width: 550,
            maxWidth: "calc(100vw - 32px)",
            background: "#FFFFFF",
            borderRadius: 20,
            boxShadow: "0 32px 80px rgba(0,0,0,0.18), 0 4px 20px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "44px 40px 36px",
            position: "relative",
            animation: "scSlideUp 0.25s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Close button — top-left */}
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 16, left: 16,
              width: 30, height: 30, borderRadius: 8,
              border: "1px solid #E5E7EB", background: "#F9FAFB",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#6B7280",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#F3F4F6"}
            onMouseLeave={e => e.currentTarget.style.background = "#F9FAFB"}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6"  y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* Countdown ring — top-right */}
          <div style={{
            position: "absolute", top: 14, right: 14,
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 48, height: 48,
          }}>
            <svg width="48" height="48" style={{ position: "absolute", transform: "rotate(-90deg)" }}>
              {/* Track */}
              <circle cx="24" cy="24" r={RADIUS} fill="none" stroke="#E5E7EB" strokeWidth="3" />
              {/* Progress arc — depletes as time runs out */}
              <circle
                cx="24" cy="24" r={RADIUS}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={dashOff}
                style={{ transition: "stroke-dashoffset 0.05s linear" }}
              />
            </svg>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#3B82F6", zIndex: 1 }}>
              {secLabel}
            </span>
          </div>

          {/* Lottie animation */}
          <div style={{ width: 160, height: 160, marginBottom: 4 }}>
            <dotlottie-player
              src="https://lottie.host/2563cd5e-8929-408a-9abf-6f6032e9893d/9l6XSCjcNX.lottie"
              background="transparent"
              speed="1"
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          {/* Heading */}
          <h2 style={{
            fontSize: 22, fontWeight: 700, color: "#111827",
            letterSpacing: "-0.3px", margin: "0 0 10px",
            textAlign: "center", lineHeight: 1.3,
          }}>
            Donor Added Successfully!
          </h2>

          {/* Subheading */}
          <p style={{
            fontSize: 14, color: "#6B7280",
            textAlign: "center", margin: "0 0 26px",
            lineHeight: 1.65, maxWidth: 390,
          }}>
            <strong style={{ color: "#374151", fontWeight: 600 }}>
              {donorName || "The new donor"}
            </strong>{" "}
            has been registered and added to the donor management system.
            You can now track and manage their case.
          </p>

          {/* Divider */}
          <div style={{ width: "100%", height: 1, background: "#F3F4F6", marginBottom: 22 }} />

          {/* Status chips */}
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "center", gap: 12,
            marginBottom: 26, width: "100%",
          }}>
            {chips.map(chip => (
              <div key={chip.label} style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "7px 14px", borderRadius: 8, background: chip.bg,
              }}>
                <span style={{
                  width: 18, height: 18, borderRadius: "50%",
                  background: chip.color, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 800, flexShrink: 0,
                }}>✓</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: chip.color }}>
                  {chip.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: 12, width: "100%" }}>
            <button
              onClick={onClose}
              style={{
                flex: 1, padding: "11px 0", borderRadius: 10,
                border: "1px solid #E5E7EB", background: "#fff",
                fontSize: 14, fontWeight: 500, color: "#374151",
                cursor: "pointer", fontFamily: "inherit",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
              onMouseLeave={e => e.currentTarget.style.background = "#fff"}
            >
              Close
            </button>
            <button
              onClick={onClose}
              style={{
                flex: 2, padding: "11px 0", borderRadius: 10,
                border: "none", background: "#3B82F6",
                fontSize: 14, fontWeight: 600, color: "#fff",
                cursor: "pointer", fontFamily: "inherit",
                boxShadow: "0 2px 8px rgba(59,130,246,0.3)",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#2563EB"}
              onMouseLeave={e => e.currentTarget.style.background = "#3B82F6"}
            >
              View Donor Record
            </button>
          </div>

          {/* Auto-dismiss hint */}
          <p style={{ marginTop: 14, fontSize: 11, color: "#9CA3AF", textAlign: "center" }}>
            This popup closes automatically in{" "}
            <strong style={{ color: "#6B7280" }}>{secLabel}s</strong>
          </p>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes scFadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes scSlideUp {
          from { opacity:0; transform:translateY(24px) scale(0.96) }
          to   { opacity:1; transform:translateY(0)    scale(1)    }
        }
      `}</style>
    </>
  );
}
