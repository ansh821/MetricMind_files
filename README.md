# MetricMind — Agentic Semantic BI Engine

MetricMind is an AI-powered Business Intelligence application that allows users to ask business questions in natural language and receive data-driven answers through a structured analytics pipeline.

The project combines a React dashboard, FastAPI backend, PostgreSQL database, and local AI-powered intent classification using Ollama.

Instead of allowing an AI model to freely generate SQL for every question, MetricMind first identifies the user's analytical intent and then maps that intent to controlled backend query logic and business metrics.

---

## Project Overview

MetricMind converts natural-language business questions into structured analytics requests.

### Example

**User Question:**

> Which region generated the most revenue?

**AI Intent:**

```json
{
  "intent": "get_revenue_by_region",
  "metric": "revenue",
  "dimension": "region"
}
```

The backend uses this structured intent to retrieve the appropriate business data and return the result to the dashboard.

### Architecture

```text
User
  ↓
React Frontend
  ↓
FastAPI Backend
  ↓
AI Intent Classification
  ↓
Query Engine
  ↓
PostgreSQL Database
  ↓
Business Result
  ↓
Dashboard / AI Response
```

---

# Key Features

* Natural-language business questions
* AI-powered intent classification
* Revenue analysis
* Profit analysis
* Profit margin analysis
* Regional performance analysis
* Category performance analysis
* Top profitable products
* Interactive analytics dashboard
* AI Assistant
* Chat history
* Saved questions
* Reports and metrics pages
* FastAPI REST APIs
* PostgreSQL database integration
* React frontend
* Local Ollama AI integration
* Frontend-to-backend API communication

---

# Technology Stack

## Frontend

* React
* Vite
* JavaScript
* React Router
* CSS
* Recharts

## Backend

* Python
* FastAPI
* Uvicorn
* Pydantic

## Database

* PostgreSQL

## AI

* Ollama
* Local LLM-based intent classification

## Data & Analytics

* Python
* Pandas
* SQL
* Business metrics
* Data analysis

## Development Tools

* Git
* GitHub
* VS Code
* PowerShell / Command Prompt

---

# Project Structure

```text
MetricMind_files/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── metrics.py
│   ├── query_engine.py
│   ├── models/
│   ├── routes/
│   └── ...
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
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Metrics.jsx
│   │   │   ├── AIAssistant.jsx
│   │   │   ├── ChatHistory.jsx
│   │   │   ├── SavedQuestions.jsx
│   │   │   ├── Notifications.jsx
│   │   │   └── Reports.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── ...
│
├── data/
│
├── notebooks/
│
├── metricmind_dbt/
│
├── README.md
└── ...
```

---

# Dashboard

The MetricMind dashboard provides an overview of important business metrics and visual analytics.

### Main Metrics

* Total Revenue
* Total Profit
* Profit Margin
* Sales

### Visual Analytics

* Revenue by Region
* Profit by Category
* Revenue Trends
* Top Profitable Products

The dashboard is designed to provide a quick overview of business performance while allowing users to interact with AI-powered analytics.

---

# AI Query System

Users can ask business questions using natural language.

### Example Questions

```text
Which region generated the most revenue?
```

```text
What is the total revenue?
```

```text
Which category has the highest profit?
```

```text
Show me the top profitable products.
```

MetricMind processes the question through the AI intent classification layer.

For example:

```text
User Question
      ↓
Intent Classification
      ↓
get_revenue_by_region
      ↓
Query Engine
      ↓
Database
      ↓
Revenue by Region
      ↓
AI / Dashboard Response
```

This approach keeps the analytical logic structured instead of depending entirely on unrestricted AI-generated SQL.

---

# Supported Analytics

MetricMind currently supports analytical requests including:

### Revenue

* Total revenue
* Revenue by region
* Revenue by category

### Profit

* Total profit
* Profit by category
* Profitable products

### Profit Margin

* Overall profit margin
* Business performance metrics

### Product Performance

* Top profitable products
* Product-level analysis

---

# Backend

The backend is built using FastAPI and provides REST APIs for the frontend.

The backend handles:

* Database connectivity
* Business metric calculations
* AI question processing
* Intent classification
* Query execution
* Dashboard data
* User-related functionality
* Chat history
* Saved questions

### Run Backend

Navigate to the backend directory:

```bash
cd backend
```

Start FastAPI:

```bash
uvicorn main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

---

# Frontend

The frontend is built with React and Vite.

It provides:

* Dashboard
* AI Assistant
* Metrics
* Reports
* Chat History
* Saved Questions
* Notifications
* Interactive charts
* Business metric cards

### Run Frontend

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# Database

MetricMind uses PostgreSQL for storing and querying application and business data.

The backend communicates with PostgreSQL to retrieve the data required for:

* Revenue calculations
* Profit calculations
* Regional analysis
* Category analysis
* Product analysis
* Dashboard metrics
* User and application data

---

# AI Integration

MetricMind uses Ollama for local AI-based intent classification.

The AI layer identifies what the user is asking for and converts the natural-language question into a structured intent.

Example:

```json
{
  "intent": "get_category_performance",
  "metric": "profit",
  "dimension": "category"
}
```

The backend then processes the structured intent using predefined analytical logic.

This architecture helps separate:

```text
Natural Language Understanding
             ↓
      Business Logic
             ↓
        Database
```

---

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

                    
# End-to-End Data Flow

```text
                         ┌───────────────────┐
                         │       User        │
                         │ Natural Language  │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │  React Frontend   │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │   FastAPI Backend │
                         └─────────┬─────────┘
                                   │
                         ┌─────────┴─────────┐
                         ▼                   ▼
                ┌─────────────────┐  ┌─────────────────┐
                │ Ollama / AI     │  │   Query Engine  │
                │ Intent Layer    │  │                 │
                └────────┬────────┘  └────────┬────────┘
                         │                    │
                         └─────────┬──────────┘
                                   ▼
                         ┌───────────────────┐
                         │    PostgreSQL     │
                         │      Database     │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │ Business Result   │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │ Dashboard / AI    │
                         │     Response      │
                         └───────────────────┘
```

---

# Local Setup

## 1. Clone the Repository

```bash
git clone <your-github-repository-url>
cd MetricMind_files
```

## 2. Backend Setup

```bash
cd backend
```

Create/activate the Python environment and install the required packages.

Then run:

```bash
uvicorn main:app --reload
```

## 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

## 4. Database

Make sure PostgreSQL is running and the required database configuration is available to the backend.

## 5. AI

Make sure Ollama is installed and the required local model is available before using AI-powered question processing.

---

# Project Status

MetricMind currently has a working local end-to-end implementation consisting of:

* React frontend
* FastAPI backend
* PostgreSQL database
* Ollama intent classification
* AI Assistant
* Business metric APIs
* Revenue analysis
* Profit analysis
* Regional analysis
* Category analysis
* Product performance analysis
* Interactive dashboard
* Frontend ↔ Backend integration
* Chat history
* Saved questions
* Reports and metrics pages

The project is currently configured as a **local end-to-end Business Intelligence application**.

Deployment is not required for the current project version.

---

# Future Improvements

Possible future improvements include:

* Production deployment
* Authentication and authorization
* Advanced semantic-layer governance
* Additional business metrics
* More complex natural-language queries
* Automated data refresh
* Cloud database integration
* Advanced AI-generated explanations
* Role-based dashboards
* Automated testing and CI/CD

---

# Author

**Anshika Chauhan**

GitHub: https://github.com/ansh821

---

# Project Goal

MetricMind was created to explore how Artificial Intelligence can be combined with structured Business Intelligence systems to make data analytics easier through natural-language interaction.

The main goal is to bridge the gap between:

```text
Natural Language
       +
Artificial Intelligence
       +
Structured Business Logic
       +
Database Analytics
       =
Accessible Business Intelligence
```

MetricMind demonstrates how users can interact with business data using natural language while keeping the underlying analytical process structured and controlled.

