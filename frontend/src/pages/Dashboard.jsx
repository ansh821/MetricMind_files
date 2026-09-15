import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MetricCard from "../components/MetricCard";
import AISection from "../components/AISection";

import RevenueChart from "../components/charts/RevenueChart";
import ProfitPieChart from "../components/charts/ProfitPieChart";
import RevenueTrendChart from "../components/charts/RevenueTrendChart";
import TopProductsChart from "../components/charts/TopProductsChart";

function Dashboard({
  dashboardMetrics,
  metricsLoading,
  metricsError,
  onRefresh,

  question,
  setQuestion,
  answer,
  loading,
  handleAsk,

  regionData,
  profitData,
  revenueTrendData,
  topProductsData,

  formatCurrency,
  formatPercentage,
}) {
  return (
    <div className="app">

      {/* Sidebar */}
      <Sidebar />

      <main className="main-content">

        {/* Header */}
        <Header />

        {/* Refresh Button */}
        <div className="refresh-container">
          <button
            className="date-button"
            onClick={onRefresh}
            disabled={metricsLoading}
          >
            {metricsLoading ? "Refreshing..." : "↻ Refresh Data"}
          </button>
        </div>

        {/* =====================================================
            KPI METRIC CARDS
        ===================================================== */}

        <section className="metrics-grid">

          <MetricCard
            title="Revenue"
            value={
              metricsLoading
                ? "Loading..."
                : metricsError
                ? "N/A"
                : formatCurrency(dashboardMetrics?.revenue)
            }
            status="Live Data"
            subtitle="from PostgreSQL"
            cardClass="revenue-card"
          />

          <MetricCard
            title="Profit"
            value={
              metricsLoading
                ? "Loading..."
                : metricsError
                ? "N/A"
                : formatCurrency(dashboardMetrics?.profit)
            }
            status="Live Data"
            subtitle="from PostgreSQL"
            cardClass="profit-card"
          />

          <MetricCard
            title="Profit Margin"
            value={
              metricsLoading
                ? "Loading..."
                : metricsError
                ? "N/A"
                : formatPercentage(dashboardMetrics?.profit_margin)
            }
            status="Calculated"
            subtitle="from PostgreSQL data"
            cardClass="margin-card"
          />

          <MetricCard
            title="Sales"
            value={
              metricsLoading
                ? "Loading..."
                : metricsError
                ? "N/A"
                : dashboardMetrics?.sales?.toLocaleString()
            }
            status="Live Data"
            subtitle="from PostgreSQL"
            cardClass="sales-card"
          />

        </section>

        {/* =====================================================
            ERROR MESSAGE
        ===================================================== */}

        {metricsError && (
          <div className="answer-box">
            {metricsError}

            <p>
              Make sure FastAPI backend is running.
            </p>
          </div>
        )}

        {/* =====================================================
            AI ASSISTANT
        ===================================================== */}

        <AISection
          question={question}
          setQuestion={setQuestion}
          answer={answer}
          loading={loading}
          handleAsk={handleAsk}
        />

        {/* =====================================================
            ANALYTICS CHARTS
        ===================================================== */}

        <section className="dashboard-grid">

          {/* Revenue by Region */}
          <RevenueChart
            regionData={regionData}
          />

          {/* Profit by Category */}
          <ProfitPieChart
            data={profitData}
          />

          {/* Revenue Trend */}
          <RevenueTrendChart
            data={revenueTrendData}
          />

          {/* Top Profitable Products */}
          <TopProductsChart
            data={topProductsData}
          />

          {/* =================================================
              AI INSIGHTS
          ================================================= */}

          <div className="insights-card">

            <div className="card-header">
              <div>
                <h2>AI Insights</h2>

                <p>
                  Generated from current business metrics
                </p>
              </div>
            </div>

            {/* Revenue Insight */}
            <div className="insight">

              <div className="insight-icon">
                ↗
              </div>

              <div>
                <strong>
                  Revenue performance
                </strong>

                <p>
                  Current revenue is{" "}
                  <strong>
                    {metricsLoading
                      ? "Loading..."
                      : metricsError
                      ? "N/A"
                      : formatCurrency(
                          dashboardMetrics?.revenue
                        )}
                  </strong>{" "}
                  across{" "}
                  <strong>
                    {metricsLoading
                      ? "..."
                      : metricsError
                      ? "N/A"
                      : dashboardMetrics?.sales?.toLocaleString()}
                  </strong>{" "}
                  sales.
                </p>
              </div>

            </div>

            {/* Profitability Insight */}
            <div className="insight">

              <div className="insight-icon">
                $
              </div>

              <div>
                <strong>
                  Profitability
                </strong>

                <p>
                  Current profit margin is{" "}
                  <strong>
                    {metricsLoading
                      ? "Loading..."
                      : metricsError
                      ? "N/A"
                      : formatPercentage(
                          dashboardMetrics?.profit_margin
                        )}
                  </strong>{" "}
                  with total profit of{" "}
                  <strong>
                    {metricsLoading
                      ? "Loading..."
                      : metricsError
                      ? "N/A"
                      : formatCurrency(
                          dashboardMetrics?.profit
                        )}
                  </strong>.
                </p>
              </div>

            </div>

            {/* Category Insight */}
            <div className="insight">

              <div className="insight-icon warning">
                !
              </div>

              <div>
                <strong>
                  Category analysis
                </strong>

                <p>
                  Review Technology, Furniture and
                  Office Supplies performance using
                  the category analytics above.
                </p>
              </div>

            </div>

            <button className="insights-button">
              Explore All Insights →
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;