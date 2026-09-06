import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function TopProductsChart({ data }) {
  const COLORS = [
    "#2563eb",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ef4444",
  ];

  return (
    <div className="chart-card">

      <div className="card-header">
        <div>
          <h2>Top Products</h2>
          <p>Products generating the highest revenue</p>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: 320,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 10,
              right: 30,
              left: 30,
              bottom: 10,
            }}
          >

            <CartesianGrid
              stroke="#E5E7EB"
              strokeDasharray="4 4"
            />

            <XAxis
              type="number"
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
              tickFormatter={(value) =>
                `$${(value / 1000).toFixed(0)}K`
              }
            />

            <YAxis
              type="category"
              dataKey="product"
              width={120}
              tick={{
                fill: "#64748b",
                fontSize: 12,
                fontWeight: 600,
              }}
            />

            <Tooltip
              contentStyle={{
                background: "#fff",
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

            <Bar
              dataKey="revenue"
              radius={[0, 8, 8, 0]}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default TopProductsChart;