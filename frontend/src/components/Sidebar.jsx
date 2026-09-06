function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">
        <div className="logo-icon">M</div>
        <span>MetricMind</span>
      </div>

      <nav>

        <a className="nav-item active" href="#">
          <span>▦</span>
          Dashboard
        </a>

        <a className="nav-item" href="#">
          <span>◈</span>
          Metrics
        </a>

        <a className="nav-item" href="#">
          <span>◉</span>
          AI Assistant
        </a>

        <a className="nav-item" href="#">
          <span>◫</span>
          Reports
        </a>

      </nav>

      <div className="sidebar-bottom">

        <a className="nav-item" href="#">
          <span>⚙</span>
          Settings
        </a>

        <div className="user-profile">

          <div className="avatar">
            AC
          </div>

          <div>
            <strong>Anshika Chauhan</strong>
            <small>Executive</small>
          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;