import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function RevenueTrendChart({ data }) {
  return (
    <div className="chart-card">

      <div className="card-header">
        <div>
          <h2>Revenue Trend</h2>
          <p>Revenue performance over time</p>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: 320,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>

            <CartesianGrid
              stroke="#e5e7eb"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="month"
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
            />

            <YAxis
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
              tickFormatter={(value) =>
                `$${(value / 1000000).toFixed(1)}M`
              }
            />

            <Tooltip
              contentStyle={{
                background: "#ffffff",
                borderRadius: "12px",
                border: "none",
                boxShadow:
                  "0 8px 25px rgba(0,0,0,.15)",
              }}
              formatter={(value) => [
                `$${Number(value).toLocaleString()}`,
                "Revenue",
              ]}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#2563eb",
              }}
              activeDot={{
                r: 7,
              }}
              animationDuration={1500}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default RevenueTrendChart;