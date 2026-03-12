// ─────────────────────────────────────────────
//  DonorDashboard — main dashboard view
//  Composes: Sidebar, Topbar, KpiCards, 
//            FilterBar, DonorTable, AddDonorModal
// ─────────────────────────────────────────────

function DonorDashboard() {
  const { useState } = React;

  // Pull globals registered by index.html
  const {
    NAV_ITEMS, TABLE_HEADERS, TABS, DAY_FILTER_OPTIONS,
    ROWS_PER_PAGE,
  } = window.__CONSTANTS__;

  const { filterDonors, getDonorTabCounts } = window.__UTILS__;

  const {
    Icon, StatusBadge, KpiCard, KdpiDropdown, AddDonorModal,
  } = window.__COMPONENTS__;

  // ── Seed data ───────────────────────────────
  const SEED_DONORS = [
    { id: "DNR-2024-0891", unos: "UNO-748291", match: "MCH-3821", age: 34, sex: "M", kdpi: 18, status: "In Progress",      alertSent: "Yes", centerResponses: "3/5", lastUpdated: "2 min ago"  },
    { id: "DNR-2024-0890", unos: "UNO-748290", match: "MCH-3820", age: 52, sex: "F", kdpi: 67, status: "Alert Accepted",   alertSent: "Yes", centerResponses: "5/5", lastUpdated: "14 min ago" },
    { id: "DNR-2024-0889", unos: "UNO-748289", match: "MCH-3819", age: 28, sex: "M", kdpi: 12, status: "Alert Unaccepted", alertSent: "Yes", centerResponses: "0/5", lastUpdated: "31 min ago" },
    { id: "DNR-2024-0888", unos: "UNO-748288", match: "MCH-3818", age: 61, sex: "F", kdpi: 82, status: "Draft",            alertSent: "No",  centerResponses: "—",   lastUpdated: "1 hr ago"   },
    { id: "DNR-2024-0887", unos: "UNO-748287", match: "MCH-3817", age: 45, sex: "M", kdpi: 44, status: "In Progress",      alertSent: "Yes", centerResponses: "2/5", lastUpdated: "2 hr ago"   },
    { id: "DNR-2024-0886", unos: "UNO-748286", match: "MCH-3816", age: 39, sex: "F", kdpi: 29, status: "Alert Accepted",   alertSent: "Yes", centerResponses: "4/5", lastUpdated: "3 hr ago"   },
    { id: "DNR-2024-0885", unos: "UNO-748285", match: "MCH-3815", age: 57, sex: "M", kdpi: 73, status: "In Progress",      alertSent: "Yes", centerResponses: "1/5", lastUpdated: "5 hr ago"   },
    { id: "DNR-2024-0884", unos: "UNO-748284", match: "MCH-3814", age: 22, sex: "F", kdpi: 8,  status: "Alert Accepted",   alertSent: "Yes", centerResponses: "5/5", lastUpdated: "6 hr ago"   },
    { id: "DNR-2024-0883", unos: "UNO-748283", match: "MCH-3813", age: 48, sex: "M", kdpi: 55, status: "Draft",            alertSent: "No",  centerResponses: "—",   lastUpdated: "8 hr ago"   },
    { id: "DNR-2024-0882", unos: "UNO-748282", match: "MCH-3812", age: 36, sex: "F", kdpi: 37, status: "Alert Unaccepted", alertSent: "Yes", centerResponses: "0/5", lastUpdated: "10 hr ago"  },
  ];

  // ── State ────────────────────────────────────
  const [donors, setDonors]                     = useState(SEED_DONORS);
  const [activeTab, setActiveTab]               = useState("All Donors");
  const [search, setSearch]                     = useState("");
  const [kdpiMin, setKdpiMin]                   = useState(0);
  const [kdpiMax, setKdpiMax]                   = useState(100);
  const [dayFilter, setDayFilter]               = useState("Last 7 Days");
  const [showDayDropdown, setShowDayDropdown]   = useState(false);
  const [showKdpiDropdown, setShowKdpiDropdown] = useState(false);
  const [page, setPage]                         = useState(1);
  const [hoveredRow, setHoveredRow]             = useState(null);
  const [activeNav, setActiveNav]               = useState("Donor Management");
  const [showAddModal, setShowAddModal]         = useState(false);

  // ── Derived ──────────────────────────────────
  const tabCounts = getDonorTabCounts(donors);
  const filtered  = filterDonors(donors, { activeTab, search, kdpiMin, kdpiMax });
  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginated  = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const kpiData = [
    { title: "Total Donors",       subtitle: "All registered donors",    value: donors.length.toLocaleString(), icon: "users2",       iconBg: "#EFF6FF", iconColor: "#3B82F6", trend: "+12.5%", trendUp: true  },
    { title: "Awaiting Responses", subtitle: "Pending center replies",   value: tabCounts["Pending Review"].toString(), icon: "clock", iconBg: "#FFF7ED", iconColor: "#F97316", trend: "-3.2%",  trendUp: false },
    { title: "Organs Accepted",    subtitle: "Successful allocations",   value: "389",                          icon: "check-circle", iconBg: "#F0FDF4", iconColor: "#16A34A", trend: "+8.1%",  trendUp: true  },
    { title: "Alerts Sent",        subtitle: "Notifications dispatched", value: "156",                          icon: "send",         iconBg: "#F5F3FF", iconColor: "#7C3AED", trend: "+5.4%",  trendUp: true  },
  ];

  // ── Handlers ─────────────────────────────────
  const closeDropdowns = () => { setShowDayDropdown(false); setShowKdpiDropdown(false); };

  const handleAddDonor = (newDonor) => {
    setDonors(prev => [newDonor, ...prev]);
    setPage(1);
    setActiveTab("All Donors");
  };

  // ── Render ───────────────────────────────────
  return (
    <div onClick={closeDropdowns}
      style={{ display: "flex", height: "100vh", fontFamily: "'Inter', -apple-system, sans-serif", background: "#F8F9FA", overflow: "hidden" }}
    >
      {/* ══════════ SIDEBAR ══════════ */}
      <aside style={{ width: 224, background: "#FFFFFF", borderRight: "1px solid #E5E7EB", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        {/* Logo — 64px matches topbar */}
        <div style={{ height: 64, padding: "0 20px", borderBottom: "1px solid #E5E7EB", display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#3B82F6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name="heart" size={15} color="#fff" strokeWidth={2} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", letterSpacing: "-0.2px", lineHeight: 1.25 }}>LifeLink OPO</div>
              <div style={{ fontSize: 10, fontWeight: 400, color: "#9CA3AF" }}>Management Portal</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "8px 0", overflowY: "auto" }}>
          <div style={{ padding: "10px 16px 4px", fontSize: 10, fontWeight: 600, color: "#D1D5DB", letterSpacing: "0.07em", textTransform: "uppercase" }}>Main Menu</div>
          {NAV_ITEMS.map(item => {
            const isActive = activeNav === item.label;
            return (
              <div key={item.label} onClick={e => { e.stopPropagation(); setActiveNav(item.label); }} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "9px 16px", cursor: "pointer",
                borderLeft: isActive ? "3px solid #3B82F6" : "3px solid transparent",
                background: isActive ? "#EFF6FF" : "transparent", transition: "all 0.12s",
              }}>
                <Icon name={item.icon} size={17} color={isActive ? "#3B82F6" : "#6B7280"} />
                <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? "#3B82F6" : "#374151", flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{ fontSize: 10, fontWeight: 600, background: "#FEE2E2", color: "#DC2626", padding: "1px 6px", borderRadius: 999 }}>{item.badge}</span>
                )}
              </div>
            );
          })}
        </nav>

        {/* User */}
        <div style={{ padding: "12px 14px", borderTop: "1px solid #E5E7EB" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#EFF6FF", border: "1.5px solid #BFDBFE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name="user" size={13} color="#3B82F6" />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#111827" }}>Dr. Sarah Chen</div>
              <div style={{ fontSize: 10, color: "#9CA3AF" }}>OPO Administrator</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ══════════ MAIN ══════════ */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* ── Topbar ── */}
        <header style={{
          height: 64, background: "#FFFFFF", borderBottom: "1px solid #E5E7EB",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 28px", flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 12, color: "#9CA3AF" }}>OPO Admin</span>
            <span style={{ fontSize: 12, color: "#D1D5DB" }}>/</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#374151" }}>Donor Management</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="bell" size={16} color="#374151" />
              </div>
              <span style={{ position: "absolute", top: 8, right: 8, width: 7, height: 7, borderRadius: "50%", background: "#EF4444", border: "2px solid #fff" }} />
            </div>
            <div style={{ width: 1, height: 22, background: "#E5E7EB" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#EFF6FF", border: "1.5px solid #BFDBFE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="user" size={14} color="#3B82F6" />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", letterSpacing: "-0.1px", lineHeight: 1.3 }}>Dr. Sarah Chen</div>
                <div style={{ fontSize: 11, color: "#9CA3AF", lineHeight: 1.3 }}>sarah.chen@opo.org</div>
              </div>
              <Icon name="chevron-down" size={14} color="#9CA3AF" />
            </div>
          </div>
        </header>

        {/* ── Content ── */}
        <main style={{ flex: 1, overflowY: "auto", padding: "28px 28px 32px" }}>

          {/* Section 1 — Page header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: "#EFF6FF", border: "1px solid #BFDBFE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name="users" size={16} color="#3B82F6" strokeWidth={2} />
              </div>
              <div>
                <h1 style={{ fontSize: 20, fontWeight: 600, color: "#111827", letterSpacing: "-0.2px", margin: 0, lineHeight: 1.3 }}>Donor Management</h1>
                <p style={{ fontSize: 13, fontWeight: 500, color: "#6B7280", margin: 0, lineHeight: 1.45 }}>Manage active donor cases and organ allocations</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "9px 16px", borderRadius: 8, background: "#3B82F6", color: "#fff",
                border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500,
                letterSpacing: "-0.1px", boxShadow: "0 1px 3px rgba(59,130,246,0.35)", fontFamily: "inherit",
              }}
            >
              <Icon name="plus" size={14} color="#fff" strokeWidth={2.5} />
              Add New Donor
            </button>
          </div>

          {/* Section 2 — KPI Cards */}
          <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
            {kpiData.map(k => <KpiCard key={k.title} {...k} />)}
          </div>

          {/* Section 3+4 — Filter + Table */}
          <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "visible" }}>

            {/* Line Tabs */}
            <div style={{ borderBottom: "1px solid #E5E7EB", padding: "0 20px", display: "flex" }}>
              {TABS.map(t => {
                const isActive = activeTab === t;
                return (
                  <button key={t} onClick={e => { e.stopPropagation(); setActiveTab(t); setPage(1); }} style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "13px 14px 12px", border: "none", background: "none", cursor: "pointer",
                    fontSize: 13, fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#3B82F6" : "#6B7280",
                    borderBottom: isActive ? "2px solid #3B82F6" : "2px solid transparent",
                    marginBottom: -1, fontFamily: "inherit", transition: "color 0.12s", whiteSpace: "nowrap",
                  }}>
                    {t}
                    <span style={{
                      fontSize: 11, fontWeight: 500, padding: "1px 6px", borderRadius: 999,
                      background: isActive ? "#DBEAFE" : "#F3F4F6",
                      color: isActive ? "#2563EB" : "#9CA3AF",
                    }}>{tabCounts[t]}</span>
                  </button>
                );
              })}
            </div>

            {/* Filter row */}
            <div style={{ padding: "12px 20px", borderBottom: "1px solid #E5E7EB", display: "flex", alignItems: "center", gap: 10 }}>
              {/* Search */}
              <div style={{ position: "relative", flex: "0 0 300px" }}>
                <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <Icon name="search" size={14} color="#9CA3AF" />
                </span>
                <input
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                  placeholder="Search by donor name, UNOS ID..."
                  style={{
                    width: "100%", padding: "7px 12px 7px 32px",
                    border: "1px solid #E5E7EB", borderRadius: 8,
                    fontSize: 13, color: "#374151", outline: "none",
                    background: "#F9FAFB", boxSizing: "border-box", fontFamily: "inherit",
                  }}
                />
              </div>
              <div style={{ flex: 1 }} />

              {/* Day filter */}
              <div style={{ position: "relative" }} onClick={e => e.stopPropagation()}>
                <button onClick={() => { setShowDayDropdown(v => !v); setShowKdpiDropdown(false); }} style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 8,
                  border: showDayDropdown ? "1px solid #3B82F6" : "1px solid #E5E7EB",
                  background: showDayDropdown ? "#EFF6FF" : "#fff", cursor: "pointer",
                  fontSize: 13, color: showDayDropdown ? "#3B82F6" : "#374151", fontFamily: "inherit", whiteSpace: "nowrap",
                }}>
                  <Icon name="calendar" size={14} color={showDayDropdown ? "#3B82F6" : "#6B7280"} />
                  {dayFilter}
                  <Icon name="chevron-down" size={13} color={showDayDropdown ? "#3B82F6" : "#9CA3AF"} />
                </button>
                {showDayDropdown && (
                  <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, zIndex: 200, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 9, overflow: "hidden", minWidth: 160, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
                    {DAY_FILTER_OPTIONS.map(d => (
                      <div key={d} onClick={() => { setDayFilter(d); setShowDayDropdown(false); }} style={{
                        padding: "9px 14px", cursor: "pointer", fontSize: 13,
                        fontWeight: dayFilter === d ? 600 : 400,
                        color: dayFilter === d ? "#3B82F6" : "#374151",
                        background: dayFilter === d ? "#EFF6FF" : "transparent",
                      }}>{d}</div>
                    ))}
                  </div>
                )}
              </div>

              {/* KDPI dropdown */}
              <div style={{ position: "relative" }} onClick={e => e.stopPropagation()}>
                <button onClick={() => { setShowKdpiDropdown(v => !v); setShowDayDropdown(false); }} style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 8,
                  border: showKdpiDropdown ? "1px solid #3B82F6" : "1px solid #E5E7EB",
                  background: showKdpiDropdown ? "#EFF6FF" : "#fff", cursor: "pointer",
                  fontSize: 13, color: showKdpiDropdown ? "#3B82F6" : "#374151", fontFamily: "inherit", whiteSpace: "nowrap",
                }}>
                  <Icon name="sliders-horizontal" size={14} color={showKdpiDropdown ? "#3B82F6" : "#6B7280"} />
                  KDPI: {kdpiMin}%–{kdpiMax}%
                  <Icon name="chevron-down" size={13} color={showKdpiDropdown ? "#3B82F6" : "#9CA3AF"} />
                </button>
                {showKdpiDropdown && (
                  <KdpiDropdown
                    kdpiMin={kdpiMin} kdpiMax={kdpiMax}
                    setKdpiMin={v => { setKdpiMin(v); setPage(1); }}
                    setKdpiMax={v => { setKdpiMax(v); setPage(1); }}
                    onClose={() => setShowKdpiDropdown(false)}
                  />
                )}
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                <colgroup>
                  <col style={{ width: "13%" }} /><col style={{ width: "11%" }} /><col style={{ width: "10%" }} />
                  <col style={{ width: "8%" }}  /><col style={{ width: "6%" }}  /><col style={{ width: "8%" }}  />
                  <col style={{ width: "12%" }} /><col style={{ width: "10%" }} /><col style={{ width: "14%" }} />
                </colgroup>
                <thead>
                  <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                    {TABLE_HEADERS.map(h => (
                      <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 13, fontWeight: 600, color: "#6B7280", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr><td colSpan={9} style={{ padding: "48px", textAlign: "center", color: "#9CA3AF", fontSize: 13 }}>No donors match the current filters.</td></tr>
                  ) : paginated.map(d => (
                    <tr key={d.id}
                      onMouseEnter={() => setHoveredRow(d.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                      style={{ borderBottom: "1px solid #F3F4F6", background: hoveredRow === d.id ? "#F9FAFB" : "#fff", transition: "background 0.1s", height: 48 }}>
                      <td style={{ padding: "0 16px", fontSize: 13, fontWeight: 500, color: "#3B82F6", fontVariantNumeric: "tabular-nums" }}>{d.id}</td>
                      <td style={{ padding: "0 16px", fontSize: 13, color: "#374151" }}>{d.unos}</td>
                      <td style={{ padding: "0 16px", fontSize: 13, color: "#374151" }}>{d.match}</td>
                      <td style={{ padding: "0 16px", fontSize: 13, color: "#374151" }}>{d.age} / {d.sex}</td>
                      <td style={{ padding: "0 16px" }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: d.kdpi >= 70 ? "#DC2626" : d.kdpi >= 40 ? "#D97706" : "#16A34A" }}>{d.kdpi}%</span>
                      </td>
                      <td style={{ padding: "0 16px" }}>
                        <span style={{ fontSize: 13, fontWeight: d.alertSent === "Yes" ? 500 : 400, color: d.alertSent === "Yes" ? "#16A34A" : "#9CA3AF" }}>{d.alertSent}</span>
                      </td>
                      <td style={{ padding: "0 16px", fontSize: 13, color: "#374151" }}>{d.centerResponses}</td>
                      <td style={{ padding: "0 16px", fontSize: 12, color: "#9CA3AF" }}>{d.lastUpdated}</td>
                      <td style={{ padding: "0 16px" }}><StatusBadge status={d.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderTop: "1px solid #E5E7EB" }}>
              <span style={{ fontSize: 12, color: "#9CA3AF" }}>
                Showing {filtered.length === 0 ? 0 : (page - 1) * ROWS_PER_PAGE + 1}–{Math.min(page * ROWS_PER_PAGE, filtered.length)} of {filtered.length} donors
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)} style={{
                  display: "flex", alignItems: "center", gap: 4, padding: "6px 10px", borderRadius: 6,
                  border: "1px solid #E5E7EB", background: page === 1 ? "#F9FAFB" : "#fff",
                  cursor: page === 1 ? "not-allowed" : "pointer", fontSize: 12,
                  color: page === 1 ? "#D1D5DB" : "#374151", fontFamily: "inherit",
                }}>
                  <Icon name="chevron-left" size={12} color={page === 1 ? "#D1D5DB" : "#374151"} /> Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button key={n} onClick={() => setPage(n)} style={{
                    width: 30, height: 30, borderRadius: 6,
                    border: n === page ? "1px solid #3B82F6" : "1px solid #E5E7EB",
                    background: n === page ? "#EFF6FF" : "#fff", cursor: "pointer",
                    fontSize: 12, fontWeight: n === page ? 600 : 400,
                    color: n === page ? "#3B82F6" : "#374151", fontFamily: "inherit",
                  }}>{n}</button>
                ))}
                <button disabled={page === totalPages || totalPages === 0} onClick={() => setPage(p => p + 1)} style={{
                  display: "flex", alignItems: "center", gap: 4, padding: "6px 10px", borderRadius: 6,
                  border: "1px solid #E5E7EB",
                  background: (page === totalPages || totalPages === 0) ? "#F9FAFB" : "#fff",
                  cursor: (page === totalPages || totalPages === 0) ? "not-allowed" : "pointer",
                  fontSize: 12, color: (page === totalPages || totalPages === 0) ? "#D1D5DB" : "#374151", fontFamily: "inherit",
                }}>
                  Next <Icon name="chevron-right" size={12} color={(page === totalPages || totalPages === 0) ? "#D1D5DB" : "#374151"} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ── Add Donor Modal ── */}
      <AddDonorModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddDonor}
      />
    </div>
  );
}
