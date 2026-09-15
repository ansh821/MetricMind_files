import { useEffect, useState } from "react";

import { getSavedQuestions } from "../services/api";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function SavedQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // LOAD SAVED QUESTIONS
  // =========================================================

  const loadSavedQuestions = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getSavedQuestions(4);

      setQuestions(Array.isArray(data) ? data : []);

    } catch (err) {
      console.error("Saved Questions Error:", err);

      setError(
        "Unable to load saved questions."
      );

    } finally {
      setLoading(false);
    }
  };


  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    loadSavedQuestions();
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

        <Header />


        {/* =================================================
            SAVED QUESTIONS PAGE
        ================================================= */}

        <div className="module-page">

          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <div className="module-header">

            <div>

              <span className="module-breadcrumb">
                History / Saved Questions
              </span>

              <h1>
                Saved Questions
              </h1>

              <p>
                Quickly access your important MetricMind
                business questions.
              </p>

            </div>


            <button
              className="module-action-button"
              onClick={loadSavedQuestions}
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
              Loading saved questions...
            </div>
          )}


          {/* =================================================
              ERROR
          ================================================= */}

          {!loading && error && (
            <div className="module-error">

              <h3>
                Unable to load saved questions
              </h3>

              <p>
                {error}
              </p>

              <button
                className="module-action-button"
                onClick={loadSavedQuestions}
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
                  ☆
                </div>

                <div>

                  <span>
                    SAVED QUESTIONS
                  </span>

                  <h2>
                    Your Business Questions
                  </h2>

                  <p>
                    Important questions saved for quick
                    access and future analysis.
                  </p>

                </div>

                <strong>
                  {questions.length}
                </strong>

              </section>


              {/* =================================================
                  QUESTIONS CARD
              ================================================= */}

              <section className="module-card">

                <div className="module-card-header">

                  <div>

                    <h2>
                      Saved Questions
                    </h2>

                    <p>
                      Questions you have saved from the
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

                {questions.length === 0 ? (

                  <div className="module-empty">

                    <div className="module-empty-icon">
                      ☆
                    </div>

                    <h3>
                      No saved questions yet
                    </h3>

                    <p>
                      Save an important question from the
                      AI Assistant and it will appear here.
                    </p>

                  </div>

                ) : (

                  /* =================================================
                     QUESTION LIST
                  ================================================= */

                  <div className="saved-question-list">

                    {questions.map((item) => (

                      <div
                        className="saved-question-item"
                        key={item.id}
                      >

                        <div className="saved-question-icon">
                          ☆
                        </div>

                        <div className="saved-question-content">

                          <span className="chat-history-label">
                            SAVED QUESTION
                          </span>

                          <h3>
                            {item.question}
                          </h3>

                          <div className="saved-question-footer">

                            <span>
                              ◷ {formatDate(item.created_at)}
                            </span>

                            <span>
                              Question ID: {item.id}
                            </span>

                          </div>

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

export default SavedQuestions;
