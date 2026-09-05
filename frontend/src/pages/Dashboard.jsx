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

      <Sidebar />

      <main className="main-content">

        <Header />
        <div className="refresh-container">
          <button
            className="date-button"
            onClick={onRefresh}
            disabled={metricsLoading}
          >
            {metricsLoading ? "Refreshing..." : "↻ Refresh Data"}
          </button>
        </div>
        {/* Metric Cards */}
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

        {metricsError && (
          <div className="answer-box">
            {metricsError}
            <p>Make sure FastAPI backend is running.</p>
          </div>
        )}

        {/* AI Section */}
        <AISection
          question={question}
          setQuestion={setQuestion}
          answer={answer}
          loading={loading}
          handleAsk={handleAsk}
        />

        {/* Charts */}
        <section className="dashboard-grid">

          <RevenueChart regionData={regionData} />

          <ProfitPieChart data={profitData} />

          <RevenueTrendChart data={revenueTrendData} />

          <TopProductsChart data={topProductsData} />

          {/* AI Insights */}
          <div className="insights-card">

            <div className="card-header">
              <div>
                <h2>AI Insights</h2>
                <p>Powered by MetricMind</p>
              </div>
            </div>

            <div className="insight">
              <div className="insight-icon">
                ↗
              </div>

              <div>
                <strong>Revenue is growing</strong>

                <p>
                  Revenue increased by 12.5%
                  compared to the previous quarter.
                </p>
              </div>
            </div>

            <div className="insight">
              <div className="insight-icon warning">
                !
              </div>

              <div>
                <strong>Margin needs attention</strong>

                <p>
                  European margins decreased
                  by 3.4% and require analysis.
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