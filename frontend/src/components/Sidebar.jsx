import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">
        <div className="logo-icon">M</div>
        <span>MetricMind</span>
      </div>

      <nav className="sidebar-nav">

        <div className="nav-section-title">
          WORKSPACE
        </div>

        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">▦</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/metrics"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">◈</span>
          <span>Metrics</span>
        </NavLink>

        <NavLink
          to="/ai-assistant"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">◉</span>
          <span>AI Assistant</span>
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">◫</span>
          <span>Reports</span>
        </NavLink>

        <div className="nav-section-title monitoring-title">
          MONITORING
        </div>

        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">◌</span>
          <span>Notifications</span>
          <span className="notification-badge">3</span>
        </NavLink>

        <div className="nav-section-title history-title">
          HISTORY
        </div>

        <NavLink
          to="/chat-history"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">◷</span>
          <span>Chat History</span>
        </NavLink>

        <NavLink
          to="/saved-questions"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">☆</span>
          <span>Saved Questions</span>
        </NavLink>

      </nav>

      <div className="sidebar-bottom">

        <a
          className="nav-item settings-item"
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          <span className="nav-icon">⚙</span>
          <span>Settings</span>
        </a>

        <div className="user-profile">

          <div className="avatar">
            AC
          </div>

          <div className="user-info">
            <strong>Anshika Chauhan</strong>
            <small>Executive</small>
          </div>

          <span className="user-menu">
            ⋮
          </span>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;