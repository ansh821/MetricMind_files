import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ProfitPieChart({ data }) {
  const COLORS = [
    "#2563eb",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  return (
    <div className="chart-card">

      <div className="card-header">
        <div>
          <h2>Profit by Category</h2>
          <p>Distribution of profit</p>
        </div>
      </div>

      <div style={{ width: "100%", height: 320 }}>

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="profit"
              nameKey="category"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={4}
              animationDuration={1500}
            >

              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ProfitPieChart;