import { useEffect, useState } from "react";

import {
  getDashboardMetrics,
  getRevenueByRegion,
  getProfitByCategory,
  getTopProducts,
} from "../services/api";

function Metrics() {
  const [summary, setSummary] = useState(null);
  const [regions, setRegions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMetrics = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        summaryData,
        regionData,
        categoryData,
        productData,
      ] = await Promise.all([
        getDashboardMetrics(),
        getRevenueByRegion(),
        getProfitByCategory(),
        getTopProducts(),
      ]);

      setSummary(summaryData);
      setRegions(regionData);
      setCategories(categoryData);
      setProducts(productData);

    } catch (err) {
      console.error(
        "Metrics Page Error:",
        err
      );

      setError(
        "Unable to load metric data."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetrics();
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

  const formatPercentage = (value) => {
    if (
      value === null ||
      value === undefined
    ) {
      return "N/A";
    }

    return `${Number(value).toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="module-page">

        <div className="module-header">
          <div>
            <span className="module-breadcrumb">
              Workspace / Metrics
            </span>

            <h1>Semantic Metrics</h1>

            <p>
              Loading governed business metrics...
            </p>
          </div>
        </div>

        <div className="module-loading">
          Loading metrics...
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
              Workspace / Metrics
            </span>

            <h1>Semantic Metrics</h1>

            <p>
              Explore governed business metrics
              from MetricMind.
            </p>
          </div>
        </div>

        <div className="module-error">

          <h3>
            Unable to load metrics
          </h3>

          <p>
            {error}
          </p>

          <button
            className="module-action-button"
            onClick={loadMetrics}
          >
            Try Again
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="module-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="module-header">

        <div>

          <span className="module-breadcrumb">
            Workspace / Metrics
          </span>

          <h1>
            Semantic Metrics
          </h1>

          <p>
            Explore governed business metrics
            powered by the MetricMind semantic layer.
          </p>

        </div>

        <button
          className="module-action-button"
          onClick={loadMetrics}
        >
          ↻ Refresh Metrics
        </button>

      </div>

      {/* =====================================================
          KPI CARDS
      ===================================================== */}

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
            SUM(Sales)
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
            SUM(Profit)
          </small>

        </div>

        <div className="module-kpi-card">

          <span className="module-kpi-label">
            Profit Margin
          </span>

          <strong>
            {formatPercentage(
              summary?.profit_margin
            )}
          </strong>

          <small>
            Profit / Revenue
          </small>

        </div>

        <div className="module-kpi-card">

          <span className="module-kpi-label">
            Sales
          </span>

          <strong>
            {summary?.sales?.toLocaleString()}
          </strong>

          <small>
            Total transactions
          </small>

        </div>

      </section>

      {/* =====================================================
          SEMANTIC DEFINITIONS
      ===================================================== */}

      <section className="semantic-card">

        <div className="module-card-header">

          <div>

            <h2>
              Governed Metric Definitions
            </h2>

            <p>
              Business logic used by MetricMind
              for consistent analytics.
            </p>

          </div>

          <span className="semantic-status">
            ● Governed
          </span>

        </div>

        <div className="semantic-grid">

          <div className="semantic-item">

            <strong>
              Revenue
            </strong>

            <code>
              SUM(Sales)
            </code>

            <p>
              Total sales generated across
              all transactions.
            </p>

          </div>

          <div className="semantic-item">

            <strong>
              Profit
            </strong>

            <code>
              SUM(Profit)
            </code>

            <p>
              Total profit generated from
              business transactions.
            </p>

          </div>

          <div className="semantic-item">

            <strong>
              Profit Margin
            </strong>

            <code>
              Profit / Revenue × 100
            </code>

            <p>
              Measures profitability relative
              to total revenue.
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          REVENUE BY REGION
      ===================================================== */}

      <section className="module-card">

        <div className="module-card-header">

          <div>

            <h2>
              Revenue by Region
            </h2>

            <p>
              Revenue contribution across
              business regions.
            </p>

          </div>

        </div>

        <div className="metric-table">

          <div className="metric-table-header">

            <span>
              Region
            </span>

            <span>
              Revenue
            </span>

          </div>

          {regions.map((item, index) => (
            <div
              className="metric-table-row"
              key={index}
            >

              <span>
                {item.region ||
                  item.Region ||
                  item.name ||
                  item.dimension ||
                  "Unknown"}
              </span>

              <strong>
                {formatCurrency(
                  item.revenue ||
                  item.Revenue ||
                  item.value
                )}
              </strong>

            </div>
          ))}

        </div>

      </section>

      {/* =====================================================
          CATEGORY PERFORMANCE
      ===================================================== */}

      <section className="module-card">

        <div className="module-card-header">

          <div>

            <h2>
              Category Performance
            </h2>

            <p>
              Revenue, profit and margin by
              product category.
            </p>

          </div>

        </div>

        <div className="metric-table">

          <div className="metric-table-header category-table">

            <span>
              Category
            </span>

            <span>
              Revenue
            </span>

            <span>
              Profit
            </span>

            <span>
              Margin
            </span>

          </div>

          {categories.map((item, index) => (
            <div
              className="metric-table-row category-table"
              key={index}
            >

              <span>
                {item.category ||
                  item.Category ||
                  item.name ||
                  "Unknown"}
              </span>

              <strong>
                {formatCurrency(
                  item.revenue ||
                  item.Revenue
                )}
              </strong>

              <strong>
                {formatCurrency(
                  item.profit ||
                  item.Profit
                )}
              </strong>

              <strong>
                {formatPercentage(
                  item.profit_margin ||
                  item.margin ||
                  item.Profit_Margin
                )}
              </strong>

            </div>
          ))}

        </div>

      </section>

      {/* =====================================================
          TOP PROFITABLE PRODUCTS
      ===================================================== */}

      <section className="module-card">

        <div className="module-card-header">

          <div>

            <h2>
              Top Profitable Products
            </h2>

            <p>
              Products generating the highest
              profit.
            </p>

          </div>

        </div>

        <div className="metric-table">

          <div className="metric-table-header">

            <span>
              Product
            </span>

            <span>
              Profit
            </span>

          </div>

          {products.map((item, index) => (
            <div
              className="metric-table-row"
              key={index}
            >

              <span>
                {item.product ||
                  item.Product ||
                  item.product_name ||
                  item.name ||
                  "Unknown"}
              </span>

              <strong>
                {formatCurrency(
                  item.profit ||
                  item.Profit ||
                  item.value
                )}
              </strong>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default Metrics;