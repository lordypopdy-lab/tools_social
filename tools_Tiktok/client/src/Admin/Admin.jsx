import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import axios from "axios";

// Severity pill
function SeverityPill({ level }) {
  const map = {
    high: { color: "#ff3b3b", label: "HIGH" },
    medium: { color: "#ffb86b", label: "MED" },
    low: { color: "#7bed9f", label: "LOW" },
    info: { color: "#38b6ff", label: "INFO" },
  };
  const meta = map[level] || map.info;
  return (
    <span className="pill" style={{ background: meta.color }}>
      {meta.label}
    </span>
  );
}

export default function AdminDashboard() {
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [success, setSuccess] = useState("");
  const [initialData, setInitialData] = useState([])
  const [visiblePasswords, setVisiblePasswords] = useState({});

  useEffect(() => {

    if (!localStorage.getItem("LordyID")) {
      localStorage.clear();
      location.href = "/login"
    }

    const getPlayers = async () => {
      try {
        const { data } = await axios.get("/getPlayers");
        if (data) {
          console.log(data);
          setInitialData(data.reverse()); // ✅ corrected
        }
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    getPlayers();
  }, []);

  const togglePassword = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filtered = initialData.filter(
    (d) =>
      d.email.toLowerCase().includes(query.toLowerCase()) ||
      d.source.toLowerCase().includes(query.toLowerCase())
  );

  const deletePlayer = async (id) => {
    try {
      const { data } = await axios.post("/deletePlayer", { id });
      if (data.success) {
        setError("");
        setSuccess(data.success);
        setInitialData((prev) => prev.filter((p) => p._id !== id));
      } else if (data.error) {
        setSuccess("");
        setError(data.error);
      }
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("LordyID");
    location.href = "/login";
  }

  return (
    <div className="dash-root">

      {/* Matrix background */}
      <div className="dash-matrix" aria-hidden>
        {[...Array(30)].map((_, i) => (
          <span key={i} className="matrix-char">
            {String.fromCharCode(0x30A0 + Math.random() * 96)}
          </span>
        ))}
      </div>

      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="brand">
          <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M12 2L3 7v10l9 5 9-5V7z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
          <div className="brand-text">LORDY'S ADMIN</div>
        </div>

        <nav className="nav">
          <a className="nav-item active">Overview</a>
          <a className="nav-item">Incidents</a>
          <a className="nav-item">Sources</a>
          <a className="nav-item">Rules</a>
          <a className="nav-item">Settings</a>
        </nav>

        <div className="sidebar-footer">
          <button
            onClick={logout}
            style={{ color: "red" }}
            className="ghost-btn"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main area */}
      <main className="dash-main">
        <header className="dash-header">
          <div className="search-wrap">
            <input
              className="search"
              placeholder="Search email / source (demo only)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="header-actions">
            <div className="stat-card">
              <div className="stat-value">{initialData.length}</div>
              <div className="stat-label">Total Leaks</div>
            </div>

            <div className="avatar" title="Admin (demo)">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="8" r="3.2" />
                <path d="M4 20a8 8 0 0 1 16 0" />
              </svg>
            </div>
          </div>
        </header>

        {/* Cards */}
        <section className="top-cards">
          <div className="card neon">
            <h3>Active Alerts</h3>
            <div className="card-row">
              <div className="big">2</div>
              <div className="meta">High severity incidents</div>
            </div>
          </div>

          <div className="card">
            <h3>Recent Sources</h3>
            <div className="card-row">
              <div className="chip">pastebin</div>
              <div className="chip">db_dump</div>
              <div className="chip">honeypot</div>
            </div>
          </div>

          <div className="card">
            <h3>Health</h3>
            <div className="card-row small">
              <svg
                className="spark"
                viewBox="0 0 100 30"
                preserveAspectRatio="none"
              >
                <polyline
                  points="0,20 20,10 40,18 60,6 80,14 100,8"
                  fill="none"
                  stroke="#00ff99"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="meta">Realtime feed</div>
            </div>
          </div>
        </section>

        {/* Data table */}
        <section className="table-section">
          <div className="table-card">
            <div className="table-header">
              <h2>Compromised Accounts</h2>
              {error !== "" ? <h3 className="title">{error}</h3> : ""}
              {success !== "" ? <h3 className="title">{success}</h3> : ""}
              <span className="sub">Sample / masked credentials only</span>
            </div>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Source</th>
                    <th>Date</th>
                    <th>Severity</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((row) => (
                    <tr key={row._id}>
                      <td className="mono">{row._id}</td>
                      <td>{row.email}</td>
                      <td className="mono">
                        <span>
                          {visiblePasswords[row._id] ? row.password : "••••••••"}
                        </span>
                        <button
                          className="icon-btn"
                          onClick={() => togglePassword(row._id)}
                          title={
                            visiblePasswords[row._id]
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {visiblePasswords[row._id] ? "🙈" : "👁"}
                        </button>
                      </td>
                      <td>{row.source}</td>
                      <td>{row.date}</td>
                      <td>
                        <SeverityPill level={row.severity} />
                      </td>
                      <td>
                        <button className="icon-btn" title="Annotate (demo)">
                          ✎
                        </button>
                        <button onClick={() => deletePlayer(row._id)} className="icon-btn" title="Block (demo)">
                          ⛔
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <footer className="dash-footer">
          <div className="left">LORDY'S Console • Demo Layout</div>
          <div className="right">Theme: Hacker • 2025</div>
        </footer>
      </main>
    </div>
  );
}
