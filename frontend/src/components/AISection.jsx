function AISection({
  question,
  setQuestion,
  answer,
  loading,
  handleAsk,
}) {
  return (
    <section className="ai-section">

      <div className="ai-header">

        <div>
          <div className="ai-title">
            <span className="ai-icon">✦</span>
            <h2>Ask MetricMind</h2>
          </div>

          <p>
            Ask questions about your business data in natural language.
          </p>
        </div>

        <span className="online">
          <span className="online-dot"></span>
          AI Ready
        </span>

      </div>

      <div className="question-box">

        <input
          type="text"
          placeholder="Ask MetricMind a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
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
          {loading ? "Analyzing..." : "Ask MetricMind →"}
        </button>

      </div>

      {loading && (
        <div className="answer-box">
          MetricMind is analyzing your question...
        </div>
      )}

      {answer && !loading && (
        <div className="answer-box">
          <strong>MetricMind:</strong>

          <p style={{ whiteSpace: "pre-line" }}>
            {answer}
          </p>
        </div>
      )}

      <div className="suggestions">

        <span>Try asking:</span>

        <button
          onClick={() =>
            setQuestion(
              "Why did our European margins drop last quarter?"
            )
          }
        >
          Why did margins drop?
        </button>

        <button
          onClick={() =>
            setQuestion(
              "Which region generated the most revenue?"
            )
          }
        >
          Top revenue region?
        </button>

        <button
          onClick={() =>
            setQuestion(
              "What are our most profitable products?"
            )
          }
        >
          Most profitable products?
        </button>

      </div>

    </section>
  );
}

export default AISection;