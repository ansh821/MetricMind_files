function MetricCard({
  title,
  value,
  status,
  subtitle,
  cardClass,
}) {
  return (
    <div className={`metric-card ${cardClass || ""}`}>

      {/* Card Header */}
      <div className="metric-top">
        <span className="metric-title">
          {title}
        </span>

        <span
          className="metric-menu"
          aria-hidden="true"
        >
          •••
        </span>
      </div>

      {/* Main Value */}
      <h2 className="metric-value">
        {value}
      </h2>

      {/* Status */}
      <div className="change positive">

        <span className="metric-status">
          ↗ {status}
        </span>

        <span className="metric-subtitle">
          {subtitle}
        </span>

      </div>

    </div>
  );
}

export default MetricCard;