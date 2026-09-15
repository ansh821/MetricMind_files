import { useEffect, useState } from "react";

import {
  getDashboardMetrics,
  getRevenueByRegion,
  getProfitByCategory,
} from "../services/api";

function Notifications() {
  const [summary, setSummary] = useState(null);
  const [regions, setRegions] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        summaryData,
        regionData,
        categoryData,
      ] = await Promise.all([
        getDashboardMetrics(),
        getRevenueByRegion(),
        getProfitByCategory(),
      ]);

      setSummary(summaryData);
      setRegions(regionData);
      setCategories(categoryData);

    } catch (err) {
      console.error(
        "Notifications Error:",
        err
      );

      setError(
        "Unable to load notifications."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const formatCurrency = (value) => {
    if (
      value === null ||
      value === undefined
    ) {
      return "N/A";
    }

    return `$${Number(value).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  };

  const getRegionName = (item) => {
    return (
      item.region ||
      item.Region ||
      item.name ||
      item.dimension ||
      "Unknown Region"
    );
  };

  const getRevenue = (item) => {
    return Number(
      item.revenue ||
      item.Revenue ||
      item.value ||
      0
    );
  };

  const getCategoryName = (item) => {
    return (
      item.category ||
      item.Category ||
      item.name ||
      "Unknown Category"
    );
  };

  const getProfit = (item) => {
    return Number(
      item.profit ||
      item.Profit ||
      0
    );
  };

  const getMargin = (item) => {
    return Number(
      item.profit_margin ||
      item.margin ||
      item.Profit_Margin ||
      0
    );
  };

  const notifications = [];

  if (summary) {
    const margin = Number(
      summary.profit_margin || 0
    );

    if (margin < 10) {
      notifications.push({
        type: "warning",
        icon: "!",
        title: "Low Profit Margin",
        message:
          `Overall profit margin is ${margin.toFixed(
            2
          )}%. Review low-margin business areas.`,
      });
    } else {
      notifications.push({
        type: "success",
        icon: "✓",
        title: "Healthy Profit Margin",
        message:
          `Overall profit margin is ${margin.toFixed(
            2
          )}%, based on current governed metrics.`,
      });
    }

    if (Number(summary.profit) > 0) {
      notifications.push({
        type: "success",
        icon: "↗",
        title: "Business Is Profitable",
        message:
          `Current total profit is ${formatCurrency(
            summary.profit
          )}.`,
      });
    }
  }

  if (regions.length > 0) {
    const sortedRegions = [...regions].sort(
      (a, b) =>
        getRevenue(b) - getRevenue(a)
    );

    const topRegion = sortedRegions[0];

    notifications.push({
      type: "info",
      icon: "◈",
      title: "Top Revenue Region",
      message:
        `${getRegionName(
          topRegion
        )} currently leads revenue with ${formatCurrency(
          getRevenue(topRegion)
        )}.`,
    });
  }

  if (categories.length > 0) {
    const sortedCategories = [
      ...categories,
    ].sort(
      (a, b) =>
        getMargin(b) - getMargin(a)
    );

    const bestCategory =
      sortedCategories[0];

    const lowestCategory =
      [...categories].sort(
        (a, b) =>
          getMargin(a) - getMargin(b)
      )[0];

    notifications.push({
      type: "success",
      icon: "★",
      title: "Strongest Category Margin",
      message:
        `${getCategoryName(
          bestCategory
        )} has the highest profit margin at ${getMargin(
          bestCategory
        ).toFixed(2)}%.`,
    });

    if (
      getMargin(lowestCategory) <
      getMargin(bestCategory)
    ) {
      notifications.push({
        type: "warning",
        icon: "!",
        title: "Category Requires Attention",
        message:
          `${getCategoryName(
            lowestCategory
          )} has the lowest profit margin at ${getMargin(
            lowestCategory
          ).toFixed(2)}%.`,
      });
    }
  }

  if (loading) {
    return (
      <div className="module-page">

        <div className="module-header">
          <div>
            <span className="module-breadcrumb">
              Monitoring / Notifications
            </span>

            <h1>
              Notifications
            </h1>

            <p>
              Business alerts and important
              MetricMind insights.
            </p>
          </div>
        </div>

        <div className="module-loading">
          Loading notifications...
        </div>

      </div>
    );
  }

  if (error) {
    return (
      <div className="module-page">

        <div className="module-header">
          <div>
            <span className="module-breadcrumb">
              Monitoring / Notifications
            </span>

            <h1>
              Notifications
            </h1>

            <p>
              Business alerts and important
              MetricMind insights.
            </p>
          </div>
        </div>

        <div className="module-error">

          <h3>
            Unable to load notifications
          </h3>

          <p>
            {error}
          </p>

          <button
            className="module-action-button"
            onClick={loadNotifications}
          >
            Try Again
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="module-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="module-header">

        <div>
          <span className="module-breadcrumb">
            Monitoring / Notifications
          </span>

          <h1>
            Notifications
          </h1>

          <p>
            Important business alerts and
            data-driven MetricMind insights.
          </p>
        </div>

        <button
          className="module-action-button"
          onClick={loadNotifications}
        >
          ↻ Refresh
        </button>

      </div>


      {/* =================================================
          STATUS CARD
      ================================================= */}

      <section className="notification-summary-card">

        <div className="notification-summary-icon">
          ◌
        </div>

        <div>
          <span>
            MONITORING STATUS
          </span>

          <h2>
            MetricMind Monitoring Active
          </h2>

          <p>
            Your current business metrics are
            being monitored for important
            performance signals.
          </p>
        </div>

        <strong>
          {notifications.length}
        </strong>

      </section>


      {/* =================================================
          NOTIFICATION LIST
      ================================================= */}

      <section className="module-card">

        <div className="module-card-header">

          <div>
            <h2>
              Business Alerts
            </h2>

            <p>
              Insights generated from current
              governed metrics.
            </p>
          </div>

          <span className="semantic-status">
            ● Live Data
          </span>

        </div>


        <div className="notification-list">

          {notifications.map(
            (notification, index) => (

              <div
                className={`notification-item ${notification.type}`}
                key={index}
              >

                <div className="notification-icon">
                  {notification.icon}
                </div>

                <div className="notification-content">

                  <strong>
                    {notification.title}
                  </strong>

                  <p>
                    {notification.message}
                  </p>

                  <small>
                    Based on current MetricMind
                    data
                  </small>

                </div>

                <span className="notification-status">
                  {notification.type ===
                  "warning"
                    ? "Attention"
                    : notification.type ===
                      "success"
                    ? "Healthy"
                    : "Info"}
                </span>

              </div>

            )
          )}

        </div>

      </section>


      {/* =================================================
          MONITORING OVERVIEW
      ================================================= */}

      <section className="module-kpi-grid">

        <div className="module-kpi-card">

          <span className="module-kpi-label">
            Revenue
          </span>

          <strong>
            {formatCurrency(
              summary?.revenue
            )}
          </strong>

          <small>
            Current total revenue
          </small>

        </div>


        <div className="module-kpi-card">

          <span className="module-kpi-label">
            Profit
          </span>

          <strong>
            {formatCurrency(
              summary?.profit
            )}
          </strong>

          <small>
            Current total profit
          </small>

        </div>


        <div className="module-kpi-card">

          <span className="module-kpi-label">
            Profit Margin
          </span>

          <strong>
            {Number(
              summary?.profit_margin || 0
            ).toFixed(2)}
            %
          </strong>

          <small>
            Profit / Revenue
          </small>

        </div>


        <div className="module-kpi-card">

          <span className="module-kpi-label">
            Active Alerts
          </span>

          <strong>
            {notifications.length}
          </strong>

          <small>
            Current business insights
          </small>

        </div>

      </section>

    </div>
  );
}

export default Notifications;
