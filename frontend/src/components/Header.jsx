function Header() {
  return (
    <header className="header">

      <div>
        <h1>Executive Dashboard</h1>

        <p>
          Welcome back, Anshika.
          Here's your business overview.
        </p>
      </div>

      <div className="header-actions">

        <button className="date-button">
          Last Quarter ▾
        </button>

        <button className="notification">
          🔔
          <span className="notification-badge">3</span>
        </button>

      </div>

    </header>
  );
}

export default Header;