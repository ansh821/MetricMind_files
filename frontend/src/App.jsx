import { useEffect, useState } from "react";
import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Metrics from "./pages/Metrics";
import AIAssistant from "./pages/AIAssistant";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import SavedQuestions from "./pages/SavedQuestions";
import ChatHistory from "./pages/ChatHistory";
import {
  getDashboardMetrics,
  getRevenueByRegion,
  getProfitByCategory,
  getRevenueTrend,
  getTopProducts,
  askMetricMind,
} from "./services/api";

function App() {
  // =========================================================
  // AI ASSISTANT STATE
  // =========================================================

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================================================
  // DASHBOARD STATE
  // =========================================================

  const [dashboardMetrics, setDashboardMetrics] = useState(null);
  const [metricsLoading, setMetricsLoading] = useState(true);
  const [metricsError, setMetricsError] = useState("");

  const [regionData, setRegionData] = useState([]);
  const [profitData, setProfitData] = useState([]);
  const [revenueTrendData, setRevenueTrendData] = useState([]);
  const [topProductsData, setTopProductsData] = useState([]);

  // =========================================================
  // LOAD DASHBOARD DATA
  // =========================================================

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
      console.error(
        "Dashboard API Error:",
        error
      );

      setMetricsError(
        "Unable to load dashboard data."
      );

    } finally {
      setMetricsLoading(false);
    }
  };

  // =========================================================
  // INITIAL DASHBOARD LOAD
  // =========================================================

  useEffect(() => {
    loadDashboardData();
  }, []);

  // =========================================================
  // ASK METRICMIND
  // =========================================================

  const handleAsk = async () => {
    console.log(
      "========== HANDLE ASK CALLED =========="
    );

    const userQuestion = question.trim();

    console.log(
      "QUESTION STATE:",
      question
    );

    console.log(
      "TRIMMED QUESTION:",
      userQuestion
    );

    if (!userQuestion) {
      console.log(
        "EMPTY QUESTION - API WILL NOT BE CALLED"
      );

      setAnswer(
        "Please enter a question."
      );

      return;
    }

    console.log(
      "API CALL STARTING:",
      userQuestion
    );

    setLoading(true);
    setAnswer("");

    try {
      const data = await askMetricMind(
        userQuestion
      );

      console.log(
        "BACKEND RESPONSE:",
        data
      );

      setAnswer(
        data.answer ||
        "MetricMind could not generate an answer."
      );

    } catch (error) {
      console.error(
        "AI Error:",
        error
      );

      setAnswer(
        "Unable to connect to MetricMind backend."
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // FORMATTING HELPERS
  // =========================================================

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

  // =========================================================
  // ROUTING
  // =========================================================

  return (
    <BrowserRouter>

      <Routes>

        {/* =================================================
            DASHBOARD
        ================================================= */}

        <Route
          path="/"
          element={
            <Dashboard
              dashboardMetrics={dashboardMetrics}
              metricsLoading={metricsLoading}
              metricsError={metricsError}

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
          }
        />

        {/* =================================================
            METRICS
        ================================================= */}

        <Route
          path="/metrics"
          element={
            <Metrics />
          }
        />

        {/* =================================================
            AI ASSISTANT
        ================================================= */}

        <Route
          path="/ai-assistant"
          element={
            <AIAssistant />
          }
        />

        {/* =================================================
            REPORTS
        ================================================= */}

        <Route
          path="/reports"
          element={
            <Reports />
          }
        />
         {/* =================================================
            Notifications
        ================================================= */}

        <Route
          path="/notifications"
          element={
            <Notifications />
          }
        />

         {/* =================================================
            ChatHistory
        ================================================= */}

        <Route
          path="/chat-history"
          element={
            <ChatHistory />
          }
        />

         {/* =================================================
            SavedQuestions
        ================================================= */}

        <Route
          path="/saved-questions"
          element={
            <SavedQuestions />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
