# MetricMind_files

## Project structure
This is my project structure which I am follow .

                    ┌─────────────────────┐
                    │      USER /         │
                    │   BUSINESS USER     │
                    └──────────┬──────────┘
                               │
                    Natural Language Query
                               ↓
                    ┌─────────────────────┐
                    │    USER INTERFACE   │
                    │   React + Vite      │
                    │                     │
                    │ Dashboard           │
                    │ Charts              │
                    │ Ask MetricMind      │
                    │ Chat History        │
                    │ Saved Questions     │
                    └──────────┬──────────┘
                               │
                               ↓
                    ┌─────────────────────┐
                    │      AI AGENT       │
                    │       Ollama        │
                    │                     │
                    │ Intent Detection    │
                    │ Understand Question │
                    │ Select Metric        │
                    │ Select Dimension     │
                    └──────────┬──────────┘
                               │
                               ↓
              ┌────────────────────────────────┐
              │        SEMANTIC LAYER          │
              │          metrics.py            │
              │                                │
              │ Metrics: Revenue, Profit,      │
              │ Profit Margin                  │
              │                                │
              │ Dimensions: Region, Category,  │
              │ Product, Country, Market...    │
              └───────────────┬────────────────┘
                              │
                              ↓
                    ┌─────────────────────┐
                    │    QUERY ENGINE     │
                    │   query_engine.py   │
                    │                     │
                    │ Governed SQL Queries│
                    │ Aggregation         │
                    │ Filtering           │
                    │ Ranking             │
                    └──────────┬──────────┘
                               │
                               ↓
                    ┌─────────────────────┐
                    │     POSTGRESQL      │
                    │      DATABASE       │
                    │                     │
                    │ Sales Data          │
                    │ Users               │
                    │ Chat History        │
                    │ Saved Questions     │
                    └──────────┬──────────┘
                               │
                               ↓
                    ┌─────────────────────┐
                    │   BUSINESS ANSWER   │
                    │                     │
                    │ KPI Cards           │
                    │ Charts              │
                    │ Tables              │
                    │ AI Insights         │
                    └─────────────────────┘
## 📁 Project file Structure

```text
MetricMind/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── metrics.py
│   ├── query_engine.py
│   ├── ai_agent.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── MetricCard.jsx
│   │   │   ├── AISection.jsx
│   │   │   ├── RevenueChart.jsx
│   │   │   ├── ProfitPieChart.jsx
│   │   │   ├── RevenueTrendChart.jsx
│   │   │   └── TopProductsChart.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── data/
│   ├── raw/
│   │   └── superstore_raw.csv
│   │
│   └── processed/
│       └── superstore_clean.csv
│
├── .gitignore
├── README.md
└── requirements.txt

