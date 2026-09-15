import { useEffect, useState } from "react";

import { getChatHistory } from "../services/api";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function ChatHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // LOAD CHAT HISTORY
  // =========================================================

  const loadChatHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getChatHistory(4);

      setHistory(Array.isArray(data) ? data : []);

    } catch (err) {
      console.error("Chat History Error:", err);

      setError(
        "Unable to load chat history."
      );

    } finally {
      setLoading(false);
    }
  };


  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    loadChatHistory();
  }, []);


  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "Unknown date";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };


  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="app">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar />


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="main-content">

        {/* Header */}

        <Header />


        {/* =================================================
            CHAT HISTORY PAGE
        ================================================= */}

        <div className="module-page">

          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <div className="module-header">

            <div>

              <span className="module-breadcrumb">
                History / Chat History
              </span>

              <h1>
                Chat History
              </h1>

              <p>
                Review your previous conversations with
                MetricMind AI.
              </p>

            </div>


            {/* Refresh */}

            <button
              className="module-action-button"
              onClick={loadChatHistory}
              disabled={loading}
            >
              {loading
                ? "Refreshing..."
                : "↻ Refresh"}
            </button>

          </div>


          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (
            <div className="module-loading">
              Loading chat history...
            </div>
          )}


          {/* =================================================
              ERROR
          ================================================= */}

          {!loading && error && (
            <div className="module-error">

              <h3>
                Unable to load chat history
              </h3>

              <p>
                {error}
              </p>

              <button
                className="module-action-button"
                onClick={loadChatHistory}
              >
                Try Again
              </button>

            </div>
          )}


          {/* =================================================
              CONTENT
          ================================================= */}

          {!loading && !error && (
            <>

              {/* =================================================
                  SUMMARY
              ================================================= */}

              <section className="notification-summary-card">

                <div className="notification-summary-icon">
                  ◷
                </div>

                <div>

                  <span>
                    CONVERSATION HISTORY
                  </span>

                  <h2>
                    MetricMind Conversations
                  </h2>

                  <p>
                    Your previous AI questions and
                    generated business insights.
                  </p>

                </div>

                <strong>
                  {history.length}
                </strong>

              </section>


              {/* =================================================
                  HISTORY CARD
              ================================================= */}

              <section className="module-card">

                <div className="module-card-header">

                  <div>

                    <h2>
                      Previous Conversations
                    </h2>

                    <p>
                      Questions asked through the
                      MetricMind AI Assistant.
                    </p>

                  </div>

                  <span className="semantic-status">
                    ● Stored
                  </span>

                </div>


                {/* =================================================
                    EMPTY STATE
                ================================================= */}

                {history.length === 0 ? (

                  <div className="module-empty">

                    <div className="module-empty-icon">
                      ◷
                    </div>

                    <h3>
                      No conversations yet
                    </h3>

                    <p>
                      Ask a question from the AI Assistant
                      and your conversation will appear here.
                    </p>

                  </div>

                ) : (

                  /* =================================================
                     CHAT LIST
                  ================================================= */

                  <div className="chat-history-list">

                    {history.map((chat) => (

                      <div
                        className="chat-history-item"
                        key={chat.chat_id}
                      >

                        {/* =================================================
                            QUESTION
                        ================================================= */}

                        <div className="chat-history-question">

                          <div className="chat-history-icon question-icon">
                            Q
                          </div>

                          <div className="chat-history-content">

                            <span className="chat-history-label">
                              QUESTION
                            </span>

                            <h3>
                              {chat.question}
                            </h3>

                          </div>

                        </div>


                        {/* =================================================
                            ANSWER
                        ================================================= */}

                        <div className="chat-history-answer">

                          <div className="chat-history-icon answer-icon">
                            M
                          </div>

                          <div className="chat-history-content">

                            <span className="chat-history-label">
                              METRICMIND ANSWER
                            </span>

                            <p>
                              {chat.answer}
                            </p>

                          </div>

                        </div>


                        {/* =================================================
                            FOOTER
                        ================================================= */}

                        <div className="chat-history-footer">

                          <span>
                            ◷ {formatDate(chat.created_at)}
                          </span>

                          <span>
                            Chat ID: {chat.chat_id}
                          </span>

                        </div>

                      </div>

                    ))}

                  </div>

                )}

              </section>

            </>
          )}

        </div>

      </main>

    </div>
  );
}

export default ChatHistory;