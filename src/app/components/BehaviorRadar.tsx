import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { Target } from 'lucide-react';

interface BehaviorRadarProps {
  data: any;   // 🔥 ML features object
}

export function BehaviorRadar({ data }: BehaviorRadarProps) {

  // 🔥 Prevent crash before ML loads
  if (!data) {
    return (
      <div className="bg-white rounded-xl p-6 border border-purple-200 shadow-lg text-sm text-gray-400">
        Loading behavioural intelligence...
      </div>
    );
  }

  // 🔥 Convert ML features → Radar format
  const radarData = [
    { category: "Salary Delay", value: (data.salary_delay_days || 0) * 12, fullMark: 100 },
    { category: "Savings Stress", value: (data.savings_drawdown_pct || 0) * 100, fullMark: 100 },
    { category: "Credit Util", value: (data.credit_utilization_ratio || 0) * 100, fullMark: 100 },
    { category: "Utility Delay", value: (data.utility_payment_delay || 0) * 10, fullMark: 100 },
    { category: "ATM Spike", value: (data.atm_withdrawal_spike || 0) * 20, fullMark: 100 },
  ];

  return (
    <div className="bg-white rounded-xl p-6 border border-purple-200 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Behavioral Risk Profile
          </h2>
          <p className="text-xs text-gray-500">
            Multi-dimensional stress analysis
          </p>
        </div>
        <Target className="w-5 h-5 text-blue-600" />
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <RadarChart data={radarData}>
          <PolarGrid stroke="#e9d5ff" />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fill: '#6b7280', fontSize: 11 }}
            stroke="#9333ea"
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#9333ea', fontSize: 10 }}
            stroke="#9333ea"
          />
          <Radar
            name="Risk Level"
            dataKey="value"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.4}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
