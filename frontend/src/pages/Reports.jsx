import { useEffect, useState } from "react";

import {
  getDashboardMetrics,
  getRevenueByRegion,
  getProfitByCategory,
  getTopProducts,
} from "../services/api";

function Reports() {
  const [summary, setSummary] = useState(null);
  const [regions, setRegions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadReport = async () => {
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
      console.error("Reports Error:", err);
      setError("Unable to generate business report.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, []);

  const formatCurrency = (value) => {
    if (value === null || value === undefined) {
      return "N/A";
    }

    return `$${Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatPercentage = (value) => {
    if (value === null || value === undefined) {
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
              Workspace / Reports
            </span>

            <h1>Business Reports</h1>

            <p>
              Preparing your latest business performance report...
            </p>
          </div>
        </div>

        <div className="module-loading">
          Generating report...
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
              Workspace / Reports
            </span>

            <h1>Business Reports</h1>

            <p>
              Executive business performance report.
            </p>
          </div>
        </div>

        <div className="module-error">

          <h3>
            Unable to generate report
          </h3>

          <p>
            {error}
          </p>

          <button
            className="module-action-button"
            onClick={loadReport}
          >
            Try Again
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="module-page">

      {/* Header */}

      <div className="module-header">

        <div>

          <span className="module-breadcrumb">
            Workspace / Reports
          </span>

          <h1>
            Business Reports
          </h1>

          <p>
            Executive summary generated from
            current MetricMind business data.
          </p>

        </div>

        <button
          className="module-action-button"
          onClick={loadReport}
        >
          ↻ Generate Report
        </button>

      </div>


      {/* Report Status */}

      <section className="report-banner">

        <div>

          <span className="report-banner-label">
            EXECUTIVE PERFORMANCE REPORT
          </span>

          <h2>
            Business Performance Overview
          </h2>

          <p>
            Current performance across revenue,
            profitability, regions and products.
          </p>

        </div>

        <span className="semantic-status">
          ● Live Data
        </span>

      </section>


      {/* KPI Summary */}

      <section className="module-kpi-grid">

        <div className="module-kpi-card">

          <span className="module-kpi-label">
            Total Revenue
          </span>

          <strong>
            {formatCurrency(summary?.revenue)}
          </strong>

          <small>
            SUM(Sales)
          </small>

        </div>


        <div className="module-kpi-card">

          <span className="module-kpi-label">
            Total Profit
          </span>

          <strong>
            {formatCurrency(summary?.profit)}
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
            {formatPercentage(summary?.profit_margin)}
          </strong>

          <small>
            Profit / Revenue
          </small>

        </div>


        <div className="module-kpi-card">

          <span className="module-kpi-label">
            Total Sales
          </span>

          <strong>
            {summary?.sales?.toLocaleString()}
          </strong>

          <small>
            Total transactions
          </small>

        </div>

      </section>


      {/* Regional Performance */}

      <section className="module-card">

        <div className="module-card-header">

          <div>

            <h2>
              Regional Performance
            </h2>

            <p>
              Revenue contribution by region.
            </p>

          </div>

        </div>

        <div className="report-region-list">

          {regions.slice(0, 8).map((item, index) => {

            const revenue =
              Number(
                item.revenue ||
                item.Revenue ||
                item.value ||
                0
              );

            const totalRevenue =
              Number(summary?.revenue || 1);

            const percentage =
              (revenue / totalRevenue) * 100;

            return (
              <div
                className="report-region-row"
                key={index}
              >

                <div className="report-region-info">

                  <strong>
                    {item.region ||
                      item.Region ||
                      item.name ||
                      item.dimension ||
                      "Unknown"}
                  </strong>

                  <span>
                    {formatCurrency(revenue)}
                  </span>

                </div>

                <div className="report-progress">

                  <div
                    className="report-progress-fill"
                    style={{
                      width: `${Math.min(
                        percentage,
                        100
                      )}%`,
                    }}
                  />

                </div>

                <small>
                  {percentage.toFixed(1)}%
                </small>

              </div>
            );
          })}

        </div>

      </section>


      {/* Category Performance */}

      <section className="module-card">

        <div className="module-card-header">

          <div>

            <h2>
              Category Performance
            </h2>

            <p>
              Revenue and profitability across
              product categories.
            </p>

          </div>

        </div>

        <div className="report-category-grid">

          {categories.map((item, index) => {

            const revenue =
              item.revenue ||
              item.Revenue ||
              0;

            const profit =
              item.profit ||
              item.Profit ||
              0;

            const margin =
              item.profit_margin ||
              item.margin ||
              item.Profit_Margin ||
              0;

            return (
              <div
                className="report-category-card"
                key={index}
              >

                <span>
                  {item.category ||
                    item.Category ||
                    item.name ||
                    "Unknown"}
                </span>

                <strong>
                  {formatCurrency(revenue)}
                </strong>

                <div className="report-category-details">

                  <div>
                    <small>
                      Profit
                    </small>

                    <b>
                      {formatCurrency(profit)}
                    </b>
                  </div>

                  <div>
                    <small>
                      Margin
                    </small>

                    <b>
                      {formatPercentage(margin)}
                    </b>
                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </section>


      {/* Top Products */}

      <section className="module-card">

        <div className="module-card-header">

          <div>

            <h2>
              Top Profitable Products
            </h2>

            <p>
              Highest profit-generating products.
            </p>

          </div>

        </div>

        <div className="report-products">

          {products.slice(0, 5).map((item, index) => (

            <div
              className="report-product-row"
              key={index}
            >

              <div className="report-product-rank">
                {index + 1}
              </div>

              <div className="report-product-name">

                <strong>
                  {item.product ||
                    item.Product ||
                    item.product_name ||
                    item.name ||
                    "Unknown"}
                </strong>

                <small>
                  Profit generating product
                </small>

              </div>

              <strong className="report-product-profit">
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


      {/* Executive Insights */}

      <section className="semantic-card">

        <div className="module-card-header">

          <div>

            <h2>
              Executive Insights
            </h2>

            <p>
              Key observations from current
              business metrics.
            </p>

          </div>

          <span className="semantic-status">
            ● Data Driven
          </span>

        </div>

        <div className="semantic-grid">

          <div className="semantic-item">

            <strong>
              Revenue
            </strong>

            <code>
              {formatCurrency(summary?.revenue)}
            </code>

            <p>
              Total revenue generated across
              the available business transactions.
            </p>

          </div>


          <div className="semantic-item">

            <strong>
              Profitability
            </strong>

            <code>
              {formatPercentage(summary?.profit_margin)}
            </code>

            <p>
              Current overall profit margin based
              on governed revenue and profit metrics.
            </p>

          </div>


          <div className="semantic-item">

            <strong>
              Sales Volume
            </strong>

            <code>
              {summary?.sales?.toLocaleString()}
            </code>

            <p>
              Total number of sales transactions
              represented in the current dataset.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Reports;