const API_BASE_URL = "http://127.0.0.1:8000";

// -----------------------------------------
// Common API Request Helper
// -----------------------------------------

const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    options
  );

  if (!response.ok) {
    let errorMessage = "API request failed";

    try {
      const errorData = await response.json();

      errorMessage =
        errorData.detail ||
        errorData.error ||
        errorData.message ||
        errorMessage;

    } catch {
      // Response was not JSON
    }

    throw new Error(errorMessage);
  }

  return response.json();
};


// -----------------------------------------
// Dashboard Metrics
// -----------------------------------------

export const getDashboardMetrics = async () => {
  return apiRequest("/metrics/summary");
};


// -----------------------------------------
// Revenue By Region
// -----------------------------------------

export const getRevenueByRegion = async () => {
  return apiRequest("/metrics/revenue-by-region");
};


// -----------------------------------------
// Profit By Category
// -----------------------------------------

export const getProfitByCategory = async () => {
  return apiRequest("/metrics/profit-by-category");
};


// -----------------------------------------
// Revenue Trend
// -----------------------------------------

export const getRevenueTrend = async () => {
  return apiRequest("/metrics/revenue-trend");
};


// -----------------------------------------
// Top Products
// -----------------------------------------

export const getTopProducts = async () => {
  return apiRequest("/metrics/top-products");
};


// -----------------------------------------
// Ask MetricMind
// -----------------------------------------

export const askMetricMind = async (question) => {
  return apiRequest(
    `/ask?question=${encodeURIComponent(question)}&user_id=4`,
    {
      method: "POST",
    }
  );
};