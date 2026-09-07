import { useEffect, useState } from "react";
import "./App.css";

import Dashboard from "./pages/Dashboard";

import {
  getDashboardMetrics,
  getRevenueByRegion,
  getProfitByCategory,
  getRevenueTrend,
  getTopProducts,
  askMetricMind,
} from "./services/api";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const [dashboardMetrics, setDashboardMetrics] = useState(null);
  const [metricsLoading, setMetricsLoading] = useState(true);
  const [metricsError, setMetricsError] = useState("");

  const [regionData, setRegionData] = useState([]);
  const [profitData, setProfitData] = useState([]);
  const [revenueTrendData, setRevenueTrendData] = useState([]);
  const [topProductsData, setTopProductsData] = useState([]);

  const loadDashboardData = async () => {
    try {
      setMetricsLoading(true);
      setMetricsError("");

      const [
        metrics,
        regions,
        profits,
        trend,
        products,
      ] = await Promise.all([
        getDashboardMetrics(),
        getRevenueByRegion(),
        getProfitByCategory(),
        getRevenueTrend(),
        getTopProducts(),
      ]);

      setDashboardMetrics(metrics);
      setRegionData(regions);
      setProfitData(profits);
      setRevenueTrendData(trend);
      setTopProductsData(products);

    } catch (error) {
      console.error("Dashboard API Error:", error);

      setMetricsError(
        "Unable to load dashboard data."
      );
    } finally {
      setMetricsLoading(false);
    }
  };
  // -----------------------------------------
  // Load Dashboard Data
  // -----------------------------------------

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setMetricsLoading(true);
        setMetricsError("");

        const [
          metrics,
          regions,
          profits,
          trend,
          products,
        ] = await Promise.all([
          getDashboardMetrics(),
          getRevenueByRegion(),
          getProfitByCategory(),
          getRevenueTrend(),
          getTopProducts(),
        ]);

        setDashboardMetrics(metrics);
        setRegionData(regions);
        setProfitData(profits);
        setRevenueTrendData(trend);
        setTopProductsData(products);

      } catch (error) {
        console.error("Dashboard API Error:", error);

        setMetricsError(
          "Unable to load dashboard data."
        );
      } finally {
        setMetricsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // -----------------------------------------
  // Ask MetricMind
  // -----------------------------------------
  const handleAsk = async () => {
    console.log("========== HANDLE ASK CALLED ==========");

    const userQuestion = question.trim();

    console.log("QUESTION STATE:", question);
    console.log("TRIMMED QUESTION:", userQuestion);

    if (!userQuestion) {
      console.log("EMPTY QUESTION - API WILL NOT BE CALLED");
      setAnswer("Please enter a question.");
      return;
    }

    console.log("API CALL STARTING:", userQuestion);

    setLoading(true);
    setAnswer("");

    try {
      const data = await askMetricMind(userQuestion);

      console.log("BACKEND RESPONSE:", data);

      setAnswer(
        data.answer ||
        "MetricMind could not generate an answer."
      );

    } catch (error) {
      console.error("AI Error:", error);
      setAnswer("Unable to connect to MetricMind backend.");
    } finally {
      setLoading(false);
    }
  };
  // -----------------------------------------
  // Formatting
  // -----------------------------------------

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

  // -----------------------------------------
  // Dashboard
  // -----------------------------------------

  return (
    <Dashboard
      dashboardMetrics={dashboardMetrics}
      metricsLoading={metricsLoading}
      metricsError={metricsError}
      oneRefresh={loadDashboardData}

      question={question}
      setQuestion={setQuestion}
      answer={answer}
      loading={loading}
      handleAsk={handleAsk}

      regionData={regionData}
      profitData={profitData}
      revenueTrendData={revenueTrendData}
      topProductsData={topProductsData}

      formatCurrency={formatCurrency}
      formatPercentage={formatPercentage}

      onRefresh={loadDashboardData}
    />
  );
}

export default App;