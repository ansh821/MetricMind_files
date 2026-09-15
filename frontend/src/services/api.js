const API_BASE_URL = "http://127.0.0.1:8000";

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


/* =========================================================
   DASHBOARD METRICS
========================================================= */

export const getDashboardMetrics = async () => {
  return apiRequest("/metrics/summary");
};


export const getRevenueByRegion = async () => {
  return apiRequest("/metrics/revenue-by-region");
};


export const getProfitByCategory = async () => {
  return apiRequest("/metrics/profit-by-category");
};


export const getRevenueTrend = async () => {
  return apiRequest("/metrics/revenue-trend");
};


export const getTopProducts = async () => {
  return apiRequest("/metrics/top-products");
};


/* =========================================================
   AI ASSISTANT
========================================================= */

export const askMetricMind = async (question) => {
  return apiRequest(
    `/ask?question=${encodeURIComponent(
      question
    )}&user_id=4`,
    {
      method: "POST",
    }
  );
};


/* =========================================================
   CHAT HISTORY
========================================================= */

export const getChatHistory = async (
  userId = 4
) => {
  return apiRequest(
    `/chat-history/${userId}`
  );
};


/* =========================================================
   SAVED QUESTIONS
========================================================= */

export const saveQuestion = async (
  question,
  userId = 4
) => {
  return apiRequest(
    `/saved-questions?question=${encodeURIComponent(
      question
    )}&user_id=${userId}`,
    {
      method: "POST",
    }
  );
};


export const getSavedQuestions = async (
  userId = 4
) => {
  return apiRequest(
    `/saved-questions/${userId}`
  );
};