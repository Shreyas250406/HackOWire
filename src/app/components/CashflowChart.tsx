import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceDot } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface CashflowChartProps {
  data: any;   // 🔥 now accepts ML risk_timeline
}

export function CashflowChart({ data }: CashflowChartProps) {

  // 🔥 Prevent crash before ML loads
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 border border-purple-200 shadow-lg text-sm text-gray-400">
        Loading cashflow intelligence...
      </div>
    );
  }

  // 🔥 Convert ML risk timeline → Financial Graph Data
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const chartData = data.map((value: number, index: number) => ({
    month: monthLabels[index] || `M${index+1}`,

    // HIGH RISK → income drops fast
    income: Math.round(90000 - value * 50000),

    // EMI constant
    emi: 15000,

    // HIGH RISK → discretionary collapses
    discretionary: Math.round(35000 - value * 20000),

    anomaly: value > 0.55 ? "Cashflow stress detected" : null
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-purple-200 rounded-lg p-3 shadow-xl">
          <p className="text-xs text-gray-600 mb-2">{payload[0].payload.month}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-gray-700">{entry.name}:</span>
              <span className="font-semibold text-gray-900">
                ₹{entry.value.toLocaleString()}
              </span>
            </div>
          ))}
          {payload[0].payload.anomaly && (
            <div className="mt-2 pt-2 border-t border-purple-100">
              <p className="text-xs text-amber-600">
                ⚠ {payload[0].payload.anomaly}
              </p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-purple-200 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Cashflow Behaviour Analysis
          </h2>
          <p className="text-xs text-gray-500">
            Income, EMI, and discretionary spending trends
          </p>
        </div>
        <TrendingUp className="w-5 h-5 text-blue-600" />
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e9d5ff" opacity={0.5} />

          <XAxis dataKey="month" stroke="#9333ea" tick={{ fill: '#6b7280' }} />

          <YAxis
            stroke="#9333ea"
            tick={{ fill: '#6b7280' }}
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} iconType="circle" />

          <Line type="monotone" dataKey="income" name="Income Inflow" stroke="#10b981" strokeWidth={3} />
          <Line type="monotone" dataKey="emi" name="EMI Outflow" stroke="#3b82f6" strokeWidth={3} />
          <Line type="monotone" dataKey="discretionary" name="Discretionary Spending" stroke="#a855f7" strokeWidth={3} />

          {chartData.map((point, index) =>
            point.anomaly ? (
              <ReferenceDot
                key={index}
                x={point.month}
                y={point.income}
                r={8}
                fill="#ef4444"
                stroke="#ffffff"
                strokeWidth={2}
              />
            ) : null
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
