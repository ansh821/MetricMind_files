function Header() {
  return (
    <header className="header">

      {/* Page Information */}
      <div className="header-info">

        <div className="breadcrumb">
          <span>Workspace</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-active">Dashboard</span>
        </div>

        <h1>
          Executive Dashboard
        </h1>

        <p>
          Monitor your business performance and
          explore insights with MetricMind.
        </p>

      </div>

      {/* Header Actions */}
      <div className="header-actions">

        {/* Period Selector */}
        <button
          className="date-button period-button"
          type="button"
        >
          <span className="calendar-icon">▣</span>
          <span>Last Quarter</span>
          <span className="dropdown-arrow">▾</span>
        </button>

        {/* Notification */}
        <button
          className="notification"
          type="button"
          aria-label="Notifications"
        >
          <span className="notification-icon">
            🔔
          </span>

          <span className="notification-badge">
            3
          </span>
        </button>

      </div>

    </header>
  );
}

export default Header;