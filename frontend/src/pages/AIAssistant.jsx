import { useState } from "react";

import {
  askMetricMind,
} from "../services/api";

function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    const userQuestion = question.trim();

    if (!userQuestion) {
      setError("Please enter a question.");
      setAnswer("");
      return;
    }

    setLoading(true);
    setAnswer("");
    setError("");

    try {
      const data = await askMetricMind(
        userQuestion
      );

      setAnswer(
        data.answer ||
        "MetricMind could not generate an answer."
      );

    } catch (err) {
      console.error(
        "AI Assistant Error:",
        err
      );

      setError(
        "Unable to connect to MetricMind backend."
      );

    } finally {
      setLoading(false);
    }
  };

  const handleSuggestion = (text) => {
    setQuestion(text);
    setAnswer("");
    setError("");
  };

  return (
    <div className="module-page">

      {/* Header */}

      <div className="module-header">

        <div>

          <span className="module-breadcrumb">
            Workspace / AI Assistant
          </span>

          <h1>
            AI Assistant
          </h1>

          <p>
            Ask questions about your business
            data using natural language.
          </p>

        </div>

        <span className="semantic-status">
          ● AI Ready
        </span>

      </div>


      {/* Main AI Card */}

      <section className="ai-assistant-card">

        <div className="ai-assistant-heading">

          <div className="ai-assistant-icon">
            ✦
          </div>

          <div>

            <h2>
              Ask MetricMind
            </h2>

            <p>
              Get data-driven answers from your
              governed business metrics.
            </p>

          </div>

        </div>


        {/* Question Box */}

        <div className="ai-assistant-input">

          <input
            type="text"
            placeholder="Ask MetricMind a business question..."
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAsk();
              }
            }}
          />

          <button
            onClick={handleAsk}
            disabled={loading}
          >
            {loading
              ? "Analyzing..."
              : "Ask MetricMind →"}
          </button>

        </div>


        {/* Loading */}

        {loading && (
          <div className="ai-assistant-response">

            <div className="response-label">
              MetricMind
            </div>

            <p>
              MetricMind is analyzing your
              question...
            </p>

          </div>
        )}


        {/* Error */}

        {error && !loading && (
          <div className="ai-assistant-error">

            <strong>
              Something went wrong
            </strong>

            <p>
              {error}
            </p>

          </div>
        )}


        {/* Answer */}

        {answer && !loading && !error && (
          <div className="ai-assistant-response">

            <div className="response-label">
              ✦ MetricMind
            </div>

            <p
              style={{
                whiteSpace: "pre-line",
              }}
            >
              {answer}
            </p>

          </div>
        )}

      </section>


      {/* Suggested Questions */}

      <section className="module-card">

        <div className="module-card-header">

          <div>

            <h2>
              Suggested Questions
            </h2>

            <p>
              Start exploring your business data
              with these questions.
            </p>

          </div>

        </div>


        <div className="ai-suggestions-grid">

          <button
            onClick={() =>
              handleSuggestion(
                "Which region generated the most revenue?"
              )
            }
          >
            <span className="suggestion-icon">
              $
            </span>

            <span>
              <strong>
                Top revenue region
              </strong>

              <small>
                Which region generated the most
                revenue?
              </small>
            </span>
          </button>


          <button
            onClick={() =>
              handleSuggestion(
                "What are our most profitable products?"
              )
            }
          >
            <span className="suggestion-icon">
              ↗
            </span>

            <span>
              <strong>
                Most profitable products
              </strong>

              <small>
                Show products with the highest
                profit.
              </small>
            </span>
          </button>


          <button
            onClick={() =>
              handleSuggestion(
                "How are our product categories performing?"
              )
            }
          >
            <span className="suggestion-icon">
              ◈
            </span>

            <span>
              <strong>
                Category performance
              </strong>

              <small>
                Compare revenue and profit by
                category.
              </small>
            </span>
          </button>


          <button
            onClick={() =>
              handleSuggestion(
                "What is our total revenue and profit?"
              )
            }
          >
            <span className="suggestion-icon">
              ◉
            </span>

            <span>
              <strong>
                Business summary
              </strong>

              <small>
                Get the overall revenue and profit
                summary.
              </small>
            </span>
          </button>

        </div>

      </section>


      {/* How MetricMind Works */}

      <section className="semantic-card">

        <div className="module-card-header">

          <div>

            <h2>
              How MetricMind Works
            </h2>

            <p>
              Your questions are interpreted using
              governed business metrics.
            </p>

          </div>

          <span className="semantic-status">
            ● Governed
          </span>

        </div>


        <div className="semantic-grid">

          <div className="semantic-item">

            <strong>
              01. Ask
            </strong>

            <code>
              Natural Language
            </code>

            <p>
              Ask a business question in simple
              natural language.
            </p>

          </div>


          <div className="semantic-item">

            <strong>
              02. Understand
            </strong>

            <code>
              AI Intent
            </code>

            <p>
              MetricMind identifies the metric and
              business dimension required.
            </p>

          </div>


          <div className="semantic-item">

            <strong>
              03. Answer
            </strong>

            <code>
              Governed Data
            </code>

            <p>
              The system returns an answer based
              on governed business logic.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default AIAssistant;