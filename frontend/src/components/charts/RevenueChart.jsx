import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  Cell,
} from "recharts";

function RevenueChart({ regionData }) {
  const colors = [
    "#2563eb",
    "#3b82f6",
    "#10b981",
    "#14b8a6",
    "#8b5cf6",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
    "#6366f1",
    "#22c55e",
    "#0ea5e9",
    "#f97316",
  ];

  return (
    <div className="chart-card">

      <div className="card-header">

        <div>
          <h2>Revenue by Region</h2>
          <p>Live revenue from PostgreSQL</p>
        </div>

        <button className="view-button">
          View Details →
        </button>

      </div>

      <div style={{ width: "100%", height: 320 }}>

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={regionData}>

            <CartesianGrid
              stroke="#E5E7EB"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="region"
              angle={-30}
              textAnchor="end"
              interval={0}
              height={70}
              tick={{
                fill: "#64748b",
                fontSize: 12,
                fontWeight: 600,
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
                background: "#fff",
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 8px 25px rgba(0,0,0,.15)",
              }}
              formatter={(value) => [
                `$${Number(value).toLocaleString()}`,
                "Revenue",
              ]}
            />

            <Bar
              dataKey="revenue"
              radius={[10, 10, 0, 0]}
              animationDuration={1500}
            >

              <LabelList
                dataKey="revenue"
                position="top"
                formatter={(v) =>
                  `$${(v / 1000000).toFixed(1)}M`
                }
              />

              {regionData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={colors[index % colors.length]}
                />
              ))}

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default RevenueChart;